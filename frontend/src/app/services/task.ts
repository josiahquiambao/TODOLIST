import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:3333/api/tasks'; // Added /api prefix

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  getTasks() {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  createTask(task: { title: string; description: string }) {
    return this.http.post(this.apiUrl, task, { headers: this.getHeaders() });
  }

  updateTask(id: number, task: { title?: string; description?: string; isCompleted?: boolean }) {
    return this.http.put(`${this.apiUrl}/${id}`, task, { headers: this.getHeaders() });
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
