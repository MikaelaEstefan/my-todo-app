import React, { useState } from "react";
import { useTasksStore } from "../context/useTasksStore";

export default function SubtaskList({ task }) {
  const toggleSubtask = useTasksStore((s) => s.toggleSubtask);
  const addSubtask = useTasksStore((s) => s.addSubtask);

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  function handleAdd() {
    if (!text.trim()) return;
    addSubtask(task.id, text);
    setText("");
  }

  return (
    <div className="mt-2">
      {/* Expand / collapse */}
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-blue-300 hover:text-blue-400"
      >
        {open ? "▼ Ocultar subtareas" : "▶ Ver subtareas"}
      </button>

      {/* Animated container */}
      <div
        className={`transition-all overflow-hidden ${
          open ? "max-h-96 mt-2" : "max-h-0"
        }`}
      >
        {/* List of subtasks */}
        <div className="flex flex-col gap-2">
          {task.subtasks.map((s) => (
            <button
              key={s.id}
              onClick={() => toggleSubtask(task.id, s.id)}
              className={`px-3 py-1 rounded border text-left text-sm ${
                s.completed
                  ? "line-through opacity-50 border-green-300"
                  : "border-gray-500"
              }`}
            >
              {s.text}
            </button>
          ))}
        </div>

        {/* Add new subtask */}
        <div className="mt-2 flex gap-2">
          <input
            className="bg-gray-700 p-2 rounded text-sm w-full"
            placeholder="Nueva subtarea…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="px-3 py-1 bg-pink-500 rounded text-white text-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
