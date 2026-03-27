import React from 'react'

// ─── Score colour ramp ────────────────────────────────────────────────────────
// Maps score bands to the Figma accent palette:
//   8–10 → green  #33CC66  (LOW-threat colour → positive framing for opportunity)
//   5–7  → amber  #FFA600
//   0–4  → red    #F24545
function scoreColor(score) {
  if (score >= 8) return '#33CC66'
  if (score >= 5) return '#FFA600'
  return '#F24545'
}

// ─── OpportunityScore ─────────────────────────────────────────────────────────
/**
 * Visual score indicator for market-opportunity cards.
 * Drawn from the Figma design language: dark surface, orange accents,
 * filled progress bar using the threat-colour ramp.
 *
 * Props
 * ─────
 * score     {number}   0–10
 * label     {string}   e.g. "Market Fit"
 * size      {'sm'|'md'|'lg'}  default 'md'
 * className {string}
 */
export default function OpportunityScore({ score = 7, label = '', size = 'md', className = '' }) {
  const clamped   = Math.min(10, Math.max(0, score))
  const pct       = (clamped / 10) * 100
  const color     = scoreColor(clamped)
  const bgColor   = `${color}1A`  // ~10% fill behind bar
  const glowColor = `${color}33`  // ~20% for bar glow

  // Size scale — sm matches badge height, md matches card content, lg for hero use
  const sizeMap = {
    sm: { track: 'h-[3px]', text: 'text-[10px]', score: 'text-[11px]', gap: 'gap-[6px]' },
    md: { track: 'h-[4px]', text: 'text-[11px]', score: 'text-[13px]', gap: 'gap-[8px]' },
    lg: { track: 'h-[6px]', text: 'text-[13px]', score: 'text-[18px]', gap: 'gap-[10px]' },
  }
  const s = sizeMap[size] ?? sizeMap.md

  return (
    <div className={`flex flex-col ${s.gap} ${className}`}>

      {/* Label + numeric score */}
      {(label || clamped !== undefined) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className={`${s.text} font-medium text-[#666E80] uppercase tracking-[0.06em]`}>
              {label}
            </span>
          )}
          <span
            className={`${s.score} font-bold leading-none ml-auto`}
            style={{ color }}
          >
            {clamped}
            <span className="text-[#666E80] font-normal">/10</span>
          </span>
        </div>
      )}

      {/* Track + fill bar */}
      {/* Figma surface: bg:#262B38, fill = score colour, glow shadow */}
      <div
        className={`w-full ${s.track} rounded-full overflow-hidden`}
        style={{ backgroundColor: '#262B38' }}
        role="meter"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={10}
        aria-label={label ? `${label}: ${clamped} out of 10` : `Score: ${clamped} out of 10`}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width:     `${pct}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${glowColor}`,
          }}
        />
      </div>

      {/* 10-pip tick marks — md and lg only */}
      {size !== 'sm' && (
        <div className="flex justify-between px-[1px]">
          {Array.from({ length: 11 }, (_, i) => (
            <div
              key={i}
              className="w-px h-[4px] rounded-full"
              style={{ backgroundColor: i <= clamped ? color : '#262B38' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
