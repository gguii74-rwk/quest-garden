# Quest Garden 이어받기 문서

작성일: 2026-06-28  
작성 기준 시간대: Asia/Seoul  
현재 주 구현 대상: `web/` Next.js 앱  
참고용 프로토타입: `prototype/` Vite 앱  

## 1. 현재 상태 요약

Quest Garden은 초등학교 1학년 아이가 숙제, 독서, 생활 습관을 게임처럼 수행하도록 돕는 웹 앱이다. 최종 시각 방향은 `동화 정원`이며, 기본 캐릭터는 하얀색 페르시안 고양이 `솜이`다.

현재까지 완료된 산출물:

- PRD: `docs/PRD.md`
- 시각 목업 비교 페이지: `docs/mockups/index.html`
- 최종 선택 목업 이미지: `docs/mockups/assets/selected-storybook-white-persian-cat.png`
- 실험용 Vite 프로토타입: `prototype/`
- 본 구현용 Next.js 앱: `web/`
- Supabase 초기 마이그레이션: `supabase/migrations/0001_initial_schema.sql`
- Supabase Auth/DB 연결 코드와 핵심 Server Action: `web/src/app/actions/*`
- 테스트 전략: `docs/TEST_STRATEGY.md`
- Supabase 보안 리뷰: `docs/SUPABASE_SECURITY_REVIEW.md`

현재 사용자는 인앱 브라우저에서 `file:///C:/workspace/quest-garden/docs/mockups/index.html`을 보고 있다. 본 구현 앱은 별도 URL인 `http://127.0.0.1:3000`에서 실행된다.

## 2. 중요 결정 사항

- 최종 디자인 방향은 `동화 정원`.
- 대표 캐릭터는 하얀색 페르시안 고양이 `솜이`.
- 아이 모드는 텍스트를 줄이고, 큰 버튼, 아이콘, 밝은 색, 정원 성장 피드백을 우선한다.
- 부모 모드는 같은 톤을 유지하되 `1분 관리`가 가능해야 한다.
- 현재 실제 개발의 기준 폴더는 `web/`이다.
- `prototype/`은 참고와 비교용으로 보존한다. 새 기능은 기본적으로 `web/`에 구현한다.

## 3. 실행 방법

본 구현 앱:

```powershell
cd C:\workspace\quest-garden\web
npm.cmd install
npm.cmd run dev
```

접속:

```text
http://127.0.0.1:3000
```

빌드 검증:

```powershell
cd C:\workspace\quest-garden\web
npm.cmd run build
```

마지막 확인 결과:

- `npm.cmd run lint` 통과, warning 0
- `npm.cmd run build` 통과
- `http://127.0.0.1:3000`, `/login`, `/onboarding` 응답 `200`
- `npm.cmd run start` production 서버에서 `/`, `/login`, `/onboarding` 응답 `200`
- Chrome headless 홈 화면 렌더링 캡처: `C:\tmp\quest-garden-home.png`
- SSR HTML에 주요 콘텐츠 포함, error overlay marker 없음

참고용 Vite 프로토타입:

```powershell
cd C:\workspace\quest-garden\prototype
npm.cmd run dev -- --port 5173
```

접속:

```text
http://127.0.0.1:5173
```

## 4. 본 구현 앱 구조

주요 파일:

- `web/src/app/page.tsx`: 앱 진입점
- `web/src/app/layout.tsx`: 루트 레이아웃과 메타데이터
- `web/src/app/globals.css`: 동화 정원 UI 전역 스타일
- `web/src/features/quest-garden/QuestGardenApp.tsx`: 아이 모드, 부모 대시보드, 축하 레이어 조합
- `web/src/features/quest-garden/useQuestGardenState.ts`: mock fallback과 Supabase Server Action을 연결하는 핵심 게임 루프
- `web/src/features/quest-garden/loadQuestGardenHome.ts`: Supabase 홈 데이터 loader
- `web/src/app/actions/missions.ts`: 미션 제출, 반려, 승인 action
- `web/src/app/actions/rewards.ts`: 보상 요청 action
- `web/src/app/actions/reading.ts`: 읽기 기록 action
- `web/src/lib/questGardenData.ts`: 미션, 책, 스티커, 보상 상수와 타입
- `web/src/components/child/*`: 아이 모드 화면 컴포넌트
- `web/src/components/parent/ParentDashboard.tsx`: 부모 승인/관리 패널
- `web/src/components/ui/CelebrationLayer.tsx`: 축하 모달

이미지 자산:

- `web/public/assets/somi-persian-cat.png`
- `web/public/assets/storybook-garden-scene.png`
- `web/public/assets/ice-cream-reward.png`

현재 구현된 동작:

- 아이 모드 오늘의 가든 표시
- 미션 완료 제출
- 부모 대시보드 승인, 되돌림, 전체 승인
- Supabase 모드에서 승인 시 원장과 별, 포인트, XP, 레벨 DB 갱신
- 보상 진행률 표시
- Supabase 모드에서 아이스크림 보상 요청 저장
- Supabase 모드에서 책장 기록 저장
- 스티커 상태 계산
- 피아노 미션 빠른 추가
- 오늘 상태 초기화
- 태블릿/모바일 반응형 레이아웃

