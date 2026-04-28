import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/* ———————————————————————————— content ———————————————————————————— */
const ENTRIES = {
  easel: {
    kicker: 'on the easel',
    title: 'three bodies orbiting a lamp',
    body: [
      'A small series of oil paintings begun in winter 2022 — three figures in domestic interiors, each lit by a single warm source. Eight panels, all on linen, all 12×16. The titles are mostly the names of friends.',
      'Shown briefly in a borrowed window on Bergen Street; now in private collections, by which I mean my friends’ living rooms. I’m currently making a fourth painting in the series, very slowly, and a fifth in my head.',
    ],
    dim: 'oil on linen · 2022 — present',
    meta: ['eight panels', 'one in progress', 'borrowed window, Bergen St.'],
  },
  terminal: {
    kicker: 'on the desk',
    title: 'slowcompiler',
    body: [
      'A compiler that takes thirty seconds to compile <em>hello world</em> and prints a haiku at each stage of the pipeline. It compiles a small functional language that resembles ML, if ML had been written by someone who’d just finished reading Bashō.',
      'About 3,800 lines of Rust. The current stage I’m working on is the type checker, which I’m calling <em>patience</em>. I’m interested in tools that make you wait on purpose.',
    ],
    dim: 'rust · in slow progress',
    meta: ['~3,800 LOC', 'haiku at every pass', 'open source soon'],
  },
  synth: {
    kicker: 'next to it',
    title: 'hum',
    body: [
      'A pocket synthesizer for people who can’t read music. You hum a melody into the microphone; it transcribes what it thinks you meant and plays it back, voiced for two oscillators and a reverb the size of a kitchen.',
      'Rust and WebAudio, ~4,200 lines. In quiet beta — about 120 weekly users, most of whom can’t read music. The compliment I keep is from a friend who said her grandmother used it to write a lullaby.',
    ],
    dim: 'rust + webaudio · ~120 weekly users',
    meta: ['quiet beta', 'two oscillators', 'one kitchen of reverb'],
  },
  books: {
    kicker: 'stacked beside the synth',
    title: 'notebooks',
    body: [
      'Three essays I keep coming back to. <em>On Stillness</em> — a short defense of the pause, written under a bridge in Maine. <em>Notes Toward a Theory of Kitsch</em> — what we owe to bad taste and the people who love it. <em>A Year Without Frameworks</em> — a year of writing the boring HTML on purpose.',
      'They are, like most things I write, longer than they should be.',
    ],
    dim: 'three essays · self-published',
    meta: ['on stillness', 'theory of kitsch', 'a year without frameworks'],
  },
  loom: {
    kicker: 'in the corner',
    title: 'weft',
    body: [
      'A small jacquard loom I built from a kit, a Raspberry Pi, and a git hook. It’s wired to my history: each commit becomes a thread, each project a band of color. It finishes one scarf per orbital year.',
      'Last year’s scarf is mostly grey with three days of red — that was the week I rewrote slowcompiler’s parser. I wear it in November.',
    ],
    dim: 'jacquard loom + git · one scarf / year',
    meta: ['kit + raspberry pi', 'one thread per commit', 'november'],
  },
  window: {
    kicker: 'through the window',
    title: 'colophon',
    body: [
      'This room is a still life of the things I’m working on. Some of them have finished states; most don’t. I’m interested in the space between the finished thing and the continuing thing.',
      'If anything in the room speaks to you, write — <a href="mailto:grayswan795@gmail.com">grayswan795@gmail.com</a>. Replies will be slow and, when they come, longer than they should be. Other places: <a href="https://github.com/grace-wj">github</a>.',
      'Built in plain HTML, CSS, and three.js, one weekend, with the lamp on.',
    ],
    dim: 'this room · one weekend',
    meta: ['three.js r160', 'no build step', 'no framework'],
  },
};

/* ———————————————————————————— scene ———————————————————————————— */
const stage = document.getElementById('stage');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x14100c);
scene.fog = new THREE.Fog(0x14100c, 10, 26);

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(6.6, 3.2, 7);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
stage.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.4, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.minPolarAngle = Math.PI * 0.30;
controls.maxPolarAngle = Math.PI * 0.52;
controls.minDistance = 6;
controls.maxDistance = 13;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.45;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) controls.autoRotate = false;

/* ———————————————————————————— lights ———————————————————————————— */
scene.add(new THREE.AmbientLight(0x6a7a90, 0.55));

const lampLight = new THREE.PointLight(0xffae6a, 14, 9, 1.7);
lampLight.position.set(2.6, 2.05, -0.4);
scene.add(lampLight);

