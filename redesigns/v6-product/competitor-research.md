# Competitor Messaging Research — Forward-Deployed / Complex-Agent Companies

**Purpose:** Map how the leading "forward-deployed / complex-agent" companies position and word their marketing, so Ajolote Labs can adopt their strong, battle-tested moves while winning on what they *structurally cannot say*: client ownership / no lock-in, governance-audit moat, named engagement stages, co-build-with-your-experts, eval/hallucination rigor.

**Method:** WebSearch + WebFetch of homepages and product/positioning pages, June 2026. Verbatim quotes are cited to a source URL. Where a homepage could not be fetched cleanly, search snippets are noted as such.

**TL;DR of the landscape:** The CX/contact-center pack (Sierra, Decagon, Cresta) has independently converged on the same trust-and-supervision vocabulary — "guardrails," "supervisor models," "outcome-based pricing," "trust layer." The enterprise-ops pack (HappyRobot, Distyl, Palantir) owns the "forward-deployed / out of the lab / audit-ready / own-the-outcome" register. **HappyRobot is the closest to our thesis and the sharpest writer in the set.** Distyl is the closest to our *business model* (FDE + audit-ready). Nobody combines forward-deployed delivery + you-own-the-result + governance moat + named stages in one message — that gap is our whitespace.

---

## 1. Cognition (Devin)

**Source:** https://cognition.com/ (cognition.ai redirects here)

**Hero headline (verbatim):**
> "Cognition operates Devin, the first autonomous software engineer."

**Subhead (verbatim):**
> "We believe the purpose of technology is to expand human capacity — not by replacing meaningful work but by working alongside people as an exponential collaborator, helping them think deeper and move faster."

**Phrases / moves they lean on:**
- "the first autonomous software engineer" (category-creation, ordinal claim)
- "exponential collaborator" / "engineers function more like architects"
- "plans, writes, tests, and ships production code on its own, working inside your codebase and the tools your team already uses"
- "deployed at some of the largest and most complex institutions in the world"
- "AI should earn its keep" / "AI Productivity Guarantee" (cost/value framing)

**How they talk about:**
- **Complex tasks:** "largest and most complex institutions"; Devin handles the full SDLC loop (plan→write→test→ship).
- **Evals/benchmarks:** Historically SWE-bench was their headline proof; the current homepage references "SWE-1.6" (their own model) but shows **no benchmark numbers on the page** — they've de-emphasized public benchmark bragging on the homepage.
- **Hallucination/reliability:** Not foregrounded on the homepage.
- **Cost:** "AI should earn its keep" + a "Productivity Guarantee" — value/ROI framing rather than price.
- **Ownership/lock-in:** Not addressed. Devin is *their* product running in your codebase — you rent the worker, you don't own the build.
- **Deployment/embed:** Software-only embed ("inside your codebase and the tools your team already uses"). No human FDE.

**Structural blind spot we can exploit:** Cognition sells an *autonomous product you rent*, not an *owned outcome you keep*. There is no human co-build, no governance/audit story, no named engagement. They're software-engineering-only — silent on regulated, governance-heavy operations work, and on the client owning the result.

---

## 2. Sierra (Bret Taylor)

**Sources:** https://sierra.ai ; https://cheekypint.substack.com/p/bret-taylor-of-sierra-on-ai-agents ; https://fourweekmba.com/sierras-4-5b-business-model... ; https://www.cmswire.com/customer-experience/sierra-ais-10b-valuation...

**Hero headline (verbatim):**
> "Better customer experiences. Built on Sierra."

**Subhead (verbatim):**
> "Sierra helps the great companies of the world show up at their best."

**Phrases / moves they lean on:**
- "Build, optimize, personalize, and scale the best AI agents."
- "The agent-building agent" (Ghostwriter)
- "Pay for a job well done" — **outcome-based pricing** ("only pay for the value Sierra delivers")
- "Trust and Safety Layer" — "hallucination prevention, brand voice consistency, compliance guardrails, PII protection, and audit trails for every decision"
- Taylor's principles: "don't overpromise," agents "clearly identify themselves as AI," "supervisor models to watch the underlying models," "deterministic checks around AI calls"

