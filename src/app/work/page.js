'use client';

import { useState, useRef, useEffect } from 'react';
import { FiGithub } from 'react-icons/fi';
import Image from 'next/image';
import BoxdOffice from './projects/BoxdOffice'
import Website from './projects/Website'
import Hydropower from './projects/Hydropower';
import Pokeplants from './projects/Pokeplants';
import Nudge from './projects/Nudge';
import Chroma from './projects/Chroma';
import Biquadris from './projects/Biquadris'

const projects = [
  {
    id: 1,
    title: "Boxd Office",
    subtitle: "A web app that dissects and visualizes your movie watching",
    image: "/images/projects/boxdoffice/boxdoffice.png",
    description: "Boxd Office is a Letterboxd analytics dashboard that I built and deployed as a personal project! It scrapes a Letterboxd user’s public profile and provides insight into their preferences and patterns through comprehensive data visualization. This project was motivated by my passion for movies and interest in data science; I wanted to obtain and transform raw viewing data into meaningful, interactive charts.",
    expandedContent: <BoxdOffice />,
    link: "https://boxdoffice.streamlit.app/",
    linkText: "Try it Out",
    githubLink: "https://github.com/rubylu-05/boxd-office"
  },
  {
    id: 2,
    title: "Personal Website",
    subtitle: "What you're looking at right now!",
    image: "/images/projects/website/website.png",
    description: "This website serves as a central hub for my professional history, passion projects, and personal interests. It was designed with both aesthetics and functionality in mind, and I wanted to make it as personal as possible. That’s why I included my art and integrated my real-time Spotify listening and Letterboxd activity to incorporate my taste in movies and music. Thanks for checking it out!",
    expandedContent: <Website />,
    githubLink: "https://github.com/rubylu-05/personal-website"
  },
  {
    id: 3,
    title: "Hydropower Inflow Forecasting",
    subtitle: "A machine learning model to optimize hydropower plants",
    image: "/images/projects/lstm.png",
    outlineImage: true,
    description: "During my recent co-op term at Hatch, I used Pandas and Tensorflow to build a custom LSTM model to predict water inflow, which is one of the most unpredictable variables in hydropower. By processing large datasets of time-based hydrology data, this model helps optimize reservoir management by minimizing head losses. In the end, the model was able to achieve an r² score of 0.91, indicating high accuracy compared to baseline methods.",
    expandedContent: <Hydropower />,
    link: "",
    linkText: "",
    githubLink: ""
  },
  {
    id: 4,
    title: "Poképlants",
    subtitle: "A game to make people feel more guilty about killing their houseplants (1st place @ Hack the 6ix)",
    image: "/images/projects/pokeplants.png",
    description: "Poképlants was built at Hack the 6ix, where our team of 4 wanted to tackle the issue of houseplants dying from lack of care. We wanted to make a product that would make plant care more fun, engaging, and rewarding, so we turned it into a Pokémon-inspired game. This project combines hardware sensors, computer vision, and Pokémon-style web-based RPG to monitor plants in real-time and gamify plant care.",
    expandedContent: <Pokeplants />,
    link: "https://devpost.com/software/pokeplants",
    linkText: "Demo",
    githubLink: "https://github.com/FO214/ht6"
  },
  {
    id: 5,
    title: "Nudge",
    subtitle: "An AI-powered Chrome extension that knows when you're slacking and pressures you to get back on track",
    image: "/images/projects/nudge.png",
    description: "Nudge was built at UofT Hacks, where our team of 4 wanted to tackle productivity and procrastination in a way that felt more human than typical productivity apps. Instead of silent reminders or site blockers, we built a Chrome extension that observes your Chrome activity and responds with sarcastic commentary inspired by the game The Stanley Parable.",
    expandedContent: <Nudge />,
    link: "https://dorahacks.io/buidl/21709",
    linkText: "Demo",
    githubLink: "https://github.com/sbrina-w/uofthacks12"
  },
  {
    id: 6,
    title: "Chroma: Your Personal Colour Assistant",
    subtitle: "A mobile app to simplify the colour mixing process",
    image: "/images/projects/chroma.png",
    description: "Chroma was built for an online hackathon, where me and my teammate wanted to build a tool that takes the guesswork out of colour matching by generating palettes and determining ratios mathematically. This project was motivated by our shared enthusiasm for art.",
    expandedContent: <Chroma />,
    link: "https://devpost.com/software/chroma-q3wshr",
    linkText: "Demo",
    githubLink: "https://github.com/sbrina-w/Chroma/"
  },
  {
    id: 7,
    title: "Biquadris",
    subtitle: "A multiplayer Tetris clone",
    image: "/images/projects/biquadris.png",
    description: "Biquadris was developed as the final project for a Waterloo course called CS 246 (Object-Oriented Software Development). The game supports multiplayer competition, multiple difficulty levels, and Tetris mechanics like block holding, ghost pieces, and upcoming block previews. Built as a collaborative project, Biquadris emphasizes clean architecture, design patterns, and resilience to change, making it easy to extend with new blocks, levels, or gameplay effects.",
    expandedContent: <Biquadris />
  }
];

