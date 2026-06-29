export type Stone = 'listen' | 'read' | 'write' | 'speak'

export interface UserSummary {
  id: string
  name?: string
  schoolName?: string
  grade?: number
  classNum?: number
  attendanceNumber?: number
  lastLogin?: string
}

export interface Currencies {
  listenStone: number
  readStone: number
  writeStone: number
  speakStone: number
  gold: number
  bookCoin: number
}

export type ItemSlot = 'head' | 'face' | 'top' | 'bottom' | 'shoes' | 'background'

export interface EquippedItems {
  head?: string
  face?: string
  top?: string
  bottom?: string
  shoes?: string
  background?: string
}

export interface InventoryItem {
  id: string
  name: string
  slot: ItemSlot
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
  equipped: EquippedItems
  inventory: InventoryItem[]
  achievements: Achievement[]
  missions: MissionBundle
}
