# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for "Exit HR Solutions", an HR consultancy. No build system, no package manager, no tests — plain HTML/CSS/vanilla JS.

## Running locally

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Architecture — important caveat

There are **two parallel implementations** of the styling/scripting and only one is wired up:

1. **Live track** — `index.html` loads `css/styles.css` (single consolidated stylesheet, ~141 lines) and `js/main.js` (year stamp, mobile menu toggle, scroll-reveal via IntersectionObserver). This is what actually renders.

2. **Orphaned modular refactor** — `css/reset.css`, `css/variable.css`, `css/layout.css`, `css/component.css`, `css/animation.css` and `js/cursor.js`, `js/nav.js`, `js/animation.js`, `js/counter.js`, `js/testimonials.js`. These files exist but **nothing references them** — they use a different design-token vocabulary (`--c-bg`, `--c-ink`, `--sp-gutter`, …) than the live `styles.css` (`--ink`, `--muted`, `--line`, `--bg`, …). Edits here have no visible effect until the HTML is rewired.

When making changes, decide which track you're editing and stay consistent. If the user wants a visible change, edit `index.html` and `css/styles.css` (and `js/main.js` if behavior) — not the orphaned modules — unless they explicitly ask to migrate to the modular structure.

## Design tokens

Defined as CSS custom properties in `css/styles.css` `:root`: `--ink`, `--muted`, `--line`, `--bg`, `--bg-alt`, `--max`, `--pad`. Bordered sections (`.section.bordered`) invert to a black background with white text — when adding components inside one, override colors there too (see existing `.section.bordered .card`, `.section.bordered .block`, etc.).

Font: Inter (300–700) loaded from Google Fonts. No display/serif pairing.

## Assets

Image assets live in `assests/` (note the misspelling — keep it; renaming breaks any existing `<img src>` references).
