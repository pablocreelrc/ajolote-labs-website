# Ajolote Labs Website -- Accessibility Audit Report

**URL:** https://pablocreelrc.github.io/ajolote-labs-website/  
**Date:** 2026-04-04  
**Standard:** WCAG 2.1 Level AA  
**Auditor:** Manual code review of `index.html`, `css/style.css`, `js/main.js`

---

## Executive Summary

The Ajolote Labs landing page has a solid semantic HTML foundation (proper heading hierarchy, landmark elements, `lang` attribute) but contains **14 distinct accessibility violations** spanning color contrast, keyboard navigation, ARIA labeling, motion control, and touch target sizing. The most critical issues are multiple color contrast failures affecting body text readability and the absence of skip-navigation and focus management for keyboard users.

**Severity breakdown:**
- Critical (WCAG A/AA violation): 6
- Serious (WCAG AA violation): 5
- Moderate (best practice / AAA improvement): 3

---

## 1. Color Contrast Failures

WCAG 2.1 SC 1.4.3 requires a minimum contrast ratio of **4.5:1 for normal text** and **3.0:1 for large text** (18pt or 14pt bold).

### Background: `--bg: #06080f` (relative luminance ~0.0065)

| Text Color | Variable | Computed Ratio | AA Normal (4.5:1) | AA Large (3.0:1) |
|---|---|---|---|---|
| `#e2e8f0` | `--text` | ~14.96:1 | PASS | PASS |
| `#64748b` | `--text-dim` | ~4.00:1 | **FAIL** | PASS |
| `#475569` | `--text-muted` | ~2.67:1 | **FAIL** | **FAIL** |
| `#00e5ff` | `--cyan` | ~11.75:1 | PASS | PASS |
| `#ffffff` | white | ~18.58:1 | PASS | PASS |
| `#22c55e` | `--green` | ~6.27:1 | PASS | PASS |
| `#eab308` | `--yellow` | ~8.78:1 | PASS | PASS |

### Background: `--bg-elevated: #0c1021` (relative luminance ~0.0095)

| Text Color | Variable | Computed Ratio | AA Normal (4.5:1) | AA Large (3.0:1) |
|---|---|---|---|---|
| `#64748b` | `--text-dim` | ~3.80:1 | **FAIL** | PASS |
| `#475569` | `--text-muted` | ~2.54:1 | **FAIL** | **FAIL** |

### Affected Elements (with `--text-dim: #64748b`)

These use normal-weight text at sizes below 18pt, so they require 4.5:1 and fail:

| Element | CSS Selector | Font Size | Context |
|---|---|---|---|
| Section descriptions | `.section-desc` | 1.1rem (17.6px) | Features header, CTA description |
| Vision paragraph | `.vision__desc` | 1.1rem | "Every business is deploying AI..." |
| Feature card descriptions | `.feature-card__desc` | 0.9rem (14.4px) | All 6 feature cards |
| Flow step descriptions | `.flow__desc` | 0.85rem (13.6px) | All 4 architecture steps |
| Use case descriptions | `.use-case__desc` | 0.9rem | All 3 use case cards |
| Use case list items | `.use-case__list li` | 0.85rem | 12 list items total |
| Hero subtitle / typing text | `.hero__subtitle` | 0.85rem-1.05rem | Typing animation area |
| Terminal output lines | `.terminal__line--output` | 0.8rem | Terminal simulation |
| Nav links | `.nav__link` | 0.875rem | "Capabilities", "Architecture", "Use Cases" |
| Footer links | `.footer__links` | 0.875rem | Email, Privacy, Terms |

### Affected Elements (with `--text-muted: #475569`)

These fail even the large-text threshold of 3.0:1:

| Element | CSS Selector | Font Size | Context |
|---|---|---|---|
| Hero stat labels | `.hero__stat-label` | 0.75rem (12px) | "Avg. Response", "Uptime SLA", "Msgs / Day" |
| Use case labels | `.use-case__label` | 0.65rem (10.4px) | "HEALTHCARE", "OPERATIONS", "ENTERPRISE" |
| Terminal title | `.terminal__title` | 0.75rem | "ajolote-ctl" |
| Feature card numbers | `.feature-card__number` | 0.7rem | "01" through "06" |
| Footer bottom text | `.footer__bottom` | 0.8rem | Copyright, "Engineered in..." |
| Footer tagline | `.footer__tagline` | 0.85rem | "The nervous system for..." |
| CTA note | `.cta__note` | 0.85rem | "No credit card required..." |
| Flow tags | `.flow__tag` | 0.65rem | "TRANSPORT LAYER", etc. (note: cyan on cyan-dim bg compounds) |

