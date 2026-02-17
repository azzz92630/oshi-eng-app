import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey || "")

export async function POST(request: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json({ error: "KEY_MISSING", details: "VercelにAPIキーが登録されていません。" }, { status: 500 })
    }

    const { word } = await request.json()
    
    // 修正ポイント：モデル名に models/ を付与
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" })

    const prompt = `以下の英単語について情報をJSON形式で返してください。
単語: ${word}

【出力ルール】
1. 発音: 略語は一文字ずつ（エルエムエーオー）。
2. 意味: 日本語で。
3. 例文の翻訳: 自然な感情表現（マジか！、ヤバい！等）に意訳してください。

JSON形式のみで返し、説明文は不要です：
{
  "meaning": "意味",
  "pronunciation": "カタカナ発音",
  "vtuberExample": "英語例文",
  "vtuberExampleJa": "自然な日本語訳",
  "dailyExample": "英語例文",
  "dailyExampleJa": "自然な日本語訳"
}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: "JSON_ERROR", details: "AIの応答がJSON形式ではありませんでした。" }, { status: 500 })
    }
    
    return NextResponse.json(JSON.parse(jsonMatch[0]))

  } catch (error: any) {
    return NextResponse.json({ 
      error: "API_REJECTION", 
      details: error.message
    }, { status: 500 })
  }
}
