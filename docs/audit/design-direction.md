# Ajolote Labs Website v2 -- Design Direction

**Date:** 2026-04-04
**Status:** Design audit + v2 direction
**Author:** Design review for Pablo Creel

---

## Part 1: Audit of Current Design

### What is wrong with v1

The current site is a near-perfect specimen of "Generic AI Startup Template circa 2024." It hits every cliche in the category and would be visually indistinguishable from hundreds of YC-backed SaaS landing pages if you swapped the logo. Specific problems:

**1. The particle network canvas hero is a dead giveaway.**
Every AI/ML startup from 2022-2025 used interconnected dots on a dark canvas. It signals "we downloaded a template" more than "we build sophisticated technology." The mouse-follow interaction adds nothing meaningful.

**2. Cyan-on-near-black is the most overused palette in tech.**
`#00e5ff` on `#06080f` is the default "techy" color scheme. Vercel, countless dev tools, crypto projects, and AI startups all live in this exact space. There is zero brand differentiation. The site could belong to any company.

**3. Glass cards with gradient borders are 2023 artifacts.**
The `backdrop-filter: blur(10px)` cards with gradient-stroke hover effects were novel in the glassmorphism wave. Now they read as dated. The feature cards are interchangeable rectangles with no visual hierarchy -- card 01 looks exactly like card 06.

**4. Typography is safe to the point of invisibility.**
Syne (headings) + Manrope (body) + JetBrains Mono (code) is a reasonable stack, but Syne is now extremely common in tech landing pages. The type scale is standard clamp-based responsive sizing with no rhythm or tension. Every heading feels the same weight.

**5. Layout is a vertical stack of centered sections.**
Hero (centered) -> Problem (2-col grid) -> Features (3-col grid) -> How It Works (4-col grid) -> Use Cases (3-col grid) -> CTA (centered) -> Footer. This is the default SaaS page structure. There is no visual surprise, no asymmetry, no moment that makes someone stop scrolling.

**6. The terminal component is decorative theater.**
The `ajolote-ctl` terminal is a nice idea executed as static styled text. It does not animate, does not respond to anything, and the fake CLI output (`ajolote status --all`) feels performative rather than demonstrative. It should either be real or replaced.

**7. Nothing says "Ajolote" or "Mexico."**
The company is named after the axolotl -- one of the most visually distinctive creatures on earth, native to Mexico City's lake system. The brand has a built-in visual identity gift, and the current site ignores it completely. There is no warmth, no character, no cultural signal. "Engineered in Mexico City + Austin, TX" is buried in the footer in 0.7rem text.

**8. Scanlines and grid overlay are pure noise.**
The CRT scanline effect and the 60px cyan grid overlay add visual clutter without purpose. They make text slightly harder to read and serve no informational or aesthetic function.

**9. Mobile experience is an afterthought.**
The responsive breakpoints just stack everything vertically. The 4-step flow collapses into a plain list with no connectors. The hero loses its visual impact. The terminal overflows horizontally. There is no mobile-specific design thinking.

**10. Content hierarchy is flat.**
Every section uses the same pattern: `section-tag` (mono, cyan, small caps) -> `section-title` (Syne, 800 weight, with one cyan-colored span) -> body text or grid. This repetition creates monotony. The reader has no sense of what matters most.

**11. The stats are unverifiable vanity metrics.**
"50ms Avg. Response," "99.9% Uptime SLA," "10k+ Msgs / Day" -- these are the standard SaaS trust signals, but for an early-stage startup they feel hollow. They count up from zero with a JavaScript animation that adds zero credibility.

**12. The "SYS.STATUS: ONLINE" badge is cringe.**
This pattern was interesting in 2023. Now it reads as trying too hard to seem technical. Same for the `$>` terminal prefix in the hero subtitle.

---

## Part 2: Design Direction for v2

### Aesthetic North Star: "Precision Biology"

The concept: What if a biotech research interface and a Bloomberg terminal had a child raised in Mexico City? Clean, data-rich, technically credible -- but with organic warmth and biological metaphors woven into the structure.

This is NOT another dark-mode hacker aesthetic. It is NOT a friendly SaaS pastel palette either. It occupies a distinctive middle ground: **the precision of engineering documentation with the organic intelligence of biological systems.**

