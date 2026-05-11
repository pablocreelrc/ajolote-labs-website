# Ajolote Labs — Marketing Site

The public site for [Ajolote Labs](https://ajolotelabs.ai). Forward-deployed engineers who embed in operations, build the AI brain that unifies your stack, and stay to keep building.

**Live:** [ajolotelabs.ai](https://ajolotelabs.ai)
**Deploy target:** Cloudflare Pages (auto-deploy on push to `master`)

---

## Stack

| Layer | Choice |
|---|---|
| Markup | Vanilla HTML5 (no framework) |
| Styles | Vanilla CSS, minified with [esbuild](https://esbuild.github.io/) |
| Behavior | Vanilla JavaScript |
| Fonts | Satoshi (display) + General Sans (body) + JetBrains Mono (monospace) — self-hosted woff2 |
| Hosting | Cloudflare Pages |
| Image format | WebP, decode async, fixed dimensions |
| Testing | [Playwright](https://playwright.dev/) for audits + multi-viewport screenshots |

No framework, no build server, no client-side router. The site is a single static `index.html` plus a single `style.min.css` and `main.js`. Everything else is content, assets, or tooling.

---

## Quick start

```bash
git clone https://github.com/pablocreelrc/ajolote-labs-website.git
cd ajolote-labs-website
npm install                 # only needs playwright for audit tooling
python -m http.server 8765  # any static server works
open http://localhost:8765
```

### Editing styles

`css/style.css` is the source of truth. After editing, rebuild the minified bundle:

```bash
npx esbuild css/style.css --minify --outfile=css/style.min.css
```

Then bump the cache-bust query string on the `<link>` in `index.html` so deployed visitors fetch the new file.

### Running the audit

`audit.js` is a Playwright script that captures desktop + mobile screenshots and checks for console errors / 4xx responses.

```bash
node audit.js
```

Outputs go to `docs/audit/` (gitignored).

---

## Project structure

```
.
├── index.html               # the entire site
├── css/
│   ├── style.css            # source CSS — edit this
│   └── style.min.css        # esbuild output — committed for prod
├── js/
│   └── main.js              # all client behavior (nav, carousels, snap, magic-card cursor)
├── data/
│   └── cases.json           # case-study content (loaded by main.js)
├── fonts/                   # self-hosted .woff2 (Satoshi / General Sans / JetBrains Mono)
├── img/                     # logos, OG images, favicons
├── design-system/           # design tokens, references, screen captures — see its own README
├── docs/
│   └── scroll-system-spec.md  # canonical scroll-snap pagination spec
├── _headers                 # Cloudflare Pages response headers (HSTS, CSP, etc.)
├── _redirects               # if present, Cloudflare Pages redirects
├── CNAME                    # ajolotelabs.ai
├── llms.txt / llms-full.txt # LLM-discoverable site index
├── robots.txt               # crawler directives
├── sitemap.xml              # search-engine sitemap
└── manifest.json            # PWA manifest
```

---

## Deployment

Cloudflare Pages watches the GitHub `master` branch. Every push triggers a build (no build step — Cloudflare just serves the repo root) and propagates to the CDN edge in ~30-90 seconds.

To verify a deploy reached prod:

```bash
curl -s "https://ajolotelabs.ai/?_cb=$(date +%s)" | grep -oE 'style\.min\.css\?v=[a-zA-Z0-9-]+'
```

The cache-bust string in the response should match what's in `index.html` on `master`.

---

## Design conventions

The full design system lives in [`design-system/`](./design-system/README.md). Key rules:

- **Dark theme only.** Cyan-tinted dark `#0a1a24` base. Never white backgrounds.
- **Cyan accents** (`#00e5ff`) on H1 marquee words, status pills, card border-beams.
- **Satoshi** for display type, **General Sans** for body, **JetBrains Mono** for code-style chrome.
- **Scroll-snap pagination** on desktop AND mobile — each section is one viewport. See [`docs/scroll-system-spec.md`](./docs/scroll-system-spec.md).
- **No founder profile.** Permanent positioning stake — no About page, no team page, no founder photo.
- **One conversion ask per section** — primary CTAs all route to `calendly.com/hello-ajolotelabs`.
- **Mobile sticky CTA** appears once user scrolls past hero; 71px tall, fixed bottom.

---

## Quality bar

- Lighthouse Performance / Accessibility / Best Practices / SEO — all 100 on mobile and desktop (audited 2026-05-08).
- WCAG 2.1 AA — color contrast, focus rings, tap targets ≥44×44 on mobile, `prefers-reduced-motion` honored on every animation.
- No console errors, no 4xx responses on any page load.
- Multi-viewport tested at 360 / 390 / 768 / 1024 / 1440 widths.

---

## Pre-push hook

The repo includes a Claude Code preflight hook at `.claude/hooks/website-preflight.py` that scans changes for known footguns (overflow-x: hidden vs clip, stale `style.min.css`, forbidden phrases like "About Pablo"). It runs automatically before any push.

To run manually:

```bash
python .claude/hooks/website-preflight.py
```

---

## License

Proprietary. © Ajolote Labs.
