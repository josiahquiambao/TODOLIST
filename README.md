# 🚀 TaskFlow - Full-Stack To-Do List Application

A modern, full-stack task management application with authentication and role-based access control.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start with Docker](#quick-start-with-docker)
- [Local Development](#local-development)
- [API Endpoints](#api-endpoints)
- [Default Test Accounts](#default-test-accounts)

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin/Regular User)
- Protected routes with auth guards

### 👑 Admin Features
- Create and manage users
- View all tasks from all users
- Edit and delete any task
- User management dashboard

### 👤 Regular User Features
- Create, edit, and delete own tasks
- Task filtering (All/Pending/Completed)
- Modern, responsive interface

### 🎨 UI/UX
- Clean, minimal design with Inter font
- Custom alert and confirmation modals
- Smooth animations and transitions
- Fully responsive layout

## 🛠 Tech Stack

- **Frontend**: Angular 20 (Standalone Components)
- **Backend**: AdonisJS 6
- **Database**: PostgreSQL 16
- **Authentication**: JWT
- **Styling**: Modern CSS with gradients
- **Containerization**: Docker & Docker Compose

## 🐳 Quick Start with Docker

### Prerequisites
- Docker Desktop
- Docker Compose

### One-Command Setup

```bash
# Clone the repository
git clone <repository-url>
cd todoList

# Start all services (frontend, backend, database)
docker compose up --build
```

That's it! The application will be ready in a few minutes.

### Access the Application

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3333
- **PostgreSQL**: localhost:5432

### Docker Commands

```bash
# Start in detached mode
docker compose up -d --build

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Stop and remove all data
docker compose down -v

# Restart specific service
docker compose restart backend
```

## 💻 Local Development (Without Docker)

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- npm or yarn

### 1. Database Setup

```bash
# Create PostgreSQL database
createdb todolist

# Or using psql
psql -U postgres
CREATE DATABASE todolist;
\q
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials:
# DB_HOST=127.0.0.1
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_DATABASE=todolist

# Run migrations
node ace migration:run

# Seed database (creates test users)
node ace db:seed

# Start development server
npm run dev
```

Backend runs on: **http://localhost:3333**

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend runs on: **http://localhost:4200**

## 🔑 Default Test Accounts

After running migrations and seeds:

### Admin Account
```
Email: admin@example.com
Password: admin123
```

### Regular User Account
```
Email: user@example.com
Password: user123
```

## 📡 API Endpoints

### Authentication
```
POST /register           - Register new user
POST /login              - Login user
```

### Tasks
```
GET    /api/tasks        - Get user's tasks (all tasks for admin)
POST   /api/tasks        - Create new task
PUT    /api/tasks/:id    - Update task
DELETE /api/tasks/:id    - Delete task
```

### Users (Admin Only)
```
GET    /api/users        - Get all users
POST   /api/users        - Create new user
GET    /api/users/:id    - Get user by ID
PUT    /api/users/:id    - Update user
DELETE /api/users/:id    - Delete user
```

## 📁 Project Structure

```
todoList/
├── backend/                    # AdonisJS Backend
│   ├── app/
│   │   ├── controllers/        # API controllers
│   │   │   ├── auth_controller.ts
│   │   │   ├── tasks_controller.ts
│   │   │   └── users_controller.ts
│   │   ├── models/             # Database models
│   │   │   ├── user.ts
│   │   │   └── task.ts
│   │   └── middleware/         # Auth middleware
│   │       ├── auth_jwt_middleware.ts
│   │       └── admin_middleware.ts
│   ├── database/
│   │   ├── migrations/         # Database migrations
│   │   └── seeders/            # Database seeders
│   ├── config/                 # App configuration
│   ├── .env                    # Local environment
│   ├── .env.docker             # Docker environment
│   └── Dockerfile              # Backend Docker image
│
├── frontend/                   # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/          # Page components
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── dashboard/
│   │   │   ├── services/       # API services
│   │   │   │   ├── auth.ts
│   │   │   │   ├── task.ts
│   │   │   │   ├── user.ts
│   │   │   │   └── alert.ts
│   │   │   └── guards/         # Route guards
│   │   │       └── auth.guard.ts
│   │   └── styles.css          # Global styles
│   ├── nginx.conf              # Production nginx config
│   └── Dockerfile              # Frontend Docker image
│
├── docker-compose.yml          # Docker orchestration
├── README.md                   # This file
├── SETUP_GUIDE.md             # Detailed setup instructions
└── QUICK_REFERENCE.md         # Quick command reference
```

## 🎯 User Flows

### Admin Flow
1. Login with admin credentials
2. View dashboard with all users' tasks
3. Filter tasks by user using dropdown
4. Click "Users" to manage users
5. Create/delete users as needed
6. Create, edit, or delete any task

### Regular User Flow
1. Login with user credentials
2. View personal dashboard
3. Filter tasks (All/Pending/Completed)
4. Click "New Task" to create task
5. Edit or delete own tasks
6. Toggle task completion status

## 🔧 Configuration

### Backend Environment Variables

```env
# .env file in backend/
PORT=3333
HOST=localhost
NODE_ENV=development

# Database
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_DATABASE=todolist

# JWT Secret
JWT_SECRET=your_secret_key_here
```

### Frontend API URL

Located in `frontend/src/app/services/*.ts`:
```typescript
private apiUrl = 'http://localhost:3333';
```

## 🐛 Troubleshooting

### Docker Issues

```bash
# Clean rebuild
docker compose down -v
docker compose up --build

# Check logs
docker compose logs backend
docker compose logs frontend
```

### Local Development Issues

```bash
# Backend port already in use
lsof -ti:3333 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3333    # Windows

# Frontend port already in use
lsof -ti:4200 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :4200    # Windows
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ for learning and demonstration purposes.
