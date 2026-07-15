# Ajolote Labs Landing Page — Audit & Redesign Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Audit the current Ajolote Labs landing page with every available tool (Lighthouse, Playwright screenshots, Figma design analysis), then redesign it into a production-grade, mobile-first, visually striking tech landing page.

**Architecture:** Two-phase approach — Phase 1 runs all audits in parallel to produce a concrete findings report, Phase 2 uses those findings + Figma MCP design iteration + frontend-design skill to rebuild the page section by section.

**Tech Stack:** Lighthouse CLI, Playwright MCP, Figma MCP, axe-core, static HTML/CSS/JS, GitHub Pages

---

## PHASE 1: AUDIT (Tasks 1–4, all run in parallel)

### Task 1: Lighthouse Performance & Quality Audit

**Files:**
- Create: `docs/audit/lighthouse-report.md`

- [ ] **Step 1: Install Lighthouse CLI globally**

```bash
npm install -g lighthouse
```

- [ ] **Step 2: Run Lighthouse against the live GitHub Pages URL**

```bash
lighthouse https://pablocreelrc.github.io/ajolote-labs-website/ --output=json --output=html --output-path=./docs/audit/lighthouse --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo
```

Expected: JSON + HTML report files in `docs/audit/`

- [ ] **Step 3: Extract key scores and failing audits into a summary**

Read the JSON output and create `docs/audit/lighthouse-report.md` with:
- Overall scores for each category (Performance, Accessibility, Best Practices, SEO)
- Every failing audit with its description and impact
- Specific file/line references where fixes are needed
- Priority ranking: Critical > High > Medium > Low

---

### Task 2: Visual Regression Screenshots via Playwright

**Files:**
- Create: `docs/audit/screenshots/` (directory with PNG files)
- Create: `docs/audit/visual-report.md`

- [ ] **Step 1: Install Playwright**

```bash
npx playwright install chromium
```

- [ ] **Step 2: Capture screenshots at 5 breakpoints**

Using Playwright MCP (or a script), capture full-page screenshots at:
- **Mobile S:** 320x480 (iPhone SE)
- **Mobile L:** 375x812 (iPhone 14)
- **Tablet:** 768x1024 (iPad)
- **Laptop:** 1280x800
- **Desktop:** 1440x900

Save to `docs/audit/screenshots/{breakpoint}.png`

- [ ] **Step 3: Write visual audit report**

Create `docs/audit/visual-report.md` documenting for each breakpoint:
- Layout issues (overflow, cramped elements, misalignment)
- Typography problems (too small, too large, unreadable contrast)
- Spacing problems (sections too close, inconsistent padding)
- Interactive element issues (touch targets too small, hover states)
- Overall visual impression and what feels "off"

---

### Task 3: Accessibility Deep-Dive via axe-core

**Files:**
- Create: `docs/audit/accessibility-report.md`

- [ ] **Step 1: Install axe-core CLI**

```bash
npm install -g @axe-core/cli
```

- [ ] **Step 2: Run axe audit on the live page**

```bash
axe https://pablocreelrc.github.io/ajolote-labs-website/ --save docs/audit/axe-results.json
```

- [ ] **Step 3: Create accessibility findings report**

Create `docs/audit/accessibility-report.md` with:
- WCAG 2.1 Level AA violations (critical)
- Missing ARIA roles/labels
- Color contrast failures (specific elements)
- Keyboard navigation issues
- Screen reader problems
- Touch target sizing on mobile

---

### Task 4: Figma Design Analysis & Improved Mockup

**Files:**
- Create: `docs/audit/design-direction.md`

- [ ] **Step 1: Load the figma-use skill (MANDATORY before any Figma tool call)**

Invoke skill: `figma:figma-use`

- [ ] **Step 2: Create a new Figma design file for Ajolote Labs v2**

Use the Figma MCP to create a new file. Generate frames for:
- Mobile layout (375px wide)
- Desktop layout (1440px wide)

Design direction: **"Precision Engineering"** — clean dark interface with sharp geometry, monospace data displays, subtle animated accents. Think Bloomberg Terminal meets Stripe's marketing site. NOT generic dark-mode SaaS template.

Key design decisions to explore in Figma:
- Hero: Replace particle canvas with a cleaner SVG-based architecture diagram showing agent orchestration flow
- Typography: Test bolder heading hierarchy (consider Instrument Sans or Geist for a more engineering feel)
- Color: Push the cyan accent but add a warm secondary (amber/gold) for contrast
- Cards: Try bordered card variants vs. filled cards vs. floating cards
- Spacing: 8px grid system, generous whitespace

- [ ] **Step 3: Document the design direction**

