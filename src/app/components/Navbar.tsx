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

    const handleToggleMenu = () => setMenuOpen(!menuOpen);

    const navItems = [
        { name: 'Docs', href: '/' },
        { name: 'try Ai translation', href: '/' },

    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
                ${scrolled
                ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg'
                : 'bg-transparent'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/">
                        <h1 className="font-bold text-xl md:text-2xl text-white
              drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]
              hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]
              transition-all duration-300">
                            Next Gen
                        </h1>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="relative text-gray-300 hover:text-white transition-colors duration-300 px-2 py-1
                         before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px]
                         before:bg-gradient-to-r before:from-blue-400 before:to-purple-400
                         before:transform before:scale-x-0 before:origin-right before:transition-transform
                         hover:before:scale-x-100 hover:before:origin-left"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden w-10 h-10 flex items-center justify-center text-gray-300"
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
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-md"
                        >
                            <div className="px-4 py-6 space-y-4">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="relative block text-gray-300 w-fit
                               hover:text-white transition-colors duration-300 px-2 py-1
                               before:content-[''] before:absolute before:bottom-0 before:left-0 
                               before:w-full before:h-[2px]
                               before:bg-gradient-to-r before:from-blue-400 before:to-purple-400
                               before:transform before:scale-x-0 before:origin-right 
                               before:transition-transform
                               hover:before:scale-x-100 hover:before:origin-left"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;