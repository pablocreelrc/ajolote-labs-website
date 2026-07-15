# Maven AGI — Design Teardown

Source: https://www.mavenagi.com — page title "Maven AGI | Enterprise AI Agent Platform for CX".
Ground truth: `references/raw/maven-agi.json` (browser-captured) + `references/captures/maven-agi/{hero,full,mid,mobile}.png`.

---

## 1. Verbatim copy

**Hero H1** (two lines; note the zero-width joiner `‍` before the second line in the source):
> "Maven AGI
> ‍At Your Service"

**Hero subhead:**
> "Enterprise AI that delivers the experience your customers deserve at every touchpoint."

**Section headlines (every H2/H3, in DOM order):**
- H2 — "Who we serve"
- H2 — "Features"
- H2 — "Product"
- H2 — "Featured integrations"
- H3 — "Zendesk"
- H3 — "Salesforce"
- H3 — "Freshdesk"
- H2 — "Enterprise-Grade Security & Compliance"
- H2 — "Don't be Shy."

**Top announcement bar** (verbatim, from hero.png — supported by the "Learn More" CTA href `/resources/the-agentic-list-2026`):
> "Maven AGI named to The Agentic List 2026 - One of 9 Companies listed in CX Agents category"

**CTA labels (verbatim):**
- "Book a demo" (×4)
- "Learn More" / "Learn more" (multiple casings as captured)
- "Customer Service\nLearn More", "Customer Support\nLearn More", "Customer Experience\nLearn More"
- "Read case study" (testimonial card button — from mid.png)
- "Login"
- "Submit" (final form — paraphrased in JSON gist; label text itself not quoted verbatim in raw)

**Signature lines (quoted word-for-word):**
- Stat 1: "Up to 93% customer queries answered autonomously"
- Stat 2: "10x faster resolution time vs. traditional methods"
- Stat 3: "Up to -60% response time when enterprises optimize, test, & deploy"
- "Who we serve" body: "Maven helps enterprises deliver the customer experiences that delight — empowering CX, support, operations, and AI teams with automation that resolves issues across the entire customer journey."
- Features lede: "Core capabilities that power accurate automation, consistent decisions, and enterprise-grade trust."
- Product lede: "AI built for the full customer journey, unifying reasoning, actions, and knowledge across every touchpoint."
- Final CTA section ("Don't be Shy."): "Make the first move. Request a free personalized demo."
- Integration sublines, verbatim:
  - Zendesk: "Resolve Zendesk tickets faster with AI that reasons, acts, and learns from every conversation."
  - Salesforce: "Unify Salesforce CRM data with AI-powered support to resolve cases faster and keep every team in sync."
  - Freshdesk: "Supercharge Freshdesk with AI that resolves tickets, guides agents, and keeps your knowledge base working harder."

---

## 2. Section-by-section IA

Overall page composition visible in **full.png**. Section classes are Webflow `global_section` variants.

1. **Announcement bar** (teal/green strip, fixed at top) — *Purpose:* award/PR proof. *Content:* "Maven AGI named to The Agentic List 2026…" + "Learn More" arrow + dismiss ×. *Layout:* full-bleed single-row banner above the nav. **(hero.png, mobile.png)**

2. **Header / nav** (`header`, transparent bg) — *Purpose:* navigation + conversion. *Content:* Maven AGI logo (purple), dropdown nav (Platform / Solutions / Customers / Resources / Company), "Login" outline button, "Book a demo" solid black button. *Layout:* logo left, centered nav cluster, buttons right. **(hero.png)**

3. **Hero** (`section.global_hero`) — *Purpose:* positioning + primary conversion. *Content:* H1 "Maven AGI / At Your Service", subhead, "Book a demo" button on the left; on the right a Lottie animation — a faux product chat card ("Your customers are happier today than…") with a purple "Sentiment" pill, "SHOW ME HOW →", over a pixelated gradient mosaic. *Layout:* two-column split (copy left, animation right). **(hero.png)**

4. **Stats bar** (`global_section small-v`) — *Purpose:* quantified proof. *Content:* three stats — "Up to 93%", "10x", "Up to -60%" — each with a label, preceded by a customer-logo row. *Layout:* horizontal 3-up metric band with green numerals; logo strip above. **(full.png)**

