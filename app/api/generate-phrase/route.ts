import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { supabase } from "@/lib/supabase"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

export async function GET(request: NextRequest) {
  try {
    // 【一時修正】認証チェックを一旦コメントアウトして無効化します
    /*
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }
    */

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const prompt = `あなたはVtuberリスナー向けの英語学習エキスパートです。
海外の配信チャットやSNSで今まさに流行っている、あるいは頻出する英単語やスラングを1つ選んでください。
必ず以下のJSON形式のみで返してください：
{
  "english": "英単語またはスラング",
  "japanese": "日本語での意味",
  "category": "slang または stream",
  "example_en": "配信で使われそうな英語例文",
  "example_ja": "例文の自然な和訳",
  "tip": "その言葉の背景や使い方のコツ"
}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    // JSON部分だけを抽出する処理
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error("JSONの生成に失敗しました")
    
    const data = JSON.parse(jsonMatch[0])

    // Supabaseに保存
    const { error } = await supabase.from('phrases').insert([data])

    if (error) throw error

    return NextResponse.json({ message: "Success", data })

  } catch (error: any) {
    console.error("Error details:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
