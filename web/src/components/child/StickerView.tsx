import { SmileySticker } from "@phosphor-icons/react";
import { stickers } from "@/lib/questGardenData";

export function StickerView() {
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
