"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { TodayCard } from "@/components/today-card"
import { WeeklyList } from "@/components/weekly-list"
import { StreakCard } from "@/components/streak-card"
import { CategoryPills } from "@/components/category-pills"
import { PhraseGallery } from "@/components/phrase-gallery"
import { getTodayPhrase, getWeekPhrases, phrases } from "@/lib/phrases"
import { BookOpen, Sparkles } from "lucide-react"
import { WordSearch } from "@/components/word-search"
import { StatsProvider } from "@/components/stats-provider"

export default function Page() {
const todayPhrase = getTodayPhrase()
const weekPhrases = getWeekPhrases()
const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
const [showLibrary, setShowLibrary] = useState(false)

const filteredPhrases = selectedCategory
? phrases.filter((p) => p.category === selectedCategory)
: phrases

return (
<StatsProvider>
<div className="min-h-screen bg-background">
<div className="mx-auto max-w-lg">
<Header />

      <main className="flex flex-col gap-6 px-4 pb-24">
        {/* Word Search */}
        <section aria-label="英単語検索">
          <WordSearch />
        </section>

        {/* Hero section */}
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <div className="animate-float">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-balance font-display text-xl font-extrabold text-foreground">
            推しの言葉を、英語でも。
          </h2>
          <p className="text-sm text-muted-foreground">
            Vtuber推し活に使えるフレーズを毎朝お届け
          </p>
        </div>

        {/* Today's phrase */}
        <section aria-label="今日のフレーズ">
          <TodayCard phrase={todayPhrase} />
        </section>

        {/* Streak */}
        <section aria-label="学習の進捗">
          <StreakCard />
        </section>

        {/* Weekly list */}
        <section aria-label="今週のフレーズ">
          <WeeklyList phrases={weekPhrases} todayId={todayPhrase.id} />
        </section>

        {/* Library toggle */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => setShowLibrary(!showLibrary)}
            className="flex items-center gap-2 rounded-full border border-primary/20 bg-card px-5 py-2.5 text-sm font-bold text-primary shadow-sm transition-all hover:bg-primary/5 hover:shadow-md"
          >
            <BookOpen className="h-4 w-4" />
            {showLibrary ? "ライブラリを閉じる" : "フレーズライブラリを開く"}
          </button>
        </div>

        {/* Phrase library */}
        {showLibrary && (
          <section aria-label="フレーズライブラリ" className="animate-fade-in-up">
            <div className="mb-4">
              <h3 className="mb-3 font-display text-lg font-bold text-foreground">
                フレーズライブラリ
              </h3>
              <CategoryPills
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <PhraseGallery phrases={filteredPhrases} />
            <p className="mt-4 text-center text-xs text-muted-foreground">
              全 {filteredPhrases.length} フレーズ
              {selectedCategory && ` (${selectedCategory})`}
            </p>
          </section>
        )}

        {/* Footer */}
        <footer className="pb-4 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            OshiENGLISH - 推しと一緒に英語を学ぼう
          </p>
          <p className="mt-1 text-[10px] text-muted-foreground/50">
            毎朝 7:00 にフレーズが届きます
          </p>
        </footer>
      </main>
    </div>
  </div>
</StatsProvider>
)
}