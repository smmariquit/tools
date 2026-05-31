import { describe, expect, it } from "vitest";

describe("BPO Night Differential Logic", () => {
	it("should calculate the 10% night differential premium correctly", () => {
		const hourlyRate = 150;
		const nightHoursWorked = 8;

		const nightDiffPremium = hourlyRate * 0.1; // 15
		const totalNightDiffPay = nightDiffPremium * nightHoursWorked; // 120

		expect(nightDiffPremium).toBe(15);
		expect(totalNightDiffPay).toBe(120);
	});

	it("should compute total pay including regular hours and night diff", () => {
		const hourlyRate = 200;
		const totalHours = 8;
		const nightHours = 4;
		const regularHours = totalHours - nightHours; // 4

		const regularPay = regularHours * hourlyRate; // 800
		const nightPay = nightHours * (hourlyRate * 1.1); // 4 * 220 = 880
		const totalPay = regularPay + nightPay; // 1680

		expect(totalPay).toBe(1680);
	});
});
