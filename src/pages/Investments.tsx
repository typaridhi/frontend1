import { useState } from 'react'
import { Sparkles, ChevronRight, Info } from 'lucide-react'

// Palette
// #221F1C darkest | #4A3F35 rich | #AD8B6A light | #E4C9AB pale | #FCF6F0 icy

const products = [
  {
    emoji: '🛡️', name: 'Emergency Fund', risk: 'No Risk', returns: '3–4%', horizon: '1–6 months',
    suitedFor: 'Everyone — must have first', tag: 'Priority', tagColor: 'rose',
    desc: 'A liquid safety net of 6 months of expenses. Keep in high-yield savings or liquid mutual fund.',
  },
  {
    emoji: '🏦', name: 'Fixed Deposit', risk: 'Very Low', returns: '6.5–7.5%', horizon: '1–5 years',
    suitedFor: 'Conservative investors', tag: 'Stable', tagColor: 'blue',
    desc: 'Guaranteed returns with DICGC insurance up to ₹5L. Best for short-term goals.',
  },
  {
    emoji: '📈', name: 'SIP (Mutual Fund)', risk: 'Moderate', returns: '10–14%', horizon: '5+ years',
    suitedFor: 'Beginners & salaried', tag: 'Recommended', tagColor: 'emerald',
    desc: 'Invest a fixed amount monthly. Rupee-cost averaging reduces market timing risk.',
  },
  {
    emoji: '🧩', name: 'Mutual Funds', risk: 'Moderate–High', returns: '10–18%', horizon: '3–7 years',
    suitedFor: 'Growth-oriented investors', tag: 'Popular', tagColor: 'violet',
    desc: 'Diversified exposure across equities. ELSS funds also offer ₹1.5L tax deduction.',
  },
  {
    emoji: '📊', name: 'ETFs', risk: 'Moderate', returns: '10–15%', horizon: '3+ years',
    suitedFor: 'Index investors', tag: 'Low Cost', tagColor: 'indigo',
    desc: 'Track Nifty 50 or Sensex passively. Lower expense ratios than active funds.',
  },
  {
    emoji: '🥇', name: 'Digital Gold', risk: 'Moderate', returns: '8–12%', horizon: '3–5 years',
    suitedFor: 'Inflation hedge seekers', tag: 'Hedge', tagColor: 'amber',
    desc: 'Buy and sell gold digitally via MMTC-PAMP or Sovereign Gold Bonds for extra returns.',
  },
  {
    emoji: '🏛️', name: 'PPF', risk: 'No Risk', returns: '7.1%', horizon: '15 years',
    suitedFor: 'Tax savers / long-term', tag: 'Tax Free', tagColor: 'green',
    desc: 'Fully tax-free interest and maturity. Lock-in for 15 years — great for retirement.',
  },
  {
    emoji: '🏢', name: 'NPS', risk: 'Low–Moderate', returns: '9–12%', horizon: 'Till retirement',
    suitedFor: 'Retirement planning', tag: 'Tax Benefit', tagColor: 'teal',
    desc: 'Additional ₹50,000 tax deduction under 80CCD(1B). Market-linked pension corpus.',
  },
]

const riskColors: Record<string, { bg: string; text: string }> = {
  'No Risk':       { bg: 'bg-[#E4C9AB]/50', text: 'text-[#4A3F35]' },
  'Very Low':      { bg: 'bg-[#E4C9AB]/50', text: 'text-[#4A3F35]' },
  'Moderate':      { bg: 'bg-[#AD8B6A]/20', text: 'text-[#4A3F35]' },
  'Moderate–High': { bg: 'bg-[#4A3F35]/15', text: 'text-[#221F1C]' },
  'Low–Moderate':  { bg: 'bg-[#AD8B6A]/20', text: 'text-[#4A3F35]' },
}

const tagBase = 'bg-[#E4C9AB]/60 text-[#4A3F35]'
const tagColors: Record<string, string> = {
  rose:    'bg-[#4A3F35] text-[#FCF6F0]',
  blue:    tagBase,
  emerald: 'bg-[#AD8B6A]/25 text-[#4A3F35]',
  violet:  tagBase,
  indigo:  tagBase,
  amber:   tagBase,
  green:   tagBase,
  teal:    tagBase,
}

const profiles = ['Conservative', 'Moderate', 'Aggressive'] as const
type Risk = typeof profiles[number]