**How they talk about:**
- **Complex tasks:** Less "complex," more "every moment that matters" / "lasting relationships" — CX-relationship framing, not operational-messiness framing.
- **Evals/benchmarks:** No public benchmark numbers; trust comes from architecture (supervisor models) + a wall of compliance certs (SOC 2, ISO 27001/42001, HIPAA, GDPR, EU AI Act, FedRAMP, PCI DSS).
- **Hallucination/reliability:** Strong and explicit. "Real-time supervisor models monitor for hallucination and procedural errors"; off-script reasoning gets "sent back with notes." This is their best move — worth adopting.
- **Cost:** Outcome-based pricing is a flagship differentiator.
- **Ownership/lock-in:** "Built on Sierra" — you build *on their platform*. Classic platform lock-in; ownership is not offered.
- **Deployment/embed:** Multichannel software ("chat, SMS, WhatsApp, email, voice, and ChatGPT"). Ghostwriter builds the agent for you from SOPs/transcripts.

**Structural blind spot we can exploit:** "Built on Sierra" is the opposite of "you own it." Their moat *is* the platform you depend on. No human FDE, no co-build-with-your-experts, CX-only (silent on back-office / regulated operations). Their supervisor-model trust story is excellent and we should match it — but they can't pair it with ownership.

---

## 3. Decagon

**Sources:** https://decagon.ai ; https://decagon.ai/product/aop ; https://decagon.ai/resources/designing-layered-guardrails-for-reliable-ai-agents ; https://decagon.ai/resources/the-future-of-ai-agents-is-test-driven

**Hero headline (verbatim):**
> "The AI concierge for every customer"

**Subhead (verbatim):**
> "Build, optimize, and scale AI agents that treat every customer like the only one."

**Phrases / moves they lean on:**
- "AI concierge" (premium-service metaphor)
- **"Agent Operating Procedures (AOPs)"** — "define agent workflows in natural language" (their signature owned term)
- "Move past complex configuration languages that slow iteration, inflate costs, and drain engineering time"
- "The future of AI agents is test-driven"
- "Watchtower" — "always-on conversation monitoring and QA"; "LLM-as-judge or human experts score responses for accuracy and empathy"
- "Build once. Deploy everywhere."

**How they talk about:**
- **Complex tasks:** Frames *complexity as the enemy* — pitches *away from* "complex configuration languages." Note: this is the opposite of HappyRobot's "we live in your complexity." Decagon sells simplicity of authoring, not mastery of operational mess.
- **Evals/benchmarks:** Strongest QA/eval story in the CX pack. "Test-driven," "guardrail evaluation," LLM-as-judge + human scoring, "offline evaluation." Plus hard outcome metrics (70% resolution, 80% deflection, 95% cost reduction, 3x CSAT).
- **Hallucination/reliability:** Explicit. "If the supervisor detects any signs of hallucination... it can revise the response or trigger an escalation path." "Layered guardrails."
- **Cost:** Framed as cost *reduction* (95% at ClassPass) and as authoring efficiency.
- **Ownership/lock-in:** AOPs let business users edit behavior — control, but on Decagon's platform. No ownership transfer.
- **Deployment/embed:** Omnichannel software (voice/chat/email), single intelligence layer.

**Structural blind spot we can exploit:** Decagon sells *abstraction away from complexity* — they make complex work *feel* simple in their tool. We sell *mastery of complexity that lives in your people and your operations*, owned by you. They have no FDE, no co-build, CX-only. Their "AOP" and "test-driven / Watchtower" vocabulary is strong and adoptable for our governance story.

---

## 4. Distyl AI

**Sources:** https://www.distyl.ai/ ; https://sacra.com/c/distyl-ai/ ; Distyl FDE job listings (fwddeploy.com, pitchmeai.com); search snippets for platform "Distillery / Routines."

**Hero headline (verbatim):**
> "Rearchitecting industries for frontier AI"

**Subhead (verbatim):**
> "Distyl helps world institutions rearchitect their systems for abundant intelligence — without sacrificing human agency and control."

**Phrases / moves they lean on:**
- "Architecting the AI-native enterprise" / "AI-native operations company"
- "**human agency and control are non-negotiable**"
- Processes "complex signals, apply dynamic guardrails, and surface decisions that are both **fast and audit-ready**"
- **Forward-Deployed Engineer model:** FDEs placed on-site "**not to advise, but to own the outcome** alongside the customer"
- End-to-end span: "strategy and system design through to production deployment, monitoring, and continuous improvement"
- "captures every input, output, tool call, and reasoning step for complete auditability"

