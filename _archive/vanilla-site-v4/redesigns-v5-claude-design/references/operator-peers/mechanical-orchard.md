# Mechanical Orchard — Design Teardown

Source: https://www.mechanical-orchard.com
Artifacts: `references/raw/mechanical-orchard.json` + `references/captures/mechanical-orchard/{hero,mid,full,mobile}.png`
Platform: Webflow (`cdn.prod.website-files.com`, Webflow JS bundle, Finsweet attributes)

---

## 1. Verbatim copy

**Hero (slide 1)**
- H1: "Modernize with confidence"
- Subhead: "Rewrite what matters, without breaking what works"
- CTA: "Let us show you how" → `https://www.mechanical-orchard.com/contact`

**Hero slider — slide 2**
- H1: "Is AI a silver bullet for mainframe modernization?"
- Subhead: "AI improves the economics of modernization; it doesn't change the risk"
- CTA: "Read our post" (href: null)

**Hero slider — slide 3**
- H1: "Mavericks of Modernization"
- Subhead: "A study of the leadership traits making the impossible possible"
- CTA: "Read the report" (href: null)

**Every section headline (from `allHeadings`):**
- H2 "Three principles"
- H2 "The system in action is the specification"
- H2 "Recreate its behavior exactly in a modern language"
- H2 "Roll increments into production"
- H2 "Recreate and Deliver"
- H2 "Repeat and Innovate"
- H2 "Meet Imogen®"
- H2 "Our insights"
- H2 "Your new legacy\nstarts here." (line break between "legacy" and "starts here.")
- H2 "Newsletter"
- H3 (insights cards): "The problem of abundance" · "Reflections on the first year of Imogen" · "We rebuilt that COBOL migration calculator" · "Customer Presentation at Google Cloud Next 2026: SulAmérica" · "Nine lives" · "Mechanical Orchard's Federal IT Modernization Platform now available to the Public Sector through Carahsoft's GSA Schedule Contract"
- H3 (FAQ/about): "First principles thinking meets legacy modernization. Backed by 30 years of pioneering software development best practices."

**CTA labels (from `ctas`):**
- "Let us show you how" → `/contact`
- "Contact us" → `/contact` (appears twice)
- "Learn more" → `/contact`
- "Get in touch" → `/#`

**Signature lines (quoted word-for-word):**
- Animated scrolling-text section: "If it's not working, do something different. We rapidly rewrite what's working today into a modern form that's ready for anything you want it to do tomorrow — with no risk or disruption."
- Imogen positioning: "Imogen is Mechanical Orchard's end-to-end mainframe modernization platform. Its core insight: the running system is a better specification than its code."
- Contact section: "We believe that every company deserves to realize their vision, free of constraints from the past. Our team's technology, and experience can help them move into this evolving version safely, reliably, fearlessly."
- Recurring inline ask (Three principles + Imogen): "Have a workload in mind? Try it with us."

---

## 2. Section-by-section IA

Order follows the DOM `sections` array. Screenshots: `hero.png` (top fold), `mid.png` (contact/lower fold), `full.png` (full-page composite), `mobile.png` (mobile top fold).

1. **Hero slider** (`mo-slider-section newwh`) — *purpose:* lead positioning + primary conversion. *Content:* 3 rotating slides (modernization pitch / AI-COBOL question / leadership report), each with H1 + subhead + CTA. *Layout:* full-viewport dark section, large serif H1 bottom-left over a textured organic image background (orange/coral filament render in `hero.png`), transparent sticky nav on top, CTA as underlined text link. See `hero.png`.
2. **Animated scrolling text** (`section-animate-texte`) — *purpose:* manifesto/thesis statement. *Content:* the single large paragraph "If it's not working, do something different…". *Layout:* large display type on solid dark, scroll-driven reveal, no other elements. Visible as the large faint text block in `full.png` upper-middle.
3. **Three principles** (`section--our-approach is-dark`) — *purpose:* explain methodology. *Content:* intro paragraph on why modernization derails + the three principles (system-in-action-is-the-spec / recreate-behavior / roll-increments) + inline "Have a workload in mind? Try it with us." *Layout:* dark section, headline + supporting copy, three principle sub-headings. See `full.png`.
4. **Meet Imogen®** (`section--our-approach is-dark`) — *purpose:* product intro. *Content:* Imogen platform description (behavioral spec capture, AI code-gen, continuous equivalence proof) + inline workload ask. *Layout:* dark section; 1 page video lives near here (Vimeo). See `full.png`.
5. **Our insights** (`section-blog-title hp`) — *purpose:* section header for the blog/insights carousel. *Layout:* simple light-section title.
6. **Insights slider** (`section-blog--slider`) — *purpose:* thought-leadership proof. *Content:* 6 article cards (abundance / first-year Imogen reflections / COBOL calculator / SulAmérica Google Cloud Next 2026 / Nine lives / Carahsoft GSA press release). *Layout:* horizontal carousel of color-blocked cards (coral, pink, teal panels visible in `full.png` mid-lower region), powered by Flickity/Splide.
7. **Contact split** (`section-contact--split`) — *purpose:* primary conversion. *Content:* "Your new legacy\nstarts here." + belief paragraph + "Get in touch". *Layout:* split column — large organic teal image on left, serif headline + copy + CTA on right. See `mid.png`.
8. **FAQ / about** (`section-faq`) — *purpose:* trust/credibility. *Content:* "First principles thinking meets legacy modernization. Backed by 30 years…" + company-description copy (legacy modernization company, San Francisco HQ).
9. **Footer** (`footer`) — *purpose:* newsletter capture + nav. *Content:* "Your new legacy starts here." repeated, Newsletter signup (HubSpot form — `js.hsforms.net`), nav (Platform / About us / FAQ / Insights / Contact us / Jobs), "© 2026 Mechanical Orchard, Inc. All rights reserved.", "Privacy & Terms of Use". *Layout:* dark footer. Bottom of `full.png`.

