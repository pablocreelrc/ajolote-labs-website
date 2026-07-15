# Ajolote Labs — Marketing Site

The public site for [Ajolote Labs](https://ajolotelabs.ai). Forward-deployed engineers who embed in operations, build the AI brain that unifies your stack, and stay to keep building.

**Live:** [ajolotelabs.ai](https://ajolotelabs.ai)
**Deploy target:** Cloudflare Pages (build-from-source, auto-deploy on push to `master`)

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), static export |
| Language | TypeScript |
| Styling | Tailwind 4 + hand-written CSS (`src/app/globals.css`) |
| 3D | React-Three-Fiber + drei + postprocessing (the ambient particle brain) |
| Motion | anime.js + a hand-rolled scroll/IntersectionObserver script |
| Fonts | Satoshi (display) + General Sans (body) + JetBrains Mono (mono) — self-hosted woff2 |
| Hosting | Cloudflare Pages |

No backend, no database. Everything ships as a static export — HTML/CSS/JS generated at build time.

---

## Quick start

```bash
git clone https://github.com/pablocreelrc/ajolote-labs-website.git
cd ajolote-labs-website
npm install
npm run dev
open http://localhost:3000
```

### Building for production

```bash
npm run build   # static export -> out/
```

Cloudflare Pages runs this same command on every push to `master` and serves the resulting `out/` directory.

---

## Project structure

```
.
├── src/app/
│   ├── page.tsx              # the marketing page (hero, thesis, platform, cases, CTA/footer)
│   ├── layout.tsx             # root layout: fonts, metadata, brain + nav mount
│   ├── BrainExperience.tsx    # brain lifecycle + reactivity bridge
│   ├── brain3d-lab/           # the R3F brain component + dev-only tuning route
│   ├── PlatformDiagram.tsx    # platform section diagram animation
│   ├── SectionSpine.tsx       # desktop section-progress dots
│   ├── Cases.tsx, cases/      # case studies component + /cases route
│   ├── Nav.tsx                # sticky nav + mobile menu
│   ├── MotionScript.tsx       # scroll motion (cascade, reveals, marquee)
│   └── globals.css            # all styling
├── public/                    # fonts, images, brain model/poster, site metadata
├── scripts/                   # build helper scripts
├── docs/                      # working docs (handoffs, research, review reports) — not site content
├── _archive/                  # prior vanilla-site build + superseded prototypes
├── next.config.ts             # static export config
└── package.json
```

---

## Deployment

Cloudflare Pages watches the GitHub `master` branch. Every push triggers `npm run build` and Cloudflare serves the resulting `out/` directory at the CDN edge.

---

## Design conventions

- **Dark theme only.** Cyan-tinted dark `#0a1a24` base. Never white backgrounds.
- **Cyan accents** (`#00e5ff`) on H1 marquee words, status pills, card border-beams.
- **Satoshi** for display type, **General Sans** for body, **JetBrains Mono** for code-style chrome.
- **Scroll-snap pagination on desktop**, natural scroll on mobile — each desktop section is one viewport.
- **No founder profile.** Permanent positioning stake — no About page, no team page, no founder photo.
- **One conversion ask per section** — all CTAs route to `calendly.com/hello-ajolotelabs`.

---

## Quality bar

- Lighthouse Performance / Accessibility / Best Practices / SEO — 100 on mobile and desktop.
- No console errors, no 4xx responses on any page load.
- Multi-viewport tested at 360 / 390 / 768 / 1024 / 1440 widths.
- `prefers-reduced-motion` honored on every animation.

---

## License

Proprietary. © Ajolote Labs.
