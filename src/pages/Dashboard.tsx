import { useState, useEffect } from 'react'
import { Wallet, TrendingUp, TrendingDown, PiggyBank, Heart, Plus, Scan, Sparkles, ArrowRight, BellRing } from 'lucide-react'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { spendingByCategory as defaultCategoryData, monthlyData as defaultMonthlyData, weeklyTrend as defaultWeeklyTrend, transactions as defaultTransactions } from '../data/mockData'
import { api } from '../services/api'
import type { Page } from '../types'

// Palette
// #221F1C darkest | #4A3F35 rich | #AD8B6A light | #E4C9AB pale | #FCF6F0 icy
const PIE_COLORS = ['#221F1C', '#4A3F35', '#7A6450', '#AD8B6A', '#C9A883', '#E4C9AB']

interface DashboardProps {
  onNav: (p: Page) => void
  user?: any
}

export default function Dashboard({ onNav, user }: DashboardProps) {
  const [summary, setSummary] = useState<any>(null)
  const [categories, setCategories] = useState(defaultCategoryData)
  const [monthlyTrends, setMonthlyTrends] = useState(defaultMonthlyData)
  const [weeklyTrends, setWeeklyTrends] = useState(defaultWeeklyTrend)
  const [txList, setTxList] = useState(defaultTransactions)

  useEffect(() => {
    // Fetch live dashboard analytics from backend
    api.analytics.getSummary().then(res => {
      if (res.success && res.summary) setSummary(res.summary)
    }).catch(console.error)

    api.analytics.getSpendingByCategory().then(res => {
      if (res.success && res.categories) setCategories(res.categories)
    }).catch(console.error)

    api.analytics.getMonthlyTrends().then(res => {
      if (res.success && res.monthlyData) setMonthlyTrends(res.monthlyData)
    }).catch(console.error)

    api.transactions.getAll().then(res => {
      if (res.success && res.transactions && res.transactions.length > 0) setTxList(res.transactions)
    }).catch(console.error)
  }, [])

  const statCardsData = [
    { title: 'Total Balance', value: summary ? `₹${summary.netWorth.toLocaleString()}` : '₹1,42,500', change: '+8.2%', icon: Wallet, bg: 'bg-[#4A3F35]', positive: true },
    { title: 'Monthly Income', value: summary ? `₹${summary.monthlyIncome.toLocaleString()}` : '₹85,000', change: 'Stable', icon: TrendingUp, bg: 'bg-[#AD8B6A]', positive: true },
    { title: 'Monthly Expenses', value: summary ? `₹${summary.monthlyExpense.toLocaleString()}` : '₹52,340', change: '+4.1%', icon: TrendingDown, bg: 'bg-[#221F1C]', positive: false },
    { title: 'Savings', value: summary ? `₹${(summary.monthlyIncome - summary.monthlyExpense).toLocaleString()}` : '₹32,660', change: '+12%', icon: PiggyBank, bg: 'bg-[#AD8B6A]', positive: true },
    { title: 'Health Score', value: summary ? `${summary.healthScore} / 100` : '84 / 100', change: 'Good', icon: Heart, bg: 'bg-[#4A3F35]', positive: true },
  ]

  const userName = user?.name || 'Urshita Madaan'

  return (
    <div className="space-y-6 max-w-[1280px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#221F1C]">Welcome back, {userName} 👋</h1>
          <p className="text-sm text-[#4A3F35] mt-0.5">Here's your live financial overview</p>
        </div>
        <div className="flex items-center gap-3">
          {!user && (
            <button
              onClick={() => onNav('login')}
              className="text-xs font-semibold bg-[#4A3F35] hover:bg-[#221F1C] text-[#FCF6F0] px-3.5 py-2 rounded-xl transition-colors shadow-sm"
            >
              Sign In / Register
            </button>
          )}
          <span className="text-xs font-medium text-[#4A3F35] bg-white border border-[#E4C9AB] rounded-xl px-3 py-1.5">
            Active Workspace
          </span>
        </div>
      </div>

      {/* Bill Notification Banner */}
      <div className="bg-[#E4C9AB]/40 border border-[#E4C9AB] rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#AD8B6A]/20 text-[#4A3F35] flex items-center justify-center flex-shrink-0">
            <BellRing size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#221F1C]">Upcoming Bill Notification</p>
            <p className="text-xs text-[#4A3F35]">Electricity bill (₹1,850) & Internet bill (₹1,499) due in 3 days</p>
          </div>
        </div>
        <button
          onClick={() => onNav('insights')}
          className="text-xs font-semibold text-[#4A3F35] bg-[#E4C9AB] hover:bg-[#AD8B6A]/50 px-3 py-1.5 rounded-xl transition-colors"
        >
          View AI Reminders
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-5 gap-4">
        {statCardsData.map(card => (
          <div
            key={card.title}
            className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-5 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-9 h-9 ${card.bg} rounded-xl flex items-center justify-center shadow-sm`}>
                <card.icon size={16} className="text-[#FCF6F0]" />
              </div>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  card.positive
                    ? 'bg-[#E4C9AB]/50 text-[#4A3F35]'
                    : 'bg-[#221F1C]/10 text-[#221F1C]'
                }`}
              >
                {card.change}
              </span>
            </div>
            <p className="text-xl font-bold text-[#221F1C] mb-0.5">{card.value}</p>
            <p className="text-xs text-[#4A3F35]">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-4">
        {/* Pie chart */}
        <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#221F1C] mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={categories}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {categories.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
            {categories.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-1.5 text-xs text-[#4A3F35]">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span className="truncate">{cat.name}</span>
                <span className="ml-auto font-medium">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#221F1C]">Income vs Expenses</h3>
            <div className="flex items-center gap-3 text-xs text-[#4A3F35]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#AD8B6A] inline-block" />Income</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#4A3F35] inline-block" />Expenses</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyTrends} barSize={10} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4C9AB" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#AD8B6A' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 10, fill: '#AD8B6A' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `₹${v / 1000}k`}
                width={38}
              />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E4C9AB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                formatter={v => [`₹${Number(v).toLocaleString()}`, '']}
              />
              <Bar dataKey="income" fill="#AD8B6A" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="#4A3F35" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line chart */}
        <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#221F1C] mb-4">Weekly Spending Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4C9AB" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#AD8B6A' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 10, fill: '#AD8B6A' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `₹${v}`}
                width={42}
              />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E4C9AB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                formatter={v => [`₹${Number(v).toLocaleString()}`, 'Spent']}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#4A3F35"
                strokeWidth={2.5}
                dot={{ fill: '#4A3F35', r: 4, strokeWidth: 2, stroke: '#FCF6F0' }}
                activeDot={{ r: 6, fill: '#AD8B6A' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Transactions table */}
        <div className="col-span-2 bg-white rounded-2xl border border-[#E4C9AB]/60 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#221F1C]">Recent Transactions</h3>
            <button
              onClick={() => onNav('transactions')}
              className="text-xs text-[#AD8B6A] hover:text-[#4A3F35] font-medium flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-1">
            {txList.slice(0, 6).map(tx => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-2.5 px-2 rounded-xl hover:bg-[#FCF6F0] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E4C9AB]/40 flex items-center justify-center text-base flex-shrink-0">
                    {tx.emoji}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#221F1C]">{tx.merchant}</p>
                    <p className="text-xs text-[#AD8B6A]">{tx.category} · {tx.date}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    tx.amount > 0 ? 'text-[#AD8B6A]' : 'text-[#221F1C]'
                  }`}
                >
                  {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Progress Widget */}
        <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#221F1C]">Financial Goals</h3>
              <button
                onClick={() => onNav('goals')}
                className="text-xs text-[#AD8B6A] hover:text-[#4A3F35] font-medium"
              >
                View Goals
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Emergency Fund', progress: 48, saved: '₹1,45,000', target: '₹3,00,000', color: 'bg-[#4A3F35]' },
                { name: 'Goa Vacation', progress: 64, saved: '₹32,000', target: '₹50,000', color: 'bg-[#AD8B6A]' },
                { name: 'MacBook Pro', progress: 42, saved: '₹75,000', target: '₹1,80,000', color: 'bg-[#221F1C]' },
              ].map(goal => (
                <div key={goal.name}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#4A3F35] font-medium">{goal.name}</span>
                    <span className="text-[#221F1C] font-semibold">{goal.saved} / {goal.target}</span>
                  </div>
                  <div className="h-2 bg-[#E4C9AB]/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${goal.color} rounded-full transition-all`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNav('financial-health')}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-[#FCF6F0] hover:bg-[#E4C9AB]/40 text-[#4A3F35] text-xs font-semibold py-2.5 rounded-xl border border-[#E4C9AB] transition-colors"
          >
            <Heart size={14} className="text-[#AD8B6A]" />
            Check Health Score Breakdown
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#221F1C] mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Add Expense', icon: Plus, style: 'bg-[#4A3F35] hover:bg-[#221F1C] text-[#FCF6F0] shadow-sm shadow-[#4A3F35]/25', page: 'add-expense' as Page },
            { label: 'Scan Receipt', icon: Scan, style: 'bg-[#E4C9AB]/40 hover:bg-[#E4C9AB]/70 text-[#4A3F35] border border-[#E4C9AB]', page: 'ocr' as Page },
            { label: 'Ask AI Copilot', icon: Sparkles, style: 'bg-[#E4C9AB]/40 hover:bg-[#E4C9AB]/70 text-[#4A3F35] border border-[#E4C9AB]', page: 'chat' as Page },
            { label: 'View Insights', icon: TrendingUp, style: 'bg-[#E4C9AB]/40 hover:bg-[#E4C9AB]/70 text-[#4A3F35] border border-[#E4C9AB]', page: 'insights' as Page },
          ].map(action => (
            <button
              key={action.label}
              onClick={() => onNav(action.page)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${action.style}`}
            >
              <action.icon size={14} />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
