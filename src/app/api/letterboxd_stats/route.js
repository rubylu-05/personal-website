import { unstable_cache } from 'next/cache';
import { withLetterboxdFallbacks } from '../../../lib/letterboxd.js';
import { fetchLetterboxdCount } from '../../../lib/letterboxd-server.js';

export const runtime = 'nodejs';

// Cache successful counts separately. Failed refreshes retain the last success;
// fallback numbers never enter the cache. The year is part of the cache key.
const getLiveCount = unstable_cache(
  fetchLetterboxdCount,
  ['letterboxd-live-counts-v2'],
  { revalidate: 3600 }
);

export async function GET() {
  const year = new Date().getFullYear();
  const fields = ['count', 'yearlyCount'];
  const results = await Promise.allSettled(fields.map((field) => getLiveCount(field, year)));
  const stats = {};
  const sources = {};

  results.forEach((result, index) => {
    const field = fields[index];
    if (result.status === 'fulfilled') {
      stats[field] = result.value;
      sources[field] = 'letterboxd';
    } else {
      sources[field] = 'fallback';
      console.warn(`Failed to fetch Letterboxd ${field}:`, result.reason?.message);
    }
  });

  return Response.json({ ...withLetterboxdFallbacks(stats), sources, year });
}
