import { Search, Bell, Moon, Sun, Plus, ChevronDown } from 'lucide-react'
import type { Page } from '../types'

interface TopBarProps {
  onNav: (p: Page) => void
  dark: boolean
  onToggleDark: () => void
  user?: any
}

export default function TopBar({ onNav, dark, onToggleDark, user }: TopBarProps) {
  const name = user?.name || 'Urshita'
  const initial = name.charAt(0).toUpperCase()

  return (
    <header className="h-16 bg-[#FCF6F0] border-b border-[#E4C9AB] flex items-center px-6 gap-4 sticky top-0 z-10">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AD8B6A]" />
        <input
          type="text"
          placeholder="Search transactions, insights..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-[#E4C9AB] rounded-xl text-[#221F1C] placeholder-[#AD8B6A] focus:outline-none focus:ring-2 focus:ring-[#AD8B6A]/30 focus:border-[#AD8B6A] transition-all"
        />
      </div>

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onNav('add-expense')}
          className="flex items-center gap-2 bg-[#4A3F35] hover:bg-[#221F1C] text-[#FCF6F0] text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-sm shadow-[#4A3F35]/20"
        >
          <Plus size={14} />
          Add Expense
        </button>

        {/* Notifications */}
        <button
          onClick={() => onNav('insights')}
          className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#E4C9AB]/40 text-[#4A3F35] transition-colors"
          title="Notifications & Bill Reminders"
        >
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#AD8B6A] rounded-full border-2 border-[#FCF6F0]" />
        </button>

        {/* Dark mode */}
        <button
          onClick={onToggleDark}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#E4C9AB]/40 text-[#4A3F35] transition-colors"
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Profile switcher */}
        <button
          onClick={() => onNav('profile-switcher')}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#E4C9AB]/40 transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#AD8B6A] to-[#4A3F35] flex items-center justify-center text-[#FCF6F0] text-xs font-bold">
            {initial}
          </div>
          <span className="text-sm font-medium text-[#4A3F35] truncate max-w-[100px]">{name}</span>
          <ChevronDown size={13} className="text-[#AD8B6A]" />
        </button>
      </div>
    </header>
  )
}