const ProjectTitle = ({ children, rotateRight = false, isHovered = false }) => (
  <div className="relative inline-block">
    <svg
      width="160"
      height="40"
      viewBox="0 0 180 40"
      className="absolute -left-3 -top-2 h-12 w-auto"
    >
      <ellipse
        cx="50"
        cy="22"
        rx="50"
        ry="12"
        transform={rotateRight ? "rotate(6, 90, 20)" : "rotate(-6, 90, 20)"}
        className="fill-none stroke-[0.5px] stroke-primary dark:stroke-darkSecondary"
        strokeDasharray={isHovered ? 'none' : '0, 314'}
        strokeDashoffset="0"
        style={{
          transition: 'stroke-dasharray 0.8s ease-in-out',
          strokeDasharray: isHovered ? '314' : '0, 314'
        }}
      />
    </svg>

    {/* Title Text with Outlined Effect */}
    <h2 className="relative text-3xl font-body font-bold tracking-tighter leading-8
      dark:text-transparent dark:font-extrabold dark:tracking-tighter dark:leading-8
      text-[var(--primary)] dark:text-darkPrimary">
      
      {/* Stroke Layer */}
      <span
        className="absolute top-0 left-0 -z-10 text-3xl font-body font-bold tracking-tighter leading-8 dark:block hidden"
        style={{
          WebkitTextStroke: '2px var(--secondary)',
          textStroke: '2px var(--secondary)',
        }}
      >
        {children}
      </span>

      {/* Fill Layer */}
      <span className="relative z-10 text-[var(--primary)] dark:text-darkPrimary">
        {children}
      </span>
    </h2>
  </div>
);

