# UX/UI Synthesis — Fusing the 5 Anchor Sites for Ajolote Labs

Goal: ground a dark, terminal/instrument-panel, vanilla-HTML/CSS/JS marketing site for an AI-infrastructure-operator (FDE firm) in evidence, not adjectives. Two sites (Palantir, Anduril) are JS-rendered and resisted direct fetch — their rows lean on secondary sources and are marked accordingly. Sierra, Linear, Ramp(partly) are directly observed.

## (a) Comparison table

| Site | Hero pattern | Section / scroll model | Proof pattern | Density | Signature motion |
|---|---|---|---|---|---|
| **Palantir** | Full-bleed dark **video stage**, short institutional sentence [confirmed: full-screen product videos] | Chaptered full-bleed product stages (AIP/Gotham/Foundry/Apollo) [unverified scroll mechanic] | Gravitas of copy + gov/enterprise weight; few visible metrics [unverified] | Dense, typography-driven, #000/#FFF | Looping product footage; UI motion restrained |
| **Anduril** | Cinematic full-bleed **practical photo/video** of real systems + operator story [confirmed philosophy] | **Linear scroll narrative**, stacked chapters, progressive disclosure [confirmed pattern] | Realism = proof: real hardware/operators, sanitized UI flows; no logo walls | Sparse-editorial, image-led | Cinematic video; reveal-on-scroll chapters |
| **Sierra** | **Centered, stacked, text-first** headline + single CTA; static-first | 9 sections, whitespace-separated; sticky nav | **Proof ladder: logo wall → quote cards → compliance badges** (SOC2/ISO/HIPAA/FedRAMP) | Moderate-spacious | Restrained; few micro-interactions |
| **Ramp** | Product-tactility hero, premium render + headline [unverified split] | Modular Webflow stacked sections, animation as a layer | **Big-number metric cards** (70k+, 27M hrs, 75% faster) + logos + customer page | Data-dense, financial-grade | Polished reveal-on-scroll micro-interactions |
| **Linear** | **Stacked repeated headline** at varying scales + arrow CTA; 3 depth-layered product screenshots | **5 numbered workflow chapters (1.0–5.0)**, guided-tour scroll | 3 testimonial quote cards (OpenAI/Ramp/Opendoor) + one stat line; sparse/high-signal | Editorial-calm, airy | **Reveal-on-scroll** of cards/avatars — precise, never flashy |

## (b) 6–8 strongest patterns to fuse — with vanilla HTML/CSS/JS implementation

1. **Full-bleed dark hero "stage" with one declarative sentence** (Palantir + Anduril). Implement: a `100vh` section, `background:#0a1a24`; an abstract animated layer (canvas or CSS — scanning telemetry lines / particle mesh, *not* video) absolutely positioned; one short H1 in large sans + a mono kicker label above it. CTA single, below.

2. **Numbered workflow chapters as the scroll spine** (Linear 1.0–5.0 + Anduril progressive disclosure). Map to Ajolote's engagement stages (Discovery → Node → Agents → Outward MCP → Maintain). Implement: 5 full-width `<section>`s, each `min-height:100vh`, with a mono `01 / 05` index label, headline, subtext, and a visual panel. Use `position:sticky` index labels per chapter for orientation.

3. **Reveal-on-scroll for chapter content** (Linear). Implement: `IntersectionObserver` toggling an `.in-view` class; CSS `transform:translateY(16px); opacity:0` → `0/1` with a 400–600ms ease. Stagger children with `transition-delay`. Respect `prefers-reduced-motion`.

4. **Big-number metric cards as the proof spine** (Ramp). Implement: a CSS grid of dark cards (`#0e2230`, cyan top-border), each a large mono number + small caption. Add an `IntersectionObserver`-triggered **count-up** (`requestAnimationFrame` lerp) — fires once. Use *anonymized* outcome metrics ("3 client nodes live", "X hours of ops automated").

5. **Stacked trust/compliance badge row** (Sierra). Implement: a horizontal flex strip of monochrome SVG/text badges — LFPDPPP, consent+audit, SOC-style posture. Critical for an infra firm; replaces named-logo wall Ajolote can't show.

6. **Anonymized "operator-POV" case cards** (Anduril realism, anonymized). Implement: dark case cards (problem → node/agents built → result), cyan accent on hover (`border-color`/glow transition), no client names — "A Mexico City clinic", "A spirits distributor". Sanitized UI-flow thumbnail in instrument-panel style.

7. **Persistent slim sticky nav, dark** (all five). Implement: `position:sticky; top:0`, translucent dark bg with `backdrop-filter:blur`, mono wordmark left, 3–4 links, one cyan CTA right → all CTAs to `calendly.com/hello-ajolotelabs`.

8. **Typographic restraint / editorial calm** (Linear + Palantir). Implement: Satoshi sans for headlines/body, a mono face for labels/numbers/kickers; large hero scale, generous `line-height` and section padding (`clamp()`); strict 2-color accent discipline (cyan on dark).

## (c) 3–5 patterns to avoid

- **Named-customer logo walls** (Sierra/Ramp) — Ajolote anonymizes cases. Use anonymized cards + compliance badges instead.
- **Real product/hardware video & literal product renders** (Anduril/Ramp/Palantir) — no shippable footage, sells infrastructure not a device. Use abstract telemetry motion.
- **Light/airy or white backgrounds & white cards** (Sierra/Ramp/Linear) — hard violation of Ajolote's dark-everywhere rule.
- **Showy/heavy scroll choreography** (pinned parallax overload) — breaks editorial calm and is costly in vanilla JS; keep a tight motion budget.
- **Founder/team/about-Pablo surfaces** — none of these inspire it for Ajolote, and it's a permanent positioning stake. Omit.

