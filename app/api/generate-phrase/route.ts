import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { supabase } from "@/lib/supabase"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

export async function GET(request: NextRequest) {
  try {
    // 認証チェック（外部から勝手に叩かれないようにするための簡易的な仕組み）
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // ローカル開発時はスキップできるようにしておく
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" })

    const prompt = `あなたはVtuberリスナー向けの英語学習エキスパートです。
海外の配信チャットやSNSで今まさに流行っている、あるいは頻出する英単語やスラングを1つ選んでください。
既存のリストと被らないような、新鮮な言葉を選定してください。

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
    const data = JSON.parse(result.response.text().match(/\{[\s\S]*\}/)![0])

    // Supabaseに保存
    const { error } = await supabase.from('phrases').insert([data])

    if (error) throw error

    return NextResponse.json({ message: "Success", data })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