const winLight = new THREE.PointLight(0xfff0c0, 9, 14, 1.4);
winLight.position.set(-3.0, 3.0, -3.4);
scene.add(winLight);

const fill = new THREE.DirectionalLight(0x6090a8, 0.35);
fill.position.set(-4, 6, 4);
scene.add(fill);

/* ———————————————————————————— room ———————————————————————————— */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(28, 28),
  new THREE.MeshStandardMaterial({ color: 0x4a3220, roughness: 0.96 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

const wallMat = new THREE.MeshStandardMaterial({ color: 0x8a3e22, roughness: 0.94 });
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(16, 8), wallMat);
backWall.position.set(0, 4, -4.2);
scene.add(backWall);

const sideWall = new THREE.Mesh(new THREE.PlaneGeometry(12, 8), wallMat.clone());
sideWall.material.color = new THREE.Color(0x6a2e1a);
sideWall.position.set(-5.2, 4, 0);
sideWall.rotation.y = Math.PI / 2;
scene.add(sideWall);

/* window — emissive plane embedded in the side wall */
const windowMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2.4, 3.0),
  new THREE.MeshBasicMaterial({ color: 0xfff1c4 })
);
windowMesh.position.set(-5.18, 3.4, -1.0);
windowMesh.rotation.y = Math.PI / 2;
windowMesh.userData = { id: 'window' };
scene.add(windowMesh);
/* window frame */
const frameMat = new THREE.MeshStandardMaterial({ color: 0x2a1c12, roughness: 0.85 });
[
  { w: 2.5, h: 0.08, y: 4.94, z: -1.0 },
  { w: 2.5, h: 0.08, y: 1.86, z: -1.0 },
  { w: 0.08, h: 3.1, y: 3.4, z: -2.22 },
  { w: 0.08, h: 3.1, y: 3.4, z: 0.22 },
  { w: 2.5, h: 0.06, y: 3.4, z: -1.0 },
  { w: 0.06, h: 3.1, y: 3.4, z: -1.0 },
].forEach(({ w, h, y, z }) => {
  const m = new THREE.Mesh(new THREE.BoxGeometry(0.04, h, w), frameMat);
  if (h < 0.1) m.scale.set(1, 1, 1);
  m.position.set(-5.16, y, z);
  scene.add(m);
});

/* ———————————————————————————— pickables ———————————————————————————— */
const pickables = [];

function tagGroup(group, id) {
  group.userData.id = id;
  group.traverse((c) => { if (c.isMesh) c.userData.id = id; });
  pickables.push(group);
}

/* ———————————————————————————— desk ———————————————————————————— */
const desk = new THREE.Group();
const top = new THREE.Mesh(
  new THREE.BoxGeometry(3.4, 0.14, 1.5),
  new THREE.MeshStandardMaterial({ color: 0x3a2616, roughness: 0.85 })
);
top.position.y = 1.07;
desk.add(top);
const legGeo = new THREE.BoxGeometry(0.13, 1.0, 0.13);
const legMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0e, roughness: 0.9 });
[[-1.55, 0.5, -0.6], [1.55, 0.5, -0.6], [-1.55, 0.5, 0.6], [1.55, 0.5, 0.6]].forEach(([x, y, z]) => {
  const leg = new THREE.Mesh(legGeo, legMat);
  leg.position.set(x, y, z);
  desk.add(leg);
});
desk.position.set(1.2, 0, -0.7);
scene.add(desk);

/* terminal on desk */
const terminal = new THREE.Group();
const termBody = new THREE.Mesh(
  new THREE.BoxGeometry(1.0, 0.78, 0.7),
  new THREE.MeshStandardMaterial({ color: 0xe8dcc4, roughness: 0.6 })
);
termBody.position.y = 0.39;
terminal.add(termBody);
const termScreen = new THREE.Mesh(
  new THREE.PlaneGeometry(0.7, 0.5),
  new THREE.MeshBasicMaterial({ color: 0x9fefb6 })
);
termScreen.position.set(0, 0.42, 0.36);
terminal.add(termScreen);
/* tiny "glow" plane behind for bloom feel */
const termGlow = new THREE.Mesh(
  new THREE.PlaneGeometry(1.4, 1.1),
  new THREE.MeshBasicMaterial({ color: 0x9fefb6, transparent: true, opacity: 0.08 })
);
termGlow.position.set(0, 0.42, 0.37);
terminal.add(termGlow);
terminal.position.set(0.5, 1.14, -0.55);
tagGroup(terminal, 'terminal');
scene.add(terminal);

