# propFTX

A full-stack Movie Explorer web application with role-based authentication, built with React (frontend) and Node.js/Express/MongoDB (backend).

---

## 🌐 Live Demo
- **Frontend:** [https://prop-ftx.vercel.app/](https://prop-ftx.vercel.app/)
- **Backend API:** [http://localhost:8080/](http://localhost:8080/)
- **GitHub Repo:** [https://github.com/Hemant142/propFTX](https://github.com/Hemant142/propFTX)

---

## 📸 Screenshots

### Admin Dashboard
![Admin Dashboard](https://i.postimg.cc/Jhq7qQ3V/Laptop-Admin-Dashboard.png)

### Login Page
![Login Page](https://i.postimg.cc/LXQ9d60x/Laptop-Login.png)

### User Dashboard
![User Dashboard](https://i.postimg.cc/T1yRTMzf/Laptop-User-Dashboard.png)

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
git clone https://github.com/Hemant142/propFTX.git
cd propFTX
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
- **Frontend:** React, Vite, Material-UI
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT

---

## 🔑 Admin Panel Credentials
- **Email:** admin123@gmail.com
- **Password:** admin123

---

## 🙏 Acknowledgements
- [Material-UI](https://mui.com/)
- [Vite](https://vitejs.dev/)
- [MongoDB](https://www.mongodb.com/)

---
