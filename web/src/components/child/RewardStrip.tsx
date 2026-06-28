import { Star } from "@phosphor-icons/react";

type Props = {
  stars: number;
  rewardGoal: number;
  rewardProgress: number;
  remainingStars: number;
  rewardRequested: boolean;
  onRequest: () => void;
};

export function RewardStrip({
  stars,
  rewardGoal,
  rewardProgress,
  remainingStars,
  rewardRequested,
  onRequest,
}: Props) {
  const unlocked = remainingStars === 0;

  return (
    <section className="reward-strip" aria-label="보상 진행">
      <img src="/assets/ice-cream-reward.png" alt="아이스크림 보상" />
      <div className="reward-content">
        <div className="reward-title">
          <strong>아이스크림</strong>
          <span>
            <Star size={18} weight="fill" /> {stars} / {rewardGoal}
          </span>
        </div>
        <div className="reward-bar" aria-label={`아이스크림 보상 진행률 ${rewardProgress}%`}>
          <span style={{ width: `${rewardProgress}%` }} />
        </div>
        <small>{unlocked ? "보상을 받을 수 있어요!" : `별 ${remainingStars}개 더 모으면 열려요.`}</small>
      </div>
      <button className={unlocked ? "reward-action unlocked" : "reward-action"} type="button" onClick={onRequest}>
        {rewardRequested ? "요청됨" : unlocked ? "요청" : "잠김"}
      </button>
    </section>
  );
}
