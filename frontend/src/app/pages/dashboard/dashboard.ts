import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { TaskService } from '../../services/task';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user';
import { AlertService, AlertConfig } from '../../services/alert';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf, NgForOf],
})
export class DashboardComponent {
  tasks: any[] = [];
  users: any[] = [];
  loading = true;
  newTitle = '';
  newDescription = '';
  statusFilter: 'all' | 'pending' | 'completed' = 'all';
  selectedUserId: number | 'all' = 'all';
  
  // Modals
  showUserManagement = false;
  showNewTaskModal = false;
  showCreateUserModal = false;
  showEditTaskModal = false;
  
  // User management
  newUserEmail = '';
  newUserPassword = '';
  newUserFullName = '';
  newUserRole = 'user';
  
  // Task creation/editing
  newTaskStatus: boolean = false; // false = pending, true = completed
  editingTask: any = null;
  
  // Alert system
  currentAlert: AlertConfig | null = null;

  constructor(
    private router: Router, 
    private taskService: TaskService, 
    public auth: AuthService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  // Helper methods for stats
  getCompletedCount(): number {
    return this.tasks.filter(t => t.isCompleted).length;
  }

  getPendingCount(): number {
    return this.tasks.filter(t => !t.isCompleted).length;
  }

  // Filter tasks based on selected status
  getFilteredTasks(): any[] {
    let filtered = this.tasks;
    
    // Filter by user (admin only)
    if (this.auth.isAdmin() && this.selectedUserId !== 'all') {
      const userId = Number(this.selectedUserId);
      filtered = filtered.filter(t => t.userId === userId);
    }
    
    // Filter by status
    if (this.statusFilter === 'completed') {
      filtered = filtered.filter(t => t.isCompleted);
    } else if (this.statusFilter === 'pending') {
      filtered = filtered.filter(t => !t.isCompleted);
    }
    
    return filtered;
  }

  // Set active filter
  setFilter(filter: 'all' | 'pending' | 'completed') {
    this.statusFilter = filter;
  }
  
  // Set user filter (admin only)
  setUserFilter(userId: any) {
    this.selectedUserId = userId === 'all' ? 'all' : Number(userId);
  }
  
  // Get user name by ID
  getUserName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? (user.fullName || user.email) : 'Unknown User';
  }