## (d) Recommended UX/UI design direction (build-ready)

**Concept: "The Instrument Panel" — a dark, chaptered operator console that narrates an engagement.**

- **Hero (100vh):** Full-bleed `#0a1a24`. A subtle animated canvas layer — slow-scanning horizontal telemetry/grid lines + faint particle mesh (cyan, low opacity). Mono kicker label ("AGENT INFRASTRUCTURE OPERATOR"), one large sans H1 (institutional, Palantir-register), one-line subhead, single cyan CTA → Calendly. On load: H1 fades up 500ms; canvas begins immediately. No video.
- **Section flow (Linear-numbered, Anduril-narrative):** Sticky slim nav. Then 5 numbered full-width chapters mapping the engagement playbook (01 Discovery → 05 Maintain), each with mono index, headline, subtext, and an instrument-panel visual (CSS/SVG dashboard mock, not client UI). Each chapter reveals on scroll.
- **Proof treatment (Ramp + Sierra fused):** A "Signals" band of 3–4 big-number metric cards (count-up on view, anonymized outcomes), followed by 2–3 anonymized operator-POV case cards (hover-glow), then a compliance/trust badge strip (LFPDPPP, consent+audit). No client names anywhere.
- **Close:** Restated thesis sentence + final cyan CTA → Calendly.
- **Motion budget (deliberately tight):** (1) hero canvas ambient loop; (2) IntersectionObserver reveal-on-scroll, staggered, 400–600ms; (3) one-time metric count-up; (4) hover transitions on cards/CTAs. Nothing pinned/parallaxed. Honor `prefers-reduced-motion` — disable canvas + reveals, show static.
- **Type & density:** Satoshi sans + a mono for labels/numbers; editorial-calm spacing (Linear) carrying institutional weight (Palantir); strict cyan-on-dark accent discipline. Result: terminal gravitas without dashboard clutter.

---

## (e) PHASE-A VERIFICATION — directly observed 2026-06-23 (supersedes [unverified] rows above)

Screenshots saved under `captures/` (not committed — third-party IP).

| Site | Was inferred | VERIFIED reality |
|---|---|---|
| **Palantir** | "full-bleed video, unverified scroll/proof" | **CONFIRMED.** Full-bleed documentary **video** hero (real workers in a tunnel), **centered** short headline "AI-Powered Automation for Every Decision", minimal nav, single **"Get Started"** CTA, top announcement bar. Sections = Latest News / Offerings / **Latest Impact** (documentary case stories, e.g. "Rebuilding American Sea Power"). **6 videos**, zero metric walls. Proof = gravitas + impact stories. |
| **Anduril** | "cinematic hero, linear scroll [unverified]" | **CONFIRMED.** Full-bleed cinematic **video** hero (moody shallow-DOF hardware), **no headline overlay** (pure footage), nav by **product domain** (Sea/Land/Air/Space/Lattice/Arsenal-1). Card sections below. Proof = product realism; no metrics. |
| **Ramp** | "dark; left headline + right product render [unverified]" | **CORRECTED.** Ramp is **LIGHT** (cream/white), headline **left-aligned** with product render **centered below** (not a right-split). Proof = **LIVE ticking counters**: a hero stat ("US corporate payments processed by Ramp: 0.75034…%") + a bottom **"AGENTS AT WORK TODAY"** strip (accounting fields coded · agent interactions · expenses reviewed · spend allocated · invoices processed). Lime-yellow accent CTA. |
| **Distyl** | "the dark institutional twin; anonymized metrics-only proof wall" | **CORRECTED.** Distyl is **LIGHT/cream, serif** (navy on cream) — NOT dark. Hero: "Architecting the AI-Native Enterprise" + "**forward-deploying our teams of engineers… who own the outcome**" (positioning twin ✓). Proof = a **3-column band**, NOT a metrics wall: ①"150M+ end users reached" (one headline metric) ②"**Trusted by Fortune 500s** / leaders across telecom, healthcare, manufacturing, insurance, retail" (**anonymized by SECTOR, zero named logos**) ③"Measurable outcomes in weeks". Then a "Recent Media" (WEF) thought-leadership row. |

### What changed for Ajolote's design

1. **Dark IS the differentiator — confirmed.** Of the 5 anchors, only Palantir & Anduril are dark, and both rely on **documentary video** Ajolote can't shoot. Ramp & Distyl are **light**. So Ajolote's dark + *abstract telemetry* (no video) is a genuinely distinct lane — lean in.
2. **Anonymized proof is proven viable (Distyl).** "Trusted by Fortune 500s · leaders across [sectors]" carries credibility with **no client names**. Ajolote analog: "Operators across spirits, healthcare, and loyalty" + ONE headline metric. This is the no-logos answer.
3. **Live counters are the strongest proof device (Ramp).** But Ajolote has no live backend — the honest version is **count-up-on-view (one-time)**, not a fake live ticker. Use the big-number treatment, not the live claim.
4. **Avoid time-to-impact claims.** Both Distyl ("outcomes in weeks") and the FDE labs lean on speed. Ajolote's invariant forbids estimating time to the client — substitute continuity/operate language instead.
5. **Hero headline placement:** Palantir centers it over video; Ramp left-aligns over light. For a dark abstract-telemetry hero, left-aligned (Ramp structure, Palantir register) reads strongest and matches the current site's diptych instinct.
