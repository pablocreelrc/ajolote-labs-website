# Lighthouse Audit Report -- Ajolote Labs Landing Page

**URL:** https://pablocreelrc.github.io/ajolote-labs-website/
**Date:** 2026-04-04
**Method:** Manual code audit against Lighthouse audit criteria (automated Lighthouse unavailable)

---

## Estimated Scores

| Category         | Estimated Score | Rating |
|------------------|:--------------:|--------|
| Performance      | 78-85          | Needs improvement |
| Accessibility    | 72-80          | Needs improvement |
| Best Practices   | 85-90          | Good |
| SEO              | 82-88          | Good |

---

## CRITICAL Priority

### 1. [Accessibility] Missing `lang` attribute completeness -- OK
- `<html lang="en">` is present. No issue here.

### 2. [Accessibility] Images missing `alt` attributes
- **File:** `index.html`
- **Details:** No `<img>` tags are used, so this is not an issue. SVGs used inline are decorative.

### 3. [Performance] Render-blocking Google Fonts request
- **File:** `index.html`, line 10
- **Audit:** `render-blocking-resources`
- **Impact:** The Google Fonts `<link>` blocks first paint. Three font families (JetBrains Mono, Manrope, Syne) with multiple weights are loaded synchronously.
- **Fix:** Add `media="print" onload="this.media='all'"` or use `font-display: swap` via the `&display=swap` parameter (already present). However the stylesheet itself is still render-blocking. Preload critical fonts or use `<link rel="preload">` for the most important weight, and load the rest asynchronously.
```html
<!-- Current (render-blocking) -->
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">

<!-- Recommended: async load -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap"></noscript>
```

### 4. [Accessibility] Canvas element lacks accessible fallback
- **File:** `index.html`, line 58
- **Audit:** `canvas-has-fallback`
- **Impact:** The `<canvas id="heroCanvas">` has no fallback content or `aria-label`/`aria-hidden` for screen readers. This is a purely decorative element.
- **Fix:** Add `aria-hidden="true"` and `role="presentation"` to the canvas:
```html
<canvas class="hero__canvas" id="heroCanvas" aria-hidden="true" role="presentation"></canvas>
```

---

## HIGH Priority

### 5. [SEO] Missing Open Graph and Twitter meta tags
- **File:** `index.html`, `<head>` section
- **Audit:** `meta-description` passes (present), but social sharing tags are absent
- **Impact:** Links shared on social media will have no preview image, title, or description.
- **Fix:** Add to `<head>`:
```html
<meta property="og:type" content="website">
<meta property="og:title" content="Ajolote Labs | The Orchestration Layer for Business Agents">
<meta property="og:description" content="Connect, manage, and scale your AI workforce with surgical precision.">
<meta property="og:url" content="https://pablocreelrc.github.io/ajolote-labs-website/">
<meta property="og:image" content="https://pablocreelrc.github.io/ajolote-labs-website/og-image.png">
<meta name="twitter:card" content="summary_large_image">
```

### 6. [SEO] Missing canonical URL
- **File:** `index.html`, `<head>` section
- **Audit:** `canonical`
- **Impact:** Search engines may index duplicate URLs (with/without trailing slash, www variants).
- **Fix:** Add `<link rel="canonical" href="https://pablocreelrc.github.io/ajolote-labs-website/">` to `<head>`.

### 7. [Accessibility] Low color contrast on secondary text
- **File:** `css/style.css`, lines 22-23
- **Audit:** `color-contrast`
- **Impact:** `--text-dim: #64748b` and `--text-muted: #475569` on `--bg: #06080f` may fail WCAG AA for normal text. Calculated contrast ratios:
  - `#64748b` on `#06080f` = ~4.6:1 (borderline pass for normal text, fails for small text)
  - `#475569` on `#06080f` = ~3.1:1 (FAILS AA for normal text)
- **Affected elements:** `.section-desc`, `.feature-card__desc`, `.use-case__desc`, `.flow__desc`, `.terminal__line--output`, `.footer__bottom`, `.use-case__label`, `.hero__stat-label`, `.cta__note`
- **Fix:** Lighten `--text-muted` to at least `#6b7280` (~4.7:1) and `--text-dim` to `#7c8ca1` (~5.5:1) for comfortable AA compliance.

### 8. [Accessibility] Links with no discernible text
- **File:** `index.html`, line 25
- **Audit:** `link-name`
- **Impact:** The logo link `<a href="#" class="nav__logo">` navigates to `#` which is a no-op. Also, the Privacy and Terms links (line 349-350) point to `#` with no actual destination.
- **Fix:** Make the logo link navigate to the page root (`/` or the full URL). For Privacy/Terms, either link to real pages or remove the links.

