# Repository Guidelines

## Project Structure & Module Organization
This is a static Alpine.js site served directly from the repo root. `index.html` bootstraps `app.js`, which exposes the `portfolioApp` component for rendering resume data assembled from section files in `data/` (with resume details split further under `data/resume/`). Reusable interaction helpers live in `js/`, while shared assets are grouped under `images/` and `favicon.ico`. Content experiments and QA evidence live in `feedback/` (reports, screenshots, baselines); keep any new research artifacts there. Update `manifest.json`, `netlify.toml`, and `robots.txt` in tandem when changing navigation, metadata, or hosting settings.

## Build, Test & Development Commands
- `npm run start`: launches a local static server on port 3000 for development checks.
- `npm run serve`: mirrors production defaults on port 8000; use for smoke-testing redirects and Netlify rules.
- `npx serve . -l <port>`: ad-hoc server when pairing or validating preview builds.
Always refresh after editing any of the files in `data/` to ensure fetch caching resets.

## Coding Style & Naming Conventions
Use four-space indentation in `.js` files and two spaces in HTML. Prefer modern ES syntax (const/let, arrow functions) and camelCase for JavaScript variables and JSON keys (`resumeData.main.contactmessage`). HTML ids map to navigation anchors; name new sections with lowercase hyphenated ids (e.g. `#services-overview`). Run Prettier locally if available, but do not commit formatting-only diffs without accompanying changes.

## Testing Guidelines
There is no automated test suite; perform manual regression sweeps in the latest Chrome, Firefox, and Safari. Validate smooth scrolling, navigation highlighting, and responsive headlines across laptop and mobile breakpoints. Confirm all JSON section files load without console errors and that fallback messaging in `app.js` is untouched. Record findings in `feedback/reports/` when defects or UX notes emerge.

## Commit & Pull Request Guidelines
Follow the existing imperative, lowercase commit style (`improve hero layout`). Reference related issues in the body, and keep commits scoped to a single concern. PRs should include: summary of changes, dev-server test evidence, and before/after screenshots for layout updates. Mention any touched configuration (`netlify.toml`, `manifest.json`) explicitly so deploy reviewers can re-validate hosting behavior.
