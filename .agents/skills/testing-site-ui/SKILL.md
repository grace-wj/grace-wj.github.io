---
name: testing-site-ui
description: Serve and UI-test the grace-wj.github.io static site locally. Use when verifying front-end changes (theming, wordmark, layout) end-to-end in a browser.
---

# Testing grace-wj.github.io locally

This is a **static site** — plain HTML/CSS/JS, no build step, no package manager, no CI checks (GitHub Pages auto-deploys `main`). There are no lint/typecheck/test commands to run.

## Run it
```
cd /path/to/grace-wj.github.io
python3 -m http.server 8000
# open http://localhost:8000
```
Use a server (not `file://`) so root-relative paths like `/theme.js`, `/style.css`, and `/wordmarks/*.svg` resolve. Pages live at `/`, `/projects/`, `/posts/`, `/design/`, `/reading/`, `/quotes/`.

## Quick JS sanity check before browser testing
```
node --check theme.js && node --check wordmark.js && node --check footer.js
```

## Architecture notes that matter for testing
- **Design system:** 4 CSS surface vars in `:root` of `style.css` — `--fg`, `--muted`, `--bg`, `--rule` — plus `--wm-ink` for the wordmark. Every size is `rem`-based off `html { font-size }`.
- **Color themes:** `theme.js` (loaded in `<head>` on every page) sets `data-theme` on `<html>` from `localStorage['site-theme']` before first paint. Palettes are `:root[data-theme="<id>"]` blocks in `style.css`. `mono` (default B&W) carries no attribute. The rotating `#theme-toggle` control (`prefer color?`) exists only on the home page; the theme itself applies site-wide and persists across navigation.
- **Wordmark:** the masthead is single-color SVGs (`fill=#000`) in `/wordmarks/`. Rendered as a CSS **mask** on `#masthead-img` painted by `var(--wm-ink)` so themes recolor it — external `<img>` SVGs can't be recolored by page CSS. `wordmark.js` swaps designs by setting `--wm-src` (a `url(...)`), not `img.src`, and applies the warp/morph filter to the same element.

## UI testing tips
- To recolor the theme, **click the `prefer color?` control** (bottom-right of the home hero row) — each click advances one theme and wraps. Don't use devtools. The label position shifts as the theme name changes width, so re-screenshot and click on the visible label text if a click misses.
- Prove the wordmark recolor is real (not a static black image) by checking the mark takes the theme accent color on each theme.
- Prove persistence by switching to a non-default theme, then clicking a nav link and confirming the new page keeps the palette with no flash back to mono.
- To reset to the default `mono`, keep clicking until the label reads `prefer color?` (or clear `localStorage`).

## Devin Secrets Needed
None — fully local, no auth.
