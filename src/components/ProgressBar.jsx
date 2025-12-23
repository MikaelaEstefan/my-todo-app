// src/components/ProgressBar.jsx
import { motion } from "framer-motion";
import { useTasksStore } from "../context/useTasksStore";

export default function ProgressBar() {
  const progress = useTasksStore((state) => state.getProgress());
  const message = useTasksStore((state) => state.getProgressMessage());

  return (
    <div className="flex flex-col items-center w-full gap-4 relative">
      {/* CONTENEDOR */}
      <div
        className="
          w-full
          h-4
          rounded-full
          bg-[var(--bg-panel)]
          overflow-hidden
        "
      >
        {/* FILL */}
        <motion.div
          className="h-full rounded-full pointer-events-none"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(90deg, var(--pink-main), #9F7AEA)",
          }}
        />

        {/* BRILLO SUAVE */}
        {progress > 0 && (
          <motion.div
            key={progress}
            className="absolute inset-0 rounded-full pointer-events-none"
            initial={{ opacity: 0.25 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.35), transparent)",
            }}
          />
        )}
      </div>

      {/* TEXTO */}
      <motion.p
        key={progress}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="
          text-base
          text-[var(--text-muted)]
          text-center
          leading-snug
        "
      >
        <span className="text-[var(--text-main)] font-semibold">
          {progress}%
        </span>{" "}
        — {message}
      </motion.p>
    </div>
  );
}






