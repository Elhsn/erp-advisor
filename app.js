/* Digital Economics - ERP Advisor landing page
   Preview build: CONFIG.endpoint empty -> demo slots, no network calls, no fake success. */
const CONFIG = {
  endpoint: "",            // Apps Script web app URL, set at deployment
  slotMinutes: 45,
  startHour: 10,           // Cairo
  lastStartHour: 16,
  daysAhead: 14,
  minNoticeHours: 24,
  tz: "Africa/Cairo"
};

const STR = {
  en: {
    pickDate: "Pick a day above to see available times.",
    noSlots: "No free times left on this day - try another day.",
    chosen: "Your time:",
    needSlot: "Please choose a time first.",
    needFields: "Please fill in the required fields (name, company, title, business email, mobile, current situation).",
    badEmail: "That email doesn't look right.",
    badPhone: "Please enter a valid mobile number with country code, e.g. +20…",
    previewNote: "Preview build - the booking backend isn't connected yet, so nothing was sent.",
    sending: "Booking…",
    slotTaken: "That time was just taken - please pick another.",
    genericFail: "Something went wrong confirming your booking. Please try again - your details were not saved twice.",
    booked: "Your 45-minute consultation is confirmed for",
    meetLabel: "Join link (Google Meet):",
    meetNote: "Your Google Meet link is above - it is also valid from the .ics file below.",
    phoneNote: "No link needed: we will call you on your mobile at the scheduled time.",
    demoBanner: "Preview only - the booking backend is not connected, so nothing was booked or sent. This is what your confirmation would look like.",
    demoMeet: "Demo: your real Google Meet link would appear here.",
    bookingClosed: "Online booking is not open yet. Please reach us at Alhassan@de.com.eg or +20 150 782 8222 and we will book you in.",
    quotaErr: "Too many bookings were made recently. Please try again tomorrow, or contact us directly.",
    conflictErr: "We could not complete this booking with these details. Please refresh the page and try again.",
    cairo: "Cairo time",
    weekend: "Weekend",
    monthDay: { weekday: "short", day: "numeric", month: "short" },
    timeFmt: { hour: "numeric", minute: "2-digit", hour12: true },
    locale: "en-GB"
  },
  ar: {
    pickDate: "اختار يوم من فوق عشان تشوف المواعيد المتاحة.",
    noSlots: "مفيش مواعيد فاضية في اليوم ده - جرّب يوم تاني.",
    chosen: "ميعادك:",
    needSlot: "لو سمحت اختار ميعاد الأول.",
    needFields: "لو سمحت كمّل البيانات المطلوبة (الاسم، الشركة، المسمى الوظيفي، البريد، الموبايل، الوضع الحالي).",
    badEmail: "البريد الإلكتروني ده مش واضح إنه صحيح.",
    badPhone: "لو سمحت اكتب رقم موبايل صحيح بكود الدولة، مثال +20…",
    previewNote: "نسخة معاينة - نظام الحجز لسه مش متوصّل، فمفيش أي بيانات اتبعتت.",
    sending: "جارٍ الحجز…",
    slotTaken: "الميعاد ده اتاخد للتو - لو سمحت اختار ميعاد تاني.",
    genericFail: "حصلت مشكلة أثناء تأكيد الحجز. حاول تاني - بياناتك مش هتتسجل مرتين.",
    booked: "تم تأكيد استشارتك ٤٥ دقيقة يوم",
    meetLabel: "لينك الاجتماع (Google Meet):",
    meetNote: "لينك Google Meet بتاعك فوق - وهو موجود كمان في ملف التقويم تحت.",
    phoneNote: "مفيش لينك مطلوب: هنكلمك على موبايلك في الميعاد المحدد.",
    demoBanner: "معاينة فقط - نظام الحجز لسه مش متوصّل، فمفيش حجز اتعمل ولا بيانات اتبعتت. دي شكل شاشة التأكيد.",
    demoMeet: "تجريبي: لينك Google Meet الحقيقي كان هيظهر هنا.",
    bookingClosed: "الحجز أونلاين لسه مش متاح. كلمنا على Alhassan@de.com.eg أو +20 150 782 8222 وهنحجزلك.",
    quotaErr: "في حجوزات كتير اتعملت مؤخرًا. حاول تاني بكرة، أو كلمنا مباشرة.",
    conflictErr: "معقدرناش نكمل الحجز بالبيانات دي. لو سمحت حدّث الصفحة وحاول تاني.",
    cairo: "بتوقيت القاهرة",
    weekend: "عطلة",
    monthDay: { weekday: "short", day: "numeric", month: "short" },
    timeFmt: { hour: "numeric", minute: "2-digit", hour12: true },
    locale: "ar-EG"
  }
};

const TIPS = {
  inventory: {
    en: "Inventory accuracy: look for real-time stock by location, barcode support and proper landed-cost handling - spreadsheets won't scale.",
    ar: "دقة المخزون: دور على متابعة لحظية بالمخازن، دعم الباركود، وحساب صحيح لتكلفة الاستيراد - الإكسل مش هيكبر معاك."
  },
  accounting: {
    en: "Accounting: in Egypt, ETA e-invoicing and e-receipt compliance are must-haves, not extras - check them first.",
    ar: "الحسابات: في مصر، الفوترة الإلكترونية والإيصال الإلكتروني لمصلحة الضرائب أساسيات مش كماليات - اتأكد منها الأول."
  },
  sales: {
    en: "Sales follow-up: a CRM tied to quotations and invoicing stops leads dying in WhatsApp threads.",
    ar: "متابعة المبيعات: CRM مربوط بعروض الأسعار والفواتير بيمنع ضياع العملاء في رسايل الواتساب."
  },
  manufacturing: {
    en: "Production: you'll need BOMs, work orders and planning that match how your factory actually runs - ask to see your own scenario, not a generic demo.",
    ar: "الإنتاج: هتحتاج قوائم مكونات وأوامر شغل وتخطيط يطابق مصنعك فعلاً - اطلب تشوف السيناريو بتاعك مش عرض عام."
  },
  purchasing: {
    en: "Purchasing: supplier lead times, reorder rules and landed costs decide your margins - make them demo criteria.",
    ar: "المشتريات: مواعيد توريد الموردين وقواعد إعادة الطلب وتكلفة الاستيراد بتحدد هامشك - خليهم معايير تقييم."
  },
  hr: {
    en: "HR & payroll: attendance-device integration and Egyptian payroll rules save you a parallel manual process.",
    ar: "شؤون الموظفين والمرتبات: الربط مع أجهزة البصمة وقواعد المرتبات المصرية بيوفّروا شغل يدوي موازي."
  },
  reporting: {
    en: "Reporting: if you can't see margins per product/branch in one click today, put dashboards at the top of your list.",
    ar: "التقارير: لو مش شايف هامش الربح لكل منتج أو فرع بضغطة واحدة النهارده، خلي لوحات المؤشرات على قمة قائمتك."
  },
  branches: {
    en: "Multiple branches: one database with branch-level permissions beats merging files every month.",
    ar: "الفروع المتعددة: قاعدة بيانات واحدة بصلاحيات على مستوى الفرع أحسن من دمج ملفات كل شهر."
  }
};

