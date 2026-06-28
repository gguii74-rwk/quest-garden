"use server";

import { revalidatePath } from "next/cache";
import {
  createSupabaseServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

type RewardActionResult =
  | { ok: true }
  | { ok: false; message: string };

type SupabaseServerClient = Awaited<
  ReturnType<typeof createSupabaseServerClient>
>;

async function createActionContext(): Promise<
  | { supabase: SupabaseServerClient }
  | { message: string }
> {
  if (!isSupabaseConfigured()) {
    return { message: "Supabase 환경변수를 먼저 설정해 주세요." };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { message: error?.message ?? "로그인이 필요합니다." };
  }

  return { supabase };
}

export async function requestRewardRedemption(
  rewardId: string,
): Promise<RewardActionResult> {
  const id = rewardId.trim();

  if (!id) {
    return { ok: false, message: "보상 ID가 없습니다." };
  }

  const context = await createActionContext();
  if ("message" in context) return { ok: false, message: context.message };

  const { data: reward, error: rewardError } = await context.supabase
    .from("rewards")
    .select("id,child_id,required_points,required_stars,repeatable,active")
    .eq("id", id)
    .eq("active", true)
    .maybeSingle();

  if (rewardError) {
    return { ok: false, message: rewardError.message };
  }

  if (!reward) {
    return { ok: false, message: "요청할 수 있는 보상을 찾지 못했습니다." };
  }

  const { data: child, error: childError } = await context.supabase
    .from("children")
    .select("id,total_points,total_stars")
    .eq("id", reward.child_id)
    .maybeSingle();

  if (childError) {
    return { ok: false, message: childError.message };
  }

  if (!child) {
    return { ok: false, message: "자녀 프로필을 찾지 못했습니다." };
  }

  if (
    child.total_stars < reward.required_stars ||
    child.total_points < reward.required_points
  ) {
    return { ok: false, message: "아직 보상 조건을 채우지 못했습니다." };
  }

  if (!reward.repeatable) {
    const { data: existing, error: existingError } = await context.supabase
      .from("reward_redemptions")
      .select("id")
      .eq("reward_id", reward.id)
      .eq("child_id", reward.child_id)
      .in("status", ["requested", "approved", "redeemed"])
      .limit(1)
      .maybeSingle();

    if (existingError) {
      return { ok: false, message: existingError.message };
    }

    if (existing) {
      return { ok: false, message: "이미 요청된 보상입니다." };
    }
  }

  const now = new Date().toISOString();
  const { error: insertError } = await context.supabase
    .from("reward_redemptions")
    .insert({
      child_id: reward.child_id,
      requested_at: now,
      reward_id: reward.id,
      status: "requested",
    });

  if (insertError) {
    return { ok: false, message: insertError.message };
  }

  revalidatePath("/");
  return { ok: true };
}
