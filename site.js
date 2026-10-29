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

/* Buyer journey progress - private, stored only in the visitor's browser. */
(function () {
  "use strict";
  var STAGES = ["concepts", "erps", "implementation", "calculator", "questions"];
  var KEY = "de-erp-journey-v1";
  function read() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function write(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var m = location.pathname.match(/([^/]+)\.html$/);
  var current = m ? m[1] : "index";
  var st = read();
  if (STAGES.indexOf(current) !== -1 && !st[current]) { st[current] = 1; write(st); }
  var ar = document.documentElement.dir === "rtl";
  document.querySelectorAll(".journey-badge[data-stage]").forEach(function (el) {
    if (st[el.getAttribute("data-stage")]) el.textContent = " ✓";
  });
  var el = document.getElementById(ar ? "journey-progress-ar" : "journey-progress-en");
  if (el) {
    var done = STAGES.filter(function (k) { return st[k]; }).length;
    var next = STAGES.filter(function (k) { return !st[k]; })[0];
    var EN = { concepts: "Understand", erps: "Compare", implementation: "Plan", calculator: "Budget", questions: "Concerns" };
    var AR = { concepts: "افهم", erps: "قارن", implementation: "خطط", calculator: "الميزانية", questions: "المخاوف" };
    el.hidden = false;
    if (done === 0) el.textContent = ar ? "رحلتك لسه في الأول - ابدأ بمرحلة «افهم»." : "Your journey is just starting - begin with Understand.";
    else if (!next) el.textContent = ar ? "استكشفت المراحل الخمس كلها - جاهز للخطوة الأخيرة: الاستشارة." : "You have explored all five stages - ready for the final step: your consultation.";
    else el.textContent = ar ? ("استكشفت " + done + " من ٥ مراحل. التالي: " + AR[next] + ".") : ("You have explored " + done + " of 5 stages. Next up: " + EN[next] + ".");
  }
})();
