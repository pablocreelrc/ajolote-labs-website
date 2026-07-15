# CONSTRAINTS.md — Engineering rules

Engineering/technical rules for any code that implements the Ajolote Labs brand. Distinct from `DESIGN.md` — that file is *brand*; this file is *how code is written*. Both must be respected.

Agents (Claude Design, Claude Code) should treat every rule here as a hard constraint unless the user explicitly overrides it.

---

## Stack

**Default stack for marketing surfaces (website, landing pages, static sites):**

- **Vanilla HTML + CSS + ES2020 JS.** No framework. No bundler runtime overhead.
- Build tooling allowed: **esbuild** (CSS minification), **Playwright** (audit scripts), **Python** (local preview server). Nothing else unless the project needs it.
- Fonts **self-hosted** as `.woff2` with `font-display: optional` (exceptions: Satoshi 900 for hero LCP is `font-display: swap`).
- Hosting: **Cloudflare Pages** (auto-deploys from `master`). `_headers` at the root governs CSP/HSTS — not `vercel.json` in production.

**Default stack for product surfaces (dashboards, portals, web apps):**

- **Next.js 16 App Router** + TypeScript strict + Tailwind CSS 4 + `src/` directory + `@/*` import alias.
- Scaffolded with `npx create-next-app@latest <name> --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"`.
- **Never Vite for Vercel deploys.** Only exception: the user explicitly says "use Vite."

**Default stack for AI/agent features:**

- Anthropic SDK (`@anthropic-ai/sdk`), latest Claude model family. Prompt caching on by default.
- MCP connector where external tool integration is needed.

---

## File structure (marketing site, vanilla)

```
ajolote-labs-website/
├── index.html              ← production entry
├── css/
│   ├── style.css           ← human-readable source
│   └── style.min.css       ← esbuild output — authoritative at runtime
├── js/
│   └── main.js             ← vanilla ES2020
├── fonts/                  ← .woff2 self-hosted
├── img/                    ← brand images
├── data/                   ← JSON (cases, metrics)
├── docs/                   ← design specs, audit scripts
├── redesigns/              ← experimental variants (v4-2, v5, etc.)
├── design-system/          ← ← THIS FOLDER — brand source of truth
├── _headers                ← Cloudflare CDN rules (CSP/HSTS)
├── CNAME                   ← ajolotelabs.ai
└── .claude/hooks/          ← website-preflight.py, secret-guard.py
```

Critical: `css/style.min.css` is the source of truth at runtime. **Rebuild with esbuild after every CSS edit or changes don't land.** Preflight hook at `.claude/hooks/website-preflight.py` blocks push if `style.min.css` is stale.

---

## File structure (Next.js product)

```
<project>/
├── src/
│   ├── app/                ← routes, layouts
│   ├── components/
│   │   ├── layout/         ← nav, footer, shells
│   │   ├── ui/             ← primitives (button, pill, panel, metric-cell)
│   │   └── screens/        ← page-level screens
│   ├── data/               ← mock data, schemas
│   ├── lib/                ← helpers
│   └── context/            ← React context providers
├── public/
│   ├── fonts/              ← self-hosted .woff2
│   └── img/
└── tailwind.config.ts
```

---

## Component rules

- **Max 150 lines per component file.** If a component exceeds this, split into sub-components (logical, not cosmetic).
- **Props always typed.** TypeScript: `interface Props { ... }`. `any` is a code-review blocker.
- **No inline styles.** Every style via CSS classes or Tailwind utilities. Inline `style={{ ... }}` allowed only for dynamic values from props (e.g., `style={{ '--fill': percent }}`).
- **No `<div>` for interactive elements.** Buttons are `<button>`. Links are `<a>`. Toggles are `<input type="checkbox">` or `<button aria-pressed>`. `<div onClick>` is a bug.
- **Semantic HTML first, ARIA second.** `<section aria-labelledby>`, `<nav>`, `<header>`, `<main>`, `<footer>`, `<article>`. ARIA compensates for missing semantics, never replaces them.
- **Heading levels monotonic.** `<h1>` once per page. Never skip levels. `<h2>` → `<h3>` → `<h4>`, never `<h2>` → `<h4>`.
- **Every image has `width`, `height`, and `alt`.** Decorative: `alt=""` + `aria-hidden="true"`.

---

## Styling rules

- **No raw hex colors in component files.** Always via CSS custom properties from `tokens.css` (or Tailwind tokens mapped to the same variables).
- **No raw pixel values for spacing.** Use the spacing scale from `DESIGN.md §5`: 4/8/12/16/20/24/32/40/64/96. Tailwind: `p-2, p-3, p-4, p-5, p-6, p-8, p-10, p-16, p-24`.
- **Minimum body font 14px on mobile.** Mono labels can go to 10–12px because they're labels. Nothing a user has to read is under 14px.
- **Every tap target ≥ 44×44px on mobile.** Add invisible padding to reach 44×44 if the visual is smaller.
- **Every section and card uses `overflow-x: clip`.** Component overflow is the #1 source of mobile bugs.
- **Use `svh`/`dvh`/`lvh`, not `vh`.** iOS Safari's `vh` is broken. `100svh` for full-viewport sections.
- **Prefers-reduced-motion kills every animation.** `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } ... }` and snap to final state.

