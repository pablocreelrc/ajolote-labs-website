# Linear — Design Teardown (Taste Anchor)

Source: https://linear.app — captured 2026-06-23. Title: "Linear – The system for product development".
Ground-truth artifacts: `references/raw/linear.json`; screenshots `references/captures/linear/{hero,mid,full,mobile}.png`.

---

## 1. Verbatim copy

**Hero H1** (line break preserved as in JSON):
> The product development
> system for teams and agents

**Hero marketing subhead** (the H2 that functions as the real marketing subhead, per JSON `heroMarketingSubhead`):
> A new species of product tool. Purpose-built for modern teams with AI workflows at its core, Linear sets a new standard for planning and building products.

> [!NOTE] The first visible sub-line under the H1 in the hero screenshots reads "Purpose-built for planning and building products. Designed for the AI era." — but the JSON does not store that string verbatim as a marketing field. The JSON's `heroSubhead` field instead captured the first *issue item inside the animated demo UI*: "Render UI before vehicle_state sync when minimum required state is present, instead of blocking on full refresh during iOS startup." That is product-demo chrome, not marketing copy. Treat the H2 above as the canonical marketing subhead.

**Meta description (verbatim):**
> Purpose-built for planning and building products with AI agents.

**Every section headline (verbatim, in document order from `allHeadings`):**
- H1 — "The product development system for teams and agents"
- H3 — "Faster app launch" (label inside the hero demo UI)
- H2 — "A new species of product tool. Purpose-built for modern teams with AI workflows at its core, Linear sets a new standard for planning and building products."
- H2 — "Make product operations self-driving"
- H2 — "Define the product direction"
- H2 — "Move work forward across teams and agents"
- H2 — "Review PRs and agent output"
- H2 — "Understand progress at scale"
- H2 — "Changelog"
- H2 — "Built for the future. Available today."
- Footer H3s — "Product", "Features", "Company", "Resources", "Connect", "Legal"

**CTA labels (verbatim from `ctas`):** "Contact", "Sign up", "Get started", "Contact sales", "Customer Requests", "Startups", "Contact us".
**Nav labels (verbatim from `navLinks`):** "Customers", "Pricing", "Now", "Contact", "Docs", "Open app", "Log in", "Sign up".

**Signature lines (verbatim):**
- "A new species of product tool."
- "Make product operations self-driving"
- "Built for the future. Available today."
- "Turn conversations and customer feedback into actionable issues that are routed, labeled, and prioritized for the right team." (section 1.0 body)
- "Linear powers over 33,000 product teams. From ambitious startups to major enterprises." (social proof stat)

---

## 2. Section-by-section IA

Nine `<section>` elements in `main` (indexes 0–8). Screenshots referenced by file.