Top nav (`navLinks`): Banking · Insurance · Retail · Public Sector · Automotive · Platform · About us · FAQ · Insights · Contact us — verticals listed first, then product/company links.

---

## 3. Visual system

**Palette (rgb → hex, from `palette` / `colorNotes`):**
- Body background: `rgb(255,255,255)` → **#ffffff** (white)
- Body text: `rgb(51,51,51)` → **#333333** (near-black)
- Dark sections (hero, principles, Imogen, footer) bg: `rgb(13,13,13)` → **#0d0d0d** (near-black)
- CTA/button bg: `rgb(13,13,13)` → **#0d0d0d**; CTA text: `rgb(255,255,255)` → **#ffffff**
- Header/nav bg: `rgba(0,0,0,0)` → **transparent** (sits over the dark hero)
- Brand accent: **green** (Mechanical Orchard logo green) — present in imagery/logo but NOT captured as a computed color in the artifact. [unverified hex]

This is **not pure dark-mode**: white body with strategically placed #0d0d0d dark sections (hero / principles / Imogen / footer) alternating with white content sections.

**Type families + scale (from `fonts`):**
- Display/headings/CTAs: **"FAM Aime Regular"** (custom serif; fallback "Times New Roman") — editorial/literary serif. H1 at **73.6px** desktop; CTA at 16px.
- Body/UI: **"Inter" variable** (`Inter Variablefont Slnt Wght`), base 14px.
- A paragraph node reported `-apple-system` at 12px (likely the cookie/consent banner system text).
- WebFont loader present (`webfont.js` from Google Ajax) for font loading.

**Density / grid / depth:**
- Generous, editorial spacing; full-viewport hero; large display type dominates folds (see `hero.png`).
- Layout patterns: full-viewport hero slider, alternating light/dark sections, split-column contact, horizontal blog carousel.
- **Depth/border treatment is flat and minimal:** CTAs have **0px border-radius** (no pills/rounded buttons), no visible shadows/cards in the structural chrome. CTAs render as serif text links with underlines rather than filled buttons.

**Imagery style (from `imagery`):** 30 images, 1 video (Vimeo embed near Imogen — `f.vimeocdn.com`), 0 canvas, 2 SVGs. Hero and contact use large **organic, abstract filament/coral-like renders** — coral/orange in the hero (`hero.png`), teal/blue in the contact split (`mid.png`). Blog cards use solid color panels (coral, pink, teal). No founder/team photos visible in captures.

---

## 4. Motion + implementation

Animation stack is **confirmed via globals + loaded scripts** (`animLibGlobals`, `animLibScripts`):
- `gsap: true`, `Lenis: true`, `Webflow: true` (anime/Framer/motion/Lottie/THREE/Splitting/SplitType all false).
- Scripts: **GSAP 3.15.0** (via Webflow CDN) + **Flip** + **ScrollTrigger** + **SplitText**; plus duplicate GSAP 3.12.5/3.12.7 + ScrollTrigger + Observer (cdnjs). **Lenis 1.0.34** (`@studio-freight/lenis`). Carousels: **Flickity 2.3.0** and **Splide 4.1.4** both loaded.

