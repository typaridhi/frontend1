



import { useState } from 'react'
import { Plus, Sparkles, Target, Calendar, TrendingUp } from 'lucide-react'
import { goals } from '../data/mockData'

// Palette
// #221F1C darkest | #4A3F35 rich | #AD8B6A light | #E4C9AB pale | #FCF6F0 icy

// Keys match goal.color in mockData; all map to brown shades now
const colorMap: Record<string, { ring: string; fill: string; badge: string; text: string }> = {
  emerald: { ring: '#4A3F35', fill: '#4A3F35', badge: 'bg-[#E4C9AB]/40 text-[#4A3F35]', text: 'text-[#4A3F35]' },
  blue: { ring: '#AD8B6A', fill: '#AD8B6A', badge: 'bg-[#E4C9AB]/40 text-[#4A3F35]', text: 'text-[#AD8B6A]' },
  slate: { ring: '#221F1C', fill: '#221F1C', badge: 'bg-[#E4C9AB]/40 text-[#4A3F35]', text: 'text-[#221F1C]' },
  amber: { ring: '#7A6450', fill: '#7A6450', badge: 'bg-[#E4C9AB]/40 text-[#4A3F35]', text: 'text-[#7A6450]' },
}

function CircleProgress({ pct, color }: { pct: number; color: string }) {
  const r = 36
  const c = 2 * Math.PI * r
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg width="96" height="96" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#E4C9AB" strokeWidth="8" />
        <circle
          cx="48" cy="48" r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${c * (pct / 100)} ${c}`}
          strokeDashoffset={c * 0.25}
          style={{ filter: `drop-shadow(0 0 4px ${color}60)` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-[#221F1C]">{Math.round(pct)}%</span>
      </div>
    </div>
  )
}

export default function Goals() {
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#221F1C]">Financial Goals</h1>
          <p className="text-sm text-[#4A3F35] mt-0.5">Track and achieve your savings targets</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 bg-[#4A3F35] hover:bg-[#221F1C] text-[#FCF6F0] font-medium text-sm px-4 py-2 rounded-xl transition-all shadow-sm shadow-[#4A3F35]/25"
        >
          <Plus size={14} />
          Add Goal
        </button>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Saved', value: '₹3,72,000', icon: TrendingUp, color: 'text-[#4A3F35]' },
          { label: 'Total Target', value: '₹13,30,000', icon: Target, color: 'text-[#AD8B6A]' },
          { label: 'Active Goals', value: '4', icon: Calendar, color: 'text-[#221F1C]' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-4 shadow-sm flex items-center gap-3">
            <stat.icon size={20} className={stat.color} />
            <div>
              <p className="text-lg font-bold text-[#221F1C]">{stat.value}</p>
              <p className="text-xs text-[#AD8B6A]">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Goal cards */}
      <div className="grid grid-cols-2 gap-4">
        {goals.map(goal => {
          const pct = (goal.saved / goal.target) * 100
          const remaining = goal.target - goal.saved
          const colors = colorMap[goal.color] || colorMap.emerald

          return (
            <div
              key={goal.name}
              className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <span className="text-3xl mb-2 block">{goal.emoji}</span>
                  <h3 className="text-base font-bold text-[#221F1C]">{goal.name}</h3>
                  <p className="text-xs text-[#AD8B6A] mt-0.5">Target: {goal.deadline}</p>
                </div>
                <CircleProgress pct={pct} color={colors.fill} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <p className="text-xs text-[#AD8B6A] mb-0.5">Target</p>
                  <p className="text-sm font-bold text-[#221F1C]">₹{(goal.target / 1000).toFixed(0)}k</p>
                </div>
                <div>
                  <p className="text-xs text-[#AD8B6A] mb-0.5">Saved</p>
                  <p className={`text-sm font-bold ${colors.text}`}>₹{(goal.saved / 1000).toFixed(0)}k</p>
                </div>
                <div>
                  <p className="text-xs text-[#AD8B6A] mb-0.5">Remaining</p>
                  <p className="text-sm font-bold text-[#221F1C]">₹{(remaining / 1000).toFixed(0)}k</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-[#E4C9AB]/50 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: colors.fill }}
                />
              </div>

              {/* AI prediction */}
              <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-xl ${colors.badge}`}>
                <Sparkles size={11} />
                <span>
                  AI predicts: <strong>{goal.aiDate}</strong> at current rate
                </span>
              </div>

              {/* Monthly contribution needed */}
              <p className="text-xs text-[#AD8B6A] mt-2">
                Add ₹{Math.round(remaining / 12).toLocaleString()}/month to meet your target
              </p>
            </div>
          )
        })}
      </div>

      {/* Add Goal form */}
      {showAdd && (
        <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[#221F1C] mb-4">Create New Goal</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Goal name', placeholder: 'e.g. Home Down Payment' },
              { label: 'Target amount (₹)', placeholder: '500000' },
              { label: 'Current savings (₹)', placeholder: '0' },
              { label: 'Target date', placeholder: '', type: 'date' },
            ].map(field => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-[#4A3F35] mb-1.5">{field.label}</label>
                <input
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2.5 text-sm bg-[#FCF6F0] border border-[#E4C9AB] rounded-xl text-[#221F1C] placeholder-[#AD8B6A] focus:outline-none focus:ring-2 focus:ring-[#AD8B6A]/30 focus:border-[#AD8B6A] transition-all"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-[#4A3F35] hover:bg-[#221F1C] text-[#FCF6F0] font-semibold py-2.5 rounded-xl transition-colors">
              Create Goal
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2.5 bg-[#E4C9AB]/40 text-[#4A3F35] rounded-xl hover:bg-[#E4C9AB]/70 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
