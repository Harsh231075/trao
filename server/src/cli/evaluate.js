#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { runPipeline } from '../services/pipeline/orchestrator.js';

function parseArgs() {
  const args = process.argv.slice(2);
  let inputFile = null;
  let outputFile = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) {
      inputFile = args[i + 1];
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      outputFile = args[i + 1];
      i++;
    }
  }

  if (!inputFile || !outputFile) {
    console.error('Usage: npm run evaluate -- --input <cases.json> --output <kits.json>');
    process.exit(1);
  }

  return { inputFile, outputFile };
}

async function main() {
  const { inputFile, outputFile } = parseArgs();
  const inputPath = path.resolve(process.cwd(), inputFile);
  const outputPath = path.resolve(process.cwd(), outputFile);

  console.log(`[Evaluate CLI] Reading input from: ${inputPath}`);

  let rawData;
  try {
    rawData = await fs.readFile(inputPath, 'utf8');
  } catch (err) {
    console.error(`[Evaluate CLI] Failed to read input file: ${err.message}`);
    process.exit(1);
  }

  let cases;
  try {
    cases = JSON.parse(rawData);
    if (!Array.isArray(cases)) {
      throw new Error('Input file must contain a JSON array of cases');
    }
  } catch (err) {
    console.error(`[Evaluate CLI] Invalid JSON input: ${err.message}`);
    process.exit(1);
  }

  console.log(`[Evaluate CLI] Found ${cases.length} evaluation case(s) to process.`);

  const results = [];

  for (let idx = 0; idx < cases.length; idx++) {
    const item = cases[idx];
    const caseId = item.id || `case_${String(idx + 1).padStart(3, '0')}`;
    const jd = item.jd || item.job_description;
    const companyUrl = item.company_url || item.url;
    const daysAvailable = parseInt(item.days || item.days_available || 5, 10);

    console.log(`\n[Evaluate CLI] Processing [${idx + 1}/${cases.length}] ID: ${caseId} (${companyUrl})...`);

    if (!jd || !companyUrl) {
      console.warn(`[Evaluate CLI] Case ${caseId} missing required fields (jd or company_url).`);
      results.push({
        id: caseId,
        status: 'failed',
        kit: null,
        error: 'Missing required fields: job description (jd) or company URL (company_url)',
      });
      continue;
    }

    try {
      const kitData = await runPipeline(
        {
          jd,
          company_url: companyUrl,
          days_available: daysAvailable,
        },
        null // null kitId indicates CLI batch evaluation (no DB write required)
      );

      console.log(`[Evaluate CLI]  Case ${caseId} generated successfully.`);
      results.push({
        id: caseId,
        status: 'ok',
        kit: kitData,
        error: null,
      });
    } catch (err) {
      console.error(`[Evaluate CLI] ❌ Case ${caseId} failed: ${err.message}`);
      results.push({
        id: caseId,
        status: 'failed',
        kit: null,
        error: err.message,
      });
    }
  }

  const outputPayload = {
    version: '1.0',
    generated_at: new Date().toISOString(),
    kits: results,
  };

  try {
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(outputPayload, null, 2), 'utf8');
    console.log(`\n[Evaluate CLI]  Completed! Results written to: ${outputPath}`);
    console.log(`[Evaluate CLI] Summary: Total: ${results.length}, Success: ${results.filter(r => r.status === 'ok').length}, Failed: ${results.filter(r => r.status === 'failed').length}`);
  } catch (err) {
    console.error(`[Evaluate CLI] Failed to write output file: ${err.message}`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('[Evaluate CLI] Unhandled error:', err);
  process.exit(1);
});
