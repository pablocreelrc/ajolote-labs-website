# DESIGN.md — Ajolote Labs

**Brand.** Ajolote Labs — an agent-infrastructure operator that embeds Forward-Deployed Engineers inside operating companies, builds the AI + software infrastructure their operations run on, and maintains it long-term. Not a consultancy, not a SaaS. The brand sells infrastructure competence, never a personal founder narrative.

**Audience.** Mid-market operators in healthcare, consumer distribution, trade & distribution, and finance. Bilingual (English surface, Spanish-speaking buyers). Decision-makers who have watched SaaS vendors oversell and under-integrate; they respond to evidence and dense instrumentation, not glossy marketing.

**Brand promise.** "Stop losing money to manual operations." Headline always leads with buyer pain. Mechanism (MCP substrate, AI employees, the brain) lives underneath as proof, never as the top-level benefit.

---

## 1. Visual Theme & Atmosphere

**Theme name.** *Cinematic Instrument Panel.*

**Atmosphere.** A 2am control room in a SOC. Cyan terminal glow on matte black. Mission-critical surfaces that happen to be beautiful, not pretty surfaces pretending to be mission-critical. The interface is a piece of software that runs, not a brochure that describes one.

**The two voices — alternating, never mixed.**

- **Dense voice.** Dashboard density. 1px borders, mono tickers, status pills, 12-col scaffolding, live log streams, counters ticking, metric bars filling, status dots pulsing. Every surface earns its pixels. This is where proof lives.
- **Cinematic voice.** Oversized Satoshi Black billboards filling full viewports, typographic breath between instrument panels. One word per line can carry a cyan→amber gradient wash. This is where promise lives.

The rhythm is: **billboard promise → instrument proof → breath → proof → breath → cinematic close.** Contrast is the hook. Never two dense surfaces in a row, never two cinematic surfaces in a row.

**What the brand feels like.** A veteran SRE's terminal mid-incident — calm, ordered, instrumented, absolutely certain of what it is. Not a pitch deck. Not a design-system Dribbble shot. A working console.

**Anti-atmosphere.** Glassmorphic SaaS cards. Isometric illustrations. Gradient-mesh hero backgrounds. Emoji clusters. Stock photography of smiling teams. 3D blobs. Noise textures. Floating-element parallax. Any "approachable yet premium" visual that could be any of a thousand other startups.

---

## 2. Color Palette & Roles

**The palette is dark. Always.** No light mode exists — not as an option, not as a toggle, not as a "marketing section variant." Pablo has rejected every white-background proposal and will reject the next one. The brand is the dark.

### Tokens

```
/* Surfaces — near-black with subtle cyan warmth */
--bg           #09090b  /* page base, slightly warm neutral */
--bg-deep      #09090b  /* alias — kept for legacy token consumers */
--bg-darker    #050a0d  /* wash gradients, nav shadow base */
--panel        #0a1a24  /* cyan-tinted dark — cards, nav, dashboard surfaces */
--panel-2      #0f2030  /* elevated panel (hover rise, focused card) */

/* Borders — cyan-tinted, always 1px, never heavier */
--border       #15303a  /* default hairline */
--border-hot   #1f4a5a  /* hover / focused surface */
--border-live  rgba(0,229,255,.20) /* live / streaming state */

/* Accent — cyan is the brand */
--cyan         #00e5ff  /* primary accent: links, focus, CTAs, connector nodes */
--cyan-dim     #5fb4c4  /* tertiary cyan — mono labels, dim bullets */
--cyan-faint   #2a6775  /* disabled cyan */
--cyan-wash    rgba(0,229,255,.06) /* ambient glow behind panels */
--cyan-soft    #6ff1ff  /* gradient mid-stop */

/* Secondary accent — amber. Use sparingly, cinematic moments only */
--amber        #f59e0b
--amber-wash   rgba(245,166,35,.10)

/* Status — semantic, never decorative */
--ok           #22c55e  /* live, online, pass */
--warn         #f59e0b  /* degraded, pending */
--err          #e5484d  /* failed, stopped */

/* Text — off-white, never pure white */
--text         #e6f4f7  /* primary body */
--text-dim     #9bb6c0  /* secondary body, descriptions */
--text-mute    #7a96a1  /* labels, captions, footer */

/* Cinematic gradient — cyan → amber, scroll-linked */
--grad-cine    linear-gradient(110deg,
                 var(--cyan) 0%,
                 var(--cyan-soft) 38%,
                 #a8e4ec 60%,
                 var(--amber) 92%)
```

