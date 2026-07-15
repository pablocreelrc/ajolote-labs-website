# Distyl — Design Teardown

Source: https://www.distyl.ai · Captured 2026-06-23 · Title: "Distyl — Architecting the AI-Native Enterprise"
Ground-truth artifacts: `references/raw/distyl.json`, `references/captures/distyl/{hero,mid,mobile,full}.png`

## Verbatim copy

**Hero H1** (line break preserved as in raw JSON):
> Architecting the
> AI-Native Enterprise

**Hero subhead:**
> Distyl partners with the most ambitious enterprises to design and operationalize their AI transformations. We do this by forward-deploying our teams of engineers and researchers who own the outcome, and deploying our purpose-built products that are customized to the business.

**Every section headline (in document order):**
- H1: "Architecting the / AI-Native Enterprise"
- H2: "AI outcomes, proven in production"
- H2: "Recent Media"
- H3: "Internet Up For Grabs: How AI Is Reshaping Value, Distribution, And Growth"
- H3: "Why Won't The Next Decade Of Business Resemble The Last Century?"
- H3: "AI Consulting Startup Founded By Ex-Palantir Raises At $1.8B Valuation"
- H2: "Thinking from the frontier"
- H2: "Signals from the frontier"

**CTA / nav labels (verbatim):** TECHNOLOGY · CASE STUDIES · COMPANY · SEE ALL POSTS · SUBSCRIBE · MEDIA@DISTYL.AI · INQUIRE@DISTYL.AI. Technology submenu labels include "Distillery — The operating system for enterprise AI", "Weave — Autonomous AI system construction", "Context Mesh — Enterprise knowledge, structured for AI", "Context Views — Enterprise semantic layer for agents", "Journey — AI voice layer for digital experiences", "Personalization — 1:1 customer engagement at enterprise scale", "Capture — Tacit knowledge capture at scale".

**Signature lines (word-for-word):**
- Manifesto: "Every real-economy business will become an AI business, much like many of the winners of the last two decades were built from the ground up as internet businesses."
- Stats subhead: "Distyl delivers production AI systems in weeks or months across some of the world's most complex operating environments."
- Stat note: "Measurable outcomes in weeks" / "Bottom-line impact in months, not years."

## Section-by-section IA

1. **Hero** (`hero.png`, top of `full.png`) — SECTION, `flex items-stretch px-[32px] py-[96px]`. Purpose: positioning statement. Content: serif H1 (two lines), with the subhead paragraph dropped to the lower-left of the same viewport (not directly under the H1). A faint sandstone-toned 3D wireframe/prism graphic bleeds off the top-right corner. Layout: left-aligned text column occupying the left ~half; large negative space; graphic anchored top-right. Header is transparent over the hero.

2. **Manifesto** (`full.png`, second band) — DIV, `bg-[var(--color-bg-primary)]`, pulled up with `-mt-[5svh]`. Purpose: thesis statement. Content: the single "Every real-economy business will become an AI business…" sentence set large in a muted/low-contrast serif on the left, paired with a thin-line wireframe cube/hexagonal-prism diagram on the right. Layout: two-column, generous vertical padding, very low ink density.

3. **AI outcomes / stats** (`full.png`, "Distyl delivers production AI systems…" line) — DIV `scroll-mt-20`, with separate `lg:hidden` (mobile) and `hidden lg:block` (desktop) SECTION variants. Purpose: social proof. Content: headline "AI outcomes, proven in production" + subhead, then three stat blocks: "150M+ — end users reached by our AI systems" (note: "Powering some of the largest agentic AI deployments to date."), "Trusted by Fortune 500s" (note: telecom, healthcare, manufacturing, insurance, retail), "Measurable outcomes in weeks" (note: "Bottom-line impact in months, not years."). Layout: headline left, stats arranged across the band.

4. **Recent Media** (`full.png`, "Recent Media" band) — SECTION `py-[var(--spacing-2xl)] md:py-[var(--spacing-3xl)]`. Purpose: press credibility. Content: three press cards, each with an eyebrow source label (WORLD ECONOMIC FORUM ×2, THE INFORMATION) above an H3 headline. Layout: 3-column card row with thin divider rules between cards; small placeholder/thumbnail areas atop each.

