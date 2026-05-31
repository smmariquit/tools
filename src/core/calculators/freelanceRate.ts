export function calculateFreelanceRate(
	targetNetMonthly: number,
	monthlyExpenses: number,
	billableHoursPerWeek: number,
	vacationDaysPerYear: number,
) {
	const annualNet = targetNetMonthly * 12;
	const annualExpenses = monthlyExpenses * 12;

	let grossAnnual = 0;
	// If they don't exceed 250k, no tax
	if (annualNet + annualExpenses <= 250000) {
		grossAnnual = annualNet + annualExpenses;
	} else {
		// Gross - 0.08*(Gross - 250000) - Expenses = Net
		grossAnnual = (annualNet + annualExpenses - 20000) / 0.92;

		// Verify if the gross actually exceeds 250k
		if (grossAnnual <= 250000) {
			grossAnnual = annualNet + annualExpenses;
		}
	}

	const workingWeeks = 52 - vacationDaysPerYear / 5;
	const billableHoursPerYear = workingWeeks * billableHoursPerWeek;
	const hourlyRatePhp =
		billableHoursPerYear > 0 ? grossAnnual / billableHoursPerYear : 0;
	const hourlyRateUsd = hourlyRatePhp / 56; // Fixed 56 exchange rate for estimation

	return {
		grossAnnual,
		billableHoursPerYear,
		hourlyRatePhp,
		hourlyRateUsd,
	};
}
