/**
 * Reverse Salary Calculator
 *
 * Given a target net take-home pay, this function uses binary search
 * to find the gross salary that, after SSS, PhilHealth, Pag-IBIG,
 * and Withholding Tax deductions, yields that exact net amount.
 *
 * This reuses the same forward computation from salaryLogic.ts to
 * guarantee 1:1 consistency with our Salary Calculator.
 */

import { computeSalary } from "./salaryLogic";

export interface ReverseSalaryResult {
	grossSalary: number;
	sss: number;
	philhealth: number;
	pagibig: number;
	totalContributions: number;
	tax: number;
	netPay: number;
}

export function reverseSalary(targetNetPay: number): ReverseSalaryResult {
	if (targetNetPay <= 0) {
		return {
			grossSalary: 0,
			sss: 0,
			philhealth: 0,
			pagibig: 0,
			totalContributions: 0,
			tax: 0,
			netPay: 0,
		};
	}

	// Binary search: the gross salary is always >= net pay
	let low = targetNetPay;
	let high = targetNetPay * 2.5; // Upper bound — even at 35% tax, gross is < 2.5x net
	let bestGross = high;

	// Run up to 100 iterations for precision (converges in ~40)
	for (let i = 0; i < 100; i++) {
		const mid = (low + high) / 2;
		const result = computeSalary(
			mid.toFixed(2),
			"Monthly",
			"0",
			"0",
			"Private",
		);

		if (Math.abs(result.netPay - targetNetPay) < 0.5) {
			bestGross = mid;
			break;
		}

		if (result.netPay < targetNetPay) {
			low = mid;
		} else {
			high = mid;
			bestGross = mid;
		}
	}

	const final = computeSalary(
		bestGross.toFixed(2),
		"Monthly",
		"0",
		"0",
		"Private",
	);

	return {
		grossSalary: Math.ceil(bestGross),
		sss: final.sssDeduction,
		philhealth: final.philhealthDeduction,
		pagibig: final.pagibigDeduction,
		totalContributions: final.totalContributions,
		tax: final.tax,
		netPay: final.netPay,
	};
}

export function grossFromTax(targetTax: number): ReverseSalaryResult {
	if (targetTax <= 0) {
		return {
			grossSalary: 0,
			sss: 0,
			philhealth: 0,
			pagibig: 0,
			totalContributions: 0,
			tax: 0,
			netPay: 0,
		};
	}

	// Binary search: the gross salary is at least the target tax
	let low = targetTax;
	let high = targetTax * 10; // Upper bound (effective tax rate is at most ~35%)
	let bestGross = high;

	// Need to find upper bound properly if target is very high
	let maxIter = 0;
	while (
		computeSalary(high.toFixed(2), "Monthly", "0", "0", "Private").tax <
			targetTax &&
		maxIter < 10
	) {
		high *= 2;
		maxIter++;
	}

	for (let i = 0; i < 100; i++) {
		const mid = (low + high) / 2;
		const result = computeSalary(
			mid.toFixed(2),
			"Monthly",
			"0",
			"0",
			"Private",
		);

		if (Math.abs(result.tax - targetTax) < 0.5) {
			bestGross = mid;
			break;
		}

		if (result.tax < targetTax) {
			low = mid;
		} else {
			high = mid;
			bestGross = mid;
		}
	}

	const final = computeSalary(
		bestGross.toFixed(2),
		"Monthly",
		"0",
		"0",
		"Private",
	);

	return {
		grossSalary: Math.ceil(bestGross),
		sss: final.sssDeduction,
		philhealth: final.philhealthDeduction,
		pagibig: final.pagibigDeduction,
		totalContributions: final.totalContributions,
		tax: final.tax,
		netPay: final.netPay,
	};
}
