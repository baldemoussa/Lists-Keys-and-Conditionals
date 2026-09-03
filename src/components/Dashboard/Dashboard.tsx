import type { Task } from '../../types';
import { getTaskStats } from '../../utils/taskUtils';

function Dashboard({ tasks }: { tasks: Task[] }) {
    const stats = getTaskStats(tasks);

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                {/* Total Tasks */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-300">
                    <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Tasks</span>
                    <span className="text-4xl font-black text-slate-800">{stats.total}</span>
                </div>

                {/* Completed */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-300">
                    <span className="text-emerald-700 text-sm font-semibold uppercase tracking-wider mb-2">Completed</span>
                    <span className="text-4xl font-black text-emerald-800">{stats.completed}</span>
                </div>

                {/* In Progress */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl shadow-sm border border-indigo-100 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-300">
                    <span className="text-indigo-700 text-sm font-semibold uppercase tracking-wider mb-2">In Progress</span>
                    <span className="text-4xl font-black text-indigo-800">{stats.inProgress}</span>
                </div>

                {/* Pending */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col items-center justify-center transition-transform hover:-translate-y-1 duration-300">
                    <span className="text-amber-700 text-sm font-semibold uppercase tracking-wider mb-2">Pending</span>
                    <span className="text-4xl font-black text-amber-800">{stats.pending}</span>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard;
