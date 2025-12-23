// src/App.jsx
import React, { useState } from "react";
import { useTasksStore } from "./context/useTasksStore";
import DayColumn from "./components/DayColumn";
import NewTaskDropdown from "./components/NewTaskDropdown";
import ProgressBar from "./components/ProgressBar";
import FocusOverlay from "./components/FocusOverlay";
import FilterButton from "./components/FilterButton";

import bloomlyIcon from "./assets/bloomly-icon.png";

export default function App() {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const [filter, setFilter] = useState("all"); // all | pending | completed
  const resetWeek = useTasksStore((s) => s.resetWeek);

  return (
    <div className="p-6 flex flex-col gap-6">

      {/* HEADER BLOOMLY */}
      <header className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <img
            src={bloomlyIcon}
            alt="Bloomly"
            className="w-18 h-18"
          />

          <h1 className="text-5xl font-semibold tracking-tight">
            Bloomly
          </h1>
        </div>

        <ProgressBar />
      </header>

      {/* RESET */}
      <button
          onClick={() => {
            if (confirm("¿Resetear toda la semana?")) {
              resetWeek();
            }
          }}
          className="
            self-center
            text-s
            px-6
            py-3
            rounded-full
            bg-[var(--pink-main)]/10
            text-[var(--pink-main)]
            hover:bg-[var(--pink-main)]/20
            transition
          "
        >
          Reset semana
        </button>


      {/* FILTROS */}
      <div className="flex gap-2 justify-center">
        <FilterButton
          label="Todas"
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <FilterButton
          label="Pendientes"
          active={filter === "pending"}
          onClick={() => setFilter("pending")}
        />
        <FilterButton
          label="Completadas"
          active={filter === "completed"}
          onClick={() => setFilter("completed")}
        />
      </div>

      {/* NUEVA TAREA */}
      <div className="bg-[var(--bg-panel)] rounded-2xl p-4 border border-[var(--border-soft)]">
        <NewTaskDropdown />
      </div>

      {/* COLUMNAS */}
      <div className="grid grid-cols-5 gap-4">
        {days.map((day) => (
          <DayColumn key={day} day={day} filter={filter} />
        ))}
      </div>

      <FocusOverlay />
    </div>
  );
}



