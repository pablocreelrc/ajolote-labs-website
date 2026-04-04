# Audit Action Items — Prioritized

## Critical (Must fix — breaks core UX or scores)

- [x] All content below hero invisible due to `.reveal` opacity:0 + IntersectionObserver not firing for crawlers/static renders [Visual]
- [ ] `--text-muted: #475569` contrast ratio 2.67:1 — FAILS even large text AA (needs 3.0:1) [Accessibility]
- [ ] `--text-dim: #64748b` contrast ratio 4.0:1 — FAILS AA normal text (needs 4.5:1) [Accessibility]
- [ ] No `<main>` landmark element [Accessibility]
- [ ] No skip-to-content link [Accessibility]
- [ ] No `:focus-visible` styles anywhere [Accessibility]
- [ ] No `prefers-reduced-motion` support — canvas, typing, blink all run indefinitely [Accessibility]
- [ ] Render-blocking Google Fonts — 3 families, 11 weights loaded synchronously [Lighthouse]

## High (Significantly improves quality)

- [ ] Missing OG/Twitter meta tags — no social sharing previews [Lighthouse/SEO]
- [ ] Missing canonical URL [Lighthouse/SEO]
- [ ] Canvas missing `aria-hidden="true"` [Accessibility]
- [ ] Decorative SVG icons exposed to screen readers [Accessibility]
- [ ] Burger button missing `aria-expanded` [Accessibility]
- [ ] Mobile menu lacks `role="dialog"`, focus trapping, Escape key [Accessibility]
- [ ] Typing animation has no `aria-live` or static fallback [Accessibility]
- [ ] Canvas animation runs O(n²) continuously, never pauses off-screen [Lighthouse]
- [ ] Touch targets too small: nav links, footer links, burger [Accessibility]

## Medium (Polish and refinement)

- [ ] Dead `href="#"` links (logo, Privacy, Terms) [Lighthouse]
- [ ] Missing `robots.txt` and `sitemap.xml` [SEO]
- [ ] Missing `<meta name="theme-color">` [Best Practices]
- [ ] Missing JSON-LD structured data [SEO]
- [ ] Excessive font weights loaded (11 files, only ~7 used) [Performance]
- [ ] CSS/JS not minified (~32KB savings) [Performance]
- [ ] `backdrop-filter` on fixed nav causes repaints [Performance]
- [ ] Counter values not exposed to assistive tech [Accessibility]
- [ ] Terminal block lacks semantic `<figure>` wrapper [Accessibility]

## Design Overhaul (from design direction)

- [ ] Replace cyan `#00e5ff` with Bioluminescent Green `#34D399` + Axolotl Pink `#F472B6`
- [ ] Swap typography: Bricolage Grotesque + DM Sans + IBM Plex Mono
- [ ] Kill particle canvas — left-aligned typographic hero + SVG flow diagram
- [ ] Replace glassmorphism cards with solid panels + left accent stripes
- [ ] Remove scanlines, grid overlay, glow effects
- [ ] Implement 12-column asymmetric grid layout
- [ ] Remove "SYS.STATUS: ONLINE" badge, counter stats, typing effect
- [ ] Make terminal component more realistic (line numbers, no macOS dots)
- [ ] Move Mexico identity to prominent placement
- [ ] Add horizontal scroll for mobile card sections
- [ ] Tighten border-radius (16px→8px cards, 10px→6px buttons)
