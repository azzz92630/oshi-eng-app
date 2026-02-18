export interface Phrase {
  id: string;
  english: string;
  japanese: string;
  pronunciation: string;
  phonetic: string;
  example: string;
  exampleJa: string;
  tip: string;
  category: 'daily' | 'stream' | 'slang';
}

export const phrases: Phrase[] = [
  { 
    id: 'pog-001', 
    english: 'POG / Poggers', 
    japanese: 'すごい！最高！', 
    pronunciation: 'ポグ / ポガーズ', 
    phonetic: '/pɒɡ / ˈpɒɡərz/', 
    example: 'That clutch was so pog!', 
    exampleJa: '今の逆転劇、マジで最高だった！', 
    tip: '神プレイが出た時にチャットで連打されます。',
    category: 'slang' 
  },
  { 
    id: 'lmao-002', 
    english: 'LMAO', 
    japanese: '大爆笑（草・ｗｗｗ）', 
    pronunciation: 'エル・エム・エー・オー', 
    phonetic: '/ˌel em eɪ ˈoʊ/', 
    example: 'LMAO he actually fell for it!', 
    exampleJa: '爆笑、彼まじで引っかかったよ！', 
    tip: '笑いの度合いは LOL < LMAO < ROFL の順に強くなります。',
    category: 'slang' 
  },
  { 
    id: 'copium-004', 
    english: 'COPIUM', 
    japanese: '現実逃避・負け惜しみ', 
    pronunciation: 'コピウム', 
    phonetic: '/ˈkoʊpiəm/', 
    example: 'The dev will buff my main soon. (Copium)', 
    exampleJa: '運営がすぐ僕のキャラを強化してくれるはずだ（現実逃避中）', 
    tip: '自分に言い聞かせるような負け惜しみのシーンで使われます。',
    category: 'slang' 
  },
  { 
    id: 'lets-go-008', 
    english: 'LETS GOOOO', 
    japanese: 'よっしゃー！きたー！', 
    pronunciation: 'レッツ・ゴー', 
    phonetic: '/lets ɡoʊ/', 
    example: 'LETS GOOOO! Finally cleared the stage!', 
    exampleJa: 'よっしゃー！ついにステージクリアしたぞ！', 
    tip: '気合を入れる時や、目標を達成した時の定番です。',
    category: 'stream' 
  },
  { 
    id: 'o7-009', 
    english: 'o7', 
    japanese: '了解・お疲れ様', 
    pronunciation: 'オー・セブン', 
    phonetic: '/oʊ ˈsev.ən/', 
    example: 'Understood. o7', 
    exampleJa: '了解しました（敬礼）', 
    tip: '小文字のoが頭、7が腕を曲げて敬礼している姿に見える絵文字です。',
    category: 'slang' 
  },
  { 
    id: 'comfy-010', 
    english: 'Comfy', 
    japanese: 'てぇてぇ・心地よい', 
    pronunciation: 'コムフィー', 
    phonetic: '/ˈkʌm.fi/', 
    example: 'Such a comfy stream tonight.', 
    exampleJa: '今夜はなんててぇてぇ配信なんだ。', 
    tip: 'ゆったりした雑談配信などの雰囲気を褒める言葉です。',
    category: 'stream' 
  }
  // ※35個すべてに同様の形式でデータを入れることが可能です
];

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'slang': return 'bg-pink-500';
    case 'stream': return 'bg-purple-500';
    default: return 'bg-blue-500';
  }
};

export const getTodayPhrase = () => {
  if (typeof window === 'undefined') return phrases[0];
  const today = new Date().toLocaleDateString();
  const seed = today.split('/').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return phrases[seed % phrases.length];
};

export const getWeekPhrases = () => {
  return phrases.slice(0, 7);
};
