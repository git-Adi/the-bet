import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import GameBoard from "./GameBoard";
import GameHUD from "./GameHUD";
import WrongTileMessage from "./WrongTileMessage";
import { useGameState } from "../hooks/useGameState";
import {
  correctMessages,
  pick,
  wrongMessageSecond,
  wrongMessageThird,
  wrongMessagesFirst,
} from "../utils/messages";
import { gameConfig } from "../config/gameConfig";

type Toast = { id: number; text: string; tone: "good" | "bad" };

interface Props {
  game: ReturnType<typeof useGameState>;
}

export default function GameScreen({ game }: Props) {
  const { state, flipTile } = game;
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [correctStreak, setCorrectStreak] = useState(0);

  const pushToast = useCallback((text: string, tone: "good" | "bad") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, tone }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2200);
  }, []);

  const handleTileClick = useCallback(
    (index: number) => {
      const tile = state.tiles[index];
      if (!tile || tile.revealed || state.phase !== "playing") return;

      flipTile(index);

      if (tile.kind === "her") {
        const nextStreak = correctStreak + 1;
        setCorrectStreak(nextStreak);
        if (nextStreak % 3 === 0 || Math.random() < 0.25) {
          pushToast(pick(correctMessages), "good");
        }
      } else {
        setCorrectStreak(0);
        const livesAfter = state.livesRemaining - 1;
        if (livesAfter === 1) pushToast(wrongMessageSecond, "bad");
        else if (livesAfter === 0) pushToast(wrongMessageThird, "bad");
        else pushToast(pick(wrongMessagesFirst), "bad");
      }
    },
    [state, flipTile, correctStreak, pushToast]
  );

  return (
    <div className="min-h-screen safe-pad px-4 py-4 sm:py-6 flex flex-col items-center">
      <GameHUD
        lives={state.livesRemaining}
        maxLives={gameConfig.totalLives}
        correct={state.correctCount}
        required={gameConfig.requiredCorrectTiles}
        attempt={state.attemptNumber}
        maxAttempts={gameConfig.maxAttempts}
      />

      <div className="w-full max-w-[min(94vw,540px)] mt-4">
        <GameBoard tiles={state.tiles} onTileClick={handleTileClick} />
      </div>

      <div className="fixed inset-x-0 bottom-6 flex flex-col items-center gap-2 pointer-events-none z-40 px-4">
        <AnimatePresence>
          {toasts.map((t) => (
            <WrongTileMessage key={t.id} text={t.text} tone={t.tone} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
