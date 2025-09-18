import React, { useState } from 'react';
import { User } from '../../types/User';
import { Camera, MapPin, Calendar, Award, Upload, Image } from 'lucide-react';

interface PhotoCaptureProps {
  user: User;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ user }) => {
  const [capturedPhotos, setCapturedPhotos] = useState([
    {
      id: 1,
      title: 'Polluted River',
      location: 'Central Park, NYC',
      timestamp: '2025-01-15 14:30',
      category: 'Water Pollution',
      xpEarned: 25,
      verified: true
    },
    {
      id: 2,
      title: 'Recycling Initiative',
      location: 'School Campus',
      timestamp: '2025-01-14 10:15',
      category: 'Waste Management',
      xpEarned: 30,
      verified: true
    },
    {
      id: 3,
      title: 'Tree Planting',
      location: 'Community Garden',
      timestamp: '2025-01-13 16:45',
      category: 'Reforestation',
      xpEarned: 35,
      verified: false
    }
  ]);

  const [showCamera, setShowCamera] = useState(false);

  const categories = [
    'Air Quality',
    'Water Pollution',
    'Soil Health',
    'Waste Management',
    'Biodiversity',
    'Renewable Energy',
    'Conservation',
    'Reforestation'
  ];

  const handleCapture = () => {
    // In a real app, this would open camera/file picker
    setShowCamera(true);
  };

  const simulateCapture = () => {
    const newPhoto = {
      id: capturedPhotos.length + 1,
      title: 'New Environmental Photo',
      location: 'Current Location',
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      category: categories[Math.floor(Math.random() * categories.length)],
      xpEarned: Math.floor(Math.random() * 20) + 15,
      verified: false
    };
    setCapturedPhotos([newPhoto, ...capturedPhotos]);
    setShowCamera(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Photo Capture</h1>
          <p className="text-gray-300">Document environmental changes and earn XP</p>
        </div>
        <button
          onClick={handleCapture}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg"
        >
          <Camera className="h-5 w-5 mr-2" />
          Capture Photo
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Image className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{capturedPhotos.length}</span>
          </div>
          <h3 className="text-white font-semibold">Photos Captured</h3>
          <p className="text-gray-300 text-sm">Total environmental documentation</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Award className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">
              {capturedPhotos.reduce((sum, photo) => sum + photo.xpEarned, 0)}
            </span>
          </div>
          <h3 className="text-white font-semibold">XP Earned</h3>
          <p className="text-gray-300 text-sm">From photo contributions</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <MapPin className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-white">
              {new Set(capturedPhotos.map(p => p.location)).size}
            </span>
          </div>
          <h3 className="text-white font-semibold">Locations</h3>
          <p className="text-gray-300 text-sm">Unique places documented</p>
        </div>
      </div>

      {/* Camera Simulation */}
      {showCamera && (
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/20">
          <div className="text-center">
            <div className="w-64 h-48 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg mx-auto mb-6 flex items-center justify-center">
              <Camera className="h-16 w-16 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Camera Active</h3>
            <p className="text-gray-300 mb-6">
              Position your camera to capture environmental conditions, pollution, or conservation efforts.
              GPS location and timestamp will be automatically recorded.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={simulateCapture}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
              >
                Capture
              </button>
              <button
                onClick={() => setShowCamera(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Gallery */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">Your Environmental Documentation</h2>
          <div className="space-y-4">
            {capturedPhotos.map((photo) => (
              <div key={photo.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <Image className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{photo.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {photo.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {photo.timestamp}
                      </div>
                    </div>
                    <span className="inline-block bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs mt-1">
                      {photo.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end mb-1">
                    <Award className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-yellow-400 font-semibold">+{photo.xpEarned} XP</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    photo.verified 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-orange-500/20 text-orange-300'
                  }`}>
                    {photo.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Guidelines */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-4">Photo Guidelines</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-300 mb-2">✅ Good Photos Include:</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Clear environmental conditions</li>
              <li>• Accurate location data</li>
              <li>• Real-time timestamps</li>
              <li>• Relevant environmental context</li>
              <li>• Conservation efforts in action</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-300 mb-2">❌ Avoid:</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li>• Fake or manipulated images</li>
              <li>• Photos without clear purpose</li>
              <li>• Inappropriate content</li>
              <li>• Private property violations</li>
              <li>• Duplicate submissions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCapture;