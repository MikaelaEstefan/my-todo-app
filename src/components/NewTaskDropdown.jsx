// src/components/NewTaskDropdown.jsx
import React, { useState } from "react";
import { useTasksStore } from "../context/useTasksStore";

export default function NewTaskDropdown() {
  const addTask = useTasksStore((state) => state.addTask);

  const [text, setText] = useState("");
  const [color, setColor] = useState("#1e293b"); // gris oscuro, no azul
  const [day, setDay] = useState("Lunes");

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  function handleAdd() {
    if (!text.trim()) return;

    addTask(day, text, color);
    setText("");
  }

  return (
    <div className="flex gap-3 items-center">
      <input
        className="p-2 rounded bg-gray-700 text-white"
        placeholder="Nueva tarea…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        className="bg-gray-700 text-white p-2 rounded"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      >
        {days.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-10 h-10 rounded cursor-pointer"
      />

      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-500 rounded text-white"
      >
        Agregar
      </button>
    </div>
  );
}

