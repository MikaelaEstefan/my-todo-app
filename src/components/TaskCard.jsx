// src/components/TaskCard.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTasksStore } from "../context/useTasksStore";

export default function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: task.color || "var(--bg-card)",
  };

  const toggleTask = useTasksStore((s) => s.toggleTask);
  const addSubtask = useTasksStore((s) => s.addSubtask);
  const toggleSubtask = useTasksStore((s) => s.toggleSubtask);
  const startFocus = useTasksStore((s) => s.startFocus);
  const toggleCollapse = useTasksStore((s) => s.toggleCollapse);

  const [subInput, setSubInput] = useState("");

  const subtasks = task.subtasks ?? [];
  const hasSubtasks = subtasks.length > 0;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      {...attributes}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.015 }}
      whileDrag={{ scale: 1.03, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={`
        rounded-2xl
        p-5
        text-[var(--text-main)]
        select-none
        transition-all
        ${task.completed ? "opacity-50 saturate-50" : ""}
      `}
    >
      {/* HEADER */}
      <div
        className="flex justify-between items-start gap-3 cursor-grab"
        {...listeners}
      >
        <div
          className={`text-lg font-semibold leading-snug ${
            task.completed ? "line-through opacity-60" : ""
          }`}
        >
          {task.text}
        </div>

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-5 h-5 mt-1 cursor-pointer accent-[var(--pink-main)]"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* META */}
      {task.time && (
        <div className="text-sm text-[var(--text-main)]/80 mt-1">
          ⏰ {task.time}
        </div>
      )}

      {/* PRIORITY */}
      <div className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 text-sm">
        {task.priority === "alta" && "🔥 Alta"}
        {task.priority === "media" && "🌸 Media"}
        {task.priority === "baja" && "🌿 Baja"}
      </div>

      {/* ACTIONS */}
      <div className="mt-5 flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            startFocus(task.id);
          }}
          className="
            px-5 py-2
            rounded-full
            text-sm
            font-semibold
            bg-[var(--pink-main)]/20
            text-[var(--pink-main)]
            hover:bg-[var(--pink-main)]/30
            transition
          "
        >
          🧘‍♀️ Focus
        </button>

        {hasSubtasks && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCollapse(task.id);
            }}
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] transition"
          >
            {task.collapsed ? "▶ Mostrar subtareas" : "▼ Ocultar subtareas"}
          </button>
        )}
      </div>

      {/* SUBTASKS */}
      <AnimatePresence initial={false}>
        {!task.collapsed && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-5 pl-4 border-l border-white/10 space-y-3 overflow-hidden"
          >
            {subtasks.map((s) => (
              <label
                key={s.id}
                className="flex items-center gap-3 text-sm cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  checked={s.completed}
                  onChange={() => toggleSubtask(task.id, s.id)}
                  className="accent-[var(--pink-main)]"
                />
                <span
                  className={`${
                    s.completed ? "line-through opacity-60" : ""
                  }`}
                >
                  {s.text}
                </span>
              </label>
            ))}

            {/* ADD SUBTASK */}
            <div className="flex gap-2 pt-3">
              <input
                className="
                  flex-1
                  px-3 py-2
                  rounded-lg
                  bg-[var(--bg-panel)]
                  text-sm
                  text-[var(--text-main)]
                  placeholder:text-[var(--text-muted)]
                  border border-[var(--border-soft)]
                  focus:outline-none
                  focus:border-[var(--pink-main)]
                "
                placeholder="Nueva subtarea…"
                value={subInput}
                onChange={(e) => setSubInput(e.target.value)}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter" && subInput.trim()) {
                    addSubtask(task.id, subInput.trim());
                    setSubInput("");
                  }
                }}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!subInput.trim()) return;
                  addSubtask(task.id, subInput.trim());
                  setSubInput("");
                }}
                className="
                  px-4
                  rounded-lg
                  bg-[var(--pink-main)]
                  text-white
                  text-sm
                  font-bold
                  hover:bg-[var(--pink-strong)]
                  transition
                "
              >
                +
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}




