# Palantir — Design Teardown

Source: https://www.palantir.com (captured 2026-06-23). Built from `references/raw/palantir.json` + screenshots in `references/captures/palantir/` (`hero.png`, `full.png`, `mid.png`, `mobile.png`). Observation only — no recommendations.

---

## 1. Verbatim copy

**Hero H1** (word-for-word from raw JSON):
> AI-Powered Automation for Every Decision

**Hero subhead:** none — `heroSubhead` is `null`. The hero carries the headline only.

**Hero scroll cue:**
> Scroll to Explore

**Hero CTA label:**
> Explore AIP Now

**Section headlines (every H2/H3, verbatim):**
- H2 — "Our Software"
- H2 — "What our partners say about us"
- H3 — "Rebuilding American Sea Power"
- H3 — "The Manufacturing OS for American Re-Industrialization"
- H3 — "Accelerate Enterprise Data Migration with Palantir AIP"
- H3 — "Building Agentic Systems that Create True Operational Advantage"
- H3 — "How Foundry and AIP Create Magic on the Front Lines: 55 Speakers Including U.S. Navy, CDAO, GE Aerospace, and more"
- H3 — "Activate AI. With Any Storage. Any Compute. Any Model. Anywhere"
- H3 — "AI Is Transforming the Battlefield"
- H3 — "The New ISV TITAN. Designed and Delivered in 90 Days"
- H3 — "The Operating System for American AI Infrastructure"
- H3 (platform names) — "AIP", "Gotham", "Foundry", "Ontology", "Apollo"
- H3 — "There is so much left to build"

**Section subheads / signature lines (verbatim):**
- Platforms subheading: "Foundational Software of Tomorrow. Delivered Today.™"
- Bootcamp subhead: "From zero to use case in days. Move past demos, get hands-on-keyboard, and push to production."
- Get-Started subhead: "Now in over 50 sectors and industries worldwide."
- Closing-block body (from `full.png`, matches "There is so much left to build"): "Palantirians deliver mission-critical outcomes for the West's most important institutions."
- Mid-page editorial line (visible in `full.png`): "Our software powers real-time, decisions in critical government and commercial enterprises in the West, from the factory floors to the front lines."

**CTA labels (verbatim, full set):**
"Explore AIP Now", "Contact", "Get Started", "Request a Demo →", "Start Building →", "FedStart", "Platform Documentation", "Schedule an AIP Bootcamp", "LEARN MORE", "Explore Platforms", "Explore Offerings", "Explore Interoperability", "Explore Security", "Explore AIP", "Explore Foundry", "Explore Gotham", "Explore Apollo", "AIP for Developers", "Developer Community", "Palantir Learning".

---

## 2. Section-by-section IA

Order inferred from `sections` array + `full.png` top-to-bottom scroll.

1. **Hero** (`hero.png`, top of `full.png`) — Purpose: declarative positioning. Content: H1 "AI-Powered Automation for Every Decision", "Scroll to Explore" cue, single "Explore AIP Now" CTA. Layout: full-viewport, full-bleed looping background video (`Website_Reel_Update_V7.mp4`, 1425×900), centered near-white headline, transparent nav overlaid on top. A thin top-bar ribbon reads "Read CEO Alex Karp's Letter to Shareholders".

2. **Latest Impact / news block** (mid-region of `full.png`) — Purpose: editorial proof of mission-critical deployments. Content: rotating impact headlines ("Rebuilding American Sea Power", "Activate AI. With Any Storage. Any Compute. Any Model. Anywhere", "AI Is Transforming the Battlefield", etc.) plus dated press items (CNBC FEB 19 2025; AXIOS MARCH 12 2025) with "↳ Watch Here" / "↳ Read More" CTAs. Layout: full-bleed media tiles with an interactive node/network graphic ("Activate AI…" panel visible in `full.png`).

3. **Editorial statement band** (`full.png` mid) — Purpose: thesis line. Content: "Our software powers real-time, decisions in critical government and commercial enterprises in the West, from the factory floors to the front lines." Layout: large centered serif-scale type on white, generous whitespace.

