# Portfolio

Personal site for Mohamed Oufrad — software engineer and data engineer, Rabat, Morocco.

Angular 17, standalone components, signals, SSR with prerendering. No CSS
framework: styling is a hand-written token layer plus per-component CSS.

## Commands

```bash
npm start        # dev server -> http://localhost:4200
npm run build    # production build + prerender -> dist/portfolio-app
npm test         # unit tests (Karma + Jasmine)

npm run serve:ssr:portfolio-app   # run the SSR server (after a build) -> :4000
```

Tests need a Chromium binary. If Chrome isn't installed at the default path:

```bash
export CHROME_BIN="/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"
npx ng test --watch=false --browsers=ChromeHeadless
```

## Editing content

All content lives in `src/assets/data/` as JSON — no code changes needed to
update the site.

| File | Drives |
|---|---|
| `site.json` | Site name, nav links, footer links |
| `home.json` | Name, title, homepage bio, social links |
| `about.json` | About-page bio and links |
| `experience.json` | Work history timeline on `/about` |
| `projects.json` | `/projects` cards, including tech tags |
| `articles.json` | `/articles`, grouped by year |
| `reading.json` | `/reading`, grouped by year, optional 1–5 rating |
| `uses.json` | `/uses`, grouped by category |

Empty arrays render a proper empty state, and categories with no items are
skipped — a section will never show as a heading with nothing under it.

## Before publishing

1. Replace every entry prefixed `PLACEHOLDER —` in `projects.json` and
   `experience.json`. Fill in the `start`/`end` months for the Hahn Software
   entry; they're deliberately omitted rather than guessed.
2. Set `SITE_URL` in `src/app/core/site.config.ts` to the real domain, and
   update the matching absolute URLs in `src/index.html` (canonical, `og:url`,
   `og:image`, `twitter:image`, and the JSON-LD block).

## Design

Warm charcoal and amber, light and dark, IBM Plex Mono for headings and UI with
IBM Plex Sans for body copy. Tokens are defined on `:root` and overridden under
`html.dark`; see [CLAUDE.md](CLAUDE.md) for the full list and the rules around
them. Every text colour clears WCAG AA against its own background.

The homepage hero sits over `AsciiFieldComponent`, a canvas field of ASCII
glyphs tracing contours through layered sine waves and value noise, with a bulge
that follows the pointer. It reads its colour from CSS custom properties so it
follows the theme, throttles to ~20fps, runs outside Angular's zone, and draws a
single static frame under `prefers-reduced-motion`.
