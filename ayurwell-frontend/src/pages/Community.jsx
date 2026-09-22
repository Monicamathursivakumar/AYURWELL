import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Send, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../utils/api';

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [commentDrafts, setCommentDrafts] = useState({});

  function loadPosts() {
    api
      .get('/community')
      .then((d) => setPosts(d.posts))
      .catch((e) => setError(e.message));
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    try {
      await api.post('/community', { title, content });
      setTitle('');
      setContent('');
      loadPosts();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleLike(id) {
    try {
      await api.post(`/community/${id}/like`);
      loadPosts();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleComment(id) {
    const text = commentDrafts[id];
    if (!text || !text.trim()) return;
    try {
      await api.post(`/community/${id}/comment`, { text });
      setCommentDrafts((d) => ({ ...d, [id]: '' }));
      loadPosts();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold mb-2 flex items-center justify-center gap-2">
          <Users size={26} className="text-sage-600 dark:text-sage-300" /> Community
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Share your wellness journey and learn from others.
        </p>
      </div>

      {error && <p className="text-sm text-red-500 mb-4 text-center">{error}</p>}

      {user ? (
        <form onSubmit={handleCreate} className="card mb-8 space-y-3">
          <input
            className="input-field"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="input-field"
            placeholder="Share something with the community..."
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Send size={15} /> Post
          </button>
        </form>
      ) : (
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-8">
          Log in to share your own post.
        </p>
      )}

      <div className="space-y-5">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{post.title}</h3>
              <span className="text-xs text-gray-400">{post.authorName}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{post.content}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1 hover:text-sage-600 dark:hover:text-sage-400"
              >
                <Heart size={15} /> {post.likes}
              </button>
              <span className="flex items-center gap-1">
                <MessageCircle size={15} /> {post.comments.length}
              </span>
            </div>

            {post.comments.length > 0 && (
              <ul className="space-y-1 mb-3 border-t border-sage-100 dark:border-gray-700 pt-3">
                {post.comments.map((c) => (
                  <li key={c.id} className="text-sm">
                    <span className="font-medium">{c.authorName}:</span> {c.text}
                  </li>
                ))}
              </ul>
            )}

            {user && (
              <div className="flex gap-2">
                <input
                  className="input-field flex-1 text-sm py-1.5"
                  placeholder="Write a comment..."
                  value={commentDrafts[post.id] || ''}
                  onChange={(e) =>
                    setCommentDrafts((d) => ({ ...d, [post.id]: e.target.value }))
                  }
                />
                <button
                  onClick={() => handleComment(post.id)}
                  className="btn-primary text-sm py-1.5 px-3"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        ))}
        {posts.length === 0 && !error && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-10">
            No posts yet. Be the first to share!
          </p>
        )}
      </div>
    </div>
  );
}
