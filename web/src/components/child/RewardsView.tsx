import Image from "next/image";

type Props = {
  stars: number;
  rewardProgress: number;
  remainingStars: number;
  rewardRequesting: boolean;
  rewardRequested: boolean;
  onRequest: () => void;
};

export function RewardsView({
  stars,
  rewardProgress,
  remainingStars,
  rewardRequesting,
  rewardRequested,
  onRequest,
}: Props) {
  return (
    <section className="feature-view">
      <div className="feature-hero">
        <div>
          <span>보상 선반</span>
          <h1>별을 모아 선물을 열어요</h1>
        </div>
      </div>
      <div className="reward-card-large">
        <Image
          src="/assets/ice-cream-reward.png"
          alt="아이스크림 보상"
          width={72}
          height={72}
          sizes="72px"
        />
        <div>
          <strong>아이스크림</strong>
          <p>별 200개를 모으면 가족과 함께 아이스크림을 먹어요.</p>
          <div className="reward-bar">
            <span style={{ width: `${rewardProgress}%` }} />
          </div>
          <small>
            현재 별 {stars}개 · {remainingStars === 0 ? "해금 완료" : `${remainingStars}개 남음`}
          </small>
        </div>
        <button
          type="button"
          disabled={rewardRequesting || rewardRequested}
          onClick={onRequest}
        >
          {rewardRequested ? "요청됨" : remainingStars === 0 ? "받고 싶어요" : "조금 더"}
        </button>
      </div>
    </section>
  );
}
