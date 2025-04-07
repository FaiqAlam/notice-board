import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Notice, getNotices, createNotice, deleteNotice } from '../lib/api';

export default function NoticeBoard() {
  const { user } = useAuth();
  const [noticeList, setNoticeList] = useState<Notice[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    (async () => {
      try {
        const data = await getNotices();
        setNoticeList(data);
      } catch (err) {
        console.error('Unable to load notices:', err);
      }
    })();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const posted = await createNotice(formData);
      setNoticeList([posted, ...noticeList]);
      setFormData({ title: '', content: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Post failed:', err);
    }
  };

  const handleRemove = async (noticeId: string) => {
    try {
      await deleteNotice(noticeId);
      setNoticeList(noticeList.filter((n) => n._id !== noticeId));
    } catch (err) {
      console.error('Deletion failed:', err);
    }
  };

  const canPost = user?.role === 'admin' || user?.role === 'teacher';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {canPost && (
          <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 shadow-xl mb-8">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 text-white font-medium hover:underline"
              >
                <PlusCircle className="h-5 w-5" />
                Add a New Notice
              </button>
            ) : (
              <form onSubmit={handlePost} className="space-y-5">
                <div>
                  <label className="block text-sm text-white mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full border-none rounded-lg px-4 py-2 text-sm bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-white mb-1">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={4}
                    className="w-full border-none rounded-lg px-4 py-2 text-sm bg-white/20 text-white placeholder-white/70 resize-none focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-sm border border-white text-white rounded-md bg-transparent hover:bg-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-white text-pink-600 font-semibold rounded-md hover:bg-pink-100 transition"
                  >
                    Submit Notice
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="space-y-6">
          {noticeList.map((item) => (
            <div
              key={item._id}
              className="bg-white/30 backdrop-blur-lg p-5 rounded-2xl shadow-md border border-white/20 hover:shadow-lg transition duration-150 text-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="text-sm font-semibold text-white/90 mt-1">
                    {item.createdBy.fullName} ({item.createdBy.role})
                  </p>
                </div>
                {(user?.role === 'admin' || user?.id === item.createdBy._id) && (
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-white/70 hover:text-red-500"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p className="mt-4 text-sm whitespace-pre-wrap">{item.content}</p>
              <div className="mt-4 border-t border-white/30 pt-3 text-xs text-white/80">
                {format(new Date(item.createdAt), 'do MMMM yyyy')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
