export function calculateThirteenthMonth(
	basicSalary: number,
	monthsWorked: number,
	unpaidAbsences: number,
) {
	// 13th Month Computation Logic
	const totalEarned = basicSalary * monthsWorked - unpaidAbsences;
	const thirteenthMonthPay = totalEarned / 12;

	// Tax Logic: 90k exemption
	const taxableAmount = Math.max(0, thirteenthMonthPay - 90000);
	const taxExemptAmount = Math.min(thirteenthMonthPay, 90000);

	return {
		totalEarned,
		thirteenthMonthPay,
		taxableAmount,
		taxExemptAmount,
	};
}
