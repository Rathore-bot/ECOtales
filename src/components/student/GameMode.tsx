import React, { useState } from 'react';
import { User } from '../../types/User';
import { Gamepad, Play, Lock, Star, Award } from 'lucide-react';

interface GameModeProps {
  user: User;
}

const GameMode: React.FC<GameModeProps> = ({ user }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: 'element-explorer',
      title: 'Element Explorer',
      description: 'Discover how elements combine to create materials in a Minecraft-like world',
      difficulty: 'Beginner',
      xpReward: 50,
      unlocked: true,
      thumbnail: '🌍'
    },
    {
      id: 'pollution-fighter',
      title: 'Pollution Fighter',
      description: 'Battle pollution sources and clean up contaminated environments',
      difficulty: 'Intermediate',
      xpReward: 75,
      unlocked: (user.level || 1) >= 3,
      thumbnail: '🌊'
    },
    {
      id: 'ecosystem-builder',
      title: 'Ecosystem Builder',
      description: 'Build and maintain balanced ecosystems with diverse flora and fauna',
      difficulty: 'Advanced',
      xpReward: 100,
      unlocked: (user.level || 1) >= 5,
      thumbnail: '🌳'
    },
    {
      id: 'climate-hero',
      title: 'Climate Hero',
      description: 'Tackle climate change challenges and implement sustainable solutions',
      difficulty: 'Expert',
      xpReward: 150,
      unlocked: (user.level || 1) >= 8,
      thumbnail: '🌤️'
    }
  ];

  const GameCard: React.FC<{ game: typeof games[0] }> = ({ game }) => (
    <div 
      className={`relative p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
        game.unlocked 
          ? 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40' 
          : 'bg-gray-800/50 border border-gray-600/50'
      }`}
      onClick={() => game.unlocked && setSelectedGame(game.id)}
    >
      {!game.unlocked && (
        <div className="absolute top-4 right-4">
          <Lock className="h-6 w-6 text-gray-500" />
        </div>
      )}
      
      <div className="text-center mb-4">
        <div className="text-6xl mb-3">{game.thumbnail}</div>
        <h3 className={`text-xl font-bold mb-2 ${game.unlocked ? 'text-white' : 'text-gray-500'}`}>
          {game.title}
        </h3>
        <p className={`text-sm mb-4 ${game.unlocked ? 'text-gray-300' : 'text-gray-600'}`}>
          {game.description}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className={`text-sm font-medium ${game.unlocked ? 'text-blue-300' : 'text-gray-600'}`}>
            {game.difficulty}
          </span>
          <div className="flex items-center">
            <Star className={`h-4 w-4 mr-1 ${game.unlocked ? 'text-yellow-400' : 'text-gray-600'}`} />
            <span className={`text-sm ${game.unlocked ? 'text-yellow-400' : 'text-gray-600'}`}>
              {game.xpReward} XP
            </span>
          </div>
        </div>
        
        {game.unlocked ? (
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center">
            <Play className="h-4 w-4 mr-2" />
            Play Now
          </button>
        ) : (
          <div className="w-full bg-gray-700 text-gray-400 py-2 px-4 rounded-lg font-semibold text-center">
            Unlock at Level {game.id === 'pollution-fighter' ? 3 : game.id === 'ecosystem-builder' ? 5 : 8}
          </div>
        )}
      </div>
    </div>
  );

  if (selectedGame) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Game Mode</h1>
          <button 
            onClick={() => setSelectedGame(null)}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Games
          </button>
        </div>

        {/* Game Simulation */}
        <div className="bg-gradient-to-br from-green-900 to-blue-900 rounded-2xl p-8 min-h-96 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-8xl mb-6">🎮</div>
            <h2 className="text-4xl font-bold mb-4">
              {games.find(g => g.id === selectedGame)?.title}
            </h2>
            <p className="text-xl mb-8 text-blue-200">
              Interactive 3D Environment Loading...
            </p>
            <div className="bg-white/20 rounded-full h-4 w-64 mx-auto mb-8">
              <div className="bg-gradient-to-r from-blue-400 to-green-400 h-4 rounded-full w-3/4 animate-pulse"></div>
            </div>
            <p className="text-gray-300">
              In a real implementation, this would load a full 3D Minecraft-like environment 
              where students can explore and learn about environmental concepts interactively.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Game Mode</h1>
          <p className="text-gray-300">Learn environmental science through interactive gaming</p>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end mb-2">
            <Gamepad className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-white font-semibold">Level {user.level || 1}</span>
          </div>
          <p className="text-gray-300 text-sm">{user.xp || 0} XP earned</p>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Gaming Tips */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4">Gaming Tips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">🎯 How to Level Up</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Complete game challenges</li>
              <li>• Take environmental photos</li>
              <li>• Set and achieve goals</li>
              <li>• Help classmates in multiplayer</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-300 mb-2">🌟 Unlockables</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• New avatar abilities</li>
              <li>• Advanced game modes</li>
              <li>• Exclusive environmental tools</li>
              <li>• Leadership badges</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMode;