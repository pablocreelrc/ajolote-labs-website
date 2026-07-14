"use client";
import { useEffect } from "react";

/**
 * Ports the essential motion from the legacy main.js into a single client effect:
 * word-cascade, reveal-on-scroll, gradient-marquee sweep, platform-diagram staggered build.
 * Server markup stays intact (SSR/no-JS safe); this only enhances it.
 */
export default function MotionScript() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("js-ready");
    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1) cascade prep — stagger index per word
    document.querySelectorAll<HTMLElement>("[data-cascade]").forEach((root) => {
      root.querySelectorAll<HTMLElement>(".line .word").forEach((w, i) => {
        w.style.setProperty("--i", String(i));
      });
    });

    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const cascades = Array.from(document.querySelectorAll<HTMLElement>("[data-cascade]"));
    const diagrams = Array.from(document.querySelectorAll<HTMLElement>(".plat2__diagram"));
    const observers: IntersectionObserver[] = [];

    if (prefersReduced || !("IntersectionObserver" in window)) {
      [...reveals, ...cascades, ...diagrams].forEach((el) => el.classList.add("is-in"));
    } else {
      const mk = (margin: string, thr: number) => {
        const io = new IntersectionObserver(
          (entries) =>
            entries.forEach((en) => {
              if (en.isIntersecting) {
                en.target.classList.add("is-in");
                io.unobserve(en.target);
              }
            }),
          { threshold: thr, rootMargin: margin }
        );
        observers.push(io);
        return io;
      };
      const revIo = mk("0px 0px -40px 0px", 0.12);
      reveals.forEach((el) => revIo.observe(el));
      const casIo = mk("0px 0px -8% 0px", 0.15);
      cascades.forEach((el) => casIo.observe(el));
      const diaIo = mk("0px 0px -10% 0px", 0.25);
      diagrams.forEach((el) => diaIo.observe(el));
      // hero cascade fires immediately
      requestAnimationFrame(() => {
        document.querySelectorAll("#hero [data-cascade]").forEach((el) => el.classList.add("is-in"));
      });
    }

    // 2) gradient-marquee sweep on accent words, tied to scroll position
    let raf = 0;
    const words = Array.from(document.querySelectorAll<HTMLElement>(".marquee-word"));
    const sweep = () => {
      raf = 0;
      const vh = window.innerHeight || 900;
      words.forEach((w) => {
        const host = w.closest("section") || w;
        const rect = (host as HTMLElement).getBoundingClientRect();
        const total = rect.height + vh;
        const p = Math.max(0, Math.min(1, (vh - rect.top) / total));
        w.style.setProperty("--marquee-pos", (p * 120).toFixed(1) + "%");
      });
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(sweep);
    };
    if (!prefersReduced && words.length) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      sweep();
    }

    // 3) count-up on metric values
    const fmt = (v: number) => Math.round(v).toLocaleString("en-US");
    const animateCounter = (el: HTMLElement) => {
      const target = parseInt(el.dataset.counter || "0", 10) || 0;
      if (prefersReduced) { el.textContent = fmt(target); return; }
      const dur = 1600, start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(target * eased);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target);
      };
      requestAnimationFrame(tick);
    };
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-counter]"));
    if (!prefersReduced && "IntersectionObserver" in window) {
      const cio = new IntersectionObserver(
        (ents) => ents.forEach((en) => { if (en.isIntersecting) { animateCounter(en.target as HTMLElement); cio.unobserve(en.target); } }),
        { threshold: 0.4 }
      );
      observers.push(cio);
      counters.forEach((c) => cio.observe(c));
    } else {
      counters.forEach(animateCounter);
    }

    // 4) live ops-log ticker (decorative, aria-hidden) — makes the hero a running console
    let logTimer = 0;
    const logEl = document.getElementById("opsLog");
    if (logEl) {
      const POOL: [string, string, string][] = [
        ["brain.sync", "1,204 records reconciled", "ok"],
        ["agent.forecast", "demand model updated", "cy"],
        ["agent.booking", "3 slots confirmed", "ok"],
        ["audit", "action logged · scoped", "mut"],
        ["mcp.erp", "connection healthy", "ok"],
        ["agent.reconcile", "invoice cleared", "cy"],
        ["agent.report", "weekly ops digest sent", "ok"],
        ["brain.index", "catalog re-embedded", "mut"],
        ["agent.negotiate", "vendor terms drafted", "cy"],
        ["consent", "policy check passed", "ok"],
      ];
      let i = 0;
      const make = () => {
        const [a, b, c] = POOL[i % POOL.length]; i++;
        const d = document.createElement("div");
        d.className = "ln";
        d.innerHTML = `<span class="mut">${a} ·</span> ${b} <span class="${c}">✓</span>`;
        return d;
      };
      for (let k = 0; k < 6; k++) logEl.appendChild(make());
      if (!prefersReduced) {
        logTimer = window.setInterval(() => {
          logEl.insertBefore(make(), logEl.firstChild);
          while (logEl.childElementCount > 7 && logEl.lastChild) logEl.removeChild(logEl.lastChild);
        }, 2800);
      }
    }

    return () => {
      observers.forEach((io) => io.disconnect());
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (logTimer) clearInterval(logTimer);
    };
  }, []);

  return null;
}
