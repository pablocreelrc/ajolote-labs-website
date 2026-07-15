# Tribe AI — Design Teardown

Source artifacts: `references/raw/tribe-ai.json` (captured 2026-06-23), screenshots in `references/captures/tribe-ai/` (`hero.png`, `mid.png`, `full.png`, `mobile.png`). URL: https://www.tribe.ai — Title: "Tribe AI | Enterprise AI That Ships". Platform: Webflow.

## Verbatim copy

**Hero H1:** "Enterprise AI Built for Impact"

**Hero subhead:** "We help the world's largest companies rewire how they operate, compete, and create value with AI"

**Section headlines (all, in DOM order from `allHeadings`):**
- H1: "Enterprise AI Built for Impact"
- H2: "Deep Partnerships with the Frontier"
- H2: "Why the Fortune 1000 Choose Tribe"
- H3: "AI Specialization"
- H3: "Speed + Quality of Delivery"
- H3: "Proven Value Creation"
- H3: "Make AI Work for Your Business"

**CTA labels (from `ctas`):** "Join Tribe", "Get Started", "Let's Talk", "Start A Project".

**Signature lines (word-for-word):**
- "Founding partners with OpenAI and Anthropic, on a mission to transform large enterprises into AI-native companies." (partner section)
- "We were building AI products long before it was cool. This is all we do and our customers benefit" (AI Specialization gist)
- Customer quote: ""Working with Tribe was one of the best decisions of my career. Tribe's team members weren't just order-takers aimed at pleasing us. They offered conflicting and compelling insights and really pushed the project forward with a critical perspective. That confidence to 'argue' for improved outcomes is invaluable."" — attributed "Tommy Richardson, CTO"
- Second testimonial: ""We needed to prioritize AI and lean on experts who live and breathe this world daily. It's really unique to have a partner like Tribe AI who can wrap their heads around not just the technology but also the business; and reflect on how one can leverage the other."" — attributed "Nick Brown, VP of Product"
- Section intro labels: "Hear from Our Customers", "Featured by", "Compliance".

## Section-by-section IA

1. **Announcement bar** (top, full-width) — purpose: promote a partnership news item. Content: "Tribe + Candor: building the best forward deployed team in AI" with a "Read More →" link and a dismiss X. Layout: thin purple banner above the nav. See `hero.png`, `mobile.png`.
2. **Header / nav** — purpose: navigation + persistent conversion. Content: Tribe AI logo (diamond/chevron mark), dropdowns "Industries / Partners / Resources / Company", a "Join Tribe" link, and a right-aligned outlined "Get Started" button. Nav children (from `navLinks`) include industries (Financial Services & Insurance, Healthcare, Learning & Skilling), partners (OpenAI, Anthropic, AWS), and company/resource links. Layout: horizontal bar on dark background; collapses to hamburger on mobile (`mobile.png`). See `hero.png`.
3. **Hero** (`section_home-partners` region opens below) — purpose: positioning statement. Content: large centered H1 "Enterprise AI Built for Impact", subhead, and a filled purple "Let's Talk" CTA with right-arrow. Layout: centered single-column, generous vertical space, dark background with an iridescent ribbon/wave graphic entering from lower-left. See `hero.png`.
4. **Logo wall** — purpose: client proof. Content: monochrome client logos (Cleveland Clinic, Two Sigma, KOCH, EP, VISTA, AAA, Recursion, GoTo, Sumo Logic visible). Layout: single horizontal row of greyed wordmarks directly beneath the hero. See `hero.png`, `full.png`.
5. **Deep Partnerships with the Frontier** (`section_home-partners`) — purpose: frontier-lab credibility. Content: H2 + the founding-partners line; right column lists partners as stacked pill/row items: OpenAI, ANTHROPIC, AWS, Google Cloud. Layout: two-column (left text, right partner list); the iridescent ribbon graphic wraps around the left text. See `full.png`.
6. **Why the Fortune 1000 Choose Tribe** (`section_home-partners`) — purpose: differentiation. Content: H2 plus three H3 value props: "AI Specialization", "Speed + Quality of Delivery", "Proven Value Creation", each with supporting copy. Layout: heading + three-up value blocks. (Headings confirmed in `allHeadings`; this band falls in the tall white-space gap of `full.png`.)
7. **Hear from Our Customers** (`section_customer-slider`) — purpose: testimonial social proof. Content: section label "Hear from Our Customers", a featured quote card (Tommy Richardson, CTO, with a Litmos logo and headshot), flanked by adjacent partial cards (VitalSource / Nick Brown visible), plus prev/next circular arrow controls. A "View All Case Studies →" outlined button sits below. Layout: horizontal Swiper carousel, center card emphasized, peeking neighbors. See `mid.png`, `full.png`.
8. **Featured by** (`section_home-featured`) — purpose: press/media proof. Content: label "Featured by" over a row of press logos: Bloomberg, Forbes, CNBC, Nasdaq, TechCrunch, Business Insider. Layout: single centered logo row between hairline dividers. See `mid.png`.
9. **Make AI Work for Your Business** (`component_user-sorter`) — purpose: primary conversion / segmentation. Content: large centered H3 "Make AI Work for Your Business" and a filled purple "Start A Project" CTA. Layout: centered, flanked by `spacer-l` divs above and below. See `full.png`.
10. **Compliance** (`section_home-featured`) — purpose: trust/security badges. Content: label "Compliance" (compliance badge logos). Layout: centered featured-style row near page bottom. See `full.png`.
11. **Footer** — purpose: legal + secondary nav. Content: "Terms & Conditions", "Privacy Policy", and a LinkedIn icon. Layout: thin bottom bar. See `full.png`.

