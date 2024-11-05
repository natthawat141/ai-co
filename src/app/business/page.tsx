// pages/business-model.tsx
'use client';

import { motion } from 'framer-motion';
import {
    MdPeople, MdStars, MdPhone, MdFavorite, MdAttachMoney,
    MdDiamond, MdSettings, MdHandshake, MdAccountBalance
} from 'react-icons/md';
import Mission from '../components/Mission';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Section {
    title: string;
    content: string[];
    color: string;
    icon: JSX.Element;
}

export default function BusinessModel() {
    const sections: Section[] = [
        {
            title: "กลุ่มลูกค้า",
            content: [
                "B2C: ฟรีแลนซ์, คนทำงานระยะไกล, นักท่องเที่ยว",
                "B2B: แพลตฟอร์มอีคอมเมิร์ซ, บริษัทข้ามชาติ",
                "ผู้ใช้ทั่วไปที่ต้องการสื่อสารข้ามภาษา",
                "บริษัทที่มีทีมงานหลากหลายภาษา"
            ],
            color: "from-blue-500 to-blue-600",
            icon: <MdPeople className="w-6 h-6" />
        },
        {
            title: "คุณค่าที่นำเสนอ",
            content: [
                "การสื่อสารข้ามภาษาแบบเรียลไทม์",
                "การแปลที่เข้าใจบริบทและเป็นธรรมชาติ",
                "การเสริมสร้างการทำงานร่วมกัน",
                "การแสดงข้อความต้นฉบับและข้อความแปล"
            ],
            color: "from-purple-500 to-purple-600",
            icon: <MdStars className="w-6 h-6" />
        },
        {
            title: "ช่องทางการเข้าถึง",
            content: [
                "เว็บไซต์และแอปพลิเคชันบนมือถือ",
                "การเชื่อมต่อ API สำหรับธุรกิจ",
                "การร่วมมือกับแพลตฟอร์มอื่น",
                "ช่องทางการขายตรงสำหรับองค์กร"
            ],
            color: "from-green-500 to-green-600",
            icon: <MdPhone className="w-6 h-6" />
        },
        {
            title: "ความสัมพันธ์กับลูกค้า",
            content: [
                "การนำทางอัตโนมัติในแอป",
                "โมเดล Freemium",
                "การสนับสนุนลูกค้า 24/7",
                "ฐานข้อมูลความช่วยเหลือออนไลน์"
            ],
            color: "from-pink-500 to-pink-600",
            icon: <MdFavorite className="w-6 h-6" />
        },
        {
            title: "แหล่งรายได้",
            content: [
                "การสมัครสมาชิกรายเดือน/รายปี",
                "ค่าธรรมเนียมการใช้งาน API",
                "การซื้อฟีเจอร์เพิ่มเติมในแอป",
                "แพ็กเกจสำหรับองค์กร"
            ],
            color: "from-yellow-500 to-yellow-600",
            icon: <MdAttachMoney className="w-6 h-6" />
        },
        {
            title: "ทรัพยากรหลัก",
            content: [
                "โมเดล AI และ NLP ขั้นสูง",
                "โครงสร้างพื้นฐานคลาวด์",
                "ข้อมูลสำหรับฝึกฝนโมเดล",
                "ทีมพัฒนาและสนับสนุน"
            ],
            color: "from-indigo-500 to-indigo-600",
            icon: <MdDiamond className="w-6 h-6" />
        },
        {
            title: "กิจกรรมหลัก",
            content: [
                "การพัฒนาและปรับปรุงโมเดล AI",
                "การดูแลรักษาแพลตฟอร์ม",
                "การวิจัยและพัฒนาผลิตภัณฑ์",
                "การสร้างพันธมิตรทางธุรกิจ"
            ],
            color: "from-red-500 to-red-600",
            icon: <MdSettings className="w-6 h-6" />
        },
        {
            title: "พันธมิตรหลัก",
            content: [
                "ผู้ให้บริการคลาวด์",
                "ผู้ให้บริการข้อมูลภาษา",
                "แพลตฟอร์มอีคอมเมิร์ซ",
                "ผู้ให้บริการโมเดล AI"
            ],
            color: "from-teal-500 to-teal-600",
            icon: <MdHandshake className="w-6 h-6" />
        },
        {
            title: "โครงสร้างต้นทุน",
            content: [
                "การวิจัยและพัฒนา AI",
                "ค่าใช้จ่ายโครงสร้างพื้นฐาน",
                "การตลาดและการขาย",
                "เงินเดือนพนักงานและการดำเนินงาน"
            ],
            color: "from-orange-500 to-orange-600",
            icon: <MdAccountBalance className="w-6 h-6" />
        }
    ];

    return (
        <div className="relative min-h-screen bg-slate-900 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-pink-500/10" />
    
            {/* Floating Orbs */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl"
                    animate={{
                        x: [Math.random() * 100, Math.random() * -100],
                        y: [Math.random() * 100, Math.random() * -100],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                />
            ))}
    
            {/* Main Content */}
            <div className="relative z-10">
                <Navbar />
    
                {/* Mission Section with Parallax */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Mission />
                </motion.div>
    
                {/* Business Model Content */}
                <div className="max-w-7xl mx-auto px-4 py-20">
                    {/* Enhanced Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text 
                           animate-gradient-x relative inline-block">
                            โมเดลธุรกิจ AI Copilot Transaction
                            <motion.span
                                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            ระบบแชทอัจฉริยะที่ช่วยแปลภาษาแบบเรียลไทม์ด้วย AI ที่เข้าใจบริบท
                        </p>
                    </motion.div>
    
                    {/* Enhanced Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sections.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, translateY: -5 }}
                                className="bg-slate-800/80 backdrop-blur-sm rounded-xl overflow-hidden 
                            hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300
                            border border-slate-700/50 hover:border-blue-500/50"
                            >
                                <div className={`bg-gradient-to-r ${section.color} p-6 flex items-center space-x-4`}>
                                    <div className="p-3 bg-white/10 rounded-lg transform transition-transform group-hover:scale-110">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-xl font-bold text-white">
                                        {section.title}
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    {section.content.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 + i * 0.1 }}
                                            className="flex items-start space-x-3"
                                        >
                                            <span className="text-blue-400 mt-1">•</span>
                                            <p className="text-slate-300 leading-relaxed">{item}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
    
                    {/* Enhanced AI Technology Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16 bg-slate-800/80 backdrop-blur-sm rounded-xl p-8
                border border-slate-700/50 hover:border-blue-500/50
                transition-all duration-300"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-4">
                            <div className="p-3 bg-blue-500/20 rounded-lg">
                                <MdSettings className="w-7 h-7 text-blue-400" />
                            </div>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                เทคโนโลยี AI ที่ใช้
                            </span>
                        </h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-slate-300 leading-relaxed">
                                AI Copilot Transaction ใช้การแปลแบบเข้าใจบริบทของบทความเพื่อให้แปลได้อย่างมีประสิทธิภาพและเป็นธรรมชาติ
                                ซึ่งต่างจาก NLP แบบดั้งเดิมที่มักจะทำงานกับคำหรือประโยคแต่ละประโยคโดยแยกจากกัน
                            </p>
    
                            {/* Technology Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                {/* Core Technologies */}
                                <div className="bg-slate-700/50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                                        <MdDiamond className="w-5 h-5 text-blue-400" />
                                        <span>เทคโนโลยีหลัก</span>
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span className="text-slate-300">Large Language Models (LLM) สำหรับการประมวลผลภาษาขั้นสูง</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span className="text-slate-300">Fine-tuning เฉพาะสำหรับคู่ภาษาไทย-อังกฤษ</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span className="text-slate-300">Contextual Embeddings เพื่อการเข้าใจบริบทที่ลึกซึ้ง</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span className="text-slate-300">Real-time Processing สำหรับการแปลแบบทันที</span>
                                        </li>
                                    </ul>
                                </div>
    
                                {/* Advanced Features */}
                                <div className="bg-slate-700/50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                                        <MdStars className="w-5 h-5 text-purple-400" />
                                        <span>คุณสมบัติขั้นสูง</span>
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start space-x-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span className="text-slate-300">การเรียนรู้จากการใช้งานจริงเพื่อปรับปรุงความแม่นยำ</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span className="text-slate-300">ระบบจดจำบริบทการสนทนาอัตโนมัติ</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span className="text-slate-300">การปรับแต่งสไตล์การแปลตามความต้องการ</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span className="text-slate-300">ระบบตรวจสอบและแก้ไขความถูกต้องอัตโนมัติ</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
    
                    {/* Enhanced MVP Note */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30
                rounded-xl p-8 border border-blue-500/30 hover:border-blue-400/50
                transition-all duration-300 backdrop-blur-sm"
                    >
                        <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center space-x-3">
                            <MdStars className="w-6 h-6" />
                            <span>แผนการพัฒนา MVP</span>
                        </h3>
    
                        {/* Development Phases */}
                        <div className="space-y-6">
                            <p className="text-slate-300 leading-relaxed">
                                ในรุ่น MVP จะใช้ SLM NLP หรือ NLP ที่ใช้ Model Deep Learning ตามความเหมาะสมของงบประมาณ
                                ก่อนที่จะพัฒนาต่อยอดเป็น LLM ที่มี Fine-tuning และ Contextual Embeddings ในอนาคต
                            </p>
    
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Phase 1 */}
                                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/20">
                                    <h4 className="text-blue-400 font-medium mb-2">เฟสที่ 1: MVP Launch</h4>
                                    <ul className="space-y-2 text-slate-300">
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span>พัฒนาระบบแปลภาษาพื้นฐานด้วย Deep Learning</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span>รองรับการแปลไทย-อังกฤษแบบพื้นฐาน</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-blue-400 mt-1">•</span>
                                            <span>ทดสอบกับกลุ่มผู้ใช้จำกัด</span>
                                        </li>
                                    </ul>
                                </div>
    
                                {/* Phase 2 */}
                                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                                    <h4 className="text-purple-400 font-medium mb-2">เฟสที่ 2: Advanced Features</h4>
                                    <ul className="space-y-2 text-slate-300">
                                        <li className="flex items-start space-x-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>อัพเกรดเป็น LLM ที่ผ่านการ Fine-tuning</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>เพิ่มความสามารถในการเข้าใจบริบท</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-purple-400 mt-1">•</span>
                                            <span>เพิ่มฟีเจอร์ขั้นสูงสำหรับองค์กร</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                 {/* Enhanced Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mt-20"
        >
          <div className="border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm">
            <div className="bg-gradient-to-b from-slate-900/50 to-slate-950">
              <Footer />
            </div>
          </div>
        </motion.div>
            </div>
        </div>
    );
}    