import type {
  Achievement,
  EquippedItem,
  InventoryItem,
  MissionItem,
  UserDetail,
} from '../types'

// 백엔드 (Argame3-server/src/user-viewer/dto/user-viewer.dto.ts) 의 응답 구조
interface ServerCurrency {
  listenStone: number
  readStone: number
  writeStone: number
  speakStone: number
  gold: number
  bookCoin: number
}

interface ServerEquipped {
  slot: string
  itemId: number
  name: string | null
}

interface ServerInventory {
  itemId: number
  slot: string
  name: string | null
  category: string | null
}

interface ServerAchievement {
  index: number
  type: string
  name: string | null
  desc: string | null
  grade: number
  gradeMax: number
  solveCount: number
  currentGoal: number | null
  clearDateTime: string | null
}

interface ServerMission {
  index: number
  missionName: string | null
  desc: string | null
  requireNum: number
  solveCount: number
  status: number
  rewardType: number
}

interface ServerUserDetail {
  summary: {
    id: string
    name: string | null
    schoolName: string | null
    grade: number | null
    classNum: number | null
    attendanceNumber: number | null
    lastLogin: string | null
    loginDaysCount: number | null
  }
  currencies: ServerCurrency
  equipped: ServerEquipped[]
  inventory: ServerInventory[]
  achievements: ServerAchievement[]
  missions: {
    daily: ServerMission[]
    weekly: ServerMission[]
    teacher: ServerMission[]
  }
}

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
const TOKEN = import.meta.env.VITE_VIEWER_TOKEN ?? ''

export function isApiConfigured(): boolean {
  return BASE_URL.length > 0 && TOKEN.length > 0
}

function mapEquipped(arr: ServerEquipped[]): EquippedItem[] {
  return arr.map((e) => ({
    slot: e.slot,
    itemId: e.itemId,
    name: e.name ?? `#${e.itemId}`,
  }))
}

function mapInventory(arr: ServerInventory[]): InventoryItem[] {
  return arr.map((i, idx) => ({
    id: `${i.slot}-${i.itemId}-${idx}`,
    name: i.name ?? `#${i.itemId}`,
    slot: i.slot,
    itemId: i.itemId,
  }))
}

function mapAchievements(arr: ServerAchievement[]): Achievement[] {
  return arr.map((a) => {
    const fullyCleared = a.grade >= a.gradeMax
    return {
      id: String(a.index),
      name: a.name ?? `업적 #${a.index}`,
      description: a.desc ?? '',
      achievedAt: fullyCleared && a.clearDateTime ? a.clearDateTime : undefined,
      progress: a.solveCount,
      goal: a.currentGoal ?? undefined,
    }
  })
}

function mapMissions(arr: ServerMission[]): MissionItem[] {
  return arr.map((m) => ({
    id: String(m.index),
    title: m.missionName ?? `미션 #${m.index}`,
    description: m.desc ?? undefined,
    reward: m.rewardType ? `보상 #${m.rewardType}` : undefined,
    done: m.status === 1,
    progress: m.solveCount,
    goal: m.requireNum,
  }))
}

function mapUserDetail(s: ServerUserDetail): UserDetail {
  return {
    summary: {
      id: s.summary.id,
      name: s.summary.name ?? undefined,
      schoolName: s.summary.schoolName ?? undefined,
      grade: s.summary.grade ?? undefined,
      classNum: s.summary.classNum ?? undefined,
      attendanceNumber: s.summary.attendanceNumber ?? undefined,
      lastLogin: s.summary.lastLogin ?? undefined,
      loginDaysCount: s.summary.loginDaysCount ?? undefined,
    },
    currencies: s.currencies,
    equipped: mapEquipped(s.equipped),
    inventory: mapInventory(s.inventory),
    achievements: mapAchievements(s.achievements),
    missions: {
      daily: mapMissions(s.missions.daily),
      weekly: mapMissions(s.missions.weekly),
      teacher: mapMissions(s.missions.teacher),
    },
  }
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

export async function fetchUserDetail(id: string): Promise<UserDetail> {
  if (!isApiConfigured()) {
    throw new ApiError(0, 'VITE_API_BASE_URL / VITE_VIEWER_TOKEN 미설정')
  }
  const res = await fetch(`${BASE_URL}/user-viewer/users/${encodeURIComponent(id)}`, {
    headers: { 'x-viewer-token': TOKEN },
  })
  if (res.status === 404) throw new ApiError(404, '유저를 찾을 수 없습니다')
  if (res.status === 401) throw new ApiError(401, '토큰 인증 실패')
  if (!res.ok) throw new ApiError(res.status, `요청 실패 (${res.status})`)
  // argong3 SuccessInterceptor 가 { result: true, data } 로 감싸므로 unwrap
  const raw = (await res.json()) as
    | { result: boolean; data: ServerUserDetail }
    | ServerUserDetail
  const payload = (raw as any).data ?? (raw as ServerUserDetail)
  return mapUserDetail(payload)
}
