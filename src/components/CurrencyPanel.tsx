import type { Currencies } from '../types'
import PanelCard from './PanelCard'

interface Props {
  data: Currencies
}

const stoneRows: Array<{
  key: keyof Currencies
  label: string
  color: string
  emoji: string
}> = [
  { key: 'listenStone', label: '듣기돌', color: 'bg-argong-listen', emoji: '👂' },
  { key: 'readStone', label: '읽기돌', color: 'bg-argong-read', emoji: '📖' },
  { key: 'writeStone', label: '쓰기돌', color: 'bg-argong-write', emoji: '✍️' },
  { key: 'speakStone', label: '말하기돌', color: 'bg-argong-speak', emoji: '🗣️' },
]

const goldRows: Array<{
  key: keyof Currencies
  label: string
  color: string
  emoji: string
}> = [
  { key: 'gold', label: '골드', color: 'bg-argong-gold', emoji: '🪙' },
  { key: 'bookCoin', label: '북코인', color: 'bg-argong-book', emoji: '📚' },
]

function formatNumber(n: number) {
  return n.toLocaleString('ko-KR')
}

function Row({ label, emoji, color, value }: { label: string; emoji: string; color: string; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5">
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${color}`}
          aria-hidden
        >
          {emoji}
        </span>
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </div>
      <span className="font-mono text-base font-bold text-slate-900">{formatNumber(value)}</span>
    </div>
  )
}

export default function CurrencyPanel({ data }: Props) {
  return (
    <PanelCard title="보유 재화" icon={<span>💎</span>}>
      <div className="grid grid-cols-1 gap-2">
        {stoneRows.map((row) => (
          <Row key={row.key} label={row.label} emoji={row.emoji} color={row.color} value={data[row.key]} />
        ))}
        <div className="my-1 border-t border-dashed border-slate-200" />
        {goldRows.map((row) => (
          <Row key={row.key} label={row.label} emoji={row.emoji} color={row.color} value={data[row.key]} />
        ))}
      </div>
    </PanelCard>
  )
}
