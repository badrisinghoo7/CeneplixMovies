import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ search, setSearch }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const showSearch = user && user.role === 'user' && location.pathname === '/user';

  const menuItems = [
    user && user.role === 'admin' && { label: 'Admin Dashboard', onClick: () => navigate('/admin') },
    user && user.role === 'user' && { label: 'User Dashboard', onClick: () => navigate('/user') },
    !user && { label: 'Login', onClick: () => navigate('/') },
    !user && { label: 'Signup', onClick: () => navigate('/signup') },
    user && { label: 'Logout', onClick: handleLogout },
  ].filter(Boolean);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-100 via-white to-blue-200 shadow-lg h-20 items-center px-8">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-blue-700 tracking-wider">Cineflix Movies</span>
        </div>
        {showSearch && (
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="w-72 px-4 py-2 rounded border border-blue-300 bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
        )}
        <div className="flex items-center gap-3 ml-auto">
          {user ? (
            <>
              {user.role === 'admin' && (
                <button
                  className="px-4 py-2 rounded text-blue-700 font-semibold hover:bg-blue-100 transition"
                  onClick={() => navigate('/admin')}
                >
                  Admin Dashboard
                </button>
              )}
              {user.role === 'user' && (
                <button
                  className="px-4 py-2 rounded text-blue-700 font-semibold hover:bg-blue-100 transition"
                  onClick={() => navigate('/user')}
                >
                  User Dashboard
                </button>
              )}
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="px-4 py-2 rounded text-blue-700 font-semibold hover:bg-blue-100 transition"
                onClick={() => navigate('/')}
              >
                Login
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                onClick={() => navigate('/signup')}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-100 via-white to-blue-200 shadow-lg h-16 flex items-center px-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-blue-700 tracking-wider">Cineflix Movies</span>
        </div>
        <button
          className="ml-auto text-blue-600 focus:outline-none"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
          </svg>
        </button>
        {/* Drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
            <div className="w-64 bg-white h-full shadow-lg flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <span className="text-lg font-bold text-blue-700">Cineflix Movies</span>
                <button
                  className="text-blue-600"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-2 p-4">
                {menuItems.map((item, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left px-3 py-2 rounded hover:bg-blue-100 text-blue-700 font-semibold transition"
                    onClick={() => {
                      item.onClick();
                      setDrawerOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {showSearch && (
                <div className="p-4 border-t">
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search movies..."
                    className="w-full px-3 py-2 rounded border border-blue-300 bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  />
                </div>
              )}
            </div>
            <div className="flex-1" onClick={() => setDrawerOpen(false)} />
          </div>
        )}
      </nav>
      {/* Spacer for fixed navbar */}
      <div className="h-20 md:h-20" />
    </>
  );
}