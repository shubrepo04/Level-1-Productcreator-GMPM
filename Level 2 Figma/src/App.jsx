import React, { useState } from 'react'
import CompetitorCard           from './components/CompetitorCard.jsx'
import CompetitorCardSkeleton   from './components/CompetitorCardSkeleton.jsx'
import PainPointTag             from './components/PainPointTag.jsx'
import OpportunityScore         from './components/OpportunityScore.jsx'
import ConfidenceIndicator      from './components/ConfidenceIndicator.jsx'
import MarketIntelligencePanel  from './components/MarketIntelligencePanel.jsx'
import PrintLayout              from './components/PrintLayout.jsx'

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUERY = 'Project Management SaaS'

const COMPETITORS = [
  { id: 1, name: 'Asana',       funding: 'Public',        positioning: 'Enterprise task management leader',    weakness: 'Complex UI, steep learning curve for small teams', threat: 'HIGH' },
  { id: 2, name: 'Monday.com',  funding: '$574M raised',  positioning: 'Visual project management for teams',  weakness: 'Expensive at scale, limited offline support',       threat: 'HIGH' },
  { id: 3, name: 'ClickUp',     funding: '$537M raised',  positioning: 'All-in-one productivity platform',     weakness: 'Feature bloat, slow on large workspaces',           threat: 'MED'  },
  { id: 4, name: 'Basecamp',    funding: 'Bootstrapped',  positioning: 'Simple project management for SMBs',   weakness: 'Outdated UI, missing advanced analytics',           threat: 'LOW'  },
]

const PAIN_POINTS = [
  { id: 1, severity: 'CRITICAL', mentions: 847,  title: 'Overwhelming feature complexity',  source: 'G2, Capterra'   },
  { id: 2, severity: 'HIGH',     mentions: 612,  title: 'Poor mobile experience',           source: 'App Store'      },
  { id: 3, severity: 'HIGH',     mentions: 445,  title: 'Pricing transparency issues',      source: 'Reddit, HN'     },
  { id: 4, severity: 'MED',      mentions: 298,  title: 'Integration reliability',          source: 'GitHub issues'  },
]

const SCORES = [
  { label: 'Market Fit',       score: 9 },
  { label: 'Timing',           score: 6 },
  { label: 'Competitive Moat', score: 4 },
]

const OPPORTUNITIES = [
  { tag: 'OPPORTUNITY', market: '$4.2B TAM',     title: 'SMB Whitespace',            desc: 'No clear winner for 10–50 person teams. Competitors chase enterprise, leaving SMBs underserved.', items: ['Simple onboarding < 5 min', 'Flat pricing under $15/seat', 'Mobile-first workflows'],    score: 8, confidence: 84 },
  { tag: 'TREND',       market: 'Fast growing',  title: 'AI-Assisted Planning Gap',  desc: 'Competitors bolt on AI as afterthought. 78% of users want proactive AI-driven project planning.', items: ['Predictive deadline detection', 'Auto task assignment', 'Risk flagging'],                  score: 7, confidence: 71 },
  { tag: 'WEDGE',       market: 'High conversion',title: 'Pricing Model Disruption', desc: 'Per-seat pricing causes churn at growth stage. Usage-based model could unlock viral adoption.',   items: ['Usage-based pricing', 'Free tier with export', 'Team referral loops'],                    score: 6, confidence: 63 },
]

// ─── Export handler ───────────────────────────────────────────────────────────

