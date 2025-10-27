export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  isCompleted: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface CreateTaskDTO {
  title: string;
  description?: string | null;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string | null;
  isCompleted?: boolean;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T | null;
  message?: string;
}