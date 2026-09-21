# Full-Stack Application (Client & Server)

This repository contains the frontend client and backend server.

## Project Structure

```
.
├── client/          # Next.js 16 (App Router, TypeScript, Tailwind CSS)
└── server/          # Express.js (ES Modules, CORS, Dotenv)
```

---

## Getting Started

### 1. Backend Server (`server/`)

```bash
cd server
npm install
npm run dev
```

- **Port**: `http://localhost:5001` (configured via `.env` to prevent macOS AirPlay port 5000 conflict)
- **Health Check**: `http://localhost:5001/api/health`

### 2. Frontend Client (`client/`)

```bash
cd client
npm install
npm run dev
```

- **URL**: `http://localhost:3000`
- Configured with TypeScript, Tailwind CSS, and Next.js App Router (`src/app`).
