# HappyRobot — Design Teardown

Source: `https://www.happyrobot.ai` — captured 2026-06-23 in a real browser.
Ground truth: `references/raw/happyrobot.json` + `references/captures/happyrobot/{hero,mid,full,mobile}.png`.
Title tag: `HappyRobot | AI workers handle end-to-end tasks at scale.`

---

## 1. Verbatim copy

All quoted word-for-word from the raw JSON.

**Hero H1** (line break preserved as captured):
> "Put agents to work in
> complex environments"

**Hero subhead:**
> "Power your operations with an AI workforce"

**Section headlines (H2), in document order:**
- "The limit of what AI can do in your enterprise is not the model. It's what the model knows about how your enterprise operates. That context is only captured one way: doing the work."
- "It starts with agents"
- "Agents need a platform" (rendered variant also captured as "Agents need\n\na platform")
- "Deployed in the\n\nreal world"
- "Optimized for impact"
- "Put agents to work in complex environments" (closing CTA section)

**Sub-headlines (H3):**
- "Agents are autonomous AI workers capable of communication and coordination"
- "To put them to work means deploying at scale across core business functions"
- "Complex environments are fragmented, operationally messy, exception-ridden enterprises"
- "Agent behavior is evaluated"
- "Agents collect & learn from context"
- "Humans interact with agents"
- "Scaling globally across regions and business units"
- "Partnering to transform customer service"
- "Multi-agent system with custom control tower"
- "78% autonomous execution on critical work"
- "Custom" / "Complex" / "Multi-function"

**CTA labels (verbatim):**
- "Customer Support\nAI workers that resolve every contact"
- "Operations\nAI coordinators for schedules and flows"
- "Book a demo" (appears 4×)
- "Talk to a HappyRobot" (button, no href)
- "Learn more" (4×, one per customer story)

**Signature lines (verbatim):**
- "HappyRobot helps enterprises put agents to work in complex environments"
- "Our focus is on deployments in complex enterprises. We've been battle-tested in high-stakes environments full of exceptions and real consequences when things go wrong. We've taken AI out of the lab and into the field."
- "Achieving enterprise super intelligence requires a platform built to learn through execution and the deployment rigor to put it inside real workflows. At HappyRobot, both are built to compound - so every deployment makes the system smarter than the last."
- Footer tagline: "Intelligence that runs your operations."
- Trust strip label: "TRUSTED BY 150+ ENTERPRISES"
- Results section label: "OUR RESULTS"

**Platform pillar body copy (verbatim):**
- "The platform starts with agents that are constantly evaluated against technical and behavioral benchmarks."
- "Real-world experience builds context that is leveraged for insight and constant improvement."
- "Custom interfaces fit to your ways of working surface insight and enable collaboration with your AI team."

---

## 2. Section-by-section IA

Reference: full-page composite is `full.png`; hero detail `hero.png`; results grid detail `mid.png`; mobile `mobile.png`.

| # | Section | Purpose | Content | Layout |
|---|---------|---------|---------|--------|
| 0 (hero) | Hero | Position + primary conversion | H1 "Put agents to work in complex environments", subhead "Power your operations with an AI workforce", "Talk to a HappyRobot" button. Full-bleed looping background video. | Serif display H1 left/centered over a dark video; small pill button below. `hero.png` shows the Termly cookie banner bottom-left and nav top-right ("Book a demo"). |
| 0b | Trust strip | Social proof | Label "TRUSTED BY 150+ ENTERPRISES" over a logo grid (`full.png` shows ~3 rows of monochrome enterprise logos). `className: py-16 md:py-24`. | Centered label + multi-row logo grid on near-white. |
| 1 | Manifesto block | Thesis statement | Single large H2 ("The limit of what AI can do… doing the work."). | Full-width **dark navy** band (`bg-hr-dark-navy`), `min-h-[50vh]`, single editorial H2. `full.png` shows it as the dark horizontal slab mid-page. |
| 2 | "It starts with agents" | Define the primitive | H2 + para "HappyRobot helps enterprises put agents to work in complex environments" + three definition H3 cards (Agents / deploy at scale / complex environments). | Near-white; headline left, three stacked or columned definition rows. |
| 3 | "Agents need a platform" | Platform pillars | Three pillars: "Agent behavior is evaluated", "Agents collect & learn from context", "Humans interact with agents" each with body copy. | **Khaki / warm-beige** band (`bg-hr-cargo-khaki`). `full.png` shows a central white card/diagram element bearing the HR mark surrounded by pillar labels. |
| 4 | "Deployed in the real world" | Results / case proof | Label "OUR RESULTS", intro para ("Our focus is on deployments…"), four customer-story tiles. | 2×2 image-tile grid; each tile has a photo, an H3 result line, and a "Learn more" link. `mid.png` shows all four tiles clearly (DHL, Naturgy, WWEX, Kuehne+Nagel imagery). |
| 5 | "Optimized for impact" | Differentiators | Three attribute cards "Custom / Complex / Multi-function" + para ("Achieving enterprise super intelligence…"). | Near-white; three-column attribute row under the headline (`full.png`). |
| 6 | Closing CTA | Final conversion | Repeats hero headline "Put agents to work in complex environments" + "Book a demo" button. | Centered headline + single button on near-white. |
| 7 | Footer | Navigation + legal | Product / Company / Terms & Policies / Social link columns; tagline "Intelligence that runs your operations."; "© 2026 HappyRobot Inc." | Multi-column footer on near-white (`#FCFCFC`). |

