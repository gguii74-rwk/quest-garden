import { Books, Gift, House, PawPrint, Sticker } from "@phosphor-icons/react";
import { ChildTopBar } from "./ChildTopBar";
import { GardenScene } from "./GardenScene";
import { MissionList } from "./MissionList";
import { ReadingView } from "./ReadingView";
import { RewardStrip } from "./RewardStrip";
import { RewardsView } from "./RewardsView";
import { StickerView } from "./StickerView";
import type { ChildTab, QuestGardenState } from "@/features/quest-garden/useQuestGardenState";

type Props = {
  game: QuestGardenState;
};

export function ChildMode({ game }: Props) {
  return (
    <section className="child-app" aria-label="아이 모드">
      <ChildTopBar
        avatarName={game.avatarName}
        level={game.level}
        xp={game.xp}
        stars={game.stars}
        soundOn={game.soundOn}
        onToggleSound={() => game.setSoundOn((value) => !value)}
      />

      {game.activeTab === "today" && (
        <>
          <GardenScene
            progressPercent={game.progressPercent}
            approvedCount={game.approvedCount}
            missionCount={game.missions.length}
            gardenMood={game.gardenMood}
            perfectDay={game.perfectDay}
          />
          <RewardStrip
            stars={game.stars}
            rewardGoal={game.rewardGoal}
            rewardProgress={game.rewardProgress}
            remainingStars={game.remainingStars}
            rewardRequesting={game.rewardRequesting}
            rewardRequested={game.rewardRequested}
            onRequest={game.requestReward}
          />
          <MissionList
            missions={game.missions}
            onSubmit={game.submitMission}
            isMissionBusy={game.isMissionBusy}
          />
        </>
      )}

      {game.activeTab === "rewards" && (
        <RewardsView
          stars={game.stars}
          rewardProgress={game.rewardProgress}
          remainingStars={game.remainingStars}
          rewardRequesting={game.rewardRequesting}
          rewardRequested={game.rewardRequested}
          onRequest={game.requestReward}
        />
      )}

      {game.activeTab === "books" && (
        <ReadingView
          addingBook={game.addingBook}
          books={game.books}
          onAddBook={game.addBook}
        />
      )}
      {game.activeTab === "stickers" && <StickerView stickers={game.stickers} />}

      <ChildNav activeTab={game.activeTab} onChange={game.setActiveTab} />
    </section>
  );
}

function ChildNav({
  activeTab,
  onChange,
}: {
  activeTab: ChildTab;
  onChange: (tab: ChildTab) => void;
}) {
  const items = [
    { id: "today" as const, label: "가든", Icon: House },
    { id: "rewards" as const, label: "보상", Icon: Gift },
    { id: "books" as const, label: "책장", Icon: Books },
    { id: "stickers" as const, label: "스티커", Icon: Sticker },
  ];

  return (
    <nav className="child-nav" aria-label="아이 모드 메뉴">
      {items.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={activeTab === id ? "active" : ""}
          type="button"
          onClick={() => onChange(id)}
        >
          <Icon size={30} weight="duotone" />
          <span>{label}</span>
        </button>
      ))}
      <PawPrint className="nav-paw" size={0} aria-hidden="true" />
    </nav>
  );
}
