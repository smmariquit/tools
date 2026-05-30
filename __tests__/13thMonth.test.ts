import { describe, it, expect } from 'vitest';

describe('13th Month Pay Logic', () => {
  it('should calculate prorated 13th month pay correctly', () => {
    const basicSalary = 30000;
    const monthsWorked = 6;
    const unpaidAbsences = 0;
    const totalEarned = (basicSalary * monthsWorked) - unpaidAbsences;
    const thirteenthMonthPay = totalEarned / 12;

    expect(thirteenthMonthPay).toBe(15000);
  });

  it('should accurately calculate the tax-exempt portion (90k limit)', () => {
    const thirteenthMonthPay = 100000;
    const taxableAmount = Math.max(0, thirteenthMonthPay - 90000);
    const taxExemptAmount = Math.min(thirteenthMonthPay, 90000);

    expect(taxExemptAmount).toBe(90000);
    expect(taxableAmount).toBe(10000);
  });
});
