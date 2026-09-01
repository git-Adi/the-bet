import { memo } from "react";
import { motion } from "framer-motion";
import { Tile } from "../types/game";
import { gameConfig } from "../config/gameConfig";

interface Props {
  tile: Tile;
  size: number;
  onClick: () => void;
}

function GameTile({ tile, size, onClick }: Props) {
  const image =
    tile.kind === "her"
      ? gameConfig.herPhotos[
          (tile.photoIndex ?? 0) % gameConfig.herPhotos.length
        ]
      : gameConfig.myPhoto;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={tile.revealed}
      className="relative aspect-square perspective outline-none group"
      aria-label={`tile row ${tile.row + 1} column ${tile.col + 1}`}
    >
      <motion.div
        className="preserve-3d w-full h-full relative"
        initial={false}
        animate={{ rotateY: tile.revealed ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front (face-down) */}
        <div className="tile-face">
          <div
            className="w-full h-full rounded-[6px] relative overflow-hidden"
            style={{
              background:
                "linear-gradient(140deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.05) 100%)",
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 -8px 20px rgba(0,0,0,0.35)",
            }}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(60% 60% at 30% 20%, rgba(244,114,182,0.18), transparent 70%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase group-hover:text-white/40 transition">
                {tile.row * size + tile.col + 1}
              </span>
            </div>
          </div>
        </div>

        {/* Back (revealed full photo) */}
        <div className="tile-face tile-back">
          <div
            className="w-full h-full rounded-[6px]"
            style={{
              backgroundImage: `url("${image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              boxShadow:
                tile.kind === "me"
                  ? "inset 0 0 0 1px rgba(225,29,72,0.35)"
                  : "inset 0 0 0 1px rgba(244,114,182,0.35)",
            }}
          />
        </div>
      </motion.div>
    </button>
  );
}

export default memo(GameTile);
