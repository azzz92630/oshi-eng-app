import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// サーバー側で読み込み可能な複数の名前をチェック
const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey || "")

export async function POST(request: NextRequest) {
  try {
    if (!apiKey) {
      console.error("API Key is missing in environment variables")
      return NextResponse.json({ error: "APIキーが設定されていません" }, { status: 500 })
    }

    const { word } = await request.json()
    if (!word) return NextResponse.json({ error: "単語がありません" }, { status: 400 })

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    const prompt = `以下の英単語について情報をJSON形式で返してください。
単語: ${word}
【ルール】
1. 発音: 略語は一文字ずつ（エルエムエーオー）。
2. 意味: 日本語で。
3. 例文の翻訳: 自然な感情表現（マジか！、ヤバい！等）に意訳してください。カタカナ英語は禁止です。

返却形式：
{
  "meaning": "意味",
  "pronunciation": "カタカナ発音",
  "vtuberExample": "英語例文",
  "vtuberExampleJa": "自然な日本語訳",
  "dailyExample": "英語例文",
  "dailyExampleJa": "自然な日本語訳"
}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    
    // JSONを抽出する処理
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text)

    return NextResponse.json({ word, ...parsed })
  } catch (error: any) {
    console.error("API Error details:", error.message)
    return NextResponse.json({ error: "AI検索中にエラーが発生しました" }, { status: 500 })
  }
}
