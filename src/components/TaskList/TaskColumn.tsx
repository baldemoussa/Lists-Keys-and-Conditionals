import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskItem from './TaskItem';
import type { Task, TaskStatus, TaskColumnProps } from '../../types';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
export default function TaskColumn({ id, title, tasks, onStatusChange, onDelete, onEdit }: TaskColumnProps) {
  const { setNodeRef } = useDroppable({ id });
  const shouldReduceMotion = useReducedMotion();

  let columnStyle = '';
  let headerStyle = '';

  switch (id) {
    case 'completed':
      columnStyle = 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 border-emerald-200 dark:border-emerald-800/50';
      headerStyle = 'text-emerald-800 dark:text-emerald-400 border-b-emerald-200 dark:border-b-emerald-800/50';
      break;
    case 'in-progress':
      columnStyle = 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 border-indigo-200 dark:border-indigo-800/50';
      headerStyle = 'text-indigo-800 dark:text-indigo-400 border-b-indigo-200 dark:border-b-indigo-800/50';
      break;
    case 'pending':
    default:
      columnStyle = 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 border-amber-200 dark:border-amber-800/50';
      headerStyle = 'text-amber-800 dark:text-amber-400 border-b-amber-200 dark:border-b-amber-800/50';
      break;
  }

  return (
    <div className={`p-4 rounded-2xl flex flex-col gap-4 border shadow-sm ${columnStyle}`}>
      <h2 className={`text-lg font-black text-center uppercase tracking-widest mb-2 pb-2 border-b-2 opacity-80 ${headerStyle}`}>
        {title} <span className="text-sm font-semibold opacity-75 ml-1">({tasks.length})</span>
      </h2>
      <ul ref={setNodeRef} className="flex flex-col gap-4 min-h-[300px]">
        <SortableContext id={id} items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence initial={false} mode="popLayout">
            {tasks.map(task => (
              <motion.div
                key={task.id}
                layout
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.96 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              >
                <TaskItem
                  task={task}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </SortableContext>
      </ul>
    </div>
  );
}