The axolotl is an organism known for regeneration -- it regrows limbs, heals without scarring, maintains neural plasticity. These are perfect metaphors for an AI orchestration platform: adaptive, self-healing, always growing. The visual language should channel this without putting a cartoon axolotl on the page.

---

### Color Palette

Move completely away from cyan-on-black. The new palette draws from deep water environments (where axolotls live) crossed with high-contrast data visualization.

#### Primary Colors

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Obsidian | `#0A0E17` | Primary page background. Warmer than pure black, with a hint of blue-navy. |
| Background Elevated | Deep Basin | `#111827` | Cards, elevated surfaces, nav. |
| Background Subtle | Silt | `#1C2333` | Hover states, active rows, tertiary surfaces. |

#### Accent Colors

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary Accent | Bioluminescent Green | `#34D399` | Primary interactive color. Links, active states, primary buttons. Not neon -- slightly desaturated, like underwater light. |
| Secondary Accent | Axolotl Pink | `#F472B6` | Highlights, badges, secondary CTAs. The axolotl's actual color in the wild. Creates immediate brand recognition. |
| Tertiary Accent | Amber Signal | `#FBBF24` | Warnings, active/live indicators, tertiary highlights. |
| Data Accent | Cool Slate | `#94A3B8` | Charts, secondary data, muted information. |

#### Text Colors

| Role | Hex | Usage |
|------|-----|-------|
| Headline | `#F1F5F9` | Primary headings. Near-white with slight warmth. |
| Body | `#CBD5E1` | Paragraph text. Readable but not harsh. |
| Muted | `#64748B` | Labels, captions, metadata. |
| Disabled | `#334155` | Inactive elements, placeholder text. |

#### Semantic Colors

| Role | Hex |
|------|-----|
| Success / Active | `#34D399` |
| Warning / Standby | `#FBBF24` |
| Error / Critical | `#F87171` |
| Info / Neutral | `#60A5FA` |

#### Gradient (use sparingly)

```css
/* Hero headline accent gradient -- bioluminescent */
background: linear-gradient(135deg, #34D399 0%, #60A5FA 50%, #F472B6 100%);

/* Subtle card border on hover */
border-image: linear-gradient(135deg, rgba(52, 211, 153, 0.3), rgba(244, 114, 182, 0.1)) 1;
```

The key difference: cyan is a single note. This palette has **temperature range** -- cool greens, warm pinks, neutral slates. It can express hierarchy, status, and emotion. The pink accent is the secret weapon: it is distinctive, tied to the actual axolotl, and almost no tech companies use pink as a secondary color.

---

### Typography

Drop Syne, Manrope, and the generic tech-font approach. The new type system pairs a geometric display face with a humanist text face.

#### Font Stack

| Role | Font | Weight(s) | Google Fonts |
|------|------|-----------|--------------|
| Display / H1-H2 | **Bricolage Grotesque** | 600, 700, 800 | Yes |
| Body / UI | **DM Sans** | 400, 500, 600 | Yes |
| Mono / Code | **IBM Plex Mono** | 400, 500 | Yes |

**Why Bricolage Grotesque:** It is a variable-axis grotesque with optical size adjustments. At large sizes, it has distinctive character -- slightly quirky letterforms, visible personality in the `g`, `a`, and `e`. It does not look like Inter or Space Grotesk. It reads as designed, not defaulted.

**Why DM Sans:** Clean, geometric, excellent readability at small sizes. Slightly warmer than Inter. Pairs well with Bricolage because both are geometric but DM Sans is more restrained.

**Why IBM Plex Mono:** More legible than JetBrains Mono at small sizes, with a professional tone. It reads "systems engineering" rather than "code editor."

#### Type Scale

```css
--type-display:  clamp(3.5rem, 8vw, 6rem);    /* Hero headline only */
--type-h1:       clamp(2.5rem, 5vw, 4rem);     /* Section titles */
--type-h2:       clamp(1.75rem, 3.5vw, 2.5rem);/* Subsection titles */
--type-h3:       clamp(1.25rem, 2vw, 1.5rem);  /* Card titles */
--type-body-lg:  1.125rem;                       /* Lead paragraphs */
--type-body:     1rem;                           /* Default body */
--type-body-sm:  0.875rem;                       /* Secondary text */
--type-caption:  0.75rem;                        /* Labels, tags */
--type-mono:     0.8125rem;                      /* Code, terminal */
```

