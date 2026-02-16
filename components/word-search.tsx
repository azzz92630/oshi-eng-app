"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export function WordSearch() {
  const [query, setQuery] = useState("")
  // エラーを防ぐため、空の関数や未定義を防ぐ書き方にします
  const handleSearch = (e?: React.FormEvent) => {
    // もし e が存在する場合のみ preventDefault を呼ぶ（これが e is not a function の対策です）
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault()
    }
    console.log("Searching for:", query)
    // ここに検索ロジックを書く
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="単語を検索..."
            className="h-10 w-full rounded-full border border-primary/20 bg-card pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
        >
          検索
        </button>
      </form>
    </div>
  )
}
