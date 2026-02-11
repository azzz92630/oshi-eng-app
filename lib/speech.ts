/**
 * 英語ネイティブの音声を取得する。
 * getVoices() は Chrome では voiceschanged まで空のことがあるため、
 * 必要なら voiceschanged を待ってから取得する。
 */
function getVoicesSync(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return []
  }
  return window.speechSynthesis.getVoices()
}

/**
 * 利用可能な音声の一覧を取得する（非同期対応）。
 * Chrome では初回は空なので voiceschanged を待つ。
 */
export function getVoicesAsync(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = getVoicesSync()
    if (voices.length > 0) {
      resolve(voices)
      return
    }
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(getVoicesSync())
    }
  })
}

const PREFERRED_LANGS = ["en-US", "en-GB", "en"]

/**
 * 英語ネイティブの音声を選ぶ。
 * en-US を最優先し、次に en-GB、その他 en-* の順で選ぶ。
 */
function selectEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  for (const lang of PREFERRED_LANGS) {
    const voice = voices.find(
      (v) => v.lang === lang || v.lang.startsWith(lang + "-")
    )
    if (voice) return voice
  }
  return null
}

/** 取得した英語音声のキャッシュ（voices は同一セッションで不変の想定） */
let cachedEnglishVoice: SpeechSynthesisVoice | null | undefined = undefined

/**
 * 英語（en-US 等）のネイティブ音声を1つ取得する。
 * キャッシュがあればそれを返し、なければ getVoices で取得してキャッシュする。
 */
export function getEnglishVoice(): Promise<SpeechSynthesisVoice | null> {
  if (cachedEnglishVoice !== undefined) {
    return Promise.resolve(cachedEnglishVoice)
  }
  return getVoicesAsync().then((voices) => {
    cachedEnglishVoice = selectEnglishVoice(voices)
    return cachedEnglishVoice
  })
}

/**
 * 英語テキストをネイティブ音声で読み上げる。
 * 英語の音声がなければ lang のみ en-US にした Utterance で読み上げる。
 */
export function speakEnglish(text: string, options?: { rate?: number }): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = "en-US"
  utterance.rate = options?.rate ?? 0.85

  getEnglishVoice().then((voice) => {
    if (voice) {
      utterance.voice = voice
    }
    window.speechSynthesis.speak(utterance)
  })
}
