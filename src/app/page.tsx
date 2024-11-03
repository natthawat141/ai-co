// src/app/page.tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Static import for critical components
import Navbar from './components/Navbar';

// Dynamic imports
const Hero = dynamic(() => import('./components/Hero'), {
  loading: () => <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950" />
});

const Features = dynamic(() => import('./components/Feature'), {
  loading: () => <div className="min-h-[400px] bg-slate-900" />
});

const Newsletter = dynamic(() => import('./components/Newsletter'), {
  loading: () => <div className="min-h-[300px] bg-slate-900" />
});

const Footer = dynamic(() => import('./components/Footer'), {
  loading: () => <div className="min-h-[200px] bg-slate-900" />
});

// Page component
export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950 animate-pulse" />
      }>
        <Hero />
      </Suspense>

      <Suspense fallback={
        <div className="min-h-[400px] bg-slate-900 animate-pulse" />
      }>
        <Features />
      </Suspense>

      <Suspense fallback={
        <div className="min-h-[300px] bg-slate-900 animate-pulse" />
      }>
        <Newsletter />
      </Suspense>

      <Suspense fallback={
        <div className="min-h-[200px] bg-slate-900 animate-pulse" />
      }>
        <Footer />
      </Suspense>
    </div>
  );
}