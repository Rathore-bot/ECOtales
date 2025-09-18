import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { User } from '../types/User';

interface LoginPageProps {
  userRole: 'student' | 'teacher';
  onLogin: (user: User) => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ userRole, onLogin, onBack }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    teacherCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would connect to a backend
    const mockUser: User = {
      id: Math.random().toString(36),
      email: formData.email,
      name: formData.name || formData.email.split('@')[0],
      role: userRole,
      level: userRole === 'student' ? 1 : undefined,
      xp: userRole === 'student' ? 0 : undefined,
      teacherCode: formData.teacherCode || undefined
    };

    onLogin(mockUser);
  };

  const roleColor = userRole === 'student' ? 'blue' : 'green';
  const gradientClass = userRole === 'student' 
    ? 'from-blue-600 to-purple-700' 
    : 'from-green-600 to-teal-700';

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <button 
          onClick={onBack}
          className="text-white hover:text-gray-300 mb-6 flex items-center transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>

        <div className={`bg-gradient-to-br ${gradientClass} p-8 rounded-2xl shadow-2xl`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {userRole === 'student' ? 'Student Portal' : 'Teacher Portal'}
            </h2>
            <p className="text-gray-200">
              {isSignUp ? 'Create your account' : 'Sign in to continue'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-white/40 focus:outline-none"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-white/40 focus:outline-none"
                  placeholder={userRole === 'student' ? 'student@school.edu' : 'teacher@school.edu'}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-300" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full p-3 pl-10 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-white/40 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {userRole === 'student' && isSignUp && (
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Teacher Code (Optional)
                </label>
                <input
                  type="text"
                  value={formData.teacherCode}
                  onChange={(e) => setFormData({...formData, teacherCode: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-white/40 focus:outline-none"
                  placeholder="Enter your teacher's class code"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-white text-gray-900 p-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              {isSignUp ? <UserPlus className="h-5 w-5 mr-2" /> : <LogIn className="h-5 w-5 mr-2" />}
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-white hover:text-gray-300 underline transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;