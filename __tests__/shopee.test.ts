import { describe, it, expect } from 'vitest';

describe('Ecommerce Fee Logic', () => {
  it('should calculate transaction and commission fees correctly without programs', () => {
    const itemPrice = 1000;
    const shippingFee = 50;
    const totalOrder = itemPrice + shippingFee;

    const transactionFee = totalOrder * 0.0224; // 1050 * 0.0224 = 23.52
    const commissionFee = itemPrice * 0.05; // 1000 * 0.05 = 50

    expect(transactionFee).toBe(23.52);
    expect(commissionFee).toBe(50);
    
    const netPayout = itemPrice - (transactionFee + commissionFee);
    expect(netPayout).toBe(926.48);
  });

  it('should include FSS and CCB program fees applied only to item price', () => {
    const itemPrice = 1000;
    const programFee = itemPrice * (0.056 + 0.0336); // 5.6% + 3.36% = 8.96% -> 89.6

    expect(programFee).toBeCloseTo(89.6, 2);
  });
});
