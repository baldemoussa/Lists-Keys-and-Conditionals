import type { Task } from '../../types';
import { getTaskStats } from '../../utils/taskUtils';

function Dashboard({ tasks }: { tasks: Task[] }) {
    const stats = getTaskStats(tasks);

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                {/* Total Tasks */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-300">
                    <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">Total Tasks</span>
                    <span className="text-4xl font-black text-slate-800 dark:text-slate-100">{stats.total}</span>
                </div>

                {/* Completed */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/50 dark:to-emerald-800/50 p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-800/50 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-300">
                    <span className="text-emerald-700 dark:text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-2">Completed</span>
                    <span className="text-4xl font-black text-emerald-800 dark:text-emerald-100">{stats.completed}</span>
                </div>

                {/* In Progress */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/50 dark:to-indigo-800/50 p-6 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-800/50 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-300">
                    <span className="text-indigo-700 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-2">In Progress</span>
                    <span className="text-4xl font-black text-indigo-800 dark:text-indigo-100">{stats.inProgress}</span>
                </div>

                {/* Pending */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/50 dark:to-amber-800/50 p-6 rounded-2xl shadow-sm border border-amber-100 dark:border-amber-800/50 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-300">
                    <span className="text-amber-700 dark:text-amber-400 text-sm font-semibold uppercase tracking-wider mb-2">Pending</span>
                    <span className="text-4xl font-black text-amber-800 dark:text-amber-100">{stats.pending}</span>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard;
