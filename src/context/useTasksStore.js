import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export const useTasksStore = create(
  persist(
    (set, get) => ({
      tasks: {
        Lunes: [],
        Martes: [],
        Miércoles: [],
        Jueves: [],
        Viernes: [],
      },

      // -------- TASKS --------
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
            focus: false,
            collapsed: false, 
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

        resetWeek: () =>
          set({
            tasks: {
              Lunes: [],
              Martes: [],
              Miércoles: [],
              Jueves: [],
              Viernes: [],
            },
          }),

          toggleCollapse: (taskId) =>
            set((state) => {
              const tasks = structuredClone(state.tasks);

              Object.keys(tasks).forEach((day) => {
                tasks[day] = tasks[day].map((t) =>
                  t.id === taskId
                    ? { ...t, collapsed: !t.collapsed }
                    : t
                );
              });

              return { tasks };
            }),


      toggleTask: (id) =>
        set((state) => {
          const tasks = structuredClone(state.tasks);

          Object.keys(tasks).forEach((day) => {
            tasks[day] = tasks[day].map((t) =>
              t.id === id
                ? {
                    ...t,
                    completed: !t.completed,
                    subtasks: t.subtasks.map((s) => ({
                      ...s,
                      completed: !t.completed ? true : s.completed,
                    })),
                  }
                : t
            );
          });

          return { tasks };
        }),

      // -------- SUBTASKS --------
      addSubtask: (taskId, text) =>
        set((state) => {
          const tasks = structuredClone(state.tasks);

          Object.keys(tasks).forEach((day) => {
            tasks[day] = tasks[day].map((t) =>
              t.id === taskId
                ? {
                    ...t,
                    subtasks: [
                      ...t.subtasks,
                      { id: nanoid(), text, completed: false },
                    ],
                    completed: false,
                  }
                : t
            );
          });

          return { tasks };
        }),

      toggleSubtask: (taskId, subId) =>
        set((state) => {
          const tasks = structuredClone(state.tasks);

          Object.keys(tasks).forEach((day) => {
            tasks[day] = tasks[day].map((t) => {
              if (t.id !== taskId) return t;

              const updated = t.subtasks.map((s) =>
                s.id === subId ? { ...s, completed: !s.completed } : s
              );

              return {
                ...t,
                subtasks: updated,
                completed: updated.every((s) => s.completed),
              };
            });
          });

          return { tasks };
        }),

      // -------- PROGRESS --------
      getProgress: () => {
        const all = Object.values(get().tasks).flat();
        if (!all.length) return 0;
        return Math.round(
          (all.filter((t) => t.completed).length / all.length) * 100
        );
      },

      getDayProgress: (day) => {
        const dayTasks = get().tasks[day];
        if (!dayTasks.length) return 0;
        return Math.round(
          (dayTasks.filter((t) => t.completed).length / dayTasks.length) *
            100
        );
      },

      getProgressMessage: () => {
        const p = get().getProgress();
        if (p === 0) return "✨ Empezá cuando quieras 💖";
        if (p < 30) return "🌱 Arranque suave — ¡vos podés!";
        if (p < 60) return "🌸 Buen ritmo — seguí así!";
        if (p < 90) return "🌼 ¡Muy bien! Casi terminás todo ✨";
        return "🌟 ¡Completaste casi todo! Orgullo total 💗";
      },
    }),
    {
      name: "my-todo-app-storage", // 🔑 clave en localStorage
    }
  )
);

