const CELEBRATED_STREAK3_KEY = "oshienglish-celebrated-streak3"
const CELEBRATED_LEVEL2_KEY = "oshienglish-celebrated-level2"

export function getCelebratedStreak3(): boolean {
  if (typeof window === "undefined") return false
  try {
    return localStorage.getItem(CELEBRATED_STREAK3_KEY) === "1"
  } catch {
    return false
  }
}

export function setCelebratedStreak3(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(CELEBRATED_STREAK3_KEY, "1")
  } catch {
    // ignore
  }
}

export function getCelebratedLevel2(): boolean {
  if (typeof window === "undefined") return false
  try {
    return localStorage.getItem(CELEBRATED_LEVEL2_KEY) === "1"
  } catch {
    return false
  }
}

export function setCelebratedLevel2(): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(CELEBRATED_LEVEL2_KEY, "1")
  } catch {
    // ignore
  }
}

/** 3日継続達成時の紙吹雪を画面全体に表示 */
export function fireConfetti(): void {
  if (typeof window === "undefined") return
  import("canvas-confetti").then((confetti) => {
    const count = 150
    const defaults = { origin: { y: 0.35 }, zIndex: 9999 }
    confetti.default({
      ...defaults,
      particleCount: count,
      spread: 100,
      colors: ["#c4b5fd", "#a78bfa", "#8b5cf6", "#fbbf24", "#f59e0b", "#f472b6"],
    })
    confetti.default({
      ...defaults,
      particleCount: count,
      angle: 60,
      spread: 80,
      origin: { x: 0 },
    })
    confetti.default({
      ...defaults,
      particleCount: count,
      angle: 120,
      spread: 80,
      origin: { x: 1 },
    })
  })
}
