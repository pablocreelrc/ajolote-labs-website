# Anduril — Design Teardown

Taste anchor. Source: captured `references/raw/anduril.json` (verbatim browser capture) + `references/captures/anduril/{hero,mid,mobile,full}.png`. URL: https://www.anduril.com. Page title: "Transforming U.S. Defense Capabilities with Advanced Technology | Anduril".

---

## 1. Verbatim copy

**Hero H1/H2:** There is no visible hero headline on desktop. The capture records the H1 and H2 as Sanity CMS template tokens, both hidden via `display:none`:

- H1: `@[shortTitle]` (visible: false — "Hidden, Sanity token")
- H2: `@[title]` (visible: false — "Hidden, Sanity token")

> heroH1_note: "The H1 and H2 in .HomeHero are programmatically hidden (display:none). The hero communicates via a full-viewport autoplay video from Sanity CDN. No visible headline copy over the hero."

There is **no `heroSubhead`** (`null` in raw).

Note: the mobile capture (`mobile.png`) renders different, visible hero text not present in the desktop JSON section data — large stacked all-caps "© ANDURIL INDUSTRIES / TRANSFORMING DEFENSE CAPABILITIES WITH ADVANCED TECHNOLOGIES", plus the tags "EST. 2017", "→ FUTURE", and "AUTONOMY FOR EVERY MISSION", over a gold/amber image. This is the page `<title>` content surfaced visually on mobile. [The exact mobile string is read from the screenshot, not the JSON copy fields — see Confidence.]

**Featured product names + taglines (verbatim, all 7):**
- Ghost — "First to See, First to Act"
- Barracuda — "Bring Mass to the Fight"
- Lattice — "Autonomy for Every Mission"
- Roadrunner — "Launch, Loiter, Recover, Reuse"
- Fury — "Fight Unfair"
- Menace — "Own the Edge"
- Dive-XL — "A League of Its Own"

**Announcement slice (Arsenal-1), verbatim:**
- Headline: "Rebuild The Arsenal"
- Subline 1: "DESIGNED BY ANDURIL"
- Subline 2: "BUILT IN OHIO"
- Product label: "ARSENAL-1"
- Descriptor: "A new standard in defense manufacturing."

**News slice, verbatim:**
- Section label: "News & Insights"
- Latest date: "06/17/2026"
- Latest headline: "Anduril Wins Production Contract For U.S. Air Force CCA Program"
- CTA: "Read More"

**Media link slice, verbatim:** "Rebooting The Arsenal" and "Rebuild The Arsenal" (each with "Read More"; PT 01/02 and 02/02 pagination).

**CTA labels (verbatim):** "contact@anduril.com", "Read More", "All Articles", "Careers", "Open Roles", "Mission".

**Signature lines (atmosphere):**
- "Fight Unfair" (Fury tagline)
- "Bring Mass to the Fight" (Barracuda tagline)
- "Rebuild The Arsenal" / "DESIGNED BY ANDURIL / BUILT IN OHIO"

---

## 2. Section-by-section IA

Single-page layout, ~4748px scroll height, pure black background. Order from the raw `sections` array (verified in `full.png`):

1. **HomeHero** (`hero.png`, top of `full.png`) — Full-viewport (96svh) autoplay muted video hero from Sanity CDN (16:9, poster fallback). H1/H2 hidden. Transparent overlay nav sits on top. Scroll-to-next affordance. Purpose: cinematic, wordless atmosphere — a dim, desaturated machine/vehicle clip rather than a copy-led pitch. In `hero.png` the nav (ANDURIL wordmark left; Sea / Land / Air / Space / Lattice / Arsenal-1 center; Search / Company+ right) floats over a near-black video frame.

2. **FeaturedProducts seven** (`full.png`, upper band) — Grid/row of 7 product cards (Ghost, Barracuda, Lattice, Roadrunner, Fury, Menace, Dive-XL). Each card: full-bleed product image/video, product name (H2) bottom-left, tagline beneath, small arrow glyph bottom-right. `full.png` shows three across in the visible band (Ghost over an amber sphere; Barracuda over sky; Lattice over teal hardware). Purpose: domain/product showcase via imagery.

3. **AnnouncementSlice** (Arsenal-1) (`mid.png` top edge) — Full-bleed feature. "Rebuild The Arsenal" with "DESIGNED BY ANDURIL / BUILT IN OHIO / ARSENAL-1" and descriptor "A new standard in defense manufacturing." Visible in `mid.png` as a dark aerial-of-facility frame with small caps overlay top-right ("ARSENAL-1 / A new standard in defense manufacturing").

