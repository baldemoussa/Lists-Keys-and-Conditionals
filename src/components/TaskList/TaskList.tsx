import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { TaskListProps, TaskStatus, Task } from '../../types';
import TaskColumn from './TaskColumn';
import TaskItem from './TaskItem';

const STATUSES: { id: TaskStatus, title: string }[] = [
  { id: 'pending', title: 'Pending' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'completed', title: 'Completed' },
];

function TaskList({ tasks, onStatusChange, onDelete, onEdit }: TaskListProps) {
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // minimum drag distance before activation to allow clicks
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const task = tasks.find(t => t.id === active.id);
        if (task) setActiveTask(task);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveTask(null);
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        // If the item is dropped over a column, overId is the status
        // If the item is dropped over another task, find that task's status
        const overTask = tasks.find(t => t.id === overId);
        const newStatus = overTask ? overTask.status : overId as TaskStatus;
        
        const draggedTask = tasks.find(t => t.id === activeId);
        
        if (draggedTask && draggedTask.status !== newStatus) {
            onStatusChange(activeId, newStatus);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {STATUSES.map(status => (
                    <TaskColumn
                        key={status.id}
                        id={status.id}
                        title={status.title}
                        tasks={tasks.filter(t => t.status === status.id)}
                        onStatusChange={onStatusChange}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>
            <DragOverlay>
                {activeTask ? (
                    <TaskItem
                        task={activeTask}
                        onStatusChange={onStatusChange}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

export default TaskList;