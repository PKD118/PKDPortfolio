# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Biduyt Das's personal portfolio site — a static, no-build, no-dependency site deployed to Vercel. There is no `package.json`, no bundler, no framework. Every page is hand-authored HTML with inline `style` attributes plus a shared `styles.css` and `app.js`.

## Commands

There is no build step. To preview locally:

```
python3 -m http.server 5173
```

(matches the `dev` launch config in `.claude/launch.json`). Then open `http://localhost:5173`.

There is no test suite, linter, or CI. Verify changes by opening the page in a browser and checking both light and dark mode, and desktop/tablet/mobile widths (breakpoints are 1000px and 640px — see below).

## Structure

```
index.html            landing page, PM/product-role targeted (single file, all sections)
mobile/index.html      mobile-developer version of the landing page, served at /mobile
qa/index.html           SDET/QA automation version of the landing page, served at /qa
genfit/index.html      GenFit case study, served at /genfit (linked from both landing pages)
styles.css              shared: CSS variables, responsive overrides, .xN hover/active states
app.js                  shared: IIFE, vanilla JS, no dependencies
assets/                 photo, project images, GenFit screenshots, CV PDFs
vercel.json             rewrites (e.g. /flutter-cv -> PDF) + immutable cache headers for /assets
```

The site targets three audiences: the root page sells Biduyt as a **technical product manager**; `/mobile` sells him as a **mobile developer**; `/qa` sells him as an **SDET / QA automation engineer**. Same design system, same facts, different framing — content edits to one should be checked against the others so the stories never contradict.

`mobile/index.html`, `qa/index.html`, and `genfit/index.html` link back to the shared `../styles.css` and `../app.js` — any style/behavior change made there must stay in sync with the root page since all pages share the same stylesheet and script. Sub-pages reference assets as `../assets/...`.

## Architecture

**Styling model**: almost all styling is inline `style="..."` on elements, not CSS classes. `styles.css` only holds:
- CSS custom properties (`--bg`, `--fg-1`, `--surface`, `--brand`, etc.) defined once for light mode under `:root` and overridden under `[data-theme="dark"]`. Any new color should be a var reference (`var(--fg-2)`), not a literal hex, so dark mode stays correct for free.
- Responsive overrides keyed off `data-*` attributes (`[data-g="3"]`, `[data-hero-wrap]`, `[data-pad]`, etc.) inside two media queries (`max-width: 1000px`, `max-width: 640px`). New responsive elements should follow this pattern: give the element a `data-*` hook, then add the override in the existing media query blocks rather than introducing new breakpoints.
- A handful of numbered hover/active classes (`.x1` through `.x8`) reused across both pages for interactive elements, since inline styles can't express `:hover`/`:active`.

**Theme system**: an inline `<script>` in each page's `<head>` reads `localStorage['pkd-portfolio-theme']` (falling back to `prefers-color-scheme`) and sets `data-theme="dark"` on `<html>` *before* paint, avoiding a flash of the wrong theme. `app.js`'s `initTheme()` then wires up the toggle button and persists the choice. The accent color itself is computed once at runtime in `app.js` (`shade()` derives light/dark tints from a single `ACCENT` hex) and written into `--brand-user`/`--brand-user-dark` CSS vars — change the accent by editing the `ACCENT` constant at the top of `app.js`, not by hunting for hardcoded colors.

**`app.js` responsibilities** (single IIFE, no modules/build step): theme init, scroll-triggered reveal animations (`[data-reveal]` + `IntersectionObserver`), hover lift effect (`[data-lift]`), scroll spy + progress bar + back-to-top button (`[data-navlink]`, `[data-progress]`, `[data-totop]`), and a mouse-parallax tilt effect on hero phone mockups (`[data-tilt]`, desktop only, skipped under `prefers-reduced-motion` or on narrow viewports).

**Sections** (`index.html`, matched by `id`): `#top` (hero), `#work`, `#skills`, `#experience`, `#about`, `#contact`. Nav links scroll-spy against these via `data-navlink`.

## Conventions

- No inline style should hardcode a color that has a light/dark counterpart — use the CSS variables from `styles.css`.
- Match the existing inline-style-heavy authoring style rather than extracting classes or components; this is a deliberate no-build-tool constraint, not an oversight.
- Respect `prefers-reduced-motion` for any new animation (see `app.js`'s `reduced` check).
- Downloadable asset links (CV, case-study PDFs) point into `assets/`; the flutter CV is additionally exposed at the clean URL `/flutter-cv` via a rewrite in `vercel.json`.
- Cache headers in `vercel.json` mark everything under `/assets/` as immutable — if replacing an existing asset file (e.g. a screenshot) rather than adding a new one, rename it or bump a query string, since browsers/CDN will otherwise serve the stale cached version for a year.

## Deploy

See `DEPLOY.md` for full Vercel setup steps (production branch, build settings, `/v1` proxy to the previous site). Key points: deploy is `main` with no build command and output directory `.`.