4. **NewsFeaturedSlice** (`mid.png`, center — the light section) — "News & Insights". This is the one inverted (light/cream) section. Latest article date "06/17/2026", headline "Anduril Wins Production Contract For U.S. Air Force CCA Program", "Read More" CTA, "All Articles" link top-right. Layout: editorial — headline left, fighter-jet-on-tarmac image right, supporting deck beneath headline. Clearly visible in `mid.png`.

5. **MediaLinkSlice** (bottom of `full.png`) — Two stacked media links ("Rebooting The Arsenal", "Rebuild The Arsenal"), each "Read More", with PT 01/02 + 02/02 pagination. Appears as two large color-blocked panels (olive/khaki and grey) at the foot of `full.png`.

Footer (from headings + nav data, not a numbered slice): Products by domain (Sea / Land / Air / Lattice), Anduril Industries / Company, Contact, Social, Search, plus careers links.

---

## 3. Visual system

**Palette (rgb → hex):**
- Body background: `rgb(0,0,0)` → **#000000** (pure black base)
- Body text color value: `rgb(0,0,0)` → **#000000** (default; visible text is set white per-region)
- Header/hero/button/footer text: `rgb(255,255,255)` → **#FFFFFF**
- Header / hero / button / footer background: `rgba(0,0,0,0)` → **transparent** (over the video/imagery)

Per raw notes: "No color accents detected on body/header/footer — brand identity expressed through product imagery and video rather than color." The only "color" on the page comes from photography/video (amber sphere, blue sky, teal hardware, olive/grey media panels). The News section is the lone light/cream inversion (sampled from `mid.png`, not in the palette JSON — see Confidence).

**Type families + scale:**
- Headings (H1): `HelveticaNowDisplay, Helvetica, Arial, sans-serif`, captured at 11.95px (the hidden token H1 — not representative; display headlines render much larger, see screenshots)
- Paragraph: `HelveticaNowDisplay, Helvetica, Arial, sans-serif`, 16.73px
- Body default: `"Times New Roman"`, 15.94px (serif)
- Raw note: "Interesting duality: body defaults to Times New Roman (serif, editorial feel) while headings and paragraphs use HelveticaNowDisplay (grotesque sans). Custom font is HelveticaNowDisplay — a premium Helvetica variant."

Display headlines read as tight, heavy, all-caps grotesque (see mobile hero and "News & Insights"). Product taglines and Arsenal sublines use small, wide-tracked uppercase.

**Density / grid / depth:** Low density, high whitespace (or rather "blackspace"). Product cards sit on a multi-column grid (3-up visible in `full.png`). Borders/depth are essentially absent — no visible card borders, shadows, or rounded chrome; separation is achieved purely by full-bleed image edges against black. Flat, hard-edged, editorial.

**Imagery style:** 11 raster images, 1 hero video, 1 canvas, 27 SVGs (icons/logo/nav). High-fidelity, desaturated, cinematic military hardware — vehicles, jets, facilities. The aesthetic per raw brandNotes: "pure black background, white typography... No bright color accents... Military-grade aesthetic: minimal decoration, maximum impact through imagery. Product names are strong single-word codenames... Taglines are short declarative phrases (3-5 words)."

---

## 4. Motion + implementation

Animation stack is **confirmed via window globals + network scripts** (raw `animLibGlobals` + `networkScripts`):

- **Lenis** — smooth scroll. Confirmed two ways: present as a `window` global AND loaded as a network script (`/assets/js/lib/lenis.xxGyAE8JBT.min.js`). This drives the eased, inertial scroll feel across the long single page.
- **Theatre.js** — animation sequencing/timeline engine. Confirmed via network script (`/assets/js/lib/theatrejs.xxwlD09FFh.js`). Used to orchestrate scroll-/time-driven sequences (likely the product card and announcement reveals).
- **Hydra** — custom WebGL/shader worker thread (`/assets/js/hydra/hydra-thread.xxCx-fvpXZ.js`). Explains the single `<canvas>` on the page (`canvasCount: 1`) — a shader effect somewhere on the page. Raw note: "custom WebGL/shader threads via hydra-thread worker."
- Explicitly **NOT detected:** GSAP, Three.js global, Framer Motion.

Notable effects and how they're built (behavior partly inferred from technique — flagged):
- **Hero ambient video:** full-viewport autoplay muted loop (`<video>` from Sanity CDN, poster image fallback). Trigger: autoplay on load. Restraint: muted, wordless, slow/dim — atmosphere over information. Built as a native HTML5 video element, not a canvas.
- **Smooth scroll / scroll-tied reveals:** Lenis virtualizes the scroll; Theatre.js sequences element states against scroll position. [The precise per-element reveal choreography is inferred from the presence of these libraries, not directly recorded — unverified.]
- **WebGL/shader accent:** one canvas driven by the Hydra worker thread. [Exact visual output of the canvas not captured in screenshots — unverified.]

