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

    const prompt = `以下の英単語について、以下の情報を提供してください：
- 意味（日本語で簡潔に）
- 発音（読み方、カタカナ表記）
- Vtuberの配信を想定した例文（英語）
- Vtuberの配信を想定した例文（日本語訳）
- 日常会話での例文（英語）
- 日常会話での例文（日本語訳）

単語: ${searchWord}

以下の JSON 形式で返してください：

{
  "meaning": "意味（日本語）",
  "pronunciation": "発音（カタカナ）",
  "vtuberExample": "Vtuber配信での例文（英語）",
  "vtuberExampleJa": "Vtuber配信での例文（日本語訳）",
  "dailyExample": "日常会話での例文（英語）",
  "dailyExampleJa": "日常会話での例文（日本語訳）"
}

JSON のみを返してください。説明文は不要です。`

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

    // 必須フィールドのチェック
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

  // 1) fenced code block (```json ... ``` or ``` ... ```)
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)
  if (fenced?.[1]) {
    return JSON.parse(fenced[1].trim())
  }

  // 2) first JSON object in the text
  const firstObjStart = trimmed.indexOf("{")
  const lastObjEnd = trimmed.lastIndexOf("}")
  if (firstObjStart !== -1 && lastObjEnd !== -1 && lastObjEnd > firstObjStart) {
    const candidate = trimmed.slice(firstObjStart, lastObjEnd + 1)
    return JSON.parse(candidate)
  }

  // 3) as-is
  return JSON.parse(trimmed)
}
