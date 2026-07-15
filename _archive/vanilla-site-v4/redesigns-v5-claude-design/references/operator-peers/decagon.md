# Decagon — Design Teardown

> Source: `references/raw/decagon.json` (captured in a real browser 2026-06-23) + `references/captures/decagon/{hero,mid,full,mobile}.png`. Observation only — no recommendations.
> Title tag: "Decagon | The AI concierge for every customer". Build platform: Webflow.

## 1. Verbatim copy

**Hero H1:**
> "The AI concierge for every customer"

**Hero subhead:**
> "Build, optimize, and scale AI agents that treat every customer like the only one."

**Every section headline (verbatim from `allHeadings`):**
- H2 — "Powering concierge experiences for the world's leading enterprises."
- H3 — "Build your agent"
- H3 — "Optimize your agent"
- H3 — "Scale your agent"
- H3 — "Your business evolves.\nYour AI agent should too." (line break after "evolves.")
- H2 — "Build once.\nDeploy everywhere." (line break after "once.")
- H2 — "Instant ROI on the metrics that matter."
- H2 — "The latest research, news, and insights from Decagon."
- H2 — "Footer"
- H3 (footer columns) — "Product", "Industries", "Resources", "Company"

**Eyebrow / kicker labels above headlines (from section `fullText`):**
- "The Decagon difference"
- "Complete, unified platform" (above "Build your agent")
- "Omnichannel by design" (above "Build once. Deploy everywhere.")
- "See what's possible" (above "Instant ROI on the metrics that matter.")
- "The Decagon Resource Hub"

**CTA labels (verbatim from `ctas`):**
- "Learn more"
- "Contact Sales"
- "Contact Support"
- "Get a demo"
- "See all customer stories"
- (also seen in screenshots/text: "Read story", "See more resources", "Sign in")

**Signature lines (word-for-word):**
1. "Agent Operating Procedures (AOPs) let you define agent workflows in natural language, so you can refine behavior and optimize performance as fast as your business moves."
2. "Decagon unifies chat, voice, and email within a single intelligence layer, ensuring customer experiences stay consistent across every channel."
3. Customer quote: "With Decagon Voice, we're able to combine high performance and seamless brand customization with cross-channel memory, ensuring every interaction is connected and true to Chime's member-first values." — Janelle Sallenave, Chief Operating Officer
4. Final CTA section: "The AI concierge for every customer." / "Get a demo"
5. Hero canvas overlay micro-copy: "I've applied your / membership perks." · "Extending your rental / for the weekend." · "You're rebooked for / a spa appointment."

## 2. Section-by-section IA

Order from `sections[]` (note: index 1 absent in JSON — likely the logo/announcement strip). Screenshot map: `hero.png` (top fold), `mid.png` (Voice/Chat/Email + ROI band), `full.png` (whole page), `mobile.png` (375-ish viewport top fold).

| # | Section | Purpose | Content | Layout | Screenshot |
|---|---------|---------|---------|--------|-----------|
| 0 | Hero | Top-of-funnel hook + capture | H1 + subhead + inline email field with "Get a demo"; animated canvas behind with floating chat-bubble overlays ("You're rebooked for a spa appointment", etc.) | Left-aligned text on light-grey hero, full-bleed canvas/imagery to the right, pill-shaped email-capture bar | `hero.png`, `mobile.png` |
| (1) | Announcement bar | Promote launch | "Introducing Duet Autopilot. Learn more" | Thin white centered bar pinned above header | `hero.png`, `mobile.png` |
| 2 | Customer logos + featured story | Enterprise proof | "Powering concierge experiences for the world's leading enterprises." + subhead + "See all customer stories"; Chime quote card + "70% chat and voice resolution" + "Read story" | Logo wall, then a featured testimonial card with headshot + metric callout | `full.png` (upper-mid) |
| 3 | The Decagon difference | Product differentiation | "Move past complex configuration languages…" + AOPs natural-language paragraph + "Learn more" | Text block with an animated/3D abstract visual (glowing stacked-plane render) | `full.png` |
| 4 | Build / Optimize / Scale | Platform breadth | Kicker "Complete, unified platform" + three H3 steps each with a paragraph | Three-up feature columns (or stacked) | `full.png` |
| 5 | Omnichannel (Build once. Deploy everywhere.) | Channel coverage | Kicker "Omnichannel by design"; Voice / Chat / Email tabs; "Fast, intelligent voice AI agents built for natural dialog…" | Large stacked word-list (Voice/Chat/Email) on left, product/lifestyle image panel on right with rounded corners | `mid.png` (top), `full.png` |
| 6 | Instant ROI | Quantified outcomes | Kicker "See what's possible" + H2 + subhead + "See all customer stories"; six metric stats | Six brightly-colored stat cards in a horizontal band, carousel arrows (‹ ›) present | `mid.png`, `full.png` |
| 7 | Resource hub | Content/SEO | Kicker "The Decagon Resource Hub" + H2 + "See more resources" | Card grid of articles | `full.png` |
| 8 | Final CTA | Conversion | "The AI concierge for every customer." + "Get a demo" | Dark full-width band with gradient glow, centered | `full.png` (bottom) |
| — | Footer | Nav/legal | 4 columns (Product, Industries, Resources, Company) + Trust Center + "© 2026 Decagon. All rights reserved." | Dark (`#111111`) multi-column footer | `full.png` |

