import { describe, expect, it } from "vitest";

describe("Pag-IBIG Foreclosed Property ROI Logic", () => {
	it("should calculate Gross Rental Yield and Net ROI", () => {
		const purchasePrice = 1500000;
		const renovationCost = 300000;
		const closingFees = 75000;
		const totalInvestment = purchasePrice + renovationCost + closingFees; // 1,875,000

		expect(totalInvestment).toBe(1875000);

		const expectedMonthlyRent = 15000;
		const annualGrossRent = expectedMonthlyRent * 12; // 180,000

		const grossRentalYield = (annualGrossRent / totalInvestment) * 100;
		// 180k / 1.875M = 9.6%
		expect(Math.round(grossRentalYield * 10) / 10).toBe(9.6);

		const annualPropertyTax = 15000;
		const annualMaintenance = 10000;
		const annualNetRent =
			annualGrossRent - annualPropertyTax - annualMaintenance; // 155,000

		const netROI = (annualNetRent / totalInvestment) * 100;
		// 155k / 1.875M = 8.26%
		expect(Math.round(netROI * 100) / 100).toBe(8.27); // Rounding up 8.2666...
	});
});
