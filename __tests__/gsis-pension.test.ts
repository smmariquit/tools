import { describe, expect, it } from "vitest";
import { calculateGSISPension } from "../src/core/calculators/gSISPension";

describe("GSIS Pension Logic", () => {
	it("should return 0 if less than 15 years of service", () => {
		const res = calculateGSISPension(30000, 14);
		expect(res.bmp).toBe(0);
	});

	it("should calculate correctly for basic scenario", () => {
		const res = calculateGSISPension(30000, 20);
		// 0.025 * 30000 * 20 = 15000
		expect(res.bmp).toBe(15000);
	});

	it("should cap at 90% of AMC", () => {
		const res = calculateGSISPension(30000, 40);
		// 0.025 * 30000 * 40 = 30000, but cap is 30000 * 0.9 = 27000
		expect(res.bmp).toBe(27000);
	});

	it("should enforce minimum 5000 BMP", () => {
		const res = calculateGSISPension(10000, 15);
		// 0.025 * 10000 * 15 = 3750, min is 5000
		expect(res.bmp).toBe(5000);
	});
});
