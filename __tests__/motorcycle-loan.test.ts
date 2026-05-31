import { describe, expect, it } from "vitest";
import { calculateMotorcycleLoan } from "../src/core/calculators/motorcycleLoan";

describe("Motorcycle Loan Logic", () => {
	it("should calculate straight add-on interest correctly", () => {
		const res = calculateMotorcycleLoan(100000, 20000, 36, 2);
		expect(res.amountFinanced).toBe(80000);
		expect(res.totalInterest).toBe(57600);
		expect(res.totalCost).toBe(157600); // 100k + 57.6k
		expect(res.monthlyAmortization).toBeCloseTo(3822.22, 2);
	});

	it("should handle edge case of 0 downpayment", () => {
		const res = calculateMotorcycleLoan(100000, 0, 12, 1.5);
		expect(res.amountFinanced).toBe(100000);
		expect(res.totalInterest).toBe(18000); // 1.5% * 12 = 18% of 100k
		expect(res.monthlyAmortization).toBe(118000 / 12);
	});
});
