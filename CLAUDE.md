<!-- Scope: project:ajolote-labs-website -->
<!-- Last reviewed: 2026-07-15 -->
<!-- Parent: ../CLAUDE.md -->

# Ajolote Labs marketing website
Public marketing site for Ajolote Labs (`ajolotelabs.ai`) — Next.js 16 (App Router), static export, served from a **Cloudflare Worker (static assets)** built on push to `master` via Workers Builds. (Migrated off Cloudflare Pages 2026-07-23 — the domain now binds to the Worker, not a Pages project.)

## Scope
- Inherits from: `../CLAUDE.md` (workspace:Ajolote tech)
- Specializes: Next.js static-site stack, file layout, dev/build commands, marketing-site hard stops
- Sub-scopes: none

## Stack
- Framework: Next.js 16 (App Router) + TypeScript, static export (`output:'export'` in `next.config.ts`) — no server, no backend
- Styling: Tailwind 4 + hand-written CSS in `src/app/globals.css` (tokens, sections, motion, brain layering)
- 3D: React-Three-Fiber + drei + postprocessing — the ambient particle brain (`src/app/brain3d-lab/BrainScene.tsx`)
- Motion: anime.js (platform diagram) + a hand-rolled IntersectionObserver script (`MotionScript.tsx`)
- Fonts: Satoshi (display) + General Sans (body) + JetBrains Mono (mono) — self-hosted `.woff2` in `public/fonts/`
- Hosting: **Cloudflare Worker with static assets** (git-connected via Workers Builds), GitHub `master` branch. Deploy config is code, in `wrangler.jsonc`: `build.command` = `npm run build`, `assets.directory` = `./out`, and `routes` bind the custom domains `ajolotelabs.ai` + `www.ajolotelabs.ai` (`custom_domain: true`). Served at `ajolote-labs-website.pablocreelrc.workers.dev`; account `5e7451d4cd92612620b14fd1a65d0527`. (`public/CNAME` is a carryover from the Pages era and is now inert.)
- Architecture deep-dive: see `ARCHITECTURE.md`
- ⚠️ **DNS caution:** `ajolotelabs.ai` also holds Google Workspace **MX + SPF + DKIM/verification** records for `hello@ajolotelabs.ai`. When scripting DNS changes, only touch the specific record that conflicts — never bulk-delete all records at a name. (A migration script once wiped the apex MX set; email was down until restored.)

## Folder map
- `src/app/page.tsx` — the single marketing page (server component): hero, thesis, platform, cases, closing CTA/footer
- `src/app/layout.tsx` — root layout: fonts, metadata, mounts `<BrainExperience/>` + `<Nav/>` once
- `src/app/BrainExperience.tsx` — brain lifecycle (boot → transition → background), per-section opacity, reactivity bridge
- `src/app/brain3d-lab/BrainScene.tsx` — the reusable R3F brain (3 looks); `brain3d-lab/page.tsx` is a dev-only tuning route, gated out of production builds
- `src/app/PlatformDiagram.tsx` — the "your operation needs a brain" diagram animation
- `src/app/SectionSpine.tsx` — desktop right-edge section-progress dots
- `src/app/Cases.tsx` + `src/app/cases/page.tsx` — case studies (shared component + standalone `/cases` route)
- `src/app/Nav.tsx`, `src/app/MotionScript.tsx`, `src/app/globals.css` — nav, scroll motion, all styling
- `public/` — fonts, images, the brain model/poster, plus site metadata (`CNAME`, `robots.txt`, `sitemap.xml`, `manifest.json`, `_headers`, `llms.txt`/`llms-full.txt`)
- `scripts/flatten-export-segments.mjs` — post-build fix for a Windows-only Next static-export bug (no-op on Linux/Cloudflare)
- `docs/` — working docs: handoffs, research, adversarial-review reports, screenshots (not site content)
- `_archive/` — the prior vanilla HTML/CSS/JS site (`vanilla-site-v4/`) and other superseded prototypes, kept for reference/rollback

## Commands
- `npm run dev` — `next dev` (Turbopack), http://localhost:3000
- `npm run build` — `next build && node scripts/flatten-export-segments.mjs` → static export to `out/`
- `npm run start` — `next start` (not used in production; the static export is served directly)
- `npm run lint` — `eslint`

## Hard stops
- **Dark theme only.** Cyan-tinted dark `#0a1a24` / `#09090b` base. Never white backgrounds, never white cards.
- **No founder profile / About-Pablo / team page / founder photo.** Permanent positioning stake.
- All CTAs route to `calendly.com/hello-ajolotelabs`. One conversion ask per section.
- Cyan accent (`#00e5ff`) on H1 marquee words, status pills, card border-beams — headline gradients are cyan-only (no amber).
- Desktop: mandatory scroll-snap, one 100svh section per beat. Mobile: natural scroll, no snap — never reintroduce it.
- Cases stay qualitative (no metric numbers) until real, defensible figures exist — never invent numbers.
- Quality bar to preserve: Lighthouse 100/100/100/100 (mobile + desktop), no console errors, no 4xx, tested at 360/390/768/1024/1440. Don't regress without a written reason.
- License is proprietary — never re-publish copy verbatim outside ajolotelabs.ai.