5. **Who we serve** (`global_section small-v`) — *Purpose:* audience segmentation. *Content:* H2 + paragraph, then three role cards: Customer Service / Customer Support / Customer Experience, each with "Learn More". *Layout:* centered heading + 3-card row. **(full.png)**

6. **Features** (`global_section small-top`) — *Purpose:* capability overview. *Content:* H2 + lede; feature blocks Data & Insights, Inbox & Knowledge Graph, Trust & Compliance, Channels (each with a product-UI visual — charts/gauges in full.png). *Layout:* heading + visual-led feature grid. **(full.png)**

7. **Product** (H2 inside the Features region) — *Purpose:* product line. *Content:* lede + sub-nav of AI Agent Platform / AI Agents / AI Agent Designer / AI Voice Agent. *Layout:* heading + product diagram. **(full.png)**

8. **Featured integrations** (`global_section no-paddings`) — *Purpose:* ecosystem fit. *Content:* three integration cards (Zendesk / Salesforce / Freshdesk) each with logo, subline, "Learn More". *Layout:* 3-column card row. **(full.png)**

9. **Testimonials carousel** (`global_section big-top overflow-hidden`) — *Purpose:* social proof. *Content:* large quote cards (Anthony Skilton, Tara Clark, Jeff Ho, David Doyle) with headshot, name, title, company logo, "Read case study" button; prev/next arrow controls. *Layout:* full-width purple swipeable card; adjacent card peeks at the edge. **(mid.png)**

10. **Enterprise-Grade Security & Compliance** (`global_section w-variant-…`) — *Purpose:* trust/compliance. *Content:* H2 + "Learn more" + a Lottie animation cycling security-certification badges. *Layout:* heading + animated badge cluster. **(full.png)**

11. **Final CTA — "Don't be Shy."** (`global_section is-cta`, purple) — *Purpose:* primary lead capture. *Content:* "Make the first move. Request a free personalized demo." + inline Marketo form (First Name, Last Name, Business Email, Company Name, consent checkbox, Submit). *Layout:* full-bleed purple block, copy left, form card right. **(full.png)**

12. **Footer** — *Purpose:* sitemap. *Content:* link columns Products / Features / Integrations / By Role / Company / Resources / By Industry. *Layout:* multi-column link grid on the warm off-white base. **(full.png)**

---

## 3. Visual system

**Palette** (rgb from raw JSON → hex):
- Body background: `rgb(250, 246, 242)` → **#FAF6F2** (warm off-white / cream — the dominant canvas)
- Body text: `rgb(10, 0, 20)` → **#0A0014** (near-black, faint purple cast)
- Header text: `rgb(255, 255, 255)` → **#FFFFFF** (white nav text over dark/transparent contexts)
- First button text: `rgb(252, 251, 250)` → **#FCFBFA** (near-white on the solid-black "Book a demo")
- Header / hero / footer backgrounds: `rgba(0, 0, 0, 0)` → **transparent** (they sit over the cream body / section colors)
- Observed but not sampled in raw JSON (from screenshots) [unverified hex]: brand **purple/violet** (logo, H1 "Maven AGI", final CTA block, testimonial cards, "Sentiment" pill); **green/teal** stat numerals and announcement bar; **solid black** primary button.

**Type families + scale** (from raw JSON):
- Display / body family: `"Control Upright Variable", Arial, sans-serif` (a variable sans display face).
- H1: 80px. Body: 20px. Paragraph fallback stack: `Helvetica, Arial, "Hiragino Sans GB", … sans-serif` at 16px.
- Loaded via Google WebFont Loader (`webfont.js`).

**Density / grid:** Generous, airy. Centered single-column rhythm for headings; 3-up card rows recur (roles, integrations, stats). Hero is a 2-column split. Whitespace-heavy, magazine-like.

**Depth / border treatment:** Mostly flat on the cream base; cards use soft rounded corners and subtle elevation (testimonial card, hero chat card). Buttons are pill/rounded-rect (solid black primary, outline secondary). The hero art and footer-adjacent areas use a distinctive **pixelated/mosaic gradient** (purple→blue→teal blocks).

**Imagery style:** 134 images, 47 inline SVGs, 4 videos, 0 canvas. Hero is Lottie (not video/canvas). Imagery = monochrome/duotone customer logos, real testimonial headshots, product-UI screenshots (analytics charts, gauges), and the recurring pixel-gradient motif.

