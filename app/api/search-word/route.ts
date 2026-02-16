import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey || "")

interface WordInfo {
  meaning: string // 意味
  pronunciation: string // 発音（読み方）
  vtuberExample: string // Vtuberの配信を想定した例文
  vtuberExampleJa: string // Vtuberの配信を想定した例文（日本語訳）
  dailyExample: string // 日常会話での例文
  dailyExampleJa: string // 日常会話での例文（日本語訳）
}

export async function POST(request: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API キーが設定されていません（.env.local を確認してください）" },
        { status: 500 }
      )
    }

    const { word } = await request.json()

    if (!word || typeof word !== "string" || word.trim().length === 0) {
      return NextResponse.json(
        { error: "英単語を入力してください" },
        { status: 400 }
      )
    }

    const searchWord = word.trim().toLowerCase()

    // Gemini API で単語情報を生成
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    // --- 修正ポイント：AIへの指示（プロンプト）をより厳格にしました ---
    const prompt = `以下の英単語について、詳細な情報を提供してください。

単語: ${searchWord}

【出力ルール】
1. 発音 (pronunciation): 
   - ネイティブの発音に近いカタカナ表記にしてください。
   - LMAO, LOL, ASAP のような「略語（アルファベットの羅列）」の場合は、ローマ字読み（ラマオ等）を絶対に避け、一文字ずつの読み（例: エルエムエーオー）を記載してください。
2. 意味 (meaning): 日本語で簡潔かつ正確に。
3. Vtuber例文: その単語を使いそうな配信シチュエーションで。
4. 日常例文: 一般的な会話での使い方。

以下の JSON 形式でのみ返してください。説明文は一切不要です：

{
  "meaning": "意味",
  "pronunciation": "正確な発音（カタカナ）",
  "vtuberExample": "英語例文",
  "vtuberExampleJa": "例文の日本語訳",
  "dailyExample": "英語例文",
  "dailyExampleJa": "例文の日本語訳"
}
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const parsed = safeParseModelJson(text)
    const wordInfo: WordInfo = {
      meaning: parsed.meaning || "",
      pronunciation: parsed.pronunciation || "",
      vtuberExample: parsed.vtuberExample || "",
      vtuberExampleJa: parsed.vtuberExampleJa || "",
      dailyExample: parsed.dailyExample || "",
      dailyExampleJa: parsed.dailyExampleJa || "",
    }

    if (
      !wordInfo.meaning ||
      !wordInfo.vtuberExample ||
      !wordInfo.vtuberExampleJa ||
      !wordInfo.dailyExample ||
      !wordInfo.dailyExampleJa
    ) {
      return NextResponse.json(
        { error: "単語情報の生成に失敗しました" },
        { status: 500 }
      )
    }

    return NextResponse.json({ word: searchWord, ...wordInfo })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      {
        error:
          "検索中にエラーが発生しました: " +
          (error instanceof Error ? error.message : "不明なエラー"),
      },
      { status: 500 }
    )
  }
}

function safeParseModelJson(text: string): any {
  const trimmed = text.trim()
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)
  if (fenced?.[1]) {
    return JSON.parse(fenced[1].trim())
  }
  const firstObjStart = trimmed.indexOf("{")
  const lastObjEnd = trimmed.lastIndexOf("}")
  if (firstObjStart !== -1 && lastObjEnd !== -1 && lastObjEnd > firstObjStart) {
    const candidate = trimmed.slice(firstObjStart, lastObjEnd + 1)
    return JSON.parse(candidate)
  }
  return JSON.parse(trimmed)
}
