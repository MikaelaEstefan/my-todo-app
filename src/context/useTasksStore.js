// src/context/useTasksStore.js
import { create } from "zustand";
import { nanoid } from "nanoid";

export const useTasksStore = create((set, get) => ({
  // --------------------------------
  // STATE
  // --------------------------------
  tasks: {
    Lunes: [],
    Martes: [],
    Miércoles: [],
    Jueves: [],
    Viernes: [],
  },

  // Focus / Pomodoro
  focusMode: false,
  focusedTaskId: null,
  timer: 25 * 60, // segundos
  isBreak: false,

  // --------------------------------
  // TASK ACTIONS
  // --------------------------------
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
          [day]: [...state.tasks[day], newTask],
        },
      };
    }),

  reorderTasks: (day, newTasks) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [day]: newTasks,
      },
    })),

  toggleTask: (id) =>
    set((state) => {
      const tasks = structuredClone(state.tasks);

      Object.keys(tasks).forEach((day) => {
        tasks[day] = tasks[day].map((t) => {
          if (t.id !== id) return t;

          const completed = !t.completed;

          return {
            ...t,
            completed,
            // si marco completa la tarea -> marco todas las subtareas
            subtasks: completed
              ? t.subtasks.map((s) => ({ ...s, completed: true }))
              : t.subtasks,
          };
        });
      });

      return { tasks };
    }),

  // --------------------------------
  // SUBTASKS
  // --------------------------------
  addSubtask: (taskId, text) =>
    set((state) => {
      const tasks = structuredClone(state.tasks);

      Object.keys(tasks).forEach((day) => {
        tasks[day] = tasks[day].map((t) => {
          if (t.id !== taskId) return t;

          return {
            ...t,
            subtasks: [...t.subtasks, { id: nanoid(), text, completed: false }],
            completed: false,
          };
        });
      });

      return { tasks };
    }),

  toggleSubtask: (taskId, subId) =>
    set((state) => {
      const tasks = structuredClone(state.tasks);

      Object.keys(tasks).forEach((day) => {
        tasks[day] = tasks[day].map((t) => {
          if (t.id !== taskId) return t;

          const subtasks = t.subtasks.map((s) =>
            s.id === subId ? { ...s, completed: !s.completed } : s
          );

          const allDone = subtasks.length > 0 && subtasks.every((s) => s.completed);

          return {
            ...t,
            subtasks,
            completed: allDone,
          };
        });
      });

      return { tasks };
    }),

  // --------------------------------
  // PROGRESS
  // --------------------------------
  getProgress: () => {
    const tasks = get().tasks;
    const all = Object.values(tasks).flat();
    if (all.length === 0) return 0;

    const completed = all.filter((t) => t.completed).length;
    return Math.round((completed / all.length) * 100);
  },

  getDayProgress: (day) => {
    const dayTasks = get().tasks[day] || [];
    if (dayTasks.length === 0) return 0;

    const completed = dayTasks.filter((t) => t.completed).length;
    return Math.round((completed / dayTasks.length) * 100);
  },

  getProgressMessage: () => {
    const progress = get().getProgress();
    if (progress === 0) return "✨ Empezá cuando quieras 💖";
    if (progress < 30) return "🌱 Arranque suave — ¡vos podés!";
    if (progress < 60) return "🌸 Buen ritmo — seguí así!";
    if (progress < 90) return "🌼 ¡Muy bien! Casi terminás todo ✨";
    return "🌟 ¡Completaste casi todo! Orgullo total 💗";
  },

  // --------------------------------
  // FOCUS MODE API
  // --------------------------------
  startFocus: (taskId) =>
    set(() => ({
      focusMode: true,
      focusedTaskId: taskId,
      timer: 25 * 60,
      isBreak: false,
    })),

  stopFocus: () =>
    set(() => ({
      focusMode: false,
      focusedTaskId: null,
      timer: 25 * 60,
      isBreak: false,
    })),

  tick: () =>
    set((state) => ({
      timer: Math.max(0, state.timer - 1),
    })),

  nextPhase: () =>
    set((state) => ({
      isBreak: !state.isBreak,
      timer: !state.isBreak ? 5 * 60 : 25 * 60, // break 5m, focus 25m
    })),
}));