---

## 3. Visual system

**Palette** (lab/rgb from raw JSON → hex):

| Token / role | Source value | Hex |
|---|---|---|
| Body / page background | `lab(98.779 -0.0991821 0.364292)` | ≈ **#FCFCFC** (near-white) |
| Body / heading text | `lab(2.75381 0 0)` | ≈ **#0B0B0B** (near-black) |
| Header nav background | `rgb(252, 252, 252)` | **#FCFCFC** |
| Footer background | `rgb(252, 252, 252)` | **#FCFCFC** |
| Button text | `rgb(14, 13, 12)` | **#0E0D0C** |
| First button background | `rgba(0, 0, 0, 0)` | transparent |
| Hero section background | `rgba(0, 0, 0, 0)` | transparent (sits over video) |
| Manifesto band | Tailwind token `bg-hr-dark-navy` | dark navy [hex unverified — no rgb captured] |
| Platform band | Tailwind token `bg-hr-cargo-khaki` | khaki / warm-beige [hex unverified] |
| Other named tokens | `bg-hr-hull-white`, `bg-hr-harbor-gray`, `bg-hr-anchor-black` | [hex unverified — token names only] |

Overall scheme: **light theme** — near-white base punctuated by one dark-navy manifesto slab and one warm khaki platform slab. The maritime/cargo token naming (hull, harbor, anchor, cargo) signals a logistics-leaning brand palette.

**Type families + scale:**
- Display / H1: **Tobias** (serif; fallback `Georgia, serif`) — `104px`, weight `400`, line-height `93.6px` (tight, ~0.9). Custom/licensed.
- Body / UI: **Suisse Intl** (fallback `Arial, sans-serif`) — `14px`, line-height `20px`.
- Buttons: one button sampled as `Helvetica`, `12px` (likely a fallback before Suisse load).
- Contrast model: large editorial **serif** headlines against small **sans** body — classic editorial pairing.

**Density / grid:** generous vertical rhythm (`py-16 md:py-24`, `py-24 md:py-32`, `min-h-[50vh]` bands). Section-band layout (full-bleed color slabs) rather than a constant card grid. Results section is a 2×2 tile grid. Logo strip is a multi-row grid.

**Depth / border treatment:** flat, editorial. Depth comes from full-bleed color bands and photographic tiles, not from shadows/glows. The platform section uses a central white card with the brand mark as a diagram anchor (`full.png`).

**Imagery style:** real-world photography in the results tiles (logistics/field/industrial scenes), monochrome enterprise logos in the trust strip, and a looping cinematic hero video. Counts from JSON: 39 `<img>`, 41 `<svg>`, 1 `<video>`, 0 `<canvas>`.

---

## 4. Motion + implementation

**Hero background video** — the single most prominent motion element.
- What: full-bleed looping `.mp4` (`https://happyrobot.b-cdn.net/HappyRobot_HeroLoop_v01_up.mp4`).
- Behavior: `autoplay`, `muted`, `loop`, `object-cover` (`w-full h-full object-cover`). Always-on, no scroll trigger.
- Built: native HTML5 `<video>` element served from Bunny CDN (`b-cdn.net`). **Not** canvas/WebGL (`canvasCount: 0`, `heroHasCanvas: false`).

**Micro-interactions (hover/state transitions):**
- What: button/link color and opacity changes on hover.
- Built: **CSS transitions via Tailwind utilities** — `transition-opacity`, `transition-colors`, `duration-*`. No JS animation engine.

**Animation library — CONFIRMED absent.** Both `animLibGlobals` and `animScriptsInNetwork` are empty in the raw JSON. No `gsap`, `framer-motion`, `lottie`, `anime`, `THREE`, or `Lenis` on `window` or in network script names. Verdict (verbatim): "CSS transitions + Tailwind utility classes … + hero background video loop; no standalone JS animation library detected." Scroll-reveal / parallax behavior is **not** evidenced in the artifacts and is treated as [unverified].

Stack: Next.js (Turbopack, `_next/static/chunks`), Tailwind CSS with custom design tokens.

---

## 5. Proof mechanics

**Trust strip:** label "TRUSTED BY 150+ ENTERPRISES" over a **named-logo** grid (monochrome enterprise logos, `full.png`). Quantified claim ("150+") rather than anonymized.

**Customer-story tiles (named, not anonymized):** four tiles, each = photo + result H3 + "Learn more" link to a dedicated customer-story page:

