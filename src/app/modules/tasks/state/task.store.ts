import { Injectable } from "@angular/core";
import { StoreConfig } from '@datorama/akita';
import { EntityState, EntityStore } from "@datorama/akita";
import { Task } from "./task.model";

export interface TaskState extends EntityState<Task> {
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'tasks' })
export class TaskStore extends EntityStore<TaskState, Task> {
    constructor() {
        super([]);
    }
}