export default function Investments() {
  const [riskProfile, setRiskProfile] = useState<Risk>('Moderate')

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-[#4A3F35] to-[#221F1C] rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#AD8B6A]/20 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-[#E4C9AB]" />
              <span className="text-sm font-semibold text-[#E4C9AB] uppercase tracking-wider">AI-Powered</span>
            </div>
            <h1 className="text-2xl font-bold text-[#FCF6F0] mb-1">Personalised Investment Suggestions</h1>
            <p className="text-[#E4C9AB] text-sm">Based on your income ₹85,000, savings rate 38%, and risk profile.</p>
          </div>
          <div className="text-center bg-white/10 border border-white/20 rounded-2xl p-4 text-[#FCF6F0] flex-shrink-0">
            <p className="text-3xl font-black">₹8,000</p>
            <p className="text-xs text-[#E4C9AB] mt-0.5">Monthly invest capacity</p>
          </div>
        </div>
      </div>

      {/* Risk profile widget */}
      <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[#221F1C]">Your Risk Profile</h3>
            <p className="text-xs text-[#AD8B6A] mt-0.5">Affects which instruments are highlighted for you</p>
          </div>
          <span className="text-xs font-semibold bg-[#E4C9AB]/50 text-[#4A3F35] px-2.5 py-1 rounded-full">
            Current: {riskProfile}
          </span>
        </div>
        <div className="flex gap-3">
          {profiles.map(p => (
            <button
              key={p}
              onClick={() => setRiskProfile(p)}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all ${
                riskProfile === p
                  ? p === 'Conservative' ? 'bg-[#AD8B6A] text-[#FCF6F0] border-[#AD8B6A] shadow-sm'
                    : p === 'Moderate' ? 'bg-[#4A3F35] text-[#FCF6F0] border-[#4A3F35] shadow-sm'
                    : 'bg-[#221F1C] text-[#FCF6F0] border-[#221F1C] shadow-sm'
                  : 'bg-[#FCF6F0] border-[#E4C9AB] text-[#4A3F35] hover:border-[#AD8B6A]'
              }`}
            >
              {p === 'Conservative' ? '🛡️' : p === 'Moderate' ? '⚖️' : '🚀'} {p}
            </button>
          ))}
        </div>
        <div className="mt-3 h-1.5 bg-[#E4C9AB]/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: riskProfile === 'Conservative' ? '25%' : riskProfile === 'Moderate' ? '55%' : '90%',
              background: riskProfile === 'Conservative' ? '#AD8B6A' : riskProfile === 'Moderate' ? '#4A3F35' : '#221F1C',
            }}
          />
        </div>
      </div>

      {/* AI recommendation panel */}
      <div className="bg-[#221F1C] rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#AD8B6A]/10 blur-3xl" />
        <div className="relative flex items-start gap-4">
          <div className="w-10 h-10 bg-[#AD8B6A]/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles size={16} className="text-[#E4C9AB]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#FCF6F0] mb-2">Finshpere Recommendation</p>
            <p className="text-sm text-[#E4C9AB] leading-relaxed">
              Based on your income and savings, <strong className="text-[#FCF6F0]">start with a 6-month emergency fund first</strong> (₹3.1L target).
              Then allocate <strong className="text-[#FCF6F0]">₹3,000/month to a Nifty 50 index SIP</strong>, ₹2,000 to PPF, and ₹1,500 to a flexi-cap mutual fund.
              This balanced approach suits your <strong className="text-[#FCF6F0]">{riskProfile}</strong> risk profile.
            </p>
            <div className="flex gap-2 mt-3">
              {['SIP First', 'PPF for tax', 'FD as buffer'].map(tag => (
                <span key={tag} className="text-xs bg-[#AD8B6A]/25 text-[#E4C9AB] px-2.5 py-1 rounded-full font-medium">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product cards */}
      <div>
        <h2 className="text-sm font-semibold text-[#4A3F35] uppercase tracking-wider mb-4">Investment Options</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map(p => {
            const rc = riskColors[p.risk] || riskColors['Moderate']
            return (
              <div key={p.name} className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-5 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#E4C9AB]/40 flex items-center justify-center text-2xl">
                      {p.emoji}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#221F1C]">{p.name}</h3>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagColors[p.tagColor]}`}>{p.tag}</span>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-[#E4C9AB]/40 text-[#AD8B6A]">
                    <Info size={14} />
                  </button>
                </div>

                <p className="text-xs text-[#4A3F35] leading-relaxed mb-3">{p.desc}</p>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: 'Risk', value: p.risk, extra: rc },
                    { label: 'Returns', value: p.returns },
                    { label: 'Horizon', value: p.horizon },
                  ].map(f => (
                    <div key={f.label} className="text-center">
                      <p className="text-xs text-[#AD8B6A] mb-0.5">{f.label}</p>
                      <p className={`text-xs font-bold ${f.extra ? `${f.extra.bg} ${f.extra.text} px-1.5 py-0.5 rounded-lg` : 'text-[#221F1C]'}`}>
                        {f.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E4C9AB]/60">
                  <p className="text-xs text-[#AD8B6A]">Best for: <span className="text-[#4A3F35] font-medium">{p.suitedFor}</span></p>
                  <button className="flex items-center gap-1 text-xs font-semibold text-[#4A3F35] hover:underline group-hover:gap-2 transition-all">
                    Learn more <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
