import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { TrendingUp, TrendingDown, Minus, Sliders } from 'lucide-react'

// Palette
// #221F1C darkest | #4A3F35 rich | #AD8B6A light | #E4C9AB pale | #FCF6F0 icy

type Horizon = '1Y' | '5Y' | '10Y'

const buildData = (horizon: Horizon, discretionaryLeak: number, returnRate: number) => {
  const periods = horizon === '1Y' ? 12 : horizon === '5Y' ? 60 : 120
  const label = horizon === '1Y' ? (i: number) => `M${i + 1}` : horizon === '5Y' ? (i: number) => `Y${Math.floor(i / 12) + 1}M${(i % 12) + 1}` : (i: number) => `Y${Math.floor(i / 12) + 1}`
  const step = horizon === '10Y' ? 12 : horizon === '5Y' ? 6 : 1
  const points = []
  let neutral = 120000, better = 120000, worse = 120000
  const monthlyIncome = 85000
  const baseExpenses = 52000
  for (let i = 0; i < periods; i += step) {
    const months = i + step
    const savings = (monthlyIncome - baseExpenses) * months
    neutral = 120000 + savings + savings * (0.07 / 12) * months
    better = 120000 + (savings * (1 + discretionaryLeak / 100)) + (savings * (returnRate / 100 / 12) * months)
    worse = 120000 + (savings * 0.82) - (savings * 0.02 * months / 12)
    points.push({
      period: label(i),
      neutral: Math.round(neutral / 1000),
      better: Math.round(better / 1000),
      worse: Math.max(0, Math.round(worse / 1000)),
    })
  }
  return points
}

const behaviouralInsights = [
  { emoji: '📅', label: 'Peak Spend Day', value: 'Friday', desc: '34% of weekly spend happens on Fridays' },
  { emoji: '🛒', label: 'Impulse Triggers', value: 'Food + Apps', desc: 'Dining & subscription spikes mid-month' },
  { emoji: '📈', label: 'Subscription Creep', value: '+₹1,200/yr', desc: '3 unused subscriptions detected' },
  { emoji: '🌙', label: 'Late-Night Spend', value: '₹4,800/mo', desc: 'Orders placed 10pm–2am avg. 22% higher' },
]

