import React from 'react'
import OpportunityScore    from './OpportunityScore.jsx'
import ConfidenceIndicator from './ConfidenceIndicator.jsx'

// ─── Tag config ───────────────────────────────────────────────────────────────
// Colours from Figma market-intelligence cards:
//   OPPORTUNITY → #33CC66  (green  — r:0.20 g:0.80 b:0.40)
//   TREND       → #6699FF  (blue   — r:0.40 g:0.60 b:1.00)
//   WEDGE       → #E8450A  (orange — primary accent)
const TAG_CONFIG = {
  OPPORTUNITY: { color: '#33CC66', label: 'Opportunity' },
  TREND:       { color: '#6699FF', label: 'Trend'       },
  WEDGE:       { color: '#E8450A', label: 'Wedge'       },
}

// ─── MarketIntelligenceCard ───────────────────────────────────────────────────
/**
 * Single market-intelligence card.
 * Matches the Figma right-column cards exactly:
 *   - 3px top accent band in tag colour
 *   - Tag badge (top-left) + market size badge (top-right)
 *   - Title (Bold 14px) + description (Regular 12px #666E80)
 *   - Divider + bullet items in tag colour
 *   - Opportunity score bar + AI confidence indicator
 *
 * Props
 * ─────
 * tag        {'OPPORTUNITY'|'TREND'|'WEDGE'}
 * market     {string}   e.g. "$4.2B TAM"
 * title      {string}
 * desc       {string}
 * items      {string[]} bullet action items (→ prefix added automatically)
 * score      {number}   0–10 opportunity score (default 7)
 * confidence {number}   0–100 AI confidence   (default 72)
 */
function MarketIntelligenceCard({
  tag        = 'OPPORTUNITY',
  market     = '',
  title      = '',
  desc       = '',
  items      = [],
  score      = 7,
  confidence = 72,
}) {
  const { color } = TAG_CONFIG[tag] ?? TAG_CONFIG.OPPORTUNITY

  return (
    <article
      className="relative rounded-[10px] overflow-hidden"
      style={{
        // Figma: fill #16191F, stroke #262B38 1px, shadow 0 4px 12px rgba(0,0,0,0.22)
        backgroundColor: '#16191F',
        border:          '1px solid #262B38',
        boxShadow:       '0 4px 12px rgba(0,0,0,0.22)',
      }}
    >
      {/* ── Top accent band (3px, full width, tag colour) ─────────────────── */}
      {/* Figma: Rectangle, resize CARD_W × 3, y:0 */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ backgroundColor: color }}
      />

      {/* ── Header: tag badge + market size ──────────────────────────────── */}
      {/* Figma: tag x:14 y:16, market badge x:CARD_W-msw-14 y:16 */}
      <div className="flex items-center justify-between px-[14px] pt-[16px] pb-0 mt-[3px]">

        {/* Tag badge — Figma: h:22, cornerRadius:4, tag colour @ 15% bg */}
        <span
          className="inline-flex items-center h-[22px] px-[9px] rounded-[4px] text-[10px] font-bold leading-none tracking-wide"
          style={{
            color,
            backgroundColor: `${color}26`,
            border:          `1px solid ${color}66`,
          }}
        >
          {tag}
        </span>

        {/* Market size badge — Figma: h:22, cornerRadius:4, bg:#262B38, Medium 11px #BFC4D1 */}
        {market && (
          <span
            className="inline-flex items-center h-[22px] px-[7px] rounded-[4px] text-[11px] font-medium text-[#BFC4D1] leading-none"
            style={{ backgroundColor: '#262B38' }}
          >
            {market}
          </span>
        )}
      </div>

      {/* ── Title ────────────────────────────────────────────────────────────  */}
      {/* Figma: Bold 14px #E6EDF3, x:14 y:48 */}
      <div className="px-[14px] pt-[10px]">
        <h3 className="font-bold text-[14px] text-[#E6EDF3] leading-snug">
          {title}
        </h3>
      </div>

      {/* ── Description ──────────────────────────────────────────────────────  */}
      {/* Figma: Regular 12px #666E80, x:14 y:70, width:CARD_W-28 */}
      <div className="px-[14px] pt-[6px]">
        <p className="text-[12px] text-[#666E80] leading-relaxed">
          {desc}
        </p>
      </div>

      {/* ── Divider ──────────────────────────────────────────────────────────  */}
      {/* Figma: 1px, x:14, width:CARD_W-28, y:128 */}
      <div className="mx-[14px] mt-[12px] h-px" style={{ backgroundColor: '#262B38' }} />

      {/* ── Bullet action items ───────────────────────────────────────────── */}
      {/* Figma: Medium 12px, tag colour, "→  {item}", y:138+idx*22 */}
      {items.length > 0 && (
        <ul className="px-[14px] pt-[10px] space-y-[4px]">
          {items.map((item, i) => (
            <li
              key={i}
              className="text-[12px] font-medium leading-snug"
              style={{ color }}
            >
              →&nbsp;&nbsp;{item}
            </li>
          ))}
        </ul>
      )}

      {/* ── Opportunity Score + Confidence Indicator ─────────────────────── */}
      {/* New section below bullets, using the Figma design-system tokens */}
      <div
        className="mx-[14px] mt-[12px] mb-[14px] p-[12px] rounded-[8px] space-y-[10px]"
        style={{ backgroundColor: '#0D1117' }}
      >
        <OpportunityScore score={score} label="Opportunity Score" size="md" />
        <ConfidenceIndicator value={confidence} showRing={false} showBar />
      </div>
    </article>
  )
}

