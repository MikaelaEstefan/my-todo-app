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

export default function DayColumn({ day }) {
  const tasks = useTasksStore((state) => state.tasks[day] || []);
  const reorderTasks = useTasksStore((state) => state.reorderTasks);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex(t => t.id === active.id);
    const newIndex = tasks.findIndex(t => t.id === over.id);

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
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-3">
            {tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}


