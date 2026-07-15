# Cognition — Design Teardown

Source artifacts: `references/raw/cognition.json` (captured 2026-06-23), screenshots in `references/captures/cognition/` (`hero.png`, `mid.png`, `full.png`, `mobile.png`). Note: `cognition.ai` redirects to `cognition.com` — the captured URL is `https://cognition.com/`. Observation only; no judgment on adoption.

---

## Verbatim copy

**Hero H1**
> "Cognition operates Devin, the first autonomous software engineer."

**Hero subhead (lead paragraph)**
> "We believe the purpose of technology is to expand human capacity — not by replacing meaningful work but by working alongside people as an exponential collaborator, helping them think deeper and move faster. We build tools for software creation because software shapes nearly every aspect of modern life. Cognition helps engineers operate more like architects: strategizing, designing systems, and focusing on problem solving, while agents handle the repetitive engineering work."

**Hero body (continued paragraph)**
> "Devin plans, writes, tests, and ships production code on its own, working inside your codebase and the tools your team already uses. Devin is deployed at some of the largest and most complex institutions in the world."

**Every section headline** (only two `<h*>` headings exist in the DOM per raw JSON):
- H1 — "Cognition operates Devin, the first autonomous software engineer."
- H2 — "Join the team"
- (Section label rendered as text, not a heading tag: "04. Articles")

**"Join the team" section copy (verbatim)**
> "We're defining the biggest shift in computing since the invention of software. Cognition is a team of interdisciplinary makers who love working on the hardest problems in AI. If you're interested in supporting the world's leading enterprises and technology companies, come build with us."

**CTA labels (verbatim from `ctas`):**
- "Contact" (×2)
- "Explore roles"

**Signature lines (word-for-word):**
1. "Cognition helps engineers operate more like architects: strategizing, designing systems, and focusing on problem solving, while agents handle the repetitive engineering work." (the "architects" phrase is rendered as an inline underlined link — visible in `hero.png`)
2. "Devin plans, writes, tests, and ships production code on its own…"
3. "We're defining the biggest shift in computing since the invention of software."

---

## Section-by-section IA

The homepage is a short single-scroll page (~1841px body height at 1440px wide per `designObservations.pageLength`), organized as an editorial magazine with visible section numbers `01`–`04` in the left gutter (see `hero.png` left margin "01"/"02").

**Fixed left sidebar nav** (`hero.png`, `full.png` left rail): logo glyph (flower/asterisk mark) at top, then vertical link list — Home (active, blue) / Careers / Research / Blog / Contact — followed by a bordered "Devin" pill button. The "01" section marker sits just below the logo.

1. **01 — Hero** (`hero.png`). Purpose: mission statement + product definition. Content: H1 ("Cognition operates Devin…") followed by two body paragraphs (the lead "We believe…" and the "Devin plans, writes…" paragraph). Layout: text block occupies right ~70% of the canvas, left-aligned, wide left margin where the nav and the "01" marker live. No media — pure type on off-white ground.

2. **02 — Logo / customer wall** (`hero.png` lower half + `full.png`). NOT captured as text in the JSON (the JSON labels 02–03 as "likely visual/media panels"), but the screenshots show it clearly: a grayscale customer logo grid marked "02" in the gutter. Roughly 5 columns × ~5 rows. Logos visible across `hero.png`/`full.png`: Citi, Mercedes-Benz, Goldman Sachs, Ramp, U.S. Army, Lowe's, Elevance Health, Rivian | Volkswagen Group Technologies, Anduril, Cisco, Infosys, American Navy, Wayfair, Dell, Itaú, Santander, Cognizant, [intact] Insurance, Nu, Cloudflare, NASA, exa, Northwestern (Northwestern Health), Comarch. All rendered monochrome gray. Layout: even grid, generous whitespace, no captions.

3. **03 — Join the team** (`mid.png` top, `full.png`). Purpose: careers pitch. Content: H2 "Join the team" + one paragraph + "Explore roles" bordered button. Layout: same left-aligned text column treatment as the hero; button is an outlined pill matching the "Devin" nav button style.

4. **04 — Articles** (`mid.png`, `full.png` bottom). Heading rendered as "04. Articles". Purpose: blog roll / proof of cadence. Content: 10 article cards, each with a 16:9 thumbnail (Sanity CMS images), title, and date — dates run 06.08.26 down to 02.24.26. Layout: horizontal carousel (note the left/right chevron controls at top-right of the row in `mid.png`); cards are full-bleed thumbnail tiles in a single row with title + date beneath each.

