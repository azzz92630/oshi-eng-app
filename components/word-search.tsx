"use client"

import React, { useState } from "react"
import { Search, X, Volume2 } from "lucide-react"
import { phrases } from "@/lib/phrases"

export function WordSearch() {
const [query, setQuery] = useState("")
const [results, setResults] = useState<any[]>([])
const [hasSearched, setHasSearched] = useState(false)

const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
if (e && typeof e.preventDefault === 'function') {
e.preventDefault()
}

if (!query.trim()) return

// 辞書データ(phrases)から検索を実行
const searchTerms = query.toLowerCase().trim()
const found = phrases.filter(p => 
  p.english.toLowerCase().includes(searchTerms) || 
  p.japanese.includes(searchTerms) ||
  p.meaning.includes(searchTerms)
)

setResults(found)
setHasSearched(true)
}

return (
<div className="w-full px-4 flex flex-col gap-4">
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
onClick={() => { setQuery(""); setResults([]); setHasSearched(false); }}
className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
>
<X className="h-4 w-4" />
</button>
)}
</div>
<button
type="submit"
className="h-12 rounded-2xl bg-primary px-6 text-sm font-bold text-white shadow-md transition-all hover:opacity-90"
>
検索
</button>
</form>

  {/* 検索結果の表示エリア */}
  {hasSearched && (
    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
      {results.length > 0 ? (
        results.map((phrase) => (
          <div key={phrase.id} className="rounded-2xl border border-primary/10 bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/5 rounded-full">
                {phrase.category}
              </span>
              <Volume2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">{phrase.english}</h3>
            <p className="text-sm text-muted-foreground mb-2">{phrase.japanese}</p>
            <div className="text-xs bg-muted/30 p-2 rounded-lg text-muted-foreground">
              {phrase.meaning}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground text-sm bg-muted/20 rounded-2xl border border-dashed">
          該当する単語が見つかりませんでした
        </div>
      )}
    </div>
  )}
</div>
)
}
