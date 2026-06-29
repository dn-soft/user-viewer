import type { Achievement } from '../types'
import PanelCard from './PanelCard'

interface Props {
  data: Achievement[]
}

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
      <div className="space-y-2.5">
        {data.map((a) => {
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
                  <span className="font-mono text-[11px] text-emerald-700">{a.achievedAt}</span>
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
    </PanelCard>
  )
}
