// quire — eight riso leaves stitched horizontally; vertical scroll moves a horizontal camera (passage convention).

const track  = document.getElementById('track');
const camera = track.querySelector('.camera');
const quire  = document.getElementById('quire');
const indicator = document.getElementById('leafIndicator');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const LEAF_COUNT = 8;
const GUTTER_PX = 32;

function viewportW() { return window.innerWidth; }

// pan budget: total scrollable horizontal distance
function quireWidth() {
  return LEAF_COUNT * viewportW() + (LEAF_COUNT - 1) * GUTTER_PX;
}
function panBudget() {
  return Math.max(1, quireWidth() - viewportW());
}

function setQuireWidth() {
  quire.style.width = `${quireWidth()}px`;
}

function setCam(x) {
  quire.style.setProperty('--cam-x', `${x}px`);
}

function onScroll() {
  const r = track.getBoundingClientRect();
  const total = r.height - window.innerHeight;
  const scrolled = -r.top;
  const p = Math.max(0, Math.min(1, scrolled / total));
  setCam(-p * panBudget());
  // update indicator: which leaf is closest to viewport centre
  const cx = -(-p * panBudget()) + viewportW() / 2;     // scene-space x at camera centre
  // scene-space x is just (cam-x's negation + viewport centre)
  // each leaf occupies [i*(viewportW + GUTTER), i*(viewportW + GUTTER) + viewportW]
  const idx = Math.round(cx / (viewportW() + GUTTER_PX));
  setActiveLeaf(Math.max(0, Math.min(LEAF_COUNT - 1, idx)));
}

let activeIdx = -1;
function setActiveLeaf(i) {
  if (i === activeIdx) return;
  activeIdx = i;
  indicator.querySelectorAll('li').forEach((li, j) => {
    li.classList.toggle('is-active', j === i);
  });
}

setQuireWidth();
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', () => { setQuireWidth(); onScroll(); });
onScroll();
