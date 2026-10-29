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

/* Enterprise layer: journey rail (content pages), journey panel + metrics (home). Reads the same private local progress. */
(function () {
  "use strict";
  try {
    var KEY = "de-erp-journey-v1";
    var ST = [
      ["concepts", "Understand", "\u0627\u0641\u0647\u0645", "concepts.html"],
      ["erps", "Compare", "\u0642\u0627\u0631\u0646", "erps.html"],
      ["implementation", "Plan", "\u062e\u0637\u0637", "implementation.html"],
      ["calculator", "Budget", "\u0627\u0644\u0645\u064a\u0632\u0627\u0646\u064a\u0629", "calculator.html"],
      ["questions", "Concerns", "\u0627\u0644\u0645\u062e\u0627\u0648\u0641", "questions.html"],
      ["consult", "Consultation", "\u0627\u0644\u0627\u0633\u062a\u0634\u0627\u0631\u0629", "index.html#step3"]
    ];
    var st = {};
    try { st = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
    var m = location.pathname.match(/([^\/]+)\.html$/);
    var cur = m ? m[1] : "index";
    function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
    var done = ST.slice(0, 5).filter(function (s) { return st[s[0]]; }).length;

    document.querySelectorAll(".page-hero").forEach(function (ph) {
    if (!(ph.nextElementSibling && ph.nextElementSibling.classList.contains("stage-rail"))) {
      var nav = el("nav", "stage-rail");
      nav.setAttribute("aria-label", "ERP journey");
      var wrap = el("div", "wrap"), ol = el("ol");
      ST.forEach(function (s, i) {
        var li = el("li", (st[s[0]] ? "done " : "") + (s[0] === cur ? "current" : ""));
        var a = el("a", "sr-item",
          '<span class="sr-dot">' + (st[s[0]] && s[0] !== cur ? "\u2713" : (i + 1)) + '</span>' +
          '<span class="sr-label"><span class="l-en">' + s[1] + '</span><span class="l-ar">' + s[2] + '</span></span>');
        a.href = s[3];
        if (s[0] === cur) a.setAttribute("aria-current", "step");
        li.appendChild(a); ol.appendChild(li);
      });
      wrap.appendChild(ol); nav.appendChild(wrap);
      ph.parentNode.insertBefore(nav, ph.nextSibling);
    }
    });

    document.querySelectorAll("main .hero").forEach(function (hero) {
      var main = hero.closest("main");
      var ar = main && main.id === "lang-ar";
      var w = hero.querySelector(".wrap");
      if (!w || w.querySelector(".hero-panel")) return;
      var pct = Math.round(done / 5 * 100);
      var panel = el("aside", "hero-panel");
      var html = '<p class="hp-title">' + (ar ? "\u0631\u062d\u0644\u0629 \u0642\u0631\u0627\u0631\u0643" : "Your decision journey") + '</p><ol class="hp-list">';
      ST.forEach(function (s, i) {
        var d = !!st[s[0]];
        html += '<li class="' + (d ? "done" : "") + '"><a href="' + s[3] + '"><span class="hp-n">' + (d ? "\u2713" : (i + 1)) + '</span><span class="hp-t">' + (ar ? s[2] : s[1]) + '</span><span class="hp-s">' + (d ? (ar ? "\u062a\u0645" : "Done") : (ar ? "\u2190" : "\u2192")) + '</span></a></li>';
      });
      html += '</ol><div class="hp-bar"><i style="width:' + pct + '%"></i></div><p class="hp-foot">' +
        (ar ? ("\u0627\u0633\u062a\u0643\u0634\u0641\u062a " + done + " \u0645\u0646 \u0665 \u0645\u0631\u0627\u062d\u0644 \u00b7 \u0627\u0644\u062a\u0642\u062f\u0645 \u0645\u062d\u0641\u0648\u0638 \u0641\u064a \u0645\u062a\u0635\u0641\u062d\u0643 \u0628\u0633")
              : (done + " of 5 stages explored \u00b7 progress stays in your browser")) + '</p>';
      panel.innerHTML = html; w.appendChild(panel);

      var items = ar
        ? [["\u0665", "\u0645\u0631\u0627\u062d\u0644 \u0645\u0646\u0638\u0651\u0645\u0629 \u0645\u0646 \u0627\u0644\u0641\u0647\u0645 \u0644\u0644\u0642\u0631\u0627\u0631"], ["\u0663", "\u0623\u0633\u0626\u0644\u0629 \u0628\u0633 \u0641\u064a \u0641\u062d\u0635 \u0627\u0644\u062c\u0627\u0647\u0632\u064a\u0629"], ["\u0664\u0665 \u062f", "\u0627\u0633\u062a\u0634\u0627\u0631\u0629 \u0645\u0639 \u0645\u0633\u062a\u0634\u0627\u0631 Digital Economics"], ["\u062e\u0627\u0635", "\u062a\u0642\u062f\u0645\u0643 \u0628\u064a\u0641\u0636\u0644 \u0641\u064a \u0645\u062a\u0635\u0641\u062d\u0643"]]
        : [["5", "guided stages, from first questions to decision"], ["3", "question readiness check with a clear result"], ["45 min", "consultation with a Digital Economics advisor"], ["Private", "progress stays in your browser"]];
      var strip = el("section", "metrics");
      var card = el("div", "metrics-card");
      items.forEach(function (it) { card.appendChild(el("div", "metric", "<b>" + it[0] + "</b><span>" + it[1] + "</span>")); });
      var mw = el("div", "wrap"); mw.appendChild(card); strip.appendChild(mw);
      hero.parentNode.insertBefore(strip, hero.nextSibling);
    });
  } catch (e) {}
})();
