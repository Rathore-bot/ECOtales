import React, { useState } from 'react';
import { User } from '../../types/User';
import { Plus, Trash2, Edit, Play, Clock, Users, Award } from 'lucide-react';

interface QuizCreatorProps {
  user: User;
}

const QuizCreator: React.FC<QuizCreatorProps> = ({ user }) => {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: 'Climate Change Basics',
      description: 'Test your understanding of climate change fundamentals',
      questions: 15,
      duration: 30,
      difficulty: 'Beginner',
      isActive: true,
      completions: 23,
      avgScore: 85,
      createdAt: '2025-01-10'
    },
    {
      id: 2,
      title: 'Renewable Energy Sources',
      description: 'Explore different types of renewable energy',
      questions: 12,
      duration: 25,
      difficulty: 'Intermediate',
      isActive: true,
      completions: 18,
      avgScore: 78,
      createdAt: '2025-01-08'
    },
    {
      id: 3,
      title: 'Ecosystem Balance',
      description: 'Understanding ecological relationships and balance',
      questions: 20,
      duration: 45,
      difficulty: 'Advanced',
      isActive: false,
      completions: 12,
      avgScore: 92,
      createdAt: '2025-01-05'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<any>(null);
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    description: '',
    duration: 30,
    difficulty: 'Beginner',
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      }
    ]
  });

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  
  const sampleQuestions = {
    'Climate Change': [
      {
        question: 'What is the primary greenhouse gas responsible for climate change?',
        options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Argon'],
        correctAnswer: 0,
        explanation: 'Carbon dioxide (CO2) is the most significant greenhouse gas contributing to climate change.'
      },
      {
        question: 'Which renewable energy source is most abundant?',
        options: ['Wind', 'Hydroelectric', 'Solar', 'Geothermal'],
        correctAnswer: 2,
        explanation: 'Solar energy is the most abundant renewable energy source available on Earth.'
      }
    ],
    'Ecosystems': [
      {
        question: 'What is biodiversity?',
        options: ['Single species population', 'Variety of life forms', 'Climate patterns', 'Soil composition'],
        correctAnswer: 1,
        explanation: 'Biodiversity refers to the variety of life forms in an ecosystem.'
      }
    ]
  };

  const addQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      questions: [...newQuiz.questions, {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      }]
    });
  };

  const removeQuestion = (index: number) => {
    setNewQuiz({
      ...newQuiz,
      questions: newQuiz.questions.filter((_, i) => i !== index)
    });
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = newQuiz.questions.map((q, i) => {
      if (i === index) {
        return { ...q, [field]: value };
      }
      return q;
    });
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const updateQuestionOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = newQuiz.questions.map((q, i) => {
      if (i === questionIndex) {
        const updatedOptions = [...q.options];
        updatedOptions[optionIndex] = value;
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const handleCreateQuiz = () => {
    if (newQuiz.title && newQuiz.questions.every(q => q.question)) {
      const quiz = {
        id: quizzes.length + 1,
        title: newQuiz.title,
        description: newQuiz.description,
        questions: newQuiz.questions.length,
        duration: newQuiz.duration,
        difficulty: newQuiz.difficulty,
        isActive: true,
        completions: 0,
        avgScore: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setQuizzes([quiz, ...quizzes]);
      setNewQuiz({
        title: '',
        description: '',
        duration: 30,
        difficulty: 'Beginner',
        questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' }]
      });
      setShowCreateModal(false);
    }
  };

  const toggleQuizStatus = (id: number) => {
    setQuizzes(quizzes.map(quiz => 
      quiz.id === id ? { ...quiz, isActive: !quiz.isActive } : quiz
    ));
  };

  const loadSampleQuestions = (topic: string) => {
    const questions = sampleQuestions[topic as keyof typeof sampleQuestions] || [];
    setNewQuiz({
      ...newQuiz,
      questions: questions.length > 0 ? questions : newQuiz.questions
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quiz Creator</h1>
          <p className="text-gray-300">Create engaging environmental quizzes for your students</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Quiz
        </button>
      </div>

      {/* Quiz Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Play className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">{quizzes.filter(q => q.isActive).length}</span>
          </div>
          <h3 className="text-white font-semibold">Active Quizzes</h3>
          <p className="text-gray-300 text-sm">Currently available</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-white">
              {quizzes.reduce((sum, q) => sum + q.completions, 0)}
            </span>
          </div>
          <h3 className="text-white font-semibold">Total Completions</h3>
          <p className="text-gray-300 text-sm">All quizzes combined</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Award className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">
              {Math.round(quizzes.reduce((sum, q) => sum + q.avgScore, 0) / quizzes.length)}%
            </span>
          </div>
          <h3 className="text-white font-semibold">Average Score</h3>
          <p className="text-gray-300 text-sm">Across all quizzes</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">
              {Math.round(quizzes.reduce((sum, q) => sum + q.duration, 0) / quizzes.length)}
            </span>
          </div>
          <h3 className="text-white font-semibold">Avg Duration</h3>
          <p className="text-gray-300 text-sm">Minutes per quiz</p>
        </div>
      </div>

      {/* Quiz List */}
      <div className="grid gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-bold text-white mr-3">{quiz.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    quiz.isActive 
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-gray-500/20 text-gray-300'
                  }`}>
                    {quiz.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    quiz.difficulty === 'Beginner' ? 'bg-blue-500/20 text-blue-300' :
                    quiz.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {quiz.difficulty}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{quiz.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>{quiz.questions} questions</span>
                  <span>{quiz.duration} minutes</span>
                  <span>{quiz.completions} completions</span>
                  <span>{quiz.avgScore}% avg score</span>
                  <span>Created: {new Date(quiz.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingQuiz(quiz)}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 p-2 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => toggleQuizStatus(quiz.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    quiz.isActive 
                      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300'
                      : 'bg-green-500/20 hover:bg-green-500/30 text-green-300'
                  }`}
                >
                  <Play className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setQuizzes(quizzes.filter(q => q.id !== quiz.id))}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-300 p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{quiz.completions}</div>
                  <div className="text-xs text-gray-400">Attempts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{quiz.avgScore}%</div>
                  <div className="text-xs text-gray-400">Avg Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{quiz.questions}</div>
                  <div className="text-xs text-gray-400">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{quiz.duration}m</div>
                  <div className="text-xs text-gray-400">Duration</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Quiz Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Quiz</h2>
            
            <div className="space-y-6">
              {/* Quiz Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Quiz Title</label>
                  <input
                    type="text"
                    value={newQuiz.title}
                    onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                    placeholder="Environmental Quiz Title"
                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Difficulty</label>
                  <select
                    value={newQuiz.difficulty}
                    onChange={(e) => setNewQuiz({...newQuiz, difficulty: e.target.value})}
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-purple-400 focus:outline-none"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty} className="bg-gray-800">
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newQuiz.description}
                  onChange={(e) => setNewQuiz({...newQuiz, description: e.target.value})}
                  placeholder="Describe what this quiz covers"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border border-white/20 focus:border-purple-400 focus:outline-none h-20 resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={newQuiz.duration}
                    onChange={(e) => setNewQuiz({...newQuiz, duration: parseInt(e.target.value)})}
                    min="5"
                    max="120"
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:border-purple-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Load Sample Questions</label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => loadSampleQuestions('Climate Change')}
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-3 py-2 rounded text-sm transition-colors"
                    >
                      Climate
                    </button>
                    <button
                      onClick={() => loadSampleQuestions('Ecosystems')}
                      className="bg-green-500/20 hover:bg-green-500/30 text-green-300 px-3 py-2 rounded text-sm transition-colors"
                    >
                      Ecosystems
                    </button>
                  </div>
                </div>
              </div>

              {/* Questions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Questions</h3>
                  <button
                    onClick={addQuestion}
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-300 px-4 py-2 rounded-lg text-sm transition-colors flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Question
                  </button>
                </div>

                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {newQuiz.questions.map((question, qIndex) => (
                    <div key={qIndex} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-medium">Question {qIndex + 1}</h4>
                        {newQuiz.questions.length > 1 && (
                          <button
                            onClick={() => removeQuestion(qIndex)}
                            className="text-red-300 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                          placeholder="Enter your question"
                          className="w-full p-2 rounded bg-white/10 text-white placeholder-gray-400 border border-white/20 text-sm focus:outline-none"
                        />
                        
                        <div className="grid grid-cols-2 gap-2">
                          {question.options.map((option, oIndex) => (
                            <div key={oIndex} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`correct-${qIndex}`}
                                checked={question.correctAnswer === oIndex}
                                onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                                className="text-green-400"
                              />
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => updateQuestionOption(qIndex, oIndex, e.target.value)}
                                placeholder={`Option ${oIndex + 1}`}
                                className="flex-1 p-2 rounded bg-white/10 text-white placeholder-gray-400 border border-white/20 text-sm focus:outline-none"
                              />
                            </div>
                          ))}
                        </div>

                        <input
                          type="text"
                          value={question.explanation}
                          onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                          placeholder="Explanation for correct answer (optional)"
                          className="w-full p-2 rounded bg-white/10 text-white placeholder-gray-400 border border-white/20 text-sm focus:outline-none"
                        />
                      </div>
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
                onClick={handleCreateQuiz}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Create Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCreator;