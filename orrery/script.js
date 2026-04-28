// orrery — six bodies on six orbits. when two cross at a node, a bell tolls.
// from studio: three.js scene, drag-orbit camera, click→drawer, idle auto-rotation
// from constellation: typed-edge logic — but here edges are orbital relations (octave/fifth/tritone)
// from carillon: FM bell synthesis; conjunctions trigger tolls
// from draft: time-of-day tints the room (CSS variables on body[data-tod])

import * as THREE from 'three';

// ────────────────────────────────────────────────────────────
// the works
// ────────────────────────────────────────────────────────────
const BODIES = [
  {
    id: 'hum',
    name: 'hum',
    kind: 'a synthesizer',
    color: 0xffc878,   // warm amber
    radius: 3.0,
    period: 18,        // seconds for one full orbit
    phase: 0.0,
    pitch: 523.25,     // C5
    shape: 'icos',
    size: 0.36,
    body:
      `<p>A pocket synthesizer for people who cannot read music. You hum into it; it gives you back a small song it thinks you meant.</p>
       <p>Rust + WebAudio. ~4,200 LOC. In quiet beta; about a hundred and twenty weekly users, most of whom cannot read music.</p>
       <p class="orbit-note">orbits the lamp every eighteen seconds — touched daily.</p>`,
  },
  {
    id: 'slowcompiler',
    name: 'slowcompiler',
    kind: 'a compiler',
    color: 0x9fefb6,   // phosphor green
    radius: 4.4,
    period: 26,
    phase: 1.7,
    pitch: 392.00,     // G4
    shape: 'cubes',
    size: 0.34,
    body:
      `<p>A compiler that takes exactly thirty seconds to compile <em>hello world</em>, and prints a haiku at each stage of the pipeline.</p>
       <p>Lex, parse, type, lower, emit. The haiku for <em>parse</em> begins: <em>at last, the small tree / drops its leaves into a list / and a list, and a list.</em></p>
       <p class="orbit-note">orbits every twenty-six seconds — touched at the end of the workday.</p>`,
  },
  {
    id: 'weft',
    name: 'weft',
    kind: 'a loom',
    color: 0x7fb6ff,   // pale blue
    radius: 5.8,
    period: 38,
    phase: 3.2,
    pitch: 329.63,     // E4
    shape: 'torus',
    size: 0.46,
    body:
      `<p>A physical jacquard loom, a Raspberry Pi, and a git hook. One thread per commit; one scarf per orbital year.</p>
       <p>Three of last week's threads were red — that was the week the parser was rewritten. The cloth is part record, part cloth.</p>
       <p class="orbit-note">orbits every thirty-eight seconds — woven once a day.</p>`,
  },
  {
    id: 'three-bodies',
    name: 'three bodies, orbiting',
    kind: 'paintings',
    color: 0xc8b8ff,   // lavender
    radius: 7.2,
    period: 52,
    phase: 0.9,
    pitch: 293.66,     // D4
    shape: 'triplet',
    size: 0.38,
    body:
      `<p>A small series of oil paintings: three figures in a low-lit kitchen, the kettle a warm pool of light. Eight panels, each fifteen inches square.</p>
       <p>Shown in a borrowed window on Bergen Street. The works are now in private collections, by which she means: friends' living rooms.</p>
       <p class="orbit-note">orbits every fifty-two seconds — painted on weekends.</p>`,
  },
  {
    id: 'on-stillness',
    name: 'on stillness',
    kind: 'an essay',
    color: 0xf7a8c0,   // rose
    radius: 9.0,
    period: 75,
    phase: 4.2,
    pitch: 220.00,     // A3
    shape: 'plate',
    size: 0.5,
    body:
      `<p>An essay on the question of when a thing is finished. The argument is that finished is the wrong unit.</p>
       <p>Reads like a long letter. Has been written for two years and may continue to be written for two more.</p>
       <p class="orbit-note">orbits every seventy-five seconds — revised on long evenings.</p>`,
  },
  {
    id: 'letters',
    name: 'letters',
    kind: 'correspondence',
    color: 0xb8924a,   // bronze
    radius: 11.0,
    period: 110,
    phase: 5.6,
    pitch: 174.61,     // F3
    shape: 'leaf',
    size: 0.62,
    body:
      `<p>Slow correspondence. Replies will be slow and, when they come, longer than they should be.</p>
       <p>The slowest body on the orrery for a reason: she means it. Letter is the right unit of attention.</p>
       <p class="orbit-note">orbits every hundred and ten seconds — written when there is time to write a letter.</p>`,
  },
];

