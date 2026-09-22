// ConfidenceBarChart.jsx — Dark Pattern Detector confidence bars (static SVG)
// Confidence-score bars across 3 dark-pattern categories
// Per details.md: placeholder illustrative values, COMING SOON project

export default function ConfidenceBarChart() {
  const categories = [
    { label: 'URGENCY', value: 0.87 },
    { label: 'MISDIRECTION', value: 0.72 },
    { label: 'SOCIAL PROOF', value: 0.64 },
  ]

  const svgW = 300
  const svgH = 90
  const barH = 16
  const gap = 10
  const labelW = 85
  const valueW = 35
  const barMaxW = svgW - labelW - valueW - 15

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {categories.map((cat, i) => {
        const y = 10 + i * (barH + gap)
        const barW = cat.value * barMaxW
        return (
          <g key={cat.label}>
            <text
              x={labelW - 6}
              y={y + barH / 2 + 4}
              textAnchor="end"
              fill="var(--theme-body)"
              fontSize="7"
              className="font-mono"
            >
              {cat.label}
            </text>
            <rect
              x={labelW}
              y={y}
              width={barMaxW}
              height={barH}
              rx="2"
              fill="rgba(255,255,255,0.05)"
            />
            {/* Muted gray bars — Coming Soon project, not green per rules.md #7 */}
            <rect
              x={labelW}
              y={y}
              width={barW}
              height={barH}
              rx="2"
              fill="var(--theme-body)"
              opacity={0.5}
            />
            <text
              x={labelW + barMaxW + 6}
              y={y + barH / 2 + 4}
              textAnchor="start"
              fill="var(--theme-heading)"
              fontSize="8"
              className="font-mono"
            >
              {(cat.value * 100).toFixed(0)}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}