## 3. Visual system

**Palette (rgb from JSON → hex):**
| Role | rgb (JSON) | Hex |
|------|-----------|-----|
| Body background | rgb(255,255,255) | `#FFFFFF` |
| Body / primary text | rgb(19,19,19) | `#131313` |
| Header background | rgba(0,0,0,0) | transparent |
| Hero background | rgb(244,244,245) | `#F4F4F5` (light cool grey) |
| Primary button text | rgb(255,255,255) | `#FFFFFF` |
| Primary button bg | rgba(255,255,255,0) | transparent (dark pill fill applied via image/gradient; "Get a demo" renders near-black `#131313`-ish with a gradient ring border — observed in screenshots) [partly unverified] |
| Footer background | rgb(17,17,17) | `#111111` |
| Footer text token | rgb(19,19,19) | `#131313` (JSON-reported; footer renders light text on dark in screenshots) |

Accent colors are not in the JSON palette object but appear in screenshots: ROI stat cards use saturated green (Chime-green `#~3ECf8E`-ish), navy, lime, purple, orange/amber [unverified exact hex]. Hero "Get a demo" button has a warm gradient ring (orange→purple) [unverified exact hex].

**Type families + scale (from `fonts`):**
- Body / UI: `"FK Grotesk Neue", Arial, sans-serif` @ 16px base
- H1: `Circularxx, Arial, sans-serif` @ **72px**
- Paragraph: `"Circularxx Book", Arial, sans-serif` @ 16px
- First button: `Circularxx, Arial, sans-serif` @ 16px
- (So: FK Grotesk Neue for body chrome, Circularxx for display/headlines and buttons — two distinct families.)

**Density / grid:** Light, airy, generous whitespace; left-aligned text blocks; large type. Multi-column feature rows (three-up steps) and a horizontal scrolling band of stat/logo cards. Standard centered max-width container with wide hero.

**Depth / border treatment:** Soft. Rounded-corner cards and image panels (large radii), pill-shaped buttons and the email-capture bar. Subtle shadows; thin hairline dividers between sections (visible in `mid.png`). Hero canvas adds depth via blurred/animated 3D figures.

**Imagery style:** 63 `<img>`, 80 `<svg>`, 1 `<canvas>`, 0 `<video>`. Mix of real lifestyle photography (people, warm tones — `mid.png` right panel) and abstract 3D renders (glowing stacked translucent planes for the "AOPs" visual). Heavy SVG use = logo wall + icons. Hero is an animated canvas (1401×792).

## 4. Motion + implementation

**Animation stack (from `animLibGlobals` + `animLibNetworkMatches`):**
- `gsap: true` — **GSAP 3.15.0** loaded from `cdn.prod.website-files.com/gsap/3.15.0/gsap.min.js` (verified network match).
- `Webflow: true` — site built on Webflow; `webflow.99fa86a9…js` + `webflow.achunk…js` present. **Confirmed: GSAP 3.15.0 + Webflow.**
- Absent: Framer/motion, Lenis, Lottie, ScrollMagic, THREE, Splitting/SplitType, anime, barba. So no smooth-scroll library, no WebGL (THREE false despite 3D-looking renders → those are pre-rendered images/canvas 2D, not live WebGL).
- Third-party also includes `swiper-bundle.min.js` (Swiper.js → powers the logo/stat carousels and the ‹ › arrows in `mid.png`) and `hls.js` + YouTube iframe API (video embeds elsewhere).

**Notable effects:**
1. **Hero canvas animation** — 1 `<canvas>` (1401×792), no `<video>`. Behaves as an ambient animated background (blurred moving figures + floating glassy chat-bubble cards reading "You're rebooked for a spa appointment", etc.). Built: GSAP-driven canvas (per JSON note "animated via GSAP, likely particle/fluid or abstract background animation"); THREE is false so it's 2D-canvas, not WebGL. [animation library verified; exact canvas technique unverified]
2. **Carousels** — Logo wall and the six ROI stat cards scroll horizontally with prev/next arrows. Built: Swiper.js (`swiper-bundle.min.js` in third-party scripts). [library verified; binding inferred]
3. **Scroll-reveal / scroll-triggered transitions** — Typical Webflow + GSAP pattern (sections fade/translate in on scroll; the Voice/Chat/Email word list appears to swap on scroll in `mid.png`). Built: GSAP + Webflow IX. [effect inferred from screenshots; GSAP presence verified, specific triggers unverified]
4. **No Lenis** → native scrolling (no momentum-smoothing library).

