/* Digital Economics advisory site - shared script for content pages.
   Language toggle (persisted), mobile nav, scroll-reveal animations. */
(function () {
  "use strict";
  let lang = "en";
  try { lang = localStorage.getItem("de-erp-lang") || "en"; } catch (e) {}
  const qp = new URLSearchParams(location.search).get("lang");
  if (qp === "ar" || qp === "en") lang = qp;

  function applyLang() {
    const ar = lang === "ar";
    document.documentElement.lang = ar ? "ar" : "en";
    document.documentElement.dir = ar ? "rtl" : "ltr";
    const en = document.getElementById("lang-en");
    const arM = document.getElementById("lang-ar");
    if (en) en.hidden = ar;
    if (arM) arM.hidden = !ar;
    const t = document.getElementById("langToggle");
    if (t) t.textContent = ar ? "English" : "العربية";
    try { localStorage.setItem("de-erp-lang", lang); } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    const t = document.getElementById("langToggle");
    if (t) t.addEventListener("click", function () { lang = lang === "en" ? "ar" : "en"; applyLang(); });
    applyLang();

    const burger = document.getElementById("navToggle");
    const nav = document.getElementById("mainNav");
    if (burger && nav) burger.addEventListener("click", function () { nav.classList.toggle("open"); });

    // Scroll-reveal: elements with .reveal fade/slide in when visible.
    const els = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && els.length) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("in"); });
    }
  });
})();