**How they talk about:**
- **Complex tasks:** "complex signals," regulated industries (telecom, healthcare, insurance, manufacturing), "decisions at production scale" (1B+/yr).
- **Evals/benchmarks:** Less about eval scores, more about *auditability* as the proof — "every input, output, tool call, reasoning step" captured.
- **Hallucination/reliability:** "Dynamic guardrails," "human agency and control," audit trails — reliability framed through governance, not supervisor models.
- **Cost:** "80% reduction in manual review time" (efficiency metric).
- **Ownership/lock-in:** **Closest competitor to our model.** "Own the outcome alongside the customer," "purpose-built products customized to the business." But the platform is still *Distillery* (theirs) — outcome-ownership is rhetorical; the engine is proprietary.
- **Deployment/embed:** **The one that explicitly runs an FDE motion** — forward-deployed teams on-site, production-first, "compresses the cycle from scoping to shipping."

**Structural blind spot we can exploit:** Distyl is our most direct overlap (FDE + audit-ready + own-the-outcome). Their gap: it's a *Fortune-500 / regulated-US-enterprise* play running on *their* platform (Distillery), and there is **no named, legible engagement-stage framework** in their public copy and no explicit "the client *keeps and owns* the code/Node, no lock-in" promise — "own the outcome" is about accountability, not asset ownership. We can out-position by (a) making ownership literal (you keep the Node and the agents), (b) naming the stages, and (c) owning a specific regional/regulatory beachhead (Mexico).

---

## 5. Palantir (FDE origin)

**Sources:** https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer... ; https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers ; https://fde.academy/blog/how-palantir-invented-the-forward-deployed-engineer-model ; https://medium.com/activated-thinker/a-comprehensive-analysis-of-palantirs-forward-deployed-engineering-model...

Palantir is the **origin of the "forward-deployed engineer" framing** — not a positioning competitor for our copy, but the source of the vocabulary everyone else borrows.

**Canonical definitions (verbatim/near-verbatim from sources):**
- "'Forward deployed' was **borrowed from military vocabulary, meaning operating at the point of action rather than from a rear base.**"
- FDEs "embed directly with customers to configure Palantir's existing software platforms to solve their toughest problems."
- "A traditional software engineer focuses on creating a single capability that can be used for many customers; **FDSEs focus on enabling many capabilities for a single customer.**"
- The FDE function is "the company's primary **product discovery and product-formation mechanism**" — "abstractions that appear repeatedly across deployments... generalized into core platform capabilities."
- "Palantir builds something once for one client, watches it fail in interesting ways, and **turns the failure into platform infrastructure.** Every engagement was, functionally, an R&D investment."

**Phrases / moves to mine:** "point of action, not a rear base," "embed directly," "many capabilities for a single customer," "every engagement is an R&D investment," "the library compounds across deployments." This last one is *exactly* our vision-stack thesis (FDE → library compounds → whale becomes closable).

**Structural blind spot:** Palantir is enterprise/government, heavy, opaque, and famously *not* about the client owning anything — it's the ultimate lock-in (you live inside Foundry/Gotham forever). The FDE *concept* is gold; Palantir's *brand* (secrecy, surveillance, lock-in) is the foil we contrast against: forward-deployed rigor **without** the black box and **with** ownership.

---

## 6. HappyRobot (primary benchmark)

**Sources:** https://www.happyrobot.ai/ ; https://www.happyrobot.ai/blog/ai-workers-for-logistics ; https://www.ycombinator.com/companies/happyrobot ; https://www.happyrobot.ai/blog/series-a-announcement

**Hero headline (verbatim):**
> "Power your operations with an AI workforce"

**Subhead (verbatim):**
> "Put agents to work in complex environments"

**Phrases / moves they lean on (this is the strongest copy in the set — quote-mine heavily):**
- > "The limit of what AI can do in your enterprise is not the model. **It's what the model knows about how your enterprise operates.**" ← their thesis line, and **nearly identical to our canonical thesis** ("the model doesn't know how your business runs").
- > "We've taken **AI out of the lab and into the field.**"
- > Complex environments are "**fragmented, operationally messy, exception-ridden enterprises.**"
- > "**battle-tested in high-stakes environments full of exceptions and real consequences** when things go wrong."
- > Agents are "constantly **evaluated against technical and behavioral benchmarks**" — "real-world experience builds context... leveraged for insight and constant improvement."
- "AI workers" / "AI workforce" (the labor metaphor)
- Three pillars: "**Custom, Complex, Multi-function.**"
- "**controlling its own infrastructure and AI models** to ensure reliability and scalability."
- Proof: "78% autonomous execution on critical work" (Kuehne+Nagel); DHL letting agents "run its core logistics communications."

