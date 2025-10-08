import { useMemo, useState } from "react"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { CalendarIcon, CheckIcon, PlusIcon, XIcon } from "lucide-react"
import type { Column, Task, TaskPriority, TaskStatus } from "@/types"
import KabanCard from "./kaban-card"
import { Modal } from "./modal"
import { Button } from "./ui/button"
import { getPriorityColor, getPriorityLabel } from "@/lib/utils"
import { useTaskStore } from "@/store/task-store"
import { useTaskForm } from "@/hooks/use-task-form"

interface KabanColumnProps {
  column: Column
}

export default function KabanColumn({ column }: Readonly<KabanColumnProps>) {
  const { tasks, deleteTask } = useTaskStore()
  const { formData, setFormData, onCreateTask } = useTaskForm()
  const [open, setOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [taskId, setTaskId] = useState<string>('')

  const columnTasks = useMemo(() =>
    tasks.filter(task => task.status === column.id),
    [tasks, column.id]
  )
  const tsksIds = useMemo(() => columnTasks.map(task => task.id), [columnTasks])

  const { attributes, setNodeRef, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      column
    },
    disabled: open || showForm
  })

  if (isDragging) {
    return <div className="min-w-64 w-full h-[450px] max-h-[450px] bg-slate-100 dark:bg-slate-900 p-4 rounded-lg opacity-40 border border-primary" />
  }

  function handleCreateTask() {
    onCreateTask({
      title: formData.title as string,
      priority: formData.priority as TaskPriority,
      description: formData.description,
      status: column.id as TaskStatus
    })
    setShowForm(false)
  }

  function onCancelCreate() {
    setFormData({ title: '', priority: 'low', description: '' })
    setShowForm(false)
  }

  function onDeleteTask(taskId: string) {
    setOpen(true)
    setTaskId(taskId)
  }

  function onViewTask(task: Task) {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  function onKeyboardPressed(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      onCancelCreate()
    }

    if (formData?.title?.trim().length === 0) return;
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCreateTask()
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  function cyclePriority(currentPriority: TaskPriority): TaskPriority {
    switch (currentPriority) {
      case 'low':
        return 'medium'
      case 'medium':
        return 'high'
      case 'high':
        return 'low'
      default:
        return 'low'
    }
  }

  return (
    <section
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Transform.toString(transform),
        borderTop: `4px solid ${column.color || 'var(--primary)'}`
      }}
      {...attributes}
      {...listeners}
      className="min-w-64 w-full h-[450px] max-h-[450px] border bg-slate-100 dark:bg-slate-900 p-4 rounded-lg flex flex-col gap-4"
    >
      <article className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className="size-3.5 rounded-full"
            style={{ backgroundColor: column.color || 'var(--primary)' }}
          />
          <h2 className="text-xl font-semibold">{column.title}</h2>
        </div>
        <div className="border border-slate-200 dark:border-slate-700 rounded-md text-sm font-semibold bg-slate-200 dark:bg-slate-800 p-1 px-3">
          {columnTasks?.length || 0}
        </div>
      </article>

      <article className="h-full flex flex-col flex-grow gap-3 overflow-y-scroll overflow-x-hidden">
        <SortableContext items={tsksIds}>
          {columnTasks?.map((task) => (
            <KabanCard
              onViewTask={onViewTask}
              onDeleteTask={onDeleteTask}
              task={task}
              key={task.id}
            />
          ))}
        </SortableContext>

        {selectedTask && (
          <Modal
            title=""
            open={showTaskModal}
            setOpen={setShowTaskModal}
            showFooter={false}
          >
            <div className="space-y-4 p-4 md:p-0">
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 pr-4">
                  {selectedTask.title}
                </h2>
                <span className={`rounded-full text-xs font-medium px-2 py-1 ${getPriorityColor(selectedTask.priority)}`}>
                  {getPriorityLabel(selectedTask.priority)}
                </span>
              </div>

              {selectedTask.description && (
                <div className="space-y-2 w-fit">
                  <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Descrição</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed break-words whitespace-pre-line max-w-full break-all">
                    {selectedTask.description}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <CalendarIcon size={14} />
                  <span>Criado em {new Date(selectedTask.createdAt).toLocaleDateString('pt-PT')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    onDeleteTask(selectedTask.id)
                    setShowTaskModal(false)
                    setSelectedTask(null)
                  }}
                  className="ml-auto"
                >
                  Deletar Tarefa
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {showForm && (
          <div className="bg-slate-200 dark:bg-slate-800 p-2.5 rounded-md border border-primary focus-within:border-none space-y-3">
            <input
              id="title"
              type="text"
              value={formData.title}
              placeholder="Título da tarefa..."
              className="w-full bg-transparent border-none outline-none text-sm font-medium placeholder:text-slate-500"
              onChange={onInputChange}
              autoFocus
              onKeyDown={onKeyboardPressed}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, priority: cyclePriority(prev.priority as TaskPriority) }))}
                className={`rounded-full text-xs font-medium px-2 py-1 transition-colors cursor-pointer hover:scale-105 ${getPriorityColor(formData.priority as TaskPriority)}`}
                aria-label={`Prioridade atual: ${getPriorityLabel(formData.priority as TaskPriority)}. Clique para alterar para ${getPriorityLabel(cyclePriority(formData.priority as TaskPriority))}`}
                aria-describedby="priority-help"
              >
                {getPriorityLabel(formData.priority as TaskPriority)}
              </button>
              <textarea
                id="description"
                value={formData.description || ''}
                placeholder="Descrição (opcional)..."
                className="w-full bg-transparent border-none outline-none text-xs text-slate-600 dark:text-slate-400 placeholder:text-slate-500 resize-none"
                rows={1}
                onChange={onInputChange}
                onKeyDown={onKeyboardPressed}
              />
            </div>
          </div>
        )}
      </article>

      <Modal
        title="Deletar Tarefa"
        description="Tem certeza que deseja deletar esta tarefa?"
        onConfirm={() => {
          deleteTask?.(taskId)
          setOpen(false)
          setTaskId('')
        }}
        open={open}
        setOpen={setOpen}
      />

      {!showForm ? (
        <Button
          className="w-full font-medium"
          size="lg"
          variant='outline'
          onClick={() => setShowForm(true)}
        >
          <PlusIcon size={18} /> Adicionar Tarefa
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button
            size="sm"
            disabled={formData?.title?.trim().length === 0}
            onClick={handleCreateTask}
            className="flex-1"
          >
            <CheckIcon size={14} /> Salvar
          </Button>
          <Button size="sm" variant="outline" onClick={onCancelCreate} className="flex-1">
            <XIcon size={14} /> Cancelar
          </Button>
        </div>
      )}
    </section >
  )
}

