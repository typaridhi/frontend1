import { useState } from 'react'
import { AlertTriangle, Shield, ChevronDown, ChevronUp, Zap } from 'lucide-react'

// Palette
// #221F1C darkest | #4A3F35 rich | #AD8B6A light | #E4C9AB pale | #FCF6F0 icy

const liquidAssets = [
  { label: 'Savings Account', amount: 120000, type: 'liquid' },
  { label: 'Short-term FD (breakable)', amount: 80000, type: 'liquid' },
  { label: 'Liquid Mutual Fund', amount: 45000, type: 'liquid' },
]

const monthlyEssentials = [
  { label: 'Rent', amount: 25000, icon: '🏠' },
  { label: 'Groceries & Food', amount: 8000, icon: '🥗' },
  { label: 'Medical Insurance', amount: 3500, icon: '💊' },
  { label: 'EMI (Home Loan)', amount: 12000, icon: '🏦' },
  { label: 'Utilities (Power/Water)', amount: 2500, icon: '⚡' },
]

const liquidTotal = liquidAssets.reduce((s, a) => s + a.amount, 0)
const essentialsTotal = monthlyEssentials.reduce((s, e) => s + e.amount, 0)
const survivalMonths = Math.floor(liquidTotal / essentialsTotal)

const waterfall = [
  { step: 1, label: 'Liquid Savings', desc: 'Savings account balance — zero-friction access', amount: 120000 },
  { step: 2, label: 'Break Short-term FD', desc: 'Penalty ~1% — minimal cost for urgent liquidity', amount: 80000 },
  { step: 3, label: 'Redeem Liquid Mutual Fund', desc: 'T+1 settlement — typically within 1 business day', amount: 45000 },
  { step: 4, label: 'Cut Discretionary Subscriptions', desc: 'Cancel streaming, gym, and non-essential apps immediately', amount: 3500 },
  { step: 5, label: 'Secondary Assets (Gold/ETF)', desc: 'Sell partially if runway extends below 2 months', amount: 55000 },
]

// Row background and step-circle color for each waterfall step (by position)
const stepRowStyles = [
  'bg-[#E4C9AB]/60 border-[#E4C9AB]',
  'bg-[#E4C9AB]/45 border-[#E4C9AB]',
  'bg-[#E4C9AB]/30 border-[#E4C9AB]',
  'bg-[#AD8B6A]/15 border-[#AD8B6A]/40',
  'bg-[#4A3F35]/10 border-[#4A3F35]/25',
]
const stepCircleStyles = ['bg-[#221F1C]', 'bg-[#4A3F35]', 'bg-[#7A6450]', 'bg-[#AD8B6A]', 'bg-[#C9A883]']

const nonEssentialCats = ['Dining Out', 'Streaming', 'Shopping', 'Entertainment', 'Gym']

