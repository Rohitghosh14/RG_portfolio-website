// StrengthMeter.jsx — Password Manager key-strength meter (static SVG)
// A key-strength meter bar
// Per details.md: VAULT: ENCRYPTED, ALGORITHM: FERNET

export default function StrengthMeter() {
  const svgW = 300
  const svgH = 80
  const segments = 5
  const segW = 44
  const segH = 20
  const gap = 6
  const startX = (svgW - (segments * segW + (segments - 1) * gap)) / 2
  const fillCount = 4 // 4 out of 5 = strong

  const strengthLabels = ['WEAK', 'FAIR', 'GOOD', 'STRONG', 'MAX']

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Strength label */}
      <text
        x={svgW / 2}
        y={16}
        textAnchor="middle"
        fill="var(--theme-body)"
        fontSize="8"
        className="font-mono"
      >
        KEY STRENGTH
      </text>

      {/* Meter segments */}
      {Array.from({ length: segments }).map((_, i) => {
        const x = startX + i * (segW + gap)
        const y = 28
        const isFilled = i < fillCount
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={segW}
              height={segH}
              rx="2"
              fill={isFilled ? 'var(--theme-accent)' : "var(--theme-divider)"}
              opacity={isFilled ? 0.6 + i * 0.1 : 1}
            />
            <text
              x={x + segW / 2}
              y={y + segH + 12}
              textAnchor="middle"
              fill={isFilled ? 'var(--theme-heading)' : 'var(--theme-body)'}
              fontSize="6"
              className="font-mono"
            >
              {strengthLabels[i]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
