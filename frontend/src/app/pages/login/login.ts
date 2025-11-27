import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    this.errorMessage = '';
    this.isLoading = true;

    console.log('Logging in with:', { email: this.email, password: this.password });
    
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        }, 500);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid email or password';
      },
    });
  }
}