// ────────────────────────────────────────────────────────────
// time-of-day from local clock — tints the room (draft)
// ────────────────────────────────────────────────────────────
function timeOfDay(date = new Date()) {
  const h = date.getHours();
  if (h >= 5 && h < 8)   return 'dawn';
  if (h >= 8 && h < 11)  return 'morning';
  if (h >= 11 && h < 15) return 'midday';
  if (h >= 15 && h < 18) return 'afternoon';
  if (h >= 18 && h < 21) return 'evening';
  return 'night';
}
const tod = timeOfDay();
document.body.setAttribute('data-tod', tod);
document.getElementById('todLabel').textContent = tod;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ────────────────────────────────────────────────────────────
// three.js scene
// ────────────────────────────────────────────────────────────
const stage = document.getElementById('stage');
const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(46, stage.clientWidth / stage.clientHeight, 0.1, 200);
const camRig = { theta: -0.55, phi: 1.05, dist: 22 };
function applyCamera() {
  const { theta, phi, dist } = camRig;
  camera.position.set(
    dist * Math.sin(phi) * Math.cos(theta),
    dist * Math.cos(phi),
    dist * Math.sin(phi) * Math.sin(theta)
  );
  camera.lookAt(0, 0, 0);
}
applyCamera();

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(stage.clientWidth, stage.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
stage.appendChild(renderer.domElement);

function onResize() {
  camera.aspect = stage.clientWidth / stage.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(stage.clientWidth, stage.clientHeight);
}
window.addEventListener('resize', onResize);

// — the lamp at the center —
const lamp = new THREE.PointLight(0xffaa66, 38, 60, 1.6);
lamp.position.set(0, 0, 0);
scene.add(lamp);

const lampGlow = new THREE.Mesh(
  new THREE.SphereGeometry(0.55, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffd28a })
);
scene.add(lampGlow);

const lampHalo = new THREE.Mesh(
  new THREE.SphereGeometry(1.2, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffaa55, transparent: true, opacity: 0.10 })
);
scene.add(lampHalo);

// — a soft cool fill so bodies on the dark side aren't pure black —
const fill = new THREE.HemisphereLight(0x4a5078, 0x0a0a14, 0.18);
scene.add(fill);

// — the orbit rings (thin, faint) —
function orbitRing(radius) {
  const seg = 256;
  const pts = [];
  for (let i = 0; i <= seg; i++) {
    const t = (i / seg) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius));
  }
  const geom = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({ color: 0x6c5a40, transparent: true, opacity: 0.18 });
  return new THREE.Line(geom, mat);
}
BODIES.forEach(b => scene.add(orbitRing(b.radius)));

// — bodies —
function makeBody(b) {
  const group = new THREE.Group();
  group.name = b.id;
  const mat = new THREE.MeshStandardMaterial({
    color: b.color,
    roughness: 0.55,
    metalness: 0.10,
    emissive: new THREE.Color(b.color).multiplyScalar(0.10),
  });
  let mesh;
  if (b.shape === 'icos') {
    mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(b.size, 0), mat);
  } else if (b.shape === 'cubes') {
    const g = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const c = new THREE.Mesh(new THREE.BoxGeometry(b.size, b.size * 0.55, b.size), mat);
      c.position.y = (i - 1) * b.size * 0.62;
      c.rotation.y = i * 0.18;
      g.add(c);
    }
    mesh = g;
  } else if (b.shape === 'torus') {
    mesh = new THREE.Mesh(new THREE.TorusGeometry(b.size, b.size * 0.32, 12, 24), mat);
    mesh.rotation.x = Math.PI * 0.36;
  } else if (b.shape === 'triplet') {
    const g = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const r = b.size * 0.7;
      const s = new THREE.Mesh(new THREE.SphereGeometry(b.size * 0.46, 18, 18), mat);
      s.position.set(Math.cos(a) * r, Math.sin(a) * r * 0.4, Math.sin(a) * r);
      g.add(s);
    }
    mesh = g;
  } else if (b.shape === 'plate') {
    mesh = new THREE.Mesh(new THREE.CylinderGeometry(b.size, b.size, b.size * 0.18, 24), mat);
  } else if (b.shape === 'leaf') {
    // an envelope — a thin folded plane
    const g = new THREE.Group();
    const front = new THREE.Mesh(new THREE.BoxGeometry(b.size * 1.4, b.size * 0.95, b.size * 0.06), mat);
    g.add(front);
    const flap = new THREE.Mesh(
      new THREE.BoxGeometry(b.size * 1.4, b.size * 0.55, b.size * 0.04),
      new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.6, metalness: 0.05, emissive: new THREE.Color(b.color).multiplyScalar(0.06) })
    );
    flap.position.y = b.size * 0.18;
    flap.position.z = b.size * 0.05;
    g.add(flap);
    mesh = g;
  } else {
    mesh = new THREE.Mesh(new THREE.SphereGeometry(b.size, 18, 18), mat);
  }
  group.add(mesh);
  group.userData = b;
  return group;
}
const meshes = [];
BODIES.forEach(b => {
  const m = makeBody(b);
  scene.add(m);
  meshes.push(m);
});

