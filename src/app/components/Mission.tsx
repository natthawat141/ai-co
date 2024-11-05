// components/Mission.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  MdTrendingUp, 
  MdShowChart, 
  MdTimeline,
  MdLanguage,
  MdPeople,
  MdInsights
} from 'react-icons/md';

export default function Mission() {
  return (
    <section className="relative bg-slate-900 py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text leading-tight">
            สร้างอนาคตการค้าไทย<br />ด้วยพลัง AI
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
            เราเชื่อในศักยภาพของผู้ประกอบการไทย และมุ่งมั่นที่จะใช้เทคโนโลยี AI 
            เพื่อลดช่องว่างทางการแข่งขันในตลาดโลก
          </p>
        </motion.div>

        {/* Key Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<MdTrendingUp className="w-8 h-8" />}
            title="โอกาสใหม่จาก AI"
            description="ใช้ AI เพื่อวิเคราะห์ตลาด เข้าใจพฤติกรรมผู้บริโภค และสร้างโอกาสทางการค้าใหม่ๆ ในตลาดโลก"
            color="from-blue-500 to-cyan-500"
            delay={0.2}
          />
          <FeatureCard
            icon={<MdShowChart className="w-8 h-8" />}
            title="Data-Driven Growth"
            description="ใช้ข้อมูลเชิงลึกเพื่อการตัดสินใจ พัฒนากลยุทธ์ และสร้างความได้เปรียบในการแข่งขัน"
            color="from-purple-500 to-pink-500"
            delay={0.4}
          />
          <FeatureCard
            icon={<MdTimeline className="w-8 h-8" />}
            title="AI Transformation"
            description="ปฏิวัติธุรกิจด้วย AI ตั้งแต่การวิเคราะห์ตลาด การบริการลูกค้า ไปจนถึงการบริหารห่วงโซ่อุปทาน"
            color="from-orange-500 to-red-500"
            delay={0.6}
          />
        </div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-slate-800/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-slate-700"
        >
          <h2 className="text-3xl font-bold text-white mb-8">วิสัยทัศน์สู่อนาคต</h2>
          
          <div className="space-y-8">
            <VisionPoint
              icon={<MdLanguage className="w-6 h-6" />}
              title="ขยายโอกาสทางการค้าระดับโลก"
              description="ลดอุปสรรคด้านภาษาและวัฒนธรรม เปิดประตูสู่ตลาดใหม่ๆ ทั่วโลก"
            />
            <VisionPoint
              icon={<MdPeople className="w-6 h-6" />}
              title="สนับสนุนผู้ประกอบการทุกระดับ"
              description="มอบเครื่องมือและความรู้ที่จำเป็น ให้ธุรกิจทุกขนาดสามารถแข่งขันได้ในตลาดโลก"
            />
            <VisionPoint
              icon={<MdInsights className="w-6 h-6" />}
              title="พัฒนาสู่ Data Provider"
              description="สร้างระบบนิเวศข้อมูลที่จะช่วยให้ธุรกิจไทยเข้าใจตลาดและผู้บริโภคได้ดียิ่งขึ้น"
            />
          </div>
        </motion.div>

        {/* Future Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">แนวโน้มอนาคต</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrendCard
              title="AI-Powered Analytics"
              description="การวิเคราะห์ข้อมูลขั้นสูงด้วย AI จะช่วยให้ธุรกิจเข้าใจตลาดและผู้บริโภคได้ลึกซึ้งยิ่งขึ้น"
            />
            <TrendCard
              title="Personalized Commerce"
              description="การใช้ AI ในการสร้างประสบการณ์การซื้อขายที่เป็นส่วนตัวมากขึ้น"
            />
            <TrendCard
              title="Cross-Border Integration"
              description="การเชื่อมโยงระบบการค้าข้ามพรมแดนที่ไร้รอยต่อด้วยเทคโนโลยี AI"
            />
            <TrendCard
              title="Data-as-a-Service"
              description="การให้บริการข้อมูลเชิงลึกที่จะช่วยให้ธุรกิจตัดสินใจได้อย่างแม่นยำ"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
  delay: number;
}

function FeatureCard({ icon, title, description, color, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
    >
      <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${color} mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </motion.div>
  );
}

interface VisionPointProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

function VisionPoint({ icon, title, description }: VisionPointProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function TrendCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}