## Visual system

**Palette (rgb from raw JSON → hex):**
- Body / header background: `rgb(22, 15, 27)` → `#160F1B` (near-black aubergine/plum).
- Body / header / hero text: `rgb(255, 255, 255)` → `#FFFFFF`.
- Hero background: `rgba(0, 0, 0, 0)` → transparent (sits over the body plum + ribbon graphic).
- Outlined button border: `rgb(96, 65, 206)` → `#6041CE` (violet).
- Outlined button text: `rgb(237, 237, 237)` → `#EDEDED`.
- CSS var primary: `#2f34d3` (indigo/blue accent).
- Filled CTA buttons render as saturated violet/indigo (`hero.png`, `mobile.png`) consistent with the `#6041CE`–`#2f34d3` range.

**Type families + scale (from `fonts`):**
- Display / H1: "Sharp Grotesk", sans-serif — 64px, weight 500, line-height 72px. Heavy, condensed-grotesk character (see chunky "Enterprise AI Built for Impact").
- Body: "IBM Plex Sans", sans-serif — 16px base.
- Paragraph / subhead: "IBM Plex Sans" — 24px, line-height 31.2px.
- WebFont loader (`webfont.js`) is present in network scripts.

**Density / grid:** Low density, very generous vertical rhythm — `pageScrollHeight` 4299px with multiple explicit `spacer-l` divider divs creating large empty bands (visible as long dark gaps in `full.png`). Centered single-column for hero/CTA bands; two-column split for the partnerships section; horizontal logo rows. Content is width-constrained and centered.

**Depth / border treatment:** Mostly flat dark surfaces. Depth comes from (a) the partner-list pill rows which sit on a slightly lighter raised violet panel, (b) the testimonial card which is a subtly elevated darker rounded card over the section, and (c) outlined buttons using a 1px violet border rather than fill. Hairline dividers bracket the "Featured by" row.

**Imagery style:** 79 `<img>`, 0 video, 0 canvas, 11 svg. The signature visual is an iridescent/oil-slick flowing ribbon or wave (soft-body render) that bleeds across the hero and partnerships sections. Logos are monochrome (greyed/white) wordmarks for uniformity. Testimonial cards carry small color headshots + brand logos (Litmos, VitalSource).

## Motion + implementation

**Animation stack (from `animLibGlobals` / `animLibScripts` / `networkScripts`):** Webflow (true) + Lenis smooth scroll v0.2.28 (true) + Swiper carousel (v9 and v8.4.7 both loaded). gsap, anime, Framer, motion, lottie, ScrollMagic, THREE, Splitting, SplitType, barba all **false**.

- **Smooth scrolling** — Lenis (`studio-freight/lenis@0.2.28` bundled) hijacks the native scroll for inertial/eased page scrolling across the full 4299px page. Trigger: any scroll. Restraint: global smoothing only — no parallax/THREE evidence (THREE=false, canvas=0), so the iridescent ribbon is a static raster/SVG asset, not a live render. Built via the Lenis bundle script + Webflow's IX runtime.
- **Customer testimonial carousel** — Swiper (`swiper@9` / `swiper@8.4.7`). Behavior: horizontal slider with a centered active card and peeking neighbor cards (`mid.png`), driven by prev/next circular arrow buttons (`full.png`). Trigger: arrow click / drag. Built with Swiper's standard slider config.
- **Webflow interactions (IX2)** — Webflow runtime is present (`tribe-2023-development-site.*.js` chunks). Standard Webflow scroll-into-view reveals/fades are likely on section entrances. [unverified] — the JSON confirms the Webflow runtime but does not enumerate specific IX2 triggers; no GSAP/Framer means any reveals are Webflow-native.
- **`mirrorclick` (Finsweet attribute)** — `@finsweet/attributes-mirrorclick` is loaded; it mirrors one element's click to another (e.g. a visible CTA triggering a hidden link/anchor). Not a visible animation; an interaction-wiring utility.