### Color roles

| Role | Token | Where |
|---|---|---|
| Page background | `--bg` | `<body>` — never swapped |
| Surface (card, nav, panel) | `--panel` | every bordered rectangle |
| Elevated surface | `--panel-2` | hover state, active card |
| Primary text | `--text` | body paragraphs, titles |
| Secondary text | `--text-dim` | descriptions, sub-labels |
| Tertiary text | `--text-mute` | mono labels, captions, IDs |
| Hairline | `--border` | every 1px card edge |
| Primary action | `--cyan` | CTA fill, link color, focus ring |
| CTA text on cyan | `#001318` | near-black inversion for contrast |
| Cinematic wash | `--grad-cine` | display-type accent words only |
| Status (live) | `--ok` | `online` pills, healthy status dots |
| Status (run) | `--warn` | `running` / `compiling` pills |
| Status (err) | `--err` | reserved — never decorative |
| Amber cinematic | `--amber` | breath-slab washes + gradient tail only |

### Industry dot colors (case studies only)

These are *content-level* dots used as industry markers on case cards. They do not leak into the chrome.

```
healthcare     #00e5ff   /* cyan */
enterprise-ops #6366f1   /* indigo */
trade-dist     #f59e0b   /* amber */
finance        #ec4899   /* pink */
```

---

## 3. Typography Rules

Three type families. Each has one job. Never substitute.

### Families

- **Satoshi** — display/editorial. Weights 700, 900. Used for hero H1, breath-slab lines, section headers, CTA titles. Never body.
- **JetBrains Mono** — instrumentation. Weights 400, 700. Used for every mono voice: section IDs, status pills, metric labels, log streams, coordinates, breadcrumbs, stage numbers, tag IDs. Always uppercase with letter-spacing `.08em`–`.14em`. 10–12px.
- **General Sans** — body prose. Weights 400, 500. Used for paragraphs, metric values, button labels, descriptions. Minimum 14px on mobile, 15px default, never smaller for content text.

If Satoshi or General Sans are unavailable in the runtime (Claude Design may substitute Google Fonts), fall back to: **Satoshi → Archivo Black** (for 900) and **Satoshi → Inter** (for 700). **General Sans → Inter.** **JetBrains Mono is available on Google Fonts** — use the real one.

### Scale

```
Display — hero H1 billboard
  size:    clamp(3rem, 7vw, 6.5rem)
  weight:  900 (Satoshi)
  leading: 0.96
  tracking: -0.03em
  usage:    one per page

Display-slab — breath slabs, CTA cinematic header
  size:    clamp(2.8rem, 12vw, 7rem)  /* 2.8rem floor for 375px */
  weight:  900 (Satoshi)
  leading: 0.96
  tracking: -0.02em
  usage:    breath slabs, cinematic CTA only

Display-2 — section headers (cinematic "We embed. We build." style)
  size:    clamp(2rem, 5vw, 4rem)
  weight:  900 (Satoshi)
  leading: 1.0
  tracking: -0.02em

H3 — panel card titles (stages, case titles)
  size:    1.25rem (20px)
  weight:  700 (Satoshi)
  leading: 1.2

Body — paragraphs, descriptions
  size:    15px / 16px desktop, 14px mobile minimum
  weight:  400 (General Sans)
  leading: 1.55
  color:   var(--text) for primary, var(--text-dim) for secondary

Button label
  size:    13px / 14px
  weight:  500–600 (General Sans) OR 700 (Mono for terminal-style)
  tracking: .02em (sans), .1em (mono, uppercase)

Mono — instrumentation voice
  size:    10–12px
  weight:  400 / 700 (JetBrains Mono)
  tracking: .10em–.14em
  transform: uppercase
  usage:    IDs, labels, pills, coords, log streams, stage numbers
```

### Accent word (cinematic display type)

One word or short phrase per cinematic line carries the cyan→amber gradient (`--grad-cine`) via `background-clip: text`. On scroll-into-view, its `background-position` shifts from 0% → 100%, causing the gradient to sweep across the characters. No more than **one accent word per line**. No more than **two accent lines per section**.

