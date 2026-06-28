# Supabase 보안 리뷰

작성일: 2026-06-28

## 검토 범위

이번 리뷰는 MVP 공개 스키마의 RLS 정책과 신규 Server Action 흐름을 대상으로 한다.

- `mission_instances` 제출, 반려, 승인
- `point_transactions` 미션 보상 원장 insert
- `children` 누적 별, 포인트, XP, 레벨 update
- `reward_redemptions` 보상 요청 insert
- `reading_entries` 읽기 기록 insert
- Supabase Data API 접근을 위한 `authenticated` role grant

## 적용된 보안 기준

- public schema 테이블은 RLS가 활성화되어 있다.
- 부모는 `children.parent_id = auth.uid()`로 연결된 자녀 데이터만 접근한다.
- 신규 `point_transactions` insert 정책은 부모 소유 자녀 row에 대해서만 허용한다.
- 승인 RPC `approve_mission_instances(uuid[])`는 `security invoker`로 작성해 호출자의 RLS를 따른다.
- 승인 RPC 실행 권한은 `authenticated`에만 부여하고 `public` 권한은 회수했다.
- 보상 요청은 열린 요청에 대한 partial unique index로 중복 생성을 방지한다.
- 브라우저에 service role key를 노출하지 않는다. 현재 앱 클라이언트는 publishable/anon key만 사용한다.

## Supabase changelog 반영

2026-04-28 Supabase changelog의 “Tables not exposed to Data and GraphQL API automatically” 변경을 반영해 `authenticated` role에 필요한 테이블 권한을 migration에서 명시했다. RLS가 행 접근을 제한하므로 권한 grant와 행 정책을 함께 유지한다.

## 남은 실제 프로젝트 검증

현재 `web/.env.local`이 없어 원격 또는 로컬 Supabase 프로젝트에 대한 실쿼리 검증은 아직 수행하지 못했다. 환경이 준비되면 다음을 확인한다.

- 모든 migration 적용 성공
- Supabase SQL advisor 또는 dashboard advisor 결과 확인
- 다른 부모 계정으로 타 자녀 `mission_instances`, `rewards`, `reading_entries` 접근 실패 확인
- 중복 승인 시 `point_transactions`가 추가 생성되지 않는지 확인
- 중복 보상 요청 시 unique index 또는 Server Action guard가 동작하는지 확인
