import React, { useState } from 'react';
import { User } from '../../types/User';
import { BarChart, TrendingUp, Users, Award, Calendar, Download } from 'lucide-react';

interface AnalyticsProps {
  user: User;
}

const Analytics: React.FC<AnalyticsProps> = ({ user }) => {
  const [timeRange, setTimeRange] = useState('month');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalStudents: 45,
      activeStudents: 38,
      completedActivities: 267,
      averageEngagement: 87,
      topPerformer: 'Maya Patel',
      improvementRate: 23
    },
    engagement: [
      { date: '2025-01-01', logins: 32, activities: 45, avgTime: 25 },
      { date: '2025-01-08', logins: 38, activities: 52, avgTime: 28 },
      { date: '2025-01-15', logins: 35, activities: 48, avgTime: 30 },
      { date: '2025-01-22', logins: 42, activities: 58, avgTime: 32 }
    ],
    performance: {
      byAgeGroup: [
        { group: '7-14', avgScore: 82, completion: 95, engagement: 88 },
        { group: '15-18', avgScore: 87, completion: 92, engagement: 85 },
        { group: '19-21', avgScore: 91, completion: 88, engagement: 82 }
      ],
      byTopic: [
        { topic: 'Climate Change', avgScore: 85, attempts: 45 },
        { topic: 'Ocean Conservation', avgScore: 89, attempts: 38 },
        { topic: 'Renewable Energy', avgScore: 83, attempts: 42 },
        { topic: 'Waste Management', avgScore: 91, attempts: 35 }
      ]
    },
    progress: [
      { student: 'Maya Patel', level: 10, xp: 1680, improvement: '+15%', lastActive: '2 hours ago' },
      { student: 'Emma Thompson', level: 8, xp: 1250, improvement: '+12%', lastActive: '1 day ago' },
      { student: 'Alex Rodriguez', level: 6, xp: 890, improvement: '+8%', lastActive: '3 days ago' },
      { student: 'Jake Morrison', level: 7, xp: 1120, improvement: '+20%', lastActive: '1 day ago' },
      { student: 'Lisa Chen', level: 5, xp: 750, improvement: '+5%', lastActive: '4 days ago' }
    ]
  };

  const timeRanges = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' }
  ];

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    if (score >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const getPerformanceBg = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-yellow-500';
    if (score >= 70) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const exportData = () => {
    const dataToExport = {
      timestamp: new Date().toISOString(),
      timeRange,
      ...analyticsData
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-300">Track student progress and engagement metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-white/40"
          >
            {timeRanges.map(range => (
              <option key={range.id} value={range.id} className="bg-gray-800">
                {range.name}
              </option>
            ))}
          </select>
          <button
            onClick={exportData}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-blue-400" />
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{analyticsData.overview.activeStudents}</div>
              <div className="text-sm text-gray-400">of {analyticsData.overview.totalStudents}</div>
            </div>
          </div>
          <h3 className="text-white font-semibold">Active Students</h3>
          <p className="text-gray-300 text-sm">Currently engaged learners</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <BarChart className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{analyticsData.overview.completedActivities}</span>
          </div>
          <h3 className="text-white font-semibold">Activities Completed</h3>
          <p className="text-gray-300 text-sm">Total submissions</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Award className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{analyticsData.overview.averageEngagement}%</span>
          </div>
          <h3 className="text-white font-semibold">Avg Engagement</h3>
          <p className="text-gray-300 text-sm">Student participation</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">+{analyticsData.overview.improvementRate}%</span>
          </div>
          <h3 className="text-white font-semibold">Improvement Rate</h3>
          <p className="text-gray-300 text-sm">Performance growth</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance by Age Group */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">Performance by Age Group</h2>
          <div className="space-y-4">
            {analyticsData.performance.byAgeGroup.map((group, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">Ages {group.group}</h3>
                  <span className={`font-bold ${getPerformanceColor(group.avgScore)}`}>
                    {group.avgScore}%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Average Score</span>
                    <span className="text-white">{group.avgScore}%</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getPerformanceBg(group.avgScore)}`}
                      style={{ width: `${group.avgScore}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                    <div>
                      <span className="text-gray-400">Completion: </span>
                      <span className="text-white">{group.completion}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Engagement: </span>
                      <span className="text-white">{group.engagement}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance by Topic */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-6">Performance by Topic</h2>
          <div className="space-y-4">
            {analyticsData.performance.byTopic.map((topic, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">{topic.topic}</h3>
                  <span className={`font-bold ${getPerformanceColor(topic.avgScore)}`}>
                    {topic.avgScore}%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getPerformanceBg(topic.avgScore)}`}
                      style={{ width: `${topic.avgScore}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{topic.attempts} attempts</span>
                    <span className="text-white">{topic.avgScore}% avg score</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Progress Table */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-6">Individual Student Progress</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white font-semibold">Student</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Level</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">XP</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Improvement</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Last Active</th>
                  <th className="text-left py-3 px-4 text-white font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.progress.map((student, index) => (
                  <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {student.student.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-white font-semibold">{student.student}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <span className="text-white font-semibold mr-2">{student.level}</span>
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                            style={{ width: `${(student.level % 5) * 20}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-white">{student.xp.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${
                        parseInt(student.improvement.replace('%', '').replace('+', '')) > 10 
                          ? 'text-green-400' 
                          : 'text-yellow-400'
                      }`}>
                        {student.improvement}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{student.lastActive}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        student.lastActive.includes('hour') 
                          ? 'bg-green-500/20 text-green-300'
                          : student.lastActive.includes('1 day')
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {student.lastActive.includes('hour') ? 'Active' : 
                         student.lastActive.includes('1 day') ? 'Recent' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Engagement Trends */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-6">Engagement Trends</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">Daily Logins</h3>
            <div className="space-y-2">
              {analyticsData.engagement.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(day.logins / 45) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm w-8">{day.logins}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-300 mb-3">Activities</h3>
            <div className="space-y-2">
              {analyticsData.engagement.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(day.activities / 60) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm w-8">{day.activities}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">Avg Time (min)</h3>
            <div className="space-y-2">
              {analyticsData.engagement.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${(day.avgTime / 40) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm w-8">{day.avgTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;