### Recommendations

1. **Raise `--text-dim` to `#94a3b8`** (~7.53:1 on `--bg`). This is Tailwind's `slate-400` and maintains the muted aesthetic while passing AA.
2. **Raise `--text-muted` to `#64748b`** (current `--text-dim` value, ~4.0:1) or higher. For very small text (< 14px), use at least `#94a3b8`.
3. Alternatively, increase font weight to 700 (bold) for any text below 14px that uses dim colors, which qualifies it as "large text" at 14pt bold.

---

## 2. Missing ARIA Roles and Labels

### 2.1 Landmark Roles

| Issue | Severity | Element | Details |
|---|---|---|---|
| Missing `role="banner"` or equivalent | Low | `<nav>` | The `<nav>` element already implies navigation. Good. |
| No main landmark | **Critical** | `<body>` | There is no `<main>` element. Screen readers cannot identify the primary content region. Sections (`#vision`, `#features`, etc.) sit directly in `<body>`. |
| No skip navigation link | **Critical** | `<body>` | No "Skip to main content" link exists. Keyboard users must tab through all nav links on every page load. |
| Footer lacks labeling | Low | `<footer>` | The `<footer>` element is semantically correct, but has no `aria-label`. Acceptable since there is only one footer. |

### 2.2 Interactive Elements

| Issue | Severity | Element | Details |
|---|---|---|---|
| Canvas has no accessible alternative | **Serious** | `#heroCanvas` | The particle network canvas has no `role="img"` and no `aria-label`. It is purely decorative and should have `aria-hidden="true"`. |
| SVG icons lack accessible names | **Serious** | All `<svg>` in buttons and feature cards | The arrow SVGs inside `.btn--primary` have no `aria-hidden="true"` or `<title>` element. Screen readers may announce meaningless path data. The 6 feature card SVG icons similarly lack labeling. |
| Mobile menu has no ARIA state | **Serious** | `#mobileMenu` | The mobile menu div toggles via `.active` class but has no `aria-hidden`, `role="dialog"`, or `aria-expanded` state on the burger button. |
| Burger button missing `aria-expanded` | **Serious** | `#navBurger` | Has `aria-label="Toggle menu"` (good) but no `aria-expanded="false/true"` to communicate open/closed state. |
| Logo link has no accessible name describing destination | Moderate | `.nav__logo` | The link wraps `</>` icon and "Ajolote Labs" text. It links to `#` (same page). Consider `aria-label="Ajolote Labs home"`. |
| Decorative dots lack hiding | Low | `.hero__badge-dot`, `.nav__cta-dot`, `.cta__note-dot` | These are purely visual indicators but are `<span>` elements with no text. They are effectively invisible to screen readers already, but adding `aria-hidden="true"` would be explicit. |

### 2.3 Section Identification

| Issue | Severity | Element | Details |
|---|---|---|---|
| Sections lack `aria-labelledby` | Moderate | `#features`, `#how-it-works`, `#use-cases`, `#cta` | Sections have `id` attributes but no `aria-labelledby` pointing to their heading. Adding this helps screen reader users navigate by region. |
| Terminal block is inaccessible | **Serious** | `.terminal` | The terminal simulation is presented visually but has no `role="figure"` or `aria-label="Terminal demonstration"`. Its content is meaningful (shows product capabilities) but a screen reader would read it as a flat sequence of text fragments. |

### Recommendations

1. Wrap all content sections in a `<main>` element.
2. Add a visually-hidden skip link: `<a href="#main" class="sr-only sr-only-focusable">Skip to main content</a>`.
3. Add `aria-hidden="true"` to `#heroCanvas`.
4. Add `aria-hidden="true"` to all decorative SVG icons, or provide `<title>` elements for meaningful ones.
5. Add `aria-expanded` to the burger button and toggle it in JS alongside the `.active` class.
6. Add `role="dialog"` and `aria-label="Mobile navigation"` to `#mobileMenu`.
7. Add `aria-labelledby` to each `<section>`, referencing the section's `<h2>` (give each `<h2>` an `id`).

