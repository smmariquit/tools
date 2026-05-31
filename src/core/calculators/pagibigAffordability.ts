export function calculatePagibigAffordability(
	grossIncome: number,
	age: number,
	annualInterestRate: number,
) {
	// Rule 1: Max Term is 30 years, and age at maturity cannot exceed 70.
	const maxTermYears = Math.max(0, Math.min(30, 70 - age));
	const n = maxTermYears * 12; // total months

	// Rule 2: Monthly amortization cannot exceed 35% of gross income
	const maxAmortization = grossIncome * 0.35;

	let maxLoanAmount = 0;
	if (n > 0) {
		// Rule 3: Calculate Present Value of Annuity
		const r = annualInterestRate / 100 / 12;
		maxLoanAmount = maxAmortization * ((1 - (1 + r) ** -n) / r);
		// Rule 4: Capped at 6,000,000
		maxLoanAmount = Math.min(maxLoanAmount, 6000000);
	}

	return {
		maxLoanAmount,
		maxAmortization,
		maxTermYears,
	};
}
