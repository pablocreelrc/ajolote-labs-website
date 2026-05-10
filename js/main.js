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

  /* Stream H — reveal gated sections (services / cases / calendly) on
     mobile menu tap. Runs BEFORE setMenu(false) so the class is set while
     the overlay is dismissing; scrollIntoView is deferred 2 rAF ticks to
     let the menu close first. */
  function revealSection(key) {
    if (!key) return;
    html.classList.add("show-" + key);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Prefer the inner content grid (e.g. casesGrid) over the section
        // wrapper. The wrapper's top includes the section H2/intro which on
        // mobile pushes the actual content below the fold; targeting the
        // grid lands users on the cards directly.
        const target = document.getElementById(key + "Grid") || document.getElementById(key);
        if (target) {
          // Reset horizontal scroll on overflow-carousel grids before the
          // vertical scroll lands. Without this, scrollIntoView may also
          // adjust the carousel's own scrollLeft to satisfy the visibility
          // constraint and land users on the LAST card instead of the first.
          if (target.scrollWidth > target.clientWidth) {
            target.scrollLeft = 0;
            // Tell the createCarousel auto-advance loop to pause for 6s and
            // sync the active dot back to 0. Without this the 4.5s
            // interval re-hijacks the carousel mid-smooth-scroll.
            target.dispatchEvent(new CustomEvent("carousel-reset"));
          }
          target.scrollIntoView({
            behavior: prefersReduced ? "auto" : "smooth",
            block: "start",
          });
        }
      });
    });
  }

  mobileMenu?.addEventListener("click", (e) => {
    const t = e.target;
    // Stream H — intercept data-reveal links inside the menu BEFORE close.
    const revealLink = t && t.closest && t.closest("a[data-reveal]");
    if (revealLink) {
      const href = revealLink.getAttribute("href") || "";
      if (href.startsWith("#")) {
        e.preventDefault();
        revealSection(revealLink.getAttribute("data-reveal"));
      }
    }
    // Close AFTER navigating when a link is tapped.
    if (t && t.closest && t.closest("a")) setMenu(false);
  });

  /* Stream H — hero secondary CTA ("See case studies") and any other
     in-page data-reveal anchors outside the mobile menu. */
  document.querySelectorAll("a[data-reveal]").forEach((a) => {
    if (mobileMenu && mobileMenu.contains(a)) return; // menu links handled above
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("#")) return;
      e.preventDefault();
      revealSection(a.getAttribute("data-reveal"));
    });
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
      // `inert` makes the wrapper untabable AND hidden from a11y when off,
      // and fully interactive when on. Replaces the prior `aria-hidden`
      // toggle which left the focusable <a> reachable while the bar was
      // visually hidden (axe `aria-hidden-focus`, WCAG 4.1.2).
      if (visible) stickyCta.removeAttribute("inert");
      else stickyCta.setAttribute("inert", "");
    };

    // Track two states: hero scrolled off (show sticky) AND calendly in
    // viewport (hide sticky — it's redundant when the closing CTA is on
    // screen). Both must be true for the bar to render.
    let heroOff = false;
    let calendlyVisible = false;
    const update = () => setStickyVisible(heroOff && !calendlyVisible);

    const heroIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          // Hero is "out of view above" when it has scrolled past the viewport top:
          // no intersection AND its bottom is above the viewport.
          heroOff = !en.isIntersecting && en.boundingClientRect.bottom <= 0;
          update();
        });
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );
    heroIo.observe(heroEl);

    // Hide sticky CTA when the closing-CTA section is visible — the user
    // can already see "Book a discovery call" without the sticky bar.
    const calendlyEl = document.getElementById("calendly");
    if (calendlyEl) {
      const calendlyIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            // Consider "visible" once any meaningful portion of the section
            // intersects; avoid flicker at the boundary.
            calendlyVisible = en.isIntersecting && en.intersectionRatio >= 0.25;
            update();
          });
        },
        { threshold: [0, 0.25, 0.5, 1] }
      );
      calendlyIo.observe(calendlyEl);
    }
  }
  initStickyCta();

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
     Cases — attach carousel to static HTML.
     Cards are inlined in index.html so crawlers and JS-less
     viewers see the content (Lighthouse Agentic Browsing).
     This block only wires the carousel behavior on top.
     ----------------------------------------------------- */
  const casesGrid = document.getElementById("casesGrid");

  function initCasesCarousel() {
    if (!casesGrid) return;
    const cards = casesGrid.querySelectorAll(".case");
    const casesDots = document.getElementById("caseDots");
    if (cards.length > 1 && casesDots) {
      createCarousel({
        grid: casesGrid,
        dotsContainer: casesDots,
        cardSelector: ".case",
        gapPx: 20,
        autoAdvanceMs: 4500,
        prefersReduced,
        enabledQuery: window.matchMedia("(min-width: 0px)"),
        cardsPerView: 1,
        dotClassName: "case-nav-dot",
        // 1-indexed, singular when one card per slide. "Show cases 1–1" reads
        // as a stutter; this just says "Show case 1".
        dotAriaLabel: (i, per) => per === 1
          ? "Show case " + (i + 1)
          : "Show cases " + (i + 1) + "–" + (i + per),
      });
    } else if (cards.length <= 1 && casesDots) {
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
      dots.forEach((d, i) => {
        const on = i === pair;
        d.classList.toggle("is-active", on);
        // POLISH: expose active state programmatically. Without this AT users
        // hear "tab 1, tab 2, tab 3" with no sense of which is active.
        d.setAttribute("aria-selected", on ? "true" : "false");
        d.setAttribute("tabindex", on ? "0" : "-1");
      });
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

    // Custom: revealSection() in the gated-section flow dispatches this on
    // the carousel grid right after resetting scrollLeft to 0. We mirror
    // the touchstart/touchend pattern — stop the timer, jump to slide 0,
    // and resume after 6s. Without this, the 4.5s auto-advance fires
    // mid-smooth-scroll and lands the user on slide 2 (the original bug).
    grid.addEventListener("carousel-reset", () => {
      stopAuto();
      if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
      setActive(0);
      resumeTimer = setTimeout(() => { resumeTimer = null; startAuto(); }, 6000);
    });

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

  /* -----------------------------------------------------
     ARIA carousel role sync — services region only carries
     the "carousel" role description when actually behaving
     as a carousel (mobile). On desktop it's a 3-column grid;
     screen readers announcing "carousel, 3 tabs" are misled.
     ----------------------------------------------------- */
  (function syncCarouselARIA() {
    const servicesRegion = document.getElementById("servicesDeck");
    if (!servicesRegion) return;
    const isCarousel = window.matchMedia("(max-width: 899px)");
    const apply = () => {
      if (isCarousel.matches) {
        servicesRegion.setAttribute("role", "region");
        servicesRegion.setAttribute("aria-roledescription", "carousel");
      } else {
        servicesRegion.removeAttribute("role");
        servicesRegion.removeAttribute("aria-roledescription");
      }
    };
    apply();
    isCarousel.addEventListener("change", apply);
  })();

  // Cases are inlined as static HTML in index.html. Just attach the carousel.
  // (The earlier fetch('data/cases.json') + renderCases path was removed once
  // cards became static for crawler visibility — single source of truth in
  // index.html. data/cases.json is retained only for build-worker.py which
  // bundles a different worker artifact; static deploy ignores it.)
  initCasesCarousel();

  /* -----------------------------------------------------
     Stream K — vertical page indicator (mobile only).
     One dot per section in the page. Active dot follows
     whichever section occupies > 50% of the viewport.
     The dot list is read from the DOM so adding a section
     in HTML doesn't require a JS change.
     ----------------------------------------------------- */
  function initPageIndicator() {
    const dots = Array.from(document.querySelectorAll(".page-indicator__dot[data-section]"));
    if (!dots.length || !("IntersectionObserver" in window)) return;
    const sections = dots
      .map((dot) => ({ id: dot.dataset.section, dot, el: document.getElementById(dot.dataset.section) }))
      .filter((s) => s.el);
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const match = sections.find((s) => s.el === e.target);
          if (!match) return;
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            sections.forEach((s) => s.dot.classList.remove("is-active"));
            match.dot.classList.add("is-active");
          }
        });
      },
      { threshold: [0.5] }
    );
    sections.forEach((s) => io.observe(s.el));
  }
  initPageIndicator();

  /* -----------------------------------------------------
     Stream K — swipe-down-to-close burger overlay
     Tracks touchstart/move/end on the .mobile-menu overlay;
     drags the panel down with the finger and dismisses when
     the swipe exceeds an 80px threshold. Reduced-motion
     users get the dismiss without the transform animation.
     ----------------------------------------------------- */
  function initMenuSwipeClose() {
    const menu = document.getElementById("mobileMenu");
    if (!menu) return;
    let startY = 0;
    let currentY = 0;
    let dragging = false;

    menu.addEventListener("touchstart", (e) => {
      if (!menu.classList.contains("is-open")) return;
      startY = e.touches[0].clientY;
      currentY = startY;
      dragging = true;
    }, { passive: true });

    menu.addEventListener("touchmove", (e) => {
      if (!dragging) return;
      currentY = e.touches[0].clientY;
      const delta = Math.max(0, currentY - startY);
      if (delta > 0 && !prefersReduced) {
        menu.style.transform = "translateY(" + delta + "px)";
        menu.style.opacity = String(Math.max(0.4, 1 - delta / 400));
      }
    }, { passive: true });

    menu.addEventListener("touchend", () => {
      if (!dragging) return;
      dragging = false;
      const delta = currentY - startY;
      menu.style.transform = "";
      menu.style.opacity = "";
      if (delta > 80) {
        setMenu(false);
      }
    }, { passive: true });
  }
  initMenuSwipeClose();

  /* -----------------------------------------------------
     Magic-card cursor tracking. Sets --fx-mx / --fx-my CSS
     vars on the hovered .case / .stage / .cta-card so the
     ::after radial-gradient follows the pointer. The card
     gets .is-fx-hot while the pointer is inside, fading the
     glow in/out via CSS transition.
     ----------------------------------------------------- */
  var magicCardSelectors = ".case, .stage, .cta-card";
  document.addEventListener("pointermove", function (e) {
    var card = e.target.closest && e.target.closest(magicCardSelectors);
    if (!card) return;
    var rect = card.getBoundingClientRect();
    var x = ((e.clientX - rect.left) / rect.width) * 100;
    var y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--fx-mx", x + "%");
    card.style.setProperty("--fx-my", y + "%");
    card.classList.add("is-fx-hot");
  }, { passive: true });

  document.addEventListener("pointerleave", function (e) {
    var card = e.target && e.target.closest && e.target.closest(magicCardSelectors);
    if (card) card.classList.remove("is-fx-hot");
  }, { capture: true, passive: true });

})();
