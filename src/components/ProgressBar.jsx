// src/components/ProgressBar.jsx
import { motion } from "framer-motion";
import { useTasksStore } from "../context/useTasksStore";

export default function ProgressBar() {
  const progress = useTasksStore((state) => state.getProgress());
  const message = useTasksStore((state) => state.getProgressMessage());

  return (
    <div className="flex flex-col items-center w-full gap-2">
      {/* CONTENEDOR */}
      <div className="w-full bg-gray-700 h-3 rounded-xl overflow-hidden relative">
        {/* FILL */}
        <motion.div
          className="h-full bg-green-400 rounded-xl"
          initial={{ width: 0 }}
          animate={{
            width: `${progress}%`,
            boxShadow:
              progress > 0
                ? "0 0 12px rgba(74, 222, 128, 0.8)"
                : "none",
          }}
          transition={{
            width: { duration: 0.5, ease: "easeInOut" },
            boxShadow: { duration: 0.3 },
          }}
        />

        {/* PULSO SUAVE */}
        {progress > 0 && (
          <motion.div
            key={progress} // 👈 fuerza animación al cambiar
            className="absolute inset-0 rounded-xl"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.4), transparent)",
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
        className="text-gray-300 text-sm text-center"
      >
        {progress}% — {message}
      </motion.p>
    </div>
  );
}






