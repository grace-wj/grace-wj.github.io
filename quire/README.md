# concept: quire

A **quire** — a gathering of folded leaves that becomes a section of a printed book — laid out flat as eight riso spreads. Vertical scroll pans a horizontal camera across the eight leaves. Each leaf is a fully composed riso spread: cover, hum, slowcompiler, weft, three bodies, on stillness, letters, colophon. Stitching marks (the binding) are visible in the gutters between every pair.

> *Quire:* in printing, four sheets folded once produces a quire of eight pages; eight folded sheets produces sixteen. *Sixteen pages, eight leaves* — this is one.

## Provenance
- **Held from `concept/press`**: every visual convention. Riso palette (fluorescent pink `#ff3a8c`, cornflower blue `#2c4dff`, warm black `#1a1410`, cream paper `#f3e9d2`); paper grain stacked in radial-gradients; halftone dot patterns rendered as CSS `mask` / `-webkit-mask`; mix-blend-mode multiply on the cover halftone-disc; Anton for headlines, Fraunces italic for ledes and pull-quotes, Space Mono for folios, kickers, and pipeline lists; misregistration ghosts on every Anton headline (a 3px cyan ghost behind the pink, a 3px pink ghost behind the cyan); the vertical edge marquee on the right; registration crosses in the corners.
- **Held from `concept/galley`**: the press-style HUD top-left (cream paper, 1px warm-black stroke, 4px hard drop-shadow on the corner, monospace lines). The HUD's leaf-indicator (`i. cover`, `ii. hum`, …) ticks the active leaf in pink as you pan; same kind of plate-status indicator galley uses for cyan/pink/black.
- **Drawn from `concept/passage` and `concept/tideline`**: the **horizontal-scroll-via-sticky-camera**. A `.track` of `800vh` (eight viewports of vertical scroll budget) holds a sticky `.camera`. Inside the camera, the `.quire` is a horizontal flex strip of eight `100vw` leaves with `32px` gutters, transformed by a single CSS variable `--cam-x` that's updated by a `scroll` listener. Pure browser scroll — no scroll-jacking, no `wheel` listeners. The leaf-indicator updates by computing scene-space x at the camera's centre and rounding to the nearest leaf, exactly as Tideline computes which week the camera is over.
- **New in this variant**: *the riso quire, scrolled flat*. Press is six spreads stacked vertically; you scroll *down* one. Galley is one spread that prints itself in time. Quire is eight spreads laid out *side by side* with stitching marks between, and the visitor pans across them by scrolling vertically — *vertical scroll, horizontal book*. The vertical motion is exactly the verticality of turning pages in a stitched booklet; the horizontal *result* is the layout of an unfolded gathering. Both are accurate to how a quire is actually made.

## Axis of weirdness
**The book unfolded.** A quire is normally read folded — leaf 1, then 2, then 3. *quire* lays the same eight leaves out flat, side by side, with the stitching visible. You don't turn pages here; you walk along the gathering.

## Eight leaves
| roman | folio | name             | kind                |
|-------|-------|------------------|---------------------|
| i.    | 001   | cover            | proof, issue xx     |
| ii.   | 003   | hum              | a synthesizer       |
| iii.  | 009   | slowcompiler     | a compiler          |
| iv.   | 015   | weft             | a loom              |
| v.    | 021   | three bodies     | paintings           |
| vi.   | 027   | on stillness     | an essay            |
| vii.  | 032   | letters          | correspondence      |
| viii. | 037   | colophon         | back of the book    |

Folios are <em>Wei-li Press</em> signatures. The colophon at 037 is the same colophon that ships at 106.9 in `concept/colophon`; the family knows itself.

## Try it
- **Scroll** down — the camera pans east across the eight leaves. (No scroll-jacking; the browser's normal scroll just translates one CSS variable.)
- The HUD's leaf indicator highlights the leaf you're nearest. Roman numerals + name in mono.
- **Resize** — the quire's total width recomputes; mid-scroll you stay at the same fractional position.
- `prefers-reduced-motion` — there is no animation to suppress; scrolling is whatever the visitor produces.

## Why it works for Grace
Press shipped the riso aesthetic; Galley shipped the press-as-performance. *quire* is the natural *third* member of the family — the same six spreads, plus a cover and a colophon, treated as gathered cloth. Reading the quire *across* (rather than *down*) is the small structural surprise; everything else is exactly the kind of spread Press readers already love.

It's also the leanest of the four press-family variants: each of the other three takes a feature (3D, graph, dial) and applies the riso ink to it. *quire* takes the structure (a quire of stitched leaves) and applies the riso ink in the most direct way — full bleeds, drop folios, halftone illustrations, two-column lockups, pull-quotes in pink.

## Structural oddness
- One sticky element + one CSS variable does all the camera work. `transform: translate3d(var(--cam-x), 0, 0)` lifts the quire onto the GPU. ~50 lines of JS.
- Each leaf is a CSS-grid of `auto auto auto 1fr auto` so the headline and content stack from the top while the bottom stays available for halftone illustrations.
- The cover's halftone disc is a `radial-gradient` masked with a 4-px circle pattern — the same trick galley used for its halftone disc, mix-blend-multiplied to overprint with the masthead.
- The "weft" leaf renders an actual weave: 12-15 horizontal `<span>` bands inside a vertical-warp-thread parent, with three of the bands filled `var(--pink)` to mark the parser-rewrite week — the same "real band of pink" idea press shipped, animated only by the visitor's scroll.
- The "slowcompiler" leaf has a real `<pre>` of code (in warm-black with cyan halftone overlay) and a numbered pipeline list with lex/parse/type/lower/emit, each with one line of haiku in italic Fraunces.
- The "three bodies" leaf has three procedural panel thumbnails — kettle + figures composed from radial-gradients — masked to halftone. Same compositional move atelier and orrery use.
- The colophon leaf is rendered as a real colophon: <em>SET IN, STOCK, INKS, BINDING, COMPOSED BY, EDITION</em>, in mono, with cyan small-cap labels.
- Stitching marks in the gutters: `<span>`s positioned at five percentages of the gutter's height, drawn as 6-px warm-black bars.
- ~70 lines of JS, ~430 lines of CSS, no framework, no library.

## Type
**Anton** for the cover's mast and every leaf's headline.
**Fraunces** italic for the leaves' subs, body, pull-quotes, and the colophon's address line.
**Space Mono** for the folio (e.g. `037`), the kickers (`vi. ESSAY · WRITTEN AT LENGTH`), the HUD, the pipeline list, the colophon's labels (`SET IN`, `STOCK`, `INKS`).

## What none of this is
- A scroll-jacked carousel. The browser's normal scrollbar still works the way it always did; only the rendering is sideways. Resize and you stay on the same fractional leaf.
- A copy of `passage` or `tideline`. Passage is a single horizontal painting with a single sky; Tideline is a tide chart of one year. Quire is *eight discrete spreads*, each a different work, stitched at the gutters.
- A copy of `press`. Press's six spreads stack vertically and are read by scrolling down through one continuous strip. Quire's eight spreads sit side by side, stitched, and are read by scrolling east. Same ink, different binding.