| # | Section | Purpose | Content | Layout |
|---|---------|---------|---------|--------|
| 0 | Spacer / full-bleed hero media | Visual opening | Empty per JSON (spacer or full-bleed hero media) | Full-bleed, no heading |
| 1 | Animated hero app demo | Show the product live | Empty heading per JSON — renders the animated React app UI (Linear workspace: Inbox/My issues/Reviews, "Faster app launch" issue, Activity feed, ENG-2703 detail pane, an in-app agent chat) | Full-bleed dark app screenshot/animation sitting below the H1. See `hero.png` (H1 + sub-line + "New / Coding Sessions →" pill above the demo) |
| 2 | "Make product operations self-driving" | Intake step (1.0) | Para: "Turn conversations and customer feedback into actionable issues that are routed, labeled, and prioritized for the right team." Number "1.0", label "Intake→". UI shows backlog / ENG issues / customer-request triage | Numbered chapter: eyebrow number + label, headline, body, large product UI panel. See `full.png` |
| 3 | "Define the product direction" | Plan step (2.0) | Para: "Plan and navigate from idea to launch. Align your team with product initiatives, strategic roadmaps, and clear, up-to-date PRDs." Number "2.0", label "Plan→". Roadmap timeline FEB–SEP (UI Refresh, Autonomy status clarity, etc.) | Numbered chapter + timeline/roadmap UI. See `full.png` |
| 4 | "Move work forward across teams and agents" | Build step (3.0) | Para: "Build and deploy AI agents that work alongside your team. Work on complex tasks together or delegate entire issues end-to-end." Number "3.0", label "Build→". AI agent (Codex) terminal output in kinetic-iOS repo | Numbered chapter + terminal/agent UI. See `full.png` |
| 5 | "Review PRs and agent output" | Diffs step (4.0) | Para: "Understand code changes at a glance with structural diffs for human and agent output. Review, discuss, and merge — all within Linear." Number "4.0", label "Diffs→". Structural diff of kinetic-ios HomeScreen.tsx (React Native) | Numbered chapter + side-by-side code diff (red/green). See `mid.png` (the diff panel directly above the "Understand progress at scale" headline) |
| 6 | "Understand progress at scale" | Monitor step (5.0) | Para: "Take the guesswork out of product development with project updates, analytics, and dashboards that surface what needs your attention." Plus AI-summary lines: "iOS implementation is mostly complete, but Android updates are still work in progress" / "Risk of timeline slip if remaining design decisions aren't finalized soon". Number "5.0", label "Monitor→". Issue-count chart, cycle time by agent (Cursor/Codex/No Agent), Weekly Pulse AI summary | Numbered chapter + charts/dashboard UI. See `mid.png` (headline + body two-column) and `full.png` |
| 7 | Social proof / testimonials | Trust | Three testimonials, "33,000 product teams" stat, customer-stories CTA | Quote blocks + logo/stat row. See `full.png` (lower third) |
| 8 | "Built for the future. Available today." | Final conversion | No body paras; CTA pair "Get started" + "Contact sales" | Centered closing CTA band. See `full.png` (bottom) |

There is also a "Changelog" H2 (between sections 7/8 region) anchoring a changelog callout, and a deep footer (Product / Features / Company / Resources / Connect / Legal columns).

The spine of the page is a **numbered five-step product narrative** (1.0 Intake → 2.0 Plan → 3.0 Build → 4.0 Diffs → 5.0 Monitor), each pairing a verb-label and a live product-UI panel.

---

## 3. Visual system

**Palette (rgb from JSON → hex):**
| Role | rgb (JSON) | hex |
|------|-----------|-----|
| Page background (body, footer) | rgb(8, 9, 10) | `#08090A` |
| Primary text | rgb(247, 248, 248) | `#F7F8F8` |
| Secondary / muted text | rgb(138, 143, 152) | `#8A8F98` |
| Header / section background | rgba(0,0,0,0) | transparent (inherits `#08090A`) |
| First button text | rgb(138, 143, 152) | `#8A8F98` |

Near-black base, near-white text, single grey for muted UI. Dark theme throughout — no white backgrounds. Accent colors (a yellow changelog card, red/green diff syntax, agent-status colors) appear inside product-UI screenshots rather than as chrome — visible in `full.png`/`mid.png` but not sampled into the JSON palette. [unverified — exact accent hex values not in artifacts]

