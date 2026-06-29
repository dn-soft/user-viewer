import { useState } from 'react'
import SearchBar from './components/SearchBar'
import UserHeader from './components/UserHeader'
import CurrencyPanel from './components/CurrencyPanel'
import ItemPanel from './components/ItemPanel'
import AchievementPanel from './components/AchievementPanel'
import MissionPanel from './components/MissionPanel'
import { findUser } from './mocks/users'
import type { UserDetail } from './types'

type QueryState =
  | { kind: 'idle' }
  | { kind: 'found'; user: UserDetail }
  | { kind: 'not-found'; query: string }

export default function App() {
  const [state, setState] = useState<QueryState>({ kind: 'idle' })

  const handleSearch = (query: string) => {
    const user = findUser(query)
    setState(user ? { kind: 'found', user } : { kind: 'not-found', query })
  }

  return (
    <div className="min-h-full bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔍</span>
            <div>
              <h1 className="text-lg font-bold text-slate-900">알공3 · 유저 뷰어</h1>
              <p className="text-xs text-slate-500">유저 ID로 재화 / 아이템 / 업적 / 미션을 조회합니다</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6">
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {state.kind === 'idle' && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <div className="text-5xl">👤</div>
            <p className="mt-3 text-base font-medium text-slate-700">유저 ID를 검색해 주세요</p>
            <p className="mt-1 text-sm text-slate-500">위 검색창에 ID를 입력하거나 샘플 칩을 눌러보세요</p>
          </div>
        )}

        {state.kind === 'not-found' && (
          <div className="rounded-2xl border border-red-200 bg-red-50 py-16 text-center">
            <div className="text-4xl">🚫</div>
            <p className="mt-3 text-base font-medium text-red-800">
              "<span className="font-mono">{state.query}</span>" 유저를 찾을 수 없습니다
            </p>
            <p className="mt-1 text-sm text-red-600">ID를 다시 확인해 주세요</p>
          </div>
        )}

        {state.kind === 'found' && (
          <div className="space-y-5">
            <UserHeader data={state.user.summary} />
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <CurrencyPanel data={state.user.currencies} />
              <ItemPanel equipped={state.user.equipped} inventory={state.user.inventory} />
              <AchievementPanel data={state.user.achievements} />
              <MissionPanel data={state.user.missions} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
