(function () {
  'use strict';

  /* --- JS-ready flag for progressive enhancement --- */
  document.documentElement.classList.add('js-ready');

  /* --- Scroll Reveal --- */
  var revealEls = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  revealEls.forEach(function (el) { observer.observe(el); });

  /* --- Nav scroll effect --- */
  var nav = document.querySelector('nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) { nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  }, { passive: true });

  /* --- Hamburger --- */
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

  /* --- EFFECT B: Floating Particle Field --- */
  (function initParticles() {
    var canvas = document.getElementById('particles');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var isMobile = window.innerWidth <= 768;
    var count = isMobile ? 45 : 60;
    var particles = [];

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', function () {
      isMobile = window.innerWidth <= 768;
      resize();
    });

    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.3 + 0.1),
        alpha: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2
      });
    }

    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      var t = Date.now() * 0.001;
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;
        var a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        if (p.y < -10) { p.y = window.innerHeight + 10; p.x = Math.random() * window.innerWidth; }
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,229,255,' + a + ')';
        ctx.fill();

        // Subtle glow
        if (p.r > 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,229,255,' + (a * 0.15) + ')';
          ctx.fill();
        }
      }
      rafId = requestAnimationFrame(draw);
    }
    var rafId = requestAnimationFrame(draw);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { cancelAnimationFrame(rafId); }
      else { rafId = requestAnimationFrame(draw); }
    });
  })();

  /* --- EFFECT C: Mouse Spotlight --- */
  (function initSpotlight() {
    var el = document.getElementById('spotlight');
    if (!el || window.innerWidth <= 768) return;
    el.classList.add('active');
    document.addEventListener('mousemove', function (e) {
      el.style.setProperty('--mx', e.clientX + 'px');
      el.style.setProperty('--my', e.clientY + 'px');
    }, { passive: true });
  })();

  /* --- EFFECT E: Glow Pulse on Section Entry --- */
  (function initGlow() {
    var sections = document.querySelectorAll('.snap-section');
    var glowObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('glow-in');
        } else {
          entry.target.classList.remove('glow-in');
        }
      });
    }, { threshold: 0.15 });
    sections.forEach(function (s) { glowObs.observe(s); });
  })();

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || href === '#calendly') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* --- Data-driven carousel from cases.json --- */
  fetch('data/cases.json')
    .then(function (r) { return r.json(); })
    .then(function (data) { initCarousel(data); });

  function initCarousel(data) {
    var settings = data.settings;
    var cases = data.cases;
    var cgrid = document.getElementById('cgrid');
    var navEl = document.getElementById('carouselNav');
    if (!cgrid || !cases.length) return;

    // Render cards
    cases.forEach(function (c) {
      var metrics = c.metrics.map(function (m) {
        return '<div class="ccard-num"><strong>' + m.value + '</strong><span>' + m.label + '</span></div>';
      }).join('');
      var pills = c.pills.map(function (p) {
        return '<span>' + p + '</span>';
      }).join('');

      cgrid.insertAdjacentHTML('beforeend',
        '<div class="ccard">' +
          '<div class="ccard-top">' +
            '<div class="ccard-dot" style="background:' + c.dotColor + '"></div>' +
            '<span class="ccard-label">' + c.industry + '</span>' +
          '</div>' +
          '<h3>' + c.title + '</h3>' +
          '<p>' + c.description + '</p>' +
          '<div class="ccard-nums">' + metrics + '</div>' +
          '<div class="ccard-pills">' + pills + '</div>' +
          '<div class="ccard-quote">"' + c.quote + '"</div>' +
          '<a class="ccard-link" href="' + c.cta.href + '">' + c.cta.text + ' &rarr;</a>' +
        '</div>'
      );
    });

    // Calculate pairs: n cards → n - cardsPerView + 1 pairs
    var cardsPerView = settings.cardsPerView || 2;
    var totalPairs = Math.max(1, cases.length - cardsPerView + 1);

    // Render dots
    for (var i = 0; i < totalPairs; i++) {
      var btn = document.createElement('button');
      btn.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      btn.setAttribute('data-pair', i);
      btn.setAttribute('aria-label', 'Cases ' + (i + 1) + '-' + (i + cardsPerView));
      navEl.appendChild(btn);
    }

    // Carousel logic
    var cards = cgrid.querySelectorAll('.ccard');
    var dots = navEl.querySelectorAll('.carousel-dot');
    var currentPair = 0;
    var autoTimer = null;

    function scrollToPair(pair) {
      currentPair = pair;
      if (cards[pair]) {
        // Use scrollLeft on the container — NOT scrollIntoView which hijacks page scroll
        var cardWidth = cards[0].offsetWidth + 20; // card + gap
        cgrid.scrollTo({ left: pair * cardWidth, behavior: 'smooth' });
      }
      dots.forEach(function (d, idx) {
        d.classList.toggle('active', idx === pair);
      });
    }

    function autoAdvance() {
      scrollToPair((currentPair + 1) % totalPairs);
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(autoAdvance, settings.autoAdvanceSeconds * 1000);
    }

    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    // Dot clicks
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        scrollToPair(parseInt(this.getAttribute('data-pair')));
        startAuto();
      });
    });

    // Track scroll to update dots
    cgrid.addEventListener('scroll', function () {
      var scrollLeft = cgrid.scrollLeft;
      var cardWidth = cards[0].offsetWidth + 20;
      var pair = Math.round(scrollLeft / cardWidth);
      if (pair >= totalPairs) pair = totalPairs - 1;
      if (pair < 0) pair = 0;
      if (pair !== currentPair) {
        currentPair = pair;
        dots.forEach(function (d, idx) {
          d.classList.toggle('active', idx === pair);
        });
      }
    }, { passive: true });

    // Pause on hover
    cgrid.addEventListener('mouseenter', stopAuto);
    cgrid.addEventListener('mouseleave', startAuto);

    startAuto();
  }

  /* --- Logo BG Toggle --- */
  (function initToggle() {
    var btn = document.getElementById('bgToggleBtn');
    var label = document.getElementById('bgToggleLabel');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var on = document.body.classList.toggle('logo-bg-on');
      label.textContent = 'Logo BG: ' + (on ? 'ON' : 'OFF');
    });
  })();

  /* --- Disable snap on mobile --- */
  function checkSnap() {
    if (window.innerWidth <= 768) {
      document.documentElement.style.scrollSnapType = 'none';
    } else {
      document.documentElement.style.scrollSnapType = 'y mandatory';
    }
  }
  checkSnap();
  window.addEventListener('resize', checkSnap);
})();