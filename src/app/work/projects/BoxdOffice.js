import { useEffect, useRef } from 'react';
import SectionHeading from '../SectionHeading';

export default function BoxdOffice() {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const video = videoRef.current;
            if (video) {
              video.play().catch(error => {
                console.log('Autoplay prevented:', error);
              });
            }
          } else {
            const video = videoRef.current;
            if (video) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="mt-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="w-full h-auto object-fill mb-3">
          <img
            src="/images/projects/boxdoffice/1.jpeg"
            alt="Screenshot 1"
            className="w-full h-auto object-cover border border-primary dark:border-darkBackground2 rounded-lg"
          />
        </div>
        <div className="w-full h-auto object-fill mb-3">
          <img
            src="/images/projects/boxdoffice/2.jpeg"
            alt="Screenshot 2"
            className="w-full h-auto object-cover border border-primary dark:border-darkBackground2 rounded-lg"
          />
        </div>
        <div className="w-full h-auto object-fill mb-3">
          <img
            src="/images/projects/boxdoffice/3.jpeg"
            alt="Screenshot 3"
            className="w-full h-auto object-cover border border-primary dark:border-darkBackground2 rounded-lg"
          />
        </div>
      </div>

      <div className="mb-6">
        <SectionHeading>The Project</SectionHeading>
        <p className="font-body  font-light">
          Here's what you'll see after your profile has been scraped:
        </p>

        <div className="mt-4 overflow-hidden border border-primary dark:border-darkBackground2 rounded-lg">
          <video
            ref={videoRef}
            controls
            className="w-full"
            muted
            playsInline
          >
            <source src="/videos/boxdoffice.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="mb-6">
        <SectionHeading>Technical Overview</SectionHeading>
        <ul className="list-disc pl-5 font-body font-light dark:[&>li]:marker:text-darkSecondary">
          <li>Python with Beautiful Soup for web scraping profiles and film data</li>
          <li>Multithreaded scraping with ThreadPoolExecutor for faster data collection</li>
          <li>Pandas for data processing and analysis</li>
          <li>Plotly for interactive visualizations</li>
          <li>Streamlit for designing and deploying the web interface</li>
        </ul>
      </div>

      <div className="mb-6">
        <SectionHeading>Thoughts</SectionHeading>
        <p className="font-body  mb-4 font-light">
          This project was a really fun way to combine my personal interests into a tangible product. I thought about what kind of insights would be meaningful to someone who watches a lot of movies and how to present those insights in a way that's both informative and enjoyable to look at. Letterboxd doesn't have a public API, so I turned to web scraping with Beautiful Soup. This meant I had to be careful with rate limits; I accidentally exceeded them at one point, but this helped me implement better error handling and request throttling in the final version. On the front-end side, I put some effort into mimicking Letterboxd's UI to make the dashboard feel like a natural extension of the platform. There's a lot of room to improve and expand the project, but overall I'm happy with how it turned out, and it was super satisfying to bring the idea to life.
        </p>
      </div>
    </div>
  );
}