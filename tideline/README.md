# concept: tideline

A year of Grace's making, drawn as a **tide chart**. The horizontal axis is the year (January at the left, December at the right). The vertical axis is depth — the *surface* is daily correspondence and incidental work, the *deep* is long, slow, single-minded labor. Each work is moored at the date it was made, at the depth it was made at. Scroll down; the camera pans east along the year; the pigment shifts with the month; a vermilion needle marks today.

## Provenance
- From `concept/passage`: the entire camera idiom — a tall `.track` with a sticky `.camera`, vertical scroll progress (0→1) drives `--cam-x` on the chart, `transform: translate3d(...)` lifts it onto the GPU, no scroll-jacking, no `wheel` listeners. Repurposed: instead of a horizontal painting of one room across one day, the painting is a year-long tide chart.
- From `concept/atelier`: the named pigments, drawn from the colorman's register (lead white, naples yellow, terre verte, alizarin crimson, cadmium red, raw sienna, burnt sienna, indian red, venetian red, manganese blue, french ultramarine). One pigment per month, gradient-blended in the SVG `<linearGradient>`. The HUD reads out the current pigment by name, as a painter would call it.
- From `concept/archive`: the *moored-pin* metaphor — every work is a small lozenge dropped at a specific (date, depth) point in a 2D plane, with a hand-drawn anchor line dropping from the horizon. Paper-grain texture stacked on the chart.
- From `concept/signal`: the **continuous parameter as IA** — the date is a float of the year, not a route or a page. A vermilion needle (matches signal's red dial needle) marks today's position, computed from the local clock, and on first visit the camera eases the visitor *to* today. The HUD's "week-of-year" readout is in lowercase Roman numerals (`week xv · mid-deep`), the same readout register signal used for its station numbers.
- **New in this concept:** *the IA is a 2D continuous-parameter chart*. None of the parents are diagrams: passage is a painting, atelier is a notebook, archive is a pinboard, signal is an instrument. Tideline is the IA the polymath's year actually *has* — a calendar with a depth axis. Reading the chart, you see at a glance which months ran shallow (correspondence, hum patches) and which ran deep (slowcompiler in April, on stillness in July, paintings in September) — a fact about the year that no list of projects could tell you.

## Axis of weirdness
**Two-axis legibility.** The chart admits the two facts a list of projects can't: *when* something was made and *how deep the work went*. Reading left-to-right gives you the season; reading up-and-down gives you the kind of attention. Where you see a deep work and a surface work in the same column, that's a real week of Grace's life.

## Try
- **Scroll** down — the camera pans east. (No scroll-jacking; the browser's normal scroll just translates a CSS variable.)
- **Click** a moored work — a drawer slides in with the writing.
- The vermilion needle marks today. On first load, the camera eases there so you start *now*.
- Resize: the chart re-pans to keep your fractional position.

## Six moorings
| roman | work                          | when           | depth        | pigment              |
|-------|-------------------------------|----------------|--------------|----------------------|
| i.    | hum                           | February       | surface      | naples yellow        |
| ii.   | slowcompiler                  | April          | mid-deep     | terre verte          |
| iii.  | weft                          | late May       | mid          | alizarin crimson     |
| iv.   | on stillness                  | July           | deep         | raw sienna           |
| v.    | three bodies, orbiting        | September      | mid-deep     | indian red           |
| vi.   | letters                       | November       | shallow      | manganese blue       |

The depths are not arbitrary: *hum* sits on the surface because it's touched daily; *on stillness* sits at the bottom because it's been written for two years and may continue to be; *letters* is shallow but shows up exactly when the first weather of the year does.

## Why it works for Grace
A polymath portfolio is hard to navigate because the projects don't sit in a hierarchy and they don't sit in a sequence — they sit in a *year*, at *depths*, like coastal work. *Tideline* admits the year and the depth. The reader sees, without being told, that *on stillness* is in deep water and *letters* is in shallow, and that's the truth of the practice. It is also the most painterly form a portfolio can take that is still legible as data: a chart of pigments and depths, scrolled like a handscroll.

## Structural oddness
- The chart is one inline SVG, 3000 × 600, panned by a single CSS variable. ~80 lines of pan-related JS.
- The pigment band at the top is a 13-stop `<linearGradient>` driven by `gradientUnits="userSpaceOnUse"` so its stops sit at the same x-coordinates as the month boundaries. The HUD reads out the pigment by *name*, not by hex.
- Depth labels (`SURFACE / SHALLOW / MID / DEEP`) repeat every ~500 px so they're always on screen — the chart is meant to be readable from any window onto it, the way a real coastline is.
- The tide curve is one SVG `<path>` with cubic Bezier control points; the moored pins are placed at coordinates that *land on* the curve so the picture is internally consistent.
- The today-needle is a `<g>` translated to `(dayOfYear / 365) × 3000`. On first visit, the camera eases to the needle's x-position so the visitor opens the chart at *now* — same lock-in instinct as `signal`.
- Each moored work has a thin anchor line dropping from the pigment band to the pin; this is drawn as a 0.6-stroke line at 45% opacity — the way you'd draft a moored-buoy on a chart with pencil before going over it in ink.
- `prefers-reduced-motion`: the auto-scroll-to-today is suppressed; the visitor begins at January 1 and scrolls themselves.
- ~270 lines of JS, ~270 lines of CSS, ~180 lines of inline SVG, no framework, no library.

## Type
**Cormorant Garamond** italic for the title, the work labels, and the lede — long descenders, intimate italic; reads as written on the chart.
**Cormorant SC** for the kicker, depth labels (`SURFACE / SHALLOW`), month names (`JANUARY / FEBRUARY`), HUD month, and "TODAY" tag — small caps are the right register for a labeled instrument.
**DM Mono** for the week-of-year readout, the same monospace as `signal`'s frequency display — a continuous parameter reads in mono.

## What none of this is
- A timeline. A timeline only has one axis. The depth axis is the point.
- An infographic. The chart is composed in Grace's voice and uses pigment names a painter would use; it is not an analytics dashboard.
- A copy of `passage`. Passage is *one room, six lights, one day*. Tideline is *one year, six moorings, two axes*. The camera idiom is the same; everything else — the data, the surface, the conceit — is different.
