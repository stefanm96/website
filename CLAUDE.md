# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a static website for SMI Consulting (stefan-michel.com) built with pure HTML and vanilla JavaScript. It's a single-page application with a portfolio/resume layout featuring sections for header, about, resume, contact, and footer. All content is statically embedded in the HTML for optimal SEO and performance.

## Commands

### Development
- `npm start` - Start development server on port 3000 (serves static files)
- `npm run serve` - Start server on port 8000 (alternative port)

### Testing
- `npm test` - Run Playwright e2e tests (chromium, firefox, webkit)
- `npx playwright test --project=chromium` - Run tests for a specific browser
- `npx playwright test --update-snapshots` - Update visual regression baselines

### Deployment
The site is configured for Netlify deployment with `netlify.toml` configuration that handles:
- SPA routing fallback to index.html
- CORS headers

## Architecture

### Core Structure
- **Static HTML** (`index.html`): Single HTML file with all content statically embedded (no client-side data loading)
- **Vanilla JS** (`js/init-vanilla.js`): Smooth scroll, mobile menu toggle, nav highlighting, copyright year
- **Data Source**: JSON files in `data/` and `data/resume/` remain in the repo as data reference but are not loaded at runtime
- **Static Assets**: CSS, JS, images served directly from root directory

### Key Dependencies
- Tailwind CSS (CDN)
- Vanilla JavaScript only (no frameworks)

### Content Update Process
To update site content, edit the static HTML directly in `index.html`. The JSON files in `data/` are kept as structured data reference but are not used at runtime.

### Migration Notes
- Migrated from React to Alpine.js, then from Alpine.js to fully static HTML
- All content is statically rendered for SEO (no JavaScript required to see content)
- Interactive features (smooth scroll, mobile menu, nav highlighting) use vanilla JS
- Modern browser APIs: Intersection Observer, CSS scroll-behavior

### Styling
Uses Tailwind CSS (CDN) with Font Awesome icons, web fonts (OpenSans, Libre Baskerville), and responsive layout.

## Testing
E2E tests are located in `tests/e2e/` and cover:
- `data-loading.spec.ts` - Content visibility and correctness
- `resume.spec.ts` - Skills, work experience, projects, education
- `navigation.spec.ts` - Desktop/mobile nav, smooth scroll, back-to-top
- `responsive.spec.ts` - Responsive layout across viewports
- `external-links.spec.ts` - All links point to correct URLs
- `visual-regression.spec.ts` - Screenshot comparisons

## Claude Code Specific
- use the playwright mcp to verify changes in the UI