### Line-break rule for display type

Breath slabs and cinematic headers are pre-broken into fixed lines by the copy, not reflowed by width. `<span class="line">` wraps each line. Inside each line, individual words sit in `<span class="word">` so the word-cascade reveal can stagger them. Reduced-motion snaps to final state.

---

## 4. Component Stylings

### 4.1 Button

Two variants. Both 44×44 minimum tap target on mobile.

**Primary (cyan fill, terminal-style):**
```
background:    var(--cyan)
color:         #001318  /* near-black for WCAG contrast */
font:          JetBrains Mono 700 11px / General Sans 600 14px
text-transform: uppercase (if mono) / none (if sans)
letter-spacing: .10em (mono) / .02em (sans)
padding:       10px 18px desktop, 12px 20px mobile
border-radius: 2px
caret:         "→" inline, same color, .4em left margin
focus:         0 0 0 2px var(--bg), 0 0 0 4px var(--cyan)
hover:         brightness(1.08) + slight caret translate 2px right
```

**Secondary (outline):**
```
background:    transparent
color:         var(--cyan)
border:        1px solid var(--border-hot)
(rest same as primary)
hover:         border-color var(--cyan), background var(--cyan-wash)
```

Every CTA routes to `https://calendly.com/hello-ajolotelabs`. No other destinations. No forms. No generic "Contact us" routes.

### 4.2 Status pill

Inline badge with colored dot. Three flavors.

```
.status-pill {
  display:       inline-flex; align-items: center; gap: 6px;
  padding:       2px 8px;
  border:        1px solid var(--border);
  border-radius: 2px;
  font:          JetBrains Mono 500 10px;
  text-transform: uppercase;
  letter-spacing: .10em;
  color:         var(--text-dim);
}
.status-pill::before {
  content: ""; width: 6px; height: 6px; border-radius: 50%;
  background: currentColor;
}
.status-pill--live   { color: var(--ok);    box-shadow: 0 0 8px rgba(34,197,94,.3); }
.status-pill--live::before { animation: pulse 1.6s infinite ease-in-out; }
.status-pill--run    { color: var(--warn); }
.status-pill--deploy { color: var(--cyan); }
```

### 4.3 Panel card

The atomic dense surface. Every dashboard component is a panel.

```
.panel {
  background:   var(--panel);
  border:       1px solid var(--border);
  border-radius: 2px;
  padding:      20px;
  transition:   border-color .2s, transform .2s;
}
.panel:hover, .panel:focus-within {
  border-color: var(--border-hot);
  transform:    translateY(-1px);
}

.panel__head {  /* ID + title + status row */
  display:      flex; align-items: center; gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 16px;
  font:         JetBrains Mono 500 11px;
  color:        var(--text-mute);
  text-transform: uppercase;
  letter-spacing: .12em;
}

.panel__foot {  /* metadata row */
  display:      flex; justify-content: space-between;
  padding-top:  12px;
  margin-top:   16px;
  border-top:   1px dashed var(--border);
  font:         JetBrains Mono 400 10px;
  color:        var(--text-mute);
}
```

### 4.4 Metric cell

Numeric value with mono label + optional fill bar.

```
.mcell {
  padding: 14px;
  border: 1px solid var(--border);
  background: linear-gradient(180deg, transparent 0%, var(--cyan-wash) 100%);
}
.mcell__label {
  font: JetBrains Mono 500 10px;
  color: var(--text-mute);
  text-transform: uppercase;
  letter-spacing: .14em;
}
.mcell__value {
  font: 900 2rem/1 Satoshi;
  color: var(--cyan);
  margin: 6px 0 4px;
}
.mcell__value sup { font-size: .5em; color: var(--cyan-soft); }
.mcell__sub { font: 12px/1.4 General Sans; color: var(--text-dim); }
.mcell__bar {
  display: block; height: 2px; margin-top: 10px;
  background: var(--border);
}
.mcell__bar::after {
  content: ""; display: block; height: 100%;
  width: var(--fill, 0%);
  background: var(--cyan);
  transition: width 1.6s cubic-bezier(.2,.7,.2,1);
}
```

### 4.5 Log stream

