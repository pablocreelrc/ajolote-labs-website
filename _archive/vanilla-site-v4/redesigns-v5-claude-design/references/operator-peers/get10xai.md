# get10xai — Design Teardown

Source: https://www.get10xai.com
Ground-truth artifacts: `references/raw/get10xai.json` + `references/captures/get10xai/{hero,mid,full,mobile}.png`
Page title: "10x AI - Stop Losing Customers While You're Busy Working"

---

## 1. Verbatim copy

**Hero eyebrow:** "YOUR 24/7 AI WORKFORCE"

**Hero H1:** "Turn missed calls into confirmed revenue"

**Hero subhead:** "We engineer AI agents that handle your calls, chats, and workflows with surgical precision. No delays. No excuses. Just measurable results."

**Every section headline (in DOM order):**
- H2: "Three precision tools for 10x growth"
  - H3: "Voice Agents"
  - H3: "Chat Agents"
  - H3: "Workflow Agents"
- H2: "Real results from real businesses"
  - H3: "Tripled qualified leads with AI-powered outreach"
- H2: "From zero to 10x"
  - H3: "Strategy"
  - H3: "Build"
  - H3: "Launch"
- H2: "Build your automation blueprint"

**Section eyebrows (from `notes`/`sections.gist`):** "TRUSTED BY INDUSTRY LEADERS", "SERVICES", "CASE STUDIES", "OUR PROCESS", "READY TO TRANSFORM?"

**CTA labels (verbatim, from `ctas`):** "Book a Call", "Book a Discovery Call", "Learn more", "Get Your Free Analysis", "Contact"

**Signature lines (verbatim from `gist`):**
- "Three precision tools for 10x growth Deploy AI agents that work around the clock, handle unlimited conversations, and scale with your business."
- "A proven methodology refined across dozens of successful implementations."
- "Book a discovery call and we'll map out exactly how AI agents can 10x your business operations."
- Process step copy (mid.png, verbatim): "We analyze your business operations, identify automation opportunities, and create a precision roadmap for maximum impact." / "Custom AI agents engineered, trained, and tested specifically for your workflows. No templates—pure precision."

---

## 2. Section-by-section IA

Order from `sections[]` in raw JSON, cross-referenced with screenshots.

1. **Hero** — `hero.png`. Purpose: positioning + primary conversion. Eyebrow "YOUR 24/7 AI WORKFORCE", serif H1, sans subhead, two CTAs ("Book a Discovery Call" primary cyan pill, "See Case Studies" outline). Right side: a stylized "SaaS Dashboard" product mockup with a "LIVE" badge and cyan-accented analytics charts. Bottom: a 3-up inline stat row — "48hr Average deployment / 24/7 Always operational / 10X Efficiency gains". Layout: two-column (copy left, mockup right) on a near-black `hsl(0,0%,4%)` background. Class: `relative min-h-screen bg-[hsl(0,0%,4%)] overflow-hidden`.

2. **Social proof / stats ticker** — visible in `full.png` (white band). Eyebrow "TRUSTED BY INDUSTRY LEADERS". Content: a metrics ticker — "64% booking increase / 3 min claim resolution / 72 hrs to market / $72K dev savings / 47% cost reduction / 3x more leads". Layout: white background band, `py-24 bg-white border-b border-gray-100`. No logos present (see §5).

3. **Services** — `mid.png` shows the dark-band style; this is the "Three precision tools for 10x growth" block. Eyebrow "SERVICES". Three H3 cards: "Voice Agents", "Chat Agents", "Workflow Agents". Subhead "Deploy AI agents that work around the clock…". Layout: dark `bg-[hsl(0,0%,4%)] blueprint-lines` (note the `blueprint-lines` class — faint engineering grid in the background, visible in mid.png).

4. **Case studies** — `full.png` (lower white band). Eyebrow "CASE STUDIES", H2 "Real results from real businesses". One featured case: "Sanitol Lead Generation" with H3 "Tripled qualified leads with AI-powered outreach". Visible card: metric trio "18 hrs weekly time saved / 95% attendance rate / 64% booking increase", H3 "Automated bookings and maximized court utilization", an italic pull-quote "Our staff now focuses on coaching, not admin work.", three tag pills ("Booking Automation", "Payment Processing", "Member Management"), and a "Get similar results →" link. Layout: white `py-32 bg-white`, serif metric numbers over sans labels.

