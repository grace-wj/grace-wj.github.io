// tideline — a year of making, drawn as a tide chart.
// from passage: vertical scroll → horizontal pan via a sticky camera and `--cam-x`
// from atelier: pigments named for the colorman's register; one per month
// from archive: paper grain, the chart-as-2D-plane, the moored-pin metaphor
// from signal: continuous-parameter readout (the date as a float of the year), needle marker

// ───────────────────────────────────────────────────────────
// pigment names per month
// ───────────────────────────────────────────────────────────
const PIGMENTS = [
  { month: 'january',   name: 'lead white',       color: '#ecdcb4' },
  { month: 'february',  name: 'naples yellow',    color: '#d4a637' },
  { month: 'march',     name: 'terre verte (light)', color: '#7a8a4a' },
  { month: 'april',     name: 'terre verte',      color: '#3d5a3a' },
  { month: 'may',       name: 'alizarin crimson', color: '#7c2c4a' },
  { month: 'june',      name: 'cadmium red',      color: '#d9292a' },
  { month: 'july',      name: 'raw sienna',       color: '#c0934a' },
  { month: 'august',    name: 'burnt sienna',     color: '#6b3a14' },
  { month: 'september', name: 'indian red',       color: '#a44a3a' },
  { month: 'october',   name: 'venetian red',     color: '#9a3a2a' },
  { month: 'november',  name: 'manganese blue',   color: '#3d6b8a' },
  { month: 'december',  name: 'french ultramarine', color: '#1f3b6e' },
];

// ───────────────────────────────────────────────────────────
// the works moored on the tide curve — date_as_x and depth
// SVG width 3000, so x = month_index * 250 + day_offset
// y range: 0 (top of chart) — 600 (deep). The depth band is roughly 80–600.
// ───────────────────────────────────────────────────────────
const WORKS = {
  hum: {
    name: 'hum',
    kind: 'a synthesizer',
    when: 'february · surface',
    body:
      `<p>A pocket synthesizer for people who cannot read music. You hum into it; it gives you back a small song it thinks you meant.</p>
       <p>Touched daily — moored at the surface, even on the days the tide goes out. The work this object asks for is small and constant. A few minutes; a small fix; one new patch.</p>
       <p class="anchor-line">moored at week vi · surface · pigment · naples yellow</p>`,
  },
  slowcompiler: {
    name: 'slowcompiler',
    kind: 'a compiler',
    when: 'april · mid-deep',
    body:
      `<p>A compiler that takes exactly thirty seconds to compile <em>hello world</em>, and prints a haiku at each pass of the pipeline.</p>
       <p>The week this was rewritten was a deep one — three days of red threads on the loom. Lex, parse, type, lower, emit. The haiku for <em>parse</em> begins: <em>at last, the small tree / drops its leaves into a list / and a list, and a list.</em></p>
       <p class="anchor-line">moored at week xv · mid-deep · pigment · terre verte</p>`,
  },
  weft: {
    name: 'weft',
    kind: 'a loom',
    when: 'late may · mid',
    body:
      `<p>A physical jacquard loom, a Raspberry Pi, and a git hook. One thread per commit; one scarf per orbital year.</p>
       <p>Mid-water work, every week — slower than <em>hum</em>, faster than the deep work. The scarf is part record, part cloth.</p>
       <p class="anchor-line">moored at week xxi · mid · pigment · alizarin crimson</p>`,
  },
  'on-stillness': {
    name: 'on stillness',
    kind: 'an essay',
    when: 'july · deep',
    body:
      `<p>An essay on the question of when a thing is finished. The argument is that finished is the wrong unit.</p>
       <p>Reads like a long letter; has been written for two years and may continue to be written for two more. The deepest mooring on the chart for that reason.</p>
       <p class="anchor-line">moored at week xxv · deep · pigment · raw sienna</p>`,
  },
  'three-bodies': {
    name: 'three bodies, orbiting',
    kind: 'paintings',
    when: 'september · mid-deep',
    body:
      `<p>A small series of oil paintings: three figures in a low-lit kitchen, the kettle a warm pool of light. Eight panels, each fifteen inches square.</p>
       <p>Painted on long autumn afternoons. The light went from warm to cold and the painting followed it.</p>
       <p class="anchor-line">moored at week xxxiii · mid-deep · pigment · indian red</p>`,
  },
  letters: {
    name: 'letters',
    kind: 'correspondence',
    when: 'november · shallow',
    body:
      `<p>Slow correspondence. Replies will be slow and, when they come, longer than they should be.</p>
       <p>Comes in at the shallows in November like the first weather of the year. Letter is the right unit of attention.</p>
       <p class="anchor-line">moored at week xliv · shallow · pigment · manganese blue</p>`,
  },
};

