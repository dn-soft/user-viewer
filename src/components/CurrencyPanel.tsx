import type { Currencies } from '../types'
import PanelCard from './PanelCard'

interface Props {
  data: Currencies
}

interface Row {
  key: keyof Currencies
  color: string
  emoji: string
}

const rows: Row[] = [
  { key: 'listenStone', color: 'bg-argong-listen', emoji: '👂' },
  { key: 'readStone', color: 'bg-argong-read', emoji: '📖' },
  { key: 'writeStone', color: 'bg-argong-write', emoji: '✍️' },
  { key: 'speakStone', color: 'bg-argong-speak', emoji: '🗣️' },
  { key: 'gold', color: 'bg-argong-gold', emoji: '🪙' },
  { key: 'bookCoin', color: 'bg-argong-book', emoji: '📚' },
  { key: 'arcadeTicket', color: 'bg-pink-500', emoji: '🎟️' },
]

function formatNumber(n: number) {
  return n.toLocaleString('ko-KR')
}

function RowItem({ row, value }: { row: Row; value: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5">
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${row.color}`}
          aria-hidden
        >
          {row.emoji}
        </span>
        <span className="font-mono text-sm font-medium text-slate-800">{row.key}</span>
      </div>
      <span className="font-mono text-base font-bold text-slate-900">{formatNumber(value)}</span>
    </div>
  )
}

export default function CurrencyPanel({ data }: Props) {
  return (
    <PanelCard title="보유 재화" icon={<span>💎</span>}>
      <div className="grid grid-cols-1 gap-2">
        {rows.map((row) => (
          <RowItem key={row.key} row={row} value={data[row.key]} />
        ))}
      </div>
    </PanelCard>
  )
}
