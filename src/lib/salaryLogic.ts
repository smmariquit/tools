export function computeSalary(
	basicPayStr: string | null,
	payrollPeriod: string = "Monthly",
	taxableAllowanceStr: string | null = "0",
	nonTaxableAllowanceStr: string | null = "0"
) {
	let basicPay = parseFloat(basicPayStr || "0") || 0;
	const taxableAllowance = parseFloat(taxableAllowanceStr || "0") || 0;
	const nonTaxableAllowance = parseFloat(nonTaxableAllowanceStr || "0") || 0;

	// Normalize basic pay and taxable allowance to a Monthly equivalent for standard deductions
	let monthlySalary = basicPay;
	let monthlyTaxableAllowance = taxableAllowance;
	let monthlyNonTaxableAllowance = nonTaxableAllowance;

	if (payrollPeriod === "Semi-Monthly") {
		monthlySalary = basicPay * 2;
		monthlyTaxableAllowance = taxableAllowance * 2;
		monthlyNonTaxableAllowance = nonTaxableAllowance * 2;
	} else if (payrollPeriod === "Weekly") {
		monthlySalary = basicPay * 4.3333; // Approx weeks in a month
		monthlyTaxableAllowance = taxableAllowance * 4.3333;
		monthlyNonTaxableAllowance = nonTaxableAllowance * 4.3333;
	} else if (payrollPeriod === "Daily") {
		monthlySalary = basicPay * 21.6667; // Standard working days
		monthlyTaxableAllowance = taxableAllowance * 21.6667;
		monthlyNonTaxableAllowance = nonTaxableAllowance * 21.6667;
	}

	const totalTaxableMonthly = monthlySalary + monthlyTaxableAllowance;

	// Mandatory Contributions (based on Monthly Basic Pay typically, but if allowances are integrated into basic, it can vary. We use totalTaxableMonthly here for simplicity as standard practice)
	const sssMSC = totalTaxableMonthly > 0 ? Math.min(Math.max(totalTaxableMonthly, 5000), 35000) : 0;
	const sssDeduction = sssMSC * 0.05;

	const philhealthBase = totalTaxableMonthly > 0 ? Math.min(Math.max(totalTaxableMonthly, 10000), 100000) : 0;
	const philhealthDeduction = philhealthBase * 0.025;

	const pagibigDeduction = totalTaxableMonthly > 0 ? Math.min(totalTaxableMonthly * 0.02, 200) : 0;

	const totalContributions = sssDeduction + philhealthDeduction + pagibigDeduction;
	const taxableIncome = Math.max(0, totalTaxableMonthly - totalContributions);

	// Tax computation (Monthly based on Jan 2023 TRAIN Law)
	let tax = 0;
	if (taxableIncome > 666667) {
		tax = 183541.67 + (taxableIncome - 666667) * 0.35;
	} else if (taxableIncome > 166667) {
		tax = 33541.67 + (taxableIncome - 166667) * 0.3;
	} else if (taxableIncome > 66667) {
		tax = 8541.67 + (taxableIncome - 66667) * 0.25;
	} else if (taxableIncome > 33333) {
		tax = 1875 + (taxableIncome - 33333) * 0.2;
	} else if (taxableIncome > 20833) {
		tax = (taxableIncome - 20833) * 0.15;
	}

	const monthlyNetPay = totalTaxableMonthly - totalContributions - tax + monthlyNonTaxableAllowance;

	// Convert back to chosen period for display
	let finalBasic = basicPay;
	let finalTaxableAllow = taxableAllowance;
	let finalNonTaxableAllow = nonTaxableAllowance;
	let finalSSS = sssDeduction;
	let finalPhilHealth = philhealthDeduction;
	let finalPagibig = pagibigDeduction;
	let finalContributions = totalContributions;
	let finalTax = tax;
	let finalNetPay = monthlyNetPay;

	if (payrollPeriod === "Semi-Monthly") {
		finalSSS /= 2;
		finalPhilHealth /= 2;
		finalPagibig /= 2;
		finalContributions /= 2;
		finalTax /= 2;
		finalNetPay /= 2;
	} else if (payrollPeriod === "Weekly") {
		finalSSS /= 4.3333;
		finalPhilHealth /= 4.3333;
		finalPagibig /= 4.3333;
		finalContributions /= 4.3333;
		finalTax /= 4.3333;
		finalNetPay /= 4.3333;
	} else if (payrollPeriod === "Daily") {
		finalSSS /= 21.6667;
		finalPhilHealth /= 21.6667;
		finalPagibig /= 21.6667;
		finalContributions /= 21.6667;
		finalTax /= 21.6667;
		finalNetPay /= 21.6667;
	}

	return {
		salary: finalBasic,
		taxableAllowance: finalTaxableAllow,
		nonTaxableAllowance: finalNonTaxableAllow,
		sssDeduction: finalSSS,
		philhealthDeduction: finalPhilHealth,
		pagibigDeduction: finalPagibig,
		totalContributions: finalContributions,
		taxableIncome: finalBasic + finalTaxableAllow - finalContributions,
		tax: finalTax,
		netPay: finalNetPay,
	};
}
