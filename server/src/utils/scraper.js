import * as cheerio from 'cheerio';
import { validateUrl } from './url-validator.js';

const MAX_RESPONSE_SIZE = 2 * 1024 * 1024; // 2MB
const FETCH_TIMEOUT = 10000; // 10s
const ALLOWED_CONTENT_TYPES = ['text/html', 'text/plain', 'application/xhtml+xml'];

/**
 * Safely fetch and parse a URL, returning clean text content.
 * All fetched content is treated strictly as DATA, never as instructions.
 */
export async function safeFetch(urlString) {
  const validation = validateUrl(urlString);
  if (!validation.valid) {
    return { success: false, error: validation.reason, url: urlString };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    const response = await fetch(urlString, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'TraoBot/1.0 (Interview Research)',
        'Accept': 'text/html,text/plain',
      },
      redirect: 'follow',
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}`, url: urlString, status: response.status };
    }

    // Validate content type
    const contentType = response.headers.get('content-type') || '';
    const isAllowed = ALLOWED_CONTENT_TYPES.some(t => contentType.includes(t));
    if (!isAllowed) {
      return { success: false, error: `Unsupported content type: ${contentType}`, url: urlString };
    }

    // Size guard
    const contentLength = parseInt(response.headers.get('content-length') || '0', 10);
    if (contentLength > MAX_RESPONSE_SIZE) {
      return { success: false, error: 'Response too large', url: urlString };
    }

    const html = await response.text();
    if (html.length > MAX_RESPONSE_SIZE) {
      return { success: false, error: 'Response too large', url: urlString };
    }

    // Parse and extract clean text
    const $ = cheerio.load(html);
    $('script, style, noscript, iframe, svg').remove();

    const title = $('title').text().trim();
    const metaDesc = $('meta[name="description"]').attr('content') || '';
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 8000);

    // Extract relative links for further crawling
    const links = [];
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
        links.push(href);
      }
    });

    return {
      success: true,
      url: urlString,
      title,
      metaDescription: metaDesc,
      text: bodyText,
      links: links.slice(0, 50),
    };
  } catch (err) {
    const errorMsg = err.name === 'AbortError' ? 'Request timed out' : err.message;
    return { success: false, error: errorMsg, url: urlString };
  }
}

/**
 * Follow relevant relative links from a base URL
 */
export async function crawlRelatedPages(baseUrl, links, maxPages = 5) {
  const relevantPatterns = [/about/i, /career/i, /job/i, /hire/i, /hiring/i, /team/i, /culture/i, /engineering/i, /values/i];

  const relevantLinks = links
    .filter(link => relevantPatterns.some(p => p.test(link)))
    .slice(0, maxPages);

  const results = [];
  for (const link of relevantLinks) {
    try {
      const fullUrl = new URL(link, baseUrl).href;
      const result = await safeFetch(fullUrl);
      if (result.success) {
        results.push(result);
      }
    } catch {
      // Skip invalid relative URLs
    }
  }
  return results;
}
