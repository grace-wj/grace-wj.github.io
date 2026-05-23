// Homepage masthead: a hand-lettered "grace juan" wordmark that morphs between
// designs on click/tap via an SVG displacement ("warp") transition.
//
// Adding a new design: give it the same viewBox as the others ("0 0 1795 1311")
// so it stays aligned, then add its path to WORDMARKS below. (Source art is
// hand-lettered at 2160x1620, cropped to the shared union box, traced to SVG.)
(function () {
  const WORDMARKS = [
    '/wordmarks/wordmark-1.svg',
    '/wordmarks/wordmark-2.svg',
    '/wordmarks/wordmark-3.svg',
    '/wordmarks/wordmark-4.svg',
  ];

  const DURATION = 700;        // ms, full morph (out + in)
  const PEAK_SCALE = 90;       // max displacement at the midpoint

  const stage = document.getElementById('masthead');
  const img = document.getElementById('masthead-img');
  const disp = document.getElementById('wm-disp');
  const turb = document.getElementById('wm-turb');
  if (!stage || !img || !disp || !turb) return;

  // preload so the mid-morph swap is instant (the warp hides any decode hitch anyway)
  WORDMARKS.forEach((src) => { const p = new Image(); p.src = src; });

  let cur = Math.floor(Math.random() * WORDMARKS.length);   // random design on load
  img.src = WORDMARKS[cur];

  let animating = false;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function pickNext() {
    let to = Math.floor(Math.random() * (WORDMARKS.length - 1));
    if (to >= cur) to++;       // uniformly random, never the current one
    return to;
  }

  function morph() {
    if (animating || WORDMARKS.length < 2) return;
    animating = true;
    const to = pickNext();

    // reduced-motion: skip the warp, do a quick clean crossfade
    if (reduce.matches) {
      img.style.transition = 'opacity .18s ease';
      img.style.opacity = '0';
      setTimeout(() => {
        img.src = WORDMARKS[to];
        img.style.opacity = '1';
        cur = to;
        setTimeout(() => { img.style.transition = ''; animating = false; }, 180);
      }, 180);
      return;
    }

    const start = performance.now();
    let swapped = false;
    img.style.filter = 'url(#wm-warp)';

    function frame(now) {
      let p = (now - start) / DURATION;
      if (p > 1) p = 1;
      const peak = 1 - Math.abs(p - 0.5) * 2;        // 0 at ends, 1 at middle
      disp.setAttribute('scale', (peak * PEAK_SCALE).toFixed(1));
      turb.setAttribute('baseFrequency', (0.008 + peak * 0.02).toFixed(4));

      if (!swapped && p >= 0.5) {                    // swap under maximum distortion
        img.src = WORDMARKS[to];
        swapped = true;
      }

      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        disp.setAttribute('scale', '0');
        img.style.filter = 'none';                   // crisp at rest
        cur = to;
        animating = false;
      }
    }
    requestAnimationFrame(frame);
  }

  // <button> handles Enter/Space natively (fires click), so a click listener suffices.
  stage.addEventListener('click', morph);
})();
