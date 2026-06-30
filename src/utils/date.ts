// 달성 시각 등 단발성 시점을 사람이 읽기 좋게 변환.
// 입력은 "YYYY-MM-DD" / ISO 문자열 / Date 객체 모두 허용.

const KST_OFFSET_MIN = 9 * 60

function toDate(input: string | Date | undefined | null): Date | null {
  if (!input) return null
  const d = input instanceof Date ? input : new Date(input)
  return Number.isNaN(d.getTime()) ? null : d
}

// "2026.04.12" 처럼 KST 기준 날짜로 표기
export function formatDateKST(input: string | Date | undefined | null): string {
  const d = toDate(input)
  if (!d) return ''
  const ms = d.getTime() + KST_OFFSET_MIN * 60_000
  const kst = new Date(ms)
  const y = kst.getUTCFullYear()
  const m = String(kst.getUTCMonth() + 1).padStart(2, '0')
  const day = String(kst.getUTCDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

// "3개월 전", "어제", "방금" 등 상대 시각.
// 기준이 미래면 "방금" 처리.
export function formatRelative(
  input: string | Date | undefined | null,
  now: Date = new Date(),
): string {
  const d = toDate(input)
  if (!d) return ''
  const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000)
  if (diffSec < 60) return '방금'
  const min = Math.floor(diffSec / 60)
  if (min < 60) return `${min}분 전`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}시간 전`
  const day = Math.floor(hr / 24)
  if (day === 1) return '어제'
  if (day < 7) return `${day}일 전`
  if (day < 30) return `${Math.floor(day / 7)}주 전`
  const month = Math.floor(day / 30)
  if (month < 12) return `${month}개월 전`
  const year = Math.floor(day / 365)
  return `${year}년 전`
}
