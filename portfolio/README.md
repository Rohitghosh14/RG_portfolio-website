# RG. — Rohit Ghosh Portfolio

A personal portfolio site for Rohit Ghosh, AI/ML Engineering student based in Kolkata, India. Built as a minimal, dark/light-themed, single-page site showcasing ML/AI projects, certifications, experience, and live GitHub activity.

**Live site:** _add Netlify URL here once deployed_
**Repo:** https://github.com/Rohitghosh14/RG_portfolio-website

---

## Overview

The site highlights 8 personal ML/AI projects (from classical ML to a from-scratch deep learning pipeline and a locally-run AI companion app), certifications, experience, and a live GitHub commit-activity graph — built as a fully custom design rather than a template, with an emphasis on real, honest content: every project screenshot, stat, and link reflects the actual project, and anything not yet publicly released is clearly marked "Coming Soon" rather than faked.

## Tech stack

- **React** + **Vite** — frontend framework and build tooling
- **Tailwind CSS** — styling
- **Framer Motion** — all animation (scroll reveals, transitions, the custom cursor, hover interactions)
- **Netlify Functions** (serverless) — powers the live GitHub commit-graph data via the GitHub GraphQL API, keeping the access token server-side rather than exposed in frontend code
- **react-icons** (Simple Icons set) — technology/tool logos throughout
- Custom inline SVG — all charts (no external charting library)
- **Netlify** — hosting and deployment

## Features

- Boot-sequence style loading screen with a live date readout and a short animated intro clip
- Interactive project list with a swappable preview pane (gallery of chart visuals and mockup screenshots per project)
- Expandable bio card with real GitHub/Kaggle/LinkedIn links and a live GitHub activity graph (real commit data, not placeholder numbers)
- Numbered-label design system (`[01] ABOUT`, `[02] PROJECTS`, etc.) with a consistent link-arrow (`↗`) convention throughout
- Full light/dark theme support, including a theme-aware custom cursor
- Stacked, numbered progress cards for Experience and Certifications
- Responsive layout, tested across desktop and mobile breakpoints

## Project structure

```
├── src/
│   ├── components/       # Hero, About, Projects, Certifications, Contact, LoadingScreen, Cursor, etc.
│   ├── data/
│   │   └── projects.js   # single source of truth for all project content
│   ├── App.jsx
│   └── main.jsx
├── netlify/
│   └── functions/
│       └── github-commits.js   # serverless function fetching live commit data
├── public/
│   └── assets/            # loading video, mockup images, resume PDF, cursor icon
├── netlify.toml
├── tailwind.config.js
└── package.json
```

## Getting started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Create a `.env` file in the project root:
```
GITHUB_TOKEN=your_github_personal_access_token
```
This token is used only server-side, by the Netlify function, to fetch real commit-activity data via GitHub's GraphQL API. It is never exposed to the frontend or committed to the repository (`.env` is git-ignored).

### 3. Run locally
Because the site uses a serverless function (for live GitHub data), use the Netlify CLI rather than a plain Vite dev server:
```bash
npx netlify dev
```
This starts Vite, proxies the serverless function correctly, and loads the `.env` variables. The site will be available at `http://localhost:8888`.

If you only need the frontend UI and don't need live commit data, a plain Vite server also works:
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```
Outputs an optimized static build to `dist/`.

## Deployment

Hosted on **Netlify**, connected directly to this GitHub repository — every push to `main` triggers an automatic redeploy. The `GITHUB_TOKEN` environment variable is set in the Netlify dashboard (Site configuration → Environment variables), not in any committed file.

## Project notes

This site was built iteratively over several working sessions, using AI-assisted coding tools (Antigravity, with Claude and Gemini models) as a development aid — the design decisions, content, real project data, and final review at every stage were mine. Along the way the build went through a few real revisions worth noting:
- The project-showcase layout moved from a static grid to an interactive click-to-preview list, closer to how I wanted visitors to browse the work.
- Device-mockup screenshots replaced an earlier attempt at a hand-coded 3D CSS mockup, after that approach proved unreliable — real screenshots of the actual apps, composited into a frame, turned out to be both simpler and more honest.
- The GitHub commit graph was built to pull real, live data through a secured serverless function rather than hardcoded or placeholder numbers.
- Full light/dark theming was added as its own dedicated pass rather than bolted on alongside other changes, to keep it reliable across every section.

## License / attribution

- Cursor icon: "Pointer icons created by meaicon — Flaticon" (see site footer for attribution).
- All project content, code, and design belong to Rohit Ghosh.
