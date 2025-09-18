import React from 'react';
import { Users, GraduationCap, Briefcase, BookOpen, Sparkles } from 'lucide-react';

interface AgeGroupSelectionProps {
  onAgeSelect: (ageGroup: string) => void;
}

const AgeGroupSelection: React.FC<AgeGroupSelectionProps> = ({ onAgeSelect }) => {
  const ageGroups = [
    {
      id: '7-14',
      name: 'Young Explorers',
      ageRange: '7-14 years',
      icon: BookOpen,
      gradient: 'from-pink-500 to-purple-600',
      description: 'Fun games, colorful visuals, and simple environmental concepts. Perfect for curious minds just starting their eco-journey!',
      features: ['Interactive Games', 'Fun Animations', 'Simple Quizzes', 'Storybook Learning']
    },
    {
      id: '15-18',
      name: 'Eco Warriors',
      ageRange: '15-18 years',
      icon: Users,
      gradient: 'from-blue-500 to-teal-600',
      description: 'Deeper environmental science, real-world projects, and peer challenges. Ready to make a real impact!',
      features: ['Science Projects', 'Peer Competitions', 'Real Data Analysis', 'Community Challenges']
    },
    {
      id: '19-21',
      name: 'Green Pioneers',
      ageRange: '19-21 years',
      icon: GraduationCap,
      gradient: 'from-green-500 to-emerald-600',
      description: 'Advanced concepts, research opportunities, and leadership roles in environmental conservation.',
      features: ['Research Projects', 'Leadership Roles', 'Advanced Analytics', 'Mentorship Programs']
    },
    {
      id: '22+',
      name: 'Environmental Leaders',
      ageRange: '22+ years',
      icon: Briefcase,
      gradient: 'from-purple-600 to-indigo-700',
      description: 'Professional development, career integration, and advanced environmental management.',
      features: ['Career Integration', 'Professional Tools', 'Industry Insights', 'Policy Analysis']
    },
    {
      id: 'vocational',
      name: 'Skill Builders',
      ageRange: 'Vocational',
      icon: Sparkles,
      gradient: 'from-orange-500 to-red-600',
      description: 'Hands-on training, practical skills, and job-oriented environmental education.',
      features: ['Hands-on Training', 'Skill Certifications', 'Job Preparation', 'Industry Connect']
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Choose Your Learning Path</h1>
          <p className="text-xl text-blue-200 mb-2">Customized environmental education for every age group</p>
          <p className="text-lg text-gray-300">Select the path that matches your learning style and goals</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ageGroups.map((group) => {
            const IconComponent = group.icon;
            return (
              <div
                key={group.id}
                onClick={() => onAgeSelect(group.id)}
                className={`bg-gradient-to-br ${group.gradient} p-6 rounded-2xl shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-3xl`}
              >
                <div className="text-center">
                  <div className="mb-4">
                    <IconComponent className="h-16 w-16 text-white mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{group.name}</h3>
                  <div className="bg-white/20 rounded-lg p-2 mb-4">
                    <p className="text-white font-semibold text-sm">{group.ageRange}</p>
                  </div>
                  <p className="text-white/90 text-sm mb-4 leading-relaxed">{group.description}</p>
                  
                  <div className="bg-white/10 rounded-lg p-3 mb-4">
                    <h4 className="text-white font-semibold text-xs mb-2">Key Features:</h4>
                    <ul className="text-white/80 text-xs space-y-1">
                      {group.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                    Select Path
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">🎯 Personalized Learning Experience</h3>
          <p className="text-gray-200">
            Each learning path is carefully designed with age-appropriate content, challenges, and rewards. 
            You can always switch paths later as you grow and develop new interests!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeGroupSelection;