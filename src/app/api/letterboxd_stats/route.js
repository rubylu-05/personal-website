import * as cheerio from 'cheerio';

const USERNAME = 'rubylu';

const REQUEST_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9'
};

async function fetchPage(path) {
  const response = await fetch(`https://letterboxd.com/${path}`, {
    headers: REQUEST_HEADERS,
    next: { revalidate: 3600 }
  });

  if (!response.ok) throw new Error(`Letterboxd returned ${response.status}`);

  const html = await response.text();

  if (html.includes('<title>Just a moment...</title>')) {
    throw new Error('Letterboxd returned a challenge page');
  }

  return html;
}

function extractCount(value) {
  const match = value?.match(/[\d,]+/);
  return match ? Number.parseInt(match[0].replaceAll(',', ''), 10) : null;
}

function extractFilmCount(html) {
  const $ = cheerio.load(html);
  return extractCount($('#content-nav .section-heading .tooltip').attr('title'));
}

function extractYearlyCount(html, year) {
  const $ = cheerio.load(html);
  const text = $('.filtered-message .ui-block-heading').text().replace(/\s+/g, ' ').trim();
  const match = text.match(new RegExp(`logged ([\\d,]+) entries? for films during ${year}`));
  return match ? Number.parseInt(match[1].replaceAll(',', ''), 10) : null;
}

export async function GET() {
  try {
    const year = new Date().getFullYear();
    const [filmsPage, yearPage] = await Promise.all([
      fetchPage(`${USERNAME}/films/`),
      fetchPage(`${USERNAME}/diary/films/for/${year}/`)
    ]);

    const count = extractFilmCount(filmsPage);
    const yearlyCount = extractYearlyCount(yearPage, year);

    if (count === null || yearlyCount === null) {
      throw new Error('Letterboxd counts were missing from the response');
    }

    return Response.json({ count, yearlyCount });
  } catch {
    return Response.json({ error: 'Failed to fetch Letterboxd stats' }, { status: 502 });
  }
}
