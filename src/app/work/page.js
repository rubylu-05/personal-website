'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: "Hydropower Inflow Forecasting",
    subtitle: "A machine learning model to optimize hydropower plants",
    image: "/images/projects/lstm.png",
    outlineImage: true,
    shortDescription: "During my recent co-op term at Hatch, I used Pandas and Tensorflow to build a custom LSTM model to predict water inflow, which is one of the most unpredictable variables in hydropower. By processing large datasets of time-based hydrology data, this model helps optimize reservoir management by minimizing head losses. In the end, the model was able to achieve an r\u00B2 score of 0.91, indicating high accuracy compared to baseline methods.",
    fullDescription: [
      {
        section: "Technical Overview",
        intro: "Building the time-series forecasting model involved:",
        points: [
          "Scraping and processing 19 years of NASA OpenDAP hydrology data (2006 - 2024), which included environmental metrics such as rainfall, snowmelt, soil conditions, and much more",
          "Lots of feature engineering to align the different environmental metrics with their delayed impact on water inflow",
          "Designing a 3-layer LSTM network with a custom Huber loss function to handle outliers",
          "Fine-tuning dropout, regularization parameters, and model architecture to prevent overfitting",
          "Visualizing evaluation metrics (validation loss tracking, dropout, r\u00B2) to ensure reliability"
        ]
      },
      {
        section: "Thoughts",
        content: "Hydropower and renewable energy was a field that I had pretty much no knowledge in before working at Hatch, so I was eager to learn about the role of software in the energy sector. This project was interesting to work on because of the real-world application and potential for growth. What excited me the most was seeing how this model could be improved and integrated into the company's optimization systems for hydropower plants. As for the development process, I ended up gaining a much deeper understanding of the theory behind machine learning while I was experimenting with the model. Although it took a lot of time and learning, I enjoyed the process."
      }
    ],
  },
  {
    id: 2,
    title: "Nudge",
    subtitle: "An AI-powered Chrome extension that knows when you're slacking and pressures you to get back on track",
    image: "/images/projects/nudge.png",
    shortDescription: "Nudge was built at UofT Hacks, where our team of 4 wanted to tackle productivity and procrastination in a way that felt more human than typical productivity apps. Instead of silent reminders or site blockers, we built a Chrome extension that observes your Chrome activity and responds with sarcastic commentary inspired by the game The Stanley Parable.",
    demoLink: "https://dorahacks.io/buidl/21709",
    githubLink: "https://github.com/sbrina-w/uofthacks12",
    fullDescription: [
      {
        section: "The Project",
        content: "The user would express the task that they are trying to accomplish; for example, maybe they want to practice Leetcode and get a job. The extension would then start observing their activity, making snarky comments verbally and nudging them to get back on track (hence the name). If they opened a Leetcode problem and went straight to the solution, they would probably get called out. The extension \"speaks\" out loud in a tone and voice that's meant to mimic the narrator in The Stanley Parable."
      },
      {
        section: "Technical Overview",
        points: [
          "JavaScript was used to create the core functionality and monitor user activity",
          "React.js was used to create the extension's pop-up and dashboard",
          "MongoDB was used to store activity logs",
          "Flask was used for the back-end",
          "GPT-4 (OpenAI) was used to generate the responses based on the information fetched from the extension",
          "Eleven Labs TTS was used to give voice to the narrator"
        ]
      },
      {
        section: "Thoughts",
        content: "This product isn't perfect - most hackathon projects aren't - but it taught me a lot about how Chrome extensions work under the hood. I gained some pretty valuable full-stack experience, but unfortunately also learned firsthand about how frustrating Chrome extensions can be to debug, especially when I'm trying to trace different messages and errors between background scripts, popups, and content scripts. However, this made it extra satisfying when the project started coming together nicely. I really enjoyed the process of building Nudge, especially in the unique environment of a hackathon, and found the premise to be pretty fun to design."
      }
    ],
  },
  {
    id: 3,
    title: "Pok\u00E9plants",
    subtitle: "A game to make people feel more guilty about killing their houseplants | 1st place @ Hack the 6ix",
    image: "/images/projects/pokeplants.png",
    shortDescription: "Pok\u00E9plants was built at Hack the 6ix, where our team of 4 wanted to tackle the issue of houseplants dying from lack of care. We wanted to make a product that would make plant care more fun, engaging, and rewarding, so we turned it into a Pok\u00E9mon-inspired game. This project combines hardware sensors, computer vision, and Pok\u00E9mon-style web-based RPG to monitor plants in real-time and gamify plant care.",
    demoLink: "https://devpost.com/software/pokeplants",
    githubLink: "https://github.com/FO214/ht6",
    fullDescription: [
      {
        section: "The Project",
        content: "Pok\u00E9plants creates an interactive gaming experience where users can use their real-life houseplants as Pok\u00E9mon-style characters to battle others. The user would add their plant to their \"Plantdex\", and hardware components (a camera, moisture sensors, and a photoresistor) would provide real-time insight into the plant's health. Stronger plants have stronger abilities, so the game is meant to create an incentive for players to take better care of their plants."
      },
      {
        section: "Technical Overview",
        points: [
          "Hardware was used to measure plant health",
          "OpenAI was used to identify plants and their health",
          "Langchain was used to process data into game actions",
          "Flask was used for the back-end",
          "Socket.IO was used for real-time multiplayer battles",
          "React.js was used in the front-end to design the game itself"
        ]
      },
      {
        section: "Thoughts",
        content: "This project initially started off as a kind of unserious idea from a team member (\"what if we made Pok\u00E9mon but with actual plants?\"), but it ended up taking us further than we expected. Our intention was to go for the environmental track prize, which was a cool IKEA shark plushie. Instead, we ended up winning the whole thing and receiving a pair of 2nd-gen Airpod Pros! I found it pretty exciting to collaborate with a talented team and work under pressure to turn an idea into a product. There was a lot of front-end work involved here, and we were determined to make the game and its mechanics look fun, which is why we decided to try to evoke the nostalgia of old Pok\u00E9mon games. Overall, I was happy about how this project turned out and pleasantly surprised by its win at Toronto's largest summer hackathon."
      }
    ],
  },
  {
    id: 4,
    title: "Chroma: Your Personal Colour Assistant",
    subtitle: "A mobile app to simplify the painting and colour mixing process",
    image: "/images/projects/chroma.png",
    shortDescription: "Chroma was built for an online hackathon called WaffleHacks, where me and my partner wanted to make a tool that takes the guesswork out of colour matching by generating palettes and determining ratios mathematically. This project was motivated by our shared enthusiasm for art.",
    demoLink: "https://devpost.com/software/chroma-q3wshr",
    githubLink: "https://github.com/sbrina-w/Chroma/",
    fullDescription: [
      {
        section: "The Project",
        content: "Chroma allows the user to input their available colours by adding them with a colour picker or uploading a photo of their paint swatches. These colours will be stored in a palette that they can edit and fine-tune. Next, the user can choose to take or upload an image to use as a reference, and the app will generate a palette based on this image. With these two palettes, the app uses a linear algebra approach to calculate the ratios for how much of each available colour is needed to create the target colours."
      },
      {
        section: "Technical Overview",
        points: [
          "Flutter was used to build the mobile app",
          "Flask was used for the back-end, which includes a Python script to handle calculations",
          "OpenCV was used to extract colours from images",
          "An AWS EC2 instance was used to host the back-end server"
        ]
      },
      {
        section: "Thoughts",
        content: "Mobile app development operates pretty differently from web development, so it was a little intimidating at first. However, we were determined to make it work, even under the time constraint of a hackathon. We did a lot of breaking, fixing, learning, and desperate researching to finish the project just in time. It's worth noting that the RGB colour model (which is optimized for screens) might not be the best representation of how paints actually mix in real life, but the resulting colours generally ended up being pretty close to the target colours. This experience introduced me to the world of mobile development, which I would definitely be willing to explore further."
      }
    ],
  }
];

const ProjectLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-background dark:bg-darkBackground border border-primary dark:border-darkSecondary text-[var(--primary)] px-3 py-1 text-xs font-body transition-all hover:scale-105 hover:border-secondary dark:hover:border-darkSecondary dark:hover:bg-darkSecondary hover:text-secondary dark:hover:text-darkPrimary"
  >
    {children}
  </a>
);

const ProjectDescriptionSection = ({ section }) => (
  <div className="mb-6">
    <h4 className="text-lg font-heading font-bold text-primary dark:text-darkSecondary mb-2">
      {section.section}
    </h4>
    {section.intro && (
      <p className="font-body text-sm font-light mb-2">
        {section.intro}
      </p>
    )}
    {section.points ? (
      <ul className="list-disc pl-5 font-body text-sm font-light space-y-1 [&>li]:marker:text-[var(--secondary)]">
        {section.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    ) : (
      <p className="font-body text-sm font-light">
        {section.content}
      </p>
    )}
  </div>
);

const ExpandedContent = ({ isExpanded, fullDescription }) => (
  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? '' : 'max-h-0'
    }`}>
    <div className="mt-4 space-y-6">
      {fullDescription.map((section, index) => (
        <ProjectDescriptionSection key={index} section={section} />
      ))}
    </div>
  </div>
);

const ProjectCard = ({ project, imageOnRight, isExpanded, toggleExpand }) => (
  <div className={`transition-all bg-background dark:bg-darkBackground2 border border-primary dark:border-darkSecondary p-6 sm:p-6 sm:pl-10 sm:pr-10 transition-all'
    }`}>
    <div className={`flex flex-col md:flex-row gap-6 mb-6 ${imageOnRight ? 'md:flex-row-reverse' : ''}`}>
      <div className="md:w-1/3 relative">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={300}
          className={`w-full h-auto object-contain transition-all hover:scale-105 ${project.outlineImage ? 'border border-primary dark:border-darkSecondary' : ''
            }`}
        />
      </div>

      <div className="md:w-2/3">
        <h2 className="text-2xl font-heading font-bold text-[var(--primary)] mb-2">
          {project.title}
        </h2>
        <h3 className="text-lg font-heading font-bold text-[var(--secondary)] mb-4">
          {project.subtitle}
        </h3>
        <p className="font-body font-light text-sm font-[var(--primary)]">
          {project.shortDescription}
        </p>
      </div>
    </div>

    <ExpandedContent
      isExpanded={isExpanded}
      fullDescription={project.fullDescription}
    />

    <div className="flex justify-between mt-4">
      <div className="flex items-center gap-2">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:text-[var(--secondary)] transition-all hover:scale-105"
          >
            <FaGithub size={20} />
          </a>
        )}
        {project.demoLink && <ProjectLink href={project.demoLink}>Link</ProjectLink>}
      </div>
      <button
        onClick={() => toggleExpand(project.id)}
        className="bg-background dark:bg-darkBackground border border-primary dark:border-darkSecondary text-[var(--primary)] px-3 py-1 text-xs font-body transition-all hover:scale-105 hover:border-secondary dark:hover:border-darkSecondary dark:hover:bg-darkSecondary hover:text-secondary dark:hover:text-darkPrimary"
      >
        {isExpanded ? 'Show Less' : 'Read More'}
      </button>
    </div>
  </div>
);

export default function Work() {
  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpand = (id) => {
    setExpandedIds(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="px-8 py-8 sm:p-20 sm:pt-16">
      <div className="space-y-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            imageOnRight={index % 2 !== 0}
            isExpanded={expandedIds.includes(project.id)}
            toggleExpand={toggleExpand}
          />
        ))}
      </div>
    </div>
  );
}