// app/chat.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = { role: 'user', content: inputText };
    setMessages((prev) => [...prev, userMessage]);

    // ส่งคำขอแปลภาษาไปยัง API
    try {
      const response = await axios.post('/api/translate', {
        text: inputText,
        srcLang: 'ไทย',
        tgtLang: 'อังกฤษ',
      });

      const translatedText = response.data.translation;

      const assistantMessage: Message = { role: 'assistant', content: translatedText };
      setMessages((prev) => [...prev, assistantMessage]);

      setInputText('');
    } catch (error) {
      console.error('Error translating text:', error);
      const errorMessage: Message = { role: 'assistant', content: 'เกิดข้อผิดพลาดในการแปลข้อความ' };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={styles.container}>
      <h1>AI Copilot Transaction</h1>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.role === 'user' ? styles.userMessage : styles.assistantMessage}>
            <strong>{msg.role === 'user' ? '👤 คุณ: ' : '🤖 ระบบแปล: '}</strong>
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div style={styles.inputBox}>
        <textarea
          style={styles.textarea}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="พิมพ์ข้อความของคุณที่นี่..."
        />
        <button style={styles.button} onClick={handleSend}>ส่ง</button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  chatBox: {
    border: '1px solid #ccc',
    padding: '10px',
    height: '400px',
    overflowY: 'scroll',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
  },
  userMessage: {
    textAlign: 'right',
    margin: '10px 0',
    padding: '10px',
    backgroundColor: '#d1e7dd',
    borderRadius: '10px',
  },
  assistantMessage: {
    textAlign: 'left',
    margin: '10px 0',
    padding: '10px',
    backgroundColor: '#f8d7da',
    borderRadius: '10px',
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'none',
  },
  button: {
    alignSelf: 'flex-end',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#198754',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
