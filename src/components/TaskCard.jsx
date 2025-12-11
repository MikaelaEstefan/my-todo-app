const toggleTask = useTasksStore((state) => state.toggleTask);

<div
  onClick={() => toggleTask(task.id)}
  className="cursor-pointer p-2 rounded-xl"
>
  {task.text}
</div>