export default function TimeMachine() {
  const [horizon, setHorizon] = useState<Horizon>('5Y')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [discretionaryLeak, setDiscretionaryLeak] = useState(15)
  const [returnRate, setReturnRate] = useState(10)

  const data = buildData(horizon, discretionaryLeak, returnRate)

  const last = data[data.length - 1]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null
    return (
      <div className="bg-white border border-[#E4C9AB] rounded-xl shadow-lg p-3 text-xs">
        <p className="font-semibold text-[#4A3F35] mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ background: p.stroke }} />
            <span className="text-[#4A3F35] capitalize">{p.dataKey}:</span>
            <span className="font-bold text-[#221F1C]">₹{p.value}K</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#221F1C]">Financial Time Machine</h1>
          <p className="text-sm text-[#4A3F35] mt-0.5">
            Behavioral Trajectory Simulator — see where your habits lead
          </p>
        </div>
        <button
          onClick={() => setDrawerOpen(d => !d)}
          className="flex items-center gap-2 text-sm font-semibold text-[#4A3F35] bg-white border border-[#E4C9AB] px-4 py-2.5 rounded-xl hover:border-[#AD8B6A] transition-colors shadow-sm"
        >
          <Sliders size={14} />
          Tune Parameters
        </button>
      </div>

      {/* Horizon tabs + chart */}
      <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-semibold text-[#221F1C]">Net Worth Trajectory</h2>
            <p className="text-xs text-[#AD8B6A] mt-0.5">Rolling 90-day behavioral baseline projected forward</p>
          </div>
          <div className="flex gap-1 bg-[#E4C9AB]/40 rounded-xl p-1">
            {(['1Y', '5Y', '10Y'] as Horizon[]).map(h => (
              <button
                key={h}
                onClick={() => setHorizon(h)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  horizon === h ? 'bg-white text-[#221F1C] shadow-sm' : 'text-[#4A3F35]'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-4 text-xs">
          {[
            { color: '#AD8B6A', label: 'Current Behavior (Neutral)', key: 'neutral' },
            { color: '#4A3F35', label: `Improved (−${discretionaryLeak}% discretionary)`, key: 'better' },
            { color: '#221F1C', label: 'Worse (lifestyle inflation)', key: 'worse' },
          ].map(l => (
            <div key={l.key} className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 rounded-full" style={{ background: l.color, display: 'inline-block' }} />
              <span className="text-[#4A3F35]">{l.label}</span>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4C9AB" vertical={false} />
            <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#AD8B6A' }} axisLine={false} tickLine={false} interval={Math.floor(data.length / 6)} />
            <YAxis tick={{ fontSize: 10, fill: '#AD8B6A' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}K`} width={48} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="neutral" stroke="#AD8B6A" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="better" stroke="#4A3F35" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="worse" stroke="#221F1C" strokeWidth={2} strokeDasharray="5 3" dot={false} />
          </LineChart>
        </ResponsiveContainer>

        {/* Outcome summary */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: `Neutral in ${horizon}`, value: `₹${last.neutral}K`, icon: Minus, color: 'text-[#AD8B6A]', bg: 'bg-[#FCF6F0]', border: 'border-[#E4C9AB]' },
            { label: `Improved in ${horizon}`, value: `₹${last.better}K`, icon: TrendingUp, color: 'text-[#4A3F35]', bg: 'bg-[#E4C9AB]/40', border: 'border-[#E4C9AB]' },
            { label: `Worse in ${horizon}`, value: `₹${last.worse}K`, icon: TrendingDown, color: 'text-[#221F1C]', bg: 'bg-[#221F1C]/10', border: 'border-[#221F1C]/20' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} border ${s.border} rounded-xl p-4 flex items-center gap-3`}>
              <s.icon size={18} className={s.color} />
              <div>
                <p className={`text-base font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-[#4A3F35]">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Behavioral Pattern Insights */}
      <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-[#221F1C] mb-4">Behavioral Pattern Analysis</h2>
        <div className="grid grid-cols-4 gap-3">
          {behaviouralInsights.map(b => (
            <div key={b.label} className="bg-[#FCF6F0] rounded-xl p-4">
              <span className="text-2xl block mb-2">{b.emoji}</span>
              <p className="text-xs text-[#AD8B6A] mb-0.5">{b.label}</p>
              <p className="text-sm font-bold text-[#221F1C]">{b.value}</p>
              <p className="text-xs text-[#4A3F35] mt-1 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Parameter Tuning Drawer */}
      {drawerOpen && (
        <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-[#221F1C] mb-5">Parameter Tuning</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[#4A3F35]">Discretionary Cut</label>
                <span className="text-sm font-bold text-[#4A3F35]">{discretionaryLeak}%</span>
              </div>
              <input type="range" min={5} max={40} value={discretionaryLeak} onChange={e => setDiscretionaryLeak(Number(e.target.value))}
                className="w-full accent-[#4A3F35]" />
              <div className="flex justify-between text-xs text-[#AD8B6A] mt-1">
                <span>5% (minimal)</span><span>40% (aggressive)</span>
              </div>
              <p className="text-xs text-[#AD8B6A] mt-2">How much to reduce discretionary spend in the "improved" scenario</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[#4A3F35]">Expected Return Rate</label>
                <span className="text-sm font-bold text-[#AD8B6A]">{returnRate}% p.a.</span>
              </div>
              <input type="range" min={4} max={18} value={returnRate} onChange={e => setReturnRate(Number(e.target.value))}
                className="w-full accent-[#AD8B6A]" />
              <div className="flex justify-between text-xs text-[#AD8B6A] mt-1">
                <span>4% (FD)</span><span>18% (equity)</span>
              </div>
              <p className="text-xs text-[#AD8B6A] mt-2">Annual investment return applied to the "improved" projection</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