// ───────────────────────────────────────────────────────────
// scroll → camera pan (passage convention)
// ───────────────────────────────────────────────────────────
const track  = document.getElementById('track');
const camera = track.querySelector('.camera');
const chart  = document.getElementById('chart');
const needle = document.getElementById('needle');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SCENE_WIDTH = 3000;

function viewportW() { return window.innerWidth || document.documentElement.clientWidth; }

function panBudget() {
  return Math.max(1, SCENE_WIDTH - viewportW());
}

let camX = 0;
function setCam(x) {
  camX = x;
  chart.style.setProperty('--cam-x', `${x}px`);
  updateHud();
}

function onScroll() {
  // progress 0..1 across the track's vertical scroll
  const r = track.getBoundingClientRect();
  const total = r.height - window.innerHeight; // total pannable distance
  const scrolled = -r.top;
  const p = Math.max(0, Math.min(1, scrolled / total));
  setCam(-p * panBudget());
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);

// ───────────────────────────────────────────────────────────
// today's needle position — by week-of-year (signal: continuous parameter)
// ───────────────────────────────────────────────────────────
function placeNeedle() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((now - start) / 86400000);
  const x = (dayOfYear / 365) * SCENE_WIDTH;
  needle.setAttribute('transform', `translate(${x.toFixed(1)}, 0)`);
  needle.dataset.x = x.toFixed(1);
}
placeNeedle();

// ───────────────────────────────────────────────────────────
// HUD — month + pigment + week of year, computed from camera position
// ───────────────────────────────────────────────────────────
const hudMonth   = document.getElementById('hudMonth');
const hudPigment = document.getElementById('hudPigment');
const hudChip    = document.getElementById('hudChip');
const hudWeek    = document.getElementById('hudWeek');

// nearest moored work to the camera centre — used to read out depth
const workAnchors = Object.entries(WORKS).map(([id, w]) => {
  const dot = document.querySelector(`g.work[data-work="${id}"] .dot`);
  return { id, w, x: parseFloat(dot.getAttribute('cx')), y: parseFloat(dot.getAttribute('cy')) };
});

function depthLabel(y) {
  if (y < 200) return 'surface';
  if (y < 340) return 'shallow';
  if (y < 480) return 'mid';
  return 'deep';
}

function updateHud() {
  const cx = -camX + viewportW() / 2;          // scene-space x at camera centre
  const monthIdx = Math.floor(Math.max(0, Math.min(11, (cx / SCENE_WIDTH) * 12)));
  const pig = PIGMENTS[monthIdx];
  hudMonth.textContent = pig.month;
  hudPigment.textContent = pig.name;
  hudChip.style.background = pig.color;

  const week = Math.floor((cx / SCENE_WIDTH) * 52) + 1;
  // nearest moored work tells us the depth at this point (or fall back to chart curve)
  const nearest = workAnchors.reduce((best, a) =>
    Math.abs(a.x - cx) < Math.abs(best.x - cx) ? a : best, workAnchors[0]);
  const depth = depthLabel(nearest.y);
  hudWeek.textContent = `week ${roman(week)} · ${depth}`;
}

function roman(n) {
  if (n < 1) n = 1;
  const map = [
    ['l', 50], ['xl', 40], ['x', 10], ['ix', 9],
    ['v', 5], ['iv', 4], ['i', 1],
  ];
  let out = '';
  for (const [r, v] of map) {
    while (n >= v) { out += r; n -= v; }
  }
  return out;
}

// ───────────────────────────────────────────────────────────
// drawer — opens when a moored work is clicked
// ───────────────────────────────────────────────────────────
const drawer = document.getElementById('drawer');
const drawerContent = document.getElementById('drawerContent');
function openDrawer(id) {
  const w = WORKS[id];
  if (!w) return;
  drawerContent.innerHTML = `
    <h2>${w.name}</h2>
    <p class="meta">${w.kind} · ${w.when}</p>
    ${w.body}
  `;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
}
document.getElementById('drawerClose').addEventListener('click', () => {
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
});
document.querySelectorAll('g.work').forEach(g => {
  g.addEventListener('click', () => openDrawer(g.dataset.work));
  g.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDrawer(g.dataset.work);
    }
  });
});

// ───────────────────────────────────────────────────────────
// kick off
// ───────────────────────────────────────────────────────────
onScroll();

// scroll-snap to today on first load — the visitor begins at *now*
function easeScrollToToday() {
  if (reduceMotion) return;
  const x = parseFloat(needle.dataset.x);
  const targetCam = Math.max(0, Math.min(panBudget(), x - viewportW() / 2));
  const p = targetCam / panBudget();
  // map p back to scroll position
  const r = track.getBoundingClientRect();
  const total = r.height - window.innerHeight;
  const scrollY = total * p + (window.scrollY + r.top);
  // smooth-scroll
  window.scrollTo({ top: scrollY, behavior: 'smooth' });
}
// after a beat, ease the visitor to today
setTimeout(easeScrollToToday, 1200);
