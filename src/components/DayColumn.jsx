// src/components/DayColumn.jsx
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
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

  // 🔍 FILTRADO
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // all
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    reorderTasks(day, arrayMove(tasks, oldIndex, newIndex));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">{day}</h2>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-3">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}


