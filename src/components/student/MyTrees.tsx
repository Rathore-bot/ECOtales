import React, { useState } from 'react';
import { User } from '../../types/User';
import { TreePine, Plus, MapPin, Calendar, Droplets, Sun, Heart } from 'lucide-react';

interface MyTreesProps {
  user: User;
}

const MyTrees: React.FC<MyTreesProps> = ({ user }) => {
  const [trees, setTrees] = useState([
    {
      id: 1,
      name: 'My First Oak',
      species: 'Oak Tree',
      planted: '2024-12-15',
      location: 'School Garden',
      health: 95,
      age: '1 month',
      co2Absorbed: '2.5 kg',
      waterGiven: 12,
      notes: 'Growing strong! New leaves sprouting.',
      image: '🌳'
    },
    {
      id: 2,
      name: 'Hope Pine',
      species: 'Pine Tree',
      planted: '2024-11-20',
      location: 'Community Park',
      health: 88,
      age: '2 months',
      co2Absorbed: '4.2 kg',
      waterGiven: 18,
      notes: 'Survived the winter storm beautifully.',
      image: '🌲'
    },
    {
      id: 3,
      name: 'Rainbow Maple',
      species: 'Maple Tree',
      planted: '2024-10-10',
      location: 'Home Backyard',
      health: 92,
      age: '3 months',
      co2Absorbed: '6.8 kg',
      waterGiven: 25,
      notes: 'Leaves are changing colors beautifully!',
      image: '🍂'
    }
  ]);

  const [showPlantModal, setShowPlantModal] = useState(false);
  const [newTree, setNewTree] = useState({
    name: '',
    species: '',
    location: '',
    notes: ''
  });

  const treeSpecies = [
    'Oak Tree', 'Pine Tree', 'Maple Tree', 'Birch Tree', 
    'Cherry Tree', 'Apple Tree', 'Willow Tree', 'Cedar Tree'
  ];

  const handlePlantTree = () => {
    if (newTree.name && newTree.species && newTree.location) {
      const plantedTree = {
        id: trees.length + 1,
        name: newTree.name,
        species: newTree.species,
        planted: new Date().toISOString().split('T')[0],
        location: newTree.location,
        health: 100,
        age: 'Just planted',
        co2Absorbed: '0 kg',
        waterGiven: 1,
        notes: newTree.notes || 'Just planted with love!',
        image: '🌱'
      };
      setTrees([...trees, plantedTree]);
      setNewTree({ name: '', species: '', location: '', notes: '' });
      setShowPlantModal(false);
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-400';
    if (health >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthBg = (health: number) => {
    if (health >= 90) return 'bg-green-500';
    if (health >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const totalCO2 = trees.reduce((sum, tree) => sum + parseFloat(tree.co2Absorbed.split(' ')[0]), 0);
  const totalTrees = trees.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Trees & Plants</h1>
          <p className="text-gray-300">Track and nurture your green contributions</p>
        </div>
        <button
          onClick={() => setShowPlantModal(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Plant New Tree
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <TreePine className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{totalTrees}</span>
          </div>
          <h3 className="text-white font-semibold">Trees Planted</h3>
          <p className="text-gray-300 text-sm">Your forest is growing!</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Sun className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{totalCO2.toFixed(1)} kg</span>
          </div>
          <h3 className="text-white font-semibold">CO₂ Absorbed</h3>
          <p className="text-gray-300 text-sm">Fighting climate change</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Heart className="h-8 w-8 text-pink-400" />
            <span className="text-2xl font-bold text-white">
              {Math.round(trees.reduce((sum, tree) => sum + tree.health, 0) / trees.length)}%
            </span>
          </div>
          <h3 className="text-white font-semibold">Avg Health</h3>
          <p className="text-gray-300 text-sm">Overall tree wellbeing</p>
        </div>
      </div>

      {/* Trees Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trees.map((tree) => (
          <div key={tree.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
            <div className="text-center mb-4">
              <div className="text-6xl mb-3">{tree.image}</div>
              <h3 className="text-xl font-bold text-white mb-1">{tree.name}</h3>
              <p className="text-gray-300 text-sm">{tree.species}</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Health</span>
                <span className={`font-semibold ${getHealthColor(tree.health)}`}>
                  {tree.health}%
                </span>
              </div>
              <div className="bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getHealthBg(tree.health)}`}
                  style={{ width: `${tree.health}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center text-gray-300 mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Age
                  </div>
                  <p className="text-white font-semibold">{tree.age}</p>
                </div>
                <div>
                  <div className="flex items-center text-gray-300 mb-1">
                    <Sun className="h-4 w-4 mr-1" />
                    CO₂ Absorbed
                  </div>
                  <p className="text-white font-semibold">{tree.co2Absorbed}</p>
                </div>
                <div>
                  <div className="flex items-center text-gray-300 mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location
                  </div>
                  <p className="text-white font-semibold text-xs">{tree.location}</p>
                </div>
                <div>
                  <div className="flex items-center text-gray-300 mb-1">
                    <Droplets className="h-4 w-4 mr-1" />
                    Watered
                  </div>
                  <p className="text-white font-semibold">{tree.waterGiven}x</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-white text-sm italic">"{tree.notes}"</p>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 px-3 rounded-lg text-sm transition-colors">
                  Update Status
                </button>
                <button className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-300 py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center">
                  <Droplets className="h-4 w-4 mr-1" />
                  Water
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plant New Tree Modal */}
      {showPlantModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Plant a New Tree</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Tree Name</label>
                <input
                  type="text"
                  value={newTree.name}
                  onChange={(e) => setNewTree({...newTree, name: e.target.value})}
                  placeholder="Give your tree a name"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-green-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Species</label>
                <select
                  value={newTree.species}
                  onChange={(e) => setNewTree({...newTree, species: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-green-400 focus:outline-none"
                >
                  <option value="">Select a species</option>
                  {treeSpecies.map(species => (
                    <option key={species} value={species} className="bg-gray-800">
                      {species}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={newTree.location}
                  onChange={(e) => setNewTree({...newTree, location: e.target.value})}
                  placeholder="Where did you plant it?"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-green-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Notes (Optional)</label>
                <textarea
                  value={newTree.notes}
                  onChange={(e) => setNewTree({...newTree, notes: e.target.value})}
                  placeholder="Any special notes about your tree"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-green-400 focus:outline-none h-20 resize-none"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowPlantModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePlantTree}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Plant Tree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Environmental Impact */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-4">Your Environmental Impact</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-300 mb-2">🌍 Global Impact</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• {totalTrees} trees contributing to reforestation</li>
              <li>• {totalCO2.toFixed(1)} kg CO₂ absorbed from atmosphere</li>
              <li>• Supporting biodiversity in {new Set(trees.map(t => t.location)).size} locations</li>
              <li>• Creating oxygen for approximately {Math.round(totalTrees * 2)} people daily</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">📈 Future Projections</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Estimated {(totalCO2 * 10).toFixed(1)} kg CO₂ absorption in 10 years</li>
              <li>• Your trees will provide shade for {totalTrees * 5} m² area</li>
              <li>• Supporting habitat for {totalTrees * 3}+ bird species</li>
              <li>• Contributing to local climate regulation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrees;