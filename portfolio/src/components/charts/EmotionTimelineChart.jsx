// EmotionTimelineChart.jsx — Rio emotion-state timeline (static SVG)
// Stepped line jumping between labeled emotion states across a day
// Per details.md

export default function EmotionTimelineChart() {
  const emotions = [
    { label: 'HAPPY', level: 4 },
    { label: 'CURIOUS', level: 3 },
    { label: 'CONTENT', level: 3 },
    { label: 'PLAYFUL', level: 4 },
    { label: 'SLEEPY', level: 1 },
    { label: 'CONTENT', level: 3 },
  ]

  const svgW = 300
  const svgH = 110
  const padX = 10
  const padY = 15
  const plotW = svgW - padX * 2
  const plotH = svgH - padY * 2 - 10

  const stepW = plotW / (emotions.length - 1)
  const levels = 5 // max emotion level

  // Build stepped path
  const pathParts = []
  emotions.forEach((em, i) => {
    const x = padX + i * stepW
    const y = padY + plotH - (em.level / levels) * plotH
    if (i === 0) {
      pathParts.push(`M${x.toFixed(1)},${y.toFixed(1)}`)
    } else {
      const prevX = padX + (i - 1) * stepW
      // Step: horizontal then vertical
      pathParts.push(`L${x.toFixed(1)},${(padY + plotH - (emotions[i - 1].level / levels) * plotH).toFixed(1)}`)
      pathParts.push(`L${x.toFixed(1)},${y.toFixed(1)}`)
    }
  })

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horizontal grid lines */}
      {[1, 2, 3, 4].map((level) => {
        const y = padY + plotH - (level / levels) * plotH
        return (
          <line
            key={level}
            x1={padX}
            y1={y}
            x2={svgW - padX}
            y2={y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
          />
        )
      })}

      {/* Stepped line */}
      <path
        d={pathParts.join(' ')}
        fill="none"
        stroke="var(--theme-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Emotion state dots and labels */}
      {emotions.map((em, i) => {
        const x = padX + i * stepW
        const y = padY + plotH - (em.level / levels) * plotH
        return (
          <g key={`${em.label}-${i}`}>
            <circle cx={x} cy={y} r="2.5" fill="var(--theme-accent)" />
            <text
              x={x}
              y={svgH - 3}
              textAnchor="middle"
              fill="var(--theme-body)"
              fontSize="6"
              className="font-mono"
            >
              {em.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
