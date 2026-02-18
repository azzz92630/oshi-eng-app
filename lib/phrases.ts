export interface Phrase {
  id: string;
  english: string;
  japanese: string;
  category: 'daily' | 'stream' | 'slang';
}

export const phrases: Phrase[] = [
  // 定番・感情系（毎日使いやすい）
  { id: 'pog-001', english: 'POG / Poggers', japanese: 'すごい！最高！', category: 'slang' },
  { id: 'lmao-002', english: 'LMAO', japanese: '大爆笑（草・ｗｗｗ）', category: 'slang' },
  { id: 'ikr-003', english: 'IKR', japanese: 'それな！わかる！', category: 'slang' },
  { id: 'copium-004', english: 'COPIUM', japanese: '現実逃避・負け惜しみ', category: 'slang' },
  { id: 'lets-go-008', english: 'LETS GOOOO', japanese: 'よっしゃー！きたー！', category: 'stream' },
  
  // 配信・チャット特有（これを知ってると配信が楽しい）
  { id: 'gg-005', english: 'GG', japanese: 'お疲れ様！良い試合！', category: 'stream' },
  { id: 'o7-009', english: 'o7', japanese: '（敬礼）了解・お疲れ様', category: 'slang' },
  { id: 'comfy-010', english: 'Comfy', japanese: 'てぇてぇ・心地よい配信', category: 'stream' },
  { id: 'clutch-011', english: 'Clutch', japanese: '逆転劇・土壇場の神プレイ', category: 'stream' },
  { id: 'scuffed-012', english: 'Scuffed', japanese: '不具合・放送事故気味な', category: 'stream' },
  
  // ネットスラング・最新語
  { id: 'rizz-013', english: 'Rizz', japanese: '（異性を惹きつける）魅力・カリスマ', category: 'slang' },
  { id: 'cap-007', english: 'No cap', japanese: 'マジで。嘘なし。', category: 'slang' },
  { id: 'fr-fr-014', english: 'fr fr', japanese: '本当に。ガチのガチ。（For Real）', category: 'slang' },
  { id: 'slay-015', english: 'Slay', japanese: '最高！キマってる！', category: 'slang' },
  { id: 'bet-016', english: 'Bet', japanese: '了解！オッケー！', category: 'slang' },
  
  // 反応・ツッコミ・煽り
  { id: 'ratio-006', english: 'Ratio', japanese: '論破・（返信の方がいいねが多い時）', category: 'slang' },
  { id: 'sus-017', english: 'Sus', japanese: '怪しい・（Among Us由来）', category: 'slang' },
  { id: 'based-018', english: 'Based', japanese: '（周りに流されず）自分の意見を言う、かっけぇ', category: 'slang' },
  { id: 'huge-019', english: 'HUGE', japanese: 'でかい！ナイス！大金星！', category: 'stream' },
  { id: 'rip-020', english: 'RIP', japanese: 'ご愁傷様・（ミスをした時など）', category: 'stream' },

  // リスナーの動き・配信の状態
  { id: 'lurking-021', english: 'Lurking', japanese: '潜伏中（コメントせずに見てるよ）', category: 'stream' },
  { id: 'raid-022', english: 'Raid', japanese: 'レイド（他の配信からリスナーが大移動）', category: 'stream' },
  { id: 'hype-023', english: 'Hype', japanese: '盛り上がってる！ワクワク！', category: 'stream' },
  { id: 'clueless-024', english: 'Clueless', japanese: 'わかってない・（無知な様子へのツッコミ）', category: 'slang' },
  { id: 'skill-issue-025', english: 'Skill issue', japanese: '（ミスに対して）実力不足だなｗ', category: 'slang' },

  // ゲーム・その他
  { id: 'malding-026', english: 'Malding', japanese: '（ゲームで）ブチギレてる', category: 'slang' },
  { id: 'kekw-027', english: 'KEKW', japanese: '（爆笑・おじさんの顔文字）', category: 'slang' },
  { id: 'hopium-028', english: 'Hopium', japanese: '（過度な）希望・期待', category: 'slang' },
  { id: 'tldr-029', english: 'TL;DR', japanese: '要約すると（長すぎて読んでない）', category: 'slang' },
  { id: 'cooking-030', english: 'Let him cook', japanese: '（何かやってるから）自由にさせてやれ、見てろ', category: 'slang' },

  // 追加分：よりチャットで使われる表現
  { id: 'hype-train-031', english: 'Hype Train', japanese: 'ハイプトレイン（Twitchなどの盛り上がり応援）', category: 'stream' },
  { id: 'ez-032', english: 'EZ', japanese: '余裕・簡単すぎ（煽りでも使われる）', category: 'slang' },
  { id: 'aimbot-033', english: 'Aimbot', japanese: 'エイムが神がかってる（チート級）', category: 'stream' },
  { id: 'throw-034', english: 'Throwing', japanese: 'わざと負けるようなプレイ、やらかし', category: 'stream' },
  { id: 'toxic-035', english: 'Toxic', japanese: '有害な、攻撃的なリスナー/プレイヤー', category: 'slang' }
];

// ビルドエラー防止のための関数
export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'slang': return 'bg-pink-500';
    case 'stream': return 'bg-purple-500';
    default: return 'bg-blue-500';
  }
};

// 毎日自動で「本日のフレーズ」を1つ選ぶ（API不要）
export const getTodayPhrase = () => {
  if (typeof window === 'undefined') return phrases[0]; // サーバーサイド用
  const today = new Date().toLocaleDateString();
  // 日付文字列を数値に変換して、配列の要素数で割った余りを使う
  const seed = today.split('/').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return phrases[seed % phrases.length];
};

// 常に決まった7個を「今週のフレーズ」にする（API不要）
export const getWeekPhrases = () => {
  return phrases.slice(0, 7);
};
