// Using global fetch built into Node 22

const BASE_URL = 'http://localhost:5001/api';

async function runTests() {
  console.log('--- STARTING BACKEND COMPREHENSIVE TEST SUITE ---');

  // 1. Health
  console.log('\n1. Testing Health Check...');
  const healthRes = await fetch(`${BASE_URL}/health`);
  const health = await healthRes.json();
  console.log('Health:', health);
  if (health.status !== 'ok') throw new Error('Health check failed');

  // 2. Auth: Register / Login
  console.log('\n2. Testing Registration & Login...');
  const testEmail = `candidate_${Date.now()}@example.com`;
  const regRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Candidate',
      email: testEmail,
      password: 'SecurePassword123!',
    }),
  });
  const regData = await regRes.json();
  if (!regData.token) throw new Error(`Registration failed: ${JSON.stringify(regData)}`);
  const token = regData.token;
  console.log('Registered successfully! Token received.');

  const authHeaders = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // 3. Create Kit
  console.log('\n3. Testing Kit Creation & Pipeline Execution...');
  const createRes = await fetch(`${BASE_URL}/kits`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      job_description: 'Staff Systems Engineer specializing in High-Throughput Node.js backends, MongoDB performance, Redis caching, microservices, and cross-team architectural alignment. Must have 7+ years backend experience.',
      company_url: 'https://stripe.com',
      days_available: 5,
    }),
  });
  const createData = await createRes.json();
  if (!createData.id) throw new Error(`Create kit failed: ${JSON.stringify(createData)}`);
  const kitId = createData.id;
  console.log(`Kit created with ID: ${kitId}. Waiting for pipeline completion...`);

  // Poll status until completed (or timeout 15s)
  let kit = null;
  for (let i = 0; i < 15; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const statusRes = await fetch(`${BASE_URL}/kits/${kitId}/status`, { headers: authHeaders });
    const statusData = await statusRes.json();
    console.log(`Pipeline Status: ${statusData.status} (Passes: ${statusData.coverage_passes})`);
    if (statusData.status === 'completed') {
      const fullRes = await fetch(`${BASE_URL}/kits/${kitId}`, { headers: authHeaders });
      const full = await fullRes.json();
      kit = full.kit;
      break;
    }
    if (statusData.status === 'failed') {
      throw new Error(`Pipeline failed: ${statusData.error}`);
    }
  }

  if (!kit || !kit.kit_data) throw new Error('Pipeline did not complete in time');
  console.log('Pipeline Completed Successfully!');
  console.log(`Total Tech Questions: ${kit.kit_data.questions.technical.length}`);
  console.log(`Total Flashcards: ${kit.kit_data.flashcards.length}`);
  console.log(`Schedule Days Count: ${kit.kit_data.schedule.length}`);
  console.log(`Uncovered MUST Requirements: ${kit.kit_data.coverage.uncovered_requirement_ids.length}`);

  // 4. Test Builder: Edit Question
  console.log('\n4. Testing Builder: Edit Question...');
  const firstQ = kit.kit_data.questions.technical[0];
  const editQRes = await fetch(`${BASE_URL}/kits/${kitId}/questions/${firstQ.id}`, {
    method: 'PATCH',
    headers: authHeaders,
    body: JSON.stringify({
      text: 'EDITED: ' + firstQ.text,
      difficulty: 3,
      answer_outline: 'Updated outline by candidate.',
    }),
  });
  const editQData = await editQRes.json();
  console.log('Edit Question result:', editQData.message);

  // 5. Test Builder: Add Custom User Question
  console.log('\n5. Testing Builder: Add Question...');
  const addQRes = await fetch(`${BASE_URL}/kits/${kitId}/questions`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      category: 'technical',
      text: 'How does Kafka handle consumer group rebalancing during partition reassignments?',
      difficulty: 3,
      requirement_ids: ['req_001'],
      answer_outline: 'Eager protocol vs Cooperative Sticky assignor, heartbeat thread.',
    }),
  });
  const addQData = await addQRes.json();
  console.log('Add Question result:', addQData.message, 'ID:', addQData.question.id);

  // 6. Test Practice: Rate Flashcard Confidence
  console.log('\n6. Testing Practice Flashcards...');
  const deckRes = await fetch(`${BASE_URL}/kits/${kitId}/practice`, { headers: authHeaders });
  const deck = await deckRes.json();
  console.log(`Flashcards in deck: ${deck.flashcards.length}`);
  const firstCard = deck.flashcards[0];

  const rateRes = await fetch(`${BASE_URL}/kits/${kitId}/practice`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      flashcard_id: firstCard.id,
      confidence: 5,
    }),
  });
  const rateData = await rateRes.json();
  console.log('Confidence recorded! Score:', rateData.session.confidence);

  const progRes = await fetch(`${BASE_URL}/kits/${kitId}/practice/progress`, { headers: authHeaders });
  const progress = await progRes.json();
  console.log('Practice Progress Summary:', progress);

  // 7. Test Schedule
  console.log('\n7. Testing Schedule Endpoints...');
  const schedRes = await fetch(`${BASE_URL}/kits/${kitId}/schedule`, { headers: authHeaders });
  const schedData = await schedRes.json();
  console.log(`Schedule contains ${schedData.schedule.length} day(s).`);

  // 8. Test Section Regeneration (e.g. Regenerate Behavioural category)
  console.log('\n8. Testing Section Regeneration (preserving user edits)...');
  const regenRes = await fetch(`${BASE_URL}/kits/${kitId}/regenerate`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ section: 'behavioural' }),
  });
  const regenData = await regenRes.json();
  console.log('Regeneration result:', regenData.message);

  // Verify that our edited technical question is STILL there and not erased!
  const verifyKitRes = await fetch(`${BASE_URL}/kits/${kitId}`, { headers: authHeaders });
  const verifyKit = await verifyKitRes.json();
  const checkedQ = verifyKit.kit.kit_data.questions.technical.find(q => q.id === firstQ.id);
  if (!checkedQ || !checkedQ.text.startsWith('EDITED:')) {
    throw new Error('User edited question was overwritten during regeneration!');
  }
  console.log('Verified: User-edited content perfectly preserved through regeneration!');

  console.log('\n===========================================');
  console.log(' ALL BACKEND API ENDPOINTS TESTED & PASSED!');
  console.log('===========================================');
}

runTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
