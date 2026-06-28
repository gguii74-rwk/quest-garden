# Quest Garden Web

Quest Garden의 본 구현용 Next.js 앱입니다. Supabase 환경변수가 있으면 Auth/DB 기반 핵심 루프를 사용하고, 환경변수가 없으면 로컬 mock state로 안전하게 동작합니다.

## 현재 구현된 흐름

- 아이 모드 오늘의 가든
- Supabase 기반 미션 완료 제출
- 부모 대시보드 승인, 되돌림, 전체 승인
- 승인 시 `point_transactions` 원장 기록과 별, 포인트, XP, 레벨 갱신
- 아이스크림 보상 진행과 `reward_redemptions` 요청 저장
- `reading_entries` 기반 책장 탭
- 계산 기반 스티커 탭
- 하얀색 페르시안 고양이 `솜이` 캐릭터
- 태블릿과 모바일 반응형 레이아웃

## 실행

```bash
npm.cmd install
npm.cmd run dev
```

로컬 주소:

```text
http://127.0.0.1:3000
```

## 환경 변수

`.env.example`을 `.env.local`로 복사한 뒤 Supabase 값을 채웁니다.

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Supabase 마이그레이션

적용 순서:

1. `../../supabase/migrations/0001_initial_schema.sql`
2. `../../supabase/migrations/20260628004205_add_profile_self_insert_policy.sql`
3. `../../supabase/migrations/20260628011023_mission_server_actions.sql`
4. `../../supabase/migrations/20260628011503_reward_request_flow.sql`

## 검증

```bash
npm.cmd run lint
npm.cmd run test:offline
npm.cmd run build
```

`test:offline`은 migration과 Server Action의 핵심 불변식을 DB 연결 없이 확인합니다. 현재 `web/.env.local`이 없으면 실제 Supabase 저장 흐름은 검증할 수 없고 mock fallback으로 렌더링됩니다.

## 다음 검증 및 구현 순서

1. 실제 Supabase 프로젝트에 migration 적용
2. `.env.local` 연결 후 가입, 온보딩, 미션 제출, 승인 E2E 검증
3. Supabase advisor 또는 테스트 프로젝트로 RLS 검증
4. Server Action 통합 테스트 자동화
5. `daily_summaries` 갱신 로직 추가

## 관련 문서

- PRD: `../docs/PRD.md`
- 목업 비교: `../docs/mockups/index.html`
- Supabase 마이그레이션: `../supabase/migrations/0001_initial_schema.sql`
- 테스트 전략: `../docs/TEST_STRATEGY.md`
- Supabase 보안 리뷰: `../docs/SUPABASE_SECURITY_REVIEW.md`
