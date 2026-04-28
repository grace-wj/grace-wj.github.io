# concept: studio

A small painter's room you can orbit. The portfolio **is** the still life on the desk.

## Axis of weirdness
**Spatial / atmospheric, in 3D.** Not a 2D pinboard, not a tree of pages — one rendered scene with a lamp, a window, and six objects, lit by a warm point light and a cool window light. You navigate by looking around, not by clicking through.

## What's in the room
- An **easel** with a small painting in oils — *three bodies orbiting a lamp*
- A **terminal** glowing green on the desk — slowcompiler
- A **pocket synth** with three brass knobs — hum
- A **stack of three notebooks** — three essays
- A **jacquard loom** in the corner with a half-finished scarf — weft
- A **window**, the cool light source — colophon and contact

## Try it
- **Drag** to orbit
- **Scroll / pinch** to zoom
- **Hover** an object — its label appears bottom-left
- **Click** — a drawer slides in with the writing
- The room slowly rotates on its own when you let go (respects `prefers-reduced-motion`)

## Why it works for Grace
A still life is the closest visual analogue to a polymath's life: many specific objects sharing a single light. It also lets the painting practice — which the other concepts can only point at — be *the surface* of the site, not a section inside it. The warm/cool tension of lamp vs. window is exactly the tension her oil paintings live in.

## Structural oddness
- One scene, one orbit, no pages — a 3D analogue of `marginalia`'s "no nav, just typography"
- Lighting carries the IA: the warm side is *making* (desk, terminal, synth, books, loom); the cool side is *looking* (window, colophon)
- The painting on the easel is **drawn procedurally** in a 2D `<canvas>` (figures + lamp pool + brushwork), then used as a three.js texture — not a static image, and easy to change
- The cloth on the loom is also procedural — fifteen weft bands, three of them red ("the week I rewrote slowcompiler's parser")
- Click a thing → drawer slides in from the right (bottom sheet on mobile)
- ~330 lines of JS, three.js r160 from a CDN, no build step, no framework

## Type
Fraunces (italic display) over Inter (sans labels). Fraunces because its high-contrast italic feels painted; Inter for the small uppercase HUD because it has to read at any zoom level without competing with the room.