No GSAP, Lottie, or WebGL-driven motion. The "wow" is restrained: smooth inertial scroll + a Swiper testimonial slider, over an otherwise static, image-heavy layout.

## Proof mechanics

- **No hard numeric metrics** appear in the captured copy/JSON — no "X% lift", "$Y saved", or deal-count stats are present in `gist`/headings/testimonials. Proof is qualitative and logo-based.
- **Named-brand logo wall** (not anonymized): Cleveland Clinic, Two Sigma, KOCH, EP, VISTA, AAA, Recursion, GoTo, Sumo Logic (`hero.png`/`full.png`). Logos rendered as uniform monochrome wordmarks.
- **Frontier-lab partnership badges:** OpenAI, ANTHROPIC, AWS, Google Cloud listed as pill rows in the partnerships section ("Founding partners with OpenAI and Anthropic"). See `full.png`.
- **Press / "Featured by" row:** Bloomberg, Forbes, CNBC, Nasdaq, TechCrunch, Business Insider (`mid.png`).
- **Testimonial card structure:** elevated rounded dark card containing — quote text (large) → small color headshot → name in bold + role (e.g. "Tommy Richardson, CTO") → customer company logo (Litmos / VitalSource). Carousel of multiple such cards (`mid.png`).
- **Compliance row:** a "Compliance" badge strip near the footer (`full.png`) — security/standard logos, content not individually legible in artifacts.
- **Authority claim:** "Why the Fortune 1000 Choose Tribe" frames the buyer tier rather than citing a number.

## Conversion

All conversion CTAs (from `ctas` + screenshots):
- **"Get Started"** — outlined button, top-right of the persistent header (every viewport). Destination: `https://www.tribe.ai/start`.
- **"Let's Talk"** — filled violet button with right-arrow, centered in the hero. Destination: `https://www.tribe.ai/start`.
- **"Start A Project"** — filled violet button in the "Make AI Work for Your Business" conversion band mid-page. Destination: `https://www.tribe.ai/start`.
- **"View All Case Studies →"** — outlined button below the testimonial carousel (`mid.png`). Destination: case studies (nav target `https://www.tribe.ai/case-studies`). [unverified] exact href not in `ctas` array, inferred from `navLinks`.
- **"Join Tribe"** — recruiting link in the nav. Destination: `https://www.tribe.ai/careers`.
- **"Read More →"** — link inside the top announcement bar (partnership news). [unverified] destination not captured.

Pattern: three of the four tracked CTAs funnel to `/start`; conversion is repeated at header, hero, and mid-page. Recruiting ("Join Tribe" / careers) is kept visually separate from sales.

## Responsive

From `mobile.png`: the layout collapses to a single column. The nav condenses to logo + hamburger (the Industries/Partners/Resources/Company dropdowns move behind the menu). The announcement bar wraps to two lines and keeps "Read More →" + dismiss X. The hero H1 wraps to two lines ("Enterprise AI Built for / Impact") and stays left/center aligned; the "Let's Talk" CTA becomes a full-width filled violet bar with the arrow pushed to the right edge. The logo wall reflows to fewer logos per row (Recursion, GoTo, Sumo Logic visible) and is horizontally scrollable/clipped. The iridescent ribbon graphic still bleeds in at the section boundary, and "Deep Partnerships with the Frontier" stacks below as a single column. Type scales down but retains the heavy Sharp Grotesk display weight.

## Confidence

**Verified in browser (from artifacts):**
- All H1/H2/H3 headlines, hero subhead, CTA labels, partner line, both testimonials — verbatim from raw JSON.
- Palette hex conversions — direct from `palette` rgb values.
- Fonts (Sharp Grotesk / IBM Plex Sans) + sizes — from `fonts`.
- Animation stack: Webflow + Lenis 0.2.28 + Swiper — confirmed by both `animLibGlobals` (Lenis/Webflow true; gsap/Framer/THREE false) and `animLibScripts`/`networkScripts`. **Animation approach confirmed.**
- Imagery counts (79 img, 0 video/canvas, 11 svg), page height 4299px, platform Webflow — from JSON.
- CTA destinations to `/start`, `/careers` — from `ctas`.
- Section order/layout and logo identities — cross-checked against `hero.png`, `mid.png`, `full.png`, `mobile.png`.

**[unverified] / inferred (load-bearing flagged):**
- Specific Webflow IX2 reveal/fade triggers on section entrance — runtime present but individual interactions not enumerated in JSON.
- "View All Case Studies" exact href — inferred from `navLinks`, not in `ctas`.
- "Read More" announcement-bar destination — not captured.
- "Compliance" badge identities — row confirmed, individual logos not legible in artifacts.
- The hero ribbon being a static raster vs. animated — inferred static from THREE=false / canvas=0; motion of the asset itself not directly observed.
