# Quest Garden 테스트 전략

작성일: 2026-06-28

## 현재 자동 검증

현재 저장소에는 전용 테스트 프레임워크가 없다. 코드 변경 후 기본 게이트는 다음 두 명령이다.
오프라인 회귀 테스트는 Node 내장 test runner로 실행한다.

```powershell
cd C:\workspace\quest-garden\web
npm.cmd run lint
npm.cmd run test:offline
npm.cmd run build
```

`test:offline`은 실제 Supabase 연결 없이 다음 불변식을 확인한다.

- 승인 RPC가 `security invoker`이고 public execute 권한이 없다.
- 미션 승인은 `submitted` 상태만 처리하고 원장과 자녀 누적 수치를 갱신한다.
- `point_transactions` insert 정책이 부모 소유 자녀에만 허용된다.
- 보상 요청은 조건 충족과 중복 요청 방지를 확인한다.
- `.env.example`에 service role key를 요구하지 않는다.

UI 변경 후에는 개발 서버를 띄우고 핵심 라우트를 확인한다.

```powershell
cd C:\workspace\quest-garden\web
npm.cmd run dev
```

확인 대상:

- `/`
- `/login`
- `/onboarding`

## Supabase 통합 테스트 우선순위

Supabase 환경이 연결되면 다음 순서로 통합 테스트를 추가한다.

1. `submitMissionForApproval(instanceId)`
   - `pending` 미션만 `submitted`로 바뀐다.
   - `submitted_at`이 기록된다.
   - 다른 부모의 미션 ID는 변경되지 않는다.

2. `approveSubmittedMissions([instanceId])`
   - `submitted` 미션만 `approved`로 바뀐다.
   - `approved_by`, `approved_at`이 기록된다.
   - `point_transactions`에 미션 보상 원장이 1건 생성된다.
   - `children.total_stars`, `total_points`, `total_xp`, `level`이 증가한다.
   - 같은 미션을 다시 승인해도 원장과 누적 수치가 중복 증가하지 않는다.

3. `rejectMissionSubmission(instanceId)`
   - `submitted` 미션이 `pending`으로 돌아간다.
   - `rejected_at`이 기록되고 승인 필드는 비워진다.

4. `requestRewardRedemption(rewardId)`
   - 조건을 만족할 때만 `reward_redemptions.status = requested`가 생성된다.
   - 열린 요청이 있으면 중복 생성되지 않는다.

5. `addReadingEntry(childId)`
   - 읽기 기록이 `reading_entries`에 저장된다.
   - 새로고침 후 책장에 유지된다.

## 브라우저 E2E 우선순위

Supabase 테스트 프로젝트와 `.env.local`이 준비되면 다음 흐름을 한 시나리오로 검증한다.

1. 부모 계정 가입 또는 로그인
2. 첫 자녀 온보딩 생성
3. 홈에서 자녀 이름, 오늘 미션, 보상 목표 확인
4. 아이가 미션 완료 제출
5. 부모가 승인
6. 새로고침 후 미션 상태, 별, 포인트, XP 유지 확인
7. 보상 조건 충족 후 요청 상태 유지 확인
8. 책 1권 추가 후 새로고침 유지 확인

## 남은 테스트 인프라 작업

- Supabase 로컬 또는 전용 테스트 프로젝트 시드 스크립트 추가
- Server Action 통합 테스트 러너 선택
- 브라우저 자동화 도구 설치 후 E2E 시나리오 자동화
