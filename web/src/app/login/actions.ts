"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSupabaseServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function loginPath(message: string) {
  const params = new URLSearchParams({ message });
  return `/login?${params.toString()}`;
}

function redirectToLogin(message: string): never {
  redirect(loginPath(message));
}

export async function signInWithPassword(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirectToLogin("Supabase 환경변수를 먼저 설정해 주세요.");
  }

  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");

  if (!email || !password) {
    redirectToLogin("이메일과 비밀번호를 모두 입력해 주세요.");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirectToLogin(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/onboarding");
}

export async function signUpWithPassword(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirectToLogin("Supabase 환경변수를 먼저 설정해 주세요.");
  }

  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");
  const displayName = getFormValue(formData, "displayName");

  if (!email || !password) {
    redirectToLogin("이메일과 비밀번호를 모두 입력해 주세요.");
  }

  if (password.length < 6) {
    redirectToLogin("비밀번호는 6자 이상이어야 합니다.");
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName || null,
      },
    },
  });

  if (error) {
    redirectToLogin(error.message);
  }

  revalidatePath("/", "layout");

  if (data.session) {
    redirect("/onboarding");
  }

  redirectToLogin("가입 확인 메일을 보냈습니다. 확인 후 로그인해 주세요.");
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
