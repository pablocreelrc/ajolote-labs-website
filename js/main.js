/* ============ AJOLOTE LABS — V3 Main JS ============ */

(function () {
  'use strict';

  /* ---------- Scroll Reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function (el) { observer.observe(el); });

  /* ---------- Animated Counters ---------- */
  var counted = new Set();
  var counterEls = document.querySelectorAll('[data-count]');
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting || counted.has(entry.target)) return;
      counted.add(entry.target);
      animateCounter(entry.target);
    });
  }, { threshold: 0.5 });

  counterEls.forEach(function (el) { counterObserver.observe(el); });

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var isDecimal = target % 1 !== 0;
    var duration = 1600;
    var start = performance.now();

    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * target;

      if (isDecimal) {
        el.textContent = current.toFixed(1) + suffix;
      } else {
        el.textContent = Math.round(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  /* ---------- Nav Scroll Effect ---------- */
  var nav = document.querySelector('nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      nav.style.borderBottomColor = 'rgba(255,255,255,0.08)';
    } else {
      nav.style.borderBottomColor = 'rgba(255,255,255,0.04)';
    }
  }, { passive: true });

  /* ---------- Hamburger Menu ---------- */
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      burger.classList.toggle('active');
      burger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Smooth Scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || href === '#calendly') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });


  /* ---------- Section Snap Scroll ---------- */
  var snapEls = document.querySelectorAll('[data-snap]');
  var snapping = false;
  var snapTimer = null;
  var navH = 60;

  window.addEventListener('scroll', function () {
    if (snapping) return;
    if (snapTimer) clearTimeout(snapTimer);
    snapTimer = setTimeout(doSnap, 100);
  }, { passive: true });

  function doSnap() {
    if (snapping) return;
    // Disable snap on mobile where sections aren't full-height
    if (window.innerWidth <= 768) return;

    var sy = window.pageYOffset;
    var vh = window.innerHeight;
    var docH = document.documentElement.scrollHeight;

    // Don't snap when near bottom of page (allow reaching footer)
    if (sy + vh > docH - 200) return;

    var best = null;
    var bestDist = Infinity;

    snapEls.forEach(function (el) {
      // Skip sections taller than the viewport (e.g. Cases)
      if (el.offsetHeight > vh * 1.2) return;

      var rect = el.getBoundingClientRect();
      var top = rect.top + sy - navH;
      if (top < 0) top = 0;
      var dist = Math.abs(sy - top);
      if (dist < bestDist) {
        bestDist = dist;
        best = top;
      }
    });

    // Snap if within half a viewport of the nearest section
    if (best !== null && bestDist > 15 && bestDist < vh * 0.5) {
      snapping = true;
      window.scrollTo({ top: best, behavior: 'smooth' });
      setTimeout(function () { snapping = false; }, 900);
    }
  }

})();