**How they talk about:**
- **Complex tasks:** Best in class. They *celebrate* the mess — "exception-ridden," "operationally messy," "high-stakes." Complexity is the moat, not the enemy (opposite of Decagon).
- **Evals/benchmarks:** "constantly evaluated against technical and behavioral benchmarks" + "battle-tested." Continuous-eval framing rather than a one-time score.
- **Hallucination/reliability:** Reliability via "battle-tested" + owning infra/models. Less explicit on supervisor models than Sierra/Decagon.
- **Cost:** Not price-led; ROI via autonomy %.
- **Ownership/lock-in:** Not addressed — it's their platform / their models. **This is the seam:** they own the infra, the customer rents the workforce.
- **Deployment/embed:** "into the field," real-world, vertical-tuned (fine-tuned on annotated real call data for logistics).

**Structural blind spot we can exploit:** HappyRobot is *vertical-locked to logistics/freight* and runs on *their* infra and *their* models — the customer doesn't own the result and isn't multi-vertical. Their thesis line is so close to ours that we must **out-sharpen, not copy** it, and then add the two things they don't say: **you own it / no lock-in**, and **governance + audit rigor for regulated work**. Their "out of the lab, into the field" and "exception-ridden, operationally messy" are the most adoptable phrases in the entire research set.

---

## 7. Cresta (named engagement stages — bonus)

**Sources:** https://www.cresta.com ; https://cresta.com/blog/building-and-deploying-production-grade-ai-agents-crestas-end-to-end-approach ; https://cresta.com/blog/optimizing-processes-for-ai-success...

**Hero headline (verbatim):**
> "AI agents for every customer conversation"

**Subhead / taglines (verbatim):**
> "One AI platform. Every conversation."
> "The AI platform for every customer conversation"

**Named stages — their signature move:**
- **Three engagement models:** "**Automate / Augment / Analyze.**"
- **A "Crawl, Walk, Run" adoption methodology** — "adopt a Crawl, Walk, Run approach to AI integration with your frontline staff to achieve faster time to value and sticky adoption."

**Phrases / moves they lean on:**
- "the **only unified platform for human and AI agents**"
- "Deliver exceptional CX **for less**" (cost-led)
- "Turn every agent into a top performer with real-time guidance"
- Heavy contact-center integration name-drops (NICE, Salesforce, Genesys).

**How they talk about:**
- **Complex tasks:** Contact-center-specific; complexity is operational scale of conversations, not regulatory mess.
- **Evals/benchmarks:** "Conversation intelligence," QA/coaching metrics; outcome-led (containment, CSAT, revenue).
- **Hallucination/reliability:** Less foregrounded than Decagon/Sierra.
- **Cost:** Explicit cost-leadership ("for less").
- **Ownership/lock-in:** Platform model; human+AI unification is the lock-in (your whole floor runs on Cresta).
- **Deployment/embed:** "Crawl, Walk, Run" is the closest thing in the set to *named engagement stages* — worth studying as a structural template, though it's an adoption-maturity ladder, not an engagement-delivery sequence like ours.

**Structural blind spot we can exploit:** Cresta's stages describe *the customer's adoption maturity*, not *our delivery method*. They have no FDE, no ownership, no governance-audit moat, CX-only. We can out-name them with stages that describe **what we do on-site** (Discovery → Node → Agents → Outward MCP → Maintain) — a delivery sequence, which is more credible and more ownable than a maturity ladder.

---

# SYNTHESIS

## Vocabulary to ADOPT (battle-tested, on-thesis, and credibly ours)

