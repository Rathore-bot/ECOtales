import React from 'react';
import { User } from '../../types/User';
import { Users, BookOpen, Trophy, TrendingUp, Calendar, Award } from 'lucide-react';

interface TeacherOverviewProps {
  user: User;
}

const TeacherOverview: React.FC<TeacherOverviewProps> = ({ user }) => {
  // Mock data - in real app, this would come from API
  const stats = {
    totalStudents: 45,
    activeQuizzes: 3,
    completedAssignments: 89,
    averageScore: 85,
    classCode: 'ECO2025',
    weeklyGrowth: 12
  };

  const recentActivity = [
    { student: 'Emma Thompson', action: 'Completed Quiz: Climate Change', time: '2 hours ago', score: 95 },
    { student: 'Alex Rodriguez', action: 'Submitted Photo: Water Pollution', time: '4 hours ago', score: null },
    { student: 'Maya Patel', action: 'Planted Tree: Community Garden', time: '6 hours ago', score: null },
    { student: 'Jake Morrison', action: 'Achieved Goal: Energy Conservation', time: '1 day ago', score: null },
  ];

  const upcomingEvents = [
    { title: 'Earth Day Project Presentations', date: '2025-04-22', type: 'event' },
    { title: 'Quiz: Renewable Energy', date: '2025-02-05', type: 'quiz' },
    { title: 'Field Trip: Recycling Center', date: '2025-02-15', type: 'trip' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-lg opacity-90">Welcome back, {user.name}! Ready to inspire environmental champions?</p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            <span>{stats.totalStudents} Students</span>
          </div>
          <div className="flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            <span>{stats.averageScore}% Avg Score</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            <span>+{stats.weeklyGrowth}% This Week</span>
          </div>
        </div>
      </div>

      {/* Class Code */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 text-white text-center">
        <h3 className="text-lg font-semibold mb-2">Your Class Code</h3>
        <div className="text-3xl font-bold tracking-wider mb-2">{stats.classCode}</div>
        <p className="text-sm opacity-80">Share this code with students to join your class automatically</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.totalStudents}</span>
          </div>
          <h3 className="text-white font-semibold">Total Students</h3>
          <p className="text-gray-300 text-sm">Enrolled in your classes</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{stats.activeQuizzes}</span>
          </div>
          <h3 className="text-white font-semibold">Active Quizzes</h3>
          <p className="text-gray-300 text-sm">Currently available</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{stats.completedAssignments}</span>
          </div>
          <h3 className="text-white font-semibold">Submissions</h3>
          <p className="text-gray-300 text-sm">This month</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Award className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">{stats.averageScore}%</span>
          </div>
          <h3 className="text-white font-semibold">Average Score</h3>
          <p className="text-gray-300 text-sm">Class performance</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Student Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-white font-semibold">{activity.student}</h3>
                  <p className="text-gray-300 text-sm">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
                {activity.score && (
                  <div className="text-right">
                    <div className="text-green-400 font-bold">{activity.score}%</div>
                    <div className="text-xs text-gray-400">Score</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center p-4 bg-white/5 rounded-lg">
                <div className="mr-4">
                  <Calendar className="h-8 w-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{event.title}</h3>
                  <p className="text-gray-300 text-sm">
                    {new Date(event.date).toLocaleDateString()} • 
                    <span className="capitalize ml-1">{event.type}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 p-4 rounded-lg transition-colors">
            <BookOpen className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Create Quiz</span>
          </button>
          <button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 p-4 rounded-lg transition-colors">
            <Users className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Add Students</span>
          </button>
          <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 p-4 rounded-lg transition-colors">
            <Trophy className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">View Progress</span>
          </button>
          <button className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 p-4 rounded-lg transition-colors">
            <Calendar className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Schedule Event</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;