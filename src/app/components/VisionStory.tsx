// components/VisionStory.tsx
'use client';

import { motion } from 'framer-motion';
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

export default function VisionStory() {
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
            Empowering Thai Business <br />Through AI Innovation
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg">
            เราเชื่อว่าเทคโนโลยี AI จะช่วยลดข้อจำกัดด้านภาษา และเปิดโอกาสให้ธุรกิจไทยเติบโตในตลาดโลก
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
              <h3 className="text-2xl font-bold text-white mb-3">AI ที่เข้าใจบริบทไทย</h3>
              <p className="text-slate-400 text-base leading-relaxed">
                เราพัฒนา LLM ที่เข้าใจบริบททางภาษาและวัฒนธรรมไทยอย่างลึกซึ้ง
                ด้วยการ Fine-tuning และ Contextual Embeddings เฉพาะทาง
                ทำให้การแปลภาษาเป็นธรรมชาติและตรงกับความต้องการทางธุรกิจ
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
              <h3 className="text-2xl font-bold text-white mb-3">Data-Driven Growth</h3>
              <p className="text-slate-400 text-base leading-relaxed">
                ข้อมูลคือกุญแจสู่การเติบโต เราช่วยธุรกิจไทยใช้ประโยชน์จากข้อมูลการสื่อสารข้ามภาษา
                วิเคราะห์เทรนด์ พฤติกรรมลูกค้า และโอกาสทางธุรกิจใหม่ๆ ในตลาดต่างประเทศ
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
              <h3 className="text-2xl font-bold text-white mb-3">เติบโตไปด้วยกัน</h3>
              <p className="text-slate-400 text-base leading-relaxed">
                เราตั้งเป้าที่จะช่วยธุรกิจไทยกว่า 10,000 รายเข้าถึงตลาดต่างประเทศภายในปี 2025
                สร้างมูลค่าการส่งออกเพิ่มขึ้น และพัฒนาขีดความสามารถในการแข่งขันของประเทศ
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-slate-400 text-sm">เป้าหมายธุรกิจที่เข้าร่วม 10,000 ราย</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-slate-400 text-sm">มูลค่าการส่งออกเพิ่มขึ้น 1,500 ล้านบาท</span>
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
              <h3 className="text-2xl font-bold text-white mb-6">Technology Stack</h3>
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
                พร้อมเติบโตไปกับเรา?
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
                  เริ่มต้นใช้งาน
                </button>
                <button className="px-6 py-2.5 border border-blue-400/30 hover:border-blue-400/60 text-blue-300 rounded-lg font-medium transition-all">
                  ปรึกษาผู้เชี่ยวชาญ
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}