const CURRENT_TIPS = {
  "0": { // no system
    en: "Starting from paper and Excel is actually an advantage: you can build clean processes from day one instead of migrating bad ones.",
    ar: "البداية من ورق وإكسل ميزة فعلاً: تقدر تبني عمليات نضيفة من أول يوم بدل ما تنقل عمليات غلط."
  },
  "1": {
    en: "With accounting software only, your biggest win is connecting operations (sales, stock, purchasing) to finance in one flow.",
    ar: "مع برنامج حسابات فقط، أكبر مكسب ليك هو ربط العمليات (مبيعات، مخزون، مشتريات) بالحسابات في مسار واحد."
  },
  "2": {
    en: "Disconnected systems usually mean double entry and conflicting numbers - consolidation into one database is your priority.",
    ar: "الأنظمة المنفصلة عادة معناها إدخال مكرر وأرقام متضاربة - التوحيد في قاعدة واحدة هو أولويتك."
  },
  "3": {
    en: "Replacing an ERP: write down what failed (adoption? support? fit?) so the next system is judged on those points first.",
    ar: "استبدال ERP حالي: اكتب إيه اللي فشل (الاستخدام؟ الدعم؟ الملاءمة؟) عشان النظام الجديد يتقيّم على النقاط دي الأول."
  }
};

let lang = localStorage.getItem("de-erp-lang") || "en";
{ const qp = new URLSearchParams(location.search).get("lang"); if (qp === "ar" || qp === "en") lang = qp; }
let selectedDay = null;
let selectedSlot = null; // {iso, label}
let demoSlots = {};

function $(s, r=document){ return r.querySelector(s); }
function $all(s, r=document){ return [...r.querySelectorAll(s)]; }
function S(){ return STR[lang]; }

/* ---------- language ---------- */
function applyLang(){
  const ar = lang === "ar";
  document.documentElement.lang = ar ? "ar" : "en";
  document.documentElement.dir = ar ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", ar);
  $("#lang-en").hidden = ar;
  $("#lang-ar").hidden = !ar;
  $("#langToggle").textContent = ar ? "English" : "العربية";
  localStorage.setItem("de-erp-lang", lang);
  selectedDay = null; selectedSlot = null;
  buildDates();
  renderSlots();
  updateChosen();
}
$("#langToggle").addEventListener("click", () => { lang = lang === "en" ? "ar" : "en"; applyLang(); });
loadLiveSlots(); // no-op when CONFIG.endpoint is empty (preview build)
const navTgl = $("#navToggle"), mainNav = $("#mainNav");
if (navTgl && mainNav) navTgl.addEventListener("click", () => mainNav.classList.toggle("open"));

/* ---------- assessment ---------- */
$all(".chip").forEach(ch => ch.addEventListener("click", () => {
  ch.classList.toggle("on");
  renderAssessment();
}));
$all("select").forEach(sel => sel.addEventListener("change", renderAssessment));

function renderAssessment(){
  const out = $(`#${lang}-assess-out`), list = $(`#${lang}-assess-list`);
  const chips = $all(`#${lang}-chips .chip.on`).map(c => c.dataset.k);
  const curSel = $(`#${lang}-current`);
  const cur = curSel.selectedIndex > 0 ? String(curSel.selectedIndex - 1) : null;
  if (!chips.length && cur === null){ out.hidden = true; return; }
  const items = [];
  if (cur !== null && CURRENT_TIPS[cur]) items.push(CURRENT_TIPS[cur][lang]);
  chips.slice(0, 4).forEach(k => items.push(TIPS[k][lang]));
  list.innerHTML = items.map(t => `<li>${t}</li>`).join("");
  out.hidden = false;
}

/* ---------- slots ---------- */
function cairoNow(){ // Date shifted so getters read Cairo wall time
  const now = new Date();
  const cairo = new Date(now.toLocaleString("en-US", { timeZone: CONFIG.tz }));
  return cairo;
}

/* Cairo wall-clock -> real UTC instant (two passes absorb DST transitions) */
const CAIRO_PARTS = new Intl.DateTimeFormat("en-US", { timeZone: CONFIG.tz, hour12: false, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });
const CAIRO_DAY = new Intl.DateTimeFormat("en-US", { timeZone: CONFIG.tz, year: "numeric", month: "numeric", day: "numeric" });
function cairoDayKey(d){ return CAIRO_DAY.format(d); }
function wallToUtc(y, m, d, h){
  const target = Date.UTC(y, m - 1, d, h, 0, 0);
  let utc = target;
  for (let i = 0; i < 2; i++){
    const parts = {};
    CAIRO_PARTS.formatToParts(new Date(utc)).forEach(p => { parts[p.type] = p.value; });
    let hh = +parts.hour; if (hh === 24) hh = 0;
    const wallAsUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, hh, +parts.minute, 0);
    utc = target - (wallAsUtc - utc);
  }
  return new Date(utc);
}

