# AyurWell Backend 🌿

Simple Node.js + Express API for the AyurWell Ayurvedic wellness platform prototype.
Uses in-memory data (no database needed) so it runs immediately for demo purposes.

## Tech Stack
- Node.js + Express
- JWT authentication (jsonwebtoken)
- bcryptjs for password hashing
- In-memory data stores (easy to swap for MongoDB/Postgres later)

## Getting Started

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Server runs at `http://localhost:5000`.

## Demo Accounts
All demo accounts use the password: `password123`

| Role    | Email                 |
|---------|------------------------|
| Patient | patient@ayurwell.com   |
| Doctor  | doctor@ayurwell.com    |
| Admin   | admin@ayurwell.com     |

## API Endpoints

### Auth
- `POST /api/auth/register` — { name, email, password, role }
- `POST /api/auth/login` — { email, password }
- `GET /api/auth/me` — requires Bearer token

### Food
- `GET /api/food` — list foods, supports `?category=` and `?search=`
- `GET /api/food/:id`
- `POST /api/food` — admin only
- `PUT /api/food/:id` — admin only
- `DELETE /api/food/:id` — admin only

### Community
- `GET /api/community` — list posts
- `POST /api/community` — create post (logged in)
- `POST /api/community/:id/like`
- `POST /api/community/:id/comment` — { text }
- `DELETE /api/community/:id` — author or admin

### Users
- `GET /api/users` — admin only
- `GET /api/users/patients` — doctor or admin
- `PUT /api/users/me` — update own profile
- `DELETE /api/users/:id` — admin only

## Auth Header
Send the JWT from login/register as:
```
Authorization: Bearer <token>
```

## Notes
This is a prototype backend using in-memory arrays — all data resets when the server restarts. Swap `data/*.js` files for a real database (MongoDB, PostgreSQL, etc.) for production use.
