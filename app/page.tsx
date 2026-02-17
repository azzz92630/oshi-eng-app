"use client"

import React, { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { TodayCard } from "@/components/today-card"
import { WeeklyList } from "@/components/weekly-list"
import { PhraseGallery } from "@/components/phrase-gallery"
import { getTodayPhrase, getWeekPhrases, phrases as allPhrases } from "@/lib/phrases"
import { BookOpen, Sparkles, Search, Volume2, Loader2, CheckCircle2, Flame, Trophy, PartyPopper, History, Sun, Cloud, Moon } from "lucide-react"

export default function Page() {
  const [stats, setStats] = useState({ streak: 1, learnedCount: 0, learnedIds: [] as string[] })
  const [query, setQuery] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const [showLearnedList, setShowLearnedList] = useState(false)
  const [message, setMessage] = useState("")
  const [timeContext, setTimeContext] = useState({ theme: "bg-background", icon: <Sun /> })

  const todayPhrase = getTodayPhrase()
  const weekPhrases = getWeekPhrases()
  const level = Math.floor((stats.learnedCount || 0) / 5) + 1

  useEffect(() => {
    // 1. データの読み込み
    const saved = localStorage.getItem("oshienglish-stats")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setStats({
          streak: parsed.streak || 1,
          learnedCount: parsed.learnedCount || 0,
          learnedIds: parsed.learnedIds || []
        })
        if (parsed.streak >= 7) setMessage("すごい！1週間連続ログイン達成ですね！")
        else if (parsed.streak >= 3) setMessage("3日坊主を克服！その調子です！")
      } catch (e) {
        console.error("Failed to load stats")
      }
    }

    // 2. 時間に応じた背景設定
    const updateTheme = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 11) {
        setTimeContext({ theme: "bg-orange-50/30", icon: <Sun className="text-orange-400" /> })
      } else if (hour >= 11 && hour < 17) {
        setTimeContext({ theme: "bg-blue-50/30", icon: <Cloud className="text-blue-400" /> })
      } else {
        setTimeContext({ theme: "bg-slate-900/5 text-slate-900", icon: <Moon className="text-indigo-400" /> })
      }
    }
    updateTheme()
  }, [])

  const toggleLearn = (id: string) => {
    setStats(prev => {
      let newIds = prev.learnedIds.includes(id) 
        ? prev.learnedIds.filter(itemId => itemId !== id) 
        : [...prev.learnedIds, id]
      const updated = { ...prev, learnedIds: newIds, learnedCount: newIds.length }
      localStorage.setItem("oshienglish-stats", JSON.stringify(updated))
      return updated
    })
  }

  const playAudio = (text: string) => {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = "en-US"
    window.speechSynthesis.speak(u)
  }

  const handleSearch = async () => {
    if (!query.trim()) return
    setIsLoading(true)
    setHasSearched(true)
    setSearchResult(null)
    try {
      const res = await fetch("/api/search-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: query.trim() }),
      })
      const data = await res.json()
      if (!res.ok) setSearchResult({ isError: true, message: data.details || data.error || "エラー" })
      else setSearchResult(data)
    } catch (error) {
      setSearchResult({ isError: true, message: "通信失敗" })
    } finally {
      setIsLoading(false)
    }
  }

  const learnedPhrases = allPhrases.filter(p => stats.learnedIds.includes(p.id))
  const otherLearned = stats.learnedIds.filter(id => !allPhrases.find(p => p.id === id))

  return (
    <div className={`min-h-screen transition-colors duration-1000 pb-24 font-sans ${timeContext.theme}`}>
      <div className="mx-auto max-w-lg">
        <Header />
        <main className="flex flex-col gap-8 px-4 pt-4">
          
          <div className="flex justify-center -mb-4 opacity-50">
            {timeContext.icon}
          </div>

          {message && (
            <div className="flex items-center gap-3 rounded-2xl bg-primary/10 p-4 border border-primary/20 animate-bounce">
              <PartyPopper className="h-5 w-5 text-primary" />
              <p className="text-sm font-bold text-primary">{message}</p>
              <button onClick={() => setMessage("")} className="ml-auto text-primary/50 text-xs">×</button>
            </div>
          )}

          {/* 検索セクション */}
          <div className="flex flex-col gap-4">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="英単語を検索..."
                  className="h-14 w-full rounded-2xl border-2 border-primary/10 bg-card pl-12 pr-12 text-sm focus:border-primary/30 focus:outline-none"
                />
              </div>
              <button onClick={handleSearch} className="h-14 rounded-2xl bg-primary px-6 font-bold text-white shadow-lg active:scale-95 disabled:opacity-50" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "検索"}
              </button>
            </div>

            {hasSearched && (
              <div className="rounded-3xl border-2 border-primary/10 bg-white/80 backdrop-blur-sm p-6 animate-in fade-in slide-in-from-top-2">
                {isLoading ? (
                  <div className="flex flex-col items-center py-6 gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm font-bold text-primary">AIが回答を生成中...</p>
                  </div>
                ) : searchResult?.isError ? (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs font-bold leading-relaxed">
                    エラー詳細：{searchResult.message}
                  </div>
                ) : searchResult ? (
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase text-primary">AI Answer</span>
                      <button onClick={() => playAudio(searchResult.word || query)} className="p-2 bg-white rounded-full shadow-sm active:scale-90"><Volume2 className="h-5 w-5 text-primary" /></button>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black">{searchResult.word || query} <span className="text-sm font-bold text-muted-foreground">[{searchResult.pronunciation}]</span></h2>
                      <p className="mt-2 text-lg font-bold text-primary">{searchResult.meaning}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 border border-primary/5 shadow-sm">
                      <p className="text-[10px] font-black text-primary mb-1 uppercase tracking-widest">配信での例文</p>
                      <p className="font-bold leading-relaxed">{searchResult.vtuberExample}</p>
                      <p className="mt-2 text-sm text-muted-foreground border-t border-dashed pt-2">{searchResult.vtuberExampleJa}</p>
                    </div>
                    <button 
                      onClick={() => toggleLearn(searchResult.word || query)}
                      className={`flex h-14 items-center justify-center gap-2 rounded-2xl font-black transition-all shadow-sm active:scale-95 ${stats.learnedIds.includes(searchResult.word || query) ? "bg-green-500 text-white" : "bg-primary text-white"}`}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      {stats.learnedIds.includes(searchResult.word || query) ? "学習済み（タップで解除）" : "この単語を覚えた！"}
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white/60 p-4 shadow-sm border border-primary/5">
              <Flame className="h-6 w-6 text-orange-500 mb-1" />
              <span className="text-xl font-black">{stats.streak}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">連続日数</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-3xl bg-primary/10 p-4 shadow-sm border border-primary/10">
              <BookOpen className="h-6 w-6 text-primary mb-1" />
              <span className="text-xl font-black text-primary">{stats.learnedCount}</span>
              <span className="text-[10px] font-bold text-primary uppercase">学習済み</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white/60 p-4 shadow-sm border border-primary/5">
              <Trophy className="h-6 w-6 text-yellow-500 mb-1" />
              <span className="text-xl font-black">Lv.{level}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">現在のレベル</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <TodayCard phrase={todayPhrase} />
            <button 
              onClick={() => toggleLearn(todayPhrase.id)}
              className={`mx-4 flex h-14 items-center justify-center gap-2 rounded-2xl border-2 font-black transition-all active:scale-95 shadow-sm ${stats.learnedIds.includes(todayPhrase.id) ? "bg-green-50 border-green-200 text-green-600" : "bg-white border-primary/20 text-primary"}`}
            >
              <CheckCircle2 className="h-5 w-5" />
              {stats.learnedIds.includes(todayPhrase.id) ? "学習済み（タップで解除）" : "本日のフレーズを覚えた！"}
            </button>
          </div>

          {/* リスト表示セクション */}
          <div className="flex flex-col gap-2">
            <button onClick={() => { setShowLearnedList(!showLearnedList); setShowLibrary(false); }} className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-green-200 bg-white/80 font-black text-green-600 active:scale-95 transition-all">
              <History className="h-5 w-5" />
              {showLearnedList ? "リストを閉じる" : `学習済みリスト (${stats.learnedCount})`}
            </button>
            <button onClick={() => { setShowLibrary(!showLibrary); setShowLearnedList(false); }} className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary/20 bg-white/80 font-black text-primary active:scale-95 transition-all">
              <BookOpen className="h-5 w-5" />
              {showLibrary ? "ライブラリを閉じる" : "すべてのフレーズを見る"}
            </button>
          </div>

          {showLearnedList && (
            <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col gap-4">
              <h3 className="px-2 text-xs font-black uppercase text-green-600 tracking-widest">これまでに覚えた言葉</h3>
              <div className="flex flex-col gap-2">
                {[...learnedPhrases.map(p => ({id: p.id, en: p.english, ja: p.japanese})), ...otherLearned.map(id => ({id, en: id, ja: "検索から追加"}))].map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-white/90 p-4 border border-green-100 shadow-sm">
                    <button onClick={() => playAudio(item.en)} className="p-2 bg-green-100 rounded-full"><Volume2 className="h-4 w-4 text-green-600" /></button>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-green-700">{item.en}</p>
                      <p className="text-[10px] text-green-600/70">{item.ja}</p>
                    </div>
                    <button onClick={() => toggleLearn(item.id)} className="p-2 rounded-xl bg-green-500 text-white"><CheckCircle2 className="h-5 w-5" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showLibrary && (
            <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col gap-4">
              <h3 className="px-2 text-xs font-black uppercase text-muted-foreground tracking-widest">すべてのフレーズ</h3>
              <div className="flex flex-col gap-2">
                {allPhrases.map((phrase) => (
                  <div key={phrase.id} className="flex items-center gap-3 rounded-2xl bg-white/90 p-4 border border-primary/5 shadow-sm">
                    <button onClick={() => playAudio(phrase.english)} className="p-2 bg-primary/5 rounded-full"><Volume2 className="h-4 w-4 text-primary" /></button>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-primary">{phrase.english}</p>
                      <p className="text-[10px] text-muted-foreground">{phrase.japanese}</p>
                    </div>
                    <button onClick={() => toggleLearn(phrase.id)} className={`p-2 rounded-xl transition-all ${stats.learnedIds.includes(phrase.id) ? "bg-green-500 text-white" : "bg-primary/5 text-primary"}`}><CheckCircle2 className="h-5 w-5" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <footer className="pt-8 text-center text-[10px] font-black uppercase text-muted-foreground tracking-widest">OshiENGLISH - Everyday 7:00 AM</footer>
        </main>
      </div>
    </div>
  )
}
