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
     Mobile menu — full-viewport overlay (Stream B)
     ----------------------------------------------------- */
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuClose = document.getElementById("mobileMenuClose");

  function getMenuFocusables() {
    if (!mobileMenu) return [];
    return Array.from(
      mobileMenu.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);
  }

  function setMenu(open) {
    if (!burger || !mobileMenu) return;
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileMenu.setAttribute("aria-hidden", String(!open));
    mobileMenu.classList.toggle("is-open", open);
    // Toggle inert so focus and AT navigation fully skip the overlay when closed.
    mobileMenu.toggleAttribute("inert", !open);
    // Match tab order to open state on interior focusables.
    mobileMenu.querySelectorAll("a, button").forEach((el) => {
      el.setAttribute("tabindex", open ? "0" : "-1");
    });
    // Lock page scroll via <html> class (CSS also locks body).
    html.classList.toggle("menu-open", open);

    if (open) {
      // Move focus to first link inside the overlay.
      const focusables = getMenuFocusables();
      const first = focusables.find((el) => el.tagName === "A") || focusables[0];
      if (first) {
        // Defer one frame so visibility/inert transitions settle first.
        requestAnimationFrame(() => first.focus());
      }
    } else {
      // Restore focus to the burger when closing.
      if (document.activeElement && mobileMenu.contains(document.activeElement)) {
        burger.focus();
      }
    }
  }

  burger?.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") !== "true";
    setMenu(open);
  });

  mobileMenuClose?.addEventListener("click", () => setMenu(false));

  mobileMenu?.addEventListener("click", (e) => {
    const t = e.target;
    // Close AFTER navigating when a link is tapped.
    if (t && t.closest && t.closest("a")) setMenu(false);
  });

  // Focus trap: cycle Tab within the overlay when open.
  mobileMenu?.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    if (!mobileMenu.classList.contains("is-open")) return;
    const focusables = getMenuFocusables();
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu?.classList.contains("is-open")) {
      setMenu(false);
    }
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

  function renderCount(el, val) {
    const fmt = el.dataset.format || "";
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    el.innerHTML = `${prefix}${formatCount(val, fmt)}${suffix ? `<sup>${suffix}</sup>` : ""}`;
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10) || 0;
    if (prefersReduced) {
      renderCount(el, target);
      el.dataset.animated = "1";
      return;
    }
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      renderCount(el, (target) * eased);
      if (t < 1) requestAnimationFrame(tick);
      else {
        renderCount(el, target);
        el.dataset.animated = "1";
      }
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
     Sticky CTA bar — reveal after hero scrolls off (Stream C)
     CSS hides the bar on desktop (min-width:900px) and while the
     burger menu is open, so we don't need to match-media guard here.
     ----------------------------------------------------- */
  function initStickyCta() {
    const stickyCta = document.querySelector(".sticky-cta");
    const heroEl = document.getElementById("hero");
    if (!stickyCta || !heroEl || !("IntersectionObserver" in window)) return;

    const setStickyVisible = (visible) => {
      stickyCta.classList.toggle("is-visible", visible);
      stickyCta.setAttribute("aria-hidden", visible ? "false" : "true");
    };

    const heroIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          // Hero is "out of view above" when it has scrolled past the viewport top:
          // no intersection AND its bottom is above the viewport.
          const scrolledPast =
            !en.isIntersecting &&
            en.boundingClientRect.bottom <= 0;
          setStickyVisible(scrolledPast);
        });
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );
    heroIo.observe(heroEl);
  }
  initStickyCta();

  /* -----------------------------------------------------
     Hero rail — log-line stream (v4)
     ----------------------------------------------------- */
  const railLog = document.getElementById("railLog");
  const bootLines = [
    { t: "boot", text: 'boot <span class="cyan">ajolote.labs</span> v2026.04' },
    { t: "ok",   text: 'edge.<span class="cyan">iad</span> <span class="ok">ready</span>' },
    { t: "ok",   text: 'edge.<span class="cyan">qro</span> <span class="ok">ready</span>' },
    { t: "ok",   text: 'mcp.load [<span class="cyan">12/12</span>] <span class="ok">ok</span>' },
    { t: "ok",   text: 'node.wired mcps=<span class="ok">3/3</span>' },
    { t: "info", text: 'langfuse.stream <span class="ok">live</span>' },
    { t: "ok",   text: 'deploy <span class="cyan">75f33b7</span> → cf-pages' },
    { t: "ok",   text: 'mcp.sat GET /cfdi → <span class="ok">200</span>' },
    { t: "ok",   text: 'agent.booking reply <span class="ok">200</span> 180ms' },
    { t: "info", text: 'agent.forecast tick Δ=<span class="ok">+0.02</span>' },
    { t: "ok",   text: 'workflow.recon exit=<span class="ok">0</span>' },
    { t: "ok",   text: 'cal.sync 5 evt → <span class="cyan">supabase</span>' },
    { t: "info", text: 'consent.nom024 audit=<span class="cyan">7e431f</span>' },
    { t: "ok",   text: 'agent.triage classify p=<span class="ok">0.94</span>' },
    { t: "ok",   text: 'mcp.stripe evt.paid <span class="ok">200</span>' },
    { t: "ok",   text: 'langfuse.trace span=<span class="ok">ok</span>' },
    { t: "warn", text: 'mcp.hubspot retry <span class="warn">2/5</span>' },
    { t: "ok",   text: 'mcp.hubspot GET /deals <span class="ok">200</span>' },
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
      let idx = 0;
      const bootTick = setInterval(() => {
        appendLogLine(idx++);
        if (idx >= 6) clearInterval(bootTick);
      }, 220);

      setTimeout(() => {
        setInterval(() => {
          appendLogLine(idx++);
        }, 3200);
      }, 6 * 220 + 500);
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
        <div class="case__foot">
          <span>id&nbsp;·&nbsp;${ticker.toLowerCase()}</span>
          <a class="case__cta" href="${
            escapeHTML((c.cta && c.cta.href) || "#calendly")
          }">
            ${escapeHTML((c.cta && c.cta.text) || "Get similar results")}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      `;
      casesGrid.appendChild(article);
    });

    if (caseCountEl) caseCountEl.textContent = String(cases.length).padStart(2, "0");
    const casesDots = document.getElementById("caseDots");
    if (casesGrid && casesDots && cases.length > 1) {
      createCarousel({
        grid: casesGrid,
        dotsContainer: casesDots,
        cardSelector: ".case",
        gapPx: 20,
        autoAdvanceMs: 4500,
        prefersReduced,
        enabledQuery: window.matchMedia("(min-width: 900px)"),
        cardsPerView: 1,
        dotClassName: "case-nav-dot",
        dotAriaLabel: (i, per) => "Show cases " + (i + 1) + "–" + (i + per),
      });
    } else if (casesDots && cases.length <= 1) {
      casesDots.style.display = "none";
    }
  }

  /* -----------------------------------------------------
     Generic carousel factory — horizontal scroll-snap + dots,
     reused by cases (desktop) and services (mobile).
     Per docs/scroll-system-spec.md.
     ----------------------------------------------------- */
  function createCarousel(config) {
    const {
      grid,
      dotsContainer,
      cardSelector,
      gapPx = 20,
      autoAdvanceMs = 4500,
      prefersReduced: pr = false,
      enabledQuery,
      cardsPerView = 1,
      onSlideChange,
      dotClassName = "carousel-dot",
      dotAriaLabel,
    } = config;

    if (!grid || !dotsContainer || !enabledQuery) {
      return { start() {}, stop() {}, destroy() {}, goTo() {} };
    }

    const cards = grid.querySelectorAll(cardSelector);
    const cardCount = cards.length;
    if (cardCount <= cardsPerView) {
      dotsContainer.style.display = "none";
      return { start() {}, stop() {}, destroy() {}, goTo() {} };
    }

    const totalPairs = cardCount - cardsPerView + 1;

    dotsContainer.innerHTML = "";
    const dots = [];
    for (let i = 0; i < totalPairs; i++) {
      const btn = document.createElement("button");
      btn.className = dotClassName + (i === 0 ? " is-active" : "");
      btn.setAttribute("role", "tab");
      btn.setAttribute(
        "aria-label",
        typeof dotAriaLabel === "function"
          ? dotAriaLabel(i, cardsPerView)
          : "Show slide " + (i + 1)
      );
      btn.type = "button";
      btn.dataset.pair = String(i);
      dotsContainer.appendChild(btn);
      dots.push(btn);
    }

    let currentPair = 0;
    let autoTimer = null;
    let resumeTimer = null;

    function getCardStep() {
      const first = grid.querySelector(cardSelector);
      return first ? first.offsetWidth + gapPx : 0;
    }
    function scrollToPair(pair) {
      if (!enabledQuery.matches) return;
      const step = getCardStep();
      if (!step) return;
      grid.scrollTo({ left: pair * step, behavior: pr ? "auto" : "smooth" });
    }
    function setActive(pair) {
      currentPair = pair;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === pair));
      if (typeof onSlideChange === "function") onSlideChange(pair);
    }
    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }
    function startAuto() {
      if (pr || !enabledQuery.matches) return;
      stopAuto();
      autoTimer = setInterval(() => {
        const next = (currentPair + 1) % totalPairs;
        scrollToPair(next);
        setActive(next);
      }, autoAdvanceMs);
    }
    function goTo(i) {
      const p = Math.max(0, Math.min(i, totalPairs - 1));
      scrollToPair(p);
      setActive(p);
      startAuto();
    }

    dots.forEach((d) =>
      d.addEventListener("click", () => {
        goTo(parseInt(d.dataset.pair, 10));
      })
    );

    let scrollRaf = 0;
    grid.addEventListener(
      "scroll",
      () => {
        if (scrollRaf) return;
        scrollRaf = requestAnimationFrame(() => {
          scrollRaf = 0;
          const step = getCardStep();
          if (!step) return;
          const p = Math.max(0, Math.min(Math.round(grid.scrollLeft / step), totalPairs - 1));
          if (p !== currentPair) setActive(p);
        });
      },
      { passive: true }
    );

    grid.addEventListener("mouseenter", stopAuto);
    grid.addEventListener("mouseleave", startAuto);
    grid.addEventListener("focusin", stopAuto);
    grid.addEventListener("focusout", startAuto);

    // Touch UX: pause on touch, resume 6s after touchend so swipe isn't hijacked.
    grid.addEventListener(
      "touchstart",
      () => {
        stopAuto();
        if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
      },
      { passive: true }
    );
    grid.addEventListener(
      "touchend",
      () => {
        if (resumeTimer) clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => {
          resumeTimer = null;
          startAuto();
        }, 6000);
      },
      { passive: true }
    );

    enabledQuery.addEventListener("change", (e) => {
      if (e.matches) {
        startAuto();
      } else {
        stopAuto();
        grid.scrollTo({ left: 0, behavior: "auto" });
        setActive(0);
      }
    });

    startAuto();

    return {
      start: startAuto,
      stop: stopAuto,
      goTo,
      destroy() {
        stopAuto();
        if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
      },
    };
  }

  /* -----------------------------------------------------
     Services — mobile horizontal swipe deck (Stream D)
     On desktop the .pipeline stays a 3-col grid (see CSS).
     ----------------------------------------------------- */
  (function initServicesCarousel() {
    const servicesDeck = document.querySelector("#servicesDeck .services-deck__track");
    const servicesDots = document.getElementById("servicesDots");
    if (!servicesDeck || !servicesDots) return;
    createCarousel({
      grid: servicesDeck,
      dotsContainer: servicesDots,
      cardSelector: ".stage",
      gapPx: 16,
      autoAdvanceMs: 4500,
      prefersReduced,
      enabledQuery: window.matchMedia("(max-width: 899px)"),
      cardsPerView: 1,
      dotClassName: "services-deck__dot",
      dotAriaLabel: (i) => "Show service " + (i + 1),
    });
  })();

  function applyAggregates(agg) {
    if (!agg) return;
    document.querySelectorAll("[data-metric]").forEach((el) => {
      const key = el.dataset.metric;
      if (!(key in agg)) return;
      el.dataset.counter = String(agg[key]);
      // If the counter has already animated in, re-render with the updated value.
      // Otherwise the IntersectionObserver will pick up the new data-counter on firing.
      if (el.dataset.animated === "1") renderCount(el, agg[key]);
    });
  }

  fetch("data/cases.json", { credentials: "same-origin" })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((data) => {
      renderCases((data && data.cases) || []);
      applyAggregates(data && data.aggregates);
    })
    .catch(() => {
      if (casesGrid) {
        casesGrid.innerHTML =
          '<p class="log-line is-in" style="opacity:1">error · could not load cases.json</p>';
      }
    });

})();
