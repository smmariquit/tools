import { describe, expect, it } from "vitest";
import {
	calculateGwa,
	calculateTargetAverage,
} from "../src/app/[locale]/gwa-calculator/gwaLogic";

describe("GWA Calculator Logic", () => {
	it("should calculate UP/PUP standard GWA correctly", () => {
		const subjects = [
			{ grade: 1.0, units: 3 }, // 3 points
			{ grade: 1.5, units: 3 }, // 4.5 points
			{ grade: 1.75, units: 3 }, // 5.25 points
		];
		// Total points: 12.75 / 9 units = 1.41666...
		const result = calculateGwa(subjects);
		expect(result.gwa).toBeCloseTo(1.4167, 4);
		expect(result.totalUnits).toBe(9);
	});

	it("should ignore subjects with 0 or empty units", () => {
		const subjects = [
			{ grade: 1.0, units: 3 },
			{ grade: 5.0, units: 0 }, // INC or dropped
		];
		const result = calculateGwa(subjects);
		expect(result.gwa).toBe(1.0);
		expect(result.totalUnits).toBe(3);
	});

	it("should return null if no valid units exist", () => {
		const result = calculateGwa([{ grade: 1.0, units: 0 }]);
		expect(result.gwa).toBeNull();
		expect(result.totalUnits).toBe(0);
	});
});

describe("Target GWA Logic", () => {
	it("should correctly calculate needed average for target GWA", () => {
		// Current: 15 units at 2.0 = 30 points
		// Target: 30 total units at 1.5 GWA = 45 points needed
		// Remaining units: 15. Needed points for remaining: 45 - 30 = 15 points
		// Needed average: 15 / 15 = 1.0
		const needed = calculateTargetAverage(15, 2.0, 15, 1.5);
		expect(needed).toBe(1.0);
	});

	it("should calculate a failing target", () => {
		// Current: 10 units at 1.0 = 10 points
		// Target: 20 total units at 2.0 = 40 points
		// Needed points: 30 for 10 units
		// Needed average: 30 / 10 = 3.0
		const needed = calculateTargetAverage(10, 1.0, 10, 2.0);
		expect(needed).toBe(3.0);
	});
});
