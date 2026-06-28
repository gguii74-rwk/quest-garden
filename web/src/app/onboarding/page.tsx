import Link from "next/link";
import { redirect } from "next/navigation";
import {
  createSupabaseServerClient,
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { createFirstChild } from "./actions";

type OnboardingPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

function loginPath(message: string) {
  const params = new URLSearchParams({ message });
  return `/login?${params.toString()}`;
}

export default async function OnboardingPage({
  searchParams,
}: OnboardingPageProps) {
  const [params, user] = await Promise.all([searchParams, getCurrentUser()]);
  const configured = isSupabaseConfigured();
  let existingChildName: string | null = null;

  if (configured && !user) {
    redirect(loginPath("로그인이 필요합니다."));
  }

  if (configured && user) {
    const supabase = await createSupabaseServerClient();
    const { data: child } = await supabase
      .from("children")
      .select("name")
      .limit(1)
      .maybeSingle();

    existingChildName = child?.name ?? null;
  }

  return (
    <main className="auth-page">
      <section className="auth-hero" aria-labelledby="onboarding-title">
        <Link className="auth-back" href="/">
          Quest Garden
        </Link>
        <div>
          <span>초기 설정</span>
          <h1 id="onboarding-title">첫 자녀와 오늘의 정원 루프를 만듭니다.</h1>
          <p>
            부모 프로필, 자녀, 기본 미션, 오늘 미션 인스턴스, 첫 보상을
            Supabase에 저장합니다.
          </p>
        </div>
      </section>

      <section className="auth-grid auth-grid-single">
        <form className="auth-card" action={createFirstChild}>
          <div className="auth-card-heading">
            <span>정원 시작</span>
            <h2>자녀 프로필</h2>
          </div>

          {params.message && <p className="auth-message">{params.message}</p>}
          {!configured && (
            <p className="auth-message">
              `web/.env.local`에 Supabase URL과 anon key를 설정해야 합니다.
            </p>
          )}
          {existingChildName && (
            <p className="auth-message">
              이미 {existingChildName} 프로필이 있습니다. 홈에서 계속 진행할 수
              있습니다.
            </p>
          )}

          <label>
            부모 이름
            <input
              defaultValue={user?.user_metadata.display_name ?? ""}
              disabled={!configured || !!existingChildName}
              name="displayName"
              placeholder="보호자"
            />
          </label>
          <label>
            아이 이름
            <input
              disabled={!configured || !!existingChildName}
              name="childName"
              placeholder="아이"
              required
            />
          </label>
          <label>
            학년
            <select
              defaultValue="1"
              disabled={!configured || !!existingChildName}
              name="grade"
            >
              <option value="1">초등 1학년</option>
              <option value="2">초등 2학년</option>
              <option value="3">초등 3학년</option>
              <option value="4">초등 4학년</option>
              <option value="5">초등 5학년</option>
              <option value="6">초등 6학년</option>
            </select>
          </label>
          <label>
            고양이 이름
            <input
              defaultValue="소미"
              disabled={!configured || !!existingChildName}
              name="avatarName"
              required
            />
          </label>

          {existingChildName ? (
            <Link className="auth-link-button" href="/">
              홈으로 이동
            </Link>
          ) : (
            <button disabled={!configured} type="submit">
              정원 만들기
            </button>
          )}
        </form>
      </section>
    </main>
  );
}
