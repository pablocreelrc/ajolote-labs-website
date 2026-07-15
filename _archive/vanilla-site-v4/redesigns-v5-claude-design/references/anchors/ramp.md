# Ramp — Design Teardown

Taste anchor for the Ajolote Labs website research library. Source of truth: `references/raw/ramp.json` (captured in a real browser 2026-06-23) and the four screenshots in `references/captures/ramp/`. Pure observation — no adoption recommendations.

URL: https://ramp.com · Title: "Spend Management, Corporate Cards & Accounts Payable Solutions | Ramp"

---

## 1. Verbatim copy

**Hero H1** (word-for-word):
> Time is money. Save both.

**Hero subhead:**
> Cards, expenses, bill payments, and banking* – in the blink of AI.

**Top banner (above hero):**
> Introducing Stack by Ramp — the AI operating system for accounting firms.

**Hero live-counter label:**
> US CORPORATE PAYMENTS PROCESSED BY RAMP:

**Every section headline (verbatim, in DOM order):**
- H1 — "Time is money. Save both."
- H2 — "Join 70,000 of the world's most ambitious companies growing 3.2x faster than the average American business."
- H2 — "One platform for your entire back office.\nInfinite agents that work 24/7."
- H3 — "Cards & Expenses that handle themselves"
- H3 — "Procure to pay without chasing approvals"
- H3 — "Accounting automation eliminates month-end madness"
- H3 — "Banking that flows money to the highest return"
- H3 — "200+ Integrations to the tools you already use"
- H2 — "Systems that never spoke"
- H2 — "Introducing Stack by Ramp. The AI operating system built for today's top accounting firms."
- H2 — "Keep your finance team focused on strategy. Let agents handle the busywork."
- H2 — "AI that learns from your team. Powered by 70,000 others that came before you."
- H2 — "Scale the team.\nShrink the paperwork."
- H2 — "Set user access on autopilot."
- H2 — "One platform for all your global spend."
- H2 — "We've got the receipts."
- H2 — "Time is money. Save both." (repeated as closing CTA section)

**CTA labels (verbatim):** "Learn more", "See a demo", "Get started for free", "Learn more about Ramp Intelligence", "Make the switch", "Learn about Ramp Stack", "Learn about Policy Agents", "Startups", "Free tools and resources", "Sign in".

**Signature lines (verbatim):**
- "Scale the team. Shrink the paperwork." (the punchy parallel-structure formula, also seen in "Time is money. Save both." and "Systems that never spoke")
- "Beautiful tools use beautiful tools." — Tzu-San Hung, Head of Strategic Finance, Notion
- "We've got the receipts." (testimonial-wall headline — a literal-meaning pun on receipt processing)

---

## 2. Section-by-section IA

Order follows the DOM `sections` array in the raw JSON. Screenshots referenced: `hero.png` (above-fold desktop), `mid.png` (mid-page desktop), `full.png` (full-page desktop stitch), `mobile.png` (mobile above-fold).

1. **Hero** (`SECTION.relative`) — Purpose: headline value prop + immediate signup. Content: live counter "US CORPORATE PAYMENTS PROCESSED BY RAMP" (e.g. "0.7506671%"-style ticking number visible in `mobile.png`), H1, subhead, and an inline email-capture form (email input + "Get started for free"). Layout: left-aligned headline stack on a white field; below it an animated product visual (floating receipt/card cards over a dotted grid). Contains both `<video>` and `<canvas>`. See `hero.png` and top of `full.png`.

