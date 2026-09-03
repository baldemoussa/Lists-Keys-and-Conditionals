import { useState } from 'react';
import type { TaskFilterProps, TaskStatus, TaskPriority, SortCriteria } from '../../types';

function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const [status, setStatus] = useState<TaskStatus | 'all'>('all');
  const [priority, setPriority] = useState<TaskPriority | 'all'>('all');
  const [searchWord, setSearchWord] = useState<string>('');
  const [sort, setSort] = useState<SortCriteria | 'none'>('none');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TaskStatus | 'all';
    setStatus(newStatus);
    onFilterChange({
      status: newStatus === 'all' ? undefined : newStatus as TaskStatus,
      priority: priority === 'all' ? undefined : priority as TaskPriority,
      text: searchWord === '' ? undefined : searchWord,
      sort: sort === 'none' ? undefined : sort,
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value as TaskPriority | 'all';
    setPriority(newPriority);
    onFilterChange({
      status: status === 'all' ? undefined : status as TaskStatus,
      priority: newPriority === 'all' ? undefined : newPriority as TaskPriority,
      text: searchWord === '' ? undefined : searchWord,
      sort: sort === 'none' ? undefined : sort,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchWord = e.target.value;
    setSearchWord(newSearchWord);
    onFilterChange({
      status: status === 'all' ? undefined : status as TaskStatus,
      priority: priority === 'all' ? undefined : priority as TaskPriority,
      text: newSearchWord,
      sort: sort === 'none' ? undefined : sort,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortCriteria | 'none';
    setSort(newSort);
    onFilterChange({
      status: status === 'all' ? undefined : status as TaskStatus,
      priority: priority === 'all' ? undefined : priority as TaskPriority,
      text: searchWord === '' ? undefined : searchWord,
      sort: newSort === 'none' ? undefined : newSort,
    });
  }

  const clearFilter = (type: 'status' | 'priority' | 'search' | 'sort') => {
    let nextStatus = status;
    let nextPriority = priority;
    let nextSearch = searchWord;
    let nextSort = sort;

    if (type === 'status') { nextStatus = 'all'; setStatus('all'); }
    if (type === 'priority') { nextPriority = 'all'; setPriority('all'); }
    if (type === 'search') { nextSearch = ''; setSearchWord(''); }
    if (type === 'sort') { nextSort = 'none'; setSort('none'); }

    onFilterChange({
      status: nextStatus === 'all' ? undefined : nextStatus as TaskStatus,
      priority: nextPriority === 'all' ? undefined : nextPriority as TaskPriority,
      text: nextSearch === '' ? undefined : nextSearch,
      sort: nextSort === 'none' ? undefined : nextSort,
    });
  };

  return (
    <>
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
      <div>
        <div className="flex flex-col justify-between">
          <label htmlFor="task-Search" className="font-bold">Search</label>
          <input
            id="task-Search"
            placeholder='Search by title or description'
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-between">
          <label htmlFor="task-Sort" className="font-bold">Sort By</label>
          <select
            id="task-Sort"
            value={sort}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="none">None</option>
            <option value="Title">Title</option>
            <option value="Due-Date">Due Date</option>
            <option value="Status">Status</option>
            <option value="Priority">Priority</option>
          </select>
        </div>
      </div>
    </div>
      {/* Active Filter Indicators */}
      {(status !== 'all' || priority !== 'all' || searchWord !== '' || sort !== 'none') && (
        <div className="flex gap-2 mt-4 flex-wrap w-full px-4 mb-4">
          {status !== 'all' && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
              Status: {status}
              <button onClick={() => clearFilter('status')} className="ml-1.5 text-blue-800 hover:text-blue-900 focus:outline-none">&times;</button>
            </span>
          )}
          {priority !== 'all' && (
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
              Priority: {priority}
              <button onClick={() => clearFilter('priority')} className="ml-1.5 text-purple-800 hover:text-purple-900 focus:outline-none">&times;</button>
            </span>
          )}
          {searchWord !== '' && (
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
              Search: "{searchWord}"
              <button onClick={() => clearFilter('search')} className="ml-1.5 text-green-800 hover:text-green-900 focus:outline-none">&times;</button>
            </span>
          )}
          {sort !== 'none' && (
            <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center">
              Sort: {sort}
              <button onClick={() => clearFilter('sort')} className="ml-1.5 text-orange-800 hover:text-orange-900 focus:outline-none">&times;</button>
            </span>
          )}
        </div>
      )}
    </>
  );
}

export default TaskFilter;
