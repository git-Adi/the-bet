import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onReset: () => void;
}

function Confetti() {
  const pieces = Array.from({ length: 28 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 1.2;
        const dur = 3 + Math.random() * 2.5;
        const size = 4 + Math.random() * 4;
        const color = ["#f472b6", "#e11d48", "#7c3aed", "#f9a8d4"][i % 4];
        return (
          <span
            key={i}
            className="absolute block rounded-sm"
            style={{
              left: `${left}%`,
              top: "-20px",
              width: `${size}px`,
              height: `${size * 2}px`,
              backgroundColor: color,
              animation: `fall ${dur}s linear ${delay}s infinite`,
              opacity: 0.9,
            }}
          />
        );
      })}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function WinScreen({ onReset }: Props) {
  const [claimed, setClaimed] = useState(false);
  useEffect(() => {
    if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center safe-pad px-6 py-10">
      <Confetti />
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md glass rounded-3xl p-8 sm:p-10 text-center shadow-soft relative z-10"
      >
        {!claimed ? (
          <>
            <p className="uppercase text-[10px] tracking-[0.45em] text-blush/80 mb-4">
              improbable
            </p>
            <h2 className="font-display text-5xl sm:text-6xl leading-none bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              You did it.
            </h2>
            <p className="mt-5 text-white/80 font-light">
              Against all statistical probability...
              <br />
              You actually won.
            </p>
            <p className="mt-6 font-display text-3xl text-blush">
              You pick the date.
            </p>
            <p className="mt-3 text-sm text-white/50 italic">
              I'll pretend I'm not disappointed. 😌
            </p>
            <button
              onClick={() => setClaimed(true)}
              className="mt-8 inline-flex items-center justify-center rounded-full px-8 py-3 text-xs uppercase tracking-[0.3em] font-medium text-white shadow-glow"
              style={{
                background: "linear-gradient(135deg, #e11d48 0%, #7c3aed 100%)",
              }}
            >
              Claim your victory
            </button>
          </>
        ) : (
          <>
            <p className="uppercase text-[10px] tracking-[0.45em] text-white/50 mb-4">
              accepted
            </p>
            <h2 className="font-display text-4xl sm:text-5xl leading-tight text-white">
              Fine.
            </h2>
            <p className="mt-5 text-white/85 font-light text-lg">
              You pick the place.
              <br />
              But I'm judging your choice.
            </p>
            <button
              onClick={onReset}
              className="mt-8 text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white/80 transition"
            >
              reset game
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
