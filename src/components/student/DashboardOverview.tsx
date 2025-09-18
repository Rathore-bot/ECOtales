import React from 'react';
import { User } from '../../types/User';
import { Trophy, Target, Camera, TreePine, Zap, TrendingUp } from 'lucide-react';

interface DashboardOverviewProps {
  user: User;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ user }) => {
  // Mock data - in real app, this would come from API
  const stats = {
    photosCaptured: 12,
    treesPlanted: 5,
    goalsCompleted: 3,
    totalContributions: 8,
    rank: 15,
    streakDays: 7
  };

  const recentAchievements = [
    { title: "First Tree Planted", date: "2 days ago", icon: TreePine, color: "green" },
    { title: "Photo Explorer", date: "1 week ago", icon: Camera, color: "blue" },
    { title: "Goal Setter", date: "1 week ago", icon: Target, color: "purple" }
  ];

  const getAgeGroupTheme = (ageGroup?: string) => {
    switch (ageGroup) {
      case '7-14':
        return { 
          primary: 'from-pink-500 to-purple-600',
          secondary: 'pink',
          title: 'Young Explorer Dashboard'
        };
      case '15-18':
        return { 
          primary: 'from-blue-500 to-teal-600',
          secondary: 'blue',
          title: 'Eco Warrior Command Center'
        };
      case '19-21':
        return { 
          primary: 'from-green-500 to-emerald-600',
          secondary: 'green',
          title: 'Green Pioneer Hub'
        };
      case '22+':
        return { 
          primary: 'from-purple-600 to-indigo-700',
          secondary: 'purple',
          title: 'Environmental Leader Portal'
        };
      case 'vocational':
        return { 
          primary: 'from-orange-500 to-red-600',
          secondary: 'orange',
          title: 'Skill Builder Workshop'
        };
      default:
        return { 
          primary: 'from-blue-500 to-purple-600',
          secondary: 'blue',
          title: 'Dashboard'
        };
    }
  };

  const theme = getAgeGroupTheme(user.ageGroup);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className={`bg-gradient-to-r ${theme.primary} rounded-2xl p-6 text-white`}>
        <h1 className="text-3xl font-bold mb-2">{theme.title}</h1>
        <p className="text-lg opacity-90">Welcome back, {user.name}! Ready to save the planet today?</p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            <span>Level {user.level || 1}</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            <span>{user.xp || 0} XP</span>
          </div>
          <div className="flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            <span>Rank #{stats.rank}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Camera className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{stats.photosCaptured}</span>
          </div>
          <h3 className="text-white font-semibold">Photos Captured</h3>
          <p className="text-gray-300 text-sm">Environmental documentation</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <TreePine className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{stats.treesPlanted}</span>
          </div>
          <h3 className="text-white font-semibold">Trees Planted</h3>
          <p className="text-gray-300 text-sm">Your green contributions</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Target className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">{stats.goalsCompleted}</span>
          </div>
          <h3 className="text-white font-semibold">Goals Achieved</h3>
          <p className="text-gray-300 text-sm">Environmental milestones</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{stats.streakDays}</span>
          </div>
          <h3 className="text-white font-semibold">Day Streak</h3>
          <p className="text-gray-300 text-sm">Daily engagement</p>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">Recent Achievements</h2>
        <div className="space-y-4">
          {recentAchievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div key={index} className="flex items-center p-4 bg-white/5 rounded-lg">
                <div className={`p-3 rounded-full bg-${achievement.color}-500/20 mr-4`}>
                  <IconComponent className={`h-6 w-6 text-${achievement.color}-400`} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{achievement.title}</h3>
                  <p className="text-gray-300 text-sm">{achievement.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 p-4 rounded-lg transition-colors">
            <Camera className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Capture Photo</span>
          </button>
          <button className="bg-green-500/20 hover:bg-green-500/30 text-green-300 p-4 rounded-lg transition-colors">
            <TreePine className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Plant Tree</span>
          </button>
          <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 p-4 rounded-lg transition-colors">
            <Target className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Set Goal</span>
          </button>
          <button className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 p-4 rounded-lg transition-colors">
            <Zap className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Play Game</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;