import crypto from 'crypto';

export function genId(prefix = '') {
  const short = crypto.randomUUID().split('-')[0];
  return prefix ? `${prefix}_${short}` : short;
}

export function genRequirementId(index) {
  return `req_${String(index + 1).padStart(3, '0')}`;
}

export function genQuestionId(category, index) {
  const prefixMap = {
    technical: 'q_tech',
    behavioural: 'q_behav',
    system_design: 'q_sd',
    company_fit: 'q_cf',
  };
  const prefix = prefixMap[category] || 'q';
  return `${prefix}_${String(index + 1).padStart(3, '0')}`;
}

export function genFlashcardId(index) {
  return `fc_${String(index + 1).padStart(3, '0')}`;
}

export function kitFingerprint(jd, companyUrl) {
  const normalized = `${jd.trim().toLowerCase()}|${companyUrl.trim().toLowerCase()}`;
  return crypto.createHash('sha256').update(normalized).digest('hex').slice(0, 16);
}
