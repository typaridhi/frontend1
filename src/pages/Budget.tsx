import { useState } from 'react'
import { AlertTriangle, Sparkles, CheckCircle, Edit2 } from 'lucide-react'
import { budgetCategories } from '../data/mockData'

// Palette
// #221F1C darkest | #4A3F35 rich | #AD8B6A light | #E4C9AB pale | #FCF6F0 icy

export default function Budget() {
  const [budgets, setBudgets] = useState(budgetCategories)
  const [editing, setEditing] = useState<string | null>(null)

  const getStatus = (spent: number, budget: number) => {
    const pct = (spent / budget) * 100
    if (pct >= 100) return 'over'
    if (pct >= 80) return 'warning'
    return 'good'
  }

  const totalBudget = budgets.reduce((a, b) => a + b.budget, 0)
  const totalSpent = budgets.reduce((a, b) => a + b.spent, 0)

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#221F1C]">Budget Planner</h1>
          <p className="text-sm text-[#4A3F35] mt-0.5">July 2025</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#221F1C]">₹{totalSpent.toLocaleString()}</p>
          <p className="text-sm text-[#4A3F35]">of ₹{totalBudget.toLocaleString()} budget used</p>
        </div>
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-5 shadow-sm">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-[#4A3F35]">Total Budget Used</span>
          <span className="font-bold text-[#221F1C]">{Math.round((totalSpent / totalBudget) * 100)}%</span>
        </div>
        <div className="h-3 bg-[#E4C9AB]/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#AD8B6A] to-[#4A3F35] rounded-full transition-all"
            style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-[#AD8B6A] mt-1.5">
          <span>₹{totalSpent.toLocaleString()} spent</span>
          <span>₹{(totalBudget - totalSpent).toLocaleString()} remaining</span>
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="bg-[#E4C9AB]/40 border border-[#E4C9AB] rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-[#AD8B6A]/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles size={16} className="text-[#4A3F35]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#221F1C] mb-1">AI Budget Recommendation</p>
            <p className="text-sm text-[#4A3F35]">
              You've exceeded your Entertainment budget by ₹200. Consider reducing dining out by ₹2,000 next month — that
              alone would save you ₹24,000 annually.
            </p>
            <div className="flex gap-2 mt-3">
              <button className="text-xs font-medium bg-[#4A3F35] text-[#FCF6F0] px-3 py-1.5 rounded-lg hover:bg-[#221F1C] transition-colors">
                Apply suggestion
              </button>
              <button className="text-xs font-medium text-[#4A3F35] px-3 py-1.5 rounded-lg hover:bg-[#E4C9AB]/60 transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-2 gap-4">
        {budgets.map(cat => {
          const pct = Math.min((cat.spent / cat.budget) * 100, 100)
          const status = getStatus(cat.spent, cat.budget)
          const remaining = cat.budget - cat.spent

          return (
            <div
              key={cat.category}
              className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#221F1C]">{cat.category}</p>
                    <p className="text-xs text-[#AD8B6A]">
                      {status === 'over'
                        ? `₹${Math.abs(remaining).toLocaleString()} over budget`
                        : `₹${remaining.toLocaleString()} left`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {status === 'over' && <AlertTriangle size={14} className="text-[#221F1C]" />}
                  {status === 'warning' && <AlertTriangle size={14} className="text-[#AD8B6A]" />}
                  {status === 'good' && <CheckCircle size={14} className="text-[#4A3F35]" />}
                  <button
                    onClick={() => setEditing(editing === cat.category ? null : cat.category)}
                    className="p-1.5 rounded-lg hover:bg-[#E4C9AB]/40 text-[#AD8B6A] transition-colors"
                  >
                    <Edit2 size={13} />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-[#E4C9AB]/50 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all ${
                    status === 'over'
                      ? 'bg-[#221F1C]'
                      : status === 'warning'
                      ? 'bg-[#AD8B6A]'
                      : 'bg-[#4A3F35]'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Stats */}
              <div className="flex justify-between text-xs">
                <span className="text-[#4A3F35]">
                  Spent: <strong className="text-[#221F1C]">₹{cat.spent.toLocaleString()}</strong>
                </span>
                <span className="text-[#4A3F35]">
                  Budget: <strong className="text-[#221F1C]">₹{cat.budget.toLocaleString()}</strong>
                </span>
              </div>

              {/* Edit budget input */}
              {editing === cat.category && (
                <div className="mt-3 pt-3 border-t border-[#E4C9AB]/60 flex gap-2">
                  <input
                    type="number"
                    defaultValue={cat.budget}
                    className="flex-1 px-3 py-1.5 text-sm bg-[#FCF6F0] border border-[#E4C9AB] rounded-lg text-[#221F1C] focus:outline-none focus:ring-2 focus:ring-[#AD8B6A]/30 focus:border-[#AD8B6A]"
                    onChange={e => {
                      const val = parseInt(e.target.value)
                      if (!isNaN(val)) {
                        setBudgets(bs => bs.map(b => b.category === cat.category ? { ...b, budget: val } : b))
                      }
                    }}
                  />
                  <button
                    onClick={() => setEditing(null)}
                    className="px-3 py-1.5 bg-[#4A3F35] text-[#FCF6F0] text-xs rounded-lg hover:bg-[#221F1C]"
                  >
                    Save
                  </button>
                </div>
              )}

              {/* Warning badge */}
              {status !== 'good' && (
                <div
                  className={`mt-3 text-xs px-2.5 py-1.5 rounded-lg font-medium ${
                    status === 'over'
                      ? 'bg-[#221F1C]/10 text-[#221F1C]'
                      : 'bg-[#E4C9AB]/50 text-[#4A3F35]'
                  }`}
                >
                  {status === 'over'
                    ? `⚠️ Over budget by ₹${Math.abs(remaining).toLocaleString()}`
                    : `⚡ ${Math.round(pct)}% used — slow down to stay on track`}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add category */}
      <button className="w-full py-4 border-2 border-dashed border-[#E4C9AB] rounded-2xl text-sm font-medium text-[#AD8B6A] hover:border-[#AD8B6A] hover:text-[#4A3F35] transition-all">
        + Add Budget Category
      </button>
    </div>
  )
}
