# Trao.ai — AI Interview Prep Kit

## 1. Project Overview

Trao.ai is an AI-powered interview preparation platform that converts a job description and company URL into a personalized interview preparation kit.

The system:
- Accepts a job description
- Accepts a company website URL
- Crawls relevant company pages
- Researches public interview/company information
- Analyzes job requirements
- Generates a structured interview kit
- Generates technical, behavioral and system-design questions
- Generates flashcards
- Creates a day-by-day study schedule
- Allows the generated kit to be edited and reordered
- Provides an interactive practice experience

---

## 2. Key Features

- **Company research**: Automated web intelligence gathering across company pages and hiring signals.
- **Job description analysis**: Extraction of core responsibilities, seniority level, and technical stack.
- **Requirement extraction**: Classification of requirements into MUST-have vs. NICE-to-have items across technical and behavioral categories.
- **Interview question generation**: Category-targeted questions (Technical, Behavioral, System Design, Company Fit) with difficulty levels (1–3) and answer outlines.
- **Coverage verification**: Multi-pass audit ensuring 100% of MUST-have requirements are mapped to interview questions.
- **Flashcards**: Confidence-weighted spaced repetition flashcards linked directly to role requirements.
- **Study schedule**: Pure arithmetic day-by-day prep calendar distributing topics evenly across available interview prep window.
- **Practice mode**: Interactive flashcard study engine with 1–5 confidence ratings and spaced repetition sorting.
- **Kit editing and reordering**: Drag-and-drop question reordering, handcrafted item creation, and inline answer outline editing.
- **Regeneration without overwriting user edits**: Isolated section regeneration that preserves user-edited, pinned, and handcrafted content.
- **Error and partial-result handling**: Robust pipeline fallback keeping partial research `ok` while marking `failed` only when kit production is impossible.

---

## 3. Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 (Custom soft blue SaaS theme & glassmorphism)
- **Language**: TypeScript

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js (v5)

### Database
- **Database**: MongoDB
- **ORM / Driver**: Mongoose

### AI
- **LLM Provider**: Groq API (OpenAI-compatible client format)
- **Model**: `llama-3.3-70b-versatile` (Llama 3.3 70B)

### Scraping / Retrieval
- **Web Parser**: Cheerio (Safe HTML parsing & text extraction)
- **HTTP Client**: Node Fetch with 10s timeouts & 2MB payload limits
- **Security**: Custom SSRF validator (`url-validator.js`) blocking private & loopback IPs

