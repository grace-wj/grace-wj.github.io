// forme — a 3D drag-orbit gesture, restyled flat in the riso aesthetic.
// the forme of locked-up type sits in CSS-3D space; rotateX/Y are driven by drag.

const scene  = document.getElementById('scene');
const forme  = document.getElementById('forme');
const angle  = document.getElementById('angle');

let rx = -45, ry = -15;     // current angles, degrees
let vx = 0, vy = 0;         // velocities for inertia after release
let isDragging = false;
let dragStart = null;
let lastInputT = performance.now();
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function applyRotation() {
  forme.style.setProperty('--rx', `${rx}deg`);
  forme.style.setProperty('--ry', `${ry}deg`);
  angle.textContent = `θ ${ry|0}° · φ ${rx|0}°`;
}
applyRotation();

scene.addEventListener('pointerdown', (e) => {
  // ignore drags that start on a type-piece button — those are clicks, not drags
  if (e.target.closest('.type--piece')) return;
  isDragging = true;
  forme.classList.add('is-dragging');
  dragStart = { x: e.clientX, y: e.clientY, rx, ry };
  scene.setPointerCapture(e.pointerId);
});
scene.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const dx = (e.clientX - dragStart.x);
  const dy = (e.clientY - dragStart.y);
  const newRy = dragStart.ry + dx * 0.4;
  const newRx = Math.max(-85, Math.min(85, dragStart.rx + dy * 0.4));
  vx = (newRx - rx);
  vy = (newRy - ry);
  rx = newRx;
  ry = newRy;
  applyRotation();
  lastInputT = performance.now();
});
scene.addEventListener('pointerup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  forme.classList.remove('is-dragging');
  try { scene.releasePointerCapture(e.pointerId); } catch (_) {}
});
scene.addEventListener('pointercancel', () => {
  isDragging = false;
  forme.classList.remove('is-dragging');
});

// gentle inertia + auto-rotation when idle (~2.5s)
function tick(now) {
  if (!isDragging && !reduceMotion) {
    // damp velocity
    vx *= 0.92;
    vy *= 0.92;
    if (Math.abs(vx) > 0.02 || Math.abs(vy) > 0.02) {
      rx = Math.max(-85, Math.min(85, rx + vx * 0.08));
      ry = ry + vy * 0.08;
      applyRotation();
    } else if (now - lastInputT > 2500) {
      // gentle idle drift — small breathing rotation
      ry += 0.06;
      applyRotation();
    }
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

// ─────────────────────────────────────────────────────────
// type pieces — click → lift + drawer
// ─────────────────────────────────────────────────────────
const PIECES = {
  hum: {
    name: 'hum',
    sub: 'a synthesizer',
    folio: '003',
    body:
      `<p class="quote">For people who cannot read music.</p>
       <p>You hum into it; it gives you back a small song it thinks you meant. Rust + WebAudio. About four thousand two hundred lines, in quiet beta.</p>
       <p>Around a hundred and twenty weekly users, most of whom cannot read music. The shower-mode patch is the most-used.</p>
       <p class="specs">stock · linen finished cream<br/>colors · pink · cyan · warm black<br/>folio · 003 · pulled in browser</p>`,
  },
  slowcompiler: {
    name: 'slowcompiler',
    sub: 'a compiler',
    folio: '009',
    body:
      `<p class="quote">Thirty seconds per <em>hello world.</em></p>
       <p>A compiler that takes exactly thirty seconds to compile <em>hello world</em>, and prints a haiku at every pass of the pipeline.</p>
       <p>Lex, parse, type, lower, emit. The haiku for <em>parse</em> begins: <em>at last, the small tree / drops its leaves into a list / and a list, and a list.</em></p>
       <p class="specs">stock · linen finished cream<br/>colors · pink · cyan · warm black<br/>folio · 009 · pulled in browser</p>`,
  },
  weft: {
    name: 'weft',
    sub: 'a loom',
    folio: '015',
    body:
      `<p class="quote">One thread per commit. One scarf per orbital year.</p>
       <p>A physical jacquard loom, a Raspberry Pi, and a git hook. The week the parser of <em>slowcompiler</em> was rewritten left three days of red thread; you can see it on the cloth.</p>
       <p class="specs">stock · linen finished cream<br/>colors · pink · cyan · warm black<br/>folio · 015 · pulled in browser</p>`,
  },
  'three-bodies': {
    name: 'three bodies, orbiting',
    sub: 'paintings',
    folio: '021',
    body:
      `<p class="quote">A kettle, three figures, one warm pool of light.</p>
       <p>An eight-panel oil series. Painted on long autumn afternoons; the light went from warm to cold and the painting followed it. Shown briefly in a borrowed window on Bergen Street.</p>
       <p class="specs">stock · linen finished cream<br/>colors · pink · cyan · warm black<br/>folio · 021 · pulled in browser</p>`,
  },
  'on-stillness': {
    name: 'on stillness',
    sub: 'an essay',
    folio: '027',
    body:
      `<p class="quote">Finished is the wrong unit.</p>
       <p>An essay on the question of when a thing is finished. The argument is that finished is the wrong unit. Reads like a long letter; has been written for two years and may continue to be.</p>
       <p class="specs">stock · linen finished cream<br/>colors · pink · cyan · warm black<br/>folio · 027 · pulled in browser</p>`,
  },
  letters: {
    name: 'letters',
    sub: 'correspondence',
    folio: '032',
    body:
      `<p class="quote">Replies will be slow and, when they come, longer than they should be.</p>
       <p>Slow correspondence in the post. Comes in at the shallows in November like the first weather of the year. Letter is the right unit of attention.</p>
       <p class="specs">stock · linen finished cream<br/>colors · pink · cyan · warm black<br/>folio · 032 · pulled in browser</p>`,
  },
};

const drawer = document.getElementById('drawer');
const drawerContent = document.getElementById('drawerContent');

function openPiece(id) {
  const p = PIECES[id];
  if (!p) return;
  // unlift any other piece, lift this one
  document.querySelectorAll('.type--piece.is-lifted').forEach(el => {
    if (el.dataset.piece !== id) el.classList.remove('is-lifted');
  });
  const el = document.querySelector(`.type--piece[data-piece="${id}"]`);
  if (el) el.classList.add('is-lifted');

  drawerContent.innerHTML = `
    <h2>${p.name}</h2>
    <p class="meta">${p.sub} · folio ${p.folio}</p>
    ${p.body}
  `;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
}
function closeDrawer() {
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  document.querySelectorAll('.type--piece.is-lifted').forEach(el => el.classList.remove('is-lifted'));
}

document.querySelectorAll('.type--piece').forEach(el => {
  el.addEventListener('click', () => openPiece(el.dataset.piece));
});
document.getElementById('drawerClose').addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDrawer();
});