function exportReport() {
  const prev = document.title
  document.title = `CompeteIQ — ${QUERY} — ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
  window.print()
  // Restore title after the print dialog closes (requestAnimationFrame fires post-dialog)
  requestAnimationFrame(() => { document.title = prev })
}

// ─── Components ───────────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-[11px] font-semibold text-[#666E80] uppercase tracking-widest px-1">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function App() {
  const [loading, setLoading] = useState(false)

  return (
    <>
    {/* ── Screen UI (hidden during print) ──────────────────────────────────── */}
    <div className="min-h-screen bg-background text-white font-sans print:hidden">

      {/* Header */}
      <header className="border-b border-border bg-surface px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="font-bold text-base tracking-tight">CompeteIQ</span>
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">BETA</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Skeleton toggle */}
          <button
            onClick={() => setLoading(v => !v)}
            className="text-xs px-3 py-1.5 rounded-md border border-border text-[#666E80] hover:text-white hover:border-[#484F58] transition-colors"
          >
            {loading ? '▶  Show live' : '◌  Show skeleton'}
          </button>

          {/* Export Report — primary CTA */}
          <button
            onClick={exportReport}
            className="flex items-center gap-2 text-xs px-4 py-1.5 rounded-md bg-primary hover:bg-primary-hover text-white font-semibold transition-colors"
            title="Export as PDF"
          >
            {/* PDF icon (inline SVG, no external dep) */}
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 1h6l4 4v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
                stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
              <path d="M9 1v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M5 10h6M5 12.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Export Report
          </button>
        </div>
      </header>

      <main className="max-w-[960px] mx-auto py-10 px-6 space-y-10">

        {/* ── 1. Competitor Cards ─────────────────────────────────────────── */}
        <Section title="Competitor Cards">
          <div className="grid grid-cols-2 gap-3">
            {loading
              ? Array.from({ length: 4 }, (_, i) => <CompetitorCardSkeleton key={i} />)
              : COMPETITORS.map(c => <CompetitorCard key={c.id} {...c} />)
            }
          </div>
        </Section>

        {/* ── 2. Pain Point Tags ──────────────────────────────────────────── */}
        <Section title="Pain Point Tags">
          <div
            className="rounded-[10px] p-4 space-y-3"
            style={{ backgroundColor: '#16191F', border: '1px solid #262B38' }}
          >
            {PAIN_POINTS.map(pp => (
              <div key={pp.id} className="flex items-center justify-between">
                <PainPointTag severity={pp.severity} mentions={pp.mentions} />
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[13px] font-medium text-[#BFC4D1]">{pp.title}</span>
                  <span className="text-[11px] text-[#4A4F5C]">Source: {pp.source}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 3. Opportunity Score ────────────────────────────────────────── */}
        <Section title="Opportunity Score">
          <div
            className="rounded-[10px] p-5 space-y-5"
            style={{ backgroundColor: '#16191F', border: '1px solid #262B38' }}
          >
            <div className="grid grid-cols-3 gap-6">
              <OpportunityScore score={9} label="Market Fit"       size="md" />
              <OpportunityScore score={6} label="Timing"           size="md" />
              <OpportunityScore score={4} label="Competitive Moat" size="md" />
            </div>
            <div className="h-px" style={{ backgroundColor: '#262B38' }} />
            <OpportunityScore score={7} label="Overall Score" size="lg" />
          </div>
        </Section>

        {/* ── 4. Confidence Indicator ─────────────────────────────────────── */}
        <Section title="Confidence Indicator">
          <div
            className="rounded-[10px] p-5 space-y-4"
            style={{ backgroundColor: '#16191F', border: '1px solid #262B38' }}
          >
            <ConfidenceIndicator value={84} label="High — strong signal" />
            <ConfidenceIndicator value={61} />
            <ConfidenceIndicator value={38} />
            {/* Ring-only variant */}
            <div className="flex items-center gap-4 pt-1">
              <ConfidenceIndicator value={91} showBar={false} label="Ring only" />
              <ConfidenceIndicator value={55} showBar={false} />
              <ConfidenceIndicator value={29} showBar={false} />
            </div>
          </div>
        </Section>

        {/* ── 5. Market Intelligence Panel ────────────────────────────────── */}
        <Section title="Market Intelligence Panel">
          <MarketIntelligencePanel loading={loading} />
        </Section>

      </main>
    </div>

    {/* ── Print layout (hidden on screen, shown during print) ──────────────── */}
    <PrintLayout
      query={QUERY}
      competitors={COMPETITORS}
      painPoints={PAIN_POINTS}
      scores={SCORES}
      overallScore={7}
      opportunities={OPPORTUNITIES}
    />
    </>
  )
}
