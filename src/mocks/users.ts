import type { UserDetail } from '../types'

const users: Record<string, UserDetail> = {
  ax1234: {
    summary: {
      id: 'ax1234',
      name: '김민준',
      schoolName: '서울초등학교',
      grade: 5,
      classNum: 3,
      attendanceNumber: 12,
      lastLogin: '2026-06-28T14:32:00+09:00',
    },
    currencies: {
      listenStone: 142,
      readStone: 98,
      writeStone: 73,
      speakStone: 51,
      gold: 12450,
      bookCoin: 320,
    },
    equipped: {
      head: '마법사 모자',
      face: '동그란 안경',
      top: '하늘색 후드',
      bottom: '청바지',
      shoes: '운동화',
      background: '도서관',
    },
    inventory: [
      { id: 'h001', name: '마법사 모자', slot: 'head', rarity: 'rare' },
      { id: 'h002', name: '왕관', slot: 'head', rarity: 'legendary' },
      { id: 'h003', name: '야구모자', slot: 'head', rarity: 'common' },
      { id: 'f001', name: '동그란 안경', slot: 'face', rarity: 'common' },
      { id: 'f002', name: '선글라스', slot: 'face', rarity: 'rare' },
      { id: 't001', name: '하늘색 후드', slot: 'top', rarity: 'common' },
      { id: 't002', name: '히어로 망토', slot: 'top', rarity: 'epic' },
      { id: 'b001', name: '청바지', slot: 'bottom', rarity: 'common' },
      { id: 's001', name: '운동화', slot: 'shoes', rarity: 'common' },
      { id: 's002', name: '마법 부츠', slot: 'shoes', rarity: 'epic' },
      { id: 'bg001', name: '도서관', slot: 'background', rarity: 'common' },
      { id: 'bg002', name: '우주', slot: 'background', rarity: 'legendary' },
    ],
    achievements: [
      {
        id: 'a001',
        name: '첫 학습 완료',
        description: '처음으로 학습을 완료했어요',
        achievedAt: '2026-03-05',
      },
      {
        id: 'a002',
        name: '단어 100개 정복',
        description: '단어 100개를 외웠어요',
        achievedAt: '2026-04-12',
      },
      {
        id: 'a003',
        name: '연속 출석 7일',
        description: '7일 연속 학습 출석',
        achievedAt: '2026-05-01',
      },
      {
        id: 'a004',
        name: '도서관 마스터',
        description: '도서관 레벨 10 달성',
        progress: 7,
        goal: 10,
      },
      {
        id: 'a005',
        name: '말하기 챔피언',
        description: '말하기 미션 50회 통과',
        progress: 32,
        goal: 50,
      },
    ],
    missions: {
      daily: [
        { id: 'dm1', title: '오늘의 단어 5개 학습', done: true, progress: 5, goal: 5, reward: '듣기돌 ×10' },
        { id: 'dm2', title: '읽기 미션 1회 통과', done: true, progress: 1, goal: 1, reward: '읽기돌 ×10' },
        { id: 'dm3', title: '말하기 챌린지 3회', done: false, progress: 1, goal: 3, reward: '말하기돌 ×15' },
      ],
      weekly: [
        { id: 'wm1', title: '한 주 동안 단어 30개', done: false, progress: 18, goal: 30, reward: '골드 ×500' },
        { id: 'wm2', title: '도서관 책 2권 완독', done: false, progress: 1, goal: 2, reward: '북코인 ×50' },
        { id: 'wm3', title: '미션 10개 클리어', done: true, progress: 10, goal: 10, reward: '골드 ×300' },
      ],
      teacher: [
        {
          id: 'tm1',
          title: '5학년 3단원: 음식 단어 외우기',
          description: '담임 선생님이 발급한 미션',
          done: false,
          progress: 12,
          goal: 20,
          reward: '쓰기돌 ×20',
        },
        {
          id: 'tm2',
          title: '5학년 3단원: 발음 연습',
          done: true,
          progress: 5,
          goal: 5,
          reward: '말하기돌 ×20',
        },
      ],
    },
  },
  bx7777: {
    summary: {
      id: 'bx7777',
      name: '이서연',
      schoolName: '부산초등학교',
      grade: 4,
      classNum: 2,
      attendanceNumber: 8,
      lastLogin: '2026-06-29T09:15:00+09:00',
    },
    currencies: {
      listenStone: 33,
      readStone: 41,
      writeStone: 22,
      speakStone: 17,
      gold: 2800,
      bookCoin: 65,
    },
    equipped: {
      head: '리본',
      top: '하얀 티셔츠',
      bottom: '체크 스커트',
    },
    inventory: [
      { id: 'h010', name: '리본', slot: 'head', rarity: 'common' },
      { id: 'h011', name: '꽃 머리띠', slot: 'head', rarity: 'rare' },
      { id: 't010', name: '하얀 티셔츠', slot: 'top', rarity: 'common' },
      { id: 'b010', name: '체크 스커트', slot: 'bottom', rarity: 'common' },
    ],
    achievements: [
      {
        id: 'a001',
        name: '첫 학습 완료',
        description: '처음으로 학습을 완료했어요',
        achievedAt: '2026-04-02',
      },
      {
        id: 'a002',
        name: '단어 100개 정복',
        description: '단어 100개를 외웠어요',
        progress: 64,
        goal: 100,
      },
    ],
    missions: {
      daily: [
        { id: 'dm1', title: '오늘의 단어 5개 학습', done: false, progress: 2, goal: 5, reward: '듣기돌 ×10' },
        { id: 'dm2', title: '읽기 미션 1회 통과', done: false, progress: 0, goal: 1, reward: '읽기돌 ×10' },
      ],
      weekly: [
        { id: 'wm1', title: '한 주 동안 단어 30개', done: false, progress: 6, goal: 30, reward: '골드 ×500' },
      ],
      teacher: [],
    },
  },
}

export function findUser(id: string): UserDetail | undefined {
  return users[id.trim().toLowerCase()]
}

export function listUserIds(): string[] {
  return Object.keys(users)
}
