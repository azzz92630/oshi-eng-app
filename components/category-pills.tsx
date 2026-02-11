"use client"

import { Heart, MessageCircle, Zap, Award, Star } from "lucide-react"

const categories = [
  { name: "応援", icon: Heart },
  { name: "感想", icon: MessageCircle },
  { name: "リアクション", icon: Zap },
  { name: "褒め言葉", icon: Award },
  { name: "推し活", icon: Star },
]

export function CategoryPills({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (category: string | null) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
          selected === null
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        すべて
      </button>
      {categories.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => onSelect(selected === name ? null : name)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
            selected === name
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          <Icon className="h-3 w-3" />
          {name}
        </button>
      ))}
    </div>
  )
}
