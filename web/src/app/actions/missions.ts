"use server";

import { revalidatePath } from "next/cache";
import {
  createSupabaseServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

type MissionActionResult =
  | { ok: true }
  | { ok: false; message: string };

type MissionApprovalResult =
  | { ok: true; approvedIds: string[] }
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

function normalizeInstanceIds(instanceIds: string[]) {
  return Array.from(
    new Set(instanceIds.map((id) => id.trim()).filter(Boolean)),
  );
}

export async function submitMissionForApproval(
  instanceId: string,
): Promise<MissionActionResult> {
  const [id] = normalizeInstanceIds([instanceId]);

  if (!id) {
    return { ok: false, message: "미션 ID가 없습니다." };
  }

  const context = await createActionContext();
  if ("message" in context) return { ok: false, message: context.message };

  const now = new Date().toISOString();
  const { data, error } = await context.supabase
    .from("mission_instances")
    .update({
      approved_at: null,
      approved_by: null,
      rejected_at: null,
      status: "submitted",
      submitted_at: now,
      updated_at: now,
    })
    .eq("id", id)
    .eq("status", "pending")
    .select("id")
    .maybeSingle();

  if (error) {
    return { ok: false, message: error.message };
  }

  if (!data) {
    return {
      ok: false,
      message: "이미 제출되었거나 접근할 수 없는 미션입니다.",
    };
  }

  revalidatePath("/");
  return { ok: true };
}

export async function approveSubmittedMissions(
  instanceIds: string[],
): Promise<MissionApprovalResult> {
  const ids = normalizeInstanceIds(instanceIds);

  if (ids.length === 0) {
    return { ok: false, message: "승인할 미션이 없습니다." };
  }

  const context = await createActionContext();
  if ("message" in context) return { ok: false, message: context.message };

  const { data, error } = await context.supabase.rpc(
    "approve_mission_instances",
    { p_instance_ids: ids },
  );

  if (error) {
    return { ok: false, message: error.message };
  }

  const approvedIds = data ?? [];

  if (approvedIds.length === 0) {
    return {
      ok: false,
      message: "이미 승인되었거나 접근할 수 없는 미션입니다.",
    };
  }

  revalidatePath("/");
  return { ok: true, approvedIds };
}

export async function rejectMissionSubmission(
  instanceId: string,
): Promise<MissionActionResult> {
  const [id] = normalizeInstanceIds([instanceId]);

  if (!id) {
    return { ok: false, message: "미션 ID가 없습니다." };
  }

  const context = await createActionContext();
  if ("message" in context) return { ok: false, message: context.message };

  const now = new Date().toISOString();
  const { data, error } = await context.supabase
    .from("mission_instances")
    .update({
      approved_at: null,
      approved_by: null,
      rejected_at: now,
      status: "pending",
      submitted_at: null,
      updated_at: now,
    })
    .eq("id", id)
    .eq("status", "submitted")
    .select("id")
    .maybeSingle();

  if (error) {
    return { ok: false, message: error.message };
  }

  if (!data) {
    return {
      ok: false,
      message: "이미 처리되었거나 접근할 수 없는 미션입니다.",
    };
  }

  revalidatePath("/");
  return { ok: true };
}
