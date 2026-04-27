// grace — archive: pan/zoom 2D canvas
(() => {
  "use strict";

  const world = document.getElementById("world");
  const viewport = document.getElementById("viewport");
  const help = document.getElementById("help");
  const mvp = document.getElementById("mvp");
  const minimapDot = document.querySelector(".minimap__dot");
  const minimap = document.getElementById("minimap");

  // camera state (world offset from viewport center, and scale)
  let tx = 0, ty = 0, scale = 1;
  const MIN = 0.35, MAX = 2.4;

  // extent of the world (approximate) for minimap
  const WORLD_W = 2800;
  const WORLD_H = 2600;

  function apply() {
    world.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    updateMinimap();
  }

  function updateMinimap() {
    // minimap shows the world [-WORLD_W/2, WORLD_W/2] × [-WORLD_H/2, WORLD_H/2] at the dot's center
    // current viewport center in world coords:
    const vx = -tx / scale;
    const vy = -ty / scale;
    const nx = (vx + WORLD_W / 2) / WORLD_W;
    const ny = (vy + WORLD_H / 2) / WORLD_H;
    minimapDot.style.setProperty("--x", Math.max(0, Math.min(1, nx)).toFixed(3));
    minimapDot.style.setProperty("--y", Math.max(0, Math.min(1, ny)).toFixed(3));

    // viewport rectangle in minimap
    const mw = minimap.clientWidth;
    const mh = minimap.clientHeight;
    const vpW = window.innerWidth / scale;
    const vpH = window.innerHeight / scale;
    const rectW = (vpW / WORLD_W) * mw;
    const rectH = (vpH / WORLD_H) * mh;
    mvp.style.width = rectW + "px";
    mvp.style.height = rectH + "px";
    mvp.style.left = (nx * mw - rectW / 2) + "px";
    mvp.style.top = (ny * mh - rectH / 2) + "px";
  }

  apply();

  // ----- drag to pan -----
  let dragging = false;
  let px = 0, py = 0;
  let pointers = new Map();
  let lastPinchDist = 0;

  viewport.addEventListener("pointerdown", (e) => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      dragging = true;
      px = e.clientX; py = e.clientY;
      viewport.classList.add("dragging");
      viewport.setPointerCapture(e.pointerId);
      hideHelp();
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      lastPinchDist = Math.hypot(a.x - b.x, a.y - b.y);
      dragging = false;
    }
  });

  viewport.addEventListener("pointermove", (e) => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (lastPinchDist > 0) {
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        zoomAt(d / lastPinchDist, midX, midY);
      }
      lastPinchDist = d;
      return;
    }

    if (dragging) {
      tx += e.clientX - px;
      ty += e.clientY - py;
      px = e.clientX; py = e.clientY;
      apply();
    }
  });

  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (pointers.size === 0) {
      dragging = false;
      viewport.classList.remove("dragging");
    } else {
      dragging = false;
    }
  }
  viewport.addEventListener("pointerup", endPointer);
  viewport.addEventListener("pointercancel", endPointer);
  viewport.addEventListener("pointerleave", endPointer);

  // ----- wheel to zoom (cursor-anchored) -----
  viewport.addEventListener("wheel", (e) => {
    e.preventDefault();
    const factor = Math.exp(-e.deltaY * 0.0015);
    zoomAt(factor, e.clientX, e.clientY);
    hideHelp();
  }, { passive: false });

  function zoomAt(factor, cx, cy) {
    const newScale = Math.max(MIN, Math.min(MAX, scale * factor));
    // keep (cx,cy) stable in world coords
    // world_at_cursor = (cx - (vw/2 + tx)) / scale
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const wx = (cx - vw / 2 - tx) / scale;
    const wy = (cy - vh / 2 - ty) / scale;
    scale = newScale;
    tx = cx - vw / 2 - wx * scale;
    ty = cy - vh / 2 - wy * scale;
    apply();
  }

  // ----- click item to focus/zoom -----
  world.addEventListener("click", (e) => {
    // only fire if not a drag-end
    const item = e.target.closest(".item");
    if (!item) return;
    if (item.classList.contains("title")) return;
    if (dragging) return;
    // don't hijack anchor clicks
    if (e.target.closest("a")) return;

    e.stopPropagation();

    // toggle focus
    if (item.classList.contains("focused")) {
      item.classList.remove("focused");
      world.classList.remove("focusing");
      return;
    }
    document.querySelectorAll(".item.focused").forEach((el) => el.classList.remove("focused"));
    item.classList.add("focused");
    world.classList.add("focusing");

    // ease to item position at scale ~1.3
    const x = parseFloat(item.style.getPropertyValue("--x")) || 0;
    const y = parseFloat(item.style.getPropertyValue("--y")) || 0;
    easeTo(-x, -y, 1.35);
  });

  // click background unfocuses
  viewport.addEventListener("click", (e) => {
    if (e.target === viewport || e.target === world) {
      document.querySelectorAll(".item.focused").forEach((el) => el.classList.remove("focused"));
      world.classList.remove("focusing");
    }
  });

  // ----- smooth ease-to -----
  let easing = false;
  function easeTo(targetTx, targetTy, targetScale, duration = 520) {
    easing = true;
    const startTx = tx, startTy = ty, startScale = scale;
    const start = performance.now();
    const vw = window.innerWidth / 2;
    const vh = window.innerHeight / 2;
    // targetTx/Ty are in "world offset so point is centered". Convert:
    // We want world coord (wx,wy) to land at (0,0) from viewport center => tx = -wx*scale
    const finalTx = targetTx * targetScale;
    const finalTy = targetTy * targetScale;
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad
      tx = startTx + (finalTx - startTx) * e;
      ty = startTy + (finalTy - startTy) * e;
      scale = startScale + (targetScale - startScale) * e;
      apply();
      if (t < 1) requestAnimationFrame(step);
      else easing = false;
    }
    requestAnimationFrame(step);
  }

  // ----- keyboard -----
  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    const step = 80;
    if (e.key === "ArrowLeft") { tx += step; apply(); }
    else if (e.key === "ArrowRight") { tx -= step; apply(); }
    else if (e.key === "ArrowUp") { ty += step; apply(); }
    else if (e.key === "ArrowDown") { ty -= step; apply(); }
    else if (e.key === "r" || e.key === "R") { easeTo(0, 0, 1); }
    else if (e.key === "+" || e.key === "=") { zoomAt(1.2, window.innerWidth / 2, window.innerHeight / 2); }
    else if (e.key === "-" || e.key === "_") { zoomAt(0.833, window.innerWidth / 2, window.innerHeight / 2); }
    else if (e.key === "Escape") {
      document.querySelectorAll(".item.focused").forEach((el) => el.classList.remove("focused"));
      world.classList.remove("focusing");
    }
    else return;
    hideHelp();
  });

  // fade help after first interaction
  let helpTimer = setTimeout(() => hideHelp(false), 7000);
  function hideHelp(hard = true) {
    clearTimeout(helpTimer);
    help.classList.add("fade");
  }

  window.addEventListener("resize", apply);
})();
