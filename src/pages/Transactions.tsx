import { useState, useEffect } from 'react'
import { Search, Filter, Download, ArrowUp, ArrowDown } from 'lucide-react'
import { transactions as defaultData } from '../data/mockData'
import { api } from '../services/api'

// Palette
// #221F1C darkest | #4A3F35 rich | #AD8B6A light | #E4C9AB pale | #FCF6F0 icy

const initialTransactions = [
  ...defaultData,
  { id: 9, merchant: 'D-Mart', category: 'Groceries', amount: -3200, date: 'Jul 11', emoji: '🛒' },
  { id: 10, merchant: 'Spotify', category: 'Entertainment', amount: -179, date: 'Jul 10', emoji: '🎵' },
  { id: 11, merchant: 'Freelance Project', category: 'Income', amount: 15000, date: 'Jul 8', emoji: '💻' },
  { id: 12, merchant: 'Max Fashion', category: 'Shopping', amount: -1899, date: 'Jul 7', emoji: '👕' },
  { id: 13, merchant: 'HDFC ATM', category: 'Cash', amount: -5000, date: 'Jul 5', emoji: '🏧' },
  { id: 14, merchant: 'BookMyShow', category: 'Entertainment', amount: -840, date: 'Jul 3', emoji: '🎬' },
]

const categories = ['All', 'Income', 'Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Groceries', 'Cash']

export default function Transactions() {
  const [txList, setTxList] = useState(initialTransactions)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState<'date' | 'amount'>('date')

  useEffect(() => {
    api.transactions.getAll().then(res => {
      if (res.success && res.transactions && res.transactions.length > 0) {
        setTxList(res.transactions)
      }
    }).catch(console.error)
  }, [])

  const filtered = txList
    .filter(tx => {
      const matchSearch = tx.merchant.toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === 'All' || tx.category === category
      return matchSearch && matchCat
    })
    .sort((a, b) => sort === 'amount' ? Math.abs(b.amount) - Math.abs(a.amount) : Number(b.id) - Number(a.id))

  const totalIncome = txList.filter(t => t.amount > 0).reduce((a, t) => a + t.amount, 0)
  const totalExpense = txList.filter(t => t.amount < 0).reduce((a, t) => a + Math.abs(t.amount), 0)

  return (
    <div className="max-w-4xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#221F1C]">Transactions</h1>
          <p className="text-sm text-[#4A3F35] mt-0.5">July 2025</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-[#E4C9AB] text-[#4A3F35] hover:bg-[#E4C9AB]/40 font-medium text-sm px-3 py-2 rounded-xl transition-colors">
          <Download size={14} />
          Export
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-4 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 bg-[#E4C9AB]/50 rounded-xl flex items-center justify-center">
            <ArrowUp size={16} className="text-[#4A3F35]" />
          </div>
          <div>
            <p className="text-xs text-[#AD8B6A]">Total Income</p>
            <p className="text-lg font-bold text-[#4A3F35]">+₹{totalIncome.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-4 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 bg-[#221F1C]/10 rounded-xl flex items-center justify-center">
            <ArrowDown size={16} className="text-[#221F1C]" />
          </div>
          <div>
            <p className="text-xs text-[#AD8B6A]">Total Expenses</p>
            <p className="text-lg font-bold text-[#221F1C]">-₹{totalExpense.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Search & filter bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AD8B6A]" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#E4C9AB] rounded-xl text-[#221F1C] placeholder-[#AD8B6A] focus:outline-none focus:ring-2 focus:ring-[#AD8B6A]/30 focus:border-[#AD8B6A] transition-all"
          />
        </div>
        <button className="flex items-center gap-2 bg-white border border-[#E4C9AB] text-[#4A3F35] hover:bg-[#E4C9AB]/40 px-3 py-2.5 rounded-xl text-sm transition-colors">
          <Filter size={14} />
          Filter
        </button>
        <select
          value={sort}
          onChange={e => setSort(e.target.value as 'date' | 'amount')}
          className="bg-white border border-[#E4C9AB] text-[#4A3F35] px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#AD8B6A]/30"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              category === cat
                ? 'bg-[#4A3F35] text-[#FCF6F0] shadow-sm'
                : 'bg-white border border-[#E4C9AB] text-[#4A3F35] hover:border-[#AD8B6A]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Transaction list */}
      <div className="bg-white rounded-2xl border border-[#E4C9AB]/60 shadow-sm overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-5 py-3 border-b border-[#E4C9AB]/60 text-xs font-semibold text-[#AD8B6A] uppercase tracking-wider">
          <span>Icon</span>
          <span>Transaction</span>
          <span>Date</span>
          <span className="text-right">Amount</span>
        </div>
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-[#AD8B6A] text-sm">No transactions found</div>
        ) : (
          filtered.map(tx => (
            <div
              key={tx.id}
              className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center px-5 py-3.5 border-b border-[#E4C9AB]/30 last:border-0 hover:bg-[#FCF6F0] transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E4C9AB]/40 flex items-center justify-center text-lg flex-shrink-0">
                {tx.emoji}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#221F1C]">{tx.merchant}</p>
                <p className="text-xs text-[#AD8B6A] mt-0.5">{tx.category}</p>
              </div>
              <span className="text-xs text-[#AD8B6A] whitespace-nowrap">{tx.date}</span>
              <span
                className={`text-sm font-bold text-right ${
                  tx.amount > 0 ? 'text-[#4A3F35]' : 'text-[#221F1C]'
                }`}
              >
                {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
