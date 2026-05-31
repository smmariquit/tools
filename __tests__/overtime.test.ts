import { describe, expect, it } from "vitest";

describe("Overtime Pay Logic", () => {
	it("should calculate ordinary day overtime correctly", () => {
		const monthlySalary = 21750;
		const workDays = 21.75;
		const hoursWorked = 10; // 8 regular, 2 OT

		const dailyRate = monthlySalary / workDays; // 1000
		const hourlyRate = dailyRate / 8; // 125

		const payRegular = 8 * hourlyRate * 1.0; // 1000
		const payOT = 2 * hourlyRate * 1.25; // 250 * 1.25 = 312.5

		expect(payRegular).toBe(1000);
		expect(payOT).toBe(312.5);
		expect(payRegular + payOT).toBe(1312.5);
	});

	it("should calculate Regular Holiday + Rest Day correctly", () => {
		const monthlySalary = 21750;
		const workDays = 21.75;
		const hoursWorked = 10;

		const dailyRate = monthlySalary / workDays; // 1000
		const hourlyRate = dailyRate / 8; // 125

		// Multiplier for first 8 hours is 2.6
		const payRegular = 8 * hourlyRate * 2.6; // 1000 * 2.6 = 2600
		// Multiplier for OT is 2.6 * 1.3 = 3.38
		const payOT = 2 * hourlyRate * 3.38; // 250 * 3.38 = 845

		expect(payRegular).toBe(2600);
		expect(payOT).toBe(845);
		expect(payRegular + payOT).toBe(3445);
	});
});
