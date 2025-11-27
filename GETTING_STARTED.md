# 🚀 Getting Started (5 Minutes)

Quick guide to get the app running on Windows 10 without Docker.

---

## ⚡ Prerequisites Check

Do you have these installed?

- [ ] Node.js (v18+): Run `node --version`
- [ ] PostgreSQL: Run `psql --version`

If not, install them first (see SETUP_GUIDE.md).

---

## 📦 Quick Setup

### 1. Database (2 minutes)

Open PowerShell and run:

```powershell
psql -U postgres
```

Enter these commands in psql:

```sql
CREATE DATABASE todo_db;
CREATE USER todo_user WITH ENCRYPTED PASSWORD 'secret';
GRANT ALL PRIVILEGES ON DATABASE todo_db TO todo_user;
\q
```

### 2. Backend (2 minutes)

```powershell
cd backend
npm install
copy .env.example .env
# Edit .env file - make sure DB credentials match above
node ace migration:run
node ace db:seed
npm run dev
```

✅ Backend running at http://localhost:3333

### 3. Frontend (1 minute)

Open a NEW PowerShell window:

```powershell
cd frontend
npm install
npm start
```

✅ Frontend running at http://localhost:4200

---

## 🎉 You're Done!

Open browser: http://localhost:4200

**Test Login:**

- Admin: `admin@example.com` / `admin123`
- User: `user@example.com` / `user123`

---

## ❓ Problems?

**Backend won't start:**

- Check PostgreSQL is running
- Verify .env database credentials
- Run `npm install` again

**Frontend won't start:**

- Check backend is running on port 3333
- Run `npm install` again
- Clear browser cache

**Still stuck?**

- See SETUP_GUIDE.md for detailed instructions
- Check QUICK_REFERENCE.md for commands
- Review logs in PowerShell windows

---

## 📚 Next Steps

1. ✅ Login as admin and explore features
2. ✅ Create a new user
3. ✅ Create some tasks
4. ✅ Test role-based permissions
5. ✅ Read TESTING_CHECKLIST.md
6. ✅ Customize the code!

---

**Happy Coding! 🎯**
