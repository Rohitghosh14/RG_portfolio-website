# CHANGELOG — v1 → v2

Quick reference for what changed. Read this first, then the individual updated docs for full detail.

## Unchanged files (still use the v1 versions — not reproduced here)
- `project.md` — no changes.
- `models.md` — no changes (Claude/Gemini task split still applies; Phase 4–8 tasks should be slotted into that table the same way Phase 0–2 were).

## Updated files (v2 replaces v1 entirely for these)
- **`design.md`** — `[02] PROJECTS` is now an interactive clickable list + swapping preview pane (was: 8 stacked always-visible two-column blocks). `[01] ABOUT` gains an expandable bio card. Accent color confirmed as navy blue (was green in early v1 builds, already fixed). `[04] CONTACT` unchanged.
- **`arch.md`** — new components (`ProjectsSection.jsx`, `ProjectList.jsx`, `ProjectPreviewPane.jsx`, `BioCard.jsx`), removed components (`ProjectBlock.jsx`, `ProjectPanel.jsx`, `DeviceMockup.jsx`). `data/projects.js` shape changed: single `panel` object → `previews` array.
- **`details.md`** — added full expanded bio text, added preview-gallery content table per project, added full 9-entry certifications list with verify links, noted the About photo decision is still pending.
- **`phases.md`** — Phases 0–2 marked complete. New Phases 4–8 cover the rebuild (data/asset prep → interactive projects rebuild → bio card → certifications → final checkpoint).
- **`rules.md`** — added: no auto-scraping mockup/stock images, no fabricated About photo, "Coming Soon" projects never get a fake mockup, delete dead code when replacing components, no rush this time, don't guess uncertain cert titles.
- **`assets.md`** — replaced the "hand-code a 3D CSS mockup" approach entirely with "screenshot → external mockup tool → save PNG" workflow. Added the pending About-photo asset note.

## Open decision still needed from Rohit
- **About section photo**: real photo, 3D avatar, or no photo? Nothing should be built for that slot until this is answered (per `rules.md` v2, rule 2).

## Why this rebuild happened
The original static stacked-block project layout worked, but didn't match `moritzpetersen.com`'s actual interactive pattern (clickable list + swapping preview, mixed monitor/full-bleed treatments) that Rohit specifically wants replicated. Rohit has confirmed there's no rush this time — prioritize getting it right over getting it fast.
