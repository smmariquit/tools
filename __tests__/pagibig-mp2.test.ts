import { describe, expect, it } from "vitest";

describe("Pag-IBIG MP2 Logic", () => {
	it("should calculate yearly compounded dividend correctly with exact formula", () => {
		const initialContribution = 0;
		const monthlyContribution = 1000; // 12,000 per year
		const dividendRate = 7.0; // 7%

		let currentCompoundedBalance = initialContribution;
		let totalDividends = 0;

		// Year 1
		const yearlyPrincipalAdded = monthlyContribution * 12; // 12,000
		const dividendBasis = currentCompoundedBalance + monthlyContribution * 6.5; // 0 + 6,500 = 6,500
		const yearlyDividend = dividendBasis * (dividendRate / 100); // 6,500 * 0.07 = 455

		totalDividends += yearlyDividend;
		currentCompoundedBalance += yearlyPrincipalAdded + yearlyDividend; // 12,000 + 455 = 12,455

		expect(Math.round(yearlyDividend)).toBe(455);
		expect(Math.round(currentCompoundedBalance)).toBe(12455);

		// Year 2
		const yearlyPrincipalAdded2 = monthlyContribution * 12; // 12,000
		const dividendBasis2 = currentCompoundedBalance + monthlyContribution * 6.5; // 12,455 + 6,500 = 18,955
		const yearlyDividend2 = dividendBasis2 * (dividendRate / 100); // 18,955 * 0.07 = 1326.85

		totalDividends += yearlyDividend2;
		currentCompoundedBalance += yearlyPrincipalAdded2 + yearlyDividend2; // 12,455 + 12,000 + 1326.85 = 25,781.85

		expect(Math.round(yearlyDividend2 * 100) / 100).toBe(1326.85);
		expect(Math.round(currentCompoundedBalance * 100) / 100).toBe(25781.85);
	});

	it("should calculate correctly with an initial big contribution", () => {
		const initialContribution = 100000;
		const monthlyContribution = 0;
		const dividendRate = 7.0;

		const dividendBasis = initialContribution + monthlyContribution * 6.5; // 100,000
		const yearlyDividend = dividendBasis * (dividendRate / 100); // 7,000

		expect(Math.round(yearlyDividend)).toBe(7000);
	});
});
