# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a static website for SMI Consulting (stefan-michel.com) built with pure HTML, hand-written CSS, and vanilla JavaScript. It's a single-page portfolio for a freelance software engineer with sections for hero, profile, services, projects (case studies), CV, and contact. All content is statically embedded in the HTML for optimal SEO and performance.

## Commands

### Development
- `npm start` - Start development server on port 3000 (serves static files)
- `npm run serve` - Start server on port 8000 (alternative port)

### Testing
- `npm test` - Run Playwright e2e tests (chromium, firefox, webkit, mobile)
- `npx playwright test --project=chromium` - Run tests for a specific browser
- `npx playwright test --update-snapshots` - Update visual regression baselines

### Design Review Helpers
- `node scripts/shot.mjs` - Full-page + hero screenshots (desktop & mobile) to /tmp/site-shots
- `node scripts/sections.mjs` - Per-section screenshots (set `SHOT_MOBILE=1` for mobile)
- `node scripts/interact.mjs` - Tests mobile nav, header scroll state, console errors

### Deployment
The site is configured for Netlify deployment with `netlify.toml` configuration that handles:
- SPA routing fallback to index.html
- CORS headers

## Architecture

### Core Structure
- **Static HTML** (`index.html`, `imprint.html`): All content statically embedded (no client-side data loading)
- **CSS** (`css/style.css`): Hand-written design system "Quiet Engineering" — dark editorial theme, CSS custom properties, no framework
- **Vanilla JS** (`js/main.js`): Header scroll state, mobile menu, scroll-reveal (IntersectionObserver), active-nav highlighting, copyright year
- **Data Source**: JSON files in `data/` and `data/resume/` remain in the repo as data reference but are not loaded at runtime

### Design System ("Quiet Engineering")
- Dark theme: background `#0a0c0b`, ink `#e9ebe4`, accent lime `#c9f25d` (CSS variables in `:root`)
- Fonts (Google Fonts): Bricolage Grotesque (display/body), Fraunces italic (accent words in headlines), JetBrains Mono (labels, chips, numbers)
- Signature elements: grain overlay, numbered sections with giant outlined watermark digits, tech marquee, mono section labels, Fraunces-italic accent words in lime
- Respect `prefers-reduced-motion`; reveal animations via `.reveal`/`.visible`

### Content Update Process
To update site content, edit the static HTML directly in `index.html`. The JSON files in `data/` are kept as structured data reference but are not used at runtime.

## Testing
E2E tests are located in `tests/e2e/` and cover:
- `content.spec.ts` - Content visibility and correctness (hero, profile, services, projects, CV, contact, imprint)
- `navigation.spec.ts` - Desktop/mobile nav, scroll behavior, reveal animations
- `responsive.spec.ts` - No horizontal overflow, sections visible across viewports, hamburger breakpoint
- `external-links.spec.ts` - Social/cert links point to correct URLs, `target="_blank"` + `rel="noopener"`
- `visual-regression.spec.ts` - Screenshot comparisons (animations disabled for determinism)

## Claude Code Specific
- use the playwright mcp to verify changes in the UI
