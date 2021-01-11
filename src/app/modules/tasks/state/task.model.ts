import { guid } from '@datorama/akita';

export type Task = {
    id: string,
    title: string,
    status: boolean
}

export enum TASK_FILTER {
    TASK_COMPLETED = 'completed',
    TASK_ACTIVE = 'active'
}

export function createTask({ id, title }: Partial<Task>) {
    return {
        id: guid(),
        title,
        status: true
    } as Task;
}