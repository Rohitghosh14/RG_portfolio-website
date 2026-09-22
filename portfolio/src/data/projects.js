// data/projects.js — Single source of truth for all project content.
// All content taken verbatim from details.md v2. Do not invent links or data.
//
// v2 shape: `previews` array replaces the old `panel` object.
// - type: "mockup"  → pre-composited PNG (device frame baked in)
// - type: "chart"   → named component from charts/, with stats rendered underneath
// - type: "image"   → plain full-bleed image, no frame (src: null = not yet available)
//
// `stats` lives on chart-type entries only (monospace label+value pairs).

const projects = [
  {
    id: "fifa",
    order: "01",
    name: "FIFA World Cup 2026 Predictor",
    descriptor: "Historical Match Data · Logistic Regression",
    description:
      "Logistic Regression trained on 49.5K historical matches with 4 engineered features (home advantage, rolling 5-match form, FIFA rank differential) — 55% accuracy on live FIFA World Cup 2026 validation, beating the 48.6% baseline.",
    tags: ["Python", "Scikit-learn", "Streamlit"],
    github: "https://github.com/Rohitghosh14/fifa-worldcup-2026-predictor",
    comingSoon: false,
    previews: [
      { type: "mockup", src: "/assets/mockup-fifa.png" },
      {
        type: "chart",
        component: "ProbabilityBarChart",
        stats: [
          { label: "MODEL ACCURACY", value: "55%" },
          { label: "TRAINING MATCHES", value: "49.5K" },
          { label: "FEATURES", value: "4" },
        ],
      },
      { type: "image", src: null },
    ],
  },
  {
    id: "exoplanet",
    order: "02",
    name: "Exoplanet Habitability Predictor",
    descriptor: "NASA Archive API · Custom ESI Engine",
    description:
      "Engineered an automated classification pipeline ingesting confirmed Kepler/TESS exoplanet telemetry via the NASA TAP API. Designed a custom Earth Similarity Index (ESI) scoring system and deployed an ensemble SVM & Random Forest predictor with an interactive Streamlit UI.",
    tags: ["Python", "NASA API", "Scikit-learn", "SVM & Random Forest", "Streamlit"],
    github:
      "https://github.com/Rohitghosh14/exoplanet-habitability-predictor",
    comingSoon: false,
    previews: [
      { type: "mockup", src: "/assets/mockup-exoplanet.png" },
      {
        type: "chart",
        component: "LightCurveChart",
        stats: [
          { label: "RADIUS", value: "1.63 R⊕" },
          { label: "STELLAR FLUX", value: "1.10 S⊕" },
          { label: "EQUILIBRIUM TEMP", value: "265 K (-8°C)" },
        ],
      },
      { type: "image", src: null },
    ],
  },
  {
    id: "aodnet",
    order: "03",
    name: "AOD-Net — From-Scratch Image Dehazing",
    descriptor: "PyTorch · From-Scratch Implementation",
    description:
      "Rebuilt the full 6-stage AOD-Net dehazing pipeline from scratch (not copied from any reference repo) — custom dataset/model classes, diagnosed and fixed an unbounded-output bug (added output clamping) and a dying-ReLU bug on the blue channel via per-channel mean analysis (switched to LeakyReLU).",
    tags: ["Python", "PyTorch", "Computer Vision", "From-Scratch"],
    github: null,
    comingSoon: true,
    // No mockup — Coming Soon, no live deployment (rules.md v2, rule 3)
    previews: [
      {
        type: "chart",
        component: "PSNRBarChart",
        stats: [
          { label: "PSNR", value: "20.30 dB" },
          { label: "SSIM", value: "0.811" },
          { label: "PARAMS", value: "1,761" },
        ],
      },
      { type: "image", src: null },
    ],
  },
  {
    id: "rio",
    order: "04",
    name: "Desktop AI Pet \"Rio\"",
    descriptor: "LLM Brain · Long-Term Memory",
    description:
      "A text-first desktop companion app with a swappable LLM brain (Groq), Mem0-based long-term memory, a deterministic emotion/state engine, a real weather + day-night reactive world, mini-games, voice input, and Perplexity-style web search.",
    tags: ["Python", "Groq", "Mem0", "pywebview"],
    github: "https://github.com/Rohitghosh14/rio-ai-companion",
    comingSoon: false,
    previews: [
      { type: "mockup", src: "/assets/mockup-rio.png" },
      {
        type: "chart",
        component: "EmotionTimelineChart",
        stats: [
          { label: "LLM", value: "GROQ" },
          { label: "MEMORY", value: "MEM0" },
          { label: "GAMES", value: "2" },
        ],
      },
      { type: "image", src: null },
    ],
  },
  {
    id: "boston",
    order: "05",
    name: "Boston Housing Regression",
    descriptor: "Classical ML · From-Scratch Pipeline",
    description:
      "Full from-scratch linear regression pipeline on the Boston Housing dataset, built to outperform a flawed reference notebook — manual preprocessing, EDA, and evaluation without relying on high-level pipeline abstractions.",
    tags: ["Python", "Scikit-learn", "Linear Regression"],
    github: "https://github.com/Rohitghosh14/boston-housing-regression",
    comingSoon: false,
    previews: [
      { type: "mockup", src: "/assets/mockup-boston.png" },
      {
        type: "chart",
        component: "ScatterFitChart",
        stats: [
          { label: "FEATURES", value: "13" },
          { label: "SAMPLES", value: "506" },
          { label: "METHOD", value: "OLS" },
        ],
      },
      { type: "image", src: null },
    ],
  },
  {
    id: "movie-recommender",
    order: "06",
    name: "Content-Based Movie Recommendation System",
    descriptor: "NLP · Cosine Similarity",
    description:
      "Developed a content-based recommender using the TMDB 5000 dataset with CountVectorizer and Cosine Similarity to recommend the top 5 similar movies instantly.",
    tags: ["Python", "Scikit-learn", "Streamlit"],
    github: "https://github.com/Rohitghosh14/movie-recommender-model",
    comingSoon: false,
    previews: [
      { type: "mockup", src: "/assets/mockup-movie.png" },
      {
        type: "chart",
        component: "SimilarityBarChart",
        stats: [
          { label: "DATASET", value: "TMDB 5K" },
          { label: "METHOD", value: "COUNT VECTORIZER" },
          { label: "TOP-K", value: "5" },
        ],
      },
      { type: "image", src: null },
    ],
  },
  {
    id: "password-manager",
    order: "07",
    name: "Password Manager",
    descriptor: "Security · Local-First",
    description:
      "Developed a GUI-based password manager for securely storing and managing user credentials, using Fernet encryption and PBKDF2HMAC key derivation.",
    tags: ["Python", "CustomTkinter", "Fernet"],
    github: "https://github.com/Rohitghosh14/GUI_PASSWORD_MANAGER",
    comingSoon: false,
    previews: [
      { type: "mockup", src: "/assets/mockup-password.png" },
      {
        type: "chart",
        component: "StrengthMeter",
        stats: [
          { label: "HASHING", value: "PBKDF2HMAC" },
          { label: "UI", value: "CUSTOMTKINTER" },
          { label: "STORAGE", value: "LOCAL" },
        ],
      },
      { type: "image", src: null },
    ],
  },
  {
    id: "dark-pattern",
    order: "08",
    name: "Dark Pattern Language Detector",
    descriptor: "NLP · Three-Tier Pipeline",
    description:
      "An industry-level NLP application detecting manipulative dark-pattern language in UI/UX copy, via a FastAPI + React app and a three-tier model pipeline through DistilBERT.",
    tags: ["Python", "FastAPI", "React", "DistilBERT"],
    github: null,
    comingSoon: true,
    // No mockup — Coming Soon, no live deployment (rules.md v2, rule 3)
    previews: [
      {
        type: "chart",
        component: "ConfidenceBarChart",
        stats: [
          { label: "MODEL", value: "DISTILBERT" },
          { label: "TIERS", value: "3" },
          { label: "STACK", value: "FASTAPI + REACT" },
        ],
      },
      { type: "image", src: null },
    ],
  },
];

export default projects;