#### Heading Treatment

H1 and display headings use `font-weight: 800` with `letter-spacing: -0.03em` and `line-height: 1.0`. The tight leading creates visual density and confidence. No gradient text -- instead, use the **Axolotl Pink** or **Bioluminescent Green** for a single emphasized word or phrase as a flat color. This is cleaner and more legible than gradient text effects.

```css
/* Example */
h1 span.accent { color: #34D399; }
h1 span.accent-warm { color: #F472B6; }
```

---

### Component Patterns

#### Cards -- "Data Panels"

Drop the glassmorphism. Cards should feel like panels in a monitoring dashboard.

```
- Background: #111827 (solid, no blur, no transparency)
- Border: 1px solid #1E293B (slate-700, subtle)
- Border-radius: 8px (tighter than the current 16px -- more precise)
- Padding: 32px
- Hover: border-color transitions to #34D399 (green) with 
  box-shadow: 0 0 0 1px #34D399 (double-border effect, no glow)
- No translateY hover. No float effect. Borders change. That is it.
```

Cards should have a **left accent stripe** -- a 3px left border in a category color (green for active features, pink for highlights, amber for beta/coming soon). This gives each card identity within a grid without needing different layouts.

#### Buttons

```
Primary:
- Background: #34D399
- Text: #0A0E17 (dark on light)
- Border-radius: 6px (sharp, not pill-shaped)
- Padding: 12px 24px
- Font: DM Sans 500, 0.875rem
- Hover: background shifts to #2DD4BF (slightly more teal), no transform
- Active: scale(0.98)
- No glow. No box-shadow spread. Clean.

Ghost / Secondary:
- Background: transparent
- Border: 1px solid #334155
- Text: #CBD5E1
- Hover: border-color #34D399, text-color #34D399

Danger / Destructive:
- Background: transparent
- Border: 1px solid #F87171
- Text: #F87171
```

#### Badges / Tags

```
- Background: color at 10% opacity (e.g., rgba(52, 211, 153, 0.1))
- Text: full color (e.g., #34D399)
- Border-radius: 4px (not pill)
- Padding: 4px 10px
- Font: IBM Plex Mono, 0.6875rem, weight 500
- Letter-spacing: 0.05em
- No border. The background tint is sufficient.
```

#### Terminal Component

If you keep a terminal (and you should -- it is effective for developer audiences), make it feel real:

```
- Background: #0A0E17 (same as page bg, not elevated)
- Border: 1px solid #1E293B
- Border-radius: 6px
- Header: minimal. Just a filename or process name in muted text. 
  DROP the red/yellow/green dots. Everyone does those.
- Font: IBM Plex Mono 13px
- Line-height: 1.8
- Prompt character: simple ">" in muted color, not "$" with cyan
- Output text: #94A3B8 (slate)
- Highlighted values: #34D399 for success, #FBBF24 for active, #F87171 for errors
- Add actual line numbers on the left margin in #334155
- Animate the terminal with a typewriter effect that fires 
  on scroll-into-view -- but only ONCE, not looping
```

#### Dividers / Section Breaks

Replace the current gradient `linear-gradient(90deg, transparent, cyan, transparent)` horizontal rules. Instead:

```
- Use a simple 1px solid #1E293B line, full container width
- OR a "data break" pattern: a thin line with a small centered label 
  like "---" or a section number in IBM Plex Mono at 0.625rem
```

---

### Layout Approach

#### Break the centered monotony

The current site is: centered header -> content -> centered header -> content. Every section has the same rhythm. v2 should use **asymmetric tension**:

**Pattern 1 -- Offset headers.** Section titles align to a left column (roughly 40% width) while content occupies the right 60%. This creates a reading rhythm where the eye anchors left for context and scans right for detail. Not every section -- alternate between offset and full-width to create variety.

**Pattern 2 -- Oversized type as layout.** The hero headline should be so large it becomes architectural. At desktop, the display type at 6rem with -0.03em tracking fills the space in a way that IS the layout. No particle canvas needed -- the typography itself is the visual event.

**Pattern 3 -- Data density zones.** Instead of 3 identical cards in a row, use mixed-size panels. One large card (2/3 width) with depth, next to a narrow card (1/3 width) with a stat or quote. Below that, three equal cards. The varied sizing creates natural hierarchy.