// ────────────────────────────────────────────────────────────
// orbit math
// ────────────────────────────────────────────────────────────
const tStart = performance.now() / 1000;
function angleOf(b, t) {
  return b.phase + (t / b.period) * Math.PI * 2;
}
function placeBodies(t) {
  for (let i = 0; i < BODIES.length; i++) {
    const b = BODIES[i];
    const a = angleOf(b, t);
    const m = meshes[i];
    m.position.set(Math.cos(a) * b.radius, 0, Math.sin(a) * b.radius);
    // slow self-rotation
    m.rotation.y = t * (0.3 + i * 0.08);
  }
}

// ────────────────────────────────────────────────────────────
// drag-orbit + scroll-zoom
// ────────────────────────────────────────────────────────────
let dragging = false, dragStart = null, lastInputT = performance.now();
stage.addEventListener('pointerdown', (e) => {
  dragging = true;
  dragStart = { x: e.clientX, y: e.clientY, theta: camRig.theta, phi: camRig.phi };
  stage.setPointerCapture(e.pointerId);
});
stage.addEventListener('pointermove', (e) => {
  lastInputT = performance.now();
  // hover labels
  if (!dragging) {
    const hit = pickAt(e);
    stage.classList.toggle('is-pointer', !!hit);
    document.getElementById('hudHover').textContent = hit ? `${hit.userData.name} — ${hit.userData.kind}` : '—';
    return;
  }
  const dx = (e.clientX - dragStart.x) / stage.clientWidth;
  const dy = (e.clientY - dragStart.y) / stage.clientHeight;
  camRig.theta = dragStart.theta - dx * Math.PI * 1.4;
  camRig.phi = Math.max(0.4, Math.min(Math.PI - 0.4, dragStart.phi + dy * Math.PI * 1.0));
  applyCamera();
});
stage.addEventListener('pointerup', (e) => {
  if (dragging) stage.releasePointerCapture(e.pointerId);
  dragging = false;
  // click (no significant drag) → focus
  if (e.detail >= 1 && dragStart && Math.hypot(e.clientX - dragStart.x, e.clientY - dragStart.y) < 5) {
    const hit = pickAt(e);
    if (hit) openDrawer(hit.userData);
  }
  dragStart = null;
});
stage.addEventListener('wheel', (e) => {
  e.preventDefault();
  lastInputT = performance.now();
  const k = Math.exp(e.deltaY * 0.0012);
  camRig.dist = Math.max(7, Math.min(48, camRig.dist * k));
  applyCamera();
}, { passive: false });

// — picking —
const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2();
function pickAt(e) {
  const rect = stage.getBoundingClientRect();
  ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  const hits = ray.intersectObjects(meshes, true);
  if (!hits.length) return null;
  // walk up to the body group
  let o = hits[0].object;
  while (o && !o.userData?.id) o = o.parent;
  return o;
}

// ────────────────────────────────────────────────────────────
// drawer
// ────────────────────────────────────────────────────────────
const drawer = document.getElementById('drawer');
const drawerContent = document.getElementById('drawerContent');
function openDrawer(b) {
  drawerContent.innerHTML = `
    <h2>${b.name}</h2>
    <p class="meta">${b.kind} · ${roman(BODIES.indexOf(BODIES.find(x => x.id === b.id)) + 1)}</p>
    ${b.body}
  `;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
}
document.getElementById('drawerClose').addEventListener('click', () => {
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
});
function roman(n) {
  return ['', 'i', 'ii', 'iii', 'iv', 'v', 'vi'][n] || String(n);
}

