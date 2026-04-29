# concept: signature

A press/galley-family variant where the artist's own illustrations are the figurative anchor instead of generic typography compositions. A small folded sheet — masthead, big display name, hands, sun, an index of works, colophon. Two-and-a-half colors (red, yellow, cyan-as-accent).

## Provenance

- **Held from `concept/press`**: cream paper ground (#f3e9d2), `Anton`/`Fraunces`/`Space Mono` type stack, vertical right-edge marquee rails, masthead with rules, multiply-blend on illustrations, mono-set folio metadata, off-register text ghosting via `::before` pseudo-elements.
- **Held from `concept/galley`**: the editorial-zine layout discipline (sections separated by horizontal rules, dashed dividers between list items), grain-via-radial-gradient paper texture.
- **New in this variant**: the figurative content is **the artist's own oil-and-ink illustrations**, lifted from her existing `sleep-heals` site and overprinted on the cream stock via `mix-blend-mode: multiply`. The palette is recalibrated to her actual pigments — cadmium red (the hand), cadmium yellow (the sun), and cyan held in reserve for small accents (the pupil). The type system follows press; the *imagery* is unmistakably hers.

## Why it works for Grace

The press/galley aesthetic was the strongest visual hit so far, but the content was generic — anyone could ship a riso-zine portfolio. Adding the artist's actual drawings, scanned and overprinted, turns the same frame into something only she could ship: a polymath portfolio where the *illustration* signals visual-art chops at the same time the *typesetting* signals taste, and the *copy* signals voice. Three signals stacked in one spread.

## Structural oddness

- Multiply-blend on PNGs lets the cream paper bleed through the white of the source illustrations — they print onto the page rather than sitting on top of it
- Off-register ghosting on the display name (red shadow offset 3px / 4px) is pure CSS pseudo-element trickery, not an image
- The drop cap on the lede has a yellow text-shadow offset to suggest a second pass through the press
- Layout uses real editorial sectioning — masthead → cover → lede → index → colophon — with each section ruled off rather than relying on whitespace alone
- Single HTML file, single CSS file, no JS, four image assets — a static printed object

## Notes

This was built as a one-off proof to test whether integrating the artist's existing illustrations into the press-family aesthetic produces something visually distinctive. If it lands, the next move is to commission a small purpose-drawn library (6–10 illustrations themed for the personal site: a synthesizer, a loom, a compiler-as-creature, etc.) and produce three or four signature variants drawing from that library.
