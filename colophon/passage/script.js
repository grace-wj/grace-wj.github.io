// passage — vertical scroll drives a horizontal camera through a long handscroll.

(() => {
  'use strict';

  const SCENE_W = 8000;
  const STATIONS = [
    { x:  600, hour: 'dawn',      work: 'hum' },
    { x: 1900, hour: 'morning',   work: 'slowcompiler' },
    { x: 3200, hour: 'noon',      work: 'weft' },
    { x: 4500, hour: 'afternoon', work: 'three bodies, orbiting' },
    { x: 5800, hour: 'evening',   work: 'on stillness' },
    { x: 7200, hour: 'night',     work: 'letters' },
  ];
  const ROMANS = ['i', 'ii', 'iii', 'iv', 'v', 'vi'];

  const track = document.getElementById('track');
  const scene = document.getElementById('scene');
  const meterBar = document.getElementById('meterBar');
  const hudRoman = document.getElementById('hudRoman');
  const hudHour  = document.getElementById('hudHour');
  const hudWork  = document.getElementById('hudWork');

  let viewportW = window.innerWidth;
  let viewportH = window.innerHeight;
  let trackTop = 0;
  let trackHeight = 0;
  let scrollSpan = 0;
  let camMaxScroll = 0;
  let lastCamX = 0;
  let lastStationIdx = -1;

  function measure() {
    viewportW = window.innerWidth;
    viewportH = window.innerHeight;
    const r = track.getBoundingClientRect();
    trackTop = window.scrollY + r.top;
    trackHeight = track.offsetHeight;
    scrollSpan = trackHeight - viewportH; // amount of vertical scroll within the track
    camMaxScroll = SCENE_W - viewportW;
  }

  function onScroll() {
    const rel = (window.scrollY - trackTop) / scrollSpan;
    const t = Math.max(0, Math.min(1, rel));
    const camX = -t * camMaxScroll;
    if (Math.abs(camX - lastCamX) > 0.5) {
      scene.style.setProperty('--cam-x', camX.toFixed(1) + 'px');
      lastCamX = camX;
    }
    if (meterBar) meterBar.style.setProperty('--prog', (t * 100).toFixed(2) + '%');

    // determine current station: the one whose center is closest to viewport center in scene coords
    const cameraCenterInScene = -camX + viewportW * 0.5;
    let bestIdx = 0;
    let bestDist = Infinity;
    for (let i = 0; i < STATIONS.length; i++) {
      const d = Math.abs(STATIONS[i].x - cameraCenterInScene);
      if (d < bestDist) { bestDist = d; bestIdx = i; }
    }
    if (bestIdx !== lastStationIdx) {
      lastStationIdx = bestIdx;
      const s = STATIONS[bestIdx];
      hudRoman.textContent = ROMANS[bestIdx] + '.';
      hudHour.textContent  = s.hour;
      hudWork.textContent  = s.work;
    }
  }

  // throttle to rAF
  let ticking = false;
  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', () => {
    measure();
    requestUpdate();
  });

  // initial
  measure();
  requestUpdate();

  // a small affordance: pressing arrow keys / page keys scrolls the page (which moves camera)
  // browser default does this; we leave it alone.

})();
