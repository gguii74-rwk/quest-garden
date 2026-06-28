import Link from "next/link";
import { QuestGardenApp } from "@/features/quest-garden/QuestGardenApp";
import { loadQuestGardenHome } from "@/features/quest-garden/loadQuestGardenHome";
import { signOut } from "./login/actions";

export default async function Home() {
  const home = await loadQuestGardenHome();
  const { configured, initialState, userEmail } = home;

  return (
    <>
      <QuestGardenApp initialState={initialState} />
      <aside className="auth-floating" aria-label="계정 상태">
        {configured ? (
          userEmail ? (
            <>
              <span>
                {initialState.loadError
                  ? "DB 로드 실패"
                  : initialState.needsOnboarding
                    ? "온보딩 필요"
                    : userEmail}
              </span>
              <Link href="/onboarding">
                {initialState.needsOnboarding ? "시작 설정" : "온보딩"}
              </Link>
              <form action={signOut}>
                <button type="submit">로그아웃</button>
              </form>
            </>
          ) : (
            <>
              <span>Supabase 연결 준비됨</span>
              <Link href="/login">로그인</Link>
            </>
          )
        ) : (
          <>
            <span>Mock 모드</span>
            <Link href="/login">설정 확인</Link>
          </>
        )}
      </aside>
    </>
  );
}
