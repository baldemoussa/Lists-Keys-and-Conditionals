import type { Task } from '../../types';
import { getTaskStats } from '../../utils/taskUtils';

function Dashboard({ tasks }: { tasks: Task[] }) {
    const stats = getTaskStats(tasks);

    return (
        <div className='border border-slate-300 rounded-lg'>
            <h1 className='p-4 text-3xl font-bold mb-2'>Dashboard</h1>
            <div className='grid grid-cols-4 gap-4 p-4'>
                <p className='font-semibold'>Total tasks: <span className='font-normal'>{stats.total}</span></p>
                <p className='font-semibold'>Completed tasks: <span className='font-normal'>{stats.completed}</span></p>
                <p className='font-semibold'>In progress tasks: <span className='font-normal'>{stats.inProgress}</span></p>
                <p className='font-semibold'>Pending tasks: <span className='font-normal'>{stats.pending}</span></p>
            </div>
        </div>
    )
}

export default Dashboard;
