import { useState } from 'react'
import type { MissionBundle, MissionItem } from '../types'
import PanelCard from './PanelCard'

interface Props {
  data: MissionBundle
}

type Tab = 'daily' | 'weekly' | 'teacher'

const TAB_LABELS: Record<Tab, string> = {
  daily: '일일',
  weekly: '주간',
  teacher: '교사',
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
  const [tab, setTab] = useState<Tab>('daily')

  const list = data[tab]
  const doneCount = (t: Tab) => data[t].filter((m) => m.done).length

  return (
    <PanelCard title="미션" icon={<span>🎯</span>}>
      <div className="mb-3 flex gap-1.5">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => {
          const total = data[t].length
          const done = doneCount(t)
          const active = tab === t
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {TAB_LABELS[t]}
              <span className={`ml-1.5 text-xs ${active ? 'text-slate-300' : 'text-slate-400'}`}>
                {done}/{total}
              </span>
            </button>
          )
        })}
      </div>
      <ul className="space-y-2">
        {list.map((m) => (
          <MissionRow key={m.id} m={m} />
        ))}
        {list.length === 0 && (
          <li className="rounded-lg border border-dashed border-slate-200 py-8 text-center text-sm text-slate-400">
            진행 중인 미션이 없습니다
          </li>
        )}
      </ul>
    </PanelCard>
  )
}
