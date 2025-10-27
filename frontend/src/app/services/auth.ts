import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3333'; // your AdonisJS backend

  constructor(private http: HttpClient) {}

  // Register
  register(user: { email: string; password: string; full_name?: string }) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Login
  login(email: string, password: string) {
    const credentials = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