// ────────────────────────────────────────────────────────────
// FM bell synthesis (carillon-derived, simplified)
// ────────────────────────────────────────────────────────────
let audio = null;
let audioReady = false;
const PARTIALS = [
  // ratio, gain, decay-mult — inharmonic bell-ish partial set
  { r: 0.50, g: 0.45, d: 1.2 },  // hum (octave below)
  { r: 1.00, g: 1.00, d: 1.0 },  // prime
  { r: 1.20, g: 0.55, d: 0.85 }, // tierce-ish (minor third)
  { r: 1.50, g: 0.35, d: 0.70 }, // quint
  { r: 2.00, g: 0.30, d: 0.55 }, // nominal (octave above prime)
];
function initAudio() {
  if (audio) return audio;
  audio = new (window.AudioContext || window.webkitAudioContext)();
  // soft bus
  const bus = audio.createGain();
  bus.gain.value = 0.55;
  // a subtle compressor + a little reverb-ish delay tail (cheap "stone room")
  const comp = audio.createDynamicsCompressor();
  comp.threshold.value = -16;
  comp.knee.value = 8;
  comp.ratio.value = 3;
  comp.attack.value = 0.01;
  comp.release.value = 0.18;
  bus.connect(comp).connect(audio.destination);
  // synthesized convolver IR — 1.6s decaying noise
  const conv = audio.createConvolver();
  const irLen = audio.sampleRate * 1.6;
  const ir = audio.createBuffer(2, irLen, audio.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = ir.getChannelData(ch);
    for (let i = 0; i < irLen; i++) {
      const t = i / irLen;
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 3.0);
    }
    // four early reflections
    [0.013, 0.027, 0.041, 0.057].forEach((d, k) => {
      const idx = Math.floor(d * audio.sampleRate);
      data[idx] += (1 - k * 0.2) * 0.45 * (Math.random() < 0.5 ? -1 : 1);
    });
  }
  conv.buffer = ir;
  const wet = audio.createGain();
  wet.gain.value = 0.35;
  conv.connect(wet).connect(comp);
  audio.bus = bus;
  audio.wet = wet;
  audio.conv = conv;
  return audio;
}
function strikeBell(pitch, gain = 1.0) {
  if (!audioReady) return;
  const ctx = audio;
  const now = ctx.currentTime;
  const decay = 4.5 + 1200 / pitch * 0.6; // bigger bells decay longer

  // strike: brief filtered noise burst (clapper)
  const noiseLen = Math.floor(ctx.sampleRate * 0.06);
  const nbuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
  const ndata = nbuf.getChannelData(0);
  for (let i = 0; i < noiseLen; i++) ndata[i] = (Math.random() * 2 - 1) * (1 - i / noiseLen);
  const nsrc = ctx.createBufferSource();
  nsrc.buffer = nbuf;
  const nbp = ctx.createBiquadFilter();
  nbp.type = 'bandpass';
  nbp.frequency.value = pitch * 3.2;
  nbp.Q.value = 1.6;
  const ngain = ctx.createGain();
  ngain.gain.value = 0.45 * gain;
  nsrc.connect(nbp).connect(ngain).connect(ctx.bus);
  ngain.connect(ctx.conv);
  nsrc.start(now);
  nsrc.stop(now + 0.08);

  // FM partials
  for (const p of PARTIALS) {
    const carrierFreq = pitch * p.r;
    const modRatio = 1.4;
    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.value = carrierFreq;
    const modulator = ctx.createOscillator();
    modulator.type = 'sine';
    modulator.frequency.value = carrierFreq * modRatio;
    const modGain = ctx.createGain();
    // depth envelope dies fast — the bright metallic *ping*
    modGain.gain.setValueAtTime(carrierFreq * 1.3, now);
    modGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    modulator.connect(modGain).connect(carrier.frequency);
    // amp envelope — exponential decay over decay seconds
    const amp = ctx.createGain();
    const peak = 0.18 * p.g * gain;
    amp.gain.setValueAtTime(peak, now);
    amp.gain.exponentialRampToValueAtTime(0.0008, now + decay * p.d);
    carrier.connect(amp).connect(ctx.bus);
    amp.connect(ctx.conv);
    modulator.start(now);
    carrier.start(now);
    modulator.stop(now + decay * p.d + 0.05);
    carrier.stop(now + decay * p.d + 0.05);
  }
}

