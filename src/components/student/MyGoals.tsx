import React, { useState } from 'react';
import { User } from '../../types/User';
import { Target, Plus, CheckCircle, Clock, TrendingUp, Award } from 'lucide-react';

interface MyGoalsProps {
  user: User;
}

const MyGoals: React.FC<MyGoalsProps> = ({ user }) => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Reduce Plastic Usage',
      description: 'Eliminate single-use plastics from daily routine',
      category: 'Waste Reduction',
      target: 30,
      current: 18,
      unit: 'days',
      deadline: '2025-02-15',
      status: 'in_progress',
      xpReward: 100,
      createdAt: '2025-01-01'
    },
    {
      id: 2,
      title: 'Document Water Pollution',
      description: 'Take photos of water pollution sources in my area',
      category: 'Documentation',
      target: 10,
      current: 7,
      unit: 'photos',
      deadline: '2025-02-01',
      status: 'in_progress',
      xpReward: 75,
      createdAt: '2025-01-10'
    },
    {
      id: 3,
      title: 'Energy Conservation',
      description: 'Reduce home electricity usage by turning off unused devices',
      category: 'Energy',
      target: 15,
      current: 15,
      unit: 'days',
      deadline: '2025-01-30',
      status: 'completed',
      xpReward: 80,
      createdAt: '2025-01-01',
      completedAt: '2025-01-25'
    }
  ]);

  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: '',
    target: '',
    unit: 'days',
    deadline: ''
  });

  const categories = [
    'Waste Reduction',
    'Energy Conservation',
    'Water Conservation',
    'Transportation',
    'Documentation',
    'Education',
    'Community Action',
    'Biodiversity'
  ];

  const units = ['days', 'photos', 'items', 'hours', 'kg', 'liters'];

  const handleCreateGoal = () => {
    if (newGoal.title && newGoal.category && newGoal.target && newGoal.deadline) {
      const goal = {
        id: goals.length + 1,
        title: newGoal.title,
        description: newGoal.description,
        category: newGoal.category,
        target: parseInt(newGoal.target),
        current: 0,
        unit: newGoal.unit,
        deadline: newGoal.deadline,
        status: 'in_progress' as const,
        xpReward: Math.floor(parseInt(newGoal.target) * 5 + Math.random() * 50),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', description: '', category: '', target: '', unit: 'days', deadline: '' });
      setShowGoalModal(false);
    }
  };

  const updateGoalProgress = (goalId: number, increment: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = Math.min(goal.current + increment, goal.target);
        const newStatus = newCurrent >= goal.target ? 'completed' : 'in_progress';
        return {
          ...goal,
          current: newCurrent,
          status: newStatus,
          ...(newStatus === 'completed' && !goal.completedAt && { completedAt: new Date().toISOString().split('T')[0] })
        };
      }
      return goal;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in_progress': return 'text-blue-400';
      case 'overdue': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const totalXP = goals.filter(g => g.status === 'completed').reduce((sum, g) => sum + g.xpReward, 0);
  const activeGoals = goals.filter(g => g.status === 'in_progress').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Goals for a Better Future</h1>
          <p className="text-gray-300">Set and achieve environmental targets to make a real impact</p>
        </div>
        <button
          onClick={() => setShowGoalModal(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Set New Goal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{completedGoals}</span>
          </div>
          <h3 className="text-white font-semibold">Goals Completed</h3>
          <p className="text-gray-300 text-sm">Environmental achievements</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{activeGoals}</span>
          </div>
          <h3 className="text-white font-semibold">Active Goals</h3>
          <p className="text-gray-300 text-sm">Currently working on</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Award className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{totalXP}</span>
          </div>
          <h3 className="text-white font-semibold">XP Earned</h3>
          <p className="text-gray-300 text-sm">From completed goals</p>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-bold text-white mr-3">{goal.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    goal.status === 'completed' 
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    {goal.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{goal.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                    {goal.category}
                  </span>
                  <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                  <span className="flex items-center">
                    <Award className="h-4 w-4 mr-1 text-yellow-400" />
                    {goal.xpReward} XP
                  </span>
                </div>
              </div>
              {goal.status === 'completed' && (
                <CheckCircle className="h-8 w-8 text-green-400" />
              )}
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">
                  Progress: {goal.current}/{goal.target} {goal.unit}
                </span>
                <span className={`font-semibold ${getStatusColor(goal.status)}`}>
                  {Math.round((goal.current / goal.target) * 100)}%
                </span>
              </div>
              <div className="bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${getStatusBg(goal.status)} transition-all duration-500`}
                  style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {goal.status === 'in_progress' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => updateGoalProgress(goal.id, 1)}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  +1 {goal.unit}
                </button>
                <button
                  onClick={() => updateGoalProgress(goal.id, 5)}
                  className="bg-green-500/20 hover:bg-green-500/30 text-green-300 px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  +5 {goal.unit}
                </button>
                {goal.current > 0 && (
                  <button
                    onClick={() => updateGoalProgress(goal.id, -1)}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    -1 {goal.unit}
                  </button>
                )}
              </div>
            )}

            {goal.status === 'completed' && goal.completedAt && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                <p className="text-green-300 text-sm">
                  🎉 Completed on {new Date(goal.completedAt).toLocaleDateString()}! 
                  You earned {goal.xpReward} XP for making a positive environmental impact.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Set a New Environmental Goal</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  placeholder="What do you want to achieve?"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  placeholder="Describe your goal in detail"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-purple-400 focus:outline-none h-20 resize-none"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-purple-400 focus:outline-none"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-800">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Target</label>
                  <input
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                    placeholder="How many?"
                    min="1"
                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Unit</label>
                  <select
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-purple-400 focus:outline-none"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit} className="bg-gray-800">
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-purple-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowGoalModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGoal}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspiration Section */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4">Goal Inspiration</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">💡 Quick Wins (1-7 days)</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Switch to reusable water bottle</li>
              <li>• Document 5 environmental issues</li>
              <li>• Walk/bike instead of driving</li>
              <li>• Start composting organic waste</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-300 mb-2">🌟 Long-term Impact (30+ days)</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Plant and maintain 10 trees</li>
              <li>• Organize community cleanup</li>
              <li>• Reduce household energy by 20%</li>
              <li>• Create school recycling program</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGoals;