export const dynamic = 'force-dynamic';

export async function GET() {
  const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
  const username = 'ruby-lu';

  try {
    const [nowPlayingResponse, topArtistsResponse] = await Promise.all([
      fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${LASTFM_API_KEY}&format=json&limit=1`),
      fetch(`http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${LASTFM_API_KEY}&format=json&period=7day&limit=20`)
    ]);

    if (!nowPlayingResponse.ok || !topArtistsResponse.ok) {
      throw new Error('Failed to fetch Last.fm data');
    }

    const nowPlayingData = await nowPlayingResponse.json();
    const topArtistsData = await topArtistsResponse.json();

    const recentTrack = nowPlayingData.recenttracks?.track?.[0];
    const isNowPlaying = recentTrack && recentTrack['@attr']?.nowplaying === "true";
    const topArtists = topArtistsData.topartists?.artist || [];

    // Always return the most recent track, with nowplaying status
    return Response.json({
      nowplaying: isNowPlaying,
      track: {
        artist: recentTrack?.artist,
        name: recentTrack?.name,
        album: recentTrack?.album,
        image: recentTrack?.image?.find(img => img.size === "large")?.["#text"] ||
               recentTrack?.image?.find(img => img.size === "medium")?.["#text"] ||
               recentTrack?.image?.[0]?.["#text"] || null
      },
      topartists: {
        artist: topArtists.map(artist => ({
          name: artist.name,
          playcount: artist.playcount
        }))
      }
    });

  } catch (error) {
    console.error('Last.fm API error:', error);
    return Response.json({
      nowplaying: false,
      error: error.message
    }, {
      status: 500
    });
  }
}