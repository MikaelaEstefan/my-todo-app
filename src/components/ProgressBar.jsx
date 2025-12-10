import React from "react";
import { useTasksStore } from "../context/useTasksStore";

export default function ProgressBar() {
  const progress = useTasksStore((state) => state.progress);

  return (
    <div className="w-full bg-gray-700 h-3 rounded-xl overflow-hidden">
      <div
        className="bg-green-400 h-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
