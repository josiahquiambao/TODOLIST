# Testing Checklist

Use this checklist to verify that all features of the ToDo List application are working correctly.

---

## ✅ Backend API Testing

### Authentication Endpoints

- [ ] **POST /register** - Create a new user account
  - Test with valid email/password
  - Test with duplicate email (should fail)
- [ ] **POST /login** - Login with credentials
  - Test with valid credentials
  - Test with invalid credentials (should fail)
  - Verify JWT token is returned
  - Verify user role is included in response

### Task Endpoints (Protected)

- [ ] **GET /api/tasks** - Get tasks
  - As regular user: should see only own tasks
  - As admin: should see all tasks from all users
- [ ] **POST /api/tasks** - Create a task
  - Test with valid title and description
  - Test with title only
  - Verify task is saved with correct user_id
- [ ] **PUT /api/tasks/:id** - Update a task
  - As owner: should update successfully
  - As admin: should update any task
  - As non-owner: should fail (403 Forbidden)
- [ ] **DELETE /api/tasks/:id** - Delete a task
  - As owner: should delete successfully
  - As admin: should delete any task
  - As non-owner: should fail (403 Forbidden)

### User Management Endpoints (Admin Only)

- [ ] **GET /api/users** - Get all users
  - As admin: should return all users
  - As regular user: should fail (403 Forbidden)
- [ ] **POST /api/users** - Create a new user
  - As admin: should create user successfully
  - As regular user: should fail (403 Forbidden)
  - Test creating both admin and regular users
- [ ] **PUT /api/users/:id** - Update a user
  - As admin: should update successfully
  - As regular user: should fail (403 Forbidden)
- [ ] **DELETE /api/users/:id** - Delete a user
  - As admin: should delete successfully
  - As regular user: should fail (403 Forbidden)

---

## ✅ Frontend Testing

### Authentication Flow

- [ ] **Registration Page**
  - Can access registration page
  - Can create a new account
  - Shows error for duplicate email
  - Redirects to dashboard after registration
- [ ] **Login Page**
  - Can access login page
  - Can login with valid credentials
  - Shows error for invalid credentials
  - Redirects to dashboard after login
  - Can logout from dashboard
  - Cannot access dashboard when logged out

### Regular User Dashboard

- [ ] **Task Management**
  - Can view own tasks
  - Can create a new task
  - Can edit own task
  - Can delete own task
  - Can mark task as completed
  - Can unmark task as completed
  - Cannot see other users' tasks
- [ ] **UI Elements**
  - Welcome message shows user email
  - No admin badge visible
  - No "Manage Users" button visible
  - Logout button works

### Admin Dashboard

- [ ] **Task Management**
  - Can view all users' tasks
  - Can see which user owns each task
  - Can edit any task
  - Can delete any task
  - Can create own tasks
- [ ] **User Management**
  - Admin badge (👑) is visible
  - "Manage Users" button is visible
  - Can click to show/hide user management panel
  - Can view all users
  - Can create new users (both admin and regular)
  - Can select role (admin/user) when creating
  - Can delete users
- [ ] **UI Elements**
  - Welcome message shows "Admin" badge
  - All admin controls are accessible
  - Logout button works

---

## ✅ Security Testing

### Authorization Tests

- [ ] **Without Token**
  - Cannot access protected routes without login
  - API returns 401 Unauthorized
- [ ] **With Invalid Token**
  - Expired token is rejected
  - Malformed token is rejected
  - API returns 401 Unauthorized
- [ ] **Role-Based Access**
  - Regular users cannot access admin routes
  - Regular users cannot modify other users' tasks
  - Admin can access all routes
  - Admin can modify all tasks

### Data Isolation

- [ ] **Task Isolation**
  - User A cannot see User B's tasks
  - User A cannot edit User B's tasks
  - User A cannot delete User B's tasks
  - Admin can see and modify all tasks
- [ ] **User Data**
  - Passwords are hashed (not visible in responses)
  - User data is only visible to admins

---

## ✅ Database Testing

- [ ] **Migrations**
  - `users` table exists with all fields
  - `tasks` table exists with all fields
  - `access_tokens` table exists
  - Foreign key constraints are working
- [ ] **Seeder**
  - Can run seeder successfully
  - Admin user is created: `admin@example.com`
  - Regular user is created: `user@example.com`
  - Both users can login
- [ ] **Data Integrity**
  - Deleting a user deletes their tasks (CASCADE)
  - Task creation requires valid user_id
  - User email is unique

---

## ✅ Error Handling

- [ ] **Backend**
  - Returns proper error codes (400, 401, 403, 404, 500)
  - Returns meaningful error messages
  - Handles database connection errors
  - Handles validation errors
- [ ] **Frontend**
  - Shows user-friendly error messages
  - Handles API connection errors
  - Handles authentication failures
  - Handles authorization failures

---

## ✅ Performance & UX

- [ ] **Loading States**
  - Shows loading indicator when fetching tasks
  - Shows loading indicator when fetching users (admin)
- [ ] **Responsive Design**
  - Works on different screen sizes
  - Mobile-friendly interface
- [ ] **User Experience**
  - Smooth transitions and animations
  - Clear visual feedback for actions
  - Confirmation dialogs for delete actions
  - Form validation and feedback

---

## 🧪 Manual Testing Scenarios

### Scenario 1: Regular User Workflow

1. Register a new account
2. Login with the account
3. Create 3 tasks
4. Mark 1 task as completed
5. Edit 1 task
6. Delete 1 task
7. Logout
8. Login again and verify tasks are still there

### Scenario 2: Admin Workflow

1. Login as admin (`admin@example.com` / `admin123`)
2. Create a new regular user
3. Create a new admin user
4. View all tasks in the system
5. Create a task
6. Edit another user's task
7. Delete another user's task
8. Delete a user account
9. Verify the user's tasks are also deleted

### Scenario 3: Cross-User Testing

1. Login as User A
2. Create 2 tasks
3. Logout
4. Login as User B
5. Verify you CANNOT see User A's tasks
6. Create 1 task
7. Logout
8. Login as Admin
9. Verify you CAN see tasks from both User A and User B
10. Delete User A's task
11. Login as User A
12. Verify your task is deleted

### Scenario 4: Security Testing

1. Try to access `/api/tasks` without login (should fail)
2. Login as regular user
3. Try to access `/api/users` (should fail with 403)
4. Try to edit another user's task (should fail with 403)
5. Login as admin
6. Verify you can access all endpoints

---

## 📊 Test Results

Record your test results here:

**Date:** ******\_\_\_******

**Tested By:** ******\_\_\_******

**Backend Tests:** **\_** / **\_** passed

**Frontend Tests:** **\_** / **\_** passed

**Security Tests:** **\_** / **\_** passed

**Database Tests:** **\_** / **\_** passed

**Manual Scenarios:** **\_** / **\_** passed

**Overall Status:** ✅ Pass / ❌ Fail

**Notes:**

---

---

---

---
