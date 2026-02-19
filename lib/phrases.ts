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
  { id: 'pog-001', english: 'POG / Poggers', japanese: 'すごい！最高！', pronunciation: 'ポグ / ポガーズ', phonetic: '/pɒɡ / ˈpɒɡərz/', example: 'That clutch was so pog!', exampleJa: '今の逆転劇、マジで最高だった！', tip: '神プレイが出た時にチャットで連打されます。', category: 'slang' },
  { id: 'lmao-002', english: 'LMAO', japanese: '大爆笑', pronunciation: 'エル・エム・エー・オー', phonetic: '/ˌel em eɪ ˈoʊ/', example: 'LMAO he actually fell for it!', exampleJa: '爆笑、彼まじで引っかかったよ！', tip: '笑いの度合いは LOL < LMAO < ROFL の順に強くなります。', category: 'slang' },
  { id: 'ikr-003', english: 'IKR', japanese: 'それな！わかる！', pronunciation: 'アイ・ケー・アール', phonetic: '/aɪ keɪ ɑːr/', example: 'A: She is so cute. B: IKR!', exampleJa: 'A: 彼女、本当に可愛い。 B: それな！', tip: "I Know, Right? の略で、強い同意を表します。", category: 'slang' },
  { id: 'copium-004', english: 'COPIUM', japanese: '現実逃避・負け惜しみ', pronunciation: 'コピウム', phonetic: '/ˈkoʊpiəm/', example: 'The dev will buff my main soon. (Copium)', exampleJa: '運営がすぐ僕のキャラを強化してくれるはずだ（現実逃避中）', tip: '自分に言い聞かせるような負け惜しみのシーンで使われます。', category: 'slang' },
  { id: 'lets-go-008', english: 'LETS GOOOO', japanese: 'よっしゃー！きたー！', pronunciation: 'レッツ・ゴー', phonetic: '/lets ɡoʊ/', example: 'LETS GOOOO! Finally cleared the stage!', exampleJa: 'よっしゃー！ついにステージクリアしたぞ！', tip: '気合を入れる時や、目標を達成した時の定番です。', category: 'stream' },
  { id: 'gg-005', english: 'GG', japanese: 'お疲れ様！', pronunciation: 'ジージー', phonetic: '/dʒiː dʒiː/', example: 'GG everyone! See you next time.', exampleJa: 'みんなお疲れ様！また次回。', tip: 'Good Gameの略。配信の終わりによく使われます。', category: 'stream' },
  { id: 'o7-009', english: 'o7', japanese: '（敬礼）了解', pronunciation: 'オー・セブン', phonetic: '/oʊ ˈsev.ən/', example: 'Understood, Captain. o7', exampleJa: '了解しました、キャプテン（敬礼）', tip: '7が腕を曲げて敬礼している姿に見える絵文字です。', category: 'slang' },
  { id: 'comfy-010', english: 'Comfy', japanese: 'てぇてぇ・心地よい', pronunciation: 'コムフィー', phonetic: '/ˈkʌm.fi/', example: 'Such a comfy stream tonight.', exampleJa: '今夜はなんててぇてぇ配信なんだ。', tip: 'ゆったりした配信の雰囲気を褒める言葉です。', category: 'stream' },
  { id: 'clutch-011', english: 'Clutch', japanese: '逆転劇・神プレイ', pronunciation: 'クラッチ', phonetic: '/klʌtʃ/', example: 'He won the 1v3! That was clutch!', exampleJa: '1対3で勝った！今の神プレイだったね！', tip: '絶体絶命のピンチを切り抜けた時に使います。', category: 'stream' },
  { id: 'scuffed-012', english: 'Scuffed', japanese: '不具合・放送事故', pronunciation: 'スカッフド', phonetic: '/skʌft/', example: 'The audio is a bit scuffed today.', exampleJa: '今日はちょっと音声が事故ってるね。', tip: '機材トラブルや、クオリティが低い状態を指します。', category: 'stream' },
  { id: 'rizz-013', english: 'Rizz', japanese: '魅力・カリスマ', pronunciation: 'リズ', phonetic: '/rɪz/', example: 'He has so much rizz.', exampleJa: '彼は本当にカリスマ性がある。', tip: '人を惹きつける力、特に恋愛的な魅力を指す最新語です。', category: 'slang' },
  { id: 'cap-007', english: 'No cap', japanese: 'マジで。嘘なし。', pronunciation: 'ノー・キャップ', phonetic: '/noʊ kæp/', example: 'This is the best game ever, no cap.', exampleJa: 'これ史上最高のゲームだよ、ガチで。', tip: 'cap（嘘）がない、つまり「本当だよ」という意味です。', category: 'slang' },
  { id: 'fr-fr-014', english: 'fr fr', japanese: '本当にガチ。', pronunciation: 'フォー・リアル', phonetic: '/fɔːr ˈriːəl/', example: 'This stream is amazing fr fr.', exampleJa: 'この配信、ガチで最高だわ。', tip: 'For Real（マジで）を2回繰り返して強調しています。', category: 'slang' },
  { id: 'slay-015', english: 'Slay', japanese: '最高！キマってる！', pronunciation: 'スレイ', phonetic: '/sleɪ/', example: 'You slay in that outfit!', exampleJa: 'その服、最高にキマってるね！', tip: '完璧にこなしたり、かっこいい様子を褒める言葉。', category: 'slang' },
  { id: 'bet-016', english: 'Bet', japanese: '了解！オッケー！', pronunciation: 'ベット', phonetic: '/bet/', example: 'A: Wanna play? B: Bet.', exampleJa: 'A: ゲームする？ B: いいよ。', tip: '「賭けてもいい（＝間違いない）」から転じて「OK」の意。', category: 'slang' },
  { id: 'ratio-006', english: 'Ratio', japanese: '論破・ざまぁ', pronunciation: 'レイショ', phonetic: '/ˈreɪ.ʃioʊ/', example: 'Get ratioed.', exampleJa: '論破されてやんの。', tip: 'SNSで返信の方がいいねが多い時に「お前の負け」の意で使います。', category: 'slang' },
  { id: 'sus-017', english: 'Sus', japanese: '怪しい', pronunciation: 'サス', phonetic: '/sʌs/', example: 'That guy is acting sus.', exampleJa: 'あいつ、怪しい動きをしてるぞ。', tip: 'Suspiciousの略。人狼ゲームなどで定番化した言葉。', category: 'slang' },
  { id: 'based-018', english: 'Based', japanese: '信念がある、かっけぇ', pronunciation: 'ベースド', phonetic: '/beɪst/', example: 'His opinion is so based.', exampleJa: '彼の意見は本当に芯が通っていてかっこいい。', tip: '周りを気にせず自分の意見を貫く様子を称賛します。', category: 'slang' },
  { id: 'huge-019', english: 'HUGE', japanese: 'でかい！ナイス！', pronunciation: 'ヒュージ', phonetic: '/hjuːdʒ/', example: 'That victory was huge!', exampleJa: 'あの勝利はデカいぞ！', tip: 'ゲーム内での大きな進展や勝利に対して使います。', category: 'stream' },
  { id: 'rip-020', english: 'RIP', japanese: 'ご愁傷様', pronunciation: 'アール・アイ・ピー', phonetic: '/ˌɑːr aɪ ˈpiː/', example: 'RIP his internet connection.', exampleJa: '彼のネット回線に、安らかな眠りを。', tip: '誰かがミスをした時や、機材が死んだ時に軽く使います。', category: 'stream' },
  { id: 'lurking-021', english: 'Lurking', japanese: '潜伏中', pronunciation: 'ラーキング', phonetic: '/ˈlɜːrkɪŋ/', example: 'I will be lurking while I work.', exampleJa: '作業しながらROMらせてもらうね。', tip: 'コメントはしないけど見てるよ、という時に使います。', category: 'stream' },
  { id: 'raid-022', english: 'Raid', japanese: 'レイド', pronunciation: 'レイド', phonetic: '/reɪd/', example: 'Thanks for the raid!', exampleJa: 'レイドありがとう！', tip: '配信終了時にリスナーを別の配信へ送り込む機能のことです。', category: 'stream' },
  { id: 'hype-023', english: 'Hype', japanese: '盛り上がってる！', pronunciation: 'ハイプ', phonetic: '/haɪp/', example: 'The new update is hype!', exampleJa: '新アプデ、ワクワクするね！', tip: '期待感や興奮が高まっている状態を指します。', category: 'stream' },
  { id: 'clueless-024', english: 'Clueless', japanese: 'わかってないｗ', pronunciation: 'クルーレス', phonetic: '/ˈkluː.ləs/', example: 'He is clueless about the trap.', exampleJa: '彼は罠に全く気づいてないね。', tip: '本人が何も気づいていない様子を笑う時に使います。', category: 'slang' },
  { id: 'skill-issue-025', english: 'Skill issue', japanese: '実力不足だなｗ', pronunciation: 'スキル・イシュー', phonetic: '/skɪl ˈɪʃ.uː/', example: 'Dying to the first boss? Skill issue.', exampleJa: '最初のボスで死んだ？実力不足だね。', tip: 'ミスを「腕が悪いだけだ」と煽る時に使われます。', category: 'slang' },
  { id: 'malding-026', english: 'Malding', japanese: 'ブチギレてる', pronunciation: 'モールディング', phonetic: '/ˈmɔːldɪŋ/', example: 'He is malding over the lag.', exampleJa: '彼はラグのせいでブチギレてるね。', tip: 'Mad＋Baldingの造語。激怒する様子。', category: 'slang' },
  { id: 'kekw-027', english: 'KEKW', japanese: '爆笑', pronunciation: 'ケェク', phonetic: '/kek/', example: 'That mistake was KEKW.', exampleJa: 'あのミスは草だったわ。', tip: 'Twitchで爆笑している顔文字を表す言葉。', category: 'slang' },
  { id: 'hopium-028', english: 'Hopium', japanese: '過度な期待', pronunciation: 'ホーピウム', phonetic: '/ˈhoʊpiəm/', example: 'Still hoping for a sequel? That is pure hopium.', exampleJa: 'まだ続編を期待してるの？それは淡い期待だよ。', tip: '現実離れした希望のこと。', category: 'slang' },
  { id: 'tldr-029', english: 'TL;DR', japanese: '要約すると', pronunciation: 'ティー・エル・ディー・アール', phonetic: '/ˌtiː el diː ˈɑːr/', example: 'TL;DR: The game is bad.', exampleJa: '要約：このゲームはダメ。', tip: '長すぎて読めない人へのまとめ。', category: 'slang' },
  { id: 'cooking-030', english: 'Let him cook', japanese: '自由にさせてやれ', pronunciation: 'レット・ヒム・クック', phonetic: '/let hɪm kʊk/', example: 'Wait, let him cook.', exampleJa: '待て、彼にやらせてみろ。', tip: '「何か良いことを計画中」だから邪魔するな、の意。', category: 'slang' },
  { id: 'hype-train-031', english: 'Hype Train', japanese: '盛り上げタイム', pronunciation: 'ハイプ・トレイン', phonetic: '/haɪp treɪn/', example: 'The hype train has started!', exampleJa: 'ハイプトレインが始まったぞ！', tip: 'Twitch等での連続応援ボーナスタイム。', category: 'stream' },
  { id: 'ez-032', english: 'EZ', japanese: '余裕・簡単すぎ', pronunciation: 'イージー', phonetic: '/ˈiːzi/', example: 'EZ win.', exampleJa: '余裕の勝利。', tip: 'Easyの略。煽りとして使われることも。', category: 'slang' },
  { id: 'aimbot-033', english: 'Aimbot', japanese: 'エイムが神', pronunciation: 'エイムボット', phonetic: '/ˈeɪmbɒt/', example: 'Is she using aimbot?', exampleJa: '彼女、エイムボット使ってる？', tip: 'エイムが正確すぎる時の称賛。', category: 'stream' },
  { id: 'throw-034', english: 'Throwing', japanese: 'やらかし', pronunciation: 'スローイング', phonetic: '/ˈθroʊɪŋ/', example: 'Stop throwing the game!', exampleJa: '試合を投げ出さないで！', tip: '致命的なやらかしを指します。', category: 'stream' },
  { id: 'toxic-035', english: 'Toxic', japanese: '有害な、攻撃的な', pronunciation: 'トキシック', phonetic: '/ˈtɒksɪk/', example: 'The chat is getting toxic.', exampleJa: 'チャットが荒れてきたね。', tip: '攻撃的な態度や人を指します。', category: 'slang' }
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
  
  const d = new Date();
  // 年月日を単純な数字の羅列（例: 20260219）にする
  const dateString = `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`;
  const seed = parseInt(dateString, 10);
  
  return phrases[seed % phrases.length];
};

export const getWeekPhrases = () => {
  return phrases.slice(0, 7);
};
