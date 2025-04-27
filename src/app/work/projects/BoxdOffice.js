export default function BoxdOffice() {
    return (
      <div className="mt-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="w-full h-auto object-fill mb-3 border border-primary dark:border-darkSecondary hover:scale-[1.02] transition-all">
            <img 
              src="/images/projects/boxdoffice/1.png" 
              alt="Screenshot 1" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full h-auto object-fill mb-3 border border-primary dark:border-darkSecondary hover:scale-[1.02] transition-all">
            <img 
              src="/images/projects/boxdoffice/2.png" 
              alt="Screenshot 2" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full h-auto object-fill mb-3 border border-primary dark:border-darkSecondary hover:scale-[1.02] transition-all">
            <img 
              src="/images/projects/boxdoffice/3.png" 
              alt="Screenshot 3" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            The Project
          </h4>
          <p className="font-body text-sm font-light">
            Here's what you'll see after your profile has been scraped:
          </p>
          
          <div className="mt-4 overflow-hidden border border-primary dark:border-darkSecondary">
            <video controls className="w-full">
              <source src="/videos/boxdoffice.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            Technical Overview
          </h4>
          <ul className="list-disc pl-5 font-body text-sm font-light [&>li]:marker:text-[var(--secondary)]">
            <li>Python with BeautifulSoup was used for web scraping profiles and film data</li>
            <li>Multithreaded scraping with ThreadPoolExecutor was used for faster data collection</li>
            <li>Pandas was used for data processing and analysis</li>
            <li>Plotly was used for interactive visualizations</li>
            <li>Streamlit was used for designing and deploying the web interface</li>
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
            Thoughts
          </h4>
          <p className="font-body text-sm font-light">
            This project was a really fun way to combine my personal interests into a tangible product. I thought a lot about what kind of insights would actually be meaningful to someone who watches a lot of movies and how to present those insights in a way that's both informative and enjoyable to look at. Letterboxd's lack of a public API meant I had to get creative with BeautifulSoup, which was both frustrating and rewarding. On the frontend side, I put a lot of effort into mimicking Letterboxd's UI to make the dashboard feel like a natural extension of the platform. Streamlit's convenience was a blessing for rapid prototyping, but its limitations forced me to get a little hacky with injected HTML/CSS to achieve the exact look that I wanted. There's a lot of room to improve and expand the project, but overall I'm happy with how it turned out, and it was super satisfying to bring the idea to life.
          </p>
        </div>
      </div>
    );
  }