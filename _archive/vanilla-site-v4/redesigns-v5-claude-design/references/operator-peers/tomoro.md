# Tomoro.ai — Design Teardown

Source: https://tomoro.ai (captured 2026-06-23, real browser)
Artifacts: `references/raw/tomoro.json`, `references/captures/tomoro/{hero,mid,full,mobile}.png`
Title tag: "Tomoro.ai - reinventing better | Tomoro.ai"

---

## 1. Verbatim copy

**Hero H1** (rendered across line breaks):
> "Building the / Human-aligned / Future of Work"

**Hero subhead** (second H1 element):
> "We turn enterprise ambition into production ready AI - fast."

**Hero body copy:**
> "Born in 2023 in alliance with OpenAI, Tomoro is an AI consulting and engineering firm that designs, builds and scales AI solutions at the heart of our clients' competitive advantage."

**Hero banner strip (OpenAI acquisition note):**
> "Tomoro Becomes the Founding Acquisition Behind OpenAI Deployment Company — Defining one of the most transformational companies on the planet"
(The phrase "Defining one of the most transformational companies on the planet" is a link to `/insights/tomoro-acquired-by-openai-deployment-company`.)

**Every section headline (exact, in document order):**
- H1 — "Building the / Human-aligned / Future of Work"
- H1 — "We turn enterprise ambition into production ready AI - fast."
- H2 — "Some of our clients include"
- H2 — "Our Services"
- H3 — "AI Business Strategy"
- H3 — "Custom AI Solutions"
- H3 — "Enterprise AI Infrastructure"
- H3 — "Adoption and Rollout"
- H2 — "Our Partners"
- H2 — "Insights"
- H3 — "Agentic Retail: When Customer Journeys Start with Intent, not Search"
- H3 — "Tomoro Meta-Harness R&D: Enterprise-Grade Self-Improvement for Long-Horizon AI Workflows"
- H3 — "Responses are the Easy Part: What We've Learned Building Real-time Voice Experiences at Scale"

**CTA labels (exact):**
- "Contact Us" → `/contact`
- "Join Us" → `/careers`
- "View all" → `/insights`

**Signature lines** (from `paragraphs`, quoted word-for-word):
> "Turn AI into your competitive advantage."

> "Solve the hardest problems in AI."

> "We work closely with the pioneers of the world's best AI models. Our early-access and deep integration keeps our clients months ahead of the curve."

**Footer:**
> "© 2026 tomoro.ai. All Rights Reserved."

**Note on hero animated text [unverified]:** The `hero.png` and `mobile.png` captures show large display phrases that do NOT appear in the JSON copy capture — e.g. "We create magical travel adventures" (`hero.png`) and "Accelerating medi[cine?]" (`mobile.png`). These appear to be a cycling/rotating headline overlaid on the Vimeo hero video. Their full set and exact wording are not in the captured artifacts, so the individual rotating phrases are [unverified] beyond these two fragments.

---

## 2. Section-by-section IA

The JSON records only one structural section node (`sections[0]` = hero DIV); the remaining IA is reconstructed from `pageStructure`, `allHeadings`, and the screenshots.

1. **Nav** (`hero.png`, `mobile.png`, `mid.png`) — Logo "tomoro.ai" top-left (wordmark; ".ai" tinted acid-green). Right side: a single circular acid-green hamburger/menu button (collapsed even on desktop in captures). Nav links (Mission, Insights, Case Studies, Join Us) and "Contact Us" live behind it. Transparent background over the section beneath. Purpose: minimal chrome, menu-driven.

2. **Hero** (`hero.png`) — Full-viewport. Left column: H1 "Building the / Human-aligned / Future of Work" with a short acid-green underline rule above it. Right column: the OpenAI acquisition banner ("Tomoro Becomes the Founding Acquisition Behind OpenAI Deployment Company") plus the linked line "Defining one of the most transformational companies on the planet" with a right-arrow. Background: Vimeo-hosted video (green light-streak / fiber-optic abstract visual). Below, a large display headline that cycles phrases (e.g. "We create magical travel adventures") sits over the video. Layout: two-column text grid over full-bleed video.

3. **Hero subhead / intro** — Second H1 "We turn enterprise ambition into production ready AI - fast." plus body paragraph ("Born in 2023 in alliance with OpenAI..."). Purpose: positioning statement.

4. **Clients logo strip** — H2 "Some of our clients include". Horizontal marquee/ticker of 8 client logos: OpenAI, Mattel, Supercell, Petex, Virgin Atlantic, Fidelity, Tesco, DPD. Layout: single horizontal scrolling row. Purpose: social proof via named brands.

