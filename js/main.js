// SMI Consulting — Interaktionen (vanilla JS)
(function () {
    'use strict';

    // Erfahrung in Jahren
    var experienceYearsText = document.getElementById('experienceYears');
    if (experienceYearsText) {
        let startingYear = 2018;
        experienceYearsText.textContent = String(new Date().getFullYear() - startingYear) + "+ Jahre";
    }

    // Copyright-Jahr
    var yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    // Header-Hintergrund beim Scrollen
    var header = document.getElementById('header');
    var onScroll = function () {
        header.classList.toggle('scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile Navigation
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    var closeNav = function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Menü öffnen');
    };
    toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeNav();
    });

    // Scroll-Reveal — Elemente im initialen Viewport sofort einblenden,
    // nur der Rest wartet auf den IntersectionObserver
    var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    var belowFold = revealEls.filter(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('visible');
            return false;
        }
        return true;
    });
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        belowFold.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        belowFold.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // Aktiven Nav-Link hervorheben
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
    if ('IntersectionObserver' in window && sections.length) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function (link) {
                    link.classList.toggle('active',
                        link.getAttribute('href') === '#' + entry.target.id);
                });
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }
})();
