import { describe, expect, it } from "vitest";
import { calculateThirteenthMonth } from "../src/core/calculators/thirteenthMonth";

describe("13th Month Pay Logic", () => {
	it("should calculate correctly for full year", () => {
		const result = calculateThirteenthMonth(30000, 12, 0);
		expect(result.thirteenthMonthPay).toBe(30000);
		expect(result.taxExemptAmount).toBe(30000);
		expect(result.taxableAmount).toBe(0);
	});

	it("should prorate for partial year", () => {
		const result = calculateThirteenthMonth(30000, 6, 0);
		expect(result.thirteenthMonthPay).toBe(15000);
	});

	it("should deduct unpaid absences", () => {
		const result = calculateThirteenthMonth(30000, 12, 5000);
		expect(result.thirteenthMonthPay).toBe((360000 - 5000) / 12);
	});

	it("should tax amounts over 90,000", () => {
		const result = calculateThirteenthMonth(100000, 12, 0);
		expect(result.thirteenthMonthPay).toBe(100000);
		expect(result.taxExemptAmount).toBe(90000);
		expect(result.taxableAmount).toBe(10000);
	});
});
