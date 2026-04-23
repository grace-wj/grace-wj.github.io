# concept: archive

A pinboard the size of a memory. Drag to pan, scroll to zoom, click to focus.

## Axis of weirdness
**Spatial.** There are no pages. There is only a 2D plane with polaroids, sticky notes, handwritten arrows, gouache tide-charts, and project cards pinned up somewhere on it. You find things by wandering.

## Navigation
- **Drag** anywhere to pan
- **Scroll / pinch** to zoom (cursor-anchored)
- **Click** a pinned item to focus and ease toward it; click background to release
- <kbd>r</kbd> recenters · <kbd>Esc</kbd> unfocuses · <kbd>+/-</kbd> zoom · arrows nudge

## Why it works for Grace
A polymath doesn't really have an IA. Writing, code, and painting live in the same room in her head. A pinboard admits that: *here is the room, these are the things in it, the relationships are spatial.* Stickies call back to oils; compiler haiku sits next to a tide chart.

## Structural oddness
- No routes, no pages, no menu. One DOM tree, one `<div class="world">` with a CSS `transform`.
- Cursor-anchored zoom math (standard but uncommon in personal sites)
- Polaroid / sticky / zine / scrap / annotation are CSS-only "paper" (tape, wavy underline, fraunces + caveat)
- Minimap shows your camera rectangle over the world bounds
- No framework, ~4kb JS, progressive-enhanced drag/zoom via Pointer Events
