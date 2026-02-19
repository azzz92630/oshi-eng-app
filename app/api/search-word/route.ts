import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey || "")

export async function POST(request: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json({ error: "KEY_MISSING", details: "APIキーが設定されていません。" }, { status: 500 })
    }

    const { word } = await request.json()
    if (!word) return NextResponse.json({ error: "NO_WORD", details: "単語が入力されていません。" }, { status: 400 })
    
    // 特定の環境で動作するモデル名を指定
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" })

    const prompt = `あなたは、日本のVtuberファン（リスナー）向けに、推し活で使える英語を教える専門家です。
以下の入力内容について、適切な「英単語」を1つ選定し、その情報をJSONで返してください。

入力内容: ${word}

【動作ルール】
1. 入力が「日本語」の場合：その意味に最も近い、Vtuberの配信やSNSでよく使われる「英単語（またはスラング）」を1つ選んで解説してください。
2. 入力が「英語」の場合：その単語の解説を行ってください。

【出力ルール】
1. pronunciation: カタカナでの読み方。略語は一文字ずつ（例：エル・エム・エー・オー）。
2. phonetic: 発音記号を / / で囲んで記載してください。
3. vtuberExample: 日本のVtuberや海外リスナーが配信で実際に使いそうな自然な英語例文。
4. tip: その単語のニュアンスや、チャット欄で使う際の具体的なコツや背景を1文で。

必ず以下のJSON形式のみで返してください。余計な解説文は含めないでください：
{
  "word": "選定された英単語（大文字）",
  "meaning": "日本語での意味",
  "pronunciation": "カタカナ発音",
  "phonetic": "発音記号",
  "vtuberExample": "英語例文",
  "vtuberExampleJa": "例文の和訳",
  "tip": "使い方のコツ・背景"
}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: "JSON_ERROR", details: "AIの回答形式が不正です。" }, { status: 500 })
    }
    
    return NextResponse.json(JSON.parse(jsonMatch[0]))

  } catch (error: any) {
    return NextResponse.json({ 
      error: "API_REJECTION", 
      details: error.message
    }, { status: 500 })
  }
}
