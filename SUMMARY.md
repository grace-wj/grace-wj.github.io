# Twenty concepts, five rounds

Built across five rounds. The first three are *originals*; the fourth is *remixes* (recombined from parts of the originals); the fifth is the **press family** — variants of `press`/`galley` that hold the riso visual frame and explore different interactions.

## Round one (quiet, cerebral, restrained)

| branch | name | axis of weirdness | elevator |
|---|---|---|---|
| [`concept/terminal`](../../tree/concept/terminal) | **terminal** | input modality | The site **is** a Unix shell. `ls`, `cd`, `cat`, `tree`, `display`. Tab-completion + history. CRT vignette + scanlines. |
| [`concept/archive`](../../tree/concept/archive) | **archive** | spatial — *no pages, just a plane* | Infinite 2D pinboard. Drag to pan, scroll to zoom. |
| [`concept/marginalia`](../../tree/concept/marginalia) | **marginalia** | typographic hierarchy | One manuscript leaf, body + two margins of glosses. |
| [`concept/signal`](../../tree/concept/signal) | **signal** | continuous parameter | 1970s hi-fi FM tuner. Drag dial; ±0.3 lock-in. |

## Round two (color, motion, first-glance impact)

| branch | name | axis of weirdness | elevator |
|---|---|---|---|
| [`concept/studio`](../../tree/concept/studio) | **studio** | spatial in 3D | A small painter's room rendered in three.js. Drag to orbit. |
| [`concept/press`](../../tree/concept/press) | **press** ★ | aesthetic / maximalist | A risograph zine — the visual anchor of the press family. |
| [`concept/constellation`](../../tree/concept/constellation) | **constellation** | diagrammatic / generative | 23 stars connected by 23 typed edges. Hand-rolled force sim. |
| [`concept/atelier`](../../tree/concept/atelier) | **atelier** | painterly | The cover is an oil palette; seven blobs of pigment are the navigation. |

## Round three (sound, generation, time, scroll)

| branch | name | axis of weirdness | elevator |
|---|---|---|---|
| [`concept/carillon`](../../tree/concept/carillon) | **carillon** | sound-led | Six FM-synthesized bells. |
| [`concept/emblem`](../../tree/concept/emblem) | **emblem** | generative | One leaf per visit — Latin motto, engraved figure, English verse. URL seed `?n=`. |
| [`concept/draft`](../../tree/concept/draft) | **draft** | time-based | A self-portrait drafted live with strikethroughs kept. |
| [`concept/passage`](../../tree/concept/passage) | **passage** | scroll-as-camera | A handscroll. Vertical scroll moves a horizontal camera across a single painting. |

## Round four (remixes — recombined from rounds 1–3)

| branch | name | drawn from | emergent property |
|---|---|---|---|
| [`concept/orrery`](../../tree/concept/orrery) | **orrery** | studio · constellation · carillon · draft | Six works on six orbits. Conjunctions toll bells. |
| [`concept/galley`](../../tree/concept/galley) | **galley** ★ | press · draft · emblem | A riso zine that prints itself. Anchor of the press family. |
| [`concept/tideline`](../../tree/concept/tideline) | **tideline** | passage · atelier · archive · signal | A year, drawn as a tide chart. |
| [`concept/warp`](../../tree/concept/warp) | **warp** | atelier · draft · marginalia · press | Fifty-two weft rows, three of them red. |

## Round five (the press family — variants of `press`/`galley`)

The owner identified `press`/`galley`'s **visual** aesthetic as the strongest hit. Round five holds that visual frame across four variants, each with a different interaction.

| branch | name | feature donor | what the visitor does |
|---|---|---|---|
| [`concept/forme`](../../tree/concept/forme) | **forme** | studio / orrery (3D drag-orbit) | Drags a 3D printer's forme of locked-up type to read it from any angle. CSS 3D — flat by construction. |
| [`concept/imprint`](../../tree/concept/imprint) | **imprint** | constellation (force sim, typed edges) | Drags halftone-shaded riso nodes; reads dashed-cyan edges with mono verbs; clicks for a connected list. |
| [`concept/colophon`](../../tree/concept/colophon) | **colophon** | signal (dial, S-meter, ±0.3 lock-in) | Tunes a printed dial across seven stations; off channel, the card drops to halftone static. |
| [`concept/quire`](../../tree/concept/quire) | **quire** | passage / tideline (scroll-as-camera) | Scrolls down to pan east across eight stitched riso leaves. |

★ = anchor of the press family (also clustered in the foyer's centerpiece).

## Reading the tree

```
main (foyer with twenty doors — press-family centerpiece + two wings)
 ├── press family (centerpiece): press, galley, forme, imprint, colophon, quire
 ├── eleven originals (wing): terminal, archive, marginalia, signal,
 │                             studio, constellation, atelier,
 │                             carillon, emblem, draft, passage
 └── three remixes (wing):     orrery, tideline, warp
```

## Previewing locally

```bash
# the foyer (all twenty doors, served from main):
python3 -m http.server 8000
# then open http://localhost:8000

# or a single concept:
git checkout concept/<name>
python3 -m http.server 8000
```

## Publishing one of them

```bash
git checkout main
git merge concept/<name>
git push
```
