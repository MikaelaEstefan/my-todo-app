import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTasksStore } from "../context/useTasksStore";

export default function TaskCard({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: task.color,
  };

  const toggleTask = useTasksStore((state) => state.toggleTask);
  const addSubtask = useTasksStore((state) => state.addSubtask);
  const toggleSubtask = useTasksStore((state) => state.toggleSubtask);

  const [subInput, setSubInput] = useState("");

  const priorityStyles = {
    alta: "bg-red-500/30 text-red-200",
    media: "bg-pink-500/30 text-pink-200",
    baja: "bg-green-500/30 text-green-200",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="p-4 rounded-xl border border-gray-600 text-white transition-all"
    >
      {/* HEADER = DRAG HANDLE */}
      <div
        className="flex justify-between items-start gap-3 cursor-grab"
        {...listeners}
      >
        <div
          className={`text-lg leading-snug ${
            task.completed ? "line-through opacity-60" : ""
          }`}
        >
          {task.text}
        </div>

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-5 h-5 mt-1 cursor-pointer"
        />
      </div>

      {/* HORA */}
      {task.time && (
        <div className="text-sm opacity-80 mt-1">⏰ {task.time}</div>
      )}

      {/* PRIORIDAD */}
      <div
        className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
          priorityStyles[task.priority]
        }`}
      >
        {task.priority === "alta" && "🔥 Alta"}
        {task.priority === "media" && "🌸 Media"}
        {task.priority === "baja" && "🌿 Baja"}
      </div>

      {/* SUBTAREAS */}
      <div className="mt-4 pl-4 border-l border-white/30 space-y-1">
        {(task.subtasks ?? []).map((s) => (
          <label
            key={s.id}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              checked={s.completed}
              onChange={() => toggleSubtask(task.id, s.id)}
            />
            <span
              className={`text-sm ${
                s.completed ? "line-through opacity-60" : ""
              }`}
            >
              {s.text}
            </span>
          </label>
        ))}

        {/* AGREGAR SUBTAREA */}
        <div className="flex gap-2 pt-2">
          <input
            className="p-1 rounded bg-gray-700 text-white flex-1 text-sm"
            placeholder="Nueva subtarea…"
            value={subInput}
            onChange={(e) => setSubInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && subInput.trim()) {
                addSubtask(task.id, subInput);
                setSubInput("");
              }
            }}
          />
          <button
            onClick={() => {
              if (!subInput.trim()) return;
              addSubtask(task.id, subInput);
              setSubInput("");
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
