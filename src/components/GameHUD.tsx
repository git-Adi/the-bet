import LivesDisplay from "./LivesDisplay";
import ProgressDisplay from "./ProgressDisplay";

interface Props {
  lives: number;
  maxLives: number;
  correct: number;
  required: number;
  attempt: number;
  maxAttempts: number;
}

export default function GameHUD({
  lives,
  maxLives,
  correct,
  required,
  attempt,
  maxAttempts,
}: Props) {
  return (
    <div className="w-full max-w-[min(94vw,540px)] glass rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <div className="uppercase text-[10px] tracking-[0.35em] text-white/40">
            the bet
          </div>
          <div className="font-display text-xl leading-tight text-white/90">
            Attempt {attempt} / {maxAttempts}
          </div>
        </div>
        <LivesDisplay lives={lives} max={maxLives} />
      </div>
      <div className="mt-3">
        <ProgressDisplay correct={correct} required={required} />
      </div>
    </div>
  );
}