// ─── MarketIntelligencePanel ──────────────────────────────────────────────────
/**
 * The full right-column panel from the Figma dashboard.
 * Renders the column header + a stack of MarketIntelligenceCard components.
 *
 * Props
 * ─────
 * opportunities  {Array}   array of card props (see MarketIntelligenceCard)
 * loading        {boolean} show skeleton state
 * className      {string}
 */
export default function MarketIntelligencePanel({
  opportunities = DEFAULT_OPPORTUNITIES,
  loading       = false,
  className     = '',
}) {
  return (
    <section className={`flex flex-col gap-3 ${className}`}>

      {/* ── Column header — matches Figma column header exactly ───────────── */}
      {/* Figma: h:48, cornerRadius:8, bg:#161B22 (surface), stroke:#262B38 */}
      <div
        className="flex items-center justify-between px-[14px] h-[48px] rounded-[8px]"
        style={{
          backgroundColor: '#161B22',
          border:          '1px solid #262B38',
        }}
      >
        <div className="flex items-center gap-[10px]">
          {/* Figma orange dot */}
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: '#E8450A' }}
          />
          <span className="font-bold text-[14px] text-[#E6EDF3]">
            Market Intelligence
          </span>
        </div>

        {/* Count badge — Figma: pill, bg:#262B38, Medium 11px #666E80 */}
        <span
          className="inline-flex items-center h-[22px] px-[10px] rounded-full text-[11px] font-medium text-[#666E80]"
          style={{ backgroundColor: '#262B38' }}
        >
          {loading ? '—' : `${opportunities.length} opportunities`}
        </span>
      </div>

      {/* ── Cards ─────────────────────────────────────────────────────────── */}
      {loading
        ? <MarketIntelligenceSkeleton count={3} />
        : opportunities.map((opp, i) => (
            <MarketIntelligenceCard key={i} {...opp} />
          ))
      }
    </section>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Shimmer({ className = '' }) {
  return <div className={`shimmer rounded-[3px] ${className}`} />
}

function MarketIntelligenceSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="rounded-[10px] overflow-hidden"
          style={{ backgroundColor: '#16191F', border: '1px solid #262B38' }}
        >
          {/* Top band */}
          <Shimmer className="h-[3px] w-full rounded-none" />

          <div className="px-[14px] pt-[16px] pb-[14px] space-y-[10px]">
            {/* Badge row */}
            <div className="flex items-center justify-between">
              <Shimmer className="h-[22px] w-[90px] rounded-[4px]" />
              <Shimmer className="h-[22px] w-[70px] rounded-[4px]" />
            </div>
            {/* Title */}
            <Shimmer className="h-[14px] w-[55%]" />
            {/* Desc lines */}
            <div className="space-y-[6px]">
              <Shimmer className="h-[10px] w-full" />
              <Shimmer className="h-[10px] w-4/5" />
            </div>
            {/* Divider */}
            <div className="h-px" style={{ backgroundColor: '#262B38' }} />
            {/* Bullets */}
            <div className="space-y-[6px]">
              <Shimmer className="h-[10px] w-3/4" />
              <Shimmer className="h-[10px] w-2/3" />
              <Shimmer className="h-[10px] w-1/2" />
            </div>
            {/* Score + confidence block */}
            <div
              className="p-[12px] rounded-[8px] space-y-[10px]"
              style={{ backgroundColor: '#0D1117' }}
            >
              <Shimmer className="h-[10px] w-full" />
              <Shimmer className="h-[4px] w-full rounded-full" />
              <Shimmer className="h-[10px] w-4/5" />
              <Shimmer className="h-[3px] w-full rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

// ─── Default data (mirrors Figma exactly) ─────────────────────────────────────
const DEFAULT_OPPORTUNITIES = [
  {
    tag:        'OPPORTUNITY',
    market:     '$4.2B TAM',
    title:      'SMB Whitespace',
    desc:       'No clear winner for 10–50 person teams. Competitors chase enterprise, leaving SMBs underserved.',
    items:      ['Simple onboarding < 5 min', 'Flat pricing under $15/seat', 'Mobile-first workflows'],
    score:      8,
    confidence: 84,
  },
  {
    tag:        'TREND',
    market:     'Fast growing',
    title:      'AI-Assisted Planning Gap',
    desc:       'Competitors bolt on AI as afterthought. 78% of users want proactive AI-driven project planning.',
    items:      ['Predictive deadline detection', 'Auto task assignment', 'Risk flagging'],
    score:      7,
    confidence: 71,
  },
  {
    tag:        'WEDGE',
    market:     'High conversion',
    title:      'Pricing Model Disruption',
    desc:       'Per-seat pricing causes churn at growth stage. Usage-based model could unlock viral adoption.',
    items:      ['Usage-based pricing', 'Free tier with export', 'Team referral loops'],
    score:      6,
    confidence: 63,
  },
]
