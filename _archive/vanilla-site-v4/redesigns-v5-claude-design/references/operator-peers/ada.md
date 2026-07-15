# Ada (ada.cx) — Design Teardown

Source artifacts: `references/raw/ada.json` (verbatim browser capture) and `references/captures/ada/{hero,mid,full,mobile}.png`. Page title: "AI Customer Service Agents For Quality CX At Scale | Ada". Framework: Astro (static site generator).

---

## 1. Verbatim copy

**Hero H1:** "The agentic customer experience platform"

**Hero subhead:** "AI customer service agents that resolve, act, and continuously improve. Designed for scale. Trusted by global brands."

**Every section headline (in DOM order, verbatim):**
- H1 — "The agentic customer experience platform"
- H1 — "Elevate your CX with AI agents proven to outperform humans"
- H1 — "Ada ACX: The AI customer experience operating model"
  - H3 — "ACX Platform"
  - H3 — "ACX Practice"
  - H3 — "ACX Experts"
- H1 — "AI purpose-built for your industry's toughest challenges"
- H1 — "Trusted by the world's leading enterprises"
- H1 — "Deliver extraordinary experiences on all the channels"
  - H2 — "42% reduction in average agent handle time"
  - H1 — "A teammate that delivers a notch above"
  - H2 — "84% automated resolution rate"
  - H1 — "Create more meaningful relationships"
  - H2 — "80% CSAT"
  - H1 — "Grow CX ambition, not cost"
  - H2 — "943% ROI in four months"
- H1 — "Power personalized AI experiences at scale with Ada's ACX Platform"
- H1 — "Battle-tested AI with enterprise-level rigor"
  - H2 — "Industry leading compliances"
  - H2 — "Safety and accuracy controls"
  - H2 — "Privacy-by-design"
  - H2 — "Enterprise grade security"
- H1 — "Insights to shape the future of AI-powered CX"
  - H1 — "Why AI agents get harder to scale, and how Playbooks solves it"
  - H1 — "Ask the expert: Why resolution is the real test of voice AI"
  - H1 — "Beyond FAQs: How leading brands automate complex customer service workflows with AI"
  - H1 — "AI customer service by industry: Where trust has been earned"
- H1 — "Accelerate your ACX strategy"

**CTA labels (verbatim):** "Speak to an expert" · "Listen to a real call" · "AI CX for financial services" · "AI CX for gaming" · "AI CX for retail" · "AI CX for technology" · "AI CX for travel" · "View Monday.com's Case Study" · "View Tilt's Case Study" · "View Loop's Case Study" · "View IPSY's Case Study" · "Learn more about Ada's trust and safety" · "Read" · "Learn more".

**Signature lines:**
- "AI agents that resolve, act, and continuously improve." (hero subhead)
- "A teammate that delivers a notch above" (section headline)
- "Grow CX ambition, not cost" (section headline)
- "Battle-tested AI with enterprise-level rigor" (section headline)
- Eyebrow/notification bar text (verbatim from header): "Agentic CX in 2026: What consumers expect and most enterprises miss" [verified in hero.png banner; full string present in screenshot]
- "PROUDLY CANADIAN - GLOBALLY TRUSTED" (hero footer microcopy, verified in hero.png / mobile.png)

---

## 2. Section-by-section IA

Ordered per `sections[]` in raw JSON. Full-page reference: `full.png`. Above-the-fold: `hero.png`. Mid-page platform/security detail: `mid.png`. Mobile: `mobile.png`.

1. **Hero** (`hero.png`) — Purpose: positioning + primary conversion. Left column holds H1 + subhead + "PROUDLY CANADIAN - GLOBALLY TRUSTED" microcopy. Right column holds a floating white product card (branded "branch") with an embedded "Listen to a real call" button. Full-bleed blurred photographic background (warm golden/blue motion-blur field). Transparent nav bar over the hero. A thin notification/eyebrow bar sits above the nav.

2. **Logo marquee** (`full.png`, top band) — Purpose: instant social proof. `div.logo-marquee` — horizontally scrolling customer logo strip with edge mask fade (`mask-x-from-90%`). Single full-width row.

