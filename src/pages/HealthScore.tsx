import { Sparkles, AlertCircle, CheckCircle } from 'lucide-react'

// Palette
// #221F1C darkest | #4A3F35 rich | #AD8B6A light | #E4C9AB pale | #FCF6F0 icy

const score = 74

const metrics = [
  {
    label: 'Savings Ratio',
    value: 38,
    max: 50,
    score: 76,
    color: '#4A3F35',
    desc: 'You save 38% of your income — above the 20% recommended minimum.',
    status: 'good',
  },
  {
    label: 'Budget Discipline',
    value: 5,
    max: 6,
    score: 82,
    color: '#AD8B6A',
    desc: '5 out of 6 categories are within budget. Entertainment exceeded by ₹200.',
    status: 'good',
  },
  {
    label: 'Debt-to-Income',
    value: 0,
    max: 100,
    score: 95,
    color: '#221F1C',
    desc: 'No active loans or credit card debt outstanding. Excellent!',
    status: 'excellent',
  },
  {
    label: 'Emergency Fund',
    value: 48,
    max: 100,
    score: 60,
    color: '#7A6450',
    desc: 'You have 1.7 months of expenses saved. Target is 6 months (₹3 lakhs).',
    status: 'warning',
  },
  {
    label: 'Bill Payment History',
    value: 11,
    max: 12,
    score: 92,
    color: '#AD8B6A',
    desc: '11/12 bills paid on time this year. One late payment in March 2025.',
    status: 'good',
  },
]

function CircularGauge({ score }: { score: number }) {
  const r = 90
  const cx = 110
  const cy = 110
  const circumference = 2 * Math.PI * r
  const pct = score / 100
  const rotateStart = 135

  const getColor = (s: number) => {
    if (s >= 80) return '#4A3F35'
    if (s >= 60) return '#AD8B6A'
    return '#7A6450'
  }

  const color = getColor(score)

  return (
    <div className="relative w-56 h-56 flex items-center justify-center mx-auto">
      <svg width="220" height="220" viewBox="0 0 220 220">
        {/* Background arc */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#E4C9AB"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeDashoffset={0}
          transform={`rotate(${rotateStart} ${cx} ${cy})`}
        />
        {/* Score arc */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${circumference * pct * 0.75} ${circumference}`}
          strokeDashoffset={0}
          transform={`rotate(${rotateStart} ${cx} ${cy})`}
          style={{ filter: `drop-shadow(0 0 8px ${color}60)`, transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold" style={{ color }}>{score}</span>
        <span className="text-sm text-[#AD8B6A] mt-1">out of 100</span>
        <span
          className="text-xs font-semibold mt-1 px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work'}
        </span>
      </div>
    </div>
  )
}

export default function HealthScore() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#221F1C]">Financial Health Score</h1>
        <p className="text-sm text-[#4A3F35] mt-0.5">Your comprehensive financial wellness report — July 2025</p>
      </div>

      {/* Main score + breakdown */}
      <div className="grid grid-cols-5 gap-4 items-start">
        {/* Score gauge */}
        <div className="col-span-2 bg-white rounded-2xl border border-[#E4C9AB]/60 p-6 shadow-sm text-center">
          <CircularGauge score={score} />
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { label: 'Poor', range: '0-40', color: '#E4C9AB' },
              { label: 'Fair', range: '41-69', color: '#AD8B6A' },
              { label: 'Good', range: '70-100', color: '#4A3F35' },
            ].map(tier => (
              <div key={tier.label}>
                <div className="h-1.5 rounded-full mb-1" style={{ backgroundColor: tier.color }} />
                <p className="text-xs font-medium text-[#4A3F35]">{tier.label}</p>
                <p className="text-xs text-[#AD8B6A]">{tier.range}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown metrics */}
        <div className="col-span-3 space-y-3">
          {metrics.map(metric => (
            <div
              key={metric.label}
              className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#221F1C]">{metric.label}</span>
                <div className="flex items-center gap-2">
                  {metric.status === 'excellent' && <CheckCircle size={14} className="text-[#221F1C]" />}
                  {metric.status === 'good' && <CheckCircle size={14} className="text-[#4A3F35]" />}
                  {metric.status === 'warning' && <AlertCircle size={14} className="text-[#AD8B6A]" />}
                  <span
                    className="text-sm font-bold"
                    style={{ color: metric.color }}
                  >
                    {metric.score}/100
                  </span>
                </div>
              </div>
              <div className="h-2 bg-[#E4C9AB]/50 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${metric.score}%`, backgroundColor: metric.color }}
                />
              </div>
              <p className="text-xs text-[#4A3F35]">{metric.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI recommendation */}
      <div className="bg-gradient-to-r from-[#4A3F35] to-[#221F1C] rounded-2xl p-6 text-[#FCF6F0]">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles size={18} className="text-[#FCF6F0]" />
          </div>
          <div>
            <p className="font-semibold text-lg mb-2">How to reach 90+ score</p>
            <ul className="space-y-1.5 text-sm text-[#E4C9AB]">
              {[
                'Build emergency fund to ₹3 lakhs — saves ₹18,000/year in stress costs',
                "Keep Entertainment budget under ₹3,000 — you're currently ₹200 over",
                'Maintain your excellent 0% debt-to-income ratio',
                'Start a SIP of ₹5,000/month for long-term wealth building',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#AD8B6A] mt-0.5">→</span>
                  {tip}
                </li>
              ))}
            </ul>
            <button className="mt-4 bg-[#FCF6F0] text-[#4A3F35] font-semibold text-sm px-4 py-2 rounded-xl hover:bg-[#E4C9AB] transition-colors">
              Create Improvement Plan
            </button>
          </div>
        </div>
      </div>

      {/* Historical trend */}
      <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-[#221F1C] mb-4">Score History</h3>
        <div className="flex items-end gap-3 h-24">
          {[52, 58, 63, 65, 70, 74].map((s, i, arr) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-medium text-[#4A3F35]">{s}</span>
              <div
                className="w-full rounded-t-lg transition-all"
                style={{
                  height: `${(s / 100) * 80}px`,
                  backgroundColor: i === arr.length - 1 ? '#4A3F35' : '#E4C9AB',
                }}
              />
              <span className="text-xs text-[#AD8B6A]">
                {['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][i]}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#4A3F35] mt-3 font-medium">
          +22 points improvement in 6 months 🎉
        </p>
      </div>
    </div>
  )
}
