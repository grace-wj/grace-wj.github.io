# concept: passage

A personal site shaped like an **east-asian handscroll** (e-makimono): vertical scroll moves a horizontal camera across a single long illustration. From left to right we pass six stations of a working day — *dawn → morning → noon → afternoon → evening → night* — with one of Grace's works embedded in each scene. The studio is the same studio; the light is what changes.

## Axis of weirdness
**Cinematic / scroll-as-camera.** Most personal sites that use scroll do *scroll-jacking with confetti*: section snaps in, content explodes in. This one does the opposite — scroll is a quiet pan. The motion is one direction, restrained, and continuous; nothing snaps; nothing flies. You scroll through a year of light in one room.

## Six stations
| station | hour       | work                          |
|---------|------------|-------------------------------|
| i       | dawn       | *hum* — synthesizer           |
| ii      | morning    | *slowcompiler* — compiler     |
| iii     | noon       | *weft* — loom                 |
| iv      | afternoon  | *three bodies, orbiting a lamp* — paintings |
| v       | evening    | *on stillness* — essay        |
| vi      | night      | *letters* — correspondence    |

A small HUD in the top-left names the current station ("iv. afternoon · three bodies, orbiting"); a thin progress meter at the bottom shows where you are in the day. Captions inside the scene read like calligraphy on a real handscroll — they pan with the painting, not with the viewport.

## How the camera works
A tall `.track` element (720vh) holds a sticky `.camera` (full viewport). Inside the camera, the `.scene` is an 8000-pixel-wide stack of SVG layers — sky, far mountains, mid hills, ground, stations, captions. Vertical scroll progress (0 → 1) drives `--cam-x: translate3d(...)` on the scene, which moves the painting horizontally past the viewport.

```
trackHeight = 720vh    →  vertical scroll budget
sceneWidth  = 8000 px  →  horizontal pan budget
camX        = -progress × (8000 − viewportWidth)
```

No scroll hijacking. No `wheel` listeners. No snap. The default browser scroll just pans the camera.

## What's drawn
- A single horizontal **sky gradient** (12 stops): cool dawn → bright morning → midday → warm afternoon → orange-then-violet evening → deep blue night.
- A **sun** painted at five positions along its arc, plus a **rising moon** with stars on the night side.
- Two layers of **mountains** (far / mid) for parallax-without-parallax — they're inside the scene, so they pan with the camera at the same rate; the sense of distance comes from value contrast, not from differential speed.
- A **floor / earth strip** along the bottom, transitioning from warm wood (day) to deep blue (night).
- **Six station vignettes** drawn as inline SVG: a lit window with a synth on the sill; a desk with terminal-green code and a steaming mug; a jacquard loom with a half-woven scarf, three rows of red; an easel with a small oil of *three bodies, orbiting a lamp* and a palette; an armchair, framed picture, and floor lamp; a stair, mailbox, and an open notebook in moonlight.
- **Captions** in `<text>` elements set in Cormorant SC + Cormorant Garamond italic, positioned with each station so they pan with the painting.

## Why it works for Grace
A polymath portfolio is hard to navigate because it has no obvious order. *passage* gives it a natural one — *the day*. The works don't compete; they share a single unfolding light. It's also the most painted of the twelve concepts: a handscroll *is* a painting, and Grace is a painter; this is the door where the painting practice is the surface.

The metaphor — *the studio is the same studio* — is the literal claim of the scroll: one room, six lights. *On stillness*, in essay form, says the same thing.

## Affordances
- **Scroll** (mouse wheel, trackpad, page keys, arrow keys, scroll bar) — all map to camera pan.
- **Resize** — re-measures the track and adjusts the pan budget; mid-pan stays at the same fractional progress.
- **`prefers-reduced-motion`** — the cue arrow at the top stops bobbing; everything else is just scroll, so motion is exactly what the visitor produces.

## Structural oddness
- One sticky element + one CSS variable does all the camera work. `--cam-x` is the only thing that changes per scroll event; `transform: translate3d(var(--cam-x), 0, 0)` lifts it onto the GPU. ~80 lines of JS.
- Scene is 100% inline SVG over five stacked `<svg>` layers. No `<img>`, no canvas, no video, no external assets. Each station is a hand-written `<g>` of ~30–80 SVG primitives.
- The captions live inside the scene, not in the viewport, so they pan with the painting — a real handscroll's calligraphy is part of the cloth, not laid over it.
- The HUD updates by computing the scene-space center of the camera each frame and finding the nearest station. ~10 lines.
- ~80 lines of JS, ~200 lines of CSS, ~330 lines of inline SVG, no framework, no library.

## Type
**Cormorant Garamond** italic for the title, lede, captions, and HUD work names — long descenders, intimate italic; reads as painted on the painting. **Cormorant SC** (small caps) for the kicker, HUD station ("dawn · morning · noon …"), and roman numeral — small caps are the right register for a brief, civic label. No third face.