| Phrase / move | Source | Why it's ours to take |
|---|---|---|
| "**out of the lab and into the field**" | HappyRobot | Perfect FDE register; we earn it more than they do (we embed humans, not just software). |
| "**fragmented, operationally messy, exception-ridden**" operations | HappyRobot | Names the complex work we specialize in. Celebrates the mess = moat. |
| "**battle-tested in high-stakes environments**" / "real consequences when things go wrong" | HappyRobot | Reliability framed as field-tested, not benchmarked-in-a-lab. |
| "**the model doesn't know how your enterprise operates**" | HappyRobot (≈ our thesis) | Our canonical thesis — but we must reword to out-sharpen, not echo. |
| "**evaluated against technical and behavioral benchmarks**" / continuous eval | HappyRobot + Decagon | Eval rigor as ongoing, not a one-time SWE-bench flex. |
| "**supervisor models watch the underlying model**" / "deterministic checks around AI calls" | Sierra | The single most credible hallucination-control move; pairs perfectly with our governance pitch. |
| "**audit-ready**" / "every input, output, tool call, and reasoning step captured" | Distyl | Our governance-audit moat, stated concretely. |
| "**own the outcome**" (and we extend it to *own the asset*) | Distyl / Palantir | FDE accountability — we go further to literal ownership. |
| "**many capabilities for a single customer**" / "every engagement is an R&D investment" / "the library compounds" | Palantir | Exactly our FDE→library→whale thesis. |
| Named, legible stages | Cresta (template) | We out-name with a *delivery* sequence, not a maturity ladder. |
| "**production-grade**" / "scoping to shipping" | Distyl / Cresta | Anti-POC, anti-pilot-purgatory credibility. |

## Vocabulary to AVOID (overused, hype, or owned by a competitor)

- **"AI concierge"** — owned by Decagon.
- **"AI workforce / AI workers"** — owned by HappyRobot (and getting generic). We embed *engineers who build*, not a "workforce."
- **"autonomous software engineer" / "the first ___"** — Cognition's ordinal claim; copying it reads as derivative.
- **"Built on [us]" / "One platform"** — the *lock-in* framing (Sierra, Cresta). It directly contradicts our ownership thesis. Never say "built on Ajolote."
- **"outcome-based pricing"** as a hero idea — Sierra owns it and it invites a price conversation; our hard-stop is *never estimate time/price to the client* anyway.
- **"concierge / show up at their best / treat every customer like the only one"** — soft CX-relationship register; wrong for complex operational/regulated work.
- **Bare benchmark bragging** (SWE-bench numbers as hero copy) — even Cognition has retreated from it; reads as lab-flavored, not field-flavored.
- **"abundant intelligence / frontier AI / rearchitecting industries"** — Distyl's lofty abstraction; vague, un-ownable, no proof attached.
- **"Crawl, Walk, Run"** — Cresta-flavored and generic-consulting; our stages should be specific and named.

## OUR WHITESPACE — phrases none of them can credibly claim

1. **You own it. No lock-in.** Every competitor's moat *is* their platform (Built on Sierra, Distillery, Foundry, HappyRobot's infra/models). We are the only one that can say: *we build it inside your walls, on your Node, and you keep it — the code, the agents, the data substrate. We stay to operate it because you want us to, not because you're trapped.* This is the single sharpest wedge in the entire set.
2. **The governance-audit moat as the product, not a compliance footer.** Sierra lists certs; Distyl mentions audit trails. Nobody leads with *governance and auditability as the reason the agent is allowed to touch your most complex, regulated work.* "Anyone can ship an agent. Few can govern one."
3. **Named engagement stages that describe our delivery.** Discovery → Node → Agents → Outward MCP → Maintain. Cresta names *adoption maturity*; we name *what we do on-site, in sequence*. A legible method beats a vague platform.
4. **Co-build with your experts.** Everyone else *replaces* or *deflects* people (Sierra: "human support obsolete"; Decagon: "treat every customer"; HappyRobot: "AI workforce"). We say the opposite and it's true to the FDE model: *the expertise lives in your people; we sit beside them and encode it into agents you own.* This is both differentiated and warmer.
5. **Eval + hallucination rigor *attached to ownership*.** Sierra/Decagon have the rigor but rent you the result; HappyRobot has the field-cred but owns the infra. We're the only one that can pair *supervisor-model / eval / low-hallucination rigor* WITH *you own the audited result.*
6. **A regional/regulatory beachhead (Mexico, Ley Fintech / LFPDPPP).** Everyone else is US-Fortune-500-generic. Owning a named regulatory moat is concrete proof we operate in real complexity.

---

## CONCRETE WORDING SUGGESTIONS

These sharpen the three current variant sets (Hero / Thesis / Platform). Each option is annotated with the competitor move it adopts and the whitespace it claims.

### HERO

