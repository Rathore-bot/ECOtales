import React, { useState } from 'react';
import { Leaf, Users, Sparkles, Play } from 'lucide-react';
import StoryModal from '../components/StoryModal';

interface LandingPageProps {
  onRoleSelect: (role: 'student' | 'teacher') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onRoleSelect }) => {
  const [showStory, setShowStory] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-16 w-16 text-green-400 mr-4" />
            <h1 className="text-6xl font-bold text-white">EcoQuest</h1>
            <Sparkles className="h-16 w-16 text-yellow-400 ml-4" />
          </div>
          <p className="text-2xl text-blue-200 mb-2">Gamified Environmental Learning Platform</p>
          <p className="text-lg text-gray-300">Created by Team Bitstromers</p>
        </div>

        {/* Story Button */}
        <div className="mb-12">
          <button
            onClick={() => setShowStory(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center mx-auto"
          >
            <Play className="h-6 w-6 mr-3" />
            Watch Origin Story
          </button>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Student Card */}
          <div 
            onClick={() => onRoleSelect('student')}
            className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 rounded-2xl shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-3xl"
          >
            <div className="text-center">
              <Users className="h-20 w-20 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Student Portal</h2>
              <p className="text-blue-100 text-lg mb-6">
                Embark on an epic environmental adventure! Choose your elemental avatar and explore the world of environmental science through interactive games and challenges.
              </p>
              <div className="bg-white/20 rounded-lg p-4 mb-6">
                <h3 className="text-white font-semibold mb-2">Features:</h3>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>• Choose from 4 Elemental Avatars</li>
                  <li>• Age-appropriate Learning Paths</li>
                  <li>• Interactive Gaming Mode</li>
                  <li>• Environmental Photography</li>
                  <li>• AI Chatbot Assistant</li>
                </ul>
              </div>
              <button className="bg-white text-purple-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Start Your Journey
              </button>
            </div>
          </div>

          {/* Teacher Card */}
          <div 
            onClick={() => onRoleSelect('teacher')}
            className="bg-gradient-to-br from-green-600 to-teal-700 p-8 rounded-2xl shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-3xl"
          >
            <div className="text-center">
              <Leaf className="h-20 w-20 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Teacher Portal</h2>
              <p className="text-green-100 text-lg mb-6">
                Inspire and educate the next generation of environmental stewards. Create engaging content, manage student progress, and watch them grow.
              </p>
              <div className="bg-white/20 rounded-lg p-4 mb-6">
                <h3 className="text-white font-semibold mb-2">Tools:</h3>
                <ul className="text-green-100 text-sm space-y-1">
                  <li>• Student Management System</li>
                  <li>• Quiz & Competition Creator</li>
                  <li>• Progress Tracking</li>
                  <li>• Content Generation</li>
                  <li>• Class Code System</li>
                </ul>
              </div>
              <button className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Manage Your Class
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-400">
          <p>&copy; 2025 EcoQuest Platform - Team Bitstromers. All rights reserved.</p>
        </div>
      </div>

      {showStory && <StoryModal onClose={() => setShowStory(false)} />}
    </div>
  );
};

export default LandingPage;