"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { Header } from "@/components/header"
import { TodayCard } from "@/components/today-card"
import { WeeklyList } from "@/components/weekly-list"
import { StreakCard } from "@/components/streak-card"
import { CategoryPills } from "@/components/category-pills"
import { PhraseGallery } from "@/components/phrase-gallery"
import { getTodayPhrase, getWeekPhrases, phrases as allPhrases } from "@/lib/phrases"
import { BookOpen, Sparkles, Search, X, Volume2 } from "lucide-react"

const StatsContext = createContext<any>(null)
export const useStats = () => {
  const context = useContext(StatsContext)
  return context || { streak: 1, learnedCount: 0, level: 1, updateStats: () => {} }
}

function AllInOneProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState({ streak: 1, learnedCount: 0, level: 1 })
  useEffect(() => {
    const saved = localStorage.getItem("oshienglish-stats")
    if (saved) { try { setStats(JSON.parse(saved)) } catch (e) {} }
  }, [])
  const updateStats = (newStats: any) => {
    setStats(newStats)
    localStorage.setItem("oshienglish-stats", JSON.stringify(newStats))
  }
  return <StatsContext.Provider value={{ ...stats, updateStats }}>{children}</StatsContext.Provider>
}

function LocalWordSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleDoSearch = () => {
    const term = query.trim().toLowerCase()
    if (!term) return

    // 大文字小文字を区別せず、英語・日本語・意味から検索
    const found = allPhrases.filter(p => 
      p.english.toLowerCase().includes(term) || 
      p.japanese.toLowerCase().includes(term) ||
      (p.meaning && p.meaning.toLowerCase().includes(term))
    )
    
    setResults(found)
    setHasSearched(true)
  }

  return (
    <div className="w-full flex flex-col gap-4 px-4">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (!e.target.value) setHasSearched(false)
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleDoSearch() }}
            placeholder="英単語を検索..."
            className="h-12 w-full rounded-2xl border border-primary/20 bg-card pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {query && (
            <button 
              onClick={() => { setQuery(""); setResults([]); setHasSearched(false); }} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button 
          type="button"
          onClick={handleDoSearch}
          className="h-12 rounded-2xl bg-primary px-6 text-sm font-bold text-white shadow-md active:scale-95"
        >
          検索
        </button>
      </div>

      {hasSearched && (
        <div className="mt-2 p-4 rounded-2xl bg-primary/5 border border-primary/10 animate-in fade-in slide-in-from-top-1">
          {results.length > 0 ? (
            <div className="flex flex-col gap-4">
              <p className="text-xs font-bold text-primary">検索結果: {results.length}件</p>
              {results.map((phrase) => (
                <div key={phrase.id} className="bg-card p-4 rounded-xl shadow-sm border border-primary/5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-foreground">{phrase.english}</h3>
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">{phrase.japanese}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-sm text-muted-foreground">
              「{query}」は見つかりませんでした
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Page() {
  // 元のロジックに戻してフレーズを正しく取得
  const todayPhrase = getTodayPhrase()
  const weekPhrases = getWeekPhrases()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showLibrary, setShowLibrary] = useState(false)
  const filteredPhrases = selectedCategory ? allPhrases.filter((p) => p.category === selectedCategory) : allPhrases

  return (
    <AllInOneProvider>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-lg">
          <Header />
          <main className="flex flex-col gap-6 pt-4">
            <LocalWordSearch />

            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <div className="animate-float">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h2 className="text-balance font-display text-xl font-extrabold text-foreground">
                推しの言葉を、英語でも。
              </h2>
              <p className="text-sm text-muted-foreground px-8">
                Vtuber推し活に使える英語フレーズを毎朝お届け
              </p>
            </div>

            <TodayCard phrase={todayPhrase} />
            <StreakCard />
            <WeeklyList phrases={weekPhrases} todayId={todayPhrase.id} />
            
            <div className="flex flex-col items-center px-4">
              <button 
                onClick={() => setShowLibrary(!showLibrary)} 
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-card py-4 text-sm font-bold text-primary shadow-sm hover:bg-primary/5 transition-all"
              >
                <BookOpen className="h-4 w-4" />
                {showLibrary ? "ライブラリを閉じる" : "フレーズライブラリを開く"}
              </button>
            </div>

            {showLibrary && (
              <section className="px-4 animate-fade-in-up">
                <div className="mb-4 pt-4">
                  <h3 className="mb-3 font-display text-lg font-bold text-foreground">フレーズライブラリ</h3>
                  <CategoryPills selected={selectedCategory} onSelect={setSelectedCategory} />
                </div>
                <PhraseGallery phrases={filteredPhrases} />
              </section>
            )}
            
            <footer className="pb-8 pt-8 text-center text-xs text-muted-foreground">
              OshiENGLISH - 推しと一緒に英語を学ぼう
            </footer>
          </main>
        </div>
      </div>
    </AllInOneProvider>
  )
}
