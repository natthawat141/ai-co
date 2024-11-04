// app/chat/page.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdTranslate, 
  MdSwapHoriz, 
  MdSend,
} from 'react-icons/md';
import Navbar from '../components/Navbar';
import NeuralBackground from '../components/NeuralBackground';
import Footer from '../components/Footer';

interface Message {
  text: string;
  translation: string;
  timestamp: Date;
  isLoading?: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [srcLang, setSrcLang] = useState('ไทย');
  const [tgtLang, setTgtLang] = useState('อังกฤษ');
  const [isLoading, setIsLoading] = useState(false);

  const handleSwapLanguages = () => {
    setSrcLang(tgtLang);
    setTgtLang(srcLang);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, {
      text: inputText,
      translation: '',
      timestamp: new Date(),
      isLoading: true
    }]);

    setIsLoading(true);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: inputText,
          srcLang,
          tgtLang
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setMessages(prev => prev.map((msg, idx) => 
        idx === prev.length - 1 
          ? {
              text: inputText,
              translation: data.translation,
              timestamp: new Date(),
              isLoading: false
            }
          : msg
      ));
    } catch (error) {
      console.error('Translation error:', error);
      setMessages(prev => prev.map((msg, idx) => 
        idx === prev.length - 1 
          ? {
              text: inputText,
              translation: 'เกิดข้อผิดพลาดในการแปล',
              timestamp: new Date(),
              isLoading: false
            }
          : msg
      ));
    }

    setIsLoading(false);
    setInputText('');
  };

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

        {/* Main Content */}
        <div className="relative z-10 flex flex-col max-w-4xl mx-auto pt-20 px-4 h-[calc(100vh-80px)]">
          {/* Language Selector Bar */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-t-2xl border border-slate-700/50 p-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <MdTranslate className="w-6 h-6 text-blue-400" />
              </div>
              <select 
                value={srcLang}
                onChange={(e) => setSrcLang(e.target.value)}
                className="bg-slate-700/50 backdrop-blur-sm text-white rounded-lg px-4 py-2 text-sm
                         border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ไทย">ไทย</option>
                <option value="อังกฤษ">อังกฤษ</option>
              </select>
              <button 
                onClick={handleSwapLanguages}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <MdSwapHoriz className="w-6 h-6 text-slate-400" />
              </button>
              <select
                value={tgtLang}
                onChange={(e) => setTgtLang(e.target.value)}
                className="bg-slate-700/50 backdrop-blur-sm text-white rounded-lg px-4 py-2 text-sm
                         border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="อังกฤษ">อังกฤษ</option>
                <option value="ไทย">ไทย</option>
              </select>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-hidden bg-slate-800/30 backdrop-blur-sm border-x border-slate-700/50">
            <div className="h-full overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-2"
                  >
                    <div className="flex flex-col space-y-1">
                      <div className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-3 max-w-[80%]">
                        <p className="text-white">{msg.text}</p>
                        <span className="text-xs text-slate-400 mt-1 block">
                          {msg.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    
                    {msg.isLoading ? (
                      <div className="flex space-x-2 text-slate-400 ml-4">
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-100" />
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-200" />
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-1 ml-4">
                        <div className="bg-blue-600/30 backdrop-blur-sm rounded-lg p-3 max-w-[80%]">
                          <p className="text-blue-100">{msg.translation}</p>
                        </div>
                      </div>
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
                placeholder={`พิมพ์ข้อความภาษา${srcLang}...`}
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
                <span>ส่ง</span>
              </button>
            </form>
          </div>
        </div>
        <Footer/>
      </div>
    
    </>
  );
}