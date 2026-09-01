import { memo } from "react";
import GameTile from "./GameTile";
import { Tile } from "../types/game";
import { gameConfig } from "../config/gameConfig";

interface Props {
  tiles: Tile[];
  onTileClick: (index: number) => void;
}

function GameBoard({ tiles, onTileClick }: Props) {
  const size = gameConfig.boardSize;

  return (
    <div
      className="grid gap-[3px] sm:gap-[4px] p-2 rounded-2xl glass shadow-soft"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        aspectRatio: "1 / 1",
      }}
    >
      {tiles.map((tile) => (
        <GameTile
          key={tile.index}
          tile={tile}
          size={size}
          onClick={() => onTileClick(tile.index)}
        />
      ))}
    </div>
  );
}

export default memo(GameBoard);