// ────────────────────────────────────────────────────────────
// audio gate
// ────────────────────────────────────────────────────────────
const audioGate = document.getElementById('audioGate');
audioGate.addEventListener('click', async () => {
  initAudio();
  if (audio.state === 'suspended') await audio.resume();
  audioReady = true;
  audioGate.classList.add('is-armed');
  // a single soft tap so the visitor knows the bells are armed
  setTimeout(() => strikeBell(BODIES[0].pitch, 0.45), 80);
});

// ────────────────────────────────────────────────────────────
// conjunction detection
// when two bodies' angles agree within tol, ring both (interval = ratio of their pitches)
// ────────────────────────────────────────────────────────────
const lastRing = {}; // key: "i:j" -> t at which last rang
const TOL = 0.06;    // radians (~3.4°)
const COOLDOWN = 4.0; // seconds per pair

function checkConjunctions(t) {
  for (let i = 0; i < BODIES.length; i++) {
    for (let j = i + 1; j < BODIES.length; j++) {
      const a = ((angleOf(BODIES[i], t) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const b = ((angleOf(BODIES[j], t) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      let d = Math.abs(a - b);
      if (d > Math.PI) d = Math.PI * 2 - d;
      if (d < TOL) {
        const key = `${i}:${j}`;
        const last = lastRing[key] ?? -Infinity;
        if (t - last > COOLDOWN) {
          lastRing[key] = t;
          ringConjunction(BODIES[i], BODIES[j]);
        }
      }
    }
  }
}

const bellLine = document.getElementById('bellLine');
const bellLog = document.getElementById('bellLog');
function ringConjunction(b1, b2) {
  // both bells, slightly staggered (50ms) — their interval is the readable event
  if (audioReady) {
    strikeBell(b1.pitch, 0.85);
    setTimeout(() => strikeBell(b2.pitch, 0.85), 60);
  }
  const interval = describeInterval(b1.pitch, b2.pitch);
  const line = `${b1.name} × ${b2.name} — ${interval}`;
  bellLine.textContent = line;
  bellLine.classList.remove('is-fresh');
  // re-trigger the fresh-color animation
  void bellLine.offsetWidth;
  bellLine.classList.add('is-fresh');
  setTimeout(() => bellLine.classList.remove('is-fresh'), 1800);
  // append to log, cap at 4
  const li = document.createElement('li');
  li.textContent = `${b1.name} × ${b2.name}`;
  bellLog.prepend(li);
  while (bellLog.children.length > 4) bellLog.removeChild(bellLog.lastChild);
}
function describeInterval(p1, p2) {
  const ratio = Math.max(p1, p2) / Math.min(p1, p2);
  // reduce to within an octave
  let r = ratio;
  while (r > 2) r /= 2;
  const labels = [
    [1.000, 'unison'],
    [1.067, 'a minor second'],
    [1.125, 'a major second'],
    [1.200, 'a minor third'],
    [1.250, 'a major third'],
    [1.333, 'a fourth'],
    [1.414, 'a tritone'],
    [1.500, 'a fifth'],
    [1.600, 'a minor sixth'],
    [1.667, 'a major sixth'],
    [1.800, 'a minor seventh'],
    [1.875, 'a major seventh'],
    [2.000, 'an octave'],
  ];
  let best = labels[0], bestD = Infinity;
  for (const [k, label] of labels) {
    const d = Math.abs(Math.log(r) - Math.log(k));
    if (d < bestD) { bestD = d; best = [k, label]; }
  }
  return best[1];
}

// ────────────────────────────────────────────────────────────
// loop
// ────────────────────────────────────────────────────────────
function tick() {
  const now = performance.now();
  const t = (now / 1000) - tStart;

  // gentle auto-rotation when idle (2s after last input)
  if (!reduceMotion && now - lastInputT > 2200 && !dragging) {
    camRig.theta += 0.0009;
    applyCamera();
  }

  if (!reduceMotion) {
    placeBodies(t);
  } else {
    // settle to t=0 once
    placeBodies(0);
  }
  // lamp halo "breath"
  const breath = 1 + Math.sin(t * 0.7) * 0.04;
  lampHalo.scale.set(breath, breath, breath);

  if (!reduceMotion) checkConjunctions(t);

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
tick();

// keep the canvas crisp on resize
new ResizeObserver(() => onResize()).observe(stage);