Decorative live ticker in the hero right rail.

```
.rail {
  background: var(--bg-darker);
  border: 1px solid var(--border);
  font: JetBrains Mono 400 11px;
  padding: 14px;
  height: 280px;
  overflow: hidden;
  position: relative;
}
.rail__log line {
  display: block;
  color: var(--text-dim);
  padding: 2px 0;
  opacity: 0;
  animation: streamIn .4s forwards;
}
.rail__log line .ok  { color: var(--ok); }
.rail__log line .cyan { color: var(--cyan); }
```

Lines prepend every ~3.2s. Oldest drops off the bottom. `aria-hidden="true"` — decorative only, screen readers skip.

### 4.6 Breath slab

Full-bleed section containing one oversized Satoshi line.

```
.breath {
  min-height: 100svh;  /* svh not vh — iOS Safari correctness */
  display: flex; align-items: center;
  padding: 80px 24px;
  background: var(--bg-deep);
  position: relative;
  overflow: hidden;
}
.breath__wash {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 30% 40%, var(--amber-wash), transparent 60%);
  pointer-events: none;
}
.breath__inner { max-width: 1440px; margin: 0 auto; width: 100%; }
.breath__meta {  /* top-left mono label + top-right coord */ }
.display-slab {
  font: 900 clamp(2.8rem, 12vw, 7rem)/0.96 Satoshi;
  letter-spacing: -0.02em;
  color: var(--text);
}
```

### 4.7 Navigation

Sticky top. 56px tall. 44×44 burger below 900px. Three anchor links with numeric IDs (`01 Services`, `02 Cases`, `03 Contact`). Online status pill. Primary CTA.

```
.nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(10,20,25,.85);
  backdrop-filter: saturate(140%) blur(10px);
  border-bottom: 1px solid var(--border);
}
.nav__inner { max-width: 1440px; margin: 0 auto; padding: 0 24px;
              height: 56px; display: flex; align-items: center; gap: 24px; }
.nav__brand { font: Mono 500 12px; letter-spacing: .12em; text-transform: uppercase; }
.nav__brand b { color: var(--cyan); }  /* "labs" is the cyan word */
.nav__link { font: Mono 500 13px; letter-spacing: .10em; text-transform: uppercase; }
.nav__link[aria-current="true"] { color: var(--cyan);
  border-bottom: 1px solid var(--cyan); }
.burger { width: 44px; height: 44px; border: 1px solid var(--border);
          background: var(--panel); }
```

### 4.8 Mobile menu overlay

Full-screen. Dark. Three nav links at display size + one primary CTA. Tap outside to close. `inert` when closed. Focus-trapped when open.

---

## 5. Layout Principles

**Grid.** 12-column max on desktop, single-column on mobile. Max content width `1440px`, padding `24px` mobile / `40px` desktop. Frame class `.frame` enforces both.

**Section rhythm.** Every section is `min-height: 100svh; display: flex; flex-direction: column; justify-content: center;` so it fills one viewport on desktop. On mobile (≤768px), `min-height: auto; display: block` — let content flow naturally, no forced full-viewport sections (this is what breaks on live v4-2 today).

**Scroll snap.** Desktop only. `html { scroll-snap-type: y mandatory; }` with each section as `scroll-snap-align: start`. **Disable entirely on mobile** — `@media (max-width: 768px) { html { scroll-snap-type: none !important; } }`. iOS Safari scroll-snap is buggy and breaks page flow; mobile users scroll naturally.

**Horizontal containment.** `body { overflow-x: clip; }` globally. Every section and card also needs `overflow-x: clip` or `max-width: 100%` — component-level overflow is the biggest source of mobile bugs.

**Spacing scale (Tailwind-compatible).**
```
4  = 4px    (tight: status-pill gap)
8  = 8px    (compact: mono label spacing)
12 = 12px   (card internal: panel-head padding)
16 = 16px   (default: paragraph-to-next)
20 = 20px   (card outer: panel padding)
24 = 24px   (section side padding on mobile)
32 = 32px   (section vertical padding on mobile)
40 = 40px   (section side padding on desktop, lg card padding)
64 = 64px   (section-to-section breathing on desktop)
96 = 96px   (hero top padding on desktop)
```

**Section-specific layout notes.**

