# concept: orrery

A small mechanical orrery for one polymath. Six of Grace's works orbit a central lamp on six different circular tracks. They don't wait to be clicked — they keep moving. **When two bodies cross at a node, a bell tolls** at the interval of their two pitches: an octave between *hum* and *on stillness*; a tritone between *slowcompiler* and *letters*; a perfect fifth between *weft* and *three bodies, orbiting*. Drag the camera to orbit. Click a body to read.

## Provenance
- From `concept/studio`: the entire 3D scene approach — drag-to-orbit camera, scroll-to-zoom, click-an-object → drawer-slides-in, idle auto-rotation, warm point-light at the center of the room. Repurposed: instead of a still life on a desk, the room is empty except for a lamp at the origin and bodies on circular tracks above it.
- From `concept/constellation`: the **typed-edge** logic — the verb on the line is the metadata. Repurposed: edges here are *orbital relations* (octave / fifth / tritone), and they fire when the geometry resolves them, not when you hover. The graph is alive; you don't navigate it, you witness it.
- From `concept/carillon`: the FM bell — eight-partial inharmonic synthesis, depth envelope dies in ~200 ms (the *ping*), amp envelope dies over ~6 s (the *singing*), 60 ms bandpass-noise burst (the clapper), synthesized stone-room convolver IR (~1.6 s). Audio gate (no sound until *begin*).
- From `concept/draft`: time-of-day reading from the local clock — `body[data-tod]` switches between *dawn / morning / midday / afternoon / evening / night* paper-and-light bundles. The room is darker at night; the lamp warmer in the afternoon.
- **New in this concept:** *physics-driven temporal events*. None of the parents have moments-as-content. The orrery does — a conjunction is the unit of meaning, a fact about the geometry that resolves itself in front of you. Time is the IA. The page tolls at no one.

## Axis of weirdness
**The page is alive, and you are not the cause.** Every other concept here either waits patiently (`marginalia`, `atelier`, `passage`) or responds *to* you (`signal`, `terminal`, `archive`). This one moves on its own and rings on its own. Sit and watch and the room makes events.

## Six bodies, six orbits
| roman | name                          | pitch | period | note                       |
|-------|-------------------------------|------:|-------:|----------------------------|
| i.    | hum                           |  C5   |  18 s  | smallest, fastest          |
| ii.   | slowcompiler                  |  G4   |  26 s  |                            |
| iii.  | weft                          |  E4   |  38 s  |                            |
| iv.   | three bodies, orbiting        |  D4   |  52 s  |                            |
| v.    | on stillness                  |  A3   |  75 s  |                            |
| vi.   | letters                       |  F3   | 110 s  | largest, slowest           |

Periods are deliberately not commensurable, so conjunctions are aperiodic — you can't catch them on a clock. The pitches are real notes; the intervals between any two are real intervals; the conjunctions are read as *a perfect fifth*, *a tritone*, *a major third*, &c.

## Try it
- **Drag** anywhere on the canvas — orbit the camera
- **Scroll / pinch** — zoom in or out
- **Hover** a body — its name and kind appear in the HUD
- **Click** a body — a drawer slides in with the writing
- **Begin** (bottom right) — turn the bells on. Nothing rings until you do.

## Why it works for Grace
The polymath problem is hard because the works are not in a hierarchy and not in a sequence — they are a *system*, with periods and conjunctions of their own. *Orrery* admits the system. The fact that *hum* and *on stillness* are an octave apart, and that the ear hears the pair as one event, is the truth: they argue the same thing — patience, attention to small things — at different orbital speeds. The orrery is, structurally, what *on stillness* says in prose.

## Structural oddness
- Orbits are evaluated as `phase + (t / period) × 2π`. Conjunction = angular agreement within ~3.4° (tolerance `0.06 rad`); per-pair cooldown 4 s.
- Bell pitch is mapped from each body's place in the work-set. The interval the visitor *hears* between two simultaneous strikes is the metadata — the verb on the edge.
- Each body has a distinct shape: an icosahedron (*hum*), a stack of three blocks (*slowcompiler*), a torus (*weft*), three small spheres in a triangle (*three bodies*), a slate (*on stillness*), an envelope (*letters*).
- Lamp is a `THREE.PointLight` (warm, distance-falloff 60 units, decay 1.6) with a small bright sphere at the origin and a thin halo that breathes.
- Idle for 2.2 s → camera resumes a slow `theta += 0.0009`/frame rotation.
- Time-of-day tints `--paper`, `--paper-2`, and `--warm` via six `body[data-tod="…"]` rule-bundles. The transition between bundles is 1500 ms.
- `prefers-reduced-motion`: orbits freeze, bells still ring on click but no auto-conjunctions.
- ~470 lines of JS, ~190 lines of CSS, three.js `r160` from a CDN, no build step, no framework.

## Type
**Cormorant Garamond** italic for body and the placard title — the same intimate italic Carillon used; this is its quiet sibling. **Cormorant SC** small caps for kickers, the HUD, and meta lines — small caps are the right register for a labeled mechanical instrument (orrery, sextant, astrolabe).

## What none of this is
- An *audio toy*. The bells are gated. They make rare events; you can sit silent.
- A *clock*. The orbital periods are dramatic, not real — *hum* is not literally on an 18-second period in the world.
- *Decoration over the studio*. Studio is a still life. This is the same kind of room, but emptied — the lamp and the bodies and the rule that makes them ring at each other.
