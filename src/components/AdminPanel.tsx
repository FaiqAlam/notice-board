import React, { useState } from 'react';
import { createUser } from '../lib/api';

export default function AdminPanel() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' as 'admin' | 'teacher' | 'student',
    fullName: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(formData);
      setMessage({ type: 'success', text: 'User profile created successfully!' });
      setFormData({ email: '', password: '', role: 'student', fullName: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Try again later.' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
        <div className="md:w-1/2 text-white space-y-6">
          <h1 className="text-4xl font-bold">User Access Manager</h1>
          <p className="text-white/90">
            Use this panel to register a new user account for students, teachers, or admins.  
            Provide essential details like full name, contact email, and their access level.  
            Once submitted, the new profile will be added to the system.
          </p>
        </div>

        <div className="md:w-1/2 bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full">
          <h2 className="text-2xl font-semibold text-white mb-6">Register a New User</h2>

          {message && (
            <div
              className={`mb-4 px-4 py-2 rounded-md font-medium ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-white mb-1">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter full name"
                className="w-full rounded-md bg-white/20 text-white px-4 py-2 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email"
                className="w-full rounded-md bg-white/20 text-white px-4 py-2 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-1">Set Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter password"
                className="w-full rounded-md bg-white/20 text-white px-4 py-2 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white mb-1">Select Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                className="w-full rounded-md bg-white/20 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-2 bg-white text-pink-600 font-semibold rounded-md hover:bg-pink-100 transition"
              >
                Submit User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