**Pattern 4 -- Horizontal scroll for mobile.** On mobile, instead of stacking all cards vertically (creating an endless scroll), use horizontal scrolling carousels for the features and use-case sections. This is a more natural mobile gesture and keeps the page length manageable.

**Pattern 5 -- Sticky context.** In the Architecture/How It Works section, use a sticky left column that shows a diagram or label while the right column scrolls through the four steps. This is more engaging than four identical boxes in a row.

#### Grid System

```css
/* 12-column grid with 24px gutters */
.grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
}

/* Asymmetric section: 5-col label + 7-col content */
.section--offset .section-label { grid-column: 1 / 6; }
.section--offset .section-content { grid-column: 6 / 13; }

/* Wide + narrow card pair */
.card--wide { grid-column: span 8; }
.card--narrow { grid-column: span 4; }

/* Standard 3-up */
.card--third { grid-column: span 4; }
```

---

### Hero Concept

**Kill the particle canvas.** Replace it with a pure typographic hero backed by a subtle SVG data-flow diagram.

#### Structure

```
[Nav bar]

[Hero section -- full viewport height]
  Left-aligned (not centered):
  
  Small tag: "AI Agent Orchestration" in IBM Plex Mono
  
  Display headline (6rem):
  "The nervous system
   for business agents."
  
  -- "nervous system" is in Axolotl Pink (#F472B6)
  
  One-line subtitle (1.125rem, DM Sans, muted):
  "Connect, manage, and scale AI across WhatsApp,
   calendars, and patient workflows."
  
  Two buttons: [Request Access] (green primary)  [See Architecture] (ghost)
  
  Below the fold (visible on scroll):
  A minimal SVG diagram showing the message flow:
  WhatsApp -> Intent Engine -> Agent Mesh -> Response
  Using thin lines and small node circles in #34D399 and #F472B6.
  This diagram is NOT decorative -- it communicates the actual product.
```

The hero background is just the page background color (`#0A0E17`) with a **single radial gradient** in the bottom-right corner: `radial-gradient(ellipse at 80% 70%, rgba(52, 211, 153, 0.06) 0%, transparent 60%)`. Extremely subtle. The content does the work.

No typing effect. No counter animation. No "SYS.STATUS: ONLINE" badge. Let the words speak.

#### Why this works

1. Left-aligned hero with oversized type is rare -- most sites center everything. It immediately feels different.
2. The pink accent word creates a focal point without gradient gimmicks.
3. The SVG flow diagram replaces a decorative canvas with actual product information.
4. The restraint signals confidence. Companies that know what they do do not need particle effects to look impressive.

---

### Scroll Interactions (Minimal)

Do NOT add scroll-driven animations for every element. The current `reveal` (fade-up on intersection) is fine as a base, but tighten it:

```css
/* Tighter, faster reveal. No translateY -- use opacity only. */
.reveal {
    opacity: 0;
    transition: opacity 0.5s ease;
}
.reveal.visible {
    opacity: 1;
}
```

No translateY, no staggered delays, no parallax. Elements appear as you reach them. That is it.

**One exception:** The Architecture section. If using the sticky-scroll pattern (left diagram sticky, right steps scroll), the diagram should subtly update as each step scrolls into view -- highlighting the relevant node. This is functional animation, not decoration.

---

### Brand Identity Hooks

The axolotl informs the design language without being literal.

**1. Color as identity.** The pink accent (`#F472B6`) IS the axolotl. Wild axolotls are pink/salmon colored. This single color choice creates more brand identity than any logo or illustration could. When people see pink + green on a dark background, they should think Ajolote Labs.

**2. Regeneration as metaphor.** The product language should lean into biological metaphors naturally present in the product: "nervous system," "orchestration," "routing," "healing" (self-recovering agents). The current copy already does some of this. Push it further in v2 -- but in the body copy, not in visual gimmicks.

**3. Mexico City + Austin as a feature, not a footnote.** Move the "Engineered in Mexico City + Austin, TX" line from a 0.7rem footer afterthought to visible placement near the CTA or in the hero subtitle area. Being a Mexico-based tech company is a differentiator, not something to hide. Consider adding the line in both English and Spanish: "Hecho en CDMX + Austin, TX" -- this signals bilingual, bicultural capability which is relevant for a product targeting Mexican healthcare.

