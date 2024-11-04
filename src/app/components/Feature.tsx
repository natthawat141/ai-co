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
 MdGroup
} from 'react-icons/md';
import { SiOpenai } from 'react-icons/si';

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
     title: "Instant Thai-English Translation",
     description: "Real-time translation between Thai and English with high accuracy and natural flow.",
     gradient: "from-blue-500 to-cyan-500"
   },
   {
     icon: <MdPsychology className="w-8 h-8" />,
     title: "Contextual Understanding",
     description: "Smart AI that understands Thai-English context and cultural nuances.",
     gradient: "from-purple-500 to-pink-500"
   },
   {
     icon: <MdChat className="w-8 h-8" />,
     title: "Bilingual Display",
     description: "View messages in both Thai and English simultaneously for easy comparison.",
     gradient: "from-green-500 to-emerald-500"
   },
   {
     icon: <MdPublic className="w-8 h-8" />,
     title: "Thai-English Bridge",
     description: "Breaking language barriers between Thai and English speakers.",
     gradient: "from-orange-500 to-red-500"
   },
   {
     icon: <SiOpenai className="w-8 h-8" />,
     title: "Advanced AI Model",
     description: "Powered by cutting-edge language models specialized for Thai-English translation.",
     gradient: "from-blue-500 to-violet-500"
   },
   {
     icon: <MdSecurity className="w-8 h-8" />,
     title: "Private & Secure",
     description: "Your conversations are protected with enterprise-grade security.",
     gradient: "from-teal-500 to-green-500"
   },
   {
     icon: <MdSpeed className="w-8 h-8" />,
     title: "Fast Performance",
     description: "Quick translation response time for seamless conversations.",
     gradient: "from-yellow-500 to-orange-500"
   },
   {
     icon: <MdMemory className="w-8 h-8" />,
     title: "Smart Memory",
     description: "Learns from context to improve translation accuracy over time.",
     gradient: "from-indigo-500 to-purple-500"
   },
   {
     icon: <MdGroup className="w-8 h-8" />,
     title: "Team Collaboration",
     description: "Perfect for Thai-English group chats and team communication.",
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
           Key Features
         </h2>
         <p className="text-slate-400 max-w-2xl mx-auto">
           Next-generation Thai-English translation powered by advanced AI technology.
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
     </div>
   </motion.div>
 );
}