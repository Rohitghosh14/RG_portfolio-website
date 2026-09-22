// ProbabilityBarChart.jsx — FIFA match prediction probability bars (static SVG)
// Horizontal probability bars: Win 55%, Draw 28%, Loss 17%
// Per details.md

export default function ProbabilityBarChart() {
  const bars = [
    { label: 'WIN', value: 55, color: 'var(--theme-accent)' },
    { label: 'DRAW', value: 28, color: 'var(--theme-body)' },
    { label: 'LOSS', value: 17, color: 'var(--theme-body)' },
  ]

  const svgW = 300
  const svgH = 100
  const barH = 16
  const gap = 12
  const labelW = 40
  const valueW = 35
  const barMaxW = svgW - labelW - valueW - 20

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {bars.map((bar, i) => {
        const y = 10 + i * (barH + gap)
        const barW = (bar.value / 100) * barMaxW
        return (
          <g key={bar.label}>
            {/* Label */}
            <text
              x={labelW - 4}
              y={y + barH / 2 + 4}
              textAnchor="end"
              fill="var(--theme-body)"
              fontSize="8"
              className="font-mono"
            >
              {bar.label}
            </text>
            {/* Bar background */}
            <rect
              x={labelW}
              y={y}
              width={barMaxW}
              height={barH}
              rx="2"
              fill="rgba(255,255,255,0.05)"
            />
            {/* Bar fill */}
            <rect
              x={labelW}
              y={y}
              width={barW}
              height={barH}
              rx="2"
              fill={bar.color}
              opacity={0.8}
            />
            {/* Value */}
            <text
              x={labelW + barMaxW + 8}
              y={y + barH / 2 + 4}
              textAnchor="start"
              fill="var(--theme-heading)"
              fontSize="9"
              className="font-mono"
            >
              {bar.value}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}
