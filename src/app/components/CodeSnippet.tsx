// components/CodeSnippet.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { MdChat, MdCode, MdTranslate, MdContentCopy, MdSend, MdMoreVert } from 'react-icons/md';

interface Message {
  text: string;
  translation: string;
  sender: 'user' | 'customer';
  timestamp: Date;
}

export function AICodeSnippet() {
  const [activeTab, setActiveTab] = useState<'code' | 'demo'>('code');
  const [copied, setCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "สวัสดีครับ ผมสนใจสินค้าของคุณมากครับ",
      translation: "Hello, I'm very interested in your products.",
      sender: 'customer',
      timestamp: new Date()
    }
  ]);

  const code = `// AI Translation Example
import { AITranslator } from '@ai-translator/core';

// Initialize the translator with Thai-English support
const translator = new AITranslator({
  contextAware: true,
  languages: ['th', 'en'],
  modelConfig: {
    temperature: 0.7,
    maxTokens: 100,
    contextWindow: 1000
  }
});

// Configure custom translation settings
const translationConfig = {
  enhanceFormality: true,
  preserveTone: true,
  adaptToContext: true,
  domainSpecific: 'ecommerce'
};

// Real-time translation with context preservation
async function translateMessage(message: string) {
  try {
    const translation = await translator.translate({
      text: message,
      from: 'th',
      to: 'en',
      preserveContext: true,
      ...translationConfig
    });
    
    return {
      original: message,
      translated: translation.text,
      confidence: translation.confidence,
      context: translation.contextTags,
      alternatives: translation.alternativeTranslations
    };
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate message');
  }
}

// Example usage with streaming response
const handleMessage = async () => {
  const result = await translateMessage(
    "สวัสดีครับ ผมสนใจสินค้าของคุณมากครับ"
  );
  
  console.log('Translation result:', result);
  console.log('Confidence score:', result.confidence);
  console.log('Context tags:', result.context);
  return result;
};

// Initialize the translation service
(async () => {
  try {
    await translator.initialize();
    console.log('Translator ready');
  } catch (error) {
    console.error('Initialization failed:', error);
  }
})();`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  };

  const simulateNewMessage = async () => {
    if (messages.length === 1) {
      simulateTyping();
      setTimeout(() => {
        setMessages([...messages, {
          text: "Thank you for your interest! What kind of products are you looking for?",
          translation: "ขอบคุณที่สนใจครับ! คุณกำลังมองหาสินค้าประเภทไหนครับ?",
          sender: 'user',
          timestamp: new Date()
        }]);
      }, 2000);
    } else if (messages.length === 2) {
      simulateTyping();
      setTimeout(() => {
        setMessages([...messages, {
          text: "ผมกำลังมองหาสินค้าประเภทอิเล็กทรอนิกส์ครับ โดยเฉพาะสมาร์ทโฟน",
          translation: "I'm looking for electronic products, especially smartphones.",
          sender: 'customer',
          timestamp: new Date()
        }]);
      }, 2000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-xl overflow-hidden shadow-2xl bg-gray-900"
    >
      {/* Header with tabs */}
      <div className="border-b border-gray-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center px-4 py-2">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-3 text-gray-400 text-sm hidden sm:block">AI Translation Demo</span>
          </div>
          <div className="flex space-x-2 sm:ml-4 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${
                activeTab === 'code' 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : 'text-gray-400 hover:bg-gray-800'
              } transition-all duration-200 flex-1 sm:flex-none justify-center`}
            >
              <MdCode className="text-lg" />
              <span className="text-sm">Code</span>
            </button>
            <button
              onClick={() => setActiveTab('demo')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${
                activeTab === 'demo' 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : 'text-gray-400 hover:bg-gray-800'
              } transition-all duration-200 flex-1 sm:flex-none justify-center`}
            >
              <MdChat className="text-lg" />
              <span className="text-sm">Live Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="h-[400px] sm:h-[500px] lg:h-[600px]">
        {activeTab === 'code' ? (
          <div className="relative h-full">
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 
                       text-gray-400 hover:text-white transition-all duration-200 z-10 group"
              title="Copy code"
            >
              <MdContentCopy />
              <span className="absolute right-full mr-2 px-2 py-1 rounded bg-gray-700 text-xs 
                           invisible group-hover:visible whitespace-nowrap">
                Copy to clipboard
              </span>
            </button>
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-4 right-16 px-3 py-1 bg-green-500/20 text-green-400 
                           rounded-lg text-sm border border-green-500/30"
                >
                  Copied!
                </motion.div>
              )}
            </AnimatePresence>
            <SyntaxHighlighter
              language="typescript"
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '20px',
                height: '100%',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
              showLineNumbers={true}
              wrapLines={true}
              className="h-full overflow-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-700"
            >
              {code}
            </SyntaxHighlighter>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] space-y-2 ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}>
                    <div className={`rounded-lg p-3 ${
                      msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'
                    }`}>
                      <p className="text-white">{msg.text}</p>
                      <p className="text-xs text-gray-300 mt-1">{formatTime(msg.timestamp)}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MdTranslate className="text-gray-400" />
                      <p className="text-gray-400">{msg.translation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2 text-gray-400"
                >
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
                </motion.div>
              )}
            </div>
            
            {/* Input area */}
            <div className="border-t border-gray-800 p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg pr-24
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <button
                  onClick={simulateNewMessage}
                  disabled={messages.length >= 3}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5
                           bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200"
                >
                  <MdSend />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}