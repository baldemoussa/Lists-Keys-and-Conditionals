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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
            <div key={initialTask?.id || 'new'} className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
                <button 
                    onClick={onCancelEdit}
                    type="button"
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-slate-800 mb-6">{initialTask ? 'Edit Task' : 'Create Task'}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
                        <input type="text" name="title" placeholder="e.g. Design homepage" defaultValue={initialTask?.title}
                            className={`w-full px-4 py-2 bg-slate-50 border rounded-lg text-slate-900 placeholder-slate-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors duration-200 
                                ${errors.title ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-200'}`}
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-semibold text-slate-700 mb-1">Due Date</label>
                        <input type="date" name="dueDate" defaultValue={initialTask?.dueDate}
                            className={`w-full px-4 py-2 bg-slate-50 border rounded-lg text-slate-900 placeholder-slate-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors duration-200 
                                ${errors.dueDate ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-200'}`}
                        />
                        {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                        <textarea rows={3} name="description" placeholder="Add more details..." defaultValue={initialTask?.description}
                            className={`w-full px-4 py-2 bg-slate-50 border rounded-lg text-slate-900 placeholder-slate-400
                                focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors duration-200 resize-none
                                ${errors.description ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-200'}`}/>
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-1">Status</label>
                            <select name="status" required defaultValue={initialTask?.status || 'pending'}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors duration-200">
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="priority" className="block text-sm font-semibold text-slate-700 mb-1">Priority</label>
                            <select name="priority" required defaultValue={initialTask?.priority || 'medium'}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900
                                focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors duration-200">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="flex-1 px-4 py-2 rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/30 transition-colors duration-200"
                        >
                            {initialTask ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}



