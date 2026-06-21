/* ============================================================
   SYNCROMET — shared site behaviour
   Injects header + footer, wires nav, mobile drawer,
   scroll reveals, animated counters, header shadow.
   ============================================================ */
(function () {
  "use strict";

  /* ---- icon set (inline, 24x24, currentColor) ---- */
  var I = {
    // logo: inline SVG removed so CSS background image is used (transparent logo files)
    logo: '',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1.3-3 3.2V11H9v3h2v7h3v-7h2.3l.7-3H14V9.4c0-.3.2-.4.6-.4z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    li: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8.5H4V20h2.5V8.5zM5.2 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM20 20h-2.5v-6c0-1.5-.5-2.4-1.7-2.4-1 0-1.5.6-1.7 1.3-.1.2-.1.6-.1.9V20H11.5V8.5H14v1.6c.5-.8 1.3-1.8 3-1.8 2.2 0 3.5 1.4 3.5 4.4V20z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };
  window.SYNCRO_ICONS = I;

  /* ---- navigation model ---- */
  var NAV = [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about.html" },
    { label: "Services", href: "services.html" },
    { label: "Metals", href: "#", sub: [
      { label: "Ferrous Metals", href: "ferrous.html" },
      { label: "Non-Ferrous Metals", href: "non-ferrous.html" }
    ]},
    { label: "Blog", href: "blog.html" },    { label: "Safety & Environment", href: "safety.html" },
    { label: "Blog", href: "blog.html" },
    { label: "FAQ", href: "faq.html" },
    { label: "Contact", href: "contact.html" }
  ];

  var PHONE = "437-799-6109 / 226-724-3896";
  var PHONE_TEL = "+14377996109";
  var EMAIL = "Info@syncromet.com";

  function currentPage() {
    var p = location.pathname.split("/").pop();
    if (!p || !p.length) return "index.html";
    if (p.indexOf(".") === -1) p = p + ".html";
    return p;
  }
  function isActive(href, cur) {
    if (href === "#") return false;
    return href === cur;
  }

  /* ---- build header ---- */
  function buildHeader() {
    var cur = currentPage();
    var links = NAV.map(function (n) {
      if (n.sub) {
        var subActive = n.sub.some(function (s) { return s.href === cur; });
        var subs = n.sub.map(function (s) {
          return '<li><a href="' + s.href + '"' + (s.href === cur ? ' class="active"' : '') + '>' + s.label + '</a></li>';
        }).join("");
        return '<li class="has-sub"><a href="#"' + (subActive ? ' class="active"' : '') + '>' + n.label +
          ' <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle"><path d="M6 9l6 6 6-6"/></svg></a><ul class="subnav">' + subs + '</ul></li>';
      }
      return '<li><a href="' + n.href + '"' + (isActive(n.href, cur) ? ' class="active"' : '') + '>' + n.label + '</a></li>';
    }).join("");

    return '' +
      '<header class="site-header" id="siteHeader"><div class="wrap"><nav class="nav" aria-label="Primary">' +
        '<a class="brand" href="index.html" aria-label="Syncromet home">' +
          '<span class="brand__mark">' + I.logo + '</span>' +
          '<span><span class="brand__name">SYNCRO<b>MET</b></span><span class="brand__sub">Metal Trading · Canada</span></span>' +
        '</a>' +
        '<ul class="nav__links">' + links + '</ul>' +
        '<div class="nav__cta">' +
          '<a class="btn btn--sm" href="contact.html">Get a Quote</a>' +
        '</div>' +
        '<button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">' + I.menu + '</button>' +
      '</nav></div></header>' +
      buildDrawer(cur);
  }

  function buildDrawer(cur) {
    var flat = [];
    NAV.forEach(function (n) {
      if (n.sub) { n.sub.forEach(function (s) { flat.push(s); }); }
      else flat.push(n);
    });
    var links = flat.map(function (n) {
      return '<a class="mlink' + (n.href === cur ? ' active' : '') + '" href="' + n.href + '">' + n.label + '</a>';
    }).join("");
    return '' +
      '<div class="mobile-drawer" id="mobileDrawer">' +
        '<div class="mobile-drawer__scrim" data-close></div>' +
        '<div class="mobile-drawer__panel">' +
          '<div class="mobile-drawer__head">' +
            '<a class="brand" href="index.html"><span class="brand__mark">' + I.logo + '</span><span class="brand__name">SYNCRO<b>MET</b></span></a>' +
            '<button class="mobile-drawer__close" id="drawerClose" aria-label="Close menu">' + I.close + '</button>' +
          '</div>' + links +
          '<a class="btn" href="contact.html">Get a Quote ' + I.arrow + '</a>' +
          '<a class="btn btn--ghost" href="tel:' + PHONE_TEL + '" style="margin-top:8px">' + I.phone + ' ' + PHONE + '</a>' +
        '</div>' +
      '</div>';
  }

  /* ---- build footer ---- */
  function buildFooter() {
    return '' +
    '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer-grid">' +
        '<div class="footer-about">' +
          '<a class="brand" href="index.html"><span class="brand__mark">' + I.logo + '</span><span class="brand__name" style="color:#fff">SYNCRO<b>MET</b></span></a>' +
          '<p>Canada&rsquo;s trusted partner in ferrous and non-ferrous scrap metal trading. Transparent grading, competitive pricing, and responsible recycling.</p>' +
          '<div class="social">' +
            '<a href="#" aria-label="Facebook">' + I.fb + '</a>' +
            '<a href="#" aria-label="Instagram">' + I.ig + '</a>' +
            '<a href="#" aria-label="LinkedIn">' + I.li + '</a>' +
          '</div>' +
        '</div>' +
        '<div><h4>Company</h4><ul class="footer-links">' +
          '<li><a href="about.html">About Us</a></li>' +
          '<li><a href="services.html">Our Services</a></li>' +
          '<li><a href="safety.html">Safety &amp; Environment</a></li>' +
          '<li><a href="blog.html">Blog</a></li>' +
          '<li><a href="faq.html">FAQ</a></li>' +
        '</ul></div>' +
        '<div><h4>Metals</h4><ul class="footer-links">' +
          '<li><a href="ferrous.html">Ferrous Metals</a></li>' +
          '<li><a href="non-ferrous.html">Non-Ferrous Metals</a></li>' +
          '<li><a href="blog.html">Blog</a></li>' +
          '<li><a href="contact.html">Request a Quote</a></li>' +
        '</ul></div>' +
        '<div><h4>Contact</h4>' +
          '<div class="footer-contact-row">' + I.pin + '<span>Etobicoke, ON<br>Canada</span></div>' +
          '<div class="footer-contact-row">' + I.phone + '<a href="tel:+14377996109">437-799-6109</a></div>' +
          '<div class="footer-contact-row">' + I.phone + '<a href="tel:+12267243896">226-724-3896</a></div>' +
          '<div class="footer-contact-row">' + I.mail + '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a></div>' +
          '<div class="footer-contact-row">' + I.clock + '<span>Mon&ndash;Fri 7am&ndash;5pm · Sat 8am&ndash;1pm</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>&copy; ' + new Date().getFullYear() + ' Syncromet Inc. All rights reserved.</span>' +
        '<span style="display:flex;gap:20px;flex-wrap:wrap"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><span>ISO 9001:2015 · ISRI Member</span></span>' +
      '</div>' +
    '</div></footer>';
  }

  /* ---- wire behaviour ---- */
  function wire() {
    var hdr = document.getElementById("siteHeader");
    var drawer = document.getElementById("mobileDrawer");
    var toggle = document.getElementById("navToggle");

    if (toggle && drawer) {
      var open = function () { drawer.classList.add("open"); toggle.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; };
      var close = function () { drawer.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; };
      toggle.addEventListener("click", open);
      drawer.querySelectorAll("[data-close], #drawerClose, a.mlink").forEach(function (el) {
        el.addEventListener("click", close);
      });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    }

    if (hdr) {
      var onScroll = function () { hdr.classList.toggle("scrolled", window.scrollY > 8); };
      onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  /* ---- scroll reveal ---- */
  function reveals() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---- animated counters ---- */
  function counters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    var run = function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var dec = (el.getAttribute("data-dec") | 0);
      var dur = 1400, t0 = null;
      var step = function (ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var v = target * eased;
        el.textContent = dec ? v.toFixed(dec) : Math.round(v).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---- year-in-business helper (auto) ---- */
  function autoFill() {
    document.querySelectorAll("[data-years-since]").forEach(function (el) {
      var since = parseInt(el.getAttribute("data-years-since"), 10);
      el.setAttribute("data-count", String(new Date().getFullYear() - since));
    });
  }

  /* ---- page transitions ----
     Chrome/Safari: handled natively by @view-transition in CSS (no JS needed).
     Firefox fallback: JS fade using the dark html background to cover the gap.
  ---- */
  function pageTransitions() {
    if (CSS.supports("view-transition-name", "none") || document.startViewTransition) return;
    var EASE = "cubic-bezier(.22,.61,.36,1)";
    var html = document.documentElement;
    /* fade in on load */
    html.style.opacity = "0";
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        html.style.transition = "opacity 0.38s " + EASE;
        html.style.opacity = "1";
      });
    });
    /* fade out on navigate */
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a[href]");
      if (!a) return;
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) return;
      if (a.target === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      html.style.transition = "opacity 0.2s " + EASE;
      html.style.opacity = "0";
      setTimeout(function () { window.location.href = href; }, 210);
    });
  }

  function init() {
    var h = document.getElementById("site-header");
    var f = document.getElementById("site-footer");
    // header is now inlined in HTML — only inject if missing (fallback)
    if (h && !document.getElementById("siteHeader")) h.innerHTML = buildHeader();
    if (f) f.innerHTML = buildFooter();
    autoFill();
    wire();
    reveals();
    counters();
    pageTransitions();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