### 9. [Performance] Large JavaScript animation runs continuously
- **File:** `js/main.js`, lines 42-101
- **Audit:** `mainthread-work-breakdown`, `total-byte-weight`
- **Impact:** The particle canvas animation runs via `requestAnimationFrame` indefinitely, including when the hero section is not visible. O(n^2) connection distance check on 80 particles every frame.
- **Fix:** Use an IntersectionObserver to pause the animation when the canvas is not in viewport:
```js
const heroObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
        if (!animationId) drawParticles();
    } else {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}, { threshold: 0 });
heroObserver.observe(canvas);
```

### 10. [Performance] No font preconnect for `fonts.gstatic.com` -- OK
- **File:** `index.html`, lines 8-9
- Both `preconnect` hints are present. No issue.

---

## MEDIUM Priority

### 11. [Best Practices] Links to `#` with no `href` destination
- **File:** `index.html`, lines 25, 349, 350
- **Audit:** `crawlable-anchors`
- **Impact:** `href="#"` causes scroll-to-top behavior and is flagged by Lighthouse as non-crawlable.
- **Fix:** Use `href="/"` for the logo. Remove or provide real URLs for Privacy/Terms.

### 12. [SEO] Missing `robots.txt`
- **Audit:** `robots-txt`
- **Impact:** No `robots.txt` at the site root. GitHub Pages will serve a 404.
- **Fix:** Create `robots.txt` in the project root:
```
User-agent: *
Allow: /
Sitemap: https://pablocreelrc.github.io/ajolote-labs-website/sitemap.xml
```

### 13. [SEO] Missing `sitemap.xml`
- **Audit:** `structured-data`, general SEO
- **Impact:** No sitemap for search engine crawlers.
- **Fix:** Create a minimal `sitemap.xml` for the single-page site.

### 14. [Performance] Excessive font weight loading
- **File:** `index.html`, line 10
- **Audit:** `font-size`
- **Impact:** Loading 3 font families with many weights:
  - JetBrains Mono: 400, 500, 700
  - Manrope: 300, 400, 500, 600, 700
  - Syne: 600, 700, 800
- Total of 11 font weight files. Each is a separate HTTP request or woff2 download.
- **Fix:** Reduce to only the weights actually used:
  - JetBrains Mono: 400, 700 (500 not needed)
  - Manrope: 400, 500, 600, 700 (drop 300, unused in CSS)
  - Syne: 700, 800 (drop 600, unused in CSS)

### 15. [Accessibility] `aria-label` on burger button is generic
- **File:** `index.html`, line 40
- **Audit:** `button-name`
- **Impact:** `aria-label="Toggle menu"` is acceptable but does not convey state. When the menu is open, it should say "Close menu".
- **Fix:** Toggle the `aria-label` dynamically in `js/main.js` and add `aria-expanded`:
```html
<button class="nav__burger" id="navBurger" aria-label="Open menu" aria-expanded="false">
```
```js
burger.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
burger.setAttribute('aria-label', mobileMenu.classList.contains('active') ? 'Close menu' : 'Open menu');
```

### 16. [Accessibility] Mobile menu lacks `role` and keyboard support
- **File:** `index.html`, lines 49-54
- **Audit:** `interactive-element-affordance`
- **Impact:** The mobile menu div has no `role="dialog"` or `aria-modal`, and there is no focus trapping or Escape key support.
- **Fix:** Add `role="dialog"` and `aria-modal="true"` to `.mobile-menu`. In JS, trap focus inside the menu when open and close on Escape key.

### 17. [Performance] CSS `backdrop-filter` on fixed overlays
- **File:** `css/style.css`, lines 193-194 (nav), line 340 (mobile-menu)
- **Audit:** `compositor-animations`, layer promotion
- **Impact:** `backdrop-filter: blur(20px)` on a fixed-position nav forces the browser to repaint on every scroll frame. Performance cost is moderate on low-end devices.
- **Fix:** Consider removing `backdrop-filter` on mobile or using a solid background fallback for lower-end devices via `@media (prefers-reduced-motion)`.

### 18. [Best Practices] Missing `<meta name="theme-color">`
- **File:** `index.html`, `<head>` section
- **Audit:** `themed-omnibox`
- **Impact:** Mobile browsers show a default chrome color instead of matching the dark theme.
- **Fix:** Add `<meta name="theme-color" content="#06080f">` to `<head>`.

---

## LOW Priority

