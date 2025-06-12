export async function GET() {
  try {
    const response = await fetch('https://letterboxd.com/rubylu/');
    const html = await response.text();
    
    const filmCountMatch = html.match(/<span class="value">(\d+)<\/span><span class="definition">Films<\/span>/);
    const yearlyFilmCountMatch = html.match(/<span class="value">(\d+)<\/span><span class="definition">This year<\/span>/);
    const count = filmCountMatch ? filmCountMatch[1] : '500';
    const yearlyCount = yearlyFilmCountMatch ? yearlyFilmCountMatch[1] : '60';
    
    return new Response(JSON.stringify({ count, yearlyCount }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching Letterboxd data:', error);
    return new Response(JSON.stringify({ count: '500', yearlyCount: '60' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}