4. **Our Software / Platforms** (`full.png`) — Purpose: product showcase. Content: H2 "Our Software", subhead "Foundational Software of Tomorrow. Delivered Today.™", five platforms each with tagline and its own looping demo video: AIP ("Get AI Into Operations"), Foundry ("Operating System for the Modern Enterprise"), Gotham ("Operating System for Global Decision Making"), Ontology ("Build and manage Ontology-powered software, with a complete developer platform"), Apollo ("Operating System for Continuous Delivery"). Layout: tabbed/card showcase with per-platform video.

5. **Category-Defining Technology (AI Awards)** — Purpose: third-party analyst validation. Content: Dresner No.1 rankings, IDC Worldwide AI market-share No.1 + Ritu Jyoti quote, Forrester Wave AI/ML Leader + quote. Layout: validation carousel.

6. **AIP Bootcamps** — Purpose: hands-on conversion path. Content: "From zero to use case in days. Move past demos, get hands-on-keyboard, and push to production." CTA "Schedule an AIP Bootcamp". Layout: accelerator pitch band.

7. **What Makes Palantir Platforms Powerful** (4-card grid in `full.png`) — Purpose: value props. Content: "Day 1 Value", "AI Decision Advantage Across Your Organization", "Full Stack Interoperability", "Multi-Layered Security and Data Privacy" — each with copy + Explore-* CTA. Layout: 4-column card row on white.

8. **There is so much left to build / closing CTA** (`full.png` bottom; partial in `mid.png`) — Purpose: recruiting + final conversion. Content: H3 "There is so much left to build", body "Palantirians deliver mission-critical outcomes for the West's most important institutions.", "LEARN MORE" (careers), plus paired "Request a Demo" / "Start Building" CTA blocks. Layout: split light/dark CTA panels.

9. **Partner logo wall** (`mid.png` bottom) — Purpose: customer proof. Content: H2 "What our partners say about us" followed by a row of customer wordmarks (WALGREENS, AT&T, PARAXEL, HEINEKEN, WALGREENS visible). Layout: horizontal logo strip on white.

10. **Footer** (`full.png` bottom) — Locale switch (US/UK/JP), socials (YouTube/X/LinkedIn/GitHub/Store), dense offering link columns (American Tech Fellowship, AML, Defense, Energy, Federal Health, FedStart, Financial Services, etc.). Layout: multi-column link footer on white.

---

## 3. Visual system

**Palette (rgb → hex):**
- Body bg: `rgb(255,255,255)` → `#FFFFFF`
- Body text: `rgb(30,33,36)` → `#1E2124` (near-black, monochromatic primary)
- Header text (over hero): `rgb(255,255,255)` → `#FFFFFF`; header bg `rgba(0,0,0,0)` → transparent
- Hero text: `rgb(239,239,239)` → `#EFEFEF` (near-white on dark video); hero bg transparent
- Primary button bg: `rgb(30,33,36)` → `#1E2124`, text `rgb(255,255,255)` → `#FFFFFF` (near-black pill, white label)
- Footer text: `rgb(30,31,43)` → `#1E1F2B`; footer bg transparent

Scheme: predominantly **light** (white body/content) with a **dark video-driven hero**. Near-monochrome — black-on-white content, white-on-dark hero. No saturated brand accent color sampled; color comes from the video/imagery, not UI chrome.

**Type families:**
- Headings: `"Alliance No.2"` (proprietary), falling back to Alliance No.1 / system-ui stack.
- Body / UI / paragraphs: `"Alliance No.1"` (proprietary) + system-ui fallback stack.
- Both are licensed sans-serifs loaded as web fonts.

**Type scale:** H1 80px; body 18px; paragraph 16px. Strong, high-contrast hierarchy with a large jump from body to display.

**Density:** low — generous whitespace, full-bleed sections, one idea per band. Editorial statement bands use very large centered type with air around it (`full.png`).

**Grid:** full-bleed section stacking; content bands center within a max-width; value props in a 4-column card row; footer in dense multi-column link grid.

**Depth / borders:** flat. Near-black pill buttons (`#1E2124`) are the main UI affordance; cards on white use subtle separation rather than heavy shadow. No pronounced elevation system observed in captures.

