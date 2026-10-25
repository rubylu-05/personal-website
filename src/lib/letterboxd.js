export const LETTERBOXD_FALLBACK_STATS = {
  count: 800,
  yearlyCount: 130
};

export function withLetterboxdFallbacks(stats) {
  return {
    count: Number.isSafeInteger(stats?.count) && stats.count > 0
      ? stats.count
      : LETTERBOXD_FALLBACK_STATS.count,
    // A confirmed zero is valid at the start of a new year.
    yearlyCount: Number.isSafeInteger(stats?.yearlyCount) && stats.yearlyCount >= 0
      ? stats.yearlyCount
      : LETTERBOXD_FALLBACK_STATS.yearlyCount
  };
}
