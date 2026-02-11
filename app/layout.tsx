import React from "react"
import type { Metadata, Viewport } from 'next'
import { M_PLUS_Rounded_1c, Nunito } from 'next/font/google'

import './globals.css'

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

export const metadata: Metadata = {
  title: 'OshiENGLISH - Vtuberと一緒に英語を学ぼう',
  description: '毎朝7時に届く、Vtuber推し活に使える英語フレーズ。楽しく英語を学ぼう！',
}

export const viewport: Viewport = {
  themeColor: '#c4b5fd',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