function demoSlotsFor(date){ // date: Cairo wall-time Date at midnight -> REAL UTC instants
  const day = date.getDay();
  if (day === 5 || day === 6) return []; // Fri/Sat weekend
  const now = new Date();
  const slots = [];
  for (let h = CONFIG.startHour; h <= CONFIG.lastStartHour; h++){
    const s = wallToUtc(date.getFullYear(), date.getMonth() + 1, date.getDate(), h);
    if (s.getTime() - now.getTime() < CONFIG.minNoticeHours * 3600 * 1000) continue;
    slots.push(s);
  }
  return slots;
}

/* Live availability: fetch real slots from the backend when connected */
let liveSlots = null; // { dayKey: [Date,...] }
async function loadLiveSlots(){
  if (!CONFIG.endpoint) return;
  try {
    const res = await fetch(CONFIG.endpoint);
    const data = await res.json();
    if (!data.ok || !Array.isArray(data.slots)) return;
    liveSlots = {};
    data.slots.forEach(s => {
      const d = new Date(s.start);
      const k = cairoDayKey(d);
      (liveSlots[k] = liveSlots[k] || []).push(d);
    });
    buildDates(); renderSlots();
  } catch (e) { /* keep demo slots on network failure */ }
}

function buildDates(){
  const row = $(`#${lang}-dates`);
  row.innerHTML = "";
  demoSlots = {};
  const today = cairoNow(); today.setHours(0,0,0,0);
  for (let i = 0; i < CONFIG.daysAhead; i++){
    const d = new Date(today); d.setDate(d.getDate() + i);
    const key = cairoDayKey(wallToUtc(d.getFullYear(), d.getMonth() + 1, d.getDate(), 12));
    const slots = liveSlots ? (liveSlots[key] || []) : demoSlotsFor(d);
    demoSlots[key] = slots;
    const wd = d.toLocaleDateString(S().locale, { weekday: "short" });
    const dm = d.toLocaleDateString(S().locale, { day: "numeric", month: "short" });
    const b = document.createElement("button");
    b.type = "button"; b.className = "date-chip";
    b.innerHTML = `${wd}<small>${dm}</small>`;
    if (!slots.length){ b.disabled = true; }
    b.addEventListener("click", () => {
      selectedDay = key; selectedSlot = null;
      $all(`#${lang}-dates .date-chip`).forEach(c => c.classList.remove("on"));
      b.classList.add("on");
      renderSlots(); updateChosen();
    });
    row.appendChild(b);
  }
  $(`#${lang}-demo-note`).hidden = !!CONFIG.endpoint;
}

function renderSlots(){
  const grid = $(`#${lang}-slots`);
  if (!selectedDay){ grid.innerHTML = `<p class="muted">${S().pickDate}</p>`; return; }
  const slots = demoSlots[selectedDay] || [];
  if (!slots.length){ grid.innerHTML = `<p class="muted">${S().noSlots}</p>`; return; }
  grid.innerHTML = "";
  slots.forEach(s => {
    const label = s.toLocaleTimeString(S().locale, Object.assign({}, S().timeFmt, { timeZone: CONFIG.tz }));
    const b = document.createElement("button");
    b.type = "button"; b.className = "slot"; b.textContent = label;
    b.addEventListener("click", () => {
      $all(`#${lang}-slots .slot`).forEach(x => x.classList.remove("on"));
      b.classList.add("on");
      selectedSlot = { date: s, label };
      updateChosen();
    });
    grid.appendChild(b);
  });
}

