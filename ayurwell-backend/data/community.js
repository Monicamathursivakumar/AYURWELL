// Simple in-memory community posts for the demo prototype.
let posts = [
  {
    id: 1,
    authorId: 1,
    authorName: 'Anjali Sharma',
    title: 'Morning routine that changed my digestion',
    content:
      'Started drinking warm water with lemon and following an early dinner schedule. Feeling much lighter!',
    likes: 12,
    comments: [
      { id: 1, authorName: 'Dr. Ramesh Iyer', text: 'Great consistency — keep it up!' },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    authorId: 2,
    authorName: 'Dr. Ramesh Iyer',
    title: 'Understanding Agni (digestive fire)',
    content:
      'Agni is central to Ayurvedic health. A balanced Agni means better nutrient absorption and less toxin (ama) buildup.',
    likes: 20,
    comments: [],
    createdAt: new Date().toISOString(),
  },
];

let nextId = 3;

module.exports = {
  posts,
  getNextId: () => nextId++,
};
