import type { Task } from "@/types";
import { getPriorityColor, getPriorityLabel } from "@/lib/utils";
import { Trash } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";

interface KabanCardProps {
  task: Task
  onDeleteTask: (taskId: string) => void
  onViewTask?: (task: Task) => void
}

export default function KabanCard({ task, onViewTask, onDeleteTask }: Readonly<KabanCardProps>) {
  const { attributes, setNodeRef, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task
    },
  })

  const handleDelete = useMemo(() => (e: React.MouseEvent) => {
    e.stopPropagation()
    onDeleteTask(task.id)
  }, [onDeleteTask, task.id])

  if (isDragging) {
    return <div className="h-23 bg-slate-200 dark:bg-slate-800 p-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 opacity-30 border border-primary" />
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Transform.toString(transform),
      }}
      {...attributes}
      {...listeners}
      className="relative group h-fit max-h-25 bg-slate-200 border hover:border-primary/80 space-y-1.5 dark:bg-slate-800 p-2.5 rounded-md cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
      onClick={() => onViewTask?.(task)}
    >
      <div className={`rounded-full text-sm font-medium w-fit px-1.5 ${getPriorityColor(task.priority)}`}>{getPriorityLabel(task.priority)}</div>
      <h3 className="font-medium">{task.title}</h3>
      {task.description && task.description.length > 0 && (
        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">{task.description}</p>
      )}
      <button
        onClick={handleDelete}
        className="absolute right-4 top-1/2 -translate-y-1/2 group-hover:block hidden cursor-pointer"
      >
        <Trash size={24} className="text-red-300 hover:text-red-500" />
      </button>
    </div>
  )
}

