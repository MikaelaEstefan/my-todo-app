// src/components/ProgressBar.jsx
import React from "react";
import { useTasksStore } from "../context/useTasksStore";

export default function ProgressBar() {
  // Escuchamos el estado y funciones
  const tasks = useTasksStore((s) => s.tasks);
  const getProgress = useTasksStore((s) => s.getProgress);
  const getProgressMessage = useTasksStore((s) => s.getProgressMessage);

  // Al cambiar tasks, recalculamos progreso
  const progress = React.useMemo(() => getProgress(), [tasks]);
  const message = React.useMemo(() => getProgressMessage(), [tasks]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full bg-gray-700 h-3 rounded-xl overflow-hidden">
        <div
          className="bg-green-400 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-300 mt-2 text-sm text-center">
        {progress}% — {message}
      </p>
    </div>
  );
}