## 5. Supabase 상태

초기 마이그레이션 파일:

```text
supabase/migrations/0001_initial_schema.sql
```

추가 마이그레이션:

```text
supabase/migrations/20260628004205_add_profile_self_insert_policy.sql
supabase/migrations/20260628011023_mission_server_actions.sql
supabase/migrations/20260628011503_reward_request_flow.sql
```

포함된 주요 테이블:

- `profiles`
- `children`
- `missions`
- `mission_schedules`
- `mission_instances`
- `point_transactions`
- `rewards`
- `reward_redemptions`
- `reading_entries`
- `daily_summaries`

RLS 정책도 MVP 기준으로 포함했다. 부모는 자신의 `children.parent_id = auth.uid()`에 연결된 데이터만 접근하도록 설계되어 있다.
`20260628011023_mission_server_actions.sql`에는 Supabase 2026-04-28 Data API 노출 변경을 고려한 `authenticated` role grant와 승인 RPC가 포함되어 있다.
승인 RPC는 `security invoker`로 작성되어 호출자의 RLS를 따른다.

환경 변수 예시:

```text
web/.env.example
```

현재 `web/.env.local`이 없어서 실제 Supabase 프로젝트 검증은 아직 수행하지 못했다. 환경변수가 없으면 `web/` 앱은 로컬 mock state로 fallback한다.
로컬 Supabase로 대체 검증하려 했지만 현재 머신에서 `docker` 명령을 찾을 수 없어 `supabase start`를 실행할 수 없었다.

## 6. 다음 세션에서 바로 할 일

추천 다음 작업 순서:

1. 실제 Supabase 프로젝트 또는 로컬 Supabase에 모든 migration 적용
2. `web/.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정
3. `/login`에서 가입 또는 로그인 확인
4. `/onboarding`에서 첫 자녀 생성 확인
5. 홈에서 DB 자녀, 오늘 미션, 보상, 책장 조회 확인
6. 미션 제출, 부모 승인, 보상 요청, 책 추가가 새로고침 후 유지되는지 확인
7. Supabase advisor 또는 테스트 프로젝트로 RLS 검증
8. `docs/TEST_STRATEGY.md` 기준으로 Server Action 통합 테스트 자동화

## 7. 주의할 점

- `npm`은 PowerShell 실행 정책 때문에 실패할 수 있다. 반드시 `npm.cmd`를 사용한다.
- `web/`의 npm audit에서 `moderate` 2건이 보고된 적이 있다. 자동 `npm audit fix --force`는 Next/React 버전을 흔들 수 있으므로 바로 실행하지 말고, 의존성 영향 확인 후 처리한다.
- `web/.env.local`은 현재 없었다. 실제 Supabase E2E는 환경 연결 후 진행해야 한다.
- 루트에 `.git` 폴더가 보이지만 이전 세션에서 `git status --short`가 `fatal: not a git repository`로 실패했다. Git 상태 확인이 필요하면 먼저 저장소 메타데이터를 점검한다.
- `prototype/`과 `web/` 양쪽에 `node_modules`가 있다. 파일 검색 시 `rg --files -g '!node_modules'`처럼 제외하는 편이 낫다.
- Chrome headless 캡처는 다음 경로의 Chrome으로 성공했다.

```text
C:\Program Files\Google\Chrome\Application\chrome.exe
```

캡처 예시:

```powershell
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' --headless=new --disable-gpu --hide-scrollbars --window-size=834,1194 --user-data-dir='C:\workspace\quest-garden\web\.chrome-profile-qa' --screenshot='C:\workspace\quest-garden\web\qa-web-834x1194.png' 'http://127.0.0.1:3000/?qa=web'
```

## 8. 검증 체크리스트

다음 세션 시작 시 확인:

```powershell
cd C:\workspace\quest-garden\web
npm.cmd run lint
npm.cmd run build
```

서버 확인:

```powershell
cd C:\workspace\quest-garden\web
npm.cmd run dev
```

브라우저:

```text
http://127.0.0.1:3000
```

기능 확인:

- 아이가 `완료`를 누르면 미션이 `확인 대기`가 되는가
- 부모 대시보드에 승인 대기가 뜨는가
- `승인`을 누르면 별/포인트/XP가 증가하고 `point_transactions`가 생성되는가
- 같은 미션을 다시 승인해도 보상이 중복 지급되지 않는가
- 모든 미션 승인 시 축하 모달이 뜨는가
- 보상 요청 후 새로고침해도 요청 상태가 유지되는가
- 책 추가 후 새로고침해도 책장에 유지되는가
- 보상 탭, 책장 탭, 스티커 탭이 전환되는가
- 모바일 폭에서 가로 스크롤이나 텍스트 겹침이 없는가

## 9. 좋은 다음 목표

다음 목표는 실제 Supabase 프로젝트에서 신규 가입부터 미션 승인까지 end-to-end 검증하는 것이다.
코드상 핵심 루프는 연결되어 있으므로, 이제 성공 기준은 DB row 지속성과 RLS 검증이다.
