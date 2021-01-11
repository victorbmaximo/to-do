import { TASK_FILTER } from './../../state/task.model';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TaskStoreService } from '../../state/task.service';
import { TaskQuery } from '../../state/task.query';
import { Task } from '../../state/task.model';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/modules/shared/services/modal.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  allTasks$: Observable<Task[]>;
  allTasksStore$: Observable<Task[]>;
  activeTasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(null);
  completedTasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(null);

  faCheck = faCheck;
  titleNewTask: string;

  constructor(
    //private modalService: ModalService,
    private taskStoreService: TaskStoreService,
    private taskQuery: TaskQuery
  ) { }

  ngOnInit() {
    this.getAllTasks();
    this.getActiveTasks();
    this.getCompletedTasks();
  }

  getAllTasks(): void {
    // get tasks from server to set on store
    this.taskStoreService.get().subscribe();
    // get all tasks from store to set on component
    this.allTasksStore$ = this.taskQuery.selectAll();
  }

  getActiveTasks(): void {
    this.allTasksStore$.subscribe(tasks => {
      const activeTasks = this.taskQuery.getTasksByFilter(TASK_FILTER.TASK_ACTIVE, tasks);
      this.activeTasks$.next(activeTasks)
    })
  }

  getCompletedTasks(): void {
    this.allTasksStore$.subscribe(tasks => {
      const completedTasks = this.taskQuery.getTasksByFilter(TASK_FILTER.TASK_COMPLETED, tasks);
      this.completedTasks$.next(completedTasks);
    })
  }

  addTask(): void {
    // this.modalService.open(id);

    if (!this.titleNewTask) {
      return
    }

    const newTask: Partial<Task> = {
      title: this.titleNewTask
    }

    this.taskStoreService.add(newTask).subscribe(v => {
      this.titleNewTask = '';
      this.getActiveTasks();
    });

  }

  completeTask(id: string): void {
    this.taskStoreService.complete(id).subscribe(v => {
      this.getActiveTasks();
      this.getCompletedTasks();
    })

  }

  deleteTask(id: string, status: boolean): void {

    this.taskStoreService.delete(id)
      .subscribe(_ => {
        if (status) {
          this.getActiveTasks();
        } else {
          this.getCompletedTasks();
        }
      });
  }

}

