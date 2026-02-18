# Mini Job Board Application

A simple **Mini Job Board** built using **React + TypeScript + Vite**.
The application supports two roles:

* **Admin**
* **Candidate**

Admins can create jobs and view applicants, while candidates can browse and apply for jobs.

---

## 🚀 Tech Stack

* React + TypeScript
* Vite
* MUI (Material UI)
* TanStack Query
* Redux Toolkit
* React Hook Form
* JSON Server (Mock API)
* Axios

---

## 📌 Features

### 🔐 Authentication

* Single login/register screen
* Admin login with predefined credentials
* Candidate registration (name, email, password)
* Role-based routing
* Protected routes
* Login persistence using localStorage

### 👨‍💼 Admin Panel (`/admin`)

* Create Job with validation
* Job List with:

  * Title
  * Days Remaining
  * Number of Applicants
* View Applicants in Modal
* Loading & Error handling
* Snackbar feedback

### 👩‍💻 Candidate Panel (`/jobs`)

* View all active jobs (`daysRemaining > 0`)
* Apply to jobs
* Prevent multiple applications
* Disable Apply button when:

  * Already applied
  * Job expired

---

## 🗂️ Project Structure

```
src/
 ├─ api/
 ├─ components/
 ├─ hooks/
 ├─ pages/
 ├─ redux/
 ├─ routes/
 └─ App.tsx
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```bash
npm install
```

---

### 2️⃣ Start Mock API (JSON Server)

```bash
npm run server
```

Runs on:

```
http://localhost:3001
```

---

### 3️⃣ Start Frontend

```bash
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## 🔑 Admin Credentials

```
Email: admin@test.com
Password: admin123
```

---

## 📊 Mock API (db.json)

```
users
jobs
applications
```

---

## 🎨 UI Expectations Implemented

* Clean MUI layout
* Loading states
* Error handling
* Disabled buttons
* Snackbar feedback

---

## 📝 Notes

* Applications are stored using JSON Server.
* TanStack Query handles data fetching & caching.
* Redux stores authentication state.

---

## 💼 Author

Mini Job Board Assignment
Frontend Technical Implementation
