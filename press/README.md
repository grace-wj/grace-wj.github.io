# concept: press

A personal site shaped like a **risograph zine** — fluorescent pink and cornflower blue inked slightly off-register on cream paper, six packed spreads you scroll like turning pages.

## Axis of weirdness
**Aesthetic-first, color-vivid, maximalist.** The other concepts are quiet objects you read into; this one hits before it makes sense. CMYK overprint headlines (three stacked layers, each in `mix-blend-mode: multiply`), halftone-dot illustrations rendered as inline SVG patterns, fluorescent pink kicker quotes, a vertical "NOT FOR SALE" marquee on the right edge.

## Six spreads
- **cover** — `WGWJ PRESS · ISSUE 07 · SPRING`. Massive `GRACE WEI-LI JUAN` set in Anton with pink+cyan misregistration. Issue badge, table of contents, halftone bleed.
- **003 — hum** — pocket synthesizer for people who can't read music. Halftone microphone in fluorescent pink, two body columns, a pull quote, a specs table.
- **009 — slowcompiler** — code on black with cyan accents, a six-stage pipeline list, a haiku set as a comment block.
- **015 / 021 — weft + three bodies, orbiting** — split spread. Loom diagram with a *real* band of pink ("the week I rewrote the parser"). Painting reproduced as a cyan halftone.
- **027 — notebooks** — three essays as inset cards, cyan Roman numerals.
- **032 — colophon** — masthead, contact, "replies will be slow."

## Why it works for Grace
The other concepts are *cerebral first* — you have to "get" them before they're beautiful. The risk for a polymath portfolio is being read as quiet-and-clever forever. This one puts the loud, sincere, craft-y, hand-printed energy at the surface — closer to her oil paintings than to her compilers — and trusts that the writing inside will carry the rest.

A printed zine is also the right material reference for someone who makes by hand: the misregistration, the spot color, the paper grain are forgiving in the way an oil painting is forgiving — flaws read as *touch*, not as bugs.

## Structural oddness
- **Real CMYK overprint type**: every big headline is rendered three times via CSS pseudo-elements, each layer offset 2–5px and set to `mix-blend-mode: multiply` — so the three layers actually *combine* on the cream paper the way three riso heads would.
- **Fluorescent pink + cornflower blue** with a warm black third color — the three Risograph drums most small print shops have. Cream paper grain is faked with three offset radial-gradient noise layers.
- **Halftones are SVG `<pattern>`s** of `<circle>`s, masked to silhouettes. No raster images.
- **Vertical edge marquee** ("NOT FOR SALE · NOT FOR SALE · …") crawls slowly down the right side via `writing-mode: vertical-rl` + a single CSS animation. Respects `prefers-reduced-motion`.
- **Scroll-snap (proximity)** so the spreads guide but don't fight oversized content.
- ~470 lines of CSS, 0 lines of JS, no build step.

## Type
**Anton** for the display headlines — condensed, geometric, gig-poster — chosen because it's the one display weight that holds up under three layers of misregistration without the counters closing. **Fraunces** italic for kickers and pull quotes, because the literary voice still has to be present even inside the loudness. **Space Mono** for folios, specs, and contact lines, because zines have monospace captions and that's that.