**Imagery style:** video-first and photographic. 42 images, 6 videos (1 hero reel + 5 per-platform demo loops), 14 SVGs, 0 canvas, 0 WebGL. Hero and platform media are full-motion (defense/industrial/enterprise footage). One stylized node/network graphic in the "Activate AI…" panel (`full.png`).

---

## 4. Motion + implementation

**Animation library: none.** `animLibGlobals` are all `false` (no gsap, anime, Framer/motion, lottie, ScrollMagic, Lenis, Webflow, THREE, Splitting/SplitType, barba). `animLibNetworkMatches` is empty. Verdict in JSON: "none — CSS transitions + IntersectionObserver + HTML5 autoplay video".

Notable effects:

1. **Full-bleed hero video reel** — looping autoplay muted background video (`Website_Reel_Update_V7.mp4`, with poster fallback `homepage_hero_poster_new.jpg`), fullscreen behind the H1. Built with native HTML5 `<video autoplay muted loop>`; no JS animation library. Trigger: on load; restraint: muted + poster fallback.

2. **Per-platform looping demo videos** — AIP/Gotham/Foundry/Ontology/Apollo each have their own `.mov`/`.mp4` autoplay-muted-loop clip in the Platforms showcase. Same native-video technique; switched via tab/card selection (DOM swap [unverified as to exact toggle mechanism]).

3. **Scroll-triggered reveals** — achieved via native `IntersectionObserver` (no library), per JSON `animNotes`.

4. **Heading transitions** — CSS `transition: all` on headings (per `animNotes`) for hover/state easing.

5. **Transparent → visible nav on scroll** — nav starts transparent over the dark hero (white text) and becomes visible/opaque on scroll (`palette.notes`, `navigation.style`). Technique: scroll-state class toggle + CSS transition [build detail inferred from observed behavior].

Stack context: Next.js (React SSR), Contentful CMS (`__NEXT_DATA__`), GTM (`GTM-PSL84DJ`), OneTrust consent. Motion is deliberately library-free — all effect is carried by video + native browser primitives.

---

## 5. Proof mechanics

**Analyst-ranking validation (Category-Defining Technology section)** — verbatim metric/quote cards:
- "Palantir Ranked No. 1 Vendor in AI, Data Science, and Machine Learning — Dresner Advisory Services, 2024 Wisdom of Crowds…"
- "Palantir Ranked No. 1 ModelOps Vendor — Dresner Advisory Services, 2024…"
- "Palantir Ranked No. 1 in Worldwide Artificial Intelligence Software Study in Market Share and Revenue"
- IDC attributed quote — Ritu Jyoti, "IDC's Group VP, AI and Automation".
- "Palantir Named a Leader in AI/ML Platforms by Independent Research Firm" + Forrester Wave™ AI/ML Platforms 2024 quote.

Card structure: ranking claim + attributed source (firm + study name + year), some with a pull-quote and named executive attribution. Format = analyst-authority badges, not numeric dashboards.

**Numeric proof points:** "Now in over 50 sectors and industries worldwide." (Get-Started); "55 Speakers Including U.S. Navy, CDAO, GE Aerospace…" (impact headline); "Designed and Delivered in 90 Days" (TITAN ISV).

**Customer proof — named logos, not anonymized.** Logo wall under "What our partners say about us" shows wordmarks: WALGREENS, AT&T, PARAXEL, HEINEKEN, WALGREENS (visible in `mid.png`). Also name-drops U.S. Navy, CDAO, GE Aerospace, U.S. Army (TITAN) in editorial copy.

**Press proof:** dated bylines — "CNBC, FEBRUARY 19, 2025" (Alex Karp / DOGE / The Technological Republic) and "AXIOS, MARCH 12, 2025" (TITAN trucks), each with a "↳ Watch Here" / "↳ Read More" link.

**Quote/badge format:** customer/analyst quotes use em-dash attribution to a named individual + firm/title; awards rendered as ranking statements with study citation.

---

## 6. Conversion

