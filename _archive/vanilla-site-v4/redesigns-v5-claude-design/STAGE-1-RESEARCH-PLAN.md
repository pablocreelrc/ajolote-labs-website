# STAGE 1 — Deep reference teardowns (research / capture-only)

> Self-contained execution doc. A cold session can run Stage 1 straight from this file.
> **Scope:** per-site teardowns only. No edits to the live site. The cross-site
> "what should Ajolote adopt/adapt/reject" synthesis is **Stage 2** (separate, later).

## Why
Improving **ajolotelabs.ai** keeps failing when designed from imagination. Earlier research
was shallow — paraphrased from search, not visually verified (it called Distyl "dark" when it's
light). Stage 1 replaces it with **deep, browser-verified teardowns** of the firms that actually
do what Ajolote does (agent-infrastructure operators / FDE firms) + the brand's taste anchors.
**Everything verified by direct observation in a real browser; nothing inferred.**

## Hard constraint (why two phases)
chrome-devtools here is a **single shared Chrome** (`chrome-devtools-mcp@latest`, no isolation
flags — confirmed in `~/.claude.json`). Parallel agents cannot each drive their own browser; the
global "selected page" races. So: **serialize the browser capture, parallelize the writeups.**

## The 17 sites

**Operator/FDE peers → `references/operator-peers/<site>.md`**

| site | url |
|---|---|
| palantir | https://www.palantir.com |
| sierra | https://sierra.ai |
| cognition | https://cognition.ai |
| distyl | https://www.distyl.ai |
| mechanical-orchard | https://www.mechanical-orchard.com |
| cresta | https://cresta.com |
| happyrobot | https://www.happyrobot.ai |
| decagon | https://decagon.ai |
| ada | https://www.ada.cx |
| tribe-ai | https://www.tribe.ai |
| 11x | https://www.11x.ai |
| get10xai | https://www.get10xai.com |
| tomoro | https://tomoro.ai |
| maven-agi | https://www.mavenagi.com |

**Taste anchors (atmosphere/caliber only) → `references/anchors/<site>.md`**

| site | url |
|---|---|
| anduril | https://www.anduril.com |
| ramp | https://ramp.com |
| linear | https://linear.app |

All sites get the *same* deep teardown — no ranking, no priority. If a site isn't worth a full
teardown, cut it from the list; don't deprioritize it.

*Reuse: Phase-A already browser-verified palantir, anduril, ramp, distyl (`references/ux-ui/captures/`)
— deepen those to the full artifact set rather than restarting.*

## Two-phase method

### Phase 1 — Capture (SERIAL; shared browser)
One site at a time (never concurrent — shared Chrome). Per site, via chrome-devtools:
- `navigate_page` → URL; wait for load.
- `take_screenshot` at multiple scroll depths (hero + each major section + full page) → `references/captures/<site>/`.
- `take_snapshot` (DOM) + `evaluate_script` → sampled palette hex, type families + scale, section structure, computed styles on signature elements.
- `list_network_requests` + read `window` globals → **fingerprint the animation library** (GSAP / anime / Framer / Lottie / custom).
- `resize_page` ~390px → responsive read + screenshot.
- Dump all observations to `references/raw/<site>.json` (the ground-truth record).
- Flag (don't silently drop) any site that fails capture.

### Phase 2 — Teardown (PARALLEL fan-out; no browser)
One agent per captured site. Reads **only** its own `references/raw/<site>.json` + `references/captures/<site>/`
and writes the 8-point teardown. Quote from the raw dump only — nothing inferred.

### Phase 3 — Completeness check
Every chosen site has a complete 8-point file + screenshots, no `[unverified]` on load-bearing
claims, anim-lib confirmed wherever motion is notable. Any gap → re-run that one site.

## The 8-point teardown template (one .md per site)
1. **Verbatim copy** — exact hero H1 + subhead, every section headline, CTA labels, 2–3 signature lines. Word-for-word.
2. **Section-by-section IA** — each section: order, purpose, content, layout — with screenshot ref.
3. **Visual system** — sampled palette (hex), type families + scale, density, grid, depth/border, imagery style.
4. **Motion + implementation** — each notable effect: what / behavior (trigger, restraint) / how it's built (DOM, key CSS technique, animation lib fingerprinted via network + `window`). Technically replicable.
5. **Proof mechanics** — metric values, card structure, logos vs anonymized, quote/badge format.
6. **Conversion** — every CTA, placement, destination.
7. **Responsive** — mobile adaptation.
8. **Confidence** — everything tagged verified-in-browser; anything not directly seen flagged `[unverified]`.

**NOT in the teardown:** any "what should Ajolote steal" judgment — that biases the capture and is the wrong altitude. Deferred to Stage 2.

## Paths
- Outputs (all under already-gitignored `redesigns/v5-claude-design/`):
  - `references/operator-peers/<site>.md`, `references/anchors/<site>.md`
  - `references/captures/<site>/` (screenshots — third-party IP, gitignored)
  - `references/raw/<site>.json` (ground-truth capture record)
- Inputs (read for taste/guardrails): `ajolote-labs-website/design-system/DESIGN.md`, `ajolote-labs-website/brand-references/REFERENCES.md`, existing `references/`.

## Done when
- All 17 sites: complete 8-point file + screenshots, fully browser-verified, no `[unverified]` on load-bearing claims.
- Every site with notable motion: animation library/approach confirmed via network + globals.
- Spot-check 2–3 teardowns against their screenshots + the live site (verbatim copy + palette hex match).
