import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// サーバー側で環境変数を確実に読み込む
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey || "")

export async function POST(request: NextRequest) {
  try {
    // 1. 鍵のチェック
    if (!apiKey) {
      return NextResponse.json({ error: "APIキーが設定されていません" }, { status: 500 })
    }

    // 2. データの受け取りチェック
    const body = await request.json()
    const word = body.word || body.message // どちらの形式でも受け取れるようにガード
    
    if (!word) {
      return NextResponse.json({ error: "検索単語が空です" }, { status: 400 })
    }

    // 3. モデルの指定（2.5-flashがエラーを出す場合を考え、一旦1.5-flashで接続を確立させます）
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `以下の英単語について、詳細な情報を提供してください。
単語: ${word}

【出力ルール】
1. 発音 (pronunciation): 略語（LMAO等）は一文字ずつ。
2. 意味 (meaning): 日本語で簡潔に。
3. 例文の翻訳: 自然な感情表現に意訳してください。

以下の JSON 形式でのみ返してください。：
{
  "meaning": "意味",
  "pronunciation": "カタカナ発音",
  "vtuberExample": "英語例文",
  "vtuberExampleJa": "日本語訳",
  "dailyExample": "英語例文",
  "dailyExampleJa": "日本語訳"
}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // 4. JSON抽出の強化
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error("AIが正しい形式で回答しませんでした")
    
    const parsed = JSON.parse(jsonMatch[0])

    return NextResponse.json({ word, ...parsed })

  } catch (error: any) {
    console.error("DEBUG_LOG:", error.message)
    return NextResponse.json({ error: "AIの接続エラー: " + error.message }, { status: 500 })
  }
}