/* synth on desk */
const synth = new THREE.Group();
const synthBody = new THREE.Mesh(
  new THREE.BoxGeometry(1.1, 0.16, 0.55),
  new THREE.MeshStandardMaterial({ color: 0x223a4a, roughness: 0.55 })
);
synth.add(synthBody);
const knobMat = new THREE.MeshStandardMaterial({ color: 0xd9a64c, metalness: 0.25, roughness: 0.45 });
[-0.3, 0, 0.3].forEach((dx) => {
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 18), knobMat);
  knob.position.set(dx, 0.1, -0.05);
  synth.add(knob);
});
const slot = new THREE.Mesh(
  new THREE.BoxGeometry(0.7, 0.005, 0.06),
  new THREE.MeshStandardMaterial({ color: 0x0a0e14 })
);
slot.position.set(0, 0.083, 0.16);
synth.add(slot);
synth.position.set(2.05, 1.22, -0.4);
synth.rotation.y = -0.18;
tagGroup(synth, 'synth');
scene.add(synth);

/* books, stacked */
const books = new THREE.Group();
const bookData = [
  { color: 0x6e3a2c, h: 0.16, w: 0.7, d: 0.92, dx: -0.05 },
  { color: 0xb38a3a, h: 0.14, w: 0.66, d: 0.88, dx: 0.05 },
  { color: 0x2e3f4a, h: 0.18, w: 0.72, d: 0.94, dx: -0.02 },
];
let by = 0;
bookData.forEach((b) => {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(b.w, b.h, b.d),
    new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.85 })
  );
  m.position.set(b.dx, by + b.h / 2, 0);
  by += b.h;
  books.add(m);
});
books.position.set(-0.6, 1.14, -0.5);
books.rotation.y = 0.22;
tagGroup(books, 'books');
scene.add(books);

/* ———————————————————————————— easel ———————————————————————————— */
const easel = new THREE.Group();
const standMat = new THREE.MeshStandardMaterial({ color: 0x4a3422, roughness: 0.85 });
const left = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.4, 8), standMat);
left.position.set(-0.45, 1.7, 0); easel.add(left);
const right = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.4, 8), standMat);
right.position.set(0.45, 1.7, 0); easel.add(right);
const back = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.6, 8), standMat);
back.position.set(0, 1.8, -0.4); back.rotation.x = 0.18; easel.add(back);
const tray = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.07, 0.16), standMat);
tray.position.set(0, 0.92, 0.06); easel.add(tray);
const cross = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.06, 0.06), standMat);
cross.position.set(0, 2.6, 0); easel.add(cross);

/* canvas — painted via offscreen 2D canvas for an oil-painty texture */
const paintingTex = makePaintingTexture();
const canvasMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(1.4, 1.7),
  new THREE.MeshStandardMaterial({ map: paintingTex, roughness: 0.95 })
);
canvasMesh.position.set(0, 1.95, 0.05);
easel.add(canvasMesh);
const canvasBack = new THREE.Mesh(
  new THREE.BoxGeometry(1.42, 1.72, 0.06),
  new THREE.MeshStandardMaterial({ color: 0xdcc6a4, roughness: 0.9 })
);
canvasBack.position.set(0, 1.95, 0.02);
easel.add(canvasBack);

easel.position.set(-2.4, 0, 0.8);
easel.rotation.y = Math.PI / 7;
tagGroup(easel, 'easel');
scene.add(easel);

/* ———————————————————————————— loom ———————————————————————————— */
const loom = new THREE.Group();
const loomWoodMat = new THREE.MeshStandardMaterial({ color: 0x5a3a22, roughness: 0.85 });
const lp1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.6, 0.12), loomWoodMat);
lp1.position.set(-0.55, 1.3, 0); loom.add(lp1);
const lp2 = lp1.clone(); lp2.position.x = 0.55; loom.add(lp2);
const top1 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.12, 0.12), loomWoodMat);
top1.position.set(0, 2.5, 0); loom.add(top1);
const bot1 = top1.clone(); bot1.position.y = 0.12; loom.add(bot1);
/* warp threads */
const warpMat = new THREE.MeshStandardMaterial({ color: 0xe4d8b8, roughness: 0.7 });
for (let i = 0; i < 9; i++) {
  const t = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 2.3, 6), warpMat);
  t.position.set(-0.45 + i * 0.11, 1.3, 0);
  loom.add(t);
}
/* half-finished cloth — a small plane */
const clothCanvas = makeWeftTexture();
const cloth = new THREE.Mesh(
  new THREE.PlaneGeometry(1.06, 0.85),
  new THREE.MeshStandardMaterial({ map: clothCanvas, roughness: 0.92 })
);
cloth.position.set(0, 0.6, 0.02);
loom.add(cloth);

