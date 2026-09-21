# Trao — The AI Interview Prep Kit 🎯

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-green?style=flat-square&logo=express)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> **Turn job descriptions into structured, gap-free interview preparation plans with automated AI research, coverage audits, and spaced repetition.**

---

## 📌 What is Trao?

**Trao** is an intelligent, full-stack Interview Preparation platform built for software engineers, product specialists, and technical candidates. Instead of generic question banks or one-size-fits-all roadmaps, Trao takes actual job descriptions and company hiring handbooks to generate **tailored, company-specific Interview Kits**.

Trao continuously audits your preparation progress against the role's **Must-Have** and **Nice-to-Have** requirements, automatically identifying **Coverage Gaps** and generating second-pass targeted practice questions.

---

## ✨ Key Features

### 1. 🗂️ Active Interview Kits Queue
- Central dashboard tracking customized kits for top companies (Google, OpenAI, Stripe, etc.).
- Real-time visibility into:
  - **Company & Role**: Specific team and seniority levels.
  - **Timeline**: Target interview dates with day countdowns.
  - **Focus & Requirements**: Key technical pillars (e.g., *Frontend Architecture*, *Distributed Systems*, *API Design*).
  - **Requirement Coverage (COV & REQ)**: Mathematical metric comparing covered topics against all JD specifications.
  - **Pipeline Status**: Instant indicator of kit readiness (`Ready`, `In Progress`, `Review Required`).

### 2. 🤖 AI Research & Coverage Engine
- Crawls official engineering handbooks, engineering blogs, and public hiring rubrics.
- Audits generated question sets against the company's tech stack.
- Performs a **Second Pass Crawl** when coverage gaps are detected, automatically generating targeted questions for unaddressed requirements.
- Floating capsule banner with instant **"Review AI Insights ↗"** pipeline action.

### 3. 🃏 Spaced Repetition Flashcards
- Confidence-weighted flashcard review engine.
- Tracks mastered versus pending cards (`6 mastered • 14 remaining`).
- Focuses revision on weak concepts right before technical rounds.

### 4. 📅 Arithmetic Topic Allocation & Daily Schedule
- Divides available preparation days mathematically across required topics.
- Distributes System Design, Coding, and Behavioural rounds evenly leading up to the interview date.

### 5. 📊 Requirement Coverage Analytics
- Interactive Donut Chart breaking down question allocation:
  - **Technical Architecture & Coding** (82%)
  - **Behavioural & Leadership Principles** (13%)
  - **Company-Fit & Product Sense** (5%)
- Tracks total questions practiced with daily activity streak bars.

### 6. 🎨 "Connected Blue Canvas" Design System
- **Single-Glance Desktop Dashboard**: Zero scrolling needed to view all KPIs, tables, AI summaries, and analytics.
- **Physical White Tab Connection**: Active navigation items feature precision SVG inverted corner notches (`d="M20 0 L20 20 L0 20 Q20 20 20 0 Z"`) that seamlessly merge the sidebar into the page canvas.
- **Luminous Glassmorphism**: Heavy acrylic frosted glass (`backdrop-blur-3xl`, `bg-white/70`) over ambient sky-to-royal gradients.
- **Refined KPI Typography**: Balanced `font-bold` numbers and `font-semibold` category badges.

---

## 🏗️ Architecture & Tech Stack

```
Trao Platform
├── Frontend Client (client/)
│   ├── Next.js 16 (App Router with Turbopack)
│   ├── React 19 & TypeScript
│   ├── Tailwind CSS & Vanilla CSS Design Tokens
│   ├── Lucide React (Iconography)
│   └── Acrylic Frosted Glassmorphic Shell
│
└── Backend API (server/)
    ├── Node.js & Express.js (ES Modules)
    ├── CORS & Secure Environment Configuration
    ├── REST Endpoints & Health Check System
    └── Ready for Database / AI LLM Pipeline Integration
```

---

## 📁 Project Structure

```bash
Trao/
├── client/                     # Next.js 16 Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx      # Root layout with luminous gradient & frosted main canvas
│   │   │   ├── globals.css     # Global styles & ambient lighting keyframes
│   │   │   ├── page.tsx        # Dashboard page (KPIs, Queue, AI Banner, Donut Chart)
│   │   │   ├── kits/           # Interview Kits management route
│   │   │   ├── practice/       # Flashcards & practice engine route
│   │   │   ├── schedule/       # Day-by-day prep calendar route
│   │   │   ├── resources/      # Company hiring handbooks & guides
│   │   │   ├── analytics/      # Detailed progress & coverage metrics
│   │   │   ├── profile/        # Candidate profile & target roles
│   │   │   └── settings/       # Platform preferences & AI API keys
│   │   └── components/
│   │       ├── Header.tsx      # Global search, notifications, & user pill
│   │       └── Sidebar.tsx     # Vertical navigation rail with connected white tab
│   ├── STYLE_GUIDE.md          # Official design system & tokens specification
│   ├── package.json
│   └── tsconfig.json
│
├── server/                     # Express.js Backend Server
│   ├── src/
│   │   └── index.js            # Express application, CORS config & health endpoints
│   ├── .env                    # Server environment variables (PORT 5001)
│   ├── .env.example
│   └── package.json
│
├── doc/
│   └── software-engineer-assignment.pdf  # Project specifications & rubric
│
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher

---

### 1. Backend Server Setup

The backend runs on port `5001` to prevent conflicts with macOS AirPlay (port 5000).

```bash
# Navigate to backend directory
cd server

# Install dependencies
npm install

# Start the server in development mode
npm run dev
```

- **Server URL**: `http://localhost:5001`
- **Health Check**: `http://localhost:5001/api/health`

```json
{
  "status": "ok",
  "uptime": 124.5,
  "timestamp": "2026-09-21T16:30:00.000Z"
}
```

---

### 2. Frontend Client Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server with Turbopack
npm run dev
```

- **Application URL**: `http://localhost:3000`
- The client connects to `http://localhost:5001` for backend services.

---

### 3. Production Build

To verify and produce an optimized production bundle:

```bash
cd client
npm run build
```

---

## 🎨 Design Tokens & UI Guidelines

| Token | Hex / Value | Purpose |
| :--- | :--- | :--- |
| **Outer Background** | Gradient `#4f8ffb` → `#256eed` | Luminous sky-to-royal ambient backdrop |
| **Main Canvas** | `rgba(255, 255, 255, 0.70)` | Acrylic sheet with `backdrop-blur-3xl` |
| **Active Tab** | `#FFFFFF` | Physically connected tab merging into canvas |
| **Widget Surface** | `#dce9fd` | Soft Periwinkle Blue on secondary cards |
| **AI Pill Gradient** | `#3575f6` → `#5d98fa` → `#9bc4fc` | Luminous blue horizontal gradient |
| **AI Button** | `#1849be` | Dark royal blue pill action button |
| **Sparkle & Tag** | `#facc15` / `#eefc57` | Golden yellow AI highlights |

For complete design guidelines, typography scales, and component rules, refer to [client/STYLE_GUIDE.md](client/STYLE_GUIDE.md).

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

Built with ❤️ for engineers preparing for their dream roles with **Trao**.
