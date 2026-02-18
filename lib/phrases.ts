export interface Phrase {
  id: string;
  english: string;
  japanese: string;
  pronunciation: string; // カタカナ
  phonetic: string;      // 発音記号
  category: 'daily' | 'stream' | 'slang';
}

export const phrases: Phrase[] = [
  // 定番・感情系
  { id: 'pog-001', english: 'POG / Poggers', japanese: 'すごい！最高！', pronunciation: 'ポグ / ポガーズ', phonetic: '/pɒɡ / ˈpɒɡərz/', category: 'slang' },
  { id: 'lmao-002', english: 'LMAO', japanese: '大爆笑（草・ｗｗｗ）', pronunciation: 'エル・エム・エー・オー', phonetic: '/ˌel em eɪ ˈoʊ/', category: 'slang' },
  { id: 'ikr-003', english: 'IKR', japanese: 'それな！わかる！', pronunciation: 'アイ・ケー・アール', phonetic: '/aɪ keɪ ɑːr/', category: 'slang' },
  { id: 'copium-004', english: 'COPIUM', japanese: '現実逃避・負け惜しみ', pronunciation: 'コピウム', phonetic: '/ˈkoʊpiəm/', category: 'slang' },
  { id: 'lets-go-008', english: 'LETS GOOOO', japanese: 'よっしゃー！きたー！', pronunciation: 'レッツ・ゴー', phonetic: '/lets ɡoʊ/', category: 'stream' },
  
  // 配信・チャット特有
  { id: 'gg-005', english: 'GG', japanese: 'お疲れ様！良い試合！', pronunciation: 'ジージー', phonetic: '/dʒiː dʒiː/', category: 'stream' },
  { id: 'o7-009', english: 'o7', japanese: '（敬礼）了解・お疲れ様', pronunciation: 'オー・セブン', phonetic: '/oʊ ˈsev.ən/', category: 'slang' },
  { id: 'comfy-010', english: 'Comfy', japanese: 'てぇてぇ・心地よい配信', pronunciation: 'コムフィー', phonetic: '/ˈkʌm.fi/', category: 'stream' },
  { id: 'clutch-011', english: 'Clutch', japanese: '逆転劇・土壇場の神プレイ', pronunciation: 'クラッチ', phonetic: '/klʌtʃ/', category: 'stream' },
  { id: 'scuffed-012', english: 'Scuffed', japanese: '不具合・放送事故気味な', pronunciation: 'スカッフド', phonetic: '/skʌft/', category: 'stream' },
  
  // ネットスラング・新語
  { id: 'rizz-013', english: 'Rizz', japanese: '魅力・カリスマ', pronunciation: 'リズ', phonetic: '/rɪz/', category: 'slang' },
  { id: 'cap-007', english: 'No cap', japanese: 'マジで。嘘なし。', pronunciation: 'ノー・キャップ', phonetic: '/noʊ kæp/', category: 'slang' },
  { id: 'fr-fr-014', english: 'fr fr', japanese: '本当に。ガチのガチ。', pronunciation: 'フォー・リアル', phonetic: '/fɔːr ˈriːəl/', category: 'slang' },
  { id: 'slay-015', english: 'Slay', japanese: '最高！キマってる！', pronunciation: 'スレイ', phonetic: '/sleɪ/', category: 'slang' },
  { id: 'bet-016', english: 'Bet', japanese: '了解！オッケー！', pronunciation: 'ベット', phonetic: '/bet/', category: 'slang' },
  
  // 反応・煽り系
  { id: 'ratio-006', english: 'Ratio', japanese: '論破・ざまぁ', pronunciation: 'レイショ', phonetic: '/ˈreɪ.ʃioʊ/', category: 'slang' },
  { id: 'sus-017', english: 'Sus', japanese: '怪しい', pronunciation: 'サス', phonetic: '/sʌs/', category: 'slang' },
  { id: 'based-018', english: 'Based', japanese: '信念がある、かっけぇ', pronunciation: 'ベースド', phonetic: '/beɪst/', category: 'slang' },
  { id: 'huge-019', english: 'HUGE', japanese: 'でかい！ナイス！', pronunciation: 'ヒュージ', phonetic: '/hjuːdʒ/', category: 'stream' },
  { id: 'rip-020', english: 'RIP', japanese: 'ご愁傷様', pronunciation: 'アール・アイ・ピー', phonetic: '/ˌɑːr aɪ ˈpiː/', category: 'stream' },

  // リスナーの動き
  { id: 'lurking-021', english: 'Lurking', japanese: '潜伏中', pronunciation: 'ラーキング', phonetic: '/ˈlɜːrkɪŋ/', category: 'stream' },
  { id: 'raid-022', english: 'Raid', japanese: 'レイド', pronunciation: 'レイド', phonetic: '/reɪd/', category: 'stream' },
  { id: 'hype-023', english: 'Hype', japanese: '盛り上がってる！', pronunciation: 'ハイプ', phonetic: '/haɪp/', category: 'stream' },
  { id: 'clueless-024', english: 'Clueless', japanese: 'わかってないｗ', pronunciation: 'クルーレス', phonetic: '/ˈkluː.ləs/', category: 'slang' },
  { id: 'skill-issue-025', english: 'Skill issue', pronunciation: 'スキル・イシュー', japanese: '実力不足だなｗ', phonetic: '/skɪl ˈɪʃ.uː/', category: 'slang' },

  // その他
  { id: 'malding-026', english: 'Malding', japanese: 'ブチギレてる', pronunciation: 'モールディング', phonetic: '/ˈmɔːldɪŋ/', category: 'slang' },
  { id: 'kekw-027', english: 'KEKW', japanese: '（爆笑）', pronunciation: 'ケェク', phonetic: '/kek/', category: 'slang' },
  { id: 'hopium-028', english: 'Hopium', japanese: '過度な希望', pronunciation: 'ホーピウム', phonetic: '/ˈhoʊpiəm/', category: 'slang' },
  { id: 'tldr-029', english: 'TL;DR', japanese: '要約すると', pronunciation: 'ティー・エル・ディー・アール', phonetic: '/ˌtiː el diː ˈɑːr/', category: 'slang' },
  { id: 'cooking-030', english: 'Let him cook', japanese: '自由にさせてやれ', pronunciation: 'レット・ヒム・クック', phonetic: '/let hɪm kʊk/', category: 'slang' },

  // 追加チャット用語
  { id: 'hype-train-031', english: 'Hype Train', japanese: 'ハイプトレイン', pronunciation: 'ハイプ・トレイン', phonetic: '/haɪp treɪn/', category: 'stream' },
  { id: 'ez-032', english: 'EZ', japanese: '余裕・簡単すぎ', pronunciation: 'イージー', phonetic: '/ˈiːzi/', category: 'slang' },
  { id: 'aimbot-033', english: 'Aimbot', japanese: 'エイムが神', pronunciation: 'エイムボット', phonetic: '/ˈeɪmbɒt/', category: 'stream' },
  { id: 'throw-034', english: 'Throwing', japanese: 'やらかし、わざと負ける', pronunciation: 'スローイング', phonetic: '/ˈθroʊɪŋ/', category: 'stream' },
  { id: 'toxic-035', english: 'Toxic', japanese: '攻撃的な、有害な', pronunciation: 'トキシック', phonetic: '/ˈtɒksɪk/', category: 'slang' }
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
