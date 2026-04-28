// colophon — a riso-printed FM tuner dial as a colophon for Wei-li Press.
// from signal: dial face with major/minor ticks, station markers, needle, S-meter, presets, ±0.3 lock-in
// from press/galley: full riso palette + halftones + Anton/Fraunces/Mono + misregistration ghosts

// ─────────────────────────────────────────────────────────
// data — seven stations across 88.0 → 108.0 MHz
// ─────────────────────────────────────────────────────────
const F_MIN = 88.0, F_MAX = 108.0;
const LOCK = 0.3;

const STATIONS = [
  { f: 89.7,  id: 'hum',          name: 'hum',          folio: '003', sub: 'a synthesizer',
    body: `<p>For people who cannot read music. You hum into it; it gives you back a small song it thinks you meant. Rust + WebAudio. About four thousand two hundred lines, in quiet beta.</p>
           <p>Most-used patch: <em>shower mode</em>. People who hum in the shower had been complaining the audio cut out at high steam.</p>
           <p class="specs">stock · linen finished cream<br/>colors · pink · cyan · warm black<br/>folio · 003 · pulled in browser</p>`},
  { f: 92.1,  id: 'slowcompiler', name: 'slowcompiler', folio: '009', sub: 'a compiler',
    body: `<p>A compiler that takes exactly thirty seconds to compile <em>hello world</em>, and prints a haiku at every pass of the pipeline.</p>
           <p>Lex, parse, type, lower, emit. The haiku for <em>parse</em> begins: <em>at last, the small tree / drops its leaves into a list / and a list, and a list.</em></p>
           <p class="specs">stock · linen finished cream<br/>colors · pink · cyan · warm black<br/>folio · 009 · pulled in browser</p>`},
  { f: 95.3,  id: 'weft',         name: 'weft',         folio: '015', sub: 'a loom',
    body: `<p>A physical jacquard loom, a Raspberry Pi, and a git hook. One thread per commit; one scarf per orbital year.</p>
           <p>The week the parser of <em>slowcompiler</em> was rewritten left three days of red thread; you can see it on the cloth.</p>
           <p class="specs">stock · linen finished cream<br/>colors · pink · cyan · warm black<br/>folio · 015 · pulled in browser</p>`},
  { f: 98.5,  id: 'three',        name: 'three bodies', folio: '021', sub: 'paintings',
    body: `<p>An eight-panel oil series. Three figures in a low-lit kitchen, the kettle a warm pool of light. Painted on long autumn afternoons; the light went from warm to cold and the painting followed it.</p>
           <p>Shown briefly in a borrowed window on Bergen Street. Now in private collections — friends' living rooms.</p>
           <p class="specs">stock · linen finished cream<br/>colors · pink · cyan · warm black<br/>folio · 021 · pulled in browser</p>`},
  { f: 101.7, id: 'stillness',    name: 'on stillness', folio: '027', sub: 'an essay',
    body: `<p>An essay on the question of when a thing is finished. The argument is that finished is the wrong unit.</p>
           <p>Reads like a long letter. Has been written for two years and may continue to be written for two more.</p>
           <p class="specs">stock · linen finished cream<br/>colors · pink · cyan · warm black<br/>folio · 027 · pulled in browser</p>`},
  { f: 104.3, id: 'letters',      name: 'letters',      folio: '032', sub: 'correspondence',
    body: `<p>Slow correspondence in the post. Replies will be slow and, when they come, longer than they should be. Letter is the right unit of attention.</p>
           <p class="specs">stock · linen finished cream<br/>colors · pink · cyan · warm black<br/>folio · 032 · pulled in browser</p>`},
  { f: 106.9, id: 'colophon',     name: 'colophon',     folio: '037', sub: 'this page',
    body: `<p>The colophon names who set this. <em>Set in Anton, Fraunces, and Space Mono on a cream linen-finished stock. Inks: fluorescent pink, cornflower blue, warm black, hand-pulled in your browser.</em></p>
           <p>If you found the call sign — WGWJ — and tuned this far, you found the back of the book. Replies will be slow and long.</p>
           <p class="specs">stock · linen finished cream<br/>colors · pink · cyan · warm black<br/>folio · 037 · pulled in browser</p>`},
];

// ─────────────────────────────────────────────────────────
// state
// ─────────────────────────────────────────────────────────
let f = 95.0;     // current frequency
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const dialEl    = document.getElementById('dial');
const scaleEl   = dialEl.querySelector('.dial__scale');
const needleEl  = document.getElementById('needle');
const readout   = document.getElementById('readout');
const meterFill = document.getElementById('meterFill');
const lockLabel = document.getElementById('lockLabel');
const card      = document.getElementById('card');
const cardHead  = document.getElementById('cardHead');
const cardSub   = document.getElementById('cardSub');
const cardBody  = document.getElementById('cardBody');
const cardFolio = document.getElementById('cardFolio');

// ─────────────────────────────────────────────────────────
// build dial numbers (every 2 MHz)
// ─────────────────────────────────────────────────────────
const numsEl = document.getElementById('dialNums');
for (let n = F_MIN; n <= F_MAX; n += 2) {
  const li = document.createElement('li');
  li.textContent = n.toFixed(1);
  numsEl.appendChild(li);
}

