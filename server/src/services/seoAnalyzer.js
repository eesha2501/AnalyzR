const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();  // Load .env

const GOOGLE_API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY;

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

async function getPageSpeed(url, strategy) {
  if (!GOOGLE_API_KEY) throw new Error('Missing Google PageSpeed API key in .env');

  const endpoint = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const params = {
    url,
    strategy,
    key: GOOGLE_API_KEY,
  };

  const { data } = await axios.get(endpoint, { params });
  return {
    strategy,
    lighthouseScore: data.lighthouseResult?.categories?.performance?.score ?? null,
    audits: data.lighthouseResult?.audits ?? {},
  };
}

function getSafetyReport(url) {
  const parsed = new URL(url);
  const isHttps = parsed.protocol === 'https:';
  const blocklist = ['example-bad.com', 'phishingsite.org', 'malware-test.com'];
  const hostname = parsed.hostname.replace(/^www\./, '');
  const blocklisted = blocklist.includes(hostname);

  return {
    safe: isHttps && !blocklisted,
    https: isHttps,
    blocklisted
  };
}

function detectTechnologies($, html) {
  const technologies = [];
  if ($('meta[name="generator"]').attr('content')?.toLowerCase().includes('wordpress')) {
    technologies.push('WordPress');
  }
  if (/cdn\.shopify\.com/.test(html)) technologies.push('Shopify');
  if (/www\.googletagmanager\.com|google-analytics\.com/.test(html)) technologies.push('Google Analytics');
  if (/jquery/i.test(html)) technologies.push('jQuery');
  if (/bootstrap/i.test(html)) technologies.push('Bootstrap');
  if (/fonts\.googleapis\.com/.test(html)) technologies.push('Google Fonts');
  if (/font-awesome/i.test(html)) technologies.push('Font Awesome');
  return technologies;
}

async function analyzeSEO(url) {
  if (!isValidUrl(url)) {
    throw new Error('Invalid URL format');
  }

  try {
    // Fetch and parse HTML
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Get PageSpeed data (mobile and desktop)
    let mobilePerformance = {};
    let desktopPerformance = {};
    try {
      [mobilePerformance, desktopPerformance] = await Promise.all([
        getPageSpeed(url, 'mobile'),
        getPageSpeed(url, 'desktop')
      ]);
    } catch (psError) {
      console.error('PageSpeed fetch error:', psError.message);
    }

    // Other analyses
    const safety = getSafetyReport(url);
    const technologies = detectTechnologies($, html);
    const lang = $('html').attr('lang') || '';

    const titleText = $('title').text().trim();
    const descriptionText = $('meta[name="description"]').attr('content') || '';
    const robots = $('meta[name="robots"]').attr('content') || '';
    const viewport = $('meta[name="viewport"]').attr('content') || '';
    const canonical = $('link[rel="canonical"]').attr('href') || '';

    const h1 = [];
    $('h1').each((_, el) => h1.push($(el).text().trim()));
    const h2 = [];
    $('h2').each((_, el) => h2.push($(el).text().trim()));
    const h3 = [];
    $('h3').each((_, el) => h3.push($(el).text().trim()));

    const bodyText = $('body').text().replace(/\s+/g, ' ').toLowerCase();
    const words = bodyText.match(/\b\w+\b/g) || [];
    const wordCount = words.length;

    const freq = {};
    words.forEach(word => {
      if (word.length > 3) freq[word] = (freq[word] || 0) + 1;
    });
    const topKeywords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);

    const openGraph = {};
    $('meta[property^="og:"]').each((_, el) => {
      const property = $(el).attr('property');
      const content = $(el).attr('content');
      if (property && content) openGraph[property] = content;
    });

    const twitterCard = {};
    $('meta[name^="twitter:"]').each((_, el) => {
      const name = $(el).attr('name');
      const content = $(el).attr('content');
      if (name && content) twitterCard[name] = content;
    });

    const jsonLdScripts = [];
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const json = JSON.parse($(el).html());
        jsonLdScripts.push(json);
      } catch (e) { }
    });

    const imagesWithoutAlt = $('img').filter((_, el) => !$(el).attr('alt') || $(el).attr('alt').trim() === '').length;
    const linksWithoutText = $('a').filter((_, el) => !$(el).text().trim()).length;
    const bestPracticeHints = [];
    if (imagesWithoutAlt > 0) bestPracticeHints.push(`${imagesWithoutAlt} images missing alt attributes.`);
    if (linksWithoutText > 0) bestPracticeHints.push(`${linksWithoutText} links without descriptive text.`);
    if (!lang) bestPracticeHints.push('HTML tag is missing lang attribute.');

    const seoIssues = [];
    if (!titleText) seoIssues.push('Missing <title> tag.');
    else if (titleText.length < 10) seoIssues.push('Title is too short.');
    else if (titleText.length > 70) seoIssues.push('Title is too long.');

    if (!descriptionText) seoIssues.push('Missing meta description.');
    else if (descriptionText.length < 50) seoIssues.push('Meta description is too short.');
    else if (descriptionText.length > 160) seoIssues.push('Meta description is too long.');

    if (!canonical) seoIssues.push('Missing canonical link.');
    if (h1.length === 0) seoIssues.push('No <h1> found.');
    else if (h1.length > 1) seoIssues.push('Multiple <h1> tags found.');
    if (wordCount < 300) seoIssues.push('Low word count. Add more content.');
    if (robots.toLowerCase().includes('noindex')) seoIssues.push('Page is set to noindex.');

    const improvementSuggestions = [];
    if (seoIssues.length > 0) {
      improvementSuggestions.push({
        area: "SEO",
        reason: seoIssues.join(' '),
        tools: ["Yoast SEO", "Ahrefs", "Screaming Frog"]
      });
    }
    if (bestPracticeHints.length > 0) {
      improvementSuggestions.push({
        area: "Accessibility",
        reason: bestPracticeHints.join(' '),
        tools: ["axe DevTools", "Wave", "Lighthouse"]
      });
    }
    if (wordCount < 300) {
      improvementSuggestions.push({
        area: "Content",
        reason: "Low word count indicates thin content.",
        tools: ["Grammarly", "Hemingway Editor"]
      });
    }
    if (!viewport) {
      improvementSuggestions.push({
        area: "UI/UX",
        reason: "Missing viewport meta tag. Site may not be mobile-friendly.",
        tools: ["Figma", "Adobe XD"]
      });
    }

    return {
      safety,
      technologies,
      lang,
      title: { text: titleText, length: titleText.length },
      meta: { description: { text: descriptionText, length: descriptionText.length }, robots, viewport, canonical },
      headings: { h1Count: h1.length, h1, h2, h3 },
      textAnalysis: { wordCount, topKeywords },
      openGraph,
      twitterCard,
      jsonLd: jsonLdScripts,
      accessibility: { imagesWithoutAlt, linksWithoutText, bestPracticeHints },
      seoIssues,
      improvementSuggestions,
      performance: {
        mobile: mobilePerformance,
        desktop: desktopPerformance
      }
    };

  } catch (error) {
    console.error('Error analyzing SEO:', error.message);
    throw error;
  }
}

module.exports = {
  analyzeSEO
};
