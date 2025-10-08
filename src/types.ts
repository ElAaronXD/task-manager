export interface Column {
  id: string;
  title: string;
  color?: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

/**
 * Representa uma tarefa no sistema de gerenciamento
 * @interface Task
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  dependencies?: string[];
}
