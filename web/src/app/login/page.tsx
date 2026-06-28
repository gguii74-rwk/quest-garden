import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getCurrentUser,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import { signInWithPassword, signUpWithPassword } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const [params, user] = await Promise.all([searchParams, getCurrentUser()]);
  const configured = isSupabaseConfigured();

  if (user) {
    redirect("/onboarding");
  }

  return (
    <main className="auth-page">
      <section className="auth-hero" aria-labelledby="login-title">
        <Link className="auth-back" href="/">
          Quest Garden
        </Link>
        <div>
          <span>부모 로그인</span>
          <h1 id="login-title">아이의 오늘 미션을 실제 계정에 연결합니다.</h1>
          <p>
            Supabase Auth 세션을 만든 뒤 온보딩에서 자녀, 기본 미션,
            보상을 초기화합니다.
          </p>
        </div>
      </section>

      <section className="auth-grid" aria-label="로그인과 회원가입">
        <form className="auth-card" action={signInWithPassword}>
          <div className="auth-card-heading">
            <span>기존 계정</span>
            <h2>로그인</h2>
          </div>

          {params.message && <p className="auth-message">{params.message}</p>}
          {!configured && (
            <p className="auth-message">
              `web/.env.local`에 Supabase URL과 anon key를 설정해야 합니다.
            </p>
          )}

          <label>
            이메일
            <input
              autoComplete="email"
              disabled={!configured}
              name="email"
              placeholder="parent@example.com"
              required
              type="email"
            />
          </label>
          <label>
            비밀번호
            <input
              autoComplete="current-password"
              disabled={!configured}
              minLength={6}
              name="password"
              required
              type="password"
            />
          </label>
          <button disabled={!configured} type="submit">
            로그인
          </button>
        </form>

        <form className="auth-card" action={signUpWithPassword}>
          <div className="auth-card-heading">
            <span>처음 시작</span>
            <h2>회원가입</h2>
          </div>
          <label>
            부모 이름
            <input
              autoComplete="name"
              disabled={!configured}
              name="displayName"
              placeholder="보호자"
            />
          </label>
          <label>
            이메일
            <input
              autoComplete="email"
              disabled={!configured}
              name="email"
              placeholder="parent@example.com"
              required
              type="email"
            />
          </label>
          <label>
            비밀번호
            <input
              autoComplete="new-password"
              disabled={!configured}
              minLength={6}
              name="password"
              required
              type="password"
            />
          </label>
          <button disabled={!configured} type="submit">
            가입하고 시작
          </button>
        </form>
      </section>
    </main>
  );
}