function updateChosen(){
  const el = $(`#${lang}-chosen`);
  if (!selectedSlot){ el.hidden = true; return; }
  const dStr = selectedSlot.date.toLocaleDateString(S().locale, { weekday: "long", day: "numeric", month: "long", timeZone: CONFIG.tz });
  el.textContent = `${S().chosen} ${dStr} - ${selectedSlot.label} (${S().cairo})`;
  el.hidden = false;
}

/* ---------- form ---------- */
const form = () => $(`#${lang}-form`);
const errBox = () => $(`#${lang}-error`);

function fail(msg){ const e = errBox(); e.textContent = msg; e.hidden = false; e.scrollIntoView({ behavior: "smooth", block: "center" }); }
function clearFail(){ errBox().hidden = true; }

["en","ar"].forEach(l => {
  $(`#${l}-form`).addEventListener("submit", ev => { ev.preventDefault(); if (l === lang) submitForm(); });
});

async function submitForm(){
  clearFail();
  const f = form();
  if (f.website.value){ return; } // honeypot: silently drop bots
  if (!selectedSlot){ fail(S().needSlot); return; }
  const data = Object.fromEntries(new FormData(f).entries());
  if (!data.name || !data.company || !data.title || !data.email || !data.mobile || !data.situation){ fail(S().needFields); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){ fail(S().badEmail); return; }
  if (!/^\+?[0-9\s-]{8,18}$/.test(data.mobile.trim())){ fail(S().badPhone); return; }

  data.mode = data.mode === "phone" ? "phone" : "meet";

  if (!CONFIG.endpoint){ showDemoConfirm(data); return; }

  const btn = $(`#${lang}-submit`);
  btn.disabled = true; btn.textContent = S().sending;
  const uuid = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + "-" + Math.random().toString(16).slice(2));
  try {
    const res = await fetch(CONFIG.endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // simple request, avoids CORS preflight
      body: JSON.stringify({ uuid, slotStart: selectedSlot.date.toISOString(), lang, ...data })
    });
    const out = await res.json();
    if (!out.ok){
      const map = { slot_taken: S().slotTaken, booking_closed: S().bookingClosed, quota_exceeded: S().quotaErr, conflict: S().conflictErr };
      fail(map[out.error] || S().genericFail);
      if (out.error === "slot_taken"){ liveSlots = null; loadLiveSlots(); }
      btn.disabled = false; btn.textContent = lang === "ar" ? "أكّد استشارتي ٤٥ دقيقة" : "Confirm my 45-minute consultation";
      return;
    }
    showConfirm({ slotStart: out.slotStart, meetLink: out.meetLink, mode: out.mode || data.mode, demo: false });
  } catch (e){
    fail(S().genericFail);
    btn.disabled = false;
  }
}

/* Demo confirmation: clearly labeled preview, no booking was made, no data was sent */
function showDemoConfirm(data){
  showConfirm({ slotStart: selectedSlot.date.toISOString(), meetLink: null, mode: data.mode, demo: true });
}

