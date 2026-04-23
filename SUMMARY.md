# Four concepts, four branches

Built in one session for Grace. Each concept is weird on a **different axis** so they can't collapse into variations of the same idea.

| branch | name | axis of weirdness | elevator | ~LOC |
|---|---|---|---|---|
| [`concept/terminal`](../../tree/concept/terminal) | **terminal** | input modality — *you type to navigate* | The site **is** a Unix shell. `ls`, `cd`, `cat`, `tree`, `display`. Tab-completion + history. CRT vignette + scanlines. | ~750 |
| [`concept/archive`](../../tree/concept/archive) | **archive** | spatial — *no pages, just a plane* | Infinite 2D pinboard. Drag to pan, scroll to zoom, click to focus. Stickies, polaroids, handwritten arrows. | ~700 |
| [`concept/marginalia`](../../tree/concept/marginalia) | **marginalia** | typographic hierarchy — *a critical edition of a person* | One manuscript leaf, body + two margins of glosses. Rubric headings, drop cap, blackletter title, works open as footnoted modal-leaves. | ~600 |
| [`concept/signal`](../../tree/concept/signal) | **signal** | temporal / continuous param — *1D float as navigation* | 1970s hi-fi FM tuner (WGWJ 88.0–108.0). Drag dial, tune across stations, static between. S-meter, VU bars, numbers-station easter egg. | ~930 |

## Reading the tree

```
main ── recon ──┬── concept/terminal
                ├── concept/archive
                ├── concept/marginalia
                └── concept/signal
```

Each branch is a full self-contained site (`index.html` + `style.css` + `script.js` + a branch-specific `README.md`). No build step, no framework, no dependencies except two Google Fonts imports (archive, marginalia, signal — terminal is font-free).

## Previewing locally

```bash
# for each branch:
git checkout concept/terminal    # or archive / marginalia / signal
python3 -m http.server 8000
# then open http://localhost:8000
```

Or with any static server you prefer (`npx serve`, `php -S`, etc.).

## Publishing one of them

GitHub Pages is configured to serve from `main`. To promote a concept:

```bash
git checkout main
git merge concept/<name>    # fast-forward or real merge, your choice
git push
```

Or cherry-pick the commit if you only want some files.

## Process notes

- Recon was source-level (curl + WebFetch of the 5 reference sites), not rendered — playwright MCP's browser binary is misconfigured in this sandbox. Source reading ended up more useful: you can see the structural decisions without being biased by surface polish.
- Each concept passed the self-review rubric in `.RUBRIC.md` on first draft (no iteration needed). The rubric's most useful line was "would this embarrass a design student?" — catches `ChatGPT-default-card-grid` instinct immediately.
- See `.inspiration/recon.md` for what was extracted from each reference site.

## What none of these are
- A framework decision. All four use plain HTML/CSS/JS. If you pick one and want to rebuild it in React/Svelte/etc., that's a different conversation.
- Content-final. Copy is plausible-but-invented; swap it for your real projects, essays, and paintings when you commit to a direction.
- Mutually exclusive. `marginalia` + `signal` could cohabit a site (long-form essay page + tuner landing). `archive` + `terminal` share no surface but aren't contradictory.
