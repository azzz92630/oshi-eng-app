"use client"

import { useState } from "react"
import { Volume2, ChevronDown, ChevronUp, Sparkles, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Phrase } from "@/lib/phrases"
import { getCategoryColor } from "@/lib/phrases"
import { speakEnglish } from "@/lib/speech"

function getDeliveryTimeLabel(): string {
  const now = new Date()
  const hours = now.getHours()
  if (hours < 7) {
    return "まもなくお届け"
  }
  return "本日のフレーズ"
}

export function TodayCard({ phrase }: { phrase: Phrase }) {
  const [expanded, setExpanded] = useState(false)
  const [spoken, setSpoken] = useState(false)

  function speak() {
    speakEnglish(phrase.english, { rate: 0.85 })
    setSpoken(true)
    setTimeout(() => setSpoken(false), 2000)
  }

  return (
    <Card className="relative overflow-hidden border-2 border-primary/20 bg-card shadow-lg shadow-primary/5">
      <div className="absolute right-4 top-4">
        <Sparkles className="h-5 w-5 animate-sparkle text-primary/40" />
      </div>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1">
            <Clock className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">
              {getDeliveryTimeLabel()}
            </span>
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(phrase.category)}`}
          >
            {phrase.category}
          </span>
        </div>

        <div className="mb-2">
          <h2 className="font-display text-2xl font-extrabold leading-tight text-foreground">
            {phrase.english}
          </h2>
        </div>

        <p className="mb-1 text-base font-medium text-foreground/80">
          {phrase.japanese}
        </p>
        <p className="mb-4 text-sm text-muted-foreground">
          {phrase.pronunciation}
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={speak}
            className={`gap-1.5 rounded-full border-primary/20 text-primary transition-all hover:bg-primary/10 hover:text-primary ${spoken ? "bg-primary/10" : ""}`}
          >
            <Volume2 className="h-4 w-4" />
            {spoken ? "再生中..." : "発音を聞く"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="gap-1 rounded-full text-muted-foreground hover:text-foreground"
          >
            {expanded ? (
              <>
                閉じる
                <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                例文・ヒント
                <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>

        {expanded && (
          <div className="mt-4 animate-fade-in-up rounded-xl bg-secondary/50 p-4">
            <div className="mb-3">
              <p className="mb-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Example
              </p>
              <p className="text-sm font-medium text-foreground">
                {phrase.example}
              </p>
              <p className="text-sm text-muted-foreground">
                {phrase.exampleJa}
              </p>
            </div>
            <div className="rounded-lg bg-primary/5 p-3">
              <p className="mb-0.5 text-xs font-medium uppercase tracking-wider text-primary">
                Tip
              </p>
              <p className="text-sm text-foreground/80">{phrase.tip}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
