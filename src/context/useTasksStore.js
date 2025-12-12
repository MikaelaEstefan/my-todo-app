// src/context/useTasksStore.js
import { create } from "zustand";
import { nanoid } from "nanoid";

export const useTasksStore = create((set, get) => ({
  tasks: {
    Lunes: [],
    Martes: [],
    Miércoles: [],
    Jueves: [],
    Viernes: [],
  },

  // AGREGAR TAREA con color, prioridad y horario
  addTask: (day, text, color, priority = "media", time = "") =>
    set((state) => {
      const newTask = {
        id: nanoid(),
        text,
        color,
        completed: false,
        priority,
        time, 
      };

      // Ordenar tareas: primero por hora, luego prioridad
      const sortTasks = (arr) => {
        const priorityValue = { alta: 1, media: 2, baja: 3 };

        return [...arr].sort((a, b) => {
          // Si tienen horario, ordenar por hora
          if (a.time && b.time && a.time !== b.time) {
            return a.time.localeCompare(b.time);
          }

          // Si no tienen horario o es igual → ordenar por prioridad
          return priorityValue[a.priority] - priorityValue[b.priority];
        });
      };

      const updatedDay = sortTasks([...state.tasks[day], newTask]);

      return {
        tasks: {
          ...state.tasks,
          [day]: updatedDay,
        },
      };
    }),

  // Toggle de completado
  toggleTask: (id) =>
    set((state) => {
      const updated = {};

      Object.keys(state.tasks).forEach((day) => {
        updated[day] = state.tasks[day].map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        );
      });

      return { tasks: updated };
    }),

  // Calcular progreso semanal
  getProgress: () => {
    const tasks = get().tasks;
    const allTasks = Object.values(tasks).flat();

    if (allTasks.length === 0) return 0;

    const completed = allTasks.filter((t) => t.completed).length;
    return Math.round((completed / allTasks.length) * 100);
  },

  // Calcular progreso por día
  getDayProgress: (day) => {
    const tasks = get().tasks;
    const dayTasks = tasks[day];

    if (dayTasks.length === 0) return 0;

    const completed = dayTasks.filter((t) => t.completed).length;
    return Math.round((completed / dayTasks.length) * 100);
  },

  // Mensajes barra semanal
  getProgressMessage: () => {
    const progress = get().getProgress();

    if (progress === 0) return "✨ Empezá cuando quieras 💖";
    if (progress < 30) return "🌱 Arranque suave — ¡vos podés!";
    if (progress < 60) return "🌸 Buen ritmo — seguí así!";
    if (progress < 90) return "🌼 ¡Muy bien! Casi terminás todo ✨";
    return "🌟 ¡Completaste casi todo! Orgullo total 💗";
  },
}));
