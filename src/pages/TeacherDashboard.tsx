import React, { useState } from 'react';
import { User } from '../types/User';
import Sidebar from '../components/Sidebar';
import TeacherOverview from '../components/teacher/TeacherOverview';
import StudentManagement from '../components/teacher/StudentManagement';
import QuizCreator from '../components/teacher/QuizCreator';
import ContentGenerator from '../components/teacher/ContentGenerator';
import GameCreator from '../components/teacher/GameCreator';
import Analytics from '../components/teacher/Analytics';

interface TeacherDashboardProps {
  user: User;
  onLogout: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: 'home' },
    { id: 'students', label: 'Students', icon: 'users' },
    { id: 'quizzes', label: 'Create Quiz', icon: 'clipboard' },
    { id: 'content', label: 'Content Generator', icon: 'file-text' },
    { id: 'games', label: 'Game Creator', icon: 'gamepad' },
    { id: 'analytics', label: 'Analytics', icon: 'bar-chart' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <TeacherOverview user={user} />;
      case 'students':
        return <StudentManagement user={user} />;
      case 'quizzes':
        return <QuizCreator user={user} />;
      case 'content':
        return <ContentGenerator user={user} />;
      case 'games':
        return <GameCreator user={user} />;
      case 'analytics':
        return <Analytics user={user} />;
      default:
        return <TeacherOverview user={user} />;
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

export default TeacherDashboard;