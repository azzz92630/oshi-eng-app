import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey || "")

export async function POST(request: NextRequest) {
  try {
    // 診断1: そもそも鍵があるか
    if (!apiKey) {
      return NextResponse.json({ error: "KEY_MISSING", details: "VercelにNEXT_PUBLIC_GEMINI_API_KEYが登録されていません。" }, { status: 500 })
    }

    const { word } = await request.json()
    
    // 診断2: モデル接続テスト（一番安定している1.5-flashを使用）
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Return a JSON for word: ${word}. 
    Format: {"meaning":"意味","pronunciation":"カタカナ","vtuberExample":"eg","vtuberExampleJa":"訳","dailyExample":"eg","dailyExampleJa":"訳"}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: "JSON_ERROR", details: "AIが変な返答をしました: " + text }, { status: 500 })
    }
    
    return NextResponse.json(JSON.parse(jsonMatch[0]))

  } catch (error: any) {
    // 診断3: エラー内容をそのまま返す
    return NextResponse.json({ 
      error: "API_REJECTION", 
      details: error.message || "不明なエラー"
    }, { status: 500 })
  }
}
