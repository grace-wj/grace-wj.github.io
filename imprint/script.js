// imprint — a constellation of works under Wei-li Press, drawn riso-flat.
// from constellation: hand-rolled force sim (1/d² repulsion, spring edges, cluster-pull, brownian),
//                     drag a node + the rest follows, hover lights edges + verb labels, click → side panel
// from press/galley: riso palette, halftone, paper grain, marquee, registration crosses, Anton/Fraunces/Mono, misregistration ghosts

// ─────────────────────────────────────────────────────────
// data
// ─────────────────────────────────────────────────────────
const NODES = [
  { id: 'hum',        kind: 'project',   name: 'hum',        cluster: 0 },
  { id: 'slow',       kind: 'project',   name: 'slowcompiler', cluster: 0 },
  { id: 'weft',       kind: 'project',   name: 'weft',       cluster: 0 },
  { id: 'three',      kind: 'painting',  name: 'three bodies', cluster: 1 },
  { id: 'annie',      kind: 'painting',  name: 'annie at the kitchen sink', cluster: 1 },
  { id: 'jia',        kind: 'painting',  name: 'jia in november', cluster: 1 },
  { id: 'stillness',  kind: 'essay',     name: 'on stillness',     cluster: 2 },
  { id: 'kitsch',     kind: 'essay',     name: 'theory of kitsch', cluster: 2 },
  { id: 'frameworks', kind: 'essay',     name: 'a year without frameworks', cluster: 2 },
  { id: 'basho',      kind: 'influence', name: 'bashō',           cluster: 3 },
  { id: 'mlfam',      kind: 'influence', name: 'the ML family',   cluster: 3 },
  { id: 'jacquard',   kind: 'influence', name: 'jacquard cards',  cluster: 3 },
  { id: 'kettle',     kind: 'influence', name: 'a borrowed kitchen', cluster: 3 },
];

const EDGES = [
  { a: 'slow',   b: 'mlfam',     verb: 'after' },
  { a: 'weft',   b: 'jacquard',  verb: 'after' },
  { a: 'stillness', b: 'basho',  verb: 'defends' },
  { a: 'three',  b: 'annie',     verb: 'panel iii' },
  { a: 'three',  b: 'jia',       verb: 'panel vi' },
  { a: 'three',  b: 'kettle',    verb: 'painted in' },
  { a: 'hum',    b: 'stillness', verb: 'sibling of' },
  { a: 'slow',   b: 'stillness', verb: 'sibling of' },
  { a: 'weft',   b: 'slow',      verb: 'records' },
  { a: 'kitsch', b: 'three',     verb: 'argued in' },
  { a: 'frameworks', b: 'slow',  verb: 'cited in' },
  { a: 'hum',    b: 'basho',     verb: 'voiced by' },
];

const NODE_BODIES = {
  hum:       `<p>A pocket synthesizer for people who cannot read music. You hum into it; it gives you back a small song it thinks you meant.</p><p>Rust + WebAudio. ~4,200 LOC. In quiet beta.</p>`,
  slow:      `<p>A compiler that takes exactly thirty seconds to compile <em>hello world</em>, and prints a haiku at every pass of the pipeline.</p><p>Lex, parse, type, lower, emit. <em>at last, the small tree / drops its leaves into a list / and a list, and a list.</em></p>`,
  weft:      `<p>A physical jacquard loom, a Raspberry Pi, and a git hook. One thread per commit; one scarf per orbital year.</p>`,
  three:     `<p>Three figures in a low-lit kitchen, the kettle a warm pool of light. Eight oil panels, fifteen inches square. Shown in a borrowed window on Bergen Street.</p>`,
  annie:     `<p>A small oil at sixteen by twenty, the sink as warm as the kettle. The light that became <em>three bodies, panel iii</em>.</p>`,
  jia:       `<p>A late-November painting of a friend reading by a window. A study for what would later become the lamp light in <em>three bodies</em>.</p>`,
  stillness: `<p>An essay on the question of when a thing is finished. The argument is that finished is the wrong unit.</p><p>Reads like a long letter; has been written for two years.</p>`,
  kitsch:    `<p>Notes toward a theory of kitsch. The argument: a thing is kitsch when it has been told what it is for, and agrees.</p>`,
  frameworks:`<p>A year of writing without frameworks — what was kept, what was missed. About the costs of choosing to do less.</p>`,
  basho:     `<p>Matsuo Bashō. Read seasonally. Quoted in <em>on stillness</em>; voiced inside <em>hum</em>.</p>`,
  mlfam:     `<p>The ML family — Standard ML, OCaml, Haskell, F♯. The grammar that <em>slowcompiler</em> writes itself in. A grammar producing an ordered sequence: language as loom.</p>`,
  jacquard:  `<p>Punched cards for textile patterns. The first program. Cited at the heart of <em>weft</em>.</p>`,
  kettle:    `<p>A borrowed kitchen on Bergen Street, late afternoon. The lamp at the centre of <em>three bodies, orbiting</em>.</p>`,
};

