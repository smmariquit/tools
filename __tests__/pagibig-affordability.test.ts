import { describe, expect, it } from "vitest";
import { calculatePagibigAffordability } from "../src/core/calculators/pagibigAffordability";

describe("Pag-IBIG Affordability Logic", () => {
	it("should calculate correctly for 30k income at age 30 (6.25% rate)", () => {
		const result = calculatePagibigAffordability(30000, 30, 6.25);
		// Max Amortization: 30000 * 0.35 = 10500
		// Max Term: 30 years
		expect(result.maxAmortization).toBe(10500);
		expect(result.maxTermYears).toBe(30);
		expect(result.maxLoanAmount).toBeCloseTo(1705328, 0);
	});

	it("should cap loan amount at 6 million for high income", () => {
		const result = calculatePagibigAffordability(150000, 30, 6.25);
		expect(result.maxLoanAmount).toBe(6000000);
	});

	it("should restrict term based on age", () => {
		const result = calculatePagibigAffordability(30000, 50, 6.25);
		// 70 - 50 = 20 years
		expect(result.maxTermYears).toBe(20);
	});

	it("should return 0 if age is 70 or above", () => {
		const result = calculatePagibigAffordability(30000, 71, 6.25);
		expect(result.maxLoanAmount).toBe(0);
		expect(result.maxTermYears).toBe(0);
	});
});
