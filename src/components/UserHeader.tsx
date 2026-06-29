import type { UserSummary } from '../types'

interface Props {
  data: UserSummary
}

function formatDate(iso?: string) {
  if (!iso) return '-'
  try {
    const d = new Date(iso)
    return d.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', hour12: false })
  } catch {
    return iso
  }
}

export default function UserHeader({ data }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-xl font-bold text-white">
            {(data.name?.[0] ?? data.id[0] ?? '?').toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{data.name || data.id}</h1>
              <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600">
                {data.id}
              </span>
            </div>
            <div className="mt-0.5 text-sm text-slate-600">
              {data.schoolName ?? '학교 정보 없음'}
              {data.grade !== undefined && ` · ${data.grade}학년`}
              {data.classNum !== undefined && ` ${data.classNum}반`}
              {data.attendanceNumber !== undefined && ` ${data.attendanceNumber}번`}
            </div>
          </div>
        </div>
        <div className="text-right text-xs text-slate-500">
          <div>최근 로그인</div>
          <div className="mt-0.5 font-mono text-slate-700">{formatDate(data.lastLogin)}</div>
        </div>
      </div>
    </div>
  )
}
