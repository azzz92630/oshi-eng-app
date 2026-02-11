export interface Phrase {
  id: number
  english: string
  japanese: string
  pronunciation: string
  category: string
  example: string
  exampleJa: string
  tip: string
}

export const phrases: Phrase[] = [
  {
    id: 1,
    english: "I'm cheering for you!",
    japanese: "応援してるよ！",
    pronunciation: "アイム チアリング フォー ユー",
    category: "応援",
    example: "You're doing great on stream! I'm cheering for you!",
    exampleJa: "配信すごくいいね！応援してるよ！",
    tip: "cheer for ～ で「～を応援する」。推しへの定番メッセージ！",
  },
  {
    id: 2,
    english: "Your stream made my day!",
    japanese: "あなたの配信で最高の一日になった！",
    pronunciation: "ユア ストリーム メイド マイ デイ",
    category: "感想",
    example: "Thank you so much! Your stream made my day!",
    exampleJa: "ほんとにありがとう！あなたの配信で最高の一日になった！",
    tip: "made my day は「一日を素晴らしいものにしてくれた」という意味。配信後のコメントにぴったり。",
  },
  {
    id: 3,
    english: "I can't stop laughing!",
    japanese: "笑いが止まらない！",
    pronunciation: "アイ キャント ストップ ラフィング",
    category: "リアクション",
    example: "That collab was so funny, I can't stop laughing!",
    exampleJa: "あのコラボ面白すぎて、笑いが止まらない！",
    tip: "can't stop ～ing で「～するのが止められない」。面白い配信を見た時に使おう。",
  },
  {
    id: 4,
    english: "Looking forward to the next stream!",
    japanese: "次の配信楽しみにしてる！",
    pronunciation: "ルッキング フォワード トゥ ザ ネクスト ストリーム",
    category: "応援",
    example: "Great stream today! Looking forward to the next stream!",
    exampleJa: "今日の配信最高だった！次の配信楽しみにしてる！",
    tip: "look forward to ～ は「～を楽しみにする」。to の後ろは名詞か動名詞。",
  },
  {
    id: 5,
    english: "You nailed it!",
    japanese: "完璧だったよ！",
    pronunciation: "ユー ネイルド イット",
    category: "褒め言葉",
    example: "That song was amazing! You nailed it!",
    exampleJa: "あの歌すごかった！完璧だったよ！",
    tip: "nail it は「見事にやり遂げる」。歌枠やゲームクリアの時に最高の褒め言葉。",
  },
  {
    id: 6,
    english: "I fell down the rabbit hole!",
    japanese: "沼にハマっちゃった！",
    pronunciation: "アイ フェル ダウン ザ ラビット ホール",
    category: "推し活",
    example: "I just discovered her channel and I fell down the rabbit hole!",
    exampleJa: "彼女のチャンネルを見つけて、沼にハマっちゃった！",
    tip: "rabbit hole は「ウサギの穴」＝夢中になること。Vtuber界隈では特によく使われる表現！",
  },
  {
    id: 7,
    english: "That was so wholesome!",
    japanese: "めっちゃ尊い！",
    pronunciation: "ザット ワズ ソー ホールサム",
    category: "リアクション",
    example: "The way they supported each other... That was so wholesome!",
    exampleJa: "お互いを支え合ってる姿...めっちゃ尊い！",
    tip: "wholesome は「心温まる、健全な」。尊い瞬間に英語圏のファンもよく使う。",
  },
  {
    id: 8,
    english: "I'm so proud of you!",
    japanese: "誇りに思うよ！",
    pronunciation: "アイム ソー プラウド オブ ユー",
    category: "応援",
    example: "You reached 1 million subscribers! I'm so proud of you!",
    exampleJa: "登録者100万人達成！誇りに思うよ！",
    tip: "proud of ～ で「～を誇りに思う」。推しの目標達成を祝う時にぜひ。",
  },
  {
    id: 9,
    english: "Take care of yourself!",
    japanese: "体に気をつけてね！",
    pronunciation: "テイク ケア オブ ユアセルフ",
    category: "応援",
    example: "Don't overwork yourself! Take care of yourself!",
    exampleJa: "無理しないで！体に気をつけてね！",
    tip: "推しが疲れている時や長時間配信の後にかける優しい言葉。",
  },
  {
    id: 10,
    english: "You always brighten my day!",
    japanese: "いつも元気をもらってるよ！",
    pronunciation: "ユー オールウェイズ ブライトゥン マイ デイ",
    category: "感想",
    example: "No matter how tired I am, you always brighten my day!",
    exampleJa: "どんなに疲れてても、いつも元気をもらってるよ！",
    tip: "brighten は「明るくする」。推しへの感謝を伝える素敵なフレーズ。",
  },
  {
    id: 11,
    english: "Let's gooo!",
    japanese: "いくぞー！",
    pronunciation: "レッツ ゴー",
    category: "リアクション",
    example: "The new outfit reveal is starting! Let's gooo!",
    exampleJa: "新衣装お披露目始まる！いくぞー！",
    tip: "テンション爆上げの時に。oを伸ばすほど興奮度UP！チャット欄でもよく見かける。",
  },
  {
    id: 12,
    english: "That hit different.",
    japanese: "刺さった...",
    pronunciation: "ザット ヒット ディファレント",
    category: "リアクション",
    example: "Her singing tonight... That hit different.",
    exampleJa: "今夜の歌枠...刺さった...",
    tip: "hit different は「特別に心に響く」。スラング的だけど英語圏のファンがよく使う表現。",
  },
  {
    id: 13,
    english: "I'm losing it!",
    japanese: "もう無理（笑いすぎて）！",
    pronunciation: "アイム ルージング イット",
    category: "リアクション",
    example: "This gaming stream is too chaotic, I'm losing it!",
    exampleJa: "このゲーム配信カオスすぎて、もう無理！",
    tip: "lose it で「我を忘れる」。面白くて自分を保てない時に使う。",
  },
  {
    id: 14,
    english: "No way!",
    japanese: "うそでしょ！？",
    pronunciation: "ノー ウェイ",
    category: "リアクション",
    example: "A surprise collab!? No way!",
    exampleJa: "サプライズコラボ！？うそでしょ！？",
    tip: "驚きを表す定番フレーズ。サプライズ発表の時にチャットが埋まる。",
  },
  {
    id: 15,
    english: "You've got this!",
    japanese: "あなたならできる！",
    pronunciation: "ユーヴ ガット ディス",
    category: "応援",
    example: "The boss fight is tough, but you've got this!",
    exampleJa: "ボス戦大変だけど、あなたならできる！",
    tip: "推しを励ます時にぴったり。ゲーム実況で苦戦中の推しにコメントしよう。",
  },
  {
    id: 16,
    english: "I'm speechless!",
    japanese: "言葉が出ない！",
    pronunciation: "アイム スピーチレス",
    category: "リアクション",
    example: "That 3D debut was incredible... I'm speechless!",
    exampleJa: "あの3Dデビューすごすぎた...言葉が出ない！",
    tip: "speechless は「言葉を失った」。感動的なパフォーマンスに圧倒された時に。",
  },
  {
    id: 17,
    english: "Best collab ever!",
    japanese: "最高のコラボだった！",
    pronunciation: "ベスト コラボ エヴァー",
    category: "感想",
    example: "That chemistry was amazing! Best collab ever!",
    exampleJa: "あの掛け合い最高だった！最高のコラボだった！",
    tip: "～ ever で「今まで最高の～」。最上級 + ever はよく使うパターン。",
  },
  {
    id: 18,
    english: "Thanks for the memories!",
    japanese: "素敵な思い出をありがとう！",
    pronunciation: "サンクス フォー ザ メモリーズ",
    category: "感想",
    example: "What an amazing concert! Thanks for the memories!",
    exampleJa: "素晴らしいライブだった！素敵な思い出をありがとう！",
    tip: "ライブやイベントの後に使える感謝のフレーズ。",
  },
  {
    id: 19,
    english: "Stay hydrated!",
    japanese: "水分補給してね！",
    pronunciation: "ステイ ハイドレイテッド",
    category: "応援",
    example: "You've been streaming for 5 hours! Stay hydrated!",
    exampleJa: "もう5時間配信してるよ！水分補給してね！",
    tip: "Vtuberコミュニティでは定番の気遣いフレーズ。推しの健康を心配する時に。",
  },
  {
    id: 20,
    english: "This is peak content!",
    japanese: "これぞ神コンテンツ！",
    pronunciation: "ディス イズ ピーク コンテント",
    category: "褒め言葉",
    example: "A horror game at 3AM? This is peak content!",
    exampleJa: "深夜3時のホラーゲーム？これぞ神コンテンツ！",
    tip: "peak は「最高の」。配信やコンテンツを褒める時にネイティブがよく使う。",
  },
  {
    id: 21,
    english: "I've been binge-watching your videos!",
    japanese: "動画をイッキ見しちゃった！",
    pronunciation: "アイヴ ビン ビンジウォッチング ユア ヴィデオズ",
    category: "推し活",
    example: "I just found your channel and I've been binge-watching your videos!",
    exampleJa: "チャンネル見つけて動画をイッキ見しちゃった！",
    tip: "binge-watch で「一気に見る」。動画を何本も連続で見た時に使おう。",
  },
  {
    id: 22,
    english: "That was a plot twist!",
    japanese: "まさかの展開！",
    pronunciation: "ザット ワズ ア プロット ツイスト",
    category: "リアクション",
    example: "She suddenly started singing opera!? That was a plot twist!",
    exampleJa: "急にオペラ歌い出した！？まさかの展開！",
    tip: "plot twist は元々「物語のどんでん返し」。予想外の展開に対して幅広く使える。",
  },
  {
    id: 23,
    english: "You deserve all the love!",
    japanese: "たくさん愛されるべき存在だよ！",
    pronunciation: "ユー ディザーヴ オール ザ ラヴ",
    category: "褒め言葉",
    example: "You work so hard for us. You deserve all the love!",
    exampleJa: "いつも頑張ってくれてるね。たくさん愛されるべき存在だよ！",
    tip: "deserve で「～に値する」。推しへの大きな愛を伝えるフレーズ。",
  },
  {
    id: 24,
    english: "I'm down bad.",
    japanese: "完全に推しにやられた。",
    pronunciation: "アイム ダウン バッド",
    category: "推し活",
    example: "After that ASMR stream... I'm down bad.",
    exampleJa: "あのASMR配信の後...完全に推しにやられた。",
    tip: "down bad は推しにメロメロな状態を表すスラング。ファン同士の会話でよく使われる。",
  },
  {
    id: 25,
    english: "We won!",
    japanese: "勝った！（ファンとして歓喜）",
    pronunciation: "ウィー ウォン",
    category: "リアクション",
    example: "New original song announcement! We won!",
    exampleJa: "新曲発表！勝った！",
    tip: "ファンとして嬉しいニュースがあった時に「われら勝利！」という意味で使う。",
  },
  {
    id: 26,
    english: "Keep up the great work!",
    japanese: "これからも頑張って！",
    pronunciation: "キープ アップ ザ グレイト ワーク",
    category: "応援",
    example: "Your content keeps getting better! Keep up the great work!",
    exampleJa: "コンテンツがどんどん良くなってる！これからも頑張って！",
    tip: "keep up で「維持する、続ける」。継続的な努力を応援するフレーズ。",
  },
  {
    id: 27,
    english: "I'm crying, this is so beautiful!",
    japanese: "泣いてる、美しすぎる！",
    pronunciation: "アイム クライイング ディス イズ ソー ビューティフル",
    category: "リアクション",
    example: "That farewell song... I'm crying, this is so beautiful!",
    exampleJa: "あのお別れの歌...泣いてる、美しすぎる！",
    tip: "感動的なシーンで使う。歌枠やエモい配信の時にぴったり。",
  },
  {
    id: 28,
    english: "What a time to be alive!",
    japanese: "いい時代に生まれた！",
    pronunciation: "ワット ア タイム トゥ ビー アライヴ",
    category: "リアクション",
    example: "All my favorite VTubers in one concert! What a time to be alive!",
    exampleJa: "推しが全員同じライブに！いい時代に生まれた！",
    tip: "最高の瞬間を生きている喜びを表す。大型イベントやサプライズ発表の時に。",
  },
  {
    id: 29,
    english: "You're built different!",
    japanese: "あなたは別格だよ！",
    pronunciation: "ユア ビルト ディファレント",
    category: "褒め言葉",
    example: "10-hour endurance stream!? You're built different!",
    exampleJa: "10時間耐久配信！？あなたは別格だよ！",
    tip: "built different は「他とは違う特別な存在」という褒め言葉。スラングだけど広く使われる。",
  },
  {
    id: 30,
    english: "Sending love from Japan!",
    japanese: "日本から愛を送るよ！",
    pronunciation: "センディング ラヴ フロム ジャパン",
    category: "応援",
    example: "I watch every stream! Sending love from Japan!",
    exampleJa: "毎回配信見てるよ！日本から愛を送るよ！",
    tip: "海外のVtuberに日本からコメントする時に使える。国際的なファンの定番メッセージ。",
  },
  {
    id: 31,
    english: "That's my oshi!",
    japanese: "それが私の推しだよ！",
    pronunciation: "ザッツ マイ オシ",
    category: "推し活",
    example: "She donated to charity again! That's my oshi!",
    exampleJa: "また慈善活動してる！それが私の推しだよ！",
    tip: "oshi は英語圏でも通じるようになった日本語。推しの素晴らしさを誇る時に。",
  },
]

const CATEGORIES = ["応援", "感想", "リアクション", "褒め言葉", "推し活"] as const
export type Category = (typeof CATEGORIES)[number]

export function getCategoryColor(category: string): string {
  switch (category) {
    case "応援":
      return "bg-primary/15 text-primary"
    case "感想":
      return "bg-accent/40 text-accent-foreground"
    case "リアクション":
      return "bg-secondary text-secondary-foreground"
    case "褒め言葉":
      return "bg-primary/10 text-primary"
    case "推し活":
      return "bg-accent/30 text-accent-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function getTodayPhrase(): Phrase {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)
  return phrases[dayOfYear % phrases.length]
}

export function getPhraseByIndex(index: number): Phrase {
  return phrases[index % phrases.length]
}

export function getWeekPhrases(): Phrase[] {
  const today = getTodayPhrase()
  const todayIndex = phrases.findIndex((p) => p.id === today.id)
  const week: Phrase[] = []
  for (let i = 6; i >= 0; i--) {
    const idx = (todayIndex - i + phrases.length) % phrases.length
    week.push(phrases[idx])
  }
  return week
}
