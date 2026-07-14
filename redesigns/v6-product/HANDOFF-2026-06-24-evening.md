# HANDOFF — ajolotelabs.ai v6-product · 2026-06-24 (evening)

Supersedes the stale morning `HANDOFF-2026-06-24.md` (that one is the anime.js-preloader era — ignore it). Resume cold from here.

## ⚡ Where this stands RIGHT NOW
The 3D **particle brain** is the site's signature: it boots full-screen, then recedes into a fixed, dimmed, per-section ambient **background** behind the whole one-page site. The docs/structure pass, the slower preload timer, the mobile nav, and the mobile-brain perf fix are all **implemented and compiling clean** (`localhost:3000` → 200).

**PRELOADER = RESOLVED & WORKING ON PHONE (2026-06-25).** The `lite` brain alone still hung his phone against the **dev server**, but the **production build works**. Root cause of the phantom failure = **dev-only** behavior (StrictMode/HMR/dev-overlay), NOT the shipped code. **KEY LEARNING: test mobile on the production build, not `npm run dev`.** Workflow: `npm run build` → `npx serve out -l tcp://0.0.0.0:8080` → phone hits `http://192.168.1.36:8080`. Final preloader settings: `BOOT_MS`=**7000** (7s; `bootfill` CSS synced to 7s), mobile brain **camera z=5.8** (`lite ? 5.8 : 4.6`) so it fits a narrow screen. Pablo approved the preloader.

**MOBILE SCROLL + CASES = DONE (2026-06-25).** (1) Half-sections fixed: a proximity-snap experiment parked users half-and-half (hero/platform/cases overflow one phone screen). **CD decision (via `/ai-agents-mktg`): continuous natural-height scroll, NO snap on mobile** — rhythm padding + reveal motion carry the beats; breaths get `min-height:70svh` centered. Desktop pager untouched. (2) **Cases → its own `/cases` route on mobile**: shared `Cases.tsx`, new `app/cases/page.tsx`, `<Nav/>` moved to `layout.tsx`, inline `#cases` hidden on mobile home (`.page-home #cases`), mobile menu "Cases" → `<Link href="/cases">`. Verified on prod build (6 routes).

