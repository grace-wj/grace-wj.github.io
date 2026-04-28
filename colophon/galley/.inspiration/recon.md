# Reference-Site Recon

Source extraction via WebFetch + curl (playwright MCP was misconfigured — browser binary in wrong path). Focus: what makes each site FORMALLY unusual.

## 1. narrowdesign.com (Nick Jones)
- **Scroll-as-narrative.** Paginated "1/7" counter; sections are full-screen stacks rather than cards.
- **Content warning as personality.** "Do not proceed if you suffer from vertigo or find experimental interfaces offensive. More accessible version." — treats the site itself as an experience that needs opt-in.
- **Self-aware first-person copy.** "I didn't get one…" / "I'm open to being wrong." The voice is the portfolio.
- **Async JS content injection** (`Loading Project Title...` placeholders visible pre-hydration).

## 2. ozgekeles.com
- **Modal-takeover nav.** No header nav; full-screen overlays for Projects/Playground/Contact with explicit CLOSE button.
- **Asymmetric/staggered layout.** Project widths vary; breathing room is intentional, not residual.
- **Typographic rhythm via punctuation.** Parentheticals "(ex)", brackets "[understanding]", no periods. Stream-of-consciousness pacing.
- **Infinite client marquee in footer.**
- **Motion ethos stated in copy**: "motion should feel inevitable, not decorative."

## 3. reimer.tz (Piérre Reimertz)
- **ASCII box-drawing as layout primitive.** `╭ ├ ╰` box-drawing characters structure the ENTIRE navigation as a literal filesystem tree.
- **Monospace everywhere.** Terminal aesthetic — presumably dark bg, monospace font, no gradients, no shadows.
- **Tree-as-IA.** Projects, talks, security, art clustered into a single visible tree. No dropdowns, no hamburger.
- **Casual + technical tension.** "hi, my name is piérre" next to "fuckup #1" — irreverent humanity inside terminal formality.

## 4. eli.wtf (Eli Fitch)
- **Three giant color-blocks as nav.** `work` (pink) / `wtf?` (green) / `words` (orange). No header. Nav IS the page.
- **Canvas-based 3D skull** (`.js-homepage-skull` div + async JS bundle). Rendered live, likely Three.js or raw WebGL.
- **Custom clock-hand loader** (`.loader__counting-hand`) — bespoke loading animation.
- **.wtf domain + `wtf?` as the about link** = irreverence baked into the IA.

## 5. richardmattka.com
- **Cyclical/looped pagination.** `⇠ prev` / `next ⇢` arrows that likely loop at the end (no terminal page).
- **Minimal text + recurring SVG mascot.** Trusts form over copy.
- **Non-hierarchical.** Work/press/prototypes/art are siblings in a carousel, not a menu tree.

## Cross-cutting observations
- All five **reimagine navigation** as the core design move. Not "the menu looks nice" — "the menu IS the site."
- All five have a **strong voice via non-content means** (typography, color-block, tree, frequency, warning banner).
- None use **card-grid portfolio convention**. Zero.
- Motion is always **deliberate and authored**, never just CSS hover states.
- **Irreverence** appears in 3/5 (narrowdesign self-deprecation, reimer fuckups, eli.wtf domain).

## Takeaway for concepts
Weirdness is structural or interactional, not cosmetic. A "weird font on a normal layout" is not weird. The navigation model is the highest-leverage place to put weirdness because every visitor touches it.
