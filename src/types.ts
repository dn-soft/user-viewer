export type Stone = 'listen' | 'read' | 'write' | 'speak'

export interface UserSummary {
  id: string
  name?: string
  schoolName?: string
  grade?: number
  classNum?: number
  attendanceNumber?: number
  lastLogin?: string
  loginDaysCount?: number
}

export interface Currencies {
  listenStone: number
  readStone: number
  writeStone: number
  speakStone: number
  gold: number
  bookCoin: number
}

// 백엔드가 보내는 슬롯이 head/face/top/bottom 외에도 hair/hand/back/set/skin/emotion/sky 등이 있어
// 문자열로 열어둔다. ItemPanel은 SLOT_LABELS 매핑이 있으면 한글 라벨, 없으면 slot 자체를 표시.
export type ItemSlot = string

export interface EquippedItem {
  slot: ItemSlot
  itemId?: number
  name: string
}

export interface InventoryItem {
  id: string
  name: string
  slot: ItemSlot
  itemId?: number
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface Achievement {
  id: string
  name: string
  description: string
  achievedAt?: string
  progress?: number
  goal?: number
}

export interface MissionItem {
  id: string
  title: string
  description?: string
  reward?: string
  done: boolean
  progress?: number
  goal?: number
}

export interface MissionBundle {
  daily: MissionItem[]
  weekly: MissionItem[]
  teacher: MissionItem[]
}

export interface UserDetail {
  summary: UserSummary
  currencies: Currencies
  equipped: EquippedItem[]
  inventory: InventoryItem[]
  achievements: Achievement[]
  missions: MissionBundle
}
