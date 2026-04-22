# v4.2 — DENSE × CINEMATIC INTERVALS

**Thesis.** v4's dashboard aesthetic proves technical credibility. v2's oversized cinematic typography proves editorial confidence. v4.2 alternates them — dense instrument panels punctuated by full-bleed typographic "breath slabs" that let the eye release before plunging back into the data. The rhythm is: **headline billboard → instrument panel → breath → instrument panel → breath → cinematic CTA**. Contrast is the hook.

## The rhythm score

| # | Section | Mode | Purpose |
|---|---|---|---|
| 01 | Hero (hybrid) | **Cinematic H1 above · Dense console below** | Promise over product. The headline is a billboard; the console below is the proof. |
| 02 | Breath slab #1 | **Cinematic full-bleed** | "We diagnose, build, and deploy." — release before services pipeline. |
| 03 | Services (dense) | **Dense panels · Cinematic header** | Big Satoshi "How We Work" display → mono subhead → `stg_01 → stg_02 → stg_03` pipeline. |
| 04 | Breath slab #2 | **Cinematic full-bleed** | "From day one to full automation." — release before the case study grid. |
| 05 | Cases (dense) | **Dense panels · Cinematic header** | Massive "Real results from real operations." → ticker cards with metric grids. |
| 06 | CTA (hybrid) | **Cinematic header half · Dense terminal + sidebar half** | The breath happens *at* the CTA — oversized "READY TO AUTOMATE?" fills the upper zone; terminal prompt + `included.checks` sidebar fill the lower. |

That's two full-bleed breath slabs between sections (#02, #04) plus the cinematic CTA opening (#06) — three total cinematic releases weaving through four dense surfaces.

## Breath slab copy (reused verbatim, no rewrites)

- **Slab #1 — between Hero and Services.** Uses the services section title: *"We diagnose, build, and deploy."*
- **Slab #2 — between Services and Cases.** Uses the cases section subtitle: *"From day one to full automation."*
- **CTA cinematic header.** Uses the CTA section title: *"Get your operations blueprint."* — rendered at display-1 scale, filling the upper half.

No breath slab invents copy. Every word already lives in the original site or v4's dashboard.

## Visual language of the breath slabs

Breath slabs are **everything the dense panels are not**: no 1px borders, no panels, no metrics, no status pills, no monospace grout. Just a full-bleed dark surface (`--bg-deep`) with one enormous line of Satoshi Black. Optional small mono moment-label at the top-left (`— 01 / INTERVAL` style), optional coord-glyph at the top-right, then the oversized type centered vertically at ~50vh.