**THE OPEN LOOP NOW — TWO TRACKS:**
1. **Code review/audit BEFORE pushing to production** (Pablo's explicit objective). Nothing is deployed yet. Before cut-over: verify build/export integrity, Lighthouse ≥90, zero console errors, a11y, the brain + mobile paths, replace placeholder case metrics, resolve the uncommitted edits on the live `index.html`. Use `REVIEW.md` + the open threads below as the checklist.
2. **Content robustness, section by section** — scrape HappyRobot's site (the positioning benchmark) + Pablo's goals (`vision/` stack) → stronger copy/content/structure per section. A plan for this is being built (see `~/.claude/plans/`).

- Phone testing = **production build only**: `npm run build` → `npx serve out -l tcp://0.0.0.0:8080` → phone hits **http://192.168.1.36:8080**. (Dev server `:3000` has StrictMode/HMR artifacts that break the phone — do NOT test mobile there.)
- NOT deployed. Live ajolotelabs.ai is still the old vanilla `../../index.html`. Deploy = push to Cloudflare Pages (after the code review).

## The brain architecture (how it works now)
- **`src/app/BrainExperience.tsx`** (mounted once in `layout.tsx`) — 3-phase machine, timer-driven, no click:
  - **boot** (`BOOT_MS`=7000, 7s) full-screen converging brain + "ajolotelabs / initializing brain" wordmark + progress bar; scroll locked; opaque canvas covers the page.
  - **transition** (`TRANSITION_MS`=800) overlay fades, brain dims+recedes, content reveals, scroll unlocks.
  - **background** brain fixed at z-0, dimmed, behind content; per-section opacity via `BRAIN_BY_SECTION` + an IntersectionObserver setting `--brain-bg-opacity` (hero .25 / thesis .12 / platform .40 / ownership .12 / cases .18 / calendly .42).
  - **tap-to-skip**: tapping the boot overlay (`onClick=reveal`) jumps straight to the site — safety so no device gets trapped.
  - **`CanvasBoundary`** error boundary → renders `<BrainPoster/>` (`public/brain-poster.webp`) if WebGL fails entirely.
- **`src/app/brain3d-lab/BrainScene.tsx`** — the reusable R3F brain (looks: wireframe/particle/connectome). Props: `interactive` (OrbitControls on/off) and **`lite`** (mobile: NO Bloom, `dpr=[1,1.5]`, `antialias:false`, keeps 9k particles). `/brain3d-lab/` is a dev tuning route.
- **Desktop** = full brain + Bloom. **Mobile** (`isMobile` = `max-width:768px`, lazy-init) = `lite` live brain **throughout** (Pablo's choice). `frameloop` pauses when tab hidden.

## Key decisions (don't re-litigate)
- One adaptive responsive codebase, **NOT** a separate mobile site (clarified responsive vs adaptive vs separate-site with Pablo).
- Mobile keeps the **live 9k brain**, just **no Bloom** — Bloom (multi-pass postprocessing) was what hung the phone GPU, not particle count or three.js version.
- Preload timer slowed 1.9s→**3.0s** (felt too fast). Constants: `BOOT_MS`/`TRANSITION_MS` in BrainExperience; CSS `.brain-exp__bar span` `bootfill` synced to 3s; brain assembly = `CONVERGE_SEC`=1.7 in BrainScene.
- Brain dimming is via **container CSS opacity only** — never make the canvas transparent (Bloom needs an opaque `<color attach="background">`).
- Stay on **three@^0.184** (matches drei/fiber/postprocessing). Downgrading silently breaks rendering — already burned that.

## Gotchas already burned (don't repeat)
- **Never assign refs inside `useMemo`** — StrictMode double-invokes the factory; the on-screen object keeps the orphan and animations silently no-op. Mutate the rendered object in `useFrame`.
- A persistent WebGL+bloom canvas **never reaches network-idle**, so chrome-devtools reloads return late and stale JS chunks get cached — hard to screenshot the ~3s boot frame (verify via `.brain-exp--boot`/`--bg` class + `evaluate_script`, not screenshots).
- Reloading the bloom canvas **dozens of times in one browser session exhausts WebGL contexts (~16 cap)** → `Cannot read properties of null (reading 'alpha')` from postprocessing. **This is a dev-testing artifact** (fix = restart the browser), NOT a code bug. It blocked in-session visual verification of the live brain this session.

## Files (what changed this session)
- New: `BrainExperience.tsx`, `Nav.tsx` (mobile hamburger — old nav had none), `ARCHITECTURE.md`, `REVIEW.md`, `public/brain-poster.webp`.
- Edited: `BrainScene.tsx` (interactive + lite + frameloop), `layout.tsx` (viewport export + doc), `page.tsx` (Nav + per-section doc blocks), `globals.css` (brain-exp layering, NAV burger, poster styles, bootfill 3s, architecture intro), `next.config.ts` (turbopack.root).
- Deleted: `Preloader.tsx`, `BrainBoot.tsx`, `preloader-lab/`, `public/models/brain-detailed.glb` (was a canister, not a brain). `animejs` left installed (unused, tree-shaken).
- Docs: `ARCHITECTURE.md` has the **tunable-knobs table** (single source for every timing/opacity/quality knob). `REVIEW.md` is the per-section desktop+mobile first-run checklist.

## Open threads / next steps
1. **MOBILE UX/UI — ESPECIALLY SCROLL (top priority now).** Preloader is done. Refine the mobile experience: per-section mobile layouts (hero stack, platform 2×2, cases 1-col — verify they actually look right), overall UX/UI polish, and the **scroll feel**. Decide whether mobile stays free-scroll or gets some snap/section pacing; check tap targets, spacing, no overflow at 360px. Build the prod export and test on his phone (`:8080`) — NOT the dev server.
2. **Desktop live-brain + timer "feel"** still need a human eyeball in a **fresh browser** (this session's WebGL was exhausted). Drive `REVIEW.md`.
3. **Per-section first-run pass** (desktop + mobile) against `REVIEW.md` — not yet done by Pablo.
4. **Real-device battery/perf check** for the live mobile brain (live bg uses more battery; frameloop-pause mitigates).
5. **Case metrics are placeholders** ($500K+/3/30, 40/46/3) — need defensible real numbers before cut-over.
6. **Lighthouse never run** on v6 (target ≥90 with the persistent canvas).
7. Cut-over to prod (replace vanilla `index.html`) is a later, approved step; resolve the uncommitted edits on the live site then.

## How to run / verify
```bash
cd redesigns/v6-product
npm run dev                    # http://localhost:3000  (phone: http://192.168.1.36:3000)
```
Verify boot/background via `evaluate_script` reading `.brain-exp` class + `--brain-bg-opacity` (NOT screenshots — see gotchas). Open previews in real Chrome, not Cursor's embedded browser.
