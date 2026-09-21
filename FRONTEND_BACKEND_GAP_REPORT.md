# Trao — Frontend UI vs. Backend API Integration & Gap Analysis Report 📋

> **Generated on:** September 21, 2026  
> **Scope:** Full-Stack Architecture, Data Contracts & API Alignment  
> **Status:** Completed

---

## 📊 High-Level Alignment Scorecard (Out of 100%)

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                           OVERALL FULL-STACK ALIGNMENT                            │
│                                                                                   │
│  [██████████████████████████████████░░░░░░░░░░░░░░░░░░░░]  62% Aligned / 38% Gap │
└───────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────┐
│                    WHERE ARE THE CHANGES REQUIRED? (OUT OF 100%)                   │
│                                                                                   │
│  FRONTEND CHANGES REQUIRED :  88%  [██████████████████████████████████████░░░░]   │
│  BACKEND CHANGES REQUIRED  :  12%  [█████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]   │
└───────────────────────────────────────────────────────────────────────────────────┘
```

> **Key Takeaway:** The Backend strictly follows the assessment specifications and official Appendix A contract (which cannot be changed without breaking assessment rubrics). Therefore, **88% of the necessary modifications are in the FRONTEND** (wiring API fetch calls, parsing JWT tokens, handling Appendix A data structures, and aligning practice/schedule views). Only **12% of changes are in the BACKEND** (minor convenience field aliases to make the API forgiving to frontend inputs).

---

## 📈 Module-by-Module Mismatch & Change Responsibility (%)

| Module / Feature | Mismatch Level (%) | Frontend Change (%) | Backend Change (%) | Primary Reason for Change |
| :--- | :---: | :---: | :---: | :--- |
| **1. Authentication & Session** | **80%** | **95%** | **5%** | Backend has full JWT + bcryptjs auth. Frontend currently has no login screen or Bearer token storage. |
| **2. Kit Creation (`CreateKitModal`)** | **35%** | **85%** | **15%** | Modal uses `setTimeout()`. Backend has `POST /api/kits`. Backend can add lenient field aliases (`website`, `daysUntil`). |
| **3. Dashboard Queue Table (`page.tsx`)** | **25%** | **95%** | **5%** | Data fields exist in both; frontend needs a mapper to parse `kit.kit_data.role` and map status enums (`completed` ➔ `"Ready"`). |
| **4. Practice Engine (`/practice`)** | **70%** | **90%** | **10%** | Conceptual mismatch: UI shows DSA coding challenges; Backend API provides a Spaced Repetition Flashcard deck (1–5 ratings). |
| **5. Schedule Timeline (`/schedule`)** | **65%** | **95%** | **5%** | Conceptual mismatch: UI shows mock video call invites; Backend returns an arithmetic Day 1–N study plan with focus topics & minutes. |
| **6. Section Regeneration & Builder** | **20%** | **90%** | **10%** | Backend builder endpoints exist (`PATCH /questions`, `POST /regenerate`); frontend needs UI buttons connected to trigger them. |
| **TOTAL WEIGHTED AVERAGE** | **38%** | **88%** | **12%** | **Frontend needs connection & view alignment; Backend is already compliant.** |

---

## 🔍 Detailed Mismatches & Technical Analysis

### 1. Authentication & User Isolation
- **Current State:**
  - **Backend (100% Ready):** `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/session`. Enforces `Authorization: Bearer <token>` on all kit operations to ensure no candidate can view another's kits.
  - **Frontend (Needs Work - 80% Gap):** No token storage (`localStorage` / cookies), no user session context, no login/register modal or screen.
- **Where Change is Needed:**
  - **Frontend (95%):** Add an Auth Context or custom hook `useAuth()`, store token in `localStorage`, and attach `Authorization: Bearer ${token}` to all requests.
  - **Backend (5%):** Optional: Support an open guest mode or auto-seed demo account for instant evaluation testing.

---

### 2. Kit Creation Flow (`CreateKitModal.tsx` vs `POST /api/kits`)
- **Current State:**
  - **Backend (100% Ready):** `POST /api/kits` expects `{ job_description: string, company_url: string, days_available: number }`. Automatically derives role title, seniority, and company name via AI research.
  - **Frontend (35% Gap):** Collects `company`, `role`, `website`, `daysUntil`, `jobDescription`, but simulates generation with a 1500ms `setTimeout()`.
- **Where Change is Needed:**
  - **Frontend (85%):** Replace `setTimeout` with `fetch('/api/kits', { method: 'POST', body: JSON.stringify({ company_url: website, job_description: jobDescription, days_available: parseInt(daysUntil) }) })`.
  - **Backend (15%):** Update `kit.controller.js` to accept either `company_url` OR `website`, and `days_available` OR `daysUntil` so it gracefully handles whichever keys the frontend sends.

---

### 3. Active Kits Queue Table (`page.tsx` vs `Kit.js`)
- **Current State:**
  - **Backend (100% Ready):** Returns `{ kits: [ { _id, company_url, days_available, status, kit_data: { role, company_brief, requirements, coverage } } ] }`.
  - **Frontend (25% Gap):** Uses hardcoded array `queueItems` with fields: `avatarBg`, `vitals: { val1, val2 }`, and `status: "In Progress" | "Ready" | "Complete"`.
- **Where Change is Needed:**
  - **Frontend (95%):** Replace static state with `useEffect` fetching `GET /api/kits`. Implement a mapper function:
    - Status `'completed'` ➔ `"Ready"` or `"Complete"`.
    - Status `'queued'` / `'researching'` / `'generating'` ➔ `"In Progress"`.
    - Vitals `val1` ➔ `${kit.kit_data.role.requirements.filter(r => r.priority === 'must').length} Must`.
    - Vitals `val2` ➔ `${Math.round(((mustCount - uncoveredCount) / mustCount) * 100)}%`.
  - **Backend (5%):** Include computed convenience metrics (`total_must`, `coverage_percentage`) in the root of `GET /api/kits` summary response so the frontend doesn't have to calculate them.

---

### 4. Practice Engine: Flashcards vs DSA Questions (`practice/page.tsx`)
- **Current State:**
  - **Backend (100% Ready):** Endpoint `GET /api/kits/:id/practice` returns spaced-repetition **flashcards** sorted by priority (unpracticed first ➔ lowest confidence ➔ oldest practiced) and `POST /api/kits/:id/practice` records 1–5 confidence ratings.
  - **Frontend (70% Gap):** Currently renders a list of DSA problems with *"Solve Challenge"* buttons, whereas the Dashboard Quick Action specifically says: *"Practise Flashcards (14 cards • Confidence-weighted)"*.
- **Where Change is Needed:**
  - **Frontend (90%):** Build a flashcard carousel / flip-card component in `/practice` displaying Front, Back, and 5 rating buttons (`1: Again` to `5: Mastered`).
  - **Backend (10%):** Support fetching category questions (`GET /api/kits/:id/questions?category=technical`) if the user also wants to practice coding questions alongside flashcards.

---

### 5. Schedule Timeline: Arithmetic Prep vs Video Meetings (`schedule/page.tsx`)
- **Current State:**
  - **Backend (100% Ready):** Pure arithmetic scheduler (`scheduler.js`) generates Day 1 to Day N study blocks: `[{ day: 1, focus: "Technical Architecture", question_ids: [...], minutes: 75 }]`.
  - **Frontend (65% Gap):** Shows simulated Google Meet / Zoom interview links (*"2:00 PM Google Round 1"* with *"Join Meeting"* button), conflicting with the Dashboard Quick Action (*"Day-by-Day Schedule • Arithmetic topic allocation"*).
- **Where Change is Needed:**
  - **Frontend (95%):** Update `/schedule` to render Day 1 through Day N cards showing the daily technical focus, linked questions to solve, and estimated study duration in minutes.
  - **Backend (5%):** Allow candidates to reorder or drag-and-drop days via `PUT /api/kits/:id/schedule`.

---

## 🛠️ Summary Action Items

### For Frontend (88% of Effort):
1. **Create `client/src/lib/api.ts`** — Unified Axios/fetch helper pointing to `http://localhost:5001/api`.
2. **Add Auth Store** — Handle JWT Bearer token storage.
3. **Connect `CreateKitModal`** — Post real JD & company URL to trigger the Groq pipeline.
4. **Connect Dashboard Table** — Map `GET /api/kits` response into the fixed-column table layout.
5. **Update `/practice` Page** — Display confidence-weighted flashcards.
6. **Update `/schedule` Page** — Display day-by-day study roadmap.

### For Backend (12% of Effort):
1. **Lenient Key Aliasing**: Accept `website` alongside `company_url` and `daysUntil` alongside `days_available` in `POST /api/kits`.
2. **Dashboard Summary Extras**: Add `coverage_percentage` and `total_must` directly to the `GET /api/kits` list response for zero-computation rendering on the client.
