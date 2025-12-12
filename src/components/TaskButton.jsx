import React from "react";
import { useTasksStore } from "../context/useTasksStore";

export default function TaskButton({ task }) {
  const toggleTask = useTasksStore((state) => state.toggleTask);

  const priorityClasses = {
    alta: "font-bold",
    media: "",
    baja: "",
  };

  return (
    <button
      onClick={() => toggleTask(task.id)}
      className={`p-3 rounded-lg text-left border transition-all ${
        task.completed
          ? "opacity-40 border-green-400"
          : "opacity-100 border-gray-500"
      } ${priorityClasses[task.priority]}`}
      style={{ backgroundColor: task.color }}
    >
      {/* Texto */}
      <div>{task.text}</div>

      {/* Horario */}
      {task.time && (
        <div className="text-xs opacity-80 mt-1">
          ⏰ {task.time}
        </div>
      )}

      {/* Prioridad */}
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
    </button>
  );
}
