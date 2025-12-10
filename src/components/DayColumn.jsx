import React from "react";
import TaskButton from "./TaskButton";
import { useTasksStore } from "../context/useTasksStore";

export default function DayColumn({ day }) {
  const tasks = useTasksStore((state) => state.tasks[day] || []);

  return (
    <div className="bg-gray-800 p-4 rounded-xl h-full min-h-[300px]">
      <h2 className="text-xl font-semibold mb-4">{day}</h2>

      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskButton key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