loom.position.set(3.6, 0, -1.2);
loom.rotation.y = -Math.PI / 4;
tagGroup(loom, 'loom');
scene.add(loom);

/* ———————————————————————————— lamp on desk ———————————————————————————— */
const lamp = new THREE.Group();
const base = new THREE.Mesh(
  new THREE.CylinderGeometry(0.16, 0.18, 0.06, 18),
  new THREE.MeshStandardMaterial({ color: 0x2a1c14 })
);
base.position.y = 0.03;
lamp.add(base);
const pole = new THREE.Mesh(
  new THREE.CylinderGeometry(0.025, 0.025, 0.95, 8),
  new THREE.MeshStandardMaterial({ color: 0x2a1c14 })
);
pole.position.y = 0.5;
lamp.add(pole);
const shade = new THREE.Mesh(
  new THREE.ConeGeometry(0.32, 0.42, 22, 1, true),
  new THREE.MeshStandardMaterial({ color: 0x6e2a1c, side: THREE.DoubleSide, roughness: 0.85 })
);
shade.position.y = 1.1;
shade.rotation.x = Math.PI;
lamp.add(shade);
const bulb = new THREE.Mesh(
  new THREE.SphereGeometry(0.07, 12, 8),
  new THREE.MeshBasicMaterial({ color: 0xffd17a })
);
bulb.position.y = 0.95;
lamp.add(bulb);
lamp.position.set(2.6, 1.14, -0.4);
scene.add(lamp);

