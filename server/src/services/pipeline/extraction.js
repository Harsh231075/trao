import { llmCall } from '../../llm/client.js';
import { EXTRACTION_SYSTEM, extractionPrompt } from '../../llm/prompts.js';
import { genRequirementId } from '../../utils/id.js';

/**
 * Extract requirements from a job description using LLM.
 * Returns structured requirements with stable IDs.
 */
export async function extractRequirements(jobDescription) {
  const result = await llmCall(
    EXTRACTION_SYSTEM,
    extractionPrompt(jobDescription),
    { jsonMode: true, temperature: 0.2 }
  );

  // Assign stable IDs to requirements
  const requirements = (result.requirements || []).map((req, index) => ({
    id: genRequirementId(index),
    text: req.text || '',
    kind: validateKind(req.kind),
    priority: validatePriority(req.priority),
  }));

  return {
    role_title: result.role_title || 'Unknown Role',
    seniority: result.seniority || 'unknown',
    responsibilities: result.responsibilities || [],
    requirements,
  };
}

function validateKind(kind) {
  const valid = ['technical', 'behavioural', 'domain'];
  return valid.includes(kind) ? kind : 'technical';
}

function validatePriority(priority) {
  return priority === 'nice' ? 'nice' : 'must';
}