- **Hero:** two-part. Cinematic H1 billboard stacks above a dense console. Console is single-column on mobile, 2-col (main + right-rail log stream) from 1024px up. Hero must fit the first fold at 375px.
- **Services pipeline:** 3 stages. Desktop shows them horizontally with cyan connector dots between them. Below 900px, stages stack vertically — full-width, no horizontal scroll, no clipping inside cards. (Current v4-2 breaks exactly here — stages overflow their container by 200-250px at 360–414px.)
- **Cases:** 4 cards. Desktop: 2-up grid. Mobile: either vertical stack OR horizontal scroll-snap carousel with 1 card per viewport + dot pagination. Must render even if JS fails (progressive enhancement — server HTML first, JS enhances).
- **Breath slabs:** full-bleed. No max-width, no side padding on the slab surface itself — just a centered `.breath__inner` with the type. Two per page: between hero/services and between services/cases.
- **CTA:** cinematic header + description + primary button + three check bullets. Footer is nested inside the CTA section on desktop so they share one snap viewport; on mobile, footer flows below as its own block.

---

## 6. Depth & Elevation

**Flat dashboard, not material cards.** Depth is expressed through borders, glow, and subtle inner gradients — never drop shadows. The brand is terminal, not iOS.

**Elevation tokens.**

```
/* Level 0 — page ground */
background: var(--bg);
box-shadow: none;

/* Level 1 — panel (default card) */
background: var(--panel);
border: 1px solid var(--border);
/* no shadow */

/* Level 2 — elevated panel (hover, focused) */
background: var(--panel-2);
border: 1px solid var(--border-hot);
transform: translateY(-1px);
/* no shadow — the 1px raise + hot border is the elevation signal */

/* Level 3 — modal / overlay (rare) */
background: var(--panel-2);
border: 1px solid var(--border-hot);
box-shadow: 0 8px 32px rgba(0,0,0,.5);
/* shadow allowed here because the overlay truly floats */

/* Level 4 — sticky nav */
background: rgba(10,20,25,.85);
backdrop-filter: blur(10px) saturate(140%);
border-bottom: 1px solid var(--border);
/* no shadow — the blur + hairline + semi-transparent fill is the signal */
```

**Glow (used sparingly).**

- Live status pill: `box-shadow: 0 0 8px rgba(34,197,94,.3)` around the dot.
- Focus ring: `0 0 0 2px var(--bg), 0 0 0 4px var(--cyan)` (double-stack so the cyan ring reads against any surface).
- Cyan brand-mark accent: the `b` in `ajolotelabs` gets a subtle `text-shadow: 0 0 12px rgba(0,229,255,.25)` on hover.

**Inner gradients (metric cells only).** `linear-gradient(180deg, transparent 0%, var(--cyan-wash) 100%)` — a faint cyan glow pooling at the bottom of metric cells. Never used on text cards, nav, or buttons.

**No filter effects.** No `backdrop-filter` outside the sticky nav. No `blur()` on content. No `drop-shadow()` filters. No `mix-blend-mode`.

---

## 7. Do's and Don'ts

### Do

- **Lead headlines with the buyer's pain.** "Stop losing money to manual operations" (verbatim). The brand mechanism (MCP, brain, AI employees) is proof underneath, never the headline.
- **Alternate dense and cinematic.** Billboard → instrument → breath → instrument → breath → close. Never two consecutive dense surfaces, never two consecutive cinematic surfaces.
- **Keep every tap target ≥ 44×44px on mobile.** WCAG 2.2 AA. This is measured, not estimated.
- **Keep every body font ≥ 14px on mobile.** Mono labels can drop to 10–12px because they're labels, not reading text.
- **Use `100svh`, not `100vh`, for full-viewport sections.** `vh` is broken on iOS Safari when the toolbar collapses.
- **Use `overflow-x: clip`** on `<body>`, every section, and every card. Component-level overflow is the silent killer of mobile layouts.
- **Render content server-side, enhance with JS.** Cases, metrics, logs must all have a readable HTML fallback. JS errors must not hide content.
- **Respect `prefers-reduced-motion: reduce`.** Every cascade, parallax, counter tick, bar fill, and gradient sweep snaps to final state.
- **Route every CTA to `https://calendly.com/hello-ajolotelabs`.** Six CTAs on the page, one destination. No forms.
- **Use the mono voice for instrumentation.** Status pills, stage numbers (`stg_01`), section IDs (`sec_02 · case_studies`), breadcrumbs, coords, footer meta.
- **Keep the brand wordmark consistent.** Logo mark 22×22, wordmark `ajolote` + `labs` where `labs` is cyan.

