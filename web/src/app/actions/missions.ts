"use server";

import { revalidatePath } from "next/cache";
import {
  pianoMissionSeed,
  type MissionSeed,
  type MissionStatus,
} from "@/lib/questGardenState";
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

type AddMissionResult =
  | { ok: true; mission: MissionSeed; alreadyExists: boolean }
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

export async function addPianoMissionForToday(
  childId: string,
): Promise<AddMissionResult> {
  const id = childId.trim();

  if (!id) {
    return { ok: false, message: "자녀 ID가 없습니다." };
  }

  const context = await createActionContext();
  if ("message" in context) return { ok: false, message: context.message };

  const { data: child, error: childError } = await context.supabase
    .from("children")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (childError) {
    return { ok: false, message: childError.message };
  }

  if (!child) {
    return { ok: false, message: "자녀 프로필을 찾지 못했습니다." };
  }

  const today = todayInSeoul();
  const existing = await findPianoMissionInstance(context.supabase, child.id, today);

  if ("message" in existing) return { ok: false, message: existing.message };
  if (existing.instanceId) {
    return {
      ok: true,
      alreadyExists: true,
      mission: toPianoMissionSeed(existing.instanceId, existing.status),
    };
  }

  let missionId = existing.missionId;

  if (!missionId) {
    const { data: mission, error: missionError } = await context.supabase
      .from("missions")
      .insert({
        child_id: child.id,
        title: pianoMissionSeed.title,
        icon: pianoMissionSeed.icon,
        category: pianoMissionSeed.category,
        points: pianoMissionSeed.points,
        stars: pianoMissionSeed.stars,
        xp: pianoMissionSeed.xp,
        description: pianoMissionSeed.detail,
        sort_order: 50,
      })
      .select("id")
      .single();

    if (missionError || !mission) {
      return {
        ok: false,
        message: missionError?.message ?? "피아노 미션을 만들지 못했습니다.",
      };
    }

    missionId = mission.id;

    const { error: scheduleError } = await context.supabase
      .from("mission_schedules")
      .insert({
        mission_id: missionId,
        repeat_type: "daily",
        start_date: today,
      });

    if (scheduleError) {
      return { ok: false, message: scheduleError.message };
    }
  }

  const { data: instance, error: instanceError } = await context.supabase
    .from("mission_instances")
    .insert({
      mission_id: missionId,
      child_id: child.id,
      scheduled_date: today,
      title_snapshot: pianoMissionSeed.title,
      icon_snapshot: pianoMissionSeed.icon,
      category_snapshot: pianoMissionSeed.category,
      points_snapshot: pianoMissionSeed.points,
      stars_snapshot: pianoMissionSeed.stars,
      xp_snapshot: pianoMissionSeed.xp,
      requires_parent_approval_snapshot: true,
    })
    .select("id,status")
    .single();

  if (instanceError || !instance) {
    return { ok: false, message: instanceError?.message ?? "오늘 피아노 미션을 만들지 못했습니다." };
  }

  revalidatePath("/");

  return {
    ok: true,
    alreadyExists: false,
    mission: toPianoMissionSeed(instance.id, normalizeMissionStatus(instance.status)),
  };
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

async function findPianoMissionInstance(
  supabase: SupabaseServerClient,
  childId: string,
  today: string,
): Promise<
  | { instanceId: string | null; missionId: string | null; status: MissionStatus }
  | { message: string }
> {
  const { data: missions, error: missionError } = await supabase
    .from("missions")
    .select("id")
    .eq("child_id", childId)
    .eq("title", pianoMissionSeed.title)
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (missionError) {
    return { message: missionError.message };
  }

  const missionIds = missions.map((mission) => mission.id);

  if (missionIds.length === 0) {
    return { instanceId: null, missionId: null, status: "pending" };
  }

  const { data: instance, error: instanceError } = await supabase
    .from("mission_instances")
    .select("id,status")
    .eq("child_id", childId)
    .eq("scheduled_date", today)
    .in("mission_id", missionIds)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (instanceError) {
    return { message: instanceError.message };
  }

  return {
    instanceId: instance?.id ?? null,
    missionId: missionIds[0],
    status: normalizeMissionStatus(instance?.status),
  };
}

function toPianoMissionSeed(id: string, status: MissionStatus): MissionSeed {
  return {
    ...pianoMissionSeed,
    id,
    status,
  };
}

function normalizeMissionStatus(status: string | null | undefined): MissionStatus {
  if (status === "submitted" || status === "approved") return status;
  return "pending";
}

function todayInSeoul() {
  return new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Seoul",
    year: "numeric",
  }).format(new Date());
}