5. **Thinking from the frontier** (`mid.png`, `full.png`) — SECTION. Purpose: blog/thought-leadership feed. Content: section title "Thinking from the frontier" on the left with a "SEE ALL POSTS" pill below it; on the right, a vertical list of six posts, each a row with the title, a right-aligned category tag (ENGINEERING / FRONTIER / RESEARCH / NEWS), and a trailing chevron/arrow. A wide cityscape photo banner sits directly above this section (visible in `mid.png`). Layout: left label column + right list column, hairline dividers between rows.

6. **Signals from the frontier / newsletter** (`full.png`, bottom band) — SECTION `newsletter-section`. Purpose: email capture. Content: eyebrow "NEWSLETTER", heading "Signals from the frontier", an email input ("example@…"), and a SUBSCRIBE button. Layout: horizontal inline form, low-contrast on cream.

7. **Footer** (`full.png`, bottom) — dark navy band. Content: "MEDIA@DISTYL.AI | INQUIRE@DISTYL.AI | HOME | TECHNOLOGY | CASE STUDIES | ABOUT | BLOG | NEWS | CAREERS | RESEARCH | PRIVACY | TERMS | © 2026 Distyl AI".

## Visual system

**Palette (rgb → hex):**
- Body background: `rgb(247,242,232)` → `#F7F2E8` (warm cream)
- Body text: `rgb(0,0,0)` → `#000000`
- Hero background: `rgb(237,230,218)` → `#EDE6DA` (slightly darker cream)
- Header background: `rgba(0,0,0,0)` → transparent
- First button text/accent: `rgb(19,40,63)` → `#13283F` (dark navy)
- Footer background: `rgb(27,40,55)` → `#1B2837` (dark navy); footer text `rgb(255,255,255)` → `#FFFFFF`

No white backgrounds and no white cards anywhere — the entire light surface is cream, the only dark surface is the navy footer. Near-black text on cream; white on navy.

**Type:** Editorial serif/sans pairing. H1 = "Tiempos Headline", serif at 72px desktop. Body/paragraphs = "Plain", sans-serif at 16px (with a `ui-sans-serif, system-ui` fallback stack on the body element). Eyebrows and category tags render in small-caps/uppercase sans with tracking.

**Density & grid:** Very low ink density — large negative space, generous `py-[96px]` hero padding and `spacing-2xl/3xl` section padding. Tailwind utility classes (`px-[32px]`, `scroll-mt-20`, CSS custom properties like `--color-bg-primary`, `--spacing-3xl`) indicate a Tailwind grid/spacing system. Layouts are mostly two-column (label/left + content/right).

**Depth/border treatment:** Flat and minimal. Cards and list rows separated by hairline dividers rather than shadows or filled cards. No heavy elevation; the only depth cues are the soft 3D wireframe/prism graphics that are tone-on-tone with the cream background.

**Imagery style:** 30 imgs, 15 svgs, 1 canvas, 0 videos. Imagery is restrained: a desaturated/sepia cityscape photo banner above the blog feed, tone-on-tone sandstone wireframe geometry in the hero, and a thin-line wireframe cube in the manifesto. Press logos as text/eyebrow labels rather than graphic logos.

## Motion + implementation

**Animation library:** None detected. `animLibGlobals` and `animLibScriptMatches` are both empty — no gsap / anime / framer-motion / lottie / three / lenis globals on `window`. Site is built on **Next.js** (Turbopack, `_next/static/chunks` pattern). [verified-in-browser via raw JSON globals scan]

**Hero graphic:** A single `1000×1000` `<canvas>` element is present in the hero (`heroUsesCanvas: true`, `canvases: 1`). The hero 3D wireframe/prism visual is therefore a **custom canvas-rendered animation driven by bespoke JS**, not an off-the-shelf animation library and not a video (`heroUsesVideo: false`, `videos: 0`). The exact draw technique (raw 2D/WebGL context, particle vs. mesh) is not exposed in the artifacts. [canvas presence verified; specific render technique unverified]

