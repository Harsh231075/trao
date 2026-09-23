import { safeFetch, crawlRelatedPages } from '../../utils/scraper.js';
import { getCompanyEnrichment } from '../enrichment.service.js';
import { searchCompanyIntelligence } from '../search.service.js';

/**
 * Deep Multi-Stream Company Research
 * 1. Web scraper for target company_url (Assignment standard)
 * 2. Brandfetch enrichment for verified logos, brand metadata & tech tags
 * 3. Search API for real-time engineering blog & candidate interview signals
 */
export async function researchCompany(companyUrl) {
  const result = {
    pages: [],
    sources: [],
    aboutInfo: '',
    careersInfo: '',
    enrichment: null,
    webIntelligence: [],
    errors: [],
  };

  let domain = '';
  let companyName = 'company';
  try {
    domain = new URL(companyUrl).hostname.replace(/^www\./, '');
    companyName = domain.split('.')[0];
  } catch {
    domain = companyUrl;
  }

  // Execute Enrichment, Web Intelligence Search, and Main Scraping in Parallel
  const [enrichmentRes, intelligenceRes, mainPageRes] = await Promise.allSettled([
    getCompanyEnrichment(domain),
    searchCompanyIntelligence(companyName, domain),
    safeFetch(companyUrl),
  ]);

  if (enrichmentRes.status === 'fulfilled') {
    result.enrichment = enrichmentRes.value;
  }

  if (intelligenceRes.status === 'fulfilled') {
    result.webIntelligence = intelligenceRes.value || [];
    result.webIntelligence.forEach(src => {
      if (src.url) result.sources.push(src.url);
    });
  }

  const mainPage = mainPageRes.status === 'fulfilled' ? mainPageRes.value : { success: false };
  if (mainPage.success) {
    result.pages.push(mainPage);
    result.sources.push(companyUrl);

    // Follow relevant links (about, careers, team, engineering)
    try {
      const relatedPages = await crawlRelatedPages(companyUrl, mainPage.links, 4);
      for (const page of relatedPages) {
        result.pages.push(page);
        result.sources.push(page.url);

        if (/about/i.test(page.url)) {
          result.aboutInfo += ' ' + page.text;
        }
        if (/career|job|hire|hiring/i.test(page.url)) {
          result.careersInfo += ' ' + page.text;
        }
      }
    } catch (err) {
      console.warn(`[Retrieval] Related page crawl warning: ${err.message}`);
    }
  } else {
    result.errors.push({ url: companyUrl, error: mainPage.error || 'Direct scrape timeout/failed' });
  }

  // Deduplicate sources
  result.sources = Array.from(new Set(result.sources));

  return result;
}

/**
 * Legacy wrapper for interview discussion search
 */
export async function researchInterviews(companyName) {
  try {
    const intelligence = await searchCompanyIntelligence(companyName);
    const snippets = intelligence.map(i => `[${i.title}]: ${i.snippet}`).join('\n\n');
    return {
      found: intelligence.length > 0,
      text: snippets || 'No public interview discussion found.',
      insights: intelligence,
    };
  } catch (err) {
    return { found: false, text: 'No interview data available.', insights: [] };
  }
}

/**
 * Compile all research into a structured text block for LLM context.
 */
export function compileResearchContext(companyResearch, interviewResearch) {
  let context = '';

  if (companyResearch.enrichment) {
    const e = companyResearch.enrichment;
    context += `VERIFIED BRAND & TECH METADATA:\n`;
    context += `Name: ${e.name}\nDomain: ${e.domain}\nDescription: ${e.description || 'N/A'}\n`;
    if (e.techStack && e.techStack.length > 0) {
      context += `Detected Tech Tags: ${e.techStack.join(', ')}\n`;
    }
    context += '\n';
  }

  if (companyResearch.webIntelligence && companyResearch.webIntelligence.length > 0) {
    context += `REAL-TIME WEB INTELLIGENCE & CITATIONS:\n`;
    for (const item of companyResearch.webIntelligence) {
      context += `[${item.category}] ${item.title} (${item.url}):\n${item.snippet}\n\n`;
    }
  }

  if (companyResearch.pages.length > 0) {
    context += 'COMPANY WEBSITE DIRECT SCRAPE:\n';
    for (const page of companyResearch.pages) {
      context += `[${page.title || page.url}]: ${page.text?.slice(0, 1200) || 'No content'}\n\n`;
    }
  }

  if (companyResearch.aboutInfo) {
    context += `ABOUT THE COMPANY:\n${companyResearch.aboutInfo.slice(0, 1200)}\n\n`;
  }

  if (companyResearch.careersInfo) {
    context += `CAREERS / HIRING INFO:\n${companyResearch.careersInfo.slice(0, 1200)}\n\n`;
  }

  if (interviewResearch.found) {
    context += `PUBLIC INTERVIEW TRENDS & INSIGHTS:\n${interviewResearch.text.slice(0, 2000)}\n\n`;
  }

  return context;
}