Notable effects:
- **Smooth/inertia scroll** — Lenis drives momentum scrolling site-wide. Built: `@studio-freight/lenis@1.0.34`. Trigger: continuous on scroll.
- **Scroll-triggered text reveals** — H1/H2 character/word reveals as sections enter viewport. Built: GSAP **SplitText** (splits headings into chars/words) animated on **ScrollTrigger**. Restraint: tied to scroll position, fires on section entry. (Inferred from SplitText+ScrollTrigger presence; `animNotes` states this pattern.) [reveal-on-H1/H2 specifics partly unverified — based on artifact's stated pattern, not a captured frame]
- **Animated scrolling-text manifesto section** (`section-animate-texte`) — the large "If it's not working…" paragraph animates during scroll. Built: GSAP ScrollTrigger (scrubbed). Restraint: one section, scroll-scrubbed.
- **Hero slider transitions** — 3 slides rotate (H1/subhead/CTA swap). Built: GSAP timeline + likely Flip for layout transition; Webflow interactions for base logic. [auto-rotate vs. manual unverified]
- **Insights carousel** — horizontal slide. Built: Flickity and/or Splide (both present).
- **Parallax / scroll-direction** — Observer plugin loaded (scroll-direction detection); parallax noted in `animNotes`. [specific parallax targets unverified]

Webflow provides base interaction logic; GSAP layers the custom scroll choreography on top.

---

## 5. Proof mechanics

- **No numeric metric/stat cards** appear in the captured artifacts (no "X% faster", "$Y saved" tiles). Proof is **narrative + credibility-claim** based, not dashboard-style metrics.
- **Credibility claim:** "Backed by 30 years of pioneering software development best practices." (FAQ/about H3). Company described as "a legacy modernization technology company headquartered in San Francisco, CA."
- **Thought-leadership as proof:** the 6-card insights carousel (blog posts + a Carahsoft GSA press release + a "Customer Presentation at Google Cloud Next 2026: SulAmérica" — implies a named customer + Google Cloud association).
- **Card structure (insights):** color-blocked panels, each with an H3 title (see coral/pink/teal cards in `full.png`). No metric overlays visible.
- **Logos vs anonymized:** no logo wall / customer-logo strip is present in the captures or artifact. The only named external entities are SulAmérica, Google Cloud Next 2026, and Carahsoft (GSA) — surfaced as article titles, not logo badges.
- **Trademark/badge format:** "Imogen®" and "Mechanical Orchard®" carry registered-trademark marks (see logo in `hero.png`). No quote/testimonial blocks captured.

---

## 6. Conversion

Every CTA (from `ctas` + slider data):
- "Let us show you how" → `https://www.mechanical-orchard.com/contact` — hero slide 1, underlined serif text link over dark hero (`hero.png`).
- "Read our post" → null href — hero slide 2.
- "Read the report" → null href — hero slide 3.
- "Have a workload in mind? Try it with us." — inline soft ask inside Three principles + Imogen sections (text prompt; destination not captured as a discrete CTA). [destination unverified]
- "Contact us" → `https://www.mechanical-orchard.com/contact` — top nav (and appears again in footer nav).
- "Learn more" → `https://www.mechanical-orchard.com/contact`.
- "Get in touch" → `https://www.mechanical-orchard.com/#` — contact split section (`mid.png`). Note: this one resolves to `/#` (on-page anchor), unlike the others routing to `/contact`.
- **Newsletter signup** — footer, HubSpot embedded form (`js.hsforms.net/forms/embed/v2.js`) — secondary email-capture conversion.

Placement pattern: conversion ask in hero, repeated soft inline asks mid-page, dedicated contact section near bottom, newsletter in footer. Nearly all hard CTAs funnel to `/contact`.

---

## 7. Responsive (mobile.png)

- **Nav collapses to a hamburger** (top-right) with the wordmark "MECHANICAL ORCHARD®" top-left; nav links hidden behind the menu.
- **Hero stacks single-column:** H1 "Modernize with confidence" wraps across more lines at a reduced size but stays large/serif; subhead and the "MECHANICAL ORCHARD" mark sit below. Same organic coral background image fills the fold.
- **Cookie/consent banner** overlays the bottom on mobile (visible in `mobile.png`), with "Continue without accepting", "Decline All Necessary Cookies", "Accept All Cookies", "Manage Preferences" controls — same controls as desktop, restacked.
- Layout converts the desktop multi-column/split sections to a single vertical column. [section-by-section mobile stacking below the fold unverified — only the top fold is captured in `mobile.png`]
- Smooth scroll (Lenis) and GSAP scroll triggers remain active on mobile. [unverified — inferred from single shared script bundle]

---

## 8. Confidence

**Verified in browser (directly in artifacts):**
- All copy in §1 (verbatim from raw JSON `heroSliderSlides`, `allHeadings`, `ctas`, `sections.fullText`).
- Section order, classNames, and gists (§2) — from `sections` array; screenshots corroborate hero, contact split, blog cards, footer.
- Palette hex conversions (§3) — computed rgb values present in `palette`.
- Font families/sizes (§3) — from `fonts`.
- CTA hrefs incl. the `/#` anomaly on "Get in touch" (§6) — from `ctas`/slider data.
- Animation stack (§4) — `gsap`/`Lenis`/`Webflow` globals true; GSAP 3.15 + ScrollTrigger + SplitText + Flip + Observer and Lenis 1.0.34 in loaded scripts; Flickity + Splide present. **Animation approach is confirmed.**
- Imagery counts and Vimeo video (§3, §5) — from `imagery`.
- Absence of metric/stat cards and logo wall (§5) — not present in artifacts.
- Mobile hamburger, stacked hero, consent banner (§7) — visible in `mobile.png`.

**[unverified] (flagged in-line):**
- Brand-accent green hex value (not computed).
- Exact SplitText reveal behavior on H1/H2 and parallax targets — inferred from stated pattern, not a captured animation frame.
- Hero slider auto-rotate vs. manual.
- Destination of the "Have a workload in mind? Try it with us." inline ask.
- Mobile stacking of below-fold sections; Lenis/GSAP active on mobile.

Load-bearing [unverified] claims: minimal — the green accent hex is the only design-defining fact not in the artifacts; the rest are motion/behavior nuances inferred from a confirmed library stack.
