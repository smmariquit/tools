import { describe, expect, it } from "vitest";

describe("Home Loan Amortization Logic", () => {
	it("should compute exact monthly amortization for a housing loan", () => {
		const propertyPrice = 3000000;
		const downpaymentPercent = 0.2; // 20%
		const downpayment = propertyPrice * downpaymentPercent; // 600,000
		const loanAmount = propertyPrice - downpayment; // 2,400,000

		const annualRate = 0.07; // 7% fixed
		const monthlyRate = annualRate / 12;
		const termsInMonths = 240; // 20 years

		// Amortization Formula: P * (r / (1 - (1 + r)^-n))
		const amortization =
			loanAmount * (monthlyRate / (1 - (1 + monthlyRate) ** -termsInMonths));

		expect(downpayment).toBe(600000);
		expect(loanAmount).toBe(2400000);

		// Expected around 18,607.17
		expect(Math.round(amortization * 100) / 100).toBe(18607.17);
	});
});
