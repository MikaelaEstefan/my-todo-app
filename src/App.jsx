import { useEffect, useState } from "react";
import { useTasksStore } from "./context/useTasksStore";
import { useThemeStore } from "./context/useThemeStore";

import DayColumn from "./components/DayColumn";
import NewTaskDropdown from "./components/NewTaskDropdown";
import ProgressBar from "./components/ProgressBar";
import FocusOverlay from "./components/FocusOverlay";
import FilterButton from "./components/FilterButton";

import bloomlyIconDark from "./assets/bloomly-icon.png";
import bloomlyIconLight from "./assets/bloomly-icon-light.png";

export default function App() {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  const [filter, setFilter] = useState("all");
  const [activeDay, setActiveDay] = useState("Lunes");

  const resetWeek = useTasksStore((s) => s.resetWeek);
  const { theme, toggleTheme } = useThemeStore();

  // aplicar theme al html
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // logo según theme
  const logoSrc =
    theme === "light" ? bloomlyIconLight : bloomlyIconDark;

  return (
    <div className="px-4 py-6 md:px-6 flex flex-col gap-6">
      {/* HEADER */}
      <header className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <img
            src={logoSrc}
            alt="Bloomly"
            className="w-16 h-16 transition-opacity"
          />

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Bloomly
          </h1>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="
              ml-2
              p-2
              rounded-full
              bg-[var(--bg-panel)]
              text-[var(--text-main)]
              hover:bg-[var(--bg-card)]
              transition
            "
            title="Cambiar tema"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
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
          text-sm
          px-5 py-2
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
      <div className="flex flex-wrap gap-3 justify-center">
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

      {/* MOBILE DAY SELECTOR */}
      <div className="flex gap-2 overflow-x-auto sm:hidden pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`
              px-4 py-2
              rounded-full
              whitespace-nowrap
              text-sm
              font-semibold
              transition
              ${
                activeDay === day
                  ? "bg-[var(--pink-main)] text-white"
                  : "bg-[var(--bg-panel)] text-[var(--text-muted)]"
              }
            `}
          >
            {day}
          </button>
        ))}
      </div>

      {/* COLUMNAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {days
          .filter(
            (day) =>
              window.innerWidth >= 640 || day === activeDay
          )
          .map((day) => (
            <DayColumn key={day} day={day} filter={filter} />
          ))}
      </div>

      <FocusOverlay />
    </div>
  );
}





