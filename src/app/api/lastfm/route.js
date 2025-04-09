export const dynamic = 'force-dynamic';

export async function GET() {
  const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
  const username = 'ruby-lu';
  
  try {
    const response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&period=7day&api_key=${LASTFM_API_KEY}&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from Last.fm');
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}