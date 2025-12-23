// src/components/DayColumn.jsx
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import TaskCard from "./TaskCard";
import { useTasksStore } from "../context/useTasksStore";

export default function DayColumn({ day, filter }) {
  const tasks = useTasksStore((state) => state.tasks[day] || []);
  const reorderTasks = useTasksStore((state) => state.reorderTasks);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    reorderTasks(day, arrayMove(tasks, oldIndex, newIndex));
  };

  return (
    <div
      className="
        bg-[var(--bg-panel)]
        rounded-3xl
        px-4
        py-5
        flex
        flex-col
        gap-5
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">
          {day}
        </h2>

        <span
          className="
            px-2.5 py-1
            text-xs
            rounded-full
            bg-white/10
            text-[var(--text-muted)]
          "
        >
          {filteredTasks.length}
        </span>
      </div>

      {/* CONTENT */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-4">
            {filteredTasks.length === 0 ? (
              <div
                className="
                  text-sm
                  text-[var(--text-muted)]
                  text-center
                  py-10
                  px-4
                  rounded-2xl
                  bg-[var(--bg-card)]
                "
              >
                ✨ Sin tareas por ahora
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}


