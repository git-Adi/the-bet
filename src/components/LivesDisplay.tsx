import { motion } from "framer-motion";

interface Props {
  lives: number;
  max: number;
}

export default function LivesDisplay({ lives, max }: Props) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }).map((_, i) => {
        const alive = i < lives;
        return (
          <motion.span
            key={i}
            initial={false}
            animate={{
              scale: alive ? 1 : 0.9,
              filter: alive ? "grayscale(0)" : "grayscale(1)",
              opacity: alive ? 1 : 0.4,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="text-lg sm:text-xl select-none"
          >
            {alive ? "❤️" : "🖤"}
          </motion.span>
        );
      })}
    </div>
  );
}
