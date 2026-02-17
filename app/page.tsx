"use client"

import React, { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { TodayCard } from "@/components/today-card"
import { WeeklyList } from "@/components/weekly-list"
import { getTodayPhrase, getWeekPhrases, phrases as allPhrases } from "@/lib/phrases"
import { BookOpen, Sparkles, Search, X, Volume2, Loader2, CheckCircle2, Flame, Trophy } from "lucide-react"

export default function Page() {
  // すべての管理データをここに集約
  const [stats, setStats] = useState({ streak: 1, learnedCount: 0, lastLogin: "" })
  const [query, setQuery] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [todayLearned, setTodayLearned] = useState(false)
  const [searchWordLearned, setSearchWordLearned] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)

  const todayPhrase = getTodayPhrase()
  const weekPhrases = getWeekPhrases()

  // 起動時に保存された数字を読み込む
  useEffect(() => {
    const saved = localStorage.getItem("oshienglish-stats")
    const todayStr = new Date().toLocaleDateString()
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // ログイン日の記録があれば更新
        setStats({ ...parsed, lastLogin: todayStr })
      } catch (e) {
        setStats({ streak: 1, learnedCount: 0, lastLogin: todayStr })
      }
    } else {
      setStats(prev => ({ ...prev, lastLogin: todayStr }))
    }
  }, [])

  // 学習済みカウントを増やす関数
  const incrementLearned = () => {
    setStats(prev => {
      const newCount = (prev.learnedCount || 0) + 1
      const updated = { ...prev, learnedCount: newCount }
      // ローカルストレージに即座に保存
      localStorage.setItem("oshienglish-stats", JSON.stringify(updated))
      return updated
    })
  }

  // AI検索の実行
  const handleSearch = async () => {
    if (!query.trim()) return
    setIsLoading(true)
    setHasSearched(true)
    setSearchResult(null)
    setSearchWordLearned(false)

    try {
      const res = await fetch("/api/search-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: query.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        setSearchResult(data)
      }
    } catch (error) {
      console.error("Search Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-lg">
        <Header />
        
        <main className="flex flex-col gap-8 px-4 pt-4">
          
          {/* 検索セクション */}
          <div className="flex flex-col gap-4">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="英単語を検索..."
                  className="h-14 w-full rounded-2xl border-2 border-primary/10 bg-card pl-12 pr-12 text-sm focus:border-primary/30 focus:outline-none transition-all"
                />
              </div>
              <button 
                onClick={handleSearch}
                className="h-14 rounded-2xl bg-primary px-6 font-bold text-white shadow-lg active:scale-95 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "検索"}
              </button>
            </div>

            {hasSearched && (
              <div className="rounded-3xl border-2 border-primary/10 bg-primary/5 p-6 animate-in fade-in slide-in-from-top-2">
                {isLoading ? (
                  <div className="flex flex-col items-center py-6 gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm font-bold text-primary">AIが解説を作成中...</p>
                  </div>
                ) : searchResult ? (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">AI Answer</span>
                      <button onClick={() => {
                        const u = new SpeechSynthesisUtterance(searchResult.word);
                        u.lang = 'en-US'; window.speechSynthesis.speak(u);
                      }} className="rounded-full bg-white p-2 shadow-sm"><Volume2 className="h-5 w-5 text-primary" /></button>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-foreground">{searchResult.word} <span className="text-sm font-bold text-muted-foreground">[{searchResult.pronunciation}]</span></h2>
                      <p className="mt-2 text-lg font-bold text-primary">{searchResult.meaning}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm border border-primary/5">
                      <p className="text-[10px] font-black text-primary mb-1 uppercase tracking-widest">配信での例文</p>
                      <p className="font-bold text-foreground leading-relaxed">{searchResult.vtuberExample}</p>
                      <p className="mt-2 text-sm text-muted-foreground border-t border-dashed pt-2">{searchResult.vtuberExampleJa}</p>
                    </div>
                    <button 
                      onClick={() => { if(!searchWordLearned) { incrementLearned(); setSearchWordLearned(true); } }}
                      disabled={searchWordLearned}
                      className={`flex h-14 items-center justify-center gap-2 rounded-2xl font-black transition-all ${searchWordLearned ? 'bg-green-500 text-white cursor-default' : 'bg-primary text-white shadow-xl active:scale-95'}`}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      {searchWordLearned ? "学習済み！" : "この単語を覚えた！"}
                    </button>
                  </div>
                ) : (
                  <p className="text-center text-sm font-bold text-muted-foreground">検索結果が取得できませんでした</p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-black text-foreground">推しの言葉を、英語でも。</h1>
            <p className="text-sm font-medium text-muted-foreground px-8">Vtuber推し活英語フレーズを毎朝7:00お届け</p>
          </div>

          <div className="flex flex-col gap-3">
            <TodayCard phrase={todayPhrase} />
            <button 
              onClick={() => { if(!todayLearned) { incrementLearned(); setTodayLearned(true); } }}
              disabled={todayLearned}
              className={`mx-4 flex h-14 items-center justify-center gap-2 rounded-2xl border-2 font-black transition-all ${todayLearned ? 'bg-green-50 border-green-200 text-green-600 cursor-default' : 'bg-white border-primary/20 text-primary shadow-sm active:scale-95'}`}
            >
              <CheckCircle2 className="h-5 w-5" />
              {todayLearned ? "本日のフレーズ学習済み！" : "本日のフレーズを覚えた！"}
            </button>
          </div>

          {/* 統計表示 */}
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center justify-center rounded-3xl bg-card p-4 shadow-sm border border-primary/5">
              <Flame className="h-6 w-6 text-orange-500 mb-1" />
              <span className="text-xl font-black text-foreground">{stats.streak || 1}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">連続日数</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-3xl bg-primary/10 p-4 shadow-sm border border-primary/10">
              <BookOpen className="h-6 w-6 text-primary mb-1" />
              <span className="text-xl font-black text-primary">{stats.learnedCount || 0}</span>
              <span className="text-[10px] font-bold text-primary uppercase">学習済み</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-3xl bg-card p-4 shadow-sm border border-primary/5">
              <Trophy className="h-6 w-6 text-yellow-500 mb-1" />
              <span className="text-xl font-black text-foreground">Lv.1</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">レベル</span>
            </div>
          </div>

          <WeeklyList phrases={weekPhrases} todayId={todayPhrase.id} />
          
          <button onClick={() => setShowLibrary(!showLibrary)} className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary/20 bg-card font-black text-primary transition-all active:scale-95">
            <BookOpen className="h-5 w-5" />
            {showLibrary ? "ライブラリを閉じる" : "フレーズライブラリを開く"}
          </button>

          {showLibrary && <div className="animate-in fade-in slide-in-from-bottom-4"><PhraseGallery phrases={allPhrases} /></div>}
          
          <footer className="pt-8 text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">OshiENGLISH - Everyday 7:00 AM</footer>
        </main>
      </div>
    </div>
  )
}
