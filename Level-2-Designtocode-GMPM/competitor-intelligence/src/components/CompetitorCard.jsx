import React from 'react'

// ─── Threat level config ──────────────────────────────────────────────────────
// Colours match the Figma file exactly (rgb values × 255):
//   HIGH  → #F24545  (r:0.95 g:0.27 b:0.27)
//   MED   → #FFA600  (r:1.00 g:0.65 b:0.00)
//   LOW   → #33CC66  (r:0.20 g:0.80 b:0.40)
const THREAT_CONFIG = {
  HIGH: { label: '● HIGH', color: '#F24545' },
  MED:  { label: '● MED',  color: '#FFA600' },
  LOW:  { label: '● LOW',  color: '#33CC66' },
}

// ─── CompetitorCard ───────────────────────────────────────────────────────────
/**
 * Props
 * ─────
 * name        {string}  Company name, e.g. "Asana"
 * funding     {string}  Funding label, e.g. "Public" | "$574M raised"
 * positioning {string}  One-line positioning statement
 * weakness    {string}  Key weakness surfaced by analysis
 * threat      {'HIGH'|'MED'|'LOW'}  Threat level
 */
export default function CompetitorCard({
  name        = 'Company',
  funding     = '',
  positioning = '',
  weakness    = '',
  threat      = 'MED',
}) {
  const { label, color } = THREAT_CONFIG[threat] ?? THREAT_CONFIG.MED

  return (
    <article
      className="relative rounded-[10px] overflow-hidden"
      style={{
        // Figma: fill #16191F, stroke #262B38 1px, shadow 0 4px 16px rgba(0,0,0,0.25)
        backgroundColor: '#16191F',
        border:          '1px solid #262B38',
        boxShadow:       '0 4px 16px rgba(0,0,0,0.25)',
      }}
    >
      {/* ── Left accent bar (3 px, full height, threat colour) ─────────────── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[10px]"
        style={{ backgroundColor: color }}
      />

      {/* ── Top section: avatar · name · funding · threat badge ─────────────  */}
      {/* Figma: avatar x:18 y:14; name x:62 y:16; funding x:62 y:36; badge x:CARD_W-78 y:14 */}
      <div className="flex items-start gap-[8px] pt-[14px] px-[14px] pb-[14px] pl-[18px]">

        {/* Avatar circle — 36×36, bg #262B38 */}
        <div
          className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: '#262B38' }}
        >
          <span className="font-bold text-base leading-none text-[#E6EDF3]">
            {name[0]?.toUpperCase()}
          </span>
        </div>

        {/* Name + funding stacked */}
        <div className="flex flex-col gap-[6px] mt-[2px]">
          {/* Name: Bold 15px #E6EDF3 */}
          <span className="font-bold text-[15px] leading-none text-[#E6EDF3]">
            {name}
          </span>

          {/* Funding badge: Regular 11px #666E80, bg #262B38 rounded-[4px] */}
          {funding && (
            <span
              className="text-[11px] text-[#666E80] px-[7px] py-[2px] rounded-[4px] w-fit leading-none"
              style={{ backgroundColor: '#262B38' }}
            >
              {funding}
            </span>
          )}
        </div>

        {/* Threat badge — pushed to top-right */}
        {/* Figma: 66×22, cornerRadius 4, bg=threatColor@15% opacity, stroke=threatColor@40% */}
        <div className="ml-auto flex-shrink-0 mt-[0px]">
          <span
            className="inline-flex items-center px-[9px] h-[22px] rounded-[4px] text-[10px] font-bold leading-none"
            style={{
              color,
              backgroundColor: `${color}26`, // 26 hex ≈ 15% opacity
              border:          `1px solid ${color}66`, // 66 hex ≈ 40% opacity
            }}
          >
            {label}
          </span>
        </div>
      </div>

      {/* ── Divider ─────────────────────────────────────────────────────────── */}
      {/* Figma: height 1px, x:9, width: CARD_W-18 */}
      <div className="h-px mx-[9px]" style={{ backgroundColor: '#262B38' }} />

      {/* ── Bottom section: positioning + weakness ──────────────────────────── */}
      {/* Figma: positioning label y:76, text y:89; weakness label y:110, text y:124 */}
      <div className="px-[14px] pt-[10px] pb-[14px] space-y-[10px]">

        {/* Positioning */}
        <div>
          {/* Label: Medium 10px #666E80, uppercase, tracking */}
          <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-[#666E80] mb-[3px]">
            Positioning
          </p>
          {/* Value: Regular 12px #BFC4D1 */}
          <p className="text-[12px] text-[#BFC4D1] leading-snug">
            {positioning}
          </p>
        </div>

        {/* Weakness */}
        <div>
          {/* Label: Medium 10px, primary colour at 80% opacity */}
          <p
            className="text-[10px] font-medium uppercase tracking-[0.06em] mb-[3px]"
            style={{ color: 'rgba(232, 69, 10, 0.80)' }}
          >
            Weakness
          </p>
          {/* Value: Regular 12px #A6ABB8 */}
          <p className="text-[12px] text-[#A6ABB8] leading-snug">
            {weakness}
          </p>
        </div>
      </div>
    </article>
  )
}
