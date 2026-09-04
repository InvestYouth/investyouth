import { MarketTickerItem } from '../types';

export const DEFAULT_INDICES: MarketTickerItem[] = [
  { 
    symbol: 'NIFTY 50', 
    name: 'NSE Benchmark', 
    price: '23,897.70', 
    change: '-16.70 (-0.07%)', 
    isPositive: false,
    changeValue: -16.70,
    changePercent: -0.07,
    high: '24,005.75',
    low: '23,895.85',
    prevClose: '23,914.40'
  },
  { 
    symbol: 'SENSEX', 
    name: 'BSE 30', 
    price: '76,644.57', 
    change: '+74.17 (+0.10%)', 
    isPositive: true,
    changeValue: 74.17,
    changePercent: 0.10,
    high: '76,883.14',
    low: '76,529.50',
    prevClose: '76,570.40'
  },
  { 
    symbol: 'BANK NIFTY', 
    name: 'Banking Sector', 
    price: '57,369.65', 
    change: '+197.65 (+0.35%)', 
    isPositive: true,
    changeValue: 197.65,
    changePercent: 0.35,
    high: '57,677.15',
    low: '57,324.55',
    prevClose: '57,172.00'
  },
  { 
    symbol: 'NIFTY IT', 
    name: 'Tech Leaders', 
    price: '30,695.10', 
    change: '-407.80 (-1.31%)', 
    isPositive: false,
    changeValue: -407.80,
    changePercent: -1.31,
    high: '31,263.20',
    low: '30,656.70',
    prevClose: '31,102.90'
  },
  { 
    symbol: 'USD/INR', 
    name: 'Forex Spot', 
    price: '94.49', 
    change: '+0.02 (+0.02%)', 
    isPositive: true,
    changeValue: 0.02,
    changePercent: 0.02,
    high: '94.52',
    low: '94.43',
    prevClose: '94.47'
  },
  { 
    symbol: 'GOLD (24K)', 
    name: 'Gold BeES (NSE)', 
    price: '₹127.17', 
    change: '+0.94 (+0.74%)', 
    isPositive: true,
    changeValue: 0.94,
    changePercent: 0.74,
    high: '127.72',
    low: '126.78',
    prevClose: '126.23'
  },
  { 
    symbol: '10Y G-SEC', 
    name: 'India Sovereign Yield', 
    price: '6.79%', 
    change: '-0.02%', 
    isPositive: false 
  },
  { 
    symbol: 'NIFTY SMALLCAP', 
    name: 'Smallcap 100', 
    price: '18,450.25', 
    change: '+142.30 (+0.78%)', 
    isPositive: true 
  }
];

export async function fetchLiveMarketIndices(): Promise<MarketTickerItem[] | null> {
  try {
    const res = await fetch('/api/market-indices', {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch indices: ${res.status}`);
    }
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return null;
  } catch (err) {
    console.warn('Live indices fetch note:', err);
    return null;
  }
}