2. **Social-proof + live agent counters** — Purpose: scale credibility. Content: H2 "Join 70,000… growing 3.2x faster…"; a strip of live ticking agent metrics (AGENTS AT WORK TODAY, RECEIPTS PROCESSED 2.8M+, ACCOUNTING FIELDS CODED 1.8M+, AGENT INTERACTIONS 16k+, EXPENSES REVIEWED 143k+, SPEND ALLOCATED 28k+, INVOICES PROCESSED 79k+, VIOLATIONS CLASSIFIED 5.8k+, TOTAL AI ACTIONS 4.9M+); customer logos (Perplexity, Webflow, Glossier, Shopify, Barry's); a "400hrs saved on expense reports" stat. The counter row is visible at the bottom of `hero.png` and `mobile.png` ("AGENTS AT WORK TODAY", "143,833", "28,165").

3. **Product platform grid** (`SECTION.spacer-t-l`) — Purpose: enumerate the suite. Content: H2 "One platform for your entire back office. Infinite agents that work 24/7." with five H3 feature cards (Cards & Expenses, Procure to pay, Accounting automation, Banking, 200+ Integrations), each with an animated UI demo and a link to a product page. CTA "Make the switch". Visible as the multi-card band in `full.png`.

4. **"Systems that never spoke"** (`SECTION.spacer-t-l`) — Purpose: problem framing. Content: animated diagram contrasting five disconnected legacy systems needed to reimburse a flight vs. Ramp's consolidation. Centered headline + node diagram (see the diagram band mid-`full.png`).

5. **Stack by Ramp announcement** (`SECTION.mt-10 md:spacer-t-l`) — Purpose: new-product spotlight for accounting firms. Content: H2, a video with play button, and a quote from Tyler Otto, President of Specialized Accounting. CTA "Learn about Ramp Stack". (Dark video panel mid-`full.png`.)

6. **Ramp Intelligence / agents** (`SECTION.spacer-t-l`) — Purpose: AI value prop. Content: H2 "Keep your finance team focused on strategy. Let agents handle the busywork.", customer-story video (Perplexity), quote from Lauren Feeney, Controller at Perplexity. CTA "Learn more about Ramp Intelligence". This is the section captured in `mid.png` (Perplexity quote "…manually coding really large data sets…" with "Watch Video").

7. **Policy Agents / network-effect AI** — Purpose: data-moat narrative. Content: H2 "AI that learns from your team. Powered by 70,000 others that came before you.", quote from Neusha Sayadian, Fractional CFO at Valence. CTA "Learn about Policy Agents". Headline visible lower-left in `mid.png` ("AI that learns from your team.").

8. **Enterprise + Global spend** (`SECTION.spacer-t-l`) — Purpose: upmarket/global reach. Content: H2 "Scale the team. Shrink the paperwork." with two sub-cards: "Set user access on autopilot." (auto-provision cards/permissions/limits by role, location, department) and "One platform for all your global spend." (cards in 30+ currencies; reimburse in pounds, euros, yen, pesos). Visual: bill-creation workflow image + stippled globe. In `full.png` lower-middle.

9. **Testimonial wall** (`SECTION.spacer-t-l`) — Purpose: dense social proof. Content: H2 "We've got the receipts.", eyebrow "70,000 teams and counting", and ~17 quote cards (Notion, Mindbody & ClassPass, Eight Sleep, Shopify, KIPP Nashville, City of Ketchum, Sierra, Foursquare, Virgin Voyages, Pair Eyewear, Studs, Boys & Girls Clubs, Seed Health, Poshmark). Multi-column quote grid near the bottom of `full.png`.

10. **Closing CTA** — Purpose: final conversion. Content: repeated H2 "Time is money. Save both." with a second email-capture form ("Get started for free"). Then the dark mega-footer (six link columns: Company, Products, Platform, Partners, Solutions, Free Tools; app-store links; social; NYC address; "Obviously NYC" badge). Footer is the black band at the bottom of `full.png`.

---

## 3. Visual system

**Palette** (lab()/rgba from raw JSON, converted to hex):

| Token | Raw value | Hex | Role |
|---|---|---|---|
| Body background | lab(100 0 0) | `#ffffff` | Pure white page field |
| Body text | lab(2.83994 0.367254 0.969091) | `#0c0a08` | Near-black ink |
| Header background | rgba(255,255,255,0.5) | `#ffffff` @ 50% | Frosted/translucent white nav |
| Top banner background | lab(8.86531 0.515342 0.18619) | `#1a1919` | Very dark near-black bar |
| Hero / footer background | rgba(0,0,0,0) | transparent | Inherits white body |
| Primary button text | lab(100 0 0) | `#ffffff` | White label on accent button |

The signature **acid/lime-yellow** accent on the "Get started for free" button and the top-right "See a demo" nav CTA is clearly visible in `hero.png`, `mid.png`, and `mobile.png` but is rendered via the button's own styling not captured as a sampled palette token — approximately `#d6f84c`/lime-chartreuse [unverified exact hex; not in raw JSON]. The footer is a black band (`#0c0a08`-class dark) in `full.png`.

**Type:** Single typeface — **Lausanne** (`lausanne, "lausanne Fallback"`, custom/licensed grotesque). No serif, no mono anywhere on main content. Scale from raw JSON: H1 64px; body 16px; paragraph/caption 14px. Headlines are tight, large, lowercase-sentence-case with periods ("Time is money. Save both."). The same font carries from logo to body — total typographic unity.

**Density & grid:** Generous whitespace, left-aligned hero, then centered section headlines. Product features use a multi-card grid (5 cards); testimonials a multi-column quote grid. Hero sits on a faint **dotted-grid texture** (visible behind the H1 in `mobile.png` and `hero.png`) — a subtle technical-blueprint motif.

**Depth / border treatment:** Very flat and light. Cards are white with hairline borders and minimal shadow; the floating receipt/card UI mockups in the hero use soft drop shadows to lift off the dotted grid. Inputs are rounded rectangles with light grey borders. The metric ticker numbers sit in small pill/chip containers (light grey rounded background, see "143,833", "28,165" in `mobile.png`).

**Imagery style:** 31 imgs, 3 videos, 7 canvases, 32 SVGs. Heavy use of SVG for logos/icons. Hero and product sections favor **animated product-UI screenshots** (receipts being analyzed, cards, matching workflows) over photography. A stippled/dotted globe for the global-spend section. Customer logos in mono SVG/WebP. Photography appears only in customer-story video stills (the building shot top of `mid.png`).

---

## 4. Motion + implementation

**Animation library verdict (from network/globals evidence): no third-party animation library.** All of these `window` globals are `false`: gsap, anime, Framer, motion, lottie, ScrollMagic, Lenis, Webflow, THREE, Splitting, SplitType, barba. No script URLs matching `gsap|anime|framer|motion|lottie|lenis|webflow|three|splitting|barba|scrollmagic` were found across **97 network script requests**. Framework is **Next.js with Turbopack** (`_next/static/chunks/turbopack-*`). Motion is therefore **custom canvas + native `<video>` + CSS animation**, hand-rolled in the app bundle. (Confirmed in browser via globals + network audit.)

Notable effects:

1. **Live counters** — Ticking numeric values: the hero "US CORPORATE PAYMENTS PROCESSED BY RAMP" figure and the agent-metric strip (RECEIPTS PROCESSED, EXPENSES REVIEWED 143,833, SPEND ALLOCATED 28,165, etc.). Behavior: continuously incrementing/animated number elements, not scroll-triggered one-shot count-ups — they read as a live feed. Built as animated number DOM elements driven by JS (raw JSON: "Live counters implemented as animated number elements"). Restraint: numbers are the motion; layout is static.

2. **Hero animated background** — The hero contains both a `<video>` and a `<canvas>`. Behavior: floating product cards (receipt being analyzed, card, matching panel) hover/parallax over a dotted grid (see `hero.png`/`mobile.png`). Built as native `<video>` + `<canvas>` rendering — one of the 7 canvases / 3 videos on the page; no WebGL library (THREE is false), so 2D canvas / video compositing.

3. **Product-UI demos** — Each of the five platform cards embeds an animated UI demo (raw JSON: "Animated UI demos embedded"). Likely autoplaying short loops (video/canvas) showing the product working.

4. **"Systems that never spoke" diagram** — An animated node diagram showing five legacy systems and their connections collapsing into Ramp. Built in-bundle (canvas/SVG + CSS); no anim library.

5. **Frosted nav** — Header is `rgba(255,255,255,0.5)` translucent; behaves as a sticky frosted bar over scrolling content (CSS backdrop, inferable from the translucent background token). [Scroll-pinning behavior unverified beyond the translucent token.]

No GSAP/Framer/Lenis smooth-scroll, no Lottie. The "premium" feel comes from custom canvas/video product animation and live data, not a motion framework.

---

## 5. Proof mechanics

**Headline metrics (verbatim from raw JSON):** "70,000" companies; "3.2x faster than the average American business"; "400hrs saved on expense reports". Live agent counters: RECEIPTS PROCESSED 2.8M+, ACCOUNTING FIELDS CODED 1.8M+, AGENT INTERACTIONS 16k+, EXPENSES REVIEWED 143k+, SPEND ALLOCATED 28k+, INVOICES PROCESSED 79k+, VIOLATIONS CLASSIFIED 5.8k+, TOTAL AI ACTIONS 4.9M+. Plus the hero "US CORPORATE PAYMENTS PROCESSED BY RAMP" running total.

**Card structure:** Testimonial cards carry quote + person name + title + company. Examples verbatim:
- "Beautiful tools use beautiful tools." — Tzu-San Hung, Head of Strategic Finance, Notion
- "Ramp was a complete game changer. It's a single platform that can handle every aspect of our spending." — Matteo Franceschetti, CEO, Eight Sleep
- "Implementing Ramp has been my biggest win as CFO…" — Carey Peek, CFO, KIPP Nashville Public Schools
- "We've consolidated four platforms into one with Ramp." — Andrew Clarke, SVP Finance, Studs

**Logos vs. anonymized:** Fully **named** — real customer logos (Perplexity, Webflow, Glossier, Shopify, Barry's) and named individuals with titles and companies (Notion, Eight Sleep, Shopify, Sierra, Foursquare, Virgin Voyages, Poshmark, City of Ketchum, KIPP Nashville, Boys & Girls Clubs, etc.). No anonymization. Mix of tech, retail, public sector, and nonprofit names for breadth.

**Quote/badge format:** Inline product quotes attached to sections (Tyler Otto on Stack; Lauren Feeney/Perplexity on Intelligence; Neusha Sayadian/Valence on Policy Agents) plus a dedicated wall under "We've got the receipts." with eyebrow "70,000 teams and counting". Footer badge: "Obviously NYC". Legal/trust badge: "Ramp Visa Corporate Card issued by Celtic Bank / Column N.A. / Sutton Bank / Lead Bank, Member FDIC."

---

## 6. Conversion

CTAs and destinations (from raw JSON `ctas` + `nav`):

| Label | Type | Placement | Destination |
|---|---|---|---|
| Learn more | link | Top banner (Stack) | https://ramp.com/stack |
| See a demo | link | Primary nav (top-right) | https://ramp.com/see-a-demo |
| Sign in | link | Primary nav (top-right) | (account login) |
| Get started for free | button | Hero email form | email-capture submit (no href) |
| Make the switch | link | Platform grid section | https://ramp.com/switch |
| Learn about Ramp Stack | link | Stack section | https://ramp.com/stack |
| Learn more about Ramp Intelligence | link | AI agents section | https://ramp.com/intelligence |
| Learn about Policy Agents | link | AI learning section | https://ramp.com/expense-management |
| Free tools and resources | button/link | Footer CTA | https://ramp.com/free-tools |
| Get started for free | button | Bottom email form | email-capture submit (no href) |

Primary conversion is the **inline email-capture form** ("What's your work email?" + "Get started for free"), repeated at top (hero) and bottom (closing "Time is money. Save both." section) — self-serve signup, no sales gate. Secondary path is "See a demo" (nav, persistent) for higher-touch buyers. Section CTAs are educational ("Learn about…", "Make the switch") routing to product pages rather than to conversion. Chili Piper (`ramp-com.chilipiper.com`) powers demo-booking/routing. Nav menu: Products, Partners, Solutions, Resources, Customers, Pricing.

---

## 7. Responsive

From `mobile.png`: the layout collapses to a single column. The top dark banner ("Introducing Stack by Ramp — the AI operating system for accounting firms." + "Learn more") wraps to two lines with a dismiss "×". Nav collapses to logo (`ramp` wordmark + axolote/swoosh glyph) on the left and a **hamburger menu** on the right; the persistent desktop "See a demo" / "Sign in" links move into the menu. The hero H1 wraps to two lines ("Time is money. / Save both.") at a large size, with the live counter pill ("0.7506671%") shown inline after the eyebrow label. Email input and "Get started for free" button stack full-width. The hero product animation (analyzing receipt / card / matching panel cards over the dotted grid) scales down and recomposes vertically. The agent-counter strip becomes a horizontally-scrolling row (partial labels "…EWED", "143,833", "SPEND ALLOCATED 28,165", "INVOICES PROCESSE…" clipped at the right edge). A floating dark chat bubble (Chili Piper) sits bottom-right. The acid-lime accent and dotted-grid texture persist on mobile.

---

## 8. Confidence

**Verified in browser** (present in raw JSON captured live, or directly visible in the named screenshots):
- All H1/H2/H3 headlines, hero subhead, banner, counter label, and CTA labels + hrefs — verbatim from raw JSON.
- All testimonial quotes, names, titles, companies — verbatim from raw JSON.
- Metric values (70,000; 3.2x; 400hrs; all agent counters) — verbatim from raw JSON.
- Palette tokens — lab()/rgba values from raw JSON, converted to hex (`#ffffff`, `#0c0a08`, `#1a1919`).
- Typeface (Lausanne single-family), font sizes (64/16/14px) — from raw JSON.
- Imagery counts (31 img / 3 video / 7 canvas / 32 svg) — from raw JSON.
- **Animation approach confirmed:** no third-party anim library (all 12 globals false; no matching script across 97 requests); Next.js + Turbopack; custom canvas/video/CSS — directly from raw JSON globals + network audit.
- Mobile adaptation (hamburger, stacked form, two-line H1, scrolling counter strip, banner wrap, chat bubble) — visible in `mobile.png`.
- Section order and content — from raw JSON `sections` array + visible in `full.png`/`mid.png`/`hero.png`.

**[unverified]** (not directly in the artifacts):
- Exact hex of the acid/lime-yellow accent button (~`#d6f84c`) — visible in screenshots but not a sampled palette token. [unverified]
- Frosted-nav scroll-pinning behavior beyond the translucent `rgba(255,255,255,0.5)` token. [unverified]
- Whether product-card demos are video vs. canvas specifically, and whether counters are scroll-triggered vs. always-live (described as "animated number elements" — read as live). [unverified, low load-bearing]

Load-bearing [unverified] claims: **1** (the accent hex; all motion/copy/IA claims are verified).
