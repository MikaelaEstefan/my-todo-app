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

  addTask: (day, text, color) =>
    set((state) => {
      const newTask = {
        id: nanoid(),
        text,
        color,
        completed: false,
      };

      return {
        tasks: {
          ...state.tasks,
          [day]: [...state.tasks[day], newTask],
        },
      };
    }),

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

  getProgress: () => {
    const tasks = get().tasks;
    const allTasks = Object.values(tasks).flat();

    if (allTasks.length === 0) return 0;

    const completed = allTasks.filter((t) => t.completed).length;
    return Math.round((completed / allTasks.length) * 100);
  },

  getDayProgress: (day) => {
    const tasks = get().tasks;
    const dayTasks = tasks[day];

    if (dayTasks.length === 0) return 0;

    const completed = dayTasks.filter((t) => t.completed).length;
    return Math.round((completed / dayTasks.length) * 100);
  },

}));

