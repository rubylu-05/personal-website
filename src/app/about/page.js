'use client';

import Link from 'next/link';

const skillGroups = [
  {
    category: 'Languages',
    items: ['Python', 'C++', 'C', 'C#', 'Java', 'JavaScript', 'Dart']
  },
  {
    category: 'Web Development',
    items: ['HTML/CSS', 'React.js', 'Next.js', 'Node.js', 'Flask']
  },
  {
    category: 'Data & Machine Learning',
    items: ['TensorFlow', 'OpenCV', 'Pandas', 'SQL']
  },
  {
    category: 'Cloud & Databases',
    items: ['Firebase', 'MongoDB', 'AWS']
  },
  {
    category: 'Mobile Development',
    items: ['Flutter']
  },
  {
    category: 'Desktop & Systems',
    items: ['.NET']
  }
];

export default function About() {
  return (
    <div className="mt-6 ml-6 mr-20">
      <h1 className="text-4xl font-body font-extralight text-secondary mb-4">Hi, I'm Ruby!</h1>
      <p className="font-light font-body mb-4">
        I'm a computer science student at the University of Waterloo who loves building practical solutions and learning through implementation. I've worked across various tech stacks in academic, personal, and professional projects, and I'm always eager to learn more.
      </p>
      <p className="mb-12 font-body font-light">
        When I'm not staring at a terminal, you'll probably find me indulging in my creative side through <Link href="/misc" className="text-primary font-extrabold underline-animation">art</Link>, 
        whether it's sketching, painting, digital art, or working with alcohol markers. I also like to make an unnecessary amount of Spotify <a href="https://open.spotify.com/user/xpikg3hgljzcxdwltg3zoebtp?si=111b33842cdf497f" className="text-primary font-extrabold underline-animation" target="_blank"> playlists</a> and consider myself to be a movie enthusiast (with a soft spot for the horror genre), having watched and logged 561 <a href="https://letterboxd.com/rubylu/" className="text-primary font-extrabold underline-animation" target="_blank"> films</a> on Letterboxd so far.
      </p>
      
      <h2 className="text-4xl font-body font-extralight text-secondary mb-4">Past, present, and future</h2>
      <p className="mb-4 font-body font-light">
        In the summer of 2024, I worked on enhancing desktop applications and automating systems for <a href="https://www.ym-inc.com" className="text-primary font-extrabold underline-animation" target="_blank">YM Inc.</a>, a Toronto-based retail company that operates fashion brands across North America.
      </p>
      <p className="mb-4 font-body font-light">
        In winter 2025, I interned at <a href="https://www.hatch.com/" className="text-primary font-extrabold underline-animation" target="_blank">Hatch</a> in their Niagara Falls office, where I dipped my toes into the complexities of hydropower optimization. I worked to improve the efficiency of hydroelectric dams and explored the use of machine learning for predicting water inflow - this experience ended up being a really interesting intersection of engineering, sustainability, and software.
      </p>
      <p className="mb-4 font-body font-light">
        In the fall of 2025, I'll be joining <a href="https://aws.amazon.com/" className="text-primary font-extrabold underline-animation" target="_blank">Amazon Web Services (AWS)</a> in Seattle as an SDE intern, which I'm pretty excited about!
      </p>
      <p className="mb-12 font-body font-light">I'm currently on the lookout for summer 2026 internship opportunities.</p>
      
      <h2 className="text-4xl font-body font-extralight text-secondary mb-4">Technical skills</h2>
      
      {/* Technical Skills */}
      <div className="mb-12">
        {skillGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-8">
            <h3 className="text-xl font-body font-extrabold text-primary mb-4">{group.category}</h3>
            <div className="flex flex-wrap gap-3">
              {group.items.map((skillName, skillIndex) => (
                <div 
                  key={`${skillName}-${skillIndex}`} 
                  className="bg-light2 dark:bg-gray-800 px-4 py-2 rounded-lg flex items-center whitespace-nowrap"
                >
                  <div className="w-6 h-6 mr-2 flex items-center justify-center">
                    <img 
                      src={`/images/tech_icons/${skillName.toLowerCase().replace('.', '').replace('/', '-').replace('#', 'sharp')}.png`} 
                      alt={skillName}
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span className="font-body font-medium text-sm">{skillName}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}