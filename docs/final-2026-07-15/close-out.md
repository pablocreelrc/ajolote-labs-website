# v6 top-notch push — close-out. 2026-07-15

Executed Tier 1 + Tier 2 from the UX/UI review (`review-2026-07-15/ux-review-2026-07-15.md`) with per-item evals, then re-ran both adversarial critics as the acceptance gate, then fixed the mediums they raised.

## Scores
- Motion critic: **68 → 82/100** ("near best-in-class").
- Visual critic: **70 → 81/100** ("near best-in-class").
- After the scores, both critics' follow-up mediums were fixed (below), so the shipped state is past what earned 82/81.

## Hard gate: MET
- No actioned finding re-flagged as unresolved (all RESOLVED / PARTIAL-then-fixed).
- No new blocker or high finding introduced.
- Lighthouse **100 / 100 / 100 / 100** desktop + mobile.
- No horizontal scroll at 360 / 390.
- Console clean (only the known fiber `THREE.Clock` deprecation warning).

## Items → eval → result

| # | Item | Mechanical eval | Critic verdict |
|---|---|---|---|
| T1-a | Mobile particle bleed | active card opaque + scrim; band gone | RESOLVED |
| T1-b | Nav scroll-condense | bg .72→.98 + shadow past hero | RESOLVED |
| T1-c | Case-card hover/rest-equal beam | beams frozen equal at rest; hover lift+beam | RESOLVED |
| T1-d | Vertical rhythm | shared eyebrow/head/body tokens | RESOLVED |
| T1-e | 3-tier type scale | 3 sizes 89/69/53, ~1.3 ratio | RESOLVED |
| T1-f | Console cursor+pop, hero measure, /cases gap | cursor present, ok=okpop, measure 44ch | RESOLVED |
| T2-a | Diagram connectors + labels | connectors ≥.55 idle + light per beat | connectors RESOLVED; labels reverted to mirror so all 4 read (see note) |
| T2-b | Brain reactivity | pointer/pulse/scroll all respond (window.__brain) | RESOLVED (concept; verified live) |
| T2-c | Motion signatures | thesis blur-in + cases scale-pop | RESOLVED (concept) |
| T2-d | Section spine | active dot tracks section; desktop-only | RESOLVED — "best single addition" |

## Gate follow-ups fixed (commit 93be48d)
- **Hero orphan** ("to" alone) — widened the hero measure; "Stop losing money to" holds one line.
- **Diagram GOVERNANCE hidden** — the T2-a label-unification had moved MODELS/GOVERNANCE labels under the center brain card. Reverted to the outward mirror so all four nodes read around the hub (kept the new visible/animated connectors). Mobile stays left-aligned.
- **Spine tangent** — label shows on hover only, no persistent label crossing content.
- **Mobile footer alignment** — links left-aligned (all at the gutter).
- **Between-card particle band** — strengthened the mobile diagram scrim.

## Known-remaining (deferred, low)
- Body-copy contrast reads dim to a designer's eye, but Lighthouse a11y = 100 (formal AA passes); perceptual only.
- "THE BRAIN" console still has some internal empty space (F2, low).
- Real diagram re-geometry (radial) was out of scope — the 100svh snap constraint keeps the 2-col layout.

## Commits
`7e33588` Tier 1 · `6a0fed3` T2-a · `2bee2a3` T2-b · `ba9c81f` T2-c+T2-d · `93be48d` gate follow-ups. All local; **not deployed**.
