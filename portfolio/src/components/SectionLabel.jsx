// SectionLabel.jsx — Reusable [0X] LABEL component
// Usage: <SectionLabel number="01" label="ABOUT" />
// Design: small monospace, uppercase, letter-spaced, gray — per design.md

export default function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-2 mb-12">
      <span className="font-mono text-xs tracking-widest uppercase text-body">
        [{number}] {label}
      </span>
    </div>
  )
}
