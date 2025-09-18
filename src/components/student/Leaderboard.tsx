import React, { useState } from 'react';
import { User } from '../../types/User';
import { Trophy, Medal, Crown, Star, TrendingUp } from 'lucide-react';

interface LeaderboardProps {
  user: User;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState('overall');

  // Mock leaderboard data
  const leaderboardData = {
    overall: [
      { rank: 1, name: 'Emma Green', xp: 2450, avatar: 'earth', level: 12, badge: 'crown' },
      { rank: 2, name: 'Alex Rivers', xp: 2380, avatar: 'water', level: 11, badge: 'gold' },
      { rank: 3, name: 'Maya Storm', xp: 2250, avatar: 'air', level: 11, badge: 'silver' },
      { rank: 4, name: 'Jake Fire', xp: 2100, avatar: 'fire', level: 10, badge: 'bronze' },
      { rank: 5, name: 'Lisa Earth', xp: 1980, avatar: 'earth', level: 10, badge: null },
      // ... more entries
      { rank: 15, name: user.name, xp: user.xp || 0, avatar: user.avatar || 'earth', level: user.level || 1, badge: null, isCurrentUser: true }
    ],
    weekly: [
      { rank: 1, name: 'Maya Storm', xp: 850, avatar: 'air', level: 11, badge: 'crown' },
      { rank: 2, name: 'Emma Green', xp: 720, avatar: 'earth', level: 12, badge: 'gold' },
      { rank: 3, name: user.name, xp: 650, avatar: user.avatar || 'earth', level: user.level || 1, badge: 'silver', isCurrentUser: true },
    ],
    photos: [
      { rank: 1, name: 'Alex Rivers', count: 45, avatar: 'water', level: 11, badge: 'crown' },
      { rank: 2, name: 'Emma Green', count: 38, avatar: 'earth', level: 12, badge: 'gold' },
      { rank: 3, name: 'Maya Storm', count: 32, avatar: 'air', level: 11, badge: 'silver' },
    ]
  };

  const categories = [
    { id: 'overall', name: 'Overall XP', icon: Trophy },
    { id: 'weekly', name: 'This Week', icon: TrendingUp },
    { id: 'photos', name: 'Photos Captured', icon: Star }
  ];

  const getBadgeIcon = (badge: string | null) => {
    switch (badge) {
      case 'crown': return <Crown className="h-5 w-5 text-yellow-400" />;
      case 'gold': return <Medal className="h-5 w-5 text-yellow-400" />;
      case 'silver': return <Medal className="h-5 w-5 text-gray-400" />;
      case 'bronze': return <Medal className="h-5 w-5 text-orange-400" />;
      default: return null;
    }
  };

  const getAvatarColor = (avatar: string) => {
    switch (avatar) {
      case 'water': return 'text-blue-400';
      case 'fire': return 'text-red-400';
      case 'earth': return 'text-green-400';
      case 'air': return 'text-gray-400';
      default: return 'text-white';
    }
  };

  const currentData = leaderboardData[selectedCategory as keyof typeof leaderboardData] || leaderboardData.overall;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-gray-300">Compete with fellow environmental champions</p>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl text-white text-center">
          <div className="text-2xl font-bold">#{currentData.find(entry => 'isCurrentUser' in entry && entry.isCurrentUser)?.rank || 'N/A'}</div>
          <div className="text-sm opacity-80">Your Rank</div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 bg-white/10 p-2 rounded-xl">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <IconComponent className="h-5 w-5 mr-2" />
              <span className="font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Leaderboard */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            {categories.find(c => c.id === selectedCategory)?.name} Rankings
          </h2>
          <div className="space-y-3">
            {currentData.map((entry) => (
              <div 
                key={entry.rank}
                className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                  'isCurrentUser' in entry && entry.isCurrentUser
                    ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 w-16">
                    <span className="text-2xl font-bold text-white">#{entry.rank}</span>
                    {getBadgeIcon(entry.badge)}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center ${getAvatarColor(entry.avatar)}`}>
                      <span className="text-lg">🌟</span>
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        'isCurrentUser' in entry && entry.isCurrentUser ? 'text-white' : 'text-gray-200'
                      }`}>
                        {entry.name}
                        {'isCurrentUser' in entry && entry.isCurrentUser && (
                          <span className="ml-2 text-sm text-purple-300">(You)</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-400 capitalize">
                        Level {entry.level} • {entry.avatar} avatar
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-white">
                    {'xp' in entry ? `${entry.xp} XP` : `${entry.count} photos`}
                  </div>
                  {'isCurrentUser' in entry && entry.isCurrentUser && selectedCategory === 'weekly' && (
                    <div className="text-sm text-green-300">+50 XP today</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Goals */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Next Rank Goals</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-1">Top 10</h3>
            <p className="text-gray-300 text-sm">Need 180 more XP</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <Medal className="h-8 w-8 text-silver-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-1">Top 5</h3>
            <p className="text-gray-300 text-sm">Need 450 more XP</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <Crown className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-1">#1 Rank</h3>
            <p className="text-gray-300 text-sm">Need 1200 more XP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;