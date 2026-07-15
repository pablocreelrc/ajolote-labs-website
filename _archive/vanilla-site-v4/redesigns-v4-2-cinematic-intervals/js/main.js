/* =====================================================
   Ajolote Labs — v4.2 Dense × Cinematic Intervals
   v4's dashboard motion + v2's breath-slab cinematography.
   ===================================================== */

(() => {
  "use strict";

  const html = document.documentElement;
  html.classList.add("js-ready");

  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------
     Arm scroll-snap AFTER first real user scroll (desktop only).
     Keeps Lighthouse / headless Chrome / anchor-jumps free of snap during measurement.
     ----------------------------------------------------- */
  (function initScrollSnap() {
    if (prefersReduced) return;
    if (!window.matchMedia) return;
    const isDesktop = window.matchMedia("(min-width: 1025px) and (hover: hover) and (pointer: fine)");
    if (!isDesktop.matches) return;
    let armed = false;
    let lastY = window.scrollY;
    function arm() {
      if (armed) return;
      // Only arm on a real scroll delta > 4px (skip the 1px Lighthouse probe scrolls)
      const dy = Math.abs(window.scrollY - lastY);
      if (dy < 4) return;
      armed = true;
      html.classList.add("snap-on");
      window.removeEventListener("scroll", onScroll, { passive: true });
      window.removeEventListener("wheel", onWheel, { passive: true });
    }
    function onScroll() { arm(); }
    function onWheel() { arm(); }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
  })();

  /* -----------------------------------------------------
     Mobile menu
     ----------------------------------------------------- */
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");

  function setMenu(open) {
    if (!burger || !mobileMenu) return;
    burger.setAttribute("aria-expanded", String(open));
    mobileMenu.setAttribute("aria-hidden", String(!open));
    if (open) {
      mobileMenu.removeAttribute("inert");
    } else {
      mobileMenu.setAttribute("inert", "");
    }
    mobileMenu.querySelectorAll("a").forEach((a) => {
      if (open) a.removeAttribute("tabindex");
      else a.setAttribute("tabindex", "-1");
    });
    mobileMenu.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  burger?.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") !== "true";
    setMenu(open);
  });

  mobileMenu?.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.tagName === "A") setMenu(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  /* -----------------------------------------------------
     Smooth scroll for anchor links
     ----------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  /* -----------------------------------------------------
     Word-cascade prep — assign stagger index per word
     inside every [data-cascade] container.
     ----------------------------------------------------- */
  (function prepCascades() {
    const roots = document.querySelectorAll("[data-cascade]");
    roots.forEach((root) => {
      const words = root.querySelectorAll(".line .word");
      words.forEach((w, i) => {
        w.style.setProperty("--i", i);
      });
    });
  })();

  /* -----------------------------------------------------
     Reveal — intersection observer (v4 behavior)
     ----------------------------------------------------- */
  const reveals = document.querySelectorAll(".reveal");
  const cascades = document.querySelectorAll("[data-cascade]");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-in"));
    cascades.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));

    // Cascades fire a bit earlier — they're the statement moments
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            cio.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    cascades.forEach((el) => cio.observe(el));

    // Hero cascade fires immediately (it's at the top)
    requestAnimationFrame(() => {
      const heroCascades = document.querySelectorAll(".hero [data-cascade]");
      heroCascades.forEach((el) => el.classList.add("is-in"));
    });
  }

  /* -----------------------------------------------------
     Animated counters + metric bars (v4)
     ----------------------------------------------------- */
  const counters = document.querySelectorAll("[data-counter]");
  const fills = document.querySelectorAll("[data-fill]");

  function formatCount(val, fmt) {
    if (fmt === "k") {
      if (val >= 1000) {
        const v = val / 1000;
        return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)) + "K";
      }
      return String(Math.round(val));
    }
    return Math.round(val).toLocaleString("en-US");
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10) || 0;
    const fmt = el.dataset.format || "";
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) {
      el.innerHTML = `${formatCount(target, fmt)}${suffix ? `<sup>${suffix}</sup>` : ""}`;
      return;
    }
    const duration = 1600;
    const start = performance.now();
    const from = 0;
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (target - from) * eased;
      el.innerHTML = `${formatCount(v, fmt)}${suffix ? `<sup>${suffix}</sup>` : ""}`;
      if (t < 1) requestAnimationFrame(tick);
      else el.innerHTML = `${formatCount(target, fmt)}${suffix ? `<sup>${suffix}</sup>` : ""}`;
    }
    requestAnimationFrame(tick);
  }

  function fillBar(el) {
    const target = el.dataset.fill || "0%";
    if (prefersReduced) {
      el.style.width = target;
      return;
    }
    requestAnimationFrame(() => {
      el.style.width = target;
    });
  }

  if ("IntersectionObserver" in window && !prefersReduced) {
    const mIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            if (en.target.matches("[data-counter]")) animateCounter(en.target);
            if (en.target.matches("[data-fill]")) fillBar(en.target);
            mIo.unobserve(en.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => mIo.observe(c));
    fills.forEach((f) => mIo.observe(f));
  } else {
    counters.forEach(animateCounter);
    fills.forEach(fillBar);
  }

  /* -----------------------------------------------------
     Scroll spy — nav link active states (v4)
     ----------------------------------------------------- */
  const links = document.querySelectorAll(".nav__link[data-section]");
  const sections = Array.from(links)
    .map((l) => document.getElementById(l.dataset.section))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const spyIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const id = en.target.id;
            links.forEach((l) => {
              l.classList.toggle("is-active", l.dataset.section === id);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => spyIo.observe(s));
  }

  /* -----------------------------------------------------
     Hero rail — log-line stream (v4)
     ----------------------------------------------------- */
  const railLog = document.getElementById("railLog");
  const bootLines = [
    { t: "boot", text: 'booting ajolote.labs <span class="cyan">v2026.04</span>' },
    { t: "ok", text: 'region <span class="ok">mex1</span> ready' },
    { t: "ok", text: 'region <span class="ok">atx2</span> ready' },
    { t: "info", text: 'loading agents [<span class="cyan">12/12</span>]' },
    { t: "info", text: 'workflows.synced <span class="ok">41</span>' },
    { t: "deploy", text: 'deploy <span class="warn">#0412</span> → clinic.mx' },
    { t: "ok", text: 'task <span class="ok">whatsapp.booking</span> 200ms' },
    { t: "info", text: 'agent <span class="cyan">spirits.forecast</span> tick' },
    { t: "ok", text: 'inventory reconcile <span class="ok">pass</span>' },
    { t: "info", text: 'calendly <span class="cyan">hello@ajolotelabs</span>' },
    { t: "ok", text: 'all systems <span class="ok">nominal</span>' },
  ];

  function appendLogLine(i) {
    if (!railLog) return;
    const line = bootLines[i % bootLines.length];
    const el = document.createElement("div");
    el.className = "log-line";
    el.innerHTML = line.text;
    railLog.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-in"));

    while (railLog.children.length > 8) {
      railLog.removeChild(railLog.firstChild);
    }
  }

  if (railLog) {
    if (prefersReduced) {
      bootLines.slice(0, 6).forEach((line) => {
        const el = document.createElement("div");
        el.className = "log-line is-in";
        el.innerHTML = line.text;
        railLog.appendChild(el);
      });
    } else {
      // Defer log stream until hero is visible AND browser has been idle for a tick.
      // This keeps TBT low on slow devices — we don't steal main-thread time during
      // the critical FCP/LCP window.
      const startStream = () => {
        let idx = 0;
        const bootTick = setInterval(() => {
          appendLogLine(idx++);
          if (idx >= 6) clearInterval(bootTick);
        }, 260);
        setTimeout(() => {
          setInterval(() => {
            appendLogLine(idx++);
          }, 4200);
        }, 6 * 260 + 700);
      };
      const boot = () =>
        "requestIdleCallback" in window
          ? requestIdleCallback(startStream, { timeout: 2000 })
          : setTimeout(startStream, 800);
      // Only kick off once hero is actually in the viewport.
      const hero = document.querySelector(".hero__rail");
      if (hero && "IntersectionObserver" in window) {
        const rio = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              rio.disconnect();
              boot();
            }
          },
          { threshold: 0.1 }
        );
        rio.observe(hero);
      } else {
        boot();
      }
    }
  }

  /* -----------------------------------------------------
     BREATH SLAB — scroll-linked parallax + marquee-word gradient
     (inherits v2's cinematography, scoped to the slabs only.)
     ----------------------------------------------------- */
  (function initBreathParallax() {
    if (prefersReduced) return;
    const slabs = document.querySelectorAll(".breath");
    if (!slabs.length) return;

    let raf = null;
    function update() {
      raf = null;
      const vh = window.innerHeight || 900;
      slabs.forEach((slab) => {
        const rect = slab.getBoundingClientRect();
        const inner = slab.querySelector(".breath__inner");
        const accents = slab.querySelectorAll(".marquee-word");
        if (!inner) return;

        // progress: 0 when slab top enters viewport bottom,
        // 1 when slab bottom exits viewport top.
        const total = rect.height + vh;
        const p = Math.max(0, Math.min(1, (vh - rect.top) / total));

        // parallax: text drifts up as slab passes
        const depth = parseFloat(slab.dataset.parallax) || 0.12;
        const y = -(p - 0.5) * 2 * rect.height * depth;
        inner.style.setProperty("--parallax-y", y.toFixed(1) + "px");

        // gradient position sweep on accent words
        accents.forEach((w) => {
          w.style.setProperty("--marquee-pos", (p * 120).toFixed(1) + "%");
        });
      });
    }
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  })();

  /* -----------------------------------------------------
     HERO + CTA + section headers — cinematic accent words
     sweep their cyan→amber gradient based on scroll position
     of their nearest section container.
     ----------------------------------------------------- */
  (function initAccentSweep() {
    if (prefersReduced) return;
    // Every cinematic container that has marquee-words but is NOT a breath slab
    // (breath slabs handle their own sweep inside the parallax handler).
    const sectionIds = ["hero", "services", "cases", "calendly"];
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el) => el && el.querySelectorAll(".marquee-word").length > 0);
    if (!targets.length) return;

    let raf = null;
    function update() {
      raf = null;
      const vh = window.innerHeight || 900;
      targets.forEach((t) => {
        const rect = t.getBoundingClientRect();
        const accents = t.querySelectorAll(".marquee-word");
        if (!accents.length) return;
        const total = rect.height + vh;
        const p = Math.max(0, Math.min(1, (vh - rect.top) / total));
        accents.forEach((w) => {
          w.style.setProperty("--marquee-pos", (p * 120).toFixed(1) + "%");
        });
      });
    }
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  })();

  /* -----------------------------------------------------
     Hero H1 cursor-tracked glow (desktop, fine pointer, no reduced-motion)
     CSS reads --mx / --my from .hero__billboard. JS updates them, throttled via rAF.
     ----------------------------------------------------- */
  (function initCursorGlow() {
    if (prefersReduced) return;
    if (!window.matchMedia) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const billboard = document.querySelector(".hero__billboard");
    if (!billboard) return;
    let rafId = null;
    let mx = 50, my = 50;
    function apply() {
      rafId = null;
      billboard.style.setProperty("--mx", mx + "%");
      billboard.style.setProperty("--my", my + "%");
    }
    billboard.addEventListener(
      "pointermove",
      (e) => {
        const rect = billboard.getBoundingClientRect();
        mx = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        my = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        if (!rafId) rafId = requestAnimationFrame(apply);
      },
      { passive: true }
    );
  })();

  /* -----------------------------------------------------
     Cases — render from JSON (v4)
     ----------------------------------------------------- */
  const casesGrid = document.getElementById("casesGrid");
  const caseCountEl = document.getElementById("caseCount");

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }

  function renderCases(cases) {
    if (!casesGrid) return;
    casesGrid.innerHTML = "";

    cases.forEach((c, i) => {
      const ticker = `CASE_${String(i + 1).padStart(2, "0")}`;
      const metricsHTML = (c.metrics || [])
        .map(
          (m) => `
          <div class="case__metric">
            <div class="case__metric__value">${escapeHTML(m.value)}</div>
            <div class="case__metric__label">${escapeHTML(m.label)}</div>
          </div>`
        )
        .join("");
      const pillsHTML = (c.pills || [])
        .map((p) => `<span class="tag tag--cyan">${escapeHTML(p)}</span>`)
        .join("");

      const article = document.createElement("article");
      article.className = "case panel";
      article.style.setProperty("--dot", c.dotColor || "#00e5ff");
      article.innerHTML = `
        <header class="case__head">
          <span class="case__ticker">${ticker}</span>
          <span class="case__ind">${escapeHTML(c.industry || "")}</span>
          <span class="status-pill status-pill--live">in prod</span>
        </header>
        <div class="case__body">
          <h3 class="case__title">${escapeHTML(c.title || "")}</h3>
          <p class="case__desc">${escapeHTML(c.description || "")}</p>
          <div class="case__metrics">${metricsHTML}</div>
          <div class="case__pills">${pillsHTML}</div>
          <blockquote class="case__quote">"${escapeHTML(c.quote || "")}"</blockquote>
        </div>
        <footer class="case__foot">
          <span>id&nbsp;·&nbsp;${ticker.toLowerCase()}</span>
          <a class="case__cta" href="${
            escapeHTML((c.cta && c.cta.href) || "#calendly")
          }">
            ${escapeHTML((c.cta && c.cta.text) || "Get similar results")}
            <span aria-hidden="true">→</span>
          </a>
        </footer>
      `;
      casesGrid.appendChild(article);
    });

    if (caseCountEl) caseCountEl.textContent = String(cases.length).padStart(2, "0");
  }

  fetch("data/cases.json", { credentials: "same-origin" })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((data) => renderCases((data && data.cases) || []))
    .catch(() => {
      if (casesGrid) {
        casesGrid.innerHTML =
          '<p class="log-line is-in" style="opacity:1">error · could not load cases.json</p>';
      }
    });

})();
