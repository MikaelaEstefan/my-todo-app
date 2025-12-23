// src/components/NewTaskDropdown.jsx
import React, { useState } from "react";
import { useTasksStore } from "../context/useTasksStore";
import { TASK_COLORS } from "../constants/taskColors";

export default function NewTaskDropdown() {
  const addTask = useTasksStore((state) => state.addTask);

  const [text, setText] = useState("");
  const [day, setDay] = useState("Lunes");
  const [priority, setPriority] = useState("media");
  const [time, setTime] = useState("");
  const [color, setColor] = useState(TASK_COLORS[0].value);

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  function handleAdd() {
    if (!text.trim()) return;

    addTask(day, text, color, priority, time);

    setText("");
    setTime("");
    setPriority("media");
    setColor(TASK_COLORS[0].value);
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* TEXTO */}
      <input
        className="
          px-4 py-2.5
          rounded-lg
          bg-[var(--bg-card)]
          text-[var(--text-main)]
          placeholder:text-[var(--text-muted)]
          border border-[var(--border-soft)]
          focus:outline-none
          focus:border-[var(--pink-main)]
          flex-1
          min-w-[220px]
        "
        placeholder="Nueva tarea…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* DÍA */}
      <select
        className="
          px-3 py-2.5
          rounded-lg
          bg-[var(--bg-card)]
          text-[var(--text-main)]
          border border-[var(--border-soft)]
          focus:outline-none
          focus:border-[var(--pink-main)]
        "
        value={day}
        onChange={(e) => setDay(e.target.value)}
      >
        {days.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      {/* HORA */}
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="
          px-3 py-2.5
          rounded-lg
          bg-[var(--bg-card)]
          text-[var(--text-main)]
          border border-[var(--border-soft)]
          focus:outline-none
          focus:border-[var(--pink-main)]
        "
      />

      {/* PRIORIDAD */}
      <select
        className="
          px-3 py-2.5
          rounded-lg
          bg-[var(--bg-card)]
          text-[var(--text-main)]
          border border-[var(--border-soft)]
          focus:outline-none
          focus:border-[var(--pink-main)]
        "
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="alta">🔥 Alta</option>
        <option value="media">🌸 Media</option>
        <option value="baja">🌿 Baja</option>
      </select>

      {/* PALETA DE COLORES */}
      <div className="flex items-center gap-2">
        {TASK_COLORS.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-label={c.label}
            onClick={() => setColor(c.value)}
            className={`
              w-7 h-7
              rounded-full
              border
              transition
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--pink-main)]
              ${
                color === c.value
                  ? "ring-2 ring-[var(--pink-main)]"
                  : "border-[var(--border-soft)]"
              }
            `}
            style={{ backgroundColor: c.value }}
            title={c.label}
          />
        ))}
      </div>

      {/* BOTÓN AGREGAR */}
      <button
        onClick={handleAdd}
        className="
          px-7 py-2.5
          rounded-full
          bg-[var(--pink-main)]
          text-white
          font-semibold
          hover:bg-[var(--pink-strong)]
          transition
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--pink-main)]/50
        "
      >
        Agregar
      </button>
    </div>
  );
}



