"use client"

import React from "react"

import { useState } from "react"
import { Volume2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Phrase } from "@/lib/phrases"
import { getCategoryColor } from "@/lib/phrases"
import { speakEnglish } from "@/lib/speech"

function MiniCard({ phrase }: { phrase: Phrase }) {
  const [flipped, setFlipped] = useState(false)

  function speak(e: React.MouseEvent) {
    e.stopPropagation()
    speakEnglish(phrase.english, { rate: 0.85 })
  }

  return (
    <Card
      className="group cursor-pointer border border-border/50 bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setFlipped(!flipped)
      }}
      role="button"
      tabIndex={0}
      aria-label={`${phrase.english} - タップして詳細表示`}
    >
      <CardContent className="p-4">
        {!flipped ? (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getCategoryColor(phrase.category)}`}
              >
                {phrase.category}
              </span>
              <button
                onClick={speak}
                className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label={`${phrase.english} を発音`}
              >
                <Volume2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mb-1 font-display text-sm font-bold leading-snug text-foreground">
              {phrase.english}
            </p>
            <p className="text-xs text-muted-foreground">{phrase.japanese}</p>
            <p className="mt-2 text-center text-[10px] text-muted-foreground/50">
              tap to flip
            </p>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-primary">
              Example
            </p>
            <p className="mb-0.5 text-xs font-medium text-foreground">
              {phrase.example}
            </p>
            <p className="mb-3 text-xs text-muted-foreground">{phrase.exampleJa}</p>
            <div className="rounded-lg bg-primary/5 p-2">
              <p className="text-[10px] text-foreground/70">{phrase.tip}</p>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground/50">
              tap to flip
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function PhraseGallery({ phrases }: { phrases: Phrase[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {phrases.map((phrase) => (
        <MiniCard key={phrase.id} phrase={phrase} />
      ))}
    </div>
  )
}
