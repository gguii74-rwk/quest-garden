"use client";

import { ChildMode } from "@/components/child/ChildMode";
import { ParentDashboard } from "@/components/parent/ParentDashboard";
import { CelebrationLayer } from "@/components/ui/CelebrationLayer";
import { useQuestGardenState } from "./useQuestGardenState";
import type { QuestGardenInitialState } from "@/lib/questGardenData";

type Props = {
  initialState?: QuestGardenInitialState;
};

export function QuestGardenApp({ initialState }: Props) {
  const game = useQuestGardenState(initialState);

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
