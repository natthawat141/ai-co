"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (menuOpen && !target.closest('nav')) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [menuOpen]);

    const handleToggleMenu = () => setMenuOpen(!menuOpen);

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Try chat', href: '/chat/translate' },
        { name: 'Try AI translation', href: '/chat/' },
    ];

    const menuVariants = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
                ${scrolled
                ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg'
                : 'bg-transparent'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/">
                        <motion.h1 
                            whileHover={{ scale: 1.05 }}
                            className="font-bold text-xl md:text-2xl text-white
                                     drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]
                                     transition-all duration-300"
                        >
                            Next Gen
                        </motion.h1>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -2 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link
                                    href={item.href}
                                    className="relative text-gray-300 hover:text-white transition-colors duration-300 
                                             px-3 py-2 rounded-lg hover:bg-white/10"
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="md:hidden w-10 h-10 flex items-center justify-center 
                                 text-gray-300 hover:text-white rounded-lg hover:bg-white/10
                                 transition-colors duration-200"
                        onClick={handleToggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={menuOpen
                                    ? "M6 18L18 6M6 6l12 12"
                                    : "M4 6h16M4 12h16M4 18h16"
                                }
                            />
                        </svg>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            variants={menuVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden"
                        >
                            <motion.div 
                                className="px-4 py-3 mt-2 bg-gray-800/90 backdrop-blur-lg rounded-lg
                                          border border-gray-700/50 shadow-xl"
                            >
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="py-1"
                                    >
                                        <Link
                                            href={item.href}
                                            className="block text-gray-300 w-full px-3 py-2 rounded-lg
                                                     hover:bg-white/10 hover:text-white
                                                     transition-all duration-200"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;