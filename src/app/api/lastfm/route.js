export const dynamic = 'force-dynamic';

export async function GET() {
  const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
  const username = 'ruby-lu';

  try {
    const nowPlayingResponse = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
    );

    if (!nowPlayingResponse.ok) {
      throw new Error('Failed to fetch now playing data');
    }

    const nowPlayingData = await nowPlayingResponse.json();
    const recentTrack = nowPlayingData.recenttracks?.track?.[0];
    const isNowPlaying = recentTrack && recentTrack['@attr']?.nowplaying === "true";

    return Response.json({
      nowplaying: isNowPlaying,
      ...(isNowPlaying ? {
        artist: recentTrack.artist,
        name: recentTrack.name,
        album: recentTrack.album,
        image: recentTrack.image?.find(img => img.size === "large")?.["#text"] ||
          recentTrack.image?.find(img => img.size === "medium")?.["#text"] ||
          recentTrack.image?.[0]?.["#text"] || null
      } : {})
    });

  } catch (error) {
    return Response.json({
      nowplaying: false,
      error: error.message
    }, {
      status: 500
    });
  }
}