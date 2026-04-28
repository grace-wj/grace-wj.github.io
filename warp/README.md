# concept: warp

A year of Grace's making, **woven as cloth**. Fifty-two weft rows — one for each week — laid over a pale linen warp. Each row's pigment is the dominant pigment of that week's making (lead white in January, raw sienna in July, french ultramarine in December). Three days in April are visible as a band of red — the week the parser was rewritten. Hover a row for the margin note; some weeks are silent. The cloth weaves itself in front of you, row by row, on every visit.

> *Warp:* the longitudinal threads on a loom; the framework over which the weft is woven. Also: <em>to bend by heat or moisture</em>.

## Provenance
- From `concept/atelier`: the twelve named pigments (lead white, naples yellow, terre verte, alizarin crimson, cadmium red, raw sienna, burnt sienna, indian red, venetian red, manganese blue, french ultramarine), one per month, used as the row colors. The pigments are real and named in the colorman's register, the same way atelier names them. The pigment chip in the margin gloss is lifted from atelier's paint-chip with the varnish shadow; pared down here to a 12px square.
- From `concept/draft`: the **time-based reveal**. Each row appears in sequence, ~70 ms apart, like a shuttle pulling a fresh weft across the warp. ~3.6 s total. Reduced-motion shows the finished cloth on first paint — same affordance as draft's *skip-to-settled*.
- From `concept/marginalia`: the **gloss-on-hover** — a sticky right-margin column that rewrites itself with the hovered row's note. The note has a small-caps head, a pigment chip and the colorman's pigment name, and an italic work title. The default-state copy ("hover a row. Each weft is one week of making.") sits in the margin slot until the visitor begins reading.
- From `concept/press`: the *real band of red* idea. Press's loom diagram had a real band of pink for "the week I rewrote the parser." Warp keeps the same week and the same fact — three Tuesdays in April — and renders it as a literal red-thread stripe in the cloth (alizarin crimson over terre verte, three vertical stripes in one row).
- **New in this concept:** *the IA is the cloth itself*. The site is not a portfolio with a loom-themed background; the site is what *weft* — Grace's git-driven loom — produces in a year. The page IS the scarf. Every other concept can show a loom or talk about it. This one weaves.

## Axis of weirdness
**Textile-as-IA.** The information architecture is woven, not paginated. There are no sections, no pages, no nav, no list. There is a piece of cloth, fifty-two rows, twelve colors, and a sticky margin where one row at a time gets read. To navigate is to pass your eye down the cloth.

## Try
- Watch the cloth weave itself for ~3.6 s on first paint.
- **Hover** any row — the margin column rewrites itself with that week's note.
- **Tab** through rows for keyboard navigation.
- The week-number ribbon on the left tells you which row you're on (`apr · wk 17`).
- `prefers-reduced-motion` — the cloth is finished on first paint.

## Why it works for Grace
*Weft* is the project where Grace's git history becomes thread on a real loom; one commit, one thread; one scarf, one orbital year. Every other concept on this site can point at *weft* but cannot be it. *Warp* is the scarf — fifty-two weeks of making, woven in pigment, with the red threads visible as the moments of intense work. It is not a portfolio about her practice; it is the practice's product.

That is also why this is the concept that argues *the space between the finished thing and the continuing thing* most quietly: the cloth is not finished — December has its own pigment (french ultramarine) but the year keeps going. Reload tomorrow and the weave begins again.

## Structural oddness
- One DOM tree, no images. The cloth is 52 stacked `<div class="weft">` elements, each with a height of 8–22 px (the *thickness* of the work that week) and a background pigment from a 12-color CSS-variable register.
- The warp threads are a `repeating-linear-gradient(90deg, var(--warp) 0 1px, transparent 1px 6px)` on the cloth container — pale vertical lines at 6 px pitch, like real linen warp.
- Each weft row has its own `repeating-linear-gradient` overlay simulating the moments where the weft passes *under* the warp (warp shows through). Same overlay scaled to whatever pigment is on the row.
- The "red threads" row composites a wider linear-gradient with three alizarin stripes (8%, 14%, 6% wide) over its base pigment, then the warp/weft overlay on top.
- Reveal animation: each row starts at `transform: translateX(110%); opacity: 0` and transitions to `translateX(0)`, like a shuttle pulling fresh weft across the warp.
- Margin glosses are pre-rendered into the DOM at boot. Hover/focus toggles `.is-visible` on the matching one and hides the default note. Default returns when the cursor leaves the cloth.
- Selvages (top and bottom) are 8-px dark bands — the bound edge of cloth. They have inset 1-px verticals at their corners suggesting the warp ends.
- A status line under the cloth ticks `i / lii`, `ii / lii`, … `lii / lii` as the cloth weaves; switches from `weaving` to `woven` when the last row is laid.
- ~270 lines of JS, ~290 lines of CSS, no framework, no library.

## Type
**Cormorant Garamond** italic for the title, the lede, the work titles in margin glosses — the same intimate italic used by Grace's other quieter concepts.
**Cormorant SC** for the kickers, the gloss heads (`week xvii · apr · terre verte`), the week-number ribbon, the "weaving · i of lii" status — small caps are the right register for a labeled cloth.
**Caveat** is included in the font stack but used sparingly — only when the margin gloss admits a hand-written register, the way the working weaver might pencil a note in the margin of the chart.

## What none of this is
- A timeline. There is one axis here, and it's vertical, but it isn't a sequence of events with dates — it is a *cloth*, a finished material thing, in which the weeks happen to sit in order. You read it down, but you read it as fabric.
- A list. No bullets, no rows of cards, no pages. The cloth doesn't list works; it admits whichever weeks happened to be the work, and lets the rest be silent.
- A copy of `weft`. *Weft* is Grace's actual loom, the physical instrument. *Warp* is the cloth that loom would, in this year, produce — composed in the browser as a faithful diagram of one of her real practices.
