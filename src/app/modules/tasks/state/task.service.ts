import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { createTask, Task } from "./task.model";
import { TaskStore } from "./task.store";

@Injectable({
  providedIn: 'root'
})
export class TaskStoreService {
  private readonly url = environment.API_URL;

  constructor(private taskStore: TaskStore, private http: HttpClient) { }

  get(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/tasks`).pipe(
      tap(tasks => {
        this.taskStore.set(tasks);
      })
    )
  }

  add(task: Partial<Task>): Observable<Task> {
    const newTask = createTask(task);
    this.taskStore.add(newTask);
    return this.http.post<Task>(`${this.url}/tasks`, newTask);
  }

  complete(id: string): Observable<Task> {
    const bodyContent = { status: false };
    this.taskStore.update(id, bodyContent);
    return this.http.patch<Task>(`${this.url}/tasks/${id}`, bodyContent);
  }

  delete(id: string): Observable<any> {
    this.taskStore.remove(id);
    return this.http.delete(`${this.url}/tasks/${id}`);
  }


}