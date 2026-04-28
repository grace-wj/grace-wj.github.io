# concept: carillon

A six-bell **carillon** for one polymath. Each bell is cast for one work; click a bell, it tolls; click two, they form a chord. All bells synthesized in the browser via FM — no audio file dependencies, no autoplay.

## Axis of weirdness
**Sound-led.** The portfolio's primary medium is sound; the layout follows. The other concepts can show their hand silent; this one is incomplete until you ring it. Between strikes is also part of the page — silence is a position the carillon argues for.

## Six bells
| roman | name                          | fund. | role                       |
|-------|-------------------------------|------:|----------------------------|
| i.    | hum                           |  C5   | the synthesizer            |
| ii.   | slowcompiler                  |  F4   | the compiler               |
| iii.  | weft                          |  F3   | the loom                   |
| iv.   | three bodies, orbiting        |  G4   | the painting series        |
| v.    | on stillness                  |  C4   | the essay                  |
| vi.   | letters                       |  C3   | slow correspondence        |

Plus a **tenor** (F2) on a rope at the bottom that tolls the quarter hour — once the visitor has turned audio on, never before.

## How it sounds
Every strike is built from eight inharmonic partials (hum, prime, tierce, quint, nominal, super-quint, octave-nominal, &c) — the partial set of a real Western change-ringing bell. Each partial is a one-operator FM voice in which:
- the carrier is a sine at the partial's frequency,
- the modulator (sine, ratio per bell) drives the carrier's frequency through a depth envelope that **dies in ~200 ms** — this is the bright metallic *ping* at the strike,
- the carrier amplitude decays exponentially over ~6–14 s — this is the bell *singing*.

There is also a 60-millisecond bandpass-noise burst at strike: that's the clapper hitting bronze.

The whole thing runs through a synthesized convolver IR (~2.6 s) — a modest stone-room reverb with four early reflections. Bigger bells decay longer because their `data-decay` and `data-mass` are heavier; the swing animation slows in proportion.

## How to play
- **Click** a bell — strike
- **<kbd>a s d f g h</kbd>** — strike bells i–vi
- **<kbd>r</kbd>** — peal: all six in slow sequence
- **<kbd>space</kbd>** — toll the tenor
- **Pull the rope** at the bottom — toll the tenor manually

A "begin" button gates the first sound. The page never plays audio until the visitor invites it. After the first strike, the tenor will toll once on every quarter hour.

## Why it works for Grace
Grace makes work that listens — *hum*, the synthesizer; the slow compiler that prints haiku; the loom that turns commits into thread. A carillon is a public instrument: civic, a little melancholic, made to be heard by people who weren't meant to be the audience. It is closer in tone to her *on stillness* than any other surface here: a thing that asks for patience, gives little, and means it.

## Structural oddness
- No audio files. Every strike is built sample-by-sample from FM oscillators in `script.js`. Refresh and the noise bursts are different (seeded by `Math.random`).
- The convolver impulse response is itself synthesized in JS at load — six lines of decaying-noise plus four early-reflection spikes. Stone room, not preset.
- The bell shape is one inline `<svg>` `<path>` per bell, with a `<textPath>` running an inscription around its rim. The inscriptions are real (`for those who cannot read music`, `one thread per commit · one scarf per orbit`, &c.). Six bells × six gradients × six inscriptions, each cast in a slightly different shade of bronze.
- Heavier bells (longer decay, lower fundamental) get larger `--peak` swing angles and longer `--swing-dur` — the swing matches the moment-of-inertia of the bell you'd actually hear.
- The tenor is on a rope you can pull. Audio gates: nothing rings until a click; the quarter-hour auto-toll only schedules itself **after** the first user click. There is no path by which this page autoplays sound.
- `prefers-reduced-motion` swaps the swing animation for a quiet outline — bells still ring, they just don't move.
- ~330 lines of JS, ~270 lines of CSS, no framework, no library.

## Type
**Cormorant Garamond** for body and italic display — a modern Garamond with the long descenders and high-contrast italics that read as engraved-on-bronze. **Cormorant SC** (small caps) for kickers, romans, and inscriptions — small caps are the right register for *campanus gratiae*.
