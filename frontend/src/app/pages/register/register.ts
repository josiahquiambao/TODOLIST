import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [FormsModule],
})export class RegisterComponent {
  email = '';
  password = '';
  full_name = ''; 

  constructor(private auth: AuthService, private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    console.log('Registering with:', { email: this.email, password: this.password, full_name: this.full_name });
    
    this.auth.register({
      email: this.email,
      password: this.password,
      full_name: this.full_name 
    }).subscribe({
      next: (res) => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed');
      },
    });
  }

}
