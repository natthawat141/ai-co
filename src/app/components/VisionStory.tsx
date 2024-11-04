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
import  NeuralBackground  from './NeuralBackground';

export default function VisionStory() {
  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8"> {/* เพิ่มความกว้างสูงสุด */}
        {/* Hero Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Empowering Thai Business <br />Through AI Innovation
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-xl">
            เราเชื่อว่าเทคโนโลยี AI จะช่วยลดข้อจำกัดด้านภาษา และเปิดโอกาสให้ธุรกิจไทยเติบโตในตลาดโลก
          </p>
        </motion.div>

        {/* Story Sections */}
        <div className="space-y-40">
          {/* Section 1: AI Vision */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-start gap-12"
          >
            <div className="flex-1 lg:sticky lg:top-24 lg:pt-8"> {/* ทำให้ text ติดขอบเมื่อเลื่อน */}
              <MdPsychology className="w-16 h-16 text-blue-500 mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">AI ที่เข้าใจบริบทไทย</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                เราพัฒนา LLM ที่เข้าใจบริบททางภาษาและวัฒนธรรมไทยอย่างลึกซึ้ง
                ด้วยการ Fine-tuning และ Contextual Embeddings เฉพาะทาง
                ทำให้การแปลภาษาเป็นธรรมชาติและตรงกับความต้องการทางธุรกิจ
              </p>
            </div>
            <div className="flex-1 w-full lg:min-h-[600px]"> {/* ปรับความสูงของ container */}
              <div className="sticky top-24"> {/* ทำให้ code editor ติดขอบเมื่อเลื่อน */}
                <AICodeSnippet />
              </div>
            </div>
          </motion.div>

          {/* Section 2: Data Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row-reverse items-start gap-12"
          >
            <div className="flex-1 lg:sticky lg:top-24 lg:pt-8">
              <MdDataExploration className="w-16 h-16 text-purple-500 mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Data-Driven Growth</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                ข้อมูลคือกุญแจสู่การเติบโต เราช่วยธุรกิจไทยใช้ประโยชน์จากข้อมูลการสื่อสารข้ามภาษา
                วิเคราะห์เทรนด์ พฤติกรรมลูกค้า และโอกาสทางธุรกิจใหม่ๆ ในตลาดต่างประเทศ
              </p>
            </div>
            <div className="flex-1">
              <DataVisualization />
            </div>
          </motion.div>

          {/* Section 3: Business Impact */}
          {/* Section 3: Business Impact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-start gap-12"
          >
            <div className="flex-1 lg:sticky lg:top-24 lg:pt-8">
              <MdBusiness className="w-16 h-16 text-green-500 mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">เติบโตไปด้วยกัน</h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                เราตั้งเป้าที่จะช่วยธุรกิจไทยกว่า 10,000 รายเข้าถึงตลาดต่างประเทศภายในปี 2025
                สร้างมูลค่าการส่งออกเพิ่มขึ้น และพัฒนาขีดความสามารถในการแข่งขันของประเทศ
              </p>
              {/* เพิ่ม Key Metrics */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-slate-400">เป้าหมายธุรกิจที่เข้าร่วม 10,000 ราย</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-slate-400">มูลค่าการส่งออกเพิ่มขึ้น 1,500 ล้านบาท</span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full lg:max-w-xl xl:max-w-2xl">
              <div className="sticky top-24">
                <GrowthVisualization />
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center pt-20"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              พร้อมเติบโตไปกับเรา?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
                เริ่มต้นใช้งาน
              </button>
              <button className="px-8 py-3 border border-blue-400/30 hover:border-blue-400/60 text-blue-300 rounded-lg font-medium transition-all">
                ปรึกษาผู้เชี่ยวชาญ
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}