3. **Stat cards** (`full.png`) — Headline "Elevate your CX with AI agents proven to outperform humans". Purpose: quantified social proof. `section.stat-cards` constrained to `max-w-6xl`. Card grid of metric tiles.

4. **ACX operating model** (`full.png`) — Headline "Ada ACX: The AI customer experience operating model". White-fr background, charcoal text. Three labeled pillars: ACX Platform / ACX Practice / ACX Experts (H3 sub-headings). Three-column layout.

5. **Industry verticals** (`full.png`) — Headline "AI purpose-built for your industry's toughest challenges". Wine-colored background, white text. Cards/links for Financial Services, Gaming, Retail, Technology, Travel (each a "AI CX for ___" CTA).

6. **Customer case studies** (`full.png`) — Headline "Trusted by the world's leading enterprises". Purpose: proof via named brands + metrics. Stacked rows pairing a channel headline ("Deliver extraordinary experiences on all the channels", "A teammate that delivers a notch above", "Create more meaningful relationships", "Grow CX ambition, not cost") with an H2 metric and a per-brand case-study CTA (Tilt, Betsson/Loop, IPSY, Monday.com).

7. **Platform showcase** (`mid.png`, `full.png`) — Headline "Power personalized AI experiences at scale with Ada's ACX Platform". White-fr background. Left column = feature bullet list ("Continuous improvement of agent performance", "Deliver extraordinary, multilingual CX", "Extend Ada to your enterprise workflows", "Smart, accurate, safe, and CX-tuned"); right column = a product UI screenshot composited over a laptop/desk photo (visible in `mid.png`).

8. **Trust / security** (`mid.png`, `full.png`) — Headline "Battle-tested AI with enterprise-level rigor". Graphite background, white text. Four sub-pillars (H2): Industry leading compliances / Safety and accuracy controls / Privacy-by-design / Enterprise grade security. Icon row across the top.

9. **Insights / resources** (`full.png`) — Headline "Insights to shape the future of AI-powered CX". Blog/resource card grid (4 items, each an H1) with thumbnail images and a "Read" CTA.

10. **Final CTA** (`full.png`, bottom) — Headline "Accelerate your ACX strategy". `div.relative.isolate` band with the "Speak to an expert" button, followed by the footer (Platform / Channels / Industries / Resources / Ada Labs / Company columns).

---

## 3. Visual system

**Palette** (raw JSON uses OKLCH + transparent rgba; OKLCH converted to sRGB hex):

| Token | Source value | Hex |
|---|---|---|
| Body background / white-fr | `oklch(0.9821 0 129.63)` | `#f9f9f9` (off-white) |
| Body text | `oklch(0.1489 0.0027 248.08)` | `#0a0b0c` (near-black) |
| Primary button bg | `oklch(0.8346 0.0735 257.42)` | `#abcbf9` (light periwinkle) |
| Section: graphite | `oklch(0.331 0.0104 253.98)` | `#32363b` |
| Section: wine | `oklch(0.3125 0.0278 328.73)` | `#392c38` |
| Header / hero / footer bg | `rgba(0,0,0,0)` | transparent (overlay on bg) |

Light/off-white is the dominant base; alternating dark section bands (wine `#392c38`, graphite `#32363b`) create rhythm. Button text is the near-black `#0a0b0c` on the periwinkle pill.

**Type:** Single family — **Roobert** (self-hosted subset, hash `ba738358087e4b5a`), with `ui-sans-serif, system-ui, sans-serif` fallback. Used across body, headings, and paragraphs (no secondary display face).
- H1: 72px
- Paragraph: 18px
- Body base: 16px

**Density / grid:** Generous whitespace; sections use large vertical rhythm via Tailwind spacing (`my-72`/`py-72`, `lg:my-120`/`lg:py-120`, `lg:py-160`). Content constrained by `container` and `max-w-6xl`. Multi-column card grids (3-up pillars, 4-up resource cards). Tailwind utility classes throughout (`gap-12`, `rounded-full`, `shrink-0`).

**Depth / borders:** Pill-shaped CTAs (`rounded-full`). Hero product card is a floating white rounded panel with soft shadow over the photographic hero (`hero.png`). Edge-fade mask on the logo marquee (`mask-x-from-90%`). Dark section bands provide contrast-based depth rather than heavy borders.

