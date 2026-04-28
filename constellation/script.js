/* ——————————————————————————— data ——————————————————————————— */
const NODES = [
  /* projects */
  { id: 'hum',           label: 'hum',                 kind: 'project',  cluster: 'p', big: true,
    body: ['A pocket synthesizer for people who can\'t read music. You hum into the microphone; <em>hum</em> writes down what it thinks you meant and plays it back, voiced for two oscillators and a reverb the size of a kitchen.',
           'Rust + WebAudio, ~4,200 lines. In quiet beta — about 120 weekly users, most of whom can\'t read music.'],
    dim: 'rust + webaudio · ~120 weekly users' },
  { id: 'slowcompiler',  label: 'slowcompiler',        kind: 'project',  cluster: 'p', big: true,
    body: ['A compiler that takes thirty seconds to compile <em>hello world</em> and prints a haiku at each stage. It compiles a small functional language that resembles ML, if ML had been written by someone who had just finished reading Bashō.',
           '~3,800 lines of Rust. Currently at the type checker, which I am calling <em>patience</em>. I am interested in tools that make you wait on purpose.'],
    dim: 'rust · in slow progress' },
  { id: 'weft',          label: 'weft',                kind: 'project',  cluster: 'p', big: true,
    body: ['A small jacquard loom built from a kit, a Raspberry Pi, and a git hook. Each commit becomes a thread; each project a band of color. It finishes one scarf per orbital year.',
           'Last year\'s scarf is mostly grey, with three days of red — that was the week I rewrote slowcompiler\'s parser. I wear it in November.'],
    dim: 'kit + pi + git · one scarf / year' },

  /* essays */
  { id: 'stillness',     label: 'on stillness',        kind: 'essay',    cluster: 'e',
    body: ['A short defense of the pause, written under a bridge in Maine. Begins: <em>nothing happens, and nothing is the medium</em>. About 3,200 words. Self-published 2023.'] },
  { id: 'kitsch',        label: 'theory of kitsch',    kind: 'essay',    cluster: 'e',
    body: ['Notes toward a defense of bad taste. About what we owe to the people who love ceramic geese, and what they owe back to us. About 5,400 words; in revision since November.'] },
  { id: 'frameworks',    label: 'a year without frameworks', kind: 'essay', cluster: 'e',
    body: ['A year of writing the boring HTML on purpose. Ends with a recipe for stew. About 4,000 words. Self-published 2024.'] },

  /* paintings */
  { id: 'three-bodies',  label: 'three bodies, orbiting', kind: 'painting', cluster: 'a', big: true,
    body: ['A series of small oils begun winter 2022 — three figures in domestic interiors, each lit by a single warm source. Eight panels, all on linen, all 12×16.',
           'Shown briefly in a borrowed window on Bergen Street; now in private collections, by which I mean my friends\' living rooms. A fourth painting in the series is in progress, very slowly.'],
    dim: 'oil on linen · 2022 — present' },
  { id: 'annie',         label: 'annie at the kitchen sink', kind: 'painting', cluster: 'a',
    body: ['Panel i of <em>three bodies, orbiting</em>. 12×16 oil on linen. Sold to a friend who hung it above her stove, where the steam will eventually craze the varnish. I was OK with that.'] },
  { id: 'jia',           label: 'jia, in november',   kind: 'painting',  cluster: 'a',
    body: ['Panel iii of <em>three bodies, orbiting</em>. 12×16 oil on linen, in progress. The third figure is the hardest because the light source has shifted twice while painting her.'] },

  /* practices */
  { id: 'oils',          label: 'oil painting',         kind: 'practice', cluster: 'pr',
    body: ['Began at fourteen, paused at twenty, resumed at twenty-seven. Almost always indoors, almost always at night. The paint is Sennelier when I can find it, Williamsburg when I can\'t.'] },
  { id: 'weaving',       label: 'weaving',              kind: 'practice', cluster: 'pr',
    body: ['Apprentice-level, learned from a Saturday class at the Textile Arts Center. The loom in my apartment is a card-jacquard kit that I have, twice now, fully disassembled to fix.'] },
  { id: 'compiling',     label: 'compiler writing',     kind: 'practice', cluster: 'pr',
    body: ['Two compilers in earnest, three abandoned. The trade I\'m most fluent in. I prefer the parts of the pipeline that look most like editing a poem — name resolution and type checking.'] },
  { id: 'webaudio',      label: 'web audio',            kind: 'practice', cluster: 'pr',
    body: ['I came to it through hum and stayed for the way the API forces you to think about time. Most of the synth voices I like began as one-line node graphs.'] },
  { id: 'prose',         label: 'prose',                kind: 'practice', cluster: 'pr',
    body: ['Three essays, several abandoned drafts, a hundred letters. I write the way I weave — slowly, undoing as much as I make, never quite confident the seam will hold.'] },

  /* influences */
  { id: 'basho',         label: 'bashō',                kind: 'influence', cluster: 'i',
    body: ['The reason slowcompiler prints a haiku at every stage. The exemplary case of "less, but loaded." I keep the Hass translation by the desk; the Hamill in the bathroom.'] },
  { id: 'ml',            label: 'the ML family',        kind: 'influence', cluster: 'i',
    body: ['Standard ML, OCaml, F# — the small, gentle, well-typed languages. slowcompiler\'s grammar is close to a stripped-down ML.'] },
  { id: 'geese',         label: 'ceramic geese',        kind: 'influence', cluster: 'i',
    body: ['The figure my mother kept on the shelf above the sink. The patron saint of <em>theory of kitsch</em>.'] },
  { id: 'jacquard',      label: 'jacquard cards',       kind: 'influence', cluster: 'i',
    body: ['The first computer was a loom. weft is, in a literal sense, programmed by git instead of by punched cards. The cards are still around — at the Cooper Hewitt, last I checked.'] },
  { id: 'maine',         label: 'maine, summer',        kind: 'influence', cluster: 'i',
    body: ['Where <em>on stillness</em> was written, on a folding chair under a bridge in Hancock County. The bridge is unremarkable; the silence under it isn\'t.'] },
  { id: 'bergen',        label: 'bergen st.',           kind: 'influence', cluster: 'i',
    body: ['A storefront on Bergen Street in Brooklyn, lent for two weekends in March 2024 by a friend who was traveling. Three bodies, orbiting was hung there with binder clips.'] },
  { id: 'november',      label: 'november',             kind: 'influence', cluster: 'i',
    body: ['The month the loom finishes its scarf. The month most of the paintings get done. The light is at its most generous and the days are at their shortest, which is the right deal.'] },
];

