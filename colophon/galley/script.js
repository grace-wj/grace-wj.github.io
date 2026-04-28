// galley — a riso zine that prints itself in front of you.
// from press: riso palette, halftone CMYK overprint via mix-blend-mode multiply, vertical edge marquee
// from draft: time-based composition; reload begins again; "skip to printed"; reduced-motion respects
// from emblem: each visit is one pull; the URL seed (?n=…) determines misregistration angle and pull order

// ────────────────────────────────────────────────────────────
// PRNG (mulberry32) — same as emblem
// ────────────────────────────────────────────────────────────
function prng(seed) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6D2B79F5) >>> 0;
    let r = t;
    r = Math.imul(r ^ (r >>> 15), r | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// ────────────────────────────────────────────────────────────
// seed — from URL or random
// ────────────────────────────────────────────────────────────
const url = new URL(location.href);
let seed = parseInt(url.searchParams.get('n') ?? '', 10);
if (!Number.isFinite(seed)) seed = Math.floor(Math.random() * 9999) + 1;
const fast = url.searchParams.get('fast') !== null;
const rand = prng(seed);
document.getElementById('hudSeed').textContent = `n=${seed}`;

// pulled-at timestamp (the press records when each proof came off)
const pad = n => String(n).padStart(2, '0');
const now = new Date();
document.getElementById('pulledAt').textContent =
  `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
  `${pad(now.getHours())}:${pad(now.getMinutes())}`;

// ────────────────────────────────────────────────────────────
// per-seed variation — misregistration offsets, season, issue
// ────────────────────────────────────────────────────────────
const SEASONS = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
const PULL_VARIANTS = [
  // each variant changes the order and offsets of the three plates
  { order: ['cyan', 'pink', 'black'], cyan: 3, pink: [4, -2], black: 1 },
  { order: ['cyan', 'pink', 'black'], cyan: 5, pink: [-3, 1], black: 2 },
  { order: ['pink', 'cyan', 'black'], cyan: 2, pink: [3, 2], black: 0 },
  { order: ['cyan', 'black', 'pink'], cyan: 4, pink: [5, -3], black: 3 },
];
const variant = PULL_VARIANTS[Math.floor(rand() * PULL_VARIANTS.length)];
document.getElementById('issue').textContent = roman(7 + Math.floor(rand() * 12));
document.getElementById('season').textContent = SEASONS[(now.getMonth() / 3) | 0];
document.getElementById('year').textContent = romanYear(now.getFullYear());

function roman(n) {
  // small numbers — issue numbers stay under 30
  const map = [
    ['XXX', 30], ['XXIX', 29], ['XXVIII', 28], ['XXVII', 27], ['XXVI', 26],
    ['XXV', 25], ['XXIV', 24], ['XXIII', 23], ['XXII', 22], ['XXI', 21],
    ['XX', 20], ['XIX', 19], ['XVIII', 18], ['XVII', 17], ['XVI', 16],
    ['XV', 15], ['XIV', 14], ['XIII', 13], ['XII', 12], ['XI', 11],
    ['X', 10], ['IX', 9], ['VIII', 8], ['VII', 7], ['VI', 6],
    ['V', 5], ['IV', 4], ['III', 3], ['II', 2], ['I', 1],
  ];
  for (const [r, v] of map) if (n >= v) return r;
  return '';
}
function romanYear(y) {
  // MMXXVI = 2026
  return [
    ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
    ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
    ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1],
  ].reduce((acc, [r, v]) => {
    while (y >= v) { acc += r; y -= v; }
    return acc;
  }, '');
}

// ────────────────────────────────────────────────────────────
// apply misregistration offsets as CSS variables
// ────────────────────────────────────────────────────────────
const root = document.documentElement;
root.style.setProperty('--reg-cyan',   `${variant.cyan}px`);
root.style.setProperty('--reg-pink',   `${variant.pink[0]}px`);
root.style.setProperty('--reg-pink-y', `${variant.pink[1]}px`);
root.style.setProperty('--reg-black',  `${variant.black}px`);

// ────────────────────────────────────────────────────────────
// the press — choreograph the pulls
// ────────────────────────────────────────────────────────────
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || fast;

const plateNodes = {
  cyan:  document.getElementById('plateCyan'),
  pink:  document.getElementById('platePink'),
  black: document.getElementById('plateBlack'),
};
const hudPlates = Array.from(document.querySelectorAll('.plates li'));
const hudLine   = document.getElementById('hudLine');
const skipBtn   = document.getElementById('skip');
const againBtn  = document.getElementById('again');

const PHRASES = {
  cyan:  ['rolling cyan drum…', 'inking the disc…', 'laying down the floor…', 'cyan plate down.'],
  pink:  ['rolling fluo pink…', 'pulling masthead…', 'pulling pull-quote…', 'pink plate down.'],
  black: ['rolling warm black…', 'pulling body text…', 'pulling specs…', 'pulling colophon…', 'proof off the press.'],
};

function setHudPlate(name, state) {
  hudPlates.forEach(li => {
    const n = li.dataset.plate;
    if (n === name) li.className = state;       // is-running, is-done, ''
  });
}
function setHudLine(s) { hudLine.textContent = s; }

let cancelled = false;

function sleep(ms) {
  return new Promise((resolve) => {
    if (cancelled || reduceMotion) return resolve();
    setTimeout(resolve, ms);
  });
}

async function rollPlate(name, ms = 2200, phrases) {
  setHudPlate(name, 'is-running');
  // tap each phrase as the plate reveals
  const each = ms / phrases.length;
  // kick off the CSS reveal
  plateNodes[name].classList.add('is-laid');
  for (let i = 0; i < phrases.length; i++) {
    if (cancelled) break;
    setHudLine(phrases[i]);
    await sleep(each);
  }
  setHudPlate(name, 'is-done');
}

async function press() {
  setHudLine('staging plates…');
  await sleep(400);

  for (const name of variant.order) {
    if (cancelled) break;
    const phrases = PHRASES[name];
    const ms = name === 'black' ? 3200 : 2200;
    await rollPlate(name, ms, phrases);
    if (cancelled) break;
    await sleep(280);
  }

  setHudLine('pulled.');
  againBtn.hidden = false;
  skipBtn.hidden = true;
}

function snapToFinished() {
  cancelled = true;
  for (const name of Object.keys(plateNodes)) {
    plateNodes[name].classList.add('is-laid');
    setHudPlate(name, 'is-done');
  }
  setHudLine('pulled.');
  againBtn.hidden = false;
  skipBtn.hidden = true;
}

skipBtn.addEventListener('click', snapToFinished);
againBtn.addEventListener('click', () => {
  // bump seed in URL and reload — every pull is a new proof
  const next = (seed % 9999) + 1;
  url.searchParams.set('n', String(next));
  location.assign(url.pathname + '?' + url.searchParams.toString());
});

// ────────────────────────────────────────────────────────────
// kick off
// ────────────────────────────────────────────────────────────
if (reduceMotion) {
  snapToFinished();
} else {
  // small intro pause — the press warms up
  requestAnimationFrame(() => press());
}
