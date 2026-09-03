import { useState, useEffect } from 'react'
import type { Task, SortCriteria } from './types';
import { sortTasks, filterTasks, loadTasksFromStorage, saveTasksToStorage } from './utils/taskUtils';
import TaskList from './components/TaskList/TaskList';
import TaskFilter from './components/TaskFilter/TaskFilter';
import TaskForm from './components/TaskForm/TaskForm';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromStorage);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const [filters, setFilters] = useState<{ status?: Task['status']; priority?: Task['priority']; text?: string; sort?: SortCriteria }>({});
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const filteredTasks = filterTasks(tasks, filters);
  const editingTask = tasks.find(t => t.id === editingTaskId) || null;

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

  const handleSubmit = (task: Task) => {
    if (editingTaskId) {
      setTasks(prevTasks => prevTasks.map(t => t.id === task.id ? task : t));
      setEditingTaskId(null);
    } else {
      setTasks(prevTasks => [...prevTasks, task]);
    }
  };

  const handleEdit = (taskId: string) => {
    setEditingTaskId(taskId);
  };

  const displayTasks = filters.sort ? sortTasks(filteredTasks, filters.sort) : filteredTasks;

  return (
    <div className="container mx-auto p-4 mt-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-center">Task Management</h1>
      <Dashboard tasks={tasks} />

      <TaskForm
        onSubmit={handleSubmit}
        initialTask={editingTask}
        onCancelEdit={() => setEditingTaskId(null)}
      />
      <TaskFilter onFilterChange={setFilters} />

      <TaskList tasks={displayTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onEdit={handleEdit} />

    </div>
  )
}

export default App
