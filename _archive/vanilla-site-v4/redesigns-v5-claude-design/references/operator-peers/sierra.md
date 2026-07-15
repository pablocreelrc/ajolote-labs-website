# Sierra — Design Teardown

Source: https://sierra.ai · Captured 2026-06-23 · Title: "Better customer experiences | Sierra"
Ground-truth artifacts: `references/raw/sierra.json`, `references/captures/sierra/{hero,mid,mobile,full}.png`
*Recapture note: the workflow capture agent died mid-response; this site was re-captured directly. Screenshots from the original run were intact and reused.*

## Verbatim copy

**Hero H1** (line breaks preserved as in raw JSON):
> Better customer
> experiences.
> Built on Sierra.

**Hero subhead:** none exposed as a `<p>` under the H1 (hero is headline-dominant; no sub-paragraph captured).

**Every section headline (in document order):**
- H1: "Better customer experiences. Built on Sierra."
- H2: "Leading brands succeed with Sierra"
- H2: "Transform your customer experience"
- H3: "Increase the lifetime value of your customers"
- H3: "Empower every team"
- H3: "Unify your channels"
- H3: "Pay for a job well done"
- H2: "The results speak for themselves"
- H2: "Sierra Agent OS"
- H3: "The agent-building agent"
- H3: "Build" / H3: "Optimize"
- H3: "Use AI to improve your AI"
- H3: "Explorer" / "Monitors" / "Experiments" / "Observability"
- H3: "Turn conversations into lasting relationships"
- H3: "Agent memory" / "Customer data" / "Recommendations" / "Proactive engagement"
- H2: "Trust and reliability"
- H2: "Discover what Sierra can do for you"

**CTA / nav labels (verbatim):** Nav top-level — Product · Industries · Customers · Company. Top-right — "Sign in" (→ /login). Repeated body CTA — "Learn more" (→ /learn-more). Product deep-link — "Explorer" (→ /product/explorer).

**Signature lines (word-for-word):**
- "Sierra helps the great companies of the world show up at their best."
- "Pay for a job well done." (outcome-based pricing framing, used as a value subhead)
- "Upload SOPs, transcripts, whiteboard photos, and audio recordings—or explain your goal in plain English. Ghostwriter builds a production agent."
- "Find out how Sierra can help your business build better, more human customer experiences with AI."

## Section-by-section IA

1. **Hero** (`hero.png`, top of `full.png`) — large left/centered serif-feel 65px H1 "Better customer experiences. Built on Sierra." on a clean white field. Headline-dominant, minimal supporting copy; nav transparent over white. Very low ink density.
2. **Leading brands succeed with Sierra** (`full.png`) — customer-proof band ("Customer stories"); logo/story treatment of named enterprise brands.
3. **Transform your customer experience** (`full.png`, `mid.png`) — value pillar section with four H3 subheads: Increase LTV · Empower every team · Unify your channels · Pay for a job well done. Multi-pane layout.
4. **The results speak for themselves** (`full.png`) — testimonial + results band; pull-quote ("Innovation is in our DNA, and Sierra helps us bring that to life…") plus outcome framing.
5. **Sierra Agent OS** (`mid.png`, `full.png`) — flagship product section: "Build, optimize, personalize, and scale the best AI agents." Sub-block "The agent-building agent" (Ghostwriter), with Build / Optimize steps.
6. **Use AI to improve your AI** (`full.png`) — Insights suite: Explorer / Monitors / Experiments / Observability, each an H3 with a one-line gloss.
7. **Turn conversations into lasting relationships** (`full.png`) — Agent Data Platform: Agent memory / Customer data / Recommendations / Proactive engagement.
8. **Trust and reliability** (`full.png`) — security/compliance reassurance band.
9. **Discover what Sierra can do for you** (`full.png`, bottom) — closing conversion section.
10. **Footer** (`full.png`) — Product / Industries / Customers / Company columns; legal (Privacy Policy, Terms & Conditions, Modern Slavery Statement, Cookie Preferences).

## Visual system

