import { useState } from 'react'
import { useTaskStore } from '@/store/task-store'
import type { Task } from '@/types'

export const useTaskForm = () => {
  const addTask = useTaskStore(state => state.addTask)
  const updateTask = useTaskStore(state => state.updateTask)

  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'low',
    status: 'todo'
  })

  const onCreateTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    addTask(taskData)
    setFormData({
      title: '',
      description: '',
      priority: 'low',
      status: 'todo'
    })
  }

  const onUpdateTask = (id: string, updates: Partial<Task>) => {
    updateTask(id, updates)
  }

  return {
    formData,
    setFormData,
    onCreateTask,
    onUpdateTask
  }
}