5. **Process** — `mid.png`. Eyebrow "OUR PROCESS", H2 "From zero to 10x", subhead "A proven methodology refined across dozens of successful implementations." Three numbered steps (large ghost numerals "01", "02", "03"): "01 Strategy / DISCOVERY", "02 Build / DEVELOPMENT", "03 Launch". Each step pairs a heading + cyan kicker + body with a dark detail card listing bullet items (e.g., "Workflow mapping / ROI projection / Integration planning"; "Agent development / Training & tuning / Quality assurance"). Layout: alternating left/right zig-zag down a vertical cyan connector line, dark `bg-[hsl(0,0%,4%)] relative overflow-hidden`.

6. **Final CTA** — Eyebrow "READY TO TRANSFORM?", H2 "Build your automation blueprint", subhead "Book a discovery call and we'll map out exactly how AI agents can 10x your business operations." CTA into Calendly. Layout: dark `bg-[hsl(0,0%,4%)] relative overflow-hidden`.

7. **Footer** — referenced in `palette.footer` (`rgb(8,8,8)` bg, white text). Not separately captured in detail.

Nav (all screenshots): logo "10x AI" left; "Services / Case Studies / Process" center-right; "Book a Call" cyan pill far right. Transparent header (`rgba(0,0,0,0)`).

---

## 3. Visual system

**Palette (rgb→hex converted from `palette`):**
- Body bg `rgb(255,255,255)` → `#FFFFFF`; body text `rgb(10,10,10)` → `#0A0A0A`
- Header bg `rgba(0,0,0,0)` → transparent; header text `#0A0A0A`
- Hero bg `rgb(10,10,10)` → `#0A0A0A` (CSS class uses `hsl(0,0%,4%)` ≈ `#0A0A0A`)
- Button bg transparent; button text `rgba(255,255,255,0.7)` → `#FFFFFF` @ 70% opacity
- Footer bg `rgb(8,8,8)` → `#080808`; footer text `#FFFFFF`
- Accent (sampled from screenshots, [unverified] exact hex): cyan/teal in the ~`#22D3EE`–`#2DD4BF` family — used on the "confirmed" H1 word, CTA pills, "LIVE" dot, chart lines, step bullets, and kicker labels.

**Type families + scale (from `fonts`):**
- H1: "Playfair Display", Georgia, serif — 72px (the serif display face; note "10x" in "From zero to 10x" and case-study metric numerals also render in this serif)
- Body: Inter, system-ui, sans-serif — 16px
- Paragraph: Inter — 14px
- Pattern: serif for big display moments + numerals, Inter sans for everything functional (eyebrows, body, labels, nav).

**Density:** generous — sections are `py-24`/`py-32`, lots of negative space (full.png shows large empty dark/white expanses between content blocks).

**Grid:** two-column hero; 3-up service and process layouts; case-study zig-zag. Process section uses a faint `blueprint-lines` background grid (engineering-blueprint motif).

**Depth / border treatment:** mostly flat. Cards are subtly elevated dark panels with rounded corners and faint borders (mid.png detail cards). Social-proof band separated by a hairline `border-b border-gray-100`. The hero product mockup has a soft drop shadow. Subtle cyan glow on the "confirmed" H1 word and around active elements.

**Imagery style:** 13 imgs, 19 svgs, 0 videos, 0 canvases. Hero has no video/canvas — the "live dashboard" is a static styled mockup image. SVGs carry the iconography (service/process icons, logo, chart glyphs). Aesthetic: dark "engineering/SaaS product" with cyan data-viz accents; light bands for proof/case content.

---

## 4. Motion + implementation

**Animation library: none detected.** `animLibGlobals` is all `false` (no gsap, anime, Framer/motion, lottie, ScrollMagic, Lenis, Webflow, THREE, Splitting, SplitType, barba). `animLibNetworkMatches` is empty. Network scripts are only the app bundle `index-D0KGWUrM.js` and Replit's dev banner. Verdict in raw JSON: "none detected — … site uses CSS transitions/Tailwind only".

**How it's built:** React SPA (single Tailwind-bundled `index-D0KGWUrM.js`, served via Replit/Cloudflare). Motion is therefore CSS-transition / Tailwind-utility based, not JS-orchestrated.

**Notable effects (inferred from CSS class names + screenshots — behavior [unverified] without live capture):**
- Cyan glow on the "confirmed" word and CTA pills — a static/transition CSS effect (text-shadow / box-shadow), not a scripted animation.
- "LIVE" badge with a cyan dot — likely a CSS `@keyframes` pulse [unverified].
- `blueprint-lines` background on Services/Process — a static CSS background pattern, not motion.
- Hover transitions on CTAs/cards — standard Tailwind `transition` utilities [unverified].

No scroll-jacking, no parallax library, no canvas/WebGL, no Lottie. Any reveal-on-scroll, if present, would be CSS/IntersectionObserver in the bundle — not confirmable from these artifacts. [unverified]

