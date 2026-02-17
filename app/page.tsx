"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { Header } from "@/components/header"
import { TodayCard } from "@/components/today-card"
import { WeeklyList } from "@/components/weekly-list"
import { StreakCard } from "@/components/streak-card"
import { CategoryPills } from "@/components/category-pills"
import { PhraseGallery } from "@/components/phrase-gallery"
import { getTodayPhrase, getWeekPhrases, phrases as allPhrases } from "@/lib/phrases"
import { BookOpen, Sparkles, Search, X, Volume2, Loader2, CheckCircle2 } from "lucide-react"

// --- 統計管理システムの強化 ---
const StatsContext = createContext<any>(null)
export const useStats = () => useContext(StatsContext)

function AllInOneProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState({ streak: 1, learnedCount: 0, lastLogin: "" })

  useEffect(() => {
    const saved = localStorage.getItem("oshienglish-stats")
    const today = new Date().toLocaleDateString()

    if (saved) {
      const parsed = JSON.parse(saved)
      let newStreak = parsed.streak || 1
      
      if (parsed.lastLogin && parsed.lastLogin !== today) {
        const lastDate = new Date(parsed.lastLogin)
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

        if (lastDate.toLocaleDateString() === yesterday.toLocaleDateString()) {
          newStreak += 1 // 連続ログイン成功
        } else {
          newStreak = 1 // 途切れたのでリセット
        }
      }
      setStats({ ...parsed, streak: newStreak, lastLogin: today })
    } else {
      setStats({ streak: 1, learnedCount: 0, lastLogin: today })
    }
  }, [])

  const addLearnedCount = () => {
    const newStats = { ...stats, learnedCount: stats.learnedCount + 1 }
    setStats(newStats)
    localStorage.setItem("oshienglish-stats", JSON.stringify(newStats))
  }

  return (
    <StatsContext.Provider value={{ ...stats, addLearnedCount }}>
      {children}
    </StatsContext.Provider>
  )
}

function AIWordSearch() {
  const { addLearnedCount } = useStats()
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [isLearned, setIsLearned] = useState(false)

  const handleSearch = async () => {
    const term = query.trim()
    if (!term) return
    setLoading(true)
    setHasSearched(true)
    setIsLearned(false)
    try {
      const response = await fetch("/api/search-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: term }),
      })
      const data = await response.json()
      if (response.ok) setResult(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLearn = () => {
    if (!isLearned) {
      addLearnedCount()
      setIsLearned(true)
    }
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
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
            placeholder="英単語を入力（例: pog）"
            className="h-12 w-full rounded-2xl border border-primary/20 bg-card pl-10 pr-10 text-sm focus:outline-none"
          />
        </div>
        <button onClick={handleSearch} disabled={loading} className="h-12 rounded-2xl bg-primary px-6 text-sm font-bold text-white shadow-md disabled:opacity-50">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "検索"}
        </button>
      </div>

      {hasSearched && result && (
        <div className="mt-2 p-4 rounded-2xl bg-primary/5 border border-primary/10 animate-in fade-in slide-in-from-top-1">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full">AI回答</span>
            <div className="flex gap-2">
              <button onClick={() => {
                const utterance = new SpeechSynthesisUtterance(result.word);
                utterance.lang = 'en-US';
                window.speechSynthesis.speak(utterance);
              }} className="p-2 bg-white rounded-full shadow-sm"><Volume2 className="h-4 w-4 text-primary" /></button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground">{result.word} <span className="text-sm font-normal text-muted-foreground">[{result.pronunciation}]</span></h3>
            <p className="text-sm font-bold text-primary mt-1">{result.meaning}</p>
          </div>
          <div className="space-y-2 mb-4">
            <div className="p-3 bg-white rounded-xl text-xs shadow-sm">
              <p className="font-bold text-primary mb-1">配信例文</p>
              <p>{result.vtuberExample}</p>
              <p className="text-muted-foreground mt-1">{result.vtuberExampleJa}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLearn}
            disabled={isLearned}
            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${isLearned ? 'bg-green-500 text-white' : 'bg-primary text-white shadow-lg active:scale-95'}`}
          >
            <CheckCircle2 className="h-4 w-4" />
            {isLearned ? "学習済み！" : "この単語を覚えた！"}
          </button>
        </div>
      )}
    </div>
  )
}

export default function Page() {
  const todayPhrase = getTodayPhrase()
  const weekPhrases = getWeekPhrases()
  const [showLibrary, setShowLibrary] = useState(false)

  return (
    <AllInOneProvider>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-lg">
          <Header />
          <main className="flex flex-col gap-6 pt-4 pb-20">
            <AIWordSearch />
            <TodayCard phrase={todayPhrase} />
            <StreakCard />
            <WeeklyList phrases={weekPhrases} todayId={todayPhrase.id} />
            <div className="flex flex-col items-center px-4">
              <button onClick={() => setShowLibrary(!showLibrary)} className="w-full py-4 rounded-2xl border border-primary/20 bg-card text-sm font-bold text-primary">
                {showLibrary ? "ライブラリを閉じる" : "フレーズライブラリを開く"}
              </button>
            </div>
            {showLibrary && <section className="px-4 animate-fade-in-up pt-4"><PhraseGallery phrases={allPhrases} /></section>}
            <footer className="pb-8 pt-8 text-center text-xs text-muted-foreground">OshiENGLISH - 毎朝7:00更新の推し活英語</footer>
          </main>
        </div>
      </div>
    </AllInOneProvider>
  )
}
