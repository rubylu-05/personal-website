'use client';

import { FaPython, FaJava, FaJs, FaReact, FaNodeJs, FaAws } from 'react-icons/fa';
import { SiCplusplus, SiDart, SiTensorflow, SiOpencv, SiPandas, SiFlask, SiDotnet, SiFlutter, SiFirebase, SiMongodb, SiNextdotjs } from 'react-icons/si';
import { TbSql } from 'react-icons/tb';
import { DiHtml5 } from 'react-icons/di';

function TechnicalSkills() {
  const skills = [
    {
      category: 'Languages',
      items: [
        { name: 'Python', icon: <FaPython className="text-blue-500" /> },
        { name: 'C++', icon: <SiCplusplus className="text-blue-600" /> },
        { name: 'C', icon: <SiCplusplus className="text-blue-400" /> },
        { name: 'C#', icon: <SiCplusplus className="text-purple-600" /> },
        { name: 'Java', icon: <FaJava className="text-red-500" /> },
        { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
        { name: 'Dart', icon: <SiDart className="text-blue-400" /> },
      ]
    },
    {
      category: 'Web Development',
      items: [
        { name: 'HTML/CSS', icon: <DiHtml5 className="text-orange-500" /> },
        { name: 'React.js', icon: <FaReact className="text-blue-400" /> },
        { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
        { name: 'Flask', icon: <SiFlask className="text-black dark:text-white" /> },
      ]
    },
    {
      category: 'Data & AI',
      items: [
        { name: 'TensorFlow', icon: <SiTensorflow className="text-orange-500" /> },
        { name: 'OpenCV', icon: <SiOpencv className="text-white bg-blue-500 rounded" /> },
        { name: 'Pandas', icon: <SiPandas className="text-red-500" /> },
        { name: 'SQL', icon: <TbSql className="text-blue-400" /> },
      ]
    },
    {
      category: 'Mobile & Cloud',
      items: [
        { name: 'Flutter', icon: <SiFlutter className="text-blue-400" /> },
        { name: '.NET', icon: <SiDotnet className="text-purple-600" /> },
        { name: 'Firebase', icon: <SiFirebase className="text-yellow-500" /> },
        { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
        { name: 'AWS', icon: <FaAws className="text-orange-500" /> },
      ]
    }
  ];

  return (
    <div className="mb-12">
      {skills.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-8">
          <h3 className="text-xl font-body font-extrabold text-primary mb-4">{group.category}</h3>
          <div className="flex flex-wrap gap-3">
            {group.items.map((skill, skillIndex) => (
              <div 
                key={`${skill.name}-${skillIndex}`} 
                className="bg-light2 dark:bg-gray-800 px-4 py-2 rounded-lg flex items-center whitespace-nowrap"
              >
                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                  {skill.icon}
                </div>
                <span className="font-body font-medium text-sm">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TechnicalSkills;