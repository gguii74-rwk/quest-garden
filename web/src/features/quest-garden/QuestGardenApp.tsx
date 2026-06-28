"use client";

import { ChildMode } from "@/components/child/ChildMode";
import { ParentDashboard } from "@/components/parent/ParentDashboard";
import { CelebrationLayer } from "@/components/ui/CelebrationLayer";
import { useQuestGardenState } from "./useQuestGardenState";

export function QuestGardenApp() {
  const game = useQuestGardenState();

  return (
    <main className="app-shell">
      <ChildMode game={game} />
      <ParentDashboard game={game} />
      {game.celebration && (
        <CelebrationLayer
          celebration={game.celebration}
          onClose={() => game.setCelebration(null)}
        />
      )}
    </main>
  );
}
