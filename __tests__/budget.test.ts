import { describe, expect, it } from "vitest";

describe("Budget & Reverse Salary Logic", () => {
	it("should sum up all expenses correctly", () => {
		const expenses = [
			{ id: "1", name: "Rent", amount: 15000 },
			{ id: "2", name: "Food", amount: 10000 },
			{ id: "3", name: "Utilities", amount: 5000 },
		];

		const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
		expect(totalExpenses).toBe(30000);
	});

	it("should estimate the required gross salary factoring in approximate ~20% statutory deductions", () => {
		const targetNetSalary = 30000;

		// If Net is 80% of Gross, Gross = Net / 0.8
		const estimatedGross = targetNetSalary / 0.8;

		expect(estimatedGross).toBe(37500);
	});
});
