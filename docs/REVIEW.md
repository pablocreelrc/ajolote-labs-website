# First-run review checklist

Drive the desktop pass, then the mobile pass. Mark `[x]` pass / `[!]` needs work / add a note.
See `ARCHITECTURE.md` for what each knob does. `npm run dev` → http://localhost:3000.

## Global
| Check | Desktop | Mobile | Note |
|---|---|---|---|
| Preload timer feel (boot reads, not a flash; ~3s) | [ ] | [ ] | tune `BOOT_MS` |
| Boot → background transition smooth (no z-flip flash) | [ ] | [ ] | |
| Brain after boot (live desktop / poster mobile) | [ ] | [ ] | |
| Nav: links + Book-call (desktop) / hamburger opens+closes, links work (mobile) | [ ] | [ ] | |
| Scroll-snap (desktop) vs free-scroll (mobile) | [ ] | [ ] | |
| Footer links correct | [ ] | [ ] | |
| Console clean (no errors / 4xx) | [ ] | [ ] | |
| Reduced-motion: short boot, no animation | [ ] | [ ] | OS setting / emulate |

## Per section
For each: **layout** correct · **mobile reflow** matches the doc · **copy** right · **CTAs/hrefs** work · **brain opacity** reads right · **motion/reveal** fires.

### SEC_00 — Hero (brain 0.25)
- Desktop: diptych (headline+cascade | deliverable card w/ border-beam). [ ]
- Mobile (<768px): stacks to 1 col, card below text. [ ]
- CTAs: "Book a discovery call" (CAL) · "See how we work" (#platform). [ ]

### SEC_01 — Thesis (brain 0.12)
- Centered slab headline + 1 body line; dim brain breath. [ ]  Mobile: fluid, no reflow. [ ]

### SEC_02 — Platform (brain 0.40 — brightest)
- Desktop: 3 text blocks | brain-center diagram (4 nodes + SVG lines), staggered build. [ ]
- Mobile (<900px): diagram → 2×2 grid, SVG hidden, brain node full-width on top. [ ]

### SEC_03 — Ownership (brain 0.12)
- Centered slab + 1 body line (mirrors Thesis). [ ]

### SEC_04 — Cases (brain 0.18)
- Desktop: 2 cards side by side, metrics count up. [ ]  Mobile (<768px): 1 col. [ ]
- ⚠ Metrics are placeholders ($500K+/3/30, 40/46/3) — confirm or replace. [ ]

### SEC_05 — CTA + footer (brain 0.42 — brightest, centered)
- Headline + single CTA + 3 trust checks; footer links. [ ]

## Mobile-specific (emulate 390 iPhone / 360 Android, then a real device)
- [ ] Hamburger menu usable; tap targets ≥44px.
- [ ] Brain poster loads (not a broken image); per-section dim still varies.
- [ ] No horizontal overflow at 360px.
- [ ] Safe-area / notch: dark theme reaches edges, nothing clipped.
- [ ] Real-device check: brain boot smooth, scroll smooth, no battery/heat spike.

## Outcomes / follow-ups
- (timer value chosen): …
- (anything needing an adaptive component vs CSS): …
- (case metrics decision): …