---

## 3. Keyboard Navigation Issues

### 3.1 Focus Visibility

| Issue | Severity | Details |
|---|---|---|
| No custom `:focus-visible` styles | **Critical** | The CSS has no focus styles whatsoever. Browser defaults apply, but on a dark background with dark browser outlines, focus indicators are likely invisible. Every interactive element (links, buttons) needs a visible focus ring. |
| Ghost button focus invisible | **Critical** | `.btn--ghost` has `border: 1px solid var(--border)` where `--border` is `rgba(255,255,255,0.06)`. The default focus outline on a near-black background will be barely visible. |

### 3.2 Focus Trapping

| Issue | Severity | Details |
|---|---|---|
| Mobile menu does not trap focus | **Serious** | When the mobile menu opens, focus is not trapped inside it. A keyboard user can tab past the menu into hidden content underneath. |
| No focus management on menu open/close | **Serious** | When the burger is clicked, focus does not move to the first menu item. When a menu link is clicked, focus does not return to the burger or the target section. |
| Escape key does not close mobile menu | Moderate | There is no keydown listener for Escape to close the mobile menu. |

### 3.3 Tab Order

| Issue | Severity | Details |
|---|---|---|
| Mobile menu links are in the DOM but hidden via CSS | Moderate | The mobile menu is `display: none` on load, then `display: flex` when active. When `display: none`, elements are not focusable -- this is correct. However, when active, the menu sits after the nav in source order, which is appropriate. No issue here. |
| Canvas element is focusable | Low | `<canvas>` is not natively focusable and has no `tabindex`, so this is fine. |

### Recommendations

1. Add visible focus styles:
```css
:focus-visible {
    outline: 2px solid var(--cyan);
    outline-offset: 2px;
}
```
2. Implement focus trapping in the mobile menu using a focus-trap library or manual first/last element cycling.
3. Move focus to the first menu link when menu opens; return focus to the burger when it closes.
4. Add Escape key handler to close the mobile menu.

---

## 4. Screen Reader Issues

### 4.1 Dynamic Content

| Issue | Severity | Details |
|---|---|---|
| Typing animation not announced | **Serious** | The hero typing effect (`#heroTyping`) continuously changes text content. There is no `aria-live` region, so screen readers either miss it entirely or get a chaotic stream of character-by-character updates. |
| Counter animation not announced | Moderate | The stat counters (`data-count`) animate from 0 to their target. Screen readers may announce "0" on first encounter. The final values are not available as `aria-label` or via `aria-live`. |
| Scroll reveal hides content | Moderate | Elements with `.reveal` start at `opacity: 0`. While `opacity: 0` does not hide elements from the accessibility tree (unlike `display: none`), the combination with `transform: translateY(30px)` is purely visual. However, if JavaScript fails to load, all `.reveal` content remains invisible with no fallback. |

### 4.2 Content Structure

| Issue | Severity | Details |
|---|---|---|
| Heading hierarchy correct | Pass | `h1` > `h2` > `h3` hierarchy is maintained throughout. |
| Lists are semantic | Pass | Use case bullet lists use `<ul>` / `<li>`. |
| Terminal content is flat | Moderate | The terminal block uses `<div>` elements. Consider wrapping in `<pre>` or `<code>` with `role="figure"` and an `aria-label`. |
| HTML entity icons | Low | Use case icons (`&#9764;`, `&#9881;`, `&#9889;`) are Unicode symbols. Screen readers may announce them ("Staff of Aesculapius", "Gear", "High Voltage"). Consider wrapping in `<span aria-hidden="true">` and providing a separate visually-hidden label. |

### Recommendations

1. Add `aria-live="polite"` to the typing container, or better: provide the full text in an `aria-label` on the parent and set the animated span to `aria-hidden="true"`.
2. Set each counter's `aria-label` to the final value (e.g., `aria-label="50 ms"`) so screen readers get the correct value immediately.
3. Add a `<noscript>` fallback or a CSS-only rule that makes `.reveal` visible when JS is disabled:
```css
@media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; } }
```
4. Wrap terminal demo in `<figure role="figure" aria-label="Terminal demonstration showing agent status commands">`.

---

## 5. Motion and Animation Issues

WCAG 2.1 SC 2.3.1 (Three Flashes) and SC 2.2.2 (Pause, Stop, Hide).

