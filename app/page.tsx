"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { Header } from "@/components/header"
import { TodayCard } from "@/components/today-card"
import { WeeklyList } from "@/components/weekly-list"
import { StreakCard } from "@/components/streak-card"
import { CategoryPills } from "@/components/category-pills"
import { PhraseGallery } from "@/components/phrase-gallery"
import { getTodayPhrase, getWeekPhrases, phrases as allPhrases } from "@/lib/phrases"
import { BookOpen, Sparkles, Search, X, Volume2, Loader2 } from "lucide-react"

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

function AIWordSearch() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSearch = async () => {
    const term = query.trim()
    if (!term) return

    setLoading(true)
    setHasSearched(true)
    setResult(null)
    setErrorMsg("")

    try {
      // 既存の api/search-word を正確に呼び出す
      const response = await fetch("/api/search-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: term }), // キー名を 'word' に合わせました
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setResult(data)
      } else {
        setErrorMsg(data.error || "検索に失敗しました")
      }
    } catch (error) {
      setErrorMsg("通信エラーが発生しました")
    } finally {
      setLoading(false)
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
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="h-12 rounded-2xl bg-primary px-6 text-sm font-bold text-white shadow-md active:scale-95 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "検索"}
        </button>
      </div>

      {hasSearched && (
        <div className="mt-2 p-4 rounded-2xl bg-primary/5 border border-primary/10">
          {loading ? (
            <div className="flex flex-col items-center py-4 gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-xs text-muted-foreground">AIが意味を考えています...</p>
            </div>
          ) : errorMsg ? (
            <div className="text-center py-4 text-xs text-red-500 font-medium">
              {errorMsg}
            </div>
          ) : result ? (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-1">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full">AI回答</span>
                <button 
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(result.word);
                    utterance.lang = 'en-US'; // 英語で読み上げ
                    window.speechSynthesis.speak(utterance);
                  }}
                  className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                  title="発音を聞く"
                >
                  <Volume2 className="h-4 w-4 text-primary" />
              </button>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-foreground">{result.word}</h3>
                  <span className="text-xs text-muted-foreground">[{result.pronunciation}]</span>
                </div>
                <p className="text-sm font-bold text-primary mt-1">{result.meaning}</p>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-card rounded-xl border border-primary/5">
                  <p className="text-[10px] font-bold text-primary mb-1">配信での例文</p>
                  <p className="text-sm text-foreground leading-relaxed">{result.vtuberExample}</p>
                  <p className="text-xs text-muted-foreground mt-1">{result.vtuberExampleJa}</p>
                </div>
                <div className="p-3 bg-card rounded-xl border border-primary/5">
                  <p className="text-[10px] font-bold text-muted-foreground mb-1">日常での例文</p>
                  <p className="text-sm text-foreground leading-relaxed">{result.dailyExample}</p>
                  <p className="text-xs text-muted-foreground mt-1">{result.dailyExampleJa}</p>
                </div>
              </div>
            </div>
          ) : null}
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
              <button onClick={() => setShowLibrary(!showLibrary)} className="w-full flex items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-card py-4 text-sm font-bold text-primary shadow-sm">
                <BookOpen className="h-4 w-4" />
                {showLibrary ? "ライブラリを閉じる" : "フレーズライブラリを開く"}
              </button>
            </div>
            {showLibrary && (
              <section className="px-4 animate-fade-in-up pt-4">
                <PhraseGallery phrases={allPhrases} />
              </section>
            )}
            <footer className="pb-8 pt-8 text-center text-xs text-muted-foreground">OshiENGLISH - AI推し活英語アシスタント</footer>
          </main>
        </div>
      </div>
    </AllInOneProvider>
  )
}
