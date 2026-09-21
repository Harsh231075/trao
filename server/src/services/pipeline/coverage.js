/**
 * Coverage checker — ensures every MUST requirement has at least one question.
 * Pure logic, no LLM calls.
 */
export function checkCoverage(requirements, questions) {
  const mustReqs = requirements.filter(r => r.priority === 'must');

  // Collect all requirement_ids referenced by any question across all categories
  const coveredIds = new Set();
  for (const category of Object.values(questions)) {
    for (const q of category) {
      if (Array.isArray(q.requirement_ids)) {
        q.requirement_ids.forEach(id => coveredIds.add(id));
      }
    }
  }

  const uncoveredReqs = mustReqs.filter(r => !coveredIds.has(r.id));
  const uncoveredIds = uncoveredReqs.map(r => r.id);

  return {
    total_must: mustReqs.length,
    covered: mustReqs.length - uncoveredReqs.length,
    uncovered_requirement_ids: uncoveredIds,
    uncovered_requirements: uncoveredReqs,
    is_complete: uncoveredIds.length === 0,
  };
}
