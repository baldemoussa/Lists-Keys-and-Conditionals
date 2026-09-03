import type { TaskListProps } from '../../types';
import TaskItem from './TaskItem';

function Tasklist({ tasks, onStatusChange, onDelete, onEdit }: TaskListProps) {
    return (
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-slate-300 rounded-lg'>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

export default Tasklist