// build station markers
const markersEl = document.getElementById('dialMarkers');
STATIONS.forEach(s => {
  const m = document.createElement('span');
  m.className = 'dial__marker';
  m.dataset.name = s.name.toUpperCase();
  m.style.left = `${(s.f - F_MIN) / (F_MAX - F_MIN) * 100}%`;
  markersEl.appendChild(m);
});

// presets
const presetsEl = document.getElementById('presets');
STATIONS.forEach(s => {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.dataset.f = String(s.f);
  btn.textContent = `${s.f.toFixed(1)} · ${s.name}`;
  btn.addEventListener('click', () => tuneTo(s.f));
  li.appendChild(btn);
  presetsEl.appendChild(li);
});

// ─────────────────────────────────────────────────────────
// rendering
// ─────────────────────────────────────────────────────────
function render() {
  const p = (f - F_MIN) / (F_MAX - F_MIN);
  const left = `calc(1% + ${p * 98}%)`;
  needleEl.style.left = left;
  readout.textContent = `${f.toFixed(1)} MHz`;

  // find nearest station + lock
  let nearest = STATIONS[0];
  let bestD = Infinity;
  for (const s of STATIONS) {
    const d = Math.abs(s.f - f);
    if (d < bestD) { bestD = d; nearest = s; }
  }
  const locked = bestD <= LOCK;
  const strength = Math.max(0, 1 - bestD / 1.0);     // soft falloff up to ±1 MHz
  meterFill.style.width = `${(strength * 100).toFixed(0)}%`;
  lockLabel.textContent = locked
    ? `LOCKED · ${nearest.name.toUpperCase()}`
    : `OFF CHANNEL · ${(bestD).toFixed(2)} MHz from ${nearest.name.toUpperCase()}`;
  lockLabel.classList.toggle('is-locked', locked);

  // active preset
  document.querySelectorAll('.presets button').forEach(b => {
    b.classList.toggle('is-active', locked && parseFloat(b.dataset.f) === nearest.f);
  });

  // card content
  if (locked) {
    cardFolio.textContent = `WGWJ · ${nearest.f.toFixed(1)} MHz · folio ${nearest.folio}`;
    cardHead.textContent  = nearest.name.toUpperCase();
    cardSub.textContent   = nearest.sub;
    cardBody.innerHTML    = nearest.body;
    card.classList.remove('is-static');
  } else {
    cardFolio.textContent = `WGWJ · ${f.toFixed(1)} MHz · between channels`;
    cardHead.textContent  = '— TUNING —';
    cardSub.textContent   = `nearest: ${nearest.name} at ${nearest.f.toFixed(1)} (${bestD.toFixed(2)} away)`;
    cardBody.innerHTML    = `<p>Off channel. Drag the needle, or scroll on the dial.</p><p>Lock-in is ±0.3 of any station.</p>`;
    card.classList.add('is-static');
  }
}

// ─────────────────────────────────────────────────────────
// tune (with optional ease)
// ─────────────────────────────────────────────────────────
let easeRAF = null;
function tuneTo(target, ease = !reduceMotion) {
  target = Math.max(F_MIN, Math.min(F_MAX, target));
  if (!ease) { f = target; render(); return; }
  cancelAnimationFrame(easeRAF);
  function step() {
    const d = target - f;
    if (Math.abs(d) < 0.005) { f = target; render(); return; }
    f += d * 0.18;
    render();
    easeRAF = requestAnimationFrame(step);
  }
  easeRAF = requestAnimationFrame(step);
}

function freqFromX(clientX) {
  const r = scaleEl.getBoundingClientRect();
  const x = clientX - r.left;
  const p = Math.max(0, Math.min(1, (x - r.width * 0.01) / (r.width * 0.98)));
  return F_MIN + p * (F_MAX - F_MIN);
}

// drag the dial
let dragging = false;
scaleEl.addEventListener('pointerdown', e => {
  dragging = true;
  scaleEl.classList.add('is-dragging');
  scaleEl.setPointerCapture(e.pointerId);
  cancelAnimationFrame(easeRAF);
  f = freqFromX(e.clientX);
  render();
  e.preventDefault();
});
scaleEl.addEventListener('pointermove', e => {
  if (!dragging) return;
  f = freqFromX(e.clientX);
  render();
});
scaleEl.addEventListener('pointerup', e => {
  dragging = false;
  scaleEl.classList.remove('is-dragging');
  try { scaleEl.releasePointerCapture(e.pointerId); } catch (_) {}
});

// scroll over the dial
dialEl.addEventListener('wheel', e => {
  e.preventDefault();
  cancelAnimationFrame(easeRAF);
  f = Math.max(F_MIN, Math.min(F_MAX, f + (e.deltaY > 0 ? -0.05 : 0.05) * Math.max(1, Math.abs(e.deltaY) / 30)));
  render();
}, { passive: false });

// arrow keys
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    e.preventDefault(); cancelAnimationFrame(easeRAF);
    f = Math.max(F_MIN, f - (e.shiftKey ? 1.0 : 0.1));
    render();
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    e.preventDefault(); cancelAnimationFrame(easeRAF);
    f = Math.min(F_MAX, f + (e.shiftKey ? 1.0 : 0.1));
    render();
  }
});

// initial: tune to slowcompiler so the visitor lands locked
tuneTo(STATIONS[1].f, false);
