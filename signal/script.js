// WGWJ — grace's personal frequency
(() => {
  "use strict";

  // ----- stations -----
  // freq in MHz * 10 (stored as int) 880 = 88.0 MHz
  const STATIONS = [
    {
      freq: 883,
      call: "WGWJ-CODE",
      kind: "broadcast · software",
      title: "compilers that want to be read aloud",
      body: "I write developer tools that try to have a voice. A compiler called slowcompiler takes thirty seconds on hello world and prints a haiku at each stage. A synthesizer called hum listens to your voice and hands back a small song. A loom called weft finishes a scarf once per orbital year, driven by git.",
      ticker: "hum — rust + webaudio, ~120 wu · slowcompiler — !!con 2024 · weft — one scarf / year · next show: a tiny language for describing rivers",
      links: [
        ["github", "https://github.com/grace-wj"],
        ["talks", "#"],
      ],
    },
    {
      freq: 917,
      call: "WGWJ-INK",
      kind: "broadcast · painting",
      title: "three bodies orbiting a lamp",
      body: "A series in oil, ink, and gouache. Small works, mostly. Recent pieces explore orbital motion as a metaphor for long relationships — elliptical, patient, occasionally catastrophic. Shown in a borrowed window on Bergen Street last spring.",
      ticker: "recent: three bodies orbiting a lamp (2024, ink) · tide-chart for a city that doesn't exist (2025, gouache) · a portrait of my compiler (2024, oil) · studio visits by correspondence",
      links: [
        ["view the series", "#"],
        ["studio", "mailto:grayswan795@gmail.com"],
      ],
    },
    {
      freq: 951,
      call: "WGWJ-WORDS",
      kind: "broadcast · writing",
      title: "on stillness, and other essays",
      body: "Occasional long-form: on stillness, on why we built frameworks and then blamed them, notes toward a theory of kitsch. Essays arrive slowly. They do not arrive on schedule.",
      ticker: "on stillness · notes toward a theory of kitsch · a year without frameworks · drafts open, reading slowly · replies welcome",
      links: [
        ["notebook", "#"],
        ["rss", "#"],
      ],
    },
    {
      freq: 985,
      call: "WGWJ-LOGS",
      kind: "broadcast · contact",
      title: "station identification",
      body: "WGWJ broadcasts from a desk in a small kitchen. Correspondence is read slowly and answered when answers are ready. No social accounts to speak of; no mailing list; no newsletter about a forthcoming newsletter.",
      ticker: "mail open · replies delayed but genuine · no dm's, no threads, no app · if urgent, try knocking",
      links: [
        ["mail", "mailto:grayswan795@gmail.com"],
        ["github", "https://github.com/grace-wj"],
      ],
    },
    {
      freq: 1029,
      call: "WGWJ-NUM",
      kind: "broadcast · off-schedule",
      title: "— numbers station —",
      body: "3 · 14 · 15 · 9 · 26 · 5 · 3 · 5 · 8 · 9 · 7 · 9 · 3 · 2 · 3 · 8 · 4 · 6 · 2. repeating. end of transmission.",
      ticker: "if you are hearing this you have tuned past the listed programming. this station broadcasts nothing but digits. or it broadcasts everything, once.",
      links: [],
    },
  ];

  const MIN = 880, MAX = 1080; // 88.0 → 108.0 MHz

  // ----- DOM -----
  const dial = document.getElementById("dial");
  const dialScale = document.getElementById("dialScale");
  const needle = document.getElementById("needle");
  const markers = document.getElementById("markers");
  const freqEl = document.getElementById("freq");
  const metaEl = document.getElementById("meta");
  const smeter = document.getElementById("smeter");
  const tunedLed = document.getElementById("tunedLed");
  const card = document.getElementById("card");
  const cardFreq = document.getElementById("cardFreq");
  const cardKind = document.getElementById("cardKind");
  const cardTitle = document.getElementById("cardTitle");
  const cardBody = document.getElementById("cardBody");
  const cardLinks = document.getElementById("cardLinks");
  const ticker = document.getElementById("ticker");
  const viz = document.getElementById("viz");
  const vizBars = document.querySelectorAll(".viz__bar");
  const knobFace = document.getElementById("knobFace");
  const btns = document.querySelectorAll(".btn");

  // ----- draw dial scale labels (major ticks at every 2 MHz) -----
  (function drawScale() {
    for (let f = 88; f <= 108; f += 2) {
      const span = document.createElement("span");
      span.textContent = f.toFixed(0);
      const pct = (f * 10 - MIN) / (MAX - MIN);
      span.style.left = (pct * 100) + "%";
      span.style.top = "65%";
      dialScale.appendChild(span);
    }
    // station markers
    for (const s of STATIONS) {
      const m = document.createElement("div");
      m.className = "dial__marker";
      m.setAttribute("data-label", (s.freq / 10).toFixed(1));
      const pct = (s.freq - MIN) / (MAX - MIN);
      m.style.left = (pct * 100) + "%";
      markers.appendChild(m);
    }
  })();

  // ----- state -----
  let freq = 915; // 91.5 MHz — between two stations so user must tune
  let lastRotation = 0;

  function update() {
    const pct = (freq - MIN) / (MAX - MIN);
    needle.style.left = (pct * 100) + "%";
    freqEl.textContent = (freq / 10).toFixed(1).padStart(5, "0");

    // find nearest station and distance
    let nearest = STATIONS[0];
    let minDist = Infinity;
    for (const s of STATIONS) {
      const d = Math.abs(s.freq - freq);
      if (d < minDist) { minDist = d; nearest = s; }
    }

    // signal strength: 0..1, stronger when closer (within ±10 = 1 MHz)
    const LOCK = 3; // ±0.3 MHz counts as tuned in
    const WIDTH = 20; // ±2 MHz to get any signal
    let strength;
    if (minDist <= LOCK) strength = 1;
    else if (minDist >= WIDTH) strength = 0.05;
    else strength = 1 - ((minDist - LOCK) / (WIDTH - LOCK)) * 0.95;

    smeter.style.width = (5 + strength * 95) + "%";

    if (minDist <= LOCK) {
      card.classList.remove("static");
      viz.classList.add("live");
      tunedLed.classList.add("on");
      metaEl.textContent = `▸ ${nearest.call}  ·  tuned`;
      renderStation(nearest);
    } else if (minDist <= WIDTH) {
      card.classList.add("static");
      viz.classList.remove("live");
      tunedLed.classList.remove("on");
      metaEl.textContent = "— tuning —";
      // dim readout in card but leave previous
    } else {
      card.classList.add("static");
      viz.classList.remove("live");
      tunedLed.classList.remove("on");
      metaEl.textContent = "— no signal —";
    }

    // rotate the tune knob to show angle
    const knobAngle = pct * 720 - 360;
    if (knobFace) knobFace.style.transform = `rotate(${knobAngle}deg)`;

    // highlight preset button
    btns.forEach((b) => {
      const bf = Math.round(parseFloat(b.dataset.freq) * 10);
      b.classList.toggle("active", bf === nearest.freq && minDist <= LOCK);
    });

    dial.setAttribute("aria-valuenow", String(freq));
  }

  let currentCall = null;
  function renderStation(s) {
    if (currentCall === s.call) return; // avoid DOM thrash
    currentCall = s.call;
    cardFreq.textContent = (s.freq / 10).toFixed(1) + " MHz";
    cardKind.textContent = s.kind;
    cardTitle.textContent = s.title;
    cardBody.textContent = s.body;
    ticker.textContent = s.ticker + "  ◦  " + s.ticker;
    cardLinks.innerHTML = s.links.map(([name, href]) =>
      `<li><a href="${href}" ${href.startsWith("#") ? "" : 'target="_blank" rel="noopener"'}>${name} →</a></li>`
    ).join("");
  }

  // ----- interaction: drag dial -----
  let pointerDown = false;
  let pdx = 0, startFreq = 0;

  dial.addEventListener("pointerdown", (e) => {
    pointerDown = true;
    pdx = e.clientX;
    startFreq = freq;
    dial.setPointerCapture(e.pointerId);
  });
  dial.addEventListener("pointermove", (e) => {
    if (!pointerDown) return;
    const rect = dial.getBoundingClientRect();
    const dx = e.clientX - pdx;
    const dFreq = (dx / rect.width) * (MAX - MIN);
    freq = Math.max(MIN, Math.min(MAX, startFreq + dFreq));
    update();
  });
  const endPointer = (e) => {
    pointerDown = false;
    try { dial.releasePointerCapture(e.pointerId); } catch {}
  };
  dial.addEventListener("pointerup", endPointer);
  dial.addEventListener("pointercancel", endPointer);

  // wheel over dial to tune
  dial.addEventListener("wheel", (e) => {
    e.preventDefault();
    freq = Math.max(MIN, Math.min(MAX, freq + Math.sign(e.deltaY) * 1));
    update();
  }, { passive: false });

  // click on dial to snap-tune near the click (smooth ease)
  dial.addEventListener("click", (e) => {
    const rect = dial.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const target = MIN + pct * (MAX - MIN);
    easeTo(target);
  });

  // ----- tune knob: drag-to-rotate -----
  let knobDown = false, knobStart = 0, knobStartFreq = 0;
  if (knobFace) {
    knobFace.addEventListener("pointerdown", (e) => {
      knobDown = true;
      knobStart = e.clientX;
      knobStartFreq = freq;
      knobFace.setPointerCapture(e.pointerId);
    });
    knobFace.addEventListener("pointermove", (e) => {
      if (!knobDown) return;
      const dx = e.clientX - knobStart;
      freq = Math.max(MIN, Math.min(MAX, knobStartFreq + dx * 0.5));
      update();
    });
    knobFace.addEventListener("pointerup", (e) => {
      knobDown = false;
      try { knobFace.releasePointerCapture(e.pointerId); } catch {}
    });
  }

  // ----- preset buttons -----
  btns.forEach((b) => {
    b.addEventListener("click", () => {
      const target = Math.round(parseFloat(b.dataset.freq) * 10);
      easeTo(target);
    });
  });

  // ----- keyboard -----
  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    if (e.key === "ArrowLeft") { freq = Math.max(MIN, freq - 1); update(); }
    else if (e.key === "ArrowRight") { freq = Math.min(MAX, freq + 1); update(); }
    else if (e.key === "ArrowUp" || e.key === "PageUp") { jumpStation(1); }
    else if (e.key === "ArrowDown" || e.key === "PageDown") { jumpStation(-1); }
    else return;
    e.preventDefault();
  });

  function jumpStation(dir) {
    const sorted = [...STATIONS].sort((a, b) => a.freq - b.freq);
    let target;
    if (dir > 0) target = sorted.find((s) => s.freq > freq + 3) || sorted[0];
    else target = [...sorted].reverse().find((s) => s.freq < freq - 3) || sorted[sorted.length - 1];
    easeTo(target.freq);
  }

  // smooth ease with a touch of overshoot
  function easeTo(target, duration = 650) {
    const startFreq = freq;
    const start = performance.now();
    const delta = target - startFreq;
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      // easeOutQuart
      const e = 1 - Math.pow(1 - t, 4);
      freq = startFreq + delta * e;
      update();
      if (t < 1) requestAnimationFrame(step);
      else { freq = target; update(); }
    }
    requestAnimationFrame(step);
  }

  // ----- VU animation (fake) -----
  function animateVU() {
    const live = viz.classList.contains("live");
    const target = live ? 1 : 0.25;
    vizBars.forEach((b) => {
      const r = Math.random();
      const h = (r * 0.7 + 0.2) * target * 100;
      b.style.height = h + "%";
    });
    requestAnimationFrame(() => setTimeout(animateVU, 70));
  }
  animateVU();

  // initial render
  update();
})();
