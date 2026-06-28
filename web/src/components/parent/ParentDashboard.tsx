import {
  CalendarCheck,
  Clock,
  Gift,
  Plus,
  Star,
  UserSwitch,
} from "@phosphor-icons/react";
import type { QuestGardenState } from "@/features/quest-garden/useQuestGardenState";
import { weeklyDays } from "@/lib/questGardenData";

type Props = {
  game: QuestGardenState;
};

export function ParentDashboard({ game }: Props) {
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
          <strong>{game.progressPercent}%</strong>
          <span>오늘 완료율</span>
        </div>
        <div>
          <strong>{game.pendingApprovals.length}</strong>
          <span>승인 대기</span>
        </div>
        <div>
          <strong>{game.points}</strong>
          <span>포인트</span>
        </div>
      </div>

      <section className="approval-box">
        <div className="box-heading">
          <h3>승인 대기</h3>
          <button
            type="button"
            onClick={game.approveAll}
            disabled={game.pendingApprovals.length === 0}
          >
            전체 승인
          </button>
        </div>

        {game.pendingApprovals.length === 0 ? (
          <div className="empty-state">
            <Clock size={30} weight="duotone" />
            <p>아직 확인할 미션이 없어요.</p>
          </div>
        ) : (
          <div className="approval-list">
            {game.pendingApprovals.map((mission) => (
              <div className="approval-row" key={mission.id}>
                <div>
                  <strong>{mission.title}</strong>
                  <span>
                    별 {mission.stars} · {mission.category}
                  </span>
                </div>
                <div className="approval-actions">
                  <button type="button" onClick={() => game.approveMission(mission.id)}>
                    승인
                  </button>
                  <button type="button" onClick={() => game.rejectMission(mission.id)}>
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
        <button type="button" onClick={game.addPianoMission}>
          <Plus size={22} weight="bold" />
          피아노 미션 추가
        </button>
        <button type="button" onClick={game.resetDay}>
          <CalendarCheck size={22} weight="duotone" />
          오늘 상태 초기화
        </button>
      </section>

      <section className="reward-request">
        <div>
          <Gift size={28} weight="duotone" />
          <div>
            <strong>아이스크림 보상</strong>
            <span>현재 별 {game.stars}개</span>
          </div>
        </div>
        {game.rewardRequested ? (
          <button type="button" onClick={() => game.setRewardRequested(false)}>
            지급 완료
          </button>
        ) : (
          <span className="quiet-label">요청 없음</span>
        )}
      </section>

      <section className="weekly-strip" aria-label="주간 진행">
        <h3>이번 주</h3>
        <div>
          {weeklyDays().map((day, index) => (
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
