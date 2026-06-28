export type MissionStatus = "pending" | "submitted" | "approved";
export type MissionTone = "green" | "blue" | "purple" | "mint" | "coral";
export type MissionIconName = "book" | "notebook" | "calculator" | "tooth" | "piano";
export type BookColor = "rose" | "green" | "blue" | "yellow" | "purple";

export type BookSeed = {
  id: string;
  title: string;
  color: BookColor;
};

export type MissionSeed = {
  id: string;
  title: string;
  detail: string;
  category: string;
  stars: number;
  points: number;
  xp: number;
  status: MissionStatus;
  icon: MissionIconName;
  tone: MissionTone;
};

export type QuestGardenInitialState = {
  avatarName: string;
  books?: BookSeed[];
  childId?: string | null;
  dailyStreak?: number;
  level: number;
  missions: MissionSeed[];
  points: number;
  rewardGoal?: number;
  rewardId?: string | null;
  rewardRequested?: boolean;
  source: "mock" | "supabase";
  stars: number;
  xp: number;
  loadError?: string | null;
  needsOnboarding?: boolean;
};

export const initialMissionSeeds: MissionSeed[] = [
  {
    id: "read",
    title: "책 읽기",
    detail: "책 3권",
    category: "독서",
    stars: 20,
    points: 20,
    xp: 80,
    status: "pending",
    icon: "book",
    tone: "green",
  },
  {
    id: "homework",
    title: "숙제",
    detail: "학교 숙제",
    category: "숙제",
    stars: 20,
    points: 20,
    xp: 80,
    status: "pending",
    icon: "notebook",
    tone: "blue",
  },
  {
    id: "math",
    title: "수학",
    detail: "문제집 2쪽",
    category: "자기학습",
    stars: 20,
    points: 20,
    xp: 80,
    status: "pending",
    icon: "calculator",
    tone: "purple",
  },
  {
    id: "brush",
    title: "양치",
    detail: "잠들기 전",
    category: "생활습관",
    stars: 20,
    points: 20,
    xp: 80,
    status: "pending",
    icon: "tooth",
    tone: "mint",
  },
];

export const pianoMissionSeed: MissionSeed = {
  id: "piano",
  title: "피아노",
  detail: "10분 연습",
  category: "예술",
  stars: 15,
  points: 15,
  xp: 70,
  status: "pending",
  icon: "piano",
  tone: "coral",
};

export const initialBookSeeds: BookSeed[] = [
  { id: "mock-book-1", title: "무지개 물고기", color: "rose" },
  { id: "mock-book-2", title: "나무가 자라요", color: "green" },
  { id: "mock-book-3", title: "별빛 학교", color: "blue" },
  { id: "mock-book-4", title: "고양이 정원", color: "yellow" },
  { id: "mock-book-5", title: "작은 탐험", color: "purple" },
];

export const rewardGoal = 200;
export const initialStars = 145;
export const initialPoints = 540;
export const initialXp = 720;
export const initialLevel = 12;

export const mockQuestGardenInitialState: QuestGardenInitialState = {
  avatarName: "솜이",
  books: initialBookSeeds,
  childId: null,
  dailyStreak: 7,
  level: initialLevel,
  missions: initialMissionSeeds,
  points: initialPoints,
  rewardGoal,
  rewardId: null,
  rewardRequested: false,
  source: "mock",
  stars: initialStars,
  xp: initialXp,
};
