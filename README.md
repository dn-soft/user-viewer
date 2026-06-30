# user-viewer

알공4 유저 정보 뷰어 — 유저 ID로 검색하면 해당 유저의 **보유 재화 · 보유 아이템 · 업적 · 미션** 을 한 화면에서 확인할 수 있는 웹 뷰어입니다.

현재 1차 작업 단계로 **프론트엔드만** 구성되어 있으며, 데이터는 `src/mocks/users.ts` 더미를 사용합니다. 다음 단계로 argong3 백엔드 API 연동 예정.

## 기술 스택

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (유틸리티 스타일링)
- 데이터: Mock JSON (`src/mocks/`)
- 배포: **Cloudflare Pages** (GitHub 연동, `main` 푸시 시 자동 배포)

## 개발 실행

```bash
npm install
npm run dev      # http://localhost:5173
```

## 빌드 / 미리보기

```bash
npm run build    # tsc -b && vite build → dist/
npm run preview  # 빌드 결과를 로컬에서 서빙
```

## 폴더 구조

```
user-viewer/
├─ index.html
├─ public/
│  └─ _redirects             # SPA 라우팅 (Cloudflare Pages)
├─ src/
│  ├─ main.tsx               # 진입점
│  ├─ App.tsx                # 검색 상태 / 패널 그리드
│  ├─ index.css              # Tailwind 베이스
│  ├─ types.ts               # 도메인 타입 (재화/아이템/업적/미션)
│  ├─ mocks/
│  │  └─ users.ts            # 더미 유저 데이터 + findUser()
│  └─ components/
│     ├─ SearchBar.tsx       # 유저 ID 검색 + 샘플 칩
│     ├─ UserHeader.tsx      # 이름/학교/학년/최근 로그인
│     ├─ PanelCard.tsx       # 공통 카드 레이아웃
│     ├─ CurrencyPanel.tsx   # 4종 스톤 + 골드 + 북코인
│     ├─ ItemPanel.tsx       # 착용 아이템 + 슬롯 필터 인벤토리
│     ├─ AchievementPanel.tsx # 달성/진행률
│     └─ MissionPanel.tsx    # 일일/주간/교사 탭
├─ tailwind.config.js
├─ vite.config.ts
└─ tsconfig.json
```

## 데이터 모델

argong3 백엔드의 다음 컬렉션을 참고하여 타입을 구성했습니다.

| 패널 | argong3 컬렉션 / 필드 |
| --- | --- |
| 보유 재화 | `users_games_info` — `listenStone`, `readStone`, `writeStone`, `speakStone`, `gold`, `bookCoin` |
| 보유 아이템 | `users_games_info` — `head/face/top/bottom/...`, `headList[]` 등 |
| 업적 | `users_contents_info` — `achievements[]` |
| 미션 | `users_contents_info` — `dailyMission`, `weeklyMission`, `teacherMission` |

## 샘플 유저

`src/mocks/users.ts` 에 더미 2명이 등록되어 있습니다.

- `ax1234` — 5학년 김민준 (재화/아이템/업적/미션 모두 채워짐)
- `bx7777` — 4학년 이서연 (초기 단계 유저)

검색창에 위 ID를 입력하거나 하단의 샘플 칩을 클릭하면 됩니다.

## 배포 (Cloudflare Pages)

`main` 브랜치 푸시 시 Cloudflare Pages가 자동으로 빌드/배포합니다.

| 항목 | 값 |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `NODE_VERSION=20` (환경변수) |

SPA fallback은 `public/_redirects` 에서 `/* /index.html 200` 으로 처리합니다.

## 다음 작업 후보

- argong3 API 연동 (`mocks/users.ts` → fetch 호출 교체)
- 캐릭터 외형 시각화 (착용 아이템을 실제 이미지로 합성)
- 학습 기록 (`studies` 컬렉션) 패널 추가
- 검색 기록 / 즐겨찾기
- Cloudflare Access 로 사내 직원 SSO 보호
