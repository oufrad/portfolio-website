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

| Path | Component |
|------|-----------|
| `/` | HomeComponent |
| `/about` | AboutComponent |
| `/projects` | ProjectsComponent |
| `/reading` | ReadingComponent |
| `/uses` | UsesComponent |
| `/articles` | ReadingComponent |

### Project Structure

```
src/app/
├── about/          # About page component
├── articles/       # Articles list component
├── home/           # Home/landing page component
├── projects/       # Projects showcase component
├── reading/        # Reading list component
├── uses/           # Hardware/software stack component
├── app.component.ts    # Root component (standalone)
├── app.config.ts       # Application configuration with providers
├── app.config.server.ts # Server-side configuration
└── app.routes.ts       # Route definitions
```

## Specification

See [SPEC.md](SPEC.md) for the full technical specification including:
- Data models (Article, Project, ReadingYear)
- Content management strategy (JSON files in `assets/data/`)
- Styling strategy
- Deployment options
