// LightCurveChart.jsx — Exoplanet transit-depth light curve (static SVG)
// Flat baseline with one dip (transit event), annotated "Transit Depth: ΔF/F = 0.012%"
// Per details.md: "transit-depth light curve — flat baseline with one dip"

export default function LightCurveChart() {
  // Light curve points: normalized flux over time
  // Flat at 1.0, dips to ~0.988 during transit
  const points = [
    [0, 100], [20, 100], [40, 100], [60, 100],
    [80, 99], [90, 95], [100, 88], [110, 85],
    [120, 84], [130, 84], [140, 85], [150, 88],
    [160, 95], [170, 99], [180, 100], [200, 100],
    [220, 100], [240, 100], [260, 100], [280, 100],
  ]

  // Map to SVG coordinates (300 wide, 120 tall)
  const svgW = 300
  const svgH = 120
  const padX = 10
  const padY = 15
  const plotW = svgW - padX * 2
  const plotH = svgH - padY * 2

  const xMin = 0
  const xMax = 280
  const yMin = 80
  const yMax = 102

  const toSvg = (x, y) => {
    const sx = padX + ((x - xMin) / (xMax - xMin)) * plotW
    const sy = padY + ((yMax - y) / (yMax - yMin)) * plotH
    return [sx, sy]
  }

  const pathData = points
    .map((p, i) => {
      const [sx, sy] = toSvg(p[0], p[1])
      return `${i === 0 ? 'M' : 'L'}${sx.toFixed(1)},${sy.toFixed(1)}`
    })
    .join(' ')

  // Transit dip center for annotation
  const [dipX, dipY] = toSvg(125, 84)

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid lines */}
      {[85, 90, 95, 100].map((y) => {
        const [, sy] = toSvg(0, y)
        return (
          <line
            key={y}
            x1={padX}
            y1={sy}
            x2={svgW - padX}
            y2={sy}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
          />
        )
      })}

      {/* Light curve path */}
      <path
        d={pathData}
        fill="none"
        stroke="var(--theme-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Transit dip annotation line */}
      <line
        x1={dipX}
        y1={dipY + 3}
        x2={dipX}
        y2={svgH - 5}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.5"
        strokeDasharray="2,2"
      />

      {/* Annotation text */}
      <text
        x={dipX}
        y={svgH - 2}
        textAnchor="middle"
        className="font-mono"
        fill="var(--theme-body)"
        fontSize="7"
      >
        Transit Depth: ΔF/F = 0.012%
      </text>

      {/* Y-axis labels */}
      <text x={padX - 2} y={padY + 2} textAnchor="end" fill="var(--theme-body)" fontSize="6">
        1.00
      </text>
      {(() => {
        const [, sy90] = toSvg(0, 90)
        return (
          <text x={padX - 2} y={sy90 + 2} textAnchor="end" fill="var(--theme-body)" fontSize="6">
            0.99
          </text>
        )
      })()}
    </svg>
  )
}
