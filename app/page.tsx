"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { Header } from "@/components/header"
import { TodayCard } from "@/components/today-card"
import { WeeklyList } from "@/components/weekly-list"
import { StreakCard } from "@/components/streak-card"
import { CategoryPills } from "@/components/category-pills"
import { PhraseGallery } from "@/components/phrase-gallery"
import { BookOpen, Sparkles, Search, X, Volume2 } from "lucide-react"

// --- 辞書データをファイル内に直接定義（外部読み込みエラーを回避） ---
const LOCAL_PHRASES = [
  {
    id: "pog",
    english: "pog",
    japanese: "すごい、最高、やった！",
    meaning: "元々はゲーム実況で使われていた言葉で、素晴らしいプレイや驚くべきことが起きた時に使われます。",
    category: "感情"
  },
  {
    id: "best-collab-ever",
    english: "Best collab ever!",
    japanese: "最高のコラボだった！",
    meaning: "推しと誰かのコラボ配信が終わった時、その内容を絶賛する際に使います。",
    category: "感想"
  }
];

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

    // ファイル内のLOCAL_PHRASESから検索
    const found = LOCAL_PHRASES.filter(p => 
      p.english.toLowerCase().includes(term) || 
      p.japanese.includes(term)
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
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleDoSearch() }}
            placeholder="英単語を検索（例: pog）"
            className="h-12 w-full rounded-2xl border border-primary/20 bg-card pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
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
        <div className="mt-2 p-4 rounded-2xl bg-primary/5 border border-primary/10">
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
  // ライブラリ表示用には念のため元のデータも保持
  const todayPhrase = LOCAL_PHRASES[0]
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showLibrary, setShowLibrary] = useState(false)
  const filteredPhrases = selectedCategory ? LOCAL_PHRASES.filter((p) => p.category === selectedCategory) : LOCAL_PHRASES

  return (
    <AllInOneProvider>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-lg">
          <Header />
          <main className="flex flex-col gap-6 pt-4">
            <LocalWordSearch />
            <TodayCard phrase={todayPhrase} />
            <StreakCard />
            <div className="flex flex-col items-center px-4">
              <button onClick={() => setShowLibrary(!showLibrary)} className="w-full flex items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-card py-4 text-sm font-bold text-primary shadow-sm hover:bg-primary/5">
                <BookOpen className="h-4 w-4" />
                {showLibrary ? "ライブラリを閉じる" : "フレーズライブラリを開く"}
              </button>
            </div>
            {showLibrary && (
              <section className="px-4">
                <div className="mb-4 pt-4">
                  <h3 className="mb-3 font-display text-lg font-bold text-foreground">フレーズライブラリ</h3>
                  <CategoryPills selected={selectedCategory} onSelect={setSelectedCategory} />
                </div>
                <PhraseGallery phrases={filteredPhrases} />
              </section>
            )}
            <footer className="pb-8 pt-8 text-center text-xs text-muted-foreground">OshiENGLISH - 推しと一緒に英語を学ぼう</footer>
          </main>
        </div>
      </div>
    </AllInOneProvider>
  )
}
