import type { UserSummary } from '../types'
import { formatDateKST, formatRelative } from '../utils/date'

interface Props {
  data: UserSummary
}

const ROLE_META: Record<
  UserSummary['role'],
  { emoji: string; label: string; gradient: string; badge: string }
> = {
  student: {
    emoji: '🧒',
    label: '학생',
    gradient: 'from-sky-400 to-indigo-500',
    badge: 'bg-sky-100 text-sky-700 border-sky-200',
  },
  teacher: {
    emoji: '👩‍🏫',
    label: '교사',
    gradient: 'from-amber-400 to-rose-500',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  unknown: {
    emoji: '👤',
    label: '미상',
    gradient: 'from-slate-400 to-slate-600',
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
  },
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-base font-bold text-slate-900">{value}</div>
      {sub && <div className="mt-0.5 font-mono text-[11px] text-slate-500">{sub}</div>}
    </div>
  )
}

export default function UserHeader({ data }: Props) {
  const meta = ROLE_META[data.role] ?? ROLE_META.unknown
  const displayName = data.name || data.id

  // 학생: "5학년 3반 12번", 교사: "5학년 3반 담임" (정보 있을 때만)
  const classLine =
    data.grade !== undefined || data.classNum !== undefined
      ? [
          data.grade !== undefined ? `${data.grade}학년` : null,
          data.classNum !== undefined ? `${data.classNum}반` : null,
          data.role === 'student' && data.attendanceNumber !== undefined
            ? `${data.attendanceNumber}번`
            : null,
        ]
          .filter(Boolean)
          .join(' ')
      : null

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className={`bg-gradient-to-r ${meta.gradient} px-6 py-6`}>
        <div className="flex items-start gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/95 text-5xl shadow-lg">
            <span aria-hidden>{meta.emoji}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${meta.badge}`}
              >
                {meta.label}
              </span>
              {data.schoolLevel && data.schoolLevel !== data.role && (
                <span className="rounded-full border border-white/40 bg-white/20 px-2 py-0.5 font-mono text-[10px] text-white/90">
                  {data.schoolLevel}
                </span>
              )}
            </div>
            <h1 className="mt-1.5 truncate text-3xl font-extrabold leading-tight text-white drop-shadow-sm">
              {displayName}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/90">
              <span className="font-mono">@{data.id}</span>
              {data.schoolName && (
                <>
                  <span aria-hidden className="opacity-50">
                    ·
                  </span>
                  <span>{data.schoolName}</span>
                </>
              )}
              {classLine && (
                <>
                  <span aria-hidden className="opacity-50">
                    ·
                  </span>
                  <span>{classLine}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 bg-slate-50 px-6 py-4 sm:grid-cols-4">
        <Stat
          label="이름"
          value={data.name || '-'}
          sub={data.name ? undefined : '미설정'}
        />
        <Stat
          label="역할"
          value={meta.label}
          sub={data.schoolLevel ?? undefined}
        />
        <Stat
          label="최근 로그인"
          value={data.lastLogin ? formatDateKST(data.lastLogin) : '-'}
          sub={data.lastLogin ? formatRelative(data.lastLogin) : '기록 없음'}
        />
        <Stat
          label="누적 로그인일"
          value={
            data.loginDaysCount !== undefined
              ? `${data.loginDaysCount.toLocaleString('ko-KR')}일`
              : '-'
          }
        />
      </div>
    </section>
  )
}
