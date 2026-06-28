# Quest Garden Web

Quest Garden의 본 구현용 Next.js 앱입니다. 현재 단계에서는 Supabase 연결 전, 로컬 mock state로 핵심 제품 루프를 동작하게 구성했습니다.

## 현재 구현된 흐름

- 아이 모드 오늘의 가든
- 미션 완료 제출
- 부모 대시보드 승인, 되돌림, 전체 승인
- 별, 포인트, XP, 레벨 상태 갱신
- 아이스크림 보상 진행과 요청
- 보상, 책장, 스티커 탭
- 하얀색 페르시안 고양이 `솜이` 캐릭터
- 태블릿과 모바일 반응형 레이아웃

## 실행

```bash
npm install
npm run dev
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
SUPABASE_SERVICE_ROLE_KEY=
```

## 다음 구현 순서

1. Supabase Auth로 부모 로그인 연결
2. `children`, `missions`, `mission_instances` 조회 연결
3. 미션 제출과 부모 승인을 서버 액션으로 이동
4. `point_transactions` 원장 기록과 `daily_summaries` 갱신
5. 보상 해금과 요청 상태를 Supabase에 저장

## 관련 문서

- PRD: `../docs/PRD.md`
- 목업 비교: `../docs/mockups/index.html`
- Supabase 마이그레이션: `../supabase/migrations/0001_initial_schema.sql`
