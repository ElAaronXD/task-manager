import type { TaskPriority } from "@/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPriorityLabel(priority: TaskPriority) {
  switch (priority) {
    case 'low':
      return 'Baixa'
    case 'medium':
      return 'Média'
    case 'high':
      return 'Alta'
    default:
      return 'Desconhecida'
  }
}

export function getPriorityColor(priority: TaskPriority) {
  switch (priority) {
    case 'low':
      return 'bg-blue-200 text-blue-900 dark:bg-blue-600 dark:text-blue-100'
    case 'medium':
      return 'bg-amber-200 text-amber-900 dark:bg-amber-600 dark:text-amber-100'
    case 'high':
      return 'bg-red-200 text-red-900 dark:bg-red-600 dark:text-red-100'
    default:
      return ''
  }
}
