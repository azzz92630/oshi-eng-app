"use client"

import React, { useState } from "react"
import { Search, X } from "lucide-react"

export function WordSearch() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault()
    }
    
    if (!query.trim()) return
    
    setIsSearching(true)
    console.log("検索ワード:", query)
    
    setTimeout(() => setIsSearching(false), 2000)
  }

  return (
    <div className="w-full px-4">
      <form onSubmit={handleSearch} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="英単語やフレーズを検索"
            className="h-12 w-full rounded-2xl border border-primary/20 bg-card pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={!query.trim() || isSearching}
          className="h-12 rounded-2xl bg-primary px-6 text-sm font-bold text-white shadow-md transition-all hover:opacity-90 disabled:opacity-50"
        >
          {isSearching ? "..." : "検索"}
        </button>
      </form>
    </div>
  )
}
