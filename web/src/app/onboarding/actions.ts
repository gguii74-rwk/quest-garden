"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSupabaseServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

type MissionInsert = Database["public"]["Tables"]["missions"]["Insert"];
type RewardInsert = Database["public"]["Tables"]["rewards"]["Insert"];

const defaultMissions = [
  {
    title: "책 읽기",
    icon: "book",
    emoji: "📚",
    category: "독서",
    points: 20,
    stars: 20,
    xp: 80,
    description: "책 3권 읽기",
    sort_order: 10,
  },
  {
    title: "숙제",
    icon: "notebook",
    emoji: "✏️",
    category: "숙제",
    points: 20,
    stars: 20,
    xp: 80,
    description: "학교 숙제 끝내기",
    sort_order: 20,
  },
  {
    title: "수학",
    icon: "calculator",
    emoji: "➕",
    category: "자기학습",
    points: 20,
    stars: 20,
    xp: 80,
    description: "문제집 2쪽 풀기",
    sort_order: 30,
  },
  {
    title: "양치",
    icon: "tooth",
    emoji: "🪥",
    category: "생활습관",
    points: 20,
    stars: 20,
    xp: 80,
    description: "저녁 양치하기",
    sort_order: 40,
  },
] satisfies Array<Omit<MissionInsert, "child_id">>;

const defaultRewards = [
  {
    title: "아이스크림 데이트",
    description: "별 200개를 모으면 부모님과 아이스크림을 먹어요.",
    image_url: "/assets/ice-cream-reward.png",
    required_stars: 200,
    sort_order: 10,
  },
] satisfies Array<Omit<RewardInsert, "child_id">>;

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function onboardingPath(message: string) {
  const params = new URLSearchParams({ message });
  return `/onboarding?${params.toString()}`;
}

function redirectToOnboarding(message: string): never {
  redirect(onboardingPath(message));
}

function todayInSeoul() {
  return new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Seoul",
    year: "numeric",
  }).format(new Date());
}

export async function createFirstChild(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirectToOnboarding("Supabase 환경변수를 먼저 설정해 주세요.");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login?message=로그인이 필요합니다.");
  }

  const { data: existingChild, error: existingChildError } = await supabase
    .from("children")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (existingChildError) {
    redirectToOnboarding(existingChildError.message);
  }

  if (existingChild) {
    redirect("/");
  }

  const displayName = getFormValue(formData, "displayName");
  const childName = getFormValue(formData, "childName") || "아이";
  const grade = getFormValue(formData, "grade") || "1";
  const avatarName = getFormValue(formData, "avatarName") || "소미";
  const now = new Date().toISOString();

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: user.id,
    display_name: displayName || user.email || null,
    locale: "ko",
    timezone: "Asia/Seoul",
    updated_at: now,
  });

  if (profileError) {
    redirectToOnboarding(profileError.message);
  }

  const { data: child, error: childError } = await supabase
    .from("children")
    .insert({
      parent_id: user.id,
      name: childName,
      grade,
      avatar_type: "animal",
      avatar_variant: "white_persian_cat",
      avatar_name: avatarName,
      theme_id: "storybook_garden",
    })
    .select("id")
    .single();

  if (childError || !child) {
    redirectToOnboarding(childError?.message ?? "자녀 프로필을 만들지 못했습니다.");
  }

  const { data: missions, error: missionsError } = await supabase
    .from("missions")
    .insert(
      defaultMissions.map((mission) => ({
        ...mission,
        child_id: child.id,
      })),
    )
    .select(
      "id,title,icon,category,points,stars,xp,requires_parent_approval",
    );

  if (missionsError || !missions) {
    redirectToOnboarding(missionsError?.message ?? "기본 미션을 만들지 못했습니다.");
  }

  const today = todayInSeoul();

  const { error: schedulesError } = await supabase.from("mission_schedules").insert(
    missions.map((mission) => ({
      mission_id: mission.id,
      repeat_type: "daily" as const,
      start_date: today,
    })),
  );

  if (schedulesError) {
    redirectToOnboarding(schedulesError.message);
  }

  const { error: instancesError } = await supabase.from("mission_instances").insert(
    missions.map((mission) => ({
      mission_id: mission.id,
      child_id: child.id,
      scheduled_date: today,
      title_snapshot: mission.title,
      icon_snapshot: mission.icon,
      category_snapshot: mission.category,
      points_snapshot: mission.points,
      stars_snapshot: mission.stars,
      xp_snapshot: mission.xp,
      requires_parent_approval_snapshot: mission.requires_parent_approval,
    })),
  );

  if (instancesError) {
    redirectToOnboarding(instancesError.message);
  }

  const { error: rewardsError } = await supabase.from("rewards").insert(
    defaultRewards.map((reward) => ({
      ...reward,
      child_id: child.id,
    })),
  );

  if (rewardsError) {
    redirectToOnboarding(rewardsError.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
