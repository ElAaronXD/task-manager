import type { Task } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TaskStore {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  reorderTasks: (activeId: string, overId: string) => void
  getTasksByStatus: (status: string) => Task[]
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (taskData) => set((state) => ({
        tasks: [...state.tasks, {
          ...taskData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString()
        }]
      })),

      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(task =>
          task.id === id ? { ...task, ...updates } : task
        )
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })),

      reorderTasks: (activeId, overId) => {
        const state = get()
        const activeIndex = state.tasks.findIndex(task => task.id === activeId)
        const overIndex = state.tasks.findIndex(task => task.id === overId)

        if (activeIndex === -1 || overIndex === -1) return

        const newTasks = [...state.tasks]
        const [removed] = newTasks.splice(activeIndex, 1)
        newTasks.splice(overIndex, 0, removed)

        set({ tasks: newTasks })
      },

      getTasksByStatus: (status: string) => {
        return get().tasks.filter(task => task.status === status)
      }
    }),
    { name: 'task-storage' }
  )
)