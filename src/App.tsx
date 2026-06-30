import { useState } from 'react'
import SearchBar from './components/SearchBar'
import UserHeader from './components/UserHeader'
import CurrencyPanel from './components/CurrencyPanel'
import ItemPanel from './components/ItemPanel'
import AchievementPanel from './components/AchievementPanel'
import MissionPanel from './components/MissionPanel'
import { findUser } from './mocks/users'
import { ApiError, fetchUserDetail, isApiConfigured } from './api/userViewer'
import type { UserDetail } from './types'

type QueryState =
  | { kind: 'idle' }
  | { kind: 'loading'; query: string }
  | { kind: 'found'; user: UserDetail }
  | { kind: 'not-found'; query: string }
  | { kind: 'error'; query: string; message: string }

export default function App() {
  const [state, setState] = useState<QueryState>({ kind: 'idle' })
  const apiOn = isApiConfigured()

  const handleSearch = async (query: string) => {
    setState({ kind: 'loading', query })

    if (!apiOn) {
      // 환경변수 미설정 시 mock 으로 폴백 (개발/데모 편의)
      const user = findUser(query)
      setState(user ? { kind: 'found', user } : { kind: 'not-found', query })
      return
    }

    try {
      const user = await fetchUserDetail(query)
      setState({ kind: 'found', user })
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) {
        setState({ kind: 'not-found', query })
      } else {
        setState({
          kind: 'error',
          query,
          message: e instanceof Error ? e.message : '요청 중 오류가 발생했습니다',
        })
      }
    }
  }

  return (
    <div className="min-h-full bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔍</span>
              <div>
                <h1 className="text-lg font-bold text-slate-900">알공4 · 유저 뷰어</h1>
                <p className="text-xs text-slate-500">
                  유저 ID로 재화 / 아이템 / 업적 / 미션을 조회합니다
                </p>
              </div>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                apiOn
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
              title={
                apiOn
                  ? '실제 argong3 API 연동 중'
                  : 'VITE_API_BASE_URL 미설정 — 더미 데이터 사용 중'
              }
            >
              {apiOn ? 'LIVE' : 'MOCK'}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6">
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} showSamples={!apiOn} />
        </div>

        {state.kind === 'idle' && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <div className="text-5xl">👤</div>
            <p className="mt-3 text-base font-medium text-slate-700">유저 ID를 검색해 주세요</p>
            <p className="mt-1 text-sm text-slate-500">
              {apiOn ? '실제 알공4 계정 ID를 입력하세요' : '샘플 칩을 눌러보세요 (mock 모드)'}
            </p>
          </div>
        )}

        {state.kind === 'loading' && (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <div className="animate-pulse text-3xl">⏳</div>
            <p className="mt-3 text-sm text-slate-500">
              "<span className="font-mono">{state.query}</span>" 조회 중…
            </p>
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

        {state.kind === 'error' && (
          <div className="rounded-2xl border border-orange-200 bg-orange-50 py-12 text-center">
            <div className="text-4xl">⚠️</div>
            <p className="mt-3 text-base font-medium text-orange-800">조회에 실패했습니다</p>
            <p className="mt-1 font-mono text-xs text-orange-700">{state.message}</p>
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
