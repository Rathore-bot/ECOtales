import React, { useState } from 'react';
import { User } from '../types/User';
import Sidebar from '../components/Sidebar';
import DashboardOverview from '../components/student/DashboardOverview';
import GameMode from '../components/student/GameMode';
import Leaderboard from '../components/student/Leaderboard';
import PhotoCapture from '../components/student/PhotoCapture';
import ChatBot from '../components/student/ChatBot';
import MyTrees from '../components/student/MyTrees';
import MyGoals from '../components/student/MyGoals';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: 'home' },
    { id: 'game', label: 'Game Mode', icon: 'gamepad' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'trophy' },
    { id: 'photos', label: 'Photo Capture', icon: 'camera' },
    { id: 'trees', label: 'My Trees', icon: 'tree' },
    { id: 'goals', label: 'My Goals', icon: 'target' },
    { id: 'chat', label: 'Eco Assistant', icon: 'message' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview user={user} />;
      case 'game':
        return <GameMode user={user} />;
      case 'leaderboard':
        return <Leaderboard user={user} />;
      case 'photos':
        return <PhotoCapture user={user} />;
      case 'trees':
        return <MyTrees user={user} />;
      case 'goals':
        return <MyGoals user={user} />;
      case 'chat':
        return <ChatBot user={user} />;
      default:
        return <DashboardOverview user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-green-900 flex">
      <Sidebar 
        user={user}
        menuItems={menuItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
      />
      <main className="flex-1 ml-64 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;