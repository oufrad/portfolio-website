# Angular Portfolio Website – Technical Specification

## Table of Contents

- [1. Overview](#1-overview)
- [2. Goals & Non-Goals](#2-goals--non-goals)
- [3. Tech Stack](#3-tech-stack)
- [4. Project Structure](#4-project-structure)
- [5. Architecture Principles](#5-architecture-principles)
- [6. Routing Strategy](#6-routing-strategy)
- [7. Content Management (No Backend)](#7-content-management-no-backend)
- [8. Core Models](#8-core-models)
- [9. Services Layer](#9-services-layer)
- [10. Components Design](#10-components-design)
- [11. Styling Strategy](#11-styling-strategy)
- [12. SEO & Performance](#12-seo--performance)
- [13. Deployment Strategy](#13-deployment-strategy)
- [14. Future Enhancements](#14-future-enhancements)
- [15. Guiding Principles](#15-guiding-principles)

---

## 1. Overview

This document defines the technical specification for a **static Angular-based portfolio website**. The portfolio showcases:

- Personal description / about section
- Articles written over time
- Personal and professional projects
- Hardware & software stack
- Reading list with yearly tracking

The website will **not use a backend initially**. All content is managed locally within the Angular project and deployed as a static site. Future backend integration is considered in the design.

## 2. Goals & Non-Goals

### 2.1 Goals

- Clean, maintainable Angular architecture
- Static-content-driven (JSON / TS-based content)
- Easy to update content and redeploy
- SEO-friendly
- Performant and deployable on static hosting
- Future-proof structure for backend or CMS integration

### 2.2 Non-Goals (for now)

- Authentication or admin panel
- Dynamic user-generated content
- Server-side rendering (SSR) initially

## 3. Tech Stack

### 3.1 Core

- **Angular** (latest stable version)
- **TypeScript**
- **HTML / CSS** (already adapted from an existing portfolio)

### 3.2 Optional / Recommended

- Angular Router
- Angular CLI
- SCSS (optional but recommended)
- Prism.js or Highlight.js (for articles/code snippets)

## 4. Project Structure

```text
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   ├── services/
│   │   └── constants/
│   ├── shared/
│   │   ├── components/
│   │   ├── pipes/
│   │   └── directives/
│   ├── features/
│   │   ├── about/
│   │   ├── articles/
│   │   ├── projects/
│   │   ├── stack/
│   │   └── readings/
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
│
├── assets/
│   ├── images/
│   ├── articles/
│   └── data/
│       ├── articles.json
│       ├── projects.json
│       ├── stack.json
│       └── readings.json
│
├── styles/
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── global.scss
│
└── index.html
```

## 5. Architecture Principles

### 5.1 Feature-Based Architecture

Each major section of the portfolio is a **feature module**:

- Self-contained components
- Own routing (optional)
- Easy to scale or refactor

### 5.2 Separation of Concerns

- **Components**: UI only
- **Services**: Data access (JSON / static TS)
- **Models**: Strong typing
- **Assets**: Static content

## 6. Routing Strategy

| Route              | Description                |
| ------------------ | -------------------------- |
| `/about`           | About/personal section     |
| `/articles`        | Articles list              |
| `/articles/:slug`  | Individual article         |
| `/projects`        | Projects showcase          |
| `/stack`           | Hardware & software stack  |
| `/readings`        | Reading list               |

- Lazy loading for feature modules
- SEO-friendly paths
- Articles use a `slug` field

## 7. Content Management (No Backend)

### 7.1 Data Storage Options

**Preferred:** JSON files in `assets/data`

**Advantages:**

- Easy to edit
- Clean separation from UI
- Backend-ready later

**Example:** `articles.json`

```json
[
  {
    "title": "Building Data Pipelines",
    "slug": "building-data-pipelines",
    "date": "2025-01-12",
    "summary": "Thoughts on ETL and modern data stacks",
    "contentPath": "assets/articles/building-data-pipelines.md"
  }
]
```

## 8. Core Models

### 8.1 Article Model

```typescript
export interface Article {
  title: string;
  slug: string;
  date: string;
  summary: string;
  contentPath: string;
}
```

### 8.2 Project Model

```typescript
export interface Project {
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}
```

### 8.3 Reading Model

```typescript
export interface ReadingYear {
  year: number;
  books: {
    title: string;
    author: string;
    notes?: string;
  }[];
}
```

## 9. Services Layer

### 9.1 Static Data Service Pattern

```typescript
@Injectable({ providedIn: 'root' })
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('assets/data/articles.json');
  }
}
```

- Abstract data access
- Replaceable by API later

## 10. Components Design

### 10.1 Smart vs Dumb Components

- **Container components**: Fetch data, handle logic
- **Presentational components**: Display only

**Example:**

- `ArticlesPageComponent` (smart/container)
- `ArticleCardComponent` (dumb/presentational)

## 11. Styling Strategy

- Global styles for layout & typography
- Component-level styles for isolation
- Shared variables (colors, spacing)

## 12. SEO & Performance

- Meta tags via Angular `Title` & `Meta` services
- Semantic HTML
- Lazy-loaded routes
- Optimized images

## 13. Deployment Strategy

### 13.1 Build

```bash
ng build --configuration production
```

### 13.2 Hosting Options

- GitHub Pages
- Netlify
- Vercel
- Azure Static Web Apps

## 14. Future Enhancements

- Markdown rendering for articles
- Backend (NestJS / Firebase / Supabase)
- CMS integration
- SSR (Angular Universal)
- Dark mode toggle

## 15. Guiding Principles

- Keep it simple
- Optimize for clarity over cleverness
- Treat the portfolio as a long-term product

---

> **This document is the foundation and should evolve with the portfolio.**
