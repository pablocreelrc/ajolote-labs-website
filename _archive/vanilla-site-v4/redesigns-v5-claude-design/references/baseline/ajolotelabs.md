# ajolotelabs.ai — BASELINE Design Teardown (own current live site)

Source: https://ajolotelabs.ai/ · Captured 2026-06-23 · Title: "Ajolote Labs: AI brain and AI employees for your company"
Ground-truth artifacts: `references/raw/ajolotelabs.json`, `references/captures/ajolotelabs/{hero,services,cases,full,mobile}.png`
**Same 8-point template as the 17 competitor teardowns — this is the apples-to-apples baseline for Stage 2.**

> ⚠ This is the **live deployed (committed)** site. The handoff flags **uncommitted local edits** to `index.html` + `data/cases.json` (different kicker/card copy) that are NOT deployed and NOT captured here — a separate keep/revert/cherry-pick decision.

## Verbatim copy

**Meta description:** "We build the brain that unifies your stack, the AI employees who run on it, and train your team to manage them."

**Hero kicker:** `SEC_00 · FORWARD-DEPLOYED ENGINEERS · NEXT.DEPLOY = YOU`
**Hero H1:**
> Stop losing money to manual operations.   *(word "manual" set in cyan)*

**Hero subhead:**
> On the first call we map what you run. Then we embed engineers who build the AI that runs it — and we stay to keep building.

**Hero deliverable card** (`YOUR OPERATIONS · AFTER WE SHIP` / `FINAL STATE`):
- **one brain** — every system you run · unified · queryable · audited
- **multi-LLM** — frontier models for reasoning · open source to optimize token cost · routed by task
- **agents** — scoped · audited · replaceable · never a black box
- **tools + MCPs** — into the systems you already pay for · no rip-and-replace
- footer: *when we leave: the code is yours · the data is yours · the system runs*

**Section headlines (document order):** H1 "Stop losing money to manual operations." · H2 "We embed. We build. We support it." · H3 The Brain / AI Employees / Power Users · H2 "Real results from real operations." · H3 Cross-Border Spirits / Loyalty Platform.

**CTA / nav labels (verbatim):** Nav — `01 SERVICES` · `02 CASES` · `03 CONTACT` · `BOOK CALL →`. Hero — `BOOK A DISCOVERY CALL →` · `SEE HOW WE WORK →`. Footer — How we work · Case studies · Contact · `BOOK A DISCOVERY CALL →` · Email us.

## Section-by-section IA

1. **Hero** (`hero.png`, `#hero.hero`) — **diptych**. Left: mono kicker, huge Satoshi-900 H1 (cyan accent on "manual"), subhead, two CTAs (cyan primary "BOOK A DISCOVERY CALL", ghost "SEE HOW WE WORK"). Right: a bordered dark **deliverable card** ("YOUR OPERATIONS · AFTER WE SHIP / FINAL STATE") listing the 4 layers (one brain / multi-LLM / agents / tools + MCPs) with the ownership footer line. One viewport, scroll-snap.
2. **Services / How we work** (`services.png`, `#services`) — kicker `SEC_01 · HOW_WE_WORK · LAYERS · 03 · RUNNING`, H2 "We embed. We build. We support it.", then **3 stacked layer rows**: stg_01 The Brain · stg_02 AI Employees · stg_03 Power Users — each with body copy, 3 feature bullets, and a `LAYER 0n/03 · OUTPUT …` mono label. Reveal-gated.
3. **Cases** (`cases.png`, `#cases`) — kicker `SEC_02 · CASE_STUDIES · LIVE`, H2 "Real results from real operations." (cyan-gradient "operations."), subhead, then **2 panel cards**: CASE_01 Cross-Border Spirits (TRADE & DISTRIBUTION) and CASE_02 Loyalty Platform (ENTERPRISE B2B), each with description + 3 count-up metric cells. Cyan top border-beam on cards.
4. **Footer** — ownership line "when we leave: the code is yours · the data is yours · the system runs"; nav repeat + mailto + Calendly CTA.

## Visual system

