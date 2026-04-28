// warp — a year, woven. one weft row per week.
// from atelier: twelve named pigments — one per month — used as row colors
// from draft: time-based composition; row-by-row reveal at slow pace; reduced-motion shows finished cloth
// from marginalia: gloss-on-hover; the right-margin note is the IA, not a tooltip
// from press: the "red threads" — three days the parser was rewritten — a visual stripe pulled from press's
//             "real band of pink" idea, restated as cloth

// ────────────────────────────────────────────────────────────
// the 52-week schedule of making
// ────────────────────────────────────────────────────────────
// Each week: month (1–12), thickness (8–22 px), an optional note (work + caption).
// "thickness" is depth-of-work that week. Silent weeks have no note; the cloth still has color.
// Some weeks carry a special "red thread" stripe (parser rewrite, three days in april).
const WEEKS = [
  // ── january: lead white ──
  { m: 1,  t: 12, work: 'hum',          head: 'a synthesizer', body: 'patches and a small refactor. The first cold week of the year; quiet making.' },
  { m: 1,  t: 10 },
  { m: 1,  t: 14, work: 'on stillness', head: 'an essay',     body: 'The first paragraph rewritten. Started with <em>I am writing this in the third person</em>; struck through; restarted in first.' },
  { m: 1,  t: 11 },

  // ── february: naples yellow ──
  { m: 2,  t: 13 },
  { m: 2,  t: 16, work: 'hum',          head: 'a synthesizer', body: 'A new patch — one for piano hummers and one for whistlers. Shipped to the quiet beta.' },
  { m: 2,  t: 12 },
  { m: 2,  t: 10 },

  // ── march: terre verte (light) ──
  { m: 3,  t: 14, work: 'weft',         head: 'a loom',        body: 'A scarf finished. Three commits this week were docs; the cloth records them in green.' },
  { m: 3,  t: 12 },
  { m: 3,  t: 18, work: 'slowcompiler', head: 'a compiler',    body: 'The lex pass started. Haiku for lex: <em>nothing is a word / until something tells it so / each leaf, then each twig.</em>' },
  { m: 3,  t: 10 },

  // ── april: terre verte; the parser-rewrite week ──
  { m: 4,  t: 14 },
  { m: 4,  t: 22, red: true,            work: 'slowcompiler', head: 'a compiler · three red threads', body: 'The week the parser was rewritten. Three Tuesdays of red thread.' },
  { m: 4,  t: 16 },
  { m: 4,  t: 13, work: 'three bodies', head: 'paintings',     body: 'A small underpainting. The first of the autumn series, started early.' },

  // ── may: alizarin ──
  { m: 5,  t: 12 },
  { m: 5,  t: 14, work: 'weft',         head: 'a loom',        body: 'A scarf for a friend\'s wedding. The pattern is just commits, but the rhythm is intentional.' },
  { m: 5,  t: 10 },
  { m: 5,  t: 11 },

  // ── june: cad red ──
  { m: 6,  t: 13 },
  { m: 6,  t: 18, work: 'hum',          head: 'a synthesizer', body: 'The "shower mode" patch. People who hum in the shower were complaining the audio cut out at high steam.' },
  { m: 6,  t: 12 },
  { m: 6,  t: 11, work: 'on stillness', head: 'an essay',     body: 'A paragraph kept; a paragraph cut. <em>What I cross out is not gone — it is the shape this draft is not.</em>' },

  // ── july: raw sienna ──
  { m: 7,  t: 16 },
  { m: 7,  t: 22, work: 'on stillness', head: 'an essay',     body: 'Deep week. The longest sitting of the year. A full draft to the ending and a full draft back.' },
  { m: 7,  t: 12 },
  { m: 7,  t: 10 },

  // ── august: burnt sienna ──
  { m: 8,  t: 14 },
  { m: 8,  t: 12 },
  { m: 8,  t: 16, work: 'three bodies', head: 'paintings',     body: 'Panel iii laid in. The three figures around the kettle, the warm pool of light around them.' },
  { m: 8,  t: 11 },

  // ── september: indian red ──
  { m: 9,  t: 14, work: 'three bodies', head: 'paintings',     body: 'Panels iv and v. The light went from warm to cold and the painting followed it.' },
  { m: 9,  t: 12 },
  { m: 9,  t: 18, work: 'three bodies', head: 'paintings',     body: 'A Saturday opening in a borrowed window on Bergen Street. A few people came; nobody bought; that was fine.' },
  { m: 9,  t: 10 },

  // ── october: venetian red ──
  { m: 10, t: 13 },
  { m: 10, t: 12 },
  { m: 10, t: 14, work: 'slowcompiler', head: 'a compiler',    body: 'The emit pass started. Haiku for emit: <em>here is the small song / written down — in a language / no one will sing in.</em>' },
  { m: 10, t: 11 },

  // ── november: manganese blue ──
  { m: 11, t: 13, work: 'letters',      head: 'correspondence', body: 'Three letters answered. One opened with <em>I owe you a year of this, and so I will say less than I want to.</em>' },
  { m: 11, t: 12 },
  { m: 11, t: 11 },
  { m: 11, t: 14, work: 'letters',      head: 'correspondence', body: 'The first snow. A letter to a friend in Maine; another, shorter, to no one in particular, kept.' },

  // ── december: french ultramarine ──
  { m: 12, t: 13 },
  { m: 12, t: 11, work: 'weft',         head: 'a loom',        body: 'The annual scarf finished — fifty-two weft rows, three of them red. One thread per commit; one scarf per orbital year.' },
  { m: 12, t: 10 },
  { m: 12, t: 14 },
  { m: 12, t: 12 },
];