**Type families + scale:**
- Single family across body/h1/p: `"Inter Variable", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, …, sans-serif`.
- H1: 64px, weight **510** (Inter Variable's variable weight — a tell of a custom/optical weight, not a static 500).
- Body: 16px / weight 400.
- Paragraph: 15px / weight 400.
- Monospace appears inside code/diff and terminal UI panels (`vehicle_state`, the HomeScreen.tsx diff) but no mono family is recorded in the JSON `fonts` sample. [unverified — mono family name]

**Density:** Marketing chrome is low-density and airy (generous vertical rhythm between numbered chapters); product-UI panels embedded in each section are high-density (full app screenshots with sidebars, activity feeds, charts). The contrast between airy marketing frame and dense product proof is itself the device.

**Grid:** Section headlines and body sit in a left-aligned column; the "Understand progress at scale" section (`mid.png`) reads as headline-left / body-right two-column. Product panels are wide, near-full-bleed cards centered in the content column.

**Depth / border treatment:** Flat, near-borderless. Separation comes from very subtle elevation of the dark product-UI cards against the `#08090A` base rather than visible strokes or shadows. The aesthetic is matte and quiet — depth implied by tonal steps in the near-black range. [unverified — exact card border/shadow tokens not sampled]

**Imagery style:** No video, no canvas (`videoCount: 0`, `canvasCount: 0`). 183 SVGs (icons, illustrations, charts), 32 `<img>` (logos, avatars). The dominant "imagery" is the product itself rendered as live React UI — workspace views, roadmaps, terminals, diffs, dashboards — not photography or abstract art.

---

## 4. Motion + implementation

**Animation library: Framer Motion (the `motion` package) — confirmed.** Evidence is the bundled chunk list in `animLibNetworkMatches`: `motion-CXpiJAgU.js`, `AnimatePresence-CqasCXuT.js`, `MotionConfigContext-C3TV7JGV.js`, `MotionConfig-BZeRC2_8.js`, `use-spring`, `use-in-view`, `use-transform`, `use-motion-value`, `use-motion-value-event`, `use-reduced-motion`, `animate-0STDKZZ5.js`, `ScrollAnimation-DRMoxTpN.js`, `DecryptionAnimation-D21Zgp9N.js`, `LayoutGroup-CeHl1XSd.js`, `Zoom-DAE5ZXev.js`. No GSAP, Lenis, THREE.js, or Lottie chunks detected. `animLibGlobals` is empty (Framer Motion does not expose a window global — consistent with bundled-module usage). Stack: Next.js (App Router), styled-components + StyleX, MobX, PostHog analytics.

Notable effects (inferred from chunk names + the React-UI hero):

- **Animated hero app demo** — the hero (`hero.png`) renders a live, self-playing Linear workspace (issue created, activity feed updating, agent chat) rather than a static image or video. *Built with:* Framer Motion driving React component state; `AnimatePresence` for enter/exit of feed items, `LayoutGroup` for shared-layout transitions. Trigger: autoplay on load. [build technique inferred from chunk names — not directly observed running]

- **Scroll-triggered section reveals** — the dedicated `ScrollAnimation-DRMoxTpN.js` chunk plus `use-in-view` indicate each numbered chapter's UI panel animates in as it scrolls into the viewport. Restraint: in-view–gated (fires once on entry), not a continuous parallax. *Built with:* `useInView` + `motion` components / `useTransform` on scroll progress.

- **Decryption / scramble text effect** — `DecryptionAnimation-D21Zgp9N.js` is a named chunk, implying a character-scramble-to-resolve text animation somewhere on the page (commonly a headline or stat). *Built with:* a custom Framer Motion component animating per-character glyph state. [unverified — exact element it's applied to not observable in static screenshots]

- **Zoom transition** — `Zoom-DAE5ZXev.js` suggests a scale/zoom transition on a media or panel element. [unverified — target element]

- **Spring physics** — `use-spring` indicates spring-based easing (not linear/CSS-cubic) on at least some transitions, giving the characteristic soft, weighted Linear feel.

- **Reduced-motion respect** — `use-reduced-motion-CRyw8Vo4.js` is bundled, so animations are gated on `prefers-reduced-motion`. Verified-by-evidence (chunk present).

---

## 5. Proof mechanics

- **Headline stat (verbatim):** "Linear powers over 33,000 product teams. From ambitious startups to major enterprises."
- **Named logos detected:** Cursor, GitHub Copilot, Codex (`logosDetected`). These read as AI-coding-tool integrations/peers rather than a generic customer-logo wall.
- **Testimonials — named, with full attribution (not anonymized):**
  - "You'll probably build a better product, just because of the craft that using Linear infuses on your brain." — Gabriel Peal, Staff Software Engineer, OpenAI
  - "Our speed is intense and Linear helps us be action biased." — Nik Koblov, Head of Engineering, Ramp
  - "Linear is excellent, just excellent. It has the right opinions for fast moving teams." — (third blockquote; attribution not captured in JSON)
- **Quote format:** Plain blockquote + "Name, Title, Company" line. Recognizable-company strategy (OpenAI, Ramp). No star ratings or badge graphics recorded.
- **Card structure:** Proof lives in section 7 as quote blocks + a stat line + customer-stories CTA; the strongest "proof" elsewhere is the live product UI embedded in each numbered chapter (showing real-looking issues, diffs, dashboards).

---

## 6. Conversion

| CTA label | Placement | Destination |
|-----------|-----------|-------------|
| Sign up | Top nav (right) + repeated | `/signup` |
| Log in / Open app | Top nav | `/login` |
| New · Coding Sessions → | Hero, above the demo (announcement pill) | `/coding-sessions` (footer link target) |
| Get started | Final CTA section 8 ("Built for the future. Available today.") | `/signup` |
| Contact sales | Final CTA section 8 | `/contact/sales` |
| Contact / Contact us | Nav + footer | `/contact` |
| Customer Requests | Footer/product links | `/customer-requests` |
| Startups | Footer/links | `/startups` |

Primary conversion is **"Sign up" / "Get started" → `/signup`** (self-serve), with **"Contact sales" → `/contact/sales`** as the enterprise path. The closing band pairs the two (self-serve + sales) under one headline. No single-CTA discipline — multiple asks, but cleanly tiered self-serve vs. sales.

---

## 7. Responsive (mobile.png)

- **Nav collapses** to logo + "Log in" + "Sign up" pill + a hamburger (the desktop "Customers/Resources/Customers/Pricing/Now/Contact" row is hidden behind the menu).
- **H1 reflows** from two lines to four lines, still left-aligned, large display size held (does not shrink to a small mobile heading — the type stays bold and dominant).
- **Sub-line and the "New · Coding Sessions →" pill** stack directly under the H1, left-aligned.
- **Hero product-UI demo** sits below the fold, rendered at near-full device width with the same sidebar + activity feed layout, slightly clipped on the right edge (horizontal panel preserved, not reflowed into a single column) — the dense app screenshot is shown as-is rather than re-laid-out for mobile.
- Overall: single-column stack, left alignment retained, generous top padding. The marketing frame adapts; the embedded product UI is presented as a wide scrollable/clipped artifact.

---

## 8. Confidence

**Verified in browser / directly in artifacts:**
- All copy, headings, CTA labels, nav/footer links, testimonials, and the 33,000 stat — verbatim from `references/raw/linear.json`.
- Palette hexes — converted from the rgb values sampled in JSON (`#08090A`, `#F7F8F8`, `#8A8F98`).
- Type family, H1 64px/510, body 16px/400, p 15px/400 — from JSON `fonts`.
- Imagery counts (0 video, 0 canvas, 183 SVG, 32 img) — from JSON `imagery`.
- **Animation = Framer Motion** — confirmed via the bundled chunk list (`motion`, `AnimatePresence`, `use-spring`, `use-in-view`, `ScrollAnimation`, `use-reduced-motion`, etc.). High confidence.
- Tech stack (Next.js, styled-components + StyleX, MobX, PostHog) — from JSON `techStack`.
- Section IA, numbered 1.0–5.0 spine, and mobile behavior — corroborated by `hero.png`, `mid.png`, `full.png`, `mobile.png`.

**Load-bearing [unverified] claims (minimized):**
1. The specific DOM/CSS elements that the `DecryptionAnimation` and `Zoom` chunks animate (named in JSON, but their on-page targets are not observable in static screenshots).

**Non-load-bearing flags:** exact accent hexes (yellow/red-green/status colors live inside product-UI screenshots, not in the sampled palette); mono font family name; exact card border/shadow tokens. These do not change the read of the visual system (matte near-black, single-family Inter, quiet borderless depth).

**Discrepancy noted (not load-bearing):** the hero sub-line shown in screenshots ("…Designed for the AI era.") differs from the JSON-stored marketing subhead H2; the H2 is treated as canonical per the JSON note, and the discrepancy is flagged rather than resolved.
