# Eight concepts, eight branches

Built in two rounds. Each concept is weird on a **different axis** so they can't collapse into variations of the same idea.

## Round one (quiet, cerebral, restrained)

| branch | name | axis of weirdness | elevator | ~LOC |
|---|---|---|---|---|
| [`concept/terminal`](../../tree/concept/terminal) | **terminal** | input modality — *you type to navigate* | The site **is** a Unix shell. `ls`, `cd`, `cat`, `tree`, `display`. Tab-completion + history. CRT vignette + scanlines. | ~750 |
| [`concept/archive`](../../tree/concept/archive) | **archive** | spatial — *no pages, just a plane* | Infinite 2D pinboard. Drag to pan, scroll to zoom, click to focus. Stickies, polaroids, handwritten arrows. | ~700 |
| [`concept/marginalia`](../../tree/concept/marginalia) | **marginalia** | typographic hierarchy — *a critical edition of a person* | One manuscript leaf, body + two margins of glosses. Rubric headings, drop cap, blackletter title, works open as footnoted modal-leaves. | ~600 |
| [`concept/signal`](../../tree/concept/signal) | **signal** | temporal / continuous param — *1D float as navigation* | 1970s hi-fi FM tuner (WGWJ 88.0–108.0). Drag dial, tune across stations, static between. S-meter, VU bars, numbers-station easter egg. | ~930 |

## Round two (color, motion, first-glance impact)

| branch | name | axis of weirdness | elevator | ~LOC |
|---|---|---|---|---|
| [`concept/studio`](../../tree/concept/studio) | **studio** | spatial in 3D — *the portfolio is a still life* | A small painter's room rendered in three.js. Easel, desk, terminal, synth, books, loom, window. Drag to orbit; click an object — drawer slides in with the writing. Auto-rotates when idle. | ~700 |
| [`concept/press`](../../tree/concept/press) | **press** | aesthetic / maximalist — *a riso zine* | Six spreads of a fluorescent-pink-and-cornflower-blue zine. Real CMYK overprint via three stacked `mix-blend-mode: multiply` layers. Halftone dots as SVG circle patterns. Vertical edge marquee. No JS. | ~700 |
| [`concept/constellation`](../../tree/concept/constellation) | **constellation** | diagrammatic / generative — *a knowledge graph with typed edges* | 23 stars (projects, essays, paintings, practices, influences) connected by 23 typed edges (`after`, `defends`, `panel iii`). Hand-rolled force simulation; brownian drift so it never freezes. Drag a star, the rest follows. | ~800 |
| [`concept/atelier`](../../tree/concept/atelier) | **atelier** | painterly — *a painter's notebook with a palette as nav* | The cover is an oil palette. Seven blobs of pigment (cadmium red, naples yellow, ultramarine, burnt sienna, terre verte, alizarin, lead white) are the navigation. Each scrolls to a study set in that pigment. | ~700 |

## Reading the tree

```
main (foyer with eight doors)
 ├── concept/terminal      ↘
 ├── concept/archive        round one — quiet, cerebral
 ├── concept/marginalia     monochromatic palettes, restrained interactivity
 ├── concept/signal        ↗
 ├── concept/studio        ↘
 ├── concept/press          round two — color, motion, density
 ├── concept/constellation  fluorescent / 3D / animated / painted
 └── concept/atelier       ↗
```

Each branch is a full self-contained site (`index.html` + `style.css` + `script.js` + a branch-specific `README.md`). No build step, no framework. External libraries: three.js (studio only) loaded as a CDN ES module via `importmap`; Google Fonts (archive, marginalia, signal, press, constellation, atelier).

## Previewing locally

```bash
# the foyer (all eight doors, served from main):
python3 -m http.server 8000
# then open http://localhost:8000

# or a single concept:
git checkout concept/<name>
python3 -m http.server 8000
```

## Publishing one of them

GitHub Pages is configured to serve from `main`. To promote a concept:

```bash
git checkout main
git merge concept/<name>    # fast-forward or real merge, your choice
git push
```

Or cherry-pick the commit if you only want some files.

## What none of these are
- **A framework decision.** All eight use plain HTML/CSS/JS. If you pick one and want to rebuild it in React/Svelte/etc., that's a different conversation.
- **Mutually exclusive.** `marginalia` + `signal` could cohabit a site (long-form page + tuner landing). `studio` + `atelier` share painting-practice DNA but read very differently — one is atmospheric and 3D, the other is hand-drawn and notational.
- **Locked in.** The copy is in the right voice but feel free to rewrite. The pigments in `atelier`, the stations in `signal`, the haikus in `slowcompiler` — all are placeholder-but-plausible.