function showConfirm(out){
  form().hidden = true;
  $(`#${lang}-confirm`).hidden = false;
  const d = new Date(out.slotStart || selectedSlot.date);
  const dStr = d.toLocaleDateString(S().locale, { weekday: "long", day: "numeric", month: "long", timeZone: CONFIG.tz });
  const tStr = d.toLocaleTimeString(S().locale, Object.assign({}, S().timeFmt, { timeZone: CONFIG.tz }));
  $(`#${lang}-confirm-when`).textContent = `${S().booked} ${dStr} - ${tStr} (${S().cairo}).`;
  const meetEl = $(`#${lang}-confirm-meet`);
  const modeEl = $(`#${lang}-confirm-mode`);
  const demoEl = $(`#${lang}-confirm-demo`);
  if (out.demo){
    meetEl.innerHTML = out.mode === "meet" ? `<em>${S().demoMeet}</em>` : "";
    modeEl.textContent = out.mode === "phone" ? S().phoneNote : "";
    demoEl.textContent = S().demoBanner;
    demoEl.hidden = false;
  } else {
    meetEl.innerHTML = out.meetLink ? `${S().meetLabel} <a href="${out.meetLink}" target="_blank" rel="noopener" dir="ltr">${out.meetLink}</a>` : "";
    modeEl.textContent = out.mode === "phone" ? S().phoneNote : (out.meetLink ? S().meetNote : "");
    demoEl.hidden = true;
  }
  $(`#${lang}-confirm`).dataset.icsStart = d.toISOString();
  $(`#${lang}-confirm`).dataset.icsMeet = out.meetLink || "";
  $(`#${lang}-confirm`).scrollIntoView({ behavior: "smooth" });
}

/* .ics download - works in real mode after confirmed booking */
["en","ar"].forEach(l => {
  $(`#${l}-ics`).addEventListener("click", () => {
    const c = $(`#${l}-confirm`);
    const start = new Date(c.dataset.icsStart || Date.now());
    const end = new Date(start.getTime() + CONFIG.slotMinutes * 60000);
    const fmt = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const meet = c.dataset.icsMeet;
    const ics = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Digital Economics//ERP Consultation//EN","BEGIN:VEVENT",
      `UID:${Date.now()}@de.com.eg`,`DTSTAMP:${fmt(new Date())}`,`DTSTART:${fmt(start)}`,`DTEND:${fmt(end)}`,
      "SUMMARY:ERP Consultation - Digital Economics (45 min)",
      `DESCRIPTION:${meet ? "Meet: " + meet : "Digital Economics will contact you to confirm."}`,
      "END:VEVENT","END:VCALENDAR"].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "DE-ERP-Consultation.ics"; a.click();
  });
});

applyLang();

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

