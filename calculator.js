/* DE cost calculator - subscription figures use vendor PUBLIC LIST PRICES only
   (sources retrieved 2026-10-29; see SOURCES below). One-time project components
   (implementation, migration, integrations, training, support) are TRANSPARENT
   EDITABLE INPUTS - the user enters their own planning numbers; nothing is
   invented. Unpriced pieces are shown as quote-needed, never as zero. */
(function () {
  "use strict";
  // USD per user per month, yearly billing. SOURCES (retrieved 2026-10-29):
  // - Odoo Standard/Custom: https://www.odoo.com/pricing
  // - Business Central Essentials/Premium: https://www.microsoft.com/en-us/dynamics-365/products/business-central/pricing
  // - Dynamics 365 Finance / Finance Premium: https://www.microsoft.com/en-us/dynamics-365/products/finance/pricing
  // - Oracle Fusion ERP Cloud Service (B91079, min 10 hosted named users):
  //   https://www.oracle.com/a/ocom/docs/corporate/pricing/oracle-fusion-cloud-global-price-list.pdf
  // price:null = vendor quotes directly (SAP S/4HANA Cloud, SAP Business One, Oracle NetSuite)
  var TIERS = {
    odoo_std:    { region: "odoo", price: 24.90, name: "Odoo Standard", odooNote: true },
    odoo_cus:    { region: "odoo", price: 49.00, name: "Odoo Custom", odooNote: true },
    bc_ess:      { region: "ms", price: 80.00, name: "Business Central Essentials" },
    bc_prem:     { region: "ms", price: 110.00, name: "Business Central Premium" },
    d365_fin:    { region: "ms", price: 210.00, name: "Dynamics 365 Finance" },
    d365_finp:   { region: "ms", price: 300.00, name: "Dynamics 365 Finance Premium" },
    ora_fusion:  { region: "oracle", price: 625.00, name: "Oracle Fusion ERP Cloud", minUsers: 10 },
    ora_ns:      { price: null, name: "Oracle NetSuite" },
    sap_s4:      { price: null, name: "SAP S/4HANA Cloud" },
    sap_b1:      { price: null, name: "SAP Business One" },
    notsure:     { price: null, name: null },
    custom_rate: { price: "custom", name: null }
  };
  var ONETIME = ["c-impl", "c-mig", "c-int", "c-train"];
  var ANNUAL = ["c-sup"];
  // Odoo yearly rate is a first-12-months discount for initial users (odoo.com/pricing footnote).
  var ODOO_NOTE = { en: " (first-12-months rate, yearly billing)", ar: " (سعر أول ١٢ شهر، دفع سنوي)" };

  function fmt(n) {
    return "$" + Math.round(n).toLocaleString("en-US");
  }

  document.addEventListener("DOMContentLoaded", function () {
    // The page carries one form per language block (main#lang-en / main#lang-ar),
    // so every lookup is scoped to the block that owns the clicked button.
    var btns = document.querySelectorAll("#c-calc");
    Array.prototype.forEach.call(btns, function (btn) {
    btn.addEventListener("click", function () {
      var scope = btn.closest("main") || document;
      var users = +scope.querySelector("#c-users").value;
      var tierSel = scope.querySelector("#c-tier").value;
      var t = TIERS[tierSel];
      var subEl = scope.querySelector("#c-sub");
      var y1El = scope.querySelector("#c-year1");
      var lblEl = scope.querySelector("#c-year1-label");
      var otEl = scope.querySelector("#c-onetime");
      var anEl = scope.querySelector("#c-annual");
      var niEl = scope.querySelector("#c-notinc");
      var regEl = scope.querySelector("#c-region");
      function setRegion(en, arT) { regEl.textContent = ar ? arT : en; regEl.style.display = "block"; }
      function hideRegion() { regEl.style.display = "none"; }
      var ar = document.documentElement.lang === "ar";

      // --- subscription line ---
      if (tierSel === "custom_rate") {
        var rate = +scope.querySelector("#c-rate").value;
        if (!(rate > 0)) {
          lblEl.textContent = ar ? "اشتراك بسعر المعروض عليك" : "Subscription at your quoted rate";
          y1El.textContent = ar ? "اكتب السعر الأول" : "Enter a rate first";
          subEl.textContent = ar ? "اكتب سعر المستخدم/الشهر اللي المورّد عرضه عليك في الحقل المخصص." : "Type the per-user/month rate your vendor quoted you in the custom-rate field.";
          setRegion("Your quoted rate replaces any list-price assumption.", "السعر المعروض عليك بيغني عن أي افتراض لسعر قائمة.");
        } else {
          var cannual = users * rate * 12;
          lblEl.textContent = ar ? "اشتراك بسعر المعروض عليك" : "Subscription at your quoted rate";
          y1El.textContent = fmt(cannual) + (ar ? " / سنة" : " / year");
          subEl.textContent = users + (ar ? " مستخدم × $" : " users × $") + rate + (ar ? " × ١٢ شهر (سعرك أنت)" : " × 12 mo (your rate)");
          setRegion("Your quoted rate replaces any list-price assumption.", "السعر المعروض عليك بيغني عن أي افتراض لسعر قائمة.");
        }
      } else if (tierSel === "notsure") {
        lblEl.textContent = ar ? "لسه محتار؟" : "Not sure yet?";
        y1El.textContent = ar ? "ساعدنا نقارن سوياً" : "Let's compare together";
        subEl.textContent = ar
          ? "في الاستشارة بنقارن العائلات الأربعة على احتياجك وحجمك."
          : "In the consultation we compare all four families against your needs and size.";
        hideRegion();
      } else if (t.price === null) {
        lblEl.textContent = ar ? "الاشتراك السنوي (سعر القائمة)" : "Annual subscription (list price)";
        y1El.textContent = ar ? "حسب عرض المورّد" : "Vendor-quoted";
        subEl.textContent = ar
          ? t.name + " بيتسعر مباشرة من المورّد - مفيش سعر قائمة عام منشور."
          : t.name + " is quoted directly by the vendor - no public list price is published.";
        setRegion("No published list price - the number comes from a vendor quotation for your market.", "مفيش سعر قائمة منشور - الرقم بيتحدد بعرض سعر من المورّد لسوقك.");
      } else {
        var billed = t.minUsers ? Math.max(users, t.minUsers) : users;
        var annual = billed * t.price * 12;
        lblEl.textContent = t.odooNote
          ? (ar ? "اشتراك السنة الأولى (سعر القائمة)" : "First-year subscription (list price)")
          : (ar ? "الاشتراك السنوي (سعر القائمة)" : "Annual subscription (list price)");
        y1El.textContent = fmt(annual) + (ar ? " / سنة" : " / year");
        subEl.textContent = billed + (ar ? " مستخدم × $" : " users × $") + t.price + (ar ? " × ١٢ شهر" : " × 12 mo")
          + (t.minUsers ? (ar ? " (حد أدنى ١٠ مستخدمين)" : " (10-user minimum)") : "")
          + (t.odooNote ? (ar ? ODOO_NOTE.ar : ODOO_NOTE.en) : "");
        if (t.region === "odoo") setRegion(
          "Country check: Odoo shows different USD books by country; this result uses the lower international book. Confirm which book applies to your country at odoo.com/pricing before relying on it.",
          "تأكد من بلدك: أودو بيعرض تسعيرات دولارية مختلفة حسب الدولة، والنتيجة دي بالتسعيرة الدولية الأقل. تأكد من التسعيرة المنطبقة على بلدك على odoo.com/pricing قبل الاعتماد عليها.");
        else if (t.region === "ms") setRegion(
          "These are Microsoft US list prices; local market pricing and availability may differ.",
          "دي أسعار القائمة الأمريكية من مايكروسوفت؛ الأسعار والتوفر في سوقك المحلي ممكن يختلفوا.");
        else if (t.region === "oracle") setRegion(
          "From Oracle's US-dollar global price list (8 Oct 2026); local pricing may differ.",
          "من قائمة أوراكل العالمية بالدولار الأمريكي (٨ أكتوبر ٢٠٢٦)؛ التسعير المحلي ممكن يختلف.");
        else hideRegion();
      }

      // --- one-time components the user typed ---
      var sum = 0, filled = 0, missing = [];
      var NAMES = {
        "c-impl":  ar ? "خدمات التنفيذ" : "implementation services",
        "c-mig":   ar ? "ترحيل البيانات" : "data migration",
        "c-int":   ar ? "التكاملات" : "integrations",
        "c-train": ar ? "التدريب" : "training",
        "c-sup":   ar ? "الدعم والإضافات السنوية" : "annual extras"
      };
      ONETIME.forEach(function (id) {
        var v = scope.querySelector("#" + id).value.trim();
        if (v !== "" && !isNaN(+v) && +v > 0) { sum += +v; filled++; }
        else { missing.push(NAMES[id]); }
      });
      otEl.textContent = filled > 0
        ? fmt(sum) + (ar ? " (أرقامك أنت)" : " (your inputs)")
        : (ar ? "لسه مدخلتش أرقام" : "No numbers entered yet");
      var asum = 0, afilled = false;
      ANNUAL.forEach(function (id) {
        var v = scope.querySelector("#" + id).value.trim();
        if (v !== "" && !isNaN(+v) && +v > 0) { asum += +v; afilled = true; }
        else { missing.push(NAMES[id]); }
      });
      anEl.textContent = afilled
        ? fmt(asum) + (ar ? " / سنة (متكرر)" : " / year (recurring)")
        : (ar ? "لسه مدخلتش رقم" : "No number entered yet");
      niEl.textContent = missing.length
        ? (ar ? "يتحتاج تسعير: " : "Still quote-needed: ") + missing.join(ar ? "، " : ", ")
        : (ar ? "لا شيء - دخلت كل البنود" : "None - you entered every component");

      var r = scope.querySelector("#c-result");
      r.classList.add("show");
      r.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    });
  });
})();
