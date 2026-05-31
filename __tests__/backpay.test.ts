import { describe, expect, it } from "vitest";

describe("Backpay & Final Pay Computation Logic", () => {
	it("should calculate unpaid salary based on DOLE 21.75 divisor", () => {
		const salary = 30000;
		const daysWorked = 10;

		const dailyRate = salary / 21.75;
		const unpaidSalary = dailyRate * daysWorked;

		// 30000 / 21.75 = 1379.3103448...
		// 1379.3103448 * 10 = 13793.10
		expect(Math.round(unpaidSalary * 100) / 100).toBe(13793.1);
	});

	it("should calculate prorated 13th month pay correctly", () => {
		const salary = 50000;
		const monthsWorked = 6.5; // Resigned middle of July

		const prorated13th = (salary * monthsWorked) / 12;
		expect(Math.round(prorated13th * 100) / 100).toBe(27083.33);
	});

	it("should calculate leave conversion values", () => {
		const salary = 25000;
		const unusedLeaves = 5;

		const dailyRate = salary / 21.75;
		const leaveValue = dailyRate * unusedLeaves;

		expect(Math.round(leaveValue * 100) / 100).toBe(5747.13);
	});

	it("should compute final backpay correctly by subtracting deductions", () => {
		const unpaidSalary = 10000;
		const prorated13th = 20000;
		const leaveValue = 5000;
		const deductions = 3500;

		const totalBackpay = unpaidSalary + prorated13th + leaveValue - deductions;
		expect(totalBackpay).toBe(31500);
	});
});
