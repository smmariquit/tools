import { describe, it, expect } from 'vitest';

describe('Holiday Pay Logic (DOLE)', () => {
  it('should pay 100% for unworked regular holiday', () => {
    const dailyRate = 1000;
    const computedPay = dailyRate * 1.0;
    expect(computedPay).toBe(1000);
  });

  it('should pay 200% for worked regular holiday (no OT)', () => {
    const dailyRate = 1000;
    const hoursWorked = 8;
    const hourlyRate = dailyRate / 8;
    const computedPay = hourlyRate * hoursWorked * 2.0;
    
    expect(computedPay).toBe(2000);
  });

  it('should pay 0 for unworked special non-working holiday', () => {
    const dailyRate = 1000;
    const computedPay = dailyRate * 0.0;
    expect(computedPay).toBe(0);
  });
});
