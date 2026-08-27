import { useState } from 'react'
import type { Task } from './types';
import TaskList from './components/TaskList/TaskList';
import TaskFilter from './components/TaskFilter/TaskFilter';
function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Task 1", description: "Description 1", status: "pending", priority: "low", dueDate: "8/31/2026" },
    { id: "2", title: "Task 2", description: "Description 2", status: "in-progress", priority: "medium", dueDate: "8/30/2026" },
    { id: "3", title: "Task 3", description: "Description 3", status: "completed", priority: "high", dueDate: "8/29/2026" },
  ]);

  const [filters, setFilters] = useState<{ status?: Task['status']; priority?: Task['priority'] }>({});

  const filteredTasks = tasks.filter(task => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDelete = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="container mx-auto p-4 mt-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center">Task Manager</h1>
      <TaskFilter onFilterChange={setFilters} />

      <TaskList tasks={filteredTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete} />
    </div>
  )
}

export default App