const EDGES = [
  { s: 'slowcompiler', t: 'basho',       l: 'after' },
  { s: 'slowcompiler', t: 'ml',          l: 'after' },
  { s: 'slowcompiler', t: 'compiling',   l: 'is' },
  { s: 'slowcompiler', t: 'stillness',   l: 'on patience' },
  { s: 'hum',          t: 'webaudio',    l: 'in' },
  { s: 'hum',          t: 'prose',       l: 'voiced by' },
  { s: 'weft',         t: 'jacquard',    l: 'after' },
  { s: 'weft',         t: 'weaving',     l: 'is' },
  { s: 'weft',         t: 'november',    l: 'worn in' },
  { s: 'weft',         t: 'compiling',   l: 'driven by git' },
  { s: 'stillness',    t: 'maine',       l: 'written in' },
  { s: 'stillness',    t: 'prose',       l: 'is' },
  { s: 'kitsch',       t: 'geese',       l: 'defends' },
  { s: 'kitsch',       t: 'prose',       l: 'is' },
  { s: 'frameworks',   t: 'prose',       l: 'is' },
  { s: 'three-bodies', t: 'oils',        l: 'is' },
  { s: 'three-bodies', t: 'bergen',      l: 'shown at' },
  { s: 'three-bodies', t: 'annie',       l: 'panel i' },
  { s: 'three-bodies', t: 'jia',         l: 'panel iii' },
  { s: 'annie',        t: 'oils',        l: 'is' },
  { s: 'jia',          t: 'oils',        l: 'is' },
  { s: 'jia',          t: 'november',    l: 'in' },
  { s: 'frameworks',   t: 'webaudio',    l: 'against' },
];

const KIND_COLORS = {
  project:   '#ffd07a',
  essay:     '#f7a8c0',
  painting:  '#c8b8ff',
  practice:  '#a4ecd6',
  influence: '#7fb6ff',
};

/* ——————————————————————————— layout ——————————————————————————— */
const sky = document.getElementById('sky');
const SVG_NS = 'http://www.w3.org/2000/svg';

let W = innerWidth;
let H = innerHeight;
sky.setAttribute('viewBox', `0 0 ${W} ${H}`);

/* cluster centers — set per resize so the layout responds to the viewport shape */
function clusterCenters() {
  return {
    p:  { x: W * 0.50, y: H * 0.50 }, /* projects in the center */
    e:  { x: W * 0.22, y: H * 0.30 }, /* essays upper-left */
    a:  { x: W * 0.78, y: H * 0.30 }, /* paintings upper-right */
    pr: { x: W * 0.50, y: H * 0.82 }, /* practices below */
    i:  { x: W * 0.50, y: H * 0.18 }, /* influences above */
  };
}

