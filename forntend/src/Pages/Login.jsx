import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token);
        if (data.user.role === 'admin') navigate('/admin');
        else navigate('/user');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-blue-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 tracking-wide">Login</h2>
        {error && (
          <div className="mb-4 bg-blue-50 border border-blue-300 text-blue-700 px-4 py-2 rounded text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-blue-200 bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-blue-200 bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition shadow"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-blue-700">Don't have an account?</span>
          <button
            className="ml-2 text-blue-500 hover:underline font-semibold"
            onClick={() => navigate('/signup')}
            type="button"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