**4. The logo icon.** The current `</>` code brackets are generic. Consider a simple, geometric mark that abstracts the axolotl's distinctive external gills (the feathery branching structures on their heads). Three short parallel lines branching from a node -- this reads as both a biological structure and a data routing diagram. It should work at 16x16 favicon size.

**5. No mascots, no illustrations.** Do not put an axolotl illustration on the website. The brand identity is carried by color, typography, and language -- not by a character. The name "Ajolote" is enough.

---

### Key Differences from Current -- Summary

| Element | v1 (Current) | v2 (New Direction) |
|---------|-------------|-------------------|
| **Hero** | Particle canvas, centered text, typing effect, counter stats | Left-aligned oversized typography, SVG flow diagram, no animation gimmicks |
| **Primary accent** | Cyan `#00e5ff` | Bioluminescent Green `#34D399` |
| **Secondary accent** | None (everything is cyan) | Axolotl Pink `#F472B6` |
| **Background** | Pure dark `#06080f` | Warmer obsidian `#0A0E17` |
| **Heading font** | Syne 800 | Bricolage Grotesque 700-800 |
| **Body font** | Manrope | DM Sans |
| **Mono font** | JetBrains Mono | IBM Plex Mono |
| **Cards** | Glassmorphism, gradient borders, blur | Solid panels, left accent stripe, no blur |
| **Card radius** | 16px | 8px |
| **Button radius** | 10px | 6px |
| **Glow effects** | Everywhere (buttons, cards, nodes) | None. Zero glow. |
| **Gradient text** | Hero headline animated gradient | Flat accent color on one word |
| **Layout** | Centered sections, uniform grids | Asymmetric 12-col grid, offset headers, mixed card sizes |
| **Scanlines / Grid overlay** | Yes | Removed entirely |
| **Terminal dots** | Red/yellow/green macOS dots | Minimal header, filename only |
| **Section tags** | `// CAPABILITIES` in cyan mono | Same format but in muted color, not accent |
| **Hover effects** | translateY + glow + gradient border | Border color change only |
| **Scroll animation** | Fade-up with staggered delays | Opacity fade only, no translate, no stagger |
| **Mobile** | Stacked vertical layout | Horizontal scroll carousels for card sections |
| **Brand identity** | Generic tech. Could be any company. | Pink + green palette unique to Ajolote. Mexico proudly visible. |
| **Mexico reference** | 0.7rem footer text | Prominent placement near hero or CTA |
| **Badge in hero** | "SYS.STATUS: ONLINE" | Removed |
| **Counter stats** | Animated count-up numbers | Removed or replaced with a single credible data point |
| **Typing effect** | Rotating phrases with typewriter | Removed. Static subtitle. |
| **Overall vibe** | "AI startup template" | "Biotech infrastructure company that happens to do AI" |

---

### Implementation Priority

1. **Color + Typography swap.** Fastest path to looking different. Change CSS custom properties and font imports. One afternoon of work.
2. **Hero redesign.** Remove canvas, implement left-aligned typographic hero with SVG diagram. Half a day.
3. **Card component rework.** Replace glass cards with solid panels + left accent stripe. Strip hover glow. A few hours.
4. **Layout restructure.** Move to 12-column grid with asymmetric sections. This is the largest structural change. One to two days.
5. **Terminal component upgrade.** Real typewriter animation, line numbers, minimal header. Half a day.
6. **Mobile-specific design.** Horizontal scroll carousels, mobile-optimized spacing. One day.
7. **SVG architecture diagram.** The flow diagram for the hero / architecture section. Half a day to design and implement.

Total estimated implementation: 4-5 focused days for a solo developer.

---

### Reference Points

Sites that execute a similar "precision + personality" balance well (for visual research, not copying):

- **Linear.app** -- Minimal, confident, data-rich. Excellent use of typography as hero.
- **Stripe.com** -- Clean engineering aesthetic with moments of warmth.
- **Vercel.com** -- Good grid-based layout (but too widely copied now).
- **Mercury.com** -- Banking product that feels warm despite being technical.
- **Resend.com** -- Developer tool with distinctive visual identity and restrained animation.

The goal for Ajolote Labs is to land in this tier of design quality while being visually distinct from all of them through the unique pink + green palette and biological brand language.