**Imagery:** 74 `<img>`, 49 SVG (icons + illustrations), 5 `<video>` (Wistia embeds), 0 `<canvas>`. Style mixes (a) full-bleed warm motion-blur photographic hero, (b) real-world desk/laptop product-context photos with composited UI screenshots (`mid.png`), (c) brand logos, and (d) line-icon SVGs in the trust/security row.

---

## 4. Motion + implementation

Animation stack confirmed from `animLibGlobals` + `animScripts` in raw JSON:
- **GSAP ScrollTrigger** — bundled standalone (`_astro/ScrollTrigger.C0eCJjti.js`). Note: full GSAP core is **not** on `window` (`gsap: false`); ScrollTrigger is loaded as a separate Astro chunk. Drives scroll-triggered reveals/pinning. [Library presence verified; exact per-element bindings unverified]
- **Lottie (light build)** — `lottie: true` on window, `_astro/lottie_light.COqd-Z14.js`. Hero has no direct `<img>`/`<video>`/`<canvas>` child (per `imagery.notes`), so the hero's animated mark (the vertical-bar glyph visible in `mobile.png`) is likely a Lottie animation. [Lottie confirmed loaded; hero-specific use inferred]
- **CountUp.js** — `_astro/countUp.min.bkv6uBOp.js`. Animates the large metric numbers (42%, 84%, 80%, 943%) counting up on scroll-into-view. [Library confirmed; binding to the stat headings inferred from metric presence]
- **Swiper** (`swiper-element-bundle`) — web-component carousel; powers a horizontal slider (logo marquee and/or card carousels).
- **Alpine.js** + `@alpinejs/collapse` + `@alpinejs/focus` — lightweight interactivity (nav menus, accordions, focus trapping for menus/modals).
- **Wistia** (`publicApi.js`) — the 5 video embeds; powers "Listen to a real call" / product demo media.

Explicitly **absent**: anime.js, Framer/motion, ScrollMagic, Lenis (no smooth-scroll lib), THREE.js, Splitting/SplitType, Barba.

Net: motion is restrained and conversion-functional — scroll-reveal section entrances (GSAP ScrollTrigger), number count-ups (CountUp), a Lottie hero glyph, and carousels (Swiper). No WebGL, no custom-cursor, no smooth-scroll hijack. Architecturally these are Astro-shipped JS islands, hydrated per component rather than one global animation runtime.

---

## 5. Proof mechanics

**Metric values (H2, verbatim):** "42% reduction in average agent handle time" · "84% automated resolution rate" · "80% CSAT" · "943% ROI in four months". Plus copy "across 85+ countries" (per `sections[].gist` for the trust band).

**Card structure:** Case-study proof pairs a benefit headline (H1) with a big metric (H2) and a named-brand CTA. Per the case-study section gist, attribution maps as: Tilt → 42% AHT reduction; Betsson → 84% automated resolution; IPSY → 80% CSAT; Monday.com → 943% ROI. Each has its own "View ___'s Case Study" button linking to a dedicated `/case-study/` page.

**Logos vs anonymized:** Fully named, not anonymized. Logo marquee shows real brand logos (Sky.com, monday.com, sky visible in `mobile.png`/`full.png`). Case studies name Tilt, Loop (Loop Earplugs), IPSY, Monday.com, Betsson — each links to a real `ada.cx/case-study/...` URL.

**Quote / badge format:** Section eyebrow "Trusted by the world's leading enterprises". Hero badge microcopy "PROUDLY CANADIAN - GLOBALLY TRUSTED" with a flag glyph (`hero.png`). Trust section lists compliance pillars (Industry leading compliances / Safety and accuracy controls / Privacy-by-design / Enterprise grade security) as badge-like icon+heading blocks. No explicit pull-quote testimonial text is captured in the artifacts. [Customer-quote presence beyond metrics — unverified]

---

## 6. Conversion

