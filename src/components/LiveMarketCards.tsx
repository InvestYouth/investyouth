import React, { useState, useEffect } from 'react';
import { MarketTickerItem } from '../types';
import { DEFAULT_INDICES, fetchLiveMarketIndices } from '../utils/marketData';
import { FYERS_AFFILIATE_URL } from '../utils/calculations';
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  ArrowUpRight, 
  Activity, 
  Clock, 
  BarChart3,
  ShieldCheck
} from 'lucide-react';

export const LiveMarketCards: React.FC = () => {
  const [indices, setIndices] = useState<MarketTickerItem[]>(DEFAULT_INDICES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('Live');

  const updateData = async (manual = false) => {
    if (manual) setIsRefreshing(true);
    try {
      const live = await fetchLiveMarketIndices();
      if (live && live.length > 0) {
        setIndices(live);
        const timeStr = new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        setLastUpdate(`${timeStr} IST`);
      }
    } finally {
      if (manual) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  useEffect(() => {
    updateData();
    const interval = setInterval(() => {
      updateData();
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Filter specifically for the 4 core benchmark indices requested
  const targetSymbols = ['NIFTY 50', 'SENSEX', 'BANK NIFTY', 'NIFTY IT'];
  const primaryIndices = targetSymbols.map(sym => 
    indices.find(i => i.symbol === sym) || DEFAULT_INDICES.find(i => i.symbol === sym)!
  );

  return (
    <section id="live-market-indices-section" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">
              REAL-TIME DALAL STREET BAROMETERS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Live Market Benchmarks
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Dynamic live prices, daily high/lows, and point changes for India&apos;s most watched equity indices.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{lastUpdate}</span>
          </div>

          <button
            id="market-cards-refresh-btn"
            onClick={() => updateData(true)}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* The 4 Benchmark Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {primaryIndices.map((item) => (
          <div
            key={item.symbol}
            id={`market-card-${item.symbol.toLowerCase().replace(/\s+/g, '-')}`}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  {item.name}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 font-heading tracking-tight mt-0.5">
                  {item.symbol}
                </h3>
              </div>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  item.isPositive
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    : 'bg-rose-50 text-rose-600 border border-rose-100'
                }`}
              >
                {item.isPositive ? (
                  <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <TrendingDown className="w-5 h-5 stroke-[2.5]" />
                )}
              </div>
            </div>

            {/* Price & Change */}
            <div className="space-y-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                  {item.price}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md font-mono ${
                    item.isPositive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {item.change}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Today</span>
              </div>
            </div>

            {/* High / Low / Prev Close Metrics */}
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Day High:</span>
                <span className="font-semibold text-slate-800">{item.high || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Day Low:</span>
                <span className="font-semibold text-slate-800">{item.low || '—'}</span>
              </div>
              {item.prevClose && (
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Prev Close:</span>
                  <span className="font-semibold text-slate-600">{item.prevClose}</span>
                </div>
              )}
            </div>

            {/* Trade / Invest Link */}
            <a
              href={FYERS_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/80 transition-colors group"
            >
              <span>Chart on FYERS Web</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
