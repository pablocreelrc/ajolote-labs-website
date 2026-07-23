# ajolotelabs.ai — v6-product · Architecture

The marketing site rebuilt as a **product experience**: Next.js 16 (App Router) + TypeScript + Tailwind 4 + React-Three-Fiber, **static export** (`output:'export'`) → a Cloudflare Worker (static assets). One page, a signature 3D brain, no backend.

> Orient here first. For *what to check* during a review pass, see `REVIEW.md`.

## File tree (`src/app/`)
```
layout.tsx          Root layout: fonts, metadata + viewport, mounts <BrainExperience/> once.
page.tsx            The single page (server component): <Nav/> + 6 <section>s + <MotionScript/>.
Nav.tsx             Sticky nav + mobile hamburger menu (client — owns open state).
BrainExperience.tsx Brain lifecycle: boot → transition → background; per-section opacity; mobile poster swap.
MotionScript.tsx    Scroll motion (word-cascade, reveals, count-ups, marquee) — progressive enhancement.
globals.css         All styling (tokens, nav, sections, motion, brain layering) + responsive rules.
brain3d-lab/
  BrainScene.tsx    Reusable R3F brain (3 looks: wireframe/particle/connectome) + bloom.
  page.tsx          Dev-only route (/brain3d-lab/) to tune the looks interactively.
public/
  models/brain-lowpoly.glb   The 200KB brain mesh (only model; drives every look).
  brain-poster.webp          Static brain still — mobile ambient bg + WebGL-failure fallback.
```

## The brain (the signature element)
Lifecycle, all timer-driven, **no user click** (owned by `BrainExperience.tsx`):

1. **boot** (`BOOT_MS`, ~3s) — full-screen particle brain converges + wordmark/progress overlay; scroll locked; the opaque canvas covers the page (no FOUC).
2. **transition** (`TRANSITION_MS`, ~0.8s) — overlay fades, brain dims + recedes (z-flip masked under the fade), content reveals, scroll unlocks.
3. **background** — brain becomes a `position:fixed`, dimmed, per-section ambient layer behind everything.

**Desktop vs mobile** differ *only* in the background phase:
- **Desktop** — live WebGL `<BrainScene>` stays mounted as the ambient bg (paused when the tab is hidden via `frameloop`).
- **Mobile** (`max-width:768px`) — live brain runs through the boot, then swaps to the static `brain-poster.webp` and the canvas unmounts → no persistent WebGL (battery/crash safe). Per-section opacity still applies (CSS opacity on the `<img>`).
- The poster is also the **WebGL-failure fallback on every device** (`CanvasBoundary`).

**Layering** (globals.css `BRAIN EXP`): `--boot` = z-50 opaque cover; `--bg` = z-0 + `opacity:var(--brain-bg-opacity)`. `#main` is `z-1`, nav `z-100`. Dim via container opacity ONLY (Bloom needs the canvas's opaque `#09090b` bg).

## Sections (`page.tsx`) — id drives nav anchors + brain opacity
| id | section | brain | notes |
|---|---|---|---|
| `hero` | Stop losing money… | 0.25 | diptych → stacks <768px |
| `thesis` | The bottleneck was never the model | 0.12 | dim "breath", no CTA |
| `platform` | Your operation needs a brain | **0.40** | brain-center diagram → 2×2 grid <900px |
| `ownership` | We don't ship and walk away | 0.12 | dim "breath", no CTA |
| `cases` | Real results… | 0.18 | 2 cards → 1 col <768px (metrics are placeholders) |
| `calendly` | Map your operation on the first call | **0.42** | closing CTA + footer |

## Motion (`MotionScript.tsx`)
One client effect, IntersectionObserver-driven, reduced-motion aware: word-cascade (`data-cascade`), reveal-on-scroll (`.reveal`), metric count-ups (`data-counter`), gradient-marquee sweep (`.marquee-word`), platform-diagram staggered build. Server markup is the no-JS fallback.

## Responsive
One adaptive codebase (no separate mobile site). Breakpoints in `globals.css`:
- **768px** — hero/cases collapse to 1 col; platform diagram → 2×2 grid; scroll-snap **off** (free scroll); `MOBILE_QUERY` for the brain poster.
- **899px** — nav links + pill hidden, hamburger shown (`Nav.tsx` + globals NAV).
- **1024px** — wider gutters.
Headings use `clamp()`; `env(safe-area-inset-*)` + `viewportFit:cover` handle the notch.

## Tunable knobs (change here)
| Knob | File | Default | Notes |
|---|---|---|---|
| `BOOT_MS` | BrainExperience.tsx | 3000 | boot length. **Must equal** the CSS `bootfill` duration (globals.css `.brain-exp__bar span`, 3s) and be ≥ `CONVERGE_SEC`. |
| `TRANSITION_MS` | BrainExperience.tsx | 800 | dim/recede + overlay fade. Matches `.brain-exp` 0.7s transition. |
| `CONVERGE_SEC` | brain3d-lab/BrainScene.tsx | 1.7 | brain assembly duration. |
| `--brain-bg-opacity` | globals.css | .25 | base ambient dimness (fallback). |
| `BRAIN_BY_SECTION` | BrainExperience.tsx | per-table | per-section ambient opacity. |
| particle `count` | brain3d-lab/BrainScene.tsx (`Particle`) | 9000 | brain point count. |
| Bloom `intensity` / `radius` | brain3d-lab/BrainScene.tsx | 1.15 / 0.7 | glow strength. |
| `MOBILE_QUERY` | BrainExperience.tsx | `max-width:768px` | where mobile poster kicks in. |
| breakpoints | globals.css | 768 / 899 / 1024 | layout reflow points. |

## Run / build
```bash
npm run dev      # http://localhost:3000  (Turbopack)
npm run build    # static export → out/   (served by the Cloudflare Worker)
```
Quality bar (don't regress): Lighthouse ≥90, WCAG 2.1 AA, no console errors, tested 360/390/768/1024/1440.
Dev note: a persistent bloom canvas never reaches network-idle, so reloading many times in one browser session can exhaust WebGL contexts and throw a `null 'alpha'` error — that's a testing artifact (restart the browser), not a code bug.
