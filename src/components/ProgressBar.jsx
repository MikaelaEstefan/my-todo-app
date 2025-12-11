import React from "react";
import { useTasksStore } from "../context/useTasksStore";

export default function ProgressBar() {
  
  const tasks = useTasksStore((state) => state.tasks);
  const getProgress = useTasksStore((state) => state.getProgress);

  const progress = getProgress(); 

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full bg-gray-700 h-3 rounded-xl overflow-hidden">
        <div
          className="bg-green-400 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-gray-300 mt-2 text-sm text-center">
        {progress}% completado esta semana 🌙✨
      </p>
    </div>
  );
}



