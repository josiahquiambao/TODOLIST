# Quick Reference Guide

## 📝 Project Overview

This is a full-stack To-Do List application with role-based access control.

**Tech Stack:**

- Frontend: Angular 20
- Backend: AdonisJS 6/7
- Database: PostgreSQL
- Auth: JWT

---

## 👥 User Roles & Permissions

| Feature          | Regular User | Admin |
| ---------------- | ------------ | ----- |
| View own tasks   | ✅           | ✅    |
| View all tasks   | ❌           | ✅    |
| Create tasks     | ✅           | ✅    |
| Edit own tasks   | ✅           | ✅    |
| Edit any task    | ❌           | ✅    |
| Delete own tasks | ✅           | ✅    |
| Delete any task  | ❌           | ✅    |
| View users       | ❌           | ✅    |
| Create users     | ❌           | ✅    |
| Delete users     | ❌           | ✅    |

---

## 🔑 Default Credentials (After Seeding)

**Admin Account:**

- Email: `admin@example.com`
- Password: `admin123`

**Regular User Account:**

- Email: `user@example.com`
- Password: `user123`

---

## 🌐 API Endpoints

### Base URL: `http://localhost:3333`

### Public Endpoints

```
POST /login          - Login
POST /register       - Register new account
```

### Protected Endpoints (Require Auth Token)

```
GET    /api/tasks         - Get tasks (filtered by role)
POST   /api/tasks         - Create task
PUT    /api/tasks/:id     - Update task
DELETE /api/tasks/:id     - Delete task
```

### Admin-Only Endpoints

```
GET    /api/users         - Get all users
POST   /api/users         - Create user
GET    /api/users/:id     - Get user
PUT    /api/users/:id     - Update user
DELETE /api/users/:id     - Delete user
```

---

## 💻 Commands

### Backend (in `backend/` folder)

```powershell
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production

# Database
node ace migration:run         # Run migrations
node ace migration:rollback    # Rollback migrations
node ace migration:fresh       # Rollback all and re-run
node ace db:seed               # Seed database

# Other
npm install                    # Install dependencies
node ace list                  # List all ace commands
```

### Frontend (in `frontend/` folder)

```powershell
# Development
npm start                      # Start dev server (port 4200)
npm run build                  # Build for production

# Testing
npm test                       # Run tests
npm run lint                   # Run linter

# Other
npm install                    # Install dependencies
```

---

## 📁 Important Files

### Backend

```
backend/
├── .env                       # Environment variables
├── app/
│   ├── models/
│   │   ├── user.ts           # User model (with role)
│   │   └── task.ts           # Task model
│   ├── controllers/
│   │   ├── auth_controller.ts     # Auth logic
│   │   ├── tasks_controller.ts    # Task CRUD
│   │   └── users_controller.ts    # User management
│   └── middleware/
│       └── admin_middleware.ts    # Admin authorization
├── database/
│   ├── migrations/           # Database schema
│   └── seeders/              # Database seeds
└── start/
    └── routes.ts             # API routes
```

### Frontend

```
frontend/
├── src/
│   └── app/
│       ├── pages/
│       │   ├── login/        # Login page
│       │   ├── register/     # Register page
│       │   └── dashboard/    # Main dashboard
│       └── services/
│           ├── auth.ts       # Auth service
│           ├── task.ts       # Task service
│           └── user.ts       # User service (admin)
```

---

## 🔧 Environment Variables

Edit `backend/.env`:

```env
# Server
PORT=3333
HOST=localhost
NODE_ENV=development

# Database
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=todo_user
DB_PASSWORD=secret
DB_DATABASE=todo_db

# Security
JWT_SECRET=your_random_secret_key
APP_KEY=generate_with_node_ace_generate_key
```

---

## 🐛 Debugging

### Check Backend Status

```powershell
# In browser or using curl
curl http://localhost:3333
```

### Check Database Connection

```powershell
# In backend folder
node ace repl
# Then in REPL:
await User.query().first()
```

### View Logs

- Backend: Check PowerShell window running `npm run dev`
- Frontend: Check browser console (F12)
- Database: Check pgAdmin or psql

### Common Ports

- Frontend: http://localhost:4200
- Backend: http://localhost:3333
- PostgreSQL: localhost:5432

---

## 📚 Learning Resources

### AdonisJS

- Docs: https://docs.adonisjs.com/
- Authentication: https://docs.adonisjs.com/guides/authentication
- Database: https://docs.adonisjs.com/guides/database

### Angular

- Docs: https://angular.dev/
- Router: https://angular.dev/guide/routing
- Forms: https://angular.dev/guide/forms

### PostgreSQL

- Docs: https://www.postgresql.org/docs/
- pgAdmin: https://www.pgadmin.org/docs/

---

## 🚀 Deployment Tips

### Backend

- Set `NODE_ENV=production`
- Change `JWT_SECRET` to strong random string
- Use connection pooling for database
- Enable CORS only for your frontend domain

### Frontend

- Build with `npm run build`
- Update API URL to production backend
- Enable SSL/HTTPS
- Use environment-specific configs

### Database

- Use managed PostgreSQL (ElephantSQL, Railway, etc.)
- Enable SSL connections
- Regular backups
- Monitor performance

---

## 📞 Support

If you encounter issues:

1. Check SETUP_GUIDE.md for detailed setup
2. Review TESTING_CHECKLIST.md for testing
3. Check README.md for troubleshooting
4. Review backend logs for errors
5. Check browser console for frontend errors

---

## 📄 License

MIT License - Feel free to use and modify!
