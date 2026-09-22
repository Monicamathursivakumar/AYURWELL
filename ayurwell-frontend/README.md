# AyurWell Frontend 🌿

React 18 + Vite + Tailwind CSS frontend for the AyurWell Ayurvedic wellness platform prototype.

## Tech Stack
- React 18 + Vite
- Tailwind CSS (light/dark theme support)
- React Router DOM
- Lucide React icons
- localStorage for lightweight persistent demo data (theme, wellness log)

## Getting Started

Make sure the backend is running first (see `../backend/README.md`) at `http://localhost:5000`.

```bash
cd frontend
npm install
npm run dev
```

Then open the local URL shown in your terminal (usually `http://localhost:5173`).

The dev server proxies `/api/*` requests to `http://localhost:5000` (configured in `vite.config.js`), so no extra setup is needed.

## Build for Production

```bash
npm run build
npm run preview
```

## Demo Accounts
All demo accounts use the password: `password123`

| Role    | Email                 |
|---------|------------------------|
| Patient | patient@ayurwell.com   |
| Doctor  | doctor@ayurwell.com    |
| Admin   | admin@ayurwell.com     |

## Project Structure

```
src/
  components/   Navbar, Footer, ProtectedRoute
  pages/        Landing, Login, Register, FoodExplorer,
                 Community, PatientDashboard, DoctorDashboard, AdminPanel
  context/      AuthContext, ThemeContext
  utils/        api.js (fetch wrapper), storage.js (localStorage helper)
  data/         local fallback food data (used if backend is offline)
```

## Notes
- If the backend isn't running, the Food Explorer falls back to a small local dataset so the UI still renders.
- Role-based routes (`/patient`, `/doctor`, `/admin`) redirect to `/login` if not authenticated, or to `/` if the logged-in role doesn't match.
