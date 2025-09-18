import React, { useState } from 'react';
import { User } from '../../types/User';
import { Upload, Users, Search, UserPlus, Mail, Award, TrendingUp } from 'lucide-react';

interface StudentManagementProps {
  user: User;
}

const StudentManagement: React.FC<StudentManagementProps> = ({ user }) => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Emma Thompson',
      email: 'emma.thompson@school.edu',
      avatar: 'earth',
      level: 8,
      xp: 1250,
      joinedAt: '2024-12-01',
      lastActive: '2025-01-15',
      completedQuizzes: 12,
      photosCaptured: 25,
      treesPlanted: 3,
      goalsCompleted: 5
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      email: 'alex.rodriguez@school.edu',
      avatar: 'water',
      level: 6,
      xp: 890,
      joinedAt: '2024-12-03',
      lastActive: '2025-01-14',
      completedQuizzes: 8,
      photosCaptured: 18,
      treesPlanted: 2,
      goalsCompleted: 3
    },
    {
      id: 3,
      name: 'Maya Patel',
      email: 'maya.patel@school.edu',
      avatar: 'air',
      level: 10,
      xp: 1680,
      joinedAt: '2024-11-28',
      lastActive: '2025-01-15',
      completedQuizzes: 15,
      photosCaptured: 32,
      treesPlanted: 7,
      goalsCompleted: 8
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [csvData, setCsvData] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvatarColor = (avatar: string) => {
    switch (avatar) {
      case 'water': return 'text-blue-400';
      case 'fire': return 'text-red-400';
      case 'earth': return 'text-green-400';
      case 'air': return 'text-gray-400';
      default: return 'text-white';
    }
  };

  const handleCSVUpload = () => {
    if (csvData.trim()) {
      // Parse CSV data (simplified)
      const lines = csvData.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      const newStudents = lines.slice(1).map((line, index) => {
        const values = line.split(',').map(v => v.trim());
        return {
          id: students.length + index + 1,
          name: values[0] || `Student ${index + 1}`,
          email: values[1] || `student${index + 1}@school.edu`,
          avatar: ['water', 'fire', 'earth', 'air'][Math.floor(Math.random() * 4)],
          level: 1,
          xp: 0,
          joinedAt: new Date().toISOString().split('T')[0],
          lastActive: new Date().toISOString().split('T')[0],
          completedQuizzes: 0,
          photosCaptured: 0,
          treesPlanted: 0,
          goalsCompleted: 0
        };
      });
      
      setStudents([...students, ...newStudents]);
      setCsvData('');
      setShowCSVModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Student Management</h1>
          <p className="text-gray-300">Monitor and manage your environmental champions</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCSVModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg"
          >
            <Upload className="h-5 w-5 mr-2" />
            Upload CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add Student
          </button>
        </div>
      </div>

      {/* Class Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{students.length}</span>
          </div>
          <h3 className="text-white font-semibold">Total Students</h3>
          <p className="text-gray-300 text-sm">In your classes</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-white">
              {Math.round(students.reduce((sum, s) => sum + s.level, 0) / students.length)}
            </span>
          </div>
          <h3 className="text-white font-semibold">Average Level</h3>
          <p className="text-gray-300 text-sm">Class progression</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Award className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">
              {students.reduce((sum, s) => sum + s.goalsCompleted, 0)}
            </span>
          </div>
          <h3 className="text-white font-semibold">Goals Completed</h3>
          <p className="text-gray-300 text-sm">Environmental achievements</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Mail className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">
              {students.filter(s => new Date(s.lastActive) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
            </span>
          </div>
          <h3 className="text-white font-semibold">Active This Week</h3>
          <p className="text-gray-300 text-sm">Recent participants</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search students by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 text-white placeholder-gray-400 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none"
          />
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">Student Progress</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white font-semibold">Student</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Level</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Quizzes</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Photos</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Trees</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Goals</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center ${getAvatarColor(student.avatar)}`}>
                          <span className="text-lg">🌟</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{student.name}</h3>
                          <p className="text-gray-400 text-sm">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-white font-semibold">{student.level}</div>
                      <div className="text-gray-400 text-sm">{student.xp} XP</div>
                    </td>
                    <td className="py-4 px-4 text-white">{student.completedQuizzes}</td>
                    <td className="py-4 px-4 text-white">{student.photosCaptured}</td>
                    <td className="py-4 px-4 text-white">{student.treesPlanted}</td>
                    <td className="py-4 px-4 text-white">{student.goalsCompleted}</td>
                    <td className="py-4 px-4 text-gray-300">
                      {new Date(student.lastActive).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CSV Upload Modal */}
      {showCSVModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-white mb-6">Upload Student CSV</h2>
            
            <div className="mb-4">
              <p className="text-gray-300 text-sm mb-2">
                Upload a CSV file with student information. Format: Name, Email
              </p>
              <div className="bg-white/10 rounded-lg p-3 text-sm text-gray-300 font-mono">
                Example:<br />
                Name,Email<br />
                John Doe,john.doe@school.edu<br />
                Jane Smith,jane.smith@school.edu
              </div>
            </div>

            <textarea
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              placeholder="Paste your CSV data here..."
              className="w-full h-32 p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-blue-400 focus:outline-none resize-none"
            />

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowCSVModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCSVUpload}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Upload Students
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-green-900 to-teal-900 rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6">Add Individual Student</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Student's full name"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-green-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="student@school.edu"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-green-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;