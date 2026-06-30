import type { MissionItem } from '../types'
import PanelCard from './PanelCard'

interface Props {
  data: MissionItem[]
}

function MissionRow({ m }: { m: MissionItem }) {
  const pct =
    m.goal && m.progress !== undefined
      ? Math.min(100, Math.round((m.progress / m.goal) * 100))
      : m.done
        ? 100
        : 0

  return (
    <li
      className={`rounded-lg border px-3 py-2.5 ${
        m.done ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                m.done ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300 text-transparent'
              }`}
            >
              ✓
            </span>
            <span
              className={`text-sm font-semibold ${m.done ? 'text-emerald-900' : 'text-slate-800'}`}
            >
              {m.title}
            </span>
          </div>
          {m.description && (
            <p className="ml-7 mt-1 text-xs text-slate-600">{m.description}</p>
          )}
          {m.goal !== undefined && m.progress !== undefined && (
            <div className="ml-7 mt-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full transition-all ${
                    m.done ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                {m.progress} / {m.goal}
              </div>
            </div>
          )}
        </div>
        {m.reward && (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700">
            🎁 {m.reward}
          </span>
        )}
      </div>
    </li>
  )
}

export default function MissionPanel({ data }: Props) {
  const done = data.filter((m) => m.done).length

  return (
    <PanelCard
      title="미션"
      icon={<span>🎯</span>}
      rightSlot={
        <span className="text-xs font-medium text-slate-500">
          완료 {done} / 전체 {data.length}
        </span>
      }
    >
      <ul className="space-y-2">
        {data.map((m) => (
          <MissionRow key={m.id} m={m} />
        ))}
        {data.length === 0 && (
          <li className="rounded-lg border border-dashed border-slate-200 py-8 text-center text-sm text-slate-400">
            진행 중인 미션이 없습니다
          </li>
        )}
      </ul>
    </PanelCard>
  )
}
