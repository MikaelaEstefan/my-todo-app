import React from "react";
import DayColumn from "./components/DayColumn";
import NewTaskDropdown from "./components/NewTaskDropdown";
import ProgressBar from "./components/ProgressBar";

export default function App() {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Mi To-Do App</h1>

      <ProgressBar />

      {/* Dropdown para agregar tareas */}
      <NewTaskDropdown />

      <div className="grid grid-cols-5 gap-4">
        {days.map((day) => (
          <DayColumn key={day} day={day} />
        ))}
      </div>
    </div>
  );
}

