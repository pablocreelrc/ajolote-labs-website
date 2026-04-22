# v4.2 — DENSE × CINEMATIC INTERVALS

A redesign variant of the Ajolote Labs marketing site that **alternates v4's dashboard density with v2's cinematic typographic drama**. Two full-bleed "breath slabs" sit between dense panel sections, and the hero + CTA are hybrids — cinematic billboard moments plus working dashboard surfaces.

## Rhythm

1. **Hero (hybrid)** — Cinematic billboard H1 above, v4 command-center console below.
2. **Breath slab #1** — Full-bleed "We diagnose, build, and deploy."
3. **Services (dense)** — v4 pipeline with `stg_01 → stg_03`, cinematic header.
4. **Breath slab #2** — Full-bleed "From day one to full automation."
5. **Cases (dense)** — v4 panel cards with ticker IDs, cinematic header.
6. **CTA (hybrid)** — Cinematic "Get your operations blueprint." above v4 terminal prompt + `included.checks` sidebar.

All copy is reused verbatim from the original site — breath slabs pull existing subtitles.

## Stack

Vanilla HTML / CSS / JS. No framework. Fonts preloaded from Fontshare (Satoshi, General Sans) and Google Fonts (JetBrains Mono).

## Files

```
v4-2-cinematic-intervals/
├── index.html         — hero + 2 breath slabs + services + cases + hybrid CTA
├── css/style.css      — tokens, dashboard primitives, breath slab cinematography
├── js/main.js         — v4 counters/stream/cases + v2 word-cascade + parallax
├── data/cases.json    — 4 case studies (verbatim)
├── DIRECTION.md       — rhythm logic, copy map, motion inventory
└── README.md
```

## Motion

**v4 (dense) motion preserved:**
- Counter tick-up (0 → target, easeOutCubic)
- Metric bar fills on viewport entry
- Log stream ticks every ~3.2s in hero rail
- Status pill green pulse
- Terminal cursor blink
- Scroll-spy nav active state
- `reveal` slide-up on scroll

**v2 (cinematic) motion added — scoped to breath slabs + cinematic headers only:**
- Word-cascade: each word translates from `translateY(110%)` → `0`, 60ms stagger, 0.8s duration
- Scroll-linked parallax on breath-slab text (0.12 depth)
- Scroll-linked gradient sweep on accent words (cyan → amber)

`prefers-reduced-motion: reduce` disables every animation above and snaps everything to final state.

## Accessibility

- Skip link, landmarks, `aria-live` on counters, `aria-hidden` on decorative streams and parallax layers.
- Focus rings: 2px cyan, 3px offset. Tab order preserved.
- Mobile tap targets ≥44×44, custom cyan tap-highlight.
- Safe-area insets for notched devices.
- Responsive 320–1920px. Breath slabs keep display type large on mobile via `clamp(2.6rem, 13–14vw, ...)`.

## CTAs

All six CTAs route to `https://calendly.com/hello-ajolotelabs`. LinkedIn in footer: `https://www.linkedin.com/in/pablocreel/`.

## Preview locally

```
cd redesigns/v4-2-cinematic-intervals
python -m http.server 8080
# then open http://localhost:8080
```

The `data/cases.json` fetch requires serving over http (not file://).
