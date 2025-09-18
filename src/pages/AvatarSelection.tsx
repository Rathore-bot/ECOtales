import React from 'react';
import { Droplet, Zap, Mountain, Wind, Sparkles } from 'lucide-react';
import { Element } from '../types/User';

interface AvatarSelectionProps {
  onAvatarSelect: (avatar: string) => void;
}

const AvatarSelection: React.FC<AvatarSelectionProps> = ({ onAvatarSelect }) => {
  const elements: Element[] = [
    {
      id: 'water',
      name: 'Water',
      color: 'blue',
      gradient: 'from-blue-400 to-cyan-600',
      icon: 'droplet',
      power: 'Adaptation & Healing',
      description: 'Masters of flow and adaptation. Water avatars can heal the environment, purify polluted areas, and find solutions that work around obstacles.'
    },
    {
      id: 'fire',
      name: 'Fire',
      color: 'red',
      gradient: 'from-red-500 to-orange-600',
      icon: 'zap',
      power: 'Transformation & Energy',
      description: 'Champions of change and renewable energy. Fire avatars can transform waste into energy, drive environmental innovations, and inspire action.'
    },
    {
      id: 'earth',
      name: 'Earth',
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      icon: 'mountain',
      power: 'Growth & Stability',
      description: 'Guardians of soil and forests. Earth avatars excel at reforestation, sustainable agriculture, and protecting biodiversity.'
    },
    {
      id: 'air',
      name: 'Air',
      color: 'gray',
      gradient: 'from-gray-400 to-blue-500',
      icon: 'wind',
      power: 'Freedom & Connection',
      description: 'Protectors of atmosphere and climate. Air avatars fight air pollution, promote clean transportation, and connect communities globally.'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'droplet': return Droplet;
      case 'zap': return Zap;
      case 'mountain': return Mountain;
      case 'wind': return Wind;
      default: return Sparkles;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Choose Your Elemental Avatar</h1>
          <p className="text-xl text-blue-200 mb-2">Each element grants unique environmental powers</p>
          <p className="text-lg text-gray-300">Select the one that resonates with your environmental passion</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {elements.map((element) => {
            const IconComponent = getIcon(element.icon);
            return (
              <div
                key={element.id}
                onClick={() => onAvatarSelect(element.id)}
                className={`bg-gradient-to-br ${element.gradient} p-6 rounded-2xl shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-3xl group`}
              >
                <div className="text-center">
                  <div className="mb-4">
                    <IconComponent className="h-20 w-20 text-white mx-auto group-hover:animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{element.name}</h3>
                  <div className="bg-white/20 rounded-lg p-3 mb-4">
                    <p className="text-white font-semibold text-sm">{element.power}</p>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">{element.description}</p>
                  <div className="mt-6">
                    <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full font-semibold transition-colors">
                      Select {element.name}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">🌟 Level Up Your Avatar!</h3>
          <p className="text-gray-200">
            As you complete environmental challenges, learn new concepts, and contribute to real-world projects, 
            your avatar will gain new powers and unlock special abilities. The journey of environmental stewardship 
            begins with a single choice!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelection;