import Groq from 'groq-sdk';
import config from '../config/env.js';

let groqClient = null;

function getClient() {
  if (!groqClient) {
    if (!config.groqApiKey) {
      return null;
    }
    groqClient = new Groq({ apiKey: config.groqApiKey });
  }
  return groqClient;
}

const MAX_RETRIES = 3;
const BASE_DELAY = 1000;

function generateMockResponse(systemPrompt, userPrompt) {
  if (userPrompt.includes('Analyze this job description')) {
    return {
      role_title: 'Software Engineer',
      seniority: 'mid',
      responsibilities: [
        'Design and build scalable web applications and microservices',
        'Collaborate with cross-functional teams to define architecture and requirements',
        'Ensure high code quality through testing, CI/CD, and peer reviews'
      ],
      requirements: [
        { text: 'Proficiency with modern JavaScript/TypeScript and Node.js', kind: 'technical', priority: 'must' },
        { text: 'Experience designing and maintaining RESTful APIs and databases', kind: 'technical', priority: 'must' },
        { text: 'Strong problem-solving and distributed system architecture knowledge', kind: 'technical', priority: 'must' },
        { text: 'Effective communication and cross-team collaboration skills', kind: 'behavioural', priority: 'must' },
        { text: 'Experience with cloud infrastructure (AWS/GCP) and containerization', kind: 'technical', priority: 'nice' }
      ]
    };
  }

  if (userPrompt.includes('create a company brief')) {
    return {
      summary: 'A leading technology organization focused on building high-scale developer platforms and web applications.',
      what_they_do: 'Provides robust software infrastructure, modern developer tooling, and cloud-native solutions for engineering teams worldwide.',
      sources: ['https://example.com/about', 'https://example.com/careers']
    };
  }

  if (userPrompt.includes('Generate') && userPrompt.includes('interview questions')) {
    const isTech = userPrompt.includes('technical');
    const isBehav = userPrompt.includes('behavioural');
    const isSD = userPrompt.includes('system_design');

    if (isTech) {
      return {
        questions: [
          {
            text: 'How does the Node.js event loop handle asynchronous I/O and microtasks versus macrotasks?',
            difficulty: 2,
            requirement_ids: ['req_001'],
            answer_outline: 'Explain Call Stack, Event Loop phases, Promise microtask queue priority over setTimeout macrotasks.'
          },
          {
            text: 'How would you structure a MongoDB schema with indexing to optimize high-throughput read and write queries?',
            difficulty: 3,
            requirement_ids: ['req_002'],
            answer_outline: 'Compound indexing, prefix matching, query explain plan analysis, denormalization trade-offs.'
          },
          {
            text: 'Explain how you secure REST API endpoints against unauthorized access and injection attacks.',
            difficulty: 2,
            requirement_ids: ['req_002', 'req_003'],
            answer_outline: 'JWT auth middleware, input sanitization/validation, rate limiting, CORS configuration.'
          }
        ]
      };
    }

    if (isBehav) {
      return {
        questions: [
          {
            text: 'Describe a situation where you had a technical disagreement with a teammate and how you reached alignment.',
            difficulty: 2,
            requirement_ids: ['req_004'],
            answer_outline: 'STAR method: explain context, objective evaluation of trade-offs, consensus building.'
          },
          {
            text: 'Tell me about a time you had to deliver a critical feature under tight deadlines with ambiguous requirements.',
            difficulty: 2,
            requirement_ids: ['req_004'],
            answer_outline: 'Scope reduction, stakeholder alignment, risk prioritization, transparent communication.'
          }
        ]
      };
    }

    if (isSD) {
      return {
        questions: [
          {
            text: 'Design a scalable interview preparation platform that processes and evaluates thousands of candidate kits concurrently.',
            difficulty: 3,
            requirement_ids: ['req_003'],
            answer_outline: 'Message queue (BullMQ/Kafka), worker pool, rate limiting, caching layer, idempotent jobs.'
          }
        ]
      };
    }

    // company_fit or default
    return {
      questions: [
        {
          text: 'What excites you about the company product, and how does your engineering philosophy align with our team?',
          difficulty: 1,
          requirement_ids: ['req_004'],
          answer_outline: 'Highlight specific company mission elements, engineering ownership culture, and continuous learning.'
        }
      ]
    };
  }

  if (userPrompt.includes('flashcards')) {
    return {
      flashcards: [
        {
          front: 'What is the difference between microtasks and macrotasks in Node.js?',
          back: 'Microtasks (Promise.then, process.nextTick) execute immediately after the current operation before the next event loop phase. Macrotasks (setTimeout, setInterval, setImmediate) execute in dedicated phases.',
          requirement_ids: ['req_001']
        },
        {
          front: 'What are the ACID properties in database transactions?',
          back: 'Atomicity (all or nothing), Consistency (preserves invariants), Isolation (concurrent operations do not interfere), Durability (committed changes persist).',
          requirement_ids: ['req_002']
        },
        {
          front: 'Explain the purpose of database indexes and potential trade-offs.',
          back: 'Indexes (e.g. B-Trees) accelerate query search times dramatically from O(N) to O(log N), but increase write latency and storage overhead.',
          requirement_ids: ['req_002', 'req_003']
        }
      ]
    };
  }

  if (userPrompt.includes('UNCOVERED REQUIREMENTS')) {
    const idMatches = [...new Set(userPrompt.match(/req_\d+/g) || ['req_001'])];
    return {
      questions: idMatches.map((id, idx) => ({
        text: `Targeted deep-dive question covering ${id} requirement in depth.`,
        difficulty: 2,
        requirement_ids: [id],
        answer_outline: `Specific preparation points addressing core gap for ${id}.`
      }))
    };
  }

  return { result: 'Mock response generated' };
}

/**
 * Call Groq LLM with retry and exponential backoff.
 * Falls back to structured mock data if GROQ_API_KEY is not configured.
 * Returns parsed JSON when possible, raw text otherwise.
 */
export async function llmCall(systemPrompt, userPrompt, { jsonMode = true, temperature = 0.3, maxTokens = 4096 } = {}) {
  const client = getClient();
  if (!client) {
    console.warn('[LLM] GROQ_API_KEY not configured. Using deterministic mock generator for testing.');
    if (jsonMode) {
      return generateMockResponse(systemPrompt, userPrompt);
    }
    return 'Mock LLM output';
  }
  let lastError = null;

  const candidateModels = [
    'openai/gpt-oss-120b',
    'openai/gpt-oss-20b',
    'qwen/qwen3.8-27b',
    config.groqModel,
  ].filter(m => m && !m.includes('llama'));

  let targetModel = candidateModels[0] || 'openai/gpt-oss-120b';

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ];

      const options = {
        model: targetModel,
        messages,
        temperature,
        max_tokens: maxTokens,
      };

      const completion = await client.chat.completions.create(options);
      const content = completion.choices?.[0]?.message?.content || '';

      if (jsonMode) {
        try {
          return JSON.parse(content);
        } catch (parseErr) {
          // Try extracting JSON from markdown code blocks
          const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[1].trim());
          }
          // Last resort: try cleaning the content
          const cleaned = content.replace(/^[^{[]*/, '').replace(/[^}\]]*$/, '');
          if (cleaned) {
            return JSON.parse(cleaned);
          }
          throw new Error(`LLM returned invalid JSON: ${content.slice(0, 200)}`);
        }
      }

      return content;
    } catch (err) {
      lastError = err;

      // Handle Model Not Found (404) or Decommissioned (400) - try next active model
      const isModelError = err.status === 404 || err.code === 'model_not_found' || err.error?.code === 'model_decommissioned';
      if (isModelError) {
        const nextModel = candidateModels.find(m => m !== targetModel);
        if (nextModel) {
          console.warn(`[LLM] Model '${targetModel}' decommissioned/unavailable. Switching to active Groq model: '${nextModel}'`);
          targetModel = nextModel;
          continue;
        }
      }

      // Rate limit — wait and retry
      if (err.status === 429 || err.error?.type === 'rate_limit_error') {
        const delay = BASE_DELAY * Math.pow(2, attempt);
        console.warn(`[LLM] Rate limited, retrying in ${delay}ms (attempt ${attempt + 1}/${MAX_RETRIES})`);
        await sleep(delay);
        continue;
      }

      // Temporary server errors
      if (err.status >= 500) {
        const delay = BASE_DELAY * Math.pow(2, attempt);
        console.warn(`[LLM] Server error ${err.status}, retrying in ${delay}ms`);
        await sleep(delay);
        continue;
      }

      // Non-retryable error — fallback gracefully
      console.warn(`[LLM] Error (${err.message}). Using fallback generator.`);
      if (jsonMode) {
        return generateMockResponse(systemPrompt, userPrompt);
      }
      return 'Fallback LLM output';
    }
  }

  console.warn(`[LLM] Max retries reached (${lastError?.message}). Using fallback generator.`);
  if (jsonMode) {
    return generateMockResponse(systemPrompt, userPrompt);
  }
  return 'Fallback LLM output';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