Create `docs/audit/design-direction.md` with:
- Chosen aesthetic and rationale
- Color palette (exact hex values)
- Typography scale
- Component patterns
- Figma file link for reference
- Key differences from current design

---

## PHASE 2: FIX & REDESIGN (Tasks 5–10, sequential)

### Task 5: Consolidate Audit Findings into Action Items

**Files:**
- Create: `docs/audit/ACTION-ITEMS.md`

- [ ] **Step 1: Read all four audit reports**

Read:
- `docs/audit/lighthouse-report.md`
- `docs/audit/visual-report.md`
- `docs/audit/accessibility-report.md`
- `docs/audit/design-direction.md`

- [ ] **Step 2: Create prioritized action items**

Create `docs/audit/ACTION-ITEMS.md` with a single prioritized list combining all findings:

```markdown
## Critical (Must fix — breaks core UX or scores)
- [ ] Item description [Source: Lighthouse/axe/Visual/Design]

## High (Significantly improves quality)
- [ ] Item description [Source: ...]

## Medium (Polish and refinement)
- [ ] Item description [Source: ...]

## Design Overhaul (from Figma direction)
- [ ] Item description
```

- [ ] **Step 3: Commit audit reports**

```bash
git add docs/audit/
git commit -m "docs: add audit reports (Lighthouse, Playwright, axe-core, Figma design direction)"
```

---

### Task 6: Fix Critical SEO & Meta Issues

**Files:**
- Modify: `index.html` (head section, lines 1–13)

- [ ] **Step 1: Add Open Graph and Twitter meta tags**

Add to `<head>` in `index.html`:

```html
<meta property="og:title" content="Ajolote Labs | AI Agent Orchestration">
<meta property="og:description" content="Connect, manage, and scale your AI workforce. The orchestration layer for business agents.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://pablocreelrc.github.io/ajolote-labs-website/">
<meta property="og:image" content="og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://pablocreelrc.github.io/ajolote-labs-website/">
```

- [ ] **Step 2: Add structured data (JSON-LD)**

Add before closing `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Ajolote Labs",
  "description": "The orchestration layer for business agents",
  "url": "https://pablocreelrc.github.io/ajolote-labs-website/",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web"
}
</script>
```

- [ ] **Step 3: Verify and commit**

Open `index.html` and verify all tags are correctly placed.

```bash
git add index.html
git commit -m "fix: add OG tags, Twitter card, canonical URL, and JSON-LD structured data"
```

---

### Task 7: Fix Accessibility Violations

**Files:**
- Modify: `index.html` (multiple sections)
- Modify: `css/style.css` (contrast fixes, focus states, touch targets)

- [ ] **Step 1: Fix all ARIA and semantic HTML issues in index.html**

Based on axe-core findings, fix:
- Add `role="navigation"` to mobile menu
- Add `aria-expanded` to burger button
- Add `lang` attributes if mixing languages
- Ensure all links have discernible text
- Add skip-to-content link at top of body
- Fix heading hierarchy (ensure no skipped levels)

- [ ] **Step 2: Fix color contrast in CSS**

Based on axe-core contrast failures, update `css/style.css`:
- `--text-dim` and `--text-muted` likely fail WCAG AA on dark background — increase lightness
- Ensure all interactive elements have 4.5:1 contrast ratio minimum
- Add visible focus states for keyboard navigation:

```css
:focus-visible {
    outline: 2px solid var(--cyan);
    outline-offset: 2px;
}
```

- [ ] **Step 3: Fix touch targets**

Ensure all clickable elements are at least 44x44px on mobile:

```css
@media (max-width: 768px) {
    .nav__burger { min-width: 44px; min-height: 44px; }
    .mobile-menu__link { padding: 12px 24px; }
    .btn { min-height: 48px; }
}
```

- [ ] **Step 4: Test and commit**

```bash
axe https://pablocreelrc.github.io/ajolote-labs-website/ --save docs/audit/axe-results-post-fix.json
git add index.html css/style.css
git commit -m "fix: resolve accessibility violations (contrast, ARIA, focus states, touch targets)"
```

---

### Task 8: Performance Optimization

**Files:**
- Modify: `index.html` (font loading, resource hints)
- Modify: `css/style.css` (reduce unused CSS, optimize animations)
- Modify: `js/main.js` (lazy-load canvas, reduce paint)

- [ ] **Step 1: Optimize font loading**

