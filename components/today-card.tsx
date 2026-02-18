"use client"

import React, { useState } from "react"
import { Sparkles, Volume2, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Phrase } from "@/lib/phrases"
import { getCategoryColor } from "@/lib/phrases"

interface TodayCardProps {
  phrase: Phrase
}

export function TodayCard({ phrase }: TodayCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const playAudio = (text: string) => {
    let speechText = text.toLowerCase();
    if (speechText.includes("lets goooo")) speechText = "lets gooo";
    const u = new SpeechSynthesisUtterance(speechText);
    u.lang = 'en-US';
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }

  return (
    <div className="mx-4 overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-lg transition-all hover:shadow-xl">
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase text-primary">本日のフレーズ</span>
            <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase text-white ${getCategoryColor(phrase.category)}`}>
              {phrase.category}
            </span>
          </div>
          <Sparkles className="h-5 w-5 text-primary/30" />
        </div>

        <div className="mb-8">
          <h2 className="text-4xl font-black tracking-tight text-primary">{phrase.english}</h2>
          <p className="mt-2 text-xl font-bold text-muted-foreground">{phrase.japanese}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => playAudio(phrase.english)} variant="outline" className="h-12 flex-1 rounded-2xl border-2 font-bold hover:bg-primary/5">
            <Volume2 className="mr-2 h-5 w-5" /> 発音を聞く
          </Button>
          <Button onClick={() => setIsExpanded(!isExpanded)} variant="ghost" className="h-12 flex-1 rounded-2xl font-bold text-muted-foreground">
            {isExpanded ? "閉じる" : "詳細を見る"} {isExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-8 space-y-6 border-t border-dashed pt-8 animate-in fade-in slide-in-from-top-4">
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-primary">Example</p>
              <div className="rounded-2xl bg-primary/5 p-4">
                <p className="text-lg font-bold leading-relaxed">{phrase.example}</p>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{phrase.exampleJa}</p>
              </div>
            </div>
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-orange-500">Tip</p>
              <p className="text-sm font-medium leading-relaxed text-muted-foreground">{phrase.tip}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