  ngOnInit() {
    this.fetchTasks();
    if (this.auth.isAdmin()) {
      this.fetchUsers();
    }
    
    // Subscribe to alert service
    this.alertService.alert$.subscribe(alert => {
      this.currentAlert = alert;
    });
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
        this.tasks = [];
        this.loading = false;
      }
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (res: any) => {
        console.log('Users fetched:', res);
        this.users = res?.data || [];
      },
      error: (err) => {
        console.error('Error fetching users', err);
        this.users = [];
      }
    });
  }

  addTask() {
    if (!this.newTitle.trim()) {
      this.alertService.error('Validation Error', 'Task title is required');
      return;
    }
    
    console.log('Adding task:', this.newTitle, this.newDescription);

    this.taskService.createTask({
      title: this.newTitle,
      description: this.newDescription,
      isCompleted: this.newTaskStatus
    }).subscribe({
      next: (res: any) => {
        console.log('createTask response', res);
        this.fetchTasks();
        this.newTitle = '';
        this.newDescription = '';
        this.newTaskStatus = false;
        this.showNewTaskModal = false;
        this.alertService.success('Task Created', 'Your task has been created successfully');
      },
      error: (err: any) => {
        console.error('Failed to create task', err);
        this.alertService.error('Failed to Create Task', err.error?.message || 'An error occurred while creating the task');
      }
    });
  }
  
  openNewTaskModal() {
    this.newTitle = '';
    this.newDescription = '';
    this.newTaskStatus = false;
    this.showNewTaskModal = true;
  }
  
  closeNewTaskModal() {
    this.showNewTaskModal = false;
  }
  
  openEditTaskModal(task: any) {
    this.editingTask = task;
    this.newTitle = task.title;
    this.newDescription = task.description || '';
    this.newTaskStatus = task.isCompleted;
    this.showEditTaskModal = true;
  }
  
  closeEditTaskModal() {
    this.showEditTaskModal = false;
    this.editingTask = null;
  }
  
  updateTask() {
    if (!this.editingTask || !this.newTitle.trim()) {
      this.alertService.error('Validation Error', 'Task title is required');
      return;
    }
    
    this.taskService.updateTask(this.editingTask.id, {
      title: this.newTitle,
      description: this.newDescription,
      isCompleted: this.newTaskStatus
    }).subscribe({
      next: (res: any) => {
        console.log('updateTask response', res);
        this.fetchTasks();
        this.showEditTaskModal = false;
        this.editingTask = null;
        this.newTitle = '';
        this.newDescription = '';
        this.newTaskStatus = false;
        this.alertService.success('Task Updated', 'Your task has been updated successfully');
      },
      error: (err: any) => {
        console.error('Failed to update task', err);
        this.alertService.error('Failed to Update Task', err.error?.message || 'An error occurred while updating the task');
      }
    });
  }

  toggleCompletion(task: any) {
    if (!task || !task.id) return;
    this.taskService.updateTask(task.id, { isCompleted: !task.isCompleted }).subscribe(() => this.fetchTasks());
  }

  deleteTask(task: any) {
    if (!task || !task.id) return;
    
    this.alertService.confirm(
      'Delete Task',
      'Are you sure you want to delete this task? This action cannot be undone.',
      () => {
        this.taskService.deleteTask(task.id).subscribe({
          next: () => {
            this.fetchTasks();
            this.alertService.success('Task Deleted', 'The task has been deleted successfully');
          },
          error: (err: any) => {
            console.error('Failed to delete task', err);
            this.alertService.error('Failed to Delete', 'An error occurred while deleting the task');
          }
        });
      }
    );
  }

  // User management functions
  toggleUserManagement() {
    this.showUserManagement = !this.showUserManagement;
  }
  
  openCreateUserModal() {
    this.newUserEmail = '';
    this.newUserPassword = '';
    this.newUserFullName = '';
    this.newUserRole = 'user';
    this.showCreateUserModal = true;
  }
  
  closeCreateUserModal() {
    this.showCreateUserModal = false;
  }

  addUser() {
    if (!this.newUserEmail.trim() || !this.newUserPassword.trim()) {
      this.alertService.error('Validation Error', 'Email and password are required');
      return;
    }

    this.userService.createUser({
      email: this.newUserEmail,
      password: this.newUserPassword,
      fullName: this.newUserFullName,
      role: this.newUserRole
    }).subscribe({
      next: (res: any) => {
        console.log('User created:', res);
        this.fetchUsers();
        this.newUserEmail = '';
        this.newUserPassword = '';
        this.newUserFullName = '';
        this.newUserRole = 'user';
        this.showCreateUserModal = false;
        this.alertService.success('User Created', 'The new user has been created successfully');
      },
      error: (err: any) => {
        console.error('Failed to create user', err);
        this.alertService.error('Failed to Create User', err.error?.message || 'An error occurred while creating the user');
      }
    });
  }

  deleteUser(user: any) {
    if (!user || !user.id) return;
    
    this.alertService.confirm(
      'Delete User',
      `Are you sure you want to delete user ${user.email}? This action cannot be undone.`,
      () => {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            console.log('User deleted');
            this.fetchUsers();
            this.alertService.success('User Deleted', 'The user has been deleted successfully');
          },
          error: (err: any) => {
            console.error('Failed to delete user', err);
            this.alertService.error('Failed to Delete User', 'An error occurred while deleting the user');
          }
        });
      }
    );
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  
  // Alert methods
  handleAlertConfirm() {
    if (this.currentAlert?.onConfirm) {
      this.currentAlert.onConfirm();
    }
    this.alertService.close();
  }
  
  handleAlertCancel() {
    if (this.currentAlert?.onCancel) {
      this.currentAlert.onCancel();
    }
    this.alertService.close();
  }
}
