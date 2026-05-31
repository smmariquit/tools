import { describe, expect, it } from "vitest";

describe("Digital Bank Interest Logic", () => {
	it("should calculate monthly gross interest and net interest correctly", () => {
		const initialDeposit = 10000;
		const annualRate = 4.5; // 4.5%

		const monthlyGrossInterest = initialDeposit * (annualRate / 100 / 12);
		const tax = monthlyGrossInterest * 0.2;
		const netInterest = monthlyGrossInterest - tax;

		expect(monthlyGrossInterest).toBe(37.5);
		expect(tax).toBe(7.5);
		expect(netInterest).toBe(30);
	});

	it("should compute compounded growth over a year with monthly deposits", () => {
		let balance = 10000;
		const monthlyAddition = 2000;
		const annualRate = 5.0; // 5%

		let grossInterestTotal = 0;
		let taxTotal = 0;

		for (let m = 1; m <= 12; m++) {
			const grossInterest = balance * (annualRate / 100 / 12);
			const tax = grossInterest * 0.2;
			const netInterest = grossInterest - tax;

			balance += netInterest + monthlyAddition;
			grossInterestTotal += grossInterest;
			taxTotal += tax;
		}

		// Total Deposited = 10k + (2k * 12) = 34k
		// Expected net interest on this schedule is roughly around 855 PHP

		expect(Math.round(balance)).toBe(34852); // Rounded to nearest peso
	});
});
