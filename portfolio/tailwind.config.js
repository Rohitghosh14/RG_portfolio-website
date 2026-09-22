/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--theme-bg)',
        panel: 'var(--theme-panel)',
        heading: 'var(--theme-heading)',
        body: 'var(--theme-body)',
        accent: 'var(--theme-accent)',
        'accent-hover': 'var(--theme-accent-hover)',
        muted: 'var(--theme-muted)',
        divider: 'var(--theme-divider)',
        // Overriding white and black so white/10 and black/50 map to our themes
        white: 'var(--theme-foreground)',
        black: 'var(--theme-background)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
