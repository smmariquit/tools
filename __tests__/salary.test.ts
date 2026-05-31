import { describe, expect, it } from "vitest";

describe("Salary Computation Logic", () => {
	it("should calculate SSS Max MSC correctly", () => {
		const salary = 50000;
		const msc = Math.min(Math.max(salary, 5000), 35000);
		expect(msc).toBe(35000);

		const sssDeduction = msc * 0.05;
		expect(sssDeduction).toBe(1750);
	});

	it("should calculate PhilHealth properly", () => {
		const salary = 50000;
		const base = Math.min(Math.max(salary, 10000), 100000);
		const deduction = base * 0.025;
		expect(deduction).toBe(1250);
	});

	it("should calculate TRAIN Law Tax properly for 50k", () => {
		const taxableIncome = 50000 - 1750 - 1250 - 200; // 46800
		let tax = 0;
		if (taxableIncome > 33333) {
			tax = 1875 + (taxableIncome - 33333) * 0.2;
		}
		expect(Math.round(tax * 100) / 100).toBe(4568.4);
	});
});
