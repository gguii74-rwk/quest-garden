import "server-only";

import {
  mockQuestGardenInitialState,
  type BookColor,
  type BookSeed,
  type MissionIconName,
  type MissionSeed,
  type MissionStatus,
  type MissionTone,
  type QuestGardenInitialState,
} from "@/lib/questGardenState";
import {
  createSupabaseServerClient,
  isSupabaseConfigured,
} from "@/lib/supabase/server";

type HomeLoadResult = {
  configured: boolean;
  initialState: QuestGardenInitialState;
  userEmail: string | null;
};

const iconNames = new Set<MissionIconName>([
  "book",
  "calculator",
  "notebook",
  "piano",
  "tooth",
]);

const toneByIcon: Record<MissionIconName, MissionTone> = {
  book: "green",
  calculator: "purple",
  notebook: "blue",
  piano: "coral",
  tooth: "mint",
};

const bookColors: BookColor[] = ["rose", "green", "blue", "yellow", "purple"];

export async function loadQuestGardenHome(): Promise<HomeLoadResult> {
  const configured = isSupabaseConfigured();

  if (!configured) {
    return {
      configured,
      initialState: mockQuestGardenInitialState,
      userEmail: null,
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return {
      configured,
      initialState: withMockError(userError.message),
      userEmail: null,
    };
  }

  if (!user) {
    return {
      configured,
      initialState: mockQuestGardenInitialState,
      userEmail: null,
    };
  }

  const { data: child, error: childError } = await supabase
    .from("children")
    .select(
      "id,name,avatar_name,total_stars,total_points,total_xp,level,current_daily_streak,created_at",
    )
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (childError) {
    return {
      configured,
      initialState: withMockError(childError.message),
      userEmail: user.email ?? null,
    };
  }

  if (!child) {
    return {
      configured,
      initialState: {
        ...mockQuestGardenInitialState,
        needsOnboarding: true,
        source: "mock",
      },
      userEmail: user.email ?? null,
    };
  }

  const today = todayInSeoul();
  const { data: missionInstances, error: missionError } = await supabase
    .from("mission_instances")
    .select(
      "id,title_snapshot,icon_snapshot,category_snapshot,points_snapshot,stars_snapshot,xp_snapshot,status,created_at",
    )
    .eq("child_id", child.id)
    .eq("scheduled_date", today)
    .order("created_at", { ascending: true });

  if (missionError) {
    return {
      configured,
      initialState: withMockError(missionError.message),
      userEmail: user.email ?? null,
    };
  }

  const { data: reward, error: rewardError } = await supabase
    .from("rewards")
    .select("id,title,required_points,required_stars,sort_order")
    .eq("child_id", child.id)
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (rewardError) {
    return {
      configured,
      initialState: withMockError(rewardError.message),
      userEmail: user.email ?? null,
    };
  }

  let rewardRequested = false;

  if (reward) {
    const { data: redemption, error: redemptionError } = await supabase
      .from("reward_redemptions")
      .select("id")
      .eq("child_id", child.id)
      .eq("reward_id", reward.id)
      .in("status", ["requested", "approved"])
      .limit(1)
      .maybeSingle();

    if (redemptionError) {
      return {
        configured,
        initialState: withMockError(redemptionError.message),
        userEmail: user.email ?? null,
      };
    }

    rewardRequested = Boolean(redemption);
  }

  const { data: readingEntries, error: readingError } = await supabase
    .from("reading_entries")
    .select("id,title,cover_color,read_date,created_at")
    .eq("child_id", child.id)
    .order("read_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(12);

  if (readingError) {
    return {
      configured,
      initialState: withMockError(readingError.message),
      userEmail: user.email ?? null,
    };
  }

  return {
    configured,
    initialState: {
      avatarName: child.avatar_name || child.name || "솜이",
      books: readingEntries.map((entry, index) => mapBookEntry(entry, index)),
      childId: child.id,
      dailyStreak: child.current_daily_streak,
      level: child.level,
      missions: missionInstances.map((mission) => {
        const icon = normalizeIconName(
          mission.icon_snapshot,
          mission.title_snapshot,
          mission.category_snapshot,
        );

        return {
          id: mission.id,
          title: mission.title_snapshot,
          detail: mission.category_snapshot,
          category: mission.category_snapshot,
          stars: mission.stars_snapshot,
          points: mission.points_snapshot,
          xp: mission.xp_snapshot,
          status: normalizeMissionStatus(mission.status),
          icon,
          tone: toneByIcon[icon],
        } satisfies MissionSeed;
      }),
      points: child.total_points,
      rewardGoal: reward?.required_stars,
      rewardId: reward?.id ?? null,
      rewardRequested,
      source: "supabase",
      stars: child.total_stars,
      xp: child.total_xp % 1000,
    },
    userEmail: user.email ?? null,
  };
}

function withMockError(message: string): QuestGardenInitialState {
  return {
    ...mockQuestGardenInitialState,
    loadError: message,
    source: "mock",
  };
}

function normalizeMissionStatus(status: string): MissionStatus {
  if (status === "approved" || status === "submitted") return status;
  return "pending";
}

function normalizeIconName(
  icon: string,
  title: string,
  category: string,
): MissionIconName {
  if (iconNames.has(icon as MissionIconName)) {
    return icon as MissionIconName;
  }

  if (title.includes("책") || category.includes("독서")) return "book";
  if (title.includes("수학") || category.includes("학습")) return "calculator";
  if (title.includes("양치") || category.includes("생활")) return "tooth";
  if (title.includes("피아노") || category.includes("예술")) return "piano";

  return "notebook";
}

function mapBookEntry(
  entry: {
    cover_color: string;
    id: string;
    title: string | null;
  },
  index: number,
): BookSeed {
  return {
    color: normalizeBookColor(entry.cover_color, index),
    id: entry.id,
    title: entry.title?.trim() || `읽은 책 ${index + 1}`,
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
