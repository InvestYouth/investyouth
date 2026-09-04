import React, { useState, useMemo } from 'react';
import { calculateSIP, calculateSWP, formatINR, FYERS_AFFILIATE_URL } from '../utils/calculations';
import { 
  Calculator, 
  TrendingUp, 
  ArrowDownCircle, 
  ArrowUpRight, 
  Sparkles, 
  Info, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Percent,
  Sliders,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';

export const CalculatorsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sip' | 'swp'>('sip');

  // SIP State (Defaulted to standard fixed SIP)
  const [sipMonthly, setSipMonthly] = useState<number>(25000);
  const [sipReturnRate, setSipReturnRate] = useState<number>(15);
  const [sipYears, setSipYears] = useState<number>(10);
  const [sipStepUp, setSipStepUp] = useState<number>(10);
  const [enableStepUp, setEnableStepUp] = useState<boolean>(false);
  const [showSipSchedule, setShowSipSchedule] = useState<boolean>(false);

  // SWP State (Defaulted to 25L lump sum, 20k/mo, 15% CAGR, 30 years)
  const [swpCorpus, setSwpCorpus] = useState<number>(2500000);
  const [swpMonthly, setSwpMonthly] = useState<number>(20000);
  const [swpReturnRate, setSwpReturnRate] = useState<number>(15);
  const [swpYears, setSwpYears] = useState<number>(30);
  const [showSwpSchedule, setShowSwpSchedule] = useState<boolean>(false);

  // Calculations
  const sipResult = useMemo(() => {
    return calculateSIP(sipMonthly, sipReturnRate, sipYears, enableStepUp ? sipStepUp : 0);
  }, [sipMonthly, sipReturnRate, sipYears, enableStepUp, sipStepUp]);

  const swpResult = useMemo(() => {
    return calculateSWP(swpCorpus, swpMonthly, swpReturnRate, swpYears);
  }, [swpCorpus, swpMonthly, swpReturnRate, swpYears]);

  // SIP Percentage of Invested vs Returns
  const sipInvestedPct = Math.round((sipResult.investedAmount / Math.max(1, sipResult.totalValue)) * 100);
  const sipReturnsPct = 100 - sipInvestedPct;

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-4">
            <Calculator className="w-4 h-4 text-emerald-700" />
            <span>FINANCIAL COMPOUNDING SUITE FOR YOUNG INDIA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            SIP & SWP Wealth Calculator
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Model your stock market journey with precision. Switch between monthly wealth accumulation (SIP) and systematic passive income (SWP).
          </p>
        </div>

        {/* Tab Switcher - Prominent Separate Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-slate-200/90 rounded-2xl shadow-inner max-w-md w-full">
            <button
              id="tab-btn-sip"
              onClick={() => setActiveTab('sip')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 ${
                activeTab === 'sip'
                  ? 'bg-white text-emerald-700 shadow-md scale-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
              }`}
            >
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>SIP Calculator</span>
              <span className="hidden sm:inline text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                Wealth Growth
              </span>
            </button>

            <button
              id="tab-btn-swp"
              onClick={() => setActiveTab('swp')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 ${
                activeTab === 'swp'
                  ? 'bg-white text-teal-700 shadow-md scale-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
              }`}
            >
              <ArrowDownCircle className="w-5 h-5 text-teal-600" />
              <span>SWP Calculator</span>
              <span className="hidden sm:inline text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-md">
                Passive Cashflow
              </span>
            </button>
          </div>
        </div>

        {/* =========================================================
            SIP CALCULATOR TAB CONTENT
        ========================================================= */}
        {activeTab === 'sip' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Inputs */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-heading">
                      SIP Parameters
                    </h2>
                    <p className="text-xs text-slate-500">
                      Systematic Investment Plan in Equities & Mutual Funds
                    </p>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                    Monthly Compounding
                  </span>
                </div>

                {/* 1. Monthly Investment */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">
                      Monthly Investment Amount
                    </label>
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-emerald-700 font-bold text-lg font-mono">
                      <span>₹</span>
                      <input
                        type="number"
                        min="500"
                        max="200000"
                        step="500"
                        value={sipMonthly}
                        onChange={(e) => setSipMonthly(Math.max(100, Number(e.target.value)))}
                        className="w-24 bg-transparent text-right focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />

                  {/* Preset quick buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[1000, 2500, 5000, 10000, 25000].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setSipMonthly(preset)}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                          sipMonthly === preset
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        ₹{preset.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Expected Return Rate */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <label className="text-sm font-bold text-slate-700">
                        Expected Return Rate (p.a.)
                      </label>
                      <span className="text-[11px] text-slate-500">
                        (Nifty 50 15-Yr CAGR is ~13.4%)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-emerald-700 font-bold text-lg font-mono">
                      <input
                        type="number"
                        min="5"
                        max="30"
                        step="0.5"
                        value={sipReturnRate}
                        onChange={(e) => setSipReturnRate(Math.max(1, Number(e.target.value)))}
                        className="w-16 bg-transparent text-right focus:outline-hidden"
                      />
                      <span>%</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="6"
                    max="22"
                    step="0.5"
                    value={sipReturnRate}
                    onChange={(e) => setSipReturnRate(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />

                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Conservative (8% Hybrid)</span>
                    <span className="text-emerald-600 font-semibold">Nifty Index (~13%)</span>
                    <span>Aggressive (16%+ Midcap)</span>
                  </div>
                </div>

                {/* 3. Time Period */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">
                      Time Horizon (Years)
                    </label>
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-emerald-700 font-bold text-lg font-mono">
                      <input
                        type="number"
                        min="1"
                        max="40"
                        value={sipYears}
                        onChange={(e) => setSipYears(Math.max(1, Number(e.target.value)))}
                        className="w-12 bg-transparent text-right focus:outline-hidden"
                      />
                      <span className="text-sm font-sans font-normal text-slate-500">Yrs</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />

                  <div className="flex flex-wrap gap-2 pt-1">
                    {[3, 5, 10, 15, 20, 25].map((y) => (
                      <button
                        key={y}
                        onClick={() => setSipYears(y)}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                          sipYears === y
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {y} Years
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Youth Feature: Optional Step-Up SIP (Salary Hike adjustment) */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    enableStepUp
                      ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        id="sip-stepup-toggle"
                        checked={enableStepUp}
                        onChange={(e) => setEnableStepUp(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                      />
                      <label htmlFor="sip-stepup-toggle" className="text-sm font-bold text-slate-800 cursor-pointer">
                        Enable Annual Step-Up SIP (Optional Top-Up)
                      </label>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        enableStepUp
                          ? 'bg-emerald-200 text-emerald-800'
                          : 'bg-slate-200/70 text-slate-600'
                      }`}
                    >
                      {enableStepUp ? 'Step-Up Active' : 'Off (Standard SIP)'}
                    </span>
                  </div>

                  {enableStepUp ? (
                    <div className="pt-2 pl-6 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium">Increase SIP every year by:</span>
                        <span className="font-bold text-emerald-800 text-sm">{sipStepUp}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="25"
                        step="5"
                        value={sipStepUp}
                        onChange={(e) => setSipStepUp(Number(e.target.value))}
                        className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                      />
                      <p className="text-[11px] text-emerald-700">
                        💡 Adds {sipStepUp}% each year to your monthly installment to match career salary appraisals.
                      </p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500 pl-6 pt-1">
                      Standard fixed monthly investment of {formatINR(sipMonthly)} for all {sipYears} years.
                    </p>
                  )}
                </div>

                {/* CTA inside calculator */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <a
                    id="calc-sip-cta-start-investment"
                    href={FYERS_AFFILIATE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-md shadow-sky-500/20 active:scale-95 transition-all"
                  >
                    <span>Start Investment Now (FYERS)</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </a>
                  <button
                    onClick={() => setShowSipSchedule(!showSipSchedule)}
                    className="w-full sm:w-auto text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{showSipSchedule ? 'Hide Schedule' : 'View Year-by-Year Table'}</span>
                    {showSipSchedule ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Right Column: Output Summary & Visual Display */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
                  <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                          Maturity Value of Investment
                        </span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-full border border-slate-700">
                          {enableStepUp ? `+${sipStepUp}% Step-Up` : 'Standard SIP'}
                        </span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1">
                        {formatINR(sipResult.totalValue)}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Wealth breakdown metrics */}
                  <div className="grid grid-cols-2 gap-4 py-6">
                    <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60">
                      <span className="text-xs text-slate-400 block mb-1">Invested Amount</span>
                      <span className="text-lg sm:text-xl font-bold font-mono text-slate-200">
                        {formatINR(sipResult.investedAmount)}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        ({sipInvestedPct}% of maturity)
                      </span>
                    </div>

                    <div className="bg-emerald-950/60 rounded-2xl p-4 border border-emerald-800/80">
                      <span className="text-xs text-emerald-400 block mb-1">Returns Made (Wealth Gained)</span>
                      <span className="text-lg sm:text-xl font-bold font-mono text-emerald-300">
                        +{formatINR(sipResult.estimatedReturns)}
                      </span>
                      <span className="text-[11px] text-emerald-400/90 block mt-1">
                        ({sipReturnsPct}% pure gains)
                      </span>
                    </div>
                  </div>

                  {/* Visual Ratio Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Invested Capital</span>
                      <span className="text-emerald-400 font-semibold">Compounded Interest</span>
                    </div>
                    <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                      <div
                        style={{ width: `${sipInvestedPct}%` }}
                        className="bg-slate-500 h-full transition-all duration-500"
                        title={`Invested: ${formatINR(sipResult.investedAmount)}`}
                      />
                      <div
                        style={{ width: `${sipReturnsPct}%` }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500"
                        title={`Returns: ${formatINR(sipResult.estimatedReturns)}`}
                      />
                    </div>
                  </div>

                  {/* Compounding Multiplier Fact */}
                  <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center gap-3 text-xs text-slate-300">
                    <Award className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>
                      Your money multiplies by <strong>{(sipResult.totalValue / Math.max(1, sipResult.investedAmount)).toFixed(1)}x</strong> over {sipYears} years at {sipReturnRate}% CAGR.
                    </span>
                  </div>
                </div>

                {/* Milestone Benchmarks for Young India */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Real Indian Youth Goal Benchmarks
                  </h4>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${sipResult.totalValue >= 500000 ? 'text-emerald-600' : 'text-slate-300'}`} />
                        <span className="font-semibold text-slate-800">₹5 Lakhs Emergency Fund</span>
                      </div>
                      <span className={`font-mono font-bold ${sipResult.totalValue >= 500000 ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {sipResult.totalValue >= 500000 ? 'Achieved ✅' : 'In Progress'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${sipResult.totalValue >= 2500000 ? 'text-emerald-600' : 'text-slate-300'}`} />
                        <span className="font-semibold text-slate-800">₹25 Lakhs Home Downpayment</span>
                      </div>
                      <span className={`font-mono font-bold ${sipResult.totalValue >= 2500000 ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {sipResult.totalValue >= 2500000 ? 'Achieved ✅' : 'In Progress'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${sipResult.totalValue >= 10000000 ? 'text-emerald-600' : 'text-slate-300'}`} />
                        <span className="font-semibold text-slate-800">₹1.00 Crore Financial Independence</span>
                      </div>
                      <span className={`font-mono font-bold ${sipResult.totalValue >= 10000000 ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {sipResult.totalValue >= 10000000 ? 'Crorepati 🚀' : 'Target'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Year-by-Year Schedule Table */}
            {showSipSchedule && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    Year-by-Year SIP Growth Schedule
                  </h3>
                  <span className="text-xs text-slate-500">
                    Annual progression of capital vs interest
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 bg-slate-50">
                        <th className="py-3 px-4 rounded-l-lg">Year</th>
                        <th className="py-3 px-4">Total Invested</th>
                        <th className="py-3 px-4">Wealth Earned</th>
                        <th className="py-3 px-4 rounded-r-lg">Portfolio Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sipResult.breakdownYears.map((row) => (
                        <tr key={row.year} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-semibold text-slate-700">
                            Year {row.year}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-600">
                            {formatINR(row.invested)}
                          </td>
                          <td className="py-3 px-4 font-mono text-emerald-600 font-medium">
                            +{formatINR(row.interestEarned)}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            {formatINR(row.totalValue)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            SWP (SYSTEMATIC WITHDRAWAL PLAN) TAB CONTENT
        ========================================================= */}
        {activeTab === 'swp' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: SWP Controls */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-heading">
                      SWP Parameters
                    </h2>
                    <p className="text-xs text-slate-500">
                      Systematic Withdrawal Plan for Monthly Passive Cashflow
                    </p>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold text-teal-700 bg-teal-50 rounded-full border border-teal-200">
                    Tax-Efficient Cashflow
                  </span>
                </div>

                {/* 1. Initial Investment Corpus */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">
                      Total Initial Corpus (Lump Sum)
                    </label>
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-teal-700 font-bold text-lg font-mono">
                      <span>₹</span>
                      <input
                        type="number"
                        min="100000"
                        max="50000000"
                        step="50000"
                        value={swpCorpus}
                        onChange={(e) => setSwpCorpus(Math.max(10000, Number(e.target.value)))}
                        className="w-28 bg-transparent text-right focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min="500000"
                    max="10000000"
                    step="100000"
                    value={swpCorpus}
                    onChange={(e) => setSwpCorpus(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />

                  <div className="flex flex-wrap gap-2 pt-1">
                    {[1000000, 2500000, 5000000, 10000000].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setSwpCorpus(preset)}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                          swpCorpus === preset
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {formatINR(preset, true)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Monthly Withdrawal Amount */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">
                      Monthly Withdrawal Amount
                    </label>
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-teal-700 font-bold text-lg font-mono">
                      <span>₹</span>
                      <input
                        type="number"
                        min="1000"
                        max="200000"
                        step="1000"
                        value={swpMonthly}
                        onChange={(e) => setSwpMonthly(Math.max(500, Number(e.target.value)))}
                        className="w-24 bg-transparent text-right focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="2000"
                    value={swpMonthly}
                    onChange={(e) => setSwpMonthly(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />

                  <div className="flex flex-wrap gap-2 pt-1">
                    {[10000, 20000, 35000, 50000].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setSwpMonthly(preset)}
                        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                          swpMonthly === preset
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {formatINR(preset)}/mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Expected Return Rate */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">
                      Expected Annual Portfolio Return
                    </label>
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-teal-700 font-bold text-lg font-mono">
                      <input
                        type="number"
                        min="4"
                        max="20"
                        step="0.5"
                        value={swpReturnRate}
                        onChange={(e) => setSwpReturnRate(Math.max(1, Number(e.target.value)))}
                        className="w-16 bg-transparent text-right focus:outline-hidden"
                      />
                      <span>%</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="5"
                    max="16"
                    step="0.5"
                    value={swpReturnRate}
                    onChange={(e) => setSwpReturnRate(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />

                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Conservative Debt (7%)</span>
                    <span className="text-teal-600 font-semibold">Balanced Advantage (~9-10%)</span>
                    <span>Equity Heavy (12%+)</span>
                  </div>
                </div>

                {/* 4. Duration Years */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">
                      Withdrawal Period (Years)
                    </label>
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-teal-700 font-bold text-lg font-mono">
                      <input
                        type="number"
                        min="1"
                        max="35"
                        value={swpYears}
                        onChange={(e) => setSwpYears(Math.max(1, Number(e.target.value)))}
                        className="w-12 bg-transparent text-right focus:outline-hidden"
                      />
                      <span className="text-sm font-sans font-normal text-slate-500">Yrs</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={swpYears}
                    onChange={(e) => setSwpYears(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>

                {/* Educational Box on SWP vs FDs */}
                <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 text-xs text-teal-900 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Info className="w-4 h-4 text-teal-700 shrink-0" />
                    <span>Why Young Families Choose SWP Over Bank FDs:</span>
                  </div>
                  <p className="leading-relaxed">
                    Unlike Bank Fixed Deposit interest which is taxed 100% at your highest income slab every year, SWP redemptions from equity/hybrid funds trigger capital gains tax only on the profit portion of your withdrawal. This results in massive tax savings!
                  </p>
                </div>

                {/* CTA inside SWP */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <a
                    id="calc-swp-cta-start-investment"
                    href={FYERS_AFFILIATE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 shadow-md shadow-sky-500/20 active:scale-95 transition-all"
                  >
                    <span>Start Investment Now (FYERS)</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </a>
                  <button
                    onClick={() => setShowSwpSchedule(!showSwpSchedule)}
                    className="w-full sm:w-auto text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{showSwpSchedule ? 'Hide Schedule' : 'View Year-by-Year Table'}</span>
                    {showSwpSchedule ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Right Column: SWP Results */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
                  <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                        Final Value (Estimated Remaining Corpus)
                      </span>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1">
                        {formatINR(swpResult.finalCorpus)}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                      <ArrowDownCircle className="w-6 h-6" />
                    </div>
                  </div>

                  {/* SWP Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-6">
                    <div className="bg-slate-800/60 rounded-2xl p-3.5 border border-slate-700/60">
                      <span className="text-xs text-slate-400 block mb-1">Total Invested Amount</span>
                      <span className="text-base sm:text-lg font-bold font-mono text-slate-200">
                        {formatINR(swpCorpus)}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Initial Principal
                      </span>
                    </div>

                    <div className="bg-slate-800/60 rounded-2xl p-3.5 border border-slate-700/60">
                      <span className="text-xs text-slate-400 block mb-1">Total Withdrawal</span>
                      <span className="text-base sm:text-lg font-bold font-mono text-teal-300">
                        {formatINR(swpResult.totalWithdrawn)}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        ({swpYears * 12} monthly payouts)
                      </span>
                    </div>

                    <div className="bg-slate-800/60 rounded-2xl p-3.5 border border-slate-700/60">
                      <span className="text-xs text-slate-400 block mb-1">Total Value Created</span>
                      <span className="text-base sm:text-lg font-bold font-mono text-emerald-300">
                        {formatINR(swpResult.totalValueDelivered)}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        (Withdrawn + Final)
                      </span>
                    </div>
                  </div>

                  {/* Sustainability Status Badge */}
                  <div className="pt-2">
                    {swpResult.depleted ? (
                      <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Corpus Depletion Warning</p>
                          <p className="text-rose-400 mt-0.5">
                            At ₹{swpMonthly.toLocaleString('en-IN')}/month, your corpus runs out in approximately Year {swpResult.depletedYear}. Consider decreasing monthly withdrawal or increasing initial capital.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Sustainable Cashflow Plan</p>
                          <p className="text-emerald-400 mt-0.5">
                            Your corpus generates enough compounding returns to comfortably sustain your ₹{swpMonthly.toLocaleString('en-IN')} monthly withdrawal while leaving a strong final corpus!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* SWP Golden Rules Card */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    The 4% Safe Withdrawal Rule
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Global financial planners recommend an annual withdrawal rate of roughly 4% to 6% of your equity/hybrid corpus.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-600">Your Current Withdrawal Rate:</span>
                    <span className={`font-mono font-bold ${
                      (swpMonthly * 12 / swpCorpus) > 0.08 ? 'text-rose-600' : 'text-emerald-600'
                    }`}>
                      {((swpMonthly * 12 / swpCorpus) * 100).toFixed(1)}% p.a.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional SWP Year-by-Year Schedule */}
            {showSwpSchedule && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    Year-by-Year SWP Cashflow Schedule
                  </h3>
                  <span className="text-xs text-slate-500">
                    Opening, returns, withdrawals, and ending balance
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 bg-slate-50">
                        <th className="py-3 px-4 rounded-l-lg">Year</th>
                        <th className="py-3 px-4">Opening Balance</th>
                        <th className="py-3 px-4">Returns Generated</th>
                        <th className="py-3 px-4">Withdrawn</th>
                        <th className="py-3 px-4 rounded-r-lg">Closing Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {swpResult.breakdownYears.map((row) => (
                        <tr key={row.year} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-semibold text-slate-700">
                            Year {row.year}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-600">
                            {formatINR(row.openingBalance)}
                          </td>
                          <td className="py-3 px-4 font-mono text-teal-600 font-medium">
                            +{formatINR(row.returnsGenerated)}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-500">
                            -{formatINR(row.withdrawn)}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            {formatINR(row.closingBalance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
