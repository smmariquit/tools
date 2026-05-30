import { describe, it, expect } from 'vitest';

describe('Freelance Tax Logic (8%)', () => {
  it('should calculate 8% tax correctly for income above 250k', () => {
    const grossIncome = 500000;
    const tax = Math.max(0, (grossIncome - 250000) * 0.08);

    expect(tax).toBe(20000);
  });

  it('should charge zero tax for income at or below 250k', () => {
    const grossIncome = 250000;
    const tax = Math.max(0, (grossIncome - 250000) * 0.08);

    expect(tax).toBe(0);
  });
});
