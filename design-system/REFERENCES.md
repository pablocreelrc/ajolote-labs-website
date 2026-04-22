# REFERENCES.md — Aspirational external references

**⚠️ Read this first: the sites below are atmospheric anchors that BLEND INTO ONE Ajolote output.** They are **not** five separate designs to produce, not a ranked menu to pick from, and not variants to generate. Every Ajolote design inherits qualities from *all five simultaneously* — that combined vibe is the brand calibration.

If an agent is asked to "do 5 designs from REFERENCES.md," that request is malformed — redirect it to generate **one** design that fuses the atmospheric qualities of all five.

**What "good" looks like for Ajolote.** When Claude Design (or any agent) needs to calibrate the brand atmosphere beyond the abstract tokens, these are the sites whose vibe we reference. None of these are Ajolote — they're calibration anchors.

The most common reason Claude Design output looks generic is that it has no aspirational reference. Per Ryan Mather (Anthropic designer) and Reddit consensus: **3-5 specific reference sites, named explicitly, dramatically shape the output** — when fused, not produced separately.

---

## The one-line vibe

**"Linear meets Stripe Dashboard meets a SOC terminal."**

- **Linear's** editorial calm, obsessive typographic rhythm, and cyan/grayscale restraint.
- **Stripe Dashboard's** dense instrumentation, mono labels, and "every pixel earns its place" dashboard language.
- A **Security Operations Center terminal's** 2am calm — status pills, live logs, dashboards that happen to be beautiful because they're functional, not because they're pretty.

If an agent's output doesn't evoke at least one of those three, the output is wrong.

---

## The reference set (atmospheric ingredients — blend into one)

Each entry below contributes a *quality* to the Ajolote atmosphere. The final design inherits all five qualities at once. Do not mimic any single site — borrow the specific attribute noted under "What to borrow" from each, and fuse.

### Ingredient 1: Linear — https://linear.app

**What to borrow:**
- Editorial calm. Huge typographic display moments, then dense UI. Cinematic ↔ instrument alternation is exactly what Ajolote does.
- Dark-default palette with one cool accent (Linear's purple ≈ Ajolote's cyan).
- Obsessive kerning and tracking. Satoshi-style geometric display type.
- Extremely restrained motion. Everything reveals, nothing dances.

**What to ignore:**
- Linear sells project management — product copy is different.
- Linear has hero illustrations; Ajolote never will.

### Ingredient 2: Stripe Dashboard — https://stripe.com/

**What to borrow:**
- Dense data panels with mono labels, status pills, numeric tickers, metric grids.
- Every dashboard surface reads as production software — never a mockup.
- Typography hierarchy: sans for structure, mono for instrumentation, display for editorial moments.
- 1px hairline borders, 2px radii, flat depth (no drop shadows).

**What to ignore:**
- Stripe's marketing site (stripe.com/home) is light-themed — not our mode.
- Stripe uses illustrations of objects on the marketing surface; Ajolote doesn't.

### Ingredient 3: Vercel — https://vercel.com

**What to borrow:**
- Monochrome discipline with selective accent. Vercel's black-and-near-white corresponds to Ajolote's black-and-cyan.
- Geist Mono for instrumentation. JetBrains Mono is our analog.
- Developer-native voice: terminal echoes, `$ command` prompts, deployment states.
- Minimal content density — confidence through whitespace.

**What to ignore:**
- Vercel leans pure grayscale; Ajolote has the cinematic cyan-to-amber gradient moments they don't.

### Ingredient 4: Supabase Dashboard — https://supabase.com

**What to borrow:**
- Open-source-y terminal feel. Dark background with green + cyan accents.
- Real-time log streams visible on the marketing page itself.
- Database-adjacent copy voice: operational, precise, numerically-grounded.
- Dense panel cards with table-like content, mono IDs.

**What to ignore:**
- Supabase uses green as primary; we use cyan. Palette is different, density is the reference.

### Ingredient 5: Railway — https://railway.app

**What to borrow:**
- Cinematic dark marketing surface that looks like a production app, not a pitch.
- Hero typography is Satoshi-adjacent — large, confident, geometric.
- Deployment-operations copy voice.
- Subtle amber warmth in a cyan/black palette (Railway's purple ≈ our amber moments).

**What to ignore:**
- Railway has more illustration; we stay pure dashboard.

---

## Anti-references (never look like this)

When the agent drifts, these are what to avoid:

- **Notion marketing site** — too illustrated, too approachable, too consumer-friendly.
- **ClickUp, Monday.com** — bright, rainbow-saturated, emoji-laden. We're the opposite end.
- **Dribbble dark dashboards** — over-styled with excessive shadows, gradient cards, glassmorphism. Looks designed, not functional.
- **Crypto exchange UIs (Binance-ish)** — dark but chaotic, too many colors, information-dense in a cluttered way.
- **Generic AI startup landing pages** — gradient meshes, isometric illustrations, floating 3D blobs, chatbot widgets bottom-right, "powered by AI" stamps.

If Claude Design's first draft looks like any of these, reject and redirect.

---

## How to use this in Claude Design

**Upload screenshots of references 1-5 into the org's Add Assets** (save them from each site and upload as image references). **Name them explicitly in chat during the extraction:**

> "These are aspirational references. The vibe is Linear meets Stripe Dashboard meets a SOC terminal. Specifically:
> - Linear-1.png / Linear-2.png — editorial calm, cinematic ↔ instrument alternation, cool accent on dark
> - Stripe-dashboard-1.png / Stripe-dashboard-2.png — dense instrumentation, mono labels, status pills, flat depth
> - Vercel-1.png — monochrome discipline, developer-native voice, terminal echoes
> - Supabase-dashboard-1.png — real-time log streams, operational copy, panel cards
> - Railway-1.png — cinematic dark marketing, Satoshi-adjacent hero, operations-first language
>
> Extract atmospheric feel from these — not content, not color palettes (we have our own), not specific components. Atmosphere only."

**Do NOT** commit these screenshots to git. They're third-party IP. They live only in Claude Design's upload buffer for your org.

**DO** keep the *names* and *URLs* in this file so future agents know what's been used.

---

## When to update this list

- **Add** when you discover a new site whose vibe captures something Ajolote's brand is trying to do and DESIGN.md hasn't articulated yet.
- **Remove** when an anchor stops being relevant (e.g., a referenced site redesigns away from the vibe).
- **Review** before every major Claude Design project kickoff.
