export type Task = {
    id: number,
    title: string,
    status: boolean
}

export function createTask({ id, title }: Partial<Task>) {
    return {
        id,
        title,
        status: true
    } as Task;
}