**Footer** (`full.png` bottom). Two columns of legal/social links: LinkedIn, X [Twitter], Website Terms of Use, Enterprise Terms of Service, Platform Terms of Service, Data Processing Addendum, Privacy Policy, Acceptable Use Policy, Report Vulnerability, Security. Logo + "Cognition" wordmark at left.

---

## Visual system

**Palette** (rgb values from raw JSON converted to hex):
- Background (body/footer): `rgb(247, 246, 245)` → **#F7F6F5** — warm off-white ground. Confirmed by CSS var `--color-background: #f7f6f5`.
- Text: `rgb(0, 0, 0)` → **#000000** — pure black.
- Header / hero / first button backgrounds: `rgba(0, 0, 0, 0)` → **transparent** (no fill; type sits directly on the ground).
- Accent: essentially none. Active nav item "Home" renders blue (visible in `hero.png`) — [unverified] exact hex, not sampled in JSON. Logo wall is grayscale.
- Verdict: near-monochrome. Off-white ground + black type, no decorative color.

**Type families + scale:**
- Headings / UI: **nbInternational** (grotesque sans), with "nbInternational Fallback". H1 sampled at `36px`.
- Body copy: **stkBureauSerif** (editorial serif), with "stkBureauSerif Fallback". Body sampled at `16px`; a `paragraph` sample reads `10px` (likely footer/fine print).
- Editorial pairing: grotesque sans display + serif body = premium publication aesthetic. Fonts self-hosted via Next.js font optimization (no CDN URLs in network).

**Density:** Sparse / confident. Very few CTAs (Contact ×2, Explore roles). Lots of negative space; large left gutter; short page.

**Grid:** 12-column CSS grid (Tailwind utilities). Container max-width **1440px** with `--container-padding: 64px`. The logo wall reads as a 5-column grid; alignment guide lines are faintly visible at the gutters in `hero.png`/`full.png`.

**Depth / border treatment:** Flat — no shadows, no elevation, no cards-with-fill. Buttons ("Devin", "Explore roles") are thin-outline pills on transparent ground. Thin hairline rules/guide markers in the gutters. The "architects" link is a simple text underline.

**Imagery style:** 10 images total, all blog thumbnails (16:9) from Sanity CDN; 0 video, 0 canvas, 32 SVGs (icons + logos + customer marks). No hero media — the hero is purely typographic. Customer logos in section 02 are uniformly desaturated to gray.

---

## Motion + implementation

**Animation library: none third-party — confirmed.** All of `gsap / anime / Framer / motion / lottie / ScrollMagic / Lenis / Webflow / THREE / Splitting / SplitType / barba` are `false` on `window` (`animLibGlobals`). No animation-library CDN URLs in network — all scripts are Next.js (Turbopack) chunks.

Stated approach (`animLib` / `animLibNotes`): **CSS transitions (Tailwind) + IntersectionObserver.** Tailwind classes like `transition-opacity duration-300` are present; `IntersectionObserver` is present (likely driving scroll-triggered fade-ins). The verdict is "minimal: CSS opacity/transition only."

Notable effects:
- **Scroll-triggered fade-ins** — sections/elements likely fade in on entering the viewport. Trigger: IntersectionObserver. Build: CSS `transition-opacity` (Tailwind), toggled by an observed class. Restraint: opacity-only, ~300ms; no transform-heavy choreography. [unverified] that fade-in is the exact behavior — inferred from the presence of IntersectionObserver + `transition-opacity` classes, not observed frame-by-frame in a static capture.
- **Articles carousel** — horizontal scroll with prev/next chevron controls (visible top-right of the row in `mid.png`). Build: [unverified] mechanism (CSS scroll-snap vs. JS transform); no carousel library detected in globals.

No hero video, no canvas/WebGL, no Lottie, no smooth-scroll hijack (Lenis absent). Motion is deliberately minimal.

---

## Proof mechanics

