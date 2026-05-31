export function calculateSeparationPay(
	monthlySalary: number,
	start: string,
	end: string,
	reason: string,
) {
	const s = new Date(start);
	const e = new Date(end);
	if (e < s) return { yearsOfService: 0, multiplier: 0, totalPay: 0 };

	let totalMonths =
		(e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
	if (e.getDate() < s.getDate()) {
		totalMonths--;
	}

	if (totalMonths < 0) totalMonths = 0;

	const years = Math.floor(totalMonths / 12);
	const remainingMonths = totalMonths % 12;

	const yearsOfService = remainingMonths >= 6 ? years + 1 : years;

	// Multiplier logic
	const isOneMonthMultiplier = [
		"redundancy",
		"labor-saving",
		"impossible",
	].includes(reason);
	const multiplier = isOneMonthMultiplier ? 1 : 0.5;

	// Calculate Pay
	const calculatedPay = monthlySalary * yearsOfService * multiplier;
	// Minimum of 1 month salary for any separation pay according to DOLE
	const totalPay =
		yearsOfService > 0 ? Math.max(monthlySalary, calculatedPay) : 0;

	return {
		yearsOfService,
		multiplier,
		totalPay,
	};
}