- Satoshi 900, `clamp(3rem, 11vw, 8.5rem)` — larger than any v4 header, on par with v2's `display-1`.
- One accent word per slab uses the cyan gradient wash (v2's marquee-word treatment).
- Optional warm amber tint in the slab's radial wash only (never in the dense panels) — punctuation, not decoration.
- Scroll-linked parallax on the text: `translateY` up to -80px tied to slab progress through viewport, 0.1 depth.
- Word-cascade reveal: each word wrapped in a clip-overflow line, rising from 110% translateY, stagger 80ms per word.

## Dense surfaces inherit v4 verbatim

- Hero console: 10px command bar with traffic-light dots, path breadcrumb, live status pill, 12-col grid with left main + right rail live log stream.
- Services: `stg_01 → stg_03` pipeline with cyan connector nodes between stages on desktop.
- Cases: panel cards with `CASE_01` tickers, status pills, metric grids, dashed pill rows.
- CTA terminal: `ajolote@labs:~$ ready-to-automate` with blinking cursor.
- All counters tick from 0, bars fill on scroll, status pills pulse, log stream ticks every ~3.2s.

## Hero is the only true hybrid

The hero frame keeps v4's command-center console, but the H1 is **lifted out of the console and rendered above it** — billboard-scale Satoshi at `clamp(3rem, 7vw, 6.5rem)`, treated as the cinematic promise that hovers over the working product below. The v4 console then contains tag + sub + punch + actions + metric cells + rail log, but not the H1.

Why: v4's hero put the headline inside the panel and the result felt like a dashboard screenshot. Splitting them declares the ordering: **promise first, proof second**. Same content, just re-choreographed.

## Typography balance

- **Satoshi 900** — every cinematic display (hero H1, breath slab lines, section headers, CTA title). 3–8.5rem.
- **JetBrains Mono** — all panel scaffolding, tickers, IDs, status pills, metric labels, log stream, coords, breadcrumbs. 10–12px, `.08–.14em` tracking, uppercase.
- **General Sans** — body prose, metric values, CTA description.

Mono is the grout of the dense surfaces. Satoshi is the statement that punctuates them. General Sans only speaks inside paragraphs.

## Color + accent rules

- `--bg #0a1419`, `--bg-deep #070f13`, `--panel #0d1a21` — unchanged from v4.
- `--cyan #00e5ff` — primary accent, focus ring, H1 em, connector nodes, pill active state.
- `--ok #00d97e` / `--warn #f5a623` / `--err #e5484d` — status only, inside pills and log stream.
- **`--amber #f5a623` at `.18` opacity** — appears *only* in breath slab radial washes. Never on dense panels. This is the one visual permission the breath slabs get that the dashboard doesn't.
- Breath slab gradient word: `linear-gradient(110deg, var(--cyan) 0%, #6ff1ff 40%, var(--amber) 80%)` — cyan → warm tail. Scroll-linked `background-position` shift from 0% → 100% as the slab passes through the viewport (same trick as v2's `marquee-word`).

## Motion inventory

**Inherited from v4 (all preserved):**
- Counter tick-up (easeOutCubic, 1.6s, `aria-live=polite`)
- Metric bar fill on viewport-enter
- Log stream line-by-line typing in hero rail
- Status pill green-dot pulse
- Terminal cursor blink
- Section/element reveal on scroll (`translateY(8px) + opacity` stagger)
- Scroll-spy nav active state

**Inherited from v2 (breath slabs only):**
- Word-cascade reveal: each word has `overflow: hidden` parent, translates from `translateY(110%)` → `0`, 80ms stagger, 0.8s duration, easeOut.
- Scroll-linked parallax on slab text (0.1 depth, up to ~80px range).
- Scroll-linked gradient shift on the slab's accent word.

**Reduced-motion mode kills all of the above** and snaps to final state — including v4's counters/bars/pulses and v2's cascade/parallax/gradient. Nothing animates; everything is legible.

## Panel component language unchanged

Every dense panel remains: `[header bar: ID + TITLE + STATUS PILL] → [body] → [metadata row]`. Hover raises border to `--border-hot`. Focus rings are 2px cyan offset 3px. Mobile collapses the 12-col scaffold to single column; metadata rows keep their mono voice.

## Mobile rules

- Breath slabs MUST still feel cinematic at 375px. `clamp(2.8rem, 12vw, 8.5rem)` keeps the minimum at ~45px line-height at the smallest viewport.
- Hero splits into single-column: H1 billboard stacks above the console; console stacks main-above-rail.
- Services pipeline collapses to vertical; connector nodes hide below 900px (the cyan dot arrows are decorative on desktop only).
- Cases grid goes single-column; case metric grid stays 3-up but wraps to 2+1 under 375px.
- CTA stacks cinematic header above terminal above sidebar.
- Tap targets 44×44, custom cyan tap-highlight.

## Accessibility

- Skip link, landmarks, `aria-live` on counters, `aria-hidden` on all decorative motion, `aria-controls` on burger, focus-visible everywhere.
- Word cascades use `aria-hidden` on the `.word` wrappers? **No** — the h1/h2 text stays readable by AT because we split words inline without hiding them; only the clip-overflow parent hides them visually pre-reveal. Non-JS / reduced-motion paths show words at final state.
- LinkedIn footer: `https://www.linkedin.com/in/pablocreel/`.
- All CTAs route to `calendly.com/hello-ajolotelabs`.

## Tier coverage

- **α** — skip link, landmarks, focus rings, reduced motion full kill, safe-area, tap-highlight, 44×44, 320–1920 responsive.
- **β** — v4's counters + stream + pulses + spy + mobile menu + smooth scroll; v2's cascade + parallax + gradient shift on breath slabs.
- **γ** — the rhythmic alternation itself. Dashboard cinematography. No other variant does this.
- **δ** — 12-col dashboard scaffold × two full-bleed breath slabs × hybrid hero × hybrid CTA. Six section types, four modes (dense, cinematic, hybrid hero, hybrid CTA).
