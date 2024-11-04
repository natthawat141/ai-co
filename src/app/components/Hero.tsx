// src/components/Hero.tsx
'use client'

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import NeuralBackground from './NeuralBackground';

export default function Hero() {
    const [isMounted, setIsMounted] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

    // Placeholder content during SSR
    if (!isMounted) {
        return (
            <div className="relative min-h-screen bg-[#0A0A14]">
                {/* Static content */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-indigo-950" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Neural Background with parallax effect */}
            <motion.div
                className="absolute inset-0"
                style={{ y, opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <NeuralBackground />
            </motion.div>

            {/* Gradient Overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-slate-900/80"
                style={{ opacity }}
            />

            {/* Content */}
            <motion.div
                style={{ scale }}
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 flex items-center min-h-screen"
            >
                <div className="text-center w-full space-y-8">
                    {/* Main Heading */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight relative">
                            <span className="block mb-2">
                                <span className="inline-block bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 
                                    text-transparent bg-clip-text 
                                    [text-shadow:_0_0_30px_rgb(59_130_246_/_50%)]">
                                    AI Translation
                                </span>
                            </span>

                            <motion.span
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.7 }}
                                className="block"
                            >
                                <span className="inline-block text-white/90 text-3xl md:text-5xl font-light
                                    [text-shadow:_0_0_15px_rgb(255_255_255_/_40%)]">
                                    Powered by Typhoon{' '}
                                </span>
                                <span className="inline-block text-transparent bg-clip-text
                                    bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500
                                    text-3xl md:text-5xl font-bold
                                    [text-shadow:_0_0_20px_rgb(99_102_241_/_50%)]">
                                    SCB 10X
                                </span>
                            </motion.span>
                        </h1>
                    </motion.div>

                    <motion.span
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        className="block mt-2"
                    >
                        <span className="inline-block text-white/70 text-xl md:text-2xl font-light
        [text-shadow:_0_0_15px_rgb(255_255_255_/_30%)]">
                            Empowered by Seeder Development
                        </span>
                    </motion.span>
                    {/* Buttons */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.7 }}
                        className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg 
                                font-medium transition-all shadow-lg shadow-indigo-500/30 
                                hover:shadow-indigo-500/50 backdrop-blur-sm"
                        >
                            Get Started
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 border border-indigo-400/30 hover:border-indigo-400/60 
                                text-indigo-300 rounded-lg font-medium transition-all
                                backdrop-blur-sm hover:bg-indigo-500/10"
                        >
                            Learn More
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
    );
}