'use client';

import Link from 'next/link';
import ExternalLink from '@/components/ExternalLink';
import SectionHeading from '@/components/SectionHeading';
import { useEffect, useState } from 'react';

const SKILL_GROUPS = [
  { category: 'Programming Languages', items: ['Python', 'C++', 'C', 'C#', 'Java', 'JavaScript', 'Dart'] },
  { category: 'Web Development', items: ['HTML/CSS', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Flask'] },
  { category: 'Data Science & Machine Learning', items: ['TensorFlow', 'OpenCV', 'Pandas', 'Beautiful Soup', 'Streamlit'] },
  { category: 'Cloud & Database', items: ['Firebase', 'MongoDB', 'AWS', 'SQL'] },
  { category: 'Mobile Development', items: ['Flutter'] },
  { category: 'Desktop Development', items: ['.NET'] }
];

const TimelineItem = ({ children, isLast }) => (
  <div className="relative grid grid-cols-[24px_1fr] gap-2 group">
    <div className="relative">
      <div className="absolute top-1.5 w-4 h-4 border border-primary dark:border-darkSecondary bg-background dark:bg-darkBackground2 z-10 md:group-hover:bg-primary dark:md:group-hover:bg-darkSecondary transition-all rounded-full dark:drop-shadow-[0_0_10px_rgba(230,220,224,0.2)] dark:group-hover:drop-shadow-[0_0_10px_rgba(230,220,224,0.5)]" />
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
  const [displayYearlyCount, setDisplayYearlyCount] = useState(0);

  useEffect(() => {
    const fetchMovieCount = async () => {
      try {
        const response = await fetch('/api/letterboxd_stats');
        const data = await response.json();
        if (data.count) animateCount(parseInt(data.count), setDisplayCount);
        if (data.yearlyCount) animateCount(parseInt(data.yearlyCount), setDisplayYearlyCount);
      } catch (error) {
        console.error('Failed to fetch movie count:', error);
      }
    };

    const animateCount = (finalNumber, setter) => {
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        setter(Math.floor(progress * finalNumber));
        if (progress < 1) requestAnimationFrame(updateCount);
        else setter(finalNumber);
      };

      requestAnimationFrame(updateCount);
    };

    fetchMovieCount();
  }, []);

  return (
    <div>
      <div className="p-6 bg-[var(--background)] transition-all">
        <SectionHeading ellipseRotation={-8} ellipseLength={150}>Hi, I'm Ruby!</SectionHeading>
        <p className="mb-4 font-body font-light text-lg">
          I'm a Waterloo computer science student with a deep fascination for the architecture that powers our digital experiences. I've worked across various tech stacks in academic, personal, and professional projects, and I'm always eager to learn more. I'm particularly interested in distributed systems and backend engineering, and I'm growing my interest in the intersection of AI and large-scale systems.
        </p>
        <p className="mb-4 font-body font-light text-lg">
          When I'm not staring at a terminal, you'll probably find me indulging in my creative side through <Link href="/misc" className="text-primary hover:text-secondary dark:text-darkSecondary dark:hover:text-darkPrimary transition-all font-bold [text-decoration:none] pb-[0.5px] [box-shadow:inset_0_-0.5px_0_0_var(--primary)] dark:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] hover:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] dark:hover:[box-shadow:inset_0_-0.5px_0_0_var(--primary)] tracking-tighter dark:neon-glow">art</Link>,
          whether it's sketching, painting, digital art, or working with alcohol markers. I also like to make an unnecessary amount of Spotify <ExternalLink href="https://open.spotify.com/user/xpikg3hgljzcxdwltg3zoebtp?si=111b33842cdf497f">playlists</ExternalLink> and consider myself to be a movie enthusiast (with a soft spot for the horror genre), having watched and logged <ExternalLink href="https://letterboxd.com/rubylu/">{displayCount} films</ExternalLink> ({displayYearlyCount} this year) on Letterboxd so far.
        </p>
        <p className="mb-4 font-body font-light text-lg">
          This website, which I’ve poured many hours into, is an attempt to capture my growth as a developer as well as the passions that fuel me outside of tech. Thanks for stopping by!
        </p>
      </div>
      <div className="p-6 bg-[var(--background)] transition-all mt-8">
        <SectionHeading ellipseRotation={5} ellipseLength={250}>Past, Present, and Future</SectionHeading>
        <div>
          <TimelineItem>
            <p className="mb-4 font-body font-light text-lg">
              Last summer, I worked on enhancing desktop applications and automating systems for <ExternalLink href="https://www.ym-inc.com">YM Inc.</ExternalLink>, a Toronto-based retail company that operates fashion brands across North America.
            </p>
          </TimelineItem>
          <TimelineItem>
            <p className="mb-4 font-body font-light text-lg">
              This winter, I interned at <ExternalLink href="https://www.hatch.com/">Hatch</ExternalLink> in their Niagara Falls office, where I was introduced to the complexities of hydropower optimization. I worked on improving the efficiency of hydropower dams and explored the use of machine learning for predicting water inflow; this experience ended up being a really interesting intersection of engineering, sustainability, and software.
            </p>
          </TimelineItem>
          <TimelineItem>
            <p className="mb-4 font-body font-light text-lg">
              This fall term, I'm interning at <ExternalLink href="https://aws.amazon.com/">Amazon Web Services (AWS)</ExternalLink> in Seattle! I'm working with the <ExternalLink href="https://aws.amazon.com/dynamodb/global-tables/">DynamoDB Global Tables</ExternalLink> team to break down regional obstacles and integrate operational tools into a unified, global infrastructure.
            </p>
          </TimelineItem>
          <TimelineItem isLast={true}>
            <p className="mb-4 font-body font-light text-lg">I'm currently on the lookout for summer 2026 internship opportunities.</p>
          </TimelineItem>
        </div>
      </div>

      <div className="p-6 bg-[var(--background)] transition-all mt-9">
        <SectionHeading ellipseRotation={-5} ellipseLength={200}>Technical Skills</SectionHeading>
        <p className="mb-4 font-body font-light text-lg">In no particular order, these are some languages, libraries, frameworks, and technologies that I have experience working with.</p>

        <div>
          {SKILL_GROUPS.map((group, index) => (
            <div
              key={group.category}
              className={index !== SKILL_GROUPS.length - 1 ? 'mb-8' : ''}
            >
              <h3 className="text-2xl font-body font-bold text-primary dark:text-darkSecondary mb-2 tracking-tighter dark:neon-glow">{group.category}</h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((skillName) => (
                  <SkillBadge key={skillName} skillName={skillName} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-[var(--background)] transition-all mt-8">
        <SectionHeading ellipseRotation={5} ellipseLength={150}>Also</SectionHeading>
        <p className="mb-4 font-body font-light text-lg">I've been reading a lot of old <ExternalLink href="https://www.fantagraphics.com/products/the-complete-peanuts-1965-1966-hardback?srsltid=AfmBOooiUpFpPyysLksw0oGwmdfu_0FUBHbOAoufckESWhwQMjI1js5X">Peanuts</ExternalLink> comic strips recently, so enjoy these gifs from <ExternalLink href="https://letterboxd.com/film/a-charlie-brown-christmas/">A Charlie Brown Christmas</ExternalLink> (1965)!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="relative">
            {/* Shadow effect */}
            <div className="relative before:absolute before:content-[''] before:top-[4px] before:left-[4px] 
                      before:w-full before:h-full before:bg-primary dark:before:bg-darkSecondary 
                      before:rounded-xl before:z-0">
              {/* Main image */}
              <div className="relative z-10 transition-transform duration-300 
                        border border-primary dark:border-0 rounded-xl
                        md:hover:-translate-y-0.5 md:hover:-translate-x-0.5">
                <img
                  src="/images/peanuts/children_dancing.gif"
                  alt="children dancing"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Shadow effect */}
            <div className="relative before:absolute before:content-[''] before:top-[4px] before:left-[4px] 
                      before:w-full before:h-full before:bg-primary dark:before:bg-darkSecondary 
                      before:rounded-xl before:z-0">
              {/* Main image */}
              <div className="relative z-10 transition-transform duration-300 
                        border border-primary dark:border-0 rounded-xl
                        md:hover:-translate-y-0.5 md:hover:-translate-x-0.5">
                <img
                  src="/images/peanuts/snoopy_dancing.gif"
                  alt="snoopy dancing"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
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
