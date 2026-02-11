"use client"

import { Star } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
          <Star className="h-5 w-5 text-primary-foreground" fill="currentColor" />
        </div>
        <div>
          <h1 className="font-display text-lg font-extrabold tracking-tight text-foreground">
            OshiENGLISH
          </h1>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        毎朝7:00に届くフレーズ
      </p>
    </header>
  )
}
