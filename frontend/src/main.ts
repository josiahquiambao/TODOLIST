import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { App } from './app/app';
import { LoginComponent } from './app/pages/login/login';
import { RegisterComponent } from './app/pages/register/register';
import { DashboardComponent } from './app/pages/dashboard/dashboard';
import { AuthInterceptor } from './app/services/auth.interceptor';

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(BrowserModule, HttpClientModule, FormsModule),
    provideRouter([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'dashboard', component: DashboardComponent }
    ]),
    {
      provide: HTTP_INTERCEPTORS,  // <-- correct way to provide interceptors
      useClass: AuthInterceptor,
      multi: true
    }
  ]
}).catch(err => console.error(err));
