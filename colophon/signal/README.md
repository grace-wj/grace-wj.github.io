# concept: signal

WGWJ 88.0–108.0 FM. A personal website shaped like a **1970s hi-fi tuner**. Tune across the dial; each frequency broadcasts a different part of Grace — code, ink, words, logs. Between stations: static.

## Axis of weirdness
**Temporal / continuous navigation.** Every site has discrete pages. This one has a single continuous 1D parameter (frequency). You are always *between* things; you have to aim.

## How to tune
- **Drag the dial** left/right
- **Scroll** over the dial (mousewheel / trackpad)
- **Rotate the tuning knob** on the right
- **Click a preset** (88.3 · 91.7 · 95.1 · 98.5 · 102.9)
- **Arrow keys**: ← → nudge · ↑ ↓ jump to next / previous station

Lock-in is ±0.3 MHz. Off-channel drifts into static and the VU bars go dark.

## Why it works for Grace
Polymath = many stations on one band. The site is honest about switching between them — and about the static in between, which is its own aesthetic.

## Structural oddness
- Continuous parameter as IA: a float, not a route
- Custom dial with major/minor ticks, colored station markers, red needle with shadow glow
- S-meter (signal strength) widens as you approach a station
- Card blurs and gains SVG noise static when off-channel
- Horizontal ticker of station metadata per channel
- Fake VU bars (randomized when locked, damped off)
- Easter egg: 102.9 is a numbers station
