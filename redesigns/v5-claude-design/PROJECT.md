# v5 — Mobile-first website revamp (Claude Design project brief)

**Prerequisite:** the Ajolote Labs design system must already be loaded and published in your Claude Design org. See `../../design-system/SETUP.md`. If the design system isn't loaded, this brief will produce wrong output — stop and load the system first.

**Paste everything below `--- BEGIN ---` into a new Claude Design prototype in the Ajolote Labs org. The design system applies automatically.**

---

## --- BEGIN ---

Build a single-page marketing website for Ajolote Labs at `ajolotelabs.ai`. Mobile-first — 375px is the primary design target, scale up to 1440px. Use the org design system for every style decision (colors, type, components, layout, motion). Don't re-describe the brand in the output — it's already loaded.

## The job

The current live site (v4.2) breaks on mobile in four measured ways:

1. **Services pipeline stages overflow their container by 200-250px** at 360/375/390/414 viewports. The three stage cards (`stg_01 / stg_02 / stg_03`) don't stack cleanly — internal content (status pills, badges, titles, lists) clips out of the card.
2. **Cases section renders at 0px height on mobile.** The 4 case cards are invisible — the carousel doesn't initialize and there's no fallback.
3. **Breath slab #2 renders at 0px on mobile.** Same scroll-snap interaction bug.
4. **Nav links, status pills, and the brand wordmark are 12-13px on mobile** — below the 14px legibility floor.

Revamp the mobile layout to fix all four. Preserve the desktop cinematic rhythm (billboard → instrument → breath → instrument → breath → close) — that layer already works.

## Page structure (6 sections, in order)

1. **Sticky nav** — logo + 3 anchor links + online status + primary CTA. Burger below 900px opens a full-screen overlay menu.
2. **Hero (hybrid)** — Cinematic H1 billboard above a dense command-center console. H1 copy: *"Stop losing money to manual operations."* (last line "manual operations" is the cyan→amber accent.) Console contains: tag `cmd · command-center`, paragraph, cyan punch line, two buttons, 3 metric cells (`skills_built 430+`, `loc_shipped 27K+`, `tests_passing 2,200+`), and a live log stream in a right rail (desktop only, hidden <1024px).
3. **Breath slab #1** — Full-bleed Satoshi display. Copy: *"From day one to full automation."* (accent: "to full automation.")
4. **Services** — Cinematic header "We embed. We build. We support it." + 3-stage pipeline. Desktop: horizontal with cyan connector dots. **Mobile: vertical stack, full-width, zero overflow.**
5. **Breath slab #2** — Copy: *"Real results from real operations."* (accent: "operations.")
6. **Cases** — 4 case-study panels. Pull content from `cases.json` (loaded in design system assets). **Mobile: render all 4, either as vertical stack or 1-per-viewport horizontal scroll-snap with dot pagination. Must work with no JS.**
7. **CTA** — Cinematic "Get your operations blueprint." + description + primary button + three check items (Free operations audit included, ROI projection before you commit, No contracts until you see results).
8. **Footer** — Brand block, two link columns (sec_01 services / sec_02 company), socials (email / LinkedIn / GitHub). Bottom strip: copyright + `status online`.

All copy is already in the design system reference files (`reference-index.html`, `cases.json`). Use it verbatim — don't rewrite.

## Mobile-first requirements (hard)

- **375px must work flawlessly.** Test the output at 360, 375, 390, 414.
- **Kill CSS scroll-snap on mobile** (`@media (max-width: 768px)`). Use `min-height: auto; display: block` for all sections on mobile.
- **Every tap target ≥ 44×44px.**
- **Every body font ≥ 14px.** Mono labels can be 10-12px, but anything meant to be read is 14px+.
- **Every section and card uses `overflow-x: clip`.** No component should exceed its parent.
- **Every section renders without JS.** Counters show final values, cases render from server HTML, log stream shows a static snapshot.
- **`prefers-reduced-motion: reduce`** disables cascade, parallax, counter ticks, bar fills, gradient sweeps — everything snaps to final state.

## Output

Standalone HTML: single `index.html`, one external `style.css` (or inlined critical + external), one external `main.js`. No framework. Fonts from Fontshare (Satoshi, General Sans) + Google Fonts (JetBrains Mono). Logo references `/assets/logo.webp` — I'll wire the path on my end.

## What "winning" looks like

- Services section renders cleanly at 375px — no clipped cards.
- Cases section shows all 4 case cards on mobile.
- Hero fits above the fold at 375px.
- No body text under 14px.
- Lighthouse mobile ≥ 90 perf, ≥ 95 accessibility.
- Visually reads as a working instrument panel, not a generic dark-SaaS template.

## --- END ---

---

## After export

1. Claude Design → export → **Standalone HTML**.
2. Drop the export into this folder. Target filenames: `index.html`, `style.css` (or `css/style.css`), `main.js` (or `js/main.js`). Keep any image assets under `assets/`.
3. Local preview:
   ```bash
   cd redesigns/v5-claude-design
   python -m http.server 8081
   # http://localhost:8081
   ```
4. Audit — I'll run `_mobile-diag.mjs` pointed at `localhost:8081` to grade v5 against the v4-2 baseline (`_mobile-diag.json`). The four pain points above must all test green.
