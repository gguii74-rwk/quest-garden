import Image from "next/image";
import {
  Fire,
  GearSix,
  Medal,
  SpeakerHigh,
  SpeakerSlash,
  Star,
} from "@phosphor-icons/react";

type Props = {
  avatarName: string;
  level: number;
  xp: number;
  stars: number;
  soundOn: boolean;
  onToggleSound: () => void;
};

export function ChildTopBar({
  avatarName,
  level,
  xp,
  stars,
  soundOn,
  onToggleSound,
}: Props) {
  return (
    <header className="child-topbar">
      <div className="avatar-chip">
        <Image
          src="/assets/somi-persian-cat.png"
          alt={`하얀색 페르시안 고양이 ${avatarName}`}
          width={56}
          height={56}
          sizes="56px"
        />
        <div>
          <strong>{avatarName}</strong>
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
