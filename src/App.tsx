import LandingScreen from "./components/LandingScreen";
import GameScreen from "./components/GameScreen";
import WinScreen from "./components/WinScreen";
import LockedScreen from "./components/LockedScreen";
import FinalLossScreen from "./components/FinalLossScreen";
import { useGameState } from "./hooks/useGameState";

export default function App() {
  const game = useGameState();
  const { state } = game;

  return (
    <div className="min-h-screen bg-cinema grain relative overflow-hidden">
      {state.phase === "landing" && (
        <LandingScreen onStart={game.startGame} />
      )}
      {state.phase === "playing" && <GameScreen game={game} />}
      {state.phase === "won" && <WinScreen onReset={game.hardReset} />}
      {state.phase === "locked" && (
        <LockedScreen
          tryUnlock={game.tryUnlock}
          onUnlocked={game.beginRecoveredAttempt}
        />
      )}
      {state.phase === "final-lost" && (
        <FinalLossScreen onReset={game.hardReset} />
      )}
    </div>
  );
}
