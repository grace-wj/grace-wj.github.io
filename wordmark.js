// Homepage masthead: a hand-lettered "grace juan" wordmark that morphs between
// designs on click/tap via an SVG displacement ("warp") transition.
//
// Affordances that it's clickable — all warp-based, no extra chrome:
//   - hover / keyboard focus: a gentle, living shimmer (the warp at low amplitude)
//   - shortly after load: one subtle wobble, so touch users (who never hover)
//     still get the "this is alive" hint.
// Every effect respects prefers-reduced-motion.
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

  // Mobile-only fit correction (consumed ONLY by the max-width:820px rule in
  // style.css; desktop computes transform:none, so its layout is untouched).
  // Each design sits differently inside the shared 0 0 1795 1311 viewBox, leaving
  // uneven top/left whitespace — invisible at desktop size, glaring full-bleed on
  // mobile. These per-design constants scale + shift the art tight into the
  // top-left so it fills the width. They're static geometry, so they're hardcoded
  // (not measured at runtime) — correct on first paint, no extra fetch, no race.
  //   s = viewBox.width / contentBBox.width    (scale to fill width)
  //   x = -contentBBox.x / viewBox.width  (%)  (pull the left gap off the edge)
  //   y = -contentBBox.y / viewBox.height (%)  (pull the top gap off the edge)
  // For a NEW design, run this in devtools with the SVG path reachable and record
  // the result here (order must match WORDMARKS):
  //   fetch(SRC).then(r=>r.text()).then(t=>{const s=new DOMParser()
  //     .parseFromString(t,'image/svg+xml').documentElement;
  //     s.style.cssText='position:absolute;left:-9999px;visibility:hidden';
  //     document.body.append(s);const v=s.viewBox.baseVal,b=s.getBBox();s.remove();
  //     console.log({s:+(v.width/b.width).toFixed(4),x:+(-b.x/v.width*100).toFixed(2),
  //     y:+(-b.y/v.height*100).toFixed(2)});});
  const FILLS = [
    { s: 1.0144, x: -0.92,  y: -3.60  },
    { s: 1.0939, x: -8.05,  y: -15.43 },
    { s: 1.0717, x: -6.02,  y: -11.21 },
    { s: 1.0872, x: -7.72,  y: -13.70 },
  ];

  const DURATION = 700;        // ms, full morph (out + in)
  const PEAK_SCALE = 90;       // max displacement at the midpoint

  const HOVER_SCALE = 11;      // resting displacement of the hover/focus shimmer
  const TEASE_SCALE = 16;      // peak of the one-time post-load wobble
  const TEASE_DURATION = 620;  // ms, that wobble
  const TEASE_DELAY = 900;     // ms after load before it fires

  const stage = document.getElementById('masthead');
  const img = document.getElementById('masthead-img');
  const disp = document.getElementById('wm-disp');
  const turb = document.getElementById('wm-turb');
  if (!stage || !img || !disp || !turb) return;

  // preload so the mid-morph swap is instant (the warp hides any decode hitch anyway)
  WORDMARKS.forEach((src) => { const p = new Image(); p.src = src; });

  // Set the mobile fit vars for design i (synchronous: correct on first paint).
  function applyFill(i) {
    const f = FILLS[i];
    if (!f) return;
    img.style.setProperty('--wm-fill-s', f.s);
    img.style.setProperty('--wm-fill-x', f.x + '%');
    img.style.setProperty('--wm-fill-y', f.y + '%');
  }

  let cur = Math.floor(Math.random() * WORDMARKS.length);   // random design on load
  img.src = WORDMARKS[cur];
  applyFill(cur);

  let animating = false;       // a morph or the load-tease currently owns the filter
  let hovering = false;        // pointer over / keyboard focus on the mark
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function pickNext() {
    return (cur + 1) % WORDMARKS.length;   // step through the cycle, in order
  }

  // ---- hover / focus shimmer ----------------------------------------------
  // The warp at low amplitude, kept subtly alive. Eases in while hovering and
  // out when you leave, then self-stops — no idle work once it's crisp at rest.
  let shimmerScale = 0;        // current eased displacement
  let shimmerRAF = 0;

  function shimmerLoop(now) {
    if (animating) { shimmerRAF = 0; return; }     // a morph/tease took over the filter
    const target = hovering ? HOVER_SCALE : 0;
    shimmerScale += (target - shimmerScale) * 0.18;

    if (!hovering && shimmerScale < 0.1) {         // settled back to crisp rest
      disp.setAttribute('scale', '0');
      img.style.filter = 'none';
      shimmerScale = 0;
      shimmerRAF = 0;
      return;
    }

    const breathe = 0.75 + 0.25 * Math.sin(now * 0.006);   // amplitude breathes
    const crawl = 0.012 + 0.004 * Math.sin(now * 0.004);   // noise field drifts
    disp.setAttribute('scale', (shimmerScale * breathe).toFixed(2));
    turb.setAttribute('baseFrequency', crawl.toFixed(4));
    img.style.filter = 'url(#wm-warp)';
    shimmerRAF = requestAnimationFrame(shimmerLoop);
  }

  function startShimmer() {
    if (animating || reduce.matches || shimmerRAF) return;
    shimmerRAF = requestAnimationFrame(shimmerLoop);
  }

  function setHover(state) {
    hovering = state;
    startShimmer();            // ramps the shimmer in, or lets the loop ease it out
  }

  // ---- click morph --------------------------------------------------------
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
        applyFill(to);
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
        applyFill(to);
        swapped = true;
      }

      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        disp.setAttribute('scale', '0');
        cur = to;
        animating = false;
        if (hovering) { shimmerScale = 0; startShimmer(); }  // ease back into the hover shimmer
        else img.style.filter = 'none';                      // crisp at rest
      }
    }
    requestAnimationFrame(frame);
  }

  // ---- one-time post-load wobble ------------------------------------------
  // A single low warp pulse so touch users (no hover) still see it's interactive.
  function teaseOnce() {
    if (animating || hovering || reduce.matches) return;
    animating = true;
    img.style.filter = 'url(#wm-warp)';
    turb.setAttribute('baseFrequency', '0.012');
    const start = performance.now();
    function step(now) {
      let p = (now - start) / TEASE_DURATION;
      if (p > 1) p = 1;
      disp.setAttribute('scale', (Math.sin(p * Math.PI) * TEASE_SCALE).toFixed(1));  // 0→peak→0
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        disp.setAttribute('scale', '0');
        animating = false;
        if (hovering) { shimmerScale = 0; startShimmer(); }
        else img.style.filter = 'none';
      }
    }
    requestAnimationFrame(step);
  }

  // <button> handles Enter/Space natively (fires click), so a click listener suffices.
  stage.addEventListener('click', morph);
  stage.addEventListener('mouseenter', () => setHover(true));
  stage.addEventListener('mouseleave', () => setHover(false));
  stage.addEventListener('focus', () => setHover(true));
  stage.addEventListener('blur', () => setHover(false));

  if (!reduce.matches) setTimeout(teaseOnce, TEASE_DELAY);
})();
