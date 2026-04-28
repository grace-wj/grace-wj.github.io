# concept: emblem

A personal site shaped like a single leaf from a never-published **emblem book** — *Emblemata Gratiae*. Every visit casts one emblem, composed in the browser from three parts: a Latin motto (*inscriptio*), an engraved figure (*pictura*), and an English verse (*subscriptio*). The seed is in the URL — share `?n=…` and you share the leaf.

## Axis of weirdness
**Generative.** No two visits read the same. The motto, the icon-arrangement, the hatching angle, the folio number, and the verse are all picked by a seeded PRNG. The emblem genre is a 16th-century convention; running it through a small browser-side composer is the unusual part. The book has no last page.

## Three parts
- **Inscriptio** — one of 30 hand-curated Latin mottoes, with an English gloss in small caps below. Real-Latin-feeling (*lente festinat lux*; *plumbum in aurum, paulatim*; *liber non clauditur*). Not lorem.
- **Pictura** — an inline SVG emblem inside a 200×200 roundel. One of six layouts (*solo-radiant*, *duet*, *triad*, *soliloquy*, *wreathed*, *celestial*) hosts one to three icons drawn from a library of twenty (hand, eye, sun, moon, star, tree, key, anchor, scale, bird, candle, hourglass, arrow, mountain, urn, flame, book, compass, lyre, bee). Diagonal hatching or sun rays form the ground. A laurel wreath is procedural.
- **Subscriptio** — one of 24 hand-written four-line stanzas in Grace's voice. A blackletter dropcap and a vermilion pilcrow mark the last line.

## Why it works for Grace
A polymath portfolio is not a single artifact but a continuing series of attempts — a book of leaves that does not close. Emblem books are exactly that: a series of small finished things, each indexed by a motto and a figure, each making a small argument about how to live. They are also profoundly visual *and* profoundly literary at once, which is the seam Grace already lives along.

The book is also the most visually intense surface here: vermilion rubrication, lead-tin gold ornament, ink hatching, blackletter title initial, ornamental corners, fox-marked vellum. After eight quieter rooms, this one is supposed to make a passing reader stop.

## URL seed
`?n=42` — and any whole number — reproduces an exact emblem. Cast another, and the URL updates without reloading the page (`history.pushState`). Back/forward through the browser walks the leaves.

## Structural oddness
- The motto, the verse, the folio number, the figure, the layout, the hatching angle, the laurel — all driven by one `mulberry32` PRNG seeded from the URL. The whole leaf is a function of an integer.
- The "paper" is layered CSS only: cream radial gradient + two diagonal cross-hatch repeating gradients (multiply-blended) for grain + four corner foxing spots from offset radial gradients. No raster textures.
- Twenty icons drawn as inline SVG path strings inside a single `ICONS` table. Each is a ~10–18-line `d=` attribute; together about 200 lines of geometry. The composer scales and places them; the same icon shows up at four sizes.
- The hatching is a procedural `<path>` of N parallel diagonals (angle picked by seed); the sun-rays are 24 short radial segments. No external assets.
- A vermilion pilcrow opens the last line of the verse; the dropcap on the first line is rendered in UnifrakturMaguntia (blackletter), echoing the rubric ductus.
- Folio number is in lowercase Roman numerals, range `i`–`cccxxxiii`. The series title (*Emblemata Gratiae*) uses blackletter for the title initial. The "cast-date" is in lowercase Latin month + lowercase Roman year ("28 april, anno mmxxvi").
- Recomposing the leaf flips the page slightly via a 380 ms transform animation; suppressed under `prefers-reduced-motion`.
- ~470 lines of JS, ~330 lines of CSS, no framework, no library.

## Type
**Cormorant Garamond** (regular and italic) for body and motto — long descenders, intimate italics, the right register for vellum. **Cormorant SC** (small caps) for kickers, folios, and the English motto-gloss — small caps are how emblem-books printed their secondary text. **UnifrakturMaguntia** only for the title initial of *Emblemata* and the verse dropcap — blackletter as ornament, not as voice.