const ProjectCard = ({ project, index, expandedIds, toggleExpand, getHeight, contentRefs, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shadow Layer for Project Card */}
      <div className="absolute top-[4px] left-[4px] w-full h-full bg-primary dark:bg-darkSecondary rounded-2xl"></div>

      {/* Main Project Card Layer */}
      <div
        className={`relative z-10 transition-all bg-background dark:bg-darkBackground2 border border-primary dark:border-darkBackground2 p-6 sm:p-6 sm:pl-8 rounded-2xl md:hover:-translate-y-1 md:hover:-translate-x-1`}
      >
        {/* Header with image and basic info */}
        <div className={`flex flex-col md:flex-row gap-6 mb-6 items-center ${index % 2 ? 'md:flex-row-reverse' : ''}`}>
          <div className="md:w-1/3 relative">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={300}
              className={`w-full h-auto object-contain transition-all ${project.outlineImage ? 'border border-primary dark:border-darkBackground2 rounded-xl' : ''}`}
            />
          </div>

          <div className="md:w-2/3">
            <ProjectTitle rotateRight={index % 2 === 0} isHovered={isHovered}>
              {project.title}
            </ProjectTitle>
            <h3 className="text-lg font-body text-primary dark:text-darkSecondary mb-6 mt-1 leading-tight">
              {project.subtitle}
            </h3>
            <p className="font-body font-light font-[var(--primary)]">
              {project.description}
            </p>
          </div>
        </div>

        {/* Expanded content with animated height */}
        <div
          ref={(el) => (contentRefs.current[project.id] = el)}
          className="transition-[height,opacity] duration-500 ease-in-out overflow-hidden"
          style={{
            height: expandedIds.includes(project.id)
              ? `${getHeight(project.id)}px`
              : '0px',
            opacity: expandedIds.includes(project.id) ? 1 : 0,
          }}
        >
          <div className="mt-4 space-y-6">
            {project.expandedContent}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
          {/* Left: GitHub + Link */}
          <div className="flex items-center gap-2">
            {project.githubLink && (
              <div className="relative group flex items-center">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)] text-xl md:hover:scale-110 transition-all flex items-center -ml-2"
                >
                  <FiGithub className="align-middle" />
                </a>
                {!isMobile && (
                  <div className="absolute left-1/2 -translate-x-[54%] bottom-full mb-2 bg-[var(--background)] px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-10 text-xs border border-primary dark:border-darkBackground2 whitespace-nowrap pointer-events-none rounded-full font-body w-max">
                    <span>Github Repo</span>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-primary dark:border-t-darkBackground"></div>
                  </div>
                )}
              </div>
            )}

            {project.link && project.linkText && (
              <div className="relative inline-block">
                {/* Shadow Layer */}
                <div className="absolute top-[4px] left-[4px] z-0">
                  <div className="px-3 py-1 flex items-center whitespace-nowrap bg-primary dark:bg-darkSecondary rounded-full">
                    <span className="font-body font-medium text-sm text-[var(--primary)]">
                      {project.linkText}
                    </span>
                  </div>
                </div>
                {/* Main Button Layer */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 transition-all bg-background2 dark:bg-darkBackground px-3 py-1 flex items-center whitespace-nowrap border border-[var(--primary)] dark:border-darkBackground md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full"
                >
                  <span className="font-body font-medium text-sm text-[var(--primary)]">
                    {project.linkText}
                  </span>
                </a>
              </div>
            )}
          </div>

          {/* Right: Show More/Less */}
          <div className="relative inline-block">
            {/* Shadow Layer for Show More/Less */}
            <div className="absolute top-[4px] left-[4px] z-0">
              <div className="px-3 py-1 flex items-center whitespace-nowrap bg-primary dark:bg-darkSecondary rounded-full">
                <span className="font-body font-medium text-sm text-[var(--primary)]">
                  {expandedIds.includes(project.id) ? 'Show Less' : 'Show More'}
                </span>
              </div>
            </div>
            {/* Main Button Layer */}
            <button
              onClick={() => toggleExpand(project.id)}
              className="relative z-10 transition-all bg-background2 dark:bg-darkBackground px-3 py-1 flex items-center whitespace-nowrap border border-[var(--primary)] dark:border-darkBackground md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full"
            >
              <span className="font-body font-medium text-sm text-[var(--primary)]">
                {expandedIds.includes(project.id) ? 'Show Less' : 'Show More'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Work() {
  const [expandedIds, setExpandedIds] = useState([]);
  const contentRefs = useRef({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const getHeight = (id) => {
    const el = contentRefs.current[id];
    return el ? el.scrollHeight : 0;
  };

  return (
    <div className="p-6 relative">
      <p className="font-body font-light mb-6 text-lg">
        For each project, you can click on <span className="font-bold tracking-tighter">Show More</span> for details about the technical process and my thoughts.
      </p>
      <div className="space-y-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            expandedIds={expandedIds}
            toggleExpand={toggleExpand}
            getHeight={getHeight}
            contentRefs={contentRefs}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
}