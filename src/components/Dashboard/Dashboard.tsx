import type { Task } from '../../types';
import { getTaskStats } from '../../utils/taskUtils';
import { motion } from 'motion/react';

function Dashboard({
    tasks,
    isDarkMode,
}: {
    tasks: Task[];
    isDarkMode: boolean;
}) {
    const stats = getTaskStats(tasks);

    return (
        <div className="mb-8">
            <h2
                className="text-2xl font-bold mb-6"
                style={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}
            >
                Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {/* Total Tasks */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                    <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Tasks</span>
                    <span className="text-4xl font-black text-slate-800">{stats.total}</span>
                </motion.div>

                {/* Completed */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.10 }} className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-center justify-center">
                    <span className="text-emerald-700 text-sm font-semibold uppercase tracking-wider mb-2">Completed</span>
                    <span className="text-4xl font-black text-emerald-800">{stats.completed}</span>
                </motion.div>

                {/* In Progress */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.20 }} className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl shadow-sm border border-indigo-100 flex flex-col items-center justify-center">
                    <span className="text-indigo-700 text-sm font-semibold uppercase tracking-wider mb-2">In Progress</span>
                    <span className="text-4xl font-black text-indigo-800">{stats.inProgress}</span>
                </motion.div>

                {/* Pending */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.25 }} className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col items-center justify-center">
                    <span className="text-amber-700 text-sm font-semibold uppercase tracking-wider mb-2">Pending</span>
                    <span className="text-4xl font-black text-amber-800">{stats.pending}</span>
                </motion.div>

            </div>
        </div>
    )
}

export default Dashboard;
