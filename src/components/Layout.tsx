import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Bell } from 'lucide-react';

export default function Layout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-200 via-pink-100 to-rose-200">
      <header className="bg-white/60 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-xl">
            <Bell className="h-6 w-6" />
            <Link to="/" className="hover:underline">Notice-Board</Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-2 sm:mt-0 text-sm text-gray-700">
            <div className="text-sm">
              Welcome, <span className="font-medium">{user?.full_name}</span>
              &nbsp;<span className="text-xs text-gray-500">({user?.role})</span>
            </div>

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="mt-1 sm:mt-0 bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-xs font-semibold hover:bg-rose-200 transition"
              >
                Admin Tools
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="mt-1 sm:mt-0 flex items-center gap-1 text-gray-600 hover:text-red-600 px-2 py-1 rounded hover:bg-red-100 transition"
            >
              <LogOut className="h-4 w-4" />
              Exit
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
