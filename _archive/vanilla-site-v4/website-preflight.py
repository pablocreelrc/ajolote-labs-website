#!/usr/bin/env python
"""
website-preflight.py — brand-agnostic PreToolUse hook for static website repos.

Runs BEFORE `git push` or `vercel --prod` on any repo that has an index.html
at its root. Performs two layers of checks:

  LAYER 1 — Universal structural checks (hardcoded, always run):
    - body { overflow-x: hidden } while scroll-snap-type: y on html
    - .snap-on CSS selector gated without JS to add the class
    - CSS/JS <link>/<script> missing ?v= cache-bust query

  LAYER 2 — Repo-specific content checks (loaded from config, optional):
    website-preflight.config.json adjacent to this script declares the
    brand, geo, and routing rules for this specific site. No config =
    no brand checks, just universal structural checks.

Exit codes:
    0 — clean or warnings only
    2 — blocker detected (stderr message, push aborted)

Invariants:
    - Read-only. No filesystem writes except error log.
    - Never raises — internal exception exits 0 so a hook bug cannot block.
    - Fast — regex grep only, no network, no Playwright.

Copying to another website repo:
    1. Copy this file into `<repo>/.claude/hooks/website-preflight.py`
    2. Write `<repo>/.claude/hooks/website-preflight.config.json` with the
       brand/geo/routing rules for that site (see Ajolote copy as template)
    3. Register in `<repo>/.claude/settings.local.json`:
         {"hooks":{"PreToolUse":[{"matcher":"Bash","hooks":[
           {"type":"command","command":"python \\".claude/hooks/website-preflight.py\\""}
         ]}]}}
"""
from __future__ import annotations

import json
import re
import sys
import traceback
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

HOOK_FILE = Path(__file__).resolve()
REPO_ROOT = HOOK_FILE.parents[2]
INDEX = REPO_ROOT / "index.html"
CSS_DIR = REPO_ROOT / "css"
JS_DIR = REPO_ROOT / "js"
CONFIG_PATH = HOOK_FILE.parent / "website-preflight.config.json"
ERROR_LOG = HOOK_FILE.parent / "website-preflight-errors.log"

DEPLOY_PATTERNS = [r"\bgit\s+push\b", r"\bvercel\s+--prod\b"]


# ----------------------- Layer 1: universal structural checks -----------------

def check_overflow_vs_snap(css_text: str) -> list[tuple[str, str]]:
    """body { overflow-x: hidden } silently kills vertical scroll-snap."""
    if not re.search(r"scroll-snap-type\s*:\s*y\s+(mandatory|proximity)", css_text):
        return []
    for m in re.finditer(r"body\s*\{([^}]*)\}", css_text, re.DOTALL):
        if re.search(r"overflow-x\s*:\s*hidden", m.group(1)):
            return [("block",
                "body { overflow-x: hidden } present with scroll-snap-type:y on html. "
                "Body becomes its own scroll container and the snap rule has no effect. "
                "Fix: use `overflow-x: clip` instead.")]
    return []


def check_orphan_snap_on(css_text: str, js_text: str) -> list[tuple[str, str]]:
    """.snap-on selector in CSS but no JS adds the class → rules never match."""
    if not re.search(r"\.snap-on\b", css_text):
        return []
    if re.search(r'classList\.add\(\s*["\']snap-on["\']', js_text):
        return []
    return [("block",
        ".snap-on CSS selector found but no JS adds `html.classList.add('snap-on')`. "
        "Gated rules will never fire. Strip the `.snap-on` prefix or add the JS.")]


def check_cache_bust(html_text: str) -> list[tuple[str, str]]:
    """CSS/JS assets without ?v= may serve stale when CDN / browser caches hard."""
    findings: list[tuple[str, str]] = []
    for tag_pat, label in [
        (r'<link\s+[^>]*href="(css/[^"]+\.css)(\?[^"]*)?"', "css"),
        (r'<script\s+[^>]*src="(js/[^"]+\.js)(\?[^"]*)?"', "js"),
    ]:
        for m in re.finditer(tag_pat, html_text):
            query = m.group(2) or ""
            if "?v=" not in query:
                findings.append(("warn",
                    f"{label} asset `{m.group(1)}` has no `?v=` cache-bust query. "
                    "If content changed since last deploy, CDN/browser caches may serve stale. "
                    "Bump a `?v=desc-N` on every content change."))
                break
    return findings