**Other motion:** No notable scroll/parallax/marquee effects are evidenced in the artifacts. The static captures and the absence of any animation-library globals suggest a largely static, typographically-driven page apart from the hero canvas. [restraint inferred from absence of evidence — not a positive capture of zero motion]

## Proof mechanics

**Metric values:** One hard number — "150M+" end users reached. The other two proof blocks are qualitative: "Trusted by Fortune 500s" and "Measurable outcomes in weeks" / "Bottom-line impact in months, not years." A "$1.8B Valuation" figure appears, but only inside a quoted press headline, not as an owned stat.

**Card structure (stats):** value (or qualitative claim) as the lead line + a supporting note beneath ("Powering some of the largest agentic AI deployments to date."; sector list for Fortune 500s).

**Logos vs anonymized:** Clients are **anonymized** — no named-customer logos. Trust is asserted generically ("Fortune 500s", named sectors: telecom, healthcare, manufacturing, insurance, retail). Named entities appear only as press *sources*: WORLD ECONOMIC FORUM (×2) and THE INFORMATION, rendered as small uppercase eyebrow labels above press headlines.

**Quote/badge format:** No testimonial quotes or trust badges. Credibility is carried by press headlines (Recent Media) and the thought-leadership blog feed rather than customer quotes.

## Conversion

| CTA | Placement | Destination |
|---|---|---|
| TECHNOLOGY | Top nav | `/technology/distillery` (+ 7-item product submenu) |
| CASE STUDIES | Top nav | `/case-studies` |
| COMPANY | Top nav | `/about` |
| SEE ALL POSTS | Blog feed section | `/blog/all` (`btn-primary`) |
| SUBSCRIBE | Newsletter section | `<button>`, no href (form submit, `btn-primary`) |
| MEDIA@DISTYL.AI | Footer | `mailto:media@distyl.ai` |
| INQUIRE@DISTYL.AI | Footer | `mailto:inquire@distyl.ai` |

There is no booking/demo CTA and no Calendly-style scheduler. The primary conversion paths are (a) the newsletter SUBSCRIBE form, (b) two mailto links in the footer for press and inbound inquiry, and (c) navigation into Technology/Case Studies/Company content. Product submenu links each route to a dedicated `/technology/*` page.

## Responsive

Per `mobile.png`: single-column stack. Header keeps the "Distyl" wordmark left and collapses nav into a hamburger icon (top-right). The hero serif H1 wraps to two lines at reduced size, the subhead paragraph sits at the bottom of the hero block, and the sandstone wireframe graphic shifts to the right-center, smaller. The hero content sits inside a slightly inset cream card against the page cream. The codebase confirms responsive intent at the section level: the stats/outcomes section ships two explicit variants — `lg:hidden` (mobile) and `hidden lg:block` (desktop) — so that band is purpose-built per breakpoint rather than reflowed. Tailwind `md:` prefixes (e.g. `md:mt-0`, `md:py-[var(--spacing-3xl)]`) gate spacing changes across breakpoints.

## Confidence

- [verified-in-browser] All copy, headings, CTAs, hrefs, stats, palette rgb values, font families/sizes, framework (Next.js), section class names, and asset counts — taken directly from `raw/distyl.json`.
- [verified-in-browser] No external animation library (empty `animLibGlobals`/`animLibScriptMatches`); hero uses a 1000×1000 `<canvas>`.
- [verified-in-browser] Layout, two-column structure, cream palette, hairline-divider cards, cityscape banner, hamburger mobile nav — corroborated across `hero.png`, `mid.png`, `full.png`, `mobile.png`.
- [unverified] Exact canvas render technique (2D vs WebGL, particle vs mesh) — not exposed in artifacts.
- [unverified] Whether the hero canvas actually animates vs renders a static frame, and the absence of scroll/parallax motion site-wide — inferred from absent library globals and static captures, not a positive motion capture.
