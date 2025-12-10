import React from "react";
import { useTasksStore } from "../context/useTasksStore";

export default function TaskButton({ task }) {
  const toggleTask = useTasksStore((state) => state.toggleTask);

  return (
    <button
      onClick={() => toggleTask(task.id)}
      className={`p-3 rounded-lg text-left border transition-all ${
        task.completed
          ? "opacity-40 border-green-400"
          : "opacity-100 border-gray-500"
      }`}
      style={{ backgroundColor: task.color }}
    >
      {task.text}
    </button>
  );
}