## 5. Proof mechanics

**ROI metrics (verbatim, `roiMetrics`):**
| Value | Label |
|-------|-------|
| 70% | chat and voice resolution |
| 3x | increase in CSAT |
| 80% | deflection rate |
| 65% | reduction in costs |
| 50%+ | deflection on voice |
| 32% | increase in deflection |

- **Card structure:** Six solid-color full-bleed stat cards in a horizontal band; each shows a large value + a short lowercase label. Brand-colored (green/navy/lime/purple/amber visible in `mid.png`/`full.png`).
- **Logos vs anonymized:** Named, real brand logos — Chime, ŌURA, Duolingo, Curology, Valon (visible in `mid.png` logo wall). Not anonymized.
- **Quote/badge format:** Featured testimonial card = headshot + verbatim quote + name + title ("Janelle Sallenave, Chief Operating Officer") + an adjacent metric callout ("70% chat and voice resolution") + "Read story" link. Tied to Chime.
- Trust signal: footer "Trust Center" link.

## 6. Conversion

| CTA label | Placement | Destination |
|-----------|-----------|-------------|
| "Get a demo" | Hero inline email-capture bar; header (nav); final CTA band | `https://decagon.ai/get-a-demo` |
| "Contact Sales" | Footer (Company column) | `https://decagon.ai/get-a-demo` |
| "Contact Support" | Footer | `mailto:support@decagon.ai?subject=Request%20from%20the%20site` |
| "Learn more" | "The Decagon difference" section; announcement bar ("Introducing Duet Autopilot") | `https://decagon.ai/blog/autopilot` |
| "See all customer stories" | Customer-logos section + Instant ROI section | `https://decagon.ai/case-studies` |
| "See more resources" | Resource hub | (not in JSON href list) [unverified destination] |
| "Sign in" | Header | (not in JSON href list) [unverified destination] |

Primary conversion ask = **"Get a demo"** with an inline work-email field, repeated at hero / header / final band. Secondary asks (customer stories, learn more) route to content. Forms via HubSpot (`js-na2.hsforms.net/forms/embed/v2.js`) — email capture is HubSpot-backed [library verified, binding inferred].

## 7. Responsive (mobile.png)

- **Header collapses** to logo + hamburger (☰); nav links hidden behind the menu.
- **Announcement bar** persists at top ("Introducing Duet Autopilot. Learn more" + × close).
- **Hero H1** wraps to two lines ("The AI concierge for / every customer") and scales down from the 72px desktop size; subhead stacks below.
- **Email-capture bar** stays as a single pill with "Work email" placeholder + "Get a demo" button (gradient ring) inline, full-width.
- **Canvas background** still present (darker/dimmer behind text), with a single floating chat-bubble card ("You're rebooked for / a spa appointment") near the bottom of the fold.
- Layout goes single-column; left-aligned text retained. Multi-up rows (steps, stat cards, logos) presumably stack/scroll on mobile [stacking below the fold unverified — only top fold captured].

## 8. Confidence

**Verified in browser (from JSON + screenshots):**
- All copy in §1, §5, §6 hrefs — verbatim from `decagon.json`.
- Palette hex (§3) — direct rgb→hex conversion of JSON values.
- Type families + 72px H1 scale — from JSON `fonts`.
- Animation stack: **GSAP 3.15.0 + Webflow confirmed** via `animLibGlobals` (gsap/Webflow true) and `animLibNetworkMatches` (gsap.min.js + webflow chunks). Swiper, HubSpot, hls.js, GTM, Intellimize, Unify, Facebook Pixel, YouTube API confirmed in `thirdPartyScripts`.
- Imagery counts (63 img / 80 svg / 1 canvas / 0 video) — from JSON `imagery`.
- Hero canvas existence + dimensions — JSON.
- Logo identities (Chime, ŌURA, Duolingo, Curology, Valon) — read from `mid.png`.

**[unverified] / inferred (load-bearing flagged):**
- Exact accent hex for ROI cards and the "Get a demo" gradient ring — read from pixels, not tokens. *(not load-bearing)*
- Specific GSAP ScrollTrigger bindings / canvas technique (particle vs fluid) — JSON says "likely", not confirmed. *(load-bearing: 1)*
- "See more resources" and "Sign in" CTA destinations — not in JSON href list. *(load-bearing: 2)*
- Mobile stacking of below-fold sections — only top fold captured in `mobile.png`. *(load-bearing: 1)*
- Email capture is HubSpot-backed — script present, binding inferred. *(not strongly load-bearing)*

Total load-bearing [unverified] claims: **4**.