// pad to exactly 52
while (WEEKS.length < 52) WEEKS.push({ m: 12, t: 10 });
WEEKS.length = 52;

const PIGMENT_COLORS = {
  1:  '#ecdcb4',
  2:  '#d4a637',
  3:  '#7a8a4a',
  4:  '#3d5a3a',
  5:  '#7c2c4a',
  6:  '#d9292a',
  7:  '#c0934a',
  8:  '#6b3a14',
  9:  '#a44a3a',
  10: '#9a3a2a',
  11: '#3d6b8a',
  12: '#1f3b6e',
};
const PIGMENT_NAMES = {
  1:  'lead white',
  2:  'naples yellow',
  3:  'terre verte (light)',
  4:  'terre verte',
  5:  'alizarin crimson',
  6:  'cadmium red',
  7:  'raw sienna',
  8:  'burnt sienna',
  9:  'indian red',
  10: 'venetian red',
  11: 'manganese blue',
  12: 'french ultramarine',
};
const MONTH_NAMES = {
  1: 'jan', 2: 'feb', 3: 'mar', 4: 'apr', 5: 'may', 6: 'jun',
  7: 'jul', 8: 'aug', 9: 'sep', 10: 'oct', 11: 'nov', 12: 'dec',
};

// ────────────────────────────────────────────────────────────
// build the cloth
// ────────────────────────────────────────────────────────────
const cloth   = document.getElementById('cloth');
const margin  = document.getElementById('margin');
const def     = document.getElementById('marginDefault');
const status  = document.getElementById('weaveStatus');
const rowNum  = document.getElementById('rowNum');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const rowEls = [];
const glossEls = [];

WEEKS.forEach((wk, i) => {
  const el = document.createElement('div');
  el.className = 'weft' + (wk.red ? ' weft--red' : '');
  el.style.height = `${wk.t}px`;
  el.style.background = `${PIGMENT_COLORS[wk.m]}`;
  if (wk.red) {
    // ensure the red-thread stripe overlay sits on top of the base color
    el.style.background = `
      repeating-linear-gradient(90deg, transparent 0 2px, rgba(0,0,0,0.10) 2px 3px, transparent 3px 5px),
      linear-gradient(90deg,
        ${PIGMENT_COLORS[5]} 0%, ${PIGMENT_COLORS[5]} 8%,
        ${PIGMENT_COLORS[wk.m]} 8% 14%,
        ${PIGMENT_COLORS[5]} 14% 22%,
        ${PIGMENT_COLORS[wk.m]} 22% 32%,
        ${PIGMENT_COLORS[5]} 32% 38%,
        ${PIGMENT_COLORS[wk.m]} 38% 100%)
    `;
  }
  el.tabIndex = 0;
  el.dataset.week = String(i + 1);

  // week number on the left edge
  const wkn = document.createElement('span');
  wkn.className = 'weft__week';
  wkn.textContent = `${MONTH_NAMES[wk.m]} · wk ${i + 1}`;
  el.appendChild(wkn);

  cloth.appendChild(el);
  rowEls.push(el);

  // build a margin gloss for rows that have a note — we toggle them on hover
  if (wk.work) {
    const g = document.createElement('div');
    g.className = 'gloss';
    g.dataset.week = String(i + 1);
    g.innerHTML = `
      <p class="head">week ${roman(i + 1)} · ${MONTH_NAMES[wk.m]} · <span class="pigchip" style="background:${PIGMENT_COLORS[wk.m]}"></span>${PIGMENT_NAMES[wk.m]}</p>
      <p class="body"><span class="work">${wk.work}</span> — ${wk.head}.</p>
      <p class="body">${wk.body}</p>
    `;
    margin.appendChild(g);
    glossEls.push(g);
  }
});

function roman(n) {
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

// hover/focus → activate row & show gloss
function setActive(idx) {
  rowEls.forEach((el, i) => el.classList.toggle('is-active', i === idx));
  glossEls.forEach(g => g.classList.toggle('is-visible', g.dataset.week === String(idx + 1)));
  const hasGloss = glossEls.some(g => g.dataset.week === String(idx + 1));
  def.style.display = hasGloss ? 'none' : '';
}
function clearActive() {
  rowEls.forEach(el => el.classList.remove('is-active'));
  glossEls.forEach(g => g.classList.remove('is-visible'));
  def.style.display = '';
}
rowEls.forEach((el, i) => {
  el.addEventListener('mouseenter', () => setActive(i));
  el.addEventListener('focus', () => setActive(i));
});
cloth.addEventListener('mouseleave', clearActive);
cloth.addEventListener('focusout', e => {
  // only clear if focus left the cloth entirely
  if (!cloth.contains(e.relatedTarget)) clearActive();
});

// ────────────────────────────────────────────────────────────
// weave the cloth row by row (the time-based reveal)
// ────────────────────────────────────────────────────────────
async function weave() {
  if (reduceMotion) {
    rowEls.forEach(el => el.classList.add('is-laid'));
    rowNum.textContent = roman(52);
    status.classList.add('is-done');
    status.firstChild.textContent = 'woven · ';
    return;
  }
  for (let i = 0; i < rowEls.length; i++) {
    rowEls[i].classList.add('is-laid');
    rowNum.textContent = roman(i + 1);
    // ~70ms per row → ~3.6s total weave
    await sleep(70);
  }
  status.classList.add('is-done');
  // change "weaving" to "woven"
  const sc = status.querySelector('.sc');
  if (sc) sc.textContent = 'woven';
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// kick off
requestAnimationFrame(weave);
