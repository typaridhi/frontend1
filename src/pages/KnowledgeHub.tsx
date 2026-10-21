


import { useState } from 'react'
import { Search, BookOpen, ExternalLink, Clock } from 'lucide-react'
import { knowledgeArticles } from '../data/mockData'

// Palette
// #221F1C darkest | #4A3F35 rich | #AD8B6A light | #E4C9AB pale | #FCF6F0 icy

const categories = ['All', 'Tax', 'RBI', 'Investments', 'Insurance', 'Government Schemes', 'Banking']

const brown = {
  bg: 'bg-[#E4C9AB]/40',
  text: 'text-[#4A3F35]',
  badge: 'bg-[#E4C9AB]/60 text-[#4A3F35]',
}

// Keys match article.color in mockData; all use the brown style now
const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
  blue: brown,
  emerald: brown,
  purple: brown,
  amber: brown,
  red: brown,
  slate: brown,
}

export default function KnowledgeHub() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = knowledgeArticles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || a.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#221F1C]">Knowledge Hub</h1>
        <p className="text-sm text-[#4A3F35] mt-0.5">
          AI-powered answers to your financial questions — sourced from RBI, SEBI, and trusted publications
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AD8B6A]" />
        <input
          type="text"
          placeholder="Search financial topics — taxes, investments, insurance..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 text-sm bg-white border border-[#E4C9AB] rounded-2xl text-[#221F1C] placeholder-[#AD8B6A] focus:outline-none focus:ring-2 focus:ring-[#AD8B6A]/30 focus:border-[#AD8B6A] transition-all shadow-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#AD8B6A] hover:text-[#4A3F35]"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-[#4A3F35] text-[#FCF6F0] shadow-sm shadow-[#4A3F35]/25'
                : 'bg-white border border-[#E4C9AB] text-[#4A3F35] hover:border-[#AD8B6A] hover:text-[#221F1C]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-[#AD8B6A]">
        {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} found
      </p>

      {/* Featured article */}
      {filtered.length > 0 && (
        <div className="bg-gradient-to-r from-[#221F1C] to-[#4A3F35] rounded-2xl p-6 text-[#FCF6F0] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#AD8B6A]/15 blur-3xl" />
          <div className="relative">
            <span className="text-xs font-semibold bg-[#AD8B6A]/25 text-[#E4C9AB] px-2.5 py-1 rounded-full">
              Featured · {filtered[0].category}
            </span>
            <h2 className="text-lg font-bold text-[#FCF6F0] mt-3 mb-2">{filtered[0].title}</h2>
            <p className="text-sm text-[#E4C9AB] leading-relaxed mb-4">{filtered[0].summary}</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-[#AD8B6A] hover:bg-[#C9A883] text-[#221F1C] text-sm font-medium px-4 py-2 rounded-xl transition-colors">
                <BookOpen size={14} />
                Read Article
              </button>
              <span className="flex items-center gap-1 text-xs text-[#E4C9AB]">
                <Clock size={11} />
                {filtered[0].readTime} read
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Article grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.slice(1).map((article, i) => {
          const colors = colorMap[article.color] || colorMap.slate
          return (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#E4C9AB]/60 p-5 shadow-sm hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.badge}`}>
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#AD8B6A]">
                  <Clock size={10} />
                  {article.readTime}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#221F1C] mb-2 leading-snug group-hover:text-[#AD8B6A] transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-[#4A3F35] leading-relaxed mb-4">
                {article.summary}
              </p>
              <button className={`flex items-center gap-1.5 text-xs font-semibold ${colors.text} hover:underline`}>
                Read more <ExternalLink size={11} />
              </button>
            </div>
          )
        })}
      </div>

      {/* AI RAG note */}
      <div className="bg-[#E4C9AB]/30 rounded-2xl border border-[#E4C9AB] p-4">
        <p className="text-xs text-[#4A3F35] text-center">
          📚 Knowledge powered by AI (RAG) — sourced from RBI circulars, SEBI guidelines, Income Tax Act, and
          peer-reviewed financial publications. Last updated: July 2025.
        </p>
      </div>
    </div>
  )
}
