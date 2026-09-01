import { gameConfig } from "../config/gameConfig";
import { Tile } from "../types/game";

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createSeed(): number {
  return Math.floor(Math.random() * 1_000_000_000);
}

export function generateBoard(seed: number): Tile[] {
  const size = gameConfig.boardSize;
  const total = size * size;
  const rand = mulberry32(seed);
  const herCount = gameConfig.requiredCorrectTiles;

  // Softer pattern: exactly one HER tile in each row and each column
  // (a random permutation) whenever herCount matches the board size.
  // Otherwise fall back to a pure random pick.
  let herTileIndices: number[];
  if (herCount === size) {
    const cols = Array.from({ length: size }, (_, i) => i);
    for (let i = cols.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [cols[i], cols[j]] = [cols[j], cols[i]];
    }
    herTileIndices = cols.map((col, row) => row * size + col);
  } else {
    const indices = Array.from({ length: total }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    herTileIndices = indices.slice(0, herCount);
  }
  const herSet = new Set(herTileIndices);

  // Assign each HER tile a distinct photo (cycled if there are more tiles than photos).
  const photoOrder = Array.from(
    { length: herCount },
    (_, i) => i % gameConfig.herPhotos.length
  );
  for (let i = photoOrder.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [photoOrder[i], photoOrder[j]] = [photoOrder[j], photoOrder[i]];
  }
  const photoByTile = new Map<number, number>();
  herTileIndices.forEach((tileIdx, i) => photoByTile.set(tileIdx, photoOrder[i]));

  const tiles: Tile[] = [];
  for (let i = 0; i < total; i++) {
    const isHer = herSet.has(i);
    tiles.push({
      index: i,
      row: Math.floor(i / size),
      col: i % size,
      kind: isHer ? "her" : "me",
      revealed: false,
      ...(isHer ? { photoIndex: photoByTile.get(i) } : {}),
    });
  }
  return tiles;
}