- **Palette (rgb → hex):** body/header text `rgb(48,46,45)` → **#302E2D** (near-black warm graphite); hero/page background **#FFFFFF**; primary button `rgb(5,53,29)` → **#05351D** (deep forest green) with **#FFFFFF** text; footer background `rgb(246,245,243)` → **#F6F5F3** (warm off-white). **Light theme**, very high white space, single dark-green accent.
- **Type:** one family throughout — **gtAmerica** (GT America, with `gtAmerica Fallback`). H1 65px / weight 400; body 16px / weight 400; small paragraph text down to 12px. Restrained, editorial, low weight even at display size.
- **Density / grid:** airy, generous vertical rhythm; one idea per band; multi-pane product showcases in the Agent OS / Insights sections.
- **Depth / border:** flat, minimal borders; relies on whitespace and the warm off-white footer to separate zones rather than heavy dividers.
- **Imagery:** 69 `<img>`, 25 `<svg>`, **3 `<video>`** (product UI motion/demo loops), 0 `<canvas>`. Product-UI screenshots and clean iconography; no stock photography feel.

## Motion + implementation

- **Animation library: none detected.** No `gsap`, `framer-motion`, `lenis`, `lottie`, `three`, `scrollmagic`, `theatre`, `splitting`/`SplitType`, or `barba` in `window` globals or among loaded scripts. All first-party scripts are **Next.js turbopack chunks** (`/_next/static/chunks/*`); every third-party script is analytics/martech (HubSpot, OneTrust, GTM, LinkedIn, Bing, Reddit, Meta, Dreamdata, Claydar, ZoomInfo, The Trade Desk).
- **Mechanism (verified-by-fingerprint, behavior inferred):** motion is therefore native **CSS transitions** and, for the on-scroll product reveals, almost certainly **IntersectionObserver** — the standard Next.js-app pattern. The 3 `<video>` elements carry the product-demo motion (looping UI captures), not a JS animation engine.
- **Restraint:** the build is deliberately library-free for motion — atmosphere comes from typography, whitespace, and video, not scripted scroll choreography.

## Proof mechanics

- **Named-brand social proof:** "Leading brands succeed with Sierra" logo/story band (named enterprise customers, not anonymized) — the opposite of Distyl's anonymized approach.
- **Testimonial:** "The results speak for themselves" with an attributed pull-quote ("Innovation is in our DNA, and Sierra helps us bring that to life in how we care for our members every day.") `[unverified: speaker attribution not captured in the DOM extract — verify against full.png]`.
- **Pricing as proof:** "Pay for a job well done" elevates **outcome-based pricing** to a value pillar — a differentiating trust device.

## Conversion

- **Primary repeated CTA:** "Learn more" → `/learn-more` (appears across hero, nav, and value sections — soft, content-forward rather than a hard demo-gate).
- **Account CTA:** "Sign in" → `https://sierra.ai/login` (top-right).
- **Closing CTA:** "Discover what Sierra can do for you" section near the footer.
- **Note:** conversion is notably *soft* — repeated "Learn more" rather than "Book a demo." No demo form gating the primary path. `[unverified: whether /learn-more itself routes to a demo/contact form — destination page not opened]`.

## Responsive

- `mobile.png` (390px): single-column stack, H1 reflows across its three lines, nav collapses to a menu. Light theme and gtAmerica type hold; product multi-pane sections stack vertically. No layout breakage observed at 390px.

## Confidence

- **Verified-in-browser (this session):** title, hero H1 (verbatim), full heading list, nav labels, repeated "Learn more" CTA + hrefs, palette rgb values, font family/sizes, media counts, framework (Next.js turbopack), animation-library absence (globals + network), third-party script inventory. Screenshots present (hero/full/mid/mobile).
- **`[unverified]` (flagged inline, non-load-bearing):** testimonial speaker attribution; destination of `/learn-more`. Both are easily resolved by opening the respective screenshot/page if needed.
- **Load-bearing claims:** all verified. Motion *mechanism* (CSS transitions + IntersectionObserver) is fingerprint-grounded (library absence is verified) with behavior inferred from the Next.js build pattern — labeled as such above.