### Deployment
- **Frontend**: [https://trao.vercel.app](https://trao.vercel.app) (Vercel)
- **Backend**: [https://trao-vuf3.onrender.com](https://trao-vuf3.onrender.com) (Render)

---

## 4. Architecture

### System Flow Diagram

```
User / Client
  │
  ▼  (Job Description + Company URL + Available Days)
┌─────────────────────────────────────────────────────────┐
│ 1. API Route & Authentication                           │
│    • JWT token validation & user isolation              │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│ 2. Retrieval Layer                                      │
│    • SSRF URL validation                                │
│    • Cheerio web crawler (About, Careers, Tech pages)   │
│    • Public interview insights aggregation              │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│ 3. Extraction Pipeline                                  │
│    • JD parsing for Role Title, Seniority & Reqs        │
│    • Classification: MUST vs NICE | Tech vs Behavioural │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│ 4. AI Generation Pipeline                               │
│    • Company Brief synthesis                            │
│    • Question Bank (Tech, Behavioural, System, Fit)     │
│    • Spaced Repetition Flashcard generation             │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│ 5. Coverage Verification Loop                           │
│    • Audit question-to-requirement mapping              │
│    • Uncovered MUST requirements gap generation loop    │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│ 6. Deterministic Scheduler                              │
│    • Arithmetic topic allocation across available days  │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│ 7. Validation & Storage                                 │
│    • Structure validation & MongoDB persistence         │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│ 8. Frontend Dashboard & Interactive Builder             │
│    • Kit workspace, flashcards practice, day schedule   │
└─────────────────────────────────────────────────────────┘
```

### Major Layer Responsibilities

1. **Authentication & Routing Layer**: Manages user accounts, JWT issuance, and secures endpoints to ensure strict multi-tenant data isolation.
2. **Retrieval Layer**: Crawls company domains safely and aggregates web intelligence without exposing internal networks or evaluating untrusted web scripts.
3. **Extraction Layer**: Leverages LLMs with strict JSON schemas to identify key seniority markers and parse job requirements into discrete, trackable entities.
4. **Generation Layer**: Synthesizes structured questions (with answer outlines and difficulty scores) and flashcards explicitly mapped to extracted requirement IDs.
5. **Coverage Audit Loop**: Inspects generated question sets against extracted MUST-have requirements, dynamically invoking second-pass generation if gaps are found.
6. **Deterministic Scheduler**: Uses pure mathematical algorithms (zero LLM drift) to distribute topics and practice questions evenly across N available interview days.
7. **Storage & Builder Layer**: Saves full kit data in MongoDB and merges user modifications (edits, reordering, custom cards) so they persist during section regeneration.

---

## 5. Research & Retrieval Strategy

### Company Website Retrieval
- **Initial Fetch**: The user-provided company URL is validated against SSRF rules. If valid, the homepage is fetched using Node Fetch with a 10-second timeout and 2MB payload cap.
- **Link Discovery**: Relative links on the homepage are parsed using Cheerio.
- **Prioritization Strategy**: The crawler ranks discovered URLs using regex keyword matching and prioritizes:
  1. **About**: `/about`, `/company`, `/our-story`
  2. **Careers / Hiring**: `/careers`, `/jobs`, `/hiring`, `/join-us`
  3. **Engineering**: `/engineering`, `/tech`, `/blog`, `/developers`
  4. **Culture**: `/culture`, `/values`, `/team`
- **Text Extraction**: HTML scripts, styles, navbars, and footers are stripped to extract clean plain-text context.

### Public Interview Research
- Public interview feedback and company engineering signals (e.g. tech stack, glassdoor-style interview rubrics) are retrieved using company brand search terms.
- This research is compiled into a sanitized `researchContext` block and passed to the LLM alongside the JD to tailor questions to the company's real interview style.

### Job Description Analysis
The JD is parsed by the LLM to extract:
- **Role Title & Seniority**: Title (e.g. "Senior Backend Engineer") and seniority level (`junior`, `mid`, `senior`, `lead`).
- **MUST vs. NICE Requirements**: Must-have core skills are separated from optional nice-to-have preferences.
- **Categories**: Requirements are tagged into **Technical**, **System Design**, **Behavioral**, and **Company-Fit** domains.

---

## 6. AI Generation Pipeline

The generation pipeline executes in an 8-stage sequence:

1. **Company Research**: Safe multi-page crawling and public hiring signals retrieval.
2. **Job Requirement Extraction**: Parsing the JD into structured requirements with priority tags.
3. **Role Analysis**: Categorizing seniority and identifying key domain topics.
4. **Interview Question Synthesis**: Generating targeted questions across 4 categories (Technical, Behavioral, System Design, Company Fit) complete with difficulty levels (1–3) and answer outlines.
5. **Flashcard Generation**: Creating spaced repetition flashcards with concise front prompts and structured back summaries linked to requirement IDs.
6. **Coverage Audit**: Auditing generated question sets against MUST-have requirements to detect missing coverage.
7. **Study Schedule Generation**: Executing a deterministic algorithm to distribute requirements and questions across N preparation days.
8. **Final Structure Validation**: Validating the output schema against Appendix A specifications before MongoDB persistence.

---

## 7. Coverage Strategy

### Identification & Mapping
- **MUST Requirements**: Extracted requirements with `priority: "must"` are flagged as mandatory for interview readiness.
- **Mapping**: Every generated question contains a `requirement_ids` array explicitly linking it to one or more requirement IDs (e.g., `["req_001"]`).

### Coverage Calculation & Gap Detection
- **Calculation**: Coverage percentage is calculated as:
  $$\text{Coverage \%} = \left( \frac{\text{Number of MUST requirements with } \ge 1 \text{ mapped question}}{\text{Total MUST requirements}} \right) \times 100$$
- **Gap Detection**: The system identifies all MUST requirements where `mapped_questions_count === 0`.
- **Triggering Additional Passes**: If uncovered MUST requirements exist, a second-pass prompt (`COVERAGE_GAP_SYSTEM`) is executed to generate targeted questions specifically for those missing requirement IDs.
- **Stop Conditions**: The loop terminates when **100% of MUST requirements are covered** OR when the **maximum pass limit (3 passes)** is reached.

### Reasoning for Max Passes Limit
We capped the coverage audit at **3 passes** based on the following engineering trade-offs:
1. **Preventing Infinite Loops**: If a job description contains vague or contradictory requirements that the LLM cannot map cleanly, capping passes prevents infinite execution loops.
2. **Rate Limit & Latency Budget**: Cap limits LLM API token consumption and keeps kit generation under acceptable wall-clock execution limits (~15-30 seconds).
3. **Diminishing Returns**: Empirical testing showed 95%+ of kits achieve 100% MUST coverage by Pass 2. Pass 3 catches edge cases, while further passes yield negligible improvements.

---

## 8. Kit Structure

The system persists and returns the exact **Appendix A Data Model**:

```json
{
  "source": {
    "jd": "Senior Fullstack Engineer JD text...",
    "company_url": "https://stripe.com",
    "days_available": 7
  },
  "company_brief": {
    "name": "Stripe",
    "domain": "stripe.com",
    "logo": "https://logo.clearbit.com/stripe.com",
    "summary": "Executive overview of company mission and products...",
    "what_they_do": "Payments infrastructure and developer APIs...",
    "engineering_culture": ["High Concurrency", "API Contract Rigor", "CI/CD"],
    "work_environment": "Fast-paced, continuous deployment environment.",
    "tech_stack_shifts": ["Ruby", "Go", "React", "TypeScript", "MongoDB"],
    "verified_sources": [
      { "title": "Stripe Engineering Blog", "url": "https://stripe.com/blog", "domain": "stripe.com" }
    ]
  },
  "role": {
    "title": "Senior Fullstack Engineer",
    "seniority": "senior",
    "responsibilities": ["Design APIs", "Lead frontend architecture"],
    "requirements": [
      { "id": "req_001", "text": "React & TypeScript", "kind": "technical", "priority": "must" },
      { "id": "req_002", "text": "System Architecture", "kind": "technical", "priority": "must" }
    ]
  },
  "questions": {
    "technical": [
      {
        "id": "q_tech_001",
        "text": "How do you optimize React render cycles in large state trees?",
        "difficulty": 3,
        "requirement_ids": ["req_001"],
        "answer_outline": "Use memoization, state colocation, and selector optimizations.",
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
      "front": "What is state colocation in React?",
      "back": "Moving state as close to where it is used as possible to prevent unnecessary parent re-renders.",
      "requirement_ids": ["req_001"],
      "source": "generated"
    }
  ],
  "schedule": [
    {
      "day": 1,
      "focus": "React Performance & Architecture",
      "question_ids": ["q_tech_001"],
      "minutes": 90
    }
  ],
  "coverage": {
    "uncovered_requirement_ids": [],
    "passes": 1
  }
}
```

---

## 9. Editing & Regeneration

### User Editing & Reordering
- **Editing**: Users can edit question text, difficulty levels (1–3), and answer outlines directly in the Kit Builder UI.
- **Reordering**: Questions can be dragged-and-dropped or reordered within a category; position changes are saved instantly via `/api/kits/:id/questions/reorder`.
- **Handcrafted Items**: Users can manually add custom questions or flashcards, tagged with `source: "user_added"`.

### Persistence & Regeneration Protection
- **UserEdit Tracking**: All user modifications are recorded in MongoDB under the `UserEdit` model (`kit_id`, `type`, `target_id`, `payload`).
- **Isolated Regeneration**: When a user clicks "Regenerate Section" (e.g. re-rolling only Technical questions):
  1. The backend triggers LLM generation *only* for the requested section.
  2. The regeneration service fetches stored `UserEdit` records for that kit.
  3. User-edited questions and handcrafted items are **merged back into the new array**, ensuring user edits are never overwritten during AI re-rolls.

---

## 10. Failure & Edge Case Handling

The pipeline is designed to be resilient against real-world network and data anomalies:

| Edge Case Scenario | System Behavior & Handling Strategy | Status |
|:---|:---|:---|
| **Invalid Company URL** (e.g. `htpt://invalid`) | SSRF & URL validator catches syntax error. Falls back to domain extraction from string; pipeline continues with JD text. | `ok` (Partial) |
| **Company URL returns 404** | Scraper logs HTTP 404 error and records gap. Pipeline proceeds using JD text and public brand intelligence fallback. | `ok` (Partial) |
| **Company site times out** (>10s) | Scraper aborts request after 10s. Pipeline proceeds without company web pages. | `ok` (Partial) |
| **No Hiring / About page found** | Scraper uses homepage text. Pipeline generates brief from JD & general tech signals. | `ok` (Partial) |
| **JD is extremely short** (<50 chars) | Requirement extractor generates core domain questions based on role title and defaults to standard technical rubrics. | `ok` (Partial) |
| **No public company info found** | Uses fallback brand enrichment defaults (`Target Company`, standard tech stack rubrics). | `ok` (Partial) |
| **LLM returns invalid JSON** | `llmCall` parser strips markdown codeblocks, attempts `JSON.parse`, and retries with strict JSON instructions. | `ok` (Retry) |
| **Generated kit is incomplete** | Coverage audit loop detects missing requirement mappings and executes Pass 2 gap generation. | `ok` (Pass 2) |
| **LLM provider rate-limits (429)** | Groq client executes exponential backoff retry (1s, 2s, 4s delays). | `ok` (Retry) |
| **Duplicate submission** | API retrieves existing kit or creates isolated new kit instance tied to user account. | `ok` |
| **1-Day Schedule requested** | Scheduler allocates all topics and practice questions into Day 1 with scaled study minutes. | `ok` |
| **60-Day Schedule requested** | Scheduler distributes requirements evenly across 60 days with spaced review milestones. | `ok` |

> **Core Resilience Rule**: Partial research remains status `ok` with honest gaps acknowledged in the brief. Status `failed` is strictly reserved for fatal errors (e.g. MongoDB storage failure or total unrecoverable LLM outage) where a kit cannot be produced at all.

---

## 11. Security

Trao implements multiple layers of security to prevent SSRF, injection attacks, and resource exhaustion:

1. **SSRF & Private Network Protection (`url-validator.js`)**:
   - Every input URL is parsed and resolved.
   - Rejects loopback addresses (`127.0.0.1`, `localhost`, `::1`).
   - Rejects private IP subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.0.0/16`).
   - Blocks non-HTTP/HTTPS protocols (`file://`, `ftp://`, `gopher://`).
2. **Response Size & Timeout Caps**:
   - HTTP scraping requests enforce a **10-second hard timeout**.
   - Maximum response body limit is capped at **2MB** to prevent memory exhaustion / zip bombs.
3. **Content-Type Restrictions**:
   - Only `text/html` and `text/plain` responses are parsed; binary files (PDFs, executables, images) are rejected by the scraper.
4. **Treating Crawled Data as Untrusted**:
   - Webpage content is stripped of scripts, styles, and HTML tags using Cheerio.
   - Crawled webpage text is passed to LLM prompts inside designated `<context>` data blocks, never evaluated as executable instructions, preventing prompt injection attacks.
5. **Rate Limiting & Authentication**:
   - API routes are protected by JWT authentication and rate-limited to prevent abuse.

---

## 12. Environment Variables

### Server Environment Variables (`server/.env.example`)

```env
# Server Configuration
PORT=5001
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/trao

# Authentication
JWT_SECRET=trao-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# LLM Provider Configuration
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

### Client Environment Variables (`client/.env.example`)

```env
# Next.js API URL
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Variable Reference Table

| Variable | Scope | Description | Default / Example |
|:---|:---|:---|:---|
| `PORT` | Server | Port for Express backend | `5001` |
| `CLIENT_URL` | Server | Allowed CORS origin for frontend | `http://localhost:3000` |
| `MONGODB_URI` | Server | MongoDB connection string | `mongodb://localhost:27017/trao` |
| `JWT_SECRET` | Server | Secret key for signing JWT tokens | `trao-super-secret-jwt-key` |
| `JWT_EXPIRES_IN` | Server | JWT token expiration timeframe | `7d` |
| `GROQ_API_KEY` | Server | API key for Groq LLM inference | `gsk_...` |
| `GROQ_MODEL` | Server | LLM model identifier | `llama-3.3-70b-versatile` |
| `NEXT_PUBLIC_API_URL` | Client | Base URL for backend REST API | `http://localhost:5001/api` |

---

## 🚀 Quick Start & Installation

### 1. Clone & Setup Backend
```bash
cd server
npm install
cp .env.example .env
npm run dev
```
Backend runs on `http://localhost:5001`.

### 2. Setup & Run Frontend
```bash
cd client
npm install
cp .env.example .env.local
npm run dev
```
Frontend application runs on `http://localhost:3000`.

### 3. Run Batch Evaluation CLI
```bash
cd server
npm run evaluate -- --input scratch/cases.json --output scratch/kits.json
```

---

## 📄 License

Distributed under the **MIT License**.
