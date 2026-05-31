import { describe, expect, it } from "vitest";
import { calculateSSSMaternity } from "../src/core/calculators/sssMaternity";

describe("SSS Maternity Logic", () => {
	it("should calculate max benefit for normal delivery", () => {
		const result = calculateSSSMaternity(50000, "normal");
		expect(result.cappedMsc).toBe(30000);
		expect(result.adsc).toBe(1000);
		expect(result.days).toBe(105);
		expect(result.benefit).toBe(105000);
	});

	it("should calculate max benefit for solo parent", () => {
		const result = calculateSSSMaternity(50000, "solo-parent");
		expect(result.benefit).toBe(120000);
	});

	it("should calculate lower benefit for lower salary", () => {
		const result = calculateSSSMaternity(20000, "normal");
		expect(result.cappedMsc).toBe(20000);
		// adsc = 20000 * 6 / 180 = 666.666
		expect(result.benefit).toBeCloseTo(69999.99, 1);
	});

	it("should calculate correctly for miscarriage", () => {
		const result = calculateSSSMaternity(30000, "miscarriage");
		expect(result.benefit).toBe(60000);
	});
});
