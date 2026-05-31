export function calculateBillSplit(
	totalReceiptAmount: number,
	tipAmount: number,
	pax: number,
) {
	if (totalReceiptAmount <= 0 || pax <= 0) {
		return {
			totalToPay: 0,
			amountPerPerson: 0,
			totalTip: 0,
		};
	}

	const totalToPay = totalReceiptAmount + tipAmount;
	const amountPerPerson = totalToPay / pax;

	return {
		totalToPay,
		amountPerPerson,
		totalTip: tipAmount,
	};
}
