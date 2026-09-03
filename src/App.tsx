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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  });

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
    setIsFormVisible(false);
  };

  const handleEdit = (taskId: string) => {
    setEditingTaskId(taskId);
    setIsFormVisible(true);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setIsFormVisible(false);
  };

  const displayTasks = filters.sort ? sortTasks(filteredTasks, filters.sort) : filteredTasks;

  return (
    <div className={isDarkMode ? 'dark min-h-screen bg-slate-900 text-slate-100 transition-colors duration-300' : 'min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300'}>
      <div className="container mx-auto p-4 mt-8 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Task Management</h1>
        <button
          onClick={() => setIsDarkMode(previousMode => !previousMode)}
          className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {!isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          )}
        </button>
      </div>
      {!isFormVisible && (
        <div className="flex justify-end my-4">
          <button
            onClick={() => setIsFormVisible(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Task
          </button>
        </div>
      )}
      {isFormVisible && (
        <TaskForm
          onSubmit={handleSubmit}
          initialTask={editingTask}
          onCancelEdit={handleCancelEdit}
        />
      )}

      <Dashboard tasks={tasks} />
      <TaskFilter onFilterChange={setFilters} />

      <TaskList tasks={displayTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        onEdit={handleEdit} />

      </div>
    </div>
  )
}

export default App
