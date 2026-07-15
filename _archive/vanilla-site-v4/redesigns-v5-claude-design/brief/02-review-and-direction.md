# Review & Direction (Phases B–D)

Built on: the current-site map, `00-goals.md`, the FDE-positioning research, and the **Phase-A-verified** UX/UI evidence (`references/ux-ui/_SYNTHESIS.md` §e).

---

## Phase B — Current site: strengths / weaknesses / reusable assets

**What it is today:** a 3-section single page — hero diptych (H1 + static deliverable card) → 3 service-layer cards → 2 case cards → footer. (Note: `index.html`/`cases.json` carry uncommitted local copy edits; keep/revert is a checkpoint.)

**Strengths (keep):**
- A real, opinionated dark "instrument-panel" design system already exists (`DESIGN.md`, tokens, components) and the site holds **Lighthouse 100/100/100/100**.
- Copy is already on-thesis (operator: "we build it, we run it, we never leave").
- Cinematic hero + word-cascade/marquee motion are on-brand and built.

**Weaknesses vs goals (`00-goals.md` = twin goal: category-legibility + convert):**
1. **No engagement-shape / "maintain" story** — the operator-not-consultancy differentiator (your whole thesis) is *invisible*. Biggest gap.
2. **Thin proof** — 2 case cards with vanity-ish metrics; no aggregate/anonymized proof band, no sector-credibility line (the Distyl move), no trust/compliance signal.
3. **No qualification** ("who this is for") and **no explicit operator-vs-consultancy/SaaS** differentiation.
4. **Hero deliverable card is static** — underuses the instrument-panel capability; misses a "this runs" proof beat.
5. **Only 3 sections** — too thin to carry both category-education and conversion.

**Reusable assets (build FROM, not around):** `.panel`, `.status-pill`, `.mcell` + `[data-counter]`/`[data-fill]` count-up/fill JS, `.stage`, `.case`, cascade word-reveal, marquee gradient, scroll-snap, IntersectionObserver reveals, carousels, sticky CTA, magic-card cursor. Every `main.js` behavior is framework-agnostic and migrates to new markup.

---

## Phase C — Adopt / Adapt / Reject (finalized against Phase-A evidence)

| Reference pattern (verified source) | Verdict | How it maps to Ajolote |
|---|---|---|
| Numbered scroll chapters narrating the engagement (Linear 1.0–5.0) | **Adopt** | New `<section>` per stage Discovery→Maintain; reuse cascade + IO reveal. This fills weakness #1. |
| Big-number metric treatment, **count-up on view** (Ramp — verified live-ticker; we do one-time count-up, no fake "live") | **Adopt** | Existing `.mcell` + `[data-counter]` JS already built |
| **Anonymized sector-credibility line** — "Trusted by leaders across [sectors]", zero logos (Distyl — verified) | **Adopt** | New one-liner + a small "Signals" metric band; fills weakness #2; solves the no-logos constraint |
| Compliance/trust strip (Sierra) → LFPDPPP / consent+audit (MX posture) | **Adapt** | New mono badge row |
| Anonymized operator-POV case cards (Anduril realism, anonymized) | **Adapt** | Reskin existing `.case` cards (problem → node/agents → result) |
| Dark full-bleed hero w/ **abstract telemetry** motion — NO brain, NO video (Palantir/Anduril are dark+video; we can't shoot video) | **Adapt** | Canvas ambient layer; dark is now a *verified differentiator* (Ramp/Distyl are light) |
| Restrained reveal-on-scroll, no pinned parallax (Linear) | **Adopt** | Existing IO reveal; honor `prefers-reduced-motion` |
| Named-logo walls / product video / light backgrounds | **Reject** | Violates anonymized-cases + dark-only stakes |
| **Time-to-impact claims** ("outcomes in weeks" — Distyl/labs) | **Reject** | Violates "never estimate time to the client" invariant |

---

## Phase D — Proposed direction: "The Instrument Panel"

A dark, chaptered operator console that **narrates an engagement** — built on the existing design-system components.

- **Hero:** full-bleed dark; mono kicker ("AGENT INFRASTRUCTURE OPERATOR") + one **left-aligned** declarative H1 (Palantir register, Ramp structure) + single Calendly CTA; faint **telemetry canvas** behind (no brain, no video).
- **Spine — the missing story:** the 5-stage playbook (Discovery → Node → Agents → Outward MCP → **Maintain**) as numbered scroll chapters. Stage 5 never "completes" — that's the operator/permanence stake the live site lacks.
- **Proof band ("Signals"):** anonymized sector line ("Operators across spirits, healthcare & loyalty") + count-up metric cards + 2–3 anonymized operator-POV case cards + LFPDPPP/consent+audit badge strip. **No client names, no time claims.**
- **Close:** restated thesis + Calendly.
- **Copy steals (verified):** "throughout the lifecycle of an engagement"; MCP-native deliverable vocab ("MCP servers, sub-agents, agent skills in production"); the wedge — *the labs say "we deploy"; we deploy **and operate it forever**.*
- **Motion budget (tight):** hero canvas loop + IO reveal-on-scroll + one-time count-up + hover. **anime.js NOT required** (existing CSS/IO/canvas cover it); stay zero-dependency, protect Lighthouse.

### Open decision (checkpoint)
**Scope:** evolve the current production `index.html` in place (graft chapters + proof band + telemetry hero onto existing structure — lowest Lighthouse risk) **vs.** build a fresh v5 in the sandbox then promote after a head-to-head. → needs Pablo.
