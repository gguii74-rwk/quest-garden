import { Flower, Sparkle, Trophy } from "@phosphor-icons/react";

type Props = {
  progressPercent: number;
  approvedCount: number;
  missionCount: number;
  gardenMood: string;
  perfectDay: boolean;
};

export function GardenScene({
  progressPercent,
  approvedCount,
  missionCount,
  gardenMood,
  perfectDay,
}: Props) {
  return (
    <section className="garden-scene" aria-label="오늘의 가든">
      <img className="garden-background" src="/assets/storybook-garden-scene.png" alt="꽃과 나무가 자라는 밝은 동화 정원" />
      <div className="garden-title">
        <span className="plant-icon" aria-hidden="true">
          <Flower size={24} weight="fill" />
        </span>
        <strong>오늘의 가든</strong>
      </div>
      <div className="garden-status">
        <Sparkle size={24} weight="fill" />
        <div>
          <strong>{gardenMood}</strong>
          <span>
            {approvedCount}/{missionCount} 미션 완료
          </span>
        </div>
      </div>
      <div className="garden-progress" aria-label={`오늘 진행률 ${progressPercent}%`}>
        <span style={{ width: `${progressPercent}%` }} />
      </div>
      <div className={`rainbow-badge ${perfectDay ? "show" : ""}`}>
        <Trophy size={24} weight="fill" />
        완벽한 하루
      </div>
    </section>
  );
}
