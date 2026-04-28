# Sixteen concepts, three rounds

Built in three rounds. The first two are *originals* — each weird on a different axis. The third (*remixes*) recombines parts of the originals into four new concepts whose center of gravity is its own.

## Round one (quiet, cerebral, restrained)

| branch | name | axis of weirdness | elevator |
|---|---|---|---|
| [`concept/terminal`](../../tree/concept/terminal) | **terminal** | input modality — *you type to navigate* | The site **is** a Unix shell. `ls`, `cd`, `cat`, `tree`, `display`. Tab-completion + history. CRT vignette + scanlines. |
| [`concept/archive`](../../tree/concept/archive) | **archive** | spatial — *no pages, just a plane* | Infinite 2D pinboard. Drag to pan, scroll to zoom, click to focus. Stickies, polaroids, handwritten arrows. |
| [`concept/marginalia`](../../tree/concept/marginalia) | **marginalia** | typographic hierarchy — *a critical edition of a person* | One manuscript leaf, body + two margins of glosses. Rubric headings, drop cap, blackletter title, works open as footnoted modal-leaves. |
| [`concept/signal`](../../tree/concept/signal) | **signal** | temporal / continuous param — *1D float as navigation* | 1970s hi-fi FM tuner (WGWJ 88.0–108.0). Drag dial, tune across stations, static between. S-meter, VU bars, numbers-station easter egg. |

## Round two (color, motion, first-glance impact)

| branch | name | axis of weirdness | elevator |
|---|---|---|---|
| [`concept/studio`](../../tree/concept/studio) | **studio** | spatial in 3D — *the portfolio is a still life* | A small painter's room rendered in three.js. Easel, desk, terminal, synth, books, loom, window. Drag to orbit; click an object — drawer slides in with the writing. |
| [`concept/press`](../../tree/concept/press) | **press** | aesthetic / maximalist — *a riso zine* | Six spreads of a fluorescent-pink-and-cornflower-blue zine. Real CMYK overprint via three stacked `mix-blend-mode: multiply` layers. Halftone dots as SVG patterns. Vertical edge marquee. No JS. |
| [`concept/constellation`](../../tree/concept/constellation) | **constellation** | diagrammatic / generative — *a knowledge graph with typed edges* | 23 stars connected by 23 typed edges (`after`, `defends`, `panel iii`). Hand-rolled force simulation; brownian drift so it never freezes. |
| [`concept/atelier`](../../tree/concept/atelier) | **atelier** | painterly — *a painter's notebook with a palette as nav* | The cover is an oil palette. Seven blobs of pigment are the navigation. Each scrolls to a study set in that pigment. |

## Round three (further originals — sound, generation, time, scroll)

| branch | name | axis of weirdness | elevator |
|---|---|---|---|
| [`concept/carillon`](../../tree/concept/carillon) | **carillon** | sound-led — *the page is incomplete until you ring it* | Six bells cast for one polymath. Click to strike; chord-by-pair; FM-synthesized partials, no audio files. Tenor on a rope tolls the quarter hour. |
| [`concept/emblem`](../../tree/concept/emblem) | **emblem** | generative — *one leaf per visit, URL-shareable seed* | A leaf from a never-published *Emblemata Gratiae* — Latin motto, engraved figure, English verse. mulberry32 PRNG; `?n=42` reproduces. |
| [`concept/draft`](../../tree/concept/draft) | **draft** | time-based — *the site composes itself in front of you* | A self-portrait drafted live with strikethroughs kept; marginal notes in vermilion at the moments the writer pauses. Time-of-day tints the paper. |
| [`concept/passage`](../../tree/concept/passage) | **passage** | cinematic / scroll-as-camera | A handscroll. Vertical scroll moves a horizontal camera across one studio at six lights of the day. Captions live on the painting. |

## Round four (remixes — recombined from the parts of the first twelve)

Each remix draws from at least three of the originals. The center of gravity is the *emergence*, not the sum.

| branch | name | drawn from | emergent property |
|---|---|---|---|
| [`concept/orrery`](../../tree/concept/orrery) | **orrery** | studio · constellation · carillon · draft | Six works on six orbits. When two cross at a node, a bell tolls. *Physics-driven temporal events* — the page rings at no one. |
| [`concept/galley`](../../tree/concept/galley) | **galley** | press · draft · emblem | A riso zine that prints itself in front of you, drum by drum. *Medium-as-performance* — the printing IS the page, not a loading screen. |
| [`concept/tideline`](../../tree/concept/tideline) | **tideline** | passage · atelier · archive · signal | A year of making, drawn as a tide chart. Pigment shifts with the month; needle marks today. *2D continuous-parameter chart* as IA. |
| [`concept/warp`](../../tree/concept/warp) | **warp** | atelier · draft · marginalia · press | Fifty-two weft rows, three of them red. *Textile-as-IA*: the site is what *weft* — Grace's git-driven loom — would produce in a year. |

## Reading the tree

```
main (foyer with sixteen doors)
 ├── concept/terminal      ↘
 ├── concept/archive        round one — quiet, cerebral
 ├── concept/marginalia
 ├── concept/signal        ↗
 ├── concept/studio        ↘
 ├── concept/press          round two — color, motion, density
 ├── concept/constellation
 ├── concept/atelier       ↗
 ├── concept/carillon      ↘
 ├── concept/emblem         round three — sound, generation, time, scroll
 ├── concept/draft
 ├── concept/passage       ↗
 ├── concept/orrery        ↘
 ├── concept/galley         round four — remixes, recombined from rounds 1–3
 ├── concept/tideline
 └── concept/warp          ↗
```

## Previewing locally

```bash
# the foyer (all sixteen doors, served from main):
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
git merge concept/<name>
git push
```

## What none of these are
- **Mutually exclusive.** `marginalia` + `signal` could cohabit a site; `warp` + `tideline` are siblings — both calendars, one as cloth, one as chart.
- **Locked in.** The copy is in the right voice but feel free to rewrite. The pigments in `atelier`, the stations in `signal`, the haikus in `slowcompiler` — all are placeholder-but-plausible.
