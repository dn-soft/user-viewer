import { useMemo, useState } from 'react'
import type { EquippedItem, InventoryItem } from '../types'
import PanelCard from './PanelCard'

interface Props {
  equipped: EquippedItem[]
  inventory: InventoryItem[]
}

const SLOT_LABELS: Record<string, string> = {
  head: '머리',
  hair: '머리카락',
  face: '얼굴',
  top: '상의',
  bottom: '하의',
  hand: '손',
  back: '등',
  shoes: '신발',
  set: '세트',
  skin: '스킨',
  emotion: '표정',
  sky: '하늘',
  acc: '액세서리',
  riding: '탈것',
  morph: '변신',
  background: '배경',
}

const RARITY_STYLE: Record<NonNullable<InventoryItem['rarity']>, string> = {
  common: 'border-slate-200 bg-slate-50 text-slate-700',
  rare: 'border-blue-200 bg-blue-50 text-blue-700',
  epic: 'border-purple-200 bg-purple-50 text-purple-700',
  legendary: 'border-amber-300 bg-amber-50 text-amber-700',
}

function slotLabel(slot: string) {
  return SLOT_LABELS[slot] ?? slot
}

export default function ItemPanel({ equipped, inventory }: Props) {
  const [filter, setFilter] = useState<string>('all')

  const slotsInInventory = useMemo(() => {
    const seen = new Set<string>()
    for (const i of inventory) seen.add(i.slot)
    return [...seen]
  }, [inventory])

  const filtered = useMemo(
    () => (filter === 'all' ? inventory : inventory.filter((i) => i.slot === filter)),
    [filter, inventory],
  )

  const filterOptions: Array<{ key: string; label: string }> = [
    { key: 'all', label: `전체 ${inventory.length}` },
    ...slotsInInventory.map((slot) => ({
      key: slot,
      label: `${slotLabel(slot)} ${inventory.filter((i) => i.slot === slot).length}`,
    })),
  ]

  return (
    <PanelCard title="보유 아이템" icon={<span>🎒</span>}>
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">착용 중</h3>
        <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {equipped.length === 0 && (
            <div className="col-span-full rounded-lg border border-dashed border-slate-200 py-4 text-center text-xs text-slate-400">
              착용 정보 없음
            </div>
          )}
          {equipped.map((e) => (
            <div
              key={e.slot}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
            >
              <div className="text-[11px] font-medium text-slate-500">{slotLabel(e.slot)}</div>
              <div className="mt-0.5 truncate text-sm font-semibold text-slate-900">
                {e.name}
              </div>
              {e.itemId !== undefined && (
                <div className="font-mono text-[10px] text-slate-400">#{e.itemId}</div>
              )}
            </div>
          ))}
        </div>

        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">인벤토리</h3>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setFilter(opt.key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                filter === opt.key
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="grid max-h-72 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg border px-3 py-2 ${RARITY_STYLE[item.rarity ?? 'common']}`}
            >
              <div className="text-[11px] font-medium opacity-70">{slotLabel(item.slot)}</div>
              <div className="mt-0.5 truncate text-sm font-semibold">{item.name}</div>
              {item.itemId !== undefined && (
                <div className="font-mono text-[10px] opacity-50">#{item.itemId}</div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-lg border border-dashed border-slate-200 py-6 text-center text-sm text-slate-400">
              해당 카테고리에 아이템이 없습니다
            </div>
          )}
        </div>
      </div>
    </PanelCard>
  )
}