**Pain-led** (adopts HappyRobot's "messy" register; claims ownership whitespace):
> **"Your most complex work runs on exceptions, judgment, and tribal knowledge. We build the AI agents that handle it — and you own them."**
> Sub: *Forward-deployed engineers, embedded in your operations, building production agents you keep. Out of the lab, into your floor.*

**Complexity-led** (out-sharpens HappyRobot's thesis line without echoing it):
> **"The hard part was never the model. It's everything the model doesn't know about how you actually operate."**
> Sub: *We embed engineers inside your hardest workflows, encode how the work really gets done, and ship governed agents — owned by you, operated with you.*

**Trust/rigor-led** (adopts Sierra's supervisor-model move + Distyl's audit-ready; claims governance whitespace):
> **"Anyone can ship an agent. Few can govern one for work where mistakes have consequences."**
> Sub: *Evaluated against your benchmarks, supervised against hallucination, audit-ready end to end. Built inside your walls, owned by your team.*

### THESIS

**Canonical** ("model doesn't know how your business runs" — reworded to beat HappyRobot):
> **"A frontier model is brilliant and blind. It can reason about anything except the one thing that matters: how your business actually runs."** We forward-deploy engineers to close that gap — not with a demo, but with production agents that live in your operations and belong to you.

**Complexity 80/20** (celebrate the mess, HappyRobot-style):
> **"The last 20% of your operations — the exceptions, the edge cases, the 'it depends' calls — is 80% of the cost and 100% of the reason generic AI stalls in pilots."** That messy 20% is exactly where we deploy.

**Expertise-lives-in-your-people** (co-build whitespace — the warm, true differentiator):
> **"Your edge isn't in a model. It's in the people who know which exception matters and why."** We sit beside them, encode that judgment into agents, and hand you the keys. The expertise stays yours — now it scales.

### PLATFORM

**"The brain"** (substrate framing without HappyRobot's "workforce"):
> **"One governed substrate — your Node — under every agent we build."** Agents come and go; the Node compounds. Every engagement adds to a library that makes the next agent faster, cheaper, and safer — and all of it is yours.

**Technical-bar** ("anyone can ship an agent, few can govern one" — the governance moat):
> **"Shipping an agent is a weekend. Governing one for regulated, high-stakes work is the whole job."** Evals against your benchmarks. Supervisor models watching for hallucination. Every input, tool call, and reasoning step captured and audit-ready. That's the bar we build to.

**Co-build-operate** (Distyl's "own the outcome," extended to own-the-asset + stay-to-operate):
> **"We don't advise and leave. We don't sell you a platform and lock you in."** Five named stages — Discovery, Node, Agents, Outward MCP, Maintain — co-built with your experts. You own the result. We stay to run and improve it, because that's the business model.

---

## One-line positioning candidates (distilled)

- "Forward-deployed AI engineering for your most complex work — **built inside your walls, owned by your team, governed to a bar mistakes can't cross.**"
- "**Out of the lab, into your operations.** The complex-work agents others can't govern — and you actually own."
- "Anyone can ship an agent. **We govern, audit, and operate the ones your business can't get wrong — and hand you the keys.**"

---

### Source list (verbatim quotes)
- Cognition/Devin — https://cognition.com/
- Sierra — https://sierra.ai ; https://cheekypint.substack.com/p/bret-taylor-of-sierra-on-ai-agents ; https://fourweekmba.com/sierras-4-5b-business-model-how-bret-taylor-built-the-ai-agent-that-makes-human-support-obsolete/
- Decagon — https://decagon.ai ; https://decagon.ai/product/aop ; https://decagon.ai/resources/designing-layered-guardrails-for-reliable-ai-agents ; https://decagon.ai/resources/the-future-of-ai-agents-is-test-driven
- Distyl — https://www.distyl.ai/ ; https://sacra.com/c/distyl-ai/
- Palantir (FDE) — https://blog.palantir.com/a-day-in-the-life-of-a-palantir-forward-deployed-software-engineer-45ef2de257b1 ; https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers ; https://fde.academy/blog/how-palantir-invented-the-forward-deployed-engineer-model
- HappyRobot — https://www.happyrobot.ai/ ; https://www.happyrobot.ai/blog/ai-workers-for-logistics ; https://www.ycombinator.com/companies/happyrobot
- Cresta — https://www.cresta.com ; https://cresta.com/blog/building-and-deploying-production-grade-ai-agents-crestas-end-to-end-approach
