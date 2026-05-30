import { describe, it, expect } from 'vitest';

describe('Amilyar (RPT) Logic', () => {
  it('should correctly compute residential RPT in Metro Manila', () => {
    const marketValue = 2000000;
    const assessmentLevel = 0.20; // Residential
    const rptRate = 0.02; // Metro Manila
    const sefRate = 0.01;

    const assessedValue = marketValue * assessmentLevel;
    const basicRpt = assessedValue * rptRate;
    const sefTax = assessedValue * sefRate;
    const totalAmilyar = basicRpt + sefTax;

    expect(assessedValue).toBe(400000);
    expect(basicRpt).toBe(8000);
    expect(sefTax).toBe(4000);
    expect(totalAmilyar).toBe(12000);
  });

  it('should correctly compute commercial RPT in the province', () => {
    const marketValue = 2000000;
    const assessmentLevel = 0.50; // Commercial
    const rptRate = 0.01; // Province
    const sefRate = 0.01;

    const assessedValue = marketValue * assessmentLevel;
    const basicRpt = assessedValue * rptRate;
    const sefTax = assessedValue * sefRate;
    const totalAmilyar = basicRpt + sefTax;

    expect(assessedValue).toBe(1000000);
    expect(basicRpt).toBe(10000);
    expect(sefTax).toBe(10000);
    expect(totalAmilyar).toBe(20000);
  });
});