### Don't

- **Don't use white or light backgrounds anywhere.** No cards, no sections, no full pages, no "inverted" moments. The brand is dark, period.
- **Don't add a founder section, about-Pablo page, team page, or founder photo.** Ever. This is a permanent positioning decision — the brand sells infrastructure competence, not a personality.
- **Don't use stock photography, 3D blobs, isometric illustrations, or gradient-mesh backgrounds.** These are the tells of a SaaS template.
- **Don't use emojis in headlines or buttons.** Mono carets (`→`) and status dots only.
- **Don't add cookie banners, chat widgets, or popup modals.** Ever.
- **Don't let component content overflow its container.** A card that clips on mobile is a bug, not a layout quirk.
- **Don't use drop shadows on cards.** Depth comes from borders, subtle raise, and cyan glow — never Material shadows.
- **Don't substitute Inter or System UI for Satoshi in the hero H1.** If Satoshi fails to load, Archivo Black is the fallback — another geometric 900-weight, not a humanist sans.
- **Don't collapse the dense ↔ cinematic rhythm into one register.** Pure dashboard is too cold; pure cinematic is too vague. The contrast is the brand.
- **Don't invent copy for breath slabs.** They reuse existing section copy verbatim ("We diagnose, build, and deploy" / "From day one to full automation").

---

## 8. Responsive Behavior

**Breakpoints.**

```
XS   320-374   /* Android small — must not break */
SM   375-413   /* iPhone SE / 14 — the default mobile target */
MD   414-767   /* large phones, phablets */
LG   768-899   /* tablets portrait — single-column still */
XL   900-1023  /* tablet landscape — nav links appear, burger hides */
2XL  1024-1439 /* small desktop — hero rail appears */
3XL  1440+     /* wide desktop — max-width capped at 1440 */
```

**Mobile-first.** Write the mobile styles first, enhance up. Do not start with desktop and hack down.

**Per-section responsive rules.**

| Section | ≤768px (mobile) | 769–1023px (tablet) | ≥1024px (desktop) |
|---|---|---|---|
| Nav | Burger visible, links hidden, status pill hidden | Burger visible, CTA shown | Full links + status + CTA |
| Hero | Single column, H1 stacks above console, console single-column, no right rail | Single column still, larger padding | 2-col console (main + right log rail) |
| Breath slab | `clamp(2.8rem, 12vw, 7rem)` type, single centered line per row | Same, scaled up | `clamp()` hits max at 7rem |
| Services pipeline | Stages stack vertically, no connector dots, full-width cards | Same, slightly tighter gap | Horizontal 3-up with cyan connector dots between stages |
| Cases | 1 card per row vertical stack OR horizontal scroll-snap (pick one, not both) | 2-up grid | 2-up grid, larger card padding |
| CTA | Stack vertically, single-column check list | Same | Cinematic header left, checks right (optional 2-col) |
| Footer | Single-column stack: brand → links → socials → bottom | 2-col | 3-col grid (brand · services · company) |

**Scroll snap.** Desktop only. `html { scroll-snap-type: y mandatory; }` with each section as snap point. **Explicitly kill on mobile:** `@media (max-width: 768px) { html { scroll-snap-type: none !important; } .hero, .breath, .section, .cta-section { min-height: auto !important; display: block !important; } }`. This is a hard-earned lesson — iOS Safari scroll-snap breaks content rendering inside snap containers, which is why the live v4-2 cases section renders at 0px height on mobile.

**Touch targets.** Every `<a>`, `<button>`, `.burger`, `.nav__link`, `.carousel-dot`, `<input>` must measure ≥ 44×44px at the smallest viewport. Add invisible padding if the visual is smaller. Verified with Playwright at 360/375/390/414.

**Safe-area insets.** Body padding includes `env(safe-area-inset-left)` and `env(safe-area-inset-right)`. Fixed elements account for `env(safe-area-inset-top)` / `bottom` on iOS notched devices.

