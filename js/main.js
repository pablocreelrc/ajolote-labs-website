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
        cards[pair].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
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