---

## 5. Proof mechanics

**Stats ticker (social proof band):** six raw metrics, no per-client attribution — "64% booking increase", "3 min claim resolution", "72 hrs to market", "$72K dev savings", "47% cost reduction", "3x more leads". Under the eyebrow "TRUSTED BY INDUSTRY LEADERS" — but **no client logos are present** in the artifacts; proof is metric-only, partially anonymized ("industry leaders" claimed, not named beyond the one case study).

**Hero inline stats:** "48hr Average deployment", "24/7 Always operational", "10X Efficiency gains" — large serif numeral + small sans label.

**Case study card structure (full.png):**
- Named client: "Sanitol" (case labeled "Sanitol Lead Generation"); headline result "Tripled qualified leads with AI-powered outreach" / "3x qualified leads, 40% more contracts, 10 sec response time" (from `notes.caseStudy`).
- Visible card variant: metric trio "18 hrs weekly time saved / 95% attendance rate / 64% booking increase" → H3 "Automated bookings and maximized court utilization".
- Quote format: italic pull-quote with a left vertical rule — "Our staff now focuses on coaching, not admin work."
- Badge/tag format: rounded outline pills below the quote — "Booking Automation", "Payment Processing", "Member Management".
- Card CTA: "Get similar results →" text link.

**Logos vs anonymized:** named client = Sanitol; the broader "TRUSTED BY INDUSTRY LEADERS" band shows numbers only, no logo wall. Quotes are attributed by role/context, not (visibly) by named person. [unverified — no logo imagery in captures]

---

## 6. Conversion

Single conversion destination: **`https://calendly.com/get10xai/discovery`** — every linked CTA in `ctas` points there.

| CTA label | Placement | Destination |
|---|---|---|
| "Book a Call" | Nav header pill (and a `<button>` variant) | calendly.com/get10xai/discovery |
| "Book a Discovery Call" | Hero primary CTA (cyan pill) (+ `<button>` variant) | calendly.com/get10xai/discovery |
| "Learn more" | Services / inline | calendly.com/get10xai/discovery |
| "Get Your Free Analysis" | Final CTA section (+ `<button>` variant) | calendly.com/get10xai/discovery |
| "Contact" | Footer/nav | calendly.com/get10xai/discovery |
| "See Case Studies" | Hero secondary (outline) | anchor to case-studies section [unverified — not in `ctas` href list] |
| "Get similar results →" | Case-study card | [unverified destination] |

Pattern: one funnel (Calendly discovery call), restated as primary CTA in hero, nav, and closing section. Secondary buttons are navigational, not conversion.

---

## 7. Responsive

From `mobile.png`: single-column stack. The hero **reorders** so the product/dashboard mockup sits **above** the copy (mockup → eyebrow "YOUR 24/7 AI WORKFORCE" → H1 → subhead → CTA), inverting the desktop left-copy/right-mockup two-column layout. H1 wraps to three lines ("Turn missed / calls into / confirmed revenue") and the serif size scales down from the 72px desktop value. CTA "Book a Discovery Call" becomes a full-width-ish cyan pill. Nav collapses to a logo + hamburger (three-line icon top right); the "Book a Call" pill and center links are hidden behind the menu. Generous vertical rhythm preserved. [unverified: exact mobile breakpoints and whether the secondary "See Case Studies" button persists on mobile — not visible in the single mobile capture.]

---

## 8. Confidence

**Verified in browser (from raw JSON captured in a real browser):** all hero/section/CTA copy and eyebrows; CTA destinations (single Calendly link); palette rgb values; font families + sizes; section classNames and order; imagery counts (13 img / 19 svg / 0 video / 0 canvas); the animation-library verdict (all globals false, no anim libs in network) — **animation approach is confirmed: CSS/Tailwind transitions only, no JS animation library.**

**Verified via screenshots:** two-column hero with product mockup + "LIVE" badge; hero inline stat trio; dark/white band alternation; process zig-zag with ghost numerals and cyan connector; case-study metric trio + italic quote + tag pills + "Get similar results" link; mobile single-column reorder + hamburger nav.

**Load-bearing [unverified] claims (minimized):**
1. Exact accent hex (cyan family ~`#22D3EE`) — sampled from screenshots, not given as a numeric value in `palette`.
2. "LIVE" dot pulse / card hover transitions — inferred CSS behavior, not confirmed from a motion capture.
3. "See Case Studies" and "Get similar results →" destinations — not in the `ctas` href list (anchors/unknown).

All copy and metrics are quoted verbatim from `references/raw/get10xai.json`; none invented.