**Viewport meta.** `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">` — `viewport-fit=cover` enables safe-area insets.

**No-JS fallback.** Every section must render its content without JavaScript. Counters show their final values. Cases render from server HTML. Log streams show a static 4-line snapshot. Cascade reveals snap to visible. Scroll-spy nav is non-functional but nav links still work as anchors.

---

## 9. Agent Prompt Guide

This section tells an AI design or coding agent how to make on-brand decisions when the design system hits a case the spec didn't explicitly cover.

### Voice and register

- **Ajolote speaks in the voice of a veteran operator.** Calm, direct, evidence-forward. Never hype ("revolutionary," "game-changing," "seamless"), never cozy ("we love helping you," "our mission"), never salesy ("unlock your potential," "transform your business"). The tone is: *"Your ops are leaking money. Here's what we built to stop it. Here's what it returned."*
- **Use operational nouns.** Workflows, bottlenecks, agents, deployments, uptime, throughput, integrations, handoffs. Avoid marketing nouns (journey, solution, experience, ecosystem).
- **Numbers are load-bearing.** If a claim has a metric, show the metric. If it doesn't, don't fake one — remove the claim.

### When making a new component

1. **Start with a panel.** Border `--border`, background `--panel`, radius 2px. Hover raises border to `--border-hot`. This is the atom.
2. **Add a mono head row** if the component has an ID, title, or status. Always uppercase, `.12em` letter-spacing, 11px.
3. **Add a body** in General Sans for prose, Satoshi for titles (H3+).
4. **Add a metadata foot row** if there's runtime state to show (phase, output, count, last update).
5. **One status pill per panel maximum** unless the panel itself is a log surface.
6. **Hover state = border color shift + 1px translateY, never a shadow.**

### When making a new section

1. **Decide the register: dense or cinematic.** Never both in one section.
2. **Check the rhythm** — if the previous section was dense, this one is either cinematic (breath slab) or explicitly labeled a different dense pattern (different panel archetype). Never two identical dense surfaces in a row.
3. **Add a section ID** in mono (`sec_04 · new_section_name`) at the top-left. Add a meta/status at the top-right.
4. **For cinematic sections**, use `display-slab` type (`clamp(2.8rem, 12vw, 7rem)`), one accent word with `--grad-cine`, amber-wash radial behind the type.
5. **For dense sections**, use panels as the atoms, lay them out in a 12-col grid.
6. **On mobile, always stack to single-column below 768px.** Kill scroll-snap. Guarantee every card's content fits its container.

### When copying

- Headline leads with pain, never mechanism.
- Pull quotes are from operators, not Pablo. Short, specific, operational.
- Metrics are three-up max per card.
- Case studies follow: industry tag → title → description → metrics → pill row → quote → CTA.
- CTAs route only to Calendly. Link text examples: `Book a discovery call →`, `Book call →`, `Get similar results →`, `Get your operations blueprint.`.

### When asked to "make it more modern" or "make it pop"

**Don't.** The brand's modernity is already maxed out — dense instrumentation + cinematic typography is the signature, and the temptation to "freshen it up" with gradient meshes, glassmorphism, or isometric illustrations is how brands erode into genericness. If something feels stale, the answer is more precision in the instrumentation (better data density, sharper mono voice, more responsive live streams) or a new cinematic moment with tighter kerning and a stronger accent word — never visual noise.

### When asked to add a founder or team section

**Refuse and flag the request.** This is a permanent positioning decision: Ajolote is infrastructure, not a person. Never add an About page, team grid, founder bio, or leadership photo. If the requester insists, point them to this line and ask them to override explicitly.

### When asked for a white/light variant

**Refuse and flag the request.** The brand is dark. There is no light mode. If the user has a legitimate reason (print collateral, slide template for a specific client), produce it as a separate, explicitly labeled artifact that is not the website — and use the same color tokens translated (e.g. dark panel becomes cream paper, cyan stays cyan but shifts to its `--cyan-faint` value for legibility).

### When the spec is silent

Default to the dense voice. Default to mono. Default to cyan on black. Default to 1px hairlines and 2px radius. Default to tap targets 44×44. When in doubt, pick the choice that looks more like a working console and less like a landing page.
