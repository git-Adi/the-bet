import { motion } from "framer-motion";

interface Props {
  onPlayAgain: () => void;
}

export default function AccessGrantedScreen({ onPlayAgain }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center safe-pad px-6 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-full max-w-md glass rounded-3xl p-8 sm:p-10 text-center shadow-soft"
      >
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 15 }}
          className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center border border-emerald-400/30 bg-emerald-400/10 mb-5"
        >
          <span className="text-3xl">✓</span>
        </motion.div>
        <p className="uppercase text-[10px] tracking-[0.45em] text-emerald-300/80 mb-3">
          verified
        </p>
        <h2 className="font-display text-5xl leading-none bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          Access Granted
        </h2>
        <p className="mt-5 text-white/80 font-light">
          One additional attempt has been unlocked.
        </p>

        <button
          onClick={onPlayAgain}
          className="mt-8 inline-flex items-center justify-center rounded-full px-8 py-3 text-xs uppercase tracking-[0.3em] font-medium text-white shadow-glow"
          style={{
            background: "linear-gradient(135deg, #059669 0%, #7c3aed 100%)",
          }}
        >
          Play again
        </button>
      </motion.div>
    </div>
  );
}
