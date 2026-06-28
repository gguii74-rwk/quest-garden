"use client";

import { useEffect, useMemo, useState } from "react";
import {
  initialLevel,
  initialMissions,
  initialPoints,
  initialStars,
  initialXp,
  pianoMission,
  rewardGoal,
  type Celebration,
  type Mission,
} from "@/lib/questGardenData";

export type ChildTab = "today" | "rewards" | "books" | "stickers";

export function useQuestGardenState() {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [stars, setStars] = useState(initialStars);
  const [points, setPoints] = useState(initialPoints);
  const [xp, setXp] = useState(initialXp);
  const [level, setLevel] = useState(initialLevel);
  const [activeTab, setActiveTab] = useState<ChildTab>("today");
  const [soundOn, setSoundOn] = useState(true);
  const [celebration, setCelebration] = useState<Celebration | null>(null);
  const [rewardRequested, setRewardRequested] = useState(false);

  const approvedCount = missions.filter((mission) => mission.status === "approved").length;
  const submittedCount = missions.filter((mission) => mission.status === "submitted").length;
  const progressRate = missions.length ? approvedCount / missions.length : 0;
  const progressPercent = Math.round(progressRate * 100);
  const rewardProgress = Math.min(100, Math.round((stars / rewardGoal) * 100));
  const remainingStars = Math.max(0, rewardGoal - stars);
  const perfectDay = approvedCount === missions.length && missions.length > 0;
  const pendingApprovals = missions.filter((mission) => mission.status === "submitted");

  const gardenMood = useMemo(() => {
    if (perfectDay) return "무지개 정원";
    if (progressPercent >= 50) return "꽃이 피는 중";
    if (submittedCount > 0) return "확인만 남았어요";
    return "오늘도 심어요";
  }, [perfectDay, progressPercent, submittedCount]);

  useEffect(() => {
    if (!celebration) return;
    const timer = window.setTimeout(() => setCelebration(null), 2600);
    return () => window.clearTimeout(timer);
  }, [celebration]);

  function submitMission(id: string) {
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

  function approveMission(id: string) {
    const target = missions.find((mission) => mission.id === id);
    if (!target || target.status === "approved") return;

    const nextMissions = missions.map((mission) =>
      mission.id === id ? { ...mission, status: "approved" as const } : mission,
    );
    const allApproved = nextMissions.every((mission) => mission.status === "approved");

    setMissions(nextMissions);
    setStars((value) => value + target.stars);
    setPoints((value) => value + target.points);
    setXp((value) => {
      const next = value + target.xp;
      if (next >= 1000) {
        setLevel((current) => current + 1);
        return next - 1000;
      }
      return next;
    });
    setCelebration({
      title: allApproved ? "완벽한 하루!" : "정원이 자랐어요!",
      body: allApproved ? "오늘의 미션을 모두 끝냈어요." : `${target.title} 미션이 승인됐어요.`,
      type: allApproved ? "perfect" : "approve",
    });
  }

  function rejectMission(id: string) {
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

  function approveAll() {
    const targets = missions.filter((mission) => mission.status === "submitted");
    if (targets.length === 0) return;

    const earnedStars = targets.reduce((sum, mission) => sum + mission.stars, 0);
    const earnedPoints = targets.reduce((sum, mission) => sum + mission.points, 0);
    const earnedXp = targets.reduce((sum, mission) => sum + mission.xp, 0);
    const nextMissions = missions.map((mission) =>
      mission.status === "submitted" ? { ...mission, status: "approved" as const } : mission,
    );

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
      title: nextMissions.every((mission) => mission.status === "approved")
        ? "완벽한 하루!"
        : "한 번에 승인!",
      body: `미션 ${targets.length}개를 확인했어요.`,
      type: "perfect",
    });
  }

  function addPianoMission() {
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
    setMissions(initialMissions);
    setStars(initialStars);
    setPoints(initialPoints);
    setXp(initialXp);
    setLevel(initialLevel);
    setRewardRequested(false);
    setCelebration({
      title: "새 하루",
      body: "오늘의 정원을 다시 시작했어요.",
      type: "soft",
    });
  }

  function requestReward() {
    if (remainingStars > 0) {
      setCelebration({
        title: "조금만 더!",
        body: `별 ${remainingStars}개를 더 모으면 아이스크림을 받을 수 있어요.`,
        type: "soft",
      });
      return;
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
    approvedCount,
    celebration,
    gardenMood,
    level,
    missions,
    pendingApprovals,
    perfectDay,
    points,
    progressPercent,
    remainingStars,
    rewardProgress,
    rewardRequested,
    soundOn,
    stars,
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
