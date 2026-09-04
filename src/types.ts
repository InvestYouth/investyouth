export type PageId = 'home' | 'calculators' | 'blog' | 'about';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: 'Fundamentals' | 'Mutual Funds' | 'Stock Market' | 'Student Finance' | 'Mindset & Risk';
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: string;
  tags: string[];
  keyTakeaway: string;
  content: {
    lead: string;
    sections: {
      heading: string;
      body: string;
      highlightBox?: string;
      stats?: { label: string; value: string }[];
    }[];
    actionSteps: string[];
  };
}

export interface InvestmentOption {
  id: string;
  title: string;
  tagline: string;
  category: 'Equity' | 'Funds' | 'Safe & Gold' | 'Alternative';
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  expectedReturn: string;
  minAmount: string;
  timeHorizon: string;
  description: string;
  whyYouthLoveIt: string;
  popularExamples: string[];
  pros: string[];
  cons: string[];
  iconName: string;
}

export interface YouthStory {
  id: string;
  name: string;
  age: number;
  location: string;
  role: string;
  avatar: string;
  startedAtAge: number;
  currentMilestone: string;
  monthlySip: string;
  quote: string;
  favoriteAsset: string;
  advice: string;
}

export interface MarketTickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  changeValue?: number;
  changePercent?: number;
  high?: string;
  low?: string;
  prevClose?: string;
  lastUpdated?: string;
}

export interface SIPCalculationResult {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
  breakdownYears: {
    year: number;
    invested: number;
    interestEarned: number;
    totalValue: number;
  }[];
}

export interface SWPCalculationResult {
  totalWithdrawn: number;
  finalCorpus: number;
  totalValueDelivered: number;
  depleted: boolean;
  depletedYear?: number;
  breakdownYears: {
    year: number;
    openingBalance: number;
    returnsGenerated: number;
    withdrawn: number;
    closingBalance: number;
  }[];
}
