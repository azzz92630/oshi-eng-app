"use client"

import React from "react"

import { useState } from "react"
import { Volume2, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Phrase } from "@/lib/phrases"
import { getCategoryColor } from "@/lib/phrases"
import { speakEnglish } from "@/lib/speech"

function PhraseRow({ phrase, index, isToday }: { phrase: Phrase; index: number; isToday: boolean }) {
  const [expanded, setExpanded] = useState(false)

  function speak(e: React.MouseEvent) {
    e.stopPropagation()
    speakEnglish(phrase.english, { rate: 0.85 })
  }

  const dayLabels = ["6日前", "5日前", "4日前", "3日前", "2日前", "昨日", "今日"]

  return (
    <div
      className={`group cursor-pointer rounded-xl p-3 transition-all hover:bg-secondary/60 ${isToday ? "bg-primary/5" : ""}`}
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setExpanded(!expanded)
      }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
            isToday
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          {isToday ? "!" : index + 1}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-bold text-foreground">
              {phrase.english}
            </p>
            <span
              className={`hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium sm:inline-block ${getCategoryColor(phrase.category)}`}
            >
              {phrase.category}
            </span>
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {phrase.japanese}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-muted-foreground">{dayLabels[index]}</span>
          <button
            onClick={speak}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-all hover:bg-primary/10 hover:text-primary group-hover:opacity-100"
            aria-label={`${phrase.english} を発音`}
          >
            <Volume2 className="h-3.5 w-3.5" />
          </button>
          <ChevronRight
            className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </div>
      </div>

      {expanded && (
        <div className="ml-11 mt-2 animate-fade-in-up">
          <p className="text-xs text-muted-foreground">{phrase.pronunciation}</p>
          <div className="mt-2 rounded-lg bg-secondary/70 p-3">
            <p className="text-xs font-medium text-foreground">{phrase.example}</p>
            <p className="text-xs text-muted-foreground">{phrase.exampleJa}</p>
            <p className="mt-2 text-xs text-primary">{phrase.tip}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function WeeklyList({ phrases, todayId }: { phrases: Phrase[]; todayId: number }) {
  return (
    <Card className="border border-border/50 bg-card shadow-sm">
      <CardContent className="p-4">
        <h3 className="mb-3 text-sm font-bold text-foreground">
          今週のフレーズ
        </h3>
        <div className="flex flex-col gap-1">
          {phrases.map((phrase, index) => (
            <PhraseRow
              key={phrase.id}
              phrase={phrase}
              index={index}
              isToday={phrase.id === todayId}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
