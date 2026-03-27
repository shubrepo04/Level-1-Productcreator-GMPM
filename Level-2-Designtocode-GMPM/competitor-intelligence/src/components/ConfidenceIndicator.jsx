import React from 'react'

// ─── Confidence colour thresholds ─────────────────────────────────────────────
// Reuses the Figma threat/severity colour ramp:
//   ≥ 80%  → green  #33CC66  (high confidence — act on it)
//   ≥ 50%  → amber  #FFA600  (medium — validate before committing)
//   < 50%  → red    #F24545  (low — treat as a signal, not a fact)
function confidenceColor(pct) {
  if (pct >= 80) return '#33CC66'
  if (pct >= 50) return '#FFA600'
  return '#F24545'
}

// ─── Confidence label copy ────────────────────────────────────────────────────
function confidenceLabel(pct) {
  if (pct >= 80) return 'High confidence'
  if (pct >= 50) return 'Moderate confidence'
  return 'Low confidence'
}

// ─── ConfidenceIndicator ──────────────────────────────────────────────────────
/**
 * AI-confidence percentage indicator.
 * Design language: same surface, border and typography tokens as the
 * Figma pain-point and market-intelligence cards.
 *
 * Props
 * ─────
 * value       {number}   0–100  AI confidence percentage
 * label       {string}   overrides the auto label, e.g. "Based on 847 signals"
 * showRing    {boolean}  show circular arc in addition to bar (default true)
 * showBar     {boolean}  show linear track bar (default true)
 * className   {string}
 */
export default function ConfidenceIndicator({
  value       = 72,
  label,
  showRing    = true,
  showBar     = true,
  className   = '',
}) {
  const pct      = Math.min(100, Math.max(0, value))
  const color    = confidenceColor(pct)
  const autoLabel = label ?? confidenceLabel(pct)

  // ── SVG arc ring ────────────────────────────────────────────────────────────
  // 36×36 viewBox, 14px radius — matches the 36×36 avatar circle in Figma cards
  const RADIUS        = 14
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS
  const dashOffset    = CIRCUMFERENCE * (1 - pct / 100)

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>

      {/* ── Circular ring ─────────────────────────────────────────────────── */}
      {showRing && (
        <div className="relative flex-shrink-0 w-9 h-9">
          <svg
            viewBox="0 0 36 36"
            width={36}
            height={36}
            className="rotate-[-90deg]"
            aria-hidden="true"
          >
            {/* Track ring */}
            <circle
              cx={18} cy={18} r={RADIUS}
              fill="none"
              stroke="#262B38"
              strokeWidth={3}
            />
            {/* Fill arc */}
            <circle
              cx={18} cy={18} r={RADIUS}
              fill="none"
              stroke={color}
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 0.7s ease-out' }}
            />
          </svg>

          {/* Percentage centred inside ring */}
          <span
            className="absolute inset-0 flex items-center justify-center text-[9px] font-bold leading-none"
            style={{ color }}
          >
            {pct}%
          </span>
        </div>
      )}

      {/* ── Text + bar stack ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-[5px] flex-1 min-w-0">

        {/* Label row */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-medium text-[#666E80] uppercase tracking-[0.06em] truncate">
            AI Confidence
          </span>
          <span
            className="text-[11px] font-bold leading-none flex-shrink-0"
            style={{ color }}
          >
            {autoLabel}
          </span>
        </div>

        {/* Linear bar */}
        {showBar && (
          <div
            className="w-full h-[3px] rounded-full overflow-hidden"
            style={{ backgroundColor: '#262B38' }}
            role="meter"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`AI confidence: ${pct}%`}
          >
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width:           `${pct}%`,
                backgroundColor: color,
                boxShadow:       `0 0 6px ${color}40`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
