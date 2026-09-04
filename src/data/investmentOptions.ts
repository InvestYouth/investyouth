import { InvestmentOption } from '../types';

export const INVESTMENT_OPTIONS: InvestmentOption[] = [
  {
    id: 'nifty-index-funds',
    title: 'Nifty 50 Index Funds & ETFs',
    tagline: 'The Ultimate "Set-It-and-Forget-It" Vehicle for Young India',
    category: 'Funds',
    riskLevel: 'Moderate',
    expectedReturn: '12% - 14% CAGR',
    minAmount: '₹100 / month',
    timeHorizon: '5+ Years',
    description: 'Invest directly in India\'s top 50 corporate giants like Reliance, TCS, HDFC Bank, Infosys, and Tata Motors with a single automated click.',
    whyYouthLoveIt: 'Zero stress of picking individual stocks. Ultra-low expense ratios (<0.10%), meaning nearly 100% of the returns stay in your pocket.',
    popularExamples: ['UTI Nifty 50 Index Fund', 'Nifty BeES ETF', 'HDFC Nifty 50 Fund', 'Navi Nifty 50'],
    pros: [
      'Self-cleansing: poorly performing companies get automatically replaced',
      'No fund manager bias or hidden high commission fees',
      'Historically beats 80% of active mutual funds over a 10-year period'
    ],
    cons: [
      'Cannot generate 10x multibagger returns in a single year',
      'Subject to broad market market downturns during corrections'
    ],
    iconName: 'TrendingUp'
  },
  {
    id: 'direct-indian-equities',
    title: 'Direct Equity Stocks (NSE & BSE)',
    tagline: 'Become a Legal Co-Owner of India\'s Fastest Growing Businesses',
    category: 'Equity',
    riskLevel: 'High',
    expectedReturn: '15% - 22% CAGR (Skill dependent)',
    minAmount: '₹500 (Price of 1 share)',
    timeHorizon: '3 to 7+ Years',
    description: 'Hand-pick individual shares of companies you observe winning in the real economy—from consumer brands and EV players to IT exporters and defense tech.',
    whyYouthLoveIt: 'Gives you direct voting rights, company dividends directly into your bank, and the thrilling potential for 3x - 5x multibagger returns.',
    popularExamples: ['Tata Motors', 'Titan', 'Larsen & Toubro', 'Zomato', 'HCL Tech', 'State Bank of India'],
    pros: [
      'Maximum upside potential through high-conviction company research',
      'Zero ongoing fund management fees',
      'Eligible for corporate actions: bonus shares, stock splits, and dividends'
    ],
    cons: [
      'Requires continuous quarterly monitoring of company financial results',
      'Risk of individual company blunders or sectoral downturns'
    ],
    iconName: 'Building2'
  },
  {
    id: 'flexi-cap-mutual-funds',
    title: 'Flexi Cap & Small Cap Mutual Funds',
    tagline: 'Professional Managers Hunting Across Large, Mid & Small Companies',
    category: 'Funds',
    riskLevel: 'High',
    expectedReturn: '14% - 18% CAGR',
    minAmount: '₹500 / month',
    timeHorizon: '5 to 10 Years',
    description: 'Actively managed by seasoned SEBI registered portfolio managers who can freely allocate between India\'s agile mid-sized disruptors and stable large caps.',
    whyYouthLoveIt: 'Captures the raw entrepreneurial energy of emerging Indian market leaders while leaving rebalancing and sector rotation to institutional experts.',
    popularExamples: ['Parag Parikh Flexi Cap Fund', 'Nippon India Small Cap', 'Quant Flexi Cap', 'HDFC Flexi Cap'],
    pros: [
      'Dynamic agility across market conditions without capital gains tax on each rebalance',
      'High-alpha potential over long horizons',
      'Handled by research teams with direct access to company promoters'
    ],
    cons: [
      'Higher expense ratio (0.5% - 0.9% for Direct plans)',
      'Underperformance during market cycles if fund manager calls miss'
    ],
    iconName: 'PieChart'
  },
  {
    id: 'sovereign-gold-bonds',
    title: 'Sovereign Gold Bonds (SGB) & Gold ETFs',
    tagline: 'India\'s Favorite Precious Metal Powered by RBI with 2.5% Extra Yield',
    category: 'Safe & Gold',
    riskLevel: 'Low',
    expectedReturn: '9% - 12% CAGR + 2.5% Cash Interest',
    minAmount: '1 Gram of Gold (~₹7,200)',
    timeHorizon: '5 to 8 Years',
    description: 'Government of India backed security issued by the Reserve Bank of India. Eliminates making charges, purity fraud, and locker storage fees.',
    whyYouthLoveIt: 'Completely tax-free capital gains upon maturity! Plus the RBI pays an additional 2.5% per year simple interest directly to your savings bank account.',
    popularExamples: ['RBI Sovereign Gold Bond Tranches', 'GOLDBEES ETF', 'Nippon India Gold Savings'],
    pros: [
      '100% sovereign sovereign guarantee by the Govt of India',
      'No GST, no theft risk, no making deductions',
      'Provides a critical portfolio shock absorber when global equities pull back'
    ],
    cons: [
      'Secondary market liquidity can sometimes trade at slight discounts',
      '8-year lock-in for full tax-exemption (with premature exit window after 5 years)'
    ],
    iconName: 'Coins'
  },
  {
    id: 'reits-invits',
    title: 'Real Estate Investment Trusts (REITs)',
    tagline: 'Own Commercial Tech Parks in Mumbai, Bengaluru & Gurugram from ₹350',
    category: 'Alternative',
    riskLevel: 'Moderate',
    expectedReturn: '10% - 13% (Yield + Capital Growth)',
    minAmount: '₹350 (1 Unit)',
    timeHorizon: '3+ Years',
    description: 'SEBI regulated trusts that own prime grade-A office parks leased to Fortune 500 tech firms like Google, Microsoft, and Amazon. Legally mandated to distribute 90% of rental income to unitholders.',
    whyYouthLoveIt: 'Young Indians no longer need ₹1 Crore to enter real estate. You receive regular quarterly dividends directly in your bank account from commercial office rents.',
    popularExamples: ['Embassy Office Parks REIT', 'Nexus Select Trust (Retail Malls)', 'Mindspace Business Parks REIT', 'Brookfield India REIT'],
    pros: [
      'Quarterly cash flow distribution from prime Indian commercial leases',
      'Liquid: buy and sell on NSE/BSE app like any regular stock',
      'Hedge against inflation as commercial lease rents escalate by 10-15% every 3 years'
    ],
    cons: [
      'Interest rate sensitive',
      'Hybrid taxation rules across interest, dividend, and capital repayment components'
    ],
    iconName: 'Building'
  },
  {
    id: 'elss-tax-saver',
    title: 'ELSS Tax-Saving Mutual Funds',
    tagline: 'Save Up to ₹46,800 in Income Tax with Shortest 3-Year Lock-In',
    category: 'Funds',
    riskLevel: 'Moderate',
    expectedReturn: '13% - 16% CAGR',
    minAmount: '₹500 / month',
    timeHorizon: '3 Years (Shortest in 80C)',
    description: 'Equity Linked Savings Schemes offer tax deduction under Section 80C of the Indian Income Tax Act (up to ₹1.5 Lakhs) while putting your tax savings to work in compounding stocks.',
    whyYouthLoveIt: 'Unlike PPF (15-year lock-in) or Tax-Saving FD (5-year lock-in), ELSS unlocks after just 3 years, offering both high equity wealth and immediate tax savings for salaried youth.',
    popularExamples: ['Mirae Asset ELSS Tax Saver', 'Bandhan ELSS Tax Saver', 'DSP ELSS Fund'],
    pros: [
      'Shortest lock-in period among all 80C tax-saving financial instruments',
      'Higher historical return trajectory compared to PPF and National Savings Certificates',
      'Disciplined lock-in stops panic selling during temporary market corrections'
    ],
    cons: [
      'Mandatory 3-year lock-in for every monthly SIP installment',
      'Equity volatility applies over the initial 36 months'
    ],
    iconName: 'ShieldCheck'
  }
];
