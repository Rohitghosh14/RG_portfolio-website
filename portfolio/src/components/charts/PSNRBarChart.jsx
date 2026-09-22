// PSNRBarChart.jsx — AOD-Net before/after PSNR bar comparison (static SVG)
// Before (hazy baseline) vs. After (dehazed output) PSNR comparison
// Per details.md: PSNR 20.30 dB

export default function PSNRBarChart() {
  const bars = [
    { label: 'HAZY', value: 14.2, max: 25 },
    { label: 'DEHAZED', value: 20.3, max: 25 },
  ]

  const svgW = 300
  const svgH = 90
  const barH = 22
  const gap = 16
  const labelW = 60
  const valueW = 50
  const barMaxW = svgW - labelW - valueW - 10

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {bars.map((bar, i) => {
        const y = 12 + i * (barH + gap)
        const barW = (bar.value / bar.max) * barMaxW
        const isImproved = i === 1
        return (
          <g key={bar.label}>
            <text
              x={labelW - 6}
              y={y + barH / 2 + 4}
              textAnchor="end"
              fill="var(--theme-body)"
              fontSize="8"
              className="font-mono"
            >
              {bar.label}
            </text>
            <rect
              x={labelW}
              y={y}
              width={barMaxW}
              height={barH}
              rx="2"
              fill="rgba(255,255,255,0.05)"
            />
            <rect
              x={labelW}
              y={y}
              width={barW}
              height={barH}
              rx="2"
              fill={isImproved ? 'var(--theme-body)' : "var(--theme-divider)"}
              opacity={0.8}
            />
            <text
              x={labelW + barMaxW + 6}
              y={y + barH / 2 + 4}
              textAnchor="start"
              fill="var(--theme-heading)"
              fontSize="9"
              className="font-mono"
            >
              {bar.value} dB
            </text>
          </g>
        )
      })}
    </svg>
  )
}
