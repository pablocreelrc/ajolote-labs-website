/* ============================================
   AJOLOTE LABS — Main JS
   ============================================ */

(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- PARTICLE NETWORK (Canvas) ----------
    var canvas = document.getElementById('heroCanvas');
    if (canvas && !prefersReducedMotion) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var mouse = { x: null, y: null };
        var animationId = null;
        var isMobile = window.innerWidth < 768;
        var PARTICLE_COUNT = isMobile ? 35 : 60;
        var CONNECTION_DISTANCE = isMobile ? 100 : 150;
        var MOUSE_RADIUS = 200;

        function resize() {
            canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
            canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
            ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
        }

        function createParticles() {
            particles = [];
            var w = canvas.offsetWidth;
            var h = canvas.offsetHeight;
            for (var i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        function drawParticles() {
            if (document.hidden) {
                animationId = requestAnimationFrame(drawParticles);
                return;
            }

            var w = canvas.offsetWidth;
            var h = canvas.offsetHeight;
            ctx.clearRect(0, 0, w, h);

            for (var i = 0; i < particles.length; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DISTANCE) {
                        var opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(0, 229, 255, ' + opacity + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(function (p) {
                if (!isMobile && mouse.x !== null) {
                    var dx = p.x - mouse.x;
                    var dy = p.y - mouse.y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MOUSE_RADIUS) {
                        var opacity = (1 - dist / MOUSE_RADIUS) * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = 'rgba(0, 229, 255, ' + opacity + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 229, 255, ' + p.opacity + ')';
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;
            });

            animationId = requestAnimationFrame(drawParticles);
        }

        // Pause animation when hero is off-screen
        var heroObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                if (!animationId) drawParticles();
            } else {
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            }
        }, { threshold: 0 });
        heroObserver.observe(canvas);

        canvas.addEventListener('mousemove', function (e) {
            var rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', function () {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener('resize', function () {
            resize();
            createParticles();
        });

        resize();
        createParticles();
        drawParticles();
    }

    // ---------- TYPING EFFECT ----------
    var typingEl = document.getElementById('heroTyping');
    if (typingEl && !prefersReducedMotion) {
        var phrases = [
            'Connect, manage, and scale your AI workforce.',
            'The nervous system for autonomous enterprise.',
            'From WhatsApp message to booked appointment in 50ms.',
            'Deploy agents. Orchestrate everything.'
        ];
        var phraseIndex = 0;
        var charIndex = 0;
        var isDeleting = false;

        function type() {
            var current = phrases[phraseIndex];
            if (isDeleting) {
                typingEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            var delay = isDeleting ? 25 : 45;

            if (!isDeleting && charIndex === current.length) {
                delay = 2500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 400;
            }

            setTimeout(type, delay);
        }

        setTimeout(type, 800);
    } else if (typingEl) {
        // Reduced motion: show first phrase statically
        typingEl.textContent = 'Connect, manage, and scale your AI workforce.';
    }

    // ---------- SCROLL REVEAL ----------
    var reveals = document.querySelectorAll('.reveal');
    if (!prefersReducedMotion) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        reveals.forEach(function (el) { revealObserver.observe(el); });
    } else {
        // Reduced motion: reveal everything immediately
        reveals.forEach(function (el) { el.classList.add('visible'); });
    }

    // ---------- COUNTER ANIMATION ----------
    var counters = document.querySelectorAll('[data-count]');
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var target = parseFloat(el.dataset.count);
                var isDecimal = target % 1 !== 0;

                if (prefersReducedMotion) {
                    el.textContent = isDecimal ? target.toFixed(1) : Math.floor(target);
                    counterObserver.unobserve(el);
                    return;
                }

                var duration = 1500;
                var start = performance.now();

                function update(now) {
                    var progress = Math.min((now - start) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    var value = eased * target;
                    el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value);
                    if (progress < 1) requestAnimationFrame(update);
                }

                requestAnimationFrame(update);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { counterObserver.observe(el); });

    // ---------- NAV SCROLL ----------
    var nav = document.getElementById('nav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
    }, { passive: true });

    // ---------- MOBILE MENU ----------
    var burger = document.getElementById('navBurger');
    var mobileMenu = document.getElementById('mobileMenu');

    if (burger && mobileMenu) {
        var menuLinks = mobileMenu.querySelectorAll('a');

        function openMenu() {
            burger.classList.add('active');
            mobileMenu.classList.add('active');
            burger.setAttribute('aria-expanded', 'true');
            burger.setAttribute('aria-label', 'Close menu');
            mobileMenu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            // Focus first menu link
            if (menuLinks.length) menuLinks[0].focus();
        }

        function closeMenu() {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
            burger.setAttribute('aria-label', 'Open menu');
            mobileMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            burger.focus();
        }

        burger.addEventListener('click', function () {
            if (mobileMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close on link click
        menuLinks.forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Focus trap inside mobile menu
        mobileMenu.addEventListener('keydown', function (e) {
            if (e.key !== 'Tab' || !mobileMenu.classList.contains('active')) return;

            var focusable = mobileMenu.querySelectorAll('a, button');
            var first = focusable[0];
            var last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        });
    }

    // ---------- CARD SPOTLIGHT (mouse-tracking glow) ----------
    if (!isMobile) {
        var cards = document.querySelectorAll('.feature-card, .use-case');
        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                card.style.setProperty('--spotlight-x', x + 'px');
                card.style.setProperty('--spotlight-y', y + 'px');
            });
        });
    }

    // ---------- SMOOTH SCROLL ----------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offset = 80;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
            }
        });
    });

})();
