# CLAUDE.md

we're building the app described in @SPEC.md. read that file for general architectural tasks.

keep your answers extremely concise and focus on conveying the key information. no neccessery fluff, no long code snippets.

whenever working with any third-party library or something similar, you must look up the official documentation to ensure that you're working with up-to-date information. 
use the DocsExplorer subagent for effecient documentation lookup.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm start              # Start dev server at http://localhost:4200

# Build
npm run build          # Production build (outputs to dist/portfolio-app)
ng build --configuration development  # Development build

# Testing
npm test               # Run unit tests via Karma

# SSR (Server-Side Rendering)
npm run serve:ssr:portfolio-app  # Run SSR server at http://localhost:4000 (requires build first)

# Code Generation
ng generate component <name>     # Generate new component
ng generate service <name>       # Generate new service
```

## Architecture

This is an Angular 17 portfolio website with SSR support using standalone components (no NgModules).

### Key Architecture Decisions

- **Standalone Components**: All components use `standalone: true` - no NgModules
- **SSR Enabled**: Pre-rendering and server-side rendering via `@angular/ssr` with Express server (`server.ts`)
- **Static Content**: Content is intended to be managed via JSON files in `assets/data/` (see SPEC.md for data models)
- **Feature-based Structure**: Each portfolio section (about, projects, reading, uses, articles) is a separate component

### Routes (app.routes.ts)

Each route also carries a `title` and a `data.description`, consumed by
`SeoTitleStrategy` to set per-page title/meta/canonical tags at prerender time.

| Path | Component |
|------|-----------|
| `/` | HomeComponent |
| `/about` | AboutComponent |
| `/projects` | ProjectsComponent |
| `/articles` | ArticlesComponent |
| `/uses` | UsesComponent |
| `/reading` | ReadingComponent |
| `**` | redirects to `/` |

### Project Structure

```
src/app/
├── core/
│   ├── models/         # One interface file per content type
│   ├── services/
│   │   ├── content.service.ts  # Loads all assets/data/*.json
│   │   ├── theme.service.ts    # Light/dark toggle
│   │   └── seo.strategy.ts     # Per-route title/meta/canonical
│   └── site.config.ts  # SITE_URL and shared metadata defaults
├── shared/components/
│   ├── layout/         # Page shell: skip link, header, main, footer
│   ├── header/         # Brand, nav, theme toggle
│   ├── footer/
│   └── ascii-field/    # Canvas background for the home hero
├── about/ articles/ home/ projects/ reading/ uses/   # Page components
├── app.component.ts
├── app.config.ts
├── app.config.server.ts
└── app.routes.ts
```

## Specification

See [SPEC.md](SPEC.md) for the full technical specification including:
- Data models (Article, Project, ReadingYear)
- Content management strategy (JSON files in `assets/data/`)
- Styling strategy
- Deployment options


## Styling

There is **no Tailwind**. `src/styles.css` is a hand-written ~410-line layer:
design tokens, a reset, base typography, link and focus styles, and a few shared
classes (`.page`, `.measure`, `.page-head`, `.lede`, `.empty`, `.tag`).
Everything else lives in per-component `.component.css` files.

(Before the redesign this file was a 2,606-line pre-compiled Tailwind bundle with
no Tailwind in `package.json`, so any utility class not already in it silently did
nothing. Don't reintroduce utility classes.)

### Tokens

Defined on `:root` and overridden under `html.dark`. Never hardcode a colour —
use the token.

- Surfaces: `--bg`, `--bg-2`, `--bg-3`
- Text, faint to strong: `--txt-3`, `--txt-2`, `--txt`, `--txt-0`
- `--accent`, `--accent-soft`
- Canvas: `--ascii-hue`, `--ascii-sat`, `--ascii-lightness`, `--ascii-alpha`
- Type: `--font-sans` (IBM Plex Sans), `--font-mono` (IBM Plex Mono)
- Layout: `--container` (60rem), `--measure` (42rem), `--gutter`

Every text token clears WCAG AA against its own background. Re-check the ratio if
you change one.

Fonts are self-hosted via `@fontsource`, registered in the `styles` array in
`angular.json`. `IBM Plex Sans Arabic` sits in the `--font-sans` stack so the
Arabic titles on `/reading` render correctly; that page sets `lang`/`dir` per row.

### Theme

`ThemeService` toggles `.dark` on `<html>`. An inline script in `index.html`
applies the stored theme **before first paint** — without it, prerendered pages
flash white for dark-mode visitors. The service reads the class back rather than
re-deriving it, so the two cannot disagree.

## Content

All content is JSON in `src/assets/data/`, loaded by `ContentService`. To add a
content type: add a model in `core/models/`, a JSON file, and a `load()` line in
`ContentService`.

`projects.json` and `experience.json` currently hold entries prefixed
`PLACEHOLDER —`. Replace them with real content; the prefix is there so they
cannot ship unnoticed.

Before publishing, set `SITE_URL` in `core/site.config.ts` and the matching
absolute URLs in `src/index.html`.
