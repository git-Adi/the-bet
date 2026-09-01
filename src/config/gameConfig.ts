export interface GameConfig {
  herPhotos: string[];
  myPhoto: string;
  boardSize: number;
  requiredCorrectTiles: number;
  totalLives: number;
  maxAttempts: number;
  secretKey: string;
  herTileRatio: [number, number];
}

export const gameConfig: GameConfig = {
  herPhotos: [
    "/images/her1.jpg",
    "/images/her2.jpg",
    "/images/her3.jpg",
    "/images/her4.jpg",
  ],
  myPhoto: "/images/me.jpg",
  boardSize: 4,
  requiredCorrectTiles: 4,
  totalLives: 3,
  maxAttempts: 10,
  secretKey: (import.meta.env.VITE_GAME_KEY as string) || "1101",
  herTileRatio: [0, 0],
};
