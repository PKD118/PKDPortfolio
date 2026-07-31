(function () {
  'use strict';
  var ACCENT = '#0284c7';
  var root = document.documentElement;

  function shade(hex, k) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return '#026a9e';
    return '#' + [1, 2, 3].map(function (i) {
      return Math.min(255, Math.max(0, Math.round(parseInt(m[i], 16) * k))).toString(16).padStart(2, '0');
    }).join('');
  }

  root.style.setProperty('--brand-user', ACCENT);
  root.style.setProperty('--brand-shade-user', shade(ACCENT, 0.78));
  root.style.setProperty('--brand-user-dark', shade(ACCENT, 1.5));
  root.style.setProperty('--brand-shade-user-dark', ACCENT);

  function initTheme() {
    var btn = document.querySelector('[data-theme-toggle]');
    var theme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    function apply(t) {
      if (t === 'dark') root.setAttribute('data-theme', 'dark');
      else root.removeAttribute('data-theme');
      if (!btn) return;
      var sun = btn.querySelector('[data-icon-sun]');
      var moon = btn.querySelector('[data-icon-moon]');
      if (sun) sun.style.display = t === 'dark' ? 'none' : '';
      if (moon) moon.style.display = t === 'dark' ? '' : 'none';
    }
    apply(theme);
    if (btn) btn.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      apply(theme);
      try { localStorage.setItem('pkd-portfolio-theme', theme); } catch (e) {}
    });
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var sibs = Array.prototype.slice.call(e.target.parentElement.children)
          .filter(function (nn) { return nn.hasAttribute && nn.hasAttribute('data-reveal'); });
        e.target.style.transitionDelay = Math.min(Math.max(0, sibs.indexOf(e.target)), 4) * 70 + 'ms';
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  function initLift() {
    document.querySelectorAll('[data-lift]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        if (reduced) return;
        el.style.transform = 'translateY(-4px)';
        el.style.boxShadow = '0 20px 45px rgba(26,26,46,0.14)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
        el.style.boxShadow = '';
      });
    });
  }

  function initScroll() {
    var links = Array.prototype.slice.call(document.querySelectorAll('[data-navlink]'));
    var sections = links.map(function (l) { return document.getElementById(l.getAttribute('data-navlink')); });
    var bar = document.querySelector('[data-progress]');
    var toTop = document.querySelector('[data-totop]');
    function onScroll() {
      var y = window.scrollY + 160, active = -1;
      sections.forEach(function (s, i) { if (s && y >= s.offsetTop) active = i; });
      links.forEach(function (l, i) {
        l.style.background = i === active ? 'var(--surface-2)' : 'transparent';
        l.style.color = i === active ? 'var(--fg-1)' : 'var(--fg-2)';
      });
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0) + '%';
      if (toTop) {
        var show = window.scrollY > 700;
        toTop.style.opacity = show ? '1' : '0';
        toTop.style.visibility = show ? 'visible' : 'hidden';
        toTop.style.transform = show ? 'none' : 'translateY(10px)';
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initTilt() {
    if (reduced) return;
    var phones = Array.prototype.slice.call(document.querySelectorAll('[data-tilt]'));
    if (!phones.length || window.innerWidth < 1000) return;
    window.addEventListener('mousemove', function (ev) {
      var dx = ev.clientX / window.innerWidth - 0.5;
      var dy = ev.clientY / window.innerHeight - 0.5;
      phones.forEach(function (p) {
        var base = parseFloat(p.getAttribute('data-tilt'));
        p.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
        p.style.transform = 'rotate(' + (base + dx * 2.2) + 'deg) translate3d(' + (dx * 14) + 'px,' + (dy * 10) + 'px,0)';
      });
    }, { passive: true });
  }

  function boot() { initTheme(); initReveal(); initLift(); initScroll(); initTilt(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
