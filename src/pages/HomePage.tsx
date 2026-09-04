import React, { useState } from 'react';
import { PageId } from '../types';
import { INVESTMENT_OPTIONS } from '../data/investmentOptions';
import { YOUTH_STORIES } from '../data/youthStories';
import { BLOGS_DATA } from '../data/blogsData';
import { calculateSIP, formatINR, FYERS_AFFILIATE_URL } from '../utils/calculations';
import { LiveMarketCards } from '../components/LiveMarketCards';
import { 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Percent, 
  ChevronRight, 
  Flame, 
  PieChart, 
  Coins, 
  Building2, 
  Building, 
  ArrowRight,
  Calculator,
  Compass,
  AlertCircle,
  Zap,
  Award,
  FileCheck
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Investment Options Category Filter
  const [selectedOptionCategory, setSelectedOptionCategory] = useState<string>('All');

  // Quick SIP Teaser Widget State
  const [quickSipAmount, setQuickSipAmount] = useState<number>(3000);
  const [quickSipYears, setQuickSipYears] = useState<number>(10);
  const quickSipResult = calculateSIP(quickSipAmount, 13, quickSipYears, 0);

  // Youth Portfolio Profiler Quiz State
  const [quizStep, setQuizStep] = useState<number>(1);
  const [quizAnswers, setQuizAnswers] = useState<{
    horizon?: string;
    reaction?: string;
    income?: string;
  }>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const filteredOptions = INVESTMENT_OPTIONS.filter((opt) => {
    if (selectedOptionCategory === 'All') return true;
    if (selectedOptionCategory === 'Equity' && opt.category === 'Equity') return true;
    if (selectedOptionCategory === 'Funds' && opt.category === 'Funds') return true;
    if (selectedOptionCategory === 'Safe & Gold' && opt.category === 'Safe & Gold') return true;
    if (selectedOptionCategory === 'Alternative' && opt.category === 'Alternative') return true;
    return false;
  });

  const handleQuizAnswer = (key: 'horizon' | 'reaction' | 'income', value: string) => {
    const updated = { ...quizAnswers, [key]: value };
    setQuizAnswers(updated);
    if (quizStep < 3) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setQuizAnswers({});
    setQuizCompleted(false);
  };

  // Helper to render icon for investment options
  const renderOptionIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-indigo-600" />;
      case 'PieChart':
        return <PieChart className="w-5 h-5 text-teal-600" />;
      case 'Coins':
        return <Coins className="w-5 h-5 text-amber-600" />;
      case 'Building':
        return <Building className="w-5 h-5 text-blue-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-rose-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =========================================================
          HERO SECTION (Featuring authentic Indian youths photos & clear value prop)
      ========================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                  <span>AUTHORIZED PERSON FOR FYERS SECURITIES</span>
                  <span className="hidden sm:inline text-sky-300">•</span>
                  <span className="hidden sm:inline text-sky-700 font-medium">SEBI Reg. INZ000008524</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-heading leading-[1.12]">
                Invest Early. <br />
                Compound Longer. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                  Own India&apos;s Growth.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Break free from boring fixed deposits and finfluencer gambling. As an Authorized Person for FYERS, we bring college students and young professionals institutional-grade trading tools, zero delivery brokerage, and automated SIPs.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  id="hero-cta-start-investment-now"
                  href={FYERS_AFFILIATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-md shadow-sky-500/25 hover:shadow-lg active:scale-95 transition-all duration-200"
                >
                  <Sparkles className="w-5 h-5 text-sky-100" />
                  <span>Start Investment Now</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </a>

                <button
                  id="hero-cta-calculate-sip"
                  onClick={() => onNavigate('calculators')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:shadow-sm transition-all duration-200"
                >
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  <span>Calculate Your SIP</span>
                </button>
              </div>

              {/* Trust Indicators & Avatar Stack */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-sky-200 flex items-center justify-center text-[9px] text-slate-800 font-bold">AR</div>
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-emerald-200 flex items-center justify-center text-[9px] text-slate-800 font-bold">PK</div>
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-200 flex items-center justify-center text-[9px] text-slate-800 font-bold">SJ</div>
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-amber-200 flex items-center justify-center text-[9px] text-slate-800 font-bold">TD</div>
                  </div>
                  <span className="font-semibold text-slate-700">Trusted by 500,000+ Gen-Z across India</span>
                </div>
                <div className="hidden sm:block text-slate-300">•</div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>₹100 Min SIP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zero Delivery Fee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Visuals: Collage of Indian Youths */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Young Indian Investor Photo */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5">
                  <img
                    src="/assets/indian-girl-hero.jpg"
                    alt="Young Indian girl investor starting stock market compounding"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white">
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-sky-500/90 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                        Bengaluru, India
                      </span>
                      <p className="font-bold text-lg">Tanvi, 23 • Software Engineer</p>
                      <p className="text-xs text-slate-300">
                        &ldquo;Turned my ₹1,000 college SIP into a ₹6.8L compounding portfolio.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 1: Live Compounding Badge */}
                <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl max-w-[210px] hidden sm:block animate-bounce-slow">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                      ₹
                    </div>
                    <span className="text-xs font-bold text-slate-800">Compounding Seed</span>
                  </div>
                  <p className="text-lg font-extrabold text-sky-600 font-mono">
                    ₹2,500 <span className="text-[11px] text-slate-400 font-sans">/month</span>
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Grows to <strong>₹35 Lakhs+</strong> in 15 years
                  </p>
                </div>

                {/* Floating Card 2: Student Co-Investor */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-100 border border-sky-300 text-sky-700 flex items-center justify-center font-bold text-xs">
                    VK
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Vikram, 22</p>
                    <p className="text-[10px] text-sky-600 font-semibold">Started at Age 19</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* National Stats Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-center">
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                16 Cr+
              </span>
              <p className="text-xs text-slate-500 font-medium">Indian Demat Accounts</p>
            </div>
            <div className="space-y-1 border-l border-slate-100">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
                43%
              </span>
              <p className="text-xs text-slate-500 font-medium">New Investors Under 30</p>
            </div>
            <div className="space-y-1 border-l border-slate-100">
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-600 font-mono">
                13.4%
              </span>
              <p className="text-xs text-slate-500 font-medium">Nifty 50 15-Yr CAGR</p>
            </div>
            <div className="space-y-1 border-l border-slate-100">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono">
                ₹100
              </span>
              <p className="text-xs text-slate-500 font-medium">Micro-SIP Entry Barrier</p>
            </div>
          </div>
        </div>

        {/* Dynamic Live Market Benchmarks (Nifty 50, Sensex, Bank Nifty, Nifty IT) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <LiveMarketCards />
        </div>
      </section>

      {/* =========================================================
          OFFICIAL AUTHORIZED PERSON FOR FYERS SECURITIES SPOTLIGHT
      ========================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-sky-50/50 via-white to-sky-50/30 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-100 text-sky-900 border border-sky-200 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>OFFICIAL SEBI REGISTERED BROKER PARTNERSHIP</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Authorized Person for <span className="text-sky-600">FYERS Securities</span>
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong className="text-slate-900">investyouth.in</strong> is an officially appointed Authorized Person (AP) for FYERS Securities Private Limited. We bridge the gap between Indian youth and institutional trading infrastructure, offering you ₹0 brokerage on long-term investments and cutting-edge TradingView charts.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-white border border-sky-100/90 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Percent className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  ₹0 Delivery Brokerage for Life
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zero commission on equity delivery. Buy shares of Nifty 50, Tata, Reliance, and ETFs to hold long-term without paying a single rupee in delivery brokerage.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-sky-700 flex items-center gap-1">
                <span>Free for All Equities</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-white border border-sky-100/90 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Powered by TradingView Pro
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  FYERS offers direct TradingView integration. Enjoy multi-chart layouts, 100+ indicators, and execute trades directly from technical charts at zero additional cost.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-sky-700 flex items-center gap-1">
                <span>Integrated TradingView</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-white border border-sky-100/90 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Zap className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  100% Free Paperless Demat
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Open your 2-in-1 Demat and Trading account entirely online in 5 minutes via Aadhaar OTP and Digilocker. Zero account opening fees and zero paperwork required.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-sky-700 flex items-center gap-1">
                <span>Instant 5-Min E-KYC</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-white border border-sky-100/90 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Direct CDSL Demat Security
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your securities are credited directly to your personal CDSL depository demat account under your PAN. Strictly governed by SEBI investor protection protocols.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-sky-700 flex items-center gap-1">
                <span>CDSL Depository Direct</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Pricing Transparency & Direct Authorized Link Callout */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  <Award className="w-3.5 h-3.5 text-sky-400" />
                  <span>Transparent Pricing Model for Gen-Z & College Students</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Why Young Indians Choose FYERS via investyouth.in
                </h3>
                
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  No hidden account maintenance fees, no sales calls, no unsolicited tipsters. Open your demat account through our official Authorized Person partnership link and start building your financial independence.
                </p>

                {/* Rates matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-medium block">Demat Opening</span>
                    <span className="text-lg font-bold text-sky-400">₹0 Free</span>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-medium block">Equity Delivery</span>
                    <span className="text-lg font-bold text-emerald-400">₹0 Zero</span>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-medium block">Direct Mutual Funds</span>
                    <span className="text-lg font-bold text-sky-400">₹0 Free</span>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-medium block">Intraday / F&O</span>
                    <span className="text-lg font-bold text-amber-400">Flat ₹20</span>
                  </div>
                </div>
              </div>

              {/* Action column */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center space-y-3">
                <a
                  id="fyers-ap-section-btn"
                  href={FYERS_AFFILIATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-500/25 hover:shadow-xl active:scale-95 transition-all duration-200 text-center"
                >
                  <span>Open Free FYERS Demat Account</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </a>
                
                <p className="text-[11px] text-slate-400 text-center lg:text-right">
                  Instant paperless onboarding via Digilocker • Takes under 5 minutes
                </p>
                
                <div className="text-[10px] text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/50 text-center lg:text-right">
                  SEBI Reg: INZ000008524 • NSE: 90061 • BSE: 6697 • MCX: 56100
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE COST OF WAITING 10 YEARS (Compounding Reality Check)
      ========================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-3">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>THE 10-YEAR DELAY TRAP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Why Starting in Your 20s is an Unfair Advantage
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Waiting for &quot;the right salary&quot; is the costliest mistake young Indians make. See the real math:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Rohan - Started at 21 */}
            <div className="bg-emerald-50/70 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-5 relative shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base border-2 border-emerald-500 shadow-2xs">
                    RK
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Rohan (Started at Age 21)</h3>
                    <p className="text-xs text-emerald-800 font-semibold">Invests ₹2,500/mo for 14 yrs, stops at 35</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-200 text-emerald-900">
                  Winner 🏆
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-700">
                <div className="flex justify-between py-2 border-b border-emerald-200/60">
                  <span>Total Capital Out of Pocket:</span>
                  <span className="font-mono font-bold text-slate-900">₹4.20 Lakhs</span>
                </div>
                <div className="flex justify-between py-2 border-b border-emerald-200/60">
                  <span>Investment Duration:</span>
                  <span className="font-bold text-slate-900">Only 14 Years</span>
                </div>
                <div className="flex justify-between py-2 text-base font-bold text-emerald-950">
                  <span>Portfolio Value at Age 55:</span>
                  <span className="font-mono text-2xl font-extrabold text-emerald-700">
                    ₹3.42 Crore
                  </span>
                </div>
              </div>

              <p className="text-xs text-emerald-800 leading-relaxed bg-emerald-100/60 p-3 rounded-xl">
                ✨ Rohan invested 80% LESS money, but time allowed compounding to double his final wealth!
              </p>
            </div>

            {/* Sameer - Started at 31 */}
            <div className="bg-slate-50 border border-slate-300 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-base border border-slate-300 shadow-2xs">
                    SM
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Sameer (Started at Age 31)</h3>
                    <p className="text-xs text-slate-500 font-semibold">Waited 10 yrs, invested ₹7,500/mo till 55</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-700">
                  Delayed ⏳
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-700">
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span>Total Capital Out of Pocket:</span>
                  <span className="font-mono font-bold text-slate-900">₹21.60 Lakhs</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span>Investment Duration:</span>
                  <span className="font-bold text-slate-900">24 Continuous Years</span>
                </div>
                <div className="flex justify-between py-2 text-base font-bold text-slate-800">
                  <span>Portfolio Value at Age 55:</span>
                  <span className="font-mono text-2xl font-extrabold text-slate-700">
                    ₹1.87 Crore
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed bg-slate-200/50 p-3 rounded-xl">
                ⚠️ Despite investing ₹17 Lakhs more of hard-earned cash, Sameer missed out on ₹1.55 Crore due to a 10-year delay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INVESTMENT OPTIONS FOR INDIAN YOUTH (Stocks, Funds, ETFs, SGBs, REITs, ELSS)
      ========================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-3">
                <PieChart className="w-3.5 h-3.5 text-emerald-700" />
                <span>CURATED WEALTH VEHICLES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
                Investment Options for Indian Youth
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
                From zero-stress index funds and commercial real estate to high-growth equities and RBI gold bonds. Pick what fits your budget.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              {['All', 'Equity', 'Funds', 'Safe & Gold', 'Alternative'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedOptionCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedOptionCategory === cat
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOptions.map((opt) => (
              <div
                key={opt.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-2xs">
                      {renderOptionIcon(opt.iconName)}
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      opt.riskLevel === 'Low'
                        ? 'bg-emerald-100 text-emerald-800'
                        : opt.riskLevel === 'Moderate'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {opt.riskLevel} Risk
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-heading">
                      {opt.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                      {opt.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {opt.description}
                  </p>

                  {/* Metrics Badge row */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Min Starting Amount</span>
                      <span className="font-bold text-slate-800 font-mono">{opt.minAmount}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block">Expected CAGR</span>
                      <span className="font-bold text-emerald-700 font-mono">{opt.expectedReturn}</span>
                    </div>
                  </div>

                  {/* Why Youth Love It */}
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-950">
                    <span className="font-bold text-emerald-800">Why Gen-Z Chooses This: </span>
                    {opt.whyYouthLoveIt}
                  </div>

                  {/* Popular Examples */}
                  <div className="space-y-1 text-xs">
                    <span className="text-slate-400 font-medium">Popular Examples:</span>
                    <div className="flex flex-wrap gap-1">
                      {opt.popularExamples.map((ex, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={FYERS_AFFILIATE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                  >
                    <span>Invest in this with FYERS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          INTERACTIVE YOUTH RISK & ASSET ALLOCATION QUIZ
      ========================================================= */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Compass className="w-3.5 h-3.5" />
                <span>60-SECOND YOUTH RISK PROFILER</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
                Find Your Ideal Investment Allocation
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Answer 3 quick questions to discover whether you should be Aggressive, Balanced, or Core-Indexed.
              </p>
            </div>

            {!quizCompleted ? (
              <div className="space-y-6">
                {/* Step indicators */}
                <div className="flex justify-center items-center gap-3">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        quizStep === s
                          ? 'bg-emerald-500 text-white shadow-md'
                          : s < quizStep
                          ? 'bg-emerald-900 text-emerald-300'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {s}
                    </div>
                  ))}
                </div>

                {/* Question 1 */}
                {quizStep === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-center text-lg font-bold text-slate-100">
                      1. What is your primary financial goal right now?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => handleQuizAnswer('horizon', 'long')}
                        className="p-4 rounded-2xl bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700 hover:border-emerald-500 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-emerald-300">Long-Term Wealth</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Building a multi-lakh or crore corpus over 7+ years.
                        </p>
                      </button>
                      <button
                        onClick={() => handleQuizAnswer('horizon', 'medium')}
                        className="p-4 rounded-2xl bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700 hover:border-emerald-500 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-emerald-300">Balanced Goals</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Higher education, MBA, or startup seed in 3-5 years.
                        </p>
                      </button>
                      <button
                        onClick={() => handleQuizAnswer('horizon', 'short')}
                        className="p-4 rounded-2xl bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700 hover:border-emerald-500 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-emerald-300">Safety & Laptop Fund</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Short-term emergency buffer or gadget purchase in 1-2 years.
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Question 2 */}
                {quizStep === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-center text-lg font-bold text-slate-100">
                      2. If the stock market drops 15% next month, what will you do?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => handleQuizAnswer('reaction', 'buy')}
                        className="p-4 rounded-2xl bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700 hover:border-emerald-500 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-emerald-300">Buy More Discounts!</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Great companies are on sale. I will increase my SIP.
                        </p>
                      </button>
                      <button
                        onClick={() => handleQuizAnswer('reaction', 'hold')}
                        className="p-4 rounded-2xl bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700 hover:border-emerald-500 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-emerald-300">Do Nothing & Wait</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Keep my automated SIP running and avoid looking at charts.
                        </p>
                      </button>
                      <button
                        onClick={() => handleQuizAnswer('reaction', 'panic')}
                        className="p-4 rounded-2xl bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700 hover:border-emerald-500 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-emerald-300">I Would Get Anxious</p>
                        <p className="text-xs text-slate-400 mt-1">
                          I lose sleep seeing negative portfolio returns.
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Question 3 */}
                {quizStep === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-center text-lg font-bold text-slate-100">
                      3. What is your current monthly investable amount?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={() => handleQuizAnswer('income', 'low')}
                        className="p-4 rounded-2xl bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700 hover:border-emerald-500 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-emerald-300">₹500 - ₹2,000</p>
                        <p className="text-xs text-slate-400 mt-1">
                          College pocket money or early freelance gig earnings.
                        </p>
                      </button>
                      <button
                        onClick={() => handleQuizAnswer('income', 'medium')}
                        className="p-4 rounded-2xl bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700 hover:border-emerald-500 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-emerald-300">₹2,000 - ₹10,000</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Internship stipend or junior software engineer salary.
                        </p>
                      </button>
                      <button
                        onClick={() => handleQuizAnswer('income', 'high')}
                        className="p-4 rounded-2xl bg-slate-800/80 hover:bg-emerald-900/60 border border-slate-700 hover:border-emerald-500 text-left transition-all"
                      >
                        <p className="font-bold text-sm text-emerald-300">₹10,000+</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Tech/corporate salary with high savings rate.
                        </p>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz Result Display */
              <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
                <div className="inline-block p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <Sparkles className="w-8 h-8 mx-auto" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                    Your Tailored Youth Portfolio Blueprint
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                    {quizAnswers.reaction === 'buy' && quizAnswers.horizon === 'long'
                      ? 'The High-Growth Young Maverick (80% Equity / 20% Gold & Debt)'
                      : quizAnswers.reaction === 'panic'
                      ? 'The Safe Foundation Builder (50% Large Cap / 30% Debt / 20% Gold)'
                      : 'The Core & Satellite Compounder (70% Nifty 50 / 20% Flexicap / 10% Gold)'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                    Based on your responses, an automated index fund core combined with an emergency liquid buffer gives you the optimum balance of compounding power and peaceful sleep.
                  </p>
                </div>

                {/* Recommended Allocation Visual */}
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 max-w-md mx-auto grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300">
                    <span className="block font-bold text-lg font-mono">70%</span>
                    <span className="text-[10px] text-emerald-400">Nifty 50 Index</span>
                  </div>
                  <div className="p-2 rounded-xl bg-teal-950/60 border border-teal-800 text-teal-300">
                    <span className="block font-bold text-lg font-mono">20%</span>
                    <span className="text-[10px] text-teal-400">Flexi / Mid Cap</span>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-300">
                    <span className="block font-bold text-lg font-mono">10%</span>
                    <span className="text-[10px] text-amber-400">Gold BeES / SGB</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    id="quiz-result-start-investment-btn"
                    href={FYERS_AFFILIATE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-900 bg-white hover:bg-emerald-50 transition-all shadow-md"
                  >
                    <span>Execute this Plan on FYERS</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={resetQuiz}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          VOICES OF YOUNG INDIA (Authentic Indian Youths Photos & Stories)
      ========================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>COMMUNITY CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Voices of Young India
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Real college students and young techies who refused to wait and built significant wealth through early Dalal Street investing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {YOUTH_STORIES.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  {/* Identity Badge without images */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
                      {story.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{story.name}</h3>
                      <p className="text-xs text-slate-500">{story.role}</p>
                      <span className="text-[10px] text-sky-600 font-semibold block">
                        {story.location}
                      </span>
                    </div>
                  </div>

                  {/* Milestone Badge */}
                  <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Milestone Reached</span>
                      <span className="font-bold text-sky-950 font-mono text-sm">
                        {story.currentMilestone}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Started at Age</span>
                      <span className="font-bold text-slate-700">{story.startedAtAge}</span>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                {/* Advice footer */}
                <div className="pt-3 border-t border-slate-100 space-y-1 text-[11px]">
                  <span className="text-slate-400 font-semibold">Pro Advice for Peers:</span>
                  <p className="text-slate-700 font-medium">{story.advice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK SIP CALCULATOR PREVIEW WIDGET
      ========================================================= */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Quick Compounding Simulator
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
                What Could Your Pocket Money Become?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm">
                Slide below to see what happens when you invest a fraction of your salary or allowance into India&apos;s leading 50 companies (Nifty @ 13% CAGR).
              </p>

              {/* Sliders */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Monthly SIP Amount:</span>
                    <span className="text-emerald-400 font-bold font-mono text-sm">
                      {formatINR(quickSipAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="20000"
                    step="500"
                    value={quickSipAmount}
                    onChange={(e) => setQuickSipAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Time Duration:</span>
                    <span className="text-emerald-400 font-bold font-mono text-sm">
                      {quickSipYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="25"
                    step="1"
                    value={quickSipYears}
                    onChange={(e) => setQuickSipYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Quick Result Box */}
            <div className="lg:col-span-5 bg-slate-800/80 rounded-2xl p-6 border border-slate-700 space-y-4 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider block">
                Estimated Corpus Value
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                {formatINR(quickSipResult.totalValue)}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-700 pt-3">
                <div>
                  <span className="text-slate-400 block text-[10px]">Total Invested</span>
                  <span className="font-bold text-slate-200 font-mono">
                    {formatINR(quickSipResult.investedAmount)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Wealth Gained</span>
                  <span className="font-bold text-emerald-300 font-mono">
                    +{formatINR(quickSipResult.estimatedReturns)}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => onNavigate('calculators')}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Open Full SIP & SWP Calculator</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED BLOGS PREVIEW (5 Insights for Youth)
      ========================================================= */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-3">
                <Flame className="w-3.5 h-3.5 text-emerald-700" />
                <span>FINANCIAL EDUCATION VAULT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
                Popular Guides for Young Dalal Street Investors
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Written by SEBI registered analysts and youth mentors. 100% free from financial noise.
              </p>
            </div>

            <button
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 group"
            >
              <span>View All 5 Guides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOGS_DATA.slice(0, 3).map((blog) => (
              <div
                key={blog.id}
                onClick={() => onNavigate('blog')}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-800 shadow-2xs">
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{blog.readTime}</span>
                      <span>•</span>
                      <span>{blog.publishDate}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-heading line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {blog.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL HIGH-CONVERSION CTA BANNER (Linking to FYERS)
      ========================================================= */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 rounded-3xl p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-widest bg-emerald-900/60 px-3.5 py-1.5 rounded-full border border-emerald-500/30">
                🚀 Take Action Today
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                Your Future Self Will Thank You For Starting Today.
              </h2>

              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                Every month you wait is compounding interest lost forever. Open your paperless Demat account through our official FYERS Authorized Person portal and launch your first ₹500 SIP in 5 minutes.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  id="home-final-btn-start-investment-now"
                  href={FYERS_AFFILIATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-xl shadow-sky-900/30 hover:shadow-2xl active:scale-95 transition-all duration-200"
                >
                  <span>Start Investment Now</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </a>

                <button
                  onClick={() => onNavigate('calculators')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                >
                  Model SIP Compounding
                </button>
              </div>

              <div className="pt-3 flex items-center justify-center gap-6 text-[11px] text-emerald-200 flex-wrap">
                <span>Authorized Person for FYERS</span>
                <span>•</span>
                <span>Free Demat Account</span>
                <span>•</span>
                <span>Zero Equity Delivery Fees</span>
                <span>•</span>
                <span>SEBI Reg. INZ000008524</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
