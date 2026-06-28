# Quest Garden 개발 추적 문서

작성일: 2026-06-28  
기준 브랜치: `main`  
주요 앱: `web/` Next.js App Router

## 작업 운영 규칙

- 작업 단위가 완료되면 검증 후 커밋한다.
- 커밋 전 `docs/DEVELOPMENT_TRACKER.md`를 함께 갱신해 완료 범위, 남은 작업, 검증 결과가 최신 상태인지 확인한다.
- 커밋 메시지는 변경 의도를 짧은 명령형 문장으로 작성한다.

## 현재 상태 요약

Quest Garden은 현재 Supabase Auth/DB 기반 핵심 루프가 코드로 연결되어 있으며, `web/.env.local`이 없을 때는 기존 mock UX로 안전하게 fallback합니다.

현재까지 완료된 범위:

- 아이 모드에서 오늘의 미션 제출
- 부모 대시보드에서 제출 미션 승인, 되돌리기, 전체 승인
- 별, 포인트, XP, 레벨 상태 갱신
- 보상 진행도와 보상 요청 상태 표시
- 책장, 스티커, 보상 탭 화면
- 반응형 레이아웃
- Supabase npm 패키지 설치
- Supabase client, server, proxy 헬퍼 추가
- 부모 로그인과 회원가입 화면 추가
- 첫 자녀 온보딩 화면 추가
- 온보딩 시 부모 프로필, 자녀, 기본 미션, 오늘 미션 인스턴스, 기본 보상 생성 action 추가
- 홈 화면 DB 데이터 loader 추가
- 로그인된 부모의 첫 자녀와 오늘 미션 인스턴스 조회 후 기존 UI 상태로 매핑
- Supabase 미설정, 비로그인, DB 조회 오류 시 mock 상태 fallback 유지
- `profiles` self insert RLS 정책 마이그레이션 추가
- Next 16 기준 `next lint` 제거 후 `eslint .` 설정 추가
- 미션 제출, 반려, 승인 Server Action 추가
- 승인 RPC에서 `mission_instances`, `point_transactions`, `children` 누적 수치를 한 트랜잭션으로 갱신
- 보상 요청 Server Action과 `reward_redemptions` 중복 방지 index 추가
- 읽기 기록 Server Action과 `reading_entries` 기반 책장 로딩 추가
- 스티커 상태를 DB 로딩값과 현재 미션/책장/보상 상태에서 계산
- Supabase Data API용 `authenticated` role grant migration 추가
- `<img>`를 `next/image`로 교체해 lint warning 제거
- Server Action 오프라인 회귀 테스트, 테스트 전략 문서, Supabase 보안 리뷰 문서 추가

최근 검증:

- `cd web; npm.cmd run build`: 통과
- `cd web; npm.cmd run lint`: 통과
- `cd web; npm.cmd run test:offline`: 통과, 5개 테스트
- lint warning: 0개
- dev server: `http://127.0.0.1:3000`
- `/`, `/login`, `/onboarding`: HTTP 200 확인
- M2 DB loader 연결 후 `/`, `/login`, `/onboarding`: HTTP 200 재확인
- Chrome headless로 `/login` 화면 렌더링 확인
- M3~M7 구현 후 `/`, `/login`, `/onboarding`: HTTP 200 재확인
- Chrome headless로 홈 화면 렌더링 확인: `C:\tmp\quest-garden-home.png`
- SSR HTML에 `오늘의 미션`, `아이스크림` 포함 및 error overlay marker 없음 확인
- `cd web; npm.cmd run start`로 production 서버 기동 후 `/`, `/login`, `/onboarding`: HTTP 200 확인
- production SSR HTML에 `오늘의 미션`, `아이스크림` 포함 및 error overlay marker 없음 확인

현재 제한:

- `web/.env.local`이 없어 실제 Supabase 프로젝트에 migration 적용, 가입/온보딩 저장, 새로고침 지속성, RLS advisor 검증은 아직 수행하지 못했다.
- 로컬 Supabase 대체 검증도 시도했지만 Docker CLI가 설치되어 있지 않아 `supabase start`를 실행할 수 없었다.

## 추적 보드

| 영역 | 상태 | 다음 액션 |
| --- | --- | --- |
| Mock UX | 완료 | 실제 DB 데이터로 단계적 교체 |
| Supabase 패키지 | 완료 | 버전 유지, lockfile 커밋 |
| Supabase 클라이언트 | 완료 | 타입 범위 확장 필요 시 보강 |
| Auth 화면 | 1차 완료 | 이메일 확인, 오류 메시지 UX 다듬기 |
| 온보딩 | 1차 완료 | 실제 DB에서 생성 flow 테스트 |
| DB 마이그레이션 | 작성 완료 | 원격 또는 로컬 Supabase에 적용 |
| 홈 데이터 로딩 | 구현 완료 | 실제 Supabase 프로젝트 연결 후 row 조회 검증 |
| 미션 제출 | 구현 완료 | 실제 Supabase에서 새로고침 유지 검증 |
| 부모 승인 | 구현 완료 | 실제 Supabase에서 원장/중복 승인 검증 |
| 보상 요청 | 구현 완료 | 실제 Supabase에서 요청 유지 검증 |
| 읽기 기록 | 구현 완료 | 실제 Supabase에서 책 추가 유지 검증 |
| 테스트 | 오프라인 회귀 테스트 추가 | Supabase 테스트 프로젝트 연결 후 E2E 자동화 |
| 이미지 최적화 | 완료 | 유지 |

## 다음 마일스톤

### M1. Supabase 환경 연결

목표: 로컬 앱이 실제 Supabase 프로젝트와 연결되어 로그인, 온보딩 저장까지 완료된다.

작업:

- [ ] `web/.env.local`에 `NEXT_PUBLIC_SUPABASE_URL` 설정
- [ ] `web/.env.local`에 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정
- [ ] Supabase 프로젝트에 기존 `0001_initial_schema.sql` 적용
- [ ] `20260628004205_add_profile_self_insert_policy.sql` 적용
- [ ] `20260628011023_mission_server_actions.sql` 적용
- [ ] `20260628011503_reward_request_flow.sql` 적용
- [ ] Supabase Auth 이메일 설정 확인
- [ ] `/login`에서 회원가입 또는 로그인 확인
- [ ] `/onboarding`에서 첫 자녀 생성 확인
- [ ] Supabase 테이블에 `profiles`, `children`, `missions`, `mission_instances`, `rewards` row 생성 확인

완료 기준:

- 로그인 후 `/onboarding` 진입 가능
- 온보딩 저장 후 홈으로 이동
- DB에 첫 자녀와 오늘 미션 4개가 생성됨

### M2. 홈 화면을 DB 데이터로 읽기

목표: 홈에서 mock 초기값 대신 Supabase의 자녀와 오늘 미션을 읽는다.

작업:

- [x] 서버에서 현재 사용자 조회
- [x] 부모의 첫 번째 `children` row 조회
- [x] 오늘 날짜 기준 `mission_instances` 조회
- [x] DB row를 기존 `Mission` UI 타입으로 매핑
- [x] 로그인되지 않았거나 Supabase 미설정이면 기존 mock 모드 유지
- [x] 자녀가 없으면 `/onboarding`으로 안내
- [ ] 실제 Supabase 프로젝트에서 온보딩 후 홈 row 조회 검증

완료 기준:

- 온보딩에서 만든 자녀 이름 또는 아바타 이름이 홈에 반영됨
- 오늘 미션 목록이 DB에서 로드됨
- 환경변수가 없을 때 기존 mock 화면이 계속 동작함

진행 메모:

- `web/src/features/quest-garden/loadQuestGardenHome.ts`에서 DB 조회와 fallback을 담당한다.
- 서버 번들에 React icon 컴포넌트가 섞이지 않도록 `web/src/lib/questGardenState.ts`에 직렬화 가능한 seed 타입과 mock seed를 분리했다.
- `web/src/lib/questGardenData.ts`는 클라이언트에서 seed를 Phosphor icon 컴포넌트로 hydrate한다.

### M3. 미션 제출 Server Action

목표: 아이가 완료 버튼을 누르면 DB의 `mission_instances.status`가 `submitted`가 된다.

작업:

- [x] `submitMissionForApproval(instanceId)` Server Action 추가
- [x] status가 `pending`인 row만 `submitted`로 변경
- [x] `submitted_at` 기록
- [x] RLS로 부모의 자녀 미션만 수정되도록 기존 정책과 action filter 유지
- [x] 성공 후 `revalidatePath("/")`
- [x] pending 상태 UX 검토: 저장 중 미션 버튼 비활성화

완료 기준:

- 완료 버튼 클릭 후 부모 대시보드 승인 대기에 표시
- 새로고침 후에도 `submitted` 상태 유지
- 실제 Supabase 환경에서 새로고침 지속성 검증 필요

### M4. 부모 승인과 보상 지급 Server Action

목표: 부모 승인 시 미션 보상과 누적 수치가 DB에 반영된다.

작업:

- [x] `approveSubmittedMissions(instanceIds)` Server Action 추가
- [x] `mission_instances.status = approved` 갱신
- [x] `approved_by`, `approved_at` 기록
- [x] `point_transactions`에 보상 이력 추가
- [x] `children.total_stars`, `children.total_points`, `children.total_xp`, `children.level` 갱신
- [x] `rejectMissionSubmission(instanceId)` Server Action 추가
- [x] `approveAll()`은 여러 ID를 같은 RPC로 승인
- [x] 중복 승인 방지: `submitted` row만 승인하고 승인된 ID만 반환

완료 기준:

- 승인 후 새로고침해도 별, 포인트, XP가 유지됨
- 같은 미션을 두 번 승인해도 보상이 중복 지급되지 않음
- 실제 Supabase 환경에서 원장/누적 수치 검증 필요

### M5. 보상 요청 연결

목표: 별 목표 달성 후 보상 요청이 DB에 저장된다.

작업:

