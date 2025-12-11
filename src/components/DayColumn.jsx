import React from "react";
import TaskButton from "./TaskButton";
import { useTasksStore } from "../context/useTasksStore";

export default function DayColumn({ day }) {
  const tasks = useTasksStore((state) => state.tasks[day] || []);
  const getDayProgress = useTasksStore((state) => state.getDayProgress);

  const progress = getDayProgress(day);

  const getLabel = (p) => {
    if (p === 0) return "🌱 Empezá cuando quieras";
    if (p < 30) return "✨ Buen comienzo";
    if (p < 60) return "🌸 Vas muy bien";
    if (p < 90) return "🌿 ¡Gran ritmo!";
    if (p < 100) return "🌼 ¡Casi completo!";
    return "🏆 Día completado, felicitaciones!";
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl h-full min-h-[300px]">
      <h2 className="text-xl font-semibold mb-4">{day}</h2>

      <div className="mb-3">
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-pink-400 h-3 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm mt-1 text-gray-300">
          {progress}% — {getLabel(progress)}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskButton key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

