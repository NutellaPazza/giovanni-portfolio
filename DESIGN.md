# Design

## Theme

A hiring manager at a fund, bank or VC firm opens the link from LinkedIn on a laptop between calls, in daylight. The first screen must read like opening a trading terminal; everything below must read like a clean fintech product page. So the site alternates dark terminal bands (hero, career timeline, page heads, footer) with light paper reading surfaces.

## Color

OKLCH tokens in `src/styles.css`. Strategy: Committed brand key on two grounds.

- Terminal ground `--term` (blue-black) and paper ground `--paper` (warm off-white).
- Amber `--amber` is the brand key: function keys, primary buttons, the chart line, focus rings. On paper, text accents use the darker `--amber-ink`.
- Green `--up` and red `--down` appear only as market signals (returns, drawdowns, grades).
- The deal-room band uses `--amber-wash` as a full ground for the startup section.

## Typography

- Schibsted Grotesk (variable 400 to 900) for everything readable. Tight negative tracking on display sizes, weight 760 to 820 for headings.
- JetBrains Mono only for data: labels, codes, numbers, dates, axis ticks. Tabular figures.
- Body copy stays under 70 characters per line.

## Layout

- `.wrap` sets equal edges at every width. Sections are `.band` with fluid vertical padding.
- Lists of work are tables, not card grids: the positions blotter (projects), filings (research), roles (experience).
- Term sheets are the only card style, used for ventures.
- Detail pages use a report layout: a mono label column on the left, prose on the right.

## Components

Navbar, Footer, Ticker, EquityTerminal (interactive BT3 equity chart), Blotter, Filings, DealRoom, CareerChart, PageHead, Report sections (text, list, chips, links, related), MediaGallery with lightbox, Tabs (function-key filters).

## Motion

- Hero and page heads enter once on load with a staggered rise; the equity line draws itself; career bars grow from their start date.
- The ticker scrolls continuously, pauses on hover and has a pause button.
- Hover: rows fill with an amber wash from the left, arrows slide, buttons lift 1px and press on click, links draw an underline.
- All entrance animations use `backwards` fill, so content is visible even if animations never run. Under `prefers-reduced-motion` every animation is off.
- No data is fetched on a timer; every number is static and real.

## Imagery

Real photographs only: the portrait, hobby photos, project covers and research charts. Photos sit in rounded frames and zoom slightly on hover.
