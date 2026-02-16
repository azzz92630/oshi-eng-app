const STORAGE_KEY = "oshienglish-stats"

export interface StoredStats {
  lastAccessDate: string // YYYY-MM-DD
  streak: number
  learnedCount: number
}

function getTodayDateString(): string {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

function parseDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number)
  return new Date(y, m - 1, d)
}

function getDayDiff(today: string, last: string): number {
  const t = parseDate(today).getTime()
  const l = parseDate(last).getTime()
  return Math.floor((t - l) / (24 * 60 * 60 * 1000))
}

/** LocalStorage から保存済みの統計を取得（存在しなければデフォルト） */
export function getStoredStats(): StoredStats {
  if (typeof window === "undefined") {
    return {
      lastAccessDate: getTodayDateString(),
      streak: 1,
      learnedCount: 0,
    }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {
        lastAccessDate: getTodayDateString(),
        streak: 1,
        learnedCount: 0,
      }
    }
    const parsed = JSON.parse(raw) as Partial<StoredStats>
    return {
      lastAccessDate: parsed.lastAccessDate ?? getTodayDateString(),
      streak: Math.max(1, Number(parsed.streak) || 1),
      learnedCount: Math.max(0, Number(parsed.learnedCount) || 0),
    }
  } catch {
    return {
      lastAccessDate: getTodayDateString(),
      streak: 1,
      learnedCount: 0,
    }
  }
}

/** LocalStorage に統計を保存 */
export function saveStoredStats(stats: StoredStats): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch {
    // ignore
  }
}

/**
 * 最終アクセス日と今日を比較し、連続日数を更新してから保存する。
 * 戻り値は更新後の { streak, learnedCount }。
 */
export function updateStreakFromLastAccess(): { streak: number; learnedCount: number } {
  const today = getTodayDateString()
  const stored = getStoredStats()
  const last = stored.lastAccessDate
  let newStreak = stored.streak

  const diff = getDayDiff(today, last)

  if (diff === 0) {
    // 同日アクセス: 連続日数はそのまま
  } else if (diff === 1) {
    // 昨日の翌日: 連続日数+1
    newStreak = stored.streak + 1
  } else {
    // それ以外: リセットして1日目
    newStreak = 1
  }

  const next: StoredStats = {
    lastAccessDate: today,
    streak: newStreak,
    learnedCount: stored.learnedCount,
  }
  saveStoredStats(next)
  return { streak: next.streak, learnedCount: next.learnedCount }
}

/** 連続日数からレベルを算出（切り捨て、最低1） */
export function getLevel(streak: number): number {
  return Math.max(1, Math.floor(streak / 3))
}

/** 学習済みを1増やして保存し、新しい learnedCount を返す */
export function incrementLearnedCount(): number {
  const stored = getStoredStats()
  const next = stored.learnedCount + 1
  saveStoredStats({
    ...stored,
    learnedCount: next,
  })
  return next
}
