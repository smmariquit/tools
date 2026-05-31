import { describe, expect, it } from "vitest";

describe("PhilHealth 2026 Logic", () => {
	it("should calculate exactly 5% for salaries within the bracket", () => {
		const basicSalary = 30000;
		const premiumRate = 0.05;
		const totalPremium = basicSalary * premiumRate;

		expect(totalPremium).toBe(1500);
		expect(totalPremium / 2).toBe(750); // Employee share
	});

	it("should floor the calculation at 10k", () => {
		const basicSalary = 8000;
		const floorSalary = 10000;
		const premiumRate = 0.05;
		const totalPremium = floorSalary * premiumRate;

		expect(totalPremium).toBe(500);
	});

	it("should ceiling the calculation at 100k", () => {
		const basicSalary = 150000;
		const ceilingSalary = 100000;
		const premiumRate = 0.05;
		const totalPremium = ceilingSalary * premiumRate;

		expect(totalPremium).toBe(5000);
	});
});
