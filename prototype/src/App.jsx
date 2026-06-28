import { useEffect, useMemo, useState } from "react";
import {
  Backpack,
  BookOpen,
  Books,
  Broom,
  Calculator,
  CalendarCheck,
  CheckCircle,
  Clock,
  Confetti,
  Fire,
  Flower,
  GearSix,
  Gift,
  House,
  MapTrifold,
  Medal,
  Notebook,
  PawPrint,
  PianoKeys,
  Plus,
  SealCheck,
  SmileySticker,
  Sparkle,
  SpeakerHigh,
  SpeakerSlash,
  Star,
  Sticker,
  Tooth,
  Trophy,
  UserSwitch,
} from "@phosphor-icons/react";
import somiCat from "./assets/somi-persian-cat.png";
import gardenScene from "./assets/storybook-garden-scene.png";
import iceCreamReward from "./assets/ice-cream-reward.png";

const initialMissions = [
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

const books = [
  { title: "무지개 물고기", color: "rose" },
  { title: "나무가 자라요", color: "green" },
  { title: "별빛 학교", color: "blue" },
  { title: "고양이 정원", color: "yellow" },
  { title: "작은 탐험", color: "purple" },
];

const stickers = [
  { title: "첫 미션", Icon: SealCheck, unlocked: true },
  { title: "독서왕", Icon: Books, unlocked: true },
  { title: "7일 연속", Icon: Fire, unlocked: true },
  { title: "숙제 영웅", Icon: Trophy, unlocked: false },
  { title: "꽃 정원", Icon: Flower, unlocked: false },
  { title: "보상 해금", Icon: Gift, unlocked: false },
];

function statusLabel(status) {
  if (status === "approved") return "완료됨";
  if (status === "submitted") return "확인 대기";
  return "완료";
}

function modeLabel(status) {
  if (status === "approved") return "approved";
  if (status === "submitted") return "submitted";
  return "pending";
}

export function App() {
  const [missions, setMissions] = useState(initialMissions);
  const [stars, setStars] = useState(145);
  const [points, setPoints] = useState(540);
  const [xp, setXp] = useState(720);
  const [level, setLevel] = useState(12);
  const [activeTab, setActiveTab] = useState("today");
  const [soundOn, setSoundOn] = useState(true);
  const [celebration, setCelebration] = useState(null);
  const [rewardRequested, setRewardRequested] = useState(false);

  const approvedCount = missions.filter((mission) => mission.status === "approved").length;
  const submittedCount = missions.filter((mission) => mission.status === "submitted").length;
  const progressRate = missions.length ? approvedCount / missions.length : 0;
  const progressPercent = Math.round(progressRate * 100);
  const rewardGoal = 200;
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
    if (!celebration) return undefined;
    const timer = window.setTimeout(() => setCelebration(null), 2600);
    return () => window.clearTimeout(timer);
  }, [celebration]);

  function submitMission(id) {
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

  function approveMission(id) {
    const target = missions.find((mission) => mission.id === id);
    if (!target || target.status === "approved") return;

    setMissions((current) => {
      const next = current.map((mission) =>
        mission.id === id ? { ...mission, status: "approved" } : mission,
      );
      const allApproved = next.every((mission) => mission.status === "approved");
      setCelebration({
        title: allApproved ? "완벽한 하루!" : "정원이 자랐어요!",
        body: allApproved ? "오늘의 미션을 모두 끝냈어요." : `${target.title} 미션이 승인됐어요.`,
        type: allApproved ? "perfect" : "approve",
      });
      return next;
    });

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
  }

  function rejectMission(id) {
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
    pendingApprovals.forEach((mission) => approveMission(mission.id));
  }

  function addPianoMission() {
    const exists = missions.some((mission) => mission.id === "piano");
    if (exists) {
      setCelebration({
        title: "이미 있어요",
        body: "피아노 미션이 오늘 목록에 있어요.",
        type: "soft",
      });
      return;
    }

    setMissions((current) => [
      ...current,
      {
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
      },
    ]);
    setCelebration({
      title: "미션 추가",
      body: "오늘 피아노 미션이 생겼어요.",
      type: "soft",
    });
  }

  function resetDay() {
    setMissions(initialMissions);
    setStars(145);
    setPoints(540);
    setXp(720);
    setLevel(12);
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

  return (
    <main className="app-shell">
      <section className="child-app" aria-label="아이 모드">
        <ChildTopBar
          level={level}
          xp={xp}
          stars={stars}
          soundOn={soundOn}
          onToggleSound={() => setSoundOn((value) => !value)}
        />

        {activeTab === "today" && (
          <>
            <GardenScene
              progressPercent={progressPercent}
              approvedCount={approvedCount}
              missionCount={missions.length}
              gardenMood={gardenMood}
              perfectDay={perfectDay}
            />
            <RewardStrip
              stars={stars}
              rewardGoal={rewardGoal}
              rewardProgress={rewardProgress}
              remainingStars={remainingStars}
              rewardRequested={rewardRequested}
              onRequest={requestReward}
            />
            <MissionList missions={missions} onSubmit={submitMission} />
          </>
        )}

        {activeTab === "rewards" && (
          <RewardsView
            stars={stars}
            rewardProgress={rewardProgress}
            remainingStars={remainingStars}
            rewardRequested={rewardRequested}
            onRequest={requestReward}
          />
        )}

        {activeTab === "books" && <ReadingView />}

        {activeTab === "stickers" && <StickerView />}

        <ChildNav activeTab={activeTab} onChange={setActiveTab} />
      </section>

      <ParentPanel
        missions={missions}
        points={points}
        stars={stars}
        progressPercent={progressPercent}
        pendingApprovals={pendingApprovals}
        rewardRequested={rewardRequested}
        onApprove={approveMission}
        onReject={rejectMission}
        onApproveAll={approveAll}
        onAddMission={addPianoMission}
        onReset={resetDay}
        onRedeemReward={() => setRewardRequested(false)}
      />

      {celebration && <CelebrationLayer celebration={celebration} onClose={() => setCelebration(null)} />}
    </main>
  );
}

function ChildTopBar({ level, xp, stars, soundOn, onToggleSound }) {
  return (
    <header className="child-topbar">
      <div className="avatar-chip">
        <img src={somiCat} alt="하얀색 페르시안 고양이 솜이" />
        <div>
          <strong>솜이</strong>
          <span>Lv. {level}</span>
        </div>
      </div>

      <div className="top-stat xp-stat" aria-label={`경험치 ${xp} / 1000`}>
        <Medal size={30} weight="duotone" />
        <div>
          <strong>{xp}</strong>
          <span>/ 1000 XP</span>
        </div>
      </div>

      <div className="top-stat">
        <Star size={34} weight="fill" />
        <strong>{stars}</strong>
      </div>

      <div className="top-stat streak">
        <Fire size={32} weight="fill" />
        <strong>7일 연속!</strong>
      </div>

      <button className="icon-button" type="button" aria-label="설정">
        <GearSix size={30} weight="duotone" />
      </button>

      <button className="icon-button" type="button" aria-label="소리 켜기 끄기" onClick={onToggleSound}>
        {soundOn ? <SpeakerHigh size={30} weight="duotone" /> : <SpeakerSlash size={30} weight="duotone" />}
      </button>
    </header>
  );
}

function GardenScene({ progressPercent, approvedCount, missionCount, gardenMood, perfectDay }) {
  return (
    <section className="garden-scene" aria-label="오늘의 가든">
      <img className="garden-background" src={gardenScene} alt="꽃과 나무가 자라는 밝은 동화 정원" />
      <div className="garden-title">
        <PlantIcon />
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

function PlantIcon() {
  return (
    <span className="plant-icon" aria-hidden="true">
      <Flower size={24} weight="fill" />
    </span>
  );
}

function RewardStrip({
  stars,
  rewardGoal,
  rewardProgress,
  remainingStars,
  rewardRequested,
  onRequest,
}) {
  const unlocked = remainingStars === 0;
  return (
    <section className="reward-strip" aria-label="보상 진행">
      <img src={iceCreamReward} alt="아이스크림 보상" />
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

function MissionList({ missions, onSubmit }) {
  return (
    <section className="mission-panel" aria-label="오늘의 미션">
      <div className="section-heading">
        <div>
          <span>오늘의 미션</span>
          <h1>하나씩 끝내면 정원이 자라요</h1>
        </div>
        <PawPrint size={30} weight="duotone" />
      </div>

      <div className="mission-list">
        {missions.map((mission) => (
          <MissionRow key={mission.id} mission={mission} onSubmit={onSubmit} />
        ))}
      </div>
    </section>
  );
}

function MissionRow({ mission, onSubmit }) {
  const Icon = mission.Icon;
  return (
    <article className={`mission-row ${modeLabel(mission.status)}`}>
      <div className={`mission-icon ${mission.tone}`}>
        <Icon size={38} weight="duotone" />
      </div>
      <div className="mission-copy">
        <strong>{mission.title}</strong>
        <span>{mission.detail}</span>
      </div>
      <div className="mission-stars">
        <Star size={22} weight="fill" />
        <strong>{mission.stars}</strong>
      </div>
      <button
        className="complete-button"
        type="button"
        disabled={mission.status !== "pending"}
        onClick={() => onSubmit(mission.id)}
      >
        {statusLabel(mission.status)}
      </button>
    </article>
  );
}

function ChildNav({ activeTab, onChange }) {
  const items = [
    { id: "today", label: "가든", Icon: House },
    { id: "rewards", label: "보상", Icon: Gift },
    { id: "books", label: "책장", Icon: Books },
    { id: "stickers", label: "스티커", Icon: Sticker },
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
    </nav>
  );
}

function RewardsView({ stars, rewardProgress, remainingStars, rewardRequested, onRequest }) {
  return (
    <section className="feature-view">
      <div className="feature-hero">
        <Gift size={42} weight="duotone" />
        <div>
          <span>보상 선반</span>
          <h1>별을 모아 선물을 열어요</h1>
        </div>
      </div>
      <div className="reward-card-large">
        <img src={iceCreamReward} alt="아이스크림 보상" />
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
        <button type="button" onClick={onRequest}>
          {rewardRequested ? "요청됨" : remainingStars === 0 ? "받고 싶어요" : "조금 더"}
        </button>
      </div>
    </section>
  );
}

function ReadingView() {
  return (
    <section className="feature-view">
      <div className="feature-hero">
        <Books size={42} weight="duotone" />
        <div>
          <span>책장</span>
          <h1>이번 주 5권을 읽었어요</h1>
        </div>
      </div>
      <div className="bookshelf" aria-label="이번 주 책장">
        {books.map((book, index) => (
          <div className={`book-cover ${book.color}`} key={book.title}>
            <BookOpen size={28} weight="duotone" />
            <strong>{book.title}</strong>
            <span>{index + 1}</span>
          </div>
        ))}
      </div>
      <button className="wide-action" type="button">
        <Plus size={24} weight="bold" />
        책 1권 추가
      </button>
    </section>
  );
}

function StickerView() {
  return (
    <section className="feature-view">
      <div className="feature-hero">
        <SmileySticker size={42} weight="duotone" />
        <div>
          <span>스티커북</span>
          <h1>솜이와 모은 칭찬 스티커</h1>
        </div>
      </div>
      <div className="sticker-grid">
        {stickers.map(({ title, Icon, unlocked }) => (
          <div className={unlocked ? "sticker-tile unlocked" : "sticker-tile"} key={title}>
            <Icon size={38} weight={unlocked ? "duotone" : "regular"} />
            <strong>{title}</strong>
            <span>{unlocked ? "획득" : "잠김"}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ParentPanel({
  missions,
  points,
  stars,
  progressPercent,
  pendingApprovals,
  rewardRequested,
  onApprove,
  onReject,
  onApproveAll,
  onAddMission,
  onReset,
  onRedeemReward,
}) {
  return (
    <aside className="parent-panel" aria-label="부모 대시보드">
      <div className="parent-header">
        <div>
          <span>부모 대시보드</span>
          <h2>1분 관리</h2>
        </div>
        <button className="mode-switch" type="button">
          <UserSwitch size={22} weight="duotone" />
          아이 모드
        </button>
      </div>

      <div className="parent-stats">
        <div>
          <strong>{progressPercent}%</strong>
          <span>오늘 완료율</span>
        </div>
        <div>
          <strong>{pendingApprovals.length}</strong>
          <span>승인 대기</span>
        </div>
        <div>
          <strong>{points}</strong>
          <span>포인트</span>
        </div>
      </div>

      <section className="approval-box">
        <div className="box-heading">
          <h3>승인 대기</h3>
          <button type="button" onClick={onApproveAll} disabled={pendingApprovals.length === 0}>
            전체 승인
          </button>
        </div>

        {pendingApprovals.length === 0 ? (
          <div className="empty-state">
            <Clock size={30} weight="duotone" />
            <p>아직 확인할 미션이 없어요.</p>
          </div>
        ) : (
          <div className="approval-list">
            {pendingApprovals.map((mission) => (
              <div className="approval-row" key={mission.id}>
                <div>
                  <strong>{mission.title}</strong>
                  <span>
                    별 {mission.stars} · {mission.category}
                  </span>
                </div>
                <div className="approval-actions">
                  <button type="button" onClick={() => onApprove(mission.id)}>
                    승인
                  </button>
                  <button type="button" onClick={() => onReject(mission.id)}>
                    되돌림
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="quick-actions">
        <h3>빠른 작업</h3>
        <button type="button" onClick={onAddMission}>
          <Plus size={22} weight="bold" />
          피아노 미션 추가
        </button>
        <button type="button" onClick={onReset}>
          <CalendarCheck size={22} weight="duotone" />
          오늘 상태 초기화
        </button>
      </section>

      <section className="reward-request">
        <div>
          <Gift size={28} weight="duotone" />
          <div>
            <strong>아이스크림 보상</strong>
            <span>현재 별 {stars}개</span>
          </div>
        </div>
        {rewardRequested ? (
          <button type="button" onClick={onRedeemReward}>
            지급 완료
          </button>
        ) : (
          <span className="quiet-label">요청 없음</span>
        )}
      </section>

      <section className="weekly-strip" aria-label="주간 진행">
        <h3>이번 주</h3>
        <div>
          {["월", "화", "수", "목", "금", "토", "일"].map((day, index) => (
            <span className={index < 5 ? "done" : index === 5 ? "today" : ""} key={day}>
              <Star size={18} weight={index < 6 ? "fill" : "regular"} />
              {day}
            </span>
          ))}
        </div>
      </section>
    </aside>
  );
}

function CelebrationLayer({ celebration, onClose }) {
  return (
    <div className={`celebration ${celebration.type}`} role="status" aria-live="polite">
      <div className="celebration-card">
        <Confetti size={48} weight="duotone" />
        <strong>{celebration.title}</strong>
        <p>{celebration.body}</p>
        <button type="button" onClick={onClose}>
          좋아요
        </button>
      </div>
    </div>
  );
}
