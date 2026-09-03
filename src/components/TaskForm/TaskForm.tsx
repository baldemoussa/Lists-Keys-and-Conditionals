import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Task, TaskFormProps } from '../../types';
import { v4 as uuidv4 } from 'uuid';


export default function TaskForm({ onSubmit, initialTask, onCancelEdit }: TaskFormProps) {
    const [errors, setErrors] = useState<{ title?: string; dueDate?: string; description?: string }>({});

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const title = String(formData.get('title') ?? '').trim();
        const dueDate = String(formData.get('dueDate') ?? '');
        const description = String(formData.get('description') ?? '').trim();
        
        const newErrors: typeof errors = {};
        if (!title) {
            newErrors.title = "Title is required";
        } else if (title.length < 3) {
            newErrors.title = "Title must be at least 3 characters";
        }

        if (!dueDate) {
            newErrors.dueDate = "Due date is required";
        }

        if (!description) {
            newErrors.description = "Description is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const task: Task = {
            id: initialTask?.id || uuidv4(),
            title: title.toUpperCase(),
            description,
            status: String(formData.get('status') ?? 'pending') as Task['status'],
            priority: String(formData.get('priority') ?? 'medium') as Task['priority'],
            dueDate,
        };

        onSubmit(task);
        form.reset(); // clear the form after submission
    };

    return (
        <div key={initialTask?.id || 'new'} className="container mx-auto p-4 mt-8 max-w-3xl border border-gray-300 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{initialTask ? 'Edit Task' : 'Add New Task'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="font-bold mr-2 pt-2">Title</label>
                    <input type="text" name="title" placeholder="Title" defaultValue={initialTask?.title}
                        className={`w-full px-0 py-2 bg-transparent border-b text-sm text-slate-900 placeholder-slate-400
                            focus:outline-none focus:ring-0 transition-colors duration-200 
                            ${errors.title ? 'border-red-500 focus:border-red-600' : 'border-slate-300 focus:border-indigo-600'}`}
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="dueDate" className="font-bold mr-2 pt-2">Due Date</label>
                    <input type="date" name="dueDate" defaultValue={initialTask?.dueDate}
                        className={`w-full px-0 py-2 bg-transparent border-b text-sm text-slate-900 placeholder-slate-400
                            focus:outline-none focus:ring-0 transition-colors duration-200 
                            ${errors.dueDate ? 'border-red-500 focus:border-red-600' : 'border-slate-300 focus:border-indigo-600'}`}
                    />
                    {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="font-bold mr-2 pt-2">Description</label><br />
                    <textarea rows={4} name="description" placeholder="Description" defaultValue={initialTask?.description}
                        className={`w-full px-0 py-2 bg-transparent border-b text-sm text-slate-900 placeholder-slate-400
                            focus:outline-none focus:ring-0 transition-colors duration-200 
                            ${errors.description ? 'border-red-500 focus:border-red-600' : 'border-slate-300 focus:border-indigo-600'}`}/>
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>
                <div>
                    <label htmlFor="status" className="font-bold mr-2 pt-2">Status</label>
                    <select name="status" required defaultValue={initialTask?.status || 'pending'}
                        className="w-full px-0 py-2 bg-transparent border-b border-slate-300 text-sm text-slate-900 placeholder-slate-400
                            focus:outline-none focus:border-indigo-600 focus:ring-0 transition-colors duration-200 ">
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <label htmlFor="priority" className="font-bold mr-2 pt-2">Priority</label>
                    <select name="priority" required defaultValue={initialTask?.priority || 'medium'}
                        className="w-full px-0 py-2 bg-transparent border-b border-slate-300 text-sm text-slate-900 placeholder-slate-400
                        focus:outline-none focus:border-indigo-600 focus:ring-0 transition-colors duration-200 ">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="relative inline-flex items-center justify-center text-sm font-semibold tracking-wider uppercase text-slate-900 py-2 px-1
                            after:absolute after:bottom-0 after:left-0 after:h-[px] after:w-full after:bg-slate-900 after:scale-x-100
                            hover:text-indigo-600 hover:after:bg-indigo-600
                            focus:outline-none focus:text-indigo-600 focus:after:bg-indigo-600
                            transition-all duration-200 ease-in-out"
                    >
                        {initialTask ? 'Update Task' : 'Add Task'}
                        {!initialTask && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        )}
                    </button>
                    {initialTask && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="text-sm font-semibold tracking-wider uppercase text-red-600 py-2 px-1 hover:text-red-800 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}



