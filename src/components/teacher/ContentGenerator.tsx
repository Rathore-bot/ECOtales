import React, { useState } from 'react';
import { User } from '../../types/User';
import { FileText, Download, Presentation, BookOpen, Video, Image } from 'lucide-react';

interface ContentGeneratorProps {
  user: User;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ user }) => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [contentType, setContentType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const topics = [
    'Climate Change',
    'Renewable Energy',
    'Ocean Conservation',
    'Forest Ecosystems',
    'Air Pollution',
    'Waste Management',
    'Biodiversity',
    'Sustainable Living',
    'Water Conservation',
    'Green Technology'
  ];

  const ageGroups = [
    { id: '7-14', name: 'Young Explorers (7-14)', level: 'Elementary' },
    { id: '15-18', name: 'Eco Warriors (15-18)', level: 'High School' },
    { id: '19-21', name: 'Green Pioneers (19-21)', level: 'College' },
    { id: '22+', name: 'Environmental Leaders (22+)', level: 'Adult' },
    { id: 'vocational', name: 'Skill Builders (Vocational)', level: 'Professional' }
  ];

  const contentTypes = [
    { id: 'presentation', name: 'PowerPoint Presentation', icon: Presentation, description: 'Interactive slide deck with visuals' },
    { id: 'lesson-plan', name: 'Lesson Plan', icon: BookOpen, description: 'Structured teaching guide with activities' },
    { id: 'worksheet', name: 'Student Worksheet', icon: FileText, description: 'Printable activities and exercises' },
    { id: 'infographic', name: 'Educational Infographic', icon: Image, description: 'Visual summary with key facts' },
    { id: 'video-script', name: 'Video Script', icon: Video, description: 'Script for educational video content' }
  ];

  const sampleContent = {
    'Climate Change': {
      '7-14': {
        'presentation': {
          title: 'Climate Change for Young Explorers',
          slides: [
            { title: 'What is Climate Change?', content: 'Simple explanation with fun animations' },
            { title: 'Why Does It Happen?', content: 'Greenhouse effect demonstration' },
            { title: 'How Can We Help?', content: 'Kid-friendly action items' },
            { title: 'Fun Climate Facts', content: 'Interactive quiz slides' }
          ],
          activities: ['Draw the greenhouse effect', 'Climate change charades', 'Green superhero creation']
        },
        'lesson-plan': {
          title: '45-Minute Climate Change Discovery Lesson',
          objectives: ['Understand basic climate concepts', 'Identify human impacts', 'Suggest simple solutions'],
          materials: ['Thermometer', 'Ice cubes', 'Lamp', 'Drawing supplies'],
          activities: [
            'Warm-up: Weather vs Climate game (5 min)',
            'Main activity: Ice melting experiment (20 min)',
            'Discussion: What can we do? (15 min)',
            'Wrap-up: Pledge creation (5 min)'
          ]
        }
      },
      '15-18': {
        'presentation': {
          title: 'Climate Science and Solutions',
          slides: [
            { title: 'The Science Behind Climate Change', content: 'Data and graphs' },
            { title: 'Global Impacts', content: 'Case studies from around the world' },
            { title: 'Mitigation Strategies', content: 'Technology and policy solutions' },
            { title: 'Your Role as Eco Warriors', content: 'Action planning workshop' }
          ],
          activities: ['Carbon footprint calculator', 'Climate policy debate', 'Solution brainstorming']
        }
      }
    }
  };

  const handleGenerate = async () => {
    if (!selectedTopic || !ageGroup || !contentType) return;

    setIsGenerating(true);
    
    // Simulate content generation
    setTimeout(() => {
      const content = sampleContent[selectedTopic as keyof typeof sampleContent]?.[ageGroup as keyof typeof sampleContent[keyof typeof sampleContent]]?.[contentType as keyof typeof sampleContent[keyof typeof sampleContent][keyof typeof sampleContent[keyof typeof sampleContent]]];
      
      if (content) {
        setGeneratedContent({
          topic: selectedTopic,
          ageGroup: ageGroups.find(ag => ag.id === ageGroup)?.name,
          type: contentTypes.find(ct => ct.id === contentType)?.name,
          ...content
        });
      } else {
        setGeneratedContent({
          topic: selectedTopic,
          ageGroup: ageGroups.find(ag => ag.id === ageGroup)?.name,
          type: contentTypes.find(ct => ct.id === contentType)?.name,
          title: `${selectedTopic} - ${contentTypes.find(ct => ct.id === contentType)?.name}`,
          content: `This would be a customized ${contentTypes.find(ct => ct.id === contentType)?.name.toLowerCase()} about ${selectedTopic} for ${ageGroups.find(ag => ag.id === ageGroup)?.name}. In a real implementation, this would be generated using AI based on educational best practices and age-appropriate content.`
        });
      }
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = () => {
    if (generatedContent) {
      // Simulate download
      const blob = new Blob([JSON.stringify(generatedContent, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedContent.topic}-${generatedContent.type}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Content Generator</h1>
          <p className="text-gray-300">Create customized educational materials for your environmental lessons</p>
        </div>
      </div>

      {/* Content Selection */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-6">Generate New Content</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Topic Selection */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">Environmental Topic</label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {topics.map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedTopic === topic
                      ? 'bg-blue-500/30 text-white border border-blue-400'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Age Group Selection */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">Target Age Group</label>
            <div className="space-y-2">
              {ageGroups.map(group => (
                <button
                  key={group.id}
                  onClick={() => setAgeGroup(group.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    ageGroup === group.id
                      ? 'bg-green-500/30 text-white border border-green-400'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20'
                  }`}
                >
                  <div className="font-semibold">{group.name}</div>
                  <div className="text-xs opacity-75">{group.level}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Type Selection */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">Content Type</label>
            <div className="space-y-2">
              {contentTypes.map(type => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      contentType === type.id
                        ? 'bg-purple-500/30 text-white border border-purple-400'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20'
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      <IconComponent className="h-4 w-4 mr-2" />
                      <span className="font-semibold">{type.name}</span>
                    </div>
                    <div className="text-xs opacity-75">{type.description}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGenerate}
            disabled={!selectedTopic || !ageGroup || !contentType || isGenerating}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              selectedTopic && ageGroup && contentType && !isGenerating
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating Content...
              </div>
            ) : (
              'Generate Educational Content'
            )}
          </button>
        </div>
      </div>

      {/* Generated Content */}
      {generatedContent && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Generated Content</h2>
            <button
              onClick={handleDownload}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>

          <div className="bg-white/5 rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">{generatedContent.title}</h3>
              <div className="flex space-x-4 text-sm text-gray-300">
                <span>📚 Topic: {generatedContent.topic}</span>
                <span>👥 Age Group: {generatedContent.ageGroup}</span>
                <span>📄 Type: {generatedContent.type}</span>
              </div>
            </div>

            {generatedContent.slides && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Presentation Slides</h4>
                <div className="space-y-2">
                  {generatedContent.slides.map((slide: any, index: number) => (
                    <div key={index} className="bg-white/10 p-3 rounded-lg">
                      <h5 className="font-semibold text-blue-300">Slide {index + 1}: {slide.title}</h5>
                      <p className="text-gray-300 text-sm">{slide.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {generatedContent.objectives && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Learning Objectives</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {generatedContent.objectives.map((obj: string, index: number) => (
                    <li key={index}>{obj}</li>
                  ))}
                </ul>
              </div>
            )}

            {generatedContent.materials && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Required Materials</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedContent.materials.map((material: string, index: number) => (
                    <span key={index} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {generatedContent.activities && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">
                  {generatedContent.slides ? 'Interactive Activities' : 'Lesson Activities'}
                </h4>
                <div className="space-y-2">
                  {generatedContent.activities.map((activity: string, index: number) => (
                    <div key={index} className="bg-white/10 p-3 rounded-lg">
                      <p className="text-gray-300">{activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {generatedContent.content && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Content Preview</h4>
                <p className="text-gray-300 leading-relaxed">{generatedContent.content}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content Library */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-white mb-6">Content Library</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Ocean Pollution Presentation', type: 'Presentation', age: '15-18', downloads: 45 },
            { title: 'Renewable Energy Worksheet', type: 'Worksheet', age: '7-14', downloads: 32 },
            { title: 'Forest Conservation Lesson', type: 'Lesson Plan', age: '19-21', downloads: 28 },
            { title: 'Climate Change Infographic', type: 'Infographic', age: '22+', downloads: 67 },
            { title: 'Recycling Video Script', type: 'Video Script', age: '15-18', downloads: 23 },
            { title: 'Biodiversity Activity Pack', type: 'Worksheet', age: '7-14', downloads: 51 }
          ].map((item, index) => (
            <div key={index} className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors">
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <p>📄 {item.type}</p>
                <p>👥 Ages {item.age}</p>
                <p>⬇️ {item.downloads} downloads</p>
              </div>
              <button className="mt-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-3 py-1 rounded text-sm transition-colors">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;