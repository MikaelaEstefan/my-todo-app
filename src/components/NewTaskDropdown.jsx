// src/components/NewTaskDropdown.jsx
import React, { useState } from "react";
import { useTasksStore } from "../context/useTasksStore";

export default function NewTaskDropdown() {
  const addTask = useTasksStore((state) => state.addTask);

  const [text, setText] = useState("");
  const [color, setColor] = useState("#1e293b");
  const [day, setDay] = useState("Lunes");

  // NUEVO
  const [priority, setPriority] = useState("media");
  const [time, setTime] = useState("");

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  function handleAdd() {
    if (!text.trim()) return;

    addTask(day, text, color, priority, time);

    // Reset
    setText("");
    setPriority("media");
    setTime("");
  }

  return (
    <div className="flex flex-wrap gap-3 items-center bg-gray-800 p-4 rounded-xl">
      
      {/* Texto */}
      <input
        className="p-2 rounded bg-gray-700 text-white"
        placeholder="Nueva tarea…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Día */}
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

      {/* Hora */}
      <input
        type="time"
        className="bg-gray-700 text-white p-2 rounded"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      {/* Prioridad */}
      <select
        className="bg-gray-700 text-white p-2 rounded"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="alta">🔥 Alta</option>
        <option value="media">🌸 Media</option>
        <option value="baja">🌿 Baja</option>
      </select>

      {/* Color */}
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-10 h-10 rounded cursor-pointer"
      />

      {/* Botón */}
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-500 rounded text-white"
      >
        Agregar
      </button>
    </div>
  );
}

