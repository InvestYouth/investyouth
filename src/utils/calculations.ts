import { SIPCalculationResult, SWPCalculationResult } from '../types';

export const FYERS_AFFILIATE_URL = 'https://fyers.onelink.me/cj1P/k30vvtcd';

/**
 * Formats a number to Indian Rupee representation (e.g. ₹ 1,50,000 or ₹ 1.25 Cr)
 */
export function formatINR(amount: number, compact: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  
  const rounded = Math.round(amount);

  if (compact) {
    if (rounded >= 10000000) {
      return `₹${(rounded / 10000000).toFixed(2)} Cr`;
    }
    if (rounded >= 100000) {
      return `₹${(rounded / 100000).toFixed(2)} Lakh`;
    }
    if (rounded >= 1000) {
      return `₹${(rounded / 1000).toFixed(1)}k`;
    }
    return `₹${rounded}`;
  }

  // Standard Indian comma separator format: 1,00,00,000
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rounded);
}

/**
 * Calculates Systematic Investment Plan (SIP)
 * Supports optional annual step-up percentage (e.g. 10% increase every year)
 */
export function calculateSIP(
  monthlyInvestment: number,
  expectedReturnRate: number,
  tenureYears: number,
  annualStepUpPercent: number = 0
): SIPCalculationResult {
  const monthlyRate = expectedReturnRate / 12 / 100;
  const breakdownYears = [];

  let currentMonthlyInvestment = monthlyInvestment;
  let totalInvested = 0;
  let runningTotalValue = 0;

  for (let year = 1; year <= tenureYears; year++) {
    let yearInvested = 0;
    
    for (let month = 1; month <= 12; month++) {
      yearInvested += currentMonthlyInvestment;
      totalInvested += currentMonthlyInvestment;
      // Compounding: existing value grows plus the new installment at beginning of month
      runningTotalValue = (runningTotalValue + currentMonthlyInvestment) * (1 + monthlyRate);
    }

    const interestEarned = Math.max(0, runningTotalValue - totalInvested);

    breakdownYears.push({
      year,
      invested: Math.round(totalInvested),
      interestEarned: Math.round(interestEarned),
      totalValue: Math.round(runningTotalValue),
    });

    if (annualStepUpPercent > 0) {
      currentMonthlyInvestment = currentMonthlyInvestment * (1 + annualStepUpPercent / 100);
    }
  }

  const finalTotalValue = Math.round(runningTotalValue);
  const estimatedReturns = Math.round(Math.max(0, finalTotalValue - totalInvested));

  return {
    investedAmount: Math.round(totalInvested),
    estimatedReturns,
    totalValue: finalTotalValue,
    breakdownYears,
  };
}

/**
 * Calculates Systematic Withdrawal Plan (SWP)
 * Uses the standard annualized effective monthly compounding rate:
 * (1 + monthlyRate)^12 = 1 + expectedReturnRate / 100
 * => monthlyRate = (1 + expectedReturnRate / 100)^(1/12) - 1
 * This aligns with Groww, ClearTax, and Indian mutual fund SWP calculators.
 */
export function calculateSWP(
  initialCorpus: number,
  monthlyWithdrawal: number,
  expectedReturnRate: number,
  tenureYears: number
): SWPCalculationResult {
  const effectiveAnnualRate = Math.max(0, expectedReturnRate);
  const monthlyRate =
    effectiveAnnualRate > 0 ? Math.pow(1 + effectiveAnnualRate / 100, 1 / 12) - 1 : 0;
  const breakdownYears = [];

  let currentBalance = initialCorpus;
  let totalWithdrawn = 0;
  let depleted = false;
  let depletedYear: number | undefined = undefined;

  for (let year = 1; year <= tenureYears; year++) {
    const openingBalance = Math.round(currentBalance);
    let yearReturns = 0;
    let yearWithdrawn = 0;

    for (let month = 1; month <= 12; month++) {
      if (currentBalance <= 0) {
        if (!depleted) {
          depleted = true;
          depletedYear = year;
        }
        currentBalance = 0;
        break;
      }

      const interest = currentBalance * monthlyRate;
      yearReturns += interest;
      currentBalance += interest;

      if (currentBalance >= monthlyWithdrawal) {
        currentBalance -= monthlyWithdrawal;
        yearWithdrawn += monthlyWithdrawal;
        totalWithdrawn += monthlyWithdrawal;
      } else {
        // Partial withdrawal before depletion
        yearWithdrawn += currentBalance;
        totalWithdrawn += currentBalance;
        currentBalance = 0;
        if (!depleted) {
          depleted = true;
          depletedYear = year;
        }
      }
    }

    breakdownYears.push({
      year,
      openingBalance,
      returnsGenerated: Math.round(yearReturns),
      withdrawn: Math.round(yearWithdrawn),
      closingBalance: Math.round(currentBalance),
    });
  }

  return {
    totalWithdrawn: Math.round(totalWithdrawn),
    finalCorpus: Math.round(currentBalance),
    totalValueDelivered: Math.round(totalWithdrawn + currentBalance),
    depleted,
    depletedYear,
    breakdownYears,
  };
}
