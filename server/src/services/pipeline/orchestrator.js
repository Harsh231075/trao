import Kit from '../../models/Kit.js';
import { researchCompany, researchInterviews, compileResearchContext } from './retrieval.js';
import { extractRequirements } from './extraction.js';
import { generateCompanyBrief, generateAllQuestions, generateFlashcards, generateGapQuestions } from './generation.js';
import { checkCoverage } from './coverage.js';
import { buildSchedule } from './scheduler.js';

const MAX_COVERAGE_PASSES = 3;

/**
 * Main pipeline orchestrator.
 * Used by BOTH the API and the batch CLI command.
 *
 * @param {object} input - { jd, company_url, days_available }
 * @param {string|null} kitId - MongoDB Kit ID (null for batch mode)
 * @returns {object} Complete Appendix A kit data
 */
export async function runPipeline(input, kitId = null) {
  const { jd, company_url, days_available } = input;

  async function updateStatus(status, extras = {}) {
    if (kitId) {
      await Kit.findByIdAndUpdate(kitId, { status, ...extras });
    }
  }

  try {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // ─── STAGE 1: Research ───
    await updateStatus('researching');

    let companyResearch = { pages: [], sources: [], aboutInfo: '', careersInfo: '', errors: [] };
    let interviewResearch = { found: false, text: 'No interview data available.', insights: [] };

    try {
      companyResearch = await researchCompany(company_url);
    } catch (err) {
      console.warn(`[Pipeline] Company research failed: ${err.message}`);
      companyResearch.errors.push({ url: company_url, error: err.message });
    }

    // Extract company name from URL for interview search
    let companyName = '';
    try {
      companyName = new URL(company_url).hostname.replace('www.', '').split('.')[0];
    } catch { companyName = 'company'; }

    try {
      interviewResearch = await researchInterviews(companyName);
    } catch (err) {
      console.warn(`[Pipeline] Interview research failed: ${err.message}`);
    }

    const researchContext = compileResearchContext(companyResearch, interviewResearch);
    await delay(1000);

    // ─── STAGE 2: Extraction ───
    await updateStatus('extracting');

    const extraction = await extractRequirements(jd);
    const { role_title, seniority, responsibilities, requirements } = extraction;
    await delay(1000);

    // ─── STAGE 3: Generation ───
    await updateStatus('generating');

    const companyBrief = await generateCompanyBrief(researchContext, companyResearch.sources);
    const [questions, flashcards] = await Promise.all([
      generateAllQuestions(jd, requirements, companyBrief, interviewResearch.text),
      generateFlashcards(requirements, companyBrief),
    ]);

    // ─── STAGE 4: Coverage Check ───
    await updateStatus('checking_coverage');

    let coverageResult = checkCoverage(requirements, questions);
    let passes = 1;

    while (!coverageResult.is_complete && passes < MAX_COVERAGE_PASSES) {
      console.log(`[Pipeline] Coverage pass ${passes}: ${coverageResult.uncovered_requirement_ids.length} uncovered MUST reqs`);

      const existingCounts = {
        technical: questions.technical?.length || 0,
        behavioural: questions.behavioural?.length || 0,
        system_design: questions.system_design?.length || 0,
        company_fit: questions.company_fit?.length || 0,
      };

      const gapQuestionsMap = await generateGapQuestions(coverageResult.uncovered_requirements, existingCounts);

      for (const [cat, qs] of Object.entries(gapQuestionsMap)) {
        questions[cat] = [...(questions[cat] || []), ...qs];
      }

      coverageResult = checkCoverage(requirements, questions);
      passes++;
    }
    await delay(1500);

    // ─── STAGE 5: Schedule ───
    await updateStatus('building_schedule');

    const schedule = buildSchedule(days_available, requirements, questions);
    await delay(1500);

    // ─── STAGE 6: Assemble Kit Data ───
    const kitData = {
      source: {
        jd,
        company_url,
        days_available,
      },
      company_brief: companyBrief,
      role: {
        title: role_title,
        seniority,
        responsibilities,
        requirements,
      },
      questions,
      flashcards,
      schedule,
      coverage: {
        uncovered_requirement_ids: coverageResult.uncovered_requirement_ids,
        passes,
      },
    };

    await updateStatus('completed', {
      kit_data: kitData,
      coverage_passes: passes,
      error_message: null,
    });

    return kitData;

  } catch (err) {
    console.error(`[Pipeline] Fatal error:`, err.message);
    await updateStatus('failed', { error_message: err.message });
    throw err;
  }
}
