import { Component, OnInit } from '@angular/core';
import { asyncScheduler, BehaviorSubject, Observable } from 'rxjs';
import { filter, tap, map, observeOn } from 'rxjs/operators';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

import { faCheck, faTintSlash } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/modules/shared/services/modal.service';
import { TaskStoreService } from '../../state/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  allTasks$: Observable<Task[]>;
  activeTasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(null);
  completedTasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(null);

  faCheck = faCheck;
  titleNewTask: string;

  constructor(private taskService: TaskService, private modalService: ModalService, private taskStoreService: TaskStoreService) { }

  ngOnInit(): void {
    this.getAllTasks();
    this.getActiveTasks();
    this.getCompletedTasks();
  }

  getAllTasks(): void {
    this.allTasks$ = this.taskService.getAllTasks();
  }

  getActiveTasks(): void {
    this.allTasks$
      .pipe(
        map(tasks => {
          return tasks.filter(task => task.status);
        })
      )
      .subscribe(activeTasks => this.activeTasks$.next(activeTasks));
  }

  getCompletedTasks(): void {
    this.allTasks$
      .pipe(
        map(tasks => {
          return tasks.filter(task => !task.status)
        })
      )
      .subscribe(completedTasks => this.completedTasks$.next(completedTasks));
  }

  addTask(id): void {
    // this.modalService.open(id);

    if (!this.titleNewTask) {
      return
    }

    this.allTasks$
      .subscribe(v => {
        const newId = Math.max(...v.map(task => task.id)) + 1;
        const newTask: Task = {
          "id": newId,
          "title": this.titleNewTask,
          "status": true
        }

        // this.taskStoreService.add

        // this.taskService.addTask(newTask)
        //   .subscribe(v => {
        //     console.log(v)
        //     this.titleNewTask = '';
        //   });

        this.getActiveTasks();

      });
  }

  completeTask(id: number): void {
    this.taskService.completeTask(id)
      .subscribe(_ => {
        this.getActiveTasks();
        this.getCompletedTasks();
      })

  }

  deleteTask(id: number, status: boolean): void {

    this.taskService.deleteTask(id)
      .subscribe(_ => {
        if (status) {
          this.getActiveTasks();
        } else {
          this.getCompletedTasks();
        }
      });
  }

}

