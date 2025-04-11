'use client';

import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: "Hydropower Inflow Forecasting with LSTM",
    subtitle: "A machine learning model to optimize hydropower plants",
    image: "/images/projects/lstm.png",
    shortDescription: "During my recent co-op term at Hatch, I used Pandas and Tensorflow to build a custom LSTM model to predict water inflow, which is one of the most unpredictable variables hydropower. By analyzing historical hydrology data (rainfall, snowmelt, soil conditions, and more), this model helps optimize reservoir management by minimizing head losses. In the end, the model was able to achieve an r2 score of 0.91, indicating high accuracy compared to baseline methods.",
    fullDescription: [
      {
        section: "Technical Overview",
        intro: "Building the time-series forecasting model involved:",
        points: [
          "Scraping and processing 15+ years of NASA OpenDAP hydrology data (2006-2022), which included environmental metrics such as rainfall, snowmelt, soil conditions, and much more",
          "Lots of feature engineering to align the different environmental metrics with their delayed impact on water inflow",
          "Designing a 3-layer LSTM network with a custom Huber loss function to handle outliers",
          "Fine-tuning dropout, regularization parameters, and model architecture to prevent overfitting",
          "Visualizing evaluation metrics (validation loss tracking, dropout, r2) to ensure reliability"
        ]
      },
      {
        section: "Thoughts",
        content: "Hydropower and renewable energy was a field that I had pretty much no knowledge in before working at Hatch, so I was pretty eager to learn about software and its contributions to the energy sector. This project was interesting to work on because of the real-world application and potential for growth. What excited me the most was seeing how this model could be improved and integrated into the company's optimization systems for hydropower plants. As for the development process, I ended up gaining a much deeper understanding of the theory behind machine learning while I was experimenting with the model. Although it took a lot of time and learning, I enjoyed the process."
      }
    ],
  },
];

export default function Work() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="mt-6 ml-6 mr-10">      
      <div className="space-y-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 transition-all duration-300 ${expandedId === project.id ? 'shadow-lg' : 'shadow-md'}`}
          >
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="md:w-1/3">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              
              <div className="md:w-2/3">
                <h2 className="text-2xl font-body font-bold text-primary mb-2">
                  {project.title}
                </h2>
                <h3 className="text-lg font-body font-light text-secondary mb-4">
                  {project.subtitle}
                </h3>
                
                <p className="font-body text-sm font-light">
                  {project.shortDescription}
                </p>
              </div>
            </div>
            
            {expandedId === project.id && (
              <div className="mt-4 space-y-6 animate-fadeIn">
                {project.fullDescription.map((section, index) => (
                  <div key={index} className="mb-6">
                    <h4 className="text-xl font-body font-bold text-primary mb-3">
                      {section.section}
                    </h4>
                    
                    {section.intro && (
                      <p className="font-body text-sm font-light mb-3">
                        {section.intro}
                      </p>
                    )}
                    
                    {section.points ? (
                      <ul className="list-disc pl-5 font-body text-sm font-light space-y-1 [&>li]:marker:text-secondary">
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
                ))}
              </div>
            )}
            
            <div className="flex justify-end mt-4">
              <button
                onClick={() => toggleExpand(project.id)}
                className="bg-primary bg-opacity-10 hover:bg-opacity-20 text-primary px-3 py-1 rounded-full text-xs font-medium transition-all duration-200"
              >
                {expandedId === project.id ? 'Show Less' : 'Read More'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}