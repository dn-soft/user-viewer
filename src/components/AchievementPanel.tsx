import { useEffect, useMemo, useState } from 'react'
import type { Achievement } from '../types'
import PanelCard from './PanelCard'
import { formatDateKST, formatRelative } from '../utils/date'

interface Props {
  data: Achievement[]
}

const PAGE_SIZE = 5

function ProgressBar({ value, goal }: { value: number; goal: number }) {
  const pct = Math.min(100, Math.round((value / goal) * 100))
  return (
    <div className="mt-1.5">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1 text-[11px] text-slate-500">
        {value} / {goal} ({pct}%)
      </div>
    </div>
  )
}

export default function AchievementPanel({ data }: Props) {
  const completed = data.filter((a) => a.achievedAt)
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE))
  const [page, setPage] = useState(1)

  // 새 유저 조회 등으로 data 배열 자체가 바뀌면 1페이지로 리셋
  useEffect(() => {
    setPage(1)
  }, [data])

  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * PAGE_SIZE
  const pageItems = useMemo(
    () => data.slice(start, start + PAGE_SIZE),
    [data, start],
  )

  return (
    <PanelCard
      title="업적"
      icon={<span>🏆</span>}
      rightSlot={
        <span className="text-xs font-medium text-slate-500">
          달성 {completed.length} / 전체 {data.length}
        </span>
      }
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-2.5">
          {pageItems.map((a) => {
            const done = !!a.achievedAt
            return (
              <div
                key={a.id}
                className={`rounded-lg border px-3 py-2.5 ${
                  done ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={done ? 'text-emerald-600' : 'text-slate-400'}>
                      {done ? '✓' : '○'}
                    </span>
                    <span className={`text-sm font-semibold ${done ? 'text-emerald-900' : 'text-slate-800'}`}>
                      {a.name}
                    </span>
                  </div>
                  {done && (
                    <div
                      className="shrink-0 text-right leading-tight"
                      title={a.achievedAt}
                    >
                      <div className="font-mono text-[11px] text-emerald-800">
                        {formatDateKST(a.achievedAt)}
                      </div>
                      <div className="text-[10px] text-emerald-600">
                        {formatRelative(a.achievedAt)}
                      </div>
                    </div>
                  )}
                </div>
                <p className="ml-6 mt-0.5 text-xs text-slate-600">{a.description}</p>
                {!done && a.goal !== undefined && a.progress !== undefined && (
                  <div className="ml-6">
                    <ProgressBar value={a.progress} goal={a.goal} />
                  </div>
                )}
              </div>
            )
          })}
          {data.length === 0 && (
            <div className="rounded-lg border border-dashed border-slate-200 py-8 text-center text-sm text-slate-400">
              업적 데이터가 없습니다
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← 이전
            </button>
            <span className="font-mono text-xs text-slate-500">
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              다음 →
            </button>
          </div>
        )}
      </div>
    </PanelCard>
  )
}
