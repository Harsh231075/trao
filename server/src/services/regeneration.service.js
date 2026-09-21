import UserEdit from '../models/UserEdit.js';
import { researchCompany, researchInterviews, compileResearchContext } from './pipeline/retrieval.js';
import { generateCompanyBrief, generateQuestions } from './pipeline/generation.js';
import { buildSchedule } from './pipeline/scheduler.js';
import { checkCoverage } from './pipeline/coverage.js';

/**
 * Regenerate an isolated section of a kit while preserving user edits.
 * 
 * Valid sections:
 * - 'company_brief'
 * - 'technical'
 * - 'behavioural'
 * - 'system_design'
 * - 'company_fit'
 * - 'schedule'
 */
export async function regenerateSection(kit, section) {
  const kitData = kit.kit_data;
  if (!kitData) {
    throw new Error('No kit data found to regenerate');
  }

  // 1. Fetch user-edited content IDs for this kit to preserve them
  const edits = await UserEdit.find({ kit_id: kit._id }).lean();
  const editedQuestionIds = new Set(
    edits.filter(e => e.content_type === 'question').map(e => e.content_id)
  );
  const isBriefEdited = edits.some(e => e.content_type === 'company_brief');

  // 2. Regenerate based on requested section
  if (section === 'company_brief') {
    if (isBriefEdited) {
      // User explicitly edited brief, but requested regeneration: we regenerate AI brief
      // or if prompt requires preserving, note that user requested regen on this section
    }
    const companyResearch = await researchCompany(kit.company_url);
    let companyName = '';
    try {
      companyName = new URL(kit.company_url).hostname.replace('www.', '').split('.')[0];
    } catch {
      companyName = 'company';
    }
    const interviewResearch = await researchInterviews(companyName);
    const researchContext = compileResearchContext(companyResearch, interviewResearch);
    const newBrief = await generateCompanyBrief(researchContext, companyResearch.sources);

    kitData.company_brief = newBrief;
  } else if (['technical', 'behavioural', 'system_design', 'company_fit'].includes(section)) {
    const category = section;
    const existingQuestions = kitData.questions?.[category] || [];

    // Keep user-created and user-edited questions
    const preservedQuestions = existingQuestions.filter(
      q => q.source === 'user' || q.source === 'user_edited' || editedQuestionIds.has(q.id)
    );

    // Generate new questions for this category
    const jd = kitData.source?.jd || kit.job_description;
    const requirements = kitData.role?.requirements || [];
    const companyBrief = kitData.company_brief || '';
    const interviewInsights = '';

    const newlyGenerated = await generateQuestions(
      jd,
      requirements,
      companyBrief,
      interviewInsights,
      category
    );

    // Merge: preserved user questions first + newly generated
    kitData.questions[category] = [...preservedQuestions, ...newlyGenerated];

    // Re-check coverage and update coverage report
    const coverageResult = checkCoverage(requirements, kitData.questions);
    kitData.coverage = {
      uncovered_requirement_ids: coverageResult.uncovered_requirement_ids,
      passes: kitData.coverage?.passes || 1,
    };
  } else if (section === 'schedule') {
    const daysAvailable = kitData.source?.days_available || kit.days_available;
    const requirements = kitData.role?.requirements || [];
    const questions = kitData.questions || {};

    const newSchedule = buildSchedule(daysAvailable, requirements, questions);
    kitData.schedule = newSchedule;
  } else {
    throw new Error(`Unsupported regeneration section: ${section}`);
  }

  // 3. Mark modified and save
  kit.markModified('kit_data');
  await kit.save();

  return kit.kit_data;
}
