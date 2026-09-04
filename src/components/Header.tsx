import React, { useState } from 'react';
import { PageId } from '../types';
import { FYERS_AFFILIATE_URL } from '../utils/calculations';
import { TrendingUp, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'calculators', label: 'SIP & SWP Calculator', badge: 'Interactive' },
    { id: 'blog', label: 'Blog & Guides', badge: '5 Blogs' },
    { id: 'about', label: 'About Us' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div 
            id="nav-brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-xs group-hover:scale-105 transition-transform">
              iY
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-800 font-heading">
                investyouth<span className="text-emerald-600">.in</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                INDIA
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1 font-semibold'
                      : 'text-slate-600 font-medium hover:text-emerald-600'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary CTA - Start Investment Now */}
          <div className="hidden md:flex items-center gap-3">
            <a
              id="header-btn-start-investment-now"
              href={FYERS_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md shadow-sky-500/20 active:scale-95 inline-flex items-center gap-1.5"
            >
              <span>Start Investment Now</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              id="header-mobile-quick-cta"
              href={FYERS_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 hover:bg-sky-600 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs active:scale-95"
            >
              Start Now
            </a>
            <button
              id="header-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                currentPage === link.id
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                  {link.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-100">
            <a
              id="header-mobile-btn-start-investment-now"
              href={FYERS_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-base font-bold text-white bg-sky-500 hover:bg-sky-600 shadow-md shadow-sky-500/20 active:scale-95 transition-all"
            >
              <Sparkles className="w-5 h-5 text-sky-100" />
              <span>Start Investment Now</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              Authorized Person for FYERS • Free Demat Account
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
