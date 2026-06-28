"use client";

import { useEffect, useMemo, useState } from "react";
import {
  approveSubmittedMissions,
  rejectMissionSubmission,
  submitMissionForApproval,
} from "@/app/actions/missions";
import { addReadingEntry } from "@/app/actions/reading";
import { requestRewardRedemption } from "@/app/actions/rewards";
import {
  books as defaultBooks,
  missionFromSeed,
  mockQuestGardenInitialState,
  pianoMission,
  rewardGoal as defaultRewardGoal,
  stickers as stickerTemplates,
  type BookEntry,
  type Celebration,
  type Mission,
  type QuestGardenInitialState,
  type StickerEntry,
} from "@/lib/questGardenData";

export type ChildTab = "today" | "rewards" | "books" | "stickers";

export function useQuestGardenState(
  initialState: QuestGardenInitialState = mockQuestGardenInitialState,
) {
  const [missions, setMissions] = useState<Mission[]>(() =>
    initialState.missions.map(missionFromSeed),
  );
  const [avatarName] = useState(initialState.avatarName);
  const [stars, setStars] = useState(initialState.stars);
  const [points, setPoints] = useState(initialState.points);
  const [xp, setXp] = useState(initialState.xp);
  const [level, setLevel] = useState(initialState.level);
  const [readingBooks, setReadingBooks] = useState<BookEntry[]>(
    () => initialState.books ?? defaultBooks,
  );
  const [activeTab, setActiveTab] = useState<ChildTab>("today");
  const [soundOn, setSoundOn] = useState(true);
  const [celebration, setCelebration] = useState<Celebration | null>(null);
  const [rewardRequested, setRewardRequested] = useState(
    initialState.rewardRequested ?? false,
  );
  const [rewardRequesting, setRewardRequesting] = useState(false);
  const [addingBook, setAddingBook] = useState(false);
  const [busyMissionIds, setBusyMissionIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [bulkApproving, setBulkApproving] = useState(false);
  const isSupabaseBacked = initialState.source === "supabase";

  const approvedCount = missions.filter((mission) => mission.status === "approved").length;
  const submittedCount = missions.filter((mission) => mission.status === "submitted").length;
  const progressRate = missions.length ? approvedCount / missions.length : 0;
  const progressPercent = Math.round(progressRate * 100);
  const rewardGoal = initialState.rewardGoal ?? defaultRewardGoal;
  const rewardProgress = Math.min(100, Math.round((stars / rewardGoal) * 100));
  const remainingStars = Math.max(0, rewardGoal - stars);
  const perfectDay = approvedCount === missions.length && missions.length > 0;
  const pendingApprovals = missions.filter((mission) => mission.status === "submitted");
  const dailyStreak = initialState.dailyStreak ?? 0;

  const gardenMood = useMemo(() => {
    if (perfectDay) return "무지개 정원";
    if (progressPercent >= 50) return "꽃이 피는 중";
    if (submittedCount > 0) return "확인만 남았어요";
    return "오늘도 심어요";
  }, [perfectDay, progressPercent, submittedCount]);

  const stickerEntries = useMemo<StickerEntry[]>(() => {
    if (!isSupabaseBacked) return stickerTemplates;

    const hasAnyMissionProgress = missions.some((mission) => mission.status !== "pending");
    const homeworkApproved = missions.some(
      (mission) => mission.title.includes("숙제") && mission.status === "approved",
    );

    return stickerTemplates.map((sticker) => {
      let unlocked = false;

      if (sticker.title === "첫 미션") {
        unlocked = hasAnyMissionProgress;
      } else if (sticker.title === "독서왕") {
        unlocked = readingBooks.length >= 5;
      } else if (sticker.title === "7일 연속") {
        unlocked = dailyStreak >= 7;
      } else if (sticker.title === "숙제 영웅") {
        unlocked = homeworkApproved;
      } else if (sticker.title === "꽃 정원") {
        unlocked = perfectDay;
      } else if (sticker.title === "보상 해금") {
        unlocked = remainingStars === 0 || rewardRequested;
      }

      return { ...sticker, unlocked };
    });
  }, [
    dailyStreak,
    isSupabaseBacked,
    missions,
    perfectDay,
    readingBooks.length,
    remainingStars,
    rewardRequested,
  ]);

  useEffect(() => {
    if (!celebration) return;
    const timer = window.setTimeout(() => setCelebration(null), 2600);
    return () => window.clearTimeout(timer);
  }, [celebration]);

  function setMissionBusy(id: string, busy: boolean) {
    setBusyMissionIds((current) => {
      const next = new Set(current);
      if (busy) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  function setMissionsBusy(ids: string[], busy: boolean) {
    setBusyMissionIds((current) => {
      const next = new Set(current);
      ids.forEach((id) => {
        if (busy) {
          next.add(id);
        } else {
          next.delete(id);
        }
      });
      return next;
    });
  }

  function isMissionBusy(id: string) {
    return bulkApproving || busyMissionIds.has(id);
  }

  function showPersistenceError(message: string) {
    setCelebration({
      title: "저장 실패",
      body: message,
      type: "soft",
    });
  }

  function markMissionSubmitted(id: string) {
    setMissions((current) =>
      current.map((mission) =>
        mission.id === id && mission.status === "pending"
          ? { ...mission, status: "submitted" }
          : mission,
      ),
    );
    setCelebration({
      title: "잘했어요!",
      body: "솜이가 부모님 확인을 기다려요.",
      type: "submit",
    });
  }

  async function submitMission(id: string) {
    const target = missions.find((mission) => mission.id === id);
    if (!target || target.status !== "pending" || isMissionBusy(id)) return;

    if (!isSupabaseBacked) {
      markMissionSubmitted(id);
      return;
    }

    setMissionBusy(id, true);
    const result = await submitMissionForApproval(id);
    setMissionBusy(id, false);

    if (!result.ok) {
      showPersistenceError(result.message);
      return;
    }

    markMissionSubmitted(id);
  }

  function markMissionsApproved(ids: string[], bulk = false) {
    const approvedIds = new Set(ids);
    const targets = missions.filter(
      (mission) => approvedIds.has(mission.id) && mission.status !== "approved",
    );

    if (targets.length === 0) return;

    const earnedStars = targets.reduce((sum, mission) => sum + mission.stars, 0);
    const earnedPoints = targets.reduce((sum, mission) => sum + mission.points, 0);
    const earnedXp = targets.reduce((sum, mission) => sum + mission.xp, 0);
    const nextMissions = missions.map((mission) =>
      approvedIds.has(mission.id)
        ? { ...mission, status: "approved" as const }
        : mission,
    );
    const allApproved = nextMissions.every((mission) => mission.status === "approved");

    setMissions(nextMissions);
    setStars((value) => value + earnedStars);
    setPoints((value) => value + earnedPoints);
    setXp((value) => {
      const next = value + earnedXp;
      if (next >= 1000) {
        setLevel((current) => current + Math.floor(next / 1000));
        return next % 1000;
      }
      return next;
    });
    setCelebration({
      title: allApproved ? "완벽한 하루!" : bulk ? "한 번에 승인!" : "정원이 자랐어요!",
      body: allApproved
        ? "오늘의 미션을 모두 끝냈어요."
        : bulk
          ? `미션 ${targets.length}개를 확인했어요.`
          : `${targets[0].title} 미션이 승인됐어요.`,
      type: allApproved ? "perfect" : "approve",
    });
  }

  async function approveMission(id: string) {
    const target = missions.find((mission) => mission.id === id);
    if (!target || target.status === "approved" || isMissionBusy(id)) return;

    if (!isSupabaseBacked) {
      markMissionsApproved([id]);
      return;
    }

    setMissionBusy(id, true);
    const result = await approveSubmittedMissions([id]);
    setMissionBusy(id, false);

    if (!result.ok) {
      showPersistenceError(result.message);
      return;
    }

    markMissionsApproved(result.approvedIds);
  }

  function markMissionRejected(id: string) {
    const target = missions.find((mission) => mission.id === id);
    setMissions((current) =>
      current.map((mission) =>
        mission.id === id ? { ...mission, status: "pending" } : mission,
      ),
    );
    setCelebration({
      title: "다시 해보자",
      body: target ? `${target.title} 미션을 다시 준비했어요.` : "미션을 다시 준비했어요.",
      type: "soft",
    });
  }

  async function rejectMission(id: string) {
    const target = missions.find((mission) => mission.id === id);
    if (!target || target.status !== "submitted" || isMissionBusy(id)) return;

    if (!isSupabaseBacked) {
      markMissionRejected(id);
      return;
    }

    setMissionBusy(id, true);
    const result = await rejectMissionSubmission(id);
    setMissionBusy(id, false);

    if (!result.ok) {
      showPersistenceError(result.message);
      return;
    }

    markMissionRejected(id);
  }

  async function approveAll() {
    const targets = missions.filter((mission) => mission.status === "submitted");
    if (targets.length === 0) return;

    const ids = targets.map((mission) => mission.id);

    if (!isSupabaseBacked) {
      markMissionsApproved(ids, true);
      return;
    }

    setBulkApproving(true);
    setMissionsBusy(ids, true);
    const result = await approveSubmittedMissions(ids);
    setMissionsBusy(ids, false);
    setBulkApproving(false);

    if (!result.ok) {
      showPersistenceError(result.message);
      return;
    }

    markMissionsApproved(result.approvedIds, true);
  }

  function addPianoMission() {
    if (isSupabaseBacked) {
      setCelebration({
        title: "준비 중",
        body: "DB 미션 추가는 다음 단계에서 연결할게요.",
        type: "soft",
      });
      return;
    }

    if (missions.some((mission) => mission.id === "piano")) {
      setCelebration({
        title: "이미 있어요",
        body: "피아노 미션이 오늘 목록에 있어요.",
        type: "soft",
      });
      return;
    }

    setMissions((current) => [...current, pianoMission]);
    setCelebration({
      title: "미션 추가",
      body: "오늘 피아노 미션이 생겼어요.",
      type: "soft",
    });
  }

  function resetDay() {
    if (isSupabaseBacked) {
      setCelebration({
        title: "준비 중",
        body: "DB 초기화는 다음 단계에서 연결할게요.",
        type: "soft",
      });
      return;
    }

    setMissions(initialState.missions.map(missionFromSeed));
    setStars(initialState.stars);
    setPoints(initialState.points);
    setXp(initialState.xp);
    setLevel(initialState.level);
    setRewardRequested(false);
    setCelebration({
      title: "새 하루",
      body: "오늘의 정원을 다시 시작했어요.",
      type: "soft",
    });
  }

  async function addBook() {
    if (addingBook) return;

    if (!isSupabaseBacked) {
      const nextIndex = readingBooks.length;
      const colors = ["rose", "green", "blue", "yellow", "purple"] as const;

      setReadingBooks((current) => [
        {
          color: colors[nextIndex % colors.length],
          id: `mock-book-${nextIndex + 1}`,
          title: `읽은 책 ${nextIndex + 1}`,
        },
        ...current,
      ]);
      setCelebration({
        title: "책장 추가",
        body: "새 책을 책장에 꽂았어요.",
        type: "soft",
      });
      return;
    }

    if (!initialState.childId) {
      showPersistenceError("자녀 프로필을 찾지 못했습니다.");
      return;
    }

    setAddingBook(true);
    const result = await addReadingEntry(initialState.childId);
    setAddingBook(false);

    if (!result.ok) {
      showPersistenceError(result.message);
      return;
    }

    setReadingBooks((current) => [result.book, ...current]);
    setCelebration({
      title: "책장 추가",
      body: "읽기 기록을 저장했어요.",
      type: "soft",
    });
  }

  async function requestReward() {
    if (remainingStars > 0) {
      setCelebration({
        title: "조금만 더!",
        body: `별 ${remainingStars}개를 더 모으면 아이스크림을 받을 수 있어요.`,
        type: "soft",
      });
      return;
    }

    if (rewardRequested || rewardRequesting) return;

    if (isSupabaseBacked) {
      if (!initialState.rewardId) {
        showPersistenceError("요청할 수 있는 보상을 찾지 못했습니다.");
        return;
      }

      setRewardRequesting(true);
      const result = await requestRewardRedemption(initialState.rewardId);
      setRewardRequesting(false);

      if (!result.ok) {
        showPersistenceError(result.message);
        return;
      }
    }

    setRewardRequested(true);
    setCelebration({
      title: "보상 요청!",
      body: "부모님에게 아이스크림 보상을 요청했어요.",
      type: "perfect",
    });
  }

  return {
    activeTab,
    addingBook,
    addBook,
    approvedCount,
    avatarName,
    books: readingBooks,
    bulkApproving,
    celebration,
    gardenMood,
    isMissionBusy,
    level,
    loadError: initialState.loadError ?? null,
    missions,
    needsOnboarding: initialState.needsOnboarding ?? false,
    pendingApprovals,
    perfectDay,
    points,
    progressPercent,
    remainingStars,
    rewardGoal,
    rewardProgress,
    rewardRequesting,
    rewardRequested,
    soundOn,
    source: initialState.source,
    stars,
    stickers: stickerEntries,
    xp,
    addPianoMission,
    approveAll,
    approveMission,
    rejectMission,
    requestReward,
    resetDay,
    setActiveTab,
    setCelebration,
    setRewardRequested,
    setSoundOn,
    submitMission,
  };
}

export type QuestGardenState = ReturnType<typeof useQuestGardenState>;
