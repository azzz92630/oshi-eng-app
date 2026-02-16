"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Loader2 } from "lucide-react"
import { WordSearchResult } from "./word-search-result"
import { useStats } from "@/components/stats-provider"

interface WordInfo {
  word: string
  meaning: string
  pronunciation: string
  vtuberExample: string
  vtuberExampleJa: string
  dailyExample: string
  dailyExampleJa: string
}

export function WordSearch() {
  const { incrementLearned } = useStats()
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<WordInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch() {
    if (!searchTerm.trim()) {
      setError("英単語を入力してください")
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/search-word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: searchTerm.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "検索に失敗しました")
      }

      setResult(data)
      incrementLearned()
    } catch (err) {
      setError(err instanceof Error ? err.message : "予期しないエラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="border border-border/50 bg-card shadow-sm">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="英単語を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) {
                    handleSearch()
                  }
                }}
                disabled={loading}
                className="pl-9"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={loading || !searchTerm.trim()}
              className="shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  検索中...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  検索
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="mt-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {result && <WordSearchResult wordInfo={result} />}
    </div>
  )
}
