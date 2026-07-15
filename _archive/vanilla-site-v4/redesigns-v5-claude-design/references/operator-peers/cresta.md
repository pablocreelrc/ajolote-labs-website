# Cresta — Design Teardown

Source: https://cresta.com · Title: "AI Agents for Every Customer Conversation | Cresta"
Captured artifacts: `references/raw/cresta.json` + `references/captures/cresta/{hero,mid,full,mobile}.png`
Platform: Webflow. Page scroll height: 10,632px.

---

## 1. Verbatim copy

**Hero H1 (verbatim):**
> "AI agents for every customer conversation"

**Hero subhead:** none. `heroSubhead` is `null`. Per `heroNotes`, the H1 is followed by three animated cycling words that act as the value-prop teaser:
> "AUTOMATE"
> "AUGMENT"
> "ANALYZE"

`heroFullText` confirms the full hero block reads: `"AI agents for every customer conversation\nAUTOMATE\nAUGMENT\nANALYZE"`.

**Note on multiple H1s:** the raw JSON captures three H1 strings in `allHeadings` (likely Intellimize A/B variants or hidden CMS variants — the page runs Intellimize per `techStack`):
> "AI agents for every customer conversation"
> "One AI platform. Every conversation."
> "The AI platform for every customer conversation"

**Every section headline (verbatim, in capture order from `allHeadings` / `sections`):**

- H2 "Powering the world's leading customer experiences" (repeated many times — the logo bar is tabbed by vertical)
- H2 "Powering the world's leading travel & hospitality brands"
- H2 "Powering the world's leading financial institutions"
- H2 "Trusted by the world's leading contact centers"
- H2 "One platform for human and AI Agents"
- H3 "AI Agent"
- H3 "Agent Assist"
- H3 "Conversation Intelligence"
- H2 "AI Platform"
- H2 "One AI partner for all CX use cases"
- H3 "Reduce costs without sacrificing quality across customer care"
- H3 "Discover winning behaviors and coach more effectively across sales"
- H3 "How a Fortune 500 bank improved collections yield with Cresta"
- H3 "Drive customer loyalty and boost the bottom line across customer care"
- H2 "Easily integrate into\nany environment"
- H2 "Security and data privacy\ntrusted by the Fortune 500"
- H2 "What our customers are saying"
- H2 "Ready to see the results for yourself?"

**CTA labels (verbatim):** "Get a demo", "Learn more", "Explore AI Agent", "Explore Agent Assist", "Explore Conversation Intelligence", "Explore the platform", "Explore Conductor", "See the results", "See integrations", "Customer Stories", "Ebooks", and "BOOK A DEMO" (the inline hero email-capture button, visible in hero.png/mobile.png).

**Signature lines (verbatim from `sections` gists / `designNotes`):**
> "Deploy industry-leading, multilingual AI across the entire customer journey on one secure, scalable platform trusted by the Fortune 500." (AI Platform section)
> "Cresta is really the technology of the future." — Jason Love, Director, Contact Center Training (testimonial)
> "Realize your competitive advantage — see Cresta in action with a personalized demo." (closing CTA section)

---

## 2. Section-by-section IA

Order from `sections[]`. Screenshots: `hero.png` (top fold), `mid.png` (use-case + integrations band), `full.png` (full-page stitch), `mobile.png` (mobile top fold).

1. **Hero** — `div.hero_section-new`. Purpose: positioning + immediate demo capture. Content: H1 "AI agents for every customer conversation", animated cycling words AUTOMATE/AUGMENT/ANALYZE, an inline "Business Email*" field with a "BOOK A DEMO" button, and a product UI screenshot ("Seat change mentions" chart panel over a photo of a man at a laptop). Layout: left-aligned text on white, faint line-art world-map watermark behind, product-screenshot card overlapping a lifestyle photo at the bottom. See `hero.png`.

2. **Logo bar** — `div` (no class). Purpose: social proof. Content: H2 "Powering the world's leading customer experiences" + customer logo row. Layout: centered heading over a horizontal logo strip. See `full.png` (logo row directly under hero: COX, and others).

3. **Tabbed logo carousel** — `section.global_section--small`. Purpose: vertical-specific proof. Content: same H2 plus per-vertical variants ("travel & hospitality brands", "financial institutions", "contact centers"). Layout: tabbed/swappable logo set (Swiper-driven). See `full.png`.

