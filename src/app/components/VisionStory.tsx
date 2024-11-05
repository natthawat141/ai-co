// components/VisionStory.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  MdPsychology,
  MdDataExploration,
  MdBusiness
} from 'react-icons/md';
import { AICodeSnippet } from './CodeSnippet';
import { DataVisualization } from './DataVisualization';
import { GrowthVisualization } from './GrowthVisualization';
import NeuralBackground from './NeuralBackground';
import { TechStack } from './TechStack';

interface TextContent {
  hero: {
    title: { th: string; en: string; };
    description: { th: string; en: string; };
  };
  sections: {
    ai: {
      title: { th: string; en: string; };
      description: { th: string; en: string; };
    };
    data: {
      title: { th: string; en: string; };
      description: { th: string; en: string; };
    };
    business: {
      title: { th: string; en: string; };
      description: { th: string; en: string; };
      stats: {
        businesses: { th: string; en: string; };
        exports: { th: string; en: string; };
      };
    };
    tech: {
      title: { th: string; en: string; };
    };
    cta: {
      title: { th: string; en: string; };
      buttons: {
        start: { th: string; en: string; };
        consult: { th: string; en: string; };
      };
    };
  };
}

export default function VisionStory() {
  const [language, setLanguage] = useState('th');

  useEffect(() => {
    // โหลดค่าภาษาเริ่มต้น
    const storedLanguage = localStorage.getItem('language') || 'th';
    setLanguage(storedLanguage);

    // ติดตามการเปลี่ยนแปลงภาษา
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'th');
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const content: TextContent = {
    hero: {
      title: {
        th: "เสริมพลังธุรกิจไทย\nด้วยนวัตกรรม AI",
        en: "Empowering Thai Business\nThrough AI Innovation"
      },
      description: {
        th: "เราเชื่อว่าเทคโนโลยี AI จะช่วยลดข้อจำกัดด้านภาษา และเปิดโอกาสให้ธุรกิจไทยเติบโตในตลาดโลก",
        en: "We believe AI technology will break language barriers and enable Thai businesses to thrive in the global market"
      }
    },
    sections: {
      ai: {
        title: {
          th: "AI ที่เข้าใจบริบทไทย",
          en: "AI with Thai Context Understanding"
        },
        description: {
          th: "เราพัฒนา LLM ที่เข้าใจบริบททางภาษาและวัฒนธรรมไทยอย่างลึกซึ้ง ด้วยการ Fine-tuning และ Contextual Embeddings เฉพาะทาง ทำให้การแปลภาษาเป็นธรรมชาติและตรงกับความต้องการทางธุรกิจ",
          en: "We develop LLMs that deeply understand Thai language context and culture through specialized Fine-tuning and Contextual Embeddings, making translations natural and business-oriented"
        }
      },
      data: {
        title: {
          th: "การเติบโตด้วยข้อมูล",
          en: "Data-Driven Growth"
        },
        description: {
          th: "ข้อมูลคือกุญแจสู่การเติบโต เราช่วยธุรกิจไทยใช้ประโยชน์จากข้อมูลการสื่อสารข้ามภาษา วิเคราะห์เทรนด์ พฤติกรรมลูกค้า และโอกาสทางธุรกิจใหม่ๆ ในตลาดต่างประเทศ",
          en: "Data is key to growth. We help Thai businesses leverage cross-language communication data, analyzing trends, customer behavior, and new business opportunities in international markets"
        }
      },
      business: {
        title: {
          th: "เติบโตไปด้วยกัน",
          en: "Growing Together"
        },
        description: {
          th: "เราตั้งเป้าที่จะช่วยธุรกิจไทยกว่า 10,000 รายเข้าถึงตลาดต่างประเทศภายในปี 2025 สร้างมูลค่าการส่งออกเพิ่มขึ้น และพัฒนาขีดความสามารถในการแข่งขันของประเทศ",
          en: "Our goal is to help 10,000 Thai businesses reach international markets by 2025, increasing export value and enhancing national competitiveness"
        },
        stats: {
          businesses: {
            th: "เป้าหมายธุรกิจที่เข้าร่วม 10,000 ราย",
            en: "Target: 10,000 participating businesses"
          },
          exports: {
            th: "มูลค่าการส่งออกเพิ่มขึ้น 1,500 ล้านบาท",
            en: "Export value increase: 1,500 million baht"
          }
        }
      },
      tech: {
        title: {
          th: "เทคโนโลยีที่ใช้",
          en: "Technology Stack"
        }
      },
      cta: {
        title: {
          th: "พร้อมเติบโตไปกับเรา?",
          en: "Ready to Grow with Us?"
        },
        buttons: {
          start: {
            th: "เริ่มต้นใช้งาน",
            en: "Get Started"
          },
          consult: {
            th: "ปรึกษาผู้เชี่ยวชาญ",
            en: "Consult an Expert"
          }
        }
      }
    }
  };

  return (
    <section className="py-16 bg-slate-900 relative overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            {content.hero.title[language as keyof typeof content.hero.title]}
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg">
            {content.hero.description[language as keyof typeof content.hero.description]}
          </p>
        </motion.div>

        {/* Story Sections */}
        <div className="space-y-24">
          {/* Section 1: AI Vision */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-start gap-8 relative"
          >
            <div className="flex-1 lg:sticky lg:top-20 max-w-[500px]">
              <MdPsychology className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">
                {content.sections.ai.title[language as keyof typeof content.sections.ai.title]}
              </h3>
              <p className="text-slate-400 text-base leading-relaxed">
                {content.sections.ai.description[language as keyof typeof content.sections.ai.description]}
              </p>
            </div>
            <div className="flex-1 w-full">
              <AICodeSnippet />
            </div>
          </motion.div>

          {/* Section 2: Data Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row-reverse items-start gap-8"
          >
            <div className="flex-1 lg:sticky lg:top-20">
              <MdDataExploration className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">
                {content.sections.data.title[language as keyof typeof content.sections.data.title]}
              </h3>
              <p className="text-slate-400 text-base leading-relaxed">
                {content.sections.data.description[language as keyof typeof content.sections.data.description]}
              </p>
            </div>
            <div className="flex-1">
              <DataVisualization />
            </div>
          </motion.div>

          {/* Section 3: Business Impact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-start gap-8"
          >
            <div className="flex-1 lg:sticky lg:top-20">
              <MdBusiness className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">
                {content.sections.business.title[language as keyof typeof content.sections.business.title]}
              </h3>
              <p className="text-slate-400 text-base leading-relaxed">
                {content.sections.business.description[language as keyof typeof content.sections.business.description]}
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-slate-400 text-sm">
                    {content.sections.business.stats.businesses[language as keyof typeof content.sections.business.stats.businesses]}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-slate-400 text-sm">
                    {content.sections.business.stats.exports[language as keyof typeof content.sections.business.stats.exports]}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full lg:max-w-xl xl:max-w-2xl">
              <GrowthVisualization />
            </div>
          </motion.div>

          {/* Tech Stack & CTA sections */}
          <div className="space-y-16">
            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                {content.sections.tech.title[language as keyof typeof content.sections.tech.title]}
              </h3>
              <div className="w-full max-w-3xl">
                <TechStack />
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                {content.sections.cta.title[language as keyof typeof content.sections.cta.title]}
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
                  {content.sections.cta.buttons.start[language as keyof typeof content.sections.cta.buttons.start]}
                </button>
                <button className="px-6 py-2.5 border border-blue-400/30 hover:border-blue-400/60 text-blue-300 rounded-lg font-medium transition-all">
                  {content.sections.cta.buttons.consult[language as keyof typeof content.sections.cta.buttons.consult]}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}