---

## 4. Motion + implementation

Animation library is **confirmed** from globals: `Webflow: true`; gsap/anime/Framer/motion/lottie-global/ScrollMagic/Lenis/THREE/Splitting/SplitType/barba all `false`. Stack identified as **Webflow IX2 + Lottie JSON files**, with Swiper.js and SmoothScroll.js.

- **Hero Lottie animation** — *What:* the animated chat-card/sentiment scene on the right (`hero-lottie-2`). *Behavior:* autoplay loop on load, decorative, restrained. *Built:* Lottie JSON `…6942b80e159e93c7aaf42e7c_19.Hero.json` rendered into the `.hero-lottie-2` element. (Note: `lottie` global is `false` — the player is bundled inside Webflow's chunked JS rather than exposed as a window global.)

- **Security certifications Lottie** — *What:* cycling compliance-badge animation in the Security section (`dd-lottie`, with an `is-mobile` variant). *Behavior:* looping badge reveal. *Built:* Lottie JSON `…69414e7a0715ad3b69201722_18--Security Certifications.json`.

- **Scroll-triggered reveals** — *What:* section/element entrance animations on scroll. *Behavior:* trigger on scroll-into-view; subtle. *Built:* **Webflow IX2** (Interactions 2.0) — 12 `data-w-id` interaction elements detected (`webflowDataElements: 12`); IX2 reads those attributes and applies timeline transforms via CSS/JS.

- **Testimonials carousel** — *What:* swipeable quote cards with prev/next arrows and an edge-peeking next card (mid.png). *Behavior:* manual swipe/arrow navigation. *Built:* **Swiper.js v12** (`cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js`).

- **Smooth scrolling** — *What:* eased scroll behavior. *Built:* **SmoothScroll.js 1.4.10** (cdnjs).

No GSAP, no Lenis, no Three.js, no WebGL/canvas. Motion is platform-native Webflow plus two declarative Lottie scenes — restrained and decorative, not scroll-jacking.

---

## 5. Proof mechanics

**Metric values (stats bar):**
- "Up to 93%" — "customer queries answered autonomously"
- "10x" — "faster resolution time vs. traditional methods"
- "Up to -60%" — "response time when enterprises optimize, test, & deploy"

Numerals rendered large in green; hedged with "Up to" / "Realize" qualifiers (the raw fullText shows "Up to" and "Realize" preambles).

**Customer logos (named, not anonymized — 22 logos):** Hard Rock Digital, Bellfry, Tixel, Check, Mastermind, Thumbtack, K1x, Clio, Bamboo Health, Snapdogs, Qualia, Rho, Clickup, Tripadvisor, PapayaPay, Enumerate, Impact, Digital.ai, Exclaimer, Roo, TiVo, Ultra Camp. Presented as a logo strip above the stats.

**Testimonial card structure (mid.png):** company logo top-left → large quote → headshot + name + title bottom-left → "Read case study" button bottom-right. All four are attributed by full name, title, and company (named, not anonymized):
- Anthony Skilton — Operations and Systems Manager (Exclaimer): "Training our old chatbot to respond to different support scenarios took hundreds of hours. Maven learned the answers from the moment it integrated with our systems."
- Tara Clark — Senior Client Support Manager (Roo): "Maven's ability to give our customers highly curated answers 24/7 is absolutely huge for us. Now, they get better, faster support, and our team has time back for high-touch tickets."
- Jeff Ho — VP of Operations: "Customer support is often a tradeoff between quality, speed, and cost. But with Maven, we don't have to compromise. We can give our customers the very best support while keeping our team lean."
- David Doyle — Head of Customer Support: "Just one week into the trial, rep solves per hour increased 25%. With increased efficiency on reactive operational support, we can invest more heavily in the proactive retention dollar activities."

**Badge/award proof:** announcement bar — "The Agentic List 2026 - One of 9 Companies listed in CX Agents category". Security section uses a Lottie of certification badges (independent-audit framing in the Trust & Compliance copy).

---

## 6. Conversion

Primary conversion verb is **"Book a demo"**; secondary is **"Learn More"** (navigational, not lead-capture).

| CTA | Placement | Destination |
|---|---|---|
| "Learn More" | Announcement bar | `/resources/the-agentic-list-2026` |
| "Book a demo" | Header nav (solid black) | `/demo` |
| "Book a demo" | Hero (below subhead) | `/demo` |
| "Book a demo" | (additional instance in body, ×4 total) | `/demo` |
| "Customer Service\nLearn More" | Who-we-serve card | `/solutions/customer-service` |
| "Customer Support\nLearn More" | Who-we-serve card | `/solutions/customer-support` |
| "Customer Experience\nLearn More" | Who-we-serve card | `/solutions/customer-experience` |
| "Learn More" (Zendesk card) | Featured integrations | `/integrations/zendesk` |
| "Learn More" (Salesforce card) | Featured integrations | `/integrations/salesforce` |
| "Learn More" (Freshdesk card) | Featured integrations | `/integrations/freshdesk` |
| "Learn more" | Security section | `/features/trust-compliance` |
| "Read case study" | Testimonial cards | per-customer story [unverified href — not in raw JSON] |
| "Login" | Header | `https://accounts.mavenagi.com/u/login/` |
| Inline form "Submit" | Final "Don't be Shy." section | Marketo form (munchkinId 597-UOW-209) |

The final section converts in-page via an embedded **Marketo** form (First Name, Last Name, Business Email, Company Name, consent checkbox) rather than routing out to `/demo`. Every "Book a demo" routes to `/demo`; demo is the dominant ask.

---

## 7. Responsive (mobile.png)

- **Announcement bar** wraps to two lines ("…One of 9 / Companies listed in CX Agents category") with the "Learn More →" pill below the text; dismiss × top-right.
- **Header** collapses: logo left, "Login" + "Book a demo" buttons kept visible, plus a hamburger (☰) for the full nav. The dropdown nav cluster is hidden behind the hamburger.
- **Hero reorders to single column** and **art-first**: the Lottie chat card + pixel-gradient mosaic stacks *above* the headline, then "Maven AGI / At Your Service" H1, then the subhead. (Desktop is copy-left / art-right; mobile flips to art-on-top.)
- The chat-card Lottie shows a fuller string on mobile ("Your customers are happier today than…") vs. the truncated "Your custo…" mid-typewriter state in the desktop hero.png — consistent with an autoplaying typewriter Lottie.
- A dedicated mobile Lottie variant exists for the security section (`dd-lottie is-mobile`).
- Type scales down but keeps the same purple-H1 / black-subhead duotone; cream background unchanged.
- [unverified] Lower sections (stats, cards, carousel, form) presumably stack to single column — not captured in mobile.png, which only shows the top of the page.

---

## 8. Confidence

**Verified in browser (raw JSON + screenshots):**
- All hero/section/CTA copy, stats, testimonials, logos, nav/footer links — verbatim from raw JSON.
- Palette rgb values and hex conversions (#FAF6F2, #0A0014, #FFFFFF, #FCFBFA, transparent) — from raw `palette`.
- Font families (Control Upright Variable; Helvetica fallback), sizes (H1 80px, body 20px, paragraph 16px) — from raw `fonts`.
- Animation stack: Webflow IX2 (12 data-w-id elements) + two Lottie JSON files (hero + security, with mobile variant) + Swiper.js v12 + SmoothScroll.js — from `animLibGlobals`, `animDetails`, `scriptMatches`. **Animation approach confirmed.**
- Imagery counts (134 img / 47 svg / 4 video / 0 canvas; hero is Lottie) — from raw `imagery`.
- CTA destinations — from raw `ctas` / `navLinks` hrefs.
- Infra: Webflow host, Cloudflare, GTM/Clarity/New Relic, Marketo CRM, Osano consent — from raw `infrastructure`.
- Layout/IA, mobile reflow, testimonial card structure, stats styling — corroborated by hero.png / mid.png / mobile.png / full.png.

**Load-bearing [unverified] claims (minimized):**
1. Brand purple/green/teal accent **hex values** — sampled only the JSON palette (cream/black/white); the purple/green seen in screenshots have no exact hex in the artifacts.
2. "Read case study" CTA href — not present in raw `ctas`.
3. Lower-section single-column stacking on mobile — mobile.png captures only the page top.

Non-load-bearing inferences are tagged inline. All copy and metrics are quoted verbatim; none invented.
