import { useState } from 'react';
import type { TaskFilterProps, TaskStatus, TaskPriority, SortCriteria } from '../../types';
import { motion } from 'motion/react';

function TaskFilter({ onFilterChange, isDarkMode }: TaskFilterProps) {
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

  const labelClass = `text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`;
  const selectClass = `w-full px-3 py-2.5 rounded-xl border text-sm font-medium appearance-none cursor-pointer
    transition-all duration-200 outline-none
    ${isDarkMode
      ? 'bg-slate-800/80 border-slate-700 text-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
      : 'bg-white border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300'}`;
  const inputClass = `w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium
    transition-all duration-200 outline-none
    ${isDarkMode
      ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
      : 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-300'}`;

  const hasActiveFilters = status !== 'all' || priority !== 'all' || searchWord !== '' || sort !== 'none';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`rounded-2xl border p-5 mb-6 transition-colors duration-300 ${
      isDarkMode
        ? 'bg-slate-800/50 border-slate-700/50 backdrop-blur-sm'
        : 'bg-white/70 border-slate-200/80 backdrop-blur-sm shadow-sm'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className={`w-5 h-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>
        <h3 className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Filters & Search
        </h3>
        {hasActiveFilters && (
          <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${
            isDarkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600'
          }`}>
            Active
          </span>
        )}
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="task-Search" className={labelClass}>Search</label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              id="task-Search"
              value={searchWord}
              placeholder="Search tasks..."
              onChange={handleSearchChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="task-Status" className={labelClass}>Status</label>
          <select id="task-Status" value={status} onChange={handleStatusChange} className={selectClass}>
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="task-Priority" className={labelClass}>Priority</label>
          <select id="task-Priority" value={priority} onChange={handlePriorityChange} className={selectClass}>
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label htmlFor="task-Sort" className={labelClass}>Sort By</label>
          <select id="task-Sort" value={sort} onChange={handleSortChange} className={selectClass}>
            <option value="none">Default</option>
            <option value="Title">Title</option>
            <option value="Due-Date">Due Date</option>
            <option value="Status">Status</option>
            <option value="Priority">Priority</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex gap-2 mt-4 flex-wrap items-center">
          <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Active:</span>
          {status !== 'all' && (
            <button onClick={() => clearFilter('status')}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-200 hover:scale-105 ${
                isDarkMode ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}>
              Status: {status}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {priority !== 'all' && (
            <button onClick={() => clearFilter('priority')}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-200 hover:scale-105 ${
                isDarkMode ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}>
              Priority: {priority}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {searchWord !== '' && (
            <button onClick={() => clearFilter('search')}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-200 hover:scale-105 ${
                isDarkMode ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}>
              "{searchWord}"
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {sort !== 'none' && (
            <button onClick={() => clearFilter('sort')}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-200 hover:scale-105 ${
                isDarkMode ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}>
              Sort: {sort}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default TaskFilter;