The motion philosophy is restraint: no decorative micro-interactions captured; the spectacle is the cinematic video + smooth inertial scroll, not UI flourish.

---

## 5. Proof mechanics

Anduril does not lead with metric/stat cards on the home page (consistent with a taste-anchor, light-on-proof site). Proof is expressed through:
- **Product codename cards** as the primary "proof of capability" unit: full-bleed image/video + single-word codename (H2) + 3-5 word declarative tagline + arrow link. No numbers, no logos, no testimonials on these.
- **Recency/credibility via news:** the News & Insights slice surfaces a dated, named contract win ("Anduril Wins Production Contract For U.S. Air Force CCA Program", 06/17/2026) — institutional proof by association (U.S. Air Force) rather than client-logo walls.
- **Manufacturing-scale proof:** Arsenal-1 announcement ("DESIGNED BY ANDURIL / BUILT IN OHIO", "A new standard in defense manufacturing") — proof framed as industrial capacity.
- No customer logo strip, no anonymized client tiles, no quote/badge components captured.

---

## 6. Conversion

CTAs are low-pressure and editorial — no repeated sales button. From raw `ctas`:
- "contact@anduril.com" → `mailto:contact@anduril.com` (footer contact)
- "Read More" → news article (href null in capture; News slice)
- "All Articles" → https://www.anduril.com/news (News slice, top-right)
- "Careers" → https://www.anduril.com/careers (footer)
- "Open Roles" → https://www.anduril.com/open-roles (footer)
- "Mission" → https://www.anduril.com/mission (footer)

Placement pattern: the home page itself has essentially no hard conversion ask above the fold — discovery is driven by the nav taxonomy (Sea / Land / Air / Space / Lattice / Arsenal-1) and the 7 product cards (each links to its product page, e.g. `/ghost`, `/fury`). The dominant "conversions" are Careers/Open Roles (talent) and Contact (email), not a demo/booking funnel.

---

## 7. Responsive (mobile)

From `mobile.png`:
- Nav collapses to wordmark (ANDURIL + diamond glyph) left and a hamburger right; the desktop center nav items are hidden behind the menu.
- The hero behaves differently on mobile: it shows **large visible copy** that is hidden on desktop — stacked all-caps "© ANDURIL INDUSTRIES / TRANSFORMING DEFENSE CAPABILITIES WITH ADVANCED TECHNOLOGIES" in heavy grotesque, over a warm amber/gold image of equipment. Tighter line-height, full-bleed type touching both margins.
- Supporting tags stack below: "EST. 2017", "→ FUTURE", "AUTONOMY FOR EVERY MISSION", plus the large Anduril diamond/A logo mark.
- Layout is single-column; product grid (3-up on desktop) reflows to stacked full-width cards [card reflow inferred from single-column mobile pattern — only the hero is visible in `mobile.png`].
- Same pure-black background and white type carry over.

---

## 8. Confidence

**Verified in-browser (from raw JSON capture):** all product names + taglines; Arsenal-1 announcement copy; News slice copy + date; media link copy; all CTA labels + hrefs; nav + social links; palette rgb values; font families + sizes; section order + class names; page scroll height; hero is a hidden-H1 fullscreen Sanity video; imagery counts (11 img / 1 video / 1 canvas / 27 svg).

**Verified in screenshots:** desktop nav layout and transparent overlay (`hero.png`); 3-up product card band with codename + arrow treatment (`full.png`); the single light/cream News & Insights inversion and its jet-on-tarmac layout (`mid.png`); olive/grey media panels at page foot (`full.png`); mobile hamburger + visible amber hero copy block (`mobile.png`).

**Animation approach: confirmed** — Lenis (global + script), Theatre.js (script), Hydra WebGL worker (script); GSAP/Three/Framer explicitly absent.

**Load-bearing [unverified] claims (minimized):**
1. The exact wording of the mobile hero copy is read from `mobile.png` pixels (it derives from the page `<title>`), not from a JSON copy field — [unverified] at the character level.
2. Per-element scroll-reveal choreography (what Theatre.js animates, and the exact Hydra canvas visual) is inferred from library presence, not recorded — [unverified].
3. Product-card reflow to single-column on mobile is inferred from the single-column mobile pattern; only the hero is visible in `mobile.png` — [unverified].
