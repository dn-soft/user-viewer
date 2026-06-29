import type { ReactNode } from 'react'

interface Props {
  title: string
  icon?: ReactNode
  rightSlot?: ReactNode
  children: ReactNode
}

export default function PanelCard({ title, icon, rightSlot, children }: Props) {
  return (
    <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
          {icon}
          {title}
        </h2>
        {rightSlot}
      </header>
      <div className="flex-1">{children}</div>
    </section>
  )
}
