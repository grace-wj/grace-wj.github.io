# concept: constellation

A personal site shaped like a **knowledge graph** of the things Grace makes, reads, and is influenced by. Drag a star, the rest of the constellation follows. Click to read.

## Axis of weirdness
**Diagrammatic + generative.** No pages, no IA tree — twenty-three stars connected by twenty-three typed edges (`after`, `defends`, `worn in`, `panel iii`, `written in`). The layout is run by a small force simulation in the browser, so the constellation finds a slightly different arrangement on every visit. Continuous brownian drift means the stars never freeze.

## Five kinds of star
Color encodes category:
- **amber** — projects (hum, slowcompiler, weft)
- **rose** — essays (on stillness, theory of kitsch, a year without frameworks)
- **lavender** — paintings (three bodies orbiting a lamp, annie at the kitchen sink, jia in november)
- **mint** — practices (oil painting, weaving, compiler-writing, web audio, prose)
- **pale blue** — influences (Bashō, the ML family, ceramic geese, jacquard cards, Maine, Bergen St., November)

## How it moves
- **Force simulation**: each pair of stars repels (Coulomb-ish, `1/d²`), each edge is a soft spring resting at 110 px, each star is gently pulled toward its category's cluster center. Damping `0.78`.
- **Brownian drift**: tiny random force every frame. The constellation never settles completely — exactly like a slow musical drone.
- **Drag**: pointer-down on a star pins it under your cursor; the rest of the graph reorganizes around it. Release to let it rejoin the system.
- **Hover**: edges connecting the hovered star light up; their relationship labels (`after`, `voiced by`, `panel iii`) appear inline.
- **Click**: side panel slides in with the writing in Grace's voice and a "connected" list of every star this one touches, with the relationship verb.
- **Reduced motion**: simulation runs once at load to settle, then stops. The constellation is still readable; it just doesn't drift.

## Why it works for Grace
A polymath portfolio is *literally* a graph. Code, looms, paintings, essays, and influences live in the same head and reference each other; flattening them into "projects | writing | art" tabs is a lie about how the work actually relates. The graph admits the truth — `slowcompiler` and `on stillness` are adjacent because both are about <em>patience</em>; `weft` and the ML family are adjacent because both involve a small grammar producing an ordered sequence.

## Structural oddness
- ~310 lines of plain JS, ~250 lines of CSS, no framework, no library.
- Force simulation is hand-rolled (n=23, n² is fine).
- Edges are typed and labeled — the *verb* is the metadata, not just the existence of a line.
- Cluster centers are recomputed on resize, so the graph re-organizes for any viewport.
- 25-node static starfield in the background painted via stacked `radial-gradient`s — no canvas, no img.
- The side panel ends with "connected" — every relationship this star is in, with direction and verb.

## Type
**Fraunces** italic for everything readable — node labels, panel body, edge labels — chosen because the italic is intimate and the high-contrast face survives at small sizes against a deep navy. **Inter** for the small uppercase HUD (legend, kicker), because it has to read at any zoom and never compete with the stars.
