import React from 'react';
import { User } from '../types/User';
import { Home, Users, Trophy, Camera, Trees as Tree, Target, MessageCircle, Gamepad, Clipboard, FileText, BarChart, LogOut, Droplet, Zap, Mountain, Wind, Crown } from 'lucide-react';

interface SidebarProps {
  user: User;
  menuItems: Array<{id: string, label: string, icon: string}>;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, menuItems, activeTab, onTabChange, onLogout }) => {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      home: Home,
      users: Users,
      trophy: Trophy,
      camera: Camera,
      tree: Tree,
      target: Target,
      message: MessageCircle,
      gamepad: Gamepad,
      clipboard: Clipboard,
      'file-text': FileText,
      'bar-chart': BarChart
    };
    return icons[iconName] || Home;
  };

  const getAvatarIcon = (avatar?: string) => {
    switch (avatar) {
      case 'water': return Droplet;
      case 'fire': return Zap;
      case 'earth': return Mountain;
      case 'air': return Wind;
      default: return Crown;
    }
  };

  const getAvatarColor = (avatar?: string) => {
    switch (avatar) {
      case 'water': return 'text-blue-400';
      case 'fire': return 'text-red-400';
      case 'earth': return 'text-green-400';
      case 'air': return 'text-gray-400';
      default: return 'text-yellow-400';
    }
  };

  const AvatarIcon = getAvatarIcon(user.avatar);

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 z-50">
      <div className="p-6">
        {/* User Profile */}
        <div className="bg-white/20 rounded-2xl p-4 mb-6">
          <div className="flex items-center mb-3">
            <AvatarIcon className={`h-12 w-12 ${getAvatarColor(user.avatar)} mr-3`} />
            <div>
              <h3 className="text-white font-semibold text-sm">{user.name}</h3>
              <p className="text-gray-300 text-xs capitalize">{user.role}</p>
            </div>
          </div>
          
          {user.role === 'student' && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">Level {user.level || 1}</span>
                <span className="text-gray-300">{user.xp || 0} XP</span>
              </div>
              <div className="bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                  style={{ width: `${((user.xp || 0) % 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = getIcon(item.icon);
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <IconComponent className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 rounded-xl text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;