- [x] 현재 자녀의 활성 `rewards` 조회
- [x] `requestRewardRedemption(rewardId)` Server Action 추가
- [x] 조건 충족 시 `reward_redemptions.status = requested` 생성
- [x] 이미 요청된 보상이 있으면 중복 생성 방지
- [x] 부모 대시보드에서 보상 요청 표시

완료 기준:

- 보상 요청 후 새로고침해도 요청 상태 유지
- 부모 화면에서 요청을 확인할 수 있음
- 실제 Supabase 환경에서 요청 유지 검증 필요

### M6. 읽기 기록과 스티커

목표: 책장과 스티커가 실제 기록 기반으로 확장된다.

작업:

- [x] `reading_entries` 조회
- [x] 책 추가 Server Action 구현
- [x] 읽기 기록 생성 시 선택적 point transaction 검토: MVP에서는 원장 지급 없이 기록만 저장
- [x] 스티커 unlock 기준 정의
- [x] 스티커 상태를 DB 기록과 계산 로직으로 연결

완료 기준:

- 책 추가 후 DB에 기록 저장
- 새로고침 후 책장에 유지
- 실제 Supabase 환경에서 새로고침 유지 검증 필요

### M7. 운영 품질

목표: MVP 흐름을 배포 가능한 품질로 다듬는다.

작업:

- [x] `<img>`를 `next/image`로 교체해 lint warning 제거
- [x] 주요 Server Action 단위 테스트 또는 통합 테스트 전략 추가: `npm.cmd run test:offline`, `docs/TEST_STRATEGY.md`
- [x] 빈 상태, 에러 상태, 로딩 상태 보강
- [x] Supabase Data API 노출 설정 확인: migration role grant 추가
- [x] RLS 정책 advisor 또는 수동 보안 리뷰: `docs/SUPABASE_SECURITY_REVIEW.md`
- [x] Vercel 배포 환경변수 정리
- [x] README와 HANDOFF 최신화

완료 기준:

- `npm.cmd run lint` warning 0
- `npm.cmd run test:offline` 통과
- `npm.cmd run build` 통과
- 신규 가입부터 미션 승인까지 브라우저에서 end-to-end 확인
- 신규 가입부터 미션 승인까지의 실제 Supabase E2E는 `.env.local` 준비 후 수행

## 현재 변경 파일

현재 작업 세션에서 주요 변경이 생긴 파일:

- `web/src/lib/supabase/*`
- `web/src/proxy.ts`
- `web/src/app/login/*`
- `web/src/app/onboarding/*`
- `web/src/app/actions/missions.ts`
- `web/src/app/actions/rewards.ts`
- `web/src/app/actions/reading.ts`
- `web/src/components/child/ChildMode.tsx`
- `web/src/components/child/ChildTopBar.tsx`
- `web/src/components/child/GardenScene.tsx`
- `web/src/components/child/ReadingView.tsx`
- `web/src/components/child/RewardStrip.tsx`
- `web/src/components/child/RewardsView.tsx`
- `web/src/components/child/StickerView.tsx`
- `web/src/components/parent/ParentDashboard.tsx`
- `web/src/features/quest-garden/loadQuestGardenHome.ts`
- `web/src/features/quest-garden/QuestGardenApp.tsx`
- `web/src/features/quest-garden/useQuestGardenState.ts`
- `web/src/app/page.tsx`
- `web/src/app/globals.css`
- `web/src/lib/questGardenData.ts`
- `web/src/lib/questGardenState.ts`
- `web/eslint.config.mjs`
- `web/package.json`
- `web/package-lock.json`
- `web/.env.example`
- `web/README.md`
- `supabase/migrations/20260628004205_add_profile_self_insert_policy.sql`
- `supabase/migrations/20260628011023_mission_server_actions.sql`
- `supabase/migrations/20260628011503_reward_request_flow.sql`
- `docs/HANDOFF.md`
- `docs/TEST_STRATEGY.md`
- `docs/SUPABASE_SECURITY_REVIEW.md`

## 실행 명령

개발 서버:

```powershell
cd C:\workspace\quest-garden\web
npm.cmd run dev
```

검증:

```powershell
cd C:\workspace\quest-garden\web
npm.cmd run lint
npm.cmd run test:offline
npm.cmd run build
```

접속:

```text
http://127.0.0.1:3000
http://127.0.0.1:3000/login
http://127.0.0.1:3000/onboarding
```

## 리스크와 주의사항

- `web/.env.local`이 없으면 Supabase action은 동작하지 않으며, 화면은 mock 모드 안내를 보여준다.
- Supabase CLI가 로컬에 전역 설치되어 있지 않아 `npx.cmd supabase ...`를 사용했다.
- 새 Supabase 프로젝트는 public table이 Data API에 자동 노출되지 않을 수 있다. 테이블 접근이 실패하면 API 노출 설정과 role grant를 확인한다.
- 현재 홈 화면 데이터는 아직 mock state다. Auth와 온보딩 기반만 붙은 상태다.
- `HANDOFF.md`는 콘솔 출력에서 한글이 깨져 보이므로, 수정 전 에디터에서 인코딩을 확인한다.
