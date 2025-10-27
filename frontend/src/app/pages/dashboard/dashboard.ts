import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgForOf } from '@angular/common'; // <-- add this
import { TaskService } from '../../services/task';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'], // ✅ use external styles
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf, NgForOf],
})
export class DashboardComponent {
  tasks: any[] = [];
  loading = true;
  newTitle = '';
  newDescription = '';

 constructor(private router: Router, private taskService: TaskService, public auth: AuthService) {}


  ngOnInit() {
    this.fetchTasks();
  }

 fetchTasks() {
  this.loading = true;
  this.taskService.getTasks().subscribe({
    next: (res: any) => {
      console.log('Tasks fetched:', res);
     this.tasks = res?.data || [];

      this.loading = false;
    },
    error: (err) => {
      console.error('Error fetching tasks', err);
      this.tasks = []; // <-- fallback on error
      this.loading = false;
    }
  });
}


addTask() {
  if (!this.newTitle.trim() && !this.newDescription.trim()) return; // prevent empty tasks
  console.log('Adding task:', this.newTitle, this.newDescription);

  this.taskService.createTask({
    title: this.newTitle,
    description: this.newDescription
  }).subscribe({
    next: (res: any) => {
      console.log('createTask response', res);

      // ✅ Add new task to local list immediately
      const newTask = {
        id: res?.id || Date.now(), // fallback id if backend doesn't return one
        title: this.newTitle,
        description: this.newDescription,
        isCompleted: false
      };
      this.tasks = [newTask, ...this.tasks]; // add at the top of the list

      // Clear inputs
      this.newTitle = '';
      this.newDescription = '';
    },
    error: (err: any) => {
      console.error('Failed to create task', err);
      alert('Failed to add task');
    }
  });
}




 toggleCompletion(task: any) {
  if (!task || !task.id) return; // <-- prevent null errors
  this.taskService.updateTask(task.id, { isCompleted: !task.isCompleted }).subscribe(() => this.fetchTasks());
}

deleteTask(task: any) {
  if (!task || !task.id) return; // <-- prevent null errors
  this.taskService.deleteTask(task.id).subscribe(() => this.fetchTasks());
}


  logout() {
    this.auth.logout(); // Use AuthService method
    this.router.navigate(['/login']);
  }
}
