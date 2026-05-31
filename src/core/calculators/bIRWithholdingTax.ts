export function calculateBIRWithholdingTax(
	grossAmount: number,
	taxRate: number,
	isVatInclusive: boolean,
) {
	if (grossAmount <= 0) {
		return {
			taxBase: 0,
			vatAmount: 0,
			withholdingTax: 0,
			netAmount: 0,
		};
	}

	// If VAT inclusive, the actual service value is Gross / 1.12
	const taxBase = isVatInclusive ? grossAmount / 1.12 : grossAmount;
	const vatAmount = isVatInclusive ? grossAmount - taxBase : 0;

	const withholdingTax = taxBase * (taxRate / 100);

	// Net Amount = Gross Amount (what was originally billed) - Withholding Tax
	const netAmount = grossAmount - withholdingTax;

	return {
		taxBase,
		vatAmount,
		withholdingTax,
		netAmount,
	};
}
