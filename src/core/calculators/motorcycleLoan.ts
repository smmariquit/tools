export function calculateMotorcycleLoan(
	cashPrice: number,
	downPayment: number,
	termMonths: number,
	monthlyAddOnRate: number,
) {
	if (cashPrice <= 0 || termMonths <= 0 || downPayment >= cashPrice) {
		return {
			amountFinanced: 0,
			totalInterest: 0,
			totalCost: 0,
			monthlyAmortization: 0,
		};
	}

	const amountFinanced = cashPrice - downPayment;
	// Dealers use straight flat interest rate per month on the principal
	const totalInterest = amountFinanced * (monthlyAddOnRate / 100) * termMonths;
	const totalAmountToPay = amountFinanced + totalInterest;

	const monthlyAmortization = totalAmountToPay / termMonths;
	const totalCost = cashPrice + totalInterest;

	return {
		amountFinanced,
		totalInterest,
		totalCost,
		monthlyAmortization,
	};
}