4. **Product pillars** — `section.products_section`. Purpose: product taxonomy. Content: H2 "One platform for human and AI Agents" with three H3 pillars — "AI Agent", "Agent Assist", "Conversation Intelligence" — each with an "Explore [product]" CTA. Layout: three large stacked card/panels (the three tall light-grey blocks visible mid-`full.png`).

5. **AI Platform** — `section.global_section--small is-ai-platform`. Purpose: platform-level pitch. Content: H2 "AI Platform" + the "Deploy industry-leading, multilingual AI…" line + "Explore the platform" / "Explore Conductor" CTAs. Layout: full-width statement band.

6. **Use-case cards** — `div.frame-section_wr is-no-top-padding`. Purpose: outcome proof by function. Content: H2 "One AI partner for all CX use cases" + four use-case H3s (customer care / sales / collections / retention) with bold metric callouts. Layout: alternating image + metric cards; `mid.png` shows the retention card ("Drive customer loyalty and boost the bottom line across customer care", "30pt Increase in NPS", "50% reduction in QM Costs", BRINK'S HOME logo, "See the results"). The stacked metric rows are also visible mid-`full.png`.

7. **Integrations** — `section.global_section--small is-xl-padding overflow-hidden`. Purpose: ecosystem fit. Content: H2 "Easily integrate into / any environment" + "See integrations" CTA. Layout: radial constellation of integration logos around a central hub (the node-cluster graphic near the bottom of `full.png`; heading bottom of `mid.png`).

8. **Security & privacy** — `section.global_section--small is-privacy-logos`. Purpose: enterprise trust. Content: H2 "Security and data privacy / trusted by the Fortune 500" + compliance/certification logo grid. Layout: logo grid band.

9. **Testimonial** — `section.global_section--small is-overflow-hidden`. Purpose: emotional proof. Content: H2 "What our customers are saying" + quote "Cresta is really the technology of the future." — Jason Love, Director, Contact Center Training. Layout: single large quote, scroll/swipe carousel (the blue + light testimonial cards near bottom of `full.png`).

10. **Closing CTA** — `section.global_section`. Purpose: final conversion. Content: H2 "Ready to see the results for yourself?" + "Realize your competitive advantage…" line + "Get a demo". Layout: full-width band leading into the dark footer (dark band at the foot of `full.png`).

**Footer** — dark, 4-column link layout (`footerLinks`: Platform/Products, Company, Resources, Legal).

---

## 3. Visual system

**Palette (rgb from raw JSON → hex):**

| Token | Source value | Hex |
|---|---|---|
| Body background | rgb(255,255,255) | `#ffffff` |
| Body / nav text | rgb(61,61,71) | `#3d3d47` |
| Header background | rgba(255,255,255,0.85) | `#ffffff` @ 85% (frosted glass) |
| Hero background | rgba(0,0,0,0) | transparent (sits on white) |
| Primary button text | rgb(255,255,255) | `#ffffff` |
| Footer background | rgb(37,37,42) | `#25252a` |
| Footer text | rgb(61,61,71) | `#3d3d47` |

Accent blue (the "Get a demo" / "BOOK A DEMO" buttons and H1 type) reads as a saturated royal blue in `hero.png`/`mobile.png` — exact hex not in the JSON palette samples. [unverified hex] The dominant scheme is light: white body, near-black `#25252a` footer, frosted-white sticky nav.

**Type families + scale (from `fonts`):**
- H1: "DM Sans Variable", Arial fallback — 48px.
- Body / UI / nav: "Inter Variable", Arial fallback — 16px.
- Paragraph (computed sample): "Helvetica", Arial fallback — 16px (the firstButton also computed Helvetica — likely an un-themed element).
- Headings DM Sans (geometric), body Inter (neutral grotesque). Text color `#3d3d47` (soft near-black, not pure black).

**Density / grid:** generous whitespace, centered max-width content column for proof/headline bands; left-aligned hero. Use-case section uses a two-up image+metric card grid; product pillars are full-width stacked panels. Long page (10,632px, ~10 sections).

**Depth / border treatment:** soft, low-elevation. Product-screenshot cards float over photos with rounded corners and subtle shadow (hero "Seat change mentions" panel). Rounded-rect cards throughout; frosted-glass translucent nav. Pill-shaped CTA buttons (rounded fully). Faint line-art world-map watermark behind hero.

**Imagery style:** real lifestyle/workplace photography (man at laptop in hero, suburban home at dusk in the retention card) composited with product-UI chrome (chat transcripts, charts) layered on top. Heavy asset count: 771 imgs, 65 svgs, 7 videos, 0 canvases. Hero does not use video/canvas (`heroUsesVideoOrCanvas: false`). SVGs power logos and the integration constellation.

---

## 4. Motion + implementation

**Animation stack (from `animLibGlobals` / `networkScripts`):** GSAP 3 (`gsap@3` global `true`) + Webflow (`Webflow: true`) + Swiper 11 (`swiper-bundle.min.js`) + jQuery 3.5.1. Verdict string: "GSAP + Webflow". No Framer/Motion, Lenis, ScrollMagic, Lottie, Three.js, Splitting, or SplitType.

Notable effects:

1. **Hero cycling words (AUTOMATE / AUGMENT / ANALYZE).** What: the three action words swap in place beneath the H1. Behavior: auto-cycling on a timed loop, one word emphasized at a time (in `mobile.png` "AUTOMATE" is active/highlighted and the other two are dimmed). Build: GSAP timeline driving opacity/position of stacked word elements (the staging JS bundle `cresta-staging.*.js` is the custom GSAP code). No SplitType/Splitting present, so this is word-level (not character-level) animation. [unverified: exact GSAP mechanism — inferred from libs present + dimmed-state evidence in mobile.png]

2. **Tabbed logo carousel.** What: industry-vertical logo sets swap. Build: Swiper 11 (`swiper-bundle.min.js` in network) — confirmed library present. Trigger: tab selection / autoplay.

3. **Testimonial carousel.** What: customer quotes advance. Build: Swiper 11 (same dependency). `designNotes.testimonialSection` calls it "scroll-driven carousel."

4. **Scroll-reveal entrances.** What: section headings/cards fade-and-rise on scroll into view (standard Webflow IX2 + GSAP pattern). Build: Webflow Interactions and/or GSAP ScrollTrigger from the staging bundle. [unverified: ScrollTrigger specifically — only `gsap` core global was probed; reveals inferred from Webflow presence, not directly observed in a still]

Restraint: motion is decorative/supportive (cycling words, carousels, entrance fades) — no full-screen scroll-jacking, no pinned scenes, no smooth-scroll hijack (Lenis absent). Standard SaaS marketing motion budget.

---

## 5. Proof mechanics

**Metric values (verbatim from JSON + `mid.png`):**
- "5.5x Higher containment" (`designNotes.metricsCallouts`)
- "23% Higher CSAT" (`designNotes.metricsCallouts`)
- "30pt Increase in NPS" (retention card, `mid.png`)
- "50% reduction in QM Costs" (retention card, `mid.png`)

**Card structure:** use-case cards pair a full-bleed lifestyle photo with a headline (H3), one-to-two oversized stat callouts (large number + small descriptor underneath), a customer logo, and a "See the results" CTA linking to a named case-study page (`/customers/snap-finance`, `/customers/cox`, `/customers/major-bank`, `/customers/brinks-home`).

**Logos vs anonymized:** mixed. Named brands appear as logos in the proof bar and cards — COX and BRINK'S HOME are visible (`full.png`, `mid.png`); CTAs reference Snap Finance and Cox by name. But one case is anonymized: H3 "How a Fortune 500 bank improved collections yield with Cresta" with the CTA destination `/customers/major-bank` ("major bank," not named).

**Quote / badge format:** single large pull-quote with name + title beneath, e.g. "Cresta is really the technology of the future." — Jason Love, Director, Contact Center Training. The security section is a Fortune-500 trust band rendered as a compliance/certification logo grid (`is-privacy-logos`).

---

## 6. Conversion

Primary ask is uniform: **"Get a demo" → `/request-a-demo`** (top-right sticky nav, and the closing "Ready to see the results for yourself?" band). The hero adds an inline email-capture: a "Business Email*" field + "BOOK A DEMO" button (hero.png/mobile.png) — HubSpot Forms v2 + NeverBounce email validation per `techStack`.

All CTAs and destinations (from `ctas[]`):

| Label | Destination | Placement |
|---|---|---|
| Get a demo | /request-a-demo | Sticky nav + closing band (primary) |
| BOOK A DEMO | (HubSpot form submit) | Hero inline email capture |
| Learn more | /videos/introducing-cresta-ai-agent | Content/feature block |
| Learn more | /videos/brinks-home-ceo-puts-cresta-ai-agent-to-the-test | Content block |
| Learn more | /report/cx-workforce | Content block |
| Learn more | /blog/cresta-named-one-of-americas-best-startup-employers-for-the-third-year-in-a-row | Content block |
| Explore AI Agent | /ai-agent | Product pillar |
| Explore Agent Assist | /agent-assist | Product pillar |
| Explore Conversation Intelligence | /conversation-intelligence | Product pillar |
| Explore the platform | /platform-overview | AI Platform section |
| Explore Conductor | https://cresta.com/blog/cresta-conductor-the-agent-for-ai-agent-development | AI Platform section |
| See the results | /customers/snap-finance | Use-case card |
| See the results | /customers/cox | Use-case card |
| See the results | /customers/major-bank | Use-case card |
| See the results | /customers/brinks-home | Use-case card |
| See integrations | /integrations | Integrations section |
| Customer Stories | /customer-stories | Footer/resources |
| Ebooks | /resources/ebooks | Footer/resources |

Strategy: one dominant conversion verb ("Get a demo") repeated at entry and exit; mid-page CTAs are exploratory ("Explore…", "See the results", "Learn more") that route deeper rather than convert. A top promo bar reads "…agent for AI agent development" with an "Explore Conductor" pill (hero.png/mobile.png).

---

## 7. Responsive (mobile.png)

- **Nav collapses** to logo + hamburger; the "Get a demo" button stays pinned in the top bar (pill, blue). The "Explore Conductor" promo pill remains above the nav.
- **H1 reflows** to a larger stacked left-aligned block ("AI agents for / every customer / conversation") occupying most of the first fold.
- **Cycling words** render as a single horizontal row of three pills (AUTOMATE active/blue-dotted, AUGMENT and ANALYZE dimmed) — same GSAP behavior, compacted.
- **Inline email capture** stacks: full-width "Business Email*" field with the "BOOK A DEMO" button right-aligned inside/beside it.
- **Product screenshot** becomes a full-width card — the AI Agent chat sample ("Of course, Olivia. I can see your 10:00 AM appointment with Dr. Green today. Let me check his availability.") shown over a lifestyle photo.
- Single-column flow throughout; cards stack vertically. Osano cookie banner overlays the bottom.

---

## 8. Confidence

**Verified in-browser (raw JSON + screenshots):**
- All copy in §1, §5, §6 — quoted verbatim from `cresta.json` (`heroH1`, `heroFullText`, `allHeadings`, `ctas`, `designNotes`).
- Palette hex in §3 — direct rgb→hex conversion of sampled computed styles.
- Type families/sizes — from `fonts` computed samples.
- Animation libraries — from `animLibGlobals` boolean probe + `networkScripts` (GSAP, Swiper, jQuery, Webflow all confirmed loaded).
- Platform = Webflow, asset counts, scroll height, hero not video/canvas — direct fields.
- Mobile layout (§7) — observed in `mobile.png`. Mid-page layout (§6/§2) — observed in `mid.png`/`full.png`.

**[unverified] / inferred (load-bearing flagged):**
- Accent blue exact hex (§3) — not in JSON palette samples; read visually from screenshots. (load-bearing for color spec)
- GSAP mechanism for the cycling words and scroll-reveal entrances (§4) — libraries are confirmed present, but the specific GSAP timeline/ScrollTrigger wiring is inferred, not read from source. (load-bearing for the "how it's built" claim)
- Section-render gaps in `full.png` (several blank card regions) are lazy-loaded imagery not yet painted at capture time — not missing content. (non-load-bearing; noted so the stitch isn't misread)
- The three differing H1 strings attributed to Intellimize A/B variants — Intellimize is confirmed in `techStack`, but the attribution of the variant H1s to it specifically is inferred. (non-load-bearing)
