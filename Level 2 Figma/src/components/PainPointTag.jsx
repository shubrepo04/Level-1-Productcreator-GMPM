import React from 'react'

// ─── Severity config ──────────────────────────────────────────────────────────
// Exact values from Figma pain point cards (same colour system as threat badges)
//   CRITICAL → #F24545  badge fill @ 15% opacity, stroke @ 40%
//   HIGH     → #FFA600
//   MED      → #33CC66
//   LOW      → #33CC66  (same green, lower visual weight via label)
const SEVERITY_CONFIG = {
  CRITICAL: { color: '#F24545', dot: '●' },
  HIGH:     { color: '#FFA600', dot: '●' },
  MED:      { color: '#33CC66', dot: '●' },
  LOW:      { color: '#33CC66', dot: '●' },
}

// ─── PainPointTag ─────────────────────────────────────────────────────────────
/**
 * The severity badge from the Figma pain-point cards.
 * Renders standalone so it can also be used inline in tables, lists, etc.
 *
 * Props
 * ─────
 * severity   {'CRITICAL'|'HIGH'|'MED'|'LOW'}
 * mentions   {number|string}  optional — shows "n mentions" chip alongside
 * className  {string}         extra wrapper classes
 */
export default function PainPointTag({ severity = 'MED', mentions, className = '' }) {
  const cfg = SEVERITY_CONFIG[severity] ?? SEVERITY_CONFIG.MED
  const { color, dot } = cfg

  // Hex alpha suffixes:  26 ≈ 15%   66 ≈ 40%
  const bgColor     = `${color}26`
  const borderColor = `${color}66`

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>

      {/* ── Severity badge ────────────────────────────────────────────────── */}
      {/* Figma: h:22, cornerRadius:4, Bold 10px, threat colour */}
      <span
        className="inline-flex items-center h-[22px] px-[9px] rounded-[4px] text-[10px] font-bold leading-none tracking-wide select-none"
        style={{
          color,
          backgroundColor: bgColor,
          border: `1px solid ${borderColor}`,
        }}
      >
        {dot} {severity}
      </span>

      {/* ── Mentions chip (optional) ──────────────────────────────────────── */}
      {/* Figma: h:22, cornerRadius:4, bg:#262B38, Regular 11px #666E80 */}
      {mentions !== undefined && (
        <span
          className="inline-flex items-center h-[22px] px-[8px] rounded-[4px] text-[11px] text-[#666E80] leading-none"
          style={{ backgroundColor: '#262B38' }}
        >
          {typeof mentions === 'number'
            ? `${mentions.toLocaleString()} mentions`
            : mentions}
        </span>
      )}
    </div>
  )
}
