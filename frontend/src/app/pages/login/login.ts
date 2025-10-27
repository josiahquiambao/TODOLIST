import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [FormsModule, RouterModule],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    console.log('Logging in with:', { email: this.email, password: this.password });
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token); // store JWT
        this.router.navigate(['/dashboard']); // go to dashboard
      },
      error: (err) => {
        console.error(err);
        alert('Login failed');
      },
    });
  }
}
