# concept: forme

A printer's **forme** — a metal frame holding type ready for press — viewed in 3D and rotated by hand. Six pieces of locked-up type, each a small body of work; click one and it lifts off the chase, then a riso-printed drawer of writing slides in beside you. The whole thing is held in `concept/press`'s palette and idiom.

> *Forme:* in a print shop, the chase + locked-up type ready to be put on the press. *Imposition* is the act of arranging the type into the forme.

## Provenance
- **Held from `concept/press`**: the two-color riso palette (fluorescent pink `#ff3a8c`, cornflower blue `#2c4dff`, warm black `#1a1410`, on a cream paper `#f3e9d2`); the paper grain stacked from radial-gradients; the SVG dot halftone applied to every type-piece face; the vertical edge marquee on the right; the registration-cross corners. Anton for the heavy display, Fraunces italic for the lede, Space Mono for the folios. Misregistration faked via a 2–3px text-shadow ghost on every headline.
- **Held from `concept/galley`**: the press-style HUD top-left (cream paper, warm-black 1px stroke, 4px hard drop-shadow, monospace caption, key-value lines). The drawer treatment for the lifted piece (slide-in from the right, pink masthead with a cyan misregistration ghost).
- **Drawn from `concept/studio` and `concept/orrery`**: the 3D **drag-orbit gesture**. Pointer-down captures the pointer; horizontal drag rotates the forme around its Y axis; vertical drag tilts around X (clamped ±85°); release applies a damped inertia; idle for 2.5 s and the forme breathes a slow drift. *Restyled flat:* implemented in CSS 3D rather than three.js so every face is a DOM element with the riso palette, halftone background, and Anton type baked into the markup — no lighting, no shadows, no specular, no perspective haze. Flatness is preserved by construction.
- **New in this variant**: *the riso aesthetic in 3D space*. The flatness of riso ink and the depth of a rotating chase usually fight each other; here they hold. Pieces of type are raised on the Z-axis above the chase plate, but every face is a 2D printed surface — when you tilt the forme, you read the type from above as flat ink, and you read the *gap* between the pieces as 3D shadow. The misregistration ghosts on each headline rotate with the type, so the print stays printed even when you spin the forme upside down.

## Axis of weirdness
**Print-as-object.** Every other riso surface here (`press`, `galley`, the upcoming variants) is a 2D piece of paper. This one is a 3D piece of metal you can pick up and turn. The information architecture is *physical*: a chase, six pieces, two pieces of furniture — a literal forme.

## Six pieces in the chase
- **hum** (003) — a synthesizer (pink)
- **slowcompiler** (009) — a compiler (cyan)
- **weft** (015) — a loom (warm-black)
- **three bodies, orbiting** (021) — paintings (pink)
- **on stillness** (027) — an essay (cyan)
- **letters** (032) — correspondence (warm-black)

The folios (003, 009, 015, 021, 027, 032) are real *Wei-li Press* signatures — each one the page on which that work would begin in a printed quire. The cyan and pink alternate the way a print shop alternates drums.

## Try it
- **Drag** anywhere on the scene — rotate the forme.
- **Click** a piece of type — it lifts off the chase and a drawer slides in from the right.
- **Esc** — close the drawer; the lifted piece returns to the forme.
- Idle for 2.5 s and the forme breathes a slow rotation; respects `prefers-reduced-motion`.

## Why it works for Grace
The polymath problem is that her works don't fit a hierarchy. A printer's forme is the analogue: a flat metal frame in which every piece sits next to every other piece at the same height, separated only by furniture. There is no parent-child; there is no nav. There is only the lockup. Press's two-color overprint gets to live in three dimensions here without losing the print-shop voice — the visitor reads the same kind of object they read in `press` and `galley`, but turns it in their hands.

## Structural oddness
- The 3D scene is plain CSS 3D: a `.scene` with `perspective: 1400px`, a `.forme` with `transform-style: preserve-3d`, child elements at `translate3d(x, y, 18px)` for raised type and `translate3d(0, 0, 8px)` for the chase frame.
- Every type-piece is a `<button>` so it's keyboard-focusable, screen-reader-readable, and click-handled by default. The 3D rotation is purely visual; the buttons remain a flat list of six in the DOM.
- A single `pointermove` updates two CSS variables (`--rx`, `--ry`); the forme's transform is a function of those variables. The damped-inertia + idle-breath drift uses `requestAnimationFrame`. ~150 lines of JS.
- The cyan italic in the title (*of locked-up type*) carries a 3px pink ghost as `text-shadow` — the same misregistration trick used on every type piece and on the drawer's drop-cap. Print stays printed even at runtime.
- The forme has a "title block" (`WEI-LI PRESS`) flush across the top, two pieces of "furniture" filling small empty spaces between type, and four chase bars cut at the corners — every metaphor a real print shop would have.
- ~210 lines of JS, ~290 lines of CSS, no framework, no library, no three.js.

## What none of this is
- A 3D toy. The rotation isn't decorative; it lets you read the lockup from any angle the way a working compositor would.
- A break from press/galley. Every visual element on the page is from press's register — palette, type, halftone, registration crosses, marquee, HUD. The frame is exactly the same; the *object inside the frame* is what changed.
- A copy of `concept/orrery`. Orrery has bodies on circular orbits; *forme* has type at fixed positions in a flat chase. Orrery is meditative; *forme* is craft. Orrery uses three.js with point-light shading; *forme* uses pure CSS 3D with no lighting whatsoever.

## Type
**Anton** for the type-pieces, the title, and the drawer headlines — the same condensed display Press uses for its mastheads.
**Fraunces** italic for the lede, the pull-quote, and the sub-tag on each piece — the literary voice that has to live inside the print-shop frame.
**Space Mono** for the HUD, the folios (003, 009, 015, …), the kicker, and the specs — the way a print shop labels its proofs.
