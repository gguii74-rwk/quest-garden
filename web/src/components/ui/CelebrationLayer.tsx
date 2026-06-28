import { Confetti } from "@phosphor-icons/react";
import type { Celebration } from "@/lib/questGardenData";

type Props = {
  celebration: Celebration;
  onClose: () => void;
};

export function CelebrationLayer({ celebration, onClose }: Props) {
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
