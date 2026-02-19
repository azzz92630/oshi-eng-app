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
    speechText = dictionary[speechText] ||
