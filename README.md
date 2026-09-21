# Trao — The AI Interview Prep Kit 🎯

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-5.0-green?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Groq](https://img.shields.io/badge/Groq-Llama%203.3%2070B-orange?style=flat-square)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

> **Turn job descriptions and company websites into structured, gap-free interview preparation kits with automated AI research, coverage audits, spaced repetition flashcards, and deterministic daily scheduling.**

---

## 📌 What is Trao?

**Trao** is an intelligent, full-stack Interview Preparation platform for software engineers and technical candidates. Instead of generic question banks or one-size-fits-all roadmaps, Trao takes actual **Job Descriptions (JDs)** and **Company URLs** to generate **tailored, company-specific Interview Kits**.

Trao continuously audits your preparation progress against the role's **Must-Have** and **Nice-to-Have** requirements, automatically identifying **Coverage Gaps** and generating second-pass targeted practice questions until all requirements are covered.

---

## 🔄 Core End-to-End System Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            USER / CLI INPUT                                 │
│          • Job Description  • Company URL  • Days Until Interview           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            1. AUTHENTICATION                                │
│       JWT & bcryptjs • Strict User Isolation (Users only see own kits)      │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          2. RESEARCH PIPELINE                               │
│       • Safe Crawler (Cheerio) extracts About, Careers, Team & Tech pages   │
│       • Security: SSRF validation blocks private/loopback IP ranges         │
│       • Interview Research: Public hiring rubrics & interview insights      │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         3. EXTRACTION PIPELINE                              │
│       • Groq LLM (Llama 3.3 70B) parses JD with zero hallucination          │
│       • Extracts: Role Title, Seniority, Responsibilities                   │
│       • Classifies Requirements: Must vs. Nice | Technical / Behavioural    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         4. GENERATION PIPELINE                              │
│       • Company Brief: Verified summary & what they do                      │
│       • Question Bank (4 categories): Technical, Behavioural,               │
│         System Design, and Company-Fit (difficulty 1-3 + answer outlines)   │
│       • Spaced Repetition Flashcards (Front / Back / Linked Requirements)   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       5. COVERAGE AUDIT LOOP                                │
│       • Verifies: Does every "MUST" requirement have linked questions?      │
│       • Gap Detection: Automatically generates targeted questions for gaps  │
│       • Repeats passes until 100% of MUST requirements are covered          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     6. DETERMINISTIC SCHEDULER                              │
│       • Pure arithmetic application logic (NO LLM hallucination)            │
│       • Mathematical distribution across exact N available days             │
│       • Prioritizes harder & MUST concepts earlier in the timeline          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    7. BUILDER, PRACTICE & REGEN                             │
│       • Interactive Builder: Edit, add, delete, reorder questions & cards   │
│       • Isolated Regeneration: Regenerate single section without wiping     │
│         user-customized content                                             │
│       • Practice Engine: 1–5 confidence ratings + spaced repetition order   │
│       • Batch CLI: npm run evaluate for automated evaluation batches        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

### 1. 🗂️ Active Interview Kits Queue
- Central dashboard tracking customized kits for target companies.
- Real-time visibility into **Company & Role**, **Timeline countdowns**, **Focus pillars**, **Mathematical requirement coverage (REQ vs. COV)**, and **Pipeline Status** (`Queued`, `Researching`, `Completed`).

### 2. 🤖 Automated AI Research & Coverage Engine
- Crawls official engineering handbooks, blogs, and public hiring rubrics.
- Audits generated question sets against the company's tech stack.
- Performs a **Multi-Pass Coverage Check**: when gaps are detected, automatically generates targeted questions for unaddressed requirements.

### 3. 🃏 Spaced Repetition Flashcards
- Confidence-weighted flashcard review engine (ratings 1 to 5).
- Automatically prioritizes cards: **Never practiced → Lowest confidence → Oldest practice**.
- Tracks mastery statistics (`mastered`, `remaining`, `average confidence`).

### 4. 📅 Pure Arithmetic Daily Schedule
- Divides available preparation days mathematically across required topics.
- Distributes System Design, Coding, and Behavioural rounds evenly leading up to the interview date.

### 5. ✏️ Interactive Kit Builder & Isolated Regeneration
- Candidates can edit questions, adjust difficulty levels, reorder priorities, move questions between categories, and customize flashcards.
- **Section Regeneration**: Candidate can re-roll only the *Technical* or *Behavioural* questions without losing custom edits made elsewhere.

### 6. ⚡ Batch Evaluation CLI (`npm run evaluate`)
- The **exact same pipeline** powering the web app can run headless batch evaluations.
- Takes `cases.json` and outputs `kits.json` following the official evaluation contract (Appendix B).

---

## 🏗️ Architecture & Project Structure

The project follows a clean **MVC + Pipeline Service** architecture:

```bash
Trao/
├── client/                             # Next.js 16 Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx              # Ambient gradient & frosted glass shell
│   │   │   ├── page.tsx                # Central Dashboard (Queue, KPIs, Analytics)
│   │   │   ├── kits/                   # Kit management & view
│   │   │   ├── practice/               # Flashcards & practice engine
│   │   │   └── schedule/               # Day-by-day calendar
│   │   └── components/
│   │       ├── Header.tsx              # Clean search, notifications, & user pill
│   │       └── Sidebar.tsx             # Responsive vertical rail & mobile drawer
│   └── STYLE_GUIDE.md                  # Design system tokens & aesthetics
│
├── server/                             # Express + MongoDB + Groq Backend
│   ├── src/
│   │   ├── index.js                    # Express app bootstrap & MongoDB connection
│   │   ├── config/
│   │   │   └── env.js                  # Centralized environment configuration
│   │   ├── controllers/                # 📂 Request Handlers (MVC)
│   │   │   ├── auth.controller.js      # Register, login, session, logout
│   │   │   ├── kit.controller.js       # Kit CRUD & generation initiation
│   │   │   ├── generation.controller.js# Status polling & section regeneration
│   │   │   ├── builder.controller.js   # Content customization & editing
│   │   │   ├── practice.controller.js  # Flashcard deck & confidence ratings
│   │   │   └── schedule.controller.js  # Schedule retrieval & customization
│   │   ├── routes/                     # 📂 Clean Route Declarations
│   │   │   ├── auth.routes.js          # /api/auth/*
│   │   │   ├── kits.routes.js          # /api/kits/*
│   │   │   ├── generation.routes.js    # /api/kits/:id/status, /regenerate
│   │   │   ├── builder.routes.js       # /api/kits/:id/questions, /flashcards
│   │   │   ├── practice.routes.js      # /api/kits/:id/practice
│   │   │   └── schedule.routes.js      # /api/kits/:id/schedule
│   │   ├── services/                   # 📂 Business Logic & Pipeline
│   │   │   ├── auth.service.js         # JWT & password hashing logic
│   │   │   ├── practice.service.js     # Spaced repetition sorting & stats
│   │   │   ├── regeneration.service.js # Isolated section regeneration
│   │   │   └── pipeline/               # Core AI Preparation Engine
│   │   │       ├── orchestrator.js     # Multi-stage coordinator (API & CLI)
│   │   │       ├── retrieval.js        # Web scraping & interview research
│   │   │       ├── extraction.js       # JD requirements extraction (LLM)
│   │   │       ├── generation.js       # Questions & flashcards generation
│   │   │       ├── coverage.js         # MUST requirement coverage audit
│   │   │       └── scheduler.js        # Arithmetic day distribution
│   │   ├── models/                     # 📂 Mongoose Schemas
│   │   │   ├── User.js                 # User credentials & profile
│   │   │   ├── Kit.js                  # Complete Appendix A Kit storage
│   │   │   ├── UserEdit.js             # Tracks user changes to survive regen
│   │   │   └── PracticeSession.js      # Flashcard confidence ratings
│   │   ├── llm/                        # 📂 Groq Client & Prompts
│   │   │   ├── client.js               # Groq SDK with retry, backoff & test fallback
│   │   │   └── prompts.js              # Strict structured JSON prompts
│   │   ├── utils/                      # 📂 Security & Utility Helpers
│   │   │   ├── scraper.js              # Safe Cheerio HTML scraper
│   │   │   ├── url-validator.js        # SSRF protection (blocks private IPs)
│   │   │   └── id.js                   # Stable ID generator (req_*, q_*, fc_*)
│   │   └── cli/
│   │       └── evaluate.js             # Batch evaluation CLI entry point
│   ├── .env.example
│   └── package.json
│
└── README.md                           # Project documentation
```

---

## 🔌 API Endpoints Reference

All endpoints (except register & login) require Bearer Authentication via `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
|:---|:---|:---|
| **POST** | `/api/auth/register` | Register new user (name, email, password) |
| **POST** | `/api/auth/login` | Login user & receive JWT token |
| **GET** | `/api/auth/session` | Get current authenticated user profile |
| **POST** | `/api/auth/logout` | Client token invalidation |
| **POST** | `/api/kits` | Create kit & launch background AI pipeline |
| **GET** | `/api/kits` | List all kits belonging to current user |
| **GET** | `/api/kits/:id` | Get full kit with Appendix A data |
| **PUT** | `/api/kits/:id` | Update kit metadata |
| **DELETE** | `/api/kits/:id` | Delete kit |
| **GET** | `/api/kits/:id/status` | Poll pipeline status (`researching`, `completed`, etc.) |
| **POST** | `/api/kits/:id/generate` | Manually restart full pipeline |
| **POST** | `/api/kits/:id/regenerate` | Regenerate isolated section (`technical`, `schedule`, etc.) |
| **PATCH** | `/api/kits/:id/questions/:qid` | Edit question text, answer outline, or difficulty |
| **POST** | `/api/kits/:id/questions` | Add custom user question |
| **DELETE** | `/api/kits/:id/questions/:qid` | Delete question |
| **PUT** | `/api/kits/:id/questions/reorder` | Reorder questions in category |
| **PATCH** | `/api/kits/:id/questions/:qid/move` | Move question to different category |
| **PATCH** | `/api/kits/:id/flashcards/:fid` | Edit flashcard front/back |
| **POST** | `/api/kits/:id/flashcards` | Add custom flashcard |
| **DELETE** | `/api/kits/:id/flashcards/:fid` | Delete flashcard |
| **PATCH** | `/api/kits/:id/company-brief` | Edit company summary & what they do |
| **GET** | `/api/kits/:id/practice` | Get flashcards prioritized by spaced repetition |
| **POST** | `/api/kits/:id/practice` | Record confidence rating (1–5) |
| **GET** | `/api/kits/:id/practice/progress`| Get practice mastery statistics |
| **GET** | `/api/kits/:id/schedule` | Get day-by-day interview preparation calendar |
| **PUT** | `/api/kits/:id/schedule` | Update customized schedule |

---

## 📊 Data Contract Specifications

### Appendix A — Full Kit Structure (`kit_data`)
```json
{
  "source": {
    "jd": "Senior Engineer JD text...",
    "company_url": "https://stripe.com",
    "days_available": 5
  },
  "company_brief": {
    "summary": "Stripe is a financial infrastructure platform for businesses.",
    "what_they_do": "Payments processing, billing, banking-as-a-service.",
    "sources": ["https://stripe.com/about", "https://stripe.com/jobs"]
  },
  "role": {
    "title": "Senior Distributed Systems Engineer",
    "seniority": "senior",
    "responsibilities": ["Design distributed consensus systems", "Lead architecture"],
    "requirements": [
      { "id": "req_001", "text": "Go / Node.js distributed systems", "kind": "technical", "priority": "must" },
      { "id": "req_002", "text": "Mentoring junior engineers", "kind": "behavioural", "priority": "nice" }
    ]
  },
  "questions": {
    "technical": [
      {
        "id": "q_tech_001",
        "text": "How do you handle split-brain in distributed leader election?",
        "difficulty": 3,
        "requirement_ids": ["req_001"],
        "answer_outline": "Quorum intersection, Raft term fencing, Paxos lease timeouts.",
        "source": "generated"
      }
    ],
    "behavioural": [],
    "system_design": [],
    "company_fit": []
  },
  "flashcards": [
    {
      "id": "fc_001",
      "front": "What is the CAP theorem?",
      "back": "A distributed system can only provide two of Consistency, Availability, and Partition Tolerance.",
      "requirement_ids": ["req_001"],
      "source": "generated"
    }
  ],
  "schedule": [
    {
      "day": 1,
      "focus": "Distributed Systems & Architecture",
      "question_ids": ["q_tech_001"],
      "minutes": 60
    }
  ],
  "coverage": {
    "uncovered_requirement_ids": [],
    "passes": 2
  }
}
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18+ (tested on Node v22)
- **MongoDB**: Local instance running on port 27017 (or MongoDB Atlas URI)
- **Groq API Key**: (Optional for testing — includes built-in mock fallback)

---

### 1. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

Edit `.env` if desired:
```env
PORT=5001
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/trao
JWT_SECRET=trao-super-secret-jwt-key
GROQ_API_KEY=your-groq-api-key-here
GROQ_MODEL=llama-3.3-70b-versatile
```

Start backend:
```bash
npm run dev
```
- Backend runs on `http://localhost:5001`
- Health check: `http://localhost:5001/api/health`

---

### 2. Run Headless Batch Evaluation CLI

You can evaluate any batch of test cases without starting the frontend:

```bash
cd server
npm run evaluate -- --input scratch/cases.json --output scratch/kits.json
```

---

### 3. Frontend Client Setup

```bash
cd client

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

- Application runs on `http://localhost:3000`
- Connects automatically to the backend at `http://localhost:5001`

---

## 🔒 Security & Robustness Measures

1. **SSRF Protection (`url-validator.js`)**: Validates every company URL. Rejects loopback (`127.0.0.1`, `localhost`) and private subnet IP ranges (`10.x`, `172.16-31.x`, `192.168.x`).
2. **Safe Web Scraper (`scraper.js`)**: Limits response payloads to 2MB, enforces 10s timeouts, and strips scripts/styles to treat crawled web data strictly as plain text, never instructions.
3. **Resilient Rate Limiting**: Exponential backoff retry logic in `llm/client.js` for handling Groq 429 rate limit responses gracefully.
4. **Isolated Multi-Tenant Security**: Every kit, practice session, and edit is scoped strictly to `req.user.id`.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

Built with ❤️ for engineers preparing for their dream roles with **Trao**.
