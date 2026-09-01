import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center safe-pad px-6 py-10">
      <div className="w-full max-w-xl relative">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center"
        >
          <p className="uppercase text-[10px] tracking-[0.4em] text-white/40 mb-4">
            an invitation
          </p>
          <h1 className="font-display text-6xl sm:text-7xl leading-none tracking-tight">
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              The Bet
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="glass rounded-2xl mt-8 p-6 sm:p-8 shadow-soft"
        >
          <p className="text-white/85 text-lg leading-relaxed font-light">
            You gave me your photos.
            <br />
            You made a bet.
            <br />
            I may have taken that a little too seriously.
          </p>

          <div className="mt-7">
            <p className="uppercase text-[10px] tracking-[0.35em] text-blush/80 mb-3">
              the rules
            </p>
            <ul className="space-y-1.5 text-white/80 text-[15px] font-light">
              <li>Find the right tiles.</li>
              <li>Reveal your photo.</li>
              <li>Avoid revealing mine.</li>
              <li>You have 3 lives.</li>
            </ul>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 text-[13px]">
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-3 py-3">
              <div className="text-emerald-300/90 text-[10px] uppercase tracking-widest mb-1">
                If you win
              </div>
              <div className="text-white/90">You pick the date.</div>
            </div>
            <div className="rounded-xl border border-rose/30 bg-rose/5 px-3 py-3">
              <div className="text-rose-300/90 text-[10px] uppercase tracking-widest mb-1">
                If you lose
              </div>
              <div className="text-white/90">I pick the date.</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-10 py-4 text-sm uppercase tracking-[0.3em] font-medium text-white shadow-glow transition"
            style={{
              background:
                "linear-gradient(135deg, #e11d48 0%, #7c3aed 100%)",
            }}
          >
            <span className="relative z-10">Start the game</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition" />
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-6 text-center text-[11px] text-white/30 tracking-wide"
        >
          Best played on your phone. Refreshing won't save you.
        </motion.p>
      </div>
    </div>
  );
}
