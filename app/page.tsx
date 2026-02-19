"use client"

import React, { useEffect, useState, useRef } from "react"
import { Header } from "@/components/header"
import { TodayCard } from "@/components/today-card"
import { getTodayPhrase, getWeekPhrases, phrases as allPhrases } from "@/lib/phrases"
import { BookOpen, Search, Volume2, Loader2, CheckCircle2, Flame, Trophy, PartyPopper, History } from "lucide-react"
import confetti from "canvas-confetti"

export default function Page() {
  const [stats, setStats] = useState({ streak: 1, learnedCount: 0, learnedIds: [] as string[] })
  const [query, setQuery] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const [showLearnedList, setShowLearnedList] = useState(false)
  const [message, setMessage] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  
  const prevLevelRef = useRef<number>(1)
  const todayPhrase = getTodayPhrase()
  const weekPhrases = getWeekPhrases()
  const currentLevel = Math.floor((stats.learnedCount || 0) / 5) + 1

  const fireConfetti = () => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)
      const particleCount = 50 * (timeLeft / duration)
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
    }, 250)
  }

  useEffect(() => {
    const saved = localStorage.getItem("oshienglish-stats")
    const lastOpenDate = localStorage.getItem("oshienglish-last-date")
    const today = new Date().toLocaleDateString()

    let currentStats = { streak: 1, learnedCount: 0, learnedIds: [] as string[] }

    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        let currentStreak = parsed.streak || 1

        if (lastOpenDate && lastOpenDate !== today) {
          const lastDate = new Date(lastOpenDate)
          const currentDate = new Date(today)
          const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime())
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

          if (diffDays === 1) currentStreak += 1
          else if (diffDays > 1) currentStreak = 1
        }

        currentStats = {
          streak: currentStreak,
          learnedCount: parsed.learnedCount || 0,
          learnedIds: parsed.learnedIds || []
        }
      } catch (e) { console.error("Failed to load stats") }
    }

    setStats(currentStats)
    prevLevelRef.current = Math.floor((currentStats.learnedCount || 0) / 5) + 1
    localStorage.setItem("oshienglish-stats", JSON.stringify(currentStats))
    localStorage.setItem("oshienglish-last-date", today)

    if (currentStats.streak >= 7) setMessage("すごい！1週間連続ログイン達成ですね！")
    else if (currentStats.streak >= 3) setMessage("3日坊主を克服！その調子です！")
  }, [])

  useEffect(() => {
    if (currentLevel > prevLevelRef.current) {
      fireConfetti()
      setMessage(`LEVEL UP! Lv.${currentLevel} になりました！`)
      prevLevelRef.current = currentLevel
    }
  }, [currentLevel])

  const toggleLearn = (id: string) => {
    setStats(prev => {
      let newIds = prev.learnedIds.includes(id) 
        ? prev.learnedIds.filter(itemId => itemId !== id) 
        : [...prev.learnedIds, id];
      const updated = { ...prev, learnedIds: newIds, learnedCount: newIds.length }
      localStorage.setItem("oshienglish-stats", JSON.stringify(updated))
      return updated
    })
  }

  const playAudio = (text: string) => {
    let speechText = text.toLowerCase();
    if (speechText.includes("lets goooo")) speechText = "lets gooo"; 
    const dictionary: { [key: string]: string } = {
      "copium": "cope-e-um", "lmao": "l m a o", "ikr": "i k r", "tldr": "t l d r", "fr fr": "for real for real"
    };
    speechText = dictionary[speechText] || speechText;
    const u = new SpeechSynthesisUtterance(speechText);
    u.lang = 'en-US';
    u.pitch = 1.1;
    u.rate = 0.85; 
    window.speechSynthesis.speak(u);
  }

  const handleSearch = async () => {
    if (!query.trim()) return
    setIsLoading(true); setHasSearched(true); setSearchResult(null)
    try {
      const res = await fetch("/api/search-word", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word: query.trim() }),
      })
      const data = await res.json()
      setSearchResult(res.ok ? data : { isError: true, message: data.details || "エラーが発生しました" })
    } catch (error) { 
      setSearchResult({ isError: true, message: "通信に失敗しました" }) 
    } finally { 
      setIsLoading(false) 
    }
  }

  const learnedPhrasesFromLib = allPhrases.filter(p => stats.learnedIds.includes(p.id))
  
  const otherLearned = stats.learnedIds
    .filter(id => !allPhrases.find(p => p.id === id))
    .map(id => {
      const isCurrentSearch = searchResult && (searchResult.word === id || query === id);
      return {
        id: id,
        english: isCurrentSearch ? searchResult.word : id,
        japanese: isCurrentSearch ? searchResult.meaning : "検索から追加",
        pronunciation: isCurrentSearch ? searchResult.pronunciation : "",
        phonetic: isCurrentSearch ? searchResult.phonetic : "",
        example: isCurrentSearch ? searchResult.vtuberExample : "",
        exampleJa: isCurrentSearch ? searchResult.vtuberExampleJa : "",
        tip: isCurrentSearch ? searchResult.tip : "検索結果から詳細を復元できません。もう一度検索してみてください。",
      };
    });

  const PhraseItem = ({ phrase }: { phrase: any }) => {
    const isExpanded = expandedId === phrase.id;
    return (
      <div className="flex flex-col rounded-2xl bg-white shadow-sm border border-primary/5 overflow-hidden transition-all">
        <div className="flex items-center gap-3 p-4">
          <button onClick={() => playAudio(phrase.english)} className="p-2 bg-primary/5 rounded-full hover:bg-primary/10 transition-all">
            <Volume2 className="h-4 w-4 text-primary" />
          </button>
          <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : phrase.id)}>
            <div className="flex items-baseline gap-2">
              <p className="text-sm font-bold text-primary">{phrase.english}</p>
              {phrase.pronunciation && (
                <p className="text-[9px] text-muted-foreground font-medium uppercase">{phrase.phonetic} 【{phrase.pronunciation}】</p>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground">{phrase.japanese}</p>
          </div>
          <button onClick={() => toggleLearn(phrase.id)} className={`p-2 rounded-xl transition-all ${stats.learnedIds.includes(phrase.id) ? 'bg-green-500 text-white shadow-md' : 'bg-primary/5 text-primary'}`}>
            <CheckCircle2 className="h-5 w-5" />
          </button>
        </div>
        {isExpanded && phrase.example && (
          <div className="bg-primary/5 px-4 pb-4 pt-2 border-t border-dashed border-primary/10 animate-in slide-in-from-top-1">
            <div className="mb-2">
              <p className="text-[9px] font-black text-primary uppercase mb-1">Example</p>
              <p className="text-xs font-bold leading-relaxed">{phrase.example}</p>
              <p className="text-[10px] text-muted-foreground">{phrase.exampleJa}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-orange-500 uppercase mb-1">Tip</p>
              <p className="text-[10px] font-medium text-orange-700 leading-relaxed bg-orange-50 p-2 rounded-lg border border-orange-100">{phrase.tip}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
      <div className="mx-auto max-w-lg">
        <Header />
        <main className="flex flex-col gap-8 px-4 pt-4">
          {message && (
            <div className="mx-4 flex items-center gap-3 rounded-2xl bg-primary/10 p-4 border border-primary/20 animate-bounce">
              <PartyPopper className="h-5 w-5 text-primary" />
              <p className="text-sm font-bold text-primary">{message}</p>
              <button onClick={() => setMessage("")} className="ml-auto text-primary/50 text-xs">×</button>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="relative flex items-center gap-2 px-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} placeholder="英単語を検索..." className="h-14 w-full rounded-2xl border-2 border-primary/10 bg-card pl-12 pr-12 text-sm focus:border-primary/30 focus:outline-none" />
              </div>
              <button onClick={handleSearch} className="h-14 rounded-2xl bg-primary px-6 font-bold text-white shadow-lg active:scale-95 disabled:opacity-50" disabled={isLoading}>{isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "検索"}</button>
            </div>
            {hasSearched && (
              <div className="mx-4 rounded-3xl border-2 border-primary/10 bg-primary/5 p-6 animate-in fade-in slide-in-from-top-2">
                {isLoading ? <div className="flex flex-col items-center py-6 gap-3"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="text-sm font-bold text-primary">AI回答中...</p></div> : searchResult?.isError ? <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs font-bold leading-relaxed">エラー：{searchResult.message}</div> : (
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center"><span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase text-primary">AI Answer</span><button onClick={() => playAudio(searchResult.word || query)} className="p-2 bg-white rounded-full shadow-sm active:scale-90"><Volume2 className="h-5 w-5 text-primary" /></button></div>
                    <div>
                      <h2 className="text-3xl font-black">{searchResult.word || query} <span className="text-sm font-bold text-muted-foreground">[{searchResult.phonetic}]</span></h2>
                      <p className="mt-1 text-xs text-muted-foreground">読み：{searchResult.pronunciation}</p>
                      <p className="mt-2 text-lg font-bold text-primary">{searchResult.meaning}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-5 border border-primary/5 shadow-sm">
                      <p className="text-[10px] font-black text-primary mb-1 uppercase tracking-widest">配信での例文</p>
                      <p className="font-bold leading-relaxed">{searchResult.vtuberExample}</p>
                      <p className="mt-2 text-sm text-muted-foreground border-t border-dashed pt-2">{searchResult.vtuberExampleJa}</p>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-100 rounded-xl">
                      <p className="text-[10px] font-black text-orange-500 uppercase mb-1">Tip</p>
                      <p className="text-[11px] font-medium text-orange-700">{searchResult.tip}</p>
                    </div>
                    <button onClick={() => toggleLearn(searchResult.word || query)} className={`flex h-14 items-center justify-center gap-2 rounded-2xl font-black shadow-sm active:scale-95 ${stats.learnedIds.includes(searchResult.word || query) ? 'bg-green-500 text-white' : 'bg-primary text-white'}`}><CheckCircle2 className="h-5 w-5" />{stats.learnedIds.includes(searchResult.word || query) ? "学習済み（解除）" : "この単語を覚えた！"}</button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 px-4">
            <div className="flex flex-col items-center justify-center rounded-3xl bg-card p-4 shadow-sm border border-primary/5"><Flame className="h-6 w-6 text-orange-500 mb-1" /><span className="text-xl font-black">{stats.streak}</span><span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">連続日数</span></div>
            <div className="flex flex-col items-center justify-center rounded-3xl bg-primary/10 p-4 shadow-sm border border-primary/10"><BookOpen className="h-6 w-6 text-primary mb-1" /><span className="text-xl font-black text-primary">{stats.learnedCount}</span><span className="text-[10px] font-bold text-primary uppercase tracking-widest text-center">学習済み</span></div>
            <div className="flex flex-col items-center justify-center rounded-3xl bg-card p-4 shadow-sm border border-primary/5"><Trophy className="h-6 w-6 text-yellow-500 mb-1" /><span className="text-xl font-black">Lv.{currentLevel}</span><span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">レベル</span></div>
          </div>

          <div className="flex flex-col gap-3">
            <TodayCard phrase={todayPhrase} />
            <button onClick={() => toggleLearn(todayPhrase.id)} className={`mx-4 flex h-14 items-center justify-center gap-2 rounded-2xl border-2 font-black shadow-sm active:scale-95 ${stats.learnedIds.includes(todayPhrase.id) ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-primary/20 text-primary'}`}><CheckCircle2 className="h-5 w-5" />{stats.learnedIds.includes(todayPhrase.id) ? "学習済み（解除）" : "本日のフレーズを覚えた！"}</button>
          </div>

          <div className="flex flex-col gap-4 px-4">
            <h3 className="px-2 text-xs font-black uppercase text-muted-foreground tracking-widest">今週のフレーズ</h3>
            <div className="flex flex-col gap-2">{weekPhrases.map((phrase) => <PhraseItem key={phrase.id} phrase={phrase} />)}</div>
          </div>

          <div className="flex flex-col gap-2 px-4">
            <button onClick={() => { setShowLearnedList(!showLearnedList); setShowLibrary(false); }} className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-green-200 bg-green-50/30 font-black text-green-600 active:scale-95 transition-all"><History className="h-5 w-5" />{showLearnedList ? "閉じる" : `学習済みを見直す (${stats.learnedCount})`}</button>
            <button onClick={() => { setShowLibrary(!showLibrary); setShowLearnedList(false); }} className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary/20 bg-card font-black text-primary active:scale-95 transition-all"><BookOpen className="h-5 w-5" />{showLibrary ? "閉じる" : "ライブラリを見る"}
            </button>
          </div>

          {showLearnedList && (
            <div className="mx-4 flex flex-col gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="px-2 text-xs font-black uppercase text-green-600 tracking-widest">覚えた言葉</h3>
              <div className="flex flex-col gap-2">
                {[...learnedPhrasesFromLib, ...otherLearned].map((item: any) => <PhraseItem key={item.id} phrase={item} />)}
              </div>
            </div>
          )}

          {showLibrary && (
            <div className="mx-4 flex flex-col gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="px-2 text-xs font-black uppercase text-muted-foreground tracking-widest">ライブラリ</h3>
              <div className="flex flex-col gap-2">{allPhrases.map((phrase) => <PhraseItem key={phrase.id} phrase={phrase} />)}</div>
            </div>
          )}
          
          <footer className="pt-8 text-center text-[10px] font-black uppercase text-muted-foreground tracking-widest">OshiENGLISH - Everyday 7:00 AM</footer>
        </main>
      </div>
    </div>
  )
}