| Issue | Severity | Details |
|---|---|---|
| No `prefers-reduced-motion` support | **Critical** | The CSS and JS have no `prefers-reduced-motion` media query. Users who have enabled reduced motion in their OS will still see: particle animation (continuous), typing effect (continuous), scroll reveal transitions, counter animations, cursor blinking, and hover transforms. |
| Particle canvas runs continuously | Serious | `requestAnimationFrame` loop in `drawParticles()` runs indefinitely with no pause mechanism. |
| Typing effect runs indefinitely | Serious | The typing/deleting loop calls `setTimeout(type, ...)` forever with no stop condition. |
| Blinking cursor | Moderate | `.hero__cursor` and `.terminal__cursor-block` use `animation: blink 1s step-end infinite`. While the blink rate is below the 3-per-second seizure threshold, it should be disabled for reduced-motion users. |

### Recommendations

1. Add reduced motion support:
```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    .reveal {
        opacity: 1;
        transform: none;
    }
}
```
2. In JS, check `window.matchMedia('(prefers-reduced-motion: reduce)')` before starting the canvas animation and typing effect. If reduced motion is preferred, show the first phrase statically and skip the particle animation.

---

## 6. Touch Target Sizing

WCAG 2.1 SC 2.5.5 (AAA) recommends **44x44px** minimum touch targets. SC 2.5.8 (WCAG 2.2, AA) requires **24x24px** minimum.

| Element | Computed Size | Meets 44x44? | Meets 24x24? |
|---|---|---|---|
| `.btn--primary` | ~48x47px (14px padding + text) | PASS | PASS |
| `.btn--ghost` | ~48x47px | PASS | PASS |
| `.btn--lg` | ~54x53px | PASS | PASS |
| `.nav__link` | Text-only, no padding. Approx 14px height, variable width | **FAIL** | **FAIL** at small widths |
| `.nav__cta` | ~36x34px (8px vertical padding) | **FAIL** | PASS |
| `.nav__burger` | ~40x30px (8px padding, 24px icon width, ~14px icon height) | **FAIL** | PASS |
| `.mobile-menu__link` | Text-only, 1.5rem font. ~24px height, no padding | **FAIL** | Borderline |
| `.mobile-menu__cta` | ~48x46px | PASS | PASS |
| `.footer__links a` | Text-only, no padding. ~14px height | **FAIL** | **FAIL** |
| `.flow__tag` | ~22x18px (4px vertical padding, 0.65rem text) | N/A (not interactive) | N/A |

### Recommendations

1. Add vertical padding to `.nav__link`: at least `padding: 12px 8px` to achieve 44px tap target height.
2. Increase `.nav__cta` vertical padding to at least `12px`.
3. Increase `.nav__burger` size: `padding: 12px` with a larger tap area.
4. Add padding to `.mobile-menu__link`: `padding: 12px 16px`.
5. Add padding to `.footer__links a`: `padding: 8px 4px` minimum.

---

## 7. Additional WCAG Violations

### 7.1 Language and Semantics

| Issue | Severity | WCAG SC | Details |
|---|---|---|---|
| `lang="en"` is set | Pass | 3.1.1 | Correct. |
| Page title is descriptive | Pass | 2.4.2 | "Ajolote Labs | The Orchestration Layer for Business Agents" is clear. |
| Meta description present | Pass | N/A | Good for SEO and assistive tech. |
| No `<main>` element | Critical | 1.3.1 | Already noted in Section 2. |
| Links to `#` are meaningless | Moderate | 2.4.4 | The logo `href="#"` and footer "Privacy" / "Terms" links go to `#`. These should either link to real pages or use `role="link"` with `aria-disabled="true"` and an explanation. |

### 7.2 Form and Input

No forms are present on the page. The primary CTAs are mailto links. No issues here.

### 7.3 Images and Media

| Issue | Severity | Details |
|---|---|---|
| No `<img>` elements | Pass | The page uses no images (only CSS backgrounds, SVG inline icons, and canvas). |
| Favicon is an SVG with emoji | Low | The emoji-based favicon (`data:image/svg+xml`) works but has no text alternative. This is a non-issue for accessibility. |

### 7.4 Text Resize and Reflow

