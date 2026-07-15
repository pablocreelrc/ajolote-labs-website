# Business case — Desclub (Loyalty Solutions)

> Working doc for the v6 website cases. **Goal-forward framing:** this leads with the transformation we're driving and its system design, then shows the foundation already in place as proof it's underway. Discipline kept: scope/financial figures are labeled **[TARGET]**; modeled effects are **[modeled]**; built artifacts are **[measured]** with cited paths; no invented outcome numbers.
> Source root: `…\Files\Desclub\` · read-only.

## 1. Snapshot
- **Client:** Loyalty Solutions / Impulsora Whiterock — a 20-year-old Mexican white-label loyalty/discount operator (DescluB, Aliado eTicket, BBVA, Scotiabank); ~20–21M MXN revenue at breakeven.
- **Vertical:** consumer loyalty & retention / B2B2C.
- **The transformation in one line:** take a 20-year-old loyalty company that runs on Excel, email, and one person's memory of the membership system, and **turn it AI-native** — its operations automated, its retention run by data, and the company positioned for an exit.

## 2. The GOAL (the transformation we're driving)
An **AI-native loyalty company** that runs lean, grows again, and is ready to sell.

- **The operation automates itself.** The whole back office — partnerships, memberships, communications, CX, design, finance — moves off manual Excel/email onto a documented automation stack, freeing the team for sales, strategy, and product. **Target: cut manual data entry from ~27–40 hrs/month (on contract processing alone) to under 5.** **[TARGET]**
- **Retention is run by data, not guesswork.** Cohort economics drive a ranked set of retention plays (dunning, reactivation, onboarding, tier-targeting) instead of blanket campaigns.
- **The team is restructured to higher-value work.** As automations prove out, overhead shrinks (design 6→3, Alianzas 6→3–4, VCorp dependency removed) and people shift to creative, sales, and supervision. **[TARGET — evidence-based, post-automation]**
- **New revenue, including a productized AI offering.** A commercial engine that actually signs clients again, plus a **WhatsApp Concierge** that ships loyalty intelligence straight into the consumer experience — sellable to other brands.
- **Exit-ready.** Documented processes, clean cash conversion, and valuation work position LS for a sale or sustained dividends. **Signed scope: 750K MXN fee · +15% new clients · 5% liquidity event >15M MXN · 12–24 months.** **[TARGET]** *(`Estrategia\…\Final turnaround proposal and actions.pdf`)*

Frame: a **Bibeault-style turnaround** (the decline is internal/operational, not market) executed AI-natively across three phases — cultural/productivity → commercial/product → exit prep.

## 3. The system design (how the company gets transformed)

### a. The map — every workflow, ordered to automate
A complete, dependency-ordered blueprint: **46 automations across 6 layers**, built bottom-up with a hard quality gate. *(`Automatización\MASTER-automation-specs.md`, v1.1)*
- **L0 Infrastructure (5):** n8n (dev + Cloud Pro prod), Supabase (replaces the legacy CRM), Monday workspace, a credentials vault.
- **L1 Data Foundation (6):** one Supabase source-of-truth schema + migrations off the legacy CRM and the single-point-of-failure VCorp membership system + realtime Monday sync.
- **L2 Business Logic (14):** prospect→approval→contract (Adobe Sign) flow, member alta/baja, branch geocoding, multi-project design intake, BBVA Salesforce upload, promo/trivia loading.
- **L3 Communications (10):** welcome emails/push, campaign scheduling, AI newsletter + CX drafts (human-reviewed), Slack notification hub, renewal alerts, NPS.
- **L4 Analytics (7):** commission auto-calc, affiliation + benefits-network reports, campaign-performance, CX-motives, design-capacity, and churn dashboards.
- **L5 Intelligence (4):** a **lead-generation multiagent**, AI content generation, a **FAQ agent** (RAG), and **contract/document AI** (vision + extraction).
- **The method is the safeguard:** every automation runs in a **sandbox in parallel with the human process until it proves ≥95% precision**, then the role is reorganized — and every AI output stays **human-in-the-loop** before anything client-facing.

### b. The agent universe — AI employees per business area
- **Sales / Alianzas:** a Lead-Generation multiagent (Maps discovery → Claude filter → decision-maker enrichment + drafted outreach, human-approved). **[envisioned]**
- **Marketing / Growth:** an AI content agent (3 copy variants per campaign) + campaign automation. **[envisioned]**
- **Customer Success / CX:** a CX auto-response agent + a CX-motives categorizer, and the **WhatsApp Concierge** as a sellable consumer product. **[envisioned]**
- **Operations / Memberships:** alta/baja automation that retires the VCorp single-point-of-failure. **[envisioned]**
- **Design / Media:** the **Media Automation Pipeline** for the 300–400 BBVA maquetas/month. **[built, see §4]**
- **Finance:** commission auto-calculation (removes politically sensitive manual Excel). **[envisioned]**
- **Knowledge:** a FAQ/RAG agent + contract/document-AI extraction. **[envisioned]**

### c. The substrate — Claude Code as the orchestrator
The connective layer is **11 MCPs** with Claude Code driving the whole stack — *building, deploying, monitoring, and modifying* the automation architecture, not just running a workflow: **n8n (dev+prod), Supabase, Monday, Figma, Firebase, Brevo, Google Maps, Slack, Salesforce, Adobe Sign.** This is the "MCP layer that ships intelligence into Desclub's operations and consumer products." *(`Automatización\MASTER-automation-specs.md` item 0.5; `.planning\PROJECT.md`)* **[design]**

## 4. The foundation already built (proof the transformation is underway)
The diagnosis and the data layer aren't slides — they're running:
- **DescluB Network Dashboard** — a live ETL + semantic layer over the production database, tracking network health daily: **1,151 brands · 10,619 stores · 2,552 promotions · 5,462 leads**, with "dead inventory," acquisition velocity, and per-executive lead→brand conversion. Data current through late May 2026. **[measured]** *(`network_dashboard_etl.py`, `DEFINITIONS.md`, `desclub_schema_scan.md`)*
- **CRM & database-marketing analytics suite** (Aliado eTicket) — cohort/customer-equity modeling over **472,859 members and 3.29M payment events**, yielding **7 ranked retention plays** (smart-retry dunning, dormant reactivation, onboarding-cliff, tier-targeting, profit-max targeting, data quality) with quantified expected effects (e.g., smart-retry → ~23% cancellation reduction) and corrected unit economics (**$20.54 margin/sub/month**). Foundation spec locked 2026-05-30. **[measured analysis; effects are [modeled]]** *(`CRM & Database Marketing\…\FOUNDATION-SPEC.md`, `build_p*.py`)*
- **Growth-marketing engine — live.** A Next.js analytics dashboard measuring real multi-channel performance (Facebook / Instagram / LinkedIn / TikTok) through June 2026 — the strategy executed, not just recommended (organic so far; paid is next). **[measured]** *(`Marketing\Campaigns\2026-05-Launch\`)*
- **Media Automation Pipeline — build-complete.** The full Slack `/create-asset` → Claude-Vision intake → creative plan → designer → QA → delivery flow (9 n8n workflows, Figma + Claude + Slack). Built and ready; awaiting final n8n deployment + webhook wiring. **[measured-built, not yet live]** *(`Automatización\Media\`)*
- **App redesign suite** — a UX audit + **6 white-label Next.js prototypes** (desclub-next, tamex-next, ado-, begrand-, ls-, ultramar-next), code-ready. **[measured-built]** *(`App\`)*
- **Org rewiring underway:** Monday mandated, Slack made primary, Gemini rolled out — the cultural-phase changes are in effect. **[measured]**

## 5. Why it compounds (the bigger play)
Desclub is the **consumer-loyalty proof point** for the repeatable Ajolote model. The generic assets it produces — a **loyalty/CRM MCP**, the lead-gen + CX + content agent patterns, the cohort-retention play library, and especially the **WhatsApp Concierge** as a productized, sellable consumer offering — drop into Ajolote's library and into LS's own product line. Build → maintain → improve → you own it: one turned-around loyalty company becomes both a sellable asset and a template for the next.

## 6. Candidate proof for the website (raw, vetted — pick later)
- **"An AI-native turnaround: a 46-automation operating system across the whole back office, AI employees for sales, CX, content and finance, all orchestrated by Claude over an 11-MCP layer."** [goal — labeled TARGET on outcomes]
- **"A live network dashboard tracking 1,151 brands and 10,000+ stores, and a retention engine modeled on 470k+ members and 3.3M payments."** [measured]
- **"A WhatsApp Concierge that ships loyalty intelligence straight into the consumer experience."** [envisioned product]
- Honest framing for the card: *a turnaround in motion — the diagnosis, the data layer, and the first operational wins are real; the full automation stack is the blueprint being built.*

## 7. Honesty footer (kept short, per the goal-first framing)
**Built and running today:** the Network Dashboard (live ETL), the CRM/retention analytics suite, the live growth-marketing engine, the Media pipeline (build-complete), the 6 app prototypes, and the org tooling rewire. **Still the blueprint:** the 46 automations are designed and **0 deployed** (the L0 infra is the next build), the app redesign hasn't shipped to users, and the team reorg + WhatsApp Concierge are envisioned. The savings (27–40 hrs/mo), +15% clients, and liquidity event are **TARGETS**, not measured results — and the chatbots/lead-gen/membership-admin/WhatsApp bot that exist today are LS's own prior builds, not this engagement's output. The transformation is real and moving; full automation is where it's headed.
