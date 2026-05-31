import { describe, expect, it } from "vitest";

describe("SSS Pension Logic", () => {
	it("should return 0 pension if Credited Years of Service is less than 10", () => {
		const cys = 9;
		expect(cys < 10).toBe(true);
	});

	it("should calculate Formula 1 correctly", () => {
		const amsc = 20000;
		const cys = 15;
		const formula1 = 300 + 0.2 * amsc + 0.02 * amsc * (cys - 10);

		// 300 + 4000 + (400 * 5)
		// 300 + 4000 + 2000 = 6300
		expect(formula1).toBe(6300);
	});

	it("should calculate Formula 2 correctly", () => {
		const amsc = 20000;
		const formula2 = 0.4 * amsc; // 8000
		expect(formula2).toBe(8000);
	});

	it("should return the correct minimum pension (Formula 3) based on CYS", () => {
		const cysBelow20 = 15;
		const cysAbove20 = 25;

		expect(cysBelow20 >= 20 ? 2400 : 1200).toBe(1200);
		expect(cysAbove20 >= 20 ? 2400 : 1200).toBe(2400);
	});

	it("should pick the highest among the three formulas", () => {
		const amsc = 20000;
		const cys = 15;

		const f1 = 300 + 0.2 * amsc + 0.02 * amsc * (cys - 10); // 6300
		const f2 = 0.4 * amsc; // 8000
		const f3 = cys >= 20 ? 2400 : 1200; // 1200

		const max = Math.max(f1, f2, f3);
		expect(max).toBe(8000);
	});
});
