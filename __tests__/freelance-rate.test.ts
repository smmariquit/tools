import { describe, expect, it } from "vitest";
import { calculateFreelanceRate } from "../src/core/calculators/freelanceRate";

describe("Freelance Hourly Rate Logic", () => {
	it("should calculate correctly for gross above 250k", () => {
		const result = calculateFreelanceRate(50000, 5000, 40, 20); // 4 weeks vacation
		// Net = 600k, Expenses = 60k
		// Gross = (660k - 20k) / 0.92 = 695652.17
		expect(result.grossAnnual).toBeCloseTo(695652.17, 1);

		// 52 - 4 = 48 weeks * 40 = 1920 hours
		expect(result.billableHoursPerYear).toBe(1920);

		// PHP rate = 695652.17 / 1920 = 362.31
		expect(result.hourlyRatePhp).toBeCloseTo(362.31, 1);
	});

	it("should calculate correctly for gross below 250k", () => {
		const result = calculateFreelanceRate(15000, 2000, 20, 0);
		// Net = 180k, Expenses = 24k -> Gross = 204k (No tax)
		expect(result.grossAnnual).toBe(204000);
		expect(result.hourlyRatePhp).toBe(204000 / (52 * 20));
	});
});
