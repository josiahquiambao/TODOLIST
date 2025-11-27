import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3333/api/users';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  getUsers() {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  createUser(user: { email: string; password: string; fullName?: string; role: string }) {
    return this.http.post(this.apiUrl, user, { headers: this.getHeaders() });
  }

  getUser(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  updateUser(id: number, user: any) {
    return this.http.put(`${this.apiUrl}/${id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