/* ———————————————————————————— procedural textures ———————————————————————————— */
function makePaintingTexture() {
  const c = document.createElement('canvas');
  c.width = 280; c.height = 340;
  const ctx = c.getContext('2d');

  /* warm ground (dim umber) */
  const grd = ctx.createLinearGradient(0, 0, 0, c.height);
  grd.addColorStop(0, '#7a4a2c');
  grd.addColorStop(1, '#3a2014');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, c.width, c.height);

  /* big soft lamp pool, upper-center */
  const cx = c.width * 0.5, cy = c.height * 0.42;
  const lamp = ctx.createRadialGradient(cx, cy, 3, cx, cy, 160);
  lamp.addColorStop(0, 'rgba(255, 232, 170, 1)');
  lamp.addColorStop(0.30, 'rgba(248, 180, 90, 0.75)');
  lamp.addColorStop(0.65, 'rgba(200, 110, 50, 0.18)');
  lamp.addColorStop(1, 'rgba(120, 50, 20, 0)');
  ctx.fillStyle = lamp;
  ctx.fillRect(0, 0, c.width, c.height);

  /* lamp itself — bright bead */
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255, 244, 210, 1)';
  ctx.ellipse(cx, cy, 4, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  /* three figures orbiting the lamp — small silhouettes in lower 2/3 */
  const figs = [
    { x: 70,  y: 235, w: 28, h: 60 },
    { x: 215, y: 245, w: 28, h: 64 },
    { x: 145, y: 290, w: 26, h: 50 },
  ];
  figs.forEach((f) => {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(20, 12, 8, 0.92)';
    ctx.ellipse(f.x, f.y, f.w * 0.5, f.h * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    /* head */
    ctx.beginPath();
    ctx.ellipse(f.x, f.y - f.h * 0.55, f.w * 0.34, f.h * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    /* warm rim toward lamp */
    const a = Math.atan2(cy - f.y, cx - f.x);
    ctx.save();
    ctx.translate(f.x + Math.cos(a) * f.w * 0.42, f.y + Math.sin(a) * f.h * 0.1);
    ctx.rotate(a + Math.PI / 2);
    ctx.fillStyle = 'rgba(255, 190, 100, 0.55)';
    ctx.fillRect(-1, -f.h * 0.4, 2, f.h * 0.8);
    ctx.restore();
  });

  /* brushwork: small angled dabs */
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * c.width;
    const y = Math.random() * c.height;
    const d = Math.hypot(x - cx, y - cy);
    const warm = Math.max(0, 1 - d / 200);
    const r = (90 + warm * 160 + Math.random() * 25) | 0;
    const g = (55 + warm * 100 + Math.random() * 20) | 0;
    const b = (28 + warm * 30 + Math.random() * 15) | 0;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.05 + Math.random() * 0.10})`;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((Math.random() - 0.5) * 0.6);
    ctx.fillRect(-1, -0.5, 2 + Math.random() * 3, 1);
    ctx.restore();
  }

  /* corner vignette */
  const vig = ctx.createRadialGradient(c.width/2, c.height/2, c.width*0.35, c.width/2, c.height/2, c.width*0.75);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, c.width, c.height);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeWeftTexture() {
  const c = document.createElement('canvas');
  c.width = 200; c.height = 160;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#d4c5a3';
  ctx.fillRect(0, 0, c.width, c.height);
  /* horizontal weft bands — mostly grey with three days of red */
  const bands = [
    '#9a9388', '#a8a194', '#928a7e', '#a6a094', '#9a9388',
    '#a8a194', '#9a9388', '#928a7e', '#b65a3e', '#b65a3e',
    '#b65a3e', '#9a9388', '#a8a194', '#928a7e', '#9a9388',
  ];
  const bh = c.height / bands.length;
  bands.forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.fillRect(0, i * bh, c.width, bh);
    /* warp lines on top */
    for (let x = 0; x < c.width; x += 6) {
      ctx.fillStyle = `rgba(0,0,0,${0.05 + (i % 2) * 0.04})`;
      ctx.fillRect(x, i * bh, 1, bh);
    }
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ———————————————————————————— interaction ———————————————————————————— */
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
let pointerDown = null;
let lastHoverId = null;

const hudLabel = document.getElementById('hudLabel');
const drawer = document.getElementById('drawer');
const drawerInner = document.getElementById('drawerInner');
const drawerClose = document.getElementById('drawerClose');

const labelMap = {
  easel: 'three bodies orbiting a lamp · oil',
  terminal: 'slowcompiler · in progress',
  synth: 'hum · pocket synthesizer',
  books: 'notebooks · three essays',
  loom: 'weft · jacquard loom + git',
  window: 'colophon · contact',
};

function setNDC(e) {
  const r = renderer.domElement.getBoundingClientRect();
  ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
  ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
}

function findPickedId() {
  raycaster.setFromCamera(ndc, camera);
  const hits = raycaster.intersectObjects(pickables, true);
  if (!hits.length) return null;
  let o = hits[0].object;
  while (o && !o.userData.id) o = o.parent;
  return o ? o.userData.id : null;
}

function onPointerMove(e) {
  setNDC(e);
  const id = findPickedId();
  if (id === lastHoverId) return;
  lastHoverId = id;
  if (id) {
    hudLabel.textContent = labelMap[id] || '';
    stage.classList.add('is-pointer');
  } else {
    hudLabel.textContent = '';
    stage.classList.remove('is-pointer');
  }
}

function onPointerDown(e) {
  pointerDown = { x: e.clientX, y: e.clientY };
}

function onPointerUp(e) {
  if (!pointerDown) return;
  const dx = e.clientX - pointerDown.x;
  const dy = e.clientY - pointerDown.y;
  pointerDown = null;
  if (Math.hypot(dx, dy) > 5) return; /* dragged, not clicked */
  setNDC(e);
  const id = findPickedId();
  if (id) openDrawer(id);
}

function openDrawer(id) {
  const e = ENTRIES[id];
  if (!e) return;
  drawerInner.innerHTML = `
    <p class="kicker">${e.kicker}</p>
    <h2>${e.title}</h2>
    ${e.body.map(p => `<p>${p}</p>`).join('')}
    ${e.dim ? `<p class="dim">${e.dim}</p>` : ''}
    ${e.meta ? `<div class="meta">${e.meta.map(m => `<span>${m}</span>`).join('')}</div>` : ''}
  `;
  drawer.setAttribute('aria-hidden', 'false');
  controls.autoRotate = false;
}

function closeDrawer() {
  drawer.setAttribute('aria-hidden', 'true');
  if (!reduceMotion) controls.autoRotate = true;
}

drawerClose.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDrawer();
});

renderer.domElement.addEventListener('pointermove', onPointerMove);
renderer.domElement.addEventListener('pointerdown', onPointerDown);
renderer.domElement.addEventListener('pointerup', onPointerUp);

/* pause auto-rotate while user is interacting */
controls.addEventListener('start', () => { controls.autoRotate = false; });

/* ———————————————————————————— resize ———————————————————————————— */
addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ———————————————————————————— render ———————————————————————————— */
function frame() {
  controls.update();
  /* tiny lamp-light flicker */
  const t = performance.now() * 0.001;
  lampLight.intensity = 13.6 + Math.sin(t * 1.7) * 0.25 + Math.sin(t * 4.3) * 0.15;
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
frame();
