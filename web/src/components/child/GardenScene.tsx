import Image from "next/image";
import { Flower, Sparkle, Trophy } from "@phosphor-icons/react";

type Props = {
  avatarName: string;
  catReactionKey: number;
  progressPercent: number;
  approvedCount: number;
  missionCount: number;
  gardenMood: string;
  perfectDay: boolean;
};

export function GardenScene({
  avatarName,
  catReactionKey,
  progressPercent,
  approvedCount,
  missionCount,
  gardenMood,
  perfectDay,
}: Props) {
  return (
    <section className="garden-scene" aria-label="오늘의 가든">
      <Image
        className="garden-background"
        src="/assets/storybook-garden-background.png"
        alt="꽃과 나무가 자라는 밝은 동화 정원"
        fill
        priority
        sizes="(max-width: 900px) 100vw, 560px"
      />
      <div
        key={catReactionKey}
        className={`garden-cat ${catReactionKey > 0 ? "stage-reacting" : ""}`}
        aria-hidden="true"
      >
        <Image
          className="garden-cat-image"
          src="/assets/somi-persian-cat-cutout.png"
          alt=""
          width={842}
          height={1145}
          sizes="(max-width: 760px) 180px, 265px"
        />
        <span className="cat-joy-sparkle sparkle-one" />
        <span className="cat-joy-sparkle sparkle-two" />
        <span className="cat-joy-sparkle sparkle-three" />
      </div>
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
      <span className="sr-only">
        하얀색 페르시안 고양이 {avatarName}가 정원에서 함께하고 있어요.
      </span>
    </section>
  );
}
