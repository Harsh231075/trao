import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../config/env.js';
import User from '../models/User.js';
import Kit from '../models/Kit.js';
import PracticeSession from '../models/PracticeSession.js';
import { kitFingerprint } from '../utils/id.js';

async function seed() {
  console.log('🌱 Starting Trao database seed...');
  console.log(`Connecting to MongoDB at: ${config.mongoUri}`);

  await mongoose.connect(config.mongoUri);
  console.log('✅ MongoDB connected.');

  const demoEmail = 'demo@trao.ai';
  const demoPassword = 'password123';
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(demoPassword, saltRounds);

  // 1. Create or update Demo User
  let user = await User.findOne({ email: demoEmail });
  if (user) {
    user.name = 'Himanshu Singh';
    user.password_hash = passwordHash;
    await user.save();
    console.log(`👤 Updated existing demo user: ${demoEmail}`);
  } else {
    user = await User.create({
      name: 'Himanshu Singh',
      email: demoEmail,
      password_hash: passwordHash,
    });
    console.log(`👤 Created new demo user: ${demoEmail}`);
  }

  // Clean previous kits & practice sessions for this user
  await Kit.deleteMany({ user_id: user._id });
  await PracticeSession.deleteMany({ user_id: user._id });
  console.log('🧹 Cleared previous kits & practice sessions for demo user.');

  // ─── KIT 1: Stripe (Completed - 100% Coverage) ──────────────────────
  const stripeJd = `Senior Distributed Systems Engineer at Stripe.
We are looking for an experienced engineer to design, build, and operate mission-critical payment ledger services handling >100,000 transactions per second.
Key Responsibilities:
- Design fault-tolerant APIs with guaranteed idempotency and sub-50ms p99 latency
- Build distributed event-driven architectures with Apache Kafka and transactional outbox patterns
- Lead blameless post-mortems and maintain five-nines service availability
- Champion asynchronous RFC culture and cross-functional engineering mentorship`;
  const stripeUrl = 'https://stripe.com';
  const stripeFp = kitFingerprint(stripeJd, stripeUrl);

  const stripeKitData = {
    source: {
      jd: stripeJd,
      company_url: stripeUrl,
      days_available: 5,
    },
    company_brief: {
      name: 'Stripe',
      summary: 'Stripe builds financial infrastructure for the internet. Businesses of every size use our software to accept payments and manage their businesses online.',
      what_they_do: 'Global payment gateway APIs, automated billing, fraud prevention (Radar), Treasury banking-as-a-service, and corporate expense cards.',
      sources: ['https://stripe.com/about', 'https://stripe.com/jobs'],
    },
    role: {
      title: 'Senior Distributed Systems Engineer',
      seniority: 'senior',
      responsibilities: [
        'Architect and operate distributed payment ledger services handling >100k TPS with strict consistency',
        'Design fault-tolerant APIs with guaranteed idempotency and sub-50ms p99 latency',
        'Lead system reliability engineering, incident post-mortems, and capacity planning',
        'Mentor mid-level engineers and drive cross-team architectural standards',
      ],
      requirements: [
        { id: 'req_001', text: 'Proficiency in distributed systems, consensus algorithms (Raft/Paxos), and replication', kind: 'technical', priority: 'must' },
        { id: 'req_002', text: 'Expertise with event-driven architectures, Apache Kafka, and message idempotency', kind: 'technical', priority: 'must' },
        { id: 'req_003', text: 'Deep understanding of ACID transactions, distributed locking, and database isolation levels', kind: 'technical', priority: 'must' },
        { id: 'req_004', text: 'Demonstrated ability to resolve cross-team technical disagreements and mentor engineers', kind: 'behavioural', priority: 'must' },
        { id: 'req_005', text: 'Experience with Go or high-throughput Node.js services in production', kind: 'technical', priority: 'nice' },
      ],
    },
    questions: {
      technical: [
        {
          id: 'q_tech_001',
          text: 'How would you design an exactly-once message processing pipeline using Apache Kafka and a transactional relational database?',
          difficulty: 3,
          requirement_ids: ['req_001', 'req_002'],
          answer_outline: 'Discuss idempotent consumer patterns, transactional outbox pattern, Kafka consumer offsets, and database unique constraint deduplication keys.',
          source: 'generated',
        },
        {
          id: 'q_tech_002',
          text: 'Explain the trade-offs between Optimistic Concurrency Control (OCC) and Pessimistic Locking under high contention in payment transactions.',
          difficulty: 3,
          requirement_ids: ['req_003'],
          answer_outline: 'OCC avoids lock overhead but suffers retry storms under heavy contention; Pessimistic locking guarantees progress but risks deadlocks and queueing latency.',
          source: 'generated',
        },
        {
          id: 'q_tech_003',
          text: 'How do you implement an Idempotency-Key header mechanism that handles concurrent duplicate requests without double charging?',
          difficulty: 3,
          requirement_ids: ['req_002', 'req_003'],
          answer_outline: 'Two-phase atomic reservation with state machine (in_progress, completed), database unique constraint on idempotency key, short-lived locks or Redis SETNX.',
          source: 'generated',
        },
      ],
      behavioural: [
        {
          id: 'q_behav_001',
          text: 'Tell me about a time you led the technical post-mortem of a high-severity production outage.',
          difficulty: 2,
          requirement_ids: ['req_004'],
          answer_outline: 'Use STAR method: Situation (service degradation), Task (isolate root cause), Action (blameless post-mortem, 5 Whys), Result (preventative guardrails, SLO improved).',
          source: 'generated',
        },
        {
          id: 'q_behav_002',
          text: 'Describe a situation where you had a fundamental architectural disagreement with a senior peer. How did you resolve it?',
          difficulty: 2,
          requirement_ids: ['req_004'],
          answer_outline: 'Focus on data-driven benchmarks, proof-of-concept testing, objective trade-off matrix, disagree and commit principle.',
          source: 'generated',
        },
      ],
      system_design: [
        {
          id: 'q_sd_001',
          text: 'Design a high-throughput, double-entry financial ledger service capable of processing 100,000 transactions per second.',
          difficulty: 3,
          requirement_ids: ['req_001', 'req_003'],
          answer_outline: 'Cover immutable append-only ledger entries, account balance snapshots, partitioning strategies by account_id, write-ahead logs, and reconciliation jobs.',
          source: 'generated',
        },
        {
          id: 'q_sd_002',
          text: 'Design a distributed rate limiter and anti-fraud velocity checker across 10 global regions.',
          difficulty: 3,
          requirement_ids: ['req_001', 'req_002'],
          answer_outline: 'Token bucket or sliding window counter in Redis with local in-memory batching, asynchronous replication, and fallback circuit breakers.',
          source: 'generated',
        },
      ],
      company_fit: [
        {
          id: 'q_cf_001',
          text: 'Stripe operates on a high-trust, high-autonomy written culture. How do you communicate complex architectural decisions asynchronously?',
          difficulty: 1,
          requirement_ids: ['req_004'],
          answer_outline: 'Emphasize clear RFCs, concise executive summaries, proactive trade-off documentation, and soliciting feedback with defined decision deadlines.',
          source: 'generated',
        },
        {
          id: 'q_cf_002',
          text: 'How do you balance developer ergonomics and rapid feature delivery with rigorous reliability standards in financial infrastructure?',
          difficulty: 2,
          requirement_ids: ['req_001'],
          answer_outline: 'Shared infrastructure libraries, contract testing, feature flags, dark launches, and automated canary deployments.',
          source: 'generated',
        },
      ],
    },
    flashcards: [
      {
        id: 'fc_001',
        front: 'What is an Idempotent API Operation?',
        back: 'An operation that can be applied multiple times without changing the result beyond the initial application (f(f(x)) = f(x)). Essential for reliable network retries in payments.',
        requirement_ids: ['req_002'],
        source: 'generated',
      },
      {
        id: 'fc_002',
        front: 'Explain the CAP Theorem and its real-world implication for distributed payment ledgers.',
        back: 'A distributed system can guarantee at most two of Consistency, Availability, and Partition Tolerance. Financial ledgers prioritize Consistency and Partition tolerance (CP), using consensus algorithms and failing safe.',
        requirement_ids: ['req_001'],
        source: 'generated',
      },
      {
        id: 'fc_003',
        front: 'What is the Transactional Outbox Pattern?',
        back: 'A pattern where events are saved in an "outbox" table in the same local database transaction as business entities, then polled or streamed (CDC) to Kafka, guaranteeing no lost messages.',
        requirement_ids: ['req_002'],
        source: 'generated',
      },
      {
        id: 'fc_004',
        front: 'What is Two-Phase Commit (2PC) and why is it often avoided in microservices?',
        back: 'A distributed coordination protocol (Prepare, Commit). It suffers from blocking coordinator failure and high network latency, so Sagas with compensating transactions are preferred.',
        requirement_ids: ['req_001', 'req_003'],
        source: 'generated',
      },
      {
        id: 'fc_005',
        front: 'How does Write-Ahead Logging (WAL) ensure Durability?',
        back: 'Modifications are recorded sequentially to non-volatile disk before being applied to in-memory pages or data structures, allowing crash recovery via replay.',
        requirement_ids: ['req_003'],
        source: 'generated',
      },
      {
        id: 'fc_006',
        front: 'What is the difference between at-least-once and exactly-once delivery in Kafka?',
        back: 'At-least-once guarantees messages are never lost but may be duplicated upon failure. Exactly-once coordinates producer transactional IDs and consumer read_committed offsets with downstream idempotency.',
        requirement_ids: ['req_002'],
        source: 'generated',
      },
    ],
    schedule: [
      {
        day: 1,
        focus: 'Distributed Systems & Consistency (Raft, Ledgers)',
        question_ids: ['q_tech_001', 'q_sd_001'],
        minutes: 60,
      },
      {
        day: 2,
        focus: 'Transactions, Idempotency & Database Locking',
        question_ids: ['q_tech_002', 'q_tech_003'],
        minutes: 60,
      },
      {
        day: 3,
        focus: 'Large-scale System Design & Rate Limiting',
        question_ids: ['q_sd_002'],
        minutes: 50,
      },
      {
        day: 4,
        focus: 'Behavioural, Outage Post-Mortems & Leadership',
        question_ids: ['q_behav_001', 'q_behav_002'],
        minutes: 45,
      },
      {
        day: 5,
        focus: 'Stripe Culture, RFCs & Flashcard Drill',
        question_ids: ['q_cf_001', 'q_cf_002'],
        minutes: 45,
      },
    ],
    coverage: {
      uncovered_requirement_ids: [],
      uncovered_must_requirements: [],
      covered_count: 4,
      passes: 1,
      coverage_passes: 1,
    },
  };

  const stripeKit = await Kit.create({
    user_id: user._id,
    job_description: stripeJd,
    company_url: stripeUrl,
    days_available: 5,
    status: 'completed',
    fingerprint: stripeFp,
    coverage_passes: 1,
    kit_data: stripeKitData,
  });
  console.log(`📦 Seeded Kit 1 (Completed, 100% Coverage): Stripe (ID: ${stripeKit._id})`);

  // Seed Practice Sessions for Stripe Kit
  const now = Date.now();
  await PracticeSession.create([
    {
      kit_id: stripeKit._id,
      user_id: user._id,
      flashcard_id: 'fc_001',
      confidence: 5,
      practiced_at: new Date(now - 1000 * 60 * 60 * 2),
    },
    {
      kit_id: stripeKit._id,
      user_id: user._id,
      flashcard_id: 'fc_002',
      confidence: 4,
      practiced_at: new Date(now - 1000 * 60 * 60 * 4),
    },
    {
      kit_id: stripeKit._id,
      user_id: user._id,
      flashcard_id: 'fc_003',
      confidence: 3,
      practiced_at: new Date(now - 1000 * 60 * 60 * 6),
    },
    {
      kit_id: stripeKit._id,
      user_id: user._id,
      flashcard_id: 'fc_004',
      confidence: 4,
      practiced_at: new Date(now - 1000 * 60 * 60 * 8),
    },
  ]);
  console.log('🃏 Seeded 4 practice sessions for Stripe flashcards.');

  // ─── KIT 2: Meta (Completed - 100% Coverage) ─────────────────────────
  const metaJd = `Staff Frontend Engineer at Meta.
Join the core web infrastructure team powering Facebook, Instagram, and Threads web clients for billions of users.
Key Responsibilities:
- Deep expertise in React 19 concurrent features, Server Components (RSC), and Suspense
- Lead performance initiatives improving Core Web Vitals (INP, LCP, CLS) across large web apps
- Architect micro-frontend boundaries and state sharing across engineering organizations
- Drive code health and TypeScript strictness standards`;
  const metaUrl = 'https://meta.com';
  const metaFp = kitFingerprint(metaJd, metaUrl);

  const metaKitData = {
    source: {
      jd: metaJd,
      company_url: metaUrl,
      days_available: 3,
    },
    company_brief: {
      name: 'Meta',
      summary: 'Meta builds technologies that help people connect, find communities, and grow businesses across apps like Facebook, Instagram, WhatsApp, and Threads.',
      what_they_do: 'Global social platforms, developer frameworks (React, GraphQL), open-source AI models (Llama), and virtual reality systems.',
      sources: ['https://meta.com/about', 'https://meta.com/careers'],
    },
    role: {
      title: 'Staff Frontend Engineer',
      seniority: 'staff',
      responsibilities: [
        'Architect next-generation web client infrastructure utilizing React 19 and RSC',
        'Optimize billion-user client performance and INP metrics',
        'Direct architectural review of cross-surface design systems and micro-frontends',
      ],
      requirements: [
        { id: 'req_001', text: 'Expert knowledge of React internals, Concurrent Mode, fiber reconciliation, and RSC', kind: 'technical', priority: 'must' },
        { id: 'req_002', text: 'Demonstrated track record optimizing Core Web Vitals (INP, LCP, CLS) at massive scale', kind: 'technical', priority: 'must' },
        { id: 'req_003', text: 'Staff-level influence, leading multi-quarter frontend architectural roadmaps', kind: 'behavioural', priority: 'must' },
        { id: 'req_004', text: 'Experience with Relay, GraphQL, and Relay Normalized Cache', kind: 'technical', priority: 'nice' },
      ],
    },
    questions: {
      technical: [
        {
          id: 'q_tech_001',
          text: 'How does React 19 Concurrent Rendering prioritize high-priority user inputs over background transitions, and how does that prevent INP regressions?',
          difficulty: 3,
          requirement_ids: ['req_001', 'req_002'],
          answer_outline: 'Explain lanes model in React fiber, useTransition vs flushSync, time-slicing via MessageChannel, yielding to browser main thread.',
          source: 'generated',
        },
        {
          id: 'q_tech_002',
          text: 'How would you identify and fix long tasks caused by hydration overhead in large client applications?',
          difficulty: 3,
          requirement_ids: ['req_002'],
          answer_outline: 'Progressive hydration, selective hydration with Suspense, React Server Components eliminating JS payload, Chrome Performance Profiler.',
          source: 'generated',
        },
      ],
      behavioural: [
        {
          id: 'q_behav_001',
          text: 'Tell me about a time you rallied multiple cross-functional teams around a strict performance budget.',
          difficulty: 2,
          requirement_ids: ['req_003'],
          answer_outline: 'Define clear SLOs, automated CI PR size & bundle checks, attribution metrics, executive alignment, celebrating wins.',
          source: 'generated',
        },
      ],
      system_design: [
        {
          id: 'q_sd_001',
          text: 'Design an infinite scrolling feed component handling hundreds of thousands of dynamic media items without memory leaks or jank.',
          difficulty: 3,
          requirement_ids: ['req_001', 'req_002'],
          answer_outline: 'Virtualization (windowing), DOM node recycling, IntersectionObserver, offscreen image decoding, canvas/video memory reclamation.',
          source: 'generated',
        },
      ],
      company_fit: [
        {
          id: 'q_cf_001',
          text: 'How do you champion "Move Fast" while preventing catastrophic regressions in code deployed to hundreds of millions of users daily?',
          difficulty: 2,
          requirement_ids: ['req_003'],
          answer_outline: 'Comprehensive testing suites, automated canary deployment analysis (Gatekeeper), feature flags, kill switches, fast rollback pipelines.',
          source: 'generated',
        },
      ],
    },
    flashcards: [
      {
        id: 'fc_001',
        front: 'What causes Interaction to Next Paint (INP) degradations in React?',
        back: 'Heavy JavaScript execution on the main thread during input handling, large un-chunked render passes, or heavy DOM layout recalculations.',
        requirement_ids: ['req_002'],
        source: 'generated',
      },
      {
        id: 'fc_002',
        front: 'What is the difference between React Server Components (RSC) and SSR?',
        back: 'SSR renders HTML on the server and sends JS to hydrate the entire tree. RSC executes only on the server, sending a JSON-like component tree with zero client JS payload.',
        requirement_ids: ['req_001'],
        source: 'generated',
      },
      {
        id: 'fc_003',
        front: 'How does React Fiber enable interruptible rendering?',
        back: 'Fiber breaks the component tree into linked-list units of work. The scheduler can pause work, yield to the browser for user interactions or frame deadlines, then resume.',
        requirement_ids: ['req_001'],
        source: 'generated',
      },
      {
        id: 'fc_004',
        front: 'What is content-visibility: auto in modern CSS?',
        back: 'Tells the browser to skip rendering work (layout & paint) for offscreen elements until they approach the viewport, drastically speeding up initial page load.',
        requirement_ids: ['req_002'],
        source: 'generated',
      },
    ],
    schedule: [
      {
        day: 1,
        focus: 'React 19 Internals, Concurrent Mode & RSC',
        question_ids: ['q_tech_001', 'q_sd_001'],
        minutes: 60,
      },
      {
        day: 2,
        focus: 'Web Performance Optimization & INP Debugging',
        question_ids: ['q_tech_002'],
        minutes: 50,
      },
      {
        day: 3,
        focus: 'Staff Leadership, Meta Culture & Flashcard Review',
        question_ids: ['q_behav_001', 'q_cf_001'],
        minutes: 45,
      },
    ],
    coverage: {
      uncovered_requirement_ids: [],
      uncovered_must_requirements: [],
      covered_count: 3,
      passes: 1,
      coverage_passes: 1,
    },
  };

  const metaKit = await Kit.create({
    user_id: user._id,
    job_description: metaJd,
    company_url: metaUrl,
    days_available: 3,
    status: 'completed',
    fingerprint: metaFp,
    coverage_passes: 1,
    kit_data: metaKitData,
  });
  console.log(`📦 Seeded Kit 2 (Completed, 100% Coverage): Meta (ID: ${metaKit._id})`);

  // Seed Practice Sessions for Meta Kit
  await PracticeSession.create([
    {
      kit_id: metaKit._id,
      user_id: user._id,
      flashcard_id: 'fc_001',
      confidence: 5,
      practiced_at: new Date(now - 1000 * 60 * 30),
    },
    {
      kit_id: metaKit._id,
      user_id: user._id,
      flashcard_id: 'fc_002',
      confidence: 5,
      practiced_at: new Date(now - 1000 * 60 * 15),
    },
  ]);
  console.log('🃏 Seeded 2 practice sessions for Meta flashcards.');

  // ─── KIT 3: OpenAI (Partial - 75% Coverage, 1 Coverage Gap) ───────────
  const openaiJd = `AI Infrastructure Engineer at OpenAI.
Build high-performance distributed training and inference clusters, GPU orchestration with Kubernetes, and high-bandwidth InfiniBand networks.`;
  const openaiUrl = 'https://openai.com';
  const openaiFp = kitFingerprint(openaiJd, openaiUrl);

  const openaiKitData = {
    source: {
      jd: openaiJd,
      company_url: openaiUrl,
      days_available: 7,
    },
    company_brief: {
      name: 'OpenAI',
      summary: 'OpenAI is an AI research and deployment company aiming to ensure artificial general intelligence benefits all of humanity.',
      what_they_do: 'Large-scale frontier model training (GPT-4, o1, Sora), ChatGPT consumer product, enterprise API infrastructure.',
      sources: ['https://openai.com/about', 'https://openai.com/careers'],
    },
    role: {
      title: 'AI Infrastructure Engineer',
      seniority: 'senior',
      responsibilities: [
        'Scale Kubernetes clusters running tens of thousands of GPUs',
        'Optimize multi-node distributed training throughput and checkpointing frequency',
        'Diagnose complex InfiniBand and NCCL collective communication bottlenecks',
      ],
      requirements: [
        { id: 'req_001', text: 'Deep proficiency with Kubernetes cluster operations and GPU scheduling', kind: 'technical', priority: 'must' },
        { id: 'req_002', text: 'Experience optimizing large-scale distributed training (PyTorch, Megatron-LM)', kind: 'technical', priority: 'must' },
        { id: 'req_003', text: 'Fast fault detection, node eviction, and automated cluster self-healing', kind: 'technical', priority: 'must' },
        { id: 'req_004', text: 'Hands-on experience with NCCL ring-allreduce and InfiniBand network topology optimization', kind: 'technical', priority: 'must' },
        { id: 'req_005', text: 'Knowledge of CUDA kernel profiling and memory bandwidth saturation', kind: 'technical', priority: 'nice' },
      ],
    },
    questions: {
      technical: [
        {
          id: 'q_tech_001',
          text: 'How do you configure Kubernetes scheduler plugins to ensure gang-scheduling for distributed PyTorch training jobs?',
          difficulty: 3,
          requirement_ids: ['req_001'],
          answer_outline: 'Volcano / Coscheduling plugins, resource quotas, topology-aware scheduling, preventing partial pod deadlocks.',
          source: 'generated',
        },
        {
          id: 'q_tech_002',
          text: 'How do you optimize checkpoint writing for a 10,000 GPU cluster without starving compute or saturating storage bandwidth?',
          difficulty: 3,
          requirement_ids: ['req_002', 'req_003'],
          answer_outline: 'Asynchronous checkpointing, staging to local NVMe, tiering to distributed object store (Ceph/S3), delta checkpoints.',
          source: 'generated',
        },
      ],
      behavioural: [
        {
          id: 'q_behav_001',
          text: 'Describe an incident where hardware failure halted a multi-million-dollar training run. How did you react?',
          difficulty: 2,
          requirement_ids: ['req_003'],
          answer_outline: 'Rapid detection, automatic node cordoning, resume from last good checkpoint, post-incident hardware burn-in test.',
          source: 'generated',
        },
      ],
      system_design: [
        {
          id: 'q_sd_001',
          text: 'Design an automated health check and remediation daemon that tests GPU ECC errors and InfiniBand bandwidth before joining a node to the cluster.',
          difficulty: 3,
          requirement_ids: ['req_001', 'req_003'],
          answer_outline: 'Pre-flight health daemon, nvidia-smi checks, NCCL all-reduce loopback tests, node taint/drain lifecycle.',
          source: 'generated',
        },
      ],
      company_fit: [
        {
          id: 'q_cf_001',
          text: 'How do you approach AI safety and security when managing infrastructure with privileged access to frontier model weights?',
          difficulty: 2,
          requirement_ids: ['req_001'],
          answer_outline: 'Zero-trust architecture, hardware security modules (HSM), KMS encryption in transit/at rest, strict ephemeral credentials.',
          source: 'generated',
        },
      ],
    },
    flashcards: [
      {
        id: 'fc_001',
        front: 'What is Ring AllReduce in distributed ML training?',
        back: 'A communication algorithm where each GPU sends and receives data in a logical ring, minimizing network contention and keeping communication time constant regardless of worker count.',
        requirement_ids: ['req_002'],
        source: 'generated',
      },
      {
        id: 'fc_002',
        front: 'What is GPUDirect RDMA?',
        back: 'Enables network devices (like InfiniBand adapters) to directly access GPU memory over PCIe without copying data to host CPU system memory, reducing latency and CPU overhead.',
        requirement_ids: ['req_001'],
        source: 'generated',
      },
      {
        id: 'fc_003',
        front: 'Explain Gradient Accumulation in training large batch sizes.',
        back: 'Splits a large batch into micro-batches, computing gradients across steps and only executing optimizer update after N steps, fitting models in limited GPU VRAM.',
        requirement_ids: ['req_002'],
        source: 'generated',
      },
    ],
    schedule: [
      { day: 1, focus: 'Kubernetes GPU Scheduling & Gang Plugins', question_ids: ['q_tech_001'], minutes: 50 },
      { day: 2, focus: 'Distributed Checkpointing & Training Scaling', question_ids: ['q_tech_002'], minutes: 50 },
      { day: 3, focus: 'Automated Hardware Diagnostics & Eviction', question_ids: ['q_sd_001'], minutes: 50 },
      { day: 4, focus: 'High-Impact Outage Management & STAR Prep', question_ids: ['q_behav_001'], minutes: 40 },
      { day: 5, focus: 'Frontier AI Security & Safety Architecture', question_ids: ['q_cf_001'], minutes: 40 },
      { day: 6, focus: 'InfiniBand Network Optimization (Coverage Gap)', question_ids: [], minutes: 45 },
      { day: 7, focus: 'Comprehensive Flashcards & Final Mock Interview', question_ids: ['q_tech_001', 'q_sd_001'], minutes: 60 },
    ],
    coverage: {
      uncovered_requirement_ids: ['req_004'],
      uncovered_must_requirements: [
        {
          id: 'req_004',
          text: 'Hands-on experience with NCCL ring-allreduce and InfiniBand network topology optimization',
          kind: 'technical',
          priority: 'must',
        },
      ],
      covered_count: 3,
      passes: 1,
      coverage_passes: 1,
    },
  };

  const openaiKit = await Kit.create({
    user_id: user._id,
    job_description: openaiJd,
    company_url: openaiUrl,
    days_available: 7,
    status: 'partial',
    fingerprint: openaiFp,
    coverage_passes: 1,
    kit_data: openaiKitData,
  });
  console.log(`📦 Seeded Kit 3 (Partial, 75% Coverage with 1 Gap): OpenAI (ID: ${openaiKit._id})`);

  // ─── KIT 4: Google Cloud (In Progress / Generating) ──────────────────
  const googleJd = `Principal Solutions Architect at Google Cloud Platform.
Enterprise cloud modernization, BigQuery data pipelines, hybrid cloud migration, zero-trust infrastructure.`;
  const googleUrl = 'https://cloud.google.com';
  const googleFp = kitFingerprint(googleJd, googleUrl);

  const googleKit = await Kit.create({
    user_id: user._id,
    job_description: googleJd,
    company_url: googleUrl,
    days_available: 10,
    status: 'generating',
    fingerprint: googleFp,
    coverage_passes: 0,
    kit_data: null,
  });
  console.log(`📦 Seeded Kit 4 (In Progress / Generating): Google Cloud (ID: ${googleKit._id})`);

  console.log('\n======================================================');
  console.log('🎉 SEEDING COMPLETE! You can now manually test everything:');
  console.log('======================================================');
  console.log(`📧 Email:    ${demoEmail}`);
  console.log(`🔑 Password: ${demoPassword}`);
  console.log('------------------------------------------------------');
  console.log('📊 Seeded Data Summary:');
  console.log('  • 4 Interview Kits (Stripe, Meta, OpenAI, Google Cloud)');
  console.log('  • Realistic Statuses: Completed, Ready, In Progress');
  console.log('  • 1 Coverage Gap on OpenAI (demonstrates gap detection)');
  console.log('  • 6 Practice Sessions with confidence ratings for flashcards');
  console.log('  • Full Schedules with daily minute & question allocations');
  console.log('======================================================\n');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
