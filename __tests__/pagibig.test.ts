import { describe, expect, it } from "vitest";

describe("Pag-IBIG & MP2 Logic", () => {
	it("should calculate mandatory Pag-IBIG contributions correctly with 10k MFS cap", () => {
		const basicSalary = 30000;
		const maxFundSalary = 10000;
		const applicableSalary = Math.min(basicSalary, maxFundSalary);

		const regularEE = applicableSalary * 0.02;
		const regularER = applicableSalary * 0.02;

		expect(regularEE).toBe(200);
		expect(regularER).toBe(200);
	});

	it("should calculate MP2 compound interest correctly for 1 year", () => {
		const mp2Monthly = 1000;
		const dividendRate = 7;
		const rate = dividendRate / 100;

		let cumulativeSavings = 0;
		const annualDeposit = mp2Monthly * 12; // 12000

		// Year 1
		cumulativeSavings += annualDeposit; // 12000
		// Half interest on first year's deposits
		const yearlyDividend = (cumulativeSavings - annualDeposit / 2) * rate;
		// 6000 * 0.07 = 420

		expect(yearlyDividend).toBeCloseTo(420, 2);
	});
});
