// src/App.jsx
import React, { useState } from "react";
import DayColumn from "./components/DayColumn";
import NewTaskDropdown from "./components/NewTaskDropdown";
import ProgressBar from "./components/ProgressBar";
import FocusOverlay from "./components/FocusOverlay";
import FilterButton from "./components/FilterButton";

export default function App() {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const [filter, setFilter] = useState("all"); // all | pending | completed

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Mi To-Do App</h1>

      <ProgressBar />

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

      <NewTaskDropdown />

      <div className="grid grid-cols-5 gap-4">
        {days.map((day) => (
          <DayColumn key={day} day={day} filter={filter} />
        ))}
      </div>

      <FocusOverlay />
    </div>
  );
}


