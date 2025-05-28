# propFTX

A full-stack Movie Explorer web application with role-based authentication, built with React (frontend) and Node.js/Express/MongoDB (backend).

---

## 🌐 Live Demo
- **Frontend:** [Link Here==>>(https://ceneplix-movies.vercel.app/)]
- **Backend API:** [http://localhost:8080/](http://localhost:8080/)
- **GitHub Repo:** [https://github.com/badrisinghoo7/CeneplixMovies]

---

## 📸 Screenshots

### Admin Dashboard
[![Admin-Dashboard.png](https://i.postimg.cc/zBMqWN3c/Admin-Dashboard.png)](https://postimg.cc/S260Fw66)

### Login Page
[![Login.png](https://i.postimg.cc/kgc6SVCY/Login.png)](https://postimg.cc/DSSwkw81)

### User Dashboard
[![User-Dashboard.png](https://i.postimg.cc/ZK6yT7MS/User-Dashboard.png)](https://postimg.cc/fJTbCKs2)

---

## ✨ Features
- User authentication (Signup/Login)
- Role-based access (Admin/User)
- Admin can add, edit, and delete movies
- Users can view, search, and filter movies by genre
- Users can like/favorite movies (local state)
- Responsive, modern UI with Material-UI
- JWT-based authentication
- MongoDB for persistent storage

---

## 🗂️ Project Structure
```
propFTX/
  backend/    # Node.js/Express/MongoDB API
  frontend/   # React + Vite frontend
```

---

## 🚀 Getting Started

### 1. Clone the repository
```powershell
https://github.com/badrisinghoo7/CeneplixMovies.git
```

### 2. Install dependencies
#### Backend
```powershell
cd backend
npm install
```
#### Frontend
```powershell
cd ../frontend
npm install
```

### 3. Environment Variables
- Create a `.env` file in `backend/` with:
  ```env
  MONGODBURI=your_mongodb_connection_string
  JWTSECRET=your_jwt_secret
  PORT=your_port
  ```

### 4. Run the application locally
#### Backend
```powershell
cd backend
npm run server
```
#### Frontend
```powershell
cd ../frontend
npm run dev
```

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, TailwindCss
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT

---

## 🔑 Admin Panel Credentials
- **Email:** admin@gmail.com
- **Password:** admin

---

## 🙏 Acknowledgements
- [Tailwind.Css]
- [Vite](https://vitejs.dev/)
- [MongoDB](https://www.mongodb.com/)

---