export default function SafetyNet() {
  const [crisisMode, setCrisisMode] = useState(false)
  const [jobLoss, setJobLoss] = useState(false)
  const [medicalBill, setMedicalBill] = useState(false)
  const [medAmount, setMedAmount] = useState(50000)
  const [expanded, setExpanded] = useState<number | null>(null)

  const adjustedLiquid = liquidTotal - (medicalBill ? medAmount : 0)
  const inflow = jobLoss ? 0 : 85000
  const adjustedRunway = inflow > 0
    ? '∞ (income positive)'
    : Math.max(0, Math.floor(adjustedLiquid / essentialsTotal)) + ' months'

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#221F1C]">Safety Net & Contingency</h1>
          <p className="text-sm text-[#4A3F35] mt-0.5">Emergency survival runway and crisis simulation</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${
          survivalMonths >= 6 ? 'bg-[#E4C9AB]/50 border-[#E4C9AB] text-[#4A3F35]'
            : survivalMonths >= 3 ? 'bg-[#AD8B6A]/20 border-[#AD8B6A]/50 text-[#4A3F35]'
            : 'bg-[#221F1C]/10 border-[#221F1C]/30 text-[#221F1C]'
        }`}>
          <Shield size={14} />
          {survivalMonths >= 6 ? 'Well Protected' : survivalMonths >= 3 ? 'Moderate Risk' : 'Critical — Act Now'}
        </div>
      </div>

      {/* Survival Runway hero */}
      <div className={`rounded-2xl p-6 relative overflow-hidden text-[#FCF6F0] ${
        crisisMode ? 'bg-gradient-to-r from-[#AD8B6A] to-[#4A3F35]' : 'bg-gradient-to-r from-[#4A3F35] to-[#221F1C]'
      }`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-0 left-1/3 w-64 h-32 rounded-full blur-3xl ${crisisMode ? 'bg-[#E4C9AB]/25' : 'bg-[#AD8B6A]/15'}`} />
        </div>
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-[#E4C9AB] text-sm font-medium mb-1">
              {crisisMode ? '⚠️ SURVIVAL BUDGET MODE ACTIVE' : 'Liquid Survival Runway'}
            </p>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-6xl font-black text-[#FCF6F0]">{crisisMode ? adjustedRunway : `${survivalMonths}M`}</span>
              {!crisisMode && <span className="text-[#E4C9AB] text-base">months of runway</span>}
            </div>
            <p className="text-[#E4C9AB] text-sm">
              ₹{liquidTotal.toLocaleString()} liquid ÷ ₹{essentialsTotal.toLocaleString()}/mo non-negotiables
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Liquid Assets', val: `₹${(liquidTotal / 1000).toFixed(0)}K` },
              { label: 'Monthly Essentials', val: `₹${(essentialsTotal / 1000).toFixed(0)}K` },
              { label: 'Buffer Target (6M)', val: `₹${((essentialsTotal * 6) / 1000).toFixed(0)}K` },
              { label: 'Gap to Target', val: `₹${Math.max(0, (essentialsTotal * 6 - liquidTotal) / 1000).toFixed(0)}K` },
            ].map(s => (
              <div key={s.label} className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-center">
                <p className="text-sm font-black text-[#FCF6F0]">{s.val}</p>
                <p className="text-xs text-[#E4C9AB] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Crisis Simulator */}
      <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-[#221F1C] mb-4">Crisis Simulator</h2>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <button
            onClick={() => setJobLoss(j => !j)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              jobLoss ? 'border-[#4A3F35] bg-[#E4C9AB]/40' : 'border-[#E4C9AB] hover:border-[#AD8B6A]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">💼</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                jobLoss ? 'bg-[#4A3F35] border-[#4A3F35]' : 'border-[#AD8B6A]'
              }`}>
                {jobLoss && <div className="w-2.5 h-2.5 rounded-full bg-[#FCF6F0]" />}
              </div>
            </div>
            <p className="text-sm font-bold text-[#221F1C]">Sudden Job Loss</p>
            <p className="text-xs text-[#AD8B6A] mt-0.5">Zero income scenario — essentials only</p>
          </button>

          <div className={`p-4 rounded-xl border-2 transition-all ${
            medicalBill ? 'border-[#4A3F35] bg-[#E4C9AB]/40' : 'border-[#E4C9AB]'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🏥</span>
              <button
                onClick={() => setMedicalBill(m => !m)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                  medicalBill ? 'bg-[#4A3F35] border-[#4A3F35]' : 'border-[#AD8B6A]'
                }`}
              >
                {medicalBill && <div className="w-2.5 h-2.5 rounded-full bg-[#FCF6F0]" />}
              </button>
            </div>
            <p className="text-sm font-bold text-[#221F1C] mb-2">Emergency Medical Bill</p>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#AD8B6A] font-medium">₹</span>
              <input
                type="number"
                value={medAmount}
                onChange={e => setMedAmount(Number(e.target.value))}
                onClick={() => setMedicalBill(true)}
                className="w-full pl-6 pr-2 py-1.5 text-xs border border-[#E4C9AB] rounded-lg bg-[#FCF6F0] text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#AD8B6A]/40"
              />
            </div>
          </div>
        </div>

        {(jobLoss || medicalBill) && (
          <div className="bg-[#E4C9AB]/40 border border-[#E4C9AB] rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 text-[#221F1C] font-semibold text-sm mb-1">
              <AlertTriangle size={14} />
              Simulated Runway: {adjustedRunway}
            </div>
            <p className="text-xs text-[#4A3F35]">
              Liquid reserves: ₹{Math.max(0, adjustedLiquid).toLocaleString()} — {jobLoss ? 'zero income' : 'income intact'} scenario
            </p>
          </div>
        )}

        <button
          onClick={() => setCrisisMode(m => !m)}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            crisisMode
              ? 'bg-[#E4C9AB] text-[#4A3F35]'
              : 'bg-[#4A3F35] hover:bg-[#221F1C] text-[#FCF6F0] shadow-sm shadow-[#4A3F35]/20'
          }`}
        >
          <Zap size={15} />
          {crisisMode ? 'Deactivate Survival Budget Mode' : 'Activate Survival Budget Mode'}
        </button>

        {crisisMode && (
          <div className="mt-3 p-3 bg-[#E4C9AB]/40 border border-[#E4C9AB] rounded-xl">
            <p className="text-xs font-semibold text-[#4A3F35] mb-2">Non-essential categories — PAUSED:</p>
            <div className="flex flex-wrap gap-2">
              {nonEssentialCats.map(c => (
                <span key={c} className="text-xs bg-[#FCF6F0] text-[#4A3F35] border border-[#E4C9AB] px-2.5 py-1 rounded-full line-through">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Waterfall Liquidation Plan */}
      <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-[#221F1C] mb-4">Waterfall Liquidation Priority Plan</h2>
        <div className="space-y-2">
          {waterfall.map((item, idx) => (
            <div key={item.step}>
              <button
                onClick={() => setExpanded(expanded === idx ? null : idx)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${stepRowStyles[idx]}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[#FCF6F0] text-xs font-black flex-shrink-0 ${stepCircleStyles[idx]}`}>
                  {item.step}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#221F1C]">{item.label}</p>
                  {expanded === idx && <p className="text-xs text-[#4A3F35] mt-1">{item.desc}</p>}
                </div>
                <span className="text-sm font-bold text-[#4A3F35]">₹{item.amount.toLocaleString()}</span>
                {expanded === idx ? <ChevronUp size={14} className="text-[#AD8B6A]" /> : <ChevronDown size={14} className="text-[#AD8B6A]" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly essentials breakdown */}
      <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-[#221F1C] mb-4">Non-Negotiable Monthly Expenses</h2>
        <div className="space-y-2">
          {monthlyEssentials.map(e => (
            <div key={e.label} className="flex items-center justify-between p-3 rounded-xl bg-[#FCF6F0]">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{e.icon}</span>
                <span className="text-sm text-[#4A3F35]">{e.label}</span>
              </div>
              <span className="text-sm font-bold text-[#221F1C]">₹{e.amount.toLocaleString()}</span>
            </div>
          ))}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#221F1C] text-[#FCF6F0]">
            <span className="text-sm font-bold">Total Monthly Essentials</span>
            <span className="text-sm font-black">₹{essentialsTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
