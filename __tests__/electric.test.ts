import { describe, expect, it } from "vitest";

describe("Electric Bill Calculation Logic", () => {
	it("should correctly calculate the monthly bill based on wattage, hours, days, and rate", () => {
		const watts = 1500;
		const hours = 8;
		const days = 30;
		const rate = 11.5;

		const kilowattHours = (watts / 1000) * hours * days; // 1.5 * 8 * 30 = 360 kWh
		const estimatedCost = kilowattHours * rate; // 360 * 11.50 = 4140

		expect(kilowattHours).toBe(360);
		expect(estimatedCost).toBe(4140);
	});
});
