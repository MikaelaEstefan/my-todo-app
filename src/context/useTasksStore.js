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

  // --- ADD TASK ---
  addTask: (day, text, color, priority = "media", time = "") =>
    set((state) => {
      const newTask = {
        id: nanoid(),
        text,
        color,
        completed: false,
        priority,
        time,
        subtasks: [],
      };

      return {
        tasks: {
          ...state.tasks,
          [day]: [...state.tasks[day], newTask].sort(sortTasks),
        },
      };
    }),

    // --- REORDER TASKS ---
  reorderTasks: (day, newTasks) =>
  set(state => ({
    tasks: {
      ...state.tasks,
      [day]: newTasks,
    },
  })),

  // --- TOGGLE TASK ---
  toggleTask: (id) =>
    set((state) => {
      const tasks = structuredClone(state.tasks);

      Object.keys(tasks).forEach((day) => {
        tasks[day] = tasks[day].map((t) => {
          if (t.id !== id) return t;

          const updated = {
            ...t,
            completed: !t.completed,
          };

          // Marcar subtareas completas si la tarea está completa
          if (updated.completed) {
            updated.subtasks = updated.subtasks.map((s) => ({
              ...s,
              completed: true,
            }));
          }

          return updated;
        });
      });

      return { tasks };
    }),

  // --- ADD SUBTASK ---
  addSubtask: (taskId, text) =>
    set((state) => {
      const tasks = structuredClone(state.tasks);

      Object.keys(tasks).forEach((day) => {
        tasks[day] = tasks[day].map((t) => {
          if (t.id !== taskId) return t;

          return {
            ...t,
            subtasks: [
              ...t.subtasks,
              { id: nanoid(), text, completed: false },
            ],
            completed: false,
          };
        });
      });

      return { tasks };
    }),

  // --- TOGGLE SUBTASK ---
  toggleSubtask: (taskId, subId) =>
    set((state) => {
      const tasks = structuredClone(state.tasks);

      Object.keys(tasks).forEach((day) => {
        tasks[day] = tasks[day].map((t) => {
          if (t.id !== taskId) return t;

          const updatedSubtasks = t.subtasks.map((s) =>
            s.id === subId ? { ...s, completed: !s.completed } : s
          );

          const allDone = updatedSubtasks.every((s) => s.completed);

          return {
            ...t,
            subtasks: updatedSubtasks,
            completed: allDone,
          };
        });
      });

      return { tasks };
    }),

  // --- WEEK PROGRESS ---
  getProgress: () => {
    const tasks = get().tasks;
    const all = Object.values(tasks).flat();
    if (all.length === 0) return 0;

    const completed = all.filter((t) => t.completed).length;
    return Math.round((completed / all.length) * 100);
  },

  // --- DAY PROGRESS ---
  getDayProgress: (day) => {
    const tasks = get().tasks[day];
    if (tasks.length === 0) return 0;

    const completed = tasks.filter((t) => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  },

  getProgressMessage: () => {
  const progress = get().getProgress();

  if (progress === 0) return "✨ Empezá cuando quieras 💖";
  if (progress < 30) return "🌱  Arranque suave — ¡vos podés!";
  if (progress < 60) return "🌸  Buen ritmo — seguí así!";
  if (progress < 90) return "🌼  ¡Muy bien! Casi terminás todo ✨";
  return "🌟  ¡Completaste casi todo! Orgullo total 💗";
},

}));

// -----------------------------------------
// SORT: ordenar por hora y prioridad
// -----------------------------------------
function sortTasks(a, b) {
  // 1) Ordenar por hora primero (vacías al final)
  if (a.time && !b.time) return -1;
  if (!a.time && b.time) return 1;

  if (a.time && b.time) {
    const tA = a.time.split(":").map(Number);
    const tB = b.time.split(":").map(Number);

    const dateA = new Date(0, 0, 0, tA[0], tA[1]);
    const dateB = new Date(0, 0, 0, tB[0], tB[1]);

    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }
  }

  // 2) Luego prioridad (alta > media > baja)
  const priorityValue = { alta: 1, media: 2, baja: 3 };
  return priorityValue[a.priority] - priorityValue[b.priority];
}

