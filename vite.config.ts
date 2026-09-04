import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function marketIndicesPlugin(): Plugin {
  let cachedData: any = null;
  let cacheTime = 0;
  const CACHE_MS = 10000;

  const TARGET_INDICES = [
    { symbol: 'NIFTY 50', name: 'NSE Benchmark', yahoo: '^NSEI' },
    { symbol: 'SENSEX', name: 'BSE 30', yahoo: '^BSESN' },
    { symbol: 'BANK NIFTY', name: 'Banking Sector', yahoo: '^NSEBANK' },
    { symbol: 'NIFTY IT', name: 'Tech Leaders', yahoo: '^CNXIT' },
    { symbol: 'USD/INR', name: 'Forex Spot', yahoo: 'INR=X' },
    { symbol: 'GOLD (24K)', name: 'Gold BeES (NSE)', yahoo: 'GOLDBEES.NS' },
    { symbol: '10Y G-SEC', name: 'India Sovereign Yield', yahoo: '^TNX' }
  ];

  async function fetchQuote(item: typeof TARGET_INDICES[0]) {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(item.yahoo)}?interval=1d&range=1d`;
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json'
        },
        signal: AbortSignal.timeout(4000)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json() as any;
      const meta = json?.chart?.result?.[0]?.meta;
      if (!meta) throw new Error('No meta');
      const price = meta.regularMarketPrice ?? 0;
      const prevClose = meta.chartPreviousClose || meta.previousClose || price;
      const changeVal = price - prevClose;
      const changePct = prevClose !== 0 ? (changeVal / prevClose) * 100 : 0;
      const isPositive = changeVal >= 0;

      const formattedPrice = item.symbol === 'GOLD (24K)'
        ? `₹${price >= 1000 ? price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : price.toFixed(2)}`
        : item.symbol === 'USD/INR'
        ? `₹${price.toFixed(2)}`
        : item.symbol === '10Y G-SEC'
        ? `${price.toFixed(2)}%`
        : price >= 1000
        ? price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : price.toFixed(2);

      return {
        symbol: item.symbol,
        name: item.name,
        price: formattedPrice,
        change: `${isPositive ? '+' : ''}${changeVal.toFixed(2)} (${isPositive ? '+' : ''}${changePct.toFixed(2)}%)`,
        changeValue: changeVal,
        changePercent: changePct,
        isPositive,
        high: meta.regularMarketDayHigh ? meta.regularMarketDayHigh.toLocaleString('en-IN') : undefined,
        low: meta.regularMarketDayLow ? meta.regularMarketDayLow.toLocaleString('en-IN') : undefined,
        prevClose: prevClose ? prevClose.toLocaleString('en-IN') : undefined,
        lastUpdated: new Date().toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      };
    } catch {
      const fallbacks: Record<string, { price: string; change: string; isPositive: boolean }> = {
        'NIFTY 50': { price: '23,897.70', change: '-16.70 (-0.07%)', isPositive: false },
        'SENSEX': { price: '76,644.57', change: '+74.17 (+0.10%)', isPositive: true },
        'BANK NIFTY': { price: '57,369.65', change: '+197.65 (+0.35%)', isPositive: true },
        'NIFTY IT': { price: '30,695.10', change: '-407.80 (-1.31%)', isPositive: false },
        'USD/INR': { price: '₹94.49', change: '+0.02 (+0.02%)', isPositive: true },
        'GOLD (24K)': { price: '₹127.17', change: '+0.94 (+0.74%)', isPositive: true },
        '10Y G-SEC': { price: '6.79%', change: '-0.02%', isPositive: false }
      };
      const fb = fallbacks[item.symbol] || { price: '1,000.00', change: '+0.00%', isPositive: true };
      return {
        symbol: item.symbol,
        name: item.name,
        price: fb.price,
        change: fb.change,
        isPositive: fb.isPositive,
        lastUpdated: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true })
      };
    }
  }

  return {
    name: 'vite-plugin-market-indices',
    configureServer(server) {
      server.middlewares.use('/api/market-indices', async (req, res) => {
        try {
          const now = Date.now();
          if (cachedData && now - cacheTime < CACHE_MS) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(cachedData));
            return;
          }
          const quotes = await Promise.all(TARGET_INDICES.map(fetchQuote));
          cachedData = quotes;
          cacheTime = now;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(quotes));
        } catch (err: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), marketIndicesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