- **No numeric metrics on the homepage.** No stat counters, no "X% faster", no quantified claims rendered as figures. (The blog titles reference productivity — e.g. "Estimating the Productivity of an Autonomous AI Software Engineer" — but the homepage surfaces no metric values.)
- **Primary proof = a named-customer logo wall** (section 02). Logos are real, named brands (NOT anonymized): Citi, Mercedes-Benz, Goldman Sachs, Ramp, U.S. Army, Lowe's, Elevance Health, Rivian | Volkswagen Group, Anduril, Cisco, Infosys, American Navy, Wayfair, Dell, Itaú, Santander, Cognizant, [intact], Nu, Cloudflare, NASA, exa, Northwestern, Comarch. All shown as uniform grayscale marks — no tier labels, no captions, no quotes attached.
- **Card structure:** logo tiles carry only the logo (no name overlay except where the logo includes wordmark). Article cards carry thumbnail + title + date — no author, no excerpt.
- **No testimonial quotes, no badges, no certifications** rendered on the homepage. Implied authority comes from logo prestige (banks, defense, automotive) rather than quote/badge format.
- Copy-level proof claim (verbatim): "Devin is deployed at some of the largest and most complex institutions in the world."

---

## Conversion

Very low CTA count — confident, low-friction.

| CTA label | Placement | Destination |
|---|---|---|
| Contact | Header / nav area | `https://cognition.com/contact` |
| Contact | Second instance (nav/footer region) | `https://cognition.com/contact` |
| Explore roles | "Join the team" (section 03) | `https://cognition.com/careers` |

Supporting nav links (not primary CTAs): Home `/`, Careers `/careers`, Research `/research`, Blog `/blog`, Contact `/contact`, "Devin" button → `https://devin.ai/` (the product site, separate domain). Footer routes to legal + social (LinkedIn, X). There is no email-capture form, no demo-request modal, no pricing CTA on the homepage — conversion is funneled to Contact (enterprise sales) and Careers (hiring).

---

## Responsive (mobile)

From `mobile.png`:
- **Nav collapses** to logo glyph (top-left) + a text "Menu" trigger (top-right) — the desktop left sidebar rail is replaced. JSON notes a separate fixed mobile nav component (`fixed, inset-x-0 top-0 z-60`).
- **Hero** stacks full-width: H1 wraps to ~3 lines, body paragraphs flow below at comfortable measure. Same off-white ground, black serif body, sans heading.
- **Logo wall reflows to 3 columns** (vs. 5 on desktop) — Citi / Mercedes-Benz / Goldman Sachs in row 1, Ramp / U.S. Army / Lowe's in row 2, etc. Same grayscale treatment, generous vertical rhythm.
- Section gutter markers and the wide left margin are dropped; content goes edge-to-edge with side padding. The `--container-padding: 64px` desktop value is reduced on mobile [unverified — exact mobile padding not in JSON].
- Single-column, vertical-scroll layout throughout; no horizontal scroll artifacts visible.

---

## Confidence

**Verified in browser / directly in artifacts:**
- Hero H1, subhead, body, "Join the team" copy, CTA labels, all links/destinations — verbatim from raw JSON. (verified)
- Palette #F7F6F5 ground + #000000 text, transparent header/hero — from JSON rgb values + CSS var. (verified)
- Type families nbInternational + stkBureauSerif, H1 36px / body 16px. (verified)
- Grid: 1440px container, 64px padding, 12-col Tailwind. (verified — JSON)
- Stack: Next.js/Turbopack, Sanity CMS, Tailwind, Vercel, GTM. (verified — JSON)
- **No third-party animation library** — all motion globals false, no anim CDN; CSS transitions + IntersectionObserver. (verified — `animLibGlobals`)
- Customer logo wall with named brands, grayscale, ~5-col grid; 3-col on mobile; "Menu" mobile nav; articles carousel with chevrons. (verified — `hero.png`, `full.png`, `mid.png`, `mobile.png`)
- 10 article cards with titles + dates; no homepage metrics; no testimonials/badges. (verified — JSON + screenshots)

**Load-bearing [unverified] claims (minimized):**
1. Scroll-fade-in is the *specific* IntersectionObserver behavior (inferred from observer presence + `transition-opacity` classes, not observed in motion).
2. Active nav "Home" accent is blue — visible in `hero.png` but exact hex not sampled.
3. Articles carousel mechanism (CSS scroll-snap vs JS) — not determinable from artifacts.
4. Exact mobile container padding — not in JSON.

All four are non-structural; the core IA, copy, palette, typography, proof model, conversion, and animation verdict are fully verified.