def check_minified_in_sync(html_text: str) -> list[tuple[str, str]]:
    """
    If index.html serves a minified asset (e.g. style.min.css, main.min.js) AND a
    source counterpart exists (style.css, main.js), BLOCK the deploy when the
    source file is newer than the minified file — means someone edited the source
    but forgot to rebuild. Browser will load the stale minified output.

    Pair pattern: <name>.min.<ext> served → compare to <name>.<ext>.
    """
    findings: list[tuple[str, str]] = []
    # Find minified asset references in HTML
    pattern = r'(?:href|src)="((?:css|js)/[^"]*)\.min\.(css|js)(?:\?[^"]*)?"'
    seen: set[tuple[str, str]] = set()
    for m in re.finditer(pattern, html_text):
        base_path = m.group(1)      # e.g. "css/style"
        ext = m.group(2)            # "css" or "js"
        if (base_path, ext) in seen:
            continue
        seen.add((base_path, ext))

        min_file = REPO_ROOT / f"{base_path}.min.{ext}"
        src_file = REPO_ROOT / f"{base_path}.{ext}"

        if not min_file.exists() or not src_file.exists():
            continue

        try:
            min_mtime = min_file.stat().st_mtime
            src_mtime = src_file.stat().st_mtime
        except Exception as e:
            log_error(f"mtime-{min_file.name}", e)
            continue

        # Allow small clock skew (2s) without flagging
        if src_mtime > min_mtime + 2:
            rebuild_cmd = (
                f"npx esbuild {base_path}.{ext} --minify "
                f"--loader:.{ext}={ext} --outfile={base_path}.min.{ext}"
            )
            findings.append(("block",
                f"Source `{base_path}.{ext}` is newer than served `{base_path}.min.{ext}`. "
                "Your edits will NOT reach the browser. "
                f"Rebuild before deploy: `{rebuild_cmd}`"))
    return findings


# ----------------------- Layer 2: config-driven content checks -----------------

def check_forbidden_strings(html_text: str, rules: list[dict]) -> list[tuple[str, str]]:
    """Each rule: {pattern: regex, reason: str, severity: "block"|"warn"}."""
    findings = []
    for rule in rules or []:
        try:
            pat = rule.get("pattern", "")
            if not pat:
                continue
            flags = re.IGNORECASE if rule.get("case_insensitive") else 0
            if re.search(pat, html_text, flags):
                sev = rule.get("severity", "warn")
                reason = rule.get("reason", f"Forbidden pattern `{pat}` found.")
                findings.append((sev, reason))
        except re.error:
            continue
    return findings


def check_required_strings(html_text: str, rules: list[dict]) -> list[tuple[str, str]]:
    """Each rule: {pattern: regex, reason: str, severity: "block"|"warn"}."""
    findings = []
    for rule in rules or []:
        try:
            pat = rule.get("pattern", "")
            if not pat:
                continue
            flags = re.IGNORECASE if rule.get("case_insensitive") else 0
            if not re.search(pat, html_text, flags):
                sev = rule.get("severity", "warn")
                reason = rule.get("reason", f"Required pattern `{pat}` missing.")
                findings.append((sev, reason))
        except re.error:
            continue
    return findings


