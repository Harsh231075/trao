/**
 * Deterministic schedule builder — pure application logic, NO LLM calls.
 * Distributes questions across exactly N days.
 * Higher-priority and harder material scheduled earlier.
 */
export function buildSchedule(daysAvailable, requirements, questions) {
  // 1. Flatten all questions across categories with their metadata
  const allQuestions = [];
  for (const [category, qs] of Object.entries(questions)) {
    for (const q of qs) {
      // Determine priority from linked requirements
      const linkedReqs = requirements.filter(r => q.requirement_ids?.includes(r.id));
      const hasMust = linkedReqs.some(r => r.priority === 'must');

      allQuestions.push({
        ...q,
        category,
        priorityScore: hasMust ? 2 : 1, // MUST = higher priority
        difficulty: q.difficulty || 2,
      });
    }
  }

  if (allQuestions.length === 0) {
    // Edge case: no questions generated
    return Array.from({ length: daysAvailable }, (_, i) => ({
      day: i + 1,
      focus: 'Review',
      question_ids: [],
      minutes: 0,
    }));
  }

  // 2. Sort: MUST first, then by difficulty (hard first)
  allQuestions.sort((a, b) => {
    if (b.priorityScore !== a.priorityScore) return b.priorityScore - a.priorityScore;
    return b.difficulty - a.difficulty;
  });

  // 3. Distribute questions across days evenly
  const days = Array.from({ length: daysAvailable }, (_, i) => ({
    day: i + 1,
    focus: '',
    question_ids: [],
    minutes: 0,
  }));

  allQuestions.forEach((q, index) => {
    const dayIndex = index % daysAvailable;
    days[dayIndex].question_ids.push(q.id);
    // Estimate: difficulty 1 = 10min, 2 = 15min, 3 = 20min
    days[dayIndex].minutes += q.difficulty === 1 ? 10 : q.difficulty === 2 ? 15 : 20;
  });

  // 4. Determine focus label for each day
  const categoryLabels = {
    technical: 'Technical',
    behavioural: 'Behavioural',
    system_design: 'System Design',
    company_fit: 'Company Fit',
  };

  for (const day of days) {
    const dayQuestions = allQuestions.filter(q => day.question_ids.includes(q.id));
    const categoryCounts = {};
    for (const q of dayQuestions) {
      categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
    }
    const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];
    day.focus = topCategory ? categoryLabels[topCategory[0]] || topCategory[0] : 'Review';
  }

  // 5. Validate: all question_ids exist
  const allIds = new Set(allQuestions.map(q => q.id));
  for (const day of days) {
    day.question_ids = day.question_ids.filter(id => allIds.has(id));
  }

  return days;
}
