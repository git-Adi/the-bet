import { useCallback, useEffect, useMemo } from "react";
import { gameConfig } from "../config/gameConfig";
import { PersistedGameState, Tile } from "../types/game";
import { createSeed, generateBoard } from "../utils/board";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "the-bet:v6";

function makeFreshState(attempt: number, priorRecoveryUsed: boolean): PersistedGameState {
  const seed = createSeed();
  return {
    phase: "landing",
    attemptNumber: attempt,
    livesRemaining: gameConfig.totalLives,
    correctCount: 0,
    tiles: generateBoard(seed),
    seed,
    recoveryKeyUsed: priorRecoveryUsed,
    gameLocked: false,
    initialAttemptPlayed: false,
    soundEnabled: false,
  };
}

export function useGameState() {
  const [state, setState, resetState] = useLocalStorage<PersistedGameState>(
    STORAGE_KEY,
    makeFreshState(1, false)
  );

  // Dev reset via ?resetGame=true
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("resetGame") === "true") {
      resetState();
      const url = new URL(window.location.href);
      url.searchParams.delete("resetGame");
      window.history.replaceState({}, "", url.toString());
    }
  }, [resetState]);

  const startGame = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "playing" }));
  }, [setState]);

  const flipTile = useCallback(
    (index: number) => {
      setState((prev) => {
        if (prev.phase !== "playing") return prev;
        const tile = prev.tiles[index];
        if (!tile || tile.revealed) return prev;

        const nextTiles = prev.tiles.map((t) =>
          t.index === index ? { ...t, revealed: true } : t
        );

        if (tile.kind === "her") {
          const nextCorrect = prev.correctCount + 1;
          const won = nextCorrect >= gameConfig.requiredCorrectTiles;
          return {
            ...prev,
            tiles: nextTiles,
            correctCount: nextCorrect,
            phase: won ? "won" : "playing",
            initialAttemptPlayed: prev.initialAttemptPlayed || won,
          };
        }

        const nextLives = prev.livesRemaining - 1;
        if (nextLives <= 0) {
          const isFinal = prev.attemptNumber >= gameConfig.maxAttempts;
          return {
            ...prev,
            tiles: nextTiles,
            livesRemaining: 0,
            gameLocked: !isFinal,
            phase: isFinal ? "final-lost" : "locked",
            initialAttemptPlayed: true,
          };
        }
        return {
          ...prev,
          tiles: nextTiles,
          livesRemaining: nextLives,
        };
      });
    },
    [setState]
  );

  const tryUnlock = useCallback(
    (key: string): boolean => {
      if (state.attemptNumber >= gameConfig.maxAttempts) return false;
      if (key !== gameConfig.secretKey) return false;
      return true;
    },
    [state.attemptNumber]
  );

  const beginRecoveredAttempt = useCallback(() => {
    setState((prev) => {
      const nextAttempt = Math.min(prev.attemptNumber + 1, gameConfig.maxAttempts);
      const seed = createSeed();
      const tiles: Tile[] = generateBoard(seed);
      return {
        ...prev,
        phase: "playing",
        attemptNumber: nextAttempt,
        livesRemaining: gameConfig.totalLives,
        correctCount: 0,
        tiles,
        seed,
        recoveryKeyUsed: true,
        gameLocked: false,
      };
    });
  }, [setState]);

  const toggleSound = useCallback(() => {
    setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, [setState]);

  const hardReset = useCallback(() => {
    resetState();
  }, [resetState]);

  const progress = useMemo(
    () => Math.min(1, state.correctCount / gameConfig.requiredCorrectTiles),
    [state.correctCount]
  );

  return {
    state,
    startGame,
    flipTile,
    tryUnlock,
    beginRecoveredAttempt,
    toggleSound,
    hardReset,
    progress,
  };
}
