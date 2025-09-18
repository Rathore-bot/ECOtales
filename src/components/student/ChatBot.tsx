import React, { useState, useRef, useEffect } from 'react';
import { User } from '../../types/User';
import { Send, Bot, User as UserIcon, Lightbulb, HelpCircle, Leaf } from 'lucide-react';

interface ChatBotProps {
  user: User;
}

const ChatBot: React.FC<ChatBotProps> = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: `Hello ${user.name}! I'm your Environmental Assistant. I'm here to help you with environmental questions, provide solutions to eco-problems, and guide you through your green journey. What would you like to know?`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "How can I reduce plastic waste?",
    "What are renewable energy sources?",
    "How does climate change affect ecosystems?",
    "Best ways to conserve water at home?",
    "How to start a recycling program?",
    "What is carbon footprint?"
  ];

  const environmentalTips = [
    {
      icon: "💡",
      tip: "Switch to LED bulbs to save 75% more energy than traditional bulbs",
      category: "Energy"
    },
    {
      icon: "🌱",
      tip: "Plant native species in your garden to support local wildlife",
      category: "Biodiversity"
    },
    {
      icon: "🚲",
      tip: "Bike or walk for short trips to reduce carbon emissions",
      category: "Transportation"
    },
    {
      icon: "💧",
      tip: "Fix leaky faucets immediately - a single drop per second wastes 5 gallons per day",
      category: "Water"
    }
  ];

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('plastic') || message.includes('waste')) {
      return "Great question about plastic waste! Here are some effective ways to reduce plastic usage:\n\n🔹 Use reusable bags, bottles, and containers\n🔹 Choose products with minimal packaging\n🔹 Support businesses that use eco-friendly alternatives\n🔹 Participate in local cleanup initiatives\n🔹 Educate others about plastic pollution\n\nWould you like specific tips for your age group or suggestions for school projects?";
    }
    
    if (message.includes('renewable energy')) {
      return "Renewable energy is fantastic for our planet! Here are the main types:\n\n☀️ Solar Energy - Harnesses sunlight\n💨 Wind Energy - Uses wind turbines\n💧 Hydroelectric - Uses flowing water\n🌋 Geothermal - Uses Earth's heat\n🌾 Biomass - Uses organic materials\n\nThese sources don't deplete natural resources and produce minimal pollution. Which type interests you most?";
    }
    
    if (message.includes('climate change')) {
      return "Climate change significantly impacts ecosystems:\n\n🌡️ Rising temperatures affect animal habitats\n🌊 Sea level rise threatens coastal areas\n❄️ Changing precipitation patterns affect plant growth\n🦋 Species migration patterns are shifting\n🌳 Forest fires are becoming more frequent\n\nBut there's hope! Conservation efforts, renewable energy, and individual actions can help. What specific ecosystem are you curious about?";
    }
    
    if (message.includes('water') || message.includes('conserve')) {
      return "Water conservation is crucial! Here are practical tips:\n\n🚿 Take shorter showers (save 2.5 gallons per minute)\n🚰 Fix leaks promptly\n🌧️ Collect rainwater for plants\n🍃 Use drought-resistant plants in gardens\n⚡ Install water-efficient appliances\n🧽 Only run dishwashers/washing machines when full\n\nSmall changes make a big difference! Want tips specific to your living situation?";
    }
    
    if (message.includes('carbon footprint')) {
      return "Your carbon footprint is the total greenhouse gases you produce! Here's how to reduce it:\n\n🏠 Home: Use energy-efficient appliances, improve insulation\n🚗 Transport: Walk, bike, use public transport, carpool\n🍽️ Food: Eat more plants, buy local, reduce food waste\n♻️ Consumption: Buy less, reuse more, recycle properly\n⚡ Energy: Switch to renewable energy sources\n\nTrack your progress and celebrate small victories! Would you like help calculating your current footprint?";
    }
    
    if (message.includes('recycle') || message.includes('recycling')) {
      return "Starting a recycling program is impactful! Here's a step-by-step guide:\n\n📋 Step 1: Assess current waste streams\n📍 Step 2: Research local recycling facilities\n👥 Step 3: Build a team of volunteers\n📚 Step 4: Educate your community\n🗂️ Step 5: Set up collection systems\n📊 Step 6: Monitor and measure success\n\nRemember: Reduce and Reuse come before Recycle! Need help with any specific step?";
    }
    
    return "That's an interesting environmental question! While I don't have a specific answer for that, I encourage you to:\n\n🔍 Research from reliable environmental sources\n👥 Discuss with your teacher or classmates\n📚 Explore our game mode for interactive learning\n📸 Document related observations in your photo journal\n\nI'm constantly learning too! Feel free to ask about plastic waste, renewable energy, climate change, water conservation, or recycling. What would you like to explore?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      message: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot' as const,
        message: generateBotResponse(inputMessage),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const formatMessage = (message: string) => {
    return message.split('\n').map((line, index) => (
      <div key={index} className={index > 0 ? 'mt-2' : ''}>
        {line}
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Eco Assistant</h1>
          <p className="text-gray-300">Your personalized environmental guide and problem solver</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-xl">
          <Bot className="h-8 w-8 text-white" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 flex flex-col h-96">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  <div className="text-sm leading-relaxed">
                    {formatMessage(message.message)}
                  </div>
                  <div className="text-xs opacity-60 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserIcon className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-white/20 px-4 py-3 rounded-2xl">
                  <div className="text-white text-sm">
                    <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse mr-1"></span>
                    <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse mr-1" style={{animationDelay: '0.2s'}}></span>
                    <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/20">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about the environment..."
                className="flex-1 bg-white/10 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Questions */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center mb-3">
              <HelpCircle className="h-5 w-5 text-blue-400 mr-2" />
              <h3 className="text-white font-semibold">Quick Questions</h3>
            </div>
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left text-sm text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Environmental Tips */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center mb-3">
              <Lightbulb className="h-5 w-5 text-yellow-400 mr-2" />
              <h3 className="text-white font-semibold">Daily Eco Tips</h3>
            </div>
            <div className="space-y-3">
              {environmentalTips.map((tip, index) => (
                <div key={index} className="bg-white/5 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">{tip.icon}</span>
                    <div>
                      <p className="text-white text-sm">{tip.tip}</p>
                      <span className="text-xs text-gray-400 mt-1 inline-block">
                        {tip.category}
                      </span>
                    </div>
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

export default ChatBot;