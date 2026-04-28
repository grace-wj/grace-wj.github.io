# concept: imprint

A constellation of works under the **Wei-li Press** imprint. Thirteen nodes — projects, paintings, essays, and influences — connected by twelve typed edges, each bearing the verb of the relation (`after`, `panel iii`, `voiced by`, `records`, `defends`). Every node is a halftone-shaded riso ink; every edge is a dashed cyan rule with a monospace verb caption. Drag a node and the rest of the imprint rearranges around it. Click for the writing.

> *Imprint:* the publisher's mark on a book; the line that says <em>which press cast this leaf</em>. Also: the impression an inked plate leaves on paper.

## Provenance
- **Held from `concept/press`**: the riso palette (fluorescent pink `#ff3a8c`, cornflower blue `#2c4dff`, warm black `#1a1410`, on cream `#f3e9d2`); the SVG dot halftone applied as a `<pattern>` overlay to every node; the paper grain stacked in radial-gradients on the body; the vertical edge marquee on the right; the registration-cross corners; Anton for the headlines, Fraunces italic for the lede, Space Mono for the captions and edge verbs; misregistration ghosts on every Anton headline (cyan ghost behind pink, pink ghost behind cyan).
- **Held from `concept/galley`**: the press-style HUD top-left (cream paper, warm-black 1px stroke, 4px hard drop-shadow, monospace caption); the side-panel slide-in for clicked nodes (pink Anton h2 with a cyan misregistration ghost, mono uppercase meta line, 2px pink rule above the *connected* list).
- **Drawn from `concept/constellation`**: the **node-and-edge interactivity** — a hand-rolled force simulation with 1/d² repulsion, soft springs (rest length 110 px, k = 0.06), per-cluster centre pull, brownian drift, damping 0.78. Drag any node and `pin` it under the cursor; release and it rejoins the system. Hover a node and its edges *light up* — the dashed pattern resolves to a solid stroke and the verb caption fades in. Click a node and a side panel opens with a *connected* list — every edge this node touches, with the verb on the line.
- **New in this variant**: the riso aesthetic *applied to a graph*. Constellation is rendered on a dark-navy starfield with glowing dots; *imprint* is the same machinery on cream paper with halftone ink and dashed cyan edges. The graph reads as a printed proof from a publisher — *which works, under which imprint, in what relation*. The *verb on the line* is still the metadata, but the line is now a piece of mono-set type.

## Axis of weirdness
**Print-as-diagram.** A diagram and a print object usually do not share a register — diagrams are clean, prints are inked. Here they do. The graph is composed in the press's voice: every node is a halftone face, every edge a dashed mono rule with a verb under the colon, and the whole thing is a riso imprint of one polymath's relations.

## Thirteen nodes, twelve edges
Three projects (*hum*, *slowcompiler*, *weft*), three paintings (*three bodies*, *annie at the kitchen sink*, *jia in november*), three essays (*on stillness*, *theory of kitsch*, *a year without frameworks*), four influences (*bashō*, *the ML family*, *jacquard cards*, *a borrowed kitchen*). The edges are the verbs: `slowcompiler` *after* `the ML family`; `weft` *after* `jacquard cards`; `on stillness` *defends* `bashō`; `three bodies, panel iii` is `annie at the kitchen sink`; `weft` *records* `slowcompiler` (the week of red threads); `hum` *voiced by* `bashō`. You read the press by reading the verbs.

## Try it
- **Drag** any node — the rest of the imprint rearranges.
- **Hover** a node — its edges light up; their verbs fade in.
- **Click** a node — a side panel opens with the writing and a *connected* list of every relation.
- **Esc** — close the panel.
- `prefers-reduced-motion` — the simulation runs once at load to settle, then stops. The graph is still readable; it just doesn't drift.

## Why it works for Grace
A polymath imprint *is* a graph — the works don't sit on a list, they reference each other and the things outside themselves that they came from. *imprint* is the publisher's catalogue admitted as that graph, and printed in the same ink as `press` and `galley` so the visitor reads the same kind of object. It is also the most legible answer to "where does this come from?" — the *after* and *voiced by* edges are the answer.

## Structural oddness
- ~330 lines of plain JS, ~290 lines of CSS, ~30 lines of inline SVG, no framework, no library.
- Force sim is hand-rolled (n = 13, n² is fine). Ports the same constants Constellation used (`REST = 110`, `K = 0.06`, `DAMP = 0.78`, brownian drift `±0.5`).
- Every node is a `<g class="node node--pink|cyan|black|ring">` with `tabindex="0"` for keyboard nav. The face is a circle with the riso ink color; a second circle on top is filled with `url(#halftone)` — a 3-px `<pattern>` of small darker circles. The same trick the press's spreads use, applied to a node.
- Every edge is a `<line>` with `stroke-dasharray: 6 3` (a cyan dashed rule); on hover, the dash resolves to solid and the `<text>` verb fades in. Same convention as constellation's edge labels but in mono caps with cyan fill.
- Cluster centres recompute on resize so the four kinds re-cluster for any viewport.
- The headline (`an imprint and what is under it`) carries a 2 px cyan ghost behind the pink Anton — same misregistration trick as Press's *GRACE WEI-LI JUAN* headline.
- The panel includes a *connected* list of every edge this node is in, with the verb on the line — exactly the way `concept/constellation` lays out its panel.

## Type
**Anton** for the title, the node labels, and the panel headline — same condensed display Press uses for its mastheads.
**Fraunces** italic for the lede and the panel body — the literary voice that has to live inside the print frame.
**Space Mono** for the kicker, the HUD, the edge verbs, the panel meta line, and the *connected* list — the way a print shop captions its proofs.

## What none of this is
- A network diagram. The verbs aren't categories; they're voice. `voiced by`, `panel iii`, `painted in` — the metadata of the work, not the kind of edge.
- A copy of `constellation`. Constellation is a starfield in the dark; imprint is a printed page in the day. The machinery is the same; the surface and the voice are entirely different.
- Decoration over the press idiom. Every visible element on the page comes from press's register — palette, type, halftone, registration crosses, marquee, HUD. The frame is exactly the same; the *content of the frame* is the relation map.
