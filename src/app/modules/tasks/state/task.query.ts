import { TaskState, TaskStore } from './task.store';
import { Task, TASK_FILTER } from './task.model';
import { Injectable } from "@angular/core";
import { QueryEntity } from '@datorama/akita';
import { combineLatest } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TaskQuery extends QueryEntity<TaskState, Task> {
    constructor(protected store: TaskStore) {
        super(store);
    }

    getTasksByFilter(filter: string, tasks: Task[]): Task[] {
        switch (filter) {
            case TASK_FILTER.TASK_ACTIVE:
                return tasks.filter(task => task.status);
            case TASK_FILTER.TASK_COMPLETED:
                return tasks.filter(task => !task.status);
            default:
                return tasks;
        }
    }
}