const NODE_KIND_LABEL = {
  project:   'PROJECT',
  painting:  'PAINTING',
  essay:     'ESSAY',
  influence: 'INFLUENCE',
};
const NODE_KIND_COLOR = {
  project:   'pink',
  painting:  'cyan',
  essay:     'black',
  influence: 'ring',
};

// ─────────────────────────────────────────────────────────
// scene setup
// ─────────────────────────────────────────────────────────
const field = document.getElementById('field');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let W = 0, H = 0;
function resize() {
  W = field.clientWidth;
  H = field.clientHeight;
  field.setAttribute('viewBox', `0 0 ${W} ${H}`);
  recomputeClusters();
}

// node state: position, velocity
const nodeMap = new Map();
NODES.forEach(n => {
  nodeMap.set(n.id, { ...n, x: 0, y: 0, vx: 0, vy: 0, pinned: false });
});

// ─────────────────────────────────────────────────────────
// halftone pattern + dom build
// ─────────────────────────────────────────────────────────
field.innerHTML = `
  <defs>
    <pattern id="halftone" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="0.7" fill="rgba(0,0,0,0.30)"/>
    </pattern>
    <pattern id="halftone-light" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.7" fill="rgba(243,233,210,0.40)"/>
    </pattern>
  </defs>
  <g id="edges-group"></g>
  <g id="nodes-group"></g>
`;
const edgesG = field.querySelector('#edges-group');
const nodesG = field.querySelector('#nodes-group');

// edges (line + label)
const edgeEls = EDGES.map((e, i) => {
  const ns = 'http://www.w3.org/2000/svg';
  const line = document.createElementNS(ns, 'line');
  line.classList.add('edge');
  line.dataset.idx = String(i);
  edgesG.appendChild(line);
  const lbl = document.createElementNS(ns, 'text');
  lbl.classList.add('edge-label');
  lbl.dataset.idx = String(i);
  lbl.textContent = e.verb;
  lbl.setAttribute('text-anchor', 'middle');
  edgesG.appendChild(lbl);
  return { e, line, lbl };
});

// nodes
const nodeEls = NODES.map(n => {
  const ns = 'http://www.w3.org/2000/svg';
  const g = document.createElementNS(ns, 'g');
  g.classList.add('node', `node--${NODE_KIND_COLOR[n.kind]}`);
  g.setAttribute('tabindex', '0');
  g.dataset.id = n.id;
  const face = document.createElementNS(ns, 'circle');
  face.classList.add('face');
  face.setAttribute('r', '18');
  g.appendChild(face);
  const shade = document.createElementNS(ns, 'circle');
  shade.classList.add('shade');
  shade.setAttribute('r', '18');
  g.appendChild(shade);
  const lbl = document.createElementNS(ns, 'text');
  lbl.classList.add('label');
  if (n.kind === 'painting' || n.kind === 'essay') lbl.classList.add('label--alt');
  lbl.setAttribute('y', '36');
  lbl.textContent = n.name.toUpperCase();
  g.appendChild(lbl);
  nodesG.appendChild(g);
  return { n, g, face, shade, lbl };
});

