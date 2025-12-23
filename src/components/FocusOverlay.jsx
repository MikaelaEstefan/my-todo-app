import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useTasksStore } from "../context/useTasksStore";

export default function FocusOverlay() {
  const {
    focusMode,
    focusedTaskId,
    tasks,
    timer,
    stopFocus,
    tick,
    isPaused,
    pauseFocus,
    resumeFocus,
  } = useTasksStore();

  // ⏱️ TIMER
  useEffect(() => {
    if (!focusMode) return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [focusMode, tick]);

  // ⏹️ AUTO STOP
  useEffect(() => {
    if (timer === 0 && focusMode) {
      stopFocus();
    }
  }, [timer, focusMode, stopFocus]);

  if (!focusMode) return null;

  const allTasks = Object.values(tasks).flat();
  const task = allTasks.find((t) => t.id === focusedTaskId);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/60
          backdrop-blur-lg
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="
            bg-[var(--bg-panel)]
            rounded-3xl
            px-10 py-12
            w-full max-w-md
            text-center
            border border-[var(--border-soft)]
          "
          initial={{ scale: 0.92, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 30 }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
        >
          {/* TITLE */}
          <div className="text-sm tracking-wide text-[var(--text-muted)] mb-4">
            🧘 Focus mode
          </div>

          {/* TIMER */}
          <div
            className={`text-6xl font-mono font-semibold mb-6 ${
              isPaused ? "opacity-50" : ""
            }`}
          >
            {minutes}:{seconds}
          </div>

          {/* TASK */}
          <div className="text-base text-[var(--text-main)] opacity-80 mb-8">
            {task?.text || "Sin tarea seleccionada"}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-center gap-3">
            {!isPaused ? (
              <button
                onClick={pauseFocus}
                className="
                  px-6 py-2
                  rounded-full
                  bg-white/10
                  text-[var(--text-main)]
                  hover:bg-white/20
                  transition
                "
              >
                ⏸ Pausar
              </button>
            ) : (
              <button
                onClick={resumeFocus}
                className="
                  px-6 py-2
                  rounded-full
                  bg-[var(--pink-main)]/20
                  text-[var(--pink-main)]
                  hover:bg-[var(--pink-main)]/30
                  transition
                "
              >
                ▶ Reanudar
              </button>
            )}

            <button
              onClick={stopFocus}
              className="
                px-6 py-2
                rounded-full
                bg-[var(--pink-main)]/10
                text-[var(--pink-main)]
                hover:bg-[var(--pink-main)]/20
                transition
              "
            >
              Salir
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

