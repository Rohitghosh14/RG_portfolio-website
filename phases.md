# PHASES.md (v2) — Build Order

Supersedes v1's phase list. Phases 0–2 from v1 are DONE (scaffold, static structure, loading screen, cursor, motion). This version covers the rebuild requested on top of that: interactive project list/preview pane, expandable bio, full certifications. No rush this time — get each step fully right before moving on, even if it takes several sessions.

## Status so far (from v1, already complete)
- ✅ Phase 0 — scaffold, tailwind tokens, folder structure, `data/projects.js` v1 shape
- ✅ Phase 1 — static sections, original stacked project blocks, certifications, contact
- ✅ Phase 2 — loading screen, hero polish, custom cursor, scroll motion
- ✅ Color fix — green → navy blue accent everywhere
- ✅ Cursor fix — real custom cursor, OS default hidden

## Phase 4 — Data & asset prep (do this before touching any component code)
1. Update `data/projects.js` to the new `previews` array shape from `arch.md` v2, using the content from `details.md` v2's preview table.
2. Generate the mockup images: for each project with an available app/UI to screenshot, capture a clean screenshot, run it through an external device-mockup tool, and save the result to `public/assets/mockup-<project>.png` per the exact filenames in `arch.md` v2. For AOD-Net and Dark Pattern Detector (no live deployment), skip the mockup and rely on the chart preview only for now.
3. Confirm all 6 available mockup PNGs exist in `public/assets/` before writing any component code that references them.

**Checkpoint:** `data/projects.js` validates (no syntax errors), all expected image files exist on disk.

## Phase 5 — Rebuild `[02] PROJECTS` as interactive list + preview pane
Build and confirm each step before the next:
1. `ProjectsSection.jsx` — layout shell, holds `activeProjectId` state, defaults to the first project.
2. `ProjectList.jsx` — the 8-name clickable list, active-state highlight, click handler wired to `ProjectsSection.jsx`'s state. Render the active project's tags/description/link underneath the list.
3. `ProjectPreviewPane.jsx` — renders the active project's `previews` array as a small pageable gallery with dot indicators, cross-fade on both project switch and gallery-index change.
4. Wire it all together, test with 2 projects first (FIFA, Exoplanet) — confirm list click swaps the pane correctly, gallery paging works, "Coming Soon" projects (AOD-Net, Dark Pattern Detector) show correctly with no broken image/link.
5. Extend to all 8 projects once the pattern is confirmed solid.
6. Delete the old, now-unused `ProjectBlock.jsx`, `ProjectPanel.jsx`, and `DeviceMockup.jsx` files.

**Checkpoint:** clicking through all 8 projects in the list correctly swaps the preview pane every time, no console errors, gallery paging works for projects with multiple previews, "Coming Soon" state is visually distinct (muted, no live accent color).

## Phase 6 — About: expandable bio card
1. Build `BioCard.jsx` with its own open/closed state.
2. Wire the `More ⌄` / `Close ⌃` toggle with a smooth height+fade expand animation.
3. **Do not add a photo yet** — the photo decision is still pending (see `details.md` v2). Build the layout with the photo slot empty/hidden so it doesn't look broken, and leave a clear TODO comment in the code for where the image goes once decided.

**Checkpoint:** bio expands and collapses smoothly, full bio text is correct, no placeholder image or broken image icon shown.

## Phase 7 — Certifications: full list + verify links
1. Update `Certifications.jsx` with the full list and link styling from `details.md` v2 / `design.md` v2.
2. Confirm every `Verify ↗` link opens the correct Coursera URL.

**Checkpoint:** all 9 certification entries render, all `Verify ↗` links work, visual style matches Contact's link convention.

## Phase 8 — Final full-site checkpoint
- Click every link on the entire site (all 8 project GitHub links, all cert verify links, all contact links).
- Scroll top to bottom, confirm all motion triggers once per section, no repeated re-triggering.
- Test on mobile width — confirm the project list/preview layout degrades sensibly (e.g. stacks vertically instead of side-by-side).
- Confirm no console errors anywhere.
- Only after this passes: decide on the About photo (Phase 6 follow-up) and wire it in.