/* Readiness check - answers stay in the visitor's browser (localStorage only). */
(function () {
  "use strict";
  var KEY = "de-erp-readiness-v1";
  function read() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function write(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var ar = document.documentElement.dir === "rtl";
  var wrap = document.getElementById(ar ? "readiness-ar" : "readiness-en");
  if (!wrap) return;
  var KEYS = ["close", "stock", "numbers"];
  var LABELS_EN = { close: "Late month closes", stock: "Inventory you cannot count", numbers: "Numbers arriving late" };
  var LABELS_AR = { close: "قفلة الشهر المتأخرة", stock: "مخزون مش متجرد بدقة", numbers: "أرقام بتوصل متأخر" };
  var NOTES_EN = { close: "The most common first trigger we see.", stock: "Where spreadsheets usually break first.", numbers: "Exactly what an ERP is built to fix." };
  var NOTES_AR = { close: "أشهر أول سبب بنشوفه.", stock: "أول حتة الإكسل بتكسر فيها عادة.", numbers: "ده بالظبط اللي الـ ERP متبني يحلها." };
  var T = ar ? {
    h3: "نتيجتك باختصار",
    verdictAll: "إجاباتك التلاتة بتقول إن أدواتك الحالية لسه شايلاك. الخطوة الجاية مش نظام جديد - إنك تتأكد إن الصورة كاملة.",
    verdictGaps: "إجاباتك بتشاور على النقط دي - علامات إن الأدوات الحالية وصلت لحدودها:",
    nextAll: 'الخطوة المقترحة: ابدأ بمرحلة <a href="concepts.html">«افهم»</a> - هتأكدلك ده، وهتوريك تراقب إيه وانت بتكبر.',
    nextGaps: 'الخطوة المقترحة: ابدأ بـ<a href="concepts.html">«افهم»</a>، وبعدها <a href="calculator.html">«الميزانية»</a> - أو <a href="#step3-ar">احجز استشارتك</a> على طول.',
    privacy: "إجاباتك بتفضل على جهازك - مش بنشوفها ولا بنخزنها.",
    reset: "ابدأ من الأول"
  } : {
    h3: "Your readiness snapshot",
    verdictAll: "All three answers say your current tools still carry you. The next step is not a new system - it is confirming that is the full picture.",
    verdictGaps: "Your answers flag the areas below - signs the current tools are reaching their limits:",
    nextAll: 'Suggested next step: start with the <a href="concepts.html">Understand stage</a> - it will confirm that, and show what to watch as you grow.',
    nextGaps: 'Suggested next step: start with <a href="concepts.html">Understand</a>, then <a href="calculator.html">Budget</a> - or <a href="#step3">book your consultation</a> directly.',
    privacy: "Answers stay in your browser - we never see or store them.",
    reset: "Start over"
  };
  var prog = document.getElementById(ar ? "journey-progress-ar" : "journey-progress-en");
  function paint(st) {
    wrap.querySelectorAll(".readiness-q").forEach(function (q) {
      var k = q.getAttribute("data-q"), a = st[k];
      q.querySelectorAll(".readiness-note").forEach(function (n) { n.hidden = n.getAttribute("data-a") !== a; });
      q.querySelectorAll("button").forEach(function (b) {
        b.disabled = !!a;
        b.classList.toggle("picked", b.getAttribute("data-a") === a);
      });
    });
    var res = document.getElementById(ar ? "readiness-result-ar" : "readiness-result-en");
    if (res) {
      var ans = KEYS.filter(function (k) { return st[k]; });
      if (ans.length < KEYS.length) { res.hidden = true; res.innerHTML = ""; }
      else {
        var nos = ans.filter(function (k) { return st[k] === "no"; });
        var html = "<h3>" + T.h3 + "</h3>";
        html += '<p class="rr-verdict">' + (nos.length ? T.verdictGaps : T.verdictAll) + "</p>";
        if (nos.length) {
          html += '<ul class="rr-gaps">' + nos.map(function (k) {
            return "<li><strong>" + (ar ? LABELS_AR : LABELS_EN)[k] + "</strong> - " + (ar ? NOTES_AR : NOTES_EN)[k] + "</li>";
          }).join("") + "</ul>";
        }
        html += '<p class="rr-next">' + (nos.length ? T.nextGaps : T.nextAll) + "</p>";
        html += '<p class="rr-foot"><span>' + T.privacy + '</span><button type="button" class="rr-reset">' + T.reset + "</button></p>";
        res.innerHTML = html;
        res.hidden = false;
        res.querySelector(".rr-reset").addEventListener("click", function () { write({}); paint({}); });
      }
    }
    /* personalize the journey progress line with their own answers */
    if (prog) {
      if (!prog.dataset.base && prog.textContent) prog.dataset.base = prog.textContent;
      if (prog.dataset.base) {
        var nos2 = KEYS.filter(function (k) { return st[k] === "no"; });
        if (nos2.length) {
          var l2 = nos2.map(function (k) { return ar ? LABELS_AR[k] : LABELS_EN[k].charAt(0).toLowerCase() + LABELS_EN[k].slice(1); });
          prog.textContent = prog.dataset.base + (ar ? (" (من إجاباتك: " + l2.join("، ") + ")") : (" (from your answers: " + l2.join(", ") + ")"));
        } else prog.textContent = prog.dataset.base;
      }
    }
  }
  wrap.querySelectorAll("button[data-a]").forEach(function (b) {
    b.addEventListener("click", function () {
      var st = read();
      st[b.closest(".readiness-q").getAttribute("data-q")] = b.getAttribute("data-a");
      write(st); paint(st);
      var res = document.getElementById(ar ? "readiness-result-ar" : "readiness-result-en");
      if (res && !res.hidden) {
        var smooth = true;
        try { smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
        res.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "nearest" });
      }
    });
  });
  paint(read());
})();
