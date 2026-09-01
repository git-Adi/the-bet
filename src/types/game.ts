export type TileKind = "her" | "me";

export interface Tile {
  index: number;
  row: number;
  col: number;
  kind: TileKind;
  revealed: boolean;
  photoIndex?: number;
}

export type GamePhase =
  | "landing"
  | "playing"
  | "won"
  | "lost"
  | "locked"
  | "final-lost";

export interface PersistedGameState {
  phase: GamePhase;
  attemptNumber: number;
  livesRemaining: number;
  correctCount: number;
  tiles: Tile[];
  seed: number;
  recoveryKeyUsed: boolean;
  gameLocked: boolean;
  initialAttemptPlayed: boolean;
  soundEnabled: boolean;
}
