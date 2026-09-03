export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type SortCriteria = 'Title' | 'Priority' | 'Due-Date' | 'Status';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
}

export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: TaskPriority;
    text?: string;
    sort?: SortCriteria;
  }) => void;
}

export type TaskFormProps = {
  onSubmit: (task: Task) => void;
  initialTask?: Task | null;
  onCancelEdit?: () => void;
};

