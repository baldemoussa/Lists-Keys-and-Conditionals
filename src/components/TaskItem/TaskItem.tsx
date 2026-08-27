import type { TaskItemProps, TaskStatus } from '../../types';
function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
    return <div key={task.id} className="gap-6 p-4 m-4 rounded-lg border border-gray-200">
                <div className="flex justify-between">
                <h3 className="text-2xl font-bold">{task.title}</h3>
                <div>
                <select value={task.status}
                style={{ color: task.status === 'pending' ? 'orange' : task.status === 'in-progress' ? 'blue' : 'green' }}
                onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button className="text-red-500 px-2 m-2" onClick={() => onDelete(task.id)}>Delete</button>
                </div>
                </div>
                <p>{task.description}</p>
                <div className="flex gap-4">
                <span style={{ color: task.priority === 'low' ? 'green' : task.priority === 'medium' ? 'orange' : 'red' }}>Priority: {task.priority}</span>
                <span>Due: {task.dueDate}</span>
                </div>
            </div>
}

export default TaskItem