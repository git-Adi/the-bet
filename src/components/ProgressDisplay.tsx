import { motion } from "framer-motion";

interface Props {
  correct: number;
  required: number;
}

export default function ProgressDisplay({ correct, required }: Props) {
  const pct = Math.min(100, (correct / required) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-white/50 mb-1.5">
        <span>Photo Reveal</span>
        <span className="text-white/85">
          {correct} / {required}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #f472b6 0%, #e11d48 60%, #7c3aed 100%)",
          }}
        />
      </div>
    </div>
  );
}
