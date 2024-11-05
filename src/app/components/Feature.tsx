// components/Features.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  MdTranslate, 
  MdPsychology,
  MdChat,
  MdPublic,
  MdMemory,
  MdSecurity,
  MdSpeed,
  MdGroup,
  MdSmartToy
} from 'react-icons/md';

interface Feature {
  icon: JSX.Element;
  title: {
    th: string;
    en: string;
  };
  description: {
    th: string;
    en: string;
  };
  gradient: string;
}

export default function Features() {
  const [language, setLanguage] = useState('th');

  // รับค่าภาษาจาก localStorage เมื่อ component โหลด
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'th';
    setLanguage(storedLanguage);

    // ติดตามการเปลี่ยนแปลงภาษา
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'th');
    };

    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const features: Feature[] = [
    {
      icon: <MdTranslate className="w-8 h-8" />,
      title: {
        th: "แปลภาษาไทย-อังกฤษทันที",
        en: "Instant Thai-English Translation"
      },
      description: {
        th: "แปลภาษาระหว่างไทยและอังกฤษแบบเรียลไทม์ด้วยความแม่นยำสูงและเป็นธรรมชาติ",
        en: "Real-time translation between Thai and English with high accuracy and natural flow."
      },
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MdPsychology className="w-8 h-8" />,
      title: {
        th: "เข้าใจบริบทภาษา",
        en: "Contextual Understanding"
      },
      description: {
        th: "AI อัจฉริยะที่เข้าใจบริบทและความละเอียดอ่อนทางวัฒนธรรมไทย-อังกฤษ",
        en: "Smart AI that understands Thai-English context and cultural nuances."
      },
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <MdChat className="w-8 h-8" />,
      title: {
        th: "แสดงผลสองภาษา",
        en: "Bilingual Display"
      },
      description: {
        th: "ดูข้อความทั้งภาษาไทยและอังกฤษพร้อมกันเพื่อการเปรียบเทียบที่ง่ายดาย",
        en: "View messages in both Thai and English simultaneously for easy comparison."
      },
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <MdPublic className="w-8 h-8" />,
      title: {
        th: "เชื่อมโยงสองภาษา",
        en: "Thai-English Bridge"
      },
      description: {
        th: "ทลายกำแพงภาษาระหว่างผู้พูดภาษาไทยและอังกฤษ",
        en: "Breaking language barriers between Thai and English speakers."
      },
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <MdSmartToy className="w-8 h-8" />,
      title: {
        th: "โมเดล AI ขั้นสูง",
        en: "Advanced AI Model"
      },
      description: {
        th: "ขับเคลื่อนด้วยโมเดลภาษาที่ทันสมัยเฉพาะสำหรับการแปลไทย-อังกฤษ",
        en: "Powered by cutting-edge language models specialized for Thai-English translation."
      },
      gradient: "from-blue-500 to-violet-500"
    },
    {
      icon: <MdSecurity className="w-8 h-8" />,
      title: {
        th: "ปลอดภัยและเป็นส่วนตัว",
        en: "Private & Secure"
      },
      description: {
        th: "การสนทนาของคุณได้รับการปกป้องด้วยความปลอดภัยระดับองค์กร",
        en: "Your conversations are protected with enterprise-grade security."
      },
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: <MdSpeed className="w-8 h-8" />,
      title: {
        th: "ประสิทธิภาพรวดเร็ว",
        en: "Fast Performance"
      },
      description: {
        th: "เวลาตอบสนองการแปลที่รวดเร็วเพื่อการสนทนาที่ราบรื่น",
        en: "Quick translation response time for seamless conversations."
      },
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <MdMemory className="w-8 h-8" />,
      title: {
        th: "การเรียนรู้อัจฉริยะ",
        en: "Smart Memory"
      },
      description: {
        th: "เรียนรู้จากบริบทเพื่อปรับปรุงความแม่นยำในการแปลอย่างต่อเนื่อง",
        en: "Learns from context to improve translation accuracy over time."
      },
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <MdGroup className="w-8 h-8" />,
      title: {
        th: "ทำงานร่วมกันเป็นทีม",
        en: "Team Collaboration"
      },
      description: {
        th: "เหมาะสำหรับการแชทกลุ่มและการสื่อสารในทีมแบบไทย-อังกฤษ",
        en: "Perfect for Thai-English group chats and team communication."
      },
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  const headerText = {
    title: {
      th: "คุณสมบัติเด่น",
      en: "Key Features"
    },
    description: {
      th: "การแปลภาษาไทย-อังกฤษยุคใหม่ ด้วยเทคโนโลยี AI ขั้นสูง",
      en: "Next-generation Thai-English translation powered by advanced AI technology."
    }
  };

  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            {headerText.title[language as keyof typeof headerText.title]}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {headerText.description[language as keyof typeof headerText.description]}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard feature={feature} language={language} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, language }: { feature: Feature; language: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -5 }}
      transition={{ duration: 0.2 }}
      className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group"
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity rounded-xl bg-gradient-to-r ${feature.gradient}`} />
      
      <div className="relative space-y-4">
        <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${feature.gradient} bg-opacity-10 text-white group-hover:scale-110 transform transition-all duration-300`}>
          {feature.icon}
        </div>

        <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
          {feature.title[language as keyof typeof feature.title]}
        </h3>

        <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
          {feature.description[language as keyof typeof feature.description]}
        </p>
      </div>
    </motion.div>
  );
}