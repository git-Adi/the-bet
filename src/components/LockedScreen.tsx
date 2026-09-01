import { useState } from "react";
import { motion } from "framer-motion";
import SecretKeyModal from "./SecretKeyModal";
import AccessGrantedScreen from "./AccessGrantedScreen";

interface Props {
  tryUnlock: (key: string) => boolean;
  onUnlocked: () => void;
}

export default function LockedScreen({ tryUnlock, onUnlocked }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [granted, setGranted] = useState(false);

  if (granted) {
    return <AccessGrantedScreen onPlayAgain={onUnlocked} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center safe-pad px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass rounded-3xl p-8 sm:p-10 text-center shadow-soft"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 mb-5"
        >
          <span className="text-3xl">🔒</span>
        </motion.div>
        <p className="uppercase text-[10px] tracking-[0.45em] text-rose-300/80 mb-3">
          session ended
        </p>
        <h2 className="font-display text-4xl sm:text-5xl leading-none bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
          Game Locked
        </h2>
        <p className="mt-5 text-white/80 font-light">
          You used all 3 lives.
          <br />
          You also revealed slightly too much of me.
        </p>
        <p className="mt-3 text-sm text-white/50">This session has been locked.</p>

        <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4">
          <p className="uppercase text-[10px] tracking-[0.35em] text-blush/80">
            second attempt requires
          </p>
          <p className="font-display text-2xl text-white mt-1">A Secret Key</p>
          <p className="text-xs text-white/50 mt-2">
            Unfortunately, only the creator has it. 🔐
          </p>
          <p className="text-xs text-white/40 italic mt-1">
            Maybe texting him is part of the game.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="mt-7 inline-flex items-center justify-center rounded-full px-8 py-3 text-xs uppercase tracking-[0.3em] font-medium text-white shadow-glow"
          style={{
            background: "linear-gradient(135deg, #e11d48 0%, #7c3aed 100%)",
          }}
        >
          Enter secret key
        </button>
      </motion.div>

      <SecretKeyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tryUnlock={tryUnlock}
        onGranted={() => {
          setModalOpen(false);
          setGranted(true);
        }}
      />
    </div>
  );
}
