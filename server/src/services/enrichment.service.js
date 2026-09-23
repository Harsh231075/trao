import axios from 'axios';

/**
 * Fetch company enrichment data (logo, description, tech stack tags, socials) from Brandfetch API.
 * Falls back gracefully if BRANDFETCH_API_KEY is not configured or request fails.
 *
 * @param {string} domain - e.g. "stripe.com" or "google.com"
 * @returns {Promise<object>}
 */
export async function getCompanyEnrichment(domain) {
  const fallback = {
    domain: '',
    name: '',
    logo: null,
    description: null,
    claimed: false,
    links: [],
    techStack: [],
  };

  if (!domain) return fallback;

  // Clean domain string
  let cleanDomain = domain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  fallback.domain = cleanDomain;
  fallback.name = cleanDomain.split('.')[0].toUpperCase();

  const apiKey = process.env.BRANDFETCH_API_KEY;
  if (!apiKey) {
    // Basic logo fallback using Google Favicon service
    fallback.logo = `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128`;
    return fallback;
  }

  try {
    const response = await axios.get(`https://api.brandfetch.io/v2/brands/${cleanDomain}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      timeout: 3000,
    });

    const data = response.data;
    if (!data) return fallback;

    const logoObj = data.logos?.find(l => l.type === 'logo' || l.type === 'icon') || data.logos?.[0];
    const logoUrl = logoObj?.formats?.[0]?.src || `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128`;

    return {
      domain: cleanDomain,
      name: data.name || cleanDomain.split('.')[0].toUpperCase(),
      logo: logoUrl,
      description: data.description || null,
      claimed: data.claimed || false,
      links: data.links?.map(l => ({ name: l.name, url: l.url })) || [],
      techStack: data.tags || [],
    };
  } catch (err) {
    console.warn(`[Enrichment] Brandfetch lookup for ${cleanDomain} failed: ${err.message}`);
    fallback.logo = `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128`;
    return fallback;
  }
}
