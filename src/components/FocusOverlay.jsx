// src/components/FocusOverlay.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useTasksStore } from "../context/useTasksStore";

export default function FocusOverlay() {
  const {
    focusMode,
    focusedTaskId,
    tasks,
    timer,
    stopFocus,
  } = useTasksStore();

  if (!focusMode) return null;

  const allTasks = Object.values(tasks).flat();
  const task = allTasks.find(t => t.id === focusedTaskId);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 rounded-3xl p-12 text-center shadow-2xl max-w-md w-full"
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <h2 className="text-2xl mb-6">🧘‍♀️ Focus Mode</h2>

          <div className="text-7xl font-mono mb-6">
            {minutes}:{seconds}
          </div>

          <div className="opacity-80 mb-8">
            {task?.text}
          </div>

          <button
            onClick={stopFocus}
            className="px-8 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 transition"
          >
            Salir de focus
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
