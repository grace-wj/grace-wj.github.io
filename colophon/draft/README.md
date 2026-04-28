# concept: draft

A self-portrait being **drafted in real time** in the visitor's browser. The page composes itself over ~75 seconds — title, subtitle, paragraphs, a small inventory of works, a contact line, a coda — with strikethroughs, false starts, second tries, and marginal notes appearing in vermilion as the writer (visible only as a blinking caret) rehearses on the page. Reload, and the draft begins again.

## Axis of weirdness
**Time-based.** Temporality is the structure: the site is incomplete, then less incomplete, then nearly settled. Freeze it at any one moment and you lose the meaning — you'd see only a half-written page with no context for what comes next. Other concepts can be scrolled at any pace; this one is paced *to* you, and asks you to read at the speed of writing.

The subtler temporal layer: a `data-tod` attribute on `<body>` reads the local clock and tints the paper warmth — cool morning cream, full midday, amber afternoon, dim evening, near-black night with cream ink. Reload at 6 a.m. and again at 11 p.m. and the same draft is composed on different paper.

## What gets drafted
- `grace wei-li juan` (title) — typed slowly
- *a self-portrait* — typed, pause, struck through, replaced with *a draft, kept open*
- A first paragraph that begins "I am writing this in the third person." — pause, struck, restarted in first person, with one mid-sentence revision (a phrase replaced by a tighter one, the rejected phrase struck but kept visible)
- "I am interested in the space between the finished thing and the continuing thing." — typed once and left alone (Grace's actual through-line)
- A small inventory of five works typed in turn — *hum*, *slowcompiler*, *weft*, *three bodies orbiting a lamp*, *on stillness* — with one afterthought appended to *slowcompiler* mid-line
- A contact line that ends with the email typing itself in as a real `mailto:` link
- A coda set in italic — "What I cross out is not gone — it is the shape this draft is not."
- Five marginal notes in a hand-script (Caveat) in vermilion, appearing in the right column at the moment the writer pauses to gloss

A revision counter at the top reads `i`, `ii`, `iii`, &c., bumping at each major settling.

## Why it works for Grace
Grace's stated through-line is the space between the finished thing and the continuing thing. Every other concept on this site presents Grace as already finished — pinned, framed, indexed, painted, broadcast. *draft* presents her as *being drafted*, which is what she actually is. The strikethroughs are the point: the rejected phrasing is part of the portrait, not a mistake; the marginal notes are the writer's voice arguing with the writer.

This concept also fits her *on stillness* — a piece that argues a finished thing is the wrong unit. *draft* says the same with structure rather than prose.

## Affordances
- **Skip to settled** — a hand-written link in the top-right; clicking sets the script speed to instant. The remaining pauses resolve in milliseconds and the page snaps to its final state.
- **`?fast`** in the URL skips animation entirely.
- **`prefers-reduced-motion: reduce`** — script runs at zero delay; caret blink off; no margin-note transitions. The visitor sees the settled draft.
- **Reload** — begins again. The script is deterministic; the cadence varies (per-character delay has small randomness), but the moves are the same.

## Structural oddness
- Each paragraph is modelled as an array of `{kind: 'text' | 'struck' | 'raw', text}` parts. Typing appends to the **head** part; striking changes its kind to `struck` and opens a fresh head. Mid-sentence revisions splice a `struck` part into the middle of the parts array. The DOM is re-rendered from this array on every keystroke. About 280 lines of JS.
- The caret is a `<span class="caret">` that lives at the end of whichever head is currently being typed. Pure CSS keyframe blink (`steps(2, jump-none)`).
- Marginalia are written into a per-row `<aside class="margin">` slot via CSS grid (`grid-template-columns: minmax(auto, 36ch) 16ch`). Each row is its own grid; the margin slot ends-aligns with the bottom of the prose.
- Time-of-day variants are six CSS variable bundles selected by `body[data-tod]`. The transition between paper colors is 1500 ms, so opening the site as the hour rolls over is gentle.
- ~280 lines of JS, ~220 lines of CSS, no framework, no library.

## Type
**Cormorant Garamond** for body, italic title, and most text — long descenders, a quiet italic that reads as written. **Caveat** for marginalia — a real handwriting face, used only in the right margin and the "skip to settled" link, exactly where a working writer would mark up their own draft in pencil. No other faces; no monospace; the page is consciously *not* a typewriter — it is a literary draft.
