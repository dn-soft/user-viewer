import { useState } from 'react'
import { listUserIds } from '../mocks/users'

interface Props {
  onSearch: (query: string) => void
  initial?: string
  showSamples?: boolean
}

export default function SearchBar({ onSearch, initial = '', showSamples = true }: Props) {
  const [value, setValue] = useState(initial)
  const samples = listUserIds()

  const submit = (q: string) => {
    const trimmed = q.trim()
    if (!trimmed) return
    setValue(trimmed)
    onSearch(trimmed)
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(value)
        }}
        className="flex gap-2"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="유저 ID 입력 (예: ax1234)"
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-base shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800"
        >
          검색
        </button>
      </form>
      {showSamples && (
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>샘플:</span>
          {samples.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => submit(id)}
              className="rounded-full bg-slate-200 px-2.5 py-1 font-mono text-slate-700 transition hover:bg-slate-300"
            >
              {id}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
