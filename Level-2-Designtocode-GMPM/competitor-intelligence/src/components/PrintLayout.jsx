import React from 'react'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

// Threat → Tailwind text/bg/border classes.
// Using explicit class names so Tailwind's scanner picks them all up.
const THREAT_CLASSES = {
  HIGH:     { text: 'text-[#C0392B]', bg: 'bg-[#FDECEA]', border: 'border-[#E57373]', dot: '●' },
  MED:      { text: 'text-[#B45309]', bg: 'bg-[#FFFBEB]', border: 'border-[#F6C164]', dot: '●' },
  LOW:      { text: 'text-[#276749]', bg: 'bg-[#ECFDF5]', border: 'border-[#86EFAC]', dot: '●' },
}

const SEVERITY_CLASSES = {
  CRITICAL: { text: 'text-[#C0392B]', bg: 'bg-[#FDECEA]', border: 'border-[#E57373]' },
  HIGH:     { text: 'text-[#B45309]', bg: 'bg-[#FFFBEB]', border: 'border-[#F6C164]' },
  MED:      { text: 'text-[#276749]', bg: 'bg-[#ECFDF5]', border: 'border-[#86EFAC]' },
  LOW:      { text: 'text-[#276749]', bg: 'bg-[#ECFDF5]', border: 'border-[#86EFAC]' },
}

const TAG_CLASSES = {
  OPPORTUNITY: { text: 'text-[#276749]', bg: 'bg-[#ECFDF5]', border: 'border-[#86EFAC]', bar: 'bg-[#276749]' },
  TREND:       { text: 'text-[#1E40AF]', bg: 'bg-[#EFF6FF]', border: 'border-[#93C5FD]', bar: 'bg-[#1E40AF]' },
  WEDGE:       { text: 'text-[#9A3412]', bg: 'bg-[#FFF7ED]', border: 'border-[#FDBA74]', bar: 'bg-[#9A3412]' },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PrintSectionHeading({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-200">
      <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em]">
        {children}
      </h2>
    </div>
  )
}

function PrintBadge({ cls, children }) {
  return (
    <span
      className={`inline-flex items-center h-[20px] px-2 rounded text-[9px] font-bold border leading-none ${cls.bg} ${cls.text} ${cls.border}`}
    >
      {children}
    </span>
  )
}

