// ScatterFitChart.jsx — Boston Housing predicted-vs-actual scatter (static SVG)
// Scatter plot with a fit line
// Per details.md: predicted-vs-actual scatter plot with a fit line

export default function ScatterFitChart() {
  // Simulated predicted-vs-actual points clustered around a fit line
  const points = [
    [10, 11], [12, 14], [15, 13], [17, 18], [19, 17],
    [20, 22], [22, 20], [24, 25], [25, 23], [27, 28],
    [28, 26], [30, 31], [32, 29], [33, 34], [35, 33],
    [36, 38], [38, 36], [40, 41], [42, 39], [44, 45],
    [14, 16], [23, 21], [31, 33], [37, 35], [41, 43],
  ]

  const svgW = 300
  const svgH = 120
  const padX = 25
  const padY = 10
  const padB = 20
  const plotW = svgW - padX - 10
  const plotH = svgH - padY - padB

  const dataMin = 5
  const dataMax = 50

  const toSvg = (x, y) => {
    const sx = padX + ((x - dataMin) / (dataMax - dataMin)) * plotW
    const sy = padY + plotH - ((y - dataMin) / (dataMax - dataMin)) * plotH
    return [sx, sy]
  }

  // Fit line (y = x, the ideal prediction line)
  const [fitX1, fitY1] = toSvg(dataMin, dataMin)
  const [fitX2, fitY2] = toSvg(dataMax, dataMax)

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid lines */}
      {[15, 25, 35, 45].map((v) => {
        const [, sy] = toSvg(0, v)
        return (
          <line
            key={v}
            x1={padX}
            y1={sy}
            x2={svgW - 10}
            y2={sy}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
          />
        )
      })}

      {/* Fit line */}
      <line
        x1={fitX1}
        y1={fitY1}
        x2={fitX2}
        y2={fitY2}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        strokeDasharray="4,3"
      />

      {/* Scatter points */}
      {points.map(([x, y], i) => {
        const [sx, sy] = toSvg(x, y)
        return (
          <circle
            key={i}
            cx={sx}
            cy={sy}
            r="2.5"
            fill="var(--theme-accent)"
            opacity={0.7}
          />
        )
      })}

      {/* Axis labels */}
      <text
        x={svgW / 2}
        y={svgH - 2}
        textAnchor="middle"
        fill="var(--theme-body)"
        fontSize="7"
        className="font-mono"
      >
        ACTUAL PRICE ($K)
      </text>
      <text
        x={8}
        y={svgH / 2}
        textAnchor="middle"
        fill="var(--theme-body)"
        fontSize="7"
        className="font-mono"
        transform={`rotate(-90, 8, ${svgH / 2})`}
      >
        PREDICTED
      </text>
    </svg>
  )
}