| CTA label | Placement | Destination |
|---|---|---|
| Explore AIP Now | Hero block | https://www.palantir.com/aip/ |
| Get Started | Top utility nav (and closing band) | "" (empty href in JSON) |
| Contact | Utility nav | https://www.palantir.com/contact/ |
| Request a Demo → | Closing CTA block / Get-Started section | https://www.palantir.com/contact/get-started/ |
| Start Building → | Closing CTA block | https://www.palantir.com/developers |
| Schedule an AIP Bootcamp | Bootcamp section | null (not captured) |
| LEARN MORE | Careers / "left to build" band | http://palantir.com/careers |
| FedStart | Offerings | https://www.palantir.com/offerings/fedstart/ |
| Platform Documentation | — | https://www.palantir.com/docs/ |
| Explore Platforms | Value card "Day 1 Value" | null |
| Explore Offerings | Value card "AI Decision Advantage" | null |
| Explore Interoperability | Value card "Full Stack Interoperability" | null |
| Explore Security | Value card "Multi-Layered Security" | null |
| Explore AIP | Platforms | https://www.palantir.com/platforms/aip/ |
| Explore Foundry | Platforms | https://www.palantir.com/platforms/foundry/ |
| Explore Gotham / Apollo | Platforms | null |
| AIP for Developers | Dev path | https://www.palantir.com/aip/developers/ |
| Developer Community | Dev path | https://community.palantir.com/ |
| Palantir Learning | Dev/learning | https://learn.palantir.com/ |

Pattern: multiple conversion lanes rather than one repeated ask — a **product lane** (Explore AIP/Foundry/etc. → platform pages), a **sales lane** (Request a Demo / Get Started → /contact/get-started/), a **developer lane** (Start Building → /developers, Dev Community, Learning), and a **recruiting lane** (LEARN MORE → /careers). Hero leads with product ("Explore AIP Now"); page closes on paired "Request a Demo" + "Start Building" panels.

---

## 7. Responsive

From `mobile.png`: the hero collapses to a single-column full-viewport layout. H1 "AI-Powered Automation for Every Decision" stays centered and wraps across two lines; the full-bleed background video is replaced/rendered as a portrait skyline crop filling the viewport. The "Scroll to Explore" cue sits below the headline. The top shareholder-letter ribbon persists at the very top ("Read CEO Alex Karp's Letter to Shareholders"). Nav condenses — the persistent "Get Started" pill stays pinned (bottom-right in the capture); primary nav items collapse behind a menu [hamburger not explicitly visible in capture — inferred]. Type scale steps down from the 80px desktop H1 to fit the narrow column. Section stacking remains single-column full-bleed, consistent with the desktop band structure.

---

## 8. Confidence

**Verified-in-browser (in the captured artifacts):**
- All copy in §1 — quoted directly from raw JSON fields (`heroH1Clean`, `allHeadings`, `sections`, `ctas`, `newsItems`).
- Palette hex (§3) — converted from exact rgb values in `palette`.
- Type families/sizes (§3) — from `fonts`.
- Animation verdict (§4) — `animLibGlobals` all false, `animLibNetworkMatches` empty, `animLib`/`animNotes` explicit. **Anim approach confirmed: native (CSS transitions + IntersectionObserver + HTML5 video), no library.**
- Imagery counts (§3) — from `imagery` (42 img / 6 video / 0 canvas / 14 svg).
- CTA destinations (§6) — from `ctas` href values (empty/null noted as such).
- Proof content (§5) — from `sections` copy, `newsItems`, and logos visible in `mid.png`.
- Tech stack — from `techStack`.

**[unverified] (load-bearing flagged):**
- §4: exact mechanism for switching per-platform demo videos (tab vs. card toggle) — [unverified], inferred.
- §4: nav transparent→opaque implemented via scroll-state class toggle — behavior is in JSON; the specific build technique is [unverified] inferred.
- §7: mobile nav collapses to a hamburger menu — [unverified], not explicitly visible in `mobile.png`.

Logo-wall company names (§5) are read from `mid.png` pixels and may contain OCR-level misreads (e.g. PARAXEL/Parexel); the existence of a named-logo wall is verified, exact spellings are lower-confidence.