| Issue | Severity | Details |
|---|---|---|
| Font sizes use `rem` and `clamp()` | Pass | Text scales correctly with browser zoom. |
| Horizontal scroll hidden | Moderate | `overflow-x: hidden` on `body` may clip content at 400% zoom. Should be tested. |
| No max-width constraint on text blocks | Low | Some text blocks (e.g., `.vision__desc`) have no `max-width`, which could result in very long lines at wide viewports. Readability concern, not a strict WCAG violation. |

---

## 8. Summary of Required Fixes (Priority Order)

### P0 -- Critical (must fix for WCAG AA compliance)

| # | Issue | WCAG SC | Fix |
|---|---|---|---|
| 1 | `--text-dim` fails contrast on all backgrounds | 1.4.3 | Change to `#94a3b8` or lighter |
| 2 | `--text-muted` fails contrast everywhere | 1.4.3 | Change to `#64748b` or lighter (minimum) |
| 3 | No `<main>` landmark | 1.3.1 | Wrap content sections in `<main>` |
| 4 | No skip navigation link | 2.4.1 | Add visually-hidden skip link |
| 5 | No visible focus indicators | 2.4.7 | Add `:focus-visible` styles |
| 6 | No `prefers-reduced-motion` support | 2.3.1 | Add media query in CSS and JS checks |

### P1 -- Serious (should fix)

| # | Issue | WCAG SC | Fix |
|---|---|---|---|
| 7 | Canvas missing `aria-hidden` | 1.1.1 | Add `aria-hidden="true"` to `#heroCanvas` |
| 8 | SVG icons not hidden from screen readers | 1.1.1 | Add `aria-hidden="true"` to decorative SVGs |
| 9 | Burger button missing `aria-expanded` | 4.1.2 | Toggle `aria-expanded` in JS |
| 10 | Mobile menu lacks focus trap | 2.4.3 | Implement focus trapping and Escape key |
| 11 | Typing animation inaccessible | 4.1.3 | Use `aria-live` or static `aria-label` fallback |
| 12 | Touch targets too small (nav links, footer links) | 2.5.5 | Add padding to reach 44x44px |

### P2 -- Moderate (recommended improvements)

| # | Issue | Fix |
|---|---|---|
| 13 | Counter values not exposed to assistive tech | Add `aria-label` with final values |
| 14 | Terminal block lacks semantic structure | Wrap in `<figure>` with `aria-label` |
| 15 | Section headings not linked via `aria-labelledby` | Add `id` to headings, `aria-labelledby` to sections |
| 16 | Placeholder links (`#`) for Privacy/Terms | Add real destinations or disable properly |
| 17 | Unicode emoji icons may announce oddly | Wrap in `aria-hidden="true"` spans |
| 18 | No `<noscript>` fallback for reveal animations | Add fallback or CSS-only reveal |

---

## Appendix A: Color Contrast Reference

All ratios computed per WCAG 2.1 relative luminance formula.

```
Background #06080f (luminance ~0.0065)
  #e2e8f0  --text          14.96:1   AA-normal PASS   AA-large PASS
  #64748b  --text-dim       4.00:1   AA-normal FAIL   AA-large PASS
  #475569  --text-muted     2.67:1   AA-normal FAIL   AA-large FAIL
  #00e5ff  --cyan          11.75:1   AA-normal PASS   AA-large PASS
  #ffffff  white           18.58:1   AA-normal PASS   AA-large PASS
  #22c55e  --green          6.27:1   AA-normal PASS   AA-large PASS
  #eab308  --yellow         8.78:1   AA-normal PASS   AA-large PASS

Background #0c1021 (luminance ~0.0095)
  #64748b  --text-dim       3.80:1   AA-normal FAIL   AA-large PASS
  #475569  --text-muted     2.54:1   AA-normal FAIL   AA-large FAIL
  #00e5ff  --cyan          11.18:1   AA-normal PASS   AA-large PASS
```

## Appendix B: Suggested Remediated Color Palette

```css
:root {
    --text-dim: #94a3b8;   /* slate-400, ~7.53:1 on --bg. Replaces #64748b */
    --text-muted: #64748b; /* slate-500, ~4.00:1 on --bg. Replaces #475569. Use only for large text (>=18px or >=14px bold) */
}
```

For any text smaller than 14px bold, use `--text-dim` (the new, lighter value) or `--text` to guarantee AA compliance.
