# ASSETS.md (v2) — Media Assets Needed

Supersedes v1. Loading video section unchanged; mockup-image workflow replaced entirely.

## Loading screen video (unchanged from v1)
- 3D animated avatar at a desk, black background, ~8s, no audio needed.
- File: `public/assets/loading-video.mp4`.
- Compress if large (target well under 5MB) so it doesn't delay first paint.

## Device-mockup images (NEW workflow — replaces v1's "hand-code a 3D frame" approach entirely)
Manual process, done by Rohit outside of Antigravity:
1. Run the site locally, navigate to each project (or, if the actual deployed app exists — e.g. a live Streamlit app — screenshot that instead for a more authentic result).
2. Take a clean screenshot of just the relevant content area.
3. Upload it to a mockup-generator tool (e.g. the one already used, or similar — any tool that composites an uploaded image into a device frame and exports a flat PNG).
4. Choose a dark/space-gray frame color to match the site's near-black theme (avoid a bright silver frame if the tool offers a choice).
5. Download the finished image and save it to `public/assets/` with the exact filename expected by `data/projects.js` (see `arch.md` v2 for the list: `mockup-fifa.png`, `mockup-exoplanet.png`, `mockup-rio.png`, `mockup-boston.png`, `mockup-movie.png`, `mockup-password.png`). AOD-Net and Dark Pattern Detector do not get a mockup file — no live app to screenshot yet.

**No AI model should attempt to source, generate, or auto-scrape these images.** They must come from Rohit's own screenshots, per `rules.md` v2.

## Project panel charts (unchanged from v1)
Static inline SVG, hand-built per project — no external assets needed. See `details.md` v2's preview table for which chart goes with which project.

## About section photo (NEW, pending)
- Decision not yet made between: (a) a real personal photo, (b) the 3D avatar character, (c) no photo.
- Once decided: if (a) or (b), save the file to `public/assets/rohit-photo.jpg` (or `.png`) and update `BioCard.jsx` to reference it.
- Do not build a placeholder image in the meantime — leave the slot empty/hidden per `rules.md` v2.

## Do not add
- No stock photography, no icon packs, no auto-sourced logo images. Keep the visual system typographic, SVG-based, and built from Rohit's own real screenshots only.
