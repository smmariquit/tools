import { describe, expect, it } from "vitest";

describe("Freelance Hourly Rate Logic", () => {
	const calculateRate = (
		targetNetMonthly: number,
		monthlyExpenses: number,
		billableHoursPerWeek: number,
		vacationDaysPerYear: number,
	) => {
		const annualNet = targetNetMonthly * 12;
		const annualExpenses = monthlyExpenses * 12;

		let grossAnnual = 0;
		// If they don't exceed 250k, no tax
		if (annualNet + annualExpenses <= 250000) {
			grossAnnual = annualNet + annualExpenses;
		} else {
			// Gross - 0.08*(Gross - 250000) - Expenses = Net
			// 0.92 * Gross + 20000 - Expenses = Net
			// 0.92 * Gross = Net + Expenses - 20000
			grossAnnual = (annualNet + annualExpenses - 20000) / 0.92;

			// Verify if the gross actually exceeds 250k
			if (grossAnnual <= 250000) {
				grossAnnual = annualNet + annualExpenses;
			}
		}

		const workingWeeks = 52 - vacationDaysPerYear / 5;
		const billableHoursPerYear = workingWeeks * billableHoursPerWeek;
		const hourlyRatePhp = grossAnnual / billableHoursPerYear;
		const hourlyRateUsd = hourlyRatePhp / 56; // Fixed 56 exchange rate for estimation

		return {
			grossAnnual,
			billableHoursPerYear,
			hourlyRatePhp,
			hourlyRateUsd,
		};
	};

	it("should calculate correctly for gross above 250k", () => {
		const result = calculateRate(50000, 5000, 40, 20); // 4 weeks vacation
		// Net = 600k, Expenses = 60k
		// Gross = (660k - 20k) / 0.92 = 695652.17
		expect(result.grossAnnual).toBeCloseTo(695652.17, 1);

		// 52 - 4 = 48 weeks * 40 = 1920 hours
		expect(result.billableHoursPerYear).toBe(1920);

		// PHP rate = 695652.17 / 1920 = 362.31
		expect(result.hourlyRatePhp).toBeCloseTo(362.31, 1);
	});

	it("should calculate correctly for gross below 250k", () => {
		const result = calculateRate(15000, 2000, 20, 0);
		// Net = 180k, Expenses = 24k -> Gross = 204k (No tax)
		expect(result.grossAnnual).toBe(204000);
		expect(result.hourlyRatePhp).toBe(204000 / (52 * 20));
	});
});
