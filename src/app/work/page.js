'use client';

import { useState, useRef } from 'react';
import { FiGithub } from 'react-icons/fi';
import Image from 'next/image';
import BoxdOffice from './projects/BoxdOffice'
import Hydropower from './projects/Hydropower';
import Nudge from './projects/Nudge';
import Pokeplants from './projects/Pokeplants';
import Chroma from './projects/Chroma';

const projects = [
  {
    id: 1,
    title: "Boxd Office",
    subtitle: "A web app that dissects and visualizes your movie watching",
    image: "/images/projects/boxdoffice/boxdoffice.png",
    description: "Boxd Office is a Letterboxd analytics dashboard that I built and deployed as a personal project! It scrapes a Letterboxd user’s public profile and provides insight into their preferences and patterns through comprehensive data visualization. This project was motivated by my passion for movies and interest in data science; I wanted to obtain and transform raw viewing data into meaningful, interactive charts.",
    expandedContent: <BoxdOffice />,
    link: "https://boxdoffice.streamlit.app/",
    linkText: "Try it out",
    githubLink: "https://github.com/rubylu-05/boxd-office"
  },
  {
    id: 2,
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
    id: 3,
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
    title: "Chroma: Your Personal Colour Assistant",
    subtitle: "A mobile app to simplify the painting and colour mixing process",
    image: "/images/projects/chroma.png",
    description: "Chroma was built for an online hackathon, where me and my teammate wanted to build a tool that takes the guesswork out of colour matching by generating palettes and determining ratios mathematically. This project was motivated by our shared enthusiasm for art.",
    expandedContent: <Chroma />,
    link: "https://devpost.com/software/chroma-q3wshr",
    linkText: "Demo",
    githubLink: "https://github.com/sbrina-w/Chroma/"
  }
];

export default function Work() {
  const [expandedIds, setExpandedIds] = useState([]);
  const contentRefs = useRef({});

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
    <div className="px-8 py-8 sm:p-20 sm:pt-16">
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="transition-all bg-background dark:bg-darkBackground2 border border-primary dark:border-darkSecondary p-6 sm:p-6 sm:pl-10 sm:pr-10"
          >
            {/* Header with image and basic info */}
            <div className={`flex flex-col md:flex-row gap-6 mb-6 ${index % 2 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/3 relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className={`w-full h-auto object-contain transition-all lg:hover:scale-105 ${
                    project.outlineImage ? 'border border-primary dark:border-darkSecondary' : ''
                  }`}
                />
              </div>

              <div className="md:w-2/3">
                <h2 className="text-2xl font-heading font-bold text-[var(--primary)] mb-2">
                  {project.title}
                </h2>
                <h3 className="text-lg font-heading font-light text-[var(--secondary)] mb-4">
                  {project.subtitle}
                </h3>
                <p className="font-body font-light text-sm font-[var(--primary)]">
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
            <div className="flex justify-between mt-4">
              <div className="flex items-center gap-2">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)] lg:hover:text-[var(--secondary)] transition-all lg:hover:scale-105"
                  >
                    <FiGithub size={20} />
                  </a>
                )}
                {project.link && project.linkText && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background dark:bg-darkBackground border border-primary dark:border-darkSecondary text-[var(--primary)] px-3 py-1 text-xs font-body transition-all lg:hover:scale-105 lg:hover:border-secondary lg:dark:hover:border-darkSecondary lg:dark:hover:bg-darkSecondary lg:hover:text-secondary lg:dark:hover:text-darkPrimary"
                  >
                    {project.linkText}
                  </a>
                )}
              </div>
              <button
                onClick={() => toggleExpand(project.id)}
                className="bg-background dark:bg-darkBackground border border-primary dark:border-darkSecondary text-[var(--primary)] px-3 py-1 text-xs font-body transition-all lg:hover:scale-105 lg:hover:border-secondary lg:dark:hover:border-darkSecondary lg:dark:hover:bg-darkSecondary lg:hover:text-secondary lg:dark:hover:text-darkPrimary"
              >
                {expandedIds.includes(project.id) ? 'Show less' : 'Show more'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}