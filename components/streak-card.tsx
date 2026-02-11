"use client"

import { Flame, Trophy, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StreakCard() {
  const dayNames = ["月", "火", "水", "木", "金", "土", "日"]
  const today = new Date().getDay()
  const adjustedToday = today === 0 ? 6 : today - 1

  return (
    <Card className="border border-border/50 bg-card shadow-sm">
      <CardContent className="p-4">
        <div className="mb-4 grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center rounded-xl bg-primary/8 p-3">
            <Flame className="mb-1 h-5 w-5 text-primary" />
            <span className="font-display text-xl font-extrabold text-foreground">7</span>
            <span className="text-[10px] text-muted-foreground">連続日数</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-accent/20 p-3">
            <BookOpen className="mb-1 h-5 w-5 text-accent-foreground" />
            <span className="font-display text-xl font-extrabold text-foreground">31</span>
            <span className="text-[10px] text-muted-foreground">学習済み</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-secondary p-3">
            <Trophy className="mb-1 h-5 w-5 text-secondary-foreground" />
            <span className="font-display text-xl font-extrabold text-foreground">Lv.3</span>
            <span className="text-[10px] text-muted-foreground">レベル</span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">今週の学習</p>
          <div className="flex items-center justify-between gap-1">
            {dayNames.map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                    i <= adjustedToday
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i <= adjustedToday ? "✓" : ""}
                </div>
                <span
                  className={`text-[10px] ${
                    i === adjustedToday
                      ? "font-bold text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
