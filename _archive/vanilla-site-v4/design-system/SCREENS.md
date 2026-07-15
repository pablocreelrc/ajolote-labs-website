# SCREENS.md — Screen inventory

What every screenshot in `assets/screens/` is, what works, and what's broken. These are captures of the **live production site** at `ajolotelabs.ai` as of 2026-04-21. The atmosphere is on-brand; the mobile layout has four measured bugs that the v5 revamp must fix.

---

## Desktop (1440 × 900) — reference, mostly working

| File | Section | Status | Notes |
|---|---|---|---|
| `desktop-1440-full.png` | Entire page | ✅ | Full-page scroll at 1440px |
| `desktop-1440-hero.png` | Hero | ✅ | Cinematic H1 above, command-center console below. Right rail log stream visible. |
| `desktop-1440-services.png` | Services pipeline | ✅ | 3 stages horizontal, cyan connector dots between them. |
| `desktop-1440-cases.png` | Case studies | ✅ | 4 cards in 2-up grid with carousel dots. |
| `desktop-1440-cta.png` | CTA section | ✅ | Cinematic header + description + checks. |
| `desktop-1024-full.png` | Entire page | ✅ | Small desktop breakpoint — still fits 2-col hero. |

**Desktop atmosphere is the brand target.** When Claude Design generates output, this is what "on-brand" looks like. Match the feel, not necessarily the exact layout (some layouts will be redesigned in v5).

---

## Tablet (768 × 1024) — mostly working

| File | Section | Status | Notes |
|---|---|---|---|
| `tablet-768-full.png` | Entire page | ✅ | Single-column layout, burger visible, CTA shown. Right-rail hidden. |

---

## Mobile (414 / 390 / 375 / 360) — revamp target

The mobile layout is **actively broken** in four measured ways. The screenshots show the bugs — do not replicate them.

| File | Section | Status | What's wrong |
|---|---|---|---|
| `mobile-414-full.png` | Entire page | ⚠️ | Full scroll at iPhone Plus — shows overflow on services stages |
| `mobile-390-full-BROKEN.png` | Entire page | ❌ | iPhone 14 — cases section renders at 0px height (invisible), services cards overflow by 230px |
| `mobile-390-hero.png` | Hero | ✅ | **Hero works on mobile.** H1 billboard + console stacked cleanly. This part is fine — preserve it. |
| `mobile-390-services-BROKEN.png` | Services pipeline | ❌ | Stage cards clip out of container by 200-250px. Status pills, badges, titles all overflow. |
| `mobile-390-cases-BROKEN.png` | Case studies | ❌ | Section renders at 0px height. Zero of the four case cards visible. |
| `mobile-390-cta.png` | CTA section | ⚠️ | Renders but visually dense — needs breathing room |
| `mobile-390-menu-open.png` | Mobile menu | ✅ | Full-screen overlay with 4 links + CTA. Works. |
| `mobile-375-full.png` | Entire page | ❌ | iPhone SE — same issues as 390, tighter. |
| `mobile-360-full.png` | Entire page | ❌ | Android small — same issues amplified. |

---

## The four mobile pain points (quantified)

From `_mobile-diag.json` captured 2026-04-21, Playwright at 360/375/390/414:

1. **Services `.stage` cards overflow container by 200-250px** at every mobile viewport. Internal content (titles, status pills, badges) escapes the card.
2. **Cases section renders at `0px` height on mobile.** All four case studies are invisible. Scroll-snap interaction with `100vh` section heights on iOS Safari is the root cause.
3. **Breath slab #2 also renders at `0px` height on mobile.** Same scroll-snap interaction bug.
4. **Body text under 14px:** nav links 13px, status pills 13px, brand wordmark 12px. Below WCAG-recommended minimum for readable content.

---

## What v5 must do

- Keep hero's on-brand atmosphere (billboard + console) at all viewports.
- Stack services pipeline vertically on mobile with full-width cards, zero clipping.
- Render all 4 case cards on mobile (vertical stack OR horizontal scroll-snap carousel with dot pagination). Must work with no JS.
- Kill CSS scroll-snap on viewports ≤768px. Use `min-height: auto; display: block` for sections on mobile.
- Bump every readable text element to ≥14px on mobile.
- Match the desktop atmosphere captured in these screenshots — same tokens, same voice, same rhythm — but without the mobile bugs.

---

## How to use these screens in Claude Design

When uploading to the Claude Design org, attach the **desktop screenshots** as positive references ("match this atmosphere") and the **mobile BROKEN screenshots** as negative references ("avoid these bugs specifically"). Name them explicitly in chat: *"The desktop-1440-full.png is the target atmosphere. The mobile-390-services-BROKEN.png shows the overflow we're fixing — do not replicate it. The mobile-390-hero.png shows the hero on mobile working correctly — preserve that approach."*

Do not upload these as a mute batch — tell Claude what each one represents.
