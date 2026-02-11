"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { speakEnglish } from "@/lib/speech"

interface WordInfo {
  word: string
  meaning: string
  pronunciation: string
  vtuberExample: string
  vtuberExampleJa: string
  dailyExample: string
  dailyExampleJa: string
}

export function WordSearchResult({ wordInfo }: { wordInfo: WordInfo }) {
  function handleSpeak(text: string) {
    speakEnglish(text, { rate: 0.85 })
  }

  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg shadow-primary/5">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-extrabold text-foreground">
              {wordInfo.word}
            </CardTitle>
            {wordInfo.pronunciation && (
              <p className="mt-1 text-sm text-muted-foreground">
                発音: {wordInfo.pronunciation}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 意味 */}
        <div>
          <h4 className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">
            意味
          </h4>
          <p className="text-sm text-foreground">{wordInfo.meaning}</p>
        </div>

        {/* Vtuber配信での例文 */}
        <div className="rounded-lg bg-primary/5 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-xs font-medium uppercase tracking-wider text-primary">
              Vtuber配信での例文
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSpeak(wordInfo.vtuberExample)}
              className="h-7 w-7 p-0"
              aria-label="例文を発音"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="text-sm font-medium text-foreground">
            {wordInfo.vtuberExample}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {wordInfo.vtuberExampleJa}
          </p>
        </div>

        {/* 日常会話での例文 */}
        <div className="rounded-lg bg-secondary/50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              日常会話での例文
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSpeak(wordInfo.dailyExample)}
              className="h-7 w-7 p-0"
              aria-label="例文を発音"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </Button>
          </div>
          <p className="text-sm font-medium text-foreground">
            {wordInfo.dailyExample}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {wordInfo.dailyExampleJa}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
