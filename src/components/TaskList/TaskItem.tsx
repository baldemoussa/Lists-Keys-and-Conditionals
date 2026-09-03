import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TaskItemProps, TaskStatus } from '../../types';

function TaskItem({ task, onStatusChange, onDelete, onEdit }: TaskItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id, data: { type: 'Task', task } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="flex flex-col justify-between gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-grab active:cursor-grabbing"
        >
            <div className="flex justify-between items-start gap-2">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 break-words leading-tight">{task.title}</h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm whitespace-pre-wrap line-clamp-3">{task.description}</p>
            <div className="flex flex-wrap gap-4 text-xs font-medium bg-slate-50 dark:bg-slate-900/50 p-2 rounded-md">
                <span style={{ color: task.priority === 'low' ? 'green' : task.priority === 'medium' ? 'orange' : 'red' }}>
                    Priority: <span className="uppercase">{task.priority}</span>
                </span>
                <span className="text-slate-500 dark:text-slate-400">Due: {task.dueDate}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 dark:border-slate-700 pt-3 mt-1" onClick={(e) => e.stopPropagation()}>
                <button
                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => onDelete(task.id)}
                    aria-label="Delete task"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
                <button
                    className="text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={() => onEdit(task.id)}
                    aria-label="Edit task"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>
            </div>
        </li>
    );
}

export default TaskItem;