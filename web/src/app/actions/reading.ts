"use server";

import { revalidatePath } from "next/cache";
import type { BookColor, BookSeed } from "@/lib/questGardenState";
import {
  createSupabaseServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

type ReadingActionResult =
  | { ok: true; book: BookSeed }
  | { ok: false; message: string };

type SupabaseServerClient = Awaited<
  ReturnType<typeof createSupabaseServerClient>
>;

const bookColors: BookColor[] = ["rose", "green", "blue", "yellow", "purple"];

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

export async function addReadingEntry(
  childId: string,
): Promise<ReadingActionResult> {
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

  const { count, error: countError } = await context.supabase
    .from("reading_entries")
    .select("id", { count: "exact", head: true })
    .eq("child_id", child.id);

  if (countError) {
    return { ok: false, message: countError.message };
  }

  const nextIndex = count ?? 0;
  const color = bookColors[nextIndex % bookColors.length];
  const title = `읽은 책 ${nextIndex + 1}`;

  const { data: entry, error: insertError } = await context.supabase
    .from("reading_entries")
    .insert({
      child_id: child.id,
      cover_color: color,
      read_date: todayInSeoul(),
      source: "manual",
      title,
    })
    .select("id,title,cover_color")
    .single();

  if (insertError) {
    return { ok: false, message: insertError.message };
  }

  revalidatePath("/");

  return {
    ok: true,
    book: {
      color: normalizeBookColor(entry.cover_color, nextIndex),
      id: entry.id,
      title: entry.title ?? title,
    },
  };
}

function normalizeBookColor(color: string, index: number): BookColor {
  if (bookColors.includes(color as BookColor)) {
    return color as BookColor;
  }

  return bookColors[index % bookColors.length];
}

function todayInSeoul() {
  return new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Seoul",
    year: "numeric",
  }).format(new Date());
}
