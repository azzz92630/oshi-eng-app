"use client"

import React, { useState } from "react"
import { Volume2, ChevronDown, ChevronUp, Sparkles } from "lucide-react"
import type { Phrase } from "@/lib/phrases"

interface TodayCardProps {
  phrase: Phrase
}

export function TodayCard({ phrase }: TodayCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const playAudio = () => {
    const u = new SpeechSynthesisUtterance(phrase.english)
    u.lang = "en-US"
    window.speechSynthesis.speak(u)
  }

  return (
    <div className="mx-4 overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 items-center rounded-full bg-primary/10 px-3 py-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-primary">
                本日のフレーズ
              </span>
            </div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              {phrase.category}
            </span>
          </div>
          <Sparkles className="h-4 w-4 text-primary/20" />
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-black text-foreground mb-2">
            {phrase.english}
          </h2>
          <p className="text-lg font-bold text-primary">
            {phrase.japanese}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={playAudio}
            className="flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2 text-sm font-bold text-primary transition-all active:scale-95 hover:bg-primary/5"
          >
            <Volume2 className="h-4 w-4" />
            発音を聞く
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            {isOpen ? (
              <>閉じる <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>例文・ヒント <ChevronDown className="h-4 w-4" /></>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="mt-6 space-y-4 border-t border-dashed pt-6 animate-in fade-in slide-in-from-top-2">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Example</p>
              <div className="rounded-2xl bg-primary/5 p-4">
                <p className="text-sm font-bold leading-relaxed text-foreground">
                  {/* API検索と同じ形式、または既存のデータに合わせて表示 */}
                  {phrase.english === "No cap" ? "I'm the best player, no cap!" : "That was a huge play, POG!"}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {phrase.english === "No cap" ? "俺が最強、マジでな。" : "今のプレイまじですごかった、最高！"}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Tip</p>
              <p className="text-xs font-medium leading-relaxed text-muted-foreground px-1">
                Vtuberの配信では、嘘をついていないことを強調する時や、相手を褒める時に語尾によく付け加えられます。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
