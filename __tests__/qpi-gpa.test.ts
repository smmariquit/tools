import { describe, expect, it } from "vitest";
import { calculateQPIGPA } from "../src/core/calculators/qPIGPA";

describe("QPI / GPA Logic", () => {
	it("should calculate weighted QPI correctly", () => {
		const res = calculateQPIGPA([
			{ grade: 4.0, units: 3 },
			{ grade: 3.5, units: 3 },
			{ grade: 3.0, units: 3 },
		]);
		// (12 + 10.5 + 9) / 9 = 3.5
		expect(res.qpi).toBe(3.5);
		expect(res.totalUnits).toBe(9);
	});

	it("should handle empty courses", () => {
		const res = calculateQPIGPA([]);
		expect(res.qpi).toBe(0);
		expect(res.totalUnits).toBe(0);
	});

	it("should handle different unit weights", () => {
		const res = calculateQPIGPA([
			{ grade: 4.0, units: 5 },
			{ grade: 2.0, units: 1 },
		]);
		// (20 + 2) / 6 = 3.667
		expect(res.qpi).toBe(3.667);
	});
});
