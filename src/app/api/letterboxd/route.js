import Parser from 'rss-parser';

const parser = new Parser();

export async function GET() {
    try {
        const feed = await parser.parseURL('https://letterboxd.com/rubylu/rss/');
        
        const movies = feed.items.map(item => {
            const titleMatch = item.title.match(/^(.*?)\s*\((\d{4})\)$/);
            const title = titleMatch ? titleMatch[1] : item.title;
            const year = titleMatch ? titleMatch[2] : '';
            
            const imageMatch = item.content.match(/<img.*?src="(.*?)"/);
            const image = imageMatch ? imageMatch[1] : null;
            
            return {
                title,
                year,
                image,
                link: item.link
            };
        });

        return new Response(JSON.stringify(movies), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error fetching Letterboxd data:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch Letterboxd data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}