"use client"

import React, { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { TodayCard } from "@/components/today-card"
import { getTodayPhrase, getWeekPhrases, phrases as allPhrases } from "@/lib/phrases"
import { BookOpen, Sparkles, Search, Volume2, Loader2, CheckCircle2, Flame, Trophy, PartyPopper, History } from "lucide-react"

export default function Page() {
  const [stats, setStats] = useState({ streak: 1, learnedCount: 0, learnedIds: [] as string[] })
  const [query, setQuery] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const [showLearnedList, setShowLearnedList] = useState(false)
  const [message, setMessage] = useState("")

  const todayPhrase = getTodayPhrase()
  const weekPhrases = getWeekPhrases()

  const level = Math.floor((stats.learnedCount || 0) / 5) + 1

  useEffect(() => {
    const saved = localStorage.getItem("oshienglish-stats")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setStats({
          streak: parsed.streak || 1,
          learnedCount: parsed.learnedCount || 0,
          learnedIds: parsed.learnedIds || []
        })

        if (parsed.streak >= 7) {
          setMessage("すごい！1週間連続ログイン達成ですね！")
        } else if (parsed.streak >= 3) {
          setMessage("3日坊主を克服！その調子です！")
        }
      } catch (e) {
        console.error("Failed to load stats")
      }
    }
  }, [])

  const toggleLearn = (id: string) => {
    setStats(prev => {
      let newIds
      if (prev.learnedIds.includes(id)) {
        newIds = prev.learnedIds.filter(itemId => itemId !== id)
      } else {
        newIds = [...prev.learnedIds, id]
      }
      const updated = { ...prev, learnedIds: newIds, learnedCount: newIds.length }
      localStorage.setItem("oshienglish-stats", JSON.stringify(updated))
      return updated
    })
  }

  // 音声読み上げの補正ロジック
  const playAudio = (text: string) => {
    // 1. 小文字にする（大文字の羅列を一文字ずつ読むのを防ぐ）
    let speechText = text.toLowerCase();

    // 2. 特殊な読み上げ辞書（必要に応じて調整）
    const dictionary: { [key: string]: string } = {
      "copium": "cope-e-um",
      "lmao": "l m a o",
      "ikr": "i k r",
      "o7": "salute",
      "tldr": "t l d r",
      "fr fr": "for real for real",
    };

    // スラングのIDや英語テキストがキーにあれば置換
    speechText = dictionary[speechText] || speechText;

    const u = new SpeechSynthesisUtterance(speechText);
    u.lang = 'en-US';
    u.rate = 0.9; // 聴き取りやすく少しゆっくり
    window.speechSynthesis.speak(u);
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
      if (!res.ok) {
        setSearchResult({ isError: true, message: data.details || data.error || "エラーが発生しました" })
      } else {
        setSearchResult(data)
      }
    } catch (error) {
      setSearchResult({ isError: true, message: "通信に失敗しました" })
    } finally {
      setIsLoading(false)
    }
  }

  const learnedPhrases = allPhrases.filter(p => stats.learnedIds.includes(p.id))
  const otherLearned = stats.learnedIds.filter(id => !allPhrases.find(p => p.id === id))

  return (
    <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
      <div className="mx-auto max-w-lg">
        <Header />
        <main className="flex flex-col gap-8 px-4 pt-4">
          
          {message && (
            <div className="flex items-center gap-3 rounded-2xl bg-primary/10 p-4 border border-primary/20 animate-bounce">
              <PartyPopper className="h-5 w-5 text-primary" />
              <p className="text-sm font-bold text-primary">{message}</p>
              <button onClick={() => setMessage("")} className="ml-auto text-primary/50 text-xs">×</button>
            </div>
          )}

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
                  className="h-14 w-full rounded-2xl border-2 border-primary/10 bg-card pl-12 pr-12 text-sm focus:border-primary/30 focus:outline-none"
                />
              </div>
              <button onClick={handleSearch} className="h-14 rounded-2xl bg-primary px-6 font-bold text-white shadow-lg active:scale-95 disabled:opacity-50" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "検索"}
              </button>
            </div>

            {hasSearched && (
              <div className="rounded-3xl border-2 border-primary/10 bg-primary/5 p-6 animate-in fade-in slide-in-from-top-2">
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
                      className={`flex h-14 items-center justify-center gap-2 rounded-2xl font-black transition-all shadow-sm active:scale-95 ${stats.learnedIds.includes(searchResult.word || query) ? 'bg-green-500 text-white' : 'bg-primary text-white'}`}
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
            <div className="flex flex-col items
