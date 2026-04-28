# concept: colophon

A printer's **colophon** — the line at the back of a book that names who set it — staged as a riso-printed FM tuning dial. Seven stations (six works of *Wei-li Press* plus the colophon itself, at 106.9). Drag the needle along the dial; lock onto any station within ±0.3 MHz and the spread reads. Off channel, the printed card goes to halftone static.

> *Colophon:* the imprint at the end of a book that names the type, paper, and compositor. Also: WGWJ, Grace's first call sign, used here as the publisher's mark.

## Provenance
- **Held from `concept/press`**: the riso palette (fluorescent pink `#ff3a8c`, cornflower blue `#2c4dff`, warm black `#1a1410`, on cream `#f3e9d2`); paper grain stacked from radial-gradients; halftone dot patterns rendered as CSS radial-gradients on the meter, the dial scale, and every face of the printed card; the vertical edge marquee on the right; the registration-cross corners; Anton for headlines, Fraunces italic for the lede, Space Mono for the dial numbers and the meter readouts.
- **Held from `concept/galley`**: the press-style HUD chrome — every panel uses a 1px warm-black stroke + a 4px hard drop-shadow on cream. The card has a folio line in mono caps, a pink Anton headline with a cyan misregistration ghost, an italic sub, body in Fraunces, and a 2px pink rule above a mono specs block. Same set of conventions Galley uses for its zine spread.
- **Drawn from `concept/signal`**: **the dial as IA**. The horizontal scale `88.0–108.0 MHz`, major and minor ticks, mono numbers every 2 MHz, station markers as cyan vertical bars with a uppercase-mono name above them, a needle that drags with the pointer, scrolls with the wheel, and arrow-keys with ±0.1 / ±1.0. **±0.3 MHz lock-in tolerance** — exactly the same lock-in signal used. An S-meter (here halftone-dotted) widens to indicate signal strength; off channel, the card's interior dims and a halftone-static overlay drops on top.
- **New in this variant**: *the dial restyled flat in riso*. Signal's dial reads as brushed metal with amber-glow CRT and red-LED needle. Colophon's dial reads as ink on cream paper — pink tick-marks with the underprint showing through, a cyan needle with a pink misregistration ghost, mono numbers letterpressed onto the scale. The instrument is the same; the medium has changed from electronics to print.

## Axis of weirdness
**A continuous-parameter colophon.** A book's colophon is normally a single fixed paragraph — *set in type X, printed at press Y*. Here it is a *band* you can tune across, and the colophon proper is the last station on the dial (`106.9`). The visitor finds the back of the book by tuning into it.

## Seven stations
| MHz   | folio | name             | kind                |
|-------|-------|------------------|---------------------|
| 89.7  | 003   | hum              | a synthesizer       |
| 92.1  | 009   | slowcompiler     | a compiler          |
| 95.3  | 015   | weft             | a loom              |
| 98.5  | 021   | three bodies     | paintings           |
| 101.7 | 027   | on stillness     | an essay            |
| 104.3 | 032   | letters          | correspondence      |
| 106.9 | 037   | colophon         | this page           |

The folios are *Wei-li Press* signatures — each the page on which that work would begin in a printed quire. The colophon itself ships at 106.9 because it is at the back of the book.

## Try it
- **Drag** anywhere on the dial — the needle follows the pointer.
- **Scroll** over the dial — fine tuning. Hold the mouse-wheel for big jumps.
- **←** / **→** — ±0.1 MHz; **Shift+←/→** — ±1.0 MHz.
- **Click** a preset (88.7 hum, 92.1 slowcompiler, …) to snap to that station.
- ±0.3 of any station and the card locks; outside that window, the card goes to halftone static and the meter falls.

## Why it works for Grace
The first concept Grace shipped (`concept/signal`) was an FM tuner. The visual hit she liked best (`concept/press` / `concept/galley`) was a riso zine. *Colophon* is the meeting place — Signal's continuous-parameter IA in Press's flat ink. It is also the natural surface for a colophon: a continuous band of stations including the colophon itself, *one station at the back of the book*, the way `WGWJ` would have signed off a broadcast.

The lock-in tolerance is the right metaphor: a polymath portfolio is hard to navigate because the works are not at clean intervals on a list. Lock-in says *come close enough to a station and the page will help you read it; otherwise the static is honest about what it is*.

## Structural oddness
- The dial is HTML + CSS — `repeating-linear-gradient` for both minor (every 1%) and major (every 5%) ticks, an absolutely-positioned `<ol>` for the mono numbers, a row of `<span class="dial__marker">`s for the cyan station markers (with the station name in `data-name` and rendered via `::after`).
- The needle is a 2px cyan vertical bar with a 1.5px pink `box-shadow` ghost — the same misregistration trick the rest of the variants use, here applied to a thin instrumental line.
- The S-meter bar is a CSS radial-gradient halftone on cream paper, with a cyan halftone fill that grows from 0% to 100% as the needle approaches a station. Two halftones overlap; that's the riso convention.
- The card has two halftone underprints — pink on cream + cyan slightly offset — the same trick galley uses for misregistration. When off-channel, a fourth halftone (warm-black) overlays everything via `mix-blend-mode: multiply` and the head/sub/body fade to 16% opacity. The card is *visibly* covered by static ink.
- ~190 lines of JS, ~340 lines of CSS, no framework, no library.
- `prefers-reduced-motion`: the easing on `tuneTo` is suppressed; all transitions remain purely visual.

## Type
**Anton** for the title and the card head — same condensed display Press uses.
**Fraunces** italic for the lede and the sub-line on each station's card.
**Space Mono** for the dial numbers, the station markers, the readout, the S-meter labels, the presets, the folio lines — the way a print shop labels its proofs.

## What none of this is
- A skeuomorphic radio. No brushed-metal case, no amber CRT glow, no LEDs. The dial is *printed*; the instrument is *paper*. Nothing on the page suggests a switched-on receiver — it suggests an open book.
- A copy of `concept/signal`. Signal's whole interaction model is inherited (lock-in, station markers, S-meter, presets, drag/scroll/arrow); the *medium* is changed entirely. Same instrument, different ink.
- A zine. Galley is a zine printing itself; Press is a zine sitting still. Colophon is a *single colophon*, expanded to seven channels — a thinner object than either, with a signal-shaped IA.
