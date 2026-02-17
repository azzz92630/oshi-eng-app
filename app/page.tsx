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

// --- 統計管理システム：ここを確実に繋ぎます ---
const StatsContext = createContext<any>(null)
export const useStats = () => {
  const context = useContext(StatsContext)
  // コンテキストがない場合のフォールバック
  return context || { streak: 1, learnedCount: 0, addLearnedCount: () => {} }
}

function AllInOneProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState({ streak: 1, learnedCount: 0, lastLogin: "" })

  // 初回読み込み
  useEffect(() => {
    const saved = localStorage.getItem("oshienglish-stats")
    const today = new Date().toLocaleDateString()

    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        let newStreak = parsed.streak || 1
        
        // 連続日数の判定
        if (parsed.lastLogin && parsed.lastLogin !== today) {
          const lastDate = new Date(parsed.lastLogin)
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)

          if (lastDate.toLocaleDateString() === yesterday.toLocaleDateString()) {
            newStreak += 1
          } else {
            newStreak = 1
          }
        }
        setStats({ ...parsed, streak: newStreak, lastLogin: today })
      } catch (e) {
        setStats({ streak: 1, learnedCount: 0, lastLogin: today })
      }
    } else {
      setStats({ streak: 1, learnedCount: 0, lastLogin: today })
    }
  }, [])

  // 学習済みカウントを増やす魔法の命令
  const addLearnedCount = () => {
    setStats(prev => {
      const updated = { ...prev, learnedCount: (prev.learnedCount || 0) + 1 }
      localStorage.setItem("oshienglish-stats", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <StatsContext.Provider value={{ ...stats, addLearnedCount }}>
      {children}
    </StatsContext.Provider>
  )
}

// --- AI検索エリア ---
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
    setResult(null)
    setIsLearned(false)

    try {
      const response = await fetch("/api/search-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: term }),
      })
      const data = await response.json()
      if (response.ok) {
        setResult(data)
      }
    } catch (error) {
      console.error("API error:", error)
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
        <button onClick={handleSearch} disabled={loading} className="h-12 rounded-2xl bg-primary px-6 text-sm font-bold text-white shadow-md active:scale-95 disabled:opacity-50">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "検索"}
        </button>
      </div>

      {hasSearched && (
        <div className="mt-2 p-4 rounded-2xl bg-primary/5 border border-primary/10">
          {loading ? (
            <div className="flex flex-col items-center py-4 gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-xs text-muted-foreground font-medium">AIが推し活英語を生成中...</p>
            </div>
          ) : result ? (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-1">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full uppercase tracking-wider">AI Answer</span>
                <button onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(result.word);
                  utterance.lang = 'en-US';
                  window.speechSynthesis.speak(utterance);
                }} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                  <Volume2 className="h-4 w-4 text-primary" />
                </button>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">{result.word}</h2>
                  <span className="text-xs text-muted-foreground font-medium">[{result.pronunciation}]</span>
                </div>
                <p className="text-sm font-bold text-primary mt-1">{result.meaning}</p>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-card rounded-2xl border border-primary/5 shadow-sm">
                  <p className="text-[10px] font-bold text-primary mb-2 uppercase tracking-widest">配信での例文</p>
                  <p className="text-sm text-foreground leading-relaxed font-medium">{result.vtuberExample}</p>
                  <p className="text-xs text-muted-foreground mt-2 border-t border-primary/5 pt-2">{result.vtuberExampleJa}</p>
                </div>
              </div>
              <button onClick={() => { if(!isLearned) { addLearnedCount(); setIsLearned(true); } }} disabled={isLearned} className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${isLearned ? 'bg-green-500 text-white' : 'bg-primary text-white shadow-lg shadow-primary/20 active:scale-[0.98]'}`}>
                <CheckCircle2 className="h-5 w-5" />
                {isLearned ? "学習済み！" : "この単語を覚えた！"}
              </button>
            </div>
          ) : (
            <div className="text-center py-4 text-xs text-muted-foreground font-medium">結果を取得できませんでした</div>
          )}
        </div>
      )}
    </div>
  )
}

// --- メイン表示 ---
function MainContent() {
  const { addLearnedCount } = useStats()
  const todayPhrase = getTodayPhrase()
  const weekPhrases = getWeekPhrases()
  const [showLibrary, setShowLibrary] = useState(false)
  const [todayLearned, setTodayLearned] = useState(false)

  return (
    <div className="mx-auto max-w-lg">
      <Header />
      <main className="flex flex-col gap-6 pt-4 pb-20">
        <AIWordSearch />
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <div className="animate-float">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 shadow-inner">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-balance font-display text-2xl font-black text-foreground tracking-tight">推しの言葉を、英語でも。</h1>
          <p className="text-sm text-muted-foreground px-8 font-medium">Vtuber推し活に使える英語フレーズを毎朝お届け</p>
        </div>

        <div className="flex flex-col gap-3">
          <TodayCard phrase={todayPhrase} />
          <div className="px-4">
            <button onClick={() => { if(!todayLearned) { addLearnedCount(); setTodayLearned(true); } }} disabled={todayLearned} className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${todayLearned ? 'bg-green-100 text-green-600 border border-green-200 shadow-inner' : 'bg-white border-2 border-primary/20 text-primary shadow-sm active:scale-[0.98]'}`}>
              <CheckCircle2 className="h-4 w-4" />
              {todayLearned ? "本日のフレーズ学習済み！" : "本日のフレーズを覚えた！"}
            </button>
          </div>
        </div>

        <StreakCard />
        <WeeklyList phrases={weekPhrases} todayId={todayPhrase.id} />
        <div className="flex flex-col items-center px-4">
          <button onClick={() => setShowLibrary(!showLibrary)} className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-primary/20 bg-card py-4 text-sm font-bold text-primary shadow-sm hover:bg-primary/5 transition-all">
            <BookOpen className="h-4 w-4" />
            {showLibrary ? "ライブラリを閉じる" : "フレーズライブラリを開く"}
          </button>
        </div>
        {showLibrary && <section className="px-4 animate-fade-in-up pt-4"><PhraseGallery phrases={allPhrases} /></section>}
        <footer className="pb-8 pt-8 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">OshiENGLISH - Every Morning 7:00 Update</footer>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <AllInOneProvider>
      <div className="min-h-screen bg-background">
        <MainContent />
      </div>
    </AllInOneProvider>
  )
}