- **Palette:** background **#09090B** (near-black); body text **#E6F4F7** (pale cyan-white); single accent **#00E5FF** (cyan) on H1 keyword, metric numerals, primary button, card border-beams; panels **#0A1A24**; borders **#15303A**. Primary button = solid cyan **#00E5FF** with near-black **#001318** text. **Dark theme, single-accent** — disciplined.
- **Type:** display **Satoshi** (H1 weight 900, ~83px desktop); body **General Sans** (15–18px / 400); **JetBrains Mono** for the `SEC_xx` kickers and `LAYER/OUTPUT` labels (the "instrument/terminal" texture). Strong display↔body↔mono contrast.
- **Density / grid:** medium; hero is a 2-column diptych, services is a vertical layer stack, cases is a 2-up card grid. Generous viewport-per-section rhythm from scroll-snap.
- **Depth / border:** flat dark with thin **#15303A** hairline borders + cyan border-beams on cards/panels; no shadows-heavy material. "Console/telemetry" aesthetic.
- **Imagery:** essentially **no photography or video** (2 imgs, 1 svg, 0 video/canvas) — the whole site is typographic + paneled UI. This is the deliberate differentiator vs. video-heavy peers (Palantir/Anduril/HappyRobot/Tomoro).

## Motion + implementation

- **Animation library: none** (verified — empty `window` anim globals; only first-party script is `/js/main.js?v=hero-c3-mobile-5`).
- **Mechanism:** native **CSS transitions** + **IntersectionObserver** scroll-reveals (sections/cards fade-rise as they enter), **count-up** metric numerals (`data-counter`), **bar-fill** animations (`data-fill`), cascade word-reveal on headings, and **scroll-snap** pagination. All framework-agnostic vanilla JS — matches the repo's documented `main.js` behaviors.
- **Restraint:** motion is reveal-on-scroll + count-up only; no scroll-scrubbing or canvas. Consistent with the Lighthouse-100 / no-dependency posture.

## Proof mechanics

- **2 anonymized case cards**, no client logos (per positioning stake): Cross-Border Spirits — **$500K+ revenue unlocked · 3 AI agents · 30 automations**; Loyalty Platform — **46 automations · 40 hours saved/mo · 3 AI agents**.
- Metric device = big cyan numeral + mono uppercase label inside a bordered panel.
- **Gap vs. peers:** only **2** proof points, no sector-breadth line (contrast Distyl's "telecom, healthcare, manufacturing…" + one big number), no testimonial/quote, no logo wall (intentional). Metrics are placeholders per the handoff — **need defensible real figures before anything ships.**

## Conversion

- **Single repeated ask:** every conversion CTA → `calendly.com/hello-ajolotelabs` ("BOOK A DISCOVERY CALL →" in hero + footer; "BOOK CALL →" in nav; "03 CONTACT"). Secondary in-page jump "SEE HOW WE WORK →" → #services. Footer also exposes `mailto:hello@ajolotelabs.ai`.
- One conversion ask per section; clean and consistent with the marketing-site guardrail.

## Responsive

- `mobile.png` (390px): diptych collapses to single column (H1 → subhead → CTAs → deliverable card stacks below); scroll-snap retained per section on mobile (per spec). Satoshi/General Sans/mono and the cyan-on-dark system hold. No overflow observed at 390px.

## Confidence

- **Verified-in-browser:** title/meta, all hero+services+cases copy (verbatim, incl. the deliverable-card rows and both case cards' metrics), nav + CTA labels and Calendly destinations, palette (CSS custom-property values read directly), font families/sizes, section structure, animation-library absence, asset URLs, media counts. Screenshots confirm reveal content renders (not blank).
- **`[unverified]` (minor):** JetBrains Mono attribution for kicker/labels (inferred from mono rendering — repo uses it per CLAUDE.md, verify in CSS); exact mobile stacking of the services layer rows below the fold.

---

## Baseline read (observation, not Stage-2 judgment)
Where this site already *wins* vs. the captured field: it's one of the few **genuinely dark, abstract-telemetry** sites (most operator-peers are light; the dark ones lean on video it doesn't use) — a real differentiator. Where it's **thin** relative to peers: only 2 proof points with no sector-breadth/testimonial band; no explicit "we operate it forever / maintain" story beyond the footer line (the wedge the openai-anthropic-fde notes called the strongest); placeholder metrics. *These are inputs for Stage 2 — not decisions.*
