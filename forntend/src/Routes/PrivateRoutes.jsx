import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Login from '../Pages/Login';
// import { useAuth } from '../context/AuthContext';

// Usage: <PrivateRoutes role="admin" />
export default function PrivateRoutes({ role }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const navigate = useNavigate();
console.log("PrivateRoutes user:", user);

  if (!user || !storedToken) {
    return <Login />;
  }

  if (role && user.role !== role) {
    // If role is specified and doesn't match, redirect
    return navigate("/") ;
  }

  return <Outlet />;
}
