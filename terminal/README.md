# concept: terminal

The site **is** a Unix shell. No nav, no hero, no card grid. You type to get anywhere.

## Axis of weirdness
**Input modality.** Every conventional site is pointer-first. This one is text-first with pointer fallback (blue words are clickable and run the command they would type).

## Try
```
help
ls
cd projects
cat slowcompiler.md
display ~/art/sketch-03.svg
tree
sudo make coffee
```

Arrow keys cycle command history. Tab completes.

## Why it works for Grace
SWE signal is on-brand but the texture is emotional — SVG "paintings," writing titled *on stillness*, projects that take a year to finish. The terminal isn't a gimmick for engineering credibility; it's a frame that lets poetry sit next to source.

## What's weird about it, structurally
- CRT vignette + scanlines + flicker (pure CSS)
- Virtual filesystem with `ls`, `cd`, `cat`, `tree`, `display`, `sudo`, tab-completion, history
- Art files render inline as SVG in `<pre>`-style art frames
- No URL routing, no framework, ~9KB of JS, works offline