let centers = clusterCenters();

/* initialize node positions: cluster center + jitter */
NODES.forEach((n) => {
  const c = centers[n.cluster];
  const a = Math.random() * Math.PI * 2;
  const r = 30 + Math.random() * 130;
  n.x = c.x + Math.cos(a) * r;
  n.y = c.y + Math.sin(a) * r;
  n.vx = 0;
  n.vy = 0;
  n.r = n.big ? 6 : 4;
});

const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

/* ——————————————————————————— svg build ——————————————————————————— */
const edgesLayer = document.createElementNS(SVG_NS, 'g');
const labelsLayer = document.createElementNS(SVG_NS, 'g');
const nodesLayer = document.createElementNS(SVG_NS, 'g');
sky.append(edgesLayer, labelsLayer, nodesLayer);

const edgeEls = EDGES.map((e) => {
  const line = document.createElementNS(SVG_NS, 'line');
  line.classList.add('edge');
  line.dataset.from = e.s;
  line.dataset.to = e.t;
  edgesLayer.append(line);
  const label = document.createElementNS(SVG_NS, 'text');
  label.classList.add('edge-label');
  label.textContent = e.l;
  edgesLayer.append(label);
  return { e, line, label };
});

const nodeEls = NODES.map((n) => {
  const g = document.createElementNS(SVG_NS, 'g');
  g.classList.add('node-group');
  g.dataset.id = n.id;

  const halo = document.createElementNS(SVG_NS, 'circle');
  halo.classList.add('halo');
  halo.setAttribute('r', n.r + 6);
  halo.setAttribute('stroke', KIND_COLORS[n.kind]);
  g.append(halo);

  const c = document.createElementNS(SVG_NS, 'circle');
  c.classList.add('node');
  c.setAttribute('r', n.r);
  c.setAttribute('fill', KIND_COLORS[n.kind]);
  g.append(c);

  const t = document.createElementNS(SVG_NS, 'text');
  t.classList.add('node-label');
  if (n.kind === 'influence' || n.kind === 'practice') t.classList.add('node-label--alt');
  if (n.big) t.classList.add('node-label--big');
  t.textContent = n.label;
  t.setAttribute('x', n.r + 8);
  t.setAttribute('y', 0.5);
  g.append(t);

  nodesLayer.append(g);
  return { n, g, halo, c, t };
});

/* ——————————————————————————— force simulation ——————————————————————————— */
const REPULSION = 1800;
const SPRING = 0.0015;
const REST = 110;
const CENTER_PULL = 0.0008;
const DAMPING = 0.78;
let drift = 0.05;
let dragging = null;

function step() {
  /* repulsion (n²) — n=23, fine */
  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      const a = NODES[i], b = NODES[j];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d2 = dx * dx + dy * dy + 0.01;
      const d = Math.sqrt(d2);
      const f = REPULSION / d2;
      const fx = (f * dx) / d, fy = (f * dy) / d;
      a.vx -= fx; a.vy -= fy;
      b.vx += fx; b.vy += fy;
    }
  }
  /* edge springs */
  EDGES.forEach((e) => {
    const a = nodeMap[e.s], b = nodeMap[e.t];
    const dx = b.x - a.x, dy = b.y - a.y;
    const d = Math.hypot(dx, dy) + 0.01;
    const f = (d - REST) * SPRING;
    const fx = (f * dx) / d, fy = (f * dy) / d;
    a.vx += fx; a.vy += fy;
    b.vx -= fx; b.vy -= fy;
  });
  /* pull toward cluster center */
  NODES.forEach((n) => {
    const c = centers[n.cluster];
    n.vx += (c.x - n.x) * CENTER_PULL;
    n.vy += (c.y - n.y) * CENTER_PULL;
    /* tiny brownian drift, so things never freeze */
    n.vx += (Math.random() - 0.5) * drift;
    n.vy += (Math.random() - 0.5) * drift;
  });
  /* integrate */
  NODES.forEach((n) => {
    if (n === dragging) return;
    n.vx *= DAMPING;
    n.vy *= DAMPING;
    n.x += n.vx;
    n.y += n.vy;
    /* edge bounce */
    const M = 60;
    if (n.x < M)        { n.x = M; n.vx = Math.abs(n.vx) * 0.5; }
    if (n.x > W - M)    { n.x = W - M; n.vx = -Math.abs(n.vx) * 0.5; }
    if (n.y < M + 40)   { n.y = M + 40; n.vy = Math.abs(n.vy) * 0.5; }
    if (n.y > H - M)    { n.y = H - M; n.vy = -Math.abs(n.vy) * 0.5; }
  });
}

