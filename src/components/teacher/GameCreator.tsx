import React, { useState } from 'react';
import { User } from '../../types/User';
import { Plus, Gamepad, Settings, Play, Users, Trophy } from 'lucide-react';

interface GameCreatorProps {
  user: User;
}

const GameCreator: React.FC<GameCreatorProps> = ({ user }) => {
  const [games, setGames] = useState([
    {
      id: 1,
      title: 'Pollution Cleanup Challenge',
      description: 'Students work together to identify and clean up different types of pollution',
      type: 'Collaborative',
      ageGroup: '7-14',
      duration: 30,
      maxPlayers: 25,
      isActive: true,
      completions: 156,
      avgScore: 87,
      createdAt: '2025-01-10'
    },
    {
      id: 2,
      title: 'Ecosystem Builder',
      description: 'Create balanced ecosystems by placing animals and plants correctly',
      type: 'Strategy',
      ageGroup: '15-18',
      duration: 45,
      maxPlayers: 30,
      isActive: true,
      completions: 89,
      avgScore: 92,
      createdAt: '2025-01-08'
    },
    {
      id: 3,
      title: 'Climate Action Simulator',
      description: 'Make policy decisions and see their environmental impact over time',
      type: 'Simulation',
      ageGroup: '19-21',
      duration: 60,
      maxPlayers: 20,
      isActive: false,
      completions: 34,
      avgScore: 78,
      createdAt: '2025-01-05'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGame, setNewGame] = useState({
    title: '',
    description: '',
    type: 'Quiz',
    ageGroup: '7-14',
    duration: 30,
    maxPlayers: 30,
    difficulty: 'Beginner',
    topic: '',
    rules: [{ rule: '' }],
    rewards: { xp: 50, badges: [] }
  });

  const gameTypes = [
    { id: 'quiz', name: 'Interactive Quiz', description: 'Q&A with multimedia elements' },
    { id: 'simulation', name: 'Environmental Simulation', description: 'Real-world scenario modeling' },
    { id: 'puzzle', name: 'Environmental Puzzle', description: 'Problem-solving challenges' },
    { id: 'collaborative', name: 'Team Challenge', description: 'Group-based activities' },
    { id: 'strategy', name: 'Strategy Game', description: 'Long-term planning and decisions' },
    { id: 'adventure', name: 'Eco Adventure', description: 'Story-driven exploration' }
  ];

  const ageGroups = [
    '7-14', '15-18', '19-21', '22+', 'vocational'
  ];

  const environmentalTopics = [
    'Climate Change', 'Ocean Conservation', 'Forest Protection',
    'Air Quality', 'Renewable Energy', 'Waste Management',
    'Biodiversity', 'Water Conservation', 'Sustainable Agriculture'
  ];

  const addRule = () => {
    setNewGame({
      ...newGame,
      rules: [...newGame.rules, { rule: '' }]
    });
  };

  const updateRule = (index: number, value: string) => {
    const updatedRules = newGame.rules.map((rule, i) => 
      i === index ? { rule: value } : rule
    );
    setNewGame({ ...newGame, rules: updatedRules });
  };

  const removeRule = (index: number) => {
    setNewGame({
      ...newGame,
      rules: newGame.rules.filter((_, i) => i !== index)
    });
  };

  const handleCreateGame = () => {
    if (newGame.title && newGame.description && newGame.topic) {
      const game = {
        id: games.length + 1,
        title: newGame.title,
        description: newGame.description,
        type: gameTypes.find(t => t.id === newGame.type.toLowerCase())?.name || newGame.type,
        ageGroup: newGame.ageGroup,
        duration: newGame.duration,
        maxPlayers: newGame.maxPlayers,
        isActive: true,
        completions: 0,
        avgScore: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setGames([game, ...games]);
      setNewGame({
        title: '',
        description: '',
        type: 'Quiz',
        ageGroup: '7-14',
        duration: 30,
        maxPlayers: 30,
        difficulty: 'Beginner',
        topic: '',
        rules: [{ rule: '' }],
        rewards: { xp: 50, badges: [] }
      });
      setShowCreateModal(false);
    }
  };

  const toggleGameStatus = (id: number) => {
    setGames(games.map(game => 
      game.id === id ? { ...game, isActive: !game.isActive } : game
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Game Creator</h1>
          <p className="text-gray-300">Design engaging environmental games for interactive learning</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Game
        </button>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Gamepad className="h-8 w-8 text-orange-400" />
            <span className="text-2xl font-bold text-white">{games.filter(g => g.isActive).length}</span>
          </div>
          <h3 className="text-white font-semibold">Active Games</h3>
          <p className="text-gray-300 text-sm">Currently playable</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">
              {games.reduce((sum, g) => sum + g.completions, 0)}
            </span>
          </div>
          <h3 className="text-white font-semibold">Total Plays</h3>
          <p className="text-gray-300 text-sm">All games combined</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Trophy className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">
              {Math.round(games.reduce((sum, g) => sum + g.avgScore, 0) / games.length)}%
            </span>
          </div>
          <h3 className="text-white font-semibold">Average Score</h3>
          <p className="text-gray-300 text-sm">Player performance</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Settings className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">
              {Math.round(games.reduce((sum, g) => sum + g.duration, 0) / games.length)}
            </span>
          </div>
          <h3 className="text-white font-semibold">Avg Duration</h3>
          <p className="text-gray-300 text-sm">Minutes per game</p>
        </div>
      </div>

      {/* Games List */}
      <div className="grid gap-6">
        {games.map((game) => (
          <div key={game.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-bold text-white mr-3">{game.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    game.isActive 
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-gray-500/20 text-gray-300'
                  }`}>
                    {game.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-300">
                    {game.type}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{game.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>👥 Ages {game.ageGroup}</span>
                  <span>⏱️ {game.duration} min</span>
                  <span>👨‍👩‍👧‍👦 Max {game.maxPlayers} players</span>
                  <span>🎮 {game.completions} plays</span>
                  <span>🏆 {game.avgScore}% avg score</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleGameStatus(game.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    game.isActive 
                      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300'
                      : 'bg-green-500/20 hover:bg-green-500/30 text-green-300'
                  }`}
                >
                  <Play className="h-4 w-4" />
                </button>
                <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 p-2 rounded-lg transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{game.completions}</div>
                  <div className="text-xs text-gray-400">Total Plays</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{game.avgScore}%</div>
                  <div className="text-xs text-gray-400">Avg Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{game.maxPlayers}</div>
                  <div className="text-xs text-gray-400">Max Players</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{game.duration}m</div>
                  <div className="text-xs text-gray-400">Duration</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Game Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gradient-to-br from-orange-900 to-red-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Create Environmental Game</h2>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Game Title</label>
                  <input
                    type="text"
                    value={newGame.title}
                    onChange={(e) => setNewGame({...newGame, title: e.target.value})}
                    placeholder="Environmental Game Title"
                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Environmental Topic</label>
                  <select
                    value={newGame.topic}
                    onChange={(e) => setNewGame({...newGame, topic: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-orange-400 focus:outline-none"
                  >
                    <option value="">Select Topic</option>
                    {environmentalTopics.map(topic => (
                      <option key={topic} value={topic} className="bg-gray-800">
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Game Description</label>
                <textarea
                  value={newGame.description}
                  onChange={(e) => setNewGame({...newGame, description: e.target.value})}
                  placeholder="Describe the game mechanics and learning objectives"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-orange-400 focus:outline-none h-24 resize-none"
                />
              </div>

              {/* Game Type */}
              <div>
                <label className="block text-white text-sm font-medium mb-3">Game Type</label>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {gameTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setNewGame({...newGame, type: type.id})}
                      className={`p-3 rounded-lg text-left transition-colors ${
                        newGame.type.toLowerCase() === type.id
                          ? 'bg-orange-500/30 text-white border border-orange-400'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20'
                      }`}
                    >
                      <div className="font-semibold">{type.name}</div>
                      <div className="text-xs opacity-75">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Game Settings */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Age Group</label>
                  <select
                    value={newGame.ageGroup}
                    onChange={(e) => setNewGame({...newGame, ageGroup: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-orange-400 focus:outline-none"
                  >
                    {ageGroups.map(group => (
                      <option key={group} value={group} className="bg-gray-800">
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={newGame.duration}
                    onChange={(e) => setNewGame({...newGame, duration: parseInt(e.target.value)})}
                    min="5"
                    max="120"
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Max Players</label>
                  <input
                    type="number"
                    value={newGame.maxPlayers}
                    onChange={(e) => setNewGame({...newGame, maxPlayers: parseInt(e.target.value)})}
                    min="1"
                    max="50"
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-orange-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Game Rules */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-white text-sm font-medium">Game Rules</label>
                  <button
                    onClick={addRule}
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-300 px-3 py-1 rounded text-sm transition-colors"
                  >
                    Add Rule
                  </button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {newGame.rules.map((rule, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={rule.rule}
                        onChange={(e) => updateRule(index, e.target.value)}
                        placeholder={`Rule ${index + 1}`}
                        className="flex-1 p-2 rounded bg-white/10 text-white placeholder-gray-400 border border-white/20 text-sm focus:outline-none"
                      />
                      {newGame.rules.length > 1 && (
                        <button
                          onClick={() => removeRule(index)}
                          className="text-red-300 hover:text-red-400 px-2"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGame}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Create Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Templates */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-6">Popular Game Templates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Ocean Cleanup Race', type: 'Collaborative', description: 'Teams compete to clean virtual ocean areas' },
            { name: 'Carbon Footprint Calculator', type: 'Simulation', description: 'Calculate and reduce virtual carbon footprints' },
            { name: 'Ecosystem Puzzle', type: 'Puzzle', description: 'Arrange species to create balanced ecosystems' },
            { name: 'Climate Policy Maker', type: 'Strategy', description: 'Make policy decisions and see long-term impacts' },
            { name: 'Renewable Energy Quest', type: 'Adventure', description: 'Explore different renewable energy sources' },
            { name: 'Waste Sorting Challenge', type: 'Quiz', description: 'Quick-fire waste categorization game' }
          ].map((template, index) => (
            <div key={index} className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
              <h3 className="text-white font-semibold mb-2">{template.name}</h3>
              <p className="text-gray-300 text-sm mb-3">{template.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">
                  {template.type}
                </span>
                <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-3 py-1 rounded text-sm transition-colors">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCreator;