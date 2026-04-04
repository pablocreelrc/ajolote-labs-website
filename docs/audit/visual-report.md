# Visual Audit Report — Ajolote Labs Landing Page

**Date:** 2026-04-04  
**Method:** Playwright screenshots at 5 breakpoints (local file render)  
**Screenshots:** `docs/audit/screenshots/`

---

## CRITICAL FINDING: All Content Below Hero Is Invisible

The `.reveal` CSS class sets `opacity: 0; transform: translateY(30px)` on every section. The IntersectionObserver in `main.js` adds `.visible` on scroll — but this means:

1. **Every section below the hero is completely hidden** on initial render
2. **SEO crawlers** (Googlebot) may not see any content below the fold
3. **Users with JS disabled** see a hero + infinite dark void
4. **The page looks broken** — just a title floating in darkness with empty space for thousands of pixels

**This is the #1 issue to fix.** Either use CSS-only animations (`@keyframes` with `animation-fill-mode: forwards`) or add a `<noscript>` fallback that removes the reveal styling.

---

## Breakpoint-by-Breakpoint Analysis

### Mobile S — 320x480 (iPhone SE)

**Layout:**
- Hero text ("The Orchestration Layer for Business Agents") wraps to 6 lines — too many line breaks, looks fragmented
- "Orchestration" is too long for this width — consider shorter headline for mobile
- Badge ("SYS.STATUS: ONLINE") fits but is tiny (barely readable)
- Buttons stack vertically — good, but "Join the Waitlist" button is full-width which works

**Typography:**
- Hero title font size is too large relative to the viewport — fills the entire screen with just the headline
- Typing subtitle text is extremely small (~11px effective)
- Stats labels ("AVG. RESPONSE", "UPTIME SLA") are unreadable at this size

**Spacing:**
- No vertical breathing room between badge and title
- Stats bar is cramped with all 3 stats squeezed together

**Critical:**
- Everything below hero = dark void (reveal animation issue)
- Hamburger menu icon is present but may be too small for touch (needs 44px minimum)

### Mobile L — 375x812 (iPhone 14)

**Layout:**
- Slightly better than 320 but same fundamental issues
- Hero headline still wraps to 5-6 lines
- Buttons stack well

**Typography:**
- Title is marginally more readable but still dominates the viewport
- Terminal prefix `$>` and typing text are very small

**Spacing:**
- Better than 320 but hero content feels cramped between badge and buttons
- Massive gap between hero actions and stats (56px margin-bottom)

**Critical:**
- Same invisible content issue — entire page is hero + void
- Footer visible at very bottom but text is microscopic

### Tablet — 768x1024 (iPad)

**Layout:**
- Hero looks better at this width — title wraps naturally to 3 lines
- Nav shows full links (not burger) — this is the right breakpoint behavior
- Vision section (terminal mockup) IS partially visible on tablet — the IntersectionObserver seems to fire for some elements in the initial viewport on taller screens

**Typography:**
- Good title sizing at this breakpoint
- Terminal mockup text is readable
- Section tags ("// THE PROBLEM") are properly styled

**Spacing:**
- Good vertical rhythm in hero
- Vision section has proper grid layout (text left, terminal right)

**Issues:**
- Feature cards and lower sections still invisible
- The "How It Works" flow section would need to show 2-column grid — untestable since hidden

### Laptop — 1280x800

**Layout:**
- Hero is well-proportioned at this width
- Nav elements are well-spaced
- Title wraps to 2 lines naturally ("The Orchestration Layer" / "for Business Agents.")

**Typography:**
- Excellent title sizing
- Subtitle typing animation and terminal prefix are readable
- Stats are clearly laid out with dividers

**Issues:**
- ALL content below hero fold is invisible (same reveal issue)
- Page is effectively 90% blank dark space
- No particle canvas visible (may need interaction or time to render)

### Desktop — 1440x900

**Layout:**
- Best presentation of the hero
- Title is large and impactful
- Nav is clean with good spacing

**Typography:**
- Title hierarchy works well (badge → title → subtitle → CTA → stats)
- "Business Agents." gradient text is the visual anchor

**Issues:**
- Same invisible content problem
- The particle canvas background shows subtle dots but no connections visible in static capture
- Page appears to be just a hero with a footer at the bottom — all mid-page sections are dark voids

---

## Cross-Breakpoint Issues

| Issue | Severity | Affects |
|-------|----------|---------|
| **All content below hero invisible** (reveal opacity:0) | CRITICAL | All breakpoints |
| Hero title too large on mobile, causes excessive wrapping | HIGH | 320, 375 |
| Stats text unreadable on mobile | HIGH | 320, 375 |
| No visible content for SEO crawlers | HIGH | All |
| Footer text microscopic on mobile | MEDIUM | 320, 375 |
| Badge text very small on all breakpoints | MEDIUM | All |
| No noscript fallback for JS-disabled users | MEDIUM | All |
| Particle canvas not visible in static render | LOW | All |
| Ghost button border barely visible on dark bg | LOW | All |

---

## Overall Visual Impression

**What works:**
- The hero section is decent at laptop/desktop widths
- Typography pairing (Syne headlines) is bold and modern
- Cyan-on-dark color scheme is clean (if generic)
- Nav glassmorphism effect is subtle and appropriate
- CTA button glow effect is attention-getting

**What's terrible:**
1. **The page is 90% dark void** — the reveal animations destroy the experience for anyone who doesn't scroll slowly
2. **Generic "every AI startup" aesthetic** — dark mode + cyan + particle network + glass cards = 2024 template feel
3. **No visual personality** — nothing says "Ajolote" or "Mexico tech" or anything distinctive
4. **No images, illustrations, or diagrams** — just text and empty boxes
5. **Mobile experience is broken** — oversized hero text with invisible everything else
6. **Terminal mockup is the most interesting element** but it's hidden behind the reveal bug
7. **No social proof** — stats say "50ms" and "99.9%" but there's no logos, testimonials, or credibility signals
8. **CTA is "mailto:"** — no actual waitlist form, feels unfinished