| Result line (H3) | Implied client (from href) | Destination |
|---|---|---|
| "Scaling globally across regions and business units" | DHL | `/customer-story/dhl` |
| "Partnering to transform customer service" | Naturgy | `/customer-story/naturgy` |
| "Multi-agent system with custom control tower" | WWEX | `/customer-story/wwex` |
| "78% autonomous execution on critical work" | Kuehne+Nagel | `/customer-story/kuehne-nagel` |

`mid.png` confirms the tiles carry the WWEX GROUP and KUEHNE + NAGEL wordmarks on the imagery — clients are **named**, not anonymized.

**Metric values:** the only hard metric surfaced on the homepage is **"78% autonomous execution on critical work"** (Kuehne+Nagel tile) and **"150+ enterprises"** (trust strip). No revenue/time/cost figures on the home page.

**Card structure (results):** photographic background tile → result headline (H3) → "Learn more" CTA. **Badge/quote format:** no pull-quote or testimonial-with-attribution block detected; proof is expressed as outcome headlines + client logos rather than quoted testimonials.

---

## 6. Conversion

| CTA label | Type | Placement | Destination |
|---|---|---|---|
| "Book a demo" | nav button | Top-right header (persistent) | `/contact/demo` |
| "Talk to a HappyRobot" | hero button | Below hero H1 | `null` (no href in DOM — likely opens a widget/voice agent; mechanism [unverified]) |
| "Customer Support — AI workers that resolve every contact" | link/card | Solutions area | `/solutions/functions/customer-support` |
| "Operations — AI coordinators for schedules and flows" | link/card | Solutions area | `/solutions/functions/operations` |
| "Learn more" (×4) | link | Results tiles | `/customer-story/{dhl,naturgy,wwex,kuehne-nagel}` |
| "Book a demo" | button | Closing CTA section | `/contact/demo` |
| "Book a demo" | link | Footer / nav menu | `/contact/demo` |

Primary conversion = **"Book a demo"** → `/contact/demo`, repeated at header, closing section, and nav (4 total instances in the captured CTA list). Secondary path = customer-story exploration ("Learn more"). The hero's "Talk to a HappyRobot" is a distinct interactive/voice CTA with no static href. A persistent "Talk to a HappyRobot" widget also appears bottom-right (visible in `mid.png` and `mobile.png`).

---

## 7. Responsive

From `mobile.png`:
- **Header collapses** to logo (left) + "Book a demo" button + hamburger menu (right). Full nav hidden behind the hamburger.
- **Hero** stacks vertically: serif H1 wraps to three lines ("Put agents to work in / complex / environments"), with "Talk to a HappyRobot" button centered below. The looping video remains the full-bleed background.
- **Cookie banner** (Termly) renders as a centered modal card with stacked "Accept / Decline / Preferences" buttons (full-width).
- Display serif scales down from desktop `104px` while preserving the tight line-height; section bands (`md:` prefixes in classNames like `py-16 md:py-24`, `py-24 md:py-32`) confirm a mobile-first Tailwind breakpoint system where padding tightens below `md`.
- The "Talk to a HappyRobot" floating widget persists bottom-right on mobile (`mobile.png`).
- Multi-column desktop sections (trust grid, 2×2 results, three-column pillars/attributes) collapse to single-column stacks on mobile [layout collapse inferred from Tailwind `md:` patterns + mobile screenshot; exact column counts per breakpoint [unverified]].

---

## 8. Confidence

**Verified in browser (from raw JSON + screenshots):**
- All copy in §1 — verbatim from `heroH1`, `heroSubhead`, `allHeadings`, `ctas`, `sections.paras`, `footerText`.
- Section order, band colors (dark-navy manifesto, khaki platform), and 2×2 results grid — confirmed by `full.png` + `mid.png`.
- Palette hex conversions in §3 — derived directly from captured `rgb()`/`lab()` values.
- Type stack (Tobias serif H1 104px / Suisse Intl body 14px) — from `fonts` block.
- Hero = full-bleed looping mp4 (Bunny CDN), not canvas/WebGL — from `heroVideo` + `imagery` (`canvasCount: 0`).
- **Animation approach CONFIRMED:** no JS animation library; CSS transitions + Tailwind utilities only — `animLibGlobals` and `animScriptsInNetwork` both empty.
- CTA destinations — from `ctas` + `navLinks` href values.
- Customer stories named (DHL, Naturgy, WWEX, Kuehne+Nagel) — from hrefs + logos in `mid.png`.
- Mobile adaptation (hamburger, stacked hero, modal cookie banner) — from `mobile.png`.

**[unverified] — flagged:**
- Exact hex for `bg-hr-dark-navy`, `bg-hr-cargo-khaki`, and the hull/harbor/anchor tokens (only Tailwind token names captured, no rgb). **Load-bearing.**
- "Talk to a HappyRobot" button mechanism (no href; presumed voice/widget). **Load-bearing for §6.**
- Scroll-reveal / parallax behavior — not evidenced; assumed absent but not provable from artifacts.
- Exact per-breakpoint column counts for grids on mobile (inferred from `md:` Tailwind classes).
- Whether the trust-strip logos are the same set as the customer-story clients (not enumerated in JSON).