/* ——————————————————————————— render ——————————————————————————— */
function render() {
  edgeEls.forEach(({ e, line, label }) => {
    const a = nodeMap[e.s], b = nodeMap[e.t];
    line.setAttribute('x1', a.x);
    line.setAttribute('y1', a.y);
    line.setAttribute('x2', b.x);
    line.setAttribute('y2', b.y);
    label.setAttribute('x', (a.x + b.x) / 2 + 6);
    label.setAttribute('y', (a.y + b.y) / 2 - 4);
  });
  nodeEls.forEach(({ n, g }) => {
    g.setAttribute('transform', `translate(${n.x}, ${n.y})`);
  });
}

/* settle: run a bunch of steps without rendering, so it loads "settled" */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
for (let i = 0; i < 220; i++) step();
render();
if (reduceMotion) drift = 0;

/* ——————————————————————————— interaction ——————————————————————————— */
let dragOffset = { x: 0, y: 0 };
let downAt = null;

function svgPoint(e) {
  const r = sky.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}

function pickNode(pt) {
  for (let i = NODES.length - 1; i >= 0; i--) {
    const n = NODES[i];
    const dx = pt.x - n.x, dy = pt.y - n.y;
    if (dx * dx + dy * dy < (n.r + 14) * (n.r + 14)) return n;
  }
  return null;
}

sky.addEventListener('pointermove', (e) => {
  const pt = svgPoint(e);
  if (dragging) {
    dragging.x = pt.x - dragOffset.x;
    dragging.y = pt.y - dragOffset.y;
    dragging.vx = 0;
    dragging.vy = 0;
    return;
  }
  const hit = pickNode(pt);
  sky.classList.toggle('is-pointer', !!hit);
  /* highlight edges connected to hovered node */
  edgeEls.forEach(({ e, line, label }) => {
    const hot = hit && (e.s === hit.id || e.t === hit.id);
    line.classList.toggle('is-hot', hot);
    label.classList.toggle('is-hot', hot);
  });
});

sky.addEventListener('pointerdown', (e) => {
  const pt = svgPoint(e);
  const hit = pickNode(pt);
  downAt = { x: e.clientX, y: e.clientY };
  if (hit) {
    dragging = hit;
    dragOffset = { x: pt.x - hit.x, y: pt.y - hit.y };
    sky.classList.add('is-grabbing');
    sky.setPointerCapture(e.pointerId);
  }
});

sky.addEventListener('pointerup', (e) => {
  const wasDrag = downAt && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 5;
  const pt = svgPoint(e);
  const hit = pickNode(pt);
  dragging = null;
  sky.classList.remove('is-grabbing');
  if (hit && !wasDrag) openPanel(hit);
  downAt = null;
});

/* ——————————————————————————— panel ——————————————————————————— */
const panel = document.getElementById('panel');
const panelInner = document.getElementById('panelInner');
const panelClose = document.getElementById('panelClose');

function openPanel(n) {
  panelInner.innerHTML = `
    <span class="badge badge--${n.kind}">${n.kind}</span>
    <h2>${n.label}</h2>
    ${n.body.map((p) => `<p>${p}</p>`).join('')}
    ${n.dim ? `<p class="dim">${n.dim}</p>` : ''}
    ${renderConnections(n)}
  `;
  panel.setAttribute('aria-hidden', 'false');
}

function renderConnections(n) {
  const cs = EDGES.filter((e) => e.s === n.id || e.t === n.id);
  if (!cs.length) return '';
  const items = cs
    .map((e) => {
      const otherId = e.s === n.id ? e.t : e.s;
      const other = nodeMap[otherId];
      const direction = e.s === n.id ? '→' : '←';
      return `<li><em>${e.l}</em> ${direction} <strong>${other.label}</strong></li>`;
    })
    .join('');
  return `<div class="links"><h3>connected</h3><ul>${items}</ul></div>`;
}

panelClose.addEventListener('click', () => panel.setAttribute('aria-hidden', 'true'));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') panel.setAttribute('aria-hidden', 'true');
});

/* ——————————————————————————— loop ——————————————————————————— */
function frame() {
  step();
  render();
  requestAnimationFrame(frame);
}
if (!reduceMotion) {
  frame();
}

/* ——————————————————————————— resize ——————————————————————————— */
addEventListener('resize', () => {
  W = innerWidth; H = innerHeight;
  sky.setAttribute('viewBox', `0 0 ${W} ${H}`);
  centers = clusterCenters();
});
