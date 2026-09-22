const express = require('express');
const router = express.Router();

const { posts, getNextId } = require('../data/community');
const { verifyToken, requireRole } = require('../middleware/auth');

// GET /api/community - list all posts (newest first)
router.get('/', (req, res) => {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json({ count: sorted.length, posts: sorted });
});

// POST /api/community - create a new post (logged in users)
router.post('/', verifyToken, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'title and content are required' });
  }
  const newPost = {
    id: getNextId(),
    authorId: req.user.id,
    authorName: req.user.name,
    title,
    content,
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  res.status(201).json({ post: newPost });
});

// POST /api/community/:id/like - like a post
router.post('/:id/like', verifyToken, (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  post.likes += 1;
  res.json({ post });
});

// POST /api/community/:id/comment - add a comment
router.post('/:id/comment', verifyToken, (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Comment text is required' });

  const comment = {
    id: post.comments.length ? Math.max(...post.comments.map((c) => c.id)) + 1 : 1,
    authorName: req.user.name,
    text,
  };
  post.comments.push(comment);
  res.status(201).json({ post });
});

// DELETE /api/community/:id - author or admin only
router.delete('/:id', verifyToken, (req, res) => {
  const idx = posts.findIndex((p) => p.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Post not found' });

  const post = posts[idx];
  if (post.authorId !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized to delete this post' });
  }

  posts.splice(idx, 1);
  res.json({ message: 'Post deleted' });
});

module.exports = router;
