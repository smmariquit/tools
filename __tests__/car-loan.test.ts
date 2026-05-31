import { describe, expect, it } from "vitest";

describe("Car Loan Amortization Logic", () => {
	it("should compute exact monthly amortization for a car loan", () => {
		const carPrice = 1000000;
		const downpaymentPercent = 0.2; // 20%
		const downpayment = carPrice * downpaymentPercent; // 200,000
		const loanAmount = carPrice - downpayment; // 800,000

		const annualRate = 0.08; // 8%
		const monthlyRate = annualRate / 12;
		const termsInMonths = 60; // 5 years

		// Amortization Formula: P * (r / (1 - (1 + r)^-n))
		const amortization =
			loanAmount * (monthlyRate / (1 - (1 + monthlyRate) ** -termsInMonths));

		expect(downpayment).toBe(200000);
		expect(loanAmount).toBe(800000);

		// Expected around 16,221.12
		expect(Math.round(amortization * 100) / 100).toBe(16221.12);
	});

	it("should compute total interest paid over the life of the loan", () => {
		const loanAmount = 800000;
		const monthlyAmortization = 16221.12;
		const termsInMonths = 60;

		const totalPaid = monthlyAmortization * termsInMonths; // 973,267.20
		const totalInterest = totalPaid - loanAmount; // 173,267.20

		expect(Math.round(totalInterest * 100) / 100).toBe(173267.2);
	});
});