5. **Our Services** (`full.png`, dark panels) — H2 "Our Services" + 4 numbered service entries (01–04): AI Business Strategy, Custom AI Solutions, Enterprise AI Infrastructure, Adoption and Rollout. Each has a number, a name (H3), and a descriptive paragraph. Layout: numbered cards/rows, full-width dark panels. In `full.png` these render as tall navy panels with imagery (people at a green table, person on phone by glass facade).

6. **Our Partners** — H2 "Our Partners" + supporting line "We work closely with the pioneers of the world's best AI models...". Two partner logos: NVIDIA, OpenAI. Layout: logo row.

7. **Insights** (`full.png` lower) — H2 "Insights" + 3 article cards, each: dated kicker + H3 title + thumbnail image (Next.js-optimized). Articles: "Agentic Retail..." (JUNE 23, 2026), "Tomoro Meta-Harness R&D..." (JUNE 23, 2026), "Responses are the Easy Part..." (MAY 28, 2026). "View all" → `/insights`. Layout: 3-up card grid.

8. **Footer** (`full.png` bottom) — Logo + "© 2026 tomoro.ai. All Rights Reserved." + Privacy Policy, Cookie Policy, Cookie Settings + Tomoro LinkedIn link. Acid-green circular element at right. Layout: minimal single row on light sand band.

---

## 3. Visual system

**Palette (rgb → hex, from `palette`):**
- Body background — `rgb(238, 232, 223)` → **#EEE8DF** (warm sand / off-white)
- Body / primary text — `rgb(23, 23, 23)` → **#171717** (near-black)
- Primary CTA button — `rgb(216, 255, 0)` → **#D8FF00** (acid yellow-green)
- Header / hero / footer background — `rgba(0, 0, 0, 0)` → **transparent** (over body or section bg)

The acid-green **#D8FF00** is also the wordmark accent (".ai") and the circular nav button. Section panels in `full.png`/`mid.png` render dark navy — these are image/video section backgrounds layered over the sand base, not a global dark theme. The site's declared scheme is **light** (warm sand base), with dark imagery panels punctuating it.

**Type families + scale (from `fonts`):**
- Headings / display — **Space Grotesk** (with "Space Grotesk Fallback"), H1 at **42px**
- Body — **Rethink Sans** (with "Rethink Sans Fallback"), **16px** base
- (JSON `paragraph` entry also reports Space Grotesk 42px — that sample landed on a display paragraph, i.e. the second H1 / subhead, not body text.)
- Both are Google Fonts. Display headings are tightly leaded, large-weight; body is a humanist sans.

**Density / grid:** Generous whitespace, two-column hero grid (headline left, banner right). Services as numbered rows. Insights as a 3-up grid. Logo strips as single horizontal rows/marquees. Overall low-density, editorial.

**Depth / border treatment:** Largely flat. Transparent header/footer. Primary depth cue is the full-bleed hero video and full-width imagery panels rather than shadows or borders. CTA is a solid high-contrast acid-green fill (no border/shadow evident).

**Imagery style:** 13 `<img>` (8 client/partner logos as SVG-via-`<img>`, 3 article thumbnails via Next.js image optimization), 14 inline SVGs. Hero is a Vimeo background video (green light-streak abstract). Section imagery is photographic, corporate/architectural (glass facades, people in modern offices, green-accented furniture) per `full.png`/`mid.png`. CMS assets hosted on Storyblok (`a.storyblok.com/f/328125/`).

---

## 4. Motion + implementation

**Animation library: none detected.** `animLibGlobals` reports all false (gsap, anime, Framer, motion, lottie, ScrollMagic, Lenis, Webflow, THREE, Splitting, SplitType, barba). `animLibNetworkMatches` is empty. `animLib` verdict: "none detected — hero motion via Vimeo background video... no JS animation library found on window or in script network requests."

Notable effects:

1. **Hero background video** — Full-viewport looping abstract visual (green light streaks). Behavior: autoplay, muted, looped, no controls (`background=1`). Built as a **Vimeo iframe embed** (video ID `1191489936`), URL `https://player.vimeo.com/video/1191489936?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1`. No native `<video>` tag and no fallback. Vimeo player scripts present: `player.module.js`, `vendor.module.js`, `vuid.min.js` (vimeocdn). This is the primary motion on the page.

2. **Clients logo marquee/ticker** — Horizontal scrolling logo strip (per `layoutPattern`: "Horizontal marquee/ticker for clients logo strip"). [unverified] mechanism — no animation library is loaded, so this is most plausibly a CSS keyframe `transform: translateX` loop or a small bespoke JS scroll; the exact technique is not directly evidenced in the artifacts.

3. **Hero rotating/cycling headline** — The display phrases overlaid on the video ("We create magical travel adventures", "Accelerating medi...") differ between captures, implying a text-rotation effect. [unverified] mechanism — with no animation library on `window`, this would be bespoke React/Next.js component state or a CSS transition; not directly evidenced.

