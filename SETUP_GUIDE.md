# Setup Guide for Windows 10 (Without Docker)

This guide will help you set up and run the ToDo List application on Windows 10 without Docker.

---

## Step 1: Install Prerequisites

### 1.1 Install Node.js

1. Download Node.js from https://nodejs.org/ (v18 or higher)
2. Run the installer
3. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

### 1.2 Install PostgreSQL

1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer (remember the password you set for the postgres user)
3. During installation, make sure to install pgAdmin 4
4. Verify installation:
   ```powershell
   psql --version
   ```

---

## Step 2: Setup PostgreSQL Database

### Option A: Using pgAdmin (GUI)

1. Open pgAdmin 4
2. Connect to your PostgreSQL server (use the password you set during installation)
3. Right-click on "Databases" → "Create" → "Database"
4. Name: `todo_db`
5. Click "Save"
6. Right-click on "Login/Group Roles" → "Create" → "Login/Group Role"
7. General tab: Name: `todo_user`
8. Definition tab: Password: `secret`
9. Privileges tab: Check "Can login?"
10. Click "Save"
11. Right-click on `todo_db` → "Properties" → "Security"
12. Add privilege for `todo_user` with all permissions

### Option B: Using psql Command Line

1. Open PowerShell as Administrator
2. Run these commands:

   ```powershell
   psql -U postgres
   ```

   Enter your postgres password when prompted.

3. In the psql prompt, run:
   ```sql
   CREATE DATABASE todo_db;
   CREATE USER todo_user WITH ENCRYPTED PASSWORD 'secret';
   GRANT ALL PRIVILEGES ON DATABASE todo_db TO todo_user;
   \q
   ```

---

## Step 3: Setup Backend

1. Open PowerShell and navigate to the backend folder:

   ```powershell
   cd C:\Users\Josiah Quiambao\Desktop\todoList\backend
   ```

2. Install dependencies:

   ```powershell
   npm install
   ```

3. Copy the environment file:

   ```powershell
   copy .env.example .env
   ```

4. Edit the `.env` file:

   - Open `.env` in a text editor (Notepad, VS Code, etc.)
   - Update these values:
     ```
     DB_HOST=127.0.0.1
     DB_PORT=5432
     DB_USER=todo_user
     DB_PASSWORD=secret
     DB_DATABASE=todo_db
     JWT_SECRET=your_random_secret_key_change_this_in_production
     ```

5. Run database migrations:

   ```powershell
   node ace migration:run
   ```

6. (Optional) Seed the database with test users:

   ```powershell
   node ace db:seed
   ```

   This creates:

   - Admin: `admin@example.com` / `admin123`
   - User: `user@example.com` / `user123`

7. Start the backend server:

   ```powershell
   npm run dev
   ```

   You should see: `Server started on http://localhost:3333`

---

## Step 4: Setup Frontend

1. Open a **NEW** PowerShell window (keep the backend running)
2. Navigate to the frontend folder:

   ```powershell
   cd C:\Users\Josiah Quiambao\Desktop\todoList\frontend
   ```

3. Install dependencies:

   ```powershell
   npm install
   ```

4. Start the frontend server:

   ```powershell
   npm start
   ```

   You should see the Angular dev server starting.

5. The application will automatically open in your browser at `http://localhost:4200`

---

## Step 5: Test the Application

### Login as Admin:

1. Go to `http://localhost:4200`
2. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`
3. You should see:
   - Admin badge (👑 Admin)
   - "Manage Users" button
   - All tasks from all users

### Test Admin Features:

1. Click "Manage Users"
2. Create a new user
3. View all users
4. Create tasks
5. View all tasks (including from other users)
6. Edit/Delete any task

### Login as Regular User:

1. Logout
2. Login with:
   - Email: `user@example.com`
   - Password: `user123`
3. You should see:
   - No admin badge
   - No "Manage Users" button
   - Only your own tasks

### Test Regular User Features:

1. Create tasks
2. Edit your own tasks
3. Delete your own tasks
4. You cannot see other users' tasks

---

## Common Issues & Solutions

### Issue: "Port 3333 is already in use"

**Solution:**

- Close any other applications using port 3333
- Or change the port in `backend/.env`: `PORT=3334`

### Issue: "Cannot connect to PostgreSQL"

**Solution:**

- Make sure PostgreSQL service is running:
  - Open "Services" in Windows (Win + R, type `services.msc`)
  - Look for "postgresql-x64-xx" service
  - Make sure it's running
- Check if your credentials in `.env` match what you set up

### Issue: "Migration failed"

**Solution:**

- Make sure the database exists
- Make sure the user has correct permissions
- Try rollback and re-run:
  ```powershell
  node ace migration:rollback
  node ace migration:run
  ```

### Issue: Frontend shows "Cannot connect to backend"

**Solution:**

- Make sure backend is running on port 3333
- Check the browser console for errors
- Clear browser cache and reload

### Issue: "npm install" fails

**Solution:**

- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again
- Make sure you have internet connection

---

## Development Workflow

### Daily Startup:

1. Start PostgreSQL (usually auto-starts with Windows)
2. Open PowerShell #1: Start backend
   ```powershell
   cd backend
   npm run dev
   ```
3. Open PowerShell #2: Start frontend
   ```powershell
   cd frontend
   npm start
   ```

### Stopping the Application:

- Press `Ctrl + C` in both PowerShell windows
- Or simply close the PowerShell windows

---

## Next Steps

1. **Customize:** Update the styling, add more features
2. **Deploy:** Consider deploying to platforms like:
   - Frontend: Vercel, Netlify
   - Backend: Railway, Render, Heroku
   - Database: ElephantSQL, Heroku Postgres
3. **Secure:** Change default passwords and JWT secret in production
4. **Test:** Write unit and integration tests

---

## Need Help?

- Check the main README.md for more information
- Review the API endpoints documentation
- Check backend logs in the PowerShell window
- Check browser console for frontend errors
