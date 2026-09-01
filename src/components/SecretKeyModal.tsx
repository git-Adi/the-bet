import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { invalidKeyMessages, pick } from "../utils/messages";

interface Props {
  open: boolean;
  onClose: () => void;
  tryUnlock: (key: string) => boolean;
  onGranted: () => void;
}

export default function SecretKeyModal({
  open,
  onClose,
  tryUnlock,
  onGranted,
}: Props) {
  const [value, setValue] = useState("");
  const [shakeKey, setShakeKey] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setValue("");
      setErrorMsg(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const submit = () => {
    if (!value.trim()) return;
    if (tryUnlock(value.trim())) {
      onGranted();
    } else {
      setShakeKey((k) => k + 1);
      setErrorMsg(pick(invalidKeyMessages));
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="glass relative rounded-3xl w-full max-w-sm p-7 shadow-soft"
          >
            <p className="uppercase text-[10px] tracking-[0.4em] text-blush/80 text-center">
              recovery protocol
            </p>
            <h3 className="font-display text-3xl text-white text-center mt-2">
              Second chances aren't free.
            </h3>

            <div key={shakeKey} className={errorMsg ? "shake mt-6" : "mt-6"}>
              <input
                ref={inputRef}
                type="password"
                inputMode="numeric"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setErrorMsg(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit();
                }}
                placeholder="Enter secret key..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-lg tracking-[0.4em] text-white placeholder:text-white/25 placeholder:tracking-normal placeholder:text-sm focus:border-blush/50 focus:bg-white/10 transition"
              />
            </div>

            <div className="min-h-[20px] mt-3 text-center text-sm text-rose-300/90">
              {errorMsg}
            </div>

            <button
              onClick={submit}
              className="mt-4 w-full rounded-full py-3 text-xs uppercase tracking-[0.3em] font-medium text-white shadow-glow"
              style={{
                background: "linear-gradient(135deg, #e11d48 0%, #7c3aed 100%)",
              }}
            >
              Unlock game
            </button>

            <button
              onClick={onClose}
              className="mt-3 w-full text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white/70 transition"
            >
              close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