// ─────────────────────────────────────────────────────────
// physics
// ─────────────────────────────────────────────────────────
const REST = 110;     // spring rest length
const K = 0.06;       // spring strength
const REPEL = 5400;   // 1/d² repulsion strength
const DAMP = 0.78;
const CLUSTER_PULL = 0.012;
const BROWN = 0.5;

let clusterCenters = [];
function recomputeClusters() {
  // 4 clusters arranged in a 2×2 grid, biased away from edges
  const cx = W * 0.5, cy = H * 0.5;
  const dx = Math.min(W, 1100) * 0.20;
  const dy = Math.min(H, 800) * 0.18;
  clusterCenters = [
    { x: cx - dx, y: cy - dy },  // 0 projects
    { x: cx + dx, y: cy - dy },  // 1 paintings
    { x: cx - dx, y: cy + dy },  // 2 essays
    { x: cx + dx, y: cy + dy },  // 3 influences
  ];
}

// initial scattering
function scatter() {
  let i = 0;
  for (const n of nodeMap.values()) {
    const c = clusterCenters[n.cluster] || { x: W / 2, y: H / 2 };
    const a = (i++ * 1.7) % (Math.PI * 2);
    n.x = c.x + Math.cos(a) * 60;
    n.y = c.y + Math.sin(a) * 60;
  }
}

function step() {
  // forces — start with brownian + cluster-pull
  for (const n of nodeMap.values()) {
    if (n.pinned) continue;
    const c = clusterCenters[n.cluster] || { x: W / 2, y: H / 2 };
    n.vx += (c.x - n.x) * CLUSTER_PULL;
    n.vy += (c.y - n.y) * CLUSTER_PULL;
    n.vx += (Math.random() - 0.5) * BROWN;
    n.vy += (Math.random() - 0.5) * BROWN;
  }
  // pairwise repulsion
  const arr = Array.from(nodeMap.values());
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const a = arr[i], b = arr[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d2 = dx * dx + dy * dy + 0.01;
      const f = REPEL / d2;
      const d = Math.sqrt(d2);
      const ux = dx / d, uy = dy / d;
      if (!a.pinned) { a.vx -= ux * f; a.vy -= uy * f; }
      if (!b.pinned) { b.vx += ux * f; b.vy += uy * f; }
    }
  }
  // springs
  for (const e of EDGES) {
    const a = nodeMap.get(e.a), b = nodeMap.get(e.b);
    if (!a || !b) continue;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
    const f = (d - REST) * K;
    const ux = dx / d, uy = dy / d;
    if (!a.pinned) { a.vx += ux * f; a.vy += uy * f; }
    if (!b.pinned) { b.vx -= ux * f; b.vy -= uy * f; }
  }
  // integrate
  for (const n of nodeMap.values()) {
    if (n.pinned) continue;
    n.vx *= DAMP;
    n.vy *= DAMP;
    n.x += n.vx;
    n.y += n.vy;
    // soft viewport bounds
    const margin = 60;
    if (n.x < margin)     { n.x = margin;     n.vx *= -0.5; }
    if (n.x > W - margin) { n.x = W - margin; n.vx *= -0.5; }
    if (n.y < margin)     { n.y = margin;     n.vy *= -0.5; }
    if (n.y > H - margin) { n.y = H - margin; n.vy *= -0.5; }
  }
}

function render() {
  for (const { n, g } of nodeEls) {
    const s = nodeMap.get(n.id);
    g.setAttribute('transform', `translate(${s.x.toFixed(1)}, ${s.y.toFixed(1)})`);
  }
  for (const { e, line, lbl } of edgeEls) {
    const a = nodeMap.get(e.a), b = nodeMap.get(e.b);
    line.setAttribute('x1', a.x.toFixed(1));
    line.setAttribute('y1', a.y.toFixed(1));
    line.setAttribute('x2', b.x.toFixed(1));
    line.setAttribute('y2', b.y.toFixed(1));
    lbl.setAttribute('x', ((a.x + b.x) / 2).toFixed(1));
    lbl.setAttribute('y', ((a.y + b.y) / 2 - 6).toFixed(1));
  }
}

