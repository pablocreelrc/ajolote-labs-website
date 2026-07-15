# Business case — GEHP (WhatsApp Receptionist · Project 1)

> Working doc for the v6 website cases. **Goal-forward framing:** leads with the end-state and system design, then shows the shipped product as the foundation. Discipline kept: targets are labeled **[TARGET]**; built code is **[measured]** with cited paths; no invented outcome numbers.
> Source root: `…\Ajolote tech\Whatsapp\gehp-whatsapp-receptionist\` (+ `vision\`) · read-only.

## 1. Snapshot
- **Client:** GEHP Lomas Altas — gastroenterology & endoscopy clinic, Mexico City; 6+ gastroenterologists, managed by Araceli Hernández.
- **Vertical:** healthcare / private-clinic operations.
- **The ambition in one line:** start with one clinic's WhatsApp reception and build the **connective tissue for Mexican healthcare** — a clinic that plugs into pharmacy, lab, and insurer networks, sold as self-service software any clinic can switch on.

## 2. The GOAL (the end-state we're building)
A **Clinic MCP node** that turns a single clinic into a node on a healthcare network — and a product any clinic can adopt itself.

- **One clinic, fully run by agents.** Patients book, reschedule, cancel, and pay over WhatsApp in natural Mexican Spanish, with no human at reception — and the clinic manager configures everything through a chat, not a developer.
- **A clinic that plugs into the network.** The clinic becomes an MCP node with **outward hooks into pharmacy, lab, and insurer networks** — so a prescription, a lab order, or an insurance pre-auth becomes the **first cross-party healthcare agent workflow in Mexico**. **[TARGET]**
- **Self-service software, not a bespoke build.** Any clinic manager texts the bot and onboards step-by-step — Google Calendar, Stripe, doctors, go-live — with zero developer involvement. **[TARGET — product is built, unproven with a 2nd clinic]**
- **Compliant by design.** Patient PII is stripped before any model call; NOM-024 / LFPDPPP consent and audit are built into the architecture, not bolted on.
- **The whale.** With GEHP + 2–3 reference clinics and a healthcare MCP library, the closable targets are **hospital networks, insurers, or pharmacy chains**. **[TARGET]**

Rollout ladder: Silent Observer → Assistant → Booker → **Integrated Partner**. *(`vision\03-project-tracks.md`, `Whatsapp\CLAUDE.md`)*

## 3. The system design (how a clinic becomes a node)

### a. The agent system — AI employees for a clinic
A clinic's front desk, run by coordinated agents on the Node: **[reception built; triage/follow-up built]**
- **Reception agent** — the 8-step booking flow (doctor → date/time → registration → payment → confirmation), per-doctor rules (schedule, fees, deposit %, cancellation policy).
- **Triage agent** — read-only; routes urgent messages and **escalates clinical questions to the clinic — never diagnoses.**
- **Follow-up agent** — 24-hour reminders, prep instructions, a daily summary to the manager.
- **Compliance as a load-bearing layer:** `sanitizeForLLM()` strips phone/email/CURP/RFC before every external LLM call; repository pattern + transport isolation keep the system auditable. *(`Whatsapp\gehp-whatsapp-receptionist\CLAUDE.md`)*

### b. The product — multi-tenant, self-serve SaaS
The build is designed as software any clinic can switch on, not a one-off: **[built, see §4]**
- **Multi-tenant** — `clinic_id` + Row-Level Security on every table; cross-tenant isolation is the worst-case bug class and is tested.
- **Self-service onboarding** — a 10-step WhatsApp wizard: clinic name → Google Calendar OAuth → Stripe Connect → add doctors → test booking → go-live, resumable across sessions.
- **Per-clinic isolation** — per-clinic Google OAuth, **Stripe Connect** (100% of funds route to the clinic; Ajolote monetizes via SaaS subscription), and a per-clinic Docker container on RunPod.

### c. The map — the Clinic MCP network (the strategic payload)
The clinic Node is the first hop; the network is the goal. Planned library MCPs that turn isolated clinics into a connected system: **[planned]**
- `mcps/clinic/` — the core aggregator (appointments · patients · payments · messaging · per-doctor rules).
- `mcps/pharmacy/` — prescription handoff to pharmacy networks (Farmacias del Ahorro, San Pablo, Benavides).
- `mcps/lab/` — lab order + results (Chopo, Labopat, Polanco).
- `mcps/insurer/` — pre-authorization + eligibility (GNP, AXA, Mapfre, BUPA; public IMSS/ISSSTE).
- `compliance/healthcare/` — NOM-024 + LFPDPPP + CNSF consent/audit primitives, and `surfaces/whatsapp/` — the reusable multi-tenant WhatsApp agent surface.
*(`vision\03-project-tracks.md`)*

### Substrate
The clinic Node sits on the same MCP/Claude substrate as every Ajolote engagement: agents consume the Node's MCP surface (Google Calendar behind an `ICalendarService` so PMS systems like Huli/Nimbo can swap in; Stripe; Supabase), never raw APIs — so auth, consent, and audit live in one place, and the clinic isn't locked to any one vendor. Stack: Node 20 + TS, Baileys (WhatsApp, POC), Claude, Supabase RLS, Stripe, n8n, Langfuse. **[measured-wired]**

## 4. The foundation already built (proof the system is real)
This is the strongest *engineering* foundation of the three tracks — a real, tested product:
- **v1.0 — single-clinic MVP, milestone-audited PASSED (2026-02-28).** End-to-end WhatsApp booking in Mexican Spanish, Stripe MXN deposits (30-min hold, webhook auto-confirm), Google Calendar as source of truth, n8n + Claude agentic loop, 17-step WhatsApp admin onboarding, zero-build web admin dashboard. **6,354 LOC source + 7,872 LOC tests · 351 tests / 29 files · built in 6 days.** Audit: 38/38 requirements, 8/8 E2E flows PASSED. Deployed at GEHP Lomas Altas. **[measured]** *(`Whatsapp\.planning\MILESTONES.md`, `…\milestones\v1.0-MILESTONE-AUDIT.md`)*
- **v2.0 — multi-tenant SaaS, phases 11–17 code-verified (483 tests).** Everything in §3b — multi-tenant DB + scoping, per-clinic OAuth, Stripe Connect, the self-service onboarding wizard, operational automation, per-clinic Docker. **[measured-code-verified]** *(`Whatsapp\.planning\phases\11..17\*-VERIFICATION.md`)*

## 5. Why it compounds (the bigger play)
GEHP is the **healthcare proof point** for the repeatable Ajolote model. The generic assets it produces — the Clinic / Pharmacy / Lab / Insurer MCPs, the healthcare-compliance primitives, and the reusable WhatsApp agent-surface — drop into Ajolote's library and make the next clinic near-instant to stand up. Get 2–3 clinics on the network and the **cross-party workflows** (a clinic's prescription auto-routing to a pharmacy, a pre-auth clearing with an insurer) become real — which is exactly what makes a **hospital network, insurer, or pharmacy chain** closable. Build → maintain → improve → you own it.

## 6. Candidate proof for the website (raw, vetted — pick later)
- **"A clinic that runs its front desk on AI agents — and plugs into pharmacy, lab, and insurer networks as a node."** [goal — network is TARGET]
- **"Self-service software: any clinic onboards over WhatsApp — calendar, payments, doctors, go-live — with no developer."** [product built; 2nd-clinic unproven]
- **"A production-grade WhatsApp receptionist, shipped in 6 days with 350+ tests, NOM-024-compliant by design."** [measured]
- Honest framing for the card: *the cleanest 'real, tested software' proof of the three — keep claims to what's built (product + tests + compliance), with the network as the vision.*

## Note on Project 3 (Financial Inclusion)
`financial-inclusion\` is a separate **pre-revenue product** (FastAPI + Postgres + a consumer-financial-data MCP), not a client engagement — supports the platform thesis but is **not** a case card.

## 7. Honesty footer (kept short, per the goal-first framing)
**Built and tested today:** v1.0 (milestone-audited, deployed at GEHP) and v2.0 multi-tenant (483 tests, code-verified). **Still the roadmap / unverified:** "verified" means tests pass, not confirmed live with real patients — every live-credential check (real WhatsApp/Stripe/OAuth/RunPod) was left `human_needed`; there are **no usage metrics** (patients, bookings, hours saved); **no second clinic** has onboarded; and the **outward Clinic/Pharmacy/Lab/Insurer MCPs — the strategic payload — are planning scope, not code yet.** The product is real and strong; the network is where it's headed.
