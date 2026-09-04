/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MarketTicker } from './components/MarketTicker';
import { HomePage } from './pages/HomePage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { BlogPage } from './pages/BlogPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { FYERS_AFFILIATE_URL } from './utils/calculations';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-950">
      {/* Dalal Street Live Ticker Tape */}
      <MarketTicker />

      {/* Main Header with Navigation & Start Investment Now CTA */}
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Content View Container */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'calculators' && <CalculatorsPage />}
        {currentPage === 'blog' && <BlogPage />}
        {currentPage === 'about' && <AboutUsPage />}
      </main>

      {/* Comprehensive Footer with Start Investment Now CTA */}
      <Footer onNavigate={navigateTo} />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900 text-white shadow-xl hover:bg-emerald-600 transition-all duration-200 focus:outline-hidden"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
