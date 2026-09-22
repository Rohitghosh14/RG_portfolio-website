# ARCH.md (v2) — File & Component Structure

Supersedes v1's project-section architecture only. Folder structure elsewhere (About, Certifications, Contact) is unchanged.

## Updated folder structure
```
portfolio/
├── public/
│   └── assets/
│       ├── loading-video.mp4
│       ├── mockup-fifa.png
│       ├── mockup-exoplanet.png
│       ├── mockup-aodnet.png
│       ├── mockup-rio.png
│       ├── mockup-boston.png
│       ├── mockup-movie.png
│       ├── mockup-password.png
│       ├── mockup-darkpattern.png
│       └── rohit-photo.jpg            (pending — see details.md)
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx
│   │   ├── Hero.jsx
│   │   ├── Cursor.jsx
│   │   ├── SectionLabel.jsx
│   │   ├── About.jsx
│   │   ├── BioCard.jsx                 (NEW — expandable "More" bio card)
│   │   ├── ProjectsSection.jsx         (NEW — wraps the whole [02] layout)
│   │   ├── ProjectList.jsx             (NEW — left-hand clickable list)
│   │   ├── ProjectPreviewPane.jsx      (NEW — right-hand swapping preview + gallery)
│   │   ├── charts/
│   │   │   ├── LightCurveChart.jsx
│   │   │   ├── ProbabilityBarChart.jsx
│   │   │   ├── PSNRBarChart.jsx
│   │   │   ├── EmotionTimelineChart.jsx
│   │   │   ├── ScatterFitChart.jsx
│   │   │   ├── SimilarityBarChart.jsx
│   │   │   ├── StrengthMeter.jsx
│   │   │   └── ConfidenceBarChart.jsx
│   │   ├── Certifications.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   └── projects.js                 (UPDATED shape — see below)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
└── package.json
```

## Removed from v1
- `ProjectBlock.jsx` and `ProjectPanel.jsx` (the old always-visible two-column stacked block) — replaced by `ProjectsSection.jsx` + `ProjectList.jsx` + `ProjectPreviewPane.jsx`.
- `DeviceMockup.jsx` (the manually-calibrated 3D-transform wrapper) — replaced by pre-composited mockup PNGs referenced directly in each project's `previews` array. Delete this component entirely; it's no longer used.

## Updated data shape for `data/projects.js`
```js
{
  id: "exoplanet",
  order: "02",
  name: "Exoplanet Habitability Predictor",     // shown in the left-hand list
  descriptor: "NASA Archive API · Custom ESI Engine",
  description: "Engineered an automated classification pipeline...",
  tags: ["NASA API", "Scikit-learn", "SVM & Random Forest", "Streamlit"],
  github: "https://github.com/Rohitghosh14/exoplanet-habitability-predictor",
  comingSoon: false,
  previews: [
    { type: "mockup", src: "/assets/mockup-exoplanet.png" },
    { type: "chart", component: "LightCurveChart" },
    { type: "image", src: null }   // placeholder slot for a future real screenshot
  ]
}
```

- `previews` replaces the old single fixed `panel` object from v1.
- `type: "mockup"` → render the pre-composited PNG (monitor frame + content already baked in).
- `type: "chart"` → render the named component from `charts/`.
- `type: "image"` → render a plain full-bleed image, no frame (for the "full-bleed, no monitor" treatment Moritz mixes in) — `src: null` means not yet available, `ProjectPreviewPane.jsx` should skip empty slots gracefully rather than error.

## Component responsibilities
- **`ProjectsSection.jsx`** — holds the `activeProjectId` state, renders `ProjectList.jsx` and `ProjectPreviewPane.jsx` side by side, passes the active project's data down.
- **`ProjectList.jsx`** — renders the 8 names, highlights the active one, handles click-to-select, renders the tags/description/link for the active project underneath the list (per `design.md`).
- **`ProjectPreviewPane.jsx`** — renders the current project's `previews` array as a small pageable gallery (dot indicators), swapping content with a cross-fade when `activeProjectId` changes AND when the gallery index changes within one project.
- **`BioCard.jsx`** — self-contained expand/collapse component used inside `About.jsx`; owns its own open/closed state.

## Everything else (Certifications.jsx, Contact.jsx, LoadingScreen.jsx, Hero.jsx, Cursor.jsx, SectionLabel.jsx, charts/) — unchanged from v1 arch.md.
