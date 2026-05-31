import { describe, expect, it } from "vitest";

describe("Pag-IBIG Affordability Logic", () => {
	const calculateAffordability = (
		grossIncome: number,
		age: number,
		annualInterestRate: number,
	) => {
		// Rule 1: Max Term is 30 years, and age at maturity cannot exceed 70.
		const maxTermYears = Math.min(30, 70 - age);
		const n = maxTermYears * 12; // total months

		// Rule 2: Monthly amortization cannot exceed 35% of gross income
		const maxAmortization = grossIncome * 0.35;

		// If n <= 0, they can't take a loan (age >= 70)
		if (n <= 0) {
			return {
				maxLoanAmount: 0,
				maxAmortization: 0,
				maxTermYears: 0,
			};
		}

		// Rule 3: Calculate Present Value of Annuity
		const r = annualInterestRate / 100 / 12;

		let maxLoanAmount = maxAmortization * ((1 - (1 + r) ** -n) / r);

		// Rule 4: Capped at 6,000,000
		maxLoanAmount = Math.min(maxLoanAmount, 6000000);

		return {
			maxLoanAmount,
			maxAmortization,
			maxTermYears,
		};
	};

	it("should calculate correctly for 30k income at age 30 (6.25% rate)", () => {
		const result = calculateAffordability(30000, 30, 6.25);
		// Max Amortization: 30000 * 0.35 = 10500
		// Max Term: 30 years
		expect(result.maxAmortization).toBe(10500);
		expect(result.maxTermYears).toBe(30);
		expect(result.maxLoanAmount).toBeCloseTo(1705328, 0);
	});

	it("should cap loan amount at 6 million for high income", () => {
		const result = calculateAffordability(150000, 30, 6.25);
		expect(result.maxLoanAmount).toBe(6000000);
	});

	it("should restrict term based on age", () => {
		const result = calculateAffordability(30000, 50, 6.25);
		// 70 - 50 = 20 years
		expect(result.maxTermYears).toBe(20);
	});

	it("should return 0 if age is 70 or above", () => {
		const result = calculateAffordability(30000, 71, 6.25);
		expect(result.maxLoanAmount).toBe(0);
		expect(result.maxTermYears).toBe(0);
	});
});
