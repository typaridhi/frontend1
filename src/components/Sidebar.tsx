



import {
  LayoutDashboard, ArrowLeftRight, PieChart, Sparkles, Target,
  Scan, MessageSquare, BookOpen, Settings, TrendingUp, Heart, LogOut,
  BarChart2, Activity, Lightbulb,
  Clock, Shield, Users,
} from 'lucide-react'
import type { Page } from '../types'
import { api } from '../services/api'

// Palette
// #221F1C darkest | #4A3F35 rich | #AD8B6A light | #E4C9AB pale | #FCF6F0 icy

const sections = [
  {
    label: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard',     page: 'dashboard' as Page },
      { icon: ArrowLeftRight,  label: 'Transactions',  page: 'transactions' as Page },
      { icon: PieChart,        label: 'Budget',         page: 'budget' as Page },
      { icon: Target,          label: 'Goals',          page: 'goals' as Page },
    ],
  },
  {
    label: 'Finance & Health',
    items: [
      { icon: Heart,       label: 'Health Score',      page: 'financial-health' as Page },
    ],
  },
  {
    label: 'Planning',
    items: [
      { icon: Clock,   label: 'Time Machine',    page: 'time-machine' as Page },
      { icon: Shield,  label: 'Safety Net',      page: 'safety-net' as Page },
    ],
  },
  {
    label: 'Investments',
    items: [
      { icon: BarChart2,   label: 'Portfolio',         page: 'portfolio' as Page },
      { icon: Lightbulb,   label: 'Invest Ideas',      page: 'investments' as Page },
    ],
  },
  {
    label: 'AI Copilot',
    items: [
      { icon: Sparkles,       label: 'AI Insights',   page: 'ai-dashboard' as Page },
      { icon: Activity,       label: 'Analytics',      page: 'insights' as Page },
      { icon: MessageSquare,  label: 'AI Assistant',   page: 'chat' as Page },
      { icon: Scan,           label: 'OCR Scanner',    page: 'ocr' as Page },
    ],
  },
  {
    label: 'More',
    items: [
      { icon: BookOpen, label: 'Knowledge Hub', page: 'knowledge' as Page },
      { icon: Settings, label: 'Settings',       page: 'settings' as Page },
    ],
  },
]

interface SidebarProps {
  currentPage: Page
  onNav: (p: Page) => void
  user?: any
  onLogout?: () => void
}

export default function Sidebar({ currentPage, onNav, user, onLogout }: SidebarProps) {
  const userName = user?.name || 'Urshita Madaan'
  const userEmail = user?.email || 'urshita@gmail.com'
  const initial = userName.charAt(0).toUpperCase()

  const handleSwitchJunior = async () => {
    try {
      await api.auth.switchProfile('junior')
    } catch (e) {
      // ignore
    }
    onNav('junior-dashboard')
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#FCF6F0] border-r border-[#E4C9AB] flex flex-col z-20">
      {/* Logo */}
      <div className="p-5 border-b border-[#E4C9AB]/60">
        <button onClick={() => onNav('dashboard')} className="flex items-center gap-3 w-full">
          <div className="w-9 h-9 bg-gradient-to-br from-[#AD8B6A] to-[#4A3F35] rounded-xl flex items-center justify-center shadow-sm">
            <TrendingUp size={16} className="text-[#FCF6F0]" />
          </div>
          <div className="text-left">
            <p className="font-bold text-[#221F1C] text-sm leading-tight">Finshpere</p>
            <p className="text-xs text-[#AD8B6A] font-medium">Finance Copilot</p>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-4">
        {sections.map(section => (
          <div key={section.label}>
            <p className="text-xs font-semibold text-[#AD8B6A] uppercase tracking-wider px-3 pb-1">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map(item => {
                const active = currentPage === item.page
                return (
                  <button
                    key={item.page}
                    onClick={() => onNav(item.page)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      active
                        ? 'bg-[#E4C9AB]/60 text-[#221F1C]'
                        : 'text-[#4A3F35] hover:bg-[#E4C9AB]/30 hover:text-[#221F1C]'
                    }`}
                  >
                    <item.icon
                      size={15}
                      className={active ? 'text-[#4A3F35]' : 'text-[#AD8B6A]'}
                    />
                    {item.label}
                    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4A3F35]" />}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Switch to Junior + User profile */}
      <div className="p-4 border-t border-[#E4C9AB]/60 space-y-2">
        <button
          onClick={handleSwitchJunior}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-[#4A3F35] bg-[#E4C9AB]/40 hover:bg-[#E4C9AB]/70 transition-colors border border-[#E4C9AB]"
        >
          <Users size={14} className="text-[#AD8B6A]" />
          Switch to Junior Profile
          <span className="ml-auto text-xs bg-[#4A3F35] text-[#FCF6F0] px-1.5 py-0.5 rounded-full font-semibold">Kids Mode</span>
        </button>

        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#E4C9AB]/30 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#AD8B6A] to-[#4A3F35] flex items-center justify-center text-[#FCF6F0] text-sm font-bold flex-shrink-0">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#221F1C] truncate">{userName}</p>
            <p className="text-xs text-[#AD8B6A] truncate">{userEmail}</p>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              title="Log out"
              className="p-1.5 hover:bg-[#E4C9AB]/60 rounded-lg text-[#AD8B6A] hover:text-[#221F1C] transition-colors"
            >
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
