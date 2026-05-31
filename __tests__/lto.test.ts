import { describe, expect, it } from "vitest";

describe("LTO Penalty Logic", () => {
	const mvuc = 240; // Motorcycle

	it("should calculate 50% penalty for less than 1 year late", () => {
		const monthsLate = 5;
		let penalty = 0;

		if (monthsLate <= 12) {
			penalty = mvuc * 0.5;
		}

		expect(penalty).toBe(120);
	});

	it("should calculate 100% penalty for 2 years late", () => {
		const monthsLate = 24; // 2 years
		let penalty = 0;

		if (monthsLate > 12) {
			const yearsLate = Math.ceil(monthsLate / 12); // 2
			penalty = mvuc * (0.5 * yearsLate); // 0.50 * 2 = 1.0
		}

		expect(penalty).toBe(240);
	});
});
