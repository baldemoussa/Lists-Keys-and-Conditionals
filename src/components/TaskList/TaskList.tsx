import type { TaskListProps } from '../../types';
import TaskItem from '../TaskItem/TaskItem';

function Tasklist({ tasks, onStatusChange, onDelete }: TaskListProps) {
    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    onStatusChange={onStatusChange} 
                    onDelete={onDelete} 
                />
            ))}
        </ul>
    );
}

export default Tasklist