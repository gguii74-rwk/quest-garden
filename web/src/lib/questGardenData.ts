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

export type MissionStatus = "pending" | "submitted" | "approved";
export type MissionTone = "green" | "blue" | "purple" | "mint" | "coral";

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

export type BookEntry = {
  title: string;
  color: "rose" | "green" | "blue" | "yellow" | "purple";
};

export type StickerEntry = {
  title: string;
  Icon: GameIcon;
  unlocked: boolean;
};

export const initialMissions: Mission[] = [
  {
    id: "read",
    title: "책 읽기",
    detail: "책 3권",
    category: "독서",
    stars: 20,
    points: 20,
    xp: 80,
    status: "pending",
    Icon: BookOpen,
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
    Icon: Notebook,
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
    Icon: Calculator,
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
    Icon: Tooth,
    tone: "mint",
  },
];

export const books: BookEntry[] = [
  { title: "무지개 물고기", color: "rose" },
  { title: "나무가 자라요", color: "green" },
  { title: "별빛 학교", color: "blue" },
  { title: "고양이 정원", color: "yellow" },
  { title: "작은 탐험", color: "purple" },
];

export const stickers: StickerEntry[] = [
  { title: "첫 미션", Icon: SealCheck, unlocked: true },
  { title: "독서왕", Icon: Books, unlocked: true },
  { title: "7일 연속", Icon: Fire, unlocked: true },
  { title: "숙제 영웅", Icon: Trophy, unlocked: false },
  { title: "꽃 정원", Icon: Flower, unlocked: false },
  { title: "보상 해금", Icon: Gift, unlocked: false },
];

export const pianoMission: Mission = {
  id: "piano",
  title: "피아노",
  detail: "10분 연습",
  category: "예술",
  stars: 15,
  points: 15,
  xp: 70,
  status: "pending",
  Icon: PianoKeys,
  tone: "coral",
};

export const rewardGoal = 200;
export const initialStars = 145;
export const initialPoints = 540;
export const initialXp = 720;
export const initialLevel = 12;

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
