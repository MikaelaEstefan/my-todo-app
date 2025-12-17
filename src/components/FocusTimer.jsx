import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTasksStore } from "../context/useTasksStore";

export default function FocusTimer() {
  const {
    focusMode,
    timer,
    tick,
    stopFocus,
    isBreak,
    toggleBreak,
  } = useTasksStore();

  useEffect(() => {
    if (!focusMode) return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [focusMode, tick]);

  useEffect(() => {
    if (timer === 0 && !isBreak) {
      toggleBreak();
    }
  }, [timer, isBreak, toggleBreak]);

  if (!focusMode) return null;

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 bg-gray-900 border border-purple-400/40 rounded-xl px-4 py-3 shadow-xl z-50"
    >
      <p className="text-sm text-purple-300 mb-1">
        {isBreak ? "☕ Break" : "🧘‍♀️ Focus"}
      </p>
      <p className="text-2xl font-mono text-white">
        {minutes}:{seconds}
      </p>

      <button
        onClick={stopFocus}
        className="mt-2 text-xs text-gray-300 hover:text-white"
      >
        Salir del focus
      </button>
    </motion.div>
  );
}
