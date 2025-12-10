// src/context/useTasksStore.js
import { create } from "zustand";
import { nanoid } from "nanoid";

export const useTasksStore = create((set) => ({
  tasks: {
    Lunes: [],
    Martes: [],
    Miércoles: [],
    Jueves: [],
    Viernes: [],
  },

  // ahora incluye el día correctamente
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

  progress: 0,
}));
