import React from 'react'

// ─── Shimmer primitive ────────────────────────────────────────────────────────
// Matches the shimmer keyframe defined in src/index.css
function Shimmer({ className = '', style = {} }) {
  return (
    <div
      className={`shimmer rounded-[3px] ${className}`}
      style={style}
    />
  )
}

// ─── CompetitorCardSkeleton ───────────────────────────────────────────────────
/**
 * Zero-prop skeleton that exactly mirrors the CompetitorCard layout.
 * Dimensions match the Figma spec so the column doesn't reflow when
 * real cards replace skeletons.
 *
 * The left accent bar uses a shimmer strip instead of a threat colour.
 */
export default function CompetitorCardSkeleton() {
  return (
    <article
      className="relative rounded-[10px] overflow-hidden"
      style={{
        backgroundColor: '#16191F',
        border:          '1px solid #262B38',
        boxShadow:       '0 4px 16px rgba(0,0,0,0.25)',
      }}
    >
      {/* ── Left accent bar — shimmer strip ────────────────────────────────── */}
      <Shimmer
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-none"
        style={{ borderRadius: '10px 0 0 10px' }}
      />

      {/* ── Top section ─────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-[8px] pt-[14px] px-[14px] pb-[14px] pl-[18px]">

        {/* Avatar circle placeholder — 36×36 */}
        <Shimmer className="w-9 h-9 rounded-full flex-shrink-0" />

        {/* Name + funding column */}
        <div className="flex flex-col gap-[8px] mt-[3px] flex-1">
          {/* Name bar — ~100px wide, 12px tall */}
          <Shimmer className="h-[12px] w-[100px]" />
          {/* Funding badge — ~72px wide, 8px tall */}
          <Shimmer className="h-[8px] w-[72px]" />
        </div>

        {/* Threat badge placeholder — 66×22, pushed right */}
        <Shimmer className="flex-shrink-0 w-[66px] h-[22px] rounded-[4px]" />
      </div>

      {/* ── Divider ─────────────────────────────────────────────────────────── */}
      <div className="h-px mx-[9px]" style={{ backgroundColor: '#262B38' }} />

      {/* ── Bottom section ──────────────────────────────────────────────────── */}
      <div className="px-[14px] pt-[10px] pb-[14px] space-y-[10px]">

        {/* Positioning block */}
        <div className="space-y-[6px]">
          {/* Section label — 70px */}
          <Shimmer className="h-[8px] w-[70px]" />
          {/* Content line 1 — full width */}
          <Shimmer className="h-[10px] w-full" />
          {/* Content line 2 — 80% width */}
          <Shimmer className="h-[10px] w-4/5" />
        </div>

        {/* Weakness block */}
        <div className="space-y-[6px]">
          {/* Section label — 58px */}
          <Shimmer className="h-[8px] w-[58px]" />
          {/* Content line 1 — full width */}
          <Shimmer className="h-[10px] w-full" />
          {/* Content line 2 — 65% width */}
          <Shimmer className="h-[10px] w-[65%]" />
        </div>
      </div>
    </article>
  )
}
