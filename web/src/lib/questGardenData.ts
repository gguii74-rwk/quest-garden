import type { ComponentType } from "react";
import {
  BookOpen,
  Books,
  Calculator,
  Fire,
  Flower,
  Gift,
  Notebook,
  PianoKeys,
  SealCheck,
  SmileySticker,
  Star,
  Tooth,
  Trophy,
} from "@phosphor-icons/react";
import {
  initialBookSeeds,
  initialMissionSeeds,
  pianoMissionSeed,
  type BookSeed,
  type MissionIconName,
  type MissionSeed,
  type MissionStatus,
  type MissionTone,
} from "./questGardenState";

export {
  initialLevel,
  initialMissionSeeds,
  initialPoints,
  initialStars,
  initialXp,
  mockQuestGardenInitialState,
  pianoMissionSeed,
  rewardGoal,
} from "./questGardenState";
export type {
  BookColor,
  BookSeed,
  MissionIconName,
  MissionSeed,
  MissionStatus,
  MissionTone,
  QuestGardenInitialState,
} from "./questGardenState";

export type GameIcon = ComponentType<{
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
}>;

export type Mission = {
  id: string;
  title: string;
  detail: string;
  category: string;
  stars: number;
  points: number;
  xp: number;
  status: MissionStatus;
  Icon: GameIcon;
  tone: MissionTone;
};

export type Celebration = {
  title: string;
  body: string;
  type: "submit" | "approve" | "perfect" | "soft";
};

export type BookEntry = BookSeed;

export type StickerEntry = {
  title: string;
  Icon: GameIcon;
  unlocked: boolean;
};

export const missionIcons: Record<MissionIconName, GameIcon> = {
  book: BookOpen,
  calculator: Calculator,
  notebook: Notebook,
  piano: PianoKeys,
  tooth: Tooth,
};

export function missionFromSeed(seed: MissionSeed): Mission {
  const { icon, ...mission } = seed;

  return {
    ...mission,
    Icon: missionIcons[icon],
  };
}

export const initialMissions: Mission[] = initialMissionSeeds.map(missionFromSeed);

export const books: BookEntry[] = initialBookSeeds;

export const stickers: StickerEntry[] = [
  { title: "첫 미션", Icon: SealCheck, unlocked: true },
  { title: "독서왕", Icon: Books, unlocked: true },
  { title: "7일 연속", Icon: Fire, unlocked: true },
  { title: "숙제 영웅", Icon: Trophy, unlocked: false },
  { title: "꽃 정원", Icon: Flower, unlocked: false },
  { title: "보상 해금", Icon: Gift, unlocked: false },
];

export const pianoMission: Mission = missionFromSeed(pianoMissionSeed);

export function statusLabel(status: MissionStatus) {
  if (status === "approved") return "완료됨";
  if (status === "submitted") return "확인 대기";
  return "완료";
}

export function statusClass(status: MissionStatus) {
  return status;
}

export function weeklyDays() {
  return ["월", "화", "수", "목", "금", "토", "일"];
}

export { SmileySticker, Star };
