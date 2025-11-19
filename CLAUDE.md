# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a static website for SMI Consulting (stefan-michel.com) built with Alpine.js. It's a single-page application with a portfolio/resume layout featuring sections for header, about, resume, contact, and footer. Recently migrated from React to Alpine.js for better performance and simpler maintenance.

## Commands

### Development
- `npm start` - Start development server on port 3000 (serves static files)
- `npm run serve` - Start server on port 8000 (alternative port)

### Deployment
The site is configured for Netlify deployment with `netlify.toml` configuration that handles:
- SPA routing fallback to index.html
- CORS headers

## Architecture

### Core Structure
- **Static HTML** (`index.html`): Single HTML file with all sections using Alpine.js directives
- **Alpine.js App** (`app.js`): Data management and reactivity using Alpine.js framework
- **Data Source**: Resume content assembled from JSON section files in `data/` (resume sub-sections live in `data/resume/`) via fetch API
- **Static Assets**: CSS, JS, images served directly from root directory

### Key Dependencies
- Alpine.js 3.x (15kb reactive framework)
- Vanilla JavaScript (5.8kb for all interactive features)

### Data Flow
Alpine.js `portfolioApp` component fetches all content from the JSON section files in `data/` (including individual resume sub-files) on initialization, assembles them into a single object, and provides reactive data binding throughout the HTML template. No build process required.

### Migration Notes
- Migrated from React to Alpine.js for simplicity and better performance
- Migrated from jQuery to vanilla JavaScript (reduced JS payload by 94%)
- Removed Google Analytics tracking (react-ga)
- Static file serving instead of webpack build process
- Vue-like syntax with Alpine.js directives (x-data, x-text, x-for, etc.)
- Modern browser APIs: Intersection Observer, CSS scroll-behavior, clamp()

### Styling
Uses custom CSS with Font Awesome icons, web fonts (OpenSans, Libre Baskerville), and responsive layout styles located in `css/`.

## Content Management
To update site content, modify the relevant JSON files in `data/` (and `data/resume/` for resume specifics) which contain all text, contact information, skills, experience, and social links.

## Claude Code Specific
- use the playwright mcp to verify changes in the UI