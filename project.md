# PROJECT.md — Rohit Ghosh Portfolio Website

## What this is
A personal portfolio website for Rohit Ghosh, an AI/ML Engineering student based in Kolkata, India. The site showcases completed ML/AI projects, certifications, and contact info in a minimalist, professional, dark-mode design.

## Goal
A single-page, scroll-based portfolio that:
- Looks professional and intentional, not templated — inspired by `moritzpetersen.com`'s restraint, plus a numbered-label/monospace/terminal-panel visual system.
- Loads with a short branded video intro (loading screen), then transitions into the main site.
- Shows each project with a real description, tech stack, a direct GitHub link (or "Coming Soon" if unreleased), and a mock "live data" panel that visually represents what that project does.
- Lists certifications with verification links.
- Ends with a contact section with all real personal links.

## Non-goals
- No blog, no CMS, no backend — fully static frontend.
- No real live data fetching for project panels — charts are static SVG mockups representing realistic output, not live demos.
- No login, no forms, no analytics dashboard.

## Tech stack
- React + Tailwind CSS
- Framer Motion (for all animation — scroll reveal, cross-fade, hover states)
- Plain SVG for charts (no charting library needed — keep it lightweight)
- Optional: `<video>` tag for the loading screen intro (self-hosted mp4, provided separately)

## Owner
Rohit Ghosh — AI/ML Engineering student, Techno India University. Contact and social details live in `details.md`.

## Related docs in this set
- `rules.md` — hard constraints, what never to do
- `design.md` — full visual/design system
- `arch.md` — file/folder and component structure
- `phases.md` — build order (Phase 1 / Phase 2), and which AI model handles which phase
- `details.md` — all real content: project descriptions, links, certs, contact info
- `models.md` — how work is split between Claude and Gemini
- `assets.md` — the loading video and other media assets needed
