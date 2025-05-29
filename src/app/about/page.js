'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const SKILL_GROUPS = [
  { category: 'Programming Languages', items: ['Python', 'C++', 'C', 'C#', 'Java', 'JavaScript', 'Dart'] },
  { category: 'Web Development', items: ['HTML/CSS', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Flask'] },
  { category: 'Data Science & Machine Learning', items: ['TensorFlow', 'OpenCV', 'Pandas', 'Beautiful Soup', 'Streamlit'] },
  { category: 'Cloud & Database', items: ['Firebase', 'MongoDB', 'AWS', 'SQL'] },
  { category: 'Mobile Development', items: ['Flutter'] },
  { category: 'Desktop & Systems', items: ['.NET'] }
];

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    className="text-primary hover:opacity-50 dark:hover:opacity-100 dark:text-darkSecondary dark:hover:text-darkPrimary transition-all font-bold [text-decoration:none] pb-[0.5px] [box-shadow:inset_0_-0.5px_0_0_var(--primary)] dark:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] hover:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] dark:hover:[box-shadow:inset_0_-0.5px_0_0_var(--primary)] tracking-tighter"
    target="_blank"
  >
    {children}
  </a>
);

const SectionHeading = ({ children, ellipseRotation = -5 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={headingRef}
      className="flex items-center mb-4 relative group"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <div className="relative inline-block">
        <svg
          width="160"
          height="40"
          viewBox="0 0 180 40"
          className="absolute -left-3 -top-2 h-12 w-auto"
        >
          <ellipse
            cx="90"
            cy="20"
            rx="90"
            ry="18"
            transform={`rotate(${ellipseRotation}, 90, 20)`}
            className="fill-none stroke-[0.5px] stroke-primary dark:stroke-darkSecondary"
            strokeDasharray={
              isVisible ? '565' : '0, 565'
            }
            strokeDashoffset="0"
            style={{
              transition: isVisible ? 'stroke-dasharray 1.2s ease-in-out' : 'none',
            }}
          />
        </svg>

        <div className="relative">
          <div className="relative">
            {/* Shadow (offset) */}
            <h2
              className="text-5xl font-heading font-bold text-primary dark:text-transparent md:whitespace-nowrap tracking-tight"
              style={{
                transform: 'translate(2px, 2px)',
                position: 'absolute',
                zIndex: 0,
                WebkitTextStroke: 'var(--stroke-width) var(--shadow-colour)',
                textStroke: 'var(--stroke-width) var(--stroke-colour)',
              }}
            >
              {children}
            </h2>

            {/* Stroke Layer */}
            <h2
              className="text-5xl font-heading font-bold md:whitespace-nowrap tracking-tight"
              style={{
                WebkitTextStroke: 'var(--stroke-width) var(--stroke-colour)',
                textStroke: 'var(--stroke-width) var(--stroke-colour)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {children}
            </h2>

            {/* Fill Layer */}
            <h2
              className="text-5xl font-heading font-bold md:whitespace-nowrap tracking-tight absolute top-0 left-0"
              style={{
                color: 'var(--text-fill-colour)',
                zIndex: 2,
              }}
            >
              {children}
            </h2>
          </div>
        </div>
      </div>

      {
        !isMobile && (
          <div className="hidden md:flex items-center w-full ml-4 relative top-[2px]">
            <div className="flex-grow h-px bg-primary dark:bg-darkSecondary"></div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="ml-1 transition-transform duration-300 ease-in-out"
              style={{
                transform: isHovered ? 'scale(1.2)' : 'scale(1)'
              }}
            >
              <path
                d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8L10 2Z"
                fill="transparent"
                stroke="var(--primary)"
                strokeWidth="2"
                strokeLinejoin="round"
                className="dark:stroke-darkBackground"
              />
              <path
                d="M10 2L12 8L18 10L12 12L10 18L8 12L2 10L8 8L10 2Z"
                fill="background"
                stroke="transparent"
                className="dark:fill-darkSecondary"
              />
            </svg>
          </div>
        )
      }
    </div>
  );
};

const TimelineItem = ({ children, isLast }) => (
  <div className="relative grid grid-cols-[24px_1fr] gap-2 group">
    <div className="relative">
      <div className="absolute top-1.5 w-4 h-4 border border-primary dark:border-darkSecondary bg-background dark:bg-darkBackground2 z-10 md:group-hover:bg-primary dark:md:group-hover:bg-darkSecondary transition-all rounded-full" />
      {!isLast && (
        <div className="absolute top-4 left-[7.5px] bottom-[-8px] w-px bg-primary dark:bg-darkSecondary z-0" />
      )}
    </div>

    <div className="font-body font-light md:group-hover:translate-x-1.5 transition-all">
      {children}
    </div>
  </div>
);

export default function About() {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const fetchMovieCount = async () => {
      try {
        const response = await fetch('/api/letterboxd_stats');
        const data = await response.json();
        if (data.count) animateCount(parseInt(data.count));
      } catch (error) {
        console.error('Failed to fetch movie count:', error);
      }
    };

    const animateCount = (finalNumber) => {
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        setDisplayCount(Math.floor(progress * finalNumber));
        if (progress < 1) requestAnimationFrame(updateCount);
        else setDisplayCount(finalNumber);
      };

      requestAnimationFrame(updateCount);
    };

    fetchMovieCount();
  }, []);

  return (
    <div className="p-6">
      <SectionHeading ellipseRotation={-8}>Hi, I'm Ruby!</SectionHeading>
      <p className="mb-4 font-body font-light text-lg">
        I'm a computer science student at the University of Waterloo who loves building practical solutions and learning through implementation. I've worked across various tech stacks in academic, personal, and professional projects, and I'm always eager to learn more.
      </p>
      <p className="mb-16 font-body font-light text-lg">
        When I'm not staring at a terminal, you'll probably find me indulging in my creative side through <Link href="/misc" className="text-primary hover:text-secondary dark:text-darkSecondary dark:hover:text-darkPrimary transition-all font-bold [text-decoration:none] pb-[0.5px] [box-shadow:inset_0_-0.5px_0_0_var(--primary)] dark:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] hover:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] dark:hover:[box-shadow:inset_0_-0.5px_0_0_var(--primary)] tracking-tighter">art</Link>,
        whether it's sketching, painting, digital art, or working with alcohol markers. I also like to make an unnecessary amount of Spotify <ExternalLink href="https://open.spotify.com/user/xpikg3hgljzcxdwltg3zoebtp?si=111b33842cdf497f">playlists</ExternalLink> and consider myself to be a movie enthusiast (with a soft spot for the horror genre), having watched and logged <ExternalLink href="https://letterboxd.com/rubylu/">{displayCount} films</ExternalLink> on Letterboxd so far.
      </p>

      <SectionHeading ellipseRotation={5}>Past, Present, and Future</SectionHeading>
      <div className="mb-16">
        <TimelineItem>
          <p className="mb-4 font-body font-light text-lg">
            In the summer of 2024, I worked on enhancing desktop applications and automating systems for <ExternalLink href="https://www.ym-inc.com">YM Inc.</ExternalLink>, a Toronto-based retail company that operates fashion brands across North America.
          </p>
        </TimelineItem>
        <TimelineItem>
          <p className="mb-4 font-body font-light text-lg">
            In winter 2025, I interned at <ExternalLink href="https://www.hatch.com/">Hatch</ExternalLink> in their Niagara Falls office, where I was introduced to the complexities of hydropower optimization. I worked on improving the efficiency of hydropower dams and explored the use of machine learning for predicting water inflow; this experience ended up being a really interesting intersection of engineering, sustainability, and software.
          </p>
        </TimelineItem>
        <TimelineItem>
          <p className="mb-4 font-body font-light text-lg">
            In the fall of 2025, I'll be joining <ExternalLink href="https://aws.amazon.com/dynamodb/">Amazon Web Services (AWS)</ExternalLink> in Seattle as a Software Development Engineering Intern, which I'm pretty excited about!
          </p>
        </TimelineItem>
        <TimelineItem isLast={true}>
          <p className="mb-4 font-body font-light text-lg">I'm currently on the lookout for 2026 internship opportunities.</p>
        </TimelineItem>
      </div>

      <SectionHeading ellipseRotation={-5}>Technical Skills</SectionHeading>
      <p className="mb-4 font-body font-light text-lg">In no particular order, these are some languages, libraries, frameworks, and technologies that I have experience working with.</p>

      <div>
        {SKILL_GROUPS.map((group, index) => (
          <div
            key={group.category}
            className={index !== SKILL_GROUPS.length - 1 ? 'mb-8' : ''}
          >
            <h3 className="text-2xl font-body font-bold text-primary dark:text-darkSecondary mb-2 tracking-tighter">{group.category}</h3>
            <div className="flex flex-wrap gap-3">
              {group.items.map((skillName) => (
                <SkillBadge key={skillName} skillName={skillName} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const SkillBadge = ({ skillName }) => {
  const iconPath = `/images/tech_icons/${skillName.toLowerCase()
    .replace('.', '')
    .replace('/', '-')
    .replace('#', 'sharp')
    .replace(' ', '')}.png`;

  return (
    <div className="relative inline-block">
      {/* Shadow Layer */}
      <div className="absolute top-[4px] left-[4px] z-0">
        <div className="p-2 pr-4 flex items-center whitespace-nowrap bg-primary dark:bg-darkSecondary rounded-full">
          <div className="w-6 h-6 mr-2 flex items-center justify-center">
            <img src={iconPath} alt={`${skillName} icon`} className="w-5 h-5 object-contain" />
          </div>
          <span className="font-body font-medium text-[var(--primary)] text-base">
            {skillName}
          </span>
        </div>
      </div>

      {/* Main Card Layer */}
      <div className="relative z-10 transition-all bg-background dark:bg-darkBackground2 p-2 pr-4 flex items-center whitespace-nowrap border border-[var(--primary)] dark:border-darkBackground2 md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full">
        <div className="w-6 h-6 mr-2 flex items-center justify-center">
          <img src={iconPath} alt={skillName} className="w-5 h-5 object-contain" />
        </div>
        <span className="font-body font-medium text-[var(--primary)] text-base">{skillName}</span>
      </div>
    </div>
  );
};
