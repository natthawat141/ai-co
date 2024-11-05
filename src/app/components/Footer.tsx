// src/components/Footer.tsx
'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
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

    const content = {
        brand: {
            name: {
                th: "AI Translator",
                en: "AI Translator"
            },
            description: {
                th: "ทลายกำแพงภาษาด้วยการแปลแบบเรียลไทม์ด้วย AI",
                en: "Breaking language barriers with AI-powered real-time translation."
            }
        },
        sections: {
            product: {
                title: { th: "ผลิตภัณฑ์", en: "Product" },
                items: [
                    { th: "คุณสมบัติ", en: "Features" },
                    { th: "ราคา", en: "Pricing" },
                    { th: "องค์กร", en: "Enterprise" },
                    { th: "กรณีศึกษา", en: "Case Studies" }
                ]
            },
            resources: {
                title: { th: "แหล่งข้อมูล", en: "Resources" },
                items: [
                    { th: "เอกสาร", en: "Documentation" },
                    { th: "API อ้างอิง", en: "API Reference" },
                    { th: "การสนับสนุน", en: "Support" },
                    { th: "บล็อก", en: "Blog" }
                ]
            },
            company: {
                title: { th: "บริษัท", en: "Company" },
                items: [
                    { th: "เกี่ยวกับเรา", en: "About" },
                    { th: "ร่วมงานกับเรา", en: "Careers" },
                    { th: "ความเป็นส่วนตัว", en: "Privacy" },
                    { th: "เงื่อนไข", en: "Terms" }
                ]
            }
        },
        footer: {
            copyright: {
                th: "© 2024 AI Translator. สงวนลิขสิทธิ์",
                en: "© 2024 AI Translator. All rights reserved."
            },
            poweredBy: {
                th: "พัฒนาโดย",
                en: "Empowered by"
            },
            developer: {
                th: "Seeder Development",
                en: "Seeder Development"
            }
        }
    };

    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-white">
                                {content.brand.name[language as keyof typeof content.brand.name]}
                            </span>
                        </div>
                        <p className="text-slate-400">
                            {content.brand.description[language as keyof typeof content.brand.description]}
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            {content.sections.product.title[language as keyof typeof content.sections.product.title]}
                        </h3>
                        <ul className="space-y-3">
                            {content.sections.product.items.map((item, index) => (
                                <li key={index}>
                                    <Link 
                                        href={`/${item.en.toLowerCase()}`} 
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        {item[language as keyof typeof item]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            {content.sections.resources.title[language as keyof typeof content.sections.resources.title]}
                        </h3>
                        <ul className="space-y-3">
                            {content.sections.resources.items.map((item, index) => (
                                <li key={index}>
                                    <Link 
                                        href={`/${item.en.toLowerCase()}`} 
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        {item[language as keyof typeof item]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            {content.sections.company.title[language as keyof typeof content.sections.company.title]}
                        </h3>
                        <ul className="space-y-3">
                            {content.sections.company.items.map((item, index) => (
                                <li key={index}>
                                    <Link 
                                        href={`/${item.en.toLowerCase()}`} 
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        {item[language as keyof typeof item]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-slate-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex flex-col space-y-2">
                            <p className="text-slate-400 text-sm">
                                {content.footer.copyright[language as keyof typeof content.footer.copyright]}
                            </p>
                            <div className="flex flex-col items-center md:items-start space-y-1">
                                <p className="text-sm">
                                    <span className="text-slate-400">
                                        {content.footer.poweredBy[language as keyof typeof content.footer.poweredBy]}{' '}
                                    </span>
                                    <span className="text-white hover:text-slate-200 transition-colors font-medium">
                                        {content.footer.developer[language as keyof typeof content.footer.developer]}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link 
                                href="https://twitter.com"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </Link>
                            <Link 
                                href="https://github.com"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <FaGithub className="w-5 h-5" />
                            </Link>
                            <Link 
                                href="https://linkedin.com"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}