| CTA label | Tag | Destination | Placement |
|---|---|---|---|
| Speak to an expert | A | `https://www.ada.cx/demo/` | Nav bar (top-right) + final CTA section |
| Listen to a real call | BUTTON | (no href — opens media/Wistia) | Hero product card |
| AI CX for financial services | A | `/industry/financial-services/` | Industry verticals section |
| AI CX for gaming | A | `/industry/gaming/` | Industry verticals section |
| AI CX for retail | A | `/industry/ecommerce/` | Industry verticals section |
| AI CX for technology | A | `/industry/saas/` | Industry verticals section |
| AI CX for travel | A | `/industry/travel/` | Industry verticals section |
| View Monday.com's Case Study | A | `/case-study/monday-com/` | Case-study section |
| View Tilt's Case Study | A | `/case-study/tilt/` | Case-study section |
| View Loop's Case Study | A | `/case-study/loop-earplugs/` | Case-study section |
| View IPSY's Case Study | A | `/case-study/ipsy/` | Case-study section |
| Learn more about Ada's trust and safety | A | `/platform/trust/` | Trust/security section |
| Read | A | `/blog/agentic-ai-customer-experience-playbooks/` | Insights/resources section |
| Learn more | A | `/platform/voice` | (channels/voice context) |

Primary conversion = "Speak to an expert" → `/demo/`, repeated top (nav) and bottom (final CTA "Accelerate your ACX strategy"). Secondary/soft CTA = "Listen to a real call" (in-hero media). The nav also exposes a "Get the Report" button (visible top-right in `hero.png`) tied to the eyebrow report banner [seen in screenshot; not in CTA list of raw JSON]. CTAs are not single-purpose: industry and case-study links route to deep content rather than the demo funnel.

---

## 7. Responsive (`mobile.png`)

- **Nav collapses** to a logo + hamburger pill (rounded). The full primary link set is hidden behind the menu; the persistent "Speak to an expert"/"Get the Report" buttons drop out of the top bar.
- **Hero restacks to single column.** The floating "branch" product card is removed; instead the Lottie-style animated glyph (vertical bars) sits centered at top, with the "Listen to a real call" pill below it, then the H1 + subhead, then "PROUDLY CANADIAN - GLOBALLY TRUSTED" microcopy. Order is media → CTA → headline → microcopy.
- **Background photo** still full-bleed behind the hero.
- **Logo strip** wraps to a smaller row (Sky.com, monday.com, sky visible) below the fold.
- Type scales down from the 72px desktop H1; spacing uses the non-`lg:` Tailwind values (`my-72`/`py-72` rather than `lg:my-120`).
- Multi-column grids (pillars, case studies, resource cards) are expected to collapse to single-column stacks on mobile. [Below-fold mobile stacking inferred from the layout system; `mobile.png` only captures the hero region — unverified for lower sections]

---

## 8. Confidence

**Verified in browser (from raw JSON capture):** all hero/section/CTA copy; metric values; CTA hrefs; nav/industry/resource link sets; OKLCH palette values; Roobert font + 72/18/16px scale; framework = Astro; image/SVG/video counts; animation library presence (GSAP ScrollTrigger, Lottie light, Swiper, CountUp, Alpine + collapse/focus, Wistia) and the absence of anime/Framer/motion/ScrollMagic/Lenis/THREE/Splitting/SplitType/Barba.

**Verified in screenshots:** hero two-column layout + floating product card (`hero.png`); section banding and order (`full.png`); platform UI-over-photo composite and trust icon row (`mid.png`); mobile hero restack + hamburger (`mobile.png`); "PROUDLY CANADIAN - GLOBALLY TRUSTED" and "Get the Report" / eyebrow banner.

**Load-bearing [unverified] claims (minimized):**
1. Hero animated glyph is specifically a Lottie animation (Lottie *is* confirmed loaded; the hero having no direct img/video/canvas child supports it, but the exact element is inferred).
2. CountUp drives the specific metric H2s (CountUp confirmed loaded; binding inferred from metric presence).
3. Below-the-fold mobile sections collapse to single-column (inferred from Tailwind responsive classes; `mobile.png` shows only the hero).

Non-load-bearing inferences (GSAP ScrollTrigger binding to specific reveals, Swiper driving the marquee vs. CSS animation, presence of customer pull-quotes beyond metrics) are flagged inline above.
