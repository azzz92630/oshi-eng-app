export interface Phrase {
  id: string;
  english: string;
  japanese: string;
  category: 'daily' | 'stream' | 'slang';
}

export const phrases: Phrase[] = [
  {
    id: 'pog-001',
    english: 'POG / Poggers',
    japanese: 'すごい！最高！超絶プレイ！',
    category: 'slang'
  },
  {
    id: 'lmao-002',
    english: 'LMAO',
    japanese: '大爆笑（日本の「草」「ｗｗｗ」）',
    category: 'slang'
  },
  {
    id: 'ikr-003',
    english: 'IKR',
    japanese: 'それな！わかる！',
    category: 'slang'
  },
  {
    id: 'copium-004',
    english: 'COPIUM',
    japanese: '負け惜しみ、現実逃避中（希望的観測）',
    category: 'slang'
  },
  {
    id: 'gg-005',
    english: 'GG',
    japanese: 'お疲れ様！良い試合だった！',
    category: 'stream'
  },
  {
    id: 'ratio-006',
    english: 'Ratio',
    japanese: '（返信の方がいいねが多い時に）ざまぁ、論破',
    category: 'slang'
  },
  {
    id: 'cap-007',
    english: 'No cap',
    japanese: 'ガチで。嘘なしで。',
    category: 'slang'
  },
  {
    id: 'lets-go-008',
    english: 'LETS GOOOO',
    japanese: 'よしきた！よっしゃー！',
    category: 'stream'
  },
  {
    id: 'o7-009',
    english: 'o7',
    japanese: '（敬礼のポーズ）了解、お疲れ様です',
    category: 'slang'
  },
  {
    id: 'comfy-010',
    english: 'Comfy',
    japanese: '落ち着く、心地よい配信（てぇてぇ空気感）',
    category: 'stream'
  }
];

export const getTodayPhrase = () => {
  const dayOfYear = Math.floor(Date.now() / 86400000);
  return phrases[dayOfYear % phrases.length];
};

export const getWeekPhrases = () => {
  return phrases.slice(0, 7);
};
