import { describe, expect, it } from "vitest";
import { calculateSeparationPay } from "../src/core/calculators/separationPay";

describe("Separation Pay Logic", () => {
	it("should calculate 1 month pay minimum", () => {
		// Even for 1 year, redundancy (1 mo) = 25000
		const res = calculateSeparationPay(
			25000,
			"2024-01-01",
			"2025-01-01",
			"redundancy",
		);
		expect(res.totalPay).toBe(25000);

		// For retrenchment (0.5 mo), 1 year = 12500, but minimum is 1 month pay!
		const res2 = calculateSeparationPay(
			25000,
			"2024-01-01",
			"2025-01-01",
			"retrenchment",
		);
		expect(res2.totalPay).toBe(25000);
	});

	it("should round up fraction of 6 months to 1 year", () => {
		const res = calculateSeparationPay(
			25000,
			"2024-01-01",
			"2024-07-01",
			"redundancy",
		);
		// Exactly 6 months
		expect(res.yearsOfService).toBe(1);
	});

	it("should not round up if fraction is less than 6 months", () => {
		const res = calculateSeparationPay(
			25000,
			"2024-01-01",
			"2024-06-15",
			"redundancy",
		);
		// 5 months and 14 days
		expect(res.yearsOfService).toBe(0);
		expect(res.totalPay).toBe(0);
	});

	it("should apply correct multiplier for redundancy vs retrenchment", () => {
		// 2 years of service
		const res = calculateSeparationPay(
			25000,
			"2022-01-01",
			"2024-01-01",
			"redundancy",
		);
		expect(res.multiplier).toBe(1);
		expect(res.totalPay).toBe(50000);

		const res2 = calculateSeparationPay(
			25000,
			"2022-01-01",
			"2024-01-01",
			"retrenchment",
		);
		expect(res2.multiplier).toBe(0.5);
		expect(res2.totalPay).toBe(25000); // Because 25000 >= 25000 min
	});
});
