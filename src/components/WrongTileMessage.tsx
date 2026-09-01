import { motion } from "framer-motion";

interface Props {
  text: string;
  tone: "good" | "bad";
}

export default function WrongTileMessage({ text, tone }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`pointer-events-auto glass rounded-full px-4 py-2 text-sm whitespace-pre-line text-center shadow-soft ${
        tone === "bad"
          ? "text-rose-200/95 border-rose-400/25"
          : "text-emerald-100/95 border-emerald-400/25"
      }`}
    >
      {text}
    </motion.div>
  );
}
