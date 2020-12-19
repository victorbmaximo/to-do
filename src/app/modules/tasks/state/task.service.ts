import { Injectable } from "@angular/core";
import { createTask, Task } from "./task.model";
import { TaskStore } from "./task.store";

@Injectable({
    providedIn: 'root'
})
export class TaskStoreService {
    constructor(private taskStore: TaskStore) { }

    add(task: Task) {
        const newTask = createTask(task);
        this.taskStore.add(newTask);

    }
}