'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const SKILL_GROUPS = [
  { category: 'Programming Languages', items: ['Python', 'C++', 'C', 'C#', 'Java', 'JavaScript', 'Dart'] },
  { category: 'Web Development', items: ['HTML/CSS', 'React.js', 'Next.js', 'Node.js', 'Tailwind CSS', 'Flask'] },
  { category: 'Data Science & Machine Learning', items: ['TensorFlow', 'OpenCV', 'Pandas', 'BeautifulSoup'] },
  { category: 'Cloud & Database', items: ['Firebase', 'MongoDB', 'AWS', 'SQL'] },
  { category: 'Mobile Development', items: ['Flutter'] },
  { category: 'Desktop & Systems', items: ['.NET'] }
];

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    className="text-primary hover:text-secondary dark:text-darkSecondary dark:hover:text-darkPrimary transition-all font-bold [text-decoration:none] pb-[0.5px] [box-shadow:inset_0_-0.5px_0_0_var(--primary)] dark:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] hover:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] dark:hover:[box-shadow:inset_0_-0.5px_0_0_var(--primary)]"
    target="_blank"
  >
    {children}
  </a>
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
    <div className="px-8 py-12 sm:p-20 sm:pt-16">
      <h1 className="text-4xl font-heading font-light text-primary dark:text-darkSecondary mb-4">Hi, I'm Ruby!</h1>
      <p className="mb-4 font-body font-light tracking-body">
        I'm a computer science student at the University of Waterloo who loves building practical solutions and learning through implementation. I've worked across various tech stacks in academic, personal, and professional projects, and I'm always eager to learn more.
      </p>
      <p className="mb-12 font-body font-light">
        When I'm not staring at a terminal, you'll probably find me indulging in my creative side through <Link href="/misc" className="text-primary hover:text-secondary dark:text-darkSecondary dark:hover:text-darkPrimary transition-all font-bold [text-decoration:none] pb-[0.5px] [box-shadow:inset_0_-0.5px_0_0_var(--primary)] dark:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] hover:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] dark:hover:[box-shadow:inset_0_-0.5px_0_0_var(--primary)]">art</Link>,
        whether it's sketching, painting, digital art, or working with alcohol markers. I also like to make an unnecessary amount of Spotify <ExternalLink href="https://open.spotify.com/user/xpikg3hgljzcxdwltg3zoebtp?si=111b33842cdf497f">playlists</ExternalLink> and consider myself to be a movie enthusiast (with a soft spot for the horror genre), having watched and logged {displayCount} <ExternalLink href="https://letterboxd.com/rubylu/">films</ExternalLink> on Letterboxd so far.
      </p>

      <h2 className="text-4xl font-heading font-light text-primary dark:text-darkSecondary mb-4">Past, present, and future</h2>
      <p className="mb-4 font-body font-light">
        In the summer of 2024, I worked on enhancing desktop applications and automating systems for <ExternalLink href="https://www.ym-inc.com">YM Inc.</ExternalLink>, a Toronto-based retail company that operates fashion brands across North America.
      </p>
      <p className="mb-4 font-body font-light">
        In winter 2025, I interned at <ExternalLink href="https://www.hatch.com/">Hatch</ExternalLink> in their Niagara Falls office, where I dipped my toes into the complexities of hydropower optimization. I worked on improving the efficiency of hydropower dams and explored the use of machine learning for predicting water inflow - this experience ended up being a really interesting intersection of engineering, sustainability, and software.
      </p>
      <p className="mb-4 font-body font-light">
        In the fall of 2025, I'll be joining <ExternalLink href="https://aws.amazon.com/">Amazon Web Services (AWS)</ExternalLink> in Seattle as a Software Development Engineering Intern, which I'm pretty excited about!
      </p>
      <p className="mb-12 font-body font-light">I'm currently on the lookout for summer 2026 internship opportunities.</p>

      <h2 className="text-4xl font-heading font-light text-primary dark:text-darkSecondary mb-4">Technical skills</h2>
      <p className="mb-4 font-body font-light">In no particular order, these are some languages, libraries, frameworks, and technologies that I have experience working with.</p>

      <div>
        {SKILL_GROUPS.map((group) => (
          <div key={group.category} className="mb-8">
            <h3 className="text-xl font-heading font-bold text-[var(--primary)] mb-2">{group.category}</h3>
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
    <div className="sm:hover:scale-105 transition-all bg-background dark:bg-darkBackground2 px-4 py-2 flex items-center whitespace-nowrap border border-[var(--primary)] dark:border-darkSecondary">
      <div className="w-6 h-6 mr-2 flex items-center justify-center">
        <img src={iconPath} alt={skillName} className="w-5 h-5 object-contain" />
      </div>
      <span className="font-body font-medium text-sm text-[var(--primary)]">{skillName}</span>
    </div>
  );
};