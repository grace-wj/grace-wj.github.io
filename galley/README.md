# concept: galley

A risograph zine that **prints itself in front of you**. Reload, and the press starts over: cyan drum down first (the halftone disc, the floor block, the column rule), then fluo pink (the masthead, the kicker, the pull quote), then warm black (the body text, the specs, the colophon). Misregistration drifts a few pixels per plate, set by the URL seed. After the third plate, the proof is off the press; press <em>another pull</em> for a fresh one.

> *Galley:* in a print shop, the metal tray of locked-up type before the inks are laid down. Also: the first proof off the press.

## Provenance
- From `concept/press`: the entire ink-and-paper system — fluorescent pink + cornflower blue + warm black drums, cream-paper grain via stacked radial-gradients, halftones rendered as CSS `mask` of dot patterns, **CMYK overprint via three plates each in `mix-blend-mode: multiply`**, the vertical edge marquee crawling on the right. The aesthetic is wholesale lifted; the **performance** is what's new.
- From `concept/draft`: time-as-structure. The page is incomplete, then less incomplete, then nearly settled. The *skip-to-printed* button and the `?fast` URL param are direct ports of *skip-to-settled* / *?fast* in `draft`. `prefers-reduced-motion` snaps to the finished proof — same affordance, different surface.
- From `concept/emblem`: each visit is one *cast*. The URL seed `?n=…` selects which pull-variant is performed (offsets, plate-order, issue number, mottoes). `mulberry32` PRNG is the same one. *Another pull* increments the seed and reloads — `back / forward` walks the proofs.
- **New in this concept:** *medium-as-performance*. The three parents are each finished objects you read into. Galley refuses to be a finished object. The printing is not a loading screen; it is the page. Grace's recurring claim — *the space between the finished thing and the continuing thing* — gets a print-shop surface here. The proof you watch come off the press is also the proof that the finished thing is not the right unit.

## Axis of weirdness
**Performance.** A print is normally an artifact; here it is a process the visitor witnesses. The site has *three states it must traverse* — staging, two-color, three-color — each with its own legibility. Freeze-frame and you lose the meaning, in the same way that freeze-framing `draft` mid-strikethrough loses the meaning.

## Try
- Load the page. Watch.
- **Skip to printed** — top-left. Snaps to the finished proof.
- **Another pull** — appears once printed. Increments `n` in the URL and reloads with new offsets and pull-order.
- `?n=42` — exactly reproduces a given proof.
- `?fast` — skips the press performance entirely.
- `prefers-reduced-motion` — same as `?fast`.

## Why it works for Grace
The print-shop surface is loud, sincere, hand-printed, forgiving — exactly the register her oil paintings live in, and exactly *not* the register her code lives in. *Press* already shipped that aesthetic. Galley adds the truth that lives a layer beneath it: *the thing is being made*. That is what *on stillness* argues in prose; *galley* argues it in CMYK.

The three-plate sequence is also the truthful description of how a riso operates — drum by drum, color by color, paper through the same machine three times. To see a riso plate hit the paper is to be reminded that this is a hand-printed object, not a press-released JPEG.

## Structural oddness
- Three layered DOM siblings (`.plate--cyan`, `.plate--pink`, `.plate--black`) occupy the same area; only the warm-black plate is in normal flow, the cyan and pink plates are absolutely positioned with `mix-blend-mode: multiply`. Where two overlap, the inks combine — `pink + cyan` actually reads darker on screen, the way they would on cream paper.
- Misregistration is **per-plate CSS variables** (`--reg-cyan`, `--reg-pink`, `--reg-pink-y`, `--reg-black`) set by the seeded PRNG at load. Each plate is `transform: translate(...)` by its own offset.
- Each plate's content reveals via a different conceit: the cyan plate uses `clip-path: inset(...)` wipes (top-down for the disc, left-right for the floor, vertical scaleY for the column rule); the pink masthead is a left-to-right wipe; the warm-black plate is a cascade of `opacity` transitions per child (body, specs, colophon).
- The press HUD (top-left) lists the three plates with a status dot per plate. The current plate has a pulsing dot in its drum's color; finished plates strike through.
- Halftones are CSS `mask` patterns of `radial-gradient(circle, #000 1px, transparent 1.2px)` — no images, no SVG `<image>`. Different sizes per element (3px for the floor, 4px for the disc).
- The folio numbers in the works list and the colophon links are pulled in **cyan**, but they sit on the warm-black plate — so cyan + black overprint produces a darker cyan that visually reads as overprint without needing two layers.
- Five seeded "pull-variants" rotate plate order between visits — sometimes pink lays before cyan, sometimes black before pink — so two adjacent reloads produce visibly different proofs.
- `prefers-reduced-motion`, `?fast`, *skip to printed* all collapse to the same code path: `snapToFinished()` adds `.is-laid` to all three plates simultaneously. The visitor reads the finished proof.
- ~210 lines of JS, ~330 lines of CSS, no framework, no library.

## Type
**Anton** for the masthead — condensed, geometric, gig-poster — chosen because the counters survive misregistration; the Y closes only in true alignment, and you are seeing the press *before* true alignment.
**Fraunces** italic for the lede, the body, and the pull-quote — the literary voice has to sit inside the loudness.
**Space Mono** for the press HUD, the folio numbers, the specs box, and the colophon — zines have monospace captions and that's that.

## What none of this is
- A loading screen. The performance is the page; there is no after-the-loader hiding behind it. After the press finishes, you read the same cream-paper proof; no transition to a "real" UI.
- A retro pastiche. The misregistration is not 8-bit-zine kitsch; it's a real description of riso behavior. Two reloads produce two different misregistrations because two real pulls would.
- A copy of `press`. Press is six spreads at rest. Galley is one spread, in motion. Press shows the finished printed object; galley shows the *act* of printing, and only one spread because the act is the content.