function PrintScoreBar({ score, label, color }) {
  const pct = Math.round((score / 10) * 100)
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{label}</span>
        <span className={`text-[11px] font-bold ${color}`}>{score}<span className="text-gray-400 font-normal">/10</span></span>
      </div>
      <div className="h-[3px] w-full rounded-full bg-gray-200 overflow-hidden">
        <div className={`h-full rounded-full ${color.replace('text-', 'bg-')}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

// ─── PrintLayout ──────────────────────────────────────────────────────────────

/**
 * Print-only layout. Hidden on screen, shown during print.
 * Uses ONLY Tailwind classes — no inline styles — so @media print
 * has full, unblocked control over every property.
 *
 * Props
 * ─────
 * query        {string}   the analyzed product category
 * competitors  {Array}
 * painPoints   {Array}
 * scores       {Array}    [{ label, score }]
 * overallScore {number}
 * opportunities {Array}   market intelligence data
 */
export default function PrintLayout({
  query         = 'Project Management SaaS',
  competitors   = [],
  painPoints    = [],
  scores        = [],
  overallScore  = 7,
  opportunities = [],
}) {
  return (
    // hidden on screen, block during print
    <div className="hidden print:block font-sans text-gray-900 bg-white">

      {/* ── Report header ─────────────────────────────────────────────────── */}
      {/* Sits at very top of every page via sticky / print header behaviour */}
      <header className="flex items-start justify-between pb-5 mb-6 border-b-2 border-gray-900">
        <div>
          {/* Logo row */}
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E8450A]" />
            <span className="text-[15px] font-bold tracking-tight text-gray-900">CompeteIQ</span>
            <span className="text-[8px] font-bold text-[#E8450A] border border-[#E8450A] px-1.5 py-0.5 rounded ml-1">
              BETA
            </span>
          </div>
          <h1 className="text-[22px] font-bold text-gray-900 leading-tight mt-2">
            Competitor Intelligence Report
          </h1>
          <p className="text-[12px] text-gray-500 mt-1">
            Analyzed category: <span className="font-medium text-gray-700">{query}</span>
          </p>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-[11px] text-gray-400 uppercase tracking-wide">Generated</p>
          <p className="text-[13px] font-semibold text-gray-700 mt-0.5">{formatDate()}</p>
          <p className="text-[10px] text-gray-400 mt-3 uppercase tracking-wide">Classification</p>
          <p className="text-[11px] font-medium text-gray-600 mt-0.5">Confidential · Internal use only</p>
        </div>
      </header>

      {/* ── Executive summary strip ───────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-3 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        {[
          { label: 'Competitors identified', value: competitors.length },
          { label: 'Pain points surfaced',   value: painPoints.length },
          { label: 'Market opportunities',   value: opportunities.length },
          { label: 'Overall opportunity',    value: `${overallScore}/10` },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <p className="text-[20px] font-bold text-gray-900">{stat.value}</p>
            <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── 1. Competitors ────────────────────────────────────────────────── */}
      <section className="mb-8 break-inside-avoid">
        <PrintSectionHeading>01 — Competitors</PrintSectionHeading>
        <div className="grid grid-cols-2 gap-3">
          {competitors.map((c, i) => {
            const tc = THREAT_CLASSES[c.threat] ?? THREAT_CLASSES.LOW
            return (
              <div
                key={i}
                className="p-3 rounded-lg border border-gray-200 bg-white break-inside-avoid"
              >
                {/* Card top row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {/* Initial circle */}
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-[13px] font-bold text-gray-700">{c.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-gray-900 leading-none">{c.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{c.funding}</p>
                    </div>
                  </div>
                  {/* Threat badge */}
                  <PrintBadge cls={tc}>{tc.dot} {c.threat}</PrintBadge>
                </div>

                <div className="h-px bg-gray-100 mb-2" />

                {/* Positioning */}
                <div className="mb-1.5">
                  <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                    Positioning
                  </p>
                  <p className="text-[11px] text-gray-600">{c.positioning}</p>
                </div>

                {/* Weakness */}
                <div>
                  <p className="text-[9px] font-semibold text-[#9A3412] uppercase tracking-wide mb-0.5">
                    Key Weakness
                  </p>
                  <p className="text-[11px] text-gray-600">{c.weakness}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 2. Pain Points ────────────────────────────────────────────────── */}
      <section className="mb-8 break-inside-avoid">
        <PrintSectionHeading>02 — Customer Pain Points</PrintSectionHeading>
        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-2 px-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wide w-[110px]">Severity</th>
              <th className="text-left py-2 px-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Pain Point</th>
              <th className="text-right py-2 px-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wide w-[90px]">Mentions</th>
              <th className="text-right py-2 px-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wide w-[120px]">Source</th>
            </tr>
          </thead>
          <tbody>
            {painPoints.map((pp, i) => {
              const sc = SEVERITY_CLASSES[pp.severity] ?? SEVERITY_CLASSES.MED
              return (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="py-2.5 px-3">
                    <PrintBadge cls={sc}>{pp.severity}</PrintBadge>
                  </td>
                  <td className="py-2.5 px-3 font-medium text-gray-800">{pp.title}</td>
                  <td className="py-2.5 px-3 text-right text-gray-500">
                    {typeof pp.mentions === 'number'
                      ? pp.mentions.toLocaleString()
                      : pp.mentions}
                  </td>
                  <td className="py-2.5 px-3 text-right text-gray-400">{pp.source}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      {/* ── 3. Opportunity Score ──────────────────────────────────────────── */}
      <section className="mb-8 break-inside-avoid">
        <PrintSectionHeading>03 — Opportunity Score</PrintSectionHeading>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          {/* Individual scores */}
          <div className="grid grid-cols-3 gap-6 mb-4">
            {scores.map((s, i) => (
              <PrintScoreBar
                key={i}
                score={s.score}
                label={s.label}
                color={s.score >= 8 ? 'text-[#276749]' : s.score >= 5 ? 'text-[#B45309]' : 'text-[#C0392B]'}
              />
            ))}
          </div>
          {/* Divider */}
          <div className="h-px bg-gray-200 mb-4" />
          {/* Overall */}
          <PrintScoreBar
            score={overallScore}
            label="Overall Opportunity Score"
            color={overallScore >= 8 ? 'text-[#276749]' : overallScore >= 5 ? 'text-[#B45309]' : 'text-[#C0392B]'}
          />
        </div>
      </section>

      {/* ── 4. Market Intelligence ────────────────────────────────────────── */}
      <section className="break-inside-avoid">
        <PrintSectionHeading>04 — Market Intelligence</PrintSectionHeading>
        <div className="space-y-3">
          {opportunities.map((opp, i) => {
            const tc = TAG_CLASSES[opp.tag] ?? TAG_CLASSES.OPPORTUNITY
            return (
              <div
                key={i}
                className="p-4 rounded-lg border border-gray-200 bg-white break-inside-avoid"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <PrintBadge cls={tc}>{opp.tag}</PrintBadge>
                    <h3 className="text-[13px] font-bold text-gray-900">{opp.title}</h3>
                  </div>
                  {opp.market && (
                    <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {opp.market}
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-gray-600 mb-3">{opp.desc}</p>

                <div className="h-px bg-gray-100 mb-3" />

                {/* Action items */}
                <ul className="space-y-1">
                  {(opp.items ?? []).map((item, j) => (
                    <li key={j} className={`text-[11px] font-medium ${tc.text}`}>
                      → {item}
                    </li>
                  ))}
                </ul>

                {/* Score row */}
                {opp.score !== undefined && (
                  <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-4">
                    <PrintScoreBar
                      score={opp.score}
                      label="Opportunity Score"
                      color={opp.score >= 8 ? 'text-[#276749]' : opp.score >= 5 ? 'text-[#B45309]' : 'text-[#C0392B]'}
                    />
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">AI Confidence</span>
                        <span className="text-[11px] font-bold text-gray-700">{opp.confidence ?? 72}%</span>
                      </div>
                      <div className="h-[3px] w-full rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gray-500"
                          style={{ width: `${opp.confidence ?? 72}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Report footer ─────────────────────────────────────────────────── */}
      <footer className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-[10px] text-gray-400">
          Generated by <span className="font-semibold text-gray-600">CompeteIQ</span> · AI-powered competitor intelligence
        </p>
        <p className="text-[10px] text-gray-400">
          {formatDate()} · Confidential
        </p>
      </footer>

    </div>
  )
}
