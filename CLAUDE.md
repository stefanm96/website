# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a static website for SMI Consulting (stefan-michel.com) built with ReactJS. It's a single-page application with a portfolio/resume layout featuring sections for header, about, resume, contact, and footer.

## Commands

### Development
- `npm start` - Start development server (default React Scripts)
- `npm run build` - Create production build
- `npm test` - Run tests with Jest/React Testing Library
- `npm run eject` - Eject from Create React App (irreversible)

### Deployment
The site is configured for Netlify deployment with `netlify.toml` configuration that handles:
- Domain redirects (www.smiconsulting.de → smiconsulting.de)
- SPA routing fallback to index.html
- CORS headers

## Architecture

### Core Structure
- **Main App** (`src/App.js`): Main component that fetches resume data from `/resumeData.json` using jQuery AJAX
- **Components** (`src/Components/`): Individual section components (Header, About, Resume, Contact, Footer, Portfolio, Testimonials)
- **Data Source**: Resume content is loaded dynamically from `public/resumeData.json`

### Key Dependencies
- React 16.2.0 (class-based components)
- jQuery 3.2.1 (for AJAX calls)
- react-ga 2.3.5 (Google Analytics integration)

### Data Flow
The app fetches all content from `resumeData.json` on mount and passes sections to respective components via props. The JSON contains structured data for personal info, resume, portfolio, and testimonials.

### Styling
Uses custom CSS with Font Awesome icons, web fonts (OpenSans, Libre Baskerville), and responsive layout styles located in `public/css/`.

## Content Management
To update site content, modify `public/resumeData.json` which contains all text, contact information, skills, experience, and social links.