<!-- Scope: project:ajolote-labs-website -->
<!-- Last reviewed: 2026-05-23 -->
<!-- Parent: ../CLAUDE.md -->

# Ajolote Labs marketing website
Public marketing site for Ajolote Labs (`ajolotelabs.ai`) — vanilla HTML/CSS/JS, served from Cloudflare Pages on push to `master`.

## Scope
- Inherits from: `../CLAUDE.md` (workspace:Ajolote tech)
- Specializes: static-site stack, file layout, dev/build/audit commands, marketing-site hard stops
- Sub-scopes: none

## Stack
- Markup: vanilla HTML5 (no framework, no router, no build server)
- Styles: vanilla CSS in `css/style.css`; minified via esbuild into `css/style.min.css` (committed)
- Behavior: vanilla JS in `js/main.js` (nav, carousels, snap, magic-card cursor)
- Fonts: Satoshi (display) + General Sans (body) + JetBrains Mono (mono) — self-hosted `.woff2` in `fonts/`
- Testing: Playwright (`audit.js`) for desktop+mobile screenshots and console/4xx checks
- Hosting: Cloudflare Pages, GitHub `master` branch, `CNAME` → `ajolotelabs.ai`
- Vercel: preview-only (`.vercel/` + `.vercelignore`); production is Cloudflare Pages

## Folder map
- `index.html` — the entire site (single page)
- `css/style.css` — CSS source of truth (edit this)
- `css/style.min.css` — esbuild output, committed for prod (bump cache-bust on `<link>` after rebuild)
- `js/main.js` — all client behavior
- `data/cases.json` — case-study content (loaded by `main.js`)
- `fonts/` — self-hosted woff2
- `img/` — logos, OG images, favicons
- `design-system/` — design tokens, references, screen captures (own README)
- `docs/scroll-system-spec.md` — canonical scroll-snap pagination spec
- `docs/audit/` — gitignored Playwright outputs
- `redesigns/v4-2-cinematic-intervals/` — current active redesign (promoted to prod, commit `5152d26`)
- `redesigns/v5-claude-design/` — exploratory next redesign
- `_archive/` — early prototypes (gitignored content kept locally)
- `_headers` — Cloudflare Pages response headers (HSTS, CSP, etc.)
- `CNAME`, `llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml`, `manifest.json` — site metadata
- `audit.js` — Playwright multi-viewport audit script
- `.claude/hooks/website-preflight.py` — pre-push guardrail (forbidden phrases, stale `style.min.css`, overflow gotchas)

## Commands
- `npm run dev` — `python -m http.server 8765`
- `npm run build:css` — `esbuild css/style.css --minify --outfile=css/style.min.css` (then bump cache-bust `?v=` on the `<link>` in `index.html`)
- `npm run audit` — `node audit.js` (Playwright; outputs to gitignored `docs/audit/`)
- `npm run preflight` — `python .claude/hooks/website-preflight.py`
- Verify a deploy reached prod: `curl -s "https://ajolotelabs.ai/?_cb=$(date +%s)" | grep -oE 'style\.min\.css\?v=[a-zA-Z0-9-]+'` — should match `index.html` on `master`

## Hard stops
- **Dark theme only.** Cyan-tinted dark `#0a1a24` base. Never white backgrounds, never white cards.
- **No founder profile / About-Pablo / team page / founder photo.** Permanent positioning stake — enforced by `website-preflight.py`.
- All 6 CTAs route to `calendly.com/hello-ajolotelabs`. One conversion ask per section.
- Cyan accent (`#00e5ff`) on H1 marquee words, status pills, card border-beams.
- Scroll-snap pagination on desktop AND mobile (see `docs/scroll-system-spec.md`) — every section is one viewport.
- After editing `css/style.css`: rebuild `style.min.css` AND bump the cache-bust `?v=` on the `<link>` in `index.html`. Preflight will catch a stale minified file.
- Iterate on full HTML previews or Figma — never simplified wireframes.
- Quality bar to preserve: Lighthouse 100/100/100/100 (mobile + desktop, last audited 2026-05-08), WCAG 2.1 AA, no console errors, no 4xx, tested at 360/390/768/1024/1440. Don't regress without a written reason.
- License is proprietary — never re-publish copy verbatim outside ajolotelabs.ai.