def check_forbidden_in_cta(html_text: str, rules: list[dict]) -> list[tuple[str, str]]:
    """
    Restrict certain href patterns to outside the CTA section.
    Each rule: {pattern: regex, reason, severity, section_id?} — defaults to id="calendly"
    or class=\"cta-section\".
    """
    findings = []
    # Naive CTA extraction: id="calendly" OR class="cta-section"
    m = re.search(
        r'<section[^>]*(?:id="calendly"|class="[^"]*cta-section)[^>]*>(.*?)</section>',
        html_text, re.DOTALL | re.IGNORECASE,
    )
    if not m:
        return []
    cta_body = m.group(1)
    for rule in rules or []:
        try:
            pat = rule.get("pattern", "")
            if not pat:
                continue
            # Default: match <a> with class containing "btn" and href matching pattern
            selector = rule.get("selector", r'<a[^>]*class="[^"]*btn[^"]*"[^>]*href="{pat}')
            if "{pat}" in selector:
                selector = selector.replace("{pat}", pat)
            if re.search(selector, cta_body):
                sev = rule.get("severity", "warn")
                reason = rule.get("reason", f"Forbidden CTA pattern `{pat}` found.")
                findings.append((sev, reason))
        except re.error:
            continue
    return findings


# ----------------------- Infrastructure -----------------------

def load_config() -> dict[str, Any]:
    if not CONFIG_PATH.exists():
        return {}
    try:
        return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    except Exception as e:
        log_error("config-parse", e)
        return {}


def log_error(context: str, exc: BaseException) -> None:
    try:
        ERROR_LOG.parent.mkdir(parents=True, exist_ok=True)
        with ERROR_LOG.open("a", encoding="utf-8") as f:
            ts = datetime.now(timezone.utc).isoformat()
            f.write(f"[{ts}] {context}: {type(exc).__name__}: {exc}\n")
            f.write(traceback.format_exc() + "\n")
    except Exception:
        pass


def main() -> int:
    try:
        raw = sys.stdin.read()
        event = json.loads(raw) if raw else {}
    except Exception as e:
        log_error("stdin-parse", e)
        return 0

    if event.get("tool_name") != "Bash":
        return 0

    cmd = (event.get("tool_input") or {}).get("command", "") or ""
    if not any(re.search(p, cmd) for p in DEPLOY_PATTERNS):
        return 0

    if not INDEX.exists():
        return 0

    try:
        html = INDEX.read_text(encoding="utf-8", errors="replace")
    except Exception as e:
        log_error("read-index", e)
        return 0

    css_parts = [html]  # include inline <style> in index.html
    for css_path in sorted(CSS_DIR.glob("*.css")) if CSS_DIR.exists() else []:
        try:
            css_parts.append(css_path.read_text(encoding="utf-8", errors="replace"))
        except Exception as e:
            log_error(f"read-css-{css_path.name}", e)
    all_css = "\n".join(css_parts)

    js_parts: list[str] = []
    for js_path in sorted(JS_DIR.glob("*.js")) if JS_DIR.exists() else []:
        try:
            js_parts.append(js_path.read_text(encoding="utf-8", errors="replace"))
        except Exception as e:
            log_error(f"read-js-{js_path.name}", e)
    all_js = "\n".join(js_parts)

    findings: list[tuple[str, str]] = []

    def run(check, *args):
        try:
            findings.extend(check(*args))
        except Exception as e:
            log_error(f"check-{check.__name__}", e)

    # Layer 1: universal
    run(check_overflow_vs_snap, all_css)
    run(check_orphan_snap_on, all_css, all_js)
    run(check_cache_bust, html)
    run(check_minified_in_sync, html)

    # Layer 2: config-driven
    config = load_config()
    run(check_forbidden_strings, html, config.get("forbidden_strings", []))
    run(check_required_strings, html, config.get("required_strings", []))
    run(check_forbidden_in_cta, html, config.get("forbidden_in_cta", []))

    if not findings:
        return 0

    blocks = [m for sev, m in findings if sev == "block"]
    warns = [m for sev, m in findings if sev == "warn"]

    lines = [f"[website-preflight] preflight check for: {cmd.strip()[:80]}"]
    if blocks:
        lines.append("")
        lines.append("[BLOCK] Blocking regressions (push aborted — fix these first):")
        for b in blocks:
            lines.append(f"  - {b}")
    if warns:
        lines.append("")
        lines.append("[WARN] Warnings (push will proceed):")
        for w in warns:
            lines.append(f"  - {w}")

    print("\n".join(lines), file=sys.stderr)
    return 2 if blocks else 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except SystemExit:
        raise
    except Exception as e:
        log_error("top-level", e)
        sys.exit(0)
