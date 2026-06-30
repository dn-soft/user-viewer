# user-viewer

알공4 유저 정보 뷰어 — 유저 ID로 검색하면 해당 유저의 **보유 재화 · 보유 아이템 · 업적 · 미션** 을 한 화면에서 확인할 수 있는 관리자용 웹 뷰어입니다.

## 기술 스택

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (유틸리티 스타일링)
- 배포: **Cloudflare Pages** (`main` 푸시 시 자동 배포)
- 백엔드: [Argame3-server `src/user-viewer`](../Argame3-server/src/user-viewer) (NestJS, MongoDB)

## 주요 기능

### 검색 & 모드
- **유저 ID 검색** → 단일 화면에 모든 패널 렌더
- **MOCK / LIVE 자동 전환**: 환경변수 미설정 시 `src/mocks/users.ts` 더미 데이터, 설정 시 실제 API 호출
- **로딩 / 에러 / Not Found** 상태 분기 표시
- 헤더 우측 배지로 현재 모드 (`LIVE` / `MOCK`) 시각화

### 유저 헤더
- 학생/교사 역할에 따라 아바타 아이콘과 그라데이션 색상 분기
  - 🧒 학생 (sky → indigo)
  - 👩‍🏫 교사 (amber → rose)
  - 👤 미상 (slate)
- 이름 / 학교 / 학년 / 반 / 출석번호 / 최근 로그인 (KST + 상대시간) / 누적 로그인일

### 보유 재화 패널
- 7개 재화 단일 리스트 (영문 필드명 표시)
  - `listenStone`, `readStone`, `writeStone`, `speakStone`, `gold`, `bookCoin`, `arcadeTicket`

### 보유 아이템 패널
- 착용 슬롯 표시 (head, hair, face, top, bottom, hand, back, set, skin, emotion, sky 등)
- 인벤토리 슬롯별 필터 칩
- 아이템 이름 + 인덱스 병기

### 업적 패널
- **5개씩 페이지네이션** (이전/다음 컨트롤)
- 달성 / 미달성 시각 분리 (색상 + 체크 아이콘)
- 진행률 바 (현재 등급 / 최종 등급)
- 달성 시각: `YYYY.MM.DD` + `N개월 전` 상대시간 병기

### 미션 패널
- 일일 미션 단일 리스트
- 미션 이름 + 설명 + 진행률 바 + 보상 표시
- 완료 / 진행 중 시각 분리

## 환경변수

`.env` (gitignored) 에서 설정합니다.

| 키 | 기본값 | 설명 |
| --- | --- | --- |
| `VITE_PORT` | `5173` | dev 서버 포트 |
| `VITE_API_BASE_URL` | (없음) | argong3-server URL. 미설정 시 MOCK 모드 |
| `VITE_VIEWER_TOKEN` | (없음) | `x-viewer-token` 헤더 값. 미설정 시 MOCK 모드 |

## 개발 / 빌드

```bash
npm install
npm run dev       # http://localhost:5173 (또는 VITE_PORT)
npm run build     # tsc -b && vite build → dist/
npm run preview   # 빌드 결과 서빙
```

## 폴더 구조

```
user-viewer/
├─ index.html
├─ public/
│  └─ _redirects                  # SPA fallback (Cloudflare Pages)
├─ src/
│  ├─ main.tsx                    # 진입점
│  ├─ App.tsx                     # 검색 상태 / LIVE·MOCK 분기 / 패널 그리드
│  ├─ index.css                   # Tailwind 베이스
│  ├─ vite-env.d.ts               # ImportMetaEnv 타입
│  ├─ types.ts                    # 도메인 타입 (UserDetail, Currencies, ...)
│  ├─ api/
│  │  └─ userViewer.ts            # fetchUserDetail() + 응답 매퍼 + isApiConfigured()
│  ├─ mocks/
│  │  └─ users.ts                 # 더미 유저 + findUser()
│  ├─ utils/
│  │  └─ date.ts                  # KST 포맷 + 상대 시간
│  └─ components/
│     ├─ SearchBar.tsx            # ID 입력 + 샘플 칩 (MOCK 모드만)
│     ├─ UserHeader.tsx           # 역할별 아바타 + 학생/학교 정보
│     ├─ PanelCard.tsx            # 공통 카드 레이아웃
│     ├─ CurrencyPanel.tsx        # 재화 단일 리스트
│     ├─ ItemPanel.tsx            # 착용 + 슬롯별 필터 인벤토리
│     ├─ AchievementPanel.tsx     # 페이지네이션 + 날짜 포맷
│     └─ MissionPanel.tsx         # 일일 미션 리스트
├─ tailwind.config.js
├─ vite.config.ts                 # VITE_PORT loadEnv 적용
└─ tsconfig.json
```

## 백엔드 API

`GET /user-viewer/users/:id` 한 번 호출로 모든 패널 데이터를 받습니다.

| 응답 필드 | 출처 컬렉션 / 데이터 |
| --- | --- |
| `summary` | `users_unique_info`, `users_school_info` (`schoolLevel`로 role 결정), `users_login_info` |
| `currencies` | `users_games_info` + `e-library` (`bookCoin`, `arcadeTicket`) |
| `equipped` / `inventory` | `users_games_info` + `data/gameItem.json`·`skin.json`·`ridingShop.json`·`morphShop.json`·`constructionList.json` 조인 |
| `achievements` | `users_contents_info.achievements[]` + `data/trophyDesc.json` 조인 |
| `missions` | `users_contents_info.dailyMission[]` + `data/mission.json` 조인 |

요청 헤더에 `x-viewer-token: $VIEWER_TOKEN` 필수.

## 배포 (Cloudflare Pages)

| 항목 | 값 |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `NODE_VERSION=20` |
| Env vars (LIVE 모드용) | `VITE_API_BASE_URL`, `VITE_VIEWER_TOKEN` |

SPA fallback은 `public/_redirects` 의 `/* /index.html 200`.

## 샘플 유저 (MOCK 모드)

| ID | 역할 | 이름 |
| --- | --- | --- |
| `ax1234` | 학생 | 김민준 — 모든 패널 채움 |
| `bx7777` | 교사 | 이서연 — 초기 상태 |
