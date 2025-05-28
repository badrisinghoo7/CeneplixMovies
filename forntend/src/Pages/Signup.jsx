import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('https://ceneplixmovies.onrender.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Signup successful! Please login.');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-blue-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 tracking-wide">Signup</h2>
        {error && (
          <div className="mb-4 bg-blue-50 border border-blue-300 text-blue-700 px-4 py-2 rounded text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-blue-50 border border-blue-300 text-blue-700 px-4 py-2 rounded text-center">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-blue-200 bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
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
            Signup
          </button>
        </form>
        <button
          className="w-full mt-4 text-blue-600 hover:underline font-semibold"
          onClick={() => navigate('/')}
          type="button"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}