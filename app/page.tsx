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
    
    // 修正ポイント：モデル名の前に "models/" を明示的に付与します
    // これで 404 エラーを回避できる可能性が非常に高いです
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" })

    const prompt = `以下の英単語について、Vtuberファンのための情報をJSON形式で返してください。
単語: ${word}

必ず以下のJSON形式のみで返し、余計な解説は含めないでください：
{
  "meaning": "意味（日本語）",
  "pronunciation": "カタカナ発音",
  "vtuberExample": "英語例文",
  "vtuberExampleJa": "日本語訳（意訳）",
  "dailyExample": "英語例文",
  "dailyExampleJa": "日本語訳"
}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: "JSON_ERROR", details: "AIの応答形式が不正です。" }, { status: 500 })
    }
    
    return NextResponse.json(JSON.parse(jsonMatch[0]))

  } catch (error: any) {
    return NextResponse.json({ 
      error: "API_REJECTION", 
      details: error.message
    }, { status: 500 })
  }
}
