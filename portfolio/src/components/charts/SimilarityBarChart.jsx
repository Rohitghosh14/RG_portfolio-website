// SimilarityBarChart.jsx — Movie Recommender top-5 similarity bars (static SVG)
// Horizontal bars of top-5 similarity scores
// Per details.md: QUERY: INCEPTION, TOP MATCH: 0.91 SIMILARITY

export default function SimilarityBarChart() {
  const movies = [
    { label: 'INTERSTELLAR', score: 0.91 },
    { label: 'THE PRESTIGE', score: 0.85 },
    { label: 'MEMENTO', score: 0.79 },
    { label: 'SHUTTER ISLAND', score: 0.74 },
    { label: 'THE MATRIX', score: 0.68 },
  ]

  const svgW = 300
  const svgH = 120
  const barH = 12
  const gap = 8
  const labelW = 90
  const valueW = 30
  const barMaxW = svgW - labelW - valueW - 15

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {movies.map((movie, i) => {
        const y = 6 + i * (barH + gap)
        const barW = movie.score * barMaxW
        return (
          <g key={movie.label}>
            <text
              x={labelW - 6}
              y={y + barH / 2 + 3}
              textAnchor="end"
              fill="var(--theme-body)"
              fontSize="7"
              className="font-mono"
            >
              {movie.label}
            </text>
            <rect
              x={labelW}
              y={y}
              width={barMaxW}
              height={barH}
              rx="1.5"
              fill="rgba(255,255,255,0.05)"
            />
            <rect
              x={labelW}
              y={y}
              width={barW}
              height={barH}
              rx="1.5"
              fill="var(--theme-accent)"
              opacity={0.7 + (0.3 * (1 - i / movies.length))}
            />
            <text
              x={labelW + barMaxW + 6}
              y={y + barH / 2 + 3}
              textAnchor="start"
              fill="var(--theme-heading)"
              fontSize="8"
              className="font-mono"
            >
              {movie.score.toFixed(2)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
