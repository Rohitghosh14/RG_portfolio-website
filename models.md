# MODELS.md — Splitting Work Between Claude and Gemini

Rohit now has both Claude (Opus 4.6 / Sonnet 4.6) and Gemini 3 Pro available in Antigravity. Splitting by task type — not just as a quota fallback — plays to each model's actual strengths and avoids the earlier stalls from asking one model to do everything in one shot.

## General principle
- **Claude Opus 4.6 (Thinking)** → structural/logic-heavy work: data-driven component architecture, the reusable `ProjectBlock`/`ProjectPanel` system, getting the SVG charts to actually look right, debugging.
- **Gemini 3 Pro (High)** → high-volume/mechanical work: filling in repetitive content (all 8 project entries once the pattern is set), CSS/Tailwind polish passes, generating the 8 individual SVG chart components once one example exists as a template.
- Whichever model starts a phase should finish it — don't ping-pong mid-phase; hand off only at phase boundaries (see `phases.md`).

## Suggested split

| Task | Model | Why |
|---|---|---|
| Phase 0 — scaffold, folder structure, `data/projects.js` shape | Claude Opus 4.6 | Needs correct architecture decisions up front (see `arch.md`) — get this right once. |
| Phase 1, Step 1–2 — `SectionLabel.jsx`, placeholder Hero | Either | Small, low-risk. |
| Phase 1, Step 3 — About section | Gemini 3 Pro | Static content, no architecture decisions. |
| Phase 1, Step 4 — `ProjectBlock.jsx` / `ProjectPanel.jsx` (the reusable template + first 1 project fully working) | Claude Opus 4.6 | This is the hardest part — one correct, data-driven template that all 8 projects plug into. |
| Phase 1, Step 4 (cont.) — remaining 7 project chart components, once the template/pattern is proven | Gemini 3 Pro | Repetitive: same pattern, different chart shape/data each time — good fit for high-volume generation. |
| Phase 1, Step 5–6 — Certifications, Contact | Gemini 3 Pro | Static content sections. |
| Phase 1 checkpoint review (console errors, link check, responsive check) | Claude Opus 4.6 | Debugging/verification needs the stronger reasoning pass. |
| Phase 2, Step 1 — `LoadingScreen.jsx` (video sync, session-storage logic, transition) | Claude Opus 4.6 | Timing/state logic — worth the stronger model. |
| Phase 2, Step 2 — Hero polish | Either | Small. |
| Phase 2, Step 3 — `Cursor.jsx` | Claude Opus 4.6 | Needs careful restraint per `rules.md` #9 — easy to overdo, worth the more careful model. |
| Phase 2, Step 4–5 — scroll-reveal, hover micro-interactions | Gemini 3 Pro | Mostly repetitive `whileInView`/`hover` wiring across many existing elements. |
| Phase 2 checkpoint review | Claude Opus 4.6 | Final correctness pass. |
| Phase 3 — polish/deploy | Either | Low-risk, mechanical. |

## How to hand off between models in Antigravity
1. Finish a task fully with one model, confirm it renders/works (per the checkpoint in `phases.md`).
2. Switch the model dropdown.
3. In the new model's first message, say explicitly: *"Continue this existing project — do not regenerate anything already built. Read `phases.md` and `rules.md` first, then do [next task]."*
4. Point it at whichever doc file has the content it needs (`details.md` for content, `design.md` for styling, `arch.md` for structure) rather than re-pasting everything inline.
