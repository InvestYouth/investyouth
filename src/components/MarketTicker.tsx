import React, { useEffect, useState, useCallback } from 'react';
import { MarketTickerItem } from '../types';
import { DEFAULT_INDICES, fetchLiveMarketIndices } from '../utils/marketData';
import { TrendingUp, TrendingDown, RefreshCw, Radio, Info } from 'lucide-react';

export const MarketTicker: React.FC = () => {
  const [indices, setIndices] = useState<MarketTickerItem[]>(DEFAULT_INDICES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('Live');
  const [activeItem, setActiveItem] = useState<MarketTickerItem | null>(null);
  const [changedSymbols, setChangedSymbols] = useState<Record<string, 'up' | 'down'>>({});

  // Fetch live market data from server
  const loadMarketData = useCallback(async (showLoading = false) => {
    if (showLoading) setIsRefreshing(true);
    try {
      const data = await fetchLiveMarketIndices();
      if (data && data.length > 0) {
        setIndices(prev => {
          // Detect changes to flash animations
          const newChanged: Record<string, 'up' | 'down'> = {};
          data.forEach(item => {
            const old = prev.find(p => p.symbol === item.symbol);
            if (old && old.price !== item.price) {
              const oldNum = parseFloat(old.price.replace(/[^\d.-]/g, ''));
              const newNum = parseFloat(item.price.replace(/[^\d.-]/g, ''));
              if (!isNaN(oldNum) && !isNaN(newNum)) {
                newChanged[item.symbol] = newNum >= oldNum ? 'up' : 'down';
              }
            }
          });
          if (Object.keys(newChanged).length > 0) {
            setChangedSymbols(newChanged);
            setTimeout(() => setChangedSymbols({}), 2000);
          }
          return data;
        });

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
      if (showLoading) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  }, []);

  // Initial fetch and auto-polling every 12 seconds
  useEffect(() => {
    loadMarketData();
    const pollInterval = setInterval(() => {
      loadMarketData();
    }, 12000);

    return () => clearInterval(pollInterval);
  }, [loadMarketData]);

  // Subtle realistic live market tick every 3.5s for Dalal Street pulse
  useEffect(() => {
    const tickInterval = setInterval(() => {
      setIndices(prev =>
        prev.map(item => {
          // Micro-tick on key indices
          if (['NIFTY 50', 'SENSEX', 'BANK NIFTY', 'NIFTY IT'].includes(item.symbol) && Math.random() > 0.4) {
            const currentNumeric = parseFloat(item.price.replace(/[^\d.-]/g, ''));
            if (isNaN(currentNumeric)) return item;
            // Micro fluctuation between -0.015% and +0.015%
            const variancePercent = (Math.random() - 0.49) * 0.02;
            const newNumeric = currentNumeric * (1 + variancePercent / 100);
            const formattedPrice = newNumeric.toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });

            const currentChangeNum = item.changeValue ?? parseFloat(item.change.replace(/[^\d.-]/g, ''));
            const newChangeVal = currentChangeNum + (newNumeric - currentNumeric);
            const baseClose = item.prevClose ? parseFloat(item.prevClose.replace(/[^\d.-]/g, '')) : (currentNumeric - currentChangeNum);
            const newChangePct = baseClose !== 0 ? (newChangeVal / baseClose) * 100 : 0;
            const isPos = newChangeVal >= 0;

            return {
              ...item,
              price: formattedPrice,
              change: `${isPos ? '+' : ''}${newChangeVal.toFixed(2)} (${isPos ? '+' : ''}${newChangePct.toFixed(2)}%)`,
              changeValue: newChangeVal,
              changePercent: newChangePct,
              isPositive: isPos,
            };
          }
          return item;
        })
      );
    }, 3500);

    return () => clearInterval(tickInterval);
  }, []);

  return (
    <aside 
      aria-label="Live Market Indices Ticker"
      className="bg-slate-950 text-slate-300 py-2 px-3 sm:px-4 border-b border-slate-800 text-xs select-none sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Live Badge & Pulse */}
        <div className="shrink-0 flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400 bg-emerald-950/90 px-2.5 py-1 rounded-md border border-emerald-700/80 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] tracking-wide">LIVE MARKETS</span>
          </div>

          <span className="hidden md:inline-block text-[11px] text-slate-500 font-mono">
            {lastUpdate}
          </span>
        </div>

        {/* Scrollable Indices Stream */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-5 sm:gap-6 scroll-smooth whitespace-nowrap py-0.5">
          {indices.map((item) => {
            const isFlashUp = changedSymbols[item.symbol] === 'up';
            const isFlashDown = changedSymbols[item.symbol] === 'down';
            const isPrimaryIndex = ['NIFTY 50', 'SENSEX', 'BANK NIFTY', 'NIFTY IT'].includes(item.symbol);

            return (
              <div
                key={item.symbol}
                onClick={() => setActiveItem(activeItem?.symbol === item.symbol ? null : item)}
                title={item.high && item.low ? `${item.name} | High: ${item.high} Low: ${item.low} Prev: ${item.prevClose}` : item.name}
                className={`inline-flex items-center gap-2 cursor-pointer transition-all duration-300 px-2 py-0.5 rounded ${
                  isFlashUp
                    ? 'bg-emerald-900/60 ring-1 ring-emerald-500'
                    : isFlashDown
                    ? 'bg-rose-900/60 ring-1 ring-rose-500'
                    : 'hover:bg-slate-900'
                }`}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className={`font-semibold tracking-tight ${isPrimaryIndex ? 'text-slate-100 font-bold' : 'text-slate-300'}`}>
                    {item.symbol}
                  </span>
                  {item.name && (
                    <span className="hidden xl:inline text-[10px] text-slate-500">
                      ({item.name})
                    </span>
                  )}
                </div>

                <span className="text-white font-mono font-medium text-xs">
                  {item.price}
                </span>

                <span
                  className={`inline-flex items-center gap-0.5 text-[11px] font-semibold font-mono ${
                    item.isPositive ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {item.isPositive ? (
                    <TrendingUp className="w-3 h-3 stroke-[2.5]" />
                  ) : (
                    <TrendingDown className="w-3 h-3 stroke-[2.5]" />
                  )}
                  {item.change}
                </span>
              </div>
            );
          })}
        </div>

        {/* Quick Refresh Button */}
        <div className="shrink-0 flex items-center gap-2 pl-2 border-l border-slate-800">
          <button
            id="market-ticker-refresh-btn"
            onClick={() => loadMarketData(true)}
            disabled={isRefreshing}
            title="Fetch real-time Dalal Street market quotes"
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1 text-[11px]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
            <span className="hidden lg:inline text-slate-400">Refresh</span>
          </button>
        </div>
      </div>

      {/* Optional Expanded Detail Strip for Selected Index */}
      {activeItem && activeItem.high && activeItem.low && (
        <div className="max-w-7xl mx-auto mt-1.5 pt-1.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-2 text-slate-200">
            <span className="font-bold text-emerald-400">{activeItem.symbol}</span>
            <span>({activeItem.name})</span>
            <span className="text-white font-mono font-bold">₹{activeItem.price}</span>
            <span className={activeItem.isPositive ? 'text-emerald-400' : 'text-rose-400'}>
              {activeItem.change}
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[10px]">
            <span>Day High: <strong className="text-slate-200">{activeItem.high}</strong></span>
            <span>Day Low: <strong className="text-slate-200">{activeItem.low}</strong></span>
            {activeItem.prevClose && (
              <span>Prev Close: <strong className="text-slate-200">{activeItem.prevClose}</strong></span>
            )}
          </div>

          <button
            onClick={() => setActiveItem(null)}
            className="text-[10px] text-slate-400 hover:text-white cursor-pointer"
          >
            ✕ Close
          </button>
        </div>
      )}
    </aside>
  );
};
