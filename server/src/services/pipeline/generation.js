import { llmCall } from '../../llm/client.js';
import {
  COMPANY_BRIEF_SYSTEM, companyBriefPrompt,
  QUESTION_GEN_SYSTEM, questionGenPrompt,
  FLASHCARD_SYSTEM, flashcardPrompt,
  COVERAGE_GAP_SYSTEM, coverageGapPrompt,
} from '../../llm/prompts.js';
import { genQuestionId, genFlashcardId } from '../../utils/id.js';

/**
 * Generate company brief from research data.
 */
export async function generateCompanyBrief(researchContext, sources, companyResearch = {}) {
  try {
    const result = await llmCall(
      COMPANY_BRIEF_SYSTEM,
      companyBriefPrompt(researchContext, sources),
      { jsonMode: true, temperature: 0.3 }
    );

    const enrichment = companyResearch?.enrichment || {};
    const webIntel = companyResearch?.webIntelligence || [];

    return {
      name: enrichment.name || 'Target Company',
      domain: enrichment.domain || '',
      logo: enrichment.logo || null,
      summary: result.summary || 'Company information unavailable.',
      what_they_do: result.what_they_do || 'Unable to determine from available sources.',
      engineering_culture: Array.isArray(result.engineering_culture) ? result.engineering_culture : [
        'High Concurrency & System Scalability',
        'Strict API Contract & Testing Standards',
        'Agile Cross-Functional Ownership',
      ],
      work_environment: result.work_environment || 'Fast-paced, engineering-driven environment with focus on continuous delivery.',
      tech_stack_shifts: Array.isArray(result.tech_stack_shifts) ? result.tech_stack_shifts : (enrichment.techStack || []),
      verified_sources: webIntel.length > 0 ? webIntel : (sources || []).map(s => ({
        title: typeof s === 'string' ? s : s.title || 'Official Source',
        url: typeof s === 'string' ? s : s.url || '',
        domain: typeof s === 'string' ? (s.replace(/^https?:\/\//, '').split('/')[0]) : (s.domain || ''),
        category: 'Official Portal',
        verified: true
      })),
      sources: result.sources || sources,
    };
  } catch (err) {
    console.warn('[Generation] Company brief generation failed:', err.message);
    const enrichment = companyResearch?.enrichment || {};
    return {
      name: enrichment.name || 'Target Company',
      domain: enrichment.domain || '',
      logo: enrichment.logo || null,
      summary: 'Company brief could not be generated.',
      what_they_do: 'Information unavailable.',
      engineering_culture: ['High Concurrency Focus', 'System Quality Standards'],
      work_environment: 'Standard tech engineering environment.',
      tech_stack_shifts: enrichment.techStack || [],
      verified_sources: [],
      sources,
    };
  }
}

/**
 * Generate questions for a specific category.
 */
export async function generateQuestions(jd, requirements, companyBrief, interviewInsights, category) {
  const briefText = typeof companyBrief === 'string' ? companyBrief : JSON.stringify(companyBrief);

  const result = await llmCall(
    QUESTION_GEN_SYSTEM,
    questionGenPrompt(jd, requirements, briefText, interviewInsights, category),
    { jsonMode: true, temperature: 0.5, maxTokens: 4096 }
  );

  const questions = (result.questions || []).map((q, index) => ({
    id: genQuestionId(category, index),
    text: q.text || '',
    difficulty: Math.min(3, Math.max(1, parseInt(q.difficulty) || 2)),
    requirement_ids: Array.isArray(q.requirement_ids) ? q.requirement_ids : [],
    answer_outline: q.answer_outline || '',
    source: 'generated',
  }));

  return questions;
}

/**
 * Generate all 4 question categories sequentially with pacing to avoid TPM rate limits.
 */
export async function generateAllQuestions(jd, requirements, companyBrief, interviewInsights) {
  const categories = ['technical', 'behavioural', 'system_design', 'company_fit'];
  const questions = {};

  for (const cat of categories) {
    try {
      console.log(`[LLM Pipeline] 🧠 Generating category: ${cat.toUpperCase()}...`);
      const res = await generateQuestions(jd, requirements, companyBrief, interviewInsights, cat);
      questions[cat] = res || [];
      console.log(`[LLM Pipeline] ✅ ${cat.toUpperCase()}: ${questions[cat].length} questions generated`);
      // Pacing delay (300ms) to respect LLM TPM rate limits
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.warn(`[Generation] ${cat} questions warning:`, err.message);
      questions[cat] = [];
    }
  }

  return questions;
}

/**
 * Generate flashcards from requirements.
 */
export async function generateFlashcards(requirements, companyBrief) {
  const briefText = typeof companyBrief === 'string' ? companyBrief : JSON.stringify(companyBrief);

  const result = await llmCall(
    FLASHCARD_SYSTEM,
    flashcardPrompt(requirements, briefText),
    { jsonMode: true, temperature: 0.4 }
  );

  const flashcards = (result.flashcards || []).map((fc, index) => ({
    id: genFlashcardId(index),
    front: fc.front || '',
    back: fc.back || '',
    requirement_ids: Array.isArray(fc.requirement_ids) ? fc.requirement_ids : [],
    source: 'generated',
  }));

  return flashcards;
}

/**
 * Generate gap-filling questions for uncovered MUST requirements.
 */
export async function generateGapQuestions(uncoveredReqs, existingCountMap = {}) {
  const result = await llmCall(
    COVERAGE_GAP_SYSTEM,
    coverageGapPrompt(uncoveredReqs, 'targeted'),
    { jsonMode: true, temperature: 0.4 }
  );

  const questionsByCategory = {};

  (result.questions || []).forEach((q, index) => {
    // Link to requirement
    const reqIds = Array.isArray(q.requirement_ids) && q.requirement_ids.length > 0
      ? q.requirement_ids
      : [uncoveredReqs[index % uncoveredReqs.length]?.id].filter(Boolean);

    // Determine category from matched requirement
    const matchedReq = uncoveredReqs.find(r => reqIds.includes(r.id));
    let cat = 'technical';
    if (matchedReq?.kind === 'behavioural') cat = 'behavioural';
    else if (matchedReq?.kind === 'domain') cat = 'company_fit';

    const count = (existingCountMap[cat] || 0) + (questionsByCategory[cat]?.length || 0);
    const generatedQuestion = {
      id: genQuestionId(cat, count),
      text: q.text || '',
      difficulty: Math.min(3, Math.max(1, parseInt(q.difficulty) || 2)),
      requirement_ids: reqIds,
      answer_outline: q.answer_outline || '',
      source: 'generated_coverage_pass',
    };

    if (!questionsByCategory[cat]) questionsByCategory[cat] = [];
    questionsByCategory[cat].push(generatedQuestion);
  });

  return questionsByCategory;
}
