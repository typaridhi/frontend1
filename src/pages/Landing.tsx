






import {
  TrendingUp,
  Sparkles,
  PieChart,
  Scan,
  Heart,
  MessageSquare,
  ChevronRight,
  Shield,
  Zap,
  ArrowRight,
  Star,
  CheckCircle,
} from 'lucide-react'
import type { Page } from '../types'

// Palette
// #221F1C  darkest
// #4A3F35  rich
// #AD8B6A  light
// #E4C9AB  pale
// #FCF6F0  icy

const features = [
  {
    icon: TrendingUp,
    title: 'Expense Tracking',
    desc: 'Track every rupee automatically. Smart categorization with merchant recognition and real-time sync.',
  },
  {
    icon: Sparkles,
    title: 'AI Insights',
    desc: 'Get personalized spending analysis, anomaly detection, and actionable recommendations powered by AI.',
  },
  {
    icon: PieChart,
    title: 'Budget Planner',
    desc: 'Set and manage monthly budgets by category. Get alerts before you overspend.',
  },
  {
    icon: Scan,
    title: 'OCR Receipt Scanner',
    desc: 'Snap a photo of any receipt and let AI extract merchant, amount, and category instantly.',
  },
  {
    icon: Heart,
    title: 'Financial Health Score',
    desc: 'Your personal finance score from 0–100. Track savings ratio, budget discipline, and emergency fund.',
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbot',
    desc: 'Ask anything about your finances in plain language. "Can I afford a vacation?" Just ask.',
  },
]


interface LandingProps {
  onNav: (p: Page) => void
}

export default function Landing({ onNav }: LandingProps) {

  return (
    <div className="min-h-screen bg-[#FCF6F0] font-sans">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FCF6F0]/80 backdrop-blur-xl border-b border-[#E4C9AB]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#AD8B6A] to-[#4A3F35] rounded-xl flex items-center justify-center shadow-sm">
              <TrendingUp size={15} className="text-[#FCF6F0]" />
            </div>
            <span className="font-bold text-[#221F1C]">Finshpere</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {['Features', 'Pricing', 'Blog', 'About'].map(item => (
              <a
                key={item}
                href="#"
                className="text-sm text-[#4A3F35] hover:text-[#221F1C] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNav('login')}
              className="text-sm font-medium text-[#4A3F35] hover:text-[#221F1C] px-4 py-2 transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => onNav('signup')}
              className="text-sm font-medium bg-[#4A3F35] hover:bg-[#221F1C] text-[#FCF6F0] px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E4C9AB]/40 via-[#FCF6F0] to-[#FCF6F0]" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #AD8B6A 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E4C9AB]/50 border border-[#E4C9AB] text-[#4A3F35] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Zap size={11} className="fill-[#AD8B6A] text-[#AD8B6A]" />
             
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-[#221F1C] leading-tight mb-6">
              Your AI{' '}
              <span className="text-[#AD8B6A]">Financial</span>
              <br />
              Copilot
            </h1>

            <p className="text-lg text-[#4A3F35] mb-8 leading-relaxed max-w-xl mx-auto">
              Track expenses, get AI insights, plan your budget, and achieve your financial goals — all in one beautiful
              place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNav('signup')}
                className="flex items-center gap-2 bg-[#4A3F35] hover:bg-[#221F1C] text-[#FCF6F0] font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#4A3F35]/25 hover:shadow-[#4A3F35]/40 hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNav('dashboard')}
                className="flex items-center gap-2 bg-[#FCF6F0] hover:bg-[#E4C9AB]/40 text-[#4A3F35] font-semibold px-6 py-3 rounded-xl border border-[#E4C9AB] transition-all"
              >
                View Demo
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-[#FCF6F0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-[#AD8B6A] uppercase tracking-widest mb-3">Everything you need</p>
            <h2 className="text-3xl font-bold text-[#221F1C] mb-4">
              Your complete financial command center
            </h2>
            <p className="text-[#4A3F35] max-w-xl mx-auto">
              From expense tracking to AI-powered insights — Finshpere gives you everything to stay in control of your
              money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(feat => (
              <div
                key={feat.title}
                className="bg-[#E4C9AB]/30 border border-[#E4C9AB] rounded-2xl p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <div className="w-10 h-10 bg-[#FCF6F0] rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <feat.icon size={18} className="text-[#AD8B6A]" />
                </div>
                <h3 className="text-base font-semibold text-[#221F1C] mb-2">{feat.title}</h3>
                <p className="text-sm text-[#4A3F35] leading-relaxed">{feat.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#4A3F35] group-hover:text-[#AD8B6A] transition-colors">
                  Learn more <ChevronRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#4A3F35] to-[#221F1C]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#FCF6F0] mb-4">
            Start your financial journey today
          </h2>
         
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNav('signup')}
              className="flex items-center gap-2 bg-[#FCF6F0] text-[#4A3F35] font-semibold px-6 py-3 rounded-xl hover:bg-[#E4C9AB] transition-colors shadow-lg"
            >
              Get Started
              <ArrowRight size={16} />
            </button>
            <div className="flex items-center gap-2 text-[#E4C9AB] text-sm">
              <CheckCircle size={14} className="text-[#AD8B6A]" />
              No credit card required
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#221F1C] text-[#E4C9AB] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-[#AD8B6A] rounded-lg flex items-center justify-center">
                  <TrendingUp size={13} className="text-[#221F1C]" />
                </div>
                <span className="font-bold text-[#FCF6F0]">Finshpere</span>
              </div>
              <p className="text-sm leading-relaxed">Your AI-powered financial copilot for smarter money management.</p>
            </div>
            {[
             
              { title: 'Contact us ', links: ['tyagiparidhi2525@gmail.com'] }
              
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-[#FCF6F0] mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-[#FCF6F0] transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-[#4A3F35] pt-6 flex flex-col md:flex-row justify-between gap-4">
            <p className="text-sm">© 2025 Finshpere. All rights reserved.</p>
            <p className="text-sm">Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
