import { describe, expect, it } from "vitest";
import { calculateAgeExact } from "../src/core/calculators/dFAAge";

describe("DFA Age Logic", () => {
	it("should calculate exact age accurately", () => {
		const res = calculateAgeExact("2000-01-15", "2026-05-31");
		expect(res.years).toBe(26);
		expect(res.months).toBe(4);
		expect(res.days).toBe(16);
		expect(res.isMinor).toBe(false);
		expect(res.isSenior).toBe(false);
		expect(res.prcEligible).toBe(true);
	});

	it("should identify a minor correctly", () => {
		const res = calculateAgeExact("2010-06-01", "2026-05-31");
		expect(res.years).toBe(15);
		expect(res.months).toBe(11);
		expect(res.days).toBe(30);
		expect(res.isMinor).toBe(true);
		expect(res.prcEligible).toBe(false);
	});

	it("should handle leap years correctly", () => {
		const res = calculateAgeExact("2004-02-29", "2026-02-28");
		expect(res.years).toBe(21);
		expect(res.months).toBe(11);
		expect(res.days).toBe(30);
	});
});
