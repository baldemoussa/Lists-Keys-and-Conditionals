import type { Task, SortCriteria } from "../types";

const priorityOrder: Record<Task['priority'], number> = {
    'high': 1,
    'medium': 2,
    'low': 3
};

const statusOrder: Record<Task['status'], number> = {
    'pending': 1,
    'in-progress': 2,
    'completed': 3
};

export function sortTasks(tasks: Task[], sortBy: SortCriteria): Task[] {
    const tasksCopy = [...tasks];
    switch (sortBy) {
        case "Title":
            return tasksCopy.sort((a, b) => a.title.localeCompare(b.title));
        case "Priority":
            return tasksCopy.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        case "Due-Date":
            return tasksCopy.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        case "Status":
            return tasksCopy.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        default:
            return tasksCopy;
    }
}

export function filterTasks(
    tasks: Task[],
    filters: { status?: Task['status']; priority?: Task['priority']; text?: string; }
): Task[] {
    return tasks.filter(task => {
        if (filters.status && task.status !== filters.status) return false;
        if (filters.priority && task.priority !== filters.priority) return false;
        if (filters.text) {
            const searchLower = filters.text.toLowerCase();
            if (!task.title.toLowerCase().includes(searchLower) && !task.description.toLowerCase().includes(searchLower)) {
                return false;
            }
        }
        return true;
    });
}

export function loadTasksFromStorage(): Task[] {
    const savedTasks = localStorage.getItem("taskList");
    if (savedTasks) {
        try {
            return JSON.parse(savedTasks);
        } catch (e) {
            console.error("Failed to parse tasks from localStorage", e);
        }
    }
    return [];
}

export function saveTasksToStorage(tasks: Task[]): void {
    localStorage.setItem("taskList", JSON.stringify(tasks));
}

export function getTaskStats(tasks: Task[]) {
    return {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        pending: tasks.filter(t => t.status === 'pending').length,
    };
}