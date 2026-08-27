import { useState } from 'react';
import type { TaskFilterProps, TaskStatus } from '../../types';

function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const [status, setStatus] = useState<TaskStatus | 'all'>('all');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'all'>('all');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatus | 'all';
    setStatus(newStatus);
    onFilterChange({
      status: newStatus === 'all' ? undefined : newStatus as TaskStatus,
      priority: priority === 'all' ? undefined : priority as 'low' | 'medium' | 'high',
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value as 'low' | 'medium' | 'high' | 'all';
    setPriority(newPriority);
    onFilterChange({
      status: status === 'all' ? undefined : status as TaskStatus,
      priority: newPriority === 'all' ? undefined : newPriority as 'low' | 'medium' | 'high',
    });
  };

  return (
    <div className="flex gap-6 p-4 mb-4">
      <div>
        <div className="flex flex-col">
          <label htmlFor="task-Status" className="font-bold">Status</label>
          <select
            id="task-Status"
            value={status}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex flex-col">
          <label htmlFor="task-Priority" className="font-bold">Priority</label>
          <select
            id="task-Priority"
            value={priority}
            onChange={handlePriorityChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskFilter;