// ─────────────────────────────────────────────────────────
// drag a node
// ─────────────────────────────────────────────────────────
let drag = null;

nodesG.addEventListener('pointerdown', (e) => {
  const g = e.target.closest('.node');
  if (!g) return;
  const id = g.dataset.id;
  const s = nodeMap.get(id);
  if (!s) return;
  drag = { id, dx: e.clientX, dy: e.clientY };
  s.pinned = true;
  g.setPointerCapture(e.pointerId);
  e.preventDefault();
});
window.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const s = nodeMap.get(drag.id);
  if (!s) return;
  const rect = field.getBoundingClientRect();
  s.x = e.clientX - rect.left;
  s.y = e.clientY - rect.top;
  s.vx = 0; s.vy = 0;
});
window.addEventListener('pointerup', (e) => {
  if (!drag) return;
  const s = nodeMap.get(drag.id);
  if (s) s.pinned = false;
  // if pointer didn't really move, treat as click
  const moved = Math.hypot(e.clientX - drag.dx, e.clientY - drag.dy);
  if (moved < 4) openPanel(drag.id);
  drag = null;
});

// ─────────────────────────────────────────────────────────
// hover → light edges
// ─────────────────────────────────────────────────────────
function setHovered(id) {
  edgeEls.forEach(({ e, line, lbl }) => {
    const lit = e.a === id || e.b === id;
    line.classList.toggle('is-active', lit);
    lbl.classList.toggle('is-active', lit);
  });
  nodeEls.forEach(({ n, g }) => g.classList.toggle('is-active', n.id === id));
}
nodesG.addEventListener('pointerover', e => {
  const g = e.target.closest('.node');
  if (g) setHovered(g.dataset.id);
});
nodesG.addEventListener('pointerout', e => {
  if (!e.relatedTarget || !e.relatedTarget.closest?.('.node')) {
    setHovered(null);
  }
});

// keyboard
nodesG.addEventListener('keydown', e => {
  const g = e.target.closest('.node');
  if (g && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    openPanel(g.dataset.id);
  }
});
nodesG.addEventListener('focusin', e => {
  const g = e.target.closest('.node');
  if (g) setHovered(g.dataset.id);
});

// ─────────────────────────────────────────────────────────
// side panel
// ─────────────────────────────────────────────────────────
const panel = document.getElementById('panel');
const panelContent = document.getElementById('panelContent');
function openPanel(id) {
  const node = NODES.find(n => n.id === id);
  if (!node) return;
  const connected = EDGES
    .filter(e => e.a === id || e.b === id)
    .map(e => {
      const otherId = e.a === id ? e.b : e.a;
      const other = NODES.find(n => n.id === otherId);
      return `<li><span class="verb">${e.verb}</span><span class="target">${other.name}</span></li>`;
    }).join('');
  panelContent.innerHTML = `
    <h2>${node.name}</h2>
    <p class="meta">${NODE_KIND_LABEL[node.kind]} · WEI-LI PRESS</p>
    ${NODE_BODIES[id] || ''}
    <div class="connected">
      <p class="connected__head">connected (${EDGES.filter(e => e.a === id || e.b === id).length})</p>
      <ul>${connected}</ul>
    </div>
  `;
  panel.classList.add('is-open');
  panel.setAttribute('aria-hidden', 'false');
}
function closePanel() {
  panel.classList.remove('is-open');
  panel.setAttribute('aria-hidden', 'true');
}
document.getElementById('panelClose').addEventListener('click', closePanel);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePanel();
});

// ─────────────────────────────────────────────────────────
// loop
// ─────────────────────────────────────────────────────────
resize();
scatter();
window.addEventListener('resize', () => { resize(); render(); });

let frame = 0;
function loop() {
  if (!reduceMotion) {
    step();
    render();
  }
  requestAnimationFrame(loop);
}
if (reduceMotion) {
  // settle once
  for (let i = 0; i < 240; i++) step();
  render();
} else {
  loop();
}
