import * as cheerio from 'cheerio';
import { Impit } from 'impit';

const USERNAME = 'rubylu';
// Match browser TLS/HTTP behavior as well as headers. No login cookies are used.
const client = new Impit({ browser: 'chrome151', timeout: 8000 });

async function fetchPage(path) {
  const response = await client.fetch(`https://letterboxd.com/${path}`, {
    signal: AbortSignal.timeout(8000)
  });

  if (response.headers.get('cf-mitigated') === 'challenge') {
    throw new Error('Letterboxd returned a Cloudflare challenge');
  }
  if (!response.ok) throw new Error(`Letterboxd returned ${response.status}`);

  const html = await response.text();
  if (html.includes('<title>Just a moment...</title>')) {
    throw new Error('Letterboxd returned a Cloudflare challenge');
  }
  return html;
}

function extractCount(value) {
  const match = value?.match(/[\d,]+/);
  return match ? Number.parseInt(match[0].replaceAll(',', ''), 10) : null;
}

export async function fetchLetterboxdCount(field, year) {
  const path = field === 'count'
    ? `${USERNAME}/films/`
    // Use the destination of the profile's "This year" link.
    : `${USERNAME}/diary/for/${year}/`;
  const $ = cheerio.load(await fetchPage(path));
  let count;

  if (field === 'count') {
    const heading = $('#content-nav .section-heading');
    const tooltip = heading.find('.tooltip');
    count = extractCount(tooltip.attr('title'))
      ?? extractCount(tooltip.attr('data-original-title'))
      ?? extractCount(heading.text());
  } else {
    const text = $('.filtered-message .ui-block-heading').text().replace(/\s+/g, ' ').trim();
    const match = text.match(new RegExp(`logged ([\\d,]+) entr(?:y|ies)(?: for films)? during ${year}\\b`, 'i'));
    count = match ? extractCount(match[1]) : null;
  }

  if (!Number.isSafeInteger(count) || count < 0 || (field === 'count' && count === 0)) {
    throw new Error(`Valid ${field} was missing from the Letterboxd response`);
  }
  return count;
}
