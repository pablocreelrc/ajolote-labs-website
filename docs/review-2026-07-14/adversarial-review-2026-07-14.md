# Adversarial dual-LLM review. v6 · 2026-07-14

Two independent critics reviewed the same 13-screenshot evidence set (current build, desktop 1440 + mobile 390) of the post-polish, post-ownership-removal v6. Critic B = cold skeptical buyer (conversion/trust). Critic D = design director (craft). Findings below are filtered: consensus items first, then single-critic items I verified against the live build, then claims I refuted with ground truth. Locked decisions (dark theme, no founder, qualitative cases, brain-visual bet, geo-light) were out of scope.

## Scores and the headline

- Buyer: **42/100** ("would a qualified buyer book the call") — verdict: maybe, leaning no.
- Design: **70/100** (visual/interaction craft) — verdict: confident cohesive dark system, "assembled" in the joints.

The 28-point gap is the whole story: **the site is well-crafted but sells to an engineer who already believes, not to the skeptical non-technical operator its own headline names.** Craft is not the bottleneck. Comprehension and trust are.

---

## Tier 1 — Consensus (both critics flagged independently; highest confidence)

### C1. The accent-word gradient renders as muddy khaki. CONFIRMED
Both critics, and verified in CSS: the marquee gradient is `cyan 0% → pale-cyan 38% → rgb(168,228,236) 60% → amber 92%`. The pale-cyan-to-amber segment interpolates through a dull khaki/olive, so "manual", "operations.", "a brain.", "first call." all dip to a tan midtone mid-word. It reads as a rendering bug, and it is on every hero headline (the most-seen element on the site). Severity: high.

### C2. The particle brain competes with the text it sits behind. CONFIRMED
Both critics. Worst at the CLOSING section (brain opacity 0.42, densest field) directly behind the converting sub-copy, the process line, and the trust checks; and on mobile platform/CTA where body copy sits on the poster particles. Note: Lighthouse accessibility is 100 (automated AA contrast passes), so this is a perceptual/craft issue over the image, not a formal contrast failure. Severity: medium-high.

### C3. Green is an unsanctioned third accent. CONFIRMED
Both critics: the "● ONLINE" pill (green) and the console "✓" checkmarks sit outside the stated cyan+amber palette and read as a stray Bootstrap-ism on an otherwise disciplined scheme. Severity: medium (easy fix).

### C4. Empty lower thirds on the scroll-snap panels. CONFIRMED
Both critics: hero, thesis, and cases are top-anchored in 100vh sections, leaving large voids below on desktop and the first mobile swipes. Buyer reads it as "is that all?"; designer reads it as inconsistent vertical anchoring (content top-aligned, but the CTA centers). Severity: medium.

---

## Tier 2 — Verified single-critic findings (real against the live build)

### C5. Jargon alienates the non-technical buyer. (Buyer, blocker)
"A frontier model is brilliant", "build the Node", "CONNECT MCPS", "AI Employees", plus a fake console log. The operator the headline targets ("stop losing money to manual operations") does not speak this, and nothing defines it. The design critic corroborates from craft: the eyebrow micro-labels use three different grammars (code-syntax "NEXT.DEPLOY = YOU", snake_case "WHY_WE_EMBED", plain caps "ONE BRAIN OVER EVERYTHING YOU RUN"), and the console text is tiny illegible mono. This is the single biggest conversion issue. Severity: high/blocker.

### C6. "What actually happens" is never answered. (Buyer, blocker)
The only description of the engagement is a 5-token arrow strip ("01 Discover → 02 Build the Node → 03 Deploy Agents → 04 Connect MCPs → 05 Operate with you"), two tokens of which are jargon. No sense of sequence, horizon, or what the buyer would experience after booking. Severity: high.

### C7. The /cases route is a dead-end duplicate. (Buyer, high; Designer noted the margin break)
Clicking "Cases" (the one link a skeptic uses to dig for proof) delivers the same two cards as the homepage plus a back button. The design critic separately flagged that the "Back to home" link on that route breaks the left gutter (flush to x=0). A wasted click on the proof section confirms "there's no substance." Severity: high.

### C8. "AI Employees / AI workforce" reads as "we replace your people." (Buyer, high)
To the operator whose team is affected, the framing triggers a headcount-threat reflex and undercuts the site's own "collaboration, not dependence" line. Strategic copy concern. Severity: medium-high.