### 19. [SEO] Heading hierarchy skip
- **File:** `index.html`
- **Audit:** `heading-order`
- **Impact:** The page has `<h1>` in the hero, then `<h2>` in sections, then `<h3>` in cards. This is correct and well-structured. No issue.

### 20. [Accessibility] Scanlines overlay at z-index 9999
- **File:** `css/style.css`, line 82
- **Impact:** The scanlines div is at `z-index: 9999` with `pointer-events: none`. While pointer events pass through, screen readers may encounter it. The `aria-hidden="true"` is already present on this element. No action needed.

### 21. [Performance] No image optimization needed
- **Impact:** The page uses zero raster images. All graphics are SVG inline or CSS. This is excellent for performance.

### 22. [Best Practices] No HTTPS issues
- **Impact:** GitHub Pages serves over HTTPS by default. No mixed content.

### 23. [Performance] CSS is not minified
- **File:** `css/style.css` (1167 lines)
- **Audit:** `unminified-css`
- **Impact:** Approximately 25KB unminified. Minification would save ~30% (~7-8KB).
- **Fix:** Add a build step or use a CDN that auto-minifies. For GitHub Pages, consider minifying before deployment.

### 24. [Performance] JS is not minified
- **File:** `js/main.js` (253 lines)
- **Audit:** `unminified-javascript`
- **Impact:** Approximately 7KB unminified. Minor savings.
- **Fix:** Same as CSS -- minify before deployment.

### 25. [Best Practices] No Content Security Policy header
- **Audit:** `csp-xss`
- **Impact:** GitHub Pages does not allow custom headers natively. Can be addressed via a `<meta>` tag CSP, but this is low priority for a static landing page.

### 26. [Accessibility] Typing animation may cause issues for screen readers
- **File:** `js/main.js`, lines 125-162
- **Audit:** Manual
- **Impact:** The typing effect constantly updates `textContent`, which may cause screen reader verbosity. The element lacks `aria-live` attributes.
- **Fix:** Add `aria-live="polite"` to the typing container or wrap it in an `aria-hidden="true"` element with a static `sr-only` alternative:
```html
<span class="sr-only">Connect, manage, and scale your AI workforce.</span>
<span class="hero__typing" id="heroTyping" aria-hidden="true"></span>
```

### 27. [Accessibility] No skip-to-content link
- **File:** `index.html`
- **Audit:** `bypass`
- **Impact:** Keyboard users must tab through all nav links before reaching main content.
- **Fix:** Add a visually hidden skip link as the first element in `<body>`:
```html
<a href="#hero" class="sr-only sr-only--focusable">Skip to main content</a>
```

### 28. [SEO] Missing structured data (JSON-LD)
- **Audit:** `structured-data`
- **Impact:** No schema.org markup for Organization or WebSite.
- **Fix:** Add a JSON-LD script block:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ajolote Labs",
  "url": "https://pablocreelrc.github.io/ajolote-labs-website/",
  "description": "The Orchestration Layer for Business Agents"
}
</script>
```

---

## Summary of Required Fixes (by file)

### `index.html`
| Line | Fix | Priority |
|------|-----|----------|
| 58 | Add `aria-hidden="true" role="presentation"` to canvas | Critical |
| `<head>` | Add OG/Twitter meta tags | High |
| `<head>` | Add `<link rel="canonical">` | High |
| `<head>` | Add `<meta name="theme-color">` | Medium |
| 10 | Async-load Google Fonts or reduce weights | Critical/Medium |
| 25 | Change logo `href="#"` to `href="/"` | Medium |
| 40 | Add `aria-expanded` to burger button | Medium |
| 49 | Add `role="dialog"` to mobile menu | Medium |
| 349-350 | Fix Privacy/Terms `href="#"` links | Medium |
| After `<body>` | Add skip-to-content link | Low |
| `<head>` | Add JSON-LD structured data | Low |
| 73-74 | Add `sr-only` alternative for typing text | Low |

### `css/style.css`
| Line | Fix | Priority |
|------|-----|----------|
| 22-23 | Increase contrast of `--text-muted` and `--text-dim` | High |
| All | Minify for production | Low |

### `js/main.js`
| Line | Fix | Priority |
|------|-----|----------|
| 42-101 | Pause canvas animation when off-screen | High |
| 222-235 | Toggle `aria-expanded` and `aria-label` on burger | Medium |
| All | Minify for production | Low |

### New files needed
| File | Fix | Priority |
|------|-----|----------|
| `robots.txt` | Create with Allow all | Medium |
| `sitemap.xml` | Create with single URL entry | Medium |
| `og-image.png` | Create/add social sharing image | High |
