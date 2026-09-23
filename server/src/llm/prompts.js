// ─── Prompt Templates for all LLM calls ───

export const EXTRACTION_SYSTEM = `You are an expert job description analyst. Extract structured information from the job description provided. Be precise — do NOT invent requirements not present in the JD. If the JD is extremely short or vague, extract only what is clearly stated. Return JSON only.`;

export function extractionPrompt(jd) {
  return `Analyze this job description and extract ALL requirements.

JOB DESCRIPTION:
${jd}

Return a JSON object with this EXACT structure:
{
  "role_title": "exact title from JD",
  "seniority": "junior|mid|senior|staff|principal|unknown",
  "responsibilities": ["responsibility 1", "responsibility 2", ...],
  "requirements": [
    {
      "text": "exact requirement text",
      "kind": "technical|behavioural|domain",
      "priority": "must|nice"
    }
  ]
}

Rules:
- "must" = explicitly required (e.g., "required", "must have", "X+ years")
- "nice" = preferred/bonus (e.g., "nice to have", "preferred", "bonus")
- If unclear, default to "must"
- kind: "technical" for skills/tools, "behavioural" for soft skills/leadership, "domain" for industry/domain knowledge
- Do NOT invent requirements not in the JD
- If the JD is very short, return fewer requirements honestly`;
}

export const COMPANY_BRIEF_SYSTEM = `You are a senior tech research analyst. Summarize company engineering culture, products, work environment, tech stack trends, and source citations based ONLY on provided research context. Be precise and factual. Return JSON only.`;

export function companyBriefPrompt(companyData, sources) {
  return `Based on the following research data, generate a comprehensive company intelligence brief.

RESEARCH DATA:
${companyData}

OFFICIAL & VERIFIED SOURCES:
${Array.isArray(sources) ? sources.join('\n') : sources}

Return JSON with this EXACT structure:
{
  "summary": "2-3 sentence overview of the company, mission, and tech reputation",
  "what_they_do": "Clear description of core products, services, and target market",
  "engineering_culture": ["Key value 1 (e.g. High Concurrency Focus)", "Key value 2 (e.g. API First Standards)", "Key value 3"],
  "work_environment": "Detailed overview of team structure, work style, speed, and candidate expectations",
  "tech_stack_shifts": ["Recent tech update 1", "Recent tech update 2"],
  "sources": ["url1", "url2"]
}`;
}

export const QUESTION_GEN_SYSTEM = `You are an expert interview preparation coach. Generate interview questions based on the job requirements and company research. Each question must be directly linked to specific requirements. Return JSON only.`;

export function questionGenPrompt(jd, requirements, companyBrief, interviewInsights, category) {
  const categoryGuide = {
    technical: 'Focus on coding, architecture, tools, and technical problem-solving.',
    behavioural: 'Focus on leadership, teamwork, conflict resolution, and past experiences.',
    system_design: 'Focus on designing scalable systems, trade-offs, and architecture decisions.',
    company_fit: 'Focus on company values, product understanding, and cultural alignment.',
  };

  return `Generate 8-12 ${category} interview questions for this role.

JOB DESCRIPTION:
${jd}

REQUIREMENTS (use these IDs to link questions):
${JSON.stringify(requirements, null, 2)}

COMPANY CONTEXT:
${companyBrief}

INTERVIEW INSIGHTS:
${interviewInsights || 'No public interview data found.'}

CATEGORY GUIDANCE: ${categoryGuide[category] || ''}

Return JSON:
{
  "questions": [
    {
      "text": "question text",
      "difficulty": 1,
      "requirement_ids": ["req_001"],
      "answer_outline": "key points to cover in answer"
    }
  ]
}

Rules:
- difficulty: 1 (easy), 2 (medium), 3 (hard)
- Each question MUST link to at least one requirement ID from the list above
- answer_outline: 2-4 bullet points, not a full answer
- Be specific to the company and role, not generic`;
}

export const FLASHCARD_SYSTEM = `You are an interview preparation expert. Generate concise flashcards for spaced repetition study. Each flashcard covers one key concept from the requirements. Return JSON only.`;

export function flashcardPrompt(requirements, companyBrief) {
  return `Generate 15-25 flashcards covering these interview requirements.

REQUIREMENTS:
${JSON.stringify(requirements, null, 2)}

COMPANY CONTEXT:
${companyBrief}

Return JSON:
{
  "flashcards": [
    {
      "front": "question or concept prompt",
      "back": "concise answer or key points",
      "requirement_ids": ["req_001"]
    }
  ]
}

Rules:
- front: clear, specific question or concept
- back: concise answer (2-5 sentences or bullet points)
- Each card linked to at least one requirement
- Cover MUST requirements first, then NICE requirements`;
}

export const COVERAGE_GAP_SYSTEM = `You are an interview question generator. Generate additional questions ONLY for the specific uncovered requirements listed. Return JSON only.`;

export function coverageGapPrompt(uncoveredReqs, category) {
  return `Generate 2-3 interview questions for EACH of these uncovered requirements.

UNCOVERED REQUIREMENTS:
${JSON.stringify(uncoveredReqs, null, 2)}

Generate ${category} questions that directly address these gaps.

Return JSON:
{
  "questions": [
    {
      "text": "question text",
      "difficulty": 2,
      "requirement_ids": ["req_xxx"],
      "answer_outline": "key points"
    }
  ]
}`;
}
