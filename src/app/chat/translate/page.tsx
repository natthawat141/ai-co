'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdTranslate, 
  MdCode, 
  MdSend,
  MdArrowForward,
  MdArrowBack 
} from 'react-icons/md';
import Navbar from '../../components/Navbar';
import NeuralBackground from '../../components/NeuralBackground';
import Footer from '../../components/Footer';

interface Message {
  userMessage: string;
  englishMessage: string;
  devResponse: string;
  thaiTranslation: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatHistoryItem {
  role: string;
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ChatHistoryItem[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, {
      userMessage: inputText,
      englishMessage: '',
      devResponse: '',
      thaiTranslation: '',
      timestamp: new Date(),
      isLoading: true
    }]);

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userMessage: inputText,
          conversationHistory
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: data.englishMessage },
        { role: 'assistant', content: data.devResponse }
      ]);

      setMessages(prev => prev.map((msg, idx) => 
        idx === prev.length - 1 
          ? {
              userMessage: inputText,
              englishMessage: data.englishMessage,
              devResponse: data.devResponse,
              thaiTranslation: data.thaiTranslation,
              timestamp: new Date(),
              isLoading: false
            }
          : msg
      ));
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => prev.map((msg, idx) => 
        idx === prev.length - 1 
          ? {
              userMessage: inputText,
              englishMessage: '',
              devResponse: '',
              thaiTranslation: 'เกิดข้อผิดพลาดในการสนทนา กรุณาลองใหม่อีกครั้ง',
              timestamp: new Date(),
              isLoading: false
            }
          : msg
      ));
    }

    setIsLoading(false);
    setInputText('');
  };

  const MessageBubble = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`backdrop-blur-sm rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-slate-900">
        {/* Neural Background */}
        <div className="fixed inset-0 z-0">
          <NeuralBackground />
        </div>
        
        {/* Gradient Overlay */}
        <div className="fixed inset-0 bg-gradient-to-b from-transparent via-slate-900/80 to-slate-900 z-0" />

        <div className="relative z-10 flex flex-col max-w-4xl mx-auto pt-20 px-4 h-[calc(100vh-80px)]">
          {/* Header */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-t-2xl border border-slate-700/50 p-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <MdCode className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-white text-lg font-medium">บทบาท Web Development Assistant</h2>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-hidden bg-slate-800/30 backdrop-blur-sm border-x border-slate-700/50">
            <div className="h-full overflow-y-auto p-4 space-y-8">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    {/* User Message */}
                    <motion.div className="flex justify-end">
                      <MessageBubble className="bg-blue-600/30 max-w-[80%]">
                        <p className="text-white">{msg.userMessage}</p>
                        <span className="text-xs text-blue-200 mt-2 block">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </MessageBubble>
                    </motion.div>

                    {msg.isLoading ? (
                      <div className="flex space-x-2 justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="w-2 h-2 rounded-full bg-slate-400"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                          className="w-2 h-2 rounded-full bg-slate-400"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                          className="w-2 h-2 rounded-full bg-slate-400"
                        />
                      </div>
                    ) : (
                      <>
                        {/* Translation to English */}
                        <motion.div 
                          className="flex justify-end"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <MessageBubble className="bg-indigo-600/20 max-w-[80%] ml-8">
                            <div className="flex items-center space-x-2 mb-2">
                              <MdTranslate className="w-4 h-4 text-indigo-400" />
                              <MdArrowForward className="w-4 h-4 text-indigo-400" />
                              <span className="text-xs text-indigo-400">English</span>
                            </div>
                            <p className="text-indigo-100">{msg.englishMessage}</p>
                          </MessageBubble>
                        </motion.div>

                        {/* Developer Response */}
                        <motion.div 
                          className="flex justify-start"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <MessageBubble className="bg-slate-700/50 max-w-[80%]">
                            <p className="text-white font-mono">{msg.devResponse}</p>
                          </MessageBubble>
                        </motion.div>

                        {/* Translation to Thai */}
                        <motion.div 
                          className="flex justify-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <MessageBubble className="bg-green-600/20 max-w-[80%] ml-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <MdTranslate className="w-4 h-4 text-green-400" />
                              <MdArrowBack className="w-4 h-4 text-green-400" />
                              <span className="text-xs text-green-400">ภาษาไทย</span>
                            </div>
                            <p className="text-green-100">{msg.thaiTranslation}</p>
                          </MessageBubble>
                        </motion.div>
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-b-2xl border border-t-0 border-slate-700/50 p-4">
            <form onSubmit={handleSubmit} className="flex items-center space-x-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="พิมพ์คำถามเกี่ยวกับการพัฒนาเว็บ..."
                className="flex-1 bg-slate-700/50 backdrop-blur-sm text-white rounded-lg px-4 py-3 
                         placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                         border border-slate-600/50"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg 
                         px-6 py-3 flex items-center space-x-2 disabled:opacity-50 
                         disabled:cursor-not-allowed transition-colors"
              >
                <MdSend className="w-5 h-5" />
                <span className="hidden sm:inline">ส่ง</span>
              </button>
            </form>
          </div>
        </div>
      
      </div>
     
    </>
  );
}