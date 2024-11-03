// components/Features.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  MdTranslate, 
  MdPsychology,
  MdChat,
  MdPublic,
  MdMemory,
  MdSecurity,
  MdSpeed,
  MdAutoMode,
  MdGroup
} from 'react-icons/md';
import { 
  SiOpenai, 
  SiTensorflow 
} from 'react-icons/si';
import { BiNetworkChart } from 'react-icons/bi';

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  gradient: string;
}

export default function Features() {
  const features: Feature[] = [
    {
      icon: <MdTranslate className="w-8 h-8" />,
      title: "Real-time Translation",
      description: "Instant translation across multiple languages with high accuracy and natural flow.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <MdPsychology className="w-8 h-8" />,
      title: "Context-Aware AI",
      description: "Advanced neural networks understand context and nuances for more accurate translations.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <MdChat className="w-8 h-8" />,
      title: "Dual Message Display",
      description: "See both original and translated messages side by side for better understanding.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <MdPublic className="w-8 h-8" />,
      title: "Global Communication",
      description: "Connect with people worldwide without language barriers.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <BiNetworkChart className="w-8 h-8" />,
      title: "Deep Learning Model",
      description: "Powered by state-of-the-art deep neural networks for superior translation quality.",
      gradient: "from-blue-500 to-violet-500"
    },
    {
      icon: <MdSecurity className="w-8 h-8" />,
      title: "Secure Conversations",
      description: "End-to-end encryption ensures your conversations remain private and secure.",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: <MdSpeed className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized performance for instantaneous translations without delay.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <SiOpenai className="w-8 h-8" />,
      title: "AI-Powered",
      description: "Leveraging cutting-edge AI models for superior translation accuracy.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <MdGroup className="w-8 h-8" />,
      title: "Multi-User Support",
      description: "Perfect for group chats and team collaboration across languages.",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

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
            Powerful Features
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Experience the next generation of AI-powered translation with our cutting-edge features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -5 }}
      transition={{ duration: 0.2 }}
      className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group"
    >
      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity rounded-xl bg-gradient-to-r ${feature.gradient}`} />
      
      <div className="relative space-y-4">
        {/* Icon with gradient background */}
        <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${feature.gradient} bg-opacity-10 text-white group-hover:scale-110 transform transition-all duration-300`}>
          {feature.icon}
        </div>

        <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
          {feature.title}
        </h3>

        <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
          {feature.description}
        </p>

        <motion.div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors">
            <span>Learn more</span>
            <MdAutoMode className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}