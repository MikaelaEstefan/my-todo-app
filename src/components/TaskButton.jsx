import React from "react";
import { useTasksStore } from "../context/useTasksStore";

export default function TaskButton({ task }) {
  const toggleTask = useTasksStore((state) => state.toggleTask);

  // Estilo según prioridad
  const priorityClasses = {
    alta: "font-bold",
    media: "",
    baja: "",
  };

  return (
    <button
      onClick={() => toggleTask(task.id)}
      className={`
        w-full text-left p-3 rounded-lg border transition-all
        ${task.completed ? "opacity-40 border-green-400" : "opacity-100 border-gray-500"}
        ${priorityClasses[task.priority]}
      `}
      style={{ backgroundColor: task.color }}
    >
      {/* Texto principal */}
      <div className="text-base">{task.text}</div>

      {/* Horario */}
      {task.time && (
        <div className="text-xs opacity-80 mt-1 flex items-center gap-1">
          ⏰ <span>{task.time}</span>
        </div>
      )}

      {/* Prioridad visual */}
      <div className="mt-2">
        <span
          className={`
            text-xs px-2 py-1 rounded-full
            ${task.priority === "alta" ? "bg-red-500/30 text-red-300" : ""}
            ${task.priority === "media" ? "bg-pink-500/30 text-pink-300" : ""}
            ${task.priority === "baja" ? "bg-green-500/30 text-green-300" : ""}
          `}
        >
          {task.priority === "alta" && "🔥 Alta"}
          {task.priority === "media" && "🌸 Media"}
          {task.priority === "baja" && "🌿 Baja"}
        </span>
      </div>

      
      {task.subtasks?.length > 0 && (
        <div className="mt-3 pl-3 border-l border-white/20 space-y-1">
          {task.subtasks.map((sub, i) => (
            <div
              key={i}
              className={`text-xs flex items-center gap-2 ${
                sub.completed ? "line-through opacity-50" : ""
              }`}
            >
              <span className="text-white/70">•</span>
              <span>{sub.text}</span>
            </div>
          ))}
        </div>
      )}
    </button>
  );
}