In `index.html`, add `font-display: swap` and preload critical fonts:

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap" as="style">
```

Switch Google Fonts URL to include `&display=swap` (already present — verify).

- [ ] **Step 2: Optimize canvas animation for performance**

In `js/main.js`, reduce particle count and add `will-change`:
- Reduce desktop particles from 80 to 60
- Add `requestAnimationFrame` throttle (skip frames if tab is hidden)
- Add `will-change: transform` to animated CSS elements
- Defer canvas init until after DOMContentLoaded + 100ms

```javascript
// Add to top of canvas section
if (document.hidden) return;
```

- [ ] **Step 3: Add resource hints and defer non-critical CSS**

```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.gstatic.com">
```

Move the JS script tag to use `defer`:

```html
<script src="js/main.js" defer></script>
```

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css js/main.js
git commit -m "perf: optimize font loading, canvas animation, and resource hints"
```

---

### Task 9: Visual Redesign (using Figma direction + frontend-design skill)

**Files:**
- Modify: `index.html` (structural changes to all sections)
- Modify: `css/style.css` (complete style overhaul)
- Modify: `js/main.js` (new interactions)

**This is the big one.** Invoke `frontend-design:frontend-design` skill for the redesign execution.

- [ ] **Step 1: Redesign the Hero section**

Based on the Figma design direction, rebuild the hero:
- Replace particle canvas with a cleaner visual (SVG architecture diagram or CSS-only animated gradient mesh)
- Stronger typography hierarchy
- More impactful badge/pill styling
- Better CTA button design with micro-interactions
- Stats bar with better visual separation

- [ ] **Step 2: Redesign the Vision/Problem section**

- Improve terminal mockup with actual typing animation in the terminal itself
- Better grid layout with visual weight balance
- Add a subtle background pattern or illustration

- [ ] **Step 3: Redesign Feature Cards**

- More distinctive card design (not generic bordered boxes)
- Consider asymmetric layout (featured card larger)
- Better icon treatment
- Hover states that feel premium

- [ ] **Step 4: Redesign Architecture/Flow section**

- Replace simple numbered nodes with a proper flow diagram
- Add animated connecting lines (CSS or SVG)
- Make the flow feel like a real system diagram

- [ ] **Step 5: Redesign Use Cases section**

- Consider tab or accordion pattern instead of 3 equal cards
- Add visual hierarchy (primary use case gets more space)
- More compelling content layout

- [ ] **Step 6: Redesign CTA and Footer**

- CTA needs more visual punch (gradient background, larger scale)
- Footer: add social links, newsletter signup potential
- Consistent spacing with rest of page

- [ ] **Step 7: Verify responsiveness at all 5 breakpoints**

Re-run Playwright screenshots at 320, 375, 768, 1280, 1440px and compare to pre-redesign.

- [ ] **Step 8: Commit redesign**

```bash
git add index.html css/style.css js/main.js
git commit -m "feat: complete visual redesign based on audit findings and Figma direction"
```

---

### Task 10: Final Audit, Figma Sync & Deploy

**Files:**
- Modify: Various (final fixes)

- [ ] **Step 1: Re-run Lighthouse**

```bash
lighthouse https://pablocreelrc.github.io/ajolote-labs-website/ --output=json --output-path=./docs/audit/lighthouse-final --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo
```

Target: All scores 90+

- [ ] **Step 2: Re-run axe-core**

```bash
axe https://pablocreelrc.github.io/ajolote-labs-website/
```

Target: Zero violations

- [ ] **Step 3: Re-run Playwright screenshots at all breakpoints**

Capture final screenshots and save to `docs/audit/screenshots-final/`

- [ ] **Step 4: Update Figma file with final implementation**

Use `figma:figma-generate-design` to push the final HTML back to Figma as a reference frame — keeping code and design in sync.

- [ ] **Step 5: Push everything to GitHub**

```bash
git add -A
git commit -m "docs: add final audit results, all scores 90+"
git push origin master
```

- [ ] **Step 6: Verify live deployment**

Check https://pablocreelrc.github.io/ajolote-labs-website/ loads correctly.

---

## Tool Summary

| Phase | Tool | Purpose |
|-------|------|---------|
| Audit | **Lighthouse CLI** | Performance, accessibility, SEO, best practices scores |
| Audit | **Playwright MCP** | Screenshots at 5 breakpoints (320, 375, 768, 1280, 1440) |
| Audit | **axe-core CLI** | Deep WCAG 2.1 accessibility violations |
| Audit | **Figma MCP** | Create v2 design mockups, establish design direction |
| Fix | **frontend-design skill** | Execute the visual redesign with high design quality |
| Fix | **Figma MCP** | Sync final implementation back to Figma |
| Verify | **Lighthouse CLI** | Confirm scores 90+ post-fix |
| Verify | **axe-core CLI** | Confirm zero violations post-fix |
| Verify | **Playwright MCP** | Final visual regression screenshots |
