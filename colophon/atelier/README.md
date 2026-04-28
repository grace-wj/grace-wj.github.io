# concept: atelier

A personal site shaped like a **painter's notebook**. The cover is an oil palette, the navigation is the seven blobs of paint on it, and each "study" is a project — written about the way you'd write a margin note about a small painting you'd just finished.

## Axis of weirdness
**Hand-drawn / painterly, with the painting practice as the surface.** The other concepts can only point at Grace's oils as a section. Here, every page is shaped like a study sheet from a working painter — pigment chip in the margin, hand-lettered marginalia in Caveat, italic Fraunces titles set big the way you set a title in a notebook before you've painted the thing it's titled.

## The palette is the navigation
The cover holds an oil palette — wood-grained, kidney-shaped, with a thumb hole. Seven blobs of pigment sit on it (cadmium red, naples yellow, ultramarine, burnt sienna, terre verte, alizarin, lead white). Each blob is a button. Clicking it smooth-scrolls to the matching study below. The pigment names are real and used as nav metadata — the navigation literally *is* a list of colors.

## Six studies
Each study uses its assigned pigment as the page accent (titles, margin rules, illustration fills):

- **i. cadmium red — hum** — synth that listens. SVG painted microphone.
- **ii. naples yellow — slowcompiler** — compiler with a haiku at every pass; a lex/parse/type/emit pipeline sketch.
- **iii. ultramarine — weft** — git-driven loom; SVG of a partial scarf, three days of red.
- **iv. burnt sienna — three bodies, orbiting** — the painting series itself; three painted thumbnails of the panels.
- **v. terre verte — notebooks** — three essays as inset cards.
- **vi. alizarin — letters** — slow correspondence, a hand-drawn signature in alizarin.

## Why it works for Grace
A painter's notebook is the most natural object Grace already makes. Every page in this site is a page she would draw — a chip, a title, a small painted study, a note in the margin in pencil. It's the only one of the eight concepts where the surface itself *is* her practice; everything else points at the painting practice as content. This one *paints*.

## Structural oddness
- The **palette is rendered in inline SVG** with a radial-gradient wood texture, a turbulence-displaced "rough" filter for hand-drawn edges, and HTML buttons positioned absolutely over the SVG to be the pigment blobs (so they're real, focusable, clickable, screen-reader-readable).
- **Pigments are real**: cadmium red deep, naples yellow, French ultramarine, burnt sienna, terre verte, alizarin crimson, lead white. The CSS variables are named after the colorman's register.
- **Each study has a paint-chip** rendered with stacked `inset` and outset shadows that read as varnish + thickness, and a paper-tape strip across the top.
- **Three SVG thumbnails** of the painting panels — each a procedural composition of a warm lamp pool and silhouette figures, the same compositional idea as the real series.
- **Hand-lettered marginalia** in Caveat (a free Google Fonts script). Used sparingly, only where a pencil note would actually appear: chip labels, folios, margin specs.
- ~10 lines of JS — just smooth-scroll on click.

## Type
**Fraunces** italic for everything large and intimate (titles, kickers, margin notes, body italics) — the high-contrast italic feels painted. **EB Garamond** for body text, where you want a calmer face that reads at a long sitting. **Caveat** as a hand-letter accent, restricted to the marginalia and chip labels — the painter's pencil voice, never the writer's.