Restraint: aside from the hero video and the logo ticker, no scroll-jacking, parallax, or JS-driven scroll animation is evidenced. Framework is **Next.js (App Router)** (`_next/static/chunks` pattern); analytics via **Google Tag Manager** (GTM-P7N568L3).

---

## 5. Proof mechanics

**Client logos (named, not anonymized):** OpenAI, Mattel, Supercell, Petex, Virgin Atlantic, Fidelity, Tesco, DPD — presented as a logo strip under "Some of our clients include." Real, recognizable brand logos (SVG).

**Partner logos:** NVIDIA, OpenAI — under "Our Partners" with the line "We work closely with the pioneers of the world's best AI models. Our early-access and deep integration keeps our clients months ahead of the curve."

**Headline credibility badge:** The OpenAI acquisition banner ("Tomoro Becomes the Founding Acquisition Behind OpenAI Deployment Company") functions as the lead proof/news element, linking to an insight article.

**Metric / quantified claims (in service copy, not stat cards):**
- "in as little as 2 weeks" (AI Business Strategy — roadmaps)
- "typically in production in less than 12 weeks" (Custom AI Solutions)

**Card structure:** Services use a number (01–04) + H3 name + description paragraph. Insights use a dated kicker (e.g. "JUNE 23, 2026") + H3 title + thumbnail. No testimonial quotes or numeric stat-grid cards are present in the captured artifacts. Proof is brand-logo and partnership driven, not metric-card driven.

---

## 6. Conversion

All CTAs and their destinations (from `ctas` / `allLinks`):

| Label | Destination | Placement |
|---|---|---|
| "Contact Us" | `/contact` | Nav (behind menu) + repeated in body/footer area |
| "Join Us" | `/careers` | Nav + recruiting-oriented CTA |
| "View all" | `/insights` | End of Insights section |

Nav links (non-CTA): Homepage (`/`), Mission (`/mission`), Insights (`/insights`), Case Studies (`/case-studies`), Join Us (`/careers`).

Strategy: single primary conversion ask — **"Contact Us" → `/contact`** — rendered as the high-contrast acid-green (#D8FF00) button. Secondary recruiting CTA "Join Us" → `/careers`. No external scheduler (e.g. Calendly) in artifacts; conversion routes to first-party `/contact`. The OpenAI acquisition banner provides a soft content CTA into `/insights/...`. LinkedIn link (`linkedin.com/company/tomoro-ai`) in footer.

---

## 7. Responsive

From `mobile.png`:
- **Single-column stack.** Hero collapses to one column: acid-green underline rule, then H1 "Building the / Human-aligned / Future of Work" stacked, then the acquisition banner text ("Tomoro Becomes the Founding Acquisition Behind OpenAI Deployment Company") and the linked "Defining one of the most transformational companies on the planet" with right-arrow below it.
- **Nav collapses** to logo (top-left) + a single circular acid-green menu button (top-right) — same menu-driven pattern as desktop.
- **Hero video** persists full-bleed beneath the text; a rotating display headline ("Accelerating medi...") is overlaid on imagery (people in a lab/medical setting with green wireframe graphics).
- Type scales down but retains the Space Grotesk display headline. Generous vertical rhythm; sections stack full-width. [unverified] — exact breakpoint values and how the service/insight grids reflow are not captured (only the hero region is visible in `mobile.png`).

---

## 8. Confidence

**Verified-in-browser (from captured JSON + screenshots):**
- All copy quoted in §1 (hero H1/subhead/body, banner, every heading, CTA labels, signature lines, footer) — verbatim from `tomoro.json`.
- Palette hex conversions (§3) — computed from exact rgb values in `palette`.
- Type families and sizes (§3) — from `fonts`.
- Hero is a Vimeo background-video iframe with the exact embed URL and player scripts (§4) — from `imagery` + `scriptSrcs`.
- No JS animation library present (§4) — from `animLibGlobals` (all false), empty `animLibNetworkMatches`, `animLib` verdict. **Animation approach confirmed.**
- Framework Next.js App Router, GTM analytics, Storyblok CMS — from `framework`/`analytics`/`cms`/`scriptSrcs`.
- Client/partner logo lists, service cards (01–04 + copy), insight articles + dates, all CTAs/destinations — from structured JSON arrays.
- Mobile single-column hero + collapsed menu button — from `mobile.png`.

**Load-bearing [unverified] claims (flagged inline):**
1. The hero **rotating/cycling display headline** and its individual phrases ("We create magical travel adventures", "Accelerating medi...") — visible in `hero.png`/`mobile.png` but absent from the JSON copy capture; the full phrase set and the rotation mechanism are not in the artifacts.
2. The **clients logo marquee** scroll mechanism — described as marquee/ticker in `layoutPattern` but the implementation technique (CSS keyframe vs. JS) is not directly evidenced.

Both unverified items are observational; no metric or load-bearing copy claim rests on an unverified source.