### C9. Trust scaffolding is thin for a whole-operation handover. (Buyer, high)
Beyond the deliberately-qualitative cases, there is no scale signal ("N deploys"), no security/compliance line beyond tiny footer text ("audit · consent · privacy by default"), no verifiable credibility marker. The trust checks are unverifiable assertions. (The "no hard numbers" part is the known, separately-tracked proof gap; the actionable-now part is a scale or security cue.) Severity: medium-high.

### C10. Secondary CTAs dilute the single conversion path. (Buyer, medium)
Nav offers "Contact" alongside "Book a discovery call", and the hero adds "See how we work" — three verbs, unclear if Contact and Book go the same place. Every alternative leaks the visitor sideways. Severity: medium.

### C11. Micro-label grammar inconsistency. (Designer, medium-high) — folded into C5, but also a standalone craft fix.

### C12. Mobile menu is a short panel, not a deliberate full-screen menu. (Designer, medium) PARTIALLY VALID
Verified: the drawer panel is opaque (rgb 9,18,23) and covers the top 34%; below it a scrim dims the page to 38% (rgba 4,10,14,.62). So the critic's "hero shows at near-full legibility" is overstated (it IS dimmed), but the structural point stands: it reads as a dropdown, not a full-height takeover. Judgment call, not a bug. Severity: low-medium.

### C13. Mobile footer nav wraps raggedly. (Designer, low-medium)
"HOW WE / WORK", "BOOK A DISCOVERY / CALL" forced into a cramped 3-column row. Severity: low-medium.

### C14. No pricing or fit/scale signal. (Buyer, medium)
No range, model, or "typically works with companies of X size", so buyers can't self-qualify. Severity: medium (partly a deliberate B2B choice; a single fit cue would filter better than silence).

### C15. Cases copy is abstract, not visceral. (Buyer, low-medium)
Even without numbers, the cards stay high-concept; only "Margin leaks caught before product ships" lands. Concrete before/after language would help within the qualitative constraint. Severity: low-medium.

---

## Tier 3 — Refuted or downgraded (checked against ground truth)

### R1. "THE BRAIN card is shifted right and cuts through the MODELS cell." (Designer D3) REFUTED
Measured: the brain core is centered at x=1015, exactly the 2×2 grid center, overlapping all four quadrants symmetrically by design (a hub over four nodes). It is not shifted, and it does not single out MODELS. The related sub-point — the connector lines are very faint, so the system-diagram reading is weak — is plausible and kept as a low-severity clarity note.

### R2. "Arbitrary card emphasis: BRAIN + GOVERNANCE bright, others dim, looks like leftover hover." (Designer M4b) DOWNGRADED
This is the diagram's sequential in-view highlight animation (the active node cycles: an earlier capture caught MODELS lit). It is intentional motion, not a leftover state, though a static first glance can misread it. Severity: low.

### R3. "Body copy fails WCAG AA." (Designer D2c) REFUTED as a formal failure
Lighthouse accessibility = 100 on both devices; automated AA contrast passes. The real, kept concern is perceptual legibility of text over the particle field (see C2), not a contrast-ratio failure on solid backgrounds.

### R4. "Mobile diagram degrades to a plain list." (Designer M4a) BY DESIGN
The mobile vertical sequence is the deliberate prior-audit fix; it trades the spatial hub metaphor for legibility on a phone. Fair tradeoff observation, not a defect.

---

## Ranked action list (if we act)

1. **C1 gradient** — retune to a cyan-family gradient (or move the amber stop past the neutral) so no headline routes through khaki. High impact, low effort, whole-site.
2. **C5/C6/C11 jargon + engagement clarity** — the biggest conversion lever: translate "brain / Node / MCPs / AI Employees" into operator language at least once, unify the eyebrow grammar, and make the 5-step strip say what happens. Copy-led; needs Pablo's voice.
3. **C2 particle legibility** — add/strengthen the local scrim on the CLOSING copy and mobile body blocks (the CTA field is the densest).
4. **C7 /cases dead-end** — either make /cases deeper than the homepage or drop the separate route; fix the back-link gutter.
5. **C3 green accent** — recolor the ONLINE pill + console ✓ to cyan (or drop the pill per C-buyer's "unexplained gimmick").
6. **C4 voids / C10 CTA dilution / C12 menu / C13 footer wrap** — a batch of medium craft fixes.
7. **C8/C9/C14/C15 copy + trust** — strategic messaging pass (fold into the separate proof/case-study phase).

Note the split: items 1, 3, 5, 6 are mechanical craft fixes I can dispatch like the last pass. Items 2, 7 are copy/positioning calls that need Pablo, not an agent.
