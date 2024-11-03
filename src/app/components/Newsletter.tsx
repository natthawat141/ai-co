// components/Newsletter.tsx
'use client'

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-indigo-950" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-grid-pattern" />
      </div>

      {/* Animated dots */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-indigo-400/30 animate-float"
          style={{
            left: `${(i + 1) * 10}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `-${i * 0.5}s`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            AI-Powered Translation
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            Subscribe to stay updated with our latest AI translation capabilities.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-md">
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-lg bg-white/5 px-4 py-3 text-white 
                ring-1 ring-white/20 transition-all duration-300
                hover:bg-white/10 hover:ring-indigo-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold 
                text-white transition-all duration-300
                hover:bg-indigo-500 hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Subscribe
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          We care about your data.{' '}
          <a href="/privacy" className="text-indigo-400 hover:text-indigo-300">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}