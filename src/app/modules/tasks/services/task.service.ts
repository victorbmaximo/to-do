import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly url = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/tasks`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.url}/tasks`, task);
  }

  completeTask(id: number): Observable<Task> {
    const bodyContent = { status: false }
    return this.http.patch<Task>(`${this.url}/tasks/${id}`, bodyContent);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.url}/tasks/${id}`)
  }
}
