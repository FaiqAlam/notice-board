import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bell } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-6">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex flex-col items-center">
          <div className="bg-white/10 p-3 rounded-full shadow-md mb-4">
            <Bell className="text-white h-8 w-8 animate-pulse" />
          </div>
          <h2 className="text-white text-4xl font-bold mb-2">Welcome Back</h2>
          <p className="text-white/80 text-sm mb-6">Log in to your notice board</p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-200 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-white/90 mb-1">Name</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Please enter your Name"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-white/90 mb-1">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-white text-pink-600 font-semibold text-lg hover:bg-pink-100 transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
