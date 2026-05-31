import { describe, expect, it } from "vitest";
import { calculatePRCRating } from "../src/core/calculators/pRCBoardExamRating";

describe("PRC Board Exam Rating Logic", () => {
	it("should calculate CE board correctly", () => {
		const scores = { math: 80, hydro: 75, design: 70 };
		const res = calculatePRCRating("ce", scores);
		// (80*0.35) + (75*0.3) + (70*0.35) = 28 + 22.5 + 24.5 = 75
		expect(res.generalAverage).toBe(75);
		expect(res.passed).toBe(true);
	});

	it("should fail if one subject is below 50 for NLE", () => {
		const scores = { np1: 90, np2: 90, np3: 90, np4: 90, np5: 49 };
		const res = calculatePRCRating("nle", scores);
		expect(res.passed).toBe(false);
		expect(res.remarks).toContain("CONDITIONED");
	});

	it("should fail CPA if subject below 65", () => {
		const scores = { far: 80, afar: 80, ms: 80, aud: 80, tax: 80, rfbt: 64 };
		const res = calculatePRCRating("cpa", scores);
		expect(res.passed).toBe(false);
		expect(res.remarks).toContain("CONDITIONED");
	});
});