---

## Accessibility (WCAG 2.2 AA, non-negotiable)

- **Skip link** to `#main` as first focusable element.
- **Focus visible** on every interactive element. Custom cyan ring: `0 0 0 2px var(--bg), 0 0 0 4px var(--cyan)`.
- **Color contrast** ≥ 4.5:1 for body text, ≥ 3:1 for large text (≥ 18pt) and UI components.
- **Keyboard-reachable.** Tab through every interactive element. No mouse-only hover states carrying critical info.
- **`aria-live="polite"`** on counters that update, log streams, status changes.
- **`aria-hidden="true"`** on decorative animations (parallax layers, gradient sweeps, cursor blinks).
- **Mobile menu** traps focus when open, is `inert` when closed, closes on Escape.
- **Form fields** (if any are ever added): `<label for>` always, `aria-describedby` for help text and errors.
- **Audit every change** with axe DevTools or Lighthouse accessibility score ≥ 95.

---

## Performance

- **LCP element must not depend on JS.** Hero H1 is in initial HTML, font preloaded (`<link rel="preload" as="font">`).
- **Critical CSS inlined.** Above-the-fold styles in `<style>` tag in `<head>`; full stylesheet loads after.
- **No render-blocking JS.** `<script defer>` or `<script type="module">`, never a blocking inline script that does work.
- **Images:** WebP with width/height attributes. Lazy-load everything below the fold (`loading="lazy"`).
- **Third-party scripts:** none. No Google Analytics, no Facebook Pixel, no chat widgets. If analytics is required, use Cloudflare's built-in (no client-side tag).
- **Lighthouse mobile targets:** Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

---

## JavaScript rules

- **Progressive enhancement.** Every section must render without JS. Counters show final values in HTML; cases render from server HTML; log streams show a static 4-line snapshot. JS enhances — never gates content.
- **No framework runtime on marketing surfaces.** Vanilla only.
- **No libraries for what CSS does.** No animation library, no carousel library, no accordion library — CSS scroll-snap, CSS `:target`, `<details>`, CSS grid handle it.
- **Module scripts** (`<script type="module">`) with top-level `await` allowed.
- **No IIFE wrappers** — module scope handles it.
- **Event listeners via `addEventListener`.** No `onclick=` attributes in HTML.
- **Don't poll.** Use `IntersectionObserver` for scroll-triggered effects, `matchMedia` for breakpoint logic, `requestAnimationFrame` for frame-accurate animation.
- **Error boundaries.** Wrap any async fetch in try/catch. If JSON fetch fails, the section still renders from its HTML fallback.

---

## Explicit negatives (things agents try to add that we don't want)

- ❌ No `<div>` for buttons, toggles, or links.
- ❌ No inline styles except for dynamic CSS custom properties from props.
- ❌ No raw hex colors outside `tokens.css`.
- ❌ No raw pixel values for spacing outside the spacing scale.
- ❌ No animation libraries (Framer Motion, GSAP, Lottie) on marketing surfaces.
- ❌ No icon fonts. Inline SVG only.
- ❌ No emojis in buttons, headlines, or nav.
- ❌ No third-party embeds (Typeform, Calendly widget, YouTube iframe) — link out instead.
- ❌ No cookie banners. We don't set tracking cookies.
- ❌ No chat widgets (Intercom, Drift, Crisp).
- ❌ No popup modals for marketing (newsletter, discount, "before you go").
- ❌ No scroll-hijacking (smooth scroll libraries that override native behavior).
- ❌ No parallax on body text — only on background layers with `aria-hidden`.
- ❌ No `<marquee>`, no auto-playing video, no autoplay audio.
- ❌ No `console.log` in shipped code.
- ❌ No `TODO` or `FIXME` comments committed to master — track in issues instead.

---

## Testing

- **Multi-viewport Playwright audit** required before merging anything visual. Minimum viewports: 360, 375, 390, 414, 768, 1024, 1440.
- **Reduced-motion emulation** on screenshot runs: `await context.emulateMedia({ reducedMotion: 'reduce' })`.
- **Accessibility audit** with axe on every merge: zero violations on `main` sections, warnings acceptable for decorative.
- **Lighthouse CI** on every deploy — targets above.
- **No-JS smoke test:** disable JS, load the page, verify hero + services + cases + CTA all visible.

---

## Git / CI

- **Commits use conventional prefixes:** `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `perf:`, `test:`.
- **One logical change per commit.** No "small stuff" bundles.
- **Never `--no-verify`.** Preflight hooks exist for a reason.
- **`.env*` never committed.** Secrets via 1Password share + Cloudflare/Vercel env vars.
- **Force-push only on personal branches.** `master` is append-only.

---

## When this file is silent

Default to the choice that:
1. Works without JS
2. Works on 375px mobile
3. Works with keyboard only
4. Works with screen readers
5. Ships fewer kilobytes
6. Adds no third-party dependency

If in doubt, pick the simpler option and ask.
