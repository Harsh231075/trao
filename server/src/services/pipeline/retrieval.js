import { safeFetch, crawlRelatedPages } from '../../utils/scraper.js';

/**
 * Research a company by scraping its website.
 * A failed source does NOT fail the kit.
 */
export async function researchCompany(companyUrl) {
  const result = {
    pages: [],
    sources: [],
    aboutInfo: '',
    careersInfo: '',
    errors: [],
  };

  // 1. Fetch main page
  const mainPage = await safeFetch(companyUrl);
  if (!mainPage.success) {
    result.errors.push({ url: companyUrl, error: mainPage.error });
    return result;
  }

  result.pages.push(mainPage);
  result.sources.push(companyUrl);

  // 2. Follow relevant links (about, careers, team, engineering)
  const relatedPages = await crawlRelatedPages(companyUrl, mainPage.links, 5);
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

  return result;
}

/**
 * Search for public interview experience/discussion about a company.
 * Uses DuckDuckGo HTML search as fallback.
 * If nothing found, records that honestly.
 */
export async function researchInterviews(companyName) {
  const queries = [
    `${companyName} software engineer interview experience`,
    `${companyName} interview process glassdoor`,
  ];

  const insights = [];

  for (const query of queries) {
    try {
      const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
      const result = await safeFetch(searchUrl);

      if (result.success && result.text) {
        // Extract relevant snippets (treat as DATA only)
        const snippet = result.text.slice(0, 2000);
        insights.push({ query, snippet, source: searchUrl });
      }
    } catch (err) {
      // Search failed — not a kit failure
      insights.push({ query, snippet: '', source: '', error: err.message });
    }
  }

  if (insights.every(i => !i.snippet)) {
    return { found: false, text: 'No public interview discussion found for this company.', insights };
  }

  const combinedText = insights
    .filter(i => i.snippet)
    .map(i => i.snippet)
    .join('\n\n')
    .slice(0, 4000);

  return { found: true, text: combinedText, insights };
}

/**
 * Compile all research into a single text block for LLM context.
 */
export function compileResearchContext(companyResearch, interviewResearch) {
  let context = '';

  if (companyResearch.pages.length > 0) {
    context += 'COMPANY WEBSITE RESEARCH:\n';
    for (const page of companyResearch.pages) {
      context += `[${page.title || page.url}]: ${page.text?.slice(0, 1500) || 'No content'}\n\n`;
    }
  }

  if (companyResearch.aboutInfo) {
    context += `ABOUT THE COMPANY:\n${companyResearch.aboutInfo.slice(0, 1500)}\n\n`;
  }

  if (companyResearch.careersInfo) {
    context += `CAREERS / HIRING INFO:\n${companyResearch.careersInfo.slice(0, 1500)}\n\n`;
  }

  if (interviewResearch.found) {
    context += `PUBLIC INTERVIEW INSIGHTS:\n${interviewResearch.text.slice(0, 2000)}\n\n`;
  } else {
    context += 'PUBLIC INTERVIEW INSIGHTS:\nNo public interview discussion found.\n\n';
  }

  return context;
}
