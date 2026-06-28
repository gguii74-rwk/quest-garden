import { PawPrint, Star } from "@phosphor-icons/react";
import { statusClass, statusLabel, type Mission } from "@/lib/questGardenData";

type Props = {
  missions: Mission[];
  onSubmit: (missionId: string) => void;
};

export function MissionList({ missions, onSubmit }: Props) {
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

function MissionRow({ mission, onSubmit }: { mission: Mission; onSubmit: (missionId: string) => void }) {
  const Icon = mission.Icon;

  return (
    <article className={`mission-row ${statusClass(mission.status)}`}>
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
