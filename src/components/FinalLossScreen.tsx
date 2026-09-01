import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onReset: () => void;
}

export default function FinalLossScreen({ onReset }: Props) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center safe-pad px-6 py-10">
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="verdict"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md text-center relative"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.2 }}
              className="absolute -inset-10 rounded-full blur-3xl -z-10"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(225,29,72,0.35), transparent 70%)",
              }}
            />
            <p className="uppercase text-[10px] tracking-[0.45em] text-white/40">
              the verdict
            </p>
            <h2 className="mt-3 font-display text-6xl sm:text-7xl leading-none bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              Game Over.
            </h2>

            <div className="glass rounded-3xl mt-8 p-8 shadow-soft">
              <p className="text-white/85 font-light">That's two attempts.</p>
              <p className="text-white/60 font-light italic mt-1">
                I think the universe has spoken.
              </p>
              <p className="mt-6 font-display text-4xl text-blush">
                I pick the date. 😌
              </p>
              <p className="mt-5 text-white/70 text-sm">
                Don't worry.
                <br />
                I'll make losing worth it.
              </p>
            </div>

            <button
              onClick={() => setAccepted(true)}
              className="mt-8 inline-flex items-center justify-center rounded-full px-10 py-3 text-xs uppercase tracking-[0.3em] font-medium text-white shadow-glow"
              style={{
                background: "linear-gradient(135deg, #e11d48 0%, #7c3aed 100%)",
              }}
            >
              Accept your fate
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="accepted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-sm"
          >
            <p className="uppercase text-[10px] tracking-[0.5em] text-white/30 mb-6">
              sealed
            </p>
            <p className="font-display text-4xl text-white/90 leading-tight">
              Then it's settled.
            </p>
            <p className="mt-4 text-white/60 font-light">
              Clear your Saturday.
            </p>
            <button
              onDoubleClick={onReset}
              className="mt-16 text-[10px] uppercase tracking-[0.5em] text-white/10 hover:text-white/30 transition"
              title="Double-click (dev)"
            >
              · · ·
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
