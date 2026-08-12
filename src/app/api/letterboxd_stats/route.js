const USERNAME = 'rubylu';
const FALLBACK_COUNT = '789';
const FALLBACK_YEARLY_COUNT = '102';

const REQUEST_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9'
};

async function fetchPage(path) {
  try {
    const response = await fetch(`https://letterboxd.com/${path}`, {
      headers: REQUEST_HEADERS,
      next: { revalidate: 3600 }
    });

    if (!response.ok) return null;

    const html = await response.text();
    return html.includes('<title>Just a moment...</title>') ? null : html;
  } catch (error) {
    return null;
  }
}

function extractStat(html, label) {
  if (!html) return null;

  const pattern = new RegExp(
    `<span class="value">([\\d,]+)</span>\\s*<span class="definition[^"]*">\\s*${label}\\s*</span>`,
    'i'
  );
  const match = html.match(pattern);
  return match ? match[1].replace(/,/g, '') : null;
}

function extractFilmsTooltip(html) {
  if (!html) return null;

  const match = html.match(/title="([\d,]+)(?:&nbsp;|\s)films"/i);
  return match ? match[1].replace(/,/g, '') : null;
}

export async function GET() {
  const year = new Date().getFullYear();

  const [statsPage, filmsPage, profilePage, yearPage] = await Promise.all([
    fetchPage(`${USERNAME}/stats/`),
    fetchPage(`${USERNAME}/films/`),
    fetchPage(`${USERNAME}/`),
    fetchPage(`${USERNAME}/year/${year}/`)
  ]);

  const count =
    extractStat(statsPage, 'Films') ||
    extractFilmsTooltip(filmsPage) ||
    extractStat(profilePage, 'Films') ||
    FALLBACK_COUNT;

  const yearlyCount =
    extractStat(profilePage, 'This(?:&nbsp;|\\s)+year') ||
    extractStat(yearPage, 'Films') ||
    FALLBACK_YEARLY_COUNT;

  return new Response(JSON.stringify({ count, yearlyCount }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
