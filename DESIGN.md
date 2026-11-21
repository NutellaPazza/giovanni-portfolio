# Design

## Theme

"Quiet capital": calm near-black surfaces, warm off-white ink, hairline structure. A recruiter opening the link from LinkedIn should feel a confident, uncluttered fintech-grade page, not a dashboard.

## Color

OKLCH tokens in `src/styles.css`. Strategy: Restrained.

- Ground `--bg` (near-black), raised sections `--bg-2`, hover surfaces `--bg-3`.
- Ink `--ink` (warm off-white) with `--ink-2`, `--mute` and `--faint` for hierarchy.
- One accent, `--accent` (soft green), used sparingly: the live dot, grades, focus rings, a few dollar signs in the cursor trail.
- A faint film grain over the whole page keeps the dark surfaces from looking flat.

## Typography

- Funnel Display for headings: weight 300 for most of a heading, 600 for the emphasised words.
- Funnel Sans for body copy, Geist Mono only for labels, dates and the intro terminal.
- Body copy stays under 70 characters per line.

## Layout

- `.wrap` sets equal edges. Sections are separated by hairlines, with generous vertical rhythm.
- The home page is short: the hero (with LinkedIn, GitHub and email visible at once) and an index of four sections. Work, Research, Ventures and Experience each have their own page.
- Work is a numbered list, not a card grid; hovering a row brings it forward and dims the others.
- Research is a hairline grid of papers; ventures are three outlined panels; experience is a timeline list.
- Detail pages use a report layout: a mono label column on the left, prose on the right.

## Motion

- **Intro** (home page, first visit per session, never under reduced motion): a black terminal types the ticker GDS, a lookup row resolves it to Giovanni De Stasio, Enter (or the Open button) confirms it, and the black screen dissolves into characters from the centre outward, revealing the site while the hero enters. Faint falling glyphs fill the background while the ticker is typed. Key clicks are synthesised with WebAudio and play once the visitor has pressed a key or tapped. Skip and Escape end it at once.
- **Hero** entrance: one staggered rise, released when the dissolve starts.
- **Portrait**: hovering the photo opens an ASCII lens: the area under the cursor is redrawn as characters from the photo's own brightness.
- **Dollar trail**: dollar signs follow a fine pointer, inherit some of its velocity, fall and fade; a click releases a small burst. Pooled elements, one requestAnimationFrame loop that stops when idle.
- **Hover**: list rows dim their siblings and slide, arrows move up-right, buttons press on click, links draw an underline, photos zoom slightly.
- All entrances use backwards fill, so content is visible even if animations never run. Under `prefers-reduced-motion` everything is static.

## Imagery

Real photographs only: the portrait, hobby photos, project covers and research charts.
