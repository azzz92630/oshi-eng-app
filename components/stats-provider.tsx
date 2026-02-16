"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  getLevel,
  incrementLearnedCount,
  updateStreakFromLastAccess,
} from "@/lib/stats"
import {
  fireConfetti,
  getCelebratedLevel2,
  getCelebratedStreak3,
  setCelebratedLevel2,
  setCelebratedStreak3,
} from "@/lib/celebration"
import { toast } from "sonner"

const LV2_MESSAGE =
  "Lv.2達成！成長してるね！覚えたフレーズを使って、推しの配信で一言コメントを送ってみるのはどう？勇気を出して応援を届けよう！"

interface StatsContextValue {
  streak: number
  learnedCount: number
  level: number
  incrementLearned: () => void
}

const StatsContext = createContext<StatsContextValue | null>(null)

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [streak, setStreak] = useState(1)
  const [learnedCount, setLearnedCount] = useState(0)

  useEffect(() => {
    const { streak: s, learnedCount: l } = updateStreakFromLastAccess()
    setStreak(s)
    setLearnedCount(l)
  }, [])

  const level = getLevel(streak)

  // 3日継続の紙吹雪 & Lv.2達成メッセージ（そのレベルに達した最初の1回だけ）
  useEffect(() => {
    if (typeof window === "undefined") return

    if (streak >= 3 && !getCelebratedStreak3()) {
      setCelebratedStreak3()
      fireConfetti()
    }

    if (level >= 2 && !getCelebratedLevel2()) {
      setCelebratedLevel2()
      toast.success("Lv.2達成！", {
        description: LV2_MESSAGE,
        duration: 8000,
      })
    }
  }, [streak, level])

  const incrementLearned = useCallback(() => {
    const next = incrementLearnedCount()
    setLearnedCount(next)
  }, [])

  return (
    <StatsContext.Provider
      value={{
        streak,
        learnedCount,
        level,
        incrementLearned,
      }}
    >
      {children}
    </StatsContext.Provider>
  )
}

export function useStats(): StatsContextValue {
  const ctx = useContext(StatsContext)
  if (!ctx) {
    throw new Error("useStats must be used within StatsProvider")
  }
  return ctx
}
