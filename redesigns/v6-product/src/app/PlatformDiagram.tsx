"use client";
import { useEffect } from "react";
import { animate, createTimeline, svg, utils } from "animejs";

/**
 * SEC_02 platform diagram motion — "one task flowing through the brain".
 *
 * The diagram markup (`#platform .hr` / `.wires` / `.hrcore`) is server-rendered in
 * page.tsx and is the no-JS fallback (static, legible). This client effect enhances it:
 * one task moves Context → Models → AI Employees → Governance in sequence — a signal rides
 * each circuit trace into the brain, the active tile lights, the brain pulses and its console
 * writes a line per beat. Runs ONLY while the diagram is in view (perf — no off-screen timeline
 * behind the 3D brain). `prefers-reduced-motion` → a clean static lit state, no timeline.
 */
const BEATS = [
  { tile: "#t-context", sig: "#s1", path: "#p1", provider: "context.sync", msg: "records reconciled" },
  { tile: "#t-models", sig: "#s2", path: "#p2", provider: "model.route", msg: "frontier model selected" },
  { tile: "#t-ai", sig: "#s3", path: "#p3", provider: "agent.dispatch", msg: "booking agent running" },
  { tile: "#t-gov", sig: "#s4", path: "#p4", provider: "audit.log", msg: "action logged · scoped" },
];

export default function PlatformDiagram() {
  useEffect(() => {
    const hr = document.querySelector<HTMLElement>("#platform .hr");
    const logEl = document.getElementById("brainlog");
    if (!hr || !logEl) return;

    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const log = (provider: string, msg: string) => {
      const d = document.createElement("div");
      d.className = "blog__ln";
      d.innerHTML = `<span class="mut">${provider} ·</span> ${msg} <span class="ok">✓</span>`;
      logEl.insertBefore(d, logEl.firstChild);
      while (logEl.childElementCount > 3 && logEl.lastChild) logEl.removeChild(logEl.lastChild);
    };

    // Reduced motion: show a resting lit state, no timeline.
    if (reduce) {
      log("audit.log", "action logged · scoped");
      const g = document.getElementById("bglow");
      if (g) g.style.opacity = ".22";
      return;
    }

    let tl: ReturnType<typeof createTimeline> | null = null;

    const brainReceive = () => {
      animate("#bring", {
        scale: [0.72, 1.32],
        opacity: [{ to: 0.5, duration: 90 }, { to: 0, duration: 430, ease: "out(2)" }],
        duration: 480,
        ease: "out(3)",
      });
      animate("#bglow", {
        opacity: [{ to: 0.95, duration: 90 }, { to: 0.15, duration: 520, ease: "out(2)" }],
        duration: 560,
      });
    };

    const start = () => {
      if (tl) {
        tl.play();
        return;
      }
      utils.set(".sig", { opacity: 0 });
      const TRAVEL = 1050;
      const HOLD = 520;
      const STEP = TRAVEL + HOLD;
      tl = createTimeline({ loop: true, defaults: { ease: "inOut(2)" } });
      BEATS.forEach((b, i) => {
        tl!.add(
          b.sig,
          {
            ...svg.createMotionPath(b.path),
            opacity: [
              { to: 1, duration: 130 },
              { to: 1, duration: TRAVEL - 430 },
              { to: 0, duration: 300 },
            ],
            duration: TRAVEL,
            onBegin: () => document.querySelector(b.tile)?.classList.add("is-active"),
            onComplete: () => {
              brainReceive();
              log(b.provider, b.msg);
              document.querySelector(b.tile)?.classList.remove("is-active");
            },
          },
          i * STEP
        );
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) start();
          else tl?.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(hr);

    return () => {
      io.disconnect();
      tl?.revert?.();
      tl = null;
    };
  }, []);

  return null;
}
