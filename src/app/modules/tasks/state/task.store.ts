import { Injectable } from "@angular/core";
import { EntityState, EntityStore } from "@datorama/akita";
import { Task } from "./task.model";

export interface TaskState extends EntityState<Task> {
}

@Injectable({
    providedIn: 'root'
})
export class TaskStore extends EntityStore<TaskState, Task> {
    constructor() {
        super(null);
    }
}