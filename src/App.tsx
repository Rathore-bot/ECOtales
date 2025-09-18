import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AvatarSelection from './pages/AvatarSelection';
import AgeGroupSelection from './pages/AgeGroupSelection';
import { User } from './types/User';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [userRole, setUserRole] = useState<'student' | 'teacher' | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    setUserRole(role);
    setCurrentPage('login');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    if (userData.role === 'student' && !userData.avatar) {
      setCurrentPage('avatar-selection');
    } else if (userData.role === 'student' && !userData.ageGroup) {
      setCurrentPage('age-selection');
    } else {
      setCurrentPage(userData.role === 'student' ? 'student-dashboard' : 'teacher-dashboard');
    }
  };

  const handleAvatarSelect = (avatar: string) => {
    if (user) {
      const updatedUser = { ...user, avatar };
      setUser(updatedUser);
      setCurrentPage('age-selection');
    }
  };

  const handleAgeSelect = (ageGroup: string) => {
    setSelectedAge(ageGroup);
    if (user) {
      const updatedUser = { ...user, ageGroup };
      setUser(updatedUser);
      setCurrentPage('student-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserRole(null);
    setSelectedAge(null);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onRoleSelect={handleRoleSelect} />;
      case 'login':
        return <LoginPage userRole={userRole!} onLogin={handleLogin} onBack={() => setCurrentPage('landing')} />;
      case 'avatar-selection':
        return <AvatarSelection onAvatarSelect={handleAvatarSelect} />;
      case 'age-selection':
        return <AgeGroupSelection onAgeSelect={handleAgeSelect} />;
      case 'student-dashboard':
        return <StudentDashboard user={user!} onLogout={handleLogout} />;
      case 'teacher-dashboard':
        return <TeacherDashboard user={user!} onLogout={handleLogout} />;
      default:
        return <LandingPage onRoleSelect={handleRoleSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-green-900">
      {renderPage()}
    </div>
  );
}

export default App;