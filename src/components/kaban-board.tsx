import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragOverEvent, type DragStartEvent } from "@dnd-kit/core"
import KabanColumn from "./kaban-column"
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { useMemo, useState } from "react"
import type { Column, Task, TaskStatus } from "@/types"
import KabanCard from "./kaban-card"
import { useTaskStore } from "@/store/task-store"

const columnsMockData = [
  { id: 'todo', title: 'To Do', color: '#5045e6' },
  { id: 'in-progress', title: 'In Progress', color: '#f69e0a' },
  { id: 'done', title: 'Done', color: '#22c45e' },
]

export default function KabanBoard() {
  const { updateTask, reorderTasks } = useTaskStore()
  const [columns, setColumns] = useState(columnsMockData)
  const columnsIds = useMemo(() => columns.map(col => col.id), [columns])
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  function onDragStart(e: DragStartEvent) {
    const { active } = e;
    if (active.data.current?.type === 'column') {
      setActiveColumn(active.data.current.column)
    }

    if (active.data.current?.type === 'task') {
      setActiveTask(active.data.current.task)
    }
  }

  function onDragEnd(e: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)
    const { active, over } = e;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveColumn = active.data.current?.type === 'column';
    const isOverColumn = over.data.current?.type === 'column';

    if (isActiveColumn && isOverColumn) {
      setColumns((items) => {
        const activeIndex = items.findIndex(i => i.id === activeId)
        const overIndex = items.findIndex(i => i.id === overId)

        return arrayMove(items, activeIndex, overIndex)
      });
    }
  }

  function onDragOver(e: DragOverEvent) {
    const { active, over } = e;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
    const isActiveTask = active.data.current?.type === 'task';
    const isOverTask = over.data.current?.type === 'task';
    const isOverColumn = over.data.current?.type === 'column';

    if (isActiveTask && isOverTask) {
      reorderTasks(String(activeId), String(overId))
    }

    if (isActiveTask && isOverColumn) {
      updateTask(String(activeId), { status: overId as TaskStatus })
    }
  }

  return (
    <section className='flex gap-4 overflow-x-auto'>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <DragOverlay>
          {activeColumn &&
            <KabanColumn
              column={activeColumn}
            />
          }
          {activeTask && <KabanCard task={activeTask} onDeleteTask={() => { }} />}
        </DragOverlay>
        <SortableContext items={columnsIds}>
          {columns.map((col) => (
            <KabanColumn
              column={col}
              key={col.id}
            />
          ))}
        </SortableContext>
      </DndContext>
    </section>
  )
}
