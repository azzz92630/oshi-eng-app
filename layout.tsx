"use client"; // 1行目に追加

import React, { createContext, useContext, useEffect, useState } from "react"
import type { Metadata, Viewport } from 'next'
import { M_PLUS_Rounded_1c, Nunito } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"

// --- ここにコピーした stats-provider.tsx のロジックを貼り付ける ---
// 例として、Contextの定義部分をここに直接書きます
const StatsContext = createContext<any>(null);

export function StatsProvider({ children }: { children: React.ReactNode }) {
  // ここに useState や useEffect などのロジックをそのまま入れる
  return (
    <StatsContext.Provider value={{ /* stateなどを入れる */ }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (!context) throw new Error("useStats must be used within StatsProvider");
  return context;
}
// ---------------------------------------------------------

const _mplusRounded = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-mplus',
})

const _nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
})

// 注意： "use client" を使う場合、metadata は別ファイルに分ける必要があります。
// 一旦、ビルドを通すために metadata の書き出しを消すか、
// layout.tsx を Client Component にせず、Provider部分だけを別ファイルで徹底的に直す必要があります。