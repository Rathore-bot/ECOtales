import React from 'react';
import { X, Zap, Droplet, Mountain, Wind } from 'lucide-react';

interface StoryModalProps {
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-8 max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">The Legend of the Four Elements</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        <div className="text-white space-y-6">
          <div className="bg-white/10 rounded-lg p-6">
            <p className="text-lg leading-relaxed">
              Long ago, in the cosmic realm beyond our world, there existed a divine being known as the Creator. 
              This powerful entity observed the empty void of space and decided to bring life and balance to the universe.
            </p>
          </div>

          <div className="bg-white/10 rounded-lg p-6">
            <p className="text-lg leading-relaxed mb-4">
              The Creator forged four mighty elements, each with unique powers that would shape all existence:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Droplet className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-bold">Water</h3>
                </div>
                <p className="text-sm">The power of life and adaptation. Water can heal, flow around obstacles, and nurture all living things.</p>
              </div>

              <div className="bg-gradient-to-r from-red-600 to-orange-500 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Zap className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-bold">Fire</h3>
                </div>
                <p className="text-sm">The power of transformation and energy. Fire can purify, energize, and drive change across the world.</p>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Mountain className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-bold">Earth (Soil)</h3>
                </div>
                <p className="text-sm">The power of stability and growth. Earth provides foundation, nurtures plants, and stores ancient wisdom.</p>
              </div>

              <div className="bg-gradient-to-r from-gray-500 to-blue-400 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Wind className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-bold">Air</h3>
                </div>
                <p className="text-sm">The power of freedom and connection. Air carries messages, enables flight, and connects all living beings.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-6">
            <p className="text-lg leading-relaxed">
              The Creator scattered these elements across the cosmos, and they began to combine in countless ways, 
              forming new materials, compounds, and life forms. Each combination created something unique and wonderful.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-lg">
            <p className="text-lg leading-relaxed">
              <strong>Your Quest:</strong> As you embark on this environmental journey, you will choose one of these 
              elemental powers as your avatar. Learn how elements combine to create our world, understand environmental 
              challenges, and discover how you can help protect our planet. The more you learn and contribute, 
              the more powerful your avatar becomes, unlocking new abilities and knowledge!
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            Begin Your Adventure
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;