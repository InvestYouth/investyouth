import React, { useState } from 'react';
import { PageId } from '../types';
import { FYERS_AFFILIATE_URL } from '../utils/calculations';
import { TrendingUp, ArrowUpRight, ShieldAlert, Heart, CheckCircle2, Send, Mail, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Pre-footer Call to Action Bar */}
      <div className="border-b border-slate-800 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-emerald-900/30 border border-emerald-500/20 rounded-2xl p-6 sm:p-8">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
                🚀 Zero Account Opening Fee • Instant Aadhaar KYC
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                Ready to take control of your financial destiny?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
                Open your free investment account today and start your first ₹500 SIP in India&apos;s leading companies with zero paperwork.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
              <a
                id="footer-btn-start-investment-now"
                href={FYERS_AFFILIATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-base font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-md shadow-sky-500/20 active:scale-95 transition-all duration-200"
              >
                <span>Start Investment Now</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm tracking-tight shadow-xs group-hover:scale-105 transition-transform">
                iY
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                investyouth<span className="text-emerald-400">.in</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              India&apos;s premier non-profit oriented youth financial movement. Championing stock market literacy, SIP discipline, and long-term compounding across 500+ Indian university campuses and young workplaces.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active nationwide campaign: <strong>#YouthInvestInIndia</strong></span>
              </div>

              <div className="flex flex-col gap-1.5 pt-1 text-xs text-slate-300">
                <a
                  href="mailto:hello@investyouth.in"
                  className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>hello@investyouth.in</span>
                </a>
                <a
                  href="https://www.facebook.com/InvestYouth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>facebook.com/InvestYouth</span>
                </a>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('calculators')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>SIP & SWP Calculator</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
                    Hot
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('blog')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Blogs & Guides (5 Insights)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Us & Mission
                </button>
              </li>
            </ul>
          </div>

          {/* Investment Options */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Investment Options
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Nifty 50 Index Funds</li>
              <li>Direct NSE/BSE Equities</li>
              <li>Exchange Traded Funds (ETFs)</li>
              <li>Sovereign Gold Bonds (SGB)</li>
              <li>Commercial REITs</li>
              <li>ELSS 80C Tax Savers</li>
            </ul>
          </div>

          {/* Newsletter / Youth Digest */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Weekly Youth Digest
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jargon-free Dalal Street analysis, market trends, and practical wealth tips delivered every Sunday morning.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You&apos;re subscribed! Welcome to InvestYouth.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center gap-1.5 bg-slate-800/90 border border-slate-700 rounded-lg p-1 focus-within:border-emerald-500 transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-semibold shrink-0 transition-colors flex items-center gap-1"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-500 block">
                  Zero spam. Unsubscribe anytime.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Regulatory & Risk Disclaimer (Crucial for Indian Financial Apps) */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-xs text-slate-500 space-y-3 leading-relaxed">
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 text-slate-400">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-slate-300">
                SEBI & AMFI Compliance & Market Risk Notice:
              </p>
              <p>
                Investments in securities markets are subject to market risks. Read all the scheme related documents carefully before investing. Past performance of mutual funds, stocks, or indices is not indicative of future returns. <strong>investyouth.in</strong> is purely an educational portal committed to spreading financial literacy among Indian youth.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-slate-400 text-xs">
            <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
              <span>© {new Date().getFullYear()} investyouth.in</span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block"></span>
                Authorized Person for FYERS Securities (SEBI Reg. INZ000008524)
              </span>
              <a 
                href={FYERS_AFFILIATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>Start Investing Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <span>Empowering millions of young Indian dreams with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
              <span>in Bharat</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
