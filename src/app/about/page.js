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

const TimelineItem = ({ children, logoSrc, isFirst, isLast }) => (
  <div className="relative grid grid-cols-[56px_1fr] gap-x-4 group mb-4 last:mb-0">
    <div className="relative flex justify-center items-center">
      
      {!isFirst && (
        <div className="absolute top-0 w-px h-[calc(50%+2px)] bg-primary dark:bg-darkSecondary z-0" />
      )}
      
      {!isLast && (
        <div className="absolute top-1/2 w-px h-[calc(50%+1rem+2px)] bg-primary dark:bg-darkSecondary z-0" />
      )}

      <img
        src={logoSrc}
        alt="Company Logo"
        className="relative z-10 w-14 h-14 rounded-full object-cover border border-primary dark:border-darkSecondary bg-white md:group-hover:scale-110 transition-transform duration-300 dark:drop-shadow-[0_0_10px_rgba(230,220,224,0.2)]"
      />
    </div>

    <div className="flex items-center">
      <div className="font-body font-light md:group-hover:translate-x-1.5 transition-transform duration-300 w-full">
        {children}
      </div>
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
        <p className="mb-4 font-body font-light lg:text-lg">
          I study computer science at the <ExternalLink href="https://maps.app.goo.gl/sK6uhRsgKs8JgN9FA">University of Waterloo</ExternalLink>. My primary focus lies in backend engineering and distributed systems, but I'm increasingly fascinated by the infrastructure required to support large-scale AI systems.
        </p>
        <p className="mb-4 font-body font-light lg:text-lg">
          When I'm not staring at a terminal, you'll probably find me <Link href="/misc" className="text-primary hover:text-secondary dark:text-darkSecondary dark:hover:text-darkPrimary transition-all font-bold [text-decoration:none] pb-[0.5px] [box-shadow:inset_0_-0.5px_0_0_var(--primary)] dark:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] hover:[box-shadow:inset_0_-0.5px_0_0_var(--secondary)] dark:hover:[box-shadow:inset_0_-0.5px_0_0_var(--primary)] tracking-tighter dark:neon-glow">drawing</Link>. I also like to make an unnecessary amount of Spotify <ExternalLink href="https://open.spotify.com/user/xpikg3hgljzcxdwltg3zoebtp?si=111b33842cdf497f">playlists</ExternalLink> and consider myself to be a movie enthusiast (with a soft spot for the horror genre), having watched and logged <ExternalLink href="https://letterboxd.com/rubylu/">{displayCount} films</ExternalLink> (<ExternalLink href="https://letterboxd.com/rubylu/diary">{displayYearlyCount} this year</ExternalLink>) on Letterboxd so far. I've recently started learning guitar too.
        </p>
        <p className="mb-4 font-body font-light lg:text-lg">
          This website, which I’ve poured many hours into, is an attempt to capture my growth as a developer as well as the passions that fuel me outside of tech. Thanks for stopping by!
        </p>
      </div>
      
      <div className="p-6 bg-[var(--background)] transition-all mt-8">
        <SectionHeading ellipseRotation={5} ellipseLength={250}>Past, Present, and Future</SectionHeading>
        <div className="flex flex-col">
          <TimelineItem isFirst={true} logoSrc="images/logos/openai.png">
            <p className="font-body font-light lg:text-lg">
              This fall, I'll be in San Francisco as a Member of Technical Staff Intern at <ExternalLink href="https://openai.com/">OpenAI</ExternalLink>! I'm looking forward to exploring the Bay Area and getting lost in technical challenges.
            </p>
          </TimelineItem>
          <TimelineItem logoSrc="images/logos/databricks.png">
            <p className="font-body font-light lg:text-lg">
              This summer, I'm joining <ExternalLink href="https://www.databricks.com/homepage">Databricks</ExternalLink> in San Francisco as a Software Engineering Intern. I've been interested in machine learning infrastructure for a while now, so I'm super excited about this!
            </p>
          </TimelineItem>
          <TimelineItem logoSrc="images/logos/aws.png">
            <p className="font-body font-light lg:text-lg">
              In fall 2025, I interned at <ExternalLink href="https://aws.amazon.com/">Amazon Web Services (AWS)</ExternalLink> in Seattle. I worked with the <ExternalLink href="https://aws.amazon.com/dynamodb/global-tables/">DynamoDB Global Tables</ExternalLink> team to break down regional obstacles for infrastructure tooling. It was definitely interesting to learn about the challenges of maintaining a massive, high-performance database.
            </p>
          </TimelineItem>
          <TimelineItem logoSrc="images/logos/hatch.png">
            <p className="font-body font-light lg:text-lg">
              In winter 2025, I interned at <ExternalLink href="https://www.hatch.com/">Hatch</ExternalLink> in their Niagara Falls office, where I was introduced to the complexities of hydropower optimization. I worked on improving the efficiency of hydropower dams and explored the use of machine learning for predicting water inflow, which bridges the fields of engineering, sustainability, and software.
            </p>
          </TimelineItem>
          <TimelineItem isLast={true} logoSrc="images/logos/ym_inc.png">
            <p className="font-body font-light lg:text-lg">
              In summer 2024, I worked on enhancing desktop applications and automating systems for <ExternalLink href="https://www.ym-inc.com">YM Inc.</ExternalLink>, a Toronto-based retail company that operates fashion brands across North America.
            </p>
          </TimelineItem>
        </div>
      </div>

      {/* <div className="p-6 bg-[var(--background)] transition-all mt-9">
        <SectionHeading ellipseRotation={-5} ellipseLength={200}>Technical Skills</SectionHeading>
        <p className="mb-4 font-body font-light text-lg">These are some languages, libraries, frameworks, and technologies that I have experience working with.</p>

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
      </div> */}

      <div className="p-6 bg-[var(--background)] transition-all mt-8">
        <SectionHeading ellipseRotation={5} ellipseLength={150}>Also</SectionHeading>
        <p className="mb-4 font-body font-light lg:text-lg">I've been reading a lot of <ExternalLink href="https://www.fantagraphics.com/products/the-complete-peanuts-1965-1966-hardback?srsltid=AfmBOooiUpFpPyysLksw0oGwmdfu_0FUBHbOAoufckESWhwQMjI1js5X">Peanuts</ExternalLink> comic strips recently, so enjoy these gifs from <ExternalLink href="https://letterboxd.com/film/a-charlie-brown-christmas/">A Charlie Brown Christmas</ExternalLink>!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="relative">
            <div className="relative before:absolute before:content-[''] before:top-[4px] before:left-[4px] 
                      before:w-full before:h-full before:bg-primary dark:before:bg-darkSecondary 
                      before:rounded-xl before:z-0">
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
            <div className="relative before:absolute before:content-[''] before:top-[4px] before:left-[4px] 
                      before:w-full before:h-full before:bg-primary dark:before:bg-darkSecondary 
                      before:rounded-xl before:z-0">
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

      <div className="relative z-10 transition-all bg-background dark:bg-darkBackground2 p-2 pr-4 flex items-center whitespace-nowrap border border-[var(--primary)] dark:border-darkBackground2 md:hover:-translate-y-0.5 md:hover:-translate-x-0.5 rounded-full">
        <div className="w-6 h-6 mr-2 flex items-center justify-center">
          <img src={iconPath} alt={skillName} className="w-5 h-5 object-contain" />
        </div>
        <span className="font-body font-medium text-[var(--primary)] text-base">{skillName}</span>
